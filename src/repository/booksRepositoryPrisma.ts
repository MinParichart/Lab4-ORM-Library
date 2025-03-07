import { PrismaClient } from '@prisma/client';
import { Book, BorrowedBook, BorrowingHistory, Member } from '../models/books';
// import { Author } from '../models/books';
const prisma = new PrismaClient();

export async function getBookByTitle(title: string): Promise<Book[]> {
  const books = await prisma.book.findMany({
    where: {
      title: { contains: title.toLowerCase() }, // กรองโดยไม่สนใจตัวพิมพ์เล็ก-ใหญ่
    },
    include: {
      author: true, // ดึงข้อมูล author ที่เกี่ยวข้อง
    },
  });

  return books.map((book) => ({
    ...book,
    author: [book.author], // แปลง author เป็นอาร์เรย์
  }));
}

export async function getBooksByIsbn(isbn: string): Promise<Book[]> {
  const books = await prisma.book.findMany({
    where: {
      isbn: { contains: isbn.toLowerCase() }, // กรองโดยไม่สนใจตัวพิมพ์เล็ก-ใหญ่
    },
    include: {
      author: true, // ดึงข้อมูล author ที่เกี่ยวข้อง
    },
  });

  return books.map((book) => ({
    ...book,
    author: [book.author], // แปลง author เป็นอาร์เรย์
  }));
}

export async function getBooksByCategory(category: string): Promise<Book[]> {
  const books = await prisma.book.findMany({
    where: { category },
    include: {
      author: true, // ดึงข้อมูล author ที่เกี่ยวข้อง
    },
  });

  return books.map((book) => ({
    ...book,
    author: [book.author], // แปลง author เป็นอาร์เรย์
  }));
}

export async function getBooksByAuthor_id(authorId: number): Promise<Book[]> {
  const books = await prisma.book.findMany({
    where: { author_id: authorId },
    include: {
      author: true, // ดึงข้อมูล author ที่เกี่ยวข้อง
    },
  });

  return books.map((book) => ({
    ...book,
    author: [book.author], // แปลง author เป็นอาร์เรย์
  }));
}

export async function getBooksByAuthor_name(authorName: string): Promise<Book[]> {
  const books = await prisma.book.findMany({
    where: {
      author: {
        OR: [
          { first_name: { contains: authorName.toLowerCase()} },
          { last_name: { contains: authorName.toLowerCase()} },
        ],
      },
    },
    include: {
      author: true, // ดึงข้อมูล author ที่เกี่ยวข้อง
    },
  });

  return books.map((book) => ({
    ...book,
    author: [book.author], // แปลง author เป็นอาร์เรย์
  }));
}

export async function getAllBooks(): Promise<Book[]> {
  const books = await prisma.book.findMany({
    include: {
      author: true, // ดึงข้อมูล author ที่เกี่ยวข้อง
    },
  });

  return books.map((book) => ({
    ...book,
    author: [book.author], // แปลง author เป็นอาร์เรย์
  }));
}

export async function getBookById(id: number): Promise<Book | undefined> {
  const book = await prisma.book.findUnique({
    where: { id },
    include: {
      author: true, // ดึงข้อมูล author ที่เกี่ยวข้อง
    },
  });

  if (!book) return undefined;

  return {
    ...book,
    author: [book.author], // แปลง author เป็นอาร์เรย์
  };
}

export async function getMemberByFirstName(first_name: string): Promise<Member[]> {
  return await prisma.member.findMany({
    where: { first_name },
  });
}

export async function getMemberByLastName(last_name: string): Promise<Member[]> {
  return await prisma.member.findMany({
    where: { last_name },
  });
}

export async function getMemberByPhoneNumber(phone_number: string): Promise<Member[]> {
  return await prisma.member.findMany({
    where: { phone_number },
  });
}

export async function getAllMembers(): Promise<Member[]> {
  return await prisma.member.findMany();
}

export async function getMemberById(id: number): Promise<Member | undefined> {
  return await prisma.member.findUnique({
    where: { id },
  }) ?? undefined;
}

