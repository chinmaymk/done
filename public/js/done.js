/*jshint sub:true*/
/**
 * Just a global helper object
 * @type {Object}
 */
(function() {
  var done = {
    fn: {},
    views: {},
    container: "content#done-container",
    inMemoryViews: [],
    bus: _.extend({}, Backbone.Events)
  };

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
    // $(document).pjax('a[data-no-pjax!="true"]', done.container, {
    //   timeout: 2000
    // });
    // $(document).on('pjax:complete', done.fn.viewLoaded);
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
        success: update
      });

      function update(data) {
        $preview.html(data);
        $preview.find('pre code').each(function(i, block) {
          hljs.highlightBlock(block);
        });
      }
    }
  });


  $(done.fn.init);
})();