const titleInput = document.getElementById('titleInput');
const authorInput = document.getElementById('authorInput');
const categoryInput = document.getElementById('categoryInput');
const numberOfPagesInput = document.getElementById('numberOfPagesInput');
const saveBtn = document.getElementById('saveBtn');

const id = getQueryStringParameterByName('id');

if (id) {
    // izmena -> "dovucemo" podatke o knjizi
    fetch(baseUrl + '/books/' + id)
        .then(response => response.json())
        .then(book => {
            titleInput.value = book.title;
            authorInput.value = book.author;
            categoryInput.value = book.category;
            numberOfPagesInput.value = book.numberOfPages;
        });
}

saveBtn.addEventListener('click', () => {
    // validacija
    if (!titleInput.value ||
        !authorInput.value ||
        !categoryInput.value ||
        !numberOfPagesInput.value) {
        alert('Morate popuniti sva polja!');
        return;
    }

    const book = {
        title: titleInput.value,
        author: authorInput.value,
        category: categoryInput.value,
        numberOfPages: parseInt(numberOfPagesInput.value)
    };

    // POST se koristi za dodavanje
    // PUT se koristi za izmenu

    let httpMethod = 'POST';
    let url = baseUrl + '/books';
    if (id) {
        httpMethod = 'PUT';
        url += '/' + id;
    }

    fetch(url, {
        method: httpMethod,
        body: JSON.stringify(book),
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
    }).then(() => {
        location.href = 'index.html';
    })
});
