/**
 * Created by Raju Hasan on 14/02/2017.
 */
'use strict';
(function(){    
    window.ToDoApp=window.ToDoApp||{};
	
    var enumData=window.ToDoApp.EnumFactory.getDomRelatedEnum();
    
    function getDomElement(){
		return{
            searchBox:document.getElementById(enumData.IdTagEnum.SearchBox),
            searchButton:document.getElementById(enumData.IdTagEnum.SearchButton),
            addNewButton:document.getElementById(enumData.IdTagEnum.AddNewButton),
            closeModalButton:document.getElementById(enumData.IdTagEnum.CloseModalButton),
            totalLabel:document.getElementById(enumData.IdTagEnum.TotalLabel),			            
            toDoItemContainer:document.getElementById(enumData.IdTagEnum.ToDoItemContainer),
            toDoModal:document.getElementById(enumData.IdTagEnum.ToDoModal),
            modalHeader:document.getElementById(enumData.IdTagEnum.ModalHeader),
            title:document.getElementById(enumData.IdTagEnum.Title),
            description:document.getElementById(enumData.IdTagEnum.Description),
            cancelButton:document.getElementById(enumData.IdTagEnum.CancelButton),
            createButton:document.getElementById(enumData.IdTagEnum.CreateButton),
            validationMessageLabel:document.getElementById(enumData.IdTagEnum.ValidationMessageLabel),
            hiddenInputId:document.getElementById(enumData.IdTagEnum.HiddenInputId),
            checkBox:document.getElementsByClassName(enumData.ClassTagEnum.CheckBox),
            editButton:document.getElementsByClassName(enumData.ClassTagEnum.EditButton),
            deleteButton:document.getElementsByClassName(enumData.ClassTagEnum.DeleteButton),
            statusRadioButton:document.getElementsByName(enumData.NameTagEnum.StatusRadioButton),
           }
    }
    function getDomEnum(){
        return{
           LabelEnum: enumData.LabelEnum,
           StyleEnum:enumData.StyleEnum,
           AttributeEnum:enumData.AttributeEnum,
           EventEnum:enumData.EventEnum,
           StatusEnum:enumData.StatusEnum,
           MessageEnum:enumData.MessageEnum
        }
    }

    var domElement=getDomElement();
    function setTotalItem(total){
        domElement.totalLabel.setAttribute("value",total);
        domElement.totalLabel.innerHTML='<b>Total : '+total+'</b>';
    }

    function renderToDoItemDom(todos){
        setTotalItem(todos.length);
        domElement.toDoItemContainer.innerHTML="";
        for(var i=0;i<todos.length;i++){
            var backgroundColorClass="";
            var titleTextDecorationClass="";
            if(todos[i].status=="Done") {
                backgroundColorClass = "todo-item";
                titleTextDecorationClass="line-through";
            }
            var mainDiv=document.createElement("div");
            mainDiv.setAttribute('class', 'todoDiv');
            if(backgroundColorClass)
                mainDiv.classList.add(backgroundColorClass);

            var innerDiv=document.createElement("div");
            innerDiv.setAttribute('class', 'padding-2');

            /*Title Div*/
            var titleDiv=document.createElement("div");
            titleDiv.setAttribute('class', 'width-70pc float-left');
            if(titleTextDecorationClass)
            titleDiv.classList.add(titleTextDecorationClass);
            var title = document.createElement("b");
            title.append(document.createTextNode('Title: '+todos[i].title));
            titleDiv.appendChild(title);

            innerDiv.appendChild(titleDiv);

            /*Button Div*/
            var buttonDiv=document.createElement("div");
            buttonDiv.setAttribute('class', 'width-30pc float-left');

            var checkBoxInput = document.createElement("input");
            checkBoxInput.setAttribute('type', 'checkbox');
            checkBoxInput.setAttribute('class', 'checkbox');
            checkBoxInput.value=todos[i].id;
            if(todos[i].status=="Pending")
                checkBoxInput.checked=false;
            else
                checkBoxInput.checked=true;

            buttonDiv.appendChild(checkBoxInput);

            var editButton = document.createElement("BUTTON");
            editButton.setAttribute('class', 'btnEdit link');
            editButton.value=todos[i].id;
            editButton.appendChild(document.createTextNode("Edit | "));

            buttonDiv.appendChild(editButton);

            var deleteButton = document.createElement("BUTTON");
            deleteButton.setAttribute('class', 'btnDelete link');
            deleteButton.value=todos[i].id;
            deleteButton.appendChild(document.createTextNode("Delete"));
            buttonDiv.appendChild(deleteButton);
            innerDiv.appendChild(buttonDiv);

            /*Description Div*/
            var descDiv=document.createElement("div");
            descDiv.setAttribute('class', 'padding-2');
            descDiv.appendChild(document.createTextNode('Description: '+todos[i].description));
            innerDiv.appendChild(descDiv);
            mainDiv.appendChild(innerDiv);

            domElement.toDoItemContainer.appendChild(mainDiv);
        }

        /*Empty Data Div*/
        if(todos.length<=0){
            var emptyDataDiv=document.createElement("div");
            emptyDataDiv.setAttribute('class', 'todoDiv');
            emptyDataDiv.appendChild(document.createTextNode('No data found..'));
            domElement.toDoItemContainer.appendChild(emptyDataDiv);
        }
    }
    window.ToDoApp.ViewFactory={
		getDomElement:getDomElement,
        getDomEnum:getDomEnum,
        renderToDoItemDom:renderToDoItemDom,
        setTotalItem:setTotalItem
	};
})();