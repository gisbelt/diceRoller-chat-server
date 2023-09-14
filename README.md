## Dice Game Server

This is the backend part of a basic web application for a dice game. Its main goal is to connect to a MongoDB database to store the messages that are sent through a small real-time chat generated with socket-io. 

Using Javascript Technologies like Nodejs, Mongodb, Express, Socket-io and other related technologies. 

### Installation

#### Clone Server
```sh
git clone https://github.com/gisbelt/diceRoller-chat-server.git
cd diceRoller-chat-server
yarn install
yarn dev # run in development mode with nodemon
yarn start # run in production mode
```
#### Clone Client 
- `Visit frontend repository:` [Dice Roller](https://github.com/gisbelt/diceRoller-chat/)
```sh
git clone https://github.com/gisbelt/diceRoller-chat.git
cd diceRoller-chat
cd src/hooks/useChat.js  # change const socket = io('localhost:4000')
yarn install
yarn start

```


### Environment Variables
- `Make sure you have your own MongoDB Atlas connection string:` [MongoDB Atlas](https://www.mongodb.com/docs/manual/reference/connection-string/#find-your-mongodb-atlas-connection-string)
##### This app needs the following environment Variables
- `MONGO_USER` this is the Mongodb user
- `MONGO_PASSWORD` this is the Mongodb password
- `PORT` the server http port for the application


### Contributing
- Fork the repository
- Make your changes in a separate branch
- Open a pull request

### Ending Note
- Consider giving the repo a ⭐ if you liked the project!
