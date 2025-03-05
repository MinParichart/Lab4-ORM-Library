import express, { Request, Response } from "express";
import type { Book } from './service/bookService';
// import type { Author, Member, BorrowingHistory, BorrowedBook} from './service/bookService'; 
import {
  addBook,
  getAllBook,
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

const app = express();
app.use(express.json());
const port = 3010;



// 3.สร้าง server ด้วย express และสร้าง route
app.get("/", (req: Request, res: Response) => { // GET localhost:3010
  res.send("Hello World!");
});

// app.get("/books", (req, res) => { //localhost:3010/books = ออกมาทุกหนังสือ
//   res.json(books);
// });

app.get("/books", (req: Request, res: Response) => {
  
  // ตรวจสอบว่า query "title" มีหรือไม่
  if (typeof req.query.title === "string") { // GET localhost:3010/books?title=Atomic 
    const title = req.query.title.toLowerCase();
    const filteredBooksByTitle = getBookByTitle(title);
    res.json(filteredBooksByTitle) ;
  }

  // ตรวจสอบว่า query "isbn" มีหรือไม่
  if (typeof req.query.isbn === "string") { // GET localhost:3010/books?isbn=101
    const isbn = req.query.isbn.toLowerCase();
    const filteredBooksByIsbn = getBooksByIsbn(isbn);

    if (filteredBooksByIsbn.length > 0) {
      // ถ้ามี book object ให้แสดง book object ที่ค้นเจอ
      res.json(filteredBooksByIsbn);
    } else {
      res.status(404).send("Book not found!"); // ถ้าไม่เจอ ให้แสดง status 404 และ ส่งข้อความ Book not found
    }
  }

  // ตรวจสอบว่า query "category" มีหรือไม่
  if (req.query.category) { // GET localhost:3010/books?category=Technology
    const category = req.query.category;
    const filteredBooksByCategory = getBooksByCategory(category as string);
    res.json(filteredBooksByCategory);
  }

  // กรองหนังสือตาม authorId
  if (Number(req.query.authorId)) { // GET localhost:3010/books?authorId=1
    const authorId = Number(req.query.authorId); // แปลงเป็นตัวเลขสำหรับ author id
    const filteredBooksByAuthor_id = getBooksByAuthor_id(authorId); // กรองหนังสือตาม author id
    
    if (filteredBooksByAuthor_id.length > 0) {
      res.json(filteredBooksByAuthor_id);
    } else {
      res.status(404).json({ message: "Books by this author not found!" }); // ส่งข้อความตอบกลับเป็น json และส่ง status 404
    }
  }
  
  // กรองหนังสือตามชื่อผู้แต่ง (กรณีใช้ชื่อผู้แต่งแทน id)
  if (typeof req.query.authorName === "string") { // GET localhost:3010/books?authorName=James
    const authorName = req.query.authorName.toLowerCase();
    const filteredBooksByAuthor_name = getBooksByAuthor_name(authorName)

    if (filteredBooksByAuthor_name.length > 0) {
      res.json(filteredBooksByAuthor_name);
    } else {
      res.status(404).send("Books by this author not found!");
    }
  }

  // ถ้าไม่ส่งค่า query มาจะส่งรายการหนังสือทั้งหมด
  else {
    res.json(getAllBook());
  }
});

app.get("/books/:id", (req, res) => { //localhost:3010/books/1
  const id = parseInt(req.params.id);
  const filteredBooksById = getBookById(id);
  if (filteredBooksById) {
    // ถ้าค่าที่ส่งมา = id ที่มีในฐานข้อมูล ก็ให้แสดงข้อมูล ของหนังสือเล่มนั้น
    res.json(getBookById(id));
  } else {
    // ถ้าค่าที่ส่งมา = id ไม่มีในฐานข้อมูล ก็ให้แสดง status 404 และ แสดงข้อความ Book not found!
    res.status(404).send("Book not found!");
  }
});

app.get("/members", (req, res) => { //localhost:3010/members, //localhost:3010/members?first_name=Thai C.
  
  // ค้นหาด้วย first_name member
  if (req.query.first_name) { // การค้นหาแบบนี้คือ ต้องพิมพ์ชื่อให้ตรงกับ first_nameใน Database เท่านั้น เป็น case sensitive
    const first_name = req.query.first_name as string;
    const filtered_first_name_Members = getMemberByFirstName(first_name); 
    res.json(filtered_first_name_Members); //localhost:3010/members?first_name=Alice
    return; 
  }

  // ค้นหาด้วย last_name member
  if (req.query.last_name) {
    const last_name = req.query.last_name as string;
    const filtered_last_name_Members = getMemberByLastName(last_name)
    res.json(filtered_last_name_Members); //localhost:3010/members?last_name=Brown
    return; 
  }

  // ค้นหาด้วย phone_number member
  if (req.query.phone_number) { //localhost:3010/members?phone_number=123-456-7890
    const phone_number = req.query.phone_number as string;
    const filtered_phone_number_Members = getMemberByPhoneNumber(phone_number)
    res.json(filtered_phone_number_Members);
  } 

  // ถ้าไม่ส่งค่า query มา ให้แสดงรายการ member ทั้งหมด
  else { //localhost:3010/members?phone_number= หรือ path อื่นๆ นอกเหนือจาก path ข้างบนจะแสดง member ทั้งหมดออกมา
    res.json(getAllMembers());
  }
});

app.get("/members/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const filteredMembersById = getMemberById(id);
  if (filteredMembersById) {
    res.json(filteredMembersById);
  } else {
    res.status(404).send("Member not found!");
  }
});

