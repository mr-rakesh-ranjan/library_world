console.log('this is js');

//constructor
function Book(name, author, type) {
    this.name = name;
    this.author = author;
    this.type = type;
}

//display constructor
function Display() {

}

// Add method to display protype
Display.prototype.add = function (book) {
    console.log('adding to UI');
    let tableBody = document.getElementById('tableBody');
    let uistring = `<tr>
                        <td>${book.name}</td>
                        <td>${book.author}</td>
                        <td>${book.type}</td>
                    </tr>`
    tableBody.innerHTML += uistring;
}

// implement clear function
Display.prototype.clear = function () {
    let libraryForm = document.getElementById('libraryForm')
    libraryForm.reset();
}

// implement validate function
Display.prototype.validate = function (book) {
    if (book.name.length < 3 || book.author.length < 3) {
        return false;
    } else {
        return true;
    }
}

Display.prototype.show = function (type, showMessage) {
    let message = document.getElementById('message');
    message.innerHTML = `<div class="alert alert-${type} alert-dismissible fade show" role="alert">
                            <strong>Message:</strong>  ${showMessage}
                            <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                        </div>`
    setTimeout(() => {
        message.innerHTML = ''
    }, 2000);

}


//Add submit event listener to form
let libraryForm = document.getElementById('libraryForm');
libraryForm.addEventListener('submit', libraryFormSubmit);

function libraryFormSubmit(e) {
    console.log('you have submitted form ');
    let name = document.getElementById('bookname').value;
    let author = document.getElementById('author').value;

    let friction = document.getElementById('friction');
    let programming = document.getElementById('programming');
    let osystem = document.getElementById('osystem');

    let type;

    if (friction.checked) {
        type = friction.value;
    } else if (programming.checked) {
        type = programming.value;
    } else if (osystem.checked) {
        type = osystem.value;
    }
    let book = new Book(name, author, type);
    console.log(book);

    let display = new Display();
    if (display.validate(book)) {
        display.add(book);
        display.clear();
        display.show('success', ' Your book has added successfully');
    } else {
        //show error to the user
        display.show('danger', ' Ooops... You cannot add this book');
    }
    e.preventDefault();
}
