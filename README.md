# Inspirational Quote

**Inspirational Quote** is a web application built using a Node.js REST API server and a Vanilla JavaScript client 😃. This application utilizes an SQLite database to enable users to access a variety of features, including retrieving random quotes, searching for quotes by author name or keywords, listing all authors, and fetching quotes by a specific author. Moreover, the application is deployed on Heroku with a robust CI/CD pipeline.

Please visit [here](https://www.huiruyang.works/projects/inspirational-quotes) for more information about the project.

## Key Features

- **Random Quotes**: Get inspired by fetching random quotes.
- **Quotes by Author**: Discover quotes by a randomly selected author.
- **Search by Author**: Easily find quotes by searching for an author's name.
- **Keyword Search**: Look for quotes using specific keywords.
- **Author Listing**: Get a comprehensive list of all authors available.

## Technologies Used

- **Node.js**: The server is powered by Node.js, making it fast and efficient.
- **Express.js**: Express.js is employed to create the REST API server, simplifying routing and middleware setup.
- **Vanilla JavaScript**: The client-side code is written in pure JavaScript to ensure a lightweight and efficient user experience.
- **Sequelize ORM**: Sequelize is used for database operations, providing an easy-to-use ORM for working with SQLite.
- **SQLite Database**: SQLite is used as the application's database, offering a lightweight and serverless storage solution.
- **Swagger**: The API documentation is generated and presented using Swagger.

## Installation

1. Clone this repository
2. Install dependencies by running `npm install`
3. Run the application by running `npm run dev` for development or `npm start` for production
4. Access the application at http://localhost:3000
5. Run tests by running `npm test`

## API Documentation

The API documentation for Inspirational Quote is built using Swagger and is accessible at [Inspirational Quote API Documentation](https://inspirational-quotes-16ab0254ba13.herokuapp.com/api-docs/). Here, you'll find detailed information on how to interact with the API and make the most of its features.
