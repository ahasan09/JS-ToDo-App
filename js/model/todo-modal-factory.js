/**
 * Created by Raju Hasan on 14/02/2017.
 */
 'use strict'; 
 (function(){    
    window.ToDoApp=window.ToDoApp||{};
    
	var domElement = window.ToDoApp.ViewFactory.getDomElement();
    var domEnum = window.ToDoApp.ViewFactory.getDomEnum();
    
    function ToDoModal(){}

     ToDoModal.prototype={
         openModal:function(element,toDoItem){
             if(toDoItem){
                 updateModalLabel(domEnum.LabelEnum.UpdateToDo,domEnum.LabelEnum.Update);
                 domElement.title.value=toDoItem.title;
                 domElement.description.value=toDoItem.description;
             }
             else {
                 updateModalLabel(domEnum.LabelEnum.CreateToDo,domEnum.LabelEnum.Create);
             }
             domElement.toDoModal.style.display = domEnum.StyleEnum.DisplayBlock;
             domElement.title.focus();
         },
         closeModal:function(){
             clearModalData();
             domElement.toDoModal.style.display = domEnum.StyleEnum.DisplayNone;
         },
         removeValidationMessage:function(){
             removeValidationMessage();
         }
     }
        
	function showValidationMessage(message){
        domElement.validationMessageLabel.textContent=message;
        if(message)
            domElement.validationMessageLabel.style.display = domEnum.StyleEnum.DisplayBlock;
        else
            domElement.validationMessageLabel.style.display = domEnum.StyleEnum.DisplayNone; 
    };
    
    function updateModalLabel (headerLabel,buttonLabel){
        domElement.modalHeader.textContent  = headerLabel;
        domElement.createButton.value = buttonLabel;
    };
    function clearModalData(){
        domElement.hiddenInputId.value=null;
        domElement.title.value=null;
        domElement.description.value=null;
        removeValidationMessage();
    };
    function removeValidationMessage (){
        domElement.validationMessageLabel.textContent=null;
        domElement.validationMessageLabel.style.display = domEnum.StyleEnum.DisplayNone;
    };   
    function create(){
        return new ToDoModal();
    };
    window.onclick = function(event) {
			if (event.target == domElement.toDoModal) {
				domElement.toDoModal.style.display = domEnum.StatusEnum.DisplayNone;
			}
		}
    window.ToDoApp.ToDoModalFactory={
		create:create,
        showValidationMessage:showValidationMessage	
	};
})(window);