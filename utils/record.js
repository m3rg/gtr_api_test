const moment = require("moment");

const DATE_FORMAT = "YYYY-MM-DD";

const MSG = {
  SUCCESS: { code: 0, msg: "Success" },
  REQUEST_PARAM_ERROR: { code: 1, msg: "Request params are not valid" },
};

function validateParams(params) {
  if (
    !params ||
    !params.startDate ||
    !params.endDate ||
    !params.minCount ||
    !params.maxCount
  ) {
    return false;
  }
  if (
    !moment(params.startDate, DATE_FORMAT).isValid() ||
    !moment(params.endDate, DATE_FORMAT).isValid()
  ) {
    return false;
  }
  return true;
}

module.exports = {
  MSG,
  validateParams,
};