app.get("/borrowing-history", (req: Request, res: Response): void => { // void เป็นการบอกว่า ไม่มีการ return ค่า
  const memberId = Number(req.query.memberId);
  const bookId = Number(req.query.bookId);
  const borrowedDate = req.query.borrow_date as string;
  const returnDate = req.query.return_due_date as string;

  // กรองข้อมูลตาม memberId
  if (memberId) { //localhost:3010/borrowing-history?memberId=1
    const filteredBorrowingHistoryByMemberId = getBorrowingHistoryByMemberId(memberId)

    if (filteredBorrowingHistoryByMemberId.length > 0) {
      res.json(filteredBorrowingHistoryByMemberId);
      return; // หยุดการทำงาน
    } else {
      res.status(404).json({ message: "Borrowing History by this member not found!" });
      return;
    }
  }

  // กรองข้อมูลตาม bookId
  if (bookId) { //localhost:3010/borrowing-history?bookId=1
    const filteredBorrowingHistoryByBookId = getBorrowingHistoryByBookId(bookId)

    if (filteredBorrowingHistoryByBookId.length > 0) {
      res.json(filteredBorrowingHistoryByBookId); // ส่ง response และหยุดการทำงาน
      return;
    } else {
      res.status(404).json({ message: "Borrowing History by this book not found!" });
      return;
    }
  }

  // กรองข้อมูลตาม borrow_date
  if (borrowedDate) { // localhost:3010/borrowing-history?borrow_date=2025-03-05
    const filteredBorrowingHistoryByBorrowedDate = getBorrowingHistoryByBorrowDate(borrowedDate)

    if (filteredBorrowingHistoryByBorrowedDate.length > 0) {
      res.json(filteredBorrowingHistoryByBorrowedDate); // ส่ง response และหยุดการทำงาน
      return;
    } else {
      res.status(404).json({ message: "Borrowing History by this borrow date not found!" });
      return;
    }
  }

  // กรองข้อมูลตาม return_due_date
  if (returnDate) { //localhost:3010/borrowing-history?return_due_date=2024-02-19
    const filteredBorrowingHistoryByReturnDate = getBorrowingHistoryByReturnDate(returnDate); 

    if (filteredBorrowingHistoryByReturnDate.length > 0) {
      res.json(filteredBorrowingHistoryByReturnDate); // ส่ง response และหยุดการทำงาน
      return;
    } else {
      res.status(404).json({message: "Borrowing History by this return due date not found!",});
      return;
    }
  }
  
  // ถ้าไม่มี query parameters ใดๆ ที่ส่งมา
  else {res.json(getAllBorrowingHistory());
  } 
});

app.get("/borrowing-history/:id", (req: Request, res: Response): void => { // void เป็นการบอกว่า ไม่มีการ return ค่า
  const borrowingHistory_id = parseInt(req.params.id); // localhost:3010/borrowing-history/5
  const filteredBorrowingHistoryById = getBorrowingHistoryById(borrowingHistory_id);
  if (filteredBorrowingHistoryById) {
    // ถ้าค่าที่ส่งมา = id ที่มีในฐานข้อมูล ก็ให้แสดงข้อมูล ของหนังสือเล่มนั้น
    res.json(filteredBorrowingHistoryById);
  } else {
    // ถ้าค่าที่ส่งมา = id ไม่มีในฐานข้อมูล ก็ให้แสดง status 404 และ แสดงข้อความ Borrowing History by this id not found!
    res.status(404).send("Borrowing History by this id not found!");
  }
});

