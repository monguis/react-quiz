# React Quiz
#### by Juan Carlos Castellanos Navarro

This app is a React based Quiz that checks your answers from server and saves your progress in localStorage.

# Get Started
### Setup
You must have [node](https://nodejs.org/en/download/) installed.

### Install 
Make this directory as your working directory in your terminal. Then install dependencies with the command `npm install`. 

### Start App
Run the command `npm start` in the terminal. The Web App should be accessible at `http://localhost:3000` and `http://<your-ip>:3000` and server is accessible through port `http://localhost:3001`.

## API Endpoints

### `GET http://localhost:3001/api/questions`
This returns an array that contains a set of objects that represent the questions to ask the user.

### `POST http://localhost:3001/api/answer`
This expects an object with an Id, and an answer. Looks through the questions to check if the sent response has the correct answer.

# Web App Functionality

## Home page

The Home page renders one or two buttons depending on if there was data saved.

### Navigation
* No Data saved.
    You'll see a button that creates a new session and redirects you to the quiz page.

* Data saved.
    There are two buttons
    * A button that will recover the last session (saved in localStorage).
    * Another button that allows you to start over.

## Quiz Page

This page displays 4 option buttons and one answer button. You must select an option before you can click the answer button:

### Navigation

* Option buttons: Allows you to select an option.
* Answer button: Sends the answer to server and allows you to move through the quiz.

# Built with
* React.js
* express.js (backend)
* HTML
* CSS
* Bootstrap (React and Vanilla CSS)
* Font Awesome for Icons
* Google Fonts
* Axios (Http Requests)

# Authors

* **Juan Carlos Castellanos Navarro** - [monguis](https://github.com/monguis)

See also the list of contributors who participated in this project.