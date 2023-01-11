document.addEventListener("DOMContentLoaded", function () {
    const bookSubmit = document.getElementById("inputBook");
    bookSubmit.addEventListener("submit", function (event) {
        event.preventDefault();
        addBook();
    });

    if(isStorageExist()){
        loadDataFromStorage();
    }
});

document.addEventListener("ondatasaved", () => {
    console.log("Data berhasil disimpan.");
    booksLength();
});

document.addEventListener("ondataloaded", () => {
    refreshDataFromBooks();
    booksLength();
});