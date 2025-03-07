import express from "express";
// import type { Author, Member, BorrowingHistory, BorrowedBook} from './service/bookService'; 
// import {
//   addBook,
//   getAllBooks,
//   getAllBorrowedBooks,
//   getAllBorrowingHistory,
//   getAllMembers,
//   getBookById,
//   getBookByTitle,
//   getBooksByAuthor_id,
//   getBooksByAuthor_name,
//   getBooksByCategory,
//   getBooksByIsbn,
//   getBorrowedBookById,
//   getBorrowedBooksByActualReturnDate,
//   getBorrowedBooksByBorrowingHistory_id,
//   getBorrowingHistoryByBookId,
//   getBorrowingHistoryByBorrowDate,
//   getBorrowingHistoryById,
//   getBorrowingHistoryByMemberId,
//   getBorrowingHistoryByReturnDate,
//   getMemberByFirstName,
//   getMemberById,
//   getMemberByLastName,
//   getMemberByPhoneNumber
// } from './service/bookService';

// import multer, { uploadFile } - Lab3 - Task 9
import dotenv from 'dotenv';
import multer from "multer";
import bookRoute from './routes/bookRoute';
dotenv.config(); 

const upload = multer({ storage: multer.memoryStorage() });

const app = express();
app.use(express.json());
app.use('/',bookRoute)
const port = 3010;

// 3.สร้าง server ด้วย express และสร้าง route
// ย้าย route ไปไว้ที่ routes.bookRoute.ts


app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`);
});

