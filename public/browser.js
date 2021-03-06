function itemTemplate(item){
    return `<li class="list-group-item list-group-item-action d-flex align-items-center justify-content-between">
						<span class="item-text">${item.text}</span>
						<div>
						  <button data-id="${item._id}" class="edit-me btn btn-secondary btn-sm mr-1">Edit</button>
						  <button data-id="${item._id}" class="delete-me btn btn-danger btn-sm">Delete</button>
						</div>
					  </li>`;
}

//init page load render
let ourHTML = items.map((item) => {
    return itemTemplate(item);
}).join('');
document.getElementById("item-list").insertAdjacentHTML("beforeend",ourHTML);

//Create Feature
let createField = document.getElementById("create-field");
document.getElementById("create-form").addEventListener("submit", (e) => {

    e.preventDefault();

    axios.post('/create-item', {text: createField.value}).then((response) => {
        //create the item html
        document.getElementById("item-list").insertAdjacentHTML("beforeend",itemTemplate(response.data));
        createField.value = "";
        createField.focus();
    }).catch(() => {
        console.log("please try again later");
    });

});

document.addEventListener("click", (e) => {

    //for deleting:
    if (e.target.classList.contains("delete-me")) {
        if(confirm("Are you sure you want to delete this item?")){
            axios.post('/delete-item', {id: e.target.getAttribute("data-id") }).then(() => {
                e.target.parentElement.parentElement.remove();
            }).catch(() => {
                console.log("please try again later");
            });
        }
    }

    //for deleting all:
    if (e.target.classList.contains("delete-all")) {
        if(confirm("Are you sure you want to delete all the items?")){
            axios.post('/delete-all', {}).then(() => {
                
                document.getElementById('item-list').innerHTML = '';

            }).catch(() => {
                console.log("please try again later");
            });
        }
    }

    //for updating:
    if (e.target.classList.contains("edit-me")) {

        let userInput = prompt("Enter your desired new text", e.target.parentElement.parentElement.querySelector(".item-text").innerHTML);

        if(userInput){
            axios.post('/update-item', { text: userInput, id: e.target.getAttribute("data-id") }).then(() => {
                e.target.parentElement.parentElement.querySelector(".item-text").innerHTML = userInput;
            }).catch(() => {
                console.log("please try again later");
            });
        }

    }


});