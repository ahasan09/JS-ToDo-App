/**
 * Created by Raju Hasan on 14/02/2017.
 */
 'use strict';
 (function(){	 
	 var domElement = window.ToDoApp.ViewFactory.getDomElement();
	 var domEnum = window.ToDoApp.ViewFactory.getDomEnum();
	 var toDoModalFactory=window.ToDoApp.ToDoModalFactory.create();
	 var toDoAppFactory=window.ToDoApp.ToDoAppFactory.create();
     var renderToDoItemDom = window.ToDoApp.ViewFactory.renderToDoItemDom;
	 
	 function ToDoModel(){}
	 ToDoModel.prototype.prepareModel=prepareModel;
	 
	 function MyToDoApp(){}
	 
	 MyToDoApp.prototype={
         openModal:toDoModalFactory.openModal,
         closeModal:toDoModalFactory.closeModal,
         removeValidationMessage:toDoModalFactory.removeValidationMessage,
         createOrUpdate:function(){
         var todoModel= new ToDoModel().prepareModel();

        var result = toDoAppFactory.createOrUpdate(todoModel);
        if(result.isValid){
                toDoModalFactory.closeModal();
                searchResult(searchModel);
            }
        },
         checkBoxClicked:function(){
            var todoParentElement=this.parentNode.parentNode.parentNode;
            var toDoItems=toDoAppFactory.getToDoItems();
            var clickedToDo=  toDoAppFactory.findById(toDoItems,Number(this.getAttribute(domEnum.AttributeEnum.Value)));
            if(this.checked) {
                todoParentElement.classList.add("todo-item");
                clickedToDo.status=domEnum.StatusEnum.Done;
            }
            else {
                todoParentElement.classList.remove("todo-item");
                clickedToDo.status=domEnum.StatusEnum.Pending;
            }
            toDoAppFactory.storeToDoItems(toDoItems);
            searchModel.text=domElement.searchBox.value;
            searchResult(searchModel);
         },
         statusRadioButtonClicked:function(){
            searchModel.status=this.value;
            searchResult(searchModel);
         },
         openModalForEdit:function(){
             var value=this.getAttribute(domEnum.AttributeEnum.Value);
             domElement.hiddenInputId.setAttribute(domEnum.AttributeEnum.Value,value);
             toDoModalFactory.openModal(this,toDoAppFactory.findById(toDoAppFactory.getToDoItems(),Number(value)));
         },
         deleteToDoItem:function(){
             if(confirm(domEnum.MessageEnum.Delete)){
                 var id=this.getAttribute(domEnum.AttributeEnum.Value);
                 var toDoItems = toDoAppFactory.getToDoItems().filter(function(item) {
                     return item.id != id;
                 });
                 var todoParentElement=this.parentNode.parentNode.parentNode.parentNode;
                 var currentToDo=this.parentNode.parentNode.parentNode;
                 todoParentElement.removeChild(currentToDo);
                 toDoAppFactory.storeToDoItems(toDoItems);
                 setTotalItem(domElement.totalLabel.getAttribute(domEnum.AttributeEnum.Value)-1);
             }
         },
         renderToDoItemDom:function(toDoItems){
             renderToDoItemDom(toDoAppFactory.sortByTitle(toDoItems));
         }
	 }

     var myApp=new MyToDoApp();

     var searchModel={};
		Object.defineProperty(searchModel, "status", {
			value: domEnum.StatusEnum.All,
			writable: true
		});
		Object.defineProperty(searchModel, "text", {
			value: '',
			writable: true
		});

		function searchResult(searchModel){
            var searchResult=toDoAppFactory.search(searchModel);
            if(searchResult.length>0){
                eventListenerObj.bindCheckBoxClickEvent();
                eventListenerObj.bindEditButtonClickEvent();
                eventListenerObj.bindDeleteButtonClickEvent();
            }
        }
        function prepareModel(){
            var id=domElement.hiddenInputId.getAttribute(domEnum.AttributeEnum.Value);
            return {
                id:id ? id : null,
                title:domElement.title.value,
                description:domElement.description.value,
                status:domEnum.StatusEnum.Pending
            }
        }
	 
	 var eventListenerObj={
		 addEventListener:function(){
			domElement.addNewButton.addEventListener(domEnum.EventEnum.Click, myApp.openModal);
			domElement.closeModalButton.addEventListener(domEnum.EventEnum.Click, myApp.closeModal);
			domElement.cancelButton.addEventListener(domEnum.EventEnum.Click, myApp.closeModal);
			domElement.title.addEventListener(domEnum.EventEnum.Focus, myApp.removeValidationMessage);
             domElement.title.addEventListener(domEnum.EventEnum.KeyUp, function(event){
                 var eventCode = event.which || event.keyCode;
                 if(eventCode === 13) {
                     myApp.createOrUpdate();
                 }
             });
			domElement.createButton.addEventListener(domEnum.EventEnum.Click, myApp.createOrUpdate);
			domElement.searchButton.addEventListener(domEnum.EventEnum.click, myApp.search);
			domElement.searchBox.addEventListener(domEnum.EventEnum.KeyPress, function(){
				setTimeout(function(){
                    searchModel.text=domElement.searchBox.value;
                    searchResult(searchModel);
				},500)
			});
			domElement.searchBox.addEventListener(domEnum.EventEnum.KeyUp, function(){
				setTimeout(function(){
                    searchModel.text=domElement.searchBox.value;
                    searchResult(searchModel);
				},500)
			});	
		 },
		 bindCheckBoxClickEvent:function(){
			 var elements=domElement.checkBox;
			 [].forEach.call(elements, function(element) {
                 element.addEventListener(domEnum.EventEnum.Change, myApp.checkBoxClicked);
				});
		 },
		 bindEditButtonClickEvent:function(){
             var elements=domElement.editButton;
             [].forEach.call(elements, function(element) {
                 element.addEventListener(domEnum.EventEnum.Click, myApp.openModalForEdit);
             });
		 },
		 bindDeleteButtonClickEvent:function(){
             var elements=domElement.deleteButton;
             [].forEach.call(elements, function(element) {
                 element.addEventListener(domEnum.EventEnum.Click, myApp.deleteToDoItem);
             });
		 },
		 bindStatusRadioButtonClickEvent:function(){
             var elements=domElement.statusRadioButton;
             [].forEach.call(elements, function(element) {
                 element.addEventListener(domEnum.EventEnum.Click, myApp.statusRadioButtonClicked);
             });
		 }
	 }
	 
	function init(){
		eventListenerObj.addEventListener();
        myApp.renderToDoItemDom(toDoAppFactory.getToDoItems());
		eventListenerObj.bindCheckBoxClickEvent();
		eventListenerObj.bindEditButtonClickEvent();
		eventListenerObj.bindDeleteButtonClickEvent();
		eventListenerObj.bindStatusRadioButtonClickEvent();
    }
	
	init();
	
		
 })();