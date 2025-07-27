const path = require('path');

module.exports = {
  mode: 'production',
  entry: './index.js',
  output: {
    filename: './static/index.js',
    path: path.resolve(__dirname),
  },
}
