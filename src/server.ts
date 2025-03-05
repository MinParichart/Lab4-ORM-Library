import express, { Request, Response } from "express";
const app = express();
app.use(express.json());
const port = 3010;

// 1.ประกาศ type ของ object
interface Author {
  id: number;
  first_name: string;
  last_name: string;
  affiliation: string;
}

interface Book {
  id: number;
  title: string;
  isbn: string;
  category: string;
  author: Author[];
}

interface Member {
  id: number;
  first_name: string;
  last_name: string;
  phone_number: string;
}

interface BorrowingHistory {
  id: number;
  member_id: Member[];
  book_id: Book[];
  borrow_date: Date;
  return_due_date: Date;
}

interface BorrowedBook {
  id: number;
  borrowing_id: BorrowingHistory[];
  actual_return_date?: Date; //? = "Optional Property" หรือ "ค่าที่สามารถมีหรือไม่มีก็ได้"
}

// 2.สร้างตัวแปร เพื่อเก็บข้อมูลลงใน array ตาม type ของ object
//ต้องสร้างตัวแปร authors ก่อน เพราะว่า books จะนำ authors ไปอ้างอิงต่อ
const authors: Author[] = [
  {
    id: 1,
    first_name: "James",
    last_name: "Clear",
    affiliation: "Self-Improvement Publications",
  },
  {
    id: 2,
    first_name: "Robert",
    last_name: "C. Martin",
    affiliation: "Software Engineering Press",
  },
  {
    id: 3,
    first_name: "Yuval Noah",
    last_name: "Harari",
    affiliation: "History and Anthropology Research",
  },
];

// const newAuthor : Author [] = [
//   {
//   id: 4,
//   first_name: "Brian",
//   last_name: "Tracy",
//   affiliation: "Self-Development"
//   }
// ]

const books: Book[] = [
  {
    id: 1,
    title: "Atomic Habits",
    isbn: "101",
    category: "Self-Improvement",
    author: [authors[0]],
  },
  {
    id: 2,
    title: "Clean Code",
    isbn: "102",
    category: "Technology",
    author: [authors[1]],
  },
  {
    id: 3,
    title: "Sapiens: A Brief History of Humankind",
    isbn: "103",
    category: "History",
    author: [authors[2]],
  },
  {
    id: 4,
    title: "The Pragmatic Programmer",
    isbn: "104",
    category: "Technology",
    author: [authors[1]],
  },
  {
    id: 5,
    title: "Deep Work",
    isbn: "105",
    category: "Productivity",
    author: [authors[0]],
  },
];

// const newBook : Book [] = [
//   {
//     id: 6,
//     title: "Eat That Frog",
//     isbn: "106",
//     category: "Productivity",
//     author: [newAuthor[0]] // ใส่แค่ id ของ author
//   }
// ]

const members: Member[] = [
  {
    id: 1,
    first_name: "Alice",
    last_name: "Brown",
    phone_number: "123-456-7890",
  },
  {
    id: 2,
    first_name: "Bob",
    last_name: "Smith",
    phone_number: "234-567-8901",
  },
  {
    id: 3,
    first_name: "Thai .C",
    last_name: "BUS",
    phone_number: "345-678-9012",
  },
];

const borrowingHistorys: BorrowingHistory[] = [
  {
    id: 1,
    member_id: [members[0]],
    book_id: [books[0]],
    borrow_date: new Date("2025-03-05"),
    return_due_date: new Date("2025-03-19"),
  },
  {
    id: 2,
    member_id: [members[1]],
    book_id: [books[1]],
    borrow_date: new Date("2025-03-06"), // วันที่ยิมหนังสือ
    return_due_date: new Date("2025-03-20"), // กำหนดคืนหนังสือ
  },
];

const borrowedBooks: BorrowedBook[] = [
  {
    id: 1,
    borrowing_id: [borrowingHistorys[0]],
    actual_return_date: new Date("2024-02-14"),
  }, // คืนหนังสือมาวันที่ 2024-02-14
  {
    id: 2,
    borrowing_id: [borrowingHistorys[1]],
    actual_return_date: undefined,
  }, // undefined คือยังไม่คืน
];

// 4.แยกส่วนที่ใช้ในการหาข้อมูลทั้งหมดในตัว Endpoint ออกมาเป็น function ใหม่ เพื่อให้ในส่วน endpoint ใช้ในการเลือกว่าจะนำข้อมูลใดมานำเสนอเท่านั้น
function getBookByTitle(title: string): Book[] {
    const filteredBooksByTitle = books.filter((book) => book.title.toLowerCase().includes(title));
  return filteredBooksByTitle;
}

function getBooksByIsbn(isbn: string): Book[] {
    const filteredBooksByIsbn = books.filter((book) => book.isbn.toLowerCase().includes(isbn));
  return filteredBooksByIsbn;
}

function getBooksByCategory(category: string): Book[] {
    const filteredBooksByCategory = books.filter((book) => book.category === category);
  return filteredBooksByCategory;
}

function getBooksByAuthor_id(authorId: number): Book[] {
  return books.filter((book) => book.author.some((a) => a.id === authorId)); // กรองหนังสือตาม author id
}

