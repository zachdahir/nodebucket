/**
 * Title: Nodebucket
 * Author: Zachary Dahir
 * Date: 10-04-20
 * Description: employee api
 */
const express = require('express');
const Employee = require('../models/employee.js');
const BaseResponse = require('../services/base-response');
const ErrorResponse = require('../services/error-response');
const router = express.Router();

// find by id           |-----|Place holder for empId actual value "/api/employees/1007"
router.get('/:empId', async(req, res) => {

  try {

    Employee.findOne({ 'empId': req.params.empId }, function(err, employee){
      if (err) {
        console.log(err);

        const mongoDBErrorResponse = new ErrorResponse('500', 'Internal server error', err);

        res.status(500).send(mongoDBErrorResponse.toObject());
      } else {

        console.log(employee);
        res.json(employee);
      }
    })

  } catch (e) {
    //log error
    console.log(e);

    const errorCatchResponse = new ErrorResponse()
    res.status(500).send({
      'message': 'Internal Server Error'
    })
  }
});

module.exports = router;
