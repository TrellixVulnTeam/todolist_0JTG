const list = document.querySelector('nav ul');
const newList = document.getElementById('new-list-button')

newList.addEventListener('click', ()=>{
    listName();
})



function listName(){
    let newListName = document.createElement('input');
    list.appendChild(newListName);
    newListName.focus();
    let searchInput="";
    newListName.addEventListener('keydown', (e)=>{
        if(e.key === "Enter"){
            searchInput = newListName.value;
            createNewList();
        }
    })
    function createNewList(){
        console.log(searchInput);
        list.removeChild(newListName);
    }
}


