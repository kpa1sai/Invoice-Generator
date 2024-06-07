from django.shortcuts import render
from rest_framework import viewsets
from .models import Supplier, Customer, Address, Invoice, InvoiceItem
from .serializers import SupplierSerializer, CustomerSerializer, AddressSerializer, InvoiceSerializer, InvoiceItemSerializer


from django.http import HttpResponseNotFound, FileResponse
import io
from reportlab.pdfgen import canvas
from .models import Invoice


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


from django.http import HttpResponseNotFound, FileResponse
import io
from reportlab.pdfgen import canvas
from .models import Invoice

def generate_invoice_pdf(request, invoice_id):
    try:
        # Retrieve the invoice object
        invoice = Invoice.objects.get(pk=invoice_id)
    except Invoice.DoesNotExist:
        return HttpResponseNotFound("Invoice not found")

    # Create a BytesIO buffer to write PDF content
    buffer = io.BytesIO()

    # Create a PDF document using ReportLab
    p = canvas.Canvas(buffer)

    # Define PDF content
    p.drawString(100, 750, "Invoice")
    p.drawString(100, 730, f"Invoice Number: {invoice.invoice_number}")
    p.drawString(100, 710, f"Total Price: {invoice.total_price}")
    # Add more content as needed

    # Save the PDF
    p.showPage()
    p.save()

    # Rewind the buffer to the beginning
    buffer.seek(0)

    # Return the PDF response
    return FileResponse(buffer, as_attachment=True, filename="invoice.pdf")
