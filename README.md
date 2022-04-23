<h1 align="center">
    <img src="frontend/src/assets/firebit-logo-full.svg" height="62px">
</h1>

<p align="center">
<b>Real recommendations by real friends.</b>
</p>

<p align="center">
Firebit is a Django and Angular based web application, where users can share and browse meaningful recommendations or experiences from their most trusted sources: their friends.
</p>

<p align="center">
  <a href="#team">Team</a> •
  <a href="#features">Features</a> •
  <a href="#instructions">Instructions</a> •
  <a href="#screenshots">Screenshots</a>
</p>

# Team

- <a href="https://github.com/xeeija">Bastian Lang</a>
- <a href="https://github.com/rolkef">Christopher Rolke</a>
- <a href="https://github.com/DavidSeb2020">David Sebernegg</a>
- <a href="https://github.com/ramontip">Ramon Tippl</a></b>


# Features

Firebit enables users to share experiences as “bits”. A bit consists of a title, description, category and multiple images. Users may like, bookmark or comment these bits. In addition, users can add new friends and customize their profile page with a thumbnail and about me section. 

The search functionality enables users to find new friends or lookup bits by title or hashtags. Moreover, the activities page gives an overview of your interactions on the platform. 

Users can sign up and login on Firebit. If they forgot their password, they can easily reset it by using the email password reset. Administrators may delete inappropriate bits or comments and may update user information.

## Required Features

| Type                  | Feature                           | Status              |
|-----------------------|-----------------------------------|:-------------------:|
| Backend               | RESTful API                       | :white_check_mark:  |
| Backend               | Authentication system             | :white_check_mark:  |
| Backend               | Multiple models                   | :white_check_mark:  |
| Backend               | Database                          | :white_check_mark:  |
| Backend               | Authorization system              | :white_check_mark:  |
| Frontend              | Interaction with API              | :white_check_mark:  |
| Frontend              | Authentication (register & login) | :white_check_mark:  |
| Frontend              | Authorization for multiple roles  | :white_check_mark:  |
| Frontend              | CRUD functionality                | :white_check_mark:  |
| Frontend              | Form validation                   | :white_check_mark:  |
| Frontend              | Filter data                       | :white_check_mark:  |
| Frontend              | Multiple components               | :white_check_mark:  |
| Frontend              | Multiple services                 | :white_check_mark:  |
| Frontend              | Angular Router                    | :white_check_mark:  |

## Additional Features
| Type                  |              Feature              | Status              |
|-----------------------|-----------------------------------|:-------------------:|
| Backend               | File upload and handling          | :white_check_mark:  |
| Backend               | Password reset with email support | :white_check_mark:  |
| Backend               | Configparser for SMTP data        | :white_check_mark:  |
| Backend               | Nested serializers                | :white_check_mark:  |
| Frontend              | Custom UI, design and branding    | :white_check_mark:  |
| Frontend              | Dark mode                         | :white_check_mark:  |
| Frontend              | Terms of Service and About Us     | :white_check_mark:  |
| Both                  | Admin dashboard with stats        | :white_check_mark:  |
| Both                  | Search multiple models            | :white_check_mark:  |
| Both                  | Social networking functionality   | :white_check_mark:  |

# Instructions

Once you have created a local copy of the [latest release](https://github.com/ramontip/firebit/releases/latest), you may follow these instructions to set up the backend and frontend of the project. 

## Backend

### Requirements

- Python 3.10
- PIP
- IDE (e.g. IntelliJ IDEA)

### Installation

1. Configure IDE properly - plugins, project structure, SDK, VENV, module
2. Install requirements
````
pip install -r backend/requirements.txt
````
3. Migrate the database<sup>1</sup>
````
python manage.py migrate
````
4. Create superuser<sup>1</sup> (firstname and lastname should be set in the user profile later)
````
python manage.py createsuperuser
````
5. Prepopulate the database<sup>1</sup>
````
python manage.py loaddata categories.json friendship_status.json
````
6. Create mock data<sup>1,2</sup> (optional)
````
python manage.py loaddata auth_users.json bits.json bookmarks.json comments.json friendships.json likes.json
````
7. Run backend server<sup>1</sup>
````
python manage.py runserver
````
8. Go to http://localhost:8000 to find the API endpoints

<sup>1</sup> The `python` command may vary on your system - e.g. `py` on Windows, `python3` on MacOS when using brew

<sup>2</sup> You may create some mock data (e.g. other users, bits and friendships) that is connected with the superuser account.

### Configure Mailing

To use the password reset functionality with real emails, you need to set your own SMTP configuration. If no SMTP configuration is found, the password reset email is rendered in the python console.
1. Navigate to `backend/config`
2. Rename `smtp.ini.example` to `smpt.ini`
3. Insert your own SMTP configuration into `smpt.ini`


## Frontend

### Requirements

- NPM
- Angular 12
- IDE (e.g. IntelliJ IDEA)

### Installation

1. Configure IDE properly (e.g. install plugins)
2. Navigate to `frontend` and run
```` 
npm install
````
3. Run frontend server
````
ng serve
````
4. Go to http://localhost:4200 to find the web application (you may login using your superuser credentials)

# Screenshots

![home](https://user-images.githubusercontent.com/50173436/164892814-2cecf317-bb46-45cf-b80a-66c41baf61e1.png)

![bitmap](https://user-images.githubusercontent.com/50173436/164892825-97d9b240-22c0-4076-a7ad-660847a2862e.png)

![comment](https://user-images.githubusercontent.com/50173436/164892837-ad33a5dc-14dd-462f-8b69-ec7c0c30dd75.png)

![profile](https://user-images.githubusercontent.com/50173436/164892838-e2eb2d07-56c1-4cef-a51d-ecd294527258.png)

![profile-other](https://user-images.githubusercontent.com/50173436/164892840-6717be4b-b6ab-4b44-8094-abe123381798.png)

![friends](https://user-images.githubusercontent.com/50173436/164892835-cd9272dc-6959-47a2-9651-792a2034c0ee.png)

![activities](https://user-images.githubusercontent.com/50173436/164892831-a94bc5b8-1531-4111-9fbb-c112f14463b4.png)

![admin](https://user-images.githubusercontent.com/50173436/164892834-99bd81bb-9525-4b69-89d5-67cec4ba3a1b.png)

---
> FH Joanneum, Information Management (IMA19), Software Engineering Selective