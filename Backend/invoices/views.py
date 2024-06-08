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

from django.http import HttpResponseNotFound, FileResponse
import io
from reportlab.lib.pagesizes import letter
from reportlab.lib import colors
from reportlab.platypus import SimpleDocTemplate, Table, TableStyle, Spacer
from reportlab.lib.styles import getSampleStyleSheet


from reportlab.lib.pagesizes import letter
from reportlab.platypus import SimpleDocTemplate, Paragraph


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

def draw_invoice_title(canvas, doc, supplier_name, invoice_number):
    width, height = letter
    title_text = "INVOICE"
    font_size = 18  # Larger font size for the title
    canvas.setFont("Helvetica-Bold", font_size)
    text_width = canvas.stringWidth(title_text, "Helvetica-Bold", font_size)
    
    # Calculate the starting position for the title to center it horizontally
    text_x = (width - text_width) / 2
    text_y = height - 60  # Adjust position as needed
    canvas.drawString(text_x, text_y, title_text)

    # Move the invoice number a bit below the title
    canvas.drawString(width - 180, height - 80, f"Invoice Number: {invoice_number}")



def draw_supplier_info(canvas, supplier_name, supplier_address, customer_name, customer_address):
    width, height = letter
    canvas.setFont("Helvetica", 12)
    supplier_text = f"Supplier: {supplier_name}"
    canvas.drawString(50, height - 80, supplier_text)
    
    if supplier_address:
        # Draw supplier address
        canvas.drawString(50, height - 100, f"Address: {supplier_address}")

    if customer_name:
        canvas.drawString(50, height - 120, "BILL TO:")
        canvas.drawString(50, height - 140, customer_name)

    if customer_address:
        # Draw customer address
        canvas.drawString(50, height - 160, customer_address)

def generate_invoice_pdf(request, invoice_id):
    try:
        # Retrieve the invoice object
        invoice = Invoice.objects.get(pk=invoice_id)
    except Invoice.DoesNotExist:
        return HttpResponseNotFound("Invoice not found")

    # Retrieve the supplier name and address from the associated customer
    supplier_name = invoice.customer.supplier.supplier_name

    # Retrieve the supplier address if it exists
    supplier_address = ""
    if invoice.customer.supplier.address_id:
        supplier_address = f"{invoice.customer.supplier.address_id.address_line_1}\n{invoice.customer.supplier.address_id.city}, {invoice.customer.supplier.address_id.country}"

    # Retrieve the customer name and address
    customer_name = invoice.customer.customer_name
    customer_address = f"{invoice.customer.address_id.address_line_1}, {invoice.customer.address_id.city}, {invoice.customer.address_id.country}" if invoice.customer.address_id else "N/A"

    # Create a BytesIO buffer to write PDF content
    buffer = io.BytesIO()

    # Define PDF elements
    elements = []

    # Add vertical space to adjust the placement of the title
    elements.append(Spacer(1, 60))

    # Define data for the invoice
    data = [
        ["Invoice Number", invoice.invoice_number],
        ["Due Date", invoice.payment_due_date.strftime('%Y-%m-%d')],
        ["Total Price", invoice.total_price],
        ["Invoice Status", invoice.invoice_status],
        # Add more data fields as needed
    ]

    # Define style for the table
    style = TableStyle([
        ('BACKGROUND', (0, 0), (-1, 0), colors.grey),
        ('TEXTCOLOR', (0, 0), (-1, 0), colors.black),
        ('ALIGN', (0, 0), (-1, -1), 'CENTER'),
        ('FONTNAME', (0, 0), (-1, 0), 'Helvetica-Bold'),
        ('BOTTOMPADDING', (0, 0), (-1, 0), 12),
        ('BACKGROUND', (0, 1), (-1, -1), colors.white),  # Set background to white
        ('GRID', (0, 0), (-1, -1), 1, colors.black),
        ('FONTSIZE', (0, 0), (-1, -1), 12),  # Increase font size for all cells
    ])

    # Create a table and apply the style
    invoice_table = Table(data)
    invoice_table.setStyle(style)

    # Center the table horizontally
    invoice_table._argW[1] = 400

    # Add spacer to adjust the position of the table downwards
    elements.append(Spacer(1, 70))

    # Add the table to the PDF elements
    elements.append(invoice_table)

    # Create the PDF document with adjusted margins
    doc = SimpleDocTemplate(buffer, pagesize=letter, leftMargin=50, rightMargin=50, topMargin=100, bottomMargin=50)

    # Build the PDF document with the invoice title and supplier name on the first page
    doc.build(elements, onFirstPage=lambda canvas, doc: [draw_invoice_title(canvas, doc, supplier_name, invoice.invoice_number), draw_supplier_info(canvas, supplier_name, supplier_address, customer_name, customer_address)])

    # Rewind the buffer to the beginning
    buffer.seek(0)

    # Return the PDF response
    return FileResponse(buffer, as_attachment=True, filename="invoice.pdf")
