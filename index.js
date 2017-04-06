var gutil = require('gulp-util');
var mt2amd = require('gulp-mt2amd');

module.exports = function (content) {
  var callback = this.async();
  var file = new gutil.File({
    base: this.context,
    cwd: process.cwd(),
    path: this.request.split('!').pop(),
    contents: new Buffer(content)
  });
  mt2amd.compile(file, {
    commonjs: true,
    beautify: true
  }).then(function (file) {
    callback(null, file.contents.toString());
  }, function (err) {
    callback(err);
  });
};
