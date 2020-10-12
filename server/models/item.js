/**
 * Title: Nodebucket
 * Author: Zachary Dahir
 * Date: 10-04-20
 * Description: item model
 */

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let itemSchema = new Schema({
  text: { type: String}
});

module.exports = itemSchema;
