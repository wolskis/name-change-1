# Name Change
## Features

- The user is able to log in and log out.
- The user can register themselves as a citizen.
- The user can provide their name through registration form that they wish to choose initially.
- The user can create new names when they are logged in.
- The user cannot delete or rename a name that has been recorded.
- The timestamp for names are auto generated. Start date for a name is set as the created time while end date is provided to existing name, if the user decides to create a new name.
- The user can view names that will be expiring within 28 days. It is assumed that names are active for a year when making this calculation.
- The user cannot reuse their past names.
- The user is not able to use a name that someone else is currently using.
- The user can view their past names, with further information of when it was created and ended.

## Solution Formulation

Steps I have thought of and executed for getting the above features. 

1. Create a backend with Node, Express and express-graphql to handle different resolvers and mutations.
1. JWT is used for authentication and it is detached from the graphql.
1. After proper authentication, display the respective information in the frontend. 
1. The frontend is made as dumb as possible. Everything is backend driven.

## Libraries/ Tools used

- NodeJs
- Express
- Graphql
- MongoDB
- React
- Typescript

## Setup

After you clone the project, move to respective folder for backend and client.

#### Prerequisites

#### Docker or NodeJS

##### Docker

1. Run `docker-compose up`

##### Copy the contents of nodemon-example and create nodemon.json with appropriate values

##### Yarn

1. Run `yarn install` for both backend and client
1. Run `yarn run dev` for backend
1. Run `yarn start` for client

##### NPM

1. Run `npm install` for both backend and client
1. Run `npm run dev` for backend
1. Run `npm start` for client

### For generation graphql schemas in your frontend, you will need to run `yarn codegen`

## Decisions and tradeoffs

1. Currently, input validation is not done properly since the major purpose of creating this project was for me to understand the concept of a full stack project with authentication. 

## Some interesting features that can be added in the future 

1. Visual representation of times,citizens change their names (Can be based on gender, geographic locations, age group)
1. Providing recommendation of names to the citizens
1. Ability to book one name for next time use
1. Integration with other government services when names are updated by a citizen
1. A timer to display until if a predetermined time is set for changing the name
1. Ability to login via social media sites for secure authentication and authorization

https://user-images.githubusercontent.com/51769774/135367544-a436b156-f435-45d7-8732-6b13696b07d8.mp4

![image](https://user-images.githubusercontent.com/51769774/135367625-81775147-672f-48ba-8ad1-92928d108565.png)
