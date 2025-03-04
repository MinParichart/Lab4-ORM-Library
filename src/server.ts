import express, { Request, Response } from "express";
const app = express();
const port = 3010;

app.get("/", (req: Request, res: Response) => {
  //localhost:3010
  res.send("Hello World!");
});

app.get("/test", (req, res) => {
  //localhost:3010/test
  let returnObj = {
    name: "test",
    age: 20,
    address: "Thai",
  };
  res.send(returnObj);
});

app.get("/test2", (req, res) => {
  // localhost:3010/test2?id=5
  const id = req.query.id;
  const output = `id : ${id}`;
  res.send(output);
});

app.get("/books", (req, res) => {
  res.json(books);
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
