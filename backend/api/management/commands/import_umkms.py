import json
from django.core.management.base import BaseCommand
from django.conf import settings


class Command(BaseCommand):
    help = 'Import UMKM data from fixtures/umkms_seed.json'

    def handle(self, *args, **options):
        from api.models import UMKM
        fixture_path = settings.BASE_DIR / 'api' / 'fixtures' / 'umkms_seed.json'
        self.stdout.write(f'Loading fixture: {fixture_path}')
        with open(fixture_path, 'r', encoding='utf-8') as f:
            data = json.load(f)

        created = 0
        updated = 0
        for item in data:
            name = item.get('name')
            category = item.get('category', 'food')
            description = item.get('description', '')
            address = item.get('address', '')
            phone = item.get('phone', '')
            email = item.get('email', '')
            images = item.get('images', [])

            umkm, is_created = UMKM.objects.update_or_create(
                name=name,
                defaults={
                    'category': category,
                    'description': description,
                    'address': address,
                    'phone': phone,
                    'email': email,
                    'images': images,
                }
            )
            if is_created:
                created += 1
            else:
                updated += 1

        self.stdout.write(self.style.SUCCESS(f'Import complete. Created: {created}, Updated: {updated}'))
