from django.db import models

class Address(models.Model):
    email = models.EmailField()
    primary_mobile = models.CharField(max_length=15)
    address_line_1 = models.CharField(max_length=255)
    address_line_2 = models.CharField(max_length=255, blank=True, null=True)
    address_type = models.CharField(max_length=50)
    postal_code = models.CharField(max_length=20)
    city = models.CharField(max_length=100)
    region = models.CharField(max_length=100)
    country = models.CharField(max_length=100)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

class Supplier(models.Model):
    username = models.CharField(max_length=255)
    address_id = models.ForeignKey(Address, on_delete=models.CASCADE, null= True)
    supplier_name = models.CharField(max_length=255)
    supplier_logo = models.ImageField(upload_to='logos/')
    created_at = models.DateTimeField(auto_now_add=True)

class Customer(models.Model):
    supplier = models.ForeignKey(Supplier, on_delete=models.CASCADE)
    address_id = models.ForeignKey(Address, on_delete=models.CASCADE, null= True)
    customer_name = models.CharField(max_length=255)
    type = models.CharField(max_length=50)
    time_zone = models.CharField(max_length=50)
    created_at = models.DateTimeField(auto_now_add=True)


class Invoice(models.Model):
    invoice_number = models.IntegerField(unique=True)
    invoice_date = models.DateField()
    payment_due_date = models.DateField()
    customer = models.ForeignKey(Customer, on_delete=models.CASCADE)
    total_price = models.FloatField()
    invoice_status = models.CharField(max_length=50)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

class InvoiceItem(models.Model):
    invoice = models.ForeignKey(Invoice, on_delete=models.CASCADE)
    item_name = models.CharField(max_length=255)
    item_description = models.TextField()
    quantity = models.IntegerField()
    price = models.FloatField()
    tax_rate = models.FloatField()
