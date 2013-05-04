var psd = require("psd").PSD;

exports.set = function(app) {
  app.get('/', homePage);
  app.post('/psd/upload', uploadPSD);

}

/*
 * GET home page.
 */
function homePage(req, res) {
  res.render('index');
}

function uploadPSD(req, res) {
  var toParse = psd.fromFile(req.files.psd.path);
  try {
    toParse.parse();
    res.render("uploaded", {data: toParse.toJSON().layerMask.layers});
  } catch(e) {
    res.render("uploaded", {error: e});
  }

}
