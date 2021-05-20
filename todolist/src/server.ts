import { Md5 } from 'ts-md5/dist/md5';
var mongoose = require('mongoose');
import { Add } from "./models/crud";


var User = require('./schema/user');
var Task = require('./schema/task');

secret: 'holbertonSchool2021';
mongoose.connect('mongodb+srv://admin:holbertonschool@cluster0.clklb.mongodb.net/myFirstDatabase?retryWrites=true&w=majority').then(
  () => { console.log("connected") },
  (err: any) => { console.log("err", err); }
);

const user = {
  name: "Emna",
  password: "blabla",
  email: "test@gmail.com"
}

const task = {
  name: "Do the todolist",
  comments: "This is a great task",
  status: true,
  owner: "blablabla",
  sharedWith: "blabla"
}

var express = require('express');
var { graphqlHTTP } = require('express-graphql');
var { buildSchema } = require('graphql');



// The root provides a resolver function for each API endpoint
// Construct a schema, using GraphQL schema language
var schema = buildSchema(`
    type User{
      _id: ID!
      email:String!,
      password:String!,
      name:String!,
    }
    
    input UserInput
    {
      email:String!,
      password:String!,
      name:String!,
    }
    type RootQuery{
      users: [User!]!
    }
    type RootMutation {
      addUser(userInput: UserInput): User
    }

    schema
    {
      query: RootQuery,
      mutation: RootMutation
    }
`);

var root = {
  addUser: (args: any) => {
    // Behavior here
    const newUser = Add(User, {email:args.userInput.email, password:args.userInput.password, name:args.userInput.name});
    return args.userInput;
  },
  users: (args: any) => {
    const userName = args.name;
    return userName;
  }
};

var app = express();
app.use('/graphql', graphqlHTTP({
  schema: schema,
  rootValue: root,
  graphiql: true,
}));
app.listen(4000);
console.log('Running a GraphQL API server at http://localhost:4000/graphql');

