const add = document.getElementById('add');
const formAdd = document.getElementById('form-add');
const send = document.getElementById('send');
const cancel = document.getElementById('cancel');
const enterTask = document.getElementById('enter-task');



let db = '';
let openRequest = indexedDB.open("db");

function chargement(){

    openRequest.onupgradeneeded = function(){
        db = openRequest.result;
    
        if(!db.objectStoreNames.contains('lists')){
            db.createObjectStore('lists', {autoIncrement: true});
        }
    };
    
    openRequest.onerror = function(){
        console.log(`Impossible d'accéder à IndexedDB`);
    };
    
    openRequest.onsuccess = function(){
        db = openRequest.result;
        let transaction = db.transaction('lists', 'readwrite');
    
        let lists = transaction.objectStore('lists');
    
    
        let read = lists.getAll();
        read.onsuccess = function(){
            for(let i=0; i<read.result.length; i++){
                let Lists = document.querySelector('.lists');
                let List = document.createElement('div');
                List.className = "list";
                List.setAttribute("id", i+1);
                Lists.append(List);
                let listName = document.createElement('div');
                listName.className = "list-name";
                List.append(listName);
                listName.textContent = read.result[i].title;
                let symbolePlus = document.createElement('div');
                symbolePlus.className = "symbol-plus";
                listName.append(symbolePlus);
                let dots = document.createElement('div');
                dots.className = "dots";
                listName.append(dots);
                let options = document.createElement('div');
                options.className = "options";
                listName.append(options);
                let renommer = document.createElement('p');
                renommer.textContent = "Renommer";
                options.append(renommer);
                let supprimer = document.createElement('p');
                supprimer.textContent = "Supprimer";
                options.append(supprimer);
                let Tasks = document.createElement('div')
                Tasks.className = "tasks";
                List.append(Tasks);
                listName.append(dots);
                let buttons = document.createElement('div');
                buttons.className = "buttons";
                List.append(buttons);
                let button1 = document.createElement('button');
                button1.className = "new-task";
                buttons.append(button1);
                button1.textContent = "Add new task";
                let button2 = document.createElement('button');
                button2.className = "del-checked";
                buttons.append(button2);
                button2.textContent = "Del checked";
                let u = 0;
                for(value of read.result[i].tasks){
                    let Task = document.createElement('div');
                    Task.className = "task";
                    Task.textContent = read.result[i].tasks[u].newTask
                    Tasks.append(Task);
                    let check = document.createElement('div');
                    check.className = u;
                    check.classList.add("check");
                    Task.append(check);
                    function valCheck(){
                        let id = read.result[i].tasks[u].id;
                        if(id === 1){
                            check.classList.add("check-val");
                        }
                    }
                    valCheck();
    
                    check.addEventListener('click', ()=>{
                        let transaction = db.transaction('lists', 'readwrite');
                        let lists = transaction.objectStore('lists');
                        idT = Number.parseFloat(check.getAttribute('class'));
                        let parent = check.parentNode;
                        let gParent = parent.parentNode;
                        let ancestore = gParent.parentNode;
                        let index = ancestore.getAttribute('id');
                        index = parseInt(index);
                        let id = read.result[index-1].tasks[idT].id;
                        if(id === 0){
                            let list = read.result[index-1];
                            list.tasks[idT].id = 1;
                            lists.delete(index);
                            lists.add(list, index);
                            console.log(list);
                        }else{
                            let list = read.result[index-1];
                            list.tasks[idT].id = 0;
                            lists.delete(index);
                            lists.add(list, index);
                        }
                        location.reload();
                    })
                    button2.addEventListener('click',()=>{
                        let transaction = db.transaction('lists', 'readwrite');
                        let lists = transaction.objectStore('lists');
                        let parent = check.parentNode;
                        let gParent = parent.parentNode;
                        let ancestore = gParent.parentNode;
                        let index = ancestore.getAttribute('id');
                        index = parseInt(index);
                        let list = read.result[index-1];
                        for(let v=0; v<list.tasks.length; v++){
                            if(list.tasks[v].id === 1){
                                list.tasks.splice(v, 1);
                                lists.delete(index);
                                lists.add(list, index);
                                location.reload();
                            }
                        }
                    } )
                    dots.addEventListener('click', ()=>{
                        options.classList.toggle('options-val')
                    })

                    renommer.addEventListener('click', ()=>{
                        let renameList = document.createElement('div');
                        renameList.className = "rename-list";
                        renameList.textContent = "Rename list";
                        Lists.append(renameList);
                        let inputRename = document.createElement('input');
                        inputRename.setAttribute("type", "text");
                        inputRename.setAttribute("maxlength", "20")
                        renameList.append(inputRename);
                        inputRename.focus();
                        let sendRename = document.createElement('button');
                        sendRename.textContent = "Send";
                        renameList.append(sendRename);
                        let cancelRenameList = document.createElement('button');
                        cancelRenameList.textContent = "Cancel";
                        renameList.append(cancelRenameList);
                            sendRename.addEventListener('click', ()=>{
                            let transaction = db.transaction('lists', 'readwrite');
                            let lists = transaction.objectStore('lists');
                            let parent = check.parentNode;
                            let gParent = parent.parentNode;
                            let ancestore = gParent.parentNode;
                            let index = ancestore.getAttribute('id');
                            index = parseInt(index);
                            let list = read.result[index-1];
                            list.title = inputRename.value;
                            lists.delete(index);
                            lists.add(list, index);
                            location.reload();
                            })
                            cancelRenameList.addEventListener('click', ()=>{
                                location.reload();
                            })
                    })
                    supprimer.addEventListener('click', ()=>{
                        let transaction = db.transaction('lists', 'readwrite');
                        let lists = transaction.objectStore('lists');
                        let parent = check.parentNode;
                        let gParent = parent.parentNode;
                        let ancestore = gParent.parentNode;
                        let index = ancestore.getAttribute('id');
                        index = parseInt(index);
                        lists.delete(index);
                        location.reload();
                    })
                    u++;
                }
                
    
                button1.addEventListener('click', ()=>{
                    enterTask.className = "enter-task-active";
                    let taskInput = document.querySelector('#enter-task input');
                    taskInput.focus();
                    let parent = button1.parentNode;
                    let gparent = parent.parentNode;
                    let key = gparent.getAttribute('id');
                        key = parseInt(key);
                    let sendTask = document.getElementById('send-task');
                    sendTask.addEventListener('click', ()=>{
                        let transaction = db.transaction('lists', 'readwrite');
                        let lists = transaction.objectStore('lists');
                        let newTask = document.querySelector('#enter-task input').value;
                        newTask = {newTask};
                        newTask.id = 0;
                        let list = read.result[key-1];
                        list.tasks.push(newTask);
                        lists.delete(key);
                        lists.add(list, key)
                        enterTask.className = "";
                        location.reload();
                    });
                    let cancelTask = document.getElementById('cancel-task');
                    cancelTask.addEventListener('click', ()=> enterTask.className = "")
                })
            }
            console.log(read.result[0].tasks[0].id)
        }
    };
}
chargement();


add.addEventListener('click',()=>{
    formAdd.className = "form-add-active";
    let forInput = document.querySelector('#form-add input');
    forInput.focus();
});

send.addEventListener('click',()=>{
    let formAddInput = document.querySelector('#form-add input').value;
    if(formAddInput === ""){
        document.getElementById('mess-validation').textContent = "Merci de rentrer un nom de liste";
    }else{
        db = openRequest.result;
        let transaction = db.transaction('lists', 'readwrite');
        transaction.oncomplete = function(){
            console.log(`Transaction terminée`);
        }

        let lists = transaction.objectStore('lists');

        let list = {
            title: formAddInput,
            tasks: []
        }

        let ajout = lists.add(list);

        ajout.onsuccess = function(){
            console.log(`nouvelle liste ajoutée avec succès`);
        };

        ajout.onerror = function(){
            console.log(`Erreur: ${ajout.error}`)
        }
        formAdd.className = "";
        location.reload();
    }
})

cancel.addEventListener('click', ()=> {
    formAdd.className ="";
    document.getElementById('mess-validation').textContent = "";
})


