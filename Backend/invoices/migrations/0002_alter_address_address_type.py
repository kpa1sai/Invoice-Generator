# Generated by Django 5.0.6 on 2024-06-08 19:54

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('invoices', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='address',
            name='address_type',
            field=models.CharField(default='Individual', max_length=50),
        ),
    ]