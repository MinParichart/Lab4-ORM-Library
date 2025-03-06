import connection from "../db";
import type {
  Book,
  BorrowedBook,
  BorrowingHistory,
  Member,
} from "../models/books";
// import type { Author } from '../models/books';
// ข้อสังเกต ใช้ชื่อ function/return type เหมือนเดิม แต่ว่า เปลี่ยนวิธีการเข้าถึงข้อมูล เป็น sql ในการเข้าถึง

// export async function getBookByTitle(title: string): Promise<Book[]> {
//   const [rows] = await connection.execute('SELECT * FROM books WHERE title LIKE = ?', [title])
// return rows as Book[];
// }
// export async function getBooksByIsbn(isbn: string): Promise<Book[]> {
//   const [rows] = await connection.execute('SELECT * FROM books WHERE isbn = ?', [isbn]);
//   return rows as Book[];
// }

// export async function getBooksByCategory(category: string): Promise<Book[]> {
//   const [rows] = await connection.execute('SELECT * FROM books WHERE category = ?', [category]);
//   return rows as Book[];
// }

// export async function getBooksByAuthor_id(authorId: number): Promise<Book[]> {
//   const [rows] = await connection.execute('SELECT * FROM books WHERE author_id = ?', [authorId]);
//   return rows as Book[];
// }

// export async function getBooksByAuthor_name(authorName: string): Promise<Book[]> {
//   const [rows] = await connection.execute(
//     `SELECT books.* FROM books
//      JOIN authors ON books.author_id = authors.id
//      WHERE authors.first_name LIKE ? OR authors.last_name LIKE ?`,
//     [`%${authorName}%`, `%${authorName}%`]
//   );
//   return rows as Book[];
// }

// export async function getAllBooks(): Promise<Book[]> {
//   const [rows] = await connection.execute('SELECT * FROM books');
//   return rows as Book[];
// }

// export async function getBookById(id: number): Promise<Book | undefined> {
//   const [rows] = await connection.execute('SELECT * FROM books WHERE id = ?', [id]);
//   return (rows as Book[])[0];
// }

// export async function getMemberByFirstName(first_name: string): Promise<Member[]> {
//   const [rows] = await connection.execute('SELECT * FROM members WHERE first_name = ?', [first_name]);
//   return rows as Member[];
// }

// export async function getMemberByLastName(last_name: string): Promise<Member[]> {
//   const [rows] = await connection.execute('SELECT * FROM members WHERE last_name = ?', [last_name]);
//   return rows as Member[];
// }

// export async function getMemberByPhoneNumber(phone_number: string): Promise<Member[]> {
//   const [rows] = await connection.execute('SELECT * FROM members WHERE phone_number = ?', [phone_number]);
//   return rows as Member[];
// }

// export async function getAllMembers(): Promise<Member[]> {
//   const [rows] = await connection.execute('SELECT * FROM members');
//   return rows as Member[];
// }

// export async function getMemberById(id: number): Promise<Member | undefined> {
//   const [rows] = await connection.execute('SELECT * FROM members WHERE id = ?', [id]);
//   return (rows as Member[])[0];
// }

// export async function getBorrowingHistoryByMemberId(memberId: number): Promise<BorrowingHistory[]> {
//   const [rows] = await connection.execute('SELECT * FROM borrowingHistories WHERE member_id = ?', [memberId]);
//   return rows as BorrowingHistory[];
// }

// export async function getBorrowingHistoryByBookId(bookId: number): Promise<BorrowingHistory[]> {
//   const [rows] = await connection.execute('SELECT * FROM borrowingHistories WHERE book_id = ?', [bookId]);
//   return rows as BorrowingHistory[];
// }

// export async function getBorrowingHistoryByBorrowDate(borrowedDate: string): Promise<BorrowingHistory[]> {
//   const [rows] = await connection.execute(
//     'SELECT * FROM borrowingHistories WHERE DATE(borrow_date) = ?',
//     [borrowedDate]
//   );
//   return rows as BorrowingHistory[];
// }

