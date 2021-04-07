function myfunction() {
  var spreadsheetId = '1OvmPRRtgETPhIWy9dELofnrmFhpktCI73egqa1aXQ9M';
  var rangeName = 'DU Colleges!B2:C';
  var values = Sheets.Spreadsheets.Values.get(spreadsheetId, rangeName).values;
  //Logger.log(values.length);
  try{
  if (!values) {
    Logger.log('No data found.');
  } else {
    Logger.log('CollegeName - College URL:');
    for (var row = 0; row < values.length; row++) {
      // Print columns A and E, which correspond to indices 0 and 4.
      //Logger.log(' %s - %s - %s', values[row][0], values[row][1],check_website(values[row][1]));
      Logger.log(' %s - %s - %s', values[row][0], values[row][1],getcontent("values[row][1]"));
      Logger.log(UrlFetchApp.fetch(values[row][1]).getResponseCode());
      
    }
  }

}
catch(error)
{
  Logger.log("Error Occured: "+error);
}
}

//url="https://gargicollege.in/job-opportunity/"

//getcontent(url);

function getcontent(url)
{
/*
var websiteContent = UrlFetchApp.fetch(url).getContentText();
//Logger.log(websiteContent);
return signMd5(websiteContent);
*/
var page = SitesApp.getPageByUrl(url);
var htmlContent = page.getHtmlContent();
Logger.log(htmlContent);
}


/**
 * Return string representation of MD5 digest of the given message.
 * 
 * @param {String} message Message to be encoded.
 * 
 * @return {String} 16-byte digest value
 */
//message="Amrish loves Web";

function signMd5(message){
  return digest(Utilities.DigestAlgorithm.MD5, message);
}

/**
 * Return string representation of SHA_256 digest of the given message.
 * 
 * @param {String} message Message to be encoded.
 * 
 * @return {String} 16-byte digest value
 */
/*
function signSHA_256(message){
  return digest(Utilities.DigestAlgorithm.SHA_256, message);
}
*/
/**
 * Return string representation of digest of the given string,
 * using the indicated digest algorithm.
 * 
 * @see {link https://developers.google.com/apps-script/reference/utilities/digest-algorithm|
 *       Enum DigestAlgorithm}
 * 
 * @param {DigestAlgorithm} 
 * @param {String} message Message to be encoded.
 * 
 * @return {String} 16-byte digest value
 */
function digest(algorithm,aStr) {
  algorithm = algorithm || Utilities.DigestAlgorithm.MD5; // default MD5
  aStr = aStr || "";  // default to empty string
  var signature = Utilities.computeDigest(algorithm, aStr,
                                      Utilities.Charset.US_ASCII)
  //Logger.log("signature is: "+signature);
  //initialised with empty signature string
  var signatureStr = '';
    for (i = 0; i < signature.length; i++) {
      var byte = signature[i];
      if (byte < 0)
        byte += 256;
      var byteStr = byte.toString(16);
      // Ensure we have 2 chars in our byte, pad with 0
      if (byteStr.length == 1) byteStr = '0'+byteStr;
      signatureStr += byteStr;
    }   
  Logger.log("Signature string is: "+signatureStr);
  return signatureStr;
}


