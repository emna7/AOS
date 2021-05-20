import mongoose from "mongoose"; 

const taskSchema = new mongoose.Schema({
    name:String,
    comments:[String!],
    status:Boolean,
    owner:String,
    sharedWith:[String!]
});

export const typeDef = `
type Task{
    _id: ID!
    name:String!,
    comments:[String],
    status:Boolean,
    owner:String!,
    sharedWith:[String!]
  }

  input TaskInput{
    name:String!,
    comments:[String],
    status:Boolean!,
    owner:String!,
    sharedWith:[String!]
  }
`

export let Task = mongoose.model('Task', taskSchema);