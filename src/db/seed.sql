INSERT INTO authors (id,first_name,last_name,affiliation) VALUES
( 1, 'James', 'Clear', 'Self-Improvement Publications'),
( 2, 'Robert', 'C. Martin', 'Software Engineering Press'),
( 3, 'Yuval Noah', 'Harari', 'History and Anthropology Research');

INSERT INTO books (id,title,isbn,category,author_id) VALUES
( 1, 'Atomic Habits', '101', 'Self-Improvement Publications', 1),
( 2, 'Clean Code', '102', 'Technology', 2),
( 3, 'Sapiens: A Brief History of Humankind', '103', 'History', 3),
( 4, 'The Pragmatic Programmer', '104', 'Technology', 2),
( 5, 'Deep Work', '105', 'Productivity', 1);

INSERT INTO members (id,first_name,last_name,phone_number) VALUES
( 1, 'Alice', 'Brown', '123-456-7890'),
( 2, 'Bob', 'Smith', '234-567-8901'),
( 3, 'Thai .C', 'BUS', '345-678-9012');

INSERT INTO borrowingHistories (id,member_id,book_id,borrow_date,return_due_date) VALUES
( 1, 1, 1, '2025-03-05', '2025-03-19'),
( 2, 2, 2, '2025-03-06', '2025-03-20');

INSERT INTO borrowedBooks (id,borrowing_id,actual_return_due_date) VALUES
( 1, 1, '2025-03-16'),
( 2, 2, null);



