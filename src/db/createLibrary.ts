import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();


export async function createAuthors() { 
  const authors = [
    { 
      first_name : "Jame", 
      last_name : 'Clear',
      affiliation : 'Self-Improvement Publications'
    },
    { 
      first_name : "Robert", 
      last_name : 'C. Martin',
      affiliation : 'Software Engineering Press'
    },
    { 
      first_name : "Yuval Noah", 
      last_name : 'Harari',
      affiliation : 'History and Anthropology Research'
    }
  ]

  for (const author of authors) {
      await prisma.author.create({
        data: {
          first_name: author.first_name,
          last_name: author.last_name,
          affiliation: author.affiliation,
        }
      });
  }
  console.log("Database has been initialized with authors.");
}
export async function createBooks() { 
  const books = [
    {
      title : "Atomic Habits", 
      isbn : "101", 
      category : "Self-Improvement Publications",
      author : { connect : { id : 1 } }
    },
    {
      title : "Clean Code", 
      isbn : "102", 
      category : "Technology",
      author : { connect : { id : 2 } }
    },
    {
      title : "Sapiens: A Brief History of Humankind", 
      isbn : "103", 
      category : "History",
      author : { connect : { id : 3 } }
    },
    {
      title : "The Pragmatic Programmer", 
      isbn : "104", 
      category : "Technology",
      author : { connect : { id : 2 } }
    },
    {
      title : "Deep Work", 
      isbn : "105", 
      category : "Productivity",
      author : { connect : { id : 1 } }
    },
  ]

  for (const book of books) {
      await prisma.book.create({
        data: {
          title: book.title,
          isbn: book.isbn,
          category: book.category,
          author : book.author
        }
      });
  }
  console.log("Database has been initialized with books.");
}

export async function createMembers() { 
  const members = [
    { 
      first_name : "Alice", 
      last_name : 'Brown',
      phone_number : '123-456-7890'
    },
    { 
      first_name : "Bob", 
      last_name : 'Smith',
      phone_number : '234-567-8901'
    },
    { 
      first_name : "Thai .C", 
      last_name : 'BUS',
      phone_number : '345-678-9012'
    }
  ]
  
  for (const member of members) {
      await prisma.member.create({
        data: {
          first_name: member.first_name,
          last_name: member.last_name,
          phone_number: member.phone_number
        }
      });
  }
  console.log("Database has been initialized with members.");
}

export async function createborrowingHistories() { 
  const borrowingHistories = [
    { 
      member : { connect : { id : 1 } },
      book : { connect : { id : 1 } }, 
      borrow_date : '2025-03-05',
      return_due_date : '2025-03-19'
    },
    { 
      member : { connect : { id : 2 } },
      book : { connect : { id : 2 } }, 
      borrow_date : '2025-03-06',
      return_due_date : '2025-03-20'
    }
  ]

  for (const borrowingHistory of borrowingHistories) {
    await prisma.borrowingHistory.create({
      data: {
        member: borrowingHistory.member,
        book: borrowingHistory.book,
        borrow_date: borrowingHistory.borrow_date,
        return_due_date: borrowingHistory.return_due_date
      }
    });
  }
  console.log("Database has been initialized with borrowingHistories.");
}

export async function createborrowedBooks() { 
  const borrowedBooks = [
    { 
      borrowingHistory : { connect: { id: 1 } }, 
      actual_return_due_date : '2025-03-16'
    },
    { 
      borrowingHistory : { connect: { id: 2 } },
      actual_return_due_date : null
    }
  ]

  for (const borrowedBook of borrowedBooks) {
    await prisma.borrowedBook.create({
      data: {
        borrowingHistory: borrowedBook.borrowingHistory,
        actual_return_due_date : borrowedBook.actual_return_due_date,
      }
    });
  }
  console.log("Database has been initialized with borrowedBooks.");
}


// import { PrismaClient } from '@prisma/client';
// const prisma = new PrismaClient();


// export async function createAuthors() { 
//   const authors = [
//     { 
//       first_name : "Jame", 
//       last_name : 'Clear',
//       affiliation : 'Self-Improvement Publications'
//     },
//     { 
//       first_name : "Robert", 
//       last_name : 'C. Martin',
//       affiliation : 'Software Engineering Press'
//     },
//     { 
//       first_name : "Yuval Noah", 
//       last_name : 'Harari',
//       affiliation : 'History and Anthropology Research'
//     }
//   ]
// }
// export async function createBooks() { 
//   const books = [
//     {
//       title : "Atomic Habits", 
//       isbn : "101", 
//       catagory : "Self-Improvement Publications",
//       author : { connect : { id : 1 } }
//     },
//     {
//       title : "Clean Code", 
//       isbn : "102", 
//       catagory : "Technology",
//       author : { connect : { id : 2 } }
//     },
//     {
//       title : "Sapiens: A Brief History of Humankind", 
//       isbn : "103", 
//       catagory : "History",
//       author : { connect : { id : 3 } }
//     },
//     {
//       title : "The Pragmatic Programmer", 
//       isbn : "104", 
//       catagory : "Technology",
//       author : { connect : { id : 2 } }
//     },
//     {
//       title : "Deep Work", 
//       isbn : "105", 
//       catagory : "Productivity",
//       author : { connect : { id : 1 } }
//     },
//   ]
// }

// export async function createMembers() { 
//   const members = [
//     { 
//       first_name : "Alice", 
//       last_name : 'Brown',
//       phone_number : '123-456-7890'
//     },
//     { 
//       first_name : "Bob", 
//       last_name : 'Smith',
//       phone_number : '234-567-8901'
//     },
//     { 
//       first_name : "Thai .C", 
//       last_name : 'BUS',
//       phone_number : '345-678-9012'
//     }
//   ]
// }

// export async function createborrowingHistories() { 
//   const borrowingHistories = [
//     { 
//       member_id : { connect : { id : 1 } },
//       book_id : { connect : { id : 1 } }, 
//       borrow_date : '2025-03-05',
//       return_due_date : '2025-03-19'
//     },
//     { 
//       member_id : { connect : { id : 2 } },
//       book_id : { connect : { id : 2 } }, 
//       borrow_date : '2025-03-06',
//       return_due_date : '2025-03-20'
//     }
//   ]
// }

// export async function createborrowedBooks() { 
//   const borrowedBooks = [
//     { 
//       borrowing_id : { connect : { id : 1}},
//       actual_return_due_date : '2025-03-16'
//     },
//     { 
//       borrowing_id : { connect : { id : 2}},
//       actual_return_due_date : null
//     }
//   ]
// }


