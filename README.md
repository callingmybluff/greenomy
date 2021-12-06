# Greenomy

Welcome to the coding challenge!

## Running
### Docker
`docker run --rm -it -p 3000:3000 $(docker build -q .)`
### YARN
Install all packages (`yarn install`) then `yarn run dev` or `yarn run build && yarn run start`

## Notes
* Technologies used: GraphQL, TypeScript, NodeJS, ExpressJS, EJS, and some REST for the frontend.
* The frontend was not required, so the quality of its code is not as good (vanilla JS).
* I am aware that sharing secret and password should never happen, and if any, not over git. However, that is a problem related to CICD.
* OOP would be great, especially for having Office and Cars. The project took too long though.
* The code is based on seprating models and controllers. I believe that clean code does not need comments, so I hope mine is clear.
* Testing is important but it is out of the scope of this challenge.

## Motivation of Packages
* `bcrypt`: has passwords in the db.
* `cookie-parser`: standard for parsing cookies header into cookie object
* `dotenv`: For the `.env` file
* `ejs`: Simple GUI
* `express` ...
* `express-graphql`: GraphQL middleware
* `graphql`: For the schema
* `joi`: Validating objects
* `jsonwebtoken`: JWT for authentication
* `mongoose`: Connecting to the DB