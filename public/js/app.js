$(function (){
  // console.log('jquery is firing!');

  $("input[type='checkbox']").change(function (events){
      //make ajax work?!?!?!
      //get the id of the mongo doc
      var doc_id = $(this).data('todo-id');

      if( $(this).prop("checked") ){
        //checkbox is checked
        //issues a PUT request to complete todos route
        $.ajax( '/todos/'+doc_id+'/complete', {
          type : "PUT"
        });
        $(this).parent().toggleClass("strike");

      } else {
        //checkbox is unchecked
        //issue PUT request to incomplete todos route
        $.ajax('/todos/'+doc_id+'/incomplete', {
          type : "PUT"
        });
        
        $(this).parent().removeClass("strike");
      }

  }).each(function (i, obj){
    //check each checkbox that is completed
    if ($(obj).data("complete")){
      $(obj).prop("checked", true);
      $(this).parent().toggleClass("strike");
    }
  });//end of update checkbox  

  $(".new_item").click(function (){
    $(".container").slideToggle("slow", function(){});
  });

  $(".cancel").click(function (){
    $(".container").slideToggle("slow", function(){});
  });

  $("h3").click(function (){
    $(this).parent().find(".editing").slideToggle("slow", function(){});
  });


});


