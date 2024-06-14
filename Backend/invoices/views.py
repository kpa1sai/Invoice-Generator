from django.shortcuts import render
from rest_framework import viewsets
from .models import Supplier, Customer, Address, Invoice, InvoiceItem
from .serializers import SupplierSerializer, CustomerSerializer, AddressSerializer, InvoiceSerializer, InvoiceItemSerializer
from django.http import HttpResponseNotFound, FileResponse
import io
import os
from reportlab.lib.pagesizes import letter
from reportlab.lib import colors
from reportlab.platypus import SimpleDocTemplate, Table, TableStyle, Spacer, Paragraph
from reportlab.lib.styles import getSampleStyleSheet

# Import necessary modules and models

class SupplierViewSet(viewsets.ModelViewSet):
    queryset = Supplier.objects.all()
    serializer_class = SupplierSerializer

class CustomerViewSet(viewsets.ModelViewSet):
    queryset = Customer.objects.all()
    serializer_class = CustomerSerializer

class AddressViewSet(viewsets.ModelViewSet):
    queryset = Address.objects.all()
    serializer_class = AddressSerializer

class InvoiceViewSet(viewsets.ModelViewSet):
    queryset = Invoice.objects.all()
    serializer_class = InvoiceSerializer

class InvoiceItemViewSet(viewsets.ModelViewSet):
    queryset = InvoiceItem.objects.all()
    serializer_class = InvoiceItemSerializer

def draw_invoice_title(canvas, doc, supplier_name, invoice_number, invoice_date):
    width, height = letter
    title_text = "INVOICE"
    font_size = 18  # Larger font size for the title
    canvas.setFont("Helvetica-Bold", font_size)
    text_width = canvas.stringWidth(title_text, "Helvetica-Bold", font_size)
    
    # Calculate the starting position for the title to center it horizontally
    text_x = (width - text_width) / 2
    text_y = height - 60  # Adjust position as needed
    canvas.drawString(text_x, text_y, title_text)

    # Move the invoice number to the right corner
    canvas.setFont("Helvetica", 12)
    invoice_number_text = f"Invoice Number: {invoice_number}"
    invoice_number_width = canvas.stringWidth(invoice_number_text, "Helvetica", 12)
    invoice_number_x = width - invoice_number_width - 50  # Adjust as needed
    invoice_number_y = height - 140  # Same height as supplier name
    canvas.drawString(invoice_number_x, invoice_number_y, invoice_number_text)

    # Move the invoice date to the right corner below the invoice number
    invoice_date_text = f"Date: {invoice_date.strftime('%Y-%m-%d')}"
    invoice_date_width = canvas.stringWidth(invoice_date_text, "Helvetica", 12)
    invoice_date_x = width - invoice_date_width - 50  # Same x-coordinate as invoice number
    invoice_date_y = invoice_number_y - 20  # Adjust the position vertically
    canvas.drawString(invoice_date_x, invoice_date_y, invoice_date_text)


def draw_supplier_info(canvas, supplier_name, supplier_address, customer_name, customer_address):
    width, height = letter
    canvas.setFont("Helvetica", 12)

    # Add "FROM:" text right above the customer's name
    from_text = "From:"
    canvas.setFont("Helvetica-Bold", 12)  # Set font to bold
    canvas.drawString(50, height - 120, from_text)

    # Draw the Supplier's name
    supplier_text = f"Supplier: {supplier_name}"
    canvas.setFont("Helvetica", 12)  # Reset font to regular
    canvas.drawString(50, height - 140, supplier_text)
    
    if supplier_address:
        # Splitting supplier address into lines
        address_lines = supplier_address.split('\n')
        
        # Draw supplier address line by line
        for i, line in enumerate(address_lines):
            canvas.drawString(50, height - 160 - i * 20, line)  # Adjust vertical spacing as needed

    # Add a gap between supplier information and "To:" text
    canvas.translate(0, -20)  # Adjust as needed

    # Add "TO:" text right above the customer's name
    to_text = "To:"
    canvas.setFont("Helvetica-Bold", 12)  # Set font to bold
    canvas.drawString(50, height - 200, to_text)

    # Draw the Customer's name
    customer_text = f"Customer: {customer_name}"
    canvas.setFont("Helvetica", 12)  # Reset font to regular
    canvas.drawString(50, height - 220, customer_text)
    
    if customer_address:
        # Splitting customer address into lines
        address_lines = customer_address.split('\n')
        
        # Draw customer address line by line
        for i, line in enumerate(address_lines):
            canvas.drawString(50, height - 240 - i * 20, line)  # Adjust vertical spacing as needed

    # Pull down the table to avoid collision with the address
    if customer_address:
        canvas.translate(0, -150)  # Adjust as needed

    # Pull down the table further to avoid collision with the customer address information
    if customer_address:
        canvas.translate(0, -80)  # Adjust as needed