app.get("/borrowed-books", (req, res) => {
  const borrowingHistory_id = Number(req.query.borrowingHistoryId); // รับค่าจาก req.query.borrwingHistoryId และแปลงเป็นตัวเลข (Number())
  const actualReturnDate = req.query.actual_return_date as string;

  // กรองข้อมูลตาม borrowingHistory_id
  if (borrowingHistory_id) { //localhost:3010/borrowed-books?borrowingHistoryId=1
    const filteredBorrowedBooksByBorrowingHistory_id = getBorrowedBooksByBorrowingHistory_id(borrowingHistory_id); 

    if (filteredBorrowedBooksByBorrowingHistory_id.length > 0) {
      res.json(filteredBorrowedBooksByBorrowingHistory_id); 
      return; // ถ้าพบข้อมูล ส่ง JSON กลับไป แล้วจบการทำงาน (return)
    } else {
      res.status(404).json({ message: "Borrowed History by this borrowing history id not found!" });
      return; // ถ้าไม่พบข้อมูล ส่ง HTTP 404 (Not Found) พร้อมข้อความแจ้งเตือน
    }
  }

  // กรองข้อมูลตาม actual_return_date
  if (actualReturnDate) { // ถ้าผู้ใช้ส่ง actual_return_date มา จะใช้ .filter() กรองข้อมูลตามค่านี้
    const filteredBorrowedBooksByActualReturnDate = getBorrowedBooksByActualReturnDate(actualReturnDate)

    // ถ้า actualReturnDate เป็น "null" หรือ "undefined" ให้แสดงข้อมูลที่กรองได้ (แม้ว่าจะไม่มีข้อมูลก็ตาม) //localhost:3010/borrowed-books?actual_return_date=null
    if (actualReturnDate === "null" || actualReturnDate === "undefined") { //ส่งข้อมูลที่กรองได้ (แม้ว่าจะเป็น [] ว่างเปล่า) //localhost:3010/borrowed-books?actual_return_date=undefined
      res.json(filteredBorrowedBooksByActualReturnDate); // ส่งข้อมูลที่กรองได้กลับไป (อาจเป็น array ว่าง)
      return;
    }

    // ถ้า actualReturnDate ไม่ใช่ "null" หรือ "undefined" และไม่มีข้อมูลที่ตรงกับเงื่อนไข
    if (filteredBorrowedBooksByActualReturnDate.length === 0) {
      res.status(404).json({ message: "Borrowing History by this actual return due date not found!" }); // ถ้าไม่พบข้อมูล → ส่ง HTTP 404 (Not Found)
      return;
    }

    // ส่งข้อมูลที่กรองได้กลับไป
    res.json(filteredBorrowedBooksByActualReturnDate); // ถ้ามีข้อมูลที่ตรงกัน → ส่ง JSON กลับไป
    return;
  }

  // ถ้าไม่มี query parameters ใดๆ ที่ส่งมา
  res.json(getAllBorrowedBooks()); // ถ้าไม่มีการกรองใดๆ → ส่งข้อมูล borrowedBooks ทั้งหมดกลับไป
  return;
});

app.get("/borrowed-books/:id", (req, res) => { // localhost:3010/borrowed-books/1
  const borrowedBook_id = parseInt(req.params.id);
  const filteredBorrowedBooksById = getBorrowedBookById(borrowedBook_id);
  if (filteredBorrowedBooksById) {
    // ถ้าค่าที่ส่งมา = id ที่มีในฐานข้อมูล ก็ให้แสดงข้อมูล ของหนังสือเล่มนั้น
    res.json(filteredBorrowedBooksById);
  } else {
    // ถ้าค่าที่ส่งมา = id ไม่มีในฐานข้อมูล ก็ให้แสดง status 404 และ แสดงข้อความ Borrowing History by this id not found!
    res.status(404).send("Borrowed Books by this id not found!");
  }
});

app.post("/books", (req, res) => {
  const newBook: Book = req.body;
  addBook(newBook);
  res.json(newBook);
});

app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`);
});
