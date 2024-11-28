# Clone this repo into your system then open your console and move into the project folder
# to install all the dependencies use this code
npm i
# after installing all the deopedencies run the code by using the following command
nodemon app.js

and test the routes with these test cases (use the routes in POSTMAN or Thunder client )
POST /api/users/register
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123",
  "role": "User"
}
POST /api/users/register
{
  "name": "Admin User",
  "email": "admin@example.com",
  "password": "adminpass",
  "role": "Admin"
}
POST /api/users/login
{
  "email": "john@example.com",
  "password": "password123"
}
POST /api/users/login
{
  "email": "admin@example.com",
  "password": "adminpass"
}

GET /api/users (get all users)
