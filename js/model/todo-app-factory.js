/* global toDoModel */
/**
 * Created by Raju Hasan on 15/02/2017.
 */
 'use strict'; 
 (function(){    
    window.ToDoApp=window.ToDoApp||{};
	
	var localStorageFactory = window.ToDoApp.LocalStorageFactory;
     var domEnum = window.ToDoApp.ViewFactory.getDomEnum();
	var validationFactory = window.ToDoApp.ValidationFactory;
	var toDoModalFactory = window.ToDoApp.ToDoModalFactory;
     var renderToDoItemDom = window.ToDoApp.ViewFactory.renderToDoItemDom;
	
	function ToDoAppFactory(){}
	
	ToDoAppFactory.prototype={
		createOrUpdate:function(todoModel){
			if(todoModel.id)
			return update(todoModel);
			else
			return save(todoModel);
		},
		search:function(searchModel){
            var result=[];
			var toDoItems=getAllToDoItem();
            var resultAfterTextFilter= toDoItems.filter(function (item) {
                return item.title.toUpperCase().indexOf(searchModel.text.toUpperCase())>-1 ||
				 item.description.toUpperCase().indexOf(searchModel.text.toUpperCase())>-1;
            });
            if(searchModel.status===domEnum.StatusEnum.All)
                result=resultAfterTextFilter;
            else {
                result = resultAfterTextFilter.filter(function (item) {
                    return item.status == searchModel.status;
                });
            }
            renderToDoItemDom(appFactory.sortByTitle(result));
            return result;
		},
		findById:function(items,id){
			return items.reduce(function(prev, curr) { 
					return (curr.id === id) ? curr : prev;
				 }, null);
		},
        sortByTitle:function(toDoItems){
            if(toDoItems && toDoItems.length>0) {
                toDoItems.sort(function (prev, next) {
                    var x = prev.title.toLowerCase();
                    var y = next.title.toLowerCase();
                    if (x < y) {
                        return -1;
                    }
                    if (x > y) {
                        return 1;
                    }
                    return 0;
                });
                return toDoItems;
            }
            return [];
        },
		storeToDoItems:function(toDoItems){
			localStorageFactory.setToDoItemsOnLocalStorage(toDoItems);
		},
		getToDoItems:function(){
			return localStorageFactory.getToDoItemsFromLocalStorage();
		}
	}
     var appFactory=create();

	function save(toDoModel){
		var toDoItems=localStorageFactory.getToDoItemsFromLocalStorage();
            if(!toDoItems)
                toDoItems = [];
		var validateModel=checkValidation(toDoModel,toDoItems);
		if(validateModel.isValid){
			toDoModel.id=toDoItems.length + 1;
			toDoItems.push(toDoModel);
			localStorageFactory.setToDoItemsOnLocalStorage(toDoItems);
		}
		return validateModel;		
	};
	function update(toDoModel){
        var toDoItems=getAllToDoItem();
		var validateModel=checkValidation(toDoModel,toDoItems);
		if(validateModel.isValid){
            var editableModel=  appFactory.findById(toDoItems,Number(toDoModel.id));
            editableModel.title = toDoModel.title;
            editableModel.description = toDoModel.description;

			localStorageFactory.setToDoItemsOnLocalStorage(toDoItems);
		}
		return validateModel;		
	};
	
	function checkValidation(toDoModel,toDoItems){
		var validationObj = validationFactory.checkModelValidation(toDoModel);
		if(validationObj.isValid){
			validationObj = validationFactory.checkModelDuplication(toDoModel,toDoItems);			
		}
		toDoModalFactory.showValidationMessage(validationObj.message)
		return validationObj;
	};
		
    function getAllToDoItem(){
		return localStorageFactory.getToDoItemsFromLocalStorage();
	};
	
	function create(){
        return new ToDoAppFactory();
    };
	
    window.ToDoApp.ToDoAppFactory={
		create:create
	};
})(window);