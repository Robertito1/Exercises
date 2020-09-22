const listHelper = require("../utils/list_helper");

describe("reducer function", () => {
  test("two positive integers", () => {
    const result = listHelper.reducer(10, { likes: 4 });
    expect(result).toBe(14);
  });
});
