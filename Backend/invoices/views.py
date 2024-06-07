from django.shortcuts import render
from rest_framework import viewsets
from .models import Supplier, Customer, Address, Invoice, InvoiceItem
from .serializers import SupplierSerializer, CustomerSerializer, AddressSerializer, InvoiceSerializer, InvoiceItemSerializer

from django.http import HttpResponseNotFound, FileResponse
import io
from reportlab.lib.pagesizes import letter
from reportlab.lib import colors
from reportlab.platypus import SimpleDocTemplate, Table, TableStyle
from .models import Invoice, InvoiceItem

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


def generate_invoice_pdf(request, invoice_id):
    try:
        # Retrieve the invoice object
        invoice = Invoice.objects.get(pk=invoice_id)
    except Invoice.DoesNotExist:
        return HttpResponseNotFound("Invoice not found")

    # Create a BytesIO buffer to write PDF content
    buffer = io.BytesIO()

    # Define PDF elements
    elements = []

    # Define data for the in    voice
    data = [
        ["Invoice Number", invoice.invoice_number],
        ["Invoice Date", invoice.invoice_date.strftime('%Y-%m-%d')],
        ["Due Date", invoice.payment_due_date.strftime('%Y-%m-%d')],
        ["Customer", invoice.customer.customer_name],
        # Add more data fields as needed
    ]

    # Define style for the table
    style = TableStyle([
        ('BACKGROUND', (0, 0), (-1, 0), colors.grey),
        ('TEXTCOLOR', (0, 0), (-1, 0), colors.whitesmoke),
        ('ALIGN', (0, 0), (-1, -1), 'CENTER'),
        ('FONTNAME', (0, 0), (-1, 0), 'Helvetica-Bold'),
        ('BOTTOMPADDING', (0, 0), (-1, 0), 12),
        ('BACKGROUND', (0, 1), (-1, -1), colors.beige),
        ('GRID', (0, 0), (-1, -1), 1, colors.black)
    ])

    # Create a table and apply the style
    invoice_table = Table(data)
    invoice_table.setStyle(style)


    # Add the table to the PDF elements
    elements.append(invoice_table)

    # Create the PDF document with adjusted margins
    doc = SimpleDocTemplate(buffer, pagesize=letter,leftMargin=50, rightMargin=50, topMargin=50, bottomMargin=50)

    # Build the PDF document
    doc.build(elements)

    # Rewind the buffer to the beginning
    buffer.seek(0)

    # Return the PDF response
    return FileResponse(buffer, as_attachment=True, filename="invoice.pdf")
