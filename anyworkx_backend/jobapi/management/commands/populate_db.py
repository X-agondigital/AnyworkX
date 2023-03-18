from django.core.management.base import BaseCommand
from faker import Faker

from ...models import Jobs


class Command(BaseCommand):
    help = 'Populate the database with fake data'

    def add_arguments(self, parser):
        parser.add_argument('count', type=int, help='Number of fake records to create')

    def handle(self, *args, **options):
        count = options['count']

        fake = Faker()

        for _ in range(count):
            job = Jobs(
                job_title=fake.job(),
                job_description=fake.job(),
                position=fake.job(),
                job_location=fake.job(),
                job_requirements_title=fake.job(),
                job_requirements_body=fake.job(),
                we_offer=fake.job()
            )
            job.save()

        self.stdout.write(self.style.SUCCESS(f'Successfully created {count} fake Job records.'))
