Backend scaffold for the web-umkm project.

Setup (Windows - PowerShell):

1. Create virtual environment and install dependencies

   cd backend
   python -m venv venv
   .\venv\Scripts\Activate.ps1
   python -m pip install -r requirements.txt

2. Run migrations

   .\venv\Scripts\python.exe manage.py makemigrations
   .\venv\Scripts\python.exe manage.py migrate

3. Create superuser (optional)

   .\venv\Scripts\python.exe manage.py createsuperuser

4. Run server

   .\venv\Scripts\python.exe manage.py runserver

Notes:

- This is a minimal scaffold. Update SECRET_KEY in `backend/settings.py` before production.
- CORS is configured for Vite dev server at http://localhost:5173
