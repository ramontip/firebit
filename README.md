<h1 align="center">
    <img src="frontend/src/assets/firebit-logo-full.svg" height="62px">
</h1>

<p align="center">
<b>Real recommendations by real friends.</b>
</p>

<p align="center">
Firebit is a Django and Angular powered web application, where users can share and browse meaningful recommendations or experiences from their mainly trusted source: their friends.
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

The search functionality enables users to find new friends or lookup bits, categories or hashtags. Moreover, the activities page gives an overview of recent interactions on the platform. 

Users can sign up and login on Firebit. If they forgot their password, they can easily reset it by using the email password reset. Administrators may delete inappropriate bits or comments and may update user information.


# Instructions

Once you have created a local copy of this repository, you may follow these instructions to set up the backend and frontend of the project. 

## Backend

### Requirements

- Python 3.10
- PIP
- IDE (e.g. IntelliJ IDEA)

### Installation

1. Configure IDE properly - plugins, project structure, SDK, VENV, module, manage.py path
2. Install requirements 
   - `pip install -r backend/requirements.txt`
3. Migrate the database
   - `python manage.py migrate`
4. Create superuser
   - `python manage.py createsuperuser`
5. Populate the database
   - Navigate to `backend/firebit_api/fixtures` and run:
   - `python manage.py loaddata auth_users.json categories.json bits.json bookmarks.json comments.json friendship_status.json friendships.json images.json likes.json user_thumbnails.json`
6. Run server
   - `python manage.py runserver`
7. Go to http://localhost:8000

To use the password reset functionality, you have to set your own SMTP configuration.
1. Navigate to `backend/config`
2. Rename `smtp.ini.example` to `smpt.ini`
3. Insert your own SMTP configuration


## Frontend

### Requirements

- NPM
- Angular 12
- IDE (e.g. IntelliJ IDEA)

### Installation

1. Configure IDE properly (e.g. install plugins)
2. Navigate to `frontend` and run `npm install`
3. Run server
    - `ng serve`
4. Go to http://localhost:4200

---
> FH Joanneum, Information Management (IMA19), SWENGS