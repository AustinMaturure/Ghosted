# Ghosted | E-Commerce Clothing Brand

This is a full-stack e-commerce web application for a clothing brand built with React for the front end and Django for the back end.

## Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Installation](#installation)
- [Usage](#usage)
- [Project Structure](#project-structure)
- [License](#license)

## Features

- Product listing with categories and filters
- Shopping cart and checkout
- Admin dashboard for product and order management
- Responsive design

## Tech Stack

**Frontend:**
- React
- Vite
- Redux (for state management)
- Axios (for API calls)
- CSS Modules / Styled Components

**Backend:**
- Django
- Django REST Framework
- Django Allauth (for authentication)

## Installation

### Prerequisites

- Python (>=3.8)
- Node.js (>=14.x)
- npm or Yarn

### Backend Setup

1. Clone the repository:

    ```sh
    git clone https://github.com/AustinMaturure/Ghosted.git
    cd Ghosted/backend
    ```

2. Create a virtual environment and activate it:

    ```sh
    python -m venv env
    source env/bin/activate  # On Windows use `env\Scripts\activate`
    ```

3. Install the dependencies:

    ```sh
    pip install -r requirements.txt
    ```

4. Set up the database:

    ```sh
    python manage.py makemigrations
    python manage.py migrate
    ```

5. Create a superuser:

    ```sh
    python manage.py createsuperuser
    ```

6. Start the development server:

    ```sh
    python manage.py runserver
    ```

### Frontend Setup

1. Navigate to the `frontend` directory:

    ```sh
    cd ../frontend
    ```

2. Install the dependencies:

    ```sh
    npm install  # Or `yarn install`
    ```

3. Start the development server:

    ```sh
    npm run dev  # Or `yarn dev`
    ```

## Usage

1. Access the backend API at `http://127.0.0.1:8000/`.
2. Access the frontend at `http://127.0.0.1:5173/`.
3. Use the admin dashboard at `http://127.0.0.1:8000/admin/` to manage products.

## Project Structure

```plaintext
Ghosted/
├── Backend/
│   ├── manage.py
│   ├── base/
│   │   ├── __init__.py
│   │   ├── settings.py
│   │   ├── urls.py
│   │   └── wsgi.py
│   ├── ghosted/
│   │   ├── __init__.py
│   │   ├── admin.py
│   │   ├── models.py
│   │   ├── serializers.py
│   │   └── views.py
│   ├── api/
│   │   ├── __init__.py
│   │   ├── urls.py
│   │   ├── serializers.py
│   │   └── views.py
│   ├── static/
│   └── templates/
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── assets/
│   │   ├── components/
│   │   ├── css/
│   │   └── main.jsx
│   ├── .gitignore
│   ├── index.html
│   ├── package.json
│   └── vite.config.js
├── .gitignore
└── README.md 
```
## License
This project is licensed under the MIT License.