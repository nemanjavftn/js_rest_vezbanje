const bookTblBody = document.getElementById('bookTblBody');
let id = null;

function getBooks() {
    bookTblBody.innerHTML = '';
    fetch(baseUrl + '/books')
        .then(response => response.json())
        .then(books => {
            books.forEach(book => {
                bookTblBody.innerHTML += `
                <tr>
                    <td>${book.id}</td>
                    <td>${book.title}</td>
                    <td>${book.author}</td>
                    <td>${book.category}</td>
                    <td>${book.numberOfPages}</td>
                    <td>
                        <a href='book.html?id=${book.id}'>
                            <span class="badge bg-secondary">IZMENA</span>
                        <a/>
                    </td>
                    <td>
                        <span onclick='deleteBook(${book.id})' class="delete-badge badge bg-danger" data-bs-toggle="modal" data-bs-target="#deleteModal">
                            BRISANJE</span>
                    </td>
                </tr>
                `;
            });
        });
}

getBooks();

function deleteBook(bookId) {
    id = bookId;
}

function confirmBookDelete() {
    fetch(baseUrl + '/books/' + id, {
        method: 'DELETE'
    }).then(() => {
        getBooks();
    });
}