// export async function getBorrowingHistoryByReturnDate(returnDate: string): Promise<BorrowingHistory[]> {
//   const [rows] = await connection.execute(
//     'SELECT * FROM borrowingHistories WHERE DATE(return_due_date) = ?',
//     [returnDate]
//   );
//   return rows as BorrowingHistory[];
// }

// export async function getAllBorrowingHistory(): Promise<BorrowingHistory[]> {
//   const [rows] = await connection.execute('SELECT * FROM borrowingHistories');
//   return rows as BorrowingHistory[];
// }

// export async function getBorrowingHistoryById(borrowingHistory_id: number): Promise<BorrowingHistory | undefined> {
//   const [rows] = await connection.execute('SELECT * FROM borrowingHistories WHERE id = ?', [borrowingHistory_id]);
//   return (rows as BorrowingHistory[])[0];
// }

// export async function getBorrowedBooksByBorrowingHistory_id(borrowingHistory_id: number): Promise<BorrowedBook[]> {
//   const [rows] = await connection.execute('SELECT * FROM borrowedBooks WHERE borrowing_id = ?', [borrowingHistory_id]);
//   return rows as BorrowedBook[];
// }

// export async function getBorrowedBooksByActualReturnDate(actualReturnDate: string): Promise<BorrowedBook[]> {
//   let query = 'SELECT * FROM borrowedBooks';
//   if (actualReturnDate === "null") {
//     query += ' WHERE actual_return_date IS NULL';
//   } else if (actualReturnDate === "undefined") {
//     query += ' WHERE actual_return_date IS NULL';
//   } else {
//     query += ' WHERE DATE(actual_return_date) = ?';
//   }
//   const [rows] = await connection.execute(query, [actualReturnDate]);
//   return rows as BorrowedBook[];
// }

// export async function getAllBorrowedBooks(): Promise<BorrowedBook[]> {
//   const [rows] = await connection.execute('SELECT * FROM borrowedBooks');
//   return rows as BorrowedBook[];
// }

// export async function getBorrowedBookById(borrowedBook_id: number): Promise<BorrowedBook | undefined> {
//   const [rows] = await connection.execute('SELECT * FROM borrowedBooks WHERE id = ?', [borrowedBook_id]);
//   return (rows as BorrowedBook[])[0];
// }

// export async function addBook(newBook: Book): Promise<Book> {
//   const [result] = await connection.execute(
//     'INSERT INTO books (title, isbn, category, author_id) VALUES (?, ?, ?, ?)',
//     [newBook.title, newBook.isbn, newBook.category, newBook.author]
//   );
//   const insertedId = (result as any).insertId; // ดึง ID ที่ถูกสร้างอัตโนมัติ
//   return { ...newBook, id: insertedId };
// }

export async function getBookByTitle(title: string): Promise<Book[]> {
  const [rows] = await connection.execute(
    "SELECT * FROM books WHERE title LIKE ?", 
    [`%${title}%`] // รองรับการใช้ wildcard characters เช่น % (แทนอักขระใดๆ กี่ตัวก็ได้) และ _ (แทนอักขระใดๆ หนึ่งตัว)
  ); // จะใช้ = แทน LIKE ได้ เฉพาะเมื่อคุณต้องการค้นหาข้อมูลที่ตรงกันทุกตัวอักษรเท่านั้น (exact match) และไม่ต้องการใช้ wildcard characters 
  return rows as Book[];
}

export async function getBooksByIsbn(isbn: string): Promise<Book[]> {
  const [rows] = await connection.execute( // ควรใช้ LIKE เมื่อต้องการค้นหาข้อมูลแบบ partial match (การจับคู่บางส่วน) หรือเมื่อต้องการใช้ wildcard characters
    "SELECT * FROM books WHERE isbn LIKE ?", 
    [`%${isbn}%`]
  );
  return rows as Book[];
}

