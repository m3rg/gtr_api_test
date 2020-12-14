const recordUtil = require("./record");

describe("Missing Params", () => {
  it("No validate if one of the params is missing", () => {
    const isValid = recordUtil.validateParams({
      startDate: "-",
      endDate: "-",
      minCount: "-",
    });
    expect(false).toBe(isValid);
  });
});

describe("Invalid Start Date", () => {
  it("Start date is invalid", () => {
    const isValid = recordUtil.validateParams({
      startDate: "2020-00-00",
      endDate: "2021-10-10",
      minCount: 20,
      maxCount: 50
    });
    expect(false).toBe(isValid);
  });
});

describe("Invalid End Date", () => {
    it("Start date is invalid", () => {
      const isValid = recordUtil.validateParams({
        startDate: "2020-01-01",
        endDate: "2021-10-40",
        minCount: 20,
        maxCount: 50
      });
      expect(false).toBe(isValid);
    });
  });
