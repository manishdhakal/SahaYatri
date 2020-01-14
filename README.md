# HACK-A-WEEK

## Django Rest API with Reactjs

## Backend

### Install all of the packages

- Install virtualenv package by using pip

```sh
cd backend
virtualenv  venv
source venv/bin/activate
pip install -r requirement.txt
```
In backend > backend > settings.py, add the line

ALLOWED_HOSTS = [

    'localhost',
    '%{IP Address of your computer}',
    '127.0.0.1'.
]

### Run the Django Server
```sh
python manage.py runserver 0.0.0.0.8000
```

## Frontend (Preferrably linux environment)

### Install all of the packages
```sh
cd frontend
npm install
```
In frontend > src > djangoURL.js, make the code:
```sh
export default '%{IP Address of your computer + :8000}'
```
### Script to run for debug
```sh  
npm  start
```