export async function getBooksByCategory(category: string): Promise<Book[]> {
  const [rows] = await connection.execute(
    "SELECT * FROM books WHERE category = ?",
    [category]
  );
  return rows as Book[];
}

export async function getBooksByAuthor_id(authorId: number): Promise<Book[]> {
  const [rows] = await connection.execute(
    "SELECT * FROM books WHERE author_id = ?",
    [authorId]
  );
  return rows as Book[];
}

export async function getBooksByAuthor_name(
  authorName: string
): Promise<Book[]> {
  const [rows] = await connection.execute(
    `SELECT books.* FROM books 
     JOIN authors ON books.author_id = authors.id 
     WHERE authors.first_name LIKE ? OR authors.last_name LIKE ?`,
    [`%${authorName}%`, `%${authorName}%`]
  );
  return rows as Book[];
}

export async function getAllBooks(): Promise<Book[]> {
  const [rows] = await connection.execute("SELECT * FROM books");
  return rows as Book[];
}

export async function getBookById(id: number): Promise<Book | undefined> {
  const [rows] = await connection.execute("SELECT * FROM books WHERE id = ?", [
    id,
  ]);
  return (rows as Book[])[0];
}

export async function getMemberByFirstName(
  first_name: string
): Promise<Member[]> {
  const [rows] = await connection.execute(
    "SELECT * FROM members WHERE first_name = ?",
    [first_name]
  );
  return rows as Member[];
}

export async function getMemberByLastName(
  last_name: string
): Promise<Member[]> {
  const [rows] = await connection.execute(
    "SELECT * FROM members WHERE last_name = ?",
    [last_name]
  );
  return rows as Member[];
}

export async function getMemberByPhoneNumber(
  phone_number: string
): Promise<Member[]> {
  const [rows] = await connection.execute(
    "SELECT * FROM members WHERE phone_number = ?",
    [phone_number]
  );
  return rows as Member[];
}

export async function getAllMembers(): Promise<Member[]> {
  const [rows] = await connection.execute("SELECT * FROM members");
  return rows as Member[];
}

export async function getMemberById(id: number): Promise<Member | undefined> {
  const [rows] = await connection.execute(
    "SELECT * FROM members WHERE id = ?",
    [id]
  );
  return (rows as Member[])[0];
}

export async function getBorrowingHistoryByMemberId(
  memberId: number
): Promise<BorrowingHistory[]> {
  const [rows] = await connection.execute(
    "SELECT * FROM borrowingHistories WHERE member_id = ?",
    [memberId]
  );
  return rows as BorrowingHistory[];
}

export async function getBorrowingHistoryByBookId(
  bookId: number
): Promise<BorrowingHistory[]> {
  const [rows] = await connection.execute(
    "SELECT * FROM borrowingHistories WHERE book_id = ?",
    [bookId]
  );
  return rows as BorrowingHistory[];
}

export async function getBorrowingHistoryByBorrowDate(
  borrowedDate: string
): Promise<BorrowingHistory[]> {
  const [rows] = await connection.execute(
    "SELECT * FROM borrowingHistories WHERE DATE(borrow_date) = ?",
    [borrowedDate]
  );
  return rows as BorrowingHistory[];
}

export async function getBorrowingHistoryByReturnDate(
  returnDate: string
): Promise<BorrowingHistory[]> {
  const [rows] = await connection.execute(
    "SELECT * FROM borrowingHistories WHERE DATE(return_due_date) = ?",
    [returnDate]
  );
  return rows as BorrowingHistory[];
}

export async function getAllBorrowingHistory(): Promise<BorrowingHistory[]> {
  const [rows] = await connection.execute("SELECT * FROM borrowingHistories");
  return rows as BorrowingHistory[];
}

export async function getBorrowingHistoryById(
  borrowingHistory_id: number
): Promise<BorrowingHistory | undefined> {
  const [rows] = await connection.execute(
    "SELECT * FROM borrowingHistories WHERE id = ?",
    [borrowingHistory_id]
  );
  return (rows as BorrowingHistory[])[0];
}

