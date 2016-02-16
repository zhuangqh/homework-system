
/*
 * GET home page.
 */

exports.index = function(req, res){
  res.render('index');
};

exports.role = function (req, res) {
  var name = req.url.replace('/', '');
  res.render(name);
};

exports.partials = function (req, res) {
  var name = req.params.name;
  res.render('partials/' + name);
};