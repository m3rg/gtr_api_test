const router = require("express").Router();
const recordUtil = require("../utils/record");
const mongoose = require("mongoose");
const Record = mongoose.model("Record");

const DEFAULT_SIZE = 10;
const MAX_SIZE = 100;
const DEFAULT_PAGE = 0;

/* Post data */
router.post("/", async function (req, res, next) {
  if (!recordUtil.validateParams(req.body)) {
    return res.json({
      ...recordUtil.MSG.REQUEST_PARAM_ERROR,
      records: [],
    });
  }
  let limit = Number(req.query.size) || DEFAULT_SIZE;
  if (limit > MAX_SIZE) {
    limit = MAX_SIZE;
  }
  const skip = Number(req.query.page || DEFAULT_PAGE) * limit;
  const records = await Record.find(
    {
      createdAt: {
        $gte: req.body.startDate,
        $lte: req.body.endDate,
      },
      $expr: {
        $and: [
          { $gte: [{ $sum: "$counts" }, req.body.minCount] },
          { $lte: [{ $sum: "$counts" }, req.body.maxCount] },
        ],
      },
    },
    null,
    { limit, skip }
  ).exec();
  res.json({
    ...recordUtil.MSG.SUCCESS,
    records: records.map((record) => record.toJSON()),
  });
});

module.exports = router;
