from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import SupplierViewSet, CustomerViewSet, AddressViewSet, InvoiceViewSet, InvoiceItemViewSet

from django.urls import path
from . import views

router = DefaultRouter()
router.register(r'suppliers', SupplierViewSet)
router.register(r'customers', CustomerViewSet)
router.register(r'addresses', AddressViewSet)
router.register(r'invoices', InvoiceViewSet)
router.register(r'invoice-items', InvoiceItemViewSet)

urlpatterns = [
    path('', include(router.urls)),
    path('generate_invoice_pdf/<int:invoice_id>/', views.generate_invoice_pdf, name='generate_invoice_pdf'),
]