export async function getBorrowingHistoryByMemberId(memberId: number): Promise<BorrowingHistory[]> {
  const histories = await prisma.borrowingHistory.findMany({
    where: { member_id: memberId },
    include: {
      member: true, // ดึงข้อมูล member ที่เกี่ยวข้อง
      book: {
        include: {
          author: true, // ดึงข้อมูล author ที่เกี่ยวข้องกับ book
        },
      },
    },
  });

  // แปลง member และ book จากอ็อบเจกต์เดี่ยวเป็นอาร์เรย์
  return histories.map((history) => ({
    ...history,
    member_id: [history.member], // แปลง member เป็นอาร์เรย์
    book_id: [
      {
        ...history.book,
        author: [history.book.author], // แปลง author เป็นอาร์เรย์
      },
    ], // แปลง book เป็นอาร์เรย์
    borrow_date: new Date(history.borrow_date), // แปลง borrow_date เป็น Date
    return_due_date: new Date(history.return_due_date), // แปลง return_due_date เป็น Date
  }));
}

export async function getBorrowingHistoryByBookId(bookId: number): Promise<BorrowingHistory[]> {
  const histories = await prisma.borrowingHistory.findMany({
    where: { book_id: bookId },
    include: {
      member: true, // ดึงข้อมูล member ที่เกี่ยวข้อง
      book: {
        include: {
          author: true, // ดึงข้อมูล author ที่เกี่ยวข้องกับ book
        },
      },
    },
  });

  // แปลง member และ book จากอ็อบเจกต์เดี่ยวเป็นอาร์เรย์
  return histories.map((history) => ({
    ...history,
    member_id: [history.member], // แปลง member เป็นอาร์เรย์
    book_id: [
      {
        ...history.book,
        author: [history.book.author], // แปลง author เป็นอาร์เรย์
      },
    ], // แปลง book เป็นอาร์เรย์
    borrow_date: new Date(history.borrow_date), // แปลง borrow_date เป็น Date
    return_due_date: new Date(history.return_due_date), // แปลง return_due_date เป็น Date
  }));
}

export async function getBorrowingHistoryByBorrowDate(borrowedDate: string): Promise<BorrowingHistory[]> {
  const histories = await prisma.borrowingHistory.findMany({
    where: {
      borrow_date: new Date(borrowedDate).toISOString(), // แปลงเป็นรูปแบบ ISO string
    },
    include: {
      member: true, // ดึงข้อมูล member ที่เกี่ยวข้อง
      book: {
        include: {
          author: true, // ดึงข้อมูล author ที่เกี่ยวข้องกับ book
        },
      },
    },
  });

  // แปลง member และ book จากอ็อบเจกต์เดี่ยวเป็นอาร์เรย์
  return histories.map((history) => ({
    ...history,
    member_id: [history.member], // แปลง member เป็นอาร์เรย์
    book_id: [
      {
        ...history.book,
        author: [history.book.author], // แปลง author เป็นอาร์เรย์
      },
    ], // แปลง book เป็นอาร์เรย์
    borrow_date: new Date(history.borrow_date), // แปลง borrow_date เป็น Date
    return_due_date: new Date(history.return_due_date), // แปลง return_due_date เป็น Date
  }));
}

export async function getBorrowingHistoryByReturnDate(returnDate: string): Promise<BorrowingHistory[]> {
  const histories = await prisma.borrowingHistory.findMany({
    where: {
      return_due_date: new Date(returnDate).toISOString(), // แปลงเป็นรูปแบบ ISO string
    },
    include: {
      member: true, // ดึงข้อมูล member ที่เกี่ยวข้อง
      book: {
        include: {
          author: true, // ดึงข้อมูล author ที่เกี่ยวข้องกับ book
        },
      },
    },
  });

  // แปลง member และ book จากอ็อบเจกต์เดี่ยวเป็นอาร์เรย์
  return histories.map((history) => ({
    ...history,
    member_id: [history.member], // แปลง member เป็นอาร์เรย์
    book_id: [
      {
        ...history.book,
        author: [history.book.author], // แปลง author เป็นอาร์เรย์
      },
    ], // แปลง book เป็นอาร์เรย์
    borrow_date: new Date(history.borrow_date), // แปลง borrow_date เป็น Date
    return_due_date: new Date(history.return_due_date), // แปลง return_due_date เป็น Date
  }));
}

