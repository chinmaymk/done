/*jshint sub:true*/
/* global $,_,Backbone,jQuery */
/**
 * Just a global helper object
 * @type {Object}
 */
(function() {

  $.fn.editable.defaults.mode = 'inline';
  $.fn.editable.defaults.showbuttons = false;
  $.fn.editable.defaults.highlight = false;
  $.fn.editable.defaults.unsavedclass = false;
  $.fn.editable.defaults.saveonchange = true;

  var done = {
    fn: {},
    views: {},
    container: "content#done-container",
    inMemoryViews: [],
    bus: _.extend({}, Backbone.Events)
  };

  $.fn.editable.defaults.mode = 'inline';

  var debug = function(args) {
    console.debug(args);
  };

  done.baseView = Backbone.View.extend({
    close: function() {
      this.unbind();
    }
  });

  /**
   * helper method on jQuery
   * @return {[type]} [description]
   */
  jQuery.fn.exists = function() {
    return this.length > 0;
  };

  /**
   * Called when pjax updates dom fragment
   * takes out all current in memory views, and adds new ones
   * @return {[type]} [description]
   */
  done.fn.viewLoaded = function() {
    //prevent stinking event handlers
    done.inMemoryViews.forEach(function(d) {
      debug('closed a view', d.$el);
      d.close();
    });

    done.inMemoryViews = [];
    Object.keys(done.views).forEach(done.fn.createViews);
  };

  done.fn.createViews = function(key) {
    function create(index, ele) {
      debug('created a view', ele);
      var view = new(done.views[key])({
        el: ele
      });
      done.inMemoryViews.push(view);
    }

    var $views = $(done.container).find(key);
    $.each($views, create);
  };

  /**
   * Document load
   * @return {[type]} [description]
   */
  done.fn.init = function() {
    $(document).pjax('a:not([data-no-pjax])', done.container, {
      timeout: 2000
    });
    $(document).on('pjax:complete', done.fn.viewLoaded);
    //call for the first time
    done.fn.viewLoaded();
  };


  /**
   * Markdown editor view, handles preview of text and highlighting of code blocks
   * @return {[type]}   [description]
   */
  done.views['.markdown-editor'] = done.baseView.extend({
    events: {
      'click a[href="#preview"]': 'preview'
    },

    preview: function() {
      var value = this.$el.find('#write textarea').val();
      var $preview = this.$el.find('#preview');
      $preview.html("loading preview, please wait...");

      $.ajax({
        type: "POST",
        url: "/markdown",
        data: {
          body: value
        },
        success: function(data) {
          $preview.html(data);
        }
      });
    }
  });

  /**
   * Helps re-ordering states for project workflow
   * @return {[type]}               [description]
   */
  done.views['.state-orderer'] = done.baseView.extend({

    events: {
      'sortupdate': 'orderChanged',
      'click .add-state': 'addState',
      'click .edit': 'editState'
    },

    editState: function() {

    },

    initialize: function() {
      this.$el.sortable({
        forcePlaceholderSize: true,
        handle: '.handle',
        items: '.state-orderer-children'
      });
    },

    orderChanged: function(e, ui) {
      console.log(this.$el.find('.state-orderer-children').text(), ui);
    },

    addState: function() {
      var $li = $('<li class="list-group-item"></li>');
      var $reorderSpan = $('<span class="handle">&Congruent; </span>');
      var $stateSpan = $('<span class="editable">New state</span>');

      $li.append($reorderSpan);
      $li.append($stateSpan);

      this.$el.find('.add-state').before($li);
    }

  });

  /**
   * helps makeing things editable
   * @return {[type]}   [description]
   */
  done.views['.editable'] = done.baseView.extend({
    initialize: function() {
      this.$el.editable();
    },
  });

  /**
   * To prevent idiotic page scroll on # links
   * @return {[type]}   [description]
   */
  done.views['a[href="#"]'] = done.baseView.extend({
    events: {
      'click': 'clicked'
    },

    clicked: function(event) {
      event.preventDefault();
    }
  });

  $(done.fn.init);
})();