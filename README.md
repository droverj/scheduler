# Interview Scheduler

## Summary
Interview Scheduler is a single-page application (SPA). This app is designed to allow students to book technical interviews with mentors between 12 PM and 5 PM, Monday to Friday. After an interview has been booked, the user then has the option to either edit or delete the appointment. Users may select any day of the week to view the current schedule for that day.

The front end of the project is built with React and makes requests to an API with a WebSocket server to build a real-time experience.

## Setup

Install dependencies with `npm install`.

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

## App Preview
!["App-Preview"](https://github.com/droverj/scheduler/blob/master/docs/app-preview.png?raw=true)

## Days Menu
!["Day-Menu"](https://github.com/droverj/scheduler/blob/master/docs/day-menu.png?raw=true)

## Form Preview
The user can fill out a form to book an interview.
!["Form-Preview"](https://github.com/droverj/scheduler/blob/master/docs/form.png?raw=true)

Saved entries can then be edited or deleted.
!["Edit-form"](https://github.com/droverj/scheduler/blob/master/docs/edit.png?raw=true)

Users are prompted with a confirmation message prior to deleting their appointment.
!["Delete-confirmation"](https://github.com/droverj/scheduler/blob/master/docs/confirmation.png?raw=true)

Saving and deleting icons are shown to the user for a smoother transition.
!["Transition"](https://github.com/droverj/scheduler/blob/master/docs/transition.png?raw=true)




