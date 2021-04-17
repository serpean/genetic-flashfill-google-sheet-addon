function findFirst(sheet, row, column) {
  var aux_row = row;
  var aux_column = column;

  // FIXME: MESSY CODE

  while (aux_row > 1 && sheet.getRange(aux_row - 1, aux_column).getValues()[0][0] !== null && sheet.getRange(aux_row - 1, aux_column).getValues()[0][0] !== "") {
    aux_row--;
  }

  while (aux_column > 1 && sheet.getRange(aux_row, aux_column - 1).getValues()[0][0] !== null && sheet.getRange(aux_row, aux_column - 1).getValues()[0][0] !== "") {
    aux_column--;
  }

  return [aux_row, aux_column];
}

function findEndRow(sheet, row, column) {
  var aux_row = row;
  var currentValue = sheet.getRange(aux_row, column).getValues()[0][0];
  while (currentValue !== null && currentValue !== "") {
    currentValue = sheet.getRange(++aux_row, column).getValues()[0][0];
  }

  // FIXME: MESSY CODE
  return aux_row - 1
}


function testFindFirst() {
  Logger.log(findFirst(workingSheet(), 9,8))
}

function testEndRow() {
  Logger.log(findEndRow(workingSheet(), 8,6))
}