def generate_invoice_pdf(request, invoice_id):
    try:
        # Retrieve the invoice object
        invoice = Invoice.objects.get(pk=invoice_id)
    except Invoice.DoesNotExist:
        return HttpResponseNotFound("Invoice not found")

    try:
        # Retrieve the supplier name and address from the associated customer
        supplier_name = invoice.customer.supplier.supplier_name

        # Retrieve the supplier address if it exists
        supplier_address = ""
        if invoice.customer.supplier.address_id:
            supplier_address = f"{invoice.customer.supplier.address_id.address_line_1}\n{invoice.customer.supplier.address_id.city}, {invoice.customer.supplier.address_id.country}"

        # Retrieve the customer name and address
        customer_name = invoice.customer.customer_name
        
        # Retrieve the customer address components
        customer_address = ""
        if invoice.customer.address_id:
            address = invoice.customer.address_id
            address_components = [
                customer_name,
                address.address_line_1,
                f"{address.city}, {address.state}",
                f"{address.country}, {address.zip_code}",
                address.email,
                address.primary_mobile
            ]
            # Join the address components with newlines
            customer_address = "\n".join(address_components)

        # Create a BytesIO buffer to write PDF content
        buffer = io.BytesIO()

        # Define PDF elements
        elements = []

        # Add vertical space to adjust the placement of the title
        elements.append(Spacer(1, 60))

        # Create the table headings
        headings = ["Quantity", "Description", "Unit Price", "Total Unit Price"]

        # Retrieve invoice items for the invoice
        invoice_items = InvoiceItem.objects.filter(invoice=invoice)

        # Populate data for the table
        data = []
        total_unit_price = 0
        total_tax = 0
        for item in invoice_items:
            unit_price = item.price / item.quantity if item.quantity != 0 else 0
            total_price = item.price
            total_unit_price += total_price
            total_tax += total_price * item.tax_rate / 100
            data.append([item.quantity, item.item_description, f"${unit_price:.2f}", f"${total_price:.2f}"])

        # Insert headings at the beginning of the data
        data.insert(0, headings)

        # Define column widths for the table
        column_widths = [50, 300, 100, 100]  # Adjust the widths as needed

        # Define style for the table
        style = TableStyle([
            ('BACKGROUND', (0, 0), (-1, 0), colors.white),
            ('TEXTCOLOR', (0, 0), (-1, 0), colors.black),
            ('ALIGN', (0, 0), (-1, -1), 'CENTER'),
            ('FONTNAME', (0, 0), (-1, 0), 'Helvetica-Bold'),
            ('BOTTOMPADDING', (0, 0), (-1, 0), 12),
            ('BACKGROUND', (0, 0), (-1, 0), colors.white),
            ('GRID', (0, 0), (-1, -1), 1, colors.black)
        ])

        # Create a table and apply the style
        invoice_table = Table(data, colWidths=column_widths)
        invoice_table.setStyle(style)

        # Add the table to the PDF elements
        elements.append(invoice_table)

        # Add additional empty tables if there are fewer than 5 items
        num_items = len(invoice_items)
        while num_items < 5:  # Add only 5 empty tables
            empty_table = Table([[""] * len(headings)], colWidths=column_widths)
            empty_table.setStyle(style)
            elements.append(empty_table)
            num_items += 1

        # Add Total Tax, Discount, and Total Price at the end of the table
        discount = 0  # Set the discount value
        total_price = total_unit_price + total_tax - discount

        summary_data = [
            ["", "", "Total Tax", f"${total_tax:.2f}"],
            ["", "", "Discount", f"${discount:.2f}"],
            ["", "", "Total Price", f"${total_price:.2f}"]
        ]

        for row in summary_data:
            summary_table = Table([row], colWidths=column_widths)
            summary_table.setStyle(style)
            elements.append(summary_table)

        # Add additional text below the table
        contact_info = f"Thank you for your Business! If you have any questions concerning this invoice, contact {supplier_name} at {customer_address.splitlines()[-1]}."
        elements.append(Spacer(1, 20))  # Add space before contact_info
        elements.append(Paragraph(contact_info, style=getSampleStyleSheet()["Normal"]))

        # Create the PDF document with adjusted margins
        doc = SimpleDocTemplate(buffer, pagesize=letter, leftMargin=50, rightMargin=50, topMargin=100, bottomMargin=50)

        # Build the PDF document with the invoice title and supplier name on the first page
        doc.build(elements, onFirstPage=lambda canvas, doc: [
            draw_invoice_title(canvas, doc, supplier_name, invoice.invoice_number, invoice.invoice_date),
            draw_supplier_info(canvas, supplier_name, supplier_address, customer_name, customer_address)
       ])

        #Rewind the buffer to the beginning
        buffer.seek(0)

        # Return the PDF response
        return FileResponse(buffer, as_attachment=True, filename="invoice.pdf")

    except Exception as e:
        # Log the error (you might want to log the actual error message in a real application)
        print(f"Error generating PDF: {e}")
        return HttpResponseNotFound("An error occurred while generating the PDF")


from django.shortcuts import render
from django.http import HttpResponse
from .utils.auth.sendemail import send_email

def send_invoice(request, invoice_id):
    # Fetch invoice details from the database
    try:
        # Retrieve the invoice object
        invoice = Invoice.objects.get(pk=invoice_id)
    except Invoice.DoesNotExist:
        return HttpResponseNotFound("Invoice not found")
    try:
        customer_email = invoice.customer.address_id.email
    except Address.DoesNotExist:
        return HttpResponseNotFound("Add email in customer address details and try again!!")
    context = {
        'customer_name': invoice.customer.customer_name,
        'invoice_number': invoice.invoice_number,
        'amount': invoice.total_price,
        # Add more context variables as needed
    }
    template_path = os.path.join(os.getcwd(), 'templates', 'email', 'email_template_1.html')
    send_email(
        to=customer_email,
        subject='Your Invoice',
        template_name= template_path,
        context=context
    )
    return HttpResponse('Invoice sent successfully!')
