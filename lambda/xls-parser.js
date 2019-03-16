const XLSX = require("xlsx")

const xlsxParser = data => {
  const result = []

  const workbook = XLSX.read(data)

  var firstSheetName = workbook.SheetNames[0]
  var worksheet = workbook.Sheets[firstSheetName]

  const isLastRow = row => !worksheet["B" + row]

  const getData = col => row => {
    const cell = worksheet[col + row]
    if (!cell) {
      return "undefined"
    }
    return cell.w || cell.v
  }

  const getDate = getData("A")
  const getName = getData("B")
  const getDealAmount = getData("C")
  const getDebitAmount = getData("D")
  const getAdditionalInfo = getData("E")

  const FIRST_ROW = 4
  for (let row = FIRST_ROW;; row++) {
    if (isLastRow(row)) {
      break
    }

    const obj = {
      date: getDate(row),
      name: getName(row),
      dealAmount: getDealAmount(row),
      debitAmount: getDebitAmount(row),
      additionalInfo: getAdditionalInfo(row)
    }

    result.push(obj)
  }
  return result
}

module.exports = xlsxParser