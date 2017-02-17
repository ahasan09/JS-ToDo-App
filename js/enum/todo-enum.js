/**
 * Created by Raju Hasan on 14/02/2017.
 */
'use strict';
(function(){	
	window.ToDoApp=window.ToDoApp||{};
	
	function getDomRelatedEnum(){
		return{
			IdTagEnum:{
				SearchBox:'txtSearch',
				SearchButton:'btnSearch',
				AddNewButton:'btnOpenModal',
				CloseModalButton:'btnCloseModal',
				TotalLabel:'lblTotal',
				ToDoItemContainer:'toDoItemContainer',
				ToDoModal:'divToDoModal',
				ModalHeader:'todoHeader',
				Title:'txtTitle',
				Description:'txtDescription',
				CancelButton:'btnCancel',
				CreateButton:'btnCreate',
				ValidationMessageLabel:'lblValidationMessage',		
				HiddenInputId:'hdnIdInput'
			},
			ClassTagEnum:{
				CheckBox:'checkbox',
				EditButton:'btnEdit',
				DeleteButton:'btnDelete'
			},
			NameTagEnum:{
				StatusRadioButton:'status'
			},
			LabelEnum:{
				Create:'Create',
				CreateToDo:'Create ToDo',
				Update:'Update',
				UpdateToDo:'Update ToDo'				
			},
			StyleEnum:{
				DisplayNone:'none',
				DisplayBlock:'block'
			},
			AttributeEnum:{
				Value:'value'
			},
            StatusEnum:{
                All:'All',
                Done:'Done',
                Pending:'Pending'
            },
			EventEnum:{
				Click:'click',
				KeyPress:'keypress',
				KeyUp:'keyup',
				Change:'change',
				Focus:'focus'
			},
            MessageEnum:{
                Delete:'Are you really want to delete this item?',
                DuplicateEntry:'Warning! Title already exist!!',
                RequiredError:'Warning! You left the to-do Title empty'
            }
		}
	}
	function getLocalStorageEnum(){
        return {
				MyToDoItems:'MyToDoItems'
			}
    }
	window.ToDoApp.EnumFactory={
		getDomRelatedEnum:getDomRelatedEnum,
		getLocalStorageEnum:getLocalStorageEnum	
	};
})(window);