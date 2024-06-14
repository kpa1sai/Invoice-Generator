from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import SupplierViewSet, CustomerViewSet, AddressViewSet, InvoiceViewSet, InvoiceItemViewSet
from django.urls import path
from . import views
from .views import SupplierViewSet, CustomerViewSet, AddressViewSet, InvoiceViewSet, InvoiceItemViewSet, UserCreate


router = DefaultRouter()
router.register(r'suppliers', SupplierViewSet)
router.register(r'customers', CustomerViewSet)
router.register(r'addresses', AddressViewSet)
router.register(r'invoices', InvoiceViewSet)
router.register(r'invoiceitems', InvoiceItemViewSet)

urlpatterns = [
    path('', include(router.urls)),
    path('register/', UserCreate.as_view(), name='user-create'),
]
