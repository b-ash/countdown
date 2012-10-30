View = require './view'

class IndexView extends View
    el: '#main-page'
    commencement: 1367593200
    template: require './templates/index'

    initialize: =>
        setInterval(@render, 1000)

    getRenderData: =>
        timeout = @getTimeout()
        timeout = @formatTimeout timeout
        {time: timeout}

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
        times = []
        
        time = @formatTime('month', timeout.months)
        times.push time if time?
        time = @formatTime('day', timeout.days)
        times.push time if time?
        time = @formatTime('hour', timeout.hours)
        times.push time if time?
        time = @formatTime('minute', timeout.minutes)
        times.push time if time?
        time = @formatTime('second', timeout.seconds)
        times.push time if time?

        return times.join(', ')

    formatTime: (frame, val) =>
        if val is 0
            return null

        time = "#{val} #{frame}"
        if val > 1
            time += 's'

        return time



        

module.exports = IndexView
