const $noteTitle = $(".note-title");
const $noteText = $(".note-textarea");
const $saveNoteBtn = $(".save-note");
const $newNoteBtn = $(".new-note");
const $noteList = $(".list-container .list-group");

let activeNote = {};

const getNotes = () => {
  return $.ajax({
    url: "/api/notes",
    method: "GET",
  });
};

const saveNote = (note) => {
  return $.ajax({
    url: "/api/notes",
    data: note,
    method: "POST",
  });
};

const deleteNote = (id) => {
  return $.ajax({
    url: "api/notes/" + id,
    method: "DELETE",
  });
};

const editNote = function(id) {
  return $.ajax({
    url: "api/notes/" + id,
    method: "PUT"
  })
};

const renderActiveNote = () => {
  hide(saveNoteBtn);

  if (activeNote.id) {
    $noteTitle.attr("readonly", true);
    $noteText.attr("readonly", true);
    $noteTitle.val(activeNote.title);
    $noteText.val(activeNote.text);
  } else {
    $noteTitle.attr("readonly", false);
    $noteText.attr("readonly", false);
    $noteTitle.val("");
    $noteText.val("");
  }
};

const handleNoteSave = () => {
  const newNote = {
    title: noteTitle.value,
    text: noteText.value,
  };
  saveNote(newNote).then(() => {
    getAndRenderNotes();
    renderActiveNote();
  });
};

const handleNoteDelete = (e) => {
  e.stopPropagation();

  const note = $(this).parent(".list-group-item").data();

  if (activeNote.id === note.id) {
    activeNote = {};
  }

  deleteNote(note.id).then(() => {
    getAndRenderNotes();
    renderActiveNote();
  });
};

const handleNoteView = (e) => {
  e.preventDefault();
  activeNote = {},
  renderActiveNote();
};

// // Sets the activeNote to and empty object and allows the user to enter a new note
const handleNewNoteView = (e) => {
  activeNote = {};
  renderActiveNote();
};

// const handleRenderSaveBtn = () => {
  if (!$noteTitle.value().trim() || !$noteText.value.trim()) {
    $saveNoteBtn.hide();
  } else {
    $saveNoteBtn.show();
  }
};

const renderNoteList = async (notes) => {
  $noteList.empty();

  const noteListItems = [];


//   // Returns HTML element with or without a delete button
  const create$Li = (text, withdelBtn = true) => {
    const $li = $("<li class='list-group-item'>");
    const $span = $("<span>").text(text);
    $li.append($span);


//     if (delBtn) {
//       const delBtnEl = document.createElement('i');
//       delBtnEl.classList.add(
//         'fas',
//         'fa-trash-alt',
//         'float-right',
//         'text-danger',
//         'delete-note'
//       );
//       delBtnEl.addEventListener('click', handleNoteDelete);

//       liEl.append(delBtnEl);
//     }

//     return liEl;
//   };

//   if (jsonNotes.length === 0) {
//     noteListItems.push(createLi('No saved Notes', false));
//   }

//   jsonNotes.forEach((note) => {
//     const li = createLi(note.title);
//     li.dataset.note = JSON.stringify(note);

//     noteListItems.push(li);
//   });

//   if (window.location.pathname === '/notes') {
//     noteListItems.forEach((note) => noteList[0].append(note));
//   }
// };

// // Gets notes from the db and renders them to the sidebar
// const getAndRenderNotes = () => getNotes().then(renderNoteList);

// if (window.location.pathname === '/notes') {
//   saveNoteBtn.addEventListener('click', handleNoteSave);
//   newNoteBtn.addEventListener('click', handleNewNoteView);
//   noteTitle.addEventListener('keyup', handleRenderSaveBtn);
//   noteText.addEventListener('keyup', handleRenderSaveBtn);
// }

getAndRenderNotes();
