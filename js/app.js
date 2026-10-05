// Development note: This code was created with assistance from OpenAI ChatGPT and reviewed by the student.

// BlueLib Catalogue JavaScript

// Initial book data stored in an array.
let books = [
    {
        title: "HTML and CSS: Design and Build Websites",
        author: "Jon Duckett",
        category: "IT",
        copies: 4
    },
    {
        title: "JavaScript and JQuery",
        author: "Jon Duckett",
        category: "IT",
        copies: 3
    },
    {
        title: "The Lean Startup",
        author: "Eric Ries",
        category: "Business",
        copies: 5
    },
    {
        title: "Principles of Economics",
        author: "N. Gregory Mankiw",
        category: "Business",
        copies: 2
    },
    {
        title: "A Brief History of Time",
        author: "Stephen Hawking",
        category: "Science",
        copies: 1
    },
    {
        title: "The Story of Art",
        author: "E. H. Gombrich",
        category: "Arts",
        copies: 6
    }
];

const bookList = document.getElementById("book-list");
const searchInput = document.getElementById("search");
const categoryFilter = document.getElementById("category-filter");
const bookForm = document.getElementById("book-form");
const formMessage = document.getElementById("form-message");

// Render books as cards based on the current search and category filters.
function renderBooks() {
    const searchTerm = searchInput.value.trim().toLowerCase();
    const selectedCategory = categoryFilter.value;

    const filteredBooks = books.filter(function(book) {
        const matchesTitle = book.title.toLowerCase().includes(searchTerm);
        const matchesCategory =
            selectedCategory === "All" || book.category === selectedCategory;

        return matchesTitle && matchesCategory;
    });

    bookList.innerHTML = "";

    if (filteredBooks.length === 0) {
        bookList.innerHTML = "<p>No books found.</p>";
        return;
    }

    filteredBooks.forEach(function(book) {
        const card = document.createElement("article");
        card.className = "book-card";

        const title = document.createElement("h3");
        title.textContent = book.title;

        const author = document.createElement("p");
        author.innerHTML = "<strong>Author:</strong> " + book.author;

        const category = document.createElement("p");
        category.innerHTML = "<strong>Category:</strong> " + book.category;

        const copies = document.createElement("p");
        copies.innerHTML = "<strong>Copies Available:</strong> " + book.copies;

        const status = document.createElement("p");
        status.className = "status";

        const borrowButton = document.createElement("button");
        borrowButton.type = "button";
        borrowButton.textContent = "Borrow";

        if (book.copies === 0) {
            status.textContent = "Out of stock";
            status.classList.add("out-of-stock");
            borrowButton.disabled = true;
        } else {
            status.textContent = "Available";
            borrowButton.addEventListener("click", function() {
                borrowBook(book);
            });
        }

        card.appendChild(title);
        card.appendChild(author);
        card.appendChild(category);
        card.appendChild(copies);
        card.appendChild(status);
        card.appendChild(borrowButton);

        bookList.appendChild(card);
    });
}

// Reduce a book's available copies by one when it is borrowed.
function borrowBook(book) {
    if (book.copies > 0) {
        book.copies -= 1;
        renderBooks();
    }
}

// Validate the Add Book form and add a new book without reloading.
bookForm.addEventListener("submit", function(event) {
    event.preventDefault();

    const title = document.getElementById("title").value.trim();
    const author = document.getElementById("author").value.trim();
    const category = document.getElementById("category").value;
    const copiesValue = document.getElementById("copies").value.trim();
    const copies = Number(copiesValue);

    formMessage.className = "form-message";
    formMessage.textContent = "";

    if (!title || !author || !category || copiesValue === "") {
        formMessage.textContent = "Please fill in all fields.";
        formMessage.classList.add("error");
        return;
    }

    if (!Number.isInteger(copies) || copies < 0) {
        formMessage.textContent =
            "Copies Available must be a whole number of 0 or more.";
        formMessage.classList.add("error");
        return;
    }

    books.push({
        title: title,
        author: author,
        category: category,
        copies: copies
    });

    formMessage.textContent = "Book added successfully.";
    formMessage.classList.add("success");

    bookForm.reset();
    renderBooks();
});

// Update the catalogue whenever the search text or category changes.
searchInput.addEventListener("input", renderBooks);
categoryFilter.addEventListener("change", renderBooks);

// Initial display of the books.
renderBooks();
