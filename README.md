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
  <a href="https://www.dropbox.com/s/2wr57ehgqwck8si/G6_Project_Proposal.pdf?dl=0">Proposal</a> •
  <a href="#team">Team</a> •
  <a href="#features">Features</a> •
  <a href="#instructions">Instructions</a>
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
| Frontend              | Terms of Service and About Us     | :white_check_mark:  |
| Both                  | Admin dashboard with stats        | :white_check_mark:  |
| Both                  | Search multiple models            | :white_check_mark:  |
| Both                  | Social networking functionality   | :white_check_mark:  |

# Instructions

Once you have created a local copy of this repository, you may follow these instructions to set up the backend and frontend of the project. 

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

---
> FH Joanneum, Information Management (IMA19), SWENGS