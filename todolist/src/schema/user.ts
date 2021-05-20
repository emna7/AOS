import { ObjectId } from "mongoose";

const mongoose = require('mongoose');

type AuthData = {
    userID: ObjectId,
    token: String,
    toekExpiration: Number
}

const userSchema = mongoose.Schema({
    email: {
        type: String,
        unique: true
    },
    password: String,
    name: String,
    ownedTasks: [String!],
    sharedTasks: [String!]
});

export const typeDef = `
type User{
    _id: ID!
    email: String!,
    password:String!,
    name:String!,
    ownedTasks: [String!]
    sharedTasks: [String!]
  }
  
  input UserInput{
    email:String!,
    password:String!,
    name:String!,
    ownedTasks: [String!]
    sharedTasks: [String!]
  }
  `;

export let User = mongoose.model('User', userSchema);
