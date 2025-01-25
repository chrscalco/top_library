const myLibrary = [];

function Book(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
    this.listNum = 0;
    this.info = function () {
        if (read) {
            return "The " + title + " by " + author + ", "  + pages + " pages has been read.";
        } else {
            return "The " + title + " by " + author + ", "  + pages + " pages has not been read yet.";
        }
    }

    this.changeInfo = function () {
        read = !read;
    }
}

function addBookToLibrary (title, author, pages, read) {
    book = new Book(title, author, pages, read);
    myLibrary.push(book);
}

function removeBookFromLibrary (num) {
    myLibrary.splice(num,1);
}

function refreshList (arr) {
    for(i=0; i<arr.length; i++) {
        const bookValue = document.getElementsByClassName("book")[i];
        bookValue.setAttribute("value", i);
        arr[i].listNum = i;
    }
}

function createButtons(book) {

    const buttonDiv = document.createElement("div");
    const deleteButton = document.createElement("button");
    const readButton = document.createElement("button");

    buttonDiv.setAttribute("id", "buttons-div");
    deleteButton.setAttribute("id", "delete-button");
    readButton.setAttribute("id", "read-button");

    deleteButton.textContent = "Remove";
    readButton.textContent = "Read";

    buttonDiv.appendChild(readButton);
    buttonDiv.appendChild(deleteButton);
    book.appendChild(buttonDiv);

    deleteButton.addEventListener("click", () => {

        let num = book.getAttribute("value");
        container.removeChild(document.getElementsByClassName("book")[num]);
        removeBookFromLibrary(num);
        refreshList(myLibrary);
    })

    readButton.addEventListener("click", () => {
        let num = book.getAttribute("value");
        myLibrary[num].changeInfo();
        const toggleRead = document.getElementsByClassName("read")[num];
        toggleRead.textContent = myLibrary[num].info();
    })

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

        arr[i].listNum = i;

        const book = document.createElement("div");
        book.classList.add("book");
        book.setAttribute("value", i);
        

        const titleText = document.createElement("h2");
        titleText.textContent = arr[i].title;
        const authorText = document.createElement("h3");
        authorText.textContent = "Author: " + arr[i].author;
        const pagesText = document.createElement("h3");
        pagesText.textContent = arr[i].pages + " pages";
        const readText = document.createElement("p");
        readText.classList.add("read");
        readText.textContent = arr[i].info();
        
        book.appendChild(titleText);
        book.appendChild(authorText);
        book.appendChild(pagesText);
        book.appendChild(readText);
        createButtons(book);

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