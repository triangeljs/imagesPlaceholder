(function($) {
  $('#addBtn').on('click',function() {
    $('#dataType').attr('value','true');
    $('#picForm_1').attr('value', '').removeAttr('readOnly');
    $('#picForm_2').attr('value', '');
    $('#dataBtn').attr('value','添加');
    $('.dataBox').show();
  });

  $('input[name="updateBtn"]').on('click',function() {
    var obj = $(this).parents('tr');
    $('#dataType').attr('value','false');
    $('#picForm_1').attr({'value': obj.find('input').eq(0).val(),'readOnly': 'true'});
    $('#picForm_2').attr('value', obj.find('input').eq(1).val());
    $('#dataBtn').attr('value','修改');
    $('.dataBox').show();
  });

  $('input[name="removeBtn"]').on('click',function() {
    var name = $(this).parents('tr').find('input').eq(0).val();
    alert('确认删除？');
    $.post("/admin", { directory: name, dataType: "remove" }, function() {
      location.replace(location.href);
    });
  });

  $('#dataBtn').on('click',function() {
    $('#picForm').submit();
  });

  $('#addPicBtn').on('click',function() {
    $('.picUploadBox').show();
  });
  $('#picUploadBtn').on('click',function() {
    $('.picUploadBox').hide();
  });

  $('#clsBtn').on('click',function() {
    $('.dataBox').hide();
  });
})(jQuery);