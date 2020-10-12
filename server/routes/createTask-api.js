/**
 * Title: Nodebucket
 * Author: Zachary Dahir
 * Date: 10-04-20
 * Description: create task api
 */

const express = require('express');
const Employee = require('../models/employee.js');
const BaseResponse = require('../services/base-response');
const ErrorResponse = require('../services/error-response');
const router = express.Router();

router.post('/:empId/tasks', async(req, res) => {
  try {
    Employee.findOne({'empId': req.params.empId}, function(err, employee) {
      if (err) {
        console.log(err);

        const createTaskMongoDbErrorResponse = new ErrorResponse('500', 'Internal Server Error', err);

        res.status(500).send(createTaskMongoDbErrorResponse.toObject());
      } else {
        console.log(employee);

        const item = {
          text: req.body.text
        };

        employee.todo.push(item);

        employee.save(function(err, updatedEmployee) {
          if (err) {
            console.log(err);

            const createTaskOnSaveMongoDbErrorResponse = new ErrorResponse('500', 'Internal Server Error', err);

            res.status(500).send(createTaskOnSaveMongoDbErrorResponse.toObject());
          } else {
            console.log(updatedEmployee);

            const createTaskOnSaveSuccessResponse = new BaseResponse('200', 'Entry was Successful', updatedEmployee);

            res.json(createTaskOnSaveSuccessResponse.toObject());
          }
        })
      }
    })
  } catch (e) {
    console.log(e);

    const createTaskCatchErrorResponse = new ErrorResponse('500', 'Internal Server Error', e.message);

    res.status(500).send(createTaskCatchErrorResponse.toObject());
  }
})

module.exports = router;
