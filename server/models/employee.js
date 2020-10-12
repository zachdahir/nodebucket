/**
 * Title: Nodebucket
 * Author: Zachary Dahir
 * Date: 9-26-20
 * Description: employee model
 */

const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Item = require('./item');

let employeeSchema = new Schema({
//                       id is unique| if duplicate drop duplicate
  empId: { type: String, unique: true, dropDups: true },
  firstName: { type: String },
  lastName: { type: String },
  todo: [Item],
  done: [Item]
// point to collection
}, { collection: 'employees' })

module.exports = mongoose.model('Employee', employeeSchema);
