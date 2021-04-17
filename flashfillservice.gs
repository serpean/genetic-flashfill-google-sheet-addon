function fetchAnswers(train, test) {
  var body = {
        'train': train,
        'test': test
      };

      var options = {
        'method' : 'post',
        'contentType': 'application/json',
        'payload' : JSON.stringify(body)
      };

      Logger.log({"body": JSON.stringify(body)})
      var response = UrlFetchApp.fetch('https://ers-addon.herokuapp.com/process', options);
      Logger.log({"response": response.getContentText()});

      return JSON.parse(response.getContentText()).answer
}
