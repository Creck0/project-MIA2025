from django.db import migrations


def remove_umkmimage_and_contenttype_permissions(apps, schema_editor):
    Permission = apps.get_model('auth', 'Permission')
    ContentType = apps.get_model('contenttypes', 'ContentType')

    # Remove permissions for api.umkmimage and delete its content type
    ct_umkmimage = ContentType.objects.filter(app_label='api', model='umkmimage').first()
    if ct_umkmimage:
        Permission.objects.filter(content_type=ct_umkmimage).delete()
        # remove the content type record so it no longer appears in admin lists
        ct_umkmimage.delete()

    # Remove permissions for contenttypes.contenttype (permission rows only)
    ct_contenttype = ContentType.objects.filter(app_label='contenttypes', model='contenttype').first()
    if ct_contenttype:
        Permission.objects.filter(content_type=ct_contenttype).delete()


def noop(apps, schema_editor):
    # No-op reverse migration
    pass


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0003_alter_umkmimage_options'),
        ('auth', '0012_alter_user_first_name_max_length'),
        ('contenttypes', '0002_remove_content_type_name'),
    ]

    operations = [
        migrations.RunPython(remove_umkmimage_and_contenttype_permissions, reverse_code=noop),
    ]