export async function getAllBorrowingHistory(): Promise<BorrowingHistory[]> {
  const histories = await prisma.borrowingHistory.findMany({
    include: {
      member: true, // ดึงข้อมูล member ที่เกี่ยวข้อง
      book: {
        include: {
          author: true, // ดึงข้อมูล author ที่เกี่ยวข้องกับ book
        },
      },
    },
  });

  // แปลง member และ book จากอ็อบเจกต์เดี่ยวเป็นอาร์เรย์
  return histories.map((history) => ({
    ...history,
    member_id: [history.member], // แปลง member เป็นอาร์เรย์
    book_id: [
      {
        ...history.book,
        author: [history.book.author], // แปลง author เป็นอาร์เรย์
      },
    ], // แปลง book เป็นอาร์เรย์
    borrow_date: new Date(history.borrow_date), // แปลง borrow_date เป็น Date
    return_due_date: new Date(history.return_due_date), // แปลง return_due_date เป็น Date
  }));
}

export async function getBorrowingHistoryById(borrowingHistory_id: number): Promise<BorrowingHistory | undefined> {
  const history = await prisma.borrowingHistory.findUnique({
    where: { id: borrowingHistory_id },
    include: {
      member: true, // ดึงข้อมูล member ที่เกี่ยวข้อง
      book: {
        include: {
          author: true, // ดึงข้อมูล author ที่เกี่ยวข้องกับ book
        },
      },
    },
  });

  if (!history) return undefined; // หากไม่พบข้อมูล ให้คืนค่า undefined

  // แปลง member และ book จากอ็อบเจกต์เดี่ยวเป็นอาร์เรย์
  return {
    ...history,
    member_id: [history.member], // แปลง member เป็นอาร์เรย์
    book_id: [
      {
        ...history.book,
        author: [history.book.author], // แปลง author เป็นอาร์เรย์
      },
    ], // แปลง book เป็นอาร์เรย์
    borrow_date: new Date(history.borrow_date), // แปลง borrow_date เป็น Date
    return_due_date: new Date(history.return_due_date), // แปลง return_due_date เป็น Date
  };
}

export async function getBorrowedBooksByBorrowingHistory_id(borrowingHistory_id: number): Promise<BorrowedBook[]> {
  const borrowedBooks = await prisma.borrowedBook.findMany({
    where: { borrowing_id: borrowingHistory_id },
    include: {
      borrowingHistory: {
        include: {
          member: true, // ดึงข้อมูล member ที่เกี่ยวข้อง
          book: {
            include: {
              author: true, // ดึงข้อมูล author ที่เกี่ยวข้องกับ book
            },
          },
        },
      },
    },
  });

  // แปลง borrowingHistory, member, และ book จากอ็อบเจกต์เดี่ยวเป็นอาร์เรย์
  return borrowedBooks.map((borrowedBook) => ({
    ...borrowedBook,
    borrowing_id: [
      {
        ...borrowedBook.borrowingHistory,
        member_id: [borrowedBook.borrowingHistory.member], // แปลง member เป็นอาร์เรย์
        book_id: [
          {
            ...borrowedBook.borrowingHistory.book,
            author: [borrowedBook.borrowingHistory.book.author], // แปลง author เป็นอาร์เรย์
          },
        ], // แปลง book เป็นอาร์เรย์
        borrow_date: new Date(borrowedBook.borrowingHistory.borrow_date), // แปลง borrow_date เป็น Date
        return_due_date: new Date(borrowedBook.borrowingHistory.return_due_date), // แปลง return_due_date เป็น Date
      },
    ], // แปลง borrowingHistory เป็นอาร์เรย์
  }));
}

