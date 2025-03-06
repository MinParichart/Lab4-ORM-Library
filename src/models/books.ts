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
  author: Author[]; // ถ้ามี [] จะมี สมาชิกใน array ได้มากกว่า 1 คน ถ้า Author มี 1 คน ไม่ต้องใส่ []
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
