var url = 'http://YOUR_URL?offset=';

function callAPI(url) {
  //Access Data
 var token = Utilities.base64Encode('YOUR_TOKEN');

  var auth =  {
    user_id: 'YOUR_USER_ID',
    token: token,}    

  var options = {
    muteHttpExceptions: true,
    method: 'POST',
    payload: JSON.stringify(auth),
    }

  // Call API
  var response = UrlFetchApp.fetch(url, options);

  //Parse response
  var json= response.getContentText();
  return JSON.parse(json);

}  


function displayData(){

  var output = []
  var offset = 0

  while (true) {
    var results = callAPI(url + offset).resultado;
    
    results.forEach(function (obj) {
    return output.push([obj.cod_alfa, obj.partnumber, obj.detalle, obj.precio, obj.iva, obj.marca, obj.rubro, obj.subrubro, obj.cotizacion, obj.stock, obj.peso, obj.link]);
    }); //REPLACE obj.YOUR_DATA
    
    if (results.length < 100) {
      break;
    }
    offset += 100;
  }
                 


  //Clear previous content
  var ss = SpreadsheetApp.openByUrl('YOUR_GOOGLE_SPREADSHEET_URL').getSheetByName('YOUR_SHEET_NAME');
  ss.getRange(4,1,2000,12).clearContent();

  //Insert new data in sheet
  var len = output.length;
  ss.getRange(4,1,len,12).setValues(output);
  Logger.log(output);
}
