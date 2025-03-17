# LaneControl
## Description
This application is designed to manage a network of bowling alleys, providing users with a seamless experience for booking lanes and ordering food.
## Key Functionalities:
- User Registration & Authentication
- Browsing Bowling Alleys & Viewing Available Lanes
- Making Lane Reservations & Managing Existing Bookings
- Ordering Items from the Alley Menu for a Reservation
- Admin Panel for Alley Management
## Technology Stack
### Backend (C# + ASP.NET Core)
- ASP.NET Core for API development
- Entity Framework Core for database interactions
- SQL Server for data storage
- JWT Authentication for secure login
### Frontend (React + TypeScript)
- React for UI development
- React Router for navigation
- React Hook Form & Yup for form validation
- Tailwind CSS for styling
## Deployment
In order to run backend of the app open file `LaneControl/LaneControl-backend/api/appsetting.json` and replace placeholder values in **DefaultConnection** and **SigningKey** with your own data.
Then go to directory `LaneControl/LaneControl-backend/api` and run:
```sh
dotnet watch run
```
In order to run frontend of the app go to directory `LaneControl/LaneControl-frontend`.
Then run:
```sh
npm install
npm start
```
