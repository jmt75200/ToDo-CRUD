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
          method : "PUT"
        });

        $("h3").toggleClass("strike");

      } else {
        //checkbox is unchecked
        //issue PUT request to uncomplete todos route
        $.ajax('/todos/'+doc_id+'/uncomplete', {
          method : "PUT"
        });
        
        $("h3").removeClass("strike");
      }

  });//end of update checkbox

  

});