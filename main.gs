
function onOpen() {
  console.log('On Open');

  var ui = SpreadsheetApp.getUi();
  ui.createMenu('Flash Fill')
    .addItem("Fill", 'currentCellCalculate')
    .addToUi();
}

function onEdit(e) {
  Logger.log("onEvent", e) 
  // cell={rowEnd=2.0, rowStart=2.0, columnEnd=2.0, columnStart=2.0}
  if (e.cell !== undefined && e.cell.rowStart !== undefined && e.cell.columnStart !== undefined) {
    // calculate(e.cell.rowStart, e.cell.rowEnd)
  }
}

/**
 * Get the current cell and calculate the values
 */
function currentCellCalculate() {
  var activeCell = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet().getActiveCell();
  calculate(activeCell.getRow(), activeCell.getColumn())
}

function calculate(currentRow, currentColumn) {

    if (currentRow !== null && currentColumn !== null) {
      var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet()

      var [startRow, startColumn] = findFirst(sheet, currentRow, currentColumn)
      
      var endRow = findEndRow(sheet, startRow, startColumn);
      Logger.log({"startRow": startRow, "startColumn": startColumn, "endRow": endRow})
      var allCells = sheet.getRange(startRow, startColumn, endRow - startRow + 1, currentColumn - startColumn + 1); // select current context
      var allValues = allCells.getValues();

      Logger.log({"allValues": JSON.stringify(allValues)})

      var splittedValues = allValues.reduce(function(acc, v, i) {
        var trainOutput = v[v.length - 1]
        if (trainOutput !== null && trainOutput !== "") {
          acc.train.push([...v, i + 1])
        } else {
          acc.test.push([...v, i + 1])
        }
        return acc
      }, {"train": [], "test": []})

      Logger.log({"splittedValues": JSON.stringify(splittedValues)})

      var train = splittedValues.train.map(v => ["" + v[0], "" + v[currentColumn - startColumn]])
      var test = splittedValues.test.map(v => "" + v[0])

      var result = fetchAnswers(train, test)

      for(var i = 0; i < result.length; i++) {
        var row = splittedValues.test[i]
        var sheetRow = row[row.length - 1] - 1 // FIXME: ajust
        Logger.log({"row": row})
        Logger.log({"newValues": [startRow + sheetRow, currentColumn, result[i]]})
        sheet.getRange(startRow + sheetRow, currentColumn).setValue(result[i])
      }
    
    }
}

function testCalculate() {
  SpreadsheetApp.setActiveSheet(workingSheet('H9'))
  calculate(19,7)
}
