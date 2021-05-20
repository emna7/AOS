type User = {
    name:String,
    task: [Task]

  }
  
  type Task = {
    name:String,
    user: [User]
  }

  type Query = {
    user: [User],
    task: [Task]
  }