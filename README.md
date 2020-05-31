# Alkimii challenge

This repo contains the solution to the following challenge proposed by John McAuley from Alkimii:

> The app should have the following functionality:
>
> Enable the user to:
>
> Manage Sessions:
>
> - Login/Logout
>
> CRUD Users
>
> - Set the role (admin/team_member)
> - Validate Users - no empty fields
>
> CRUD a note using AJAX.
>
> - When a note is added/updated/deleted then the user should receive a flash message.
> - Validate the notes (no empty fields allowed)
>
> How you go about the app is up to. You can add extra functionality or add a test suite if you like.

## Features

The app has the following functionality:

- Session management
- Admins can create, edit and remove any user or note
- Both users and notes creation has validations
- Users can edit or remove their own user
- Users cannot give themselves admin rights
- Users can create notes
- Users can edit or remove their own notes
- Admin can edit or remove any notes
- Notes index page is updated in realtime using ActionCable
- A notification will appear if another user creates a new note
- A notification will appear if an admin updates or removed one of your notes

## Installation

```
git clone https://github.com/tngranados/alkimii-tngranados.git
cd alkimii-tngranados
bundle install
yarn install
bundle exec rails db:migrate
bundle exec rails db:seed
```

## Running the app

```
foreman start
```

The app should now be available in [http://localhost:3000/](http://localhost:3000/notes).

If `bundle exec rails db:seed` has been executed, a default admin user is available with the following parameters:

- Email: admin@admin.com
- Password: password
