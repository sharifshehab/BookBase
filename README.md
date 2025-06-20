# BookBase

BookBase is a library management system that provides a robust backend solution designed to streamline book tracking, borrowing, and inventory management for libraries. This system offers a structured way to manage books, track borrowing history, and generate summaries of lending activity, all through a well-organized API. The aim is to simplify library operations by automating book tracking and borrowing processes, making it easier for librarians and users to manage resources efficiently.



## Tech Stack:
- **Express**
- **TypeScript**
- **MongoDB**
- **Mongoose**

## Key features:
1. **Add new books to the library database.**
2. **Retrieve books with optional filters (e.g., by genre-filter, sortBy, sort, limit).**
3. **Fetch a specific book by its unique ID.**
4. **Update existing book details (title, author, copies, etc.).**
5. **Borrowed books Record along with user information.**
6. **Generate summaries of borrowing activity.**


## Dependencies:
    -@stripe/react-stripe-js: ^3.1.1,
    - @stripe/stripe-js: ^5.5.0,
    - @tanstack/react-query: ^5.64.1,
    - axios: ^1.7.9,
    - date-fns: ^4.1.0,
    - firebase: ^11.1.0,
    - localforage: ^1.10.0,
    - match-sorter: ^8.0.0,
    - react: ^18.3.1,
    - react-dom: ^18.3.1,
    - react-helmet-async: ^2.0.5,
    - react-hook-form: ^7.54.2,
    - react-hot-toast: ^2.5.1,
    - react-icons: ^5.4.0,
    - react-router-dom: ^7.1.1,
    - react-select: ^5.9.0,
    - react-share: ^5.1.2,
    - react-stickynode: ^5.0.1,
    - recharts: ^2.15.0,
    - sort-by: ^1.2.0,
    - sweetalert2: ^11.15.10,

## Dev Dependencies:
    - @eslint/js: ^9.17.0,
    - @types/react: ^18.3.18,
    - @types/react-dom: ^18.3.5,
    - @vitejs/plugin-react: ^4.3.4,
    - autoprefixer: ^10.4.20,
    - daisyui: ^4.12.23,
    - eslint: ^9.17.0,
    - eslint-plugin-react: ^7.37.2,
    - eslint-plugin-react-hooks: ^5.0.0,
    - eslint-plugin-react-refresh: ^0.4.16,
    - globals: ^15.14.0,
    - postcss: ^8.5.0,
    - tailwindcss: ^3.4.17,
    - vite: ^6.0.5


## Installation:
1. **First, clone the repository to your local machine. you can do this by downloading the zip file or by cloning it using the web URL**
2. **Navigate to the project folder and open it with cmd terminal**
3. **Write <code>npm i</code> in the terminal. This will install all the necessary packages on your system**
4. **Create a file name <code>.env</code>, inside the project root folder**
5. **Save your MongoDB uri here as environment variables in this file:**
    - **DATABASE_URL=your-mongoDb-uri**
6. **After the installation is complete, start the application by typing <code>npm run dev</code> in terminal**

- **You should now be able interact with the application on your local machine!**


### Add new Book:
    POST -/api/books

### Get All Books:
    GET -/api/books

### Get Flitted Books:
    GET -/api/books?filter=FANTASY&sortBy=createdAt&sort=desc&limit=5

### Get Specific Book By Id:
    GET -/api/books/:bookId

### Update Book Information:
    PUT -/api/books/:bookId

### Delete Book:
    DELETE -/api/books/:bookId

### Borrow Books:
    post -/api/borrow

### Summary Of Borrowed Books:
    GET -/api/borrow


##  Live Link:
- **[BookBase Server](https://book-base-server.vercel.app)**
