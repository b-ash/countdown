View = require './view'

class IndexView extends View
    el: '#main-page'
    commencement: 1367593200
    template: require './templates/index'

    initialize: =>
        setInterval(@render, 1000)

    getRenderData: =>
        timeout = @getTimeout()
        @model = timeout

        time = @formatTimeout timeout
        isMobile = @isMobileUser()

        {time, isMobile}

    afterRender: =>
        if @model.seconds is 0
            $('#time').css('color', '#FFF').animate({color: '#F00'}, 'slow')

    getTimeout: =>
        now = moment().unix()
        seconds = @commencement - now

        months = Math.floor(seconds / 2628000)
        seconds -= months * 2628000
        days = Math.floor(seconds / 86400)
        seconds -= days * 86400
        hours = Math.floor(seconds / 3600)
        seconds -= hours * 3600
        minutes = Math.floor(seconds / 60)
        seconds -= minutes * 60

        {
            months,
            days,
            hours,
            minutes,
            seconds
        }

    formatTimeout: (timeout) =>
        times = [
            @formatTime('month', timeout.months)
            @formatTime('day', timeout.days)
            @formatTime('hour', timeout.hours)
            @formatTime('minute', timeout.minutes)
            @formatTime('second', timeout.seconds)
        ]

        return times.join(', ')

    formatTime: (frame, val) ->
        time = "#{val} #{frame}"
        if val > 1 or val is 0
            time += 's'

        return time

    isMobileUser: ->
        agents = ['iphone', 'android', 'ipod', 'blackberry', 'opera mini', 'iemobile']
        ua = navigator.userAgent.toLowerCase()
        return (agent for agent in agents when agent.indexOf(ua) > -1).length isnt 0


module.exports = IndexView