export async function getBorrowedBooksByBorrowingHistory_id(
  borrowingHistory_id: number
): Promise<BorrowedBook[]> {
  const [rows] = await connection.execute(
    "SELECT * FROM borrowedBooks WHERE borrowing_id = ?",
    [borrowingHistory_id]
  );
  return rows as BorrowedBook[];
}

// เก่า
// export async function getBorrowedBooksByActualReturnDate(
//   actualReturnDate: string
// ): Promise<BorrowedBook[]> {
//   let query = "SELECT * FROM borrowedBooks";
//   if (actualReturnDate === "null") {
//     query += " WHERE actual_return_date IS NULL";
//   } else if (actualReturnDate === "undefined") {
//     query += " WHERE actual_return_date IS NULL";
//   } else {
//     query += " WHERE DATE(actual_return_date) = ?";
//   }
//   const [rows] = await connection.execute(query, [actualReturnDate]);
//   return rows as BorrowedBook[];
// }

// ใหม่
export async function getBorrowedBooksByActualReturnDate(
  actualReturnDate: string
): Promise<BorrowedBook[]> {
  let query = "SELECT * FROM borrowedBooks";
  if (actualReturnDate === "null" || actualReturnDate === "undefined") {
    query += " WHERE actual_return_due_date IS NULL";
  } else {
    query += " WHERE DATE(actual_return_due_date) = ?";
  }
  const [rows] = await connection.execute(query, [actualReturnDate]);
  return rows as BorrowedBook[];
}

export async function getAllBorrowedBooks(): Promise<BorrowedBook[]> {
  const [rows] = await connection.execute("SELECT * FROM borrowedBooks");
  return rows as BorrowedBook[];
}

export async function getBorrowedBookById(
  borrowedBook_id: number
): Promise<BorrowedBook | undefined> {
  const [rows] = await connection.execute(
    "SELECT * FROM borrowedBooks WHERE id = ?",
    [borrowedBook_id]
  );
  return (rows as BorrowedBook[])[0];
}

// เก่า
// export async function addBook(newBook: Book): Promise<Book> {
//   const [result] = await connection.execute(
//     'INSERT INTO books (title, isbn, category, author_id) VALUES (?, ?, ?, ?)',
//     [newBook.title, newBook.isbn, newBook.category, newBook.author]
//   );
//   const insertedId = (result as any).insertId; // ดึง ID ที่ถูกสร้างอัตโนมัติ
//   return { ...newBook, id: insertedId };
// }

// ใหม่
export async function addBook(newBook: Book): Promise<Book> {
  // ดึง author_id จากอาร์เรย์ author
  const authorId = newBook.author[0].id; // ใช้ author_id ของ author คนแรก

  const [result] = await connection.execute(
    'INSERT INTO books (title, isbn, category, author_id) VALUES (?, ?, ?, ?)',
    [newBook.title, newBook.isbn, newBook.category, authorId]
  );
  const insertedId = (result as any).insertId; // ดึง ID ที่ถูกสร้างอัตโนมัติ
  return { ...newBook, id: insertedId };
}

// หากต้องการให้ API รับ author_id โดยตรง (ไม่ต้องอยู่ในอาร์เรย์ author) สามารถปรับโครงสร้าง JSON และโค้ดได้ดังนี้:
// export async function addBook(newBook: Book): Promise<Book> {
//   const [result] = await connection.execute(
//     'INSERT INTO books (title, isbn, category, author_id) VALUES (?, ?, ?, ?)',
//     [newBook.title, newBook.isbn, newBook.category, newBook.author_id]
//   );
//   const insertedId = (result as any).insertId; // ดึง ID ที่ถูกสร้างอัตโนมัติ
//   return { ...newBook, id: insertedId };
// }

// ก็จะส่งข้อมูลได้ดังนี้ 
// {
//   "title": "AAA",
//   "isbn": "106",
//   "category": "Technology",
//   "author_id": 1
// }