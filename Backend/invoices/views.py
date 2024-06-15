from django.shortcuts import render
from rest_framework import viewsets
from .models import Supplier, Customer, Address, Invoice, InvoiceItem
from .serializers import SupplierSerializer, CustomerSerializer, AddressSerializer, InvoiceSerializer, InvoiceItemSerializer
from django.http import HttpResponseNotFound, FileResponse
import io
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


def generate_invoice_pdf(invoice_id):
    try:
        invoice = Invoice.objects.get(pk=invoice_id)
    except Invoice.DoesNotExist:
        return None

    supplier = invoice.supplier
    customer = invoice.customer
    items = InvoiceItem.objects.filter(invoice=invoice)

    buffer = io.BytesIO()
    doc = SimpleDocTemplate(buffer, pagesize=letter)
    styles = getSampleStyleSheet()

    elements = []

    draw_invoice_title(doc.canv, doc, supplier.name, invoice.invoice_number, invoice.date)
    draw_supplier_info(doc.canv, supplier.name, supplier.address, customer.name, customer.address)

    elements.append(Spacer(1, 160))  # Adjust this value to leave space for the title and addresses

    data = [["Description", "Quantity", "Unit Price", "Total"]]
    for item in items:
        data.append([item.description, item.quantity, item.unit_price, item.total_price])

    table = Table(data)
    table.setStyle(TableStyle([
        ('BACKGROUND', (0, 0), (-1, 0), colors.grey),
        ('TEXTCOLOR', (0, 0), (-1, 0), colors.whitesmoke),
        ('ALIGN', (0, 0), (-1, -1), 'CENTER'),
        ('FONTNAME', (0, 0), (-1, 0), 'Helvetica-Bold'),
        ('BOTTOMPADDING', (0, 0), (-1, 0), 12),
        ('BACKGROUND', (0, 1), (-1, -1), colors.beige),
    ]))

    elements.append(table)
    doc.build(elements)

    buffer.seek(0)
    return buffer


def download_invoice(request, invoice_id):
    buffer = generate_invoice_pdf(invoice_id)
    if buffer is None:
        return HttpResponseNotFound("Invoice not found")

    response = FileResponse(buffer, as_attachment=True, filename=f'invoice_{invoice_id}.pdf')
    return response
