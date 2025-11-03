from django.core.management.base import BaseCommand
from api.models import UMKM


class Command(BaseCommand):
    help = 'Seed example UMKM data'

    def handle(self, *args, **kwargs):
        examples = [
            {
                'name': 'Toko Kue Manis',
                'description': 'Toko kue lokal yang menjual aneka kue tradisional dan modern.',
                'address': 'Jl. Mawar No. 12, Jakarta',
                'phone': '+628123456789',
                'email': 'toko@example.com',
                'images': [
                    '/public/images/kue1.jpg',
                    '/public/images/kue2.jpg',
                ],
            },
            {
                'name': 'Kerajinan Bambu Sentosa',
                'description': 'Usaha kerajinan bambu yang memproduksi peralatan rumah tangga.',
                'address': 'Jl. Anyelir No. 3, Yogyakarta',
                'phone': '+628987654321',
                'email': 'bambu@example.com',
                'images': [],
            },
        ]

        created = 0
        for ex in examples:
            obj, created_flag = UMKM.objects.get_or_create(name=ex['name'], defaults=ex)
            if created_flag:
                created += 1

        self.stdout.write(self.style.SUCCESS(f"Seed complete. {created} records created."))
