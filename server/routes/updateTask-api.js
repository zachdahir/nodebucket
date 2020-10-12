/**
 * Title: Nodebucket
 * Author: Zachary Dahir
 * Date: 10-04-20
 * Description: update task api
 */

const express = require('express');
const Employee = require('../models/employee.js');
const BaseResponse = require('../services/base-response');
const ErrorResponse = require('../services/error-response');
const router = express.Router();

router.put('/:empId/tasks', async(req, res) => {
  try {

     Employee.findOne({'empId': req.params.empId}, function(err, employee) {
      if (err) {
        console.log(err);

        const updateTaskMongoDbErrorResponse = new ErrorResponse('500', 'Internal Server Error', err);

        res.status(500).send(updateTaskMongoDbErrorResponse.toObject());
    } else {
      console.log(employee);

      employee.set({
        todo: req.body.todo,
        done: req.body.done
      });

      employee.save(function(err, updatedEmployee) {
        if (err) {
          console.log(err);

          const updateTaskOnSaveMongoDbErrorResponse = new ErrorResponse('500', 'Internal Server Error', err);

          res.status(500).send(updateTaskOnSaveMongoDbErrorResponse.toObject());
        } else {
            console.log(updatedEmployee);

            const updateTaskOnSaveSuccessResponse = new BaseResponse('200', 'Update was Successful', updatedEmployee);

            res.json(updateTaskOnSaveSuccessResponse.toObject());
          }
        })
      }
    })
  } catch (e) {
    console.log(e);

    const updateTaskCatchErrorResponse = new ErrorResponse('500', 'Internal Server Error', e.message);

    res.status(500).send(updateTaskCatchErrorResponse.toObject());
  }
})

module.exports = router;
