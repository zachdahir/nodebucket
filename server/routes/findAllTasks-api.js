/**
 * Title: Nodebucket
 * Author: Zachary Dahir
 * Date: 10-04-20
 * Description: find all tasks api
 */
const express = require('express');
const Employee = require('../models/employee.js');
const BaseResponse = require('../services/base-response');
const ErrorResponse = require('../services/error-response');
const router = express.Router();

//findAllTasks

router.get('/:empId/tasks', async(req, res) => {
    try {
      Employee.findOne({'empId': req.params.empId}, 'empId firstName todo done', function (err, employee){
        if (err) {
            console.log(err);
            const mongoDbErrorResponse = new ErrorResponse('500', 'Internal Server Error', err)
            res.status(500).send(mongoDbErrorResponse.toObject());
        } else {
            console.log(employee);
            const employeeTasksResponse = new BaseResponse('200', 'Find All Was Successful', employee);
            res.json(employeeTasksResponse.toObject());
        }
    })

    } catch (e) {
      console.log(e);
      const errorCatchResponse = new ErrorResponse('500', 'Internal Server Error', e.message)
      res.status(500).send(errorCatchResponse.toObject());
    }
  });

module.exports = router;
