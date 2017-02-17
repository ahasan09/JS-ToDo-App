/**
 * Created by Raju Hasan on 15/02/2017.
 */
'use strict';
(function(){
    window.ToDoApp=window.ToDoApp||{};
    var domEnum = window.ToDoApp.ViewFactory.getDomEnum();
	var validateObj={};
    function resetValidationObj(){
        validateObj={
            message:'',
            isValid:true
        }
    }
    function checkModelValidation(toDoModel){
        resetValidationObj();
        if(!toDoModel.title){
           validateObj={
			   message:domEnum.MessageEnum.RequiredError,
			   isValid:false
		   };
        }
		return validateObj;
    }
	function checkModelDuplication(toDoModel,toDoItems){
        var duplicateToDoItem= toDoItems.filter(function (item) {
                return item.title.toUpperCase()== toDoModel.title.toUpperCase();
            });
		if(toDoModel.id){
			duplicateToDoItem = duplicateToDoItem.filter(function (item) {
                    return item.id!=toDoModel.id;
                });
		}
		if(duplicateToDoItem.length>0){
               validateObj={
			   message:domEnum.MessageEnum.DuplicateEntry,
			   isValid:false
		   };
		}
          return validateObj;
    }
    resetValidationObj();
    window.ToDoApp.ValidationFactory={
		checkModelValidation:checkModelValidation,
		checkModelDuplication:checkModelDuplication
	};
})();