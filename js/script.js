const addBox = document.querySelector(".add-box"),
popupBox = document.querySelector(".popup-box"),
popupTitle = popupBox.querySelector("header p"),
closeIcon = popupBox.querySelector("header i"),
titleTag = popupBox.querySelector("input"),
descTag = popupBox.querySelector("textarea"),
addBtn = popupBox.querySelector("button");

const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

// getting localstorage notes if exist and parsing them
// to js object else passing an empty array to notes
const notes = JSON.parse(localStorage.getItem("notes") || "[]");
let isUpdate = false, updateId;

addBox.addEventListener("click", () => {
    titleTag.focus();
    popupBox.classList.add("show");
});

closeIcon.addEventListener("click", () => {
    isUpdate = false;
    titleTag.value = "";
    descTag.value = "";
    addBtn.innerText = "Add Note";
    popupTitle.innerText = "Add a new Note";
    popupBox.classList.remove("show");
    document.getElementById('note1').classList.remove('popupRead');
});

function showNotes(){
    document.querySelectorAll(".note").forEach(note => note.remove());
    notes.forEach((note, index) => {
        let liTag = `<li class="note">
                        <div onclick = "readNote(${index}, '${note.title}', '${note.description}')" class="details">
                            <p>${note.title}</p>
                            <span>${note.description}</span>
                        </div>
                        <div class="bottom-content">
                            <span>${note.date}</span>
                            <div class="settings">
                                <i onclick = "showMenu(this)" class="uil uil-ellipsis-h"></i>
                                <ul class="menu">
                                    <li onclick = "updateNote(${index}, '${note.title}', '${note.description}')"><i class="uil uil-pen"></i>Edit</li>
                                    <li onclick = "deleteNote(${index})"><i class="uil uil-trash"></i>Delete</li>
                                </ul>
                            </div>
                        </div>
                    </li>`;
                    addBox.insertAdjacentHTML("afterend", liTag);
                    console.log(index);
    });
}
showNotes();

function showMenu(elem){
    elem.parentElement.classList.add("show");
    document.addEventListener("click", e => {
        // removing show class from the settings menu on document click
        if(e.target.tagName != "I" || e.target != elem){
            elem.parentElement.classList.remove("show");
        }
    });
}

function deleteNote(noteId){
    let confirmDel = confirm("Are you sure you want to delete this note?");
    if(!confirmDel) return;
    notes.splice(noteId, 1); // removing selected note from array/tasks
    // saving update notes to localstorage
    localStorage.setItem("notes", JSON.stringify(notes));
    showNotes();
}

function updateNote(noteId, title, desc){
    isUpdate = true;
    updateId = noteId;
    addBox.click();
    titleTag.value = title;
    descTag.value = desc;
    addBtn.innerText = "Update Note";
    popupTitle.innerText = "Update a Note";
    console.log(noteId, title, desc);
}

function readNote(noteId, title, desc){
    isUpdate = true;
    updateId = noteId;
    addBox.click();
    titleTag.value = title;
    descTag.value = desc;
    addBtn.innerText = "Save";
    popupTitle.innerText = "Read a Note";
    console.log(noteId, title, desc);
    document.getElementById('note1').classList.add('popupRead');
}

addBtn.addEventListener("click", e => {
    e.preventDefault();
    let noteTitle = titleTag.value, 
    noteDesc = descTag.value;

    if(noteTitle || noteDesc){
        // getting month, day, year from the current date
        let dateObj = new Date();
        month = months[dateObj.getMonth()],
        day = dateObj.getDate(),
        year = dateObj.getFullYear();

        let noteInfo = {
            title: noteTitle, description: noteDesc,
            date: `${month} ${day}, ${year}`
        }
        
        if(!isUpdate){
            notes.push(noteInfo); // adding new note to notes
        }else{
            isUpdate = false;
            notes[updateId] = noteInfo; // updating new note to notes
        }
        // saving notes to localstorage
        localStorage.setItem("notes", JSON.stringify(notes));
        closeIcon.click();
        showNotes();
    }
});

function firstNote(){

    var one1 = localStorage.getItem("one");

    if(one1 != '1'){
        let fnoteTitle = '&#128722; Shopping',
        fnoteDesc = '&#128204; Note 1: ... &#128204; Note 2: ... &#128204; Note 3: ... ';
        let snoteTitle = '&#128170; Personal',
        snoteDesc = '&#128204; Note 1: ... &#128204; Note 2: ... &#128204; Note 3: ... ';
        let tnoteTitle = '&#128188; Work',
        tnoteDesc = '&#128204; Note 1: ... &#128204; Note 2: ... &#128204; Note 3: ... ';

        let dateObj = new Date();
            month = months[dateObj.getMonth()],
            day = dateObj.getDate(),
            year = dateObj.getFullYear();

        let noteInfo = {
            title: fnoteTitle, description: fnoteDesc,
            date: `${month} ${day}, ${year}`
        }

        let noteInfo1 = {
            title: snoteTitle, description: snoteDesc,
            date: `${month} ${day}, ${year}`
        }

        let noteInfo3 = {
            title: tnoteTitle, description: tnoteDesc,
            date: `${month} ${day}, ${year}`
        }

        notes.push(noteInfo, noteInfo1, noteInfo3);

        localStorage.setItem("notes", JSON.stringify(notes));
        showNotes();
        localStorage.setItem('one', '1');
        console.log("else");
    }else{
    }
}
firstNote();

