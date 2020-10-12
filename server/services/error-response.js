/**
 * Title: Nodebucket
 * Author: Zachary Dahir
 * Date: 10-04-20
 * Description: error response format
 */

class ErrorResponse {
  constructor(httpCode, message, data) {
    this.httpCode = httpCode;
    this.message = message;
    this.data = data;
  }

  toObject(){
    return {
      'httpCode': this.httpCode,
      'message' : this.message,
      'data': this.data,
      'timestamp': new Date().toDateString()
    }
  }
}

module.exports = ErrorResponse;
