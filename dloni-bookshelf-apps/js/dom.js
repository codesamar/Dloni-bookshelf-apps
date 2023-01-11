const UNCOMPLETED_BOOK = "unread";
const COMPLETED_BOOK = "read";
const ITEM_BOOK = "itemId";
const cariBuku = document.querySelector("#searchBookTitle")

cariBuku.addEventListener("keyup", pencarianBuku);

function addBook(){
    const uncompletedBook = document.getElementById(UNCOMPLETED_BOOK);

    const inputTitle = document.getElementById("inputBookTitle").value;
    const inputAuthor = document.getElementById("inputBookAuthor").value;
    const inputYear = document.getElementById("inputBookYear").value;

    const book = makeBook(inputTitle, "Penulis : " + inputAuthor, "Tahun : " + inputYear, false);
    const bookObject = composeBookObject(inputTitle, inputAuthor, inputYear, false);

    book[ITEM_BOOK] = bookObject.id;
    books.push(bookObject);

    uncompletedBook.append(book);
    updateDataStorage();
}

function makeBook(judul, penulis, tahun, isCompleted) {
    const image = document.createElement('img')
    if(isCompleted) {
        image.setAttribute('src', 'assets/read-book.jpg')
    } else {
        image.setAttribute('src', 'assets/unread-book.jpg')
    }

    const bookImage = document.createElement('div');
    bookImage.classList.add('image-book');
    bookImage.append(image);

    const bookTitle = document.createElement("h3");
    bookTitle.innerText = judul;

    const bookAuthor = document.createElement("h5");
    bookAuthor.innerText = penulis;

    const bookYear = document.createElement("p");
    bookYear.innerText = tahun;

    const textContainer = document.createElement("div");
    textContainer.classList.add("containerBook");
    textContainer.append(bookTitle, bookAuthor, bookYear);

    const container = document.createElement("div");
    container.classList.add("my-container");
    container.append(bookImage, textContainer);

    if(isCompleted){
        container.append(
            createUnreadButton(),
            createTrashButton()
        );
    } else {
        container.append(
            createReadButton(),
            createTrashButton()
        );
    }

    return container;
}

function createUnreadButton() {
    return createButton("unread-button", function(event){
        undoBookFromCompleted(event.target.parentElement);
    });
}

function createTrashButton(){
    return createButton("trash-button", function(event){
        removeBookFromCompleted(event.target.parentElement);
    });
}

function createReadButton() {
    return createButton("read-button", function(event){
        addBookToCompleted(event.target.parentElement);
    });
}

function createButton(buttonTypeClass, eventListener) {
    const button = document.createElement("button");
    button.classList.add(buttonTypeClass);
    button.addEventListener("click", function (event) {
        eventListener(event);
    });
    return button;
}

function addBookToCompleted(bookElement) {
    const bookCompleted = document.getElementById(COMPLETED_BOOK);
    const bookTitle = bookElement.querySelector(".containerBook > h3").innerText;
    const bookAuthor = bookElement.querySelector(".containerBook > p").innerText;
    const bookYear = bookElement.querySelector(".containerBook > h5").innerText;

    const newBook = makeBook(bookTitle, bookYear, bookAuthor, true);
    const book = findBook(bookElement[ITEM_BOOK]);
    book.isCompleted = true;
    newBook[ITEM_BOOK] = book.id;

    bookCompleted.append(newBook);
    bookElement.remove();

    updateDataStorage();

}

function removeBookFromCompleted(bookElement) {
    const bookPosition = findBookIndex(bookElement[ITEM_BOOK]);
    books.splice(bookPosition, 1);

    bookElement.remove();
    updateDataStorage();
}

function undoBookFromCompleted(bookElement){
    const bookUncompleted = document.getElementById(UNCOMPLETED_BOOK);
    const bookTitle = bookElement.querySelector(".containerBook > h3").innerText;
    const bookAuthor = bookElement.querySelector(".containerBook > p").innerText;
    const bookYear = bookElement.querySelector(".containerBook > h5").innerText;

    const newBook = makeBook(bookTitle, bookYear, bookAuthor, false);

    const book = findBook(bookElement[ITEM_BOOK]);
    book.isCompleted = false;
    newBook[ITEM_BOOK] = book.id;

    bookUncompleted.append(newBook);
    bookElement.remove();

    updateDataStorage();
}

const booksLength = () => {
    const totalBook = document.getElementById("totalBook");
    totalBook.innerText = books.length;
}

function pencarianBuku (e) {
    const cariBuku = e.target.value.toLowerCase();
    let itemBuku = document.querySelectorAll(".containerBook");

    itemBuku.forEach((item) => {
        const isiBuku = item.firstChild.textContent.toLowerCase();

        if (isiBuku.indexOf(cariBuku) != -1) {
            item.setAttribute("style", "display: block;");
        } else {
            item.setAttribute("style", "display: none !important;");
        }
    });
}

