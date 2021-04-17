function values() {
  var values = SpreadsheetApp.getActiveSpreadsheet().getSheets()[0].getDataRange().getValues();
      Logger.log(values)
}

function workingSheet(range='A1:D4') {
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheets()[0];
  // var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  var range = sheet.getRange(range);
  sheet.setActiveRange(range);
  return sheet;
}

function values() {

  var currentCell = sheet.getActiveCell().getCell();
  Logger.log(JSON.stringify(currentCell.getColumn()))
}



