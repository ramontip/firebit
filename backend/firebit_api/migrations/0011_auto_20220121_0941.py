# Generated by Django 3.2.10 on 2022-01-21 08:41

from django.db import migrations, models
import django.utils.timezone


class Migration(migrations.Migration):

    dependencies = [
        ('firebit_api', '0010_alter_userdetails_auth_user'),
    ]

    operations = [
        migrations.AddField(
            model_name='userdetails',
            name='created_at',
            field=models.DateTimeField(auto_now_add=True, default=django.utils.timezone.now),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name='userdetails',
            name='updated_at',
            field=models.DateTimeField(auto_now=True),
        ),
    ]
