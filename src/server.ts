import express, { Request, Response } from "express";
import type { Book } from './models/books';
// import type { Author, Member, BorrowingHistory, BorrowedBook} from './service/bookService'; 
import {
  addBook,
  getAllBooks,
  getAllBorrowedBooks,
  getAllBorrowingHistory,
  getAllMembers,
  getBookById,
  getBookByTitle,
  getBooksByAuthor_id,
  getBooksByAuthor_name,
  getBooksByCategory,
  getBooksByIsbn,
  getBorrowedBookById,
  getBorrowedBooksByActualReturnDate,
  getBorrowedBooksByBorrowingHistory_id,
  getBorrowingHistoryByBookId,
  getBorrowingHistoryByBorrowDate,
  getBorrowingHistoryById,
  getBorrowingHistoryByMemberId,
  getBorrowingHistoryByReturnDate,
  getMemberByFirstName,
  getMemberById,
  getMemberByLastName,
  getMemberByPhoneNumber
} from './service/bookService';

// import multer, { uploadFile } - Lab3 - Task 9
import multer from 'multer';
import { uploadFile } from './service/uploadFileService';


const app = express();
app.use(express.json());
const port = 3010;

// 3.สร้าง server ด้วย express และสร้าง route
app.get("/books", async (req: Request, res: Response) => { // GET localhost:3010/books
  if (typeof req.query.title === "string") { // GET localhost:3010/books?title=Atomic 
    const title = req.query.title.toLowerCase();
    const filteredBooksByTitle = await getBookByTitle(title);
    res.json(filteredBooksByTitle);
    return; // หยุดการทำงานหลังจากส่ง response
  }

  if (typeof req.query.isbn === "string") { // GET localhost:3010/books?isbn=101
    const isbn = req.query.isbn.toLowerCase();
    const filteredBooksByIsbn = await getBooksByIsbn(isbn);
    if (filteredBooksByIsbn.length > 0) {
      res.json(filteredBooksByIsbn);
    } else {
      res.status(404).send("Book not found!");
    }
    return; // หยุดการทำงานหลังจากส่ง response
  }

  if (req.query.category) {  // GET localhost:3010/books?category=Technology
    const category = req.query.category;
    const filteredBooksByCategory = await getBooksByCategory(category as string);
    res.json(filteredBooksByCategory);
    return; // หยุดการทำงานหลังจากส่ง response
  }

  if (Number(req.query.authorId)) {  // GET localhost:3010/books?authorId=1
    const authorId = Number(req.query.authorId); const filteredBooksByAuthor_id = await getBooksByAuthor_id(authorId);
    if (filteredBooksByAuthor_id.length > 0) {
   
      res.json(filteredBooksByAuthor_id);
    } else {
      res.status(404).json({ message: "Books by this author not found!" });
    }
    return; // หยุดการทำงานหลังจากส่ง response
  }

  if (typeof req.query.authorName === "string") { // GET localhost:3010/books?authorName=James
    const authorName = req.query.authorName.toLowerCase();
    const filteredBooksByAuthor_name = await getBooksByAuthor_name(authorName);
    if (filteredBooksByAuthor_name.length > 0) {
      res.json(filteredBooksByAuthor_name);
    } else {
      res.status(404).send("Books by this author not found!");
    }
    return; // หยุดการทำงานหลังจากส่ง response
  }

  // ถ้าไม่มี query parameters ใด ๆ
  res.json(await getAllBooks());
});

app.get("/books/:id", async (req, res) => { // GET localhost:3010/books/1
  const id = parseInt(req.params.id);
  const filteredBooksById = await getBookById(id);
  if (filteredBooksById) {
    res.json(filteredBooksById);
  } else {
    res.status(404).send("Book not found!");
  }
});

