# School Diary App

School Diary App is a full-stack demo application for managing basic school diary features such as authentication, messages, timetables, grades, and user roles.

The project was created as a backend-focused portfolio application. The main part of the project is a Java and Spring Boot REST API demonstrating JWT-based authentication, role-based access control, JPA entities, seed data, and layered backend architecture.

A React, TypeScript, and Material UI frontend is included as a functional single-page client for presenting, testing, and interacting with the API features.

## Features

- User authentication with access and refresh tokens
- Role-based access for admin, teacher, and student users
- Messaging system with inbox, sent messages, filtering, reading, archiving, and deleting
- Timetable view for school classes
- Student grade overview with semester and annual averages
- Teacher view for adding grades to students
- Seed data for quick local testing

## Tech Stack

### Backend

- Java 21
- Spring Boot
- Spring Web
- Spring Security
- Spring Data JPA
- MySQL
- JWT
- Maven
- Lombok

### Frontend

- React
- TypeScript
- Vite
- Material UI
- Tailwind CSS
- Axios
- i18next

### Testing

- JUnit 5
- Mockito

## Getting Started

### Requirements

Before running the project locally, make sure you have installed:

- Java 21
- Node.js
- npm
- MySQL

### Setup

- [Frontend](/Frontend/README.md)
- [Backend](/Backend/README.md)