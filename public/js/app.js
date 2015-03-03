$(function (){
  // console.log('jquery is firing!');

  $("input[type='checkbox']").change(function (events){
      //make ajax work?!?!?!
      //get the id of the mongo doc
      var doc_id = $(this).data('todo-id');

      if( $(this).prop("checked") ){
        //checkbox is checked
        //issues a PUT request to complete todos route
        $.ajax( '/todos/' +doc_id+ '/complete', {
          method : "PUT"
        });

        alert('send PUT request to ' + '/todos/ ' + doc_id + ' complete');
      } else {
        //checkbox is unchecked
        //issue PUT request to uncomplete todos route
        $.ajax('/todos/' +doc_id+ '/uncomplete', {
          method : "PUT"
        });
        alert('send PUT request to ' + '/todos/ ' + doc_id + ' uncomplete');
      }

  });

});