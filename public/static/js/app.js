(function(/*! Brunch !*/) {
  'use strict';

  var globals = typeof window !== 'undefined' ? window : global;
  if (typeof globals.require === 'function') return;

  var modules = {};
  var cache = {};

  var has = function(object, name) {
    return ({}).hasOwnProperty.call(object, name);
  };

  var expand = function(root, name) {
    var results = [], parts, part;
    if (/^\.\.?(\/|$)/.test(name)) {
      parts = [root, name].join('/').split('/');
    } else {
      parts = name.split('/');
    }
    for (var i = 0, length = parts.length; i < length; i++) {
      part = parts[i];
      if (part === '..') {
        results.pop();
      } else if (part !== '.' && part !== '') {
        results.push(part);
      }
    }
    return results.join('/');
  };

  var dirname = function(path) {
    return path.split('/').slice(0, -1).join('/');
  };

  var localRequire = function(path) {
    return function(name) {
      var dir = dirname(path);
      var absolute = expand(dir, name);
      return globals.require(absolute);
    };
  };

  var initModule = function(name, definition) {
    var module = {id: name, exports: {}};
    definition(module.exports, localRequire(name), module);
    var exports = cache[name] = module.exports;
    return exports;
  };

  var require = function(name) {
    var path = expand(name, '.');

    if (has(cache, path)) return cache[path];
    if (has(modules, path)) return initModule(path, modules[path]);

    var dirIndex = expand(path, './index');
    if (has(cache, dirIndex)) return cache[dirIndex];
    if (has(modules, dirIndex)) return initModule(dirIndex, modules[dirIndex]);

    throw new Error('Cannot find module "' + name + '"');
  };

  var define = function(bundle) {
    for (var key in bundle) {
      if (has(bundle, key)) {
        modules[key] = bundle[key];
      }
    }
  }

  globals.require = require;
  globals.require.define = define;
  globals.require.brunch = true;
})();

window.require.define({"application": function(exports, require, module) {
  var Application;

  Application = {
    initialize: function(onSuccess) {
      var Router;
      Router = require('lib/router');
      this.router = new Router();
      Backbone.history.start();
      return onSuccess();
    }
  };

  module.exports = Application;
  
}});

window.require.define({"collections/collection": function(exports, require, module) {
  var Collection,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  module.exports = Collection = (function(_super) {

    __extends(Collection, _super);

    function Collection() {
      return Collection.__super__.constructor.apply(this, arguments);
    }

    return Collection;

  })(Backbone.Collection);
  
}});

window.require.define({"initialize": function(exports, require, module) {
  
  window.app = require('application');

  console.log('----starting up----');

  $(function() {
    var _this = this;
    return app.initialize(function() {
      return console.log('success');
    });
  });
  
}});

window.require.define({"lib/router": function(exports, require, module) {
  var IndexView, Router, app,
    __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  app = require('application');

  IndexView = require('views/index');

  module.exports = Router = (function(_super) {

    __extends(Router, _super);

    function Router() {
      this.index = __bind(this.index, this);
      return Router.__super__.constructor.apply(this, arguments);
    }

    Router.prototype.routes = {
      '*query': 'index'
    };

    Router.prototype.index = function(query) {
      var indexView;
      indexView = new IndexView();
      return indexView.render();
    };

    return Router;

  })(Backbone.Router);
  
}});

window.require.define({"lib/view_helper": function(exports, require, module) {
  
  Handlebars.registerHelper("debug", function(optionalValue) {
    console.log("Current Context");
    console.log("====================");
    console.log(this);
    if (optionalValue && optionalValue.hash === void 0) {
      console.log("Value");
      console.log("====================");
      return console.log(optionalValue);
    }
  });
  
}});

window.require.define({"models/model": function(exports, require, module) {
  var Backbone, Model,
    __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  Backbone = this.Backbone || require('../../vendor/scripts/backbone');

  module.exports = Model = (function(_super) {

    __extends(Model, _super);

    function Model() {
      this.close = __bind(this.close, this);
      return Model.__super__.constructor.apply(this, arguments);
    }

    Model.prototype.close = function() {
      this.unbind();
      return typeof this.onClose === "function" ? this.onClose() : void 0;
    };

    return Model;

  })(Backbone.Model);
  
}});

