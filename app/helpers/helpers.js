module.exports = {
  responses: (res, result) => {
    let resultPrint = {};
    let strNull = "";

    resultPrint.message = "Success";
    resultPrint.status = true;
    resultPrint.total = result.length;
    resultPrint.code = 200;
    resultPrint.data = result;
    return res.status(resultPrint.code).json(resultPrint);
  },

  responsesSingle: (res, result) => {
    let resultPrint = {};
    resultPrint.message = "Success";
    resultPrint.status = true;
    resultPrint.code = 200;
    resultPrint.data = result;
    return res.status(resultPrint.code).json(resultPrint);
  },

  responsesCustom: (res, result, customMsg, status) => {
    let resultPrint = {};
    resultPrint.message = customMsg;
    resultPrint.status = status;
    resultPrint.code = 200;
    resultPrint.data = result;
    return res.status(resultPrint.code).json(resultPrint);
  },

  responsesNull: (res, err) => {
    let resultPrint = {};
    resultPrint.message = "Data not Found";
    resultPrint.status = true;
    resultPrint.code = 404;
    resultPrint.data = null;
    return res.status(resultPrint.code).json(resultPrint);
  },

  sessionExpried: (res, err) => {
    let resultPrint = {};
    resultPrint.message = "Session Expired";
    resultPrint.status = false;
    resultPrint.code = 403;
    resultPrint.data = null;
    return res.status(resultPrint.code).json(resultPrint);
  },

  badRequest: (res, err) => {
    let resultPrint = {};
    resultPrint.message = "Bad Request !";
    resultPrint.status = false;
    resultPrint.code = 400;
    // resultPrint.err = err || null;
    return res.status(resultPrint.code).json(resultPrint);
  },

  serverNotFound: (res, err) => {
    let resultPrint = {};
    resultPrint.msg = "Server Not Found";
    resultPrint.status = false;
    resultPrint.code = 404;
    resultPrint.err = err || null;
    return res.status(resultPrint.code).json(resultPrint);
  },

  responsesCustomForbidden: (res, result, customMsg, status, code) => {
    let resultPrint = {};
    resultPrint.message = customMsg;
    resultPrint.status = status;
    resultPrint.code = code;
    resultPrint.data = result;
    return res.status(resultPrint.code).json(resultPrint);
  },
};
