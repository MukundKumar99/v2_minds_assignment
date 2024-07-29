# ReactJS Assignment - Notes Application

## Objectives

The application allow users to Create, View, Edit and Delete notes.

### Tech Stack

Use ReactJs, React Router, CSS Flexbox and Media Queries for responsiveness, Github for version control and Netlify for hosting.

### Must Have

ReactJs, Git, Netlify

### Routes

| Page        | Route      | Path        |
| ----------- | ---------- | ----------- |
| Login       | Login      | /login      |
| Register    | Register   | /register   |
| All Notes   | AllNotes   | /           |
| Create Note | CreateNote | /createNote |

### Routes Description

#### Login Screen

> - On opening the app, user will be redirected to Login screen.
> - Registered user can login to the app using Username/ Email and password.
> - On successfull registration, user will be redirected to All Notes Screen.
> - New user can click on Sign Up link which will redirect him to register page. User can enter New Login Credentials to create a new account.

#### Register Screen

> - User can enter New Login Credentials (Username/ Email, Password) to create a new account.
> - If already registered user tries to register again, an error message will be displayed.
> - On successfull registration, user will be rediredted to Login Screen.

#### All Notes Screen

> - This screen will show all the created notes.
> - On clicking the note, a popup will be opened which will have an option to change background color, pin/unpin, edit and delete that note.
> - A New Note button at the bottom of screen which redirects user to create note screen.

### Create Post Screen

> - Allows user to create a new note.
> - User can enter Title, Description and select background color, pin or unpin the note.
> - After adding new note, user will be automatically redirected to all notes screen.

### Github Repository Link

https://github.com/MukundKumar99/v2_minds_assignment

### Set Up Instructions for running project locally

> - Run "git clone https://github.com/MukundKumar99/v2_minds_assignment" in the terminal.
> - Run "npm install" to install all dependencies.
> - Run "npm start" to run the app on local server.

## Font-families used

> - Roboto

### Project Deployment Link

https://mukundnotes.netlify.app