window.require.define({"views/index": function(exports, require, module) {
  var IndexView, View,
    __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  View = require('./view');

  IndexView = (function(_super) {

    __extends(IndexView, _super);

    function IndexView() {
      this.formatTimeout = __bind(this.formatTimeout, this);

      this.getTimeout = __bind(this.getTimeout, this);

      this.afterRender = __bind(this.afterRender, this);

      this.getRenderData = __bind(this.getRenderData, this);

      this.initialize = __bind(this.initialize, this);
      return IndexView.__super__.constructor.apply(this, arguments);
    }

    IndexView.prototype.el = '#main-page';

    IndexView.prototype.commencement = 1367593200;

    IndexView.prototype.template = require('./templates/index');

    IndexView.prototype.initialize = function() {
      return setInterval(this.render, 1000);
    };

    IndexView.prototype.getRenderData = function() {
      var isMobile, time, timeout;
      timeout = this.getTimeout();
      this.model = timeout;
      time = this.formatTimeout(timeout);
      isMobile = this.isMobileUser();
      return {
        time: time,
        isMobile: isMobile
      };
    };

    IndexView.prototype.afterRender = function() {
      if (this.model.seconds === 0) {
        return $('#time').css('color', '#FFF').animate({
          color: '#F00'
        }, 'slow');
      }
    };

    IndexView.prototype.getTimeout = function() {
      var days, hours, minutes, months, now, seconds;
      now = moment().unix();
      seconds = this.commencement - now;
      months = Math.floor(seconds / 2628000);
      seconds -= months * 2628000;
      days = Math.floor(seconds / 86400);
      seconds -= days * 86400;
      hours = Math.floor(seconds / 3600);
      seconds -= hours * 3600;
      minutes = Math.floor(seconds / 60);
      seconds -= minutes * 60;
      return {
        months: months,
        days: days,
        hours: hours,
        minutes: minutes,
        seconds: seconds
      };
    };

    IndexView.prototype.formatTimeout = function(timeout) {
      var times;
      times = [this.formatTime('month', timeout.months), this.formatTime('day', timeout.days), this.formatTime('hour', timeout.hours), this.formatTime('minute', timeout.minutes), this.formatTime('second', timeout.seconds)];
      return times.join(', ');
    };

    IndexView.prototype.formatTime = function(frame, val) {
      var time;
      time = "" + val + " " + frame;
      if (val > 1 || val === 0) {
        time += 's';
      }
      return time;
    };

    IndexView.prototype.isMobileUser = function() {
      var agent, agents, ua;
      agents = ['iphone', 'android', 'ipod', 'blackberry', 'opera mini', 'iemobile'];
      ua = navigator.userAgent.toLowerCase();
      return ((function() {
        var _i, _len, _results;
        _results = [];
        for (_i = 0, _len = agents.length; _i < _len; _i++) {
          agent = agents[_i];
          if (ua.indexOf(agent) > -1) {
            _results.push(agent);
          }
        }
        return _results;
      })()).length !== 0;
    };

    return IndexView;

  })(View);

  module.exports = IndexView;
  
}});

window.require.define({"views/templates/index": function(exports, require, module) {
  module.exports = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
    helpers = helpers || Handlebars.helpers;
    var buffer = "", stack1, stack2, foundHelper, tmp1, self=this, functionType="function", helperMissing=helpers.helperMissing, undef=void 0, escapeExpression=this.escapeExpression;

  function program1(depth0,data) {
    
    
    return "mobile";}

    buffer += "<div id=\"countdown-wrap\" class=\"";
    foundHelper = helpers.isMobile;
    stack1 = foundHelper || depth0.isMobile;
    stack2 = helpers['if'];
    tmp1 = self.program(1, program1, data);
    tmp1.hash = {};
    tmp1.fn = tmp1;
    tmp1.inverse = self.noop;
    stack1 = stack2.call(depth0, stack1, tmp1);
    if(stack1 || stack1 === 0) { buffer += stack1; }
    buffer += "\">\n    <div id=\"countdown\">\n        <span>Time until freedom:</span>\n        <h1 id=\"time\">";
    foundHelper = helpers.time;
    stack1 = foundHelper || depth0.time;
    if(typeof stack1 === functionType) { stack1 = stack1.call(depth0, { hash: {} }); }
    else if(stack1=== undef) { stack1 = helperMissing.call(depth0, "time", { hash: {} }); }
    buffer += escapeExpression(stack1) + "</h1>\n    </div>\n</div>\n";
    return buffer;});
}});

window.require.define({"views/view": function(exports, require, module) {
  var View, app,
    __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  app = require('application');

  require('lib/view_helper');

  module.exports = View = (function(_super) {

    __extends(View, _super);

    function View() {
      this.routeLink = __bind(this.routeLink, this);

      this.routeEvent = __bind(this.routeEvent, this);

      this.close = __bind(this.close, this);

      this.render = __bind(this.render, this);

      this.getInput = __bind(this.getInput, this);
      return View.__super__.constructor.apply(this, arguments);
    }

    View.prototype.views = {};

    View.prototype.template = function() {};

    View.prototype.getRenderData = function() {};

    View.prototype.getInput = function() {
      if (!this.$in) {
        this.$in = $(this["in"]);
      }
      return this.$in;
    };

    View.prototype.render = function() {
      this.$el.html(this.template(this.getRenderData()));
      this.afterRender();
      return this;
    };

    View.prototype.afterRender = function() {};

    View.prototype.close = function() {
      this.remove();
      this.unbind();
      return typeof this.onClose === "function" ? this.onClose() : void 0;
    };

    View.prototype.routeEvent = function(event) {
      var $link, url;
      $link = $(event.target);
      url = $link.attr('href');
      if ($link.attr('target') === '_blank' || typeof url === 'undefined' || url.substr(0, 4) === 'http' || url === '' || url === 'javascript:void(0)') {
        return true;
      }
      event.preventDefault();
      return this.routeLink(url);
    };

    View.prototype.routeLink = function(url) {
      return app.router.navigate(url, {
        trigger: true
      });
    };

    return View;

  })(Backbone.View);
  
}});

