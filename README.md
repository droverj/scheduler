# Interview Scheduler

## Summary
Interview Scheduler is a single-page application designed to allow students to book technical interviews with mentors between 12 PM and 5 PM, Monday to Friday. After an interview has been booked, the user then has the option to either edit or delete the appointment. Users may select any day of the week to view the current schedule for that day.

The front end of the project is built with React and makes requests to an API with a WebSocket server to build a real-time experience.

## Setup

Install dependencies with `npm install`.

## API Setup
Fork and clone the [scheduler-api](https://github.com/lighthouse-labs/scheduler-api) into a new directory.
Follow the README.md instructions in the repository, including:
- installing dependencies
- creating the database
- creating a .env.development file in the root directory
- seeding the database
- running the server

## Note:
The client runs on port 8000, and the API server runs on port 8001.

## Running Webpack Development Server

```sh
npm start
```

## Running Jest Test Framework

```sh
npm test
```

## Running Storybook Visual Testbed

```sh
npm run storybook
```
## Dependencies
- axios ^0.20.0
- classnames ^2.2.6
- normalize.css ^8.0.1
- react ^16.9.0
- react-dom ^16.9.0
- react-scripts 3.4.4

## App Preview
!["App-Preview"](https://github.com/droverj/scheduler/blob/master/docs/app-preview.png?raw=true)

## Days Menu
!["Day-Menu"](https://github.com/droverj/scheduler/blob/master/docs/day-menu.png?raw=true)

## Form Preview
The user can fill out a form to book an interview.
!["Form-Preview"](https://github.com/droverj/scheduler/blob/master/docs/form.png?raw=true)

Saved entries can then be edited or deleted.
!["Edit-form"](https://github.com/droverj/scheduler/blob/master/docs/show.png?raw=true)

Users are prompted with a confirmation message prior to deleting their appointment.
!["Delete-confirmation"](https://github.com/droverj/scheduler/blob/master/docs/confirmation.png?raw=true)

Saving and deleting icons are shown to the user for a smoother transition.
!["Transition"](https://github.com/droverj/scheduler/blob/master/docs/transition.png?raw=true)