export async function getBorrowedBooksByActualReturnDate(actualReturnDate: string): Promise<BorrowedBook[]> {
  let whereCondition: any = {};

  if (actualReturnDate === "null" || actualReturnDate === "undefined") {
    whereCondition.actual_return_due_date = null;
  } else {
    whereCondition.actual_return_due_date = new Date(actualReturnDate).toISOString();
  }

  const borrowedBooks = await prisma.borrowedBook.findMany({
    where: whereCondition,
    include: {
      borrowingHistory: {
        include: {
          member: true, // ดึงข้อมูล member ที่เกี่ยวข้อง
          book: {
            include: {
              author: true, // ดึงข้อมูล author ที่เกี่ยวข้องกับ book
            },
          },
        },
      },
    },
  });

  // แปลง borrowingHistory, member, และ book จากอ็อบเจกต์เดี่ยวเป็นอาร์เรย์
  return borrowedBooks.map((borrowedBook) => ({
    ...borrowedBook,
    borrowing_id: [
      {
        ...borrowedBook.borrowingHistory,
        member_id: [borrowedBook.borrowingHistory.member], // แปลง member เป็นอาร์เรย์
        book_id: [
          {
            ...borrowedBook.borrowingHistory.book,
            author: [borrowedBook.borrowingHistory.book.author], // แปลง author เป็นอาร์เรย์
          },
        ], // แปลง book เป็นอาร์เรย์
        borrow_date: new Date(borrowedBook.borrowingHistory.borrow_date), // แปลง borrow_date เป็น Date
        return_due_date: new Date(borrowedBook.borrowingHistory.return_due_date), // แปลง return_due_date เป็น Date
      },
    ], // แปลง borrowingHistory เป็นอาร์เรย์
  }));
}

export async function getAllBorrowedBooks(): Promise<BorrowedBook[]> {
  const borrowedBooks = await prisma.borrowedBook.findMany({
    include: {
      borrowingHistory: {
        include: {
          member: true, // รวมข้อมูลของ Member
          book: {
            include: {
              author: true, // รวมข้อมูลของ Author ใน Book
            },
          },
        },
      },
    },
  });

  // แปลงข้อมูลให้ตรงกับประเภท BorrowedBook
  return borrowedBooks.map((borrowedBook) => {
    // ตรวจสอบว่า borrowingHistory เป็นอาร์เรย์และมีข้อมูล
    const borrowingHistoryWithMembers = Array.isArray(borrowedBook.borrowingHistory)
      ? borrowedBook.borrowingHistory.map((history) => ({
          member_id: history.member ? history.member.id : null, // member_id เป็น number หรือ null
          book_id: history.book ? history.book.id : null, // book_id เป็น number หรือ null
          member: history.member ? history.member : null, // เพิ่ม member ในโครงสร้าง
          book: history.book ? history.book : null, // เพิ่ม book ในโครงสร้าง
          id: history.id,
          borrow_date: history.borrow_date,
          return_due_date: history.return_due_date,
        }))
      : []; // กรณีไม่มี borrowingHistory จะใช้ค่าว่าง []

    return {
      id: borrowedBook.id,
      actual_return_due_date: borrowedBook.actual_return_due_date,
      borrowing_id: borrowingHistoryWithMembers, // แปลง borrowing_id เป็น BorrowingHistory[]
    };
  });
}

export async function getBorrowedBookById(
  borrowedBook_id: number
): Promise<BorrowedBook | undefined> {
  const borrowedBook = await prisma.borrowedBook.findUnique({
    where: { id: borrowedBook_id },
    include: {
      borrowingHistory: {
        include: {
          member: true, // ดึงข้อมูล Member ที่เกี่ยวข้อง
          book: {
            include: {
              author: true, // ดึงข้อมูล Author ที่เกี่ยวข้องกับ Book
            },
          },
        },
      },
    },
  });

  if (!borrowedBook) {
    return undefined; // หากไม่พบข้อมูล ให้ส่งกลับ undefined
  }

  // ตรวจสอบว่า borrowingHistory มีข้อมูลหรือไม่
  const borrowingHistory = borrowedBook.borrowingHistory;

  if (!borrowingHistory) {
    return undefined; // ถ้าไม่พบ borrowingHistory ให้ส่งกลับ undefined
  }

  // แปลงข้อมูลให้ตรงกับประเภท BorrowedBook
  return {
    id: borrowedBook.id,
    actual_return_date: borrowedBook.actual_return_due_date ? new Date(borrowedBook.actual_return_due_date) : undefined, // แปลง string เป็น Date
    borrowing_id: [
      {
        id: borrowingHistory.id,
        member_id: borrowingHistory.member ? [borrowingHistory.member] : [], // เปลี่ยนเป็น array ของ member
        book_id: borrowingHistory.book ? [{ ...borrowingHistory.book, author: [borrowingHistory.book.author] }] : [], // เปลี่ยนเป็น array ของ book
        borrow_date: new Date(borrowingHistory.borrow_date), // แปลง string เป็น Date
        return_due_date: new Date(borrowingHistory.return_due_date || Date.now()), // แปลง string เป็น Date
      },
    ],
  };
}





