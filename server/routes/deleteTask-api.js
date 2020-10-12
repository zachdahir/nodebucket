/**
 * Title: Nodebucket
 * Author: Zachary Dahir
 * Date: 10-04-20
 * Description: delete tasks api
 */
const express = require('express');
const Employee = require('../models/employee.js');
const BaseResponse = require('../services/base-response');
const ErrorResponse = require('../services/error-response');
const router = express.Router();

router.delete('/:empId/tasks/:taskId', async(req, res) => {
  try {

    Employee.findOne({'empId': req.params.empId}, function(err, employee) {
      if (err) {
        console.log(err);

        const deleteTaskMongoDbErrorResponse = new ErrorResponse('500', 'Internal Server Error', err);

        res.status(500).send(deleteTaskMongoDbErrorResponse.toObject());
      } else {
        console.log(employee);

        const todoItem = employee.todo.find(item => item._id.toString() === req.params.taskId);
        const doneItem = employee.done.find(item => item._id.toString() === req.params.taskId);

        if (todoItem) {
          employee.todo.id(todoItem._id).remove();
          employee.save(function(err, updatedTodoItemEmployee) {
            if (err) {
              console.log(err);

              const deleteTodoItemOnSaveMongoDbErrorResponse = new ErrorResponse('500', 'Internal Server Error', err);

              res.status(500).send(deleteTodoItemOnSaveMongoDbErrorResponse.toObject());
            } else {
              console.log(updatedTodoItemEmployee);

              const deleteTodoItemSuccessResponse = new BaseResponse('200', 'Item Removed From To Do List', updatedTodoItemEmployee);

              res.json(deleteTodoItemSuccessResponse.toObject());
            }
          })
        } else if (doneItem) {
          employee.done.id(doneItem._id).remove();
          employee.save(function(err, updatedDoneItemEmployee) {
            if (err) {
              console.log(err);

              const deleteDoneItemOnSaveMongoDbErrorResponse = new ErrorResponse('500', 'Internal Server Error', err);

              res.status(500).send(deleteDoneItemOnSaveMongoDbErrorResponse.toObject());
            } else {
              console.log(updatedDoneItemEmployee);

              const deleteDoneItemSuccessResponse = new BaseResponse('200', 'Item Removed From Done List', updatedDoneItemEmployee);

              res.json(deleteDoneItemSuccessResponse.toObject());
            }
          })
        } else {
          console.log('Invalid Task ID');

          const deleteTaskNotFoundResponse = new ErrorResponse('200', 'Unable to locate Task', null);

          res.status(200).send(deleteTaskNotFoundResponse.toObject());
        }
      }
    })
  } catch (e) {
    console.log(e);

    const deleteTaskCatchErrorResponse = new ErrorResponse('500', 'Internal Server Error', e.message);

    res.status(500).send(deleteTaskCatchErrorResponse.toObject());
  }
})

module.exports = router;
