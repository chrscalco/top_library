const myLibrary = [];

function Book(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
    this.info = function () {
        if (read === true) {
            return "The " + title + " by " + author + ", "  + pages + " pages has been read.";
        } else {
            return "The " + title + " by " + author + ", "  + pages + " pages has not been read yet.";
        }
    }
}

function addBookToLibrary (title, author, pages, read) {
    book = new Book(title, author, pages, read);
    myLibrary.push(book);
}

addBookToLibrary("The Fellowship of the Ring","J.R.R. Tolkien", 423, true);
addBookToLibrary("The Two Towers", "J.R.R. Tolkien", 353, false);
addBookToLibrary("The Return of the King", "J.R.R. Tolkien", 416, false)

console.log(myLibrary);

const container = document.querySelector("#container");
console.log(container);

function showLibrary(arr) {

    while(container.firstChild) {
        container.firstChild.remove();
    }

    for (i=0; i<arr.length; i++) {

        const book = document.createElement("div");
        book.classList.add("book");

        const titleText = document.createElement("h2");
        titleText.textContent = arr[i].title;
        const authorText = document.createElement("h3");
        authorText.textContent = "Author: " + arr[i].author;
        const pagesText = document.createElement("h3");
        pagesText.textContent = arr[i].pages + " pages";
        const readText = document.createElement("p");
        readText.textContent = arr[i].info();
        
        book.appendChild(titleText);
        book.appendChild(authorText);
        book.appendChild(pagesText);
        book.appendChild(readText);
        container.appendChild(book);
    }
}

showLibrary(myLibrary);

const addButton = document.getElementById("add");
const openDialog = document.getElementById("book-dialog");

addButton.addEventListener("click" , () => {
    openDialog.showModal();
})

const closeDialog = document.getElementById("close-modal");

closeDialog.addEventListener("click", (e) => {
    e.preventDefault();
    openDialog.close();
})

const saveBook = document.getElementById("save-book");

saveBook.addEventListener("click", (e) => {
    
    e.preventDefault();
    let title = document.getElementById("title").value;
    let author = document.getElementById("author").value;
    let pages = document.getElementById("pages").value;
    let read = document.querySelector('input[name="read"]:checked').value;

    addBookToLibrary(title,author,pages,read);
    showLibrary(myLibrary);  
    
    openDialog.close();
})