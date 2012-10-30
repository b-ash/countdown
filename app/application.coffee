Application =
    initialize: (onSuccess) ->
        Router = require 'lib/router'

        @router = new Router()
        Backbone.history.start()

        onSuccess()
    

module.exports = Application
