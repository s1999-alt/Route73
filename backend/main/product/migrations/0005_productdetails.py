# Generated by Django 5.1.6 on 2025-04-27 09:14

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('product', '0004_productimage'),
    ]

    operations = [
        migrations.CreateModel(
            name='ProductDetails',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('product_details', models.TextField(blank=True, null=True)),
                ('size_and_fit', models.TextField(blank=True, null=True)),
                ('material_and_care', models.TextField(blank=True, null=True)),
                ('specifications', models.JSONField(blank=True, null=True)),
                ('product', models.OneToOneField(on_delete=django.db.models.deletion.CASCADE, related_name='detail', to='product.product')),
            ],
        ),
    ]
