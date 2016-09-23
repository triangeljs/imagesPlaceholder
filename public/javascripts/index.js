(function($) {
  $('.picBtn').on('click', function() {
    var w = $('input[name="picWidth"]').val();
    var h = $('input[name="picHeight"]').val();
    var select = $('select[name="picAttr"]').val();
    if(!w || !h) {
      alert('请您填写图片的宽和高！');
      return false;
    }
    if(select == 0) {
      alert('请您选择图片属性！');
      return false;
    }
    $('#picForm').submit();
  });
})(jQuery);