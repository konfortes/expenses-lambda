const xlsParser = require("../lambda/xls-parser")
const fileRaw = require("./fixtures")

describe("parseXls", () => {
  it("should parse successfully", () => {
    const file = Buffer.from(fileRaw, "hex")

    const parsed = xlsParser(file)
    expect(parsed).toHaveLength(50)
  })
})
