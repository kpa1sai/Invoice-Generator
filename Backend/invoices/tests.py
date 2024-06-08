from django.urls import reverse
from rest_framework import status
from rest_framework.test import APITestCase
from .models import Supplier, Customer, Address, Invoice, InvoiceItem

class CRUDTestCase(APITestCase):

    def setUp(self):
        # Create initial data for testing
        self.supplier = Supplier.objects.create(supplier_name="Test Supplier")
        self.customer = Customer.objects.create(supplier = self.supplier, customer_name="Test Customer", customer_type = "Individual")
        self.address = Address.objects.create(email= 'test@test.com', primary_mobile= '374-324-4234', address_line_1="123 Test St", city="Test City", state="TS", country = 'US',zip_code="12345")
        self.invoice = Invoice.objects.create(invoice_number = 12453, customer=self.customer, total_price=100.0, payment_due_date="2024-07-27")
        self.invoice_item = InvoiceItem.objects.create(invoice=self.invoice, item_description="Test Item", quantity=1, price=100.0, tax_rate = 5)

    # Helper method to get detail URL
    def get_detail_url(self, model_name, pk):
        return reverse(f'{model_name}-detail', kwargs={'pk': pk})

    # Helper method to get list URL
    def get_list_url(self, model_name):
        return reverse(f'{model_name}-list')

    # Test cases for Supplier
    def test_create_supplier(self):
        url = self.get_list_url('supplier')
        data = {'supplier_name': 'New Supplier', 'username': 'uname_supplier'}
        response = self.client.post(url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(Supplier.objects.count(), 2)

    def test_read_supplier(self):
        url = self.get_detail_url('supplier', self.supplier.pk)
        response = self.client.get(url, format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data['supplier_name'], self.supplier.supplier_name)

    def test_update_supplier(self):
        url = self.get_detail_url('supplier', self.supplier.pk)
        data = {'username': 'Updated username', 'supplier_name': 'Updated Supplier'}
        response = self.client.put(url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.supplier.refresh_from_db()
        self.assertEqual(self.supplier.supplier_name, 'Updated Supplier')

    def test_delete_supplier(self):
        url = self.get_detail_url('supplier', self.supplier.pk)
        response = self.client.delete(url, format='json')
        self.assertEqual(response.status_code, status.HTTP_204_NO_CONTENT)
        self.assertEqual(Supplier.objects.count(), 0)

    # Test cases for Customer
    def test_create_customer(self):
        url = self.get_list_url('customer')
        data = {'supplier': self.supplier.pk, 'customer_name': 'New Customer'}
        response = self.client.post(url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(Customer.objects.count(), 2)

    def test_read_customer(self):
        url = self.get_detail_url('customer', self.customer.pk)
        response = self.client.get(url, format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data['customer_name'], self.customer.customer_name)

    def test_update_customer(self):
        url = self.get_detail_url('customer', self.customer.pk)
        data = {'customer_name': 'Updated Customer', 'supplier': self.supplier.pk}
        response = self.client.put(url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.customer.refresh_from_db()
        self.assertEqual(self.customer.customer_name, 'Updated Customer')

    def test_delete_customer(self):
        url = self.get_detail_url('customer', self.customer.pk)
        response = self.client.delete(url, format='json')
        self.assertEqual(response.status_code, status.HTTP_204_NO_CONTENT)
        self.assertEqual(Customer.objects.count(), 0)

    # Test cases for Address
    def test_create_address(self):
        url = self.get_list_url('address')
        data = {'email': 'korlapatipavan@gmail.com', 'primary_mobile': '324-256-3434', 'address_line_1': '456 New St', 'city': 'New City', 'state': 'NC', 'country': 'US', 'zip_code': '67890'}
        response = self.client.post(url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(Address.objects.count(), 2)

    def test_read_address(self):
        url = self.get_detail_url('address', self.address.pk)
        response = self.client.get(url, format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data['address_line_1'], self.address.address_line_1)

    def test_update_address(self):
        url = self.get_detail_url('address', self.address.pk)
        data = {'address_line_1': '789 Updated St','email': 'korlapatipavan@gmail.com', 'primary_mobile': '324-256-3434', 'city': 'New City', 'state': 'NC', 'country': 'US', 'zip_code': '67890'}
        response = self.client.put(url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.address.refresh_from_db()
        self.assertEqual(self.address.address_line_1, '789 Updated St')

    def test_delete_address(self):
        url = self.get_detail_url('address', self.address.pk)
        response = self.client.delete(url, format='json')
        self.assertEqual(response.status_code, status.HTTP_204_NO_CONTENT)
        self.assertEqual(Address.objects.count(), 0)

    # Test cases for Invoice
    def test_create_invoice(self):
        url = self.get_list_url('invoice')
        data = {'invoice_number': 302, 'customer': self.customer.pk, 'total_price': 200.0, 'payment_due_date': '2024-07-09'}
        response = self.client.post(url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(Invoice.objects.count(), 2)

    def test_read_invoice(self):
        url = self.get_detail_url('invoice', self.invoice.pk)
        response = self.client.get(url, format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data['total_price'], self.invoice.total_price)

    def test_update_invoice(self):
        url = self.get_detail_url('invoice', self.invoice.pk)
        data = {'total_price': 300.0, 'invoice_number': self.invoice.pk, 'payment_due_date': '2024-09-27', 'customer': self.customer.pk}
        response = self.client.put(url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.invoice.refresh_from_db()
        self.assertEqual(self.invoice.total_price, 300.0)

    def test_delete_invoice(self):
        url = self.get_detail_url('invoice', self.invoice.pk)
        response = self.client.delete(url, format='json')
        self.assertEqual(response.status_code, status.HTTP_204_NO_CONTENT)
        self.assertEqual(Invoice.objects.count(), 0)

    # Test cases for InvoiceItem
    def test_create_invoice_item(self):
        url = self.get_list_url('invoiceitem')
        data = {'invoice': self.invoice.pk, 'item_name': 'New item', 'item_description': 'New Item', 'quantity': 2, 'price': 50.0, 'tax_rate': 4.5}
        response = self.client.post(url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(InvoiceItem.objects.count(), 2)

    def test_read_invoice_item(self):
        url = self.get_detail_url('invoiceitem', self.invoice_item.pk)
        response = self.client.get(url, format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data['item_description'], self.invoice_item.item_description)

    def test_update_invoice_item(self):
        url = self.get_detail_url('invoiceitem', self.invoice_item.pk)
        data = {'invoice': self.invoice.pk, 'item_description': 'Updated Item', 'item_name': 'Updated name', 'quantity': 3,'tax_rate': 5.3, 'price': 60.0}
        response = self.client.put(url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.invoice_item.refresh_from_db()
        self.assertEqual(self.invoice_item.item_description, 'Updated Item')

    def test_delete_invoice_item(self):
        url = self.get_detail_url('invoiceitem', self.invoice_item.pk)
        response = self.client.delete(url, format='json')
        self.assertEqual(response.status_code, status.HTTP_204_NO_CONTENT)
        self.assertEqual(InvoiceItem.objects.count(), 0)