app.get("/members", async (req, res) => { 
  if (req.query.first_name) { // GET localhost:3010/members?first_name=Thai C.
    const first_name = req.query.first_name as string;
    const filtered_first_name_Members = await getMemberByFirstName(first_name);
    res.json(filtered_first_name_Members);
    return; // หยุดการทำงานหลังจากส่ง response
  }

  if (req.query.last_name) { // GET localhost:3010/members?last_name=Brown
    const last_name = req.query.last_name as string;
    const filtered_last_name_Members = await getMemberByLastName(last_name);
    res.json(filtered_last_name_Members);
    return; // หยุดการทำงานหลังจากส่ง response
  }

  if (req.query.phone_number) { // GET localhost:3010/members?phone_number=123-456-7890
    const phone_number = req.query.phone_number as string;
    const filtered_phone_number_Members = await getMemberByPhoneNumber(phone_number);
    res.json(filtered_phone_number_Members);
    return; // หยุดการทำงานหลังจากส่ง response
  }

  // ถ้าไม่มี query parameters ใด ๆ
  res.json(await getAllMembers());
});

app.get("/members/:id", async (req, res) => { // GET localhost:3010/members/1
  const id = parseInt(req.params.id);
  const filteredMembersById = await getMemberById(id);
  if (filteredMembersById) {
    res.json(filteredMembersById);
  } else {
    res.status(404).send("Member not found!");
  }
});

app.get("/borrowing-history", async (req: Request, res: Response): Promise<void> => {
  const memberId = Number(req.query.memberId);
  const bookId = Number(req.query.bookId);
  const borrowedDate = req.query.borrow_date as string;
  const returnDate = req.query.return_due_date as string;

  if (memberId) { // GET localhost:3010/borrowing-history?memberId=1
    const filteredBorrowingHistoryByMemberId = await getBorrowingHistoryByMemberId(memberId);
    if (filteredBorrowingHistoryByMemberId.length > 0) {
      res.json(filteredBorrowingHistoryByMemberId);
    } else {
      res.status(404).json({ message: "Borrowing History by this member not found!" });
    }
    return; // หยุดการทำงานหลังจากส่ง response
  }

  if (bookId) { // GET localhost:3010/borrowing-history?bookId=1
    const filteredBorrowingHistoryByBookId = await getBorrowingHistoryByBookId(bookId);
    if (filteredBorrowingHistoryByBookId.length > 0) {
      res.json(filteredBorrowingHistoryByBookId);
    } else {
      res.status(404).json({ message: "Borrowing History by this book not found!" });
    }
    return; // หยุดการทำงานหลังจากส่ง response
  }

  if (borrowedDate) {  // GET localhost:3010/borrowing-history?borrow_date=2025-03-05
    const filteredBorrowingHistoryByBorrowedDate = await getBorrowingHistoryByBorrowDate(borrowedDate);
    if (filteredBorrowingHistoryByBorrowedDate.length > 0) {
      res.json(filteredBorrowingHistoryByBorrowedDate);
    } else {
      res.status(404).json({ message: "Borrowing History by this borrow date not found!" });
    }
    return; // หยุดการทำงานหลังจากส่ง response
  }

  if (returnDate) { // GET localhost:3010/borrowing-history?return_due_date=2025-03-19
    const filteredBorrowingHistoryByReturnDate = await getBorrowingHistoryByReturnDate(returnDate);
    if (filteredBorrowingHistoryByReturnDate.length > 0) {
      res.json(filteredBorrowingHistoryByReturnDate);
    } else {
      res.status(404).json({ message: "Borrowing History by this return due date not found!" });
    }
    return; // หยุดการทำงานหลังจากส่ง response
  }

  // ถ้าไม่มี query parameters ใด ๆ
  res.json(await getAllBorrowingHistory()); // GET localhost:3010/borrowing-history?return_due_date=
});

app.get("/borrowing-history/:id", async (req: Request, res: Response): Promise<void> => { // void เป็นการบอกว่า ไม่มีการ return ค่า
  const borrowingHistory_id = parseInt(req.params.id); // localhost:3010/borrowing-history/5
  const filteredBorrowingHistoryById = await getBorrowingHistoryById(borrowingHistory_id);
  if (filteredBorrowingHistoryById) {
    // ถ้าค่าที่ส่งมา = id ที่มีในฐานข้อมูล ก็ให้แสดงข้อมูล ของหนังสือเล่มนั้น
    res.json(filteredBorrowingHistoryById);
  } else {
    // ถ้าค่าที่ส่งมา = id ไม่มีในฐานข้อมูล ก็ให้แสดง status 404 และ แสดงข้อความ Borrowing History by this id not found!
    res.status(404).send("Borrowing History by this id not found!");
  }
});

