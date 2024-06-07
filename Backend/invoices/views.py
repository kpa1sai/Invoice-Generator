from rest_framework import viewsets, status
from rest_framework.response import Response
from rest_framework.decorators import action
from .models import Supplier, Customer, Address, Invoice, InvoiceItem
from .serializers import SupplierSerializer, CustomerSerializer, AddressSerializer, InvoiceSerializer, InvoiceItemSerializer

class SupplierViewSet(viewsets.ModelViewSet):
    queryset = Supplier.objects.all()
    serializer_class = SupplierSerializer

    @action(detail=True, methods=['put', 'patch'])
    def update_supplier(self, request, pk=None):
        supplier = self.get_object()
        serializer = self.get_serializer(supplier, data=request.data, partial=(request.method == 'PATCH'))
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    @action(detail=True, methods=['delete'])
    def delete_supplier(self, request, pk=None):
        supplier = self.get_object()
        supplier.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)

class CustomerViewSet(viewsets.ModelViewSet):
    queryset = Customer.objects.all()
    serializer_class = CustomerSerializer

    @action(detail=True, methods=['put', 'patch'])
    def update_customer(self, request, pk=None):
        customer = self.get_object()
        serializer = self.get_serializer(customer, data=request.data, partial=(request.method == 'PATCH'))
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    @action(detail=True, methods=['delete'])
    def delete_customer(self, request, pk=None):
        customer = self.get_object()
        customer.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)

class AddressViewSet(viewsets.ModelViewSet):
    queryset = Address.objects.all()
    serializer_class = AddressSerializer

    @action(detail=True, methods=['put', 'patch'])
    def update_address(self, request, pk=None):
        address = self.get_object()
        serializer = self.get_serializer(address, data=request.data, partial=(request.method == 'PATCH'))
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    @action(detail=True, methods=['delete'])
    def delete_address(self, request, pk=None):
        address = self.get_object()
        address.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)

class InvoiceViewSet(viewsets.ModelViewSet):
    queryset = Invoice.objects.all()
    serializer_class = InvoiceSerializer

    @action(detail=True, methods=['put', 'patch'])
    def update_invoice(self, request, pk=None):
        invoice = self.get_object()
        serializer = self.get_serializer(invoice, data=request.data, partial=(request.method == 'PATCH'))
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    @action(detail=True, methods=['delete'])
    def delete_invoice(self, request, pk=None):
        invoice = self.get_object()
        invoice.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)

class InvoiceItemViewSet(viewsets.ModelViewSet):
    queryset = InvoiceItem.objects.all()
    serializer_class = InvoiceItemSerializer

    @action(detail=True, methods=['put', 'patch'])
    def update_invoice_item(self, request, pk=None):
        invoice_item = self.get_object()
        serializer = self.get_serializer(invoice_item, data=request.data, partial=(request.method == 'PATCH'))
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    @action(detail=True, methods=['delete'])
    def delete_invoice_item(self, request, pk=None):
        invoice_item = self.get_object()
        invoice_item.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