function getBooksByAuthor_name(authorName: string): Book [] {
  const filteredBooksByAuthor_name = books.filter((book) =>
    book.author.some(
      (a) =>
        a.first_name.toLowerCase().includes(authorName) ||
        a.last_name.toLowerCase().includes(authorName)
    ));
  return filteredBooksByAuthor_name; // กรองหนังสือตาม author id
}

function getAllBook(): Book[] {
  return books;
}

function getBookById(id: number): Book | undefined {
  return books.find((book) => book.id === id);
}

function getMemberByFirstName(first_name : string): Member[] {
  const filtered_first_name_Members = members.filter(
    (member) => member.first_name === first_name
  );
  return filtered_first_name_Members;
}

function getMemberByLastName(last_name : string): Member[] {
  const filtered_last_name_Members = members.filter(
    (member) => member.last_name === last_name
  );
  return filtered_last_name_Members;
}

function getMemberByPhoneNumber(phone_number : string): Member[] {
  const filtered_phone_number_Members = members.filter(
    (member) => member.phone_number === phone_number
  );
  return filtered_phone_number_Members;
}

function getAllMembers(): Member[] {
  return members;
}

function getMemberById(id: number): Member | undefined {
  return members.find((member) => member.id === id);
}

function getBorrowingHistoryByMemberId(memberId : number): BorrowingHistory[] {
  const filteredBorrowingHistoryByMemberId = borrowingHistorys.filter((history) =>
    history.member_id.some((a) => a.id === memberId)
  );
  return filteredBorrowingHistoryByMemberId;
}

function getBorrowingHistoryByBookId(bookId : number): BorrowingHistory[] {
  const filteredBorrowingHistoryByBookId = borrowingHistorys.filter((history) =>
    history.book_id.some((a) => a.id === bookId)
  );
  return filteredBorrowingHistoryByBookId;
}

function getBorrowingHistoryByBorrowDate(borrowedDate : string): BorrowingHistory[] { // ให้ borrowedDate เป็น string ไป ไม่งั้น มันจะเทียบใน return ไม่ได้  return historyBorrowedDate === borrowedDate;
  const filteredBorrowingHistoryByBorrowedDate = borrowingHistorys.filter((history) => {
    const historyBorrowedDate = new Date(history.borrow_date).toISOString().split("T")[0]; // แปลงเป็นรูปแบบ YYYY-MM-DD
    return historyBorrowedDate === borrowedDate;
  });
  return filteredBorrowingHistoryByBorrowedDate;
}

function getBorrowingHistoryByReturnDate(returnDate : string): BorrowingHistory[] { // ให้ borrowedDate เป็น string ไป ไม่งั้น มันจะเทียบใน return ไม่ได้  return historyBorrowedDate === borrowedDate;
  const filteredBorrowingHistoryByBorrowedDate = borrowingHistorys.filter((history) => {
    const historyBorrowedDate = new Date(history.return_due_date).toISOString().split("T")[0]; // แปลงเป็นรูปแบบ YYYY-MM-DD
    return historyBorrowedDate === returnDate;
  });
  return filteredBorrowingHistoryByBorrowedDate;
}

function getAllBorrowingHistory(): BorrowingHistory[] {
  return borrowingHistorys;
}

function getBorrowingHistoryById(borrowingHistory_id : number): BorrowingHistory | undefined {
  return borrowingHistorys.find((history) => history.id === borrowingHistory_id);
}

function getBorrowedBooksByBorrowingHistory_id(borrowingHistory_id : number): BorrowedBook [] {
  const filteredBorrowedBooksByBorrowingHistory_id = borrowedBooks.filter((history) => // ใช้ .some() ตรวจสอบว่า borrowing_id มี id ตรงกับ borrowingHistory_id หรือไม่
      history.borrowing_id.some((a) => a.id === borrowingHistory_id)
    );
    return filteredBorrowedBooksByBorrowingHistory_id;
}

function getBorrowedBooksByActualReturnDate(actualReturnDate : string): BorrowedBook [] {
  const filteredBorrowedBooksByActualReturnDate = borrowedBooks.filter((history) => {
    if (actualReturnDate === "null") { // กรองเฉพาะข้อมูลที่ actual_return_date === null //localhost:3010/borrowed-books?actual_return_date=null
      return history.actual_return_date === null;
    } else if (actualReturnDate === "undefined") { // กรองเฉพาะข้อมูลที่ actual_return_date === undefined //localhost:3010/borrowed-books?actual_return_date=undefined
      return history.actual_return_date === undefined;
    } else {
      if (!history.actual_return_date) return false; // ถ้าไม่มี actual_return_date ให้คืนค่า false
      const historyActualReturnDate = new Date(history.actual_return_date).toISOString().split("T")[0]; // แปลงเป็นรูปแบบ YYYY-MM-DD
      return historyActualReturnDate === actualReturnDate;
    }
  });
    return filteredBorrowedBooksByActualReturnDate;
}

function getAllBorrowedBooks(): BorrowedBook[] {
  return borrowedBooks;
}

function getBorrowedBookById(borrowedBook_id : number): BorrowedBook | undefined {
  const filteredBorrowedBooksById = borrowedBooks.find((history) => history.id === borrowedBook_id);
  return filteredBorrowedBooksById;
}


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
  else {res.json(borrowingHistorys);
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
  newBook.id = books.length + 1;
  books.push(newBook);
  res.json(newBook);
});

app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`);
});
