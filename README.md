# Invoice Manager
A full-stack invoice management application built with React, Node.js/Express, and PostgreSQL. Includes secure authentication, role-based access, invoice CRUD operations, filtering, and pagination.

## Features
User authentication (Signup, Login, Logout)

Role-based access control (admin/user)

JWT-based session with secure HTTP-only cookies

Password hashing using Argon2

Create, Read, Update, Delete invoices

Filter invoices by status (Draft, Pending, Paid)

Paginated listing of invoices

Responsive UI with light/dark theme toggle

Client-side & server-side validation

## Tech Stack
### Frontend
React + React Router

TailwindCSS + DaisyUI

React Hook Form for form handling

Axios for API communication

### Backend
Express.js

PostgreSQL (via pg-promise or node-postgres)

JWT, Argon2

Express-validator

Custom error handling

