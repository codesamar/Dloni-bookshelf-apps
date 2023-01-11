const STORAGE_KEY = "BOOKSHELF_APPS";

let books = []

function isStorageExist(){
    if(typeof(Storage) === undefined){
        alert("Browser kamu tidak mendukung local storage");
        return false
    }
    return true;
}

function saveData() {
    const parsed = JSON.stringify(books);
    localStorage.setItem(STORAGE_KEY, parsed);
    document.dispatchEvent(new Event("ondatasaved"));
}

function loadDataFromStorage(){
    const serializedData = localStorage.getItem(STORAGE_KEY);

    let judul = JSON.parse(serializedData);

    if(judul !== null)
        books = judul;

    document.dispatchEvent(new Event("ondataloaded"));
}

function updateDataStorage(){
    if(isStorageExist())
        saveData();
}

function composeBookObject(title, author, year, isCompleted) {
    return {
        id: +new Date(),
        title,
        author,
        year,
        isCompleted
    };
}

function findBook(bookId) {
    for(buku of books){
        if(buku.id === bookId)
            return buku;
    }
    return null;
}

function findBookIndex(bookId) {
    let index = 0
    for (buku of books) {
        if(buku.id === bookId)
            return index;

        index++;
    }

    return -1;
}

function refreshDataFromBooks() {
    const bookUncompleted = document.getElementById(UNCOMPLETED_BOOK);
    let bookCompleted = document.getElementById(COMPLETED_BOOK);

    for(buku of books){
        const newBook = makeBook(buku.title,"Penulis : " + buku.author,"Tahun : " + buku.year, buku.isCompleted);
        newBook[ITEM_BOOK] = buku.id;

        if(buku.isCompleted){
            bookCompleted.append(newBook);
        } else {
            bookUncompleted.append(newBook);
        }
    }
}