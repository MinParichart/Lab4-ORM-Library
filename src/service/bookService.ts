// 1.ประกาศ type ของ object
export interface Author {
  id: number;
  first_name: string;
  last_name: string;
  affiliation: string;
}

export interface Book {
  id: number;
  title: string;
  isbn: string;
  category: string;
  author: Author[];
}

export interface Member {
  id: number;
  first_name: string;
  last_name: string;
  phone_number: string;
}

export interface BorrowingHistory {
  id: number;
  member_id: Member[];
  book_id: Book[];
  borrow_date: Date;
  return_due_date: Date;
}

export interface BorrowedBook {
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
export function getBookByTitle(title: string): Book[] {
    const filteredBooksByTitle = books.filter((book) => book.title.toLowerCase().includes(title));
  return filteredBooksByTitle;
}

export function getBooksByIsbn(isbn: string): Book[] {
    const filteredBooksByIsbn = books.filter((book) => book.isbn.toLowerCase().includes(isbn));
  return filteredBooksByIsbn;
}

export function getBooksByCategory(category: string): Book[] {
    const filteredBooksByCategory = books.filter((book) => book.category === category);
  return filteredBooksByCategory;
}
export function getBooksByAuthor_id(authorId: number): Book[] {
  return books.filter((book) => book.author.some((a) => a.id === authorId)); // กรองหนังสือตาม author id
}

export function getBooksByAuthor_name(authorName: string): Book [] {
  const filteredBooksByAuthor_name = books.filter((book) =>
    book.author.some(
      (a) =>
        a.first_name.toLowerCase().includes(authorName) ||
        a.last_name.toLowerCase().includes(authorName)
    ));
  return filteredBooksByAuthor_name; // กรองหนังสือตาม author id
}

export function getAllBook(): Book[] {
  return books;
}

export function getBookById(id: number): Book | undefined {
  return books.find((book) => book.id === id);
}

export function getMemberByFirstName(first_name : string): Member[] {
  const filtered_first_name_Members = members.filter(
    (member) => member.first_name === first_name
  );
  return filtered_first_name_Members;
}

export function getMemberByLastName(last_name : string): Member[] {
  const filtered_last_name_Members = members.filter(
    (member) => member.last_name === last_name
  );
  return filtered_last_name_Members;
}

export function getMemberByPhoneNumber(phone_number : string): Member[] {
  const filtered_phone_number_Members = members.filter(
    (member) => member.phone_number === phone_number
  );
  return filtered_phone_number_Members;
}

export function getAllMembers(): Member[] {
  return members;
}

export function getMemberById(id: number): Member | undefined {
  return members.find((member) => member.id === id);
}

export function getBorrowingHistoryByMemberId(memberId : number): BorrowingHistory[] {
  const filteredBorrowingHistoryByMemberId = borrowingHistorys.filter((history) =>
    history.member_id.some((a) => a.id === memberId)
  );
  return filteredBorrowingHistoryByMemberId;
}

export function getBorrowingHistoryByBookId(bookId : number): BorrowingHistory[] {
  const filteredBorrowingHistoryByBookId = borrowingHistorys.filter((history) =>
    history.book_id.some((a) => a.id === bookId)
  );
  return filteredBorrowingHistoryByBookId;
}

export function getBorrowingHistoryByBorrowDate(borrowedDate : string): BorrowingHistory[] { // ให้ borrowedDate เป็น string ไป ไม่งั้น มันจะเทียบใน return ไม่ได้  return historyBorrowedDate === borrowedDate;
  const filteredBorrowingHistoryByBorrowedDate = borrowingHistorys.filter((history) => {
    const historyBorrowedDate = new Date(history.borrow_date).toISOString().split("T")[0]; // แปลงเป็นรูปแบบ YYYY-MM-DD
    return historyBorrowedDate === borrowedDate;
  });
  return filteredBorrowingHistoryByBorrowedDate;
}

export function getBorrowingHistoryByReturnDate(returnDate : string): BorrowingHistory[] { // ให้ borrowedDate เป็น string ไป ไม่งั้น มันจะเทียบใน return ไม่ได้  return historyBorrowedDate === borrowedDate;
  const filteredBorrowingHistoryByBorrowedDate = borrowingHistorys.filter((history) => {
    const historyBorrowedDate = new Date(history.return_due_date).toISOString().split("T")[0]; // แปลงเป็นรูปแบบ YYYY-MM-DD
    return historyBorrowedDate === returnDate;
  });
  return filteredBorrowingHistoryByBorrowedDate;
}

export function getAllBorrowingHistory(): BorrowingHistory[] {
  return borrowingHistorys;
}

export function getBorrowingHistoryById(borrowingHistory_id : number): BorrowingHistory | undefined {
  return borrowingHistorys.find((history) => history.id === borrowingHistory_id);
}

export function getBorrowedBooksByBorrowingHistory_id(borrowingHistory_id : number): BorrowedBook [] {
  const filteredBorrowedBooksByBorrowingHistory_id = borrowedBooks.filter((history) => // ใช้ .some() ตรวจสอบว่า borrowing_id มี id ตรงกับ borrowingHistory_id หรือไม่
      history.borrowing_id.some((a) => a.id === borrowingHistory_id)
    );
    return filteredBorrowedBooksByBorrowingHistory_id;
}

export function getBorrowedBooksByActualReturnDate(actualReturnDate : string): BorrowedBook [] {
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

export function getAllBorrowedBooks(): BorrowedBook[] {
  return borrowedBooks;
}

export function getBorrowedBookById(borrowedBook_id : number): BorrowedBook | undefined {
  const filteredBorrowedBooksById = borrowedBooks.find((history) => history.id === borrowedBook_id);
  return filteredBorrowedBooksById;
}

export function addBook(newBook : Book) : Book { 
  newBook.id = books.length + 1 ; 
  books.push(newBook); 
  return newBook; 
}
