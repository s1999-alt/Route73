# Generated by Django 5.1.6 on 2025-04-10 09:04

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('product', '0001_initial'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='productcategory',
            name='product_gender',
        ),
        migrations.DeleteModel(
            name='ProductGender',
        ),
    ]