export async function addBook(newBook: Book): Promise<Book> {
  const authorId = newBook.author[0].id; // ใช้ author_id ของ author คนแรก

  const book = await prisma.book.create({
    data: {
      title: newBook.title,
      isbn: newBook.isbn,
      category: newBook.category,
      author_id: authorId,
    },
    include: {
      author: true, // ดึงข้อมูล author ที่เกี่ยวข้อง
    },
  });

  return {
    ...book,
    author: [book.author], // แปลง author เป็นอาร์เรย์
  };
}





// export async function getBooksByCategory(category: string): Promise<Book[]> {
//   const books = await prisma.book.findMany({
//     where: { category },
//     include: {
//       author: true, // ดึงข้อมูล author ที่เกี่ยวข้อง
//     },
//   });

//   return books.map((book) => ({
//     ...book,
//     author: [book.author], // แปลง author เป็นอาร์เรย์
//   }));
// }

// export async function getBooksByAuthor_id(authorId: number): Promise<Book[]> {
//   const books = await prisma.book.findMany({
//     where: { author_id: authorId },
//     include: {
//       author: true, // ดึงข้อมูล author ที่เกี่ยวข้อง
//     },
//   });

//   return books.map((book) => ({
//     ...book,
//     author: [book.author], // แปลง author เป็นอาร์เรย์
//   }));
// }

// export async function getBooksByAuthor_name(authorName: string): Promise<Book[]> {
//   const books = await prisma.book.findMany({
//     where: {
//       author: {
//         OR: [
//           { first_name: { contains: authorName.toLowerCase() } },
//           { last_name: { contains: authorName.toLowerCase() } },
//         ],
//       },
//     },
//     include: {
//       author: true, // ดึงข้อมูล author ที่เกี่ยวข้อง
//     },
//   });

//   return books.map((book) => ({
//     ...book,
//     author: [book.author], // แปลง author เป็นอาร์เรย์
//   }));
// }

// export async function getAllBooks(): Promise<Book[]> {
//   const books = await prisma.book.findMany({
//     include: {
//       author: true, // ดึงข้อมูล author ที่เกี่ยวข้อง
//     },
//   });

//   return books.map((book) => ({
//     ...book,
//     author: [book.author], // แปลง author เป็นอาร์เรย์
//   }));
// }

// export async function getBookById(id: number): Promise<Book | undefined> {
//   const book = await prisma.book.findUnique({
//     where: { id },
//     include: {
//       author: true, // ดึงข้อมูล author ที่เกี่ยวข้อง
//     },
//   });

//   if (!book) return undefined;

//   return {
//     ...book,
//     author: [book.author], // แปลง author เป็นอาร์เรย์
//   };
// }

// export async function getMemberByFirstName(first_name: string): Promise<Member[]> {
//   return prisma.member.findMany({
//     where: { first_name },
//   });
// }

// export async function getMemberByLastName(last_name: string): Promise<Member[]> {
//   return prisma.member.findMany({
//     where: { last_name },
//   });
// }

// export async function getMemberByPhoneNumber(phone_number: string): Promise<Member[]> {
//   return prisma.member.findMany({
//     where: { phone_number },
//   });
// }

// export async function getAllMembers(): Promise<Member[]> {
//   return await prisma.member.findMany();
// }

// export async function getMemberById(id: number): Promise<Member | undefined> {
//   return await prisma.member.findUnique({
//     where: { id },
//   }) ?? undefined; // ถ้า prisma.member.findUnique() คืนค่า null จะถูกแปลงเป็น undefined
// }

