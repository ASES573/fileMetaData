var formidable = require('formidable'),
    http = require('http'),
    util = require('util');
var port = process.env.PORT || 8080;
http.createServer(function(req, res) {
  if (req.url == '/upload' && req.method.toLowerCase() == 'post') {
    // parse a file upload
    var form = new formidable.IncomingForm();

    form.parse(req, function(err, fields, files) {
      res.writeHead(200, {'content-type': 'text/plain'});
      res.write('received upload:\n\n');
      res.end(util.inspect({size: files.upload['size']}));
    });

    return;
  }

  // show a file upload form
  res.writeHead(200, {'content-type': 'text/html'});
  res.end(
    '<form action="/upload" enctype="multipart/form-data" method="post">'+
    
    '<input type="file" name="upload" multiple="multiple">'+
    '<input type="submit" value="Upload">'+
    '</form>'
  );
}).listen(port);