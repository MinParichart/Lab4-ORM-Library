import express, { Request, Response } from "express";
const app = express();
const port = 3010;

app.get("/", (req: Request, res: Response) => { //localhost:3010
  res.send("Hello World!");
});

// app.get("/books", (req, res) => { //localhost:3010/books = ออกมาทุกหนังสือ
//   res.json(books);
// });

app.get("/books", (req, res) => { //localhost:3010/books?title=Atomic = ออกมาเฉพาะที่ title ที่ query
  if (req.query.title) { // ใส่ if else ด้วย เพื่อเช็คค่าว่ามีการส่ง query title มาหรือไม่ ถ้าส่งมา ก็ให้แสดงเฉพาะ ที่ query แต่ถ้าไม่ส่งมา ก็ให้แสดงเป็นชื่อหนังสือทั้งหมด
    const title = req.query.title; 
    const filteredBooks =  books.filter((book) => book.title === title); 
    console.log(filteredBooks); // ให้แสดง ใน termimal ด้วย ว่าได้ค่าเป้นอย่างไร 
    res.json(filteredBooks);
  } else { 
    res.json(books)
  }
})

app.get("/books/:id", (req, res) => { //localhost:3010/books/1
    const id = parseInt(req.params.id); 
    const filteredBooksById =  books.find((book) => book.id === id); 
  if (filteredBooksById) { // ถ้าค่าที่ส่งมา = id ที่มีในฐานข้อมูล ก็ให้แสดงข้อมูล ของหนังสือเล่มนั้น
    res.json(filteredBooksById);
  } else { // ถ้าค่าที่ส่งมา = id ไม่มีในฐานข้อมูล ก็ให้แสดง status 404 และ แสดงข้อความ Book not found!
    res.status(404).send("Book not found!");
  }
});

app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`);
});

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

//ต้องสร้างจัวแปร authors ก่อน เพราะว่า books จะนำ authors ไปอ้างอิงต่อ

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
    member_id: [members[0]],
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
    borrowing_id: [borrowingHistorys[0]],
    actual_return_date: undefined,
  }, // undefined คือยังไม่คืน
];