// // export async function getMemberById(id: number): Promise<Member | undefined> {
// //   const member = await prisma.member.findUnique({
// //     where: { id },
// //   });
// //   return member !== null ? member : undefined; // ทำงานเหมือน ?? undefined แต่เขียนชัดเจนขึ้น
// // }


// export async function getBorrowingHistoryByMemberId(memberId: number): Promise<BorrowingHistory[]> { 
//   return prisma.borrowingHistory.findMany({
//     where: { member_id: memberId },
//     select: { //  select กำหนดให้ Prisma คืนค่า member_id เป็น number แทน Member[]
//       id: true,
//       member_id: true,
//       book_id: true,
//       borrow_date: true,
//       return_due_date: true,
//     }
//   }) as any;
// }

// export async function getBorrowingHistoryByBookId(bookId: number): Promise<BorrowingHistory[]> {
//   return prisma.borrowingHistory.findMany({
//     where: { book_id: bookId },
//     select: { // book_id จะไม่ถูกคืนเป็น Book object แต่เป็น number ตามที่ต้องการ
//       id: true,
//       member_id: true,
//       book_id: true,
//       borrow_date: true,
//       return_due_date: true,
//     }
//   }) as any;
// }

// export async function getBorrowingHistoryByBorrowDate(borrowedDate: string): Promise<BorrowingHistory[]> {
//   return prisma.borrowingHistory.findMany({
//     where: {
//       borrow_date: new Date(borrowedDate).toISOString(), // แปลงเป็นรูปแบบ ISO string
//     },
//   });
// }

// export async function getBorrowingHistoryByReturnDate(returnDate: string): Promise<BorrowingHistory[]> {
//   return prisma.borrowingHistory.findMany({
//     where: {
//       return_due_date: new Date(returnDate).toISOString(), // แปลงเป็นรูปแบบ ISO string
//     },
//   });
// }

// export async function getAllBorrowingHistory(): Promise<BorrowingHistory[]> {
//   return prisma.borrowingHistory.findMany();
// }

// export async function getBorrowingHistoryById(borrowingHistory_id: number): Promise<BorrowingHistory | undefined> {
//   return prisma.borrowingHistory.findUnique({
//     where: { id: borrowingHistory_id },
//   });
// }

// export async function getBorrowedBooksByBorrowingHistory_id(borrowingHistory_id: number): Promise<BorrowedBook[]> {
//   return prisma.borrowedBook.findMany({
//     where: { borrowing_id: borrowingHistory_id },
//     select: { // borrowing_id คืนค่าเป็น number ไม่ใช่ BorrowingHistory[]
//       id: true,
//       borrowing_id: true,
//       actual_return_due_date: true
//     }
//   }) as any;
// }

// export async function getBorrowingHistoryByReturnDate(returnDate: string): Promise<BorrowingHistory[]> {
//   return prisma.borrowingHistory.findMany({
//     where: {
//       return_due_date: returnDate,
//     },
//     select: {
//       id: true,
//       member_id: true,
//       book_id: true,
//       borrow_date: true,
//       return_due_date: true,
//     }
//   }) as any;
// }


// export async function getAllBorrowedBooks(): Promise<BorrowedBook[]> {
//   return prisma.borrowedBook.findMany();
// }

// export async function getBorrowedBookById(borrowedBook_id: number): Promise<BorrowedBook | undefined> {
//   return prisma.borrowedBook.findUnique({
//     where: { id: borrowedBook_id },
//   });
// }

// export async function addBook(newBook: Book): Promise<Book> {
//   const authorId = newBook.author[0].id; // ใช้ author_id ของ author คนแรก

//   const book = await prisma.book.create({
//     data: {
//       title: newBook.title,
//       isbn: newBook.isbn,
//       category: newBook.category,
//       author_id: authorId,
//     },
//     include: {
//       author: true, // ดึงข้อมูล author ที่เกี่ยวข้อง
//     },
//   });

//   return {
//     ...book,
//     author: [book.author], // แปลง author เป็นอาร์เรย์
//   };
// }