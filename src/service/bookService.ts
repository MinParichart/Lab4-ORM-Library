// 1.ประกาศ type ของ object ** เราย้าย type ไปไว้ที่ models.books.ts เพื่อจัดการได้ง่ายขึ้น เลยต้อง import เข้ามา
import type { Book, BorrowedBook, BorrowingHistory, Member } from '../models/books';

// 2.สร้างตัวแปร เพื่อเก็บข้อมูลลงใน array ตาม type ของ object ** เราย้าย type ไปไว้ที่ repository.booksRepository.ts เพื่อจัดการได้ง่ายขึ้น เลยต้อง import เข้ามา 
//ต้องสร้างตัวแปร authors ก่อน เพราะว่า books จะนำ authors ไปอ้างอิงต่อ
import {
  getAllBook as allBook,
  getAllBorrowedBooks as allBorrowedBooks,
  getAllBorrowingHistory as allBorrowingHistory,
  getAllMembers as allMembers,
  getBookById as bookById,
  getBookByTitle as bookByTitle,
  getBooksByAuthor_id as booksByAuthor_id,
  getBooksByAuthor_name as booksByAuthor_name,
  getBooksByCategory as booksByCategory,
  getBooksByIsbn as booksByIsb,
  getBorrowedBooksByActualReturnDate as borrowedBooksByActualReturnDate,
  getBorrowedBooksByBorrowingHistory_id as borrowedBooksByBorrowingHistory_id,
  getBorrowingHistoryByBookId as borrowingHistoryByBookId,
  getBorrowingHistoryByBorrowDate as borrowingHistoryByBorrowDate,
  getBorrowingHistoryById as borrowingHistoryById,
  getBorrowingHistoryByMemberId as borrowingHistoryByMemberId,
  getBorrowingHistoryByReturnDate as borrowingHistoryByReturnDate,
  getMemberByFirstName as memberByFirstName,
  getMemberById as memberById,
  getMemberByLastName as memberByLastName,
  getMemberByPhoneNumber as memberByPhoneNumber
} from '../repository/booksRepository';

// 4.แยกส่วนที่ใช้ในการหาข้อมูลทั้งหมดในตัว Endpoint ออกมาเป็น function ใหม่ เพื่อให้ในส่วน endpoint ใช้ในการเลือกว่าจะนำข้อมูลใดมานำเสนอเท่านั้น ** เราย้าย type ไปไว้ที่ repository.booksRepository.ts เพื่อจัดการได้ง่ายขึ้น เลยต้อง import เข้ามา 

export function getBookByTitle(title: string): Promise<Book[]> {
  return bookByTitle(title);
}

export function getBooksByIsbn(isbn: string): Promise<Book[]> {
    return booksByIsb(isbn);
}

export function getBooksByCategory(category: string): Promise<Book[]> {
    return booksByCategory(category);
}
export function getBooksByAuthor_id(authorId: number): Promise<Book[]> {
  return booksByAuthor_id(authorId); 
}

export function getBooksByAuthor_name(authorName: string): Promise<Book[]> {
  return booksByAuthor_name(authorName);
}

export function getAllBook(): Promise<Book[]> {
  return allBook(); 
}
//
export function getBookById(id: number):Promise<Book | undefined> {
  return bookById(id)
}

export function getMemberByFirstName(first_name : string): Promise<Member[]> {
  return memberByFirstName(first_name);
}

export function getMemberByLastName(last_name : string): Promise<Member[]> {
  return memberByLastName(last_name);
}

export function getMemberByPhoneNumber(phone_number : string): Promise<Member[]> {
  return memberByPhoneNumber(phone_number);
}

export function getAllMembers(): Promise<Member[]> {
  return allMembers();
}

export function getMemberById(id: number): Promise<Member | undefined> {
  return memberById(id);
}

export function getBorrowingHistoryByMemberId(memberId : number): Promise<BorrowingHistory[]> {
  return borrowingHistoryByMemberId(memberId);
}

export function getBorrowingHistoryByBookId(bookId : number): Promise<BorrowingHistory[]> {
  return borrowingHistoryByBookId(bookId);
}

export function getBorrowingHistoryByBorrowDate(borrowedDate : string): Promise<BorrowingHistory[]> { // ให้ borrowedDate เป็น string ไป ไม่งั้น มันจะเทียบใน return ไม่ได้  return historyBorrowedDate === borrowedDate;
  return borrowingHistoryByBorrowDate(borrowedDate);
}

export function getBorrowingHistoryByReturnDate(returnDate : string): Promise<BorrowingHistory[]> { // ให้ borrowedDate เป็น string ไป ไม่งั้น มันจะเทียบใน return ไม่ได้  return historyBorrowedDate === borrowedDate;
  return borrowingHistoryByReturnDate(returnDate)
}

export function getAllBorrowingHistory(): Promise<BorrowingHistory[]> {
  return allBorrowingHistory()
}

export function getBorrowingHistoryById(borrowingHistory_id : number): Promise<BorrowingHistory | undefined> {
  return borrowingHistoryById(borrowingHistory_id)
}

export function getBorrowedBooksByBorrowingHistory_id(borrowingHistory_id : number): Promise<BorrowedBook[]> {
  return borrowedBooksByBorrowingHistory_id(borrowingHistory_id)  
}

export function getBorrowedBooksByActualReturnDate(actualReturnDate : string): Promise<BorrowedBook[]> {
  return borrowedBooksByActualReturnDate(actualReturnDate)
}

export function getAllBorrowedBooks(): Promise<BorrowedBook[]> {
  return allBorrowedBooks()
}

export function getBorrowedBookById(borrowedBook_id : number): Promise<BorrowedBook | undefined> {
  return getBorrowedBookById(borrowedBook_id)
}

export function addBook(newBook : Book) : Promise<Book> { 
  return addBook(newBook);
}
