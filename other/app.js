/**
 * Created by Raju Hasan on 03/02/2017.
 */
 "use strict";
(function () {
   
    var domElement={
        title:document.getElementById("txtTitle"),
        description:document.getElementById("txtDescription"),
        createButton:document.getElementById("btnCreate"),
        alert:document.getElementById("alert"),
        todoListDiv:document.getElementById("todoElement"),
        allCheckBox:document.getElementsByClassName("checkbox"),
        allEditButton:document.getElementsByClassName("btnEdit"),
        allDeleteButton:document.getElementsByClassName("btnDelete"),
        statusRadioButton:document.getElementsByName("status"),
        searchBox:document.getElementById("txtSearch"),
        searchButton:document.getElementById("btnSearch"),
        openModal:document.getElementById("btnOpenModal"),
        closeModal:document.getElementById("btnCloseModal"),
        modalDiv:document.getElementById("divToDoModal"),
        cancelButton:document.getElementById("btnCancel"),
        totalLabel:document.getElementById("lblTotal"),
        hiddenId:document.getElementById("hdnIdInput"),
        todoHeader:document.getElementById("todoHeader")
    }

    var ToDoApp = {
        searchModel:{
            status:'All',
            text:''
        },
        allToDo:[],
        createOrUpdate:function(){
            var todoModel=ToDoApp.prepareModel();
            if(todoModel.id)
            ToDoApp.update(todoModel);
            else
            ToDoApp.create(todoModel);
        },
        create:function(todoModel){
            var allTodo=ToDoApp.getAllFromLocalStorage();
            if(!allTodo)
                allTodo = [];
            todoModel.id = allTodo.length + 1;

            if(ToDoApp.validateModel(todoModel,allTodo)) {
                allTodo.push(todoModel);
                ToDoApp.allToDo=allTodo;
                ToDoApp.search();
                //prepareToDoItems(allTodo);
                ToDoApp.setDataOnLocalStorage();
                ToDoApp.closeModal();
            }
        },
        update:function(todoModel){
            var allToDo=ToDoApp.allToDo;
            if(ToDoApp.validateModel(todoModel,allToDo,true)) {
                for (var i in ToDoApp.allToDo) {
                    if (ToDoApp.allToDo[i].id == todoModel.id) {
                        ToDoApp.allToDo[i].title = todoModel.title;
                        ToDoApp.allToDo[i].description = todoModel.description;
                        break;
                    }
                }
                prepareToDoItems(ToDoApp.allToDo);
                ToDoApp.setDataOnLocalStorage();
                ToDoApp.closeModal();
            }
        },
        setDataOnLocalStorage:function(){
            localStorage.setItem('todos',JSON.stringify(ToDoApp.allToDo));
        },
        getAllFromLocalStorage:function(){
            var allData=JSON.parse(localStorage.getItem('todos'));
            ToDoApp.allToDo=allData;
            return allData;
        },
        search:function(){
            ToDoApp.searchModel.text=domElement.searchBox.value;
            var searchModel=ToDoApp.searchModel;
            var result=[];
            var resultAfterTextFilter= ToDoApp.allToDo.filter(function (item) {
                return item.title.toUpperCase().indexOf(ToDoApp.searchModel.text.toUpperCase())>-1 || item.description.toUpperCase().indexOf(ToDoApp.searchModel.text.toUpperCase())>-1;
            });
            if(searchModel.status=="All")
                result=resultAfterTextFilter;
            else {
                result = resultAfterTextFilter.filter(function (item) {
                    return item.status == ToDoApp.searchModel.status;
                });
            }
            prepareToDoItems(result);
        },
        findById:function(source,id){
            for (var i = 0; i < source.length; i++) {
                if (source[i].id == id) {
                    return source[i];
                }
            }
            alert("Couldn't find object with id: " + id);
        },
        checkBoxClicked:function(){
            var todoParentElement=this.parentNode.parentNode.parentNode;
            var clickedToDo=  ToDoApp.findById(ToDoApp.allToDo,this.getAttribute("value"));
            if(this.checked) {
                todoParentElement.classList.add("todo-item");
                clickedToDo.status="Done";
            }
            else {
                todoParentElement.classList.remove("todo-item");
                clickedToDo.status="Pending";
            }
            ToDoApp.search();
            ToDoApp.setDataOnLocalStorage();
        },
        statusRadioButtonClicked:function(){
            ToDoApp.searchModel.status=this.value;
            ToDoApp.search();
        },
        sortByTitle:function(todos){
            todos.sort(function(a, b){
                var x = a.title.toLowerCase();
                var y = b.title.toLowerCase();
                if (x < y) {return -1;}
                if (x > y) {return 1;}
                return 0;
            });
        },
        openModalForEdit:function(){
            var value=this.getAttribute("value");
            domElement.hiddenId.setAttribute("value",value);
            ToDoApp.openModal(this,ToDoApp.findById(ToDoApp.allToDo,value));
        },
        deleteToDoItem:function(){
            if(confirm('Are you really want to delete this item?')){
                var id=this.getAttribute("value");
                ToDoApp.allToDo = ToDoApp.allToDo.filter(function(item) {
                    return item.id != id;
                });
                var todoParentElement=this.parentNode.parentNode.parentNode.parentNode;
                var currentToDo=this.parentNode.parentNode.parentNode;
                todoParentElement.removeChild(currentToDo);
                ToDoApp.setDataOnLocalStorage();
                setTotalItem(domElement.totalLabel.getAttribute("value")-1);
            }
        },
        prepareModel:function(){
            var id=domElement.hiddenId.getAttribute("value");
            return {
                id:id ? id : null,
                title:domElement.title.value,
                description:domElement.description.value,
                status:"Pending"
            }
        },
        validateModel:function(todoModel,allTodo,isEdit){
        if(todoModel.title==""){
            domElement.alert.innerHTML="<strong>Warning!</strong> You left the to-do Title empty";
            domElement.alert.style.display = "block";
            return false;
        }
            var duplicateToDoItem= allTodo.filter(function (item) {
                return item.title.toUpperCase()== todoModel.title.toUpperCase();
            });
            if(isEdit){
                duplicateToDoItem = duplicateToDoItem.filter(function (item) {
                    return item.id!=todoModel.id;
                });
            }
            if(duplicateToDoItem.length>0){
                domElement.alert.innerHTML="<strong>Warning!</strong> Title already exist!!";
                domElement.alert.style.display = "block";
                return false;
            }
            else{
                domElement.alert.style.display = "none";
            }
            return true;
        },
        openModal:function(element,toDoItem){
            if(toDoItem){
                domElement.todoHeader.innerHTML="Update ToDo";
                domElement.createButton.setAttribute("value","Update");
                domElement.title.value=toDoItem.title;
                domElement.description.value=toDoItem.description;
            }
            else {
                domElement.todoHeader.innerHTML = "New ToDo";
                domElement.createButton.setAttribute("value","Create");
            }
            domElement.modalDiv.style.display = "block";
            domElement.title.focus();
        },
        closeModal:function(){
            ToDoApp.clearModalData();
            domElement.modalDiv.style.display = "none";
        },
        clearModalData:function(){
            domElement.hiddenId.value=null;
            domElement.title.value=null;
            domElement.description.value=null;
            domElement.alert.style.display = "none";
        },
        removeValidationMessage:function(){
            domElement.alert.innerHTML=null;
            domElement.alert.style.display = "none";
        }
    }

    function bindCheckBoxClickEvent(){
        var checkBoxes=domElement.allCheckBox;
        for (var i = 0; i < checkBoxes.length; i++) {
            checkBoxes[i].addEventListener("change", ToDoApp.checkBoxClicked);
        }
    }

    function bindEditButtonClickEvent(){
        var editButtons=domElement.allEditButton;
        for (var i = 0; i < editButtons.length; i++) {
            editButtons[i].addEventListener("click", ToDoApp.openModalForEdit);
        }
    }

    function bindDeleteButtonClickEvent(){
        var deleteButtons=domElement.allDeleteButton;
        for (var i = 0; i < deleteButtons.length; i++) {
            deleteButtons[i].addEventListener("click", ToDoApp.deleteToDoItem);
        }
    }

    function bindStatusRadioButtonClickEvent(){
        var radioButtons=domElement.statusRadioButton;
        for (var i = 0; i < radioButtons.length; i++) {
            radioButtons[i].addEventListener("click", ToDoApp.statusRadioButtonClicked);
        }
    }

    function setTotalItem(total){
        domElement.totalLabel.setAttribute("value",total);
        domElement.totalLabel.innerHTML='<b>Total : '+total+'</b>';
    }

    function prepareToDoItems(todos){
        ToDoApp.sortByTitle(todos);
        setTotalItem(todos.length);
        domElement.todoListDiv.innerHTML="";
        var html='';
        for(var i=0;i<todos.length;i++){
            var backgroundColorClass="";
            var titleTextDecorationClass="";
            if(todos[i].status=="Done") {
                backgroundColorClass = "todo-item";
                titleTextDecorationClass="line-through";
            }
            html+='<div class="todoDiv '+backgroundColorClass+'">'
            html+='<div class="padding-2">'
            html+='<div class="width-70pc float-left '+titleTextDecorationClass+'"><b>Title: '+todos[i].title+'</b></div>'
            html+='<div class="width-30pc float-left">'
            if(todos[i].status=="Pending")
                html+='<input type="checkbox" class="checkbox" value="'+todos[i].id+'">'
            else
                html+='<input type="checkbox" checked class="checkbox" value="'+todos[i].id+'">'
            html+='<button title="Edit" class="btnEdit link" value="'+todos[i].id+'">Edit | </button>'
            html+='<button title="Delete" class="btnDelete link" value="'+todos[i].id+'">Delete</button>'
            html+='</div>'
            html+='</div>'
            html+='<div class="padding-2">Description: '+todos[i].description+'</div>'
            html+='</div>'
        }
        if(todos.length<=0){
            html+='<div class="todoDiv '+backgroundColorClass+'">'
            html+='No data found..</div>'
            domElement.todoListDiv.innerHTML = html;
        }
        else {
            domElement.todoListDiv.innerHTML = html;
            bindCheckBoxClickEvent();
            bindEditButtonClickEvent();
            bindDeleteButtonClickEvent();
        }
    }

    function addEventListener(){
        domElement.openModal.addEventListener("click", ToDoApp.openModal);
        domElement.closeModal.addEventListener("click", ToDoApp.closeModal);
        domElement.cancelButton.addEventListener("click", ToDoApp.closeModal);
        domElement.searchButton.addEventListener("click", ToDoApp.search);
        domElement.createButton.addEventListener("click", ToDoApp.createOrUpdate);
        domElement.searchButton.addEventListener("click", ToDoApp.search);
        domElement.title.addEventListener("focus", ToDoApp.removeValidationMessage);
        domElement.searchBox.addEventListener("keypress", function(){
            setTimeout(function(){
                ToDoApp.search();
            },500)
        });
        domElement.searchBox.addEventListener("keyup", function(){
            setTimeout(function(){
                ToDoApp.search();
            },500)
        });
        window.onclick = function(event) {
            if (event.target == domElement.modalDiv) {
                domElement.modalDiv.style.display = "none";
            }
        }
        bindStatusRadioButtonClickEvent();
    }

    function init(){
        prepareToDoItems(ToDoApp.getAllFromLocalStorage());
        bindCheckBoxClickEvent();
        bindEditButtonClickEvent();
        bindDeleteButtonClickEvent();
    }

    addEventListener();
    init();

})();