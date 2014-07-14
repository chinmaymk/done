var done = {};

done.init = function() {
  $(document).pjax('a', 'content#done-container');
};

$(done.init);