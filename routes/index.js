var util  = require('util'),
    exec = require('child_process').exec;

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
  var layers = [];
  var fileName = "/Users/sam/Dropbox/Internal/MojoTech.com/4.0/PSD/Mojo-Contact.psd"

  exec('convert '+fileName+' -format "%[scenes]" info: | head -n 1', function(e, stdout, stderr) {
      getLayerInfo(fileName, parseInt(stdout));
  });

  function getLayerInfo(fileName, totalCount) {
    exec('convert '+fileName+'['+layers.length+'] -verbose info: | grep "label:"', function(e, stdout, stderr) {
      layers.push(stdout.split("label: ")[1]);
      console.log("found "+ layers[layers.length -1]);
      if (layers.length < totalCount) {
        getLayerInfo(fileName, totalCount);
      } else {
        res.render("uploaded", {error: null, data: layers});
      }
    });
  }
}