app.get("/borrowed-books", async (req, res) => {
  const borrowingHistory_id = Number(req.query.borrowingHistoryId);
  const actualReturnDate = req.query.actual_return_date as string;

  if (borrowingHistory_id) { // GET localhost:3010/borrowed-books?borrowingHistoryId=1
    const filteredBorrowedBooksByBorrowingHistory_id = await getBorrowedBooksByBorrowingHistory_id(borrowingHistory_id);
    if (filteredBorrowedBooksByBorrowingHistory_id.length > 0) {
      res.json(filteredBorrowedBooksByBorrowingHistory_id);
    } else {
      res.status(404).json({ message: "Borrowed History by this borrowing history id not found!" });
    }
    return; // หยุดการทำงานหลังจากส่ง response
  }

  if (actualReturnDate) { // GET localhost:3010/borrowed-books?actual_return_date=2025-03-16
    const filteredBorrowedBooksByActualReturnDate = await getBorrowedBooksByActualReturnDate(actualReturnDate);
    if (actualReturnDate === "null" || actualReturnDate === "undefined") {
      // กรณีที่ actualReturnDate เป็น "null" หรือ "undefined"
      res.json(filteredBorrowedBooksByActualReturnDate);
    } else if (filteredBorrowedBooksByActualReturnDate.length === 0) {
      // กรณีที่ไม่มีข้อมูลที่ตรงกับ actualReturnDate
      res.status(404).json({ message: "Borrowing History by this actual return due date not found!" });
    } else {
      // กรณีที่มีข้อมูลที่ตรงกับ actualReturnDate
      res.json(filteredBorrowedBooksByActualReturnDate);
    }
    return; // หยุดการทำงานหลังจากส่ง response
  }

  // ถ้าไม่มี query parameters ใด ๆ
  res.json(await getAllBorrowedBooks());
});

app.get("/borrowed-books/:id", async (req, res) => { // localhost:3010/borrowed-books/1
  const borrowedBook_id = parseInt(req.params.id);
  const filteredBorrowedBooksById = await getBorrowedBookById(borrowedBook_id);
  if (filteredBorrowedBooksById) {
    // ถ้าค่าที่ส่งมา = id ที่มีในฐานข้อมูล ก็ให้แสดงข้อมูล ของหนังสือเล่มนั้น
    res.json(filteredBorrowedBooksById);
  } else {
    // ถ้าค่าที่ส่งมา = id ไม่มีในฐานข้อมูล ก็ให้แสดง status 404 และ แสดงข้อความ Borrowing History by this id not found!
    res.status(404).send("Borrowed Books by this id not found!");
  }
});

// เก่า
// app.post("/books", (req, res) => {
//   const newBook: Book = req.body;
//   addBook(newBook);
//   res.json(newBook);
// });

// ใหม่
app.post("/books", (req, res) => { // POST localhost:3010/books
  const newBook: Book = req.body;
  addBook(newBook)
    .then((addedBook) => {
      res.json(addedBook);
    })
    .catch((error) => {
      res.status(500).json({ message: "Failed to add book", error });
    });
});

// เพิ่ม endpoint สำหรับ upload file ที่ server.ts - Lab3 - Task 9
const upload = multer({ storage: multer.memoryStorage() });
app.post('/upload', upload.single('file'), async (req: any, res: any) => { // POST localhost:3010/upload
    try {
      const file = req.file;
      if (!file) {
        return res.status(400).send('No file uploaded.');
      }
  
      const bucket = 'image_library';
      const filePath = `uploads_library`;
   
      const outputUrl = await uploadFile(bucket, filePath, file);
  
      res.status(200).send(outputUrl);
    } catch (error) {
      res.status(500).send('Error uploading file.');
    }
  });
  
app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`);
});

// ใช้ได้ทั้งคู่
// {
//   "title": "AAA",
//   "isbn": "106",
//   "category": "Teachnology",
//   "author": [
//       {
//           "id": 1,
//           "first_name": "James",
//           "last_name": "Clear",
//           "affiliation": "Self-Improvement Publications"
//       }
//   ]
// }


// {
//   "title": "AAA",
//   "isbn": "106",
//   "category": "Technology",
//   "author": [
//     { "id": 1 }
//   ]
// }