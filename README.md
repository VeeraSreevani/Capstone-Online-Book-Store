# Backend API Template

## Git Repo link for backend:
https://github.com/VeeraSreevani/Capstone-Online-Book-Store

## Jira link to track the Project 
https://sreevaniveera.atlassian.net/jira/software/projects/BOOK/boards/2

## Instructions

1. Clone the repo `git clone <repo-url> <new-project-name>`
2. cd into your new project folder and run `npm i`
3. Create a new `.env` file and add the `MONGODB_URI`
4. Run the app with: `npm run dev`

## About the Project

This backend API is designed for an online book store. It provides functionalities to manage books, users, and users actions on webpage like wishlist management, cart management. The API enables features such as:

- Adding, creating, updating, and deleting books.
- As an Admin can manage users, books and in the future implement orders.
- User authentication and authorization for furthur implement.
- Browsing and searching for books.
- Managing user orders and purchase history.

## Technologies Used

- **Node.js**: Backend runtime environment.
- **Express.js**: Web framework for building RESTful APIs.
- **MongoDB**: NoSQL database for storing data.
- **Mongoose**: ODM for MongoDB.
- **JWT**: For secure user authentication for User credencials in future.

## API: 
Using GoogleBooksApi for fetching the books data

## Future Enhancements

- Adding support for payment gateways.
- Enhancing order tracking and notifications.
- Building a review/recommendation system for users.


## BOOKS:
# GET: https://www.googleapis.com/books/v1/volumes?q=harry+potter
# POST : http://localhost:4000/api/books
