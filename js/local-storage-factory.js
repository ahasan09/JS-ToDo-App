/**
 * Created by Raju Hasan on 14/02/2017.
 */
'use strict';
(function(){	
	window.ToDoApp=window.ToDoApp||{};
	
	var localStorageEnum=window.ToDoApp.EnumFactory.getLocalStorageEnum();
	
	function getToDoItemsFromLocalStorage (){
		return JSON.parse(localStorage.getItem(localStorageEnum.MyToDoItems));
	}
	function setToDoItemsOnLocalStorage (toDoItems){
		localStorage.setItem(localStorageEnum.MyToDoItems,JSON.stringify(toDoItems));
	}
	window.ToDoApp.LocalStorageFactory={
		getToDoItemsFromLocalStorage:getToDoItemsFromLocalStorage,
		setToDoItemsOnLocalStorage:setToDoItemsOnLocalStorage	
	};
})(window);