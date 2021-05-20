import { Md5 } from 'ts-md5/dist/md5';
var mongoose = require('mongoose');
import { Create, Read, Delete } from "./models/crud";
import { typeDef as UserType, User } from './schema/user';
import { typeDef as TaskType, Task } from './schema/task';
var express = require('express');
var { graphqlHTTP } = require('express-graphql');
var { buildSchema } = require('graphql');

secret: 'holbertonSchool2021';
mongoose.connect('mongodb+srv://admin:holbertonschool@cluster0.clklb.mongodb.net/myFirstDatabase?retryWrites=true&w=majority').then(
  () => { console.log("connected") },
  (err: any) => { console.log("err", err); }
);



// The root provides a resolver function for each API endpoint
// Construct a schema, using GraphQL schema language
var schema = buildSchema(
  UserType +
  TaskType +
  `
    type RootQuery{
      users: [User]
      tasks: [Task]
    }
    type RootMutation {
      addUser(userInput: UserInput): User
      addTask(taskInput: TaskInput): Task
    }
    schema
    {
      query: RootQuery,
      mutation: RootMutation
    }
`);

var root = {
  users: () => {
    return User.find({});
  },
  addUser: (args: any) => {
    // Behavior here
    const newUser = Create(User, {
      email: args.userInput.email,
      password: args.userInput.password,
      name: args.userInput.name
    });
    return args.userInput;
  },
  tasks: () => {
    return Task.find({});
  },
  addTask: (args: any) => {
    // Behavior here
    const newUser = Create(Task, {
      name: args.taskInput.name,
      comments: args.taskInput.comments,
      status: args.taskInput.status,
      owner: args.taskInput.owner,
      sharedWith: args.taskInput.sharedWidth
    });
    return args.userInput;
  },
};

var app = express();
app.use('/graphql', graphqlHTTP({
  schema: schema,
  rootValue: root,
  graphiql: true,
}));
app.listen(4000);
console.log('Running a GraphQL API server at http://localhost:4000/graphql');
