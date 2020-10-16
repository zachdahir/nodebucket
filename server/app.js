/**
 * Title: Nodebucket
 * Author: Zachary Dahir
 * Date: 9-26-20
 * Description: app.js
 */

const express = require('express');
const http = require('http');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const path = require('path');
const mongoose = require('mongoose');
const Employee = require('./models/employee.js');
const EmployeeApi = require('./routes/employee-api');
const FindAllTaskApi = require('./routes/findAllTasks-api');
const CreateTaskApi = require('./routes/createTask-api');
const UpdateTaskApi = require('./routes/updateTask-api');
const DeleteTaskApi = require('./routes/deleteTask-api');

/**
 * App configurations
 */
let app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({'extended': true}));
app.use(morgan('dev'));
app.use(express.static(path.join(__dirname, '../dist/nodebucket')));
app.use('/', express.static(path.join(__dirname, '../dist/nodebucket')));

/**
 * Variables
 */
const port = env.process.PORT || 3000; // server port

// TODO: This line will need to be replaced with your actual database connection string
const conn = 'mongodb+srv://Nodebucket_user:mVQDpBEl9b0nwzIo@buwebdev-cluster-1.7ahfl.mongodb.net/Nodebucket?retryWrites=true&w=majority';

/**
 * Database connection
 */
mongoose.connect(conn, {
  promiseLibrary: require('bluebird'),
  useUnifiedTopology: true,
  useNewUrlParser: true,
  useCreateIndex: true,
}).then(() => {
  console.debug(`Connection to the database instance was successful`);
}).catch(err => {
  console.log(`MongoDB Error: ${err.message}`)
}); // end mongoose connection

//API's
app.use('/api/employees', EmployeeApi);
app.use('/api/employees', FindAllTaskApi);
app.use('/api/employees', CreateTaskApi);
app.use('/api/employees', UpdateTaskApi);
app.use('/api/employees', DeleteTaskApi);

//Create and start server
http.createServer(app).listen(port, function() {
  console.log(`Application started and listening on port: ${port}`)
}); // end http create server function
