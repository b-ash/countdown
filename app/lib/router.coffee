app = require 'application'

IndexView = require 'views/index'


module.exports = class Router extends Backbone.Router
    routes:
        '*query': 'index'

    index: (query) =>
        # Countdown auto-starts
        indexView = new IndexView()
        indexView.render()
