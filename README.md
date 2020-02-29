## About the project
- Written with NodeJS, ExpressJS
- Database is MongoDB
- Deployed to Heroku. API URL is `https://rent-a-book.herokuapp.com/`
- Swagger URL is `https://rent-a-book.herokuapp.com/swagger`
- Integration tests are present
- Continuous deployment is enabled by Heroku and Github
- Multi language is supported. For english, set x-lang to tr in header. If you leave it blank, it will return turkish responses

## Setup project on local machine
- Git clone
- Navigate to the project folder via terminal
- Set your environment variables in `server/config/config.json`
- `npm i` to install packages

## Start server
- `npm start`

## Start auto testing
- `npm test`