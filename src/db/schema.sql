-- CREATE DATABASE library;
-- USE library; 

CREATE TABLE authors (
  id INT PRIMARY KEY AUTO_INCREMENT, -- ใส่ไว้ก่อนเลยว่าเป็น AUTO_INCREMENT เพราะถ้าไม่ใส่ ไปแก้จะ database มันจะไม่ให้แก้ เพราะว่า มันเป็น FK ของตาราง borrowingHistories ด้วย เพราะถ้าเป็น FK มันจะไม่ให้แก้ 
  first_name VARCHAR(45),
  last_name VARCHAR(45), 
  affiliation VARCHAR(225)
);

CREATE TABLE books (
  id INT PRIMARY KEY AUTO_INCREMENT, 
  title VARCHAR(225),
  isbn VARCHAR(45), 
  category VARCHAR(225), 
  author_id INT,
  FOREIGN KEY (author_id) REFERENCES authors(id)
);

CREATE TABLE members (
  id INT PRIMARY KEY AUTO_INCREMENT, 
  first_name VARCHAR(45),
  last_name VARCHAR(45), 
  phone_number VARCHAR(20) 
);

CREATE TABLE borrowingHistories (
  id INT PRIMARY KEY AUTO_INCREMENT, 
  member_id INT,
  book_id INT, 
  borrow_date DATE, 
  return_due_date DATE,
  FOREIGN KEY (member_id) REFERENCES members(id),
  FOREIGN KEY (book_id) REFERENCES books(id) 
);

CREATE TABLE borrowedBooks (
  id INT PRIMARY KEY AUTO_INCREMENT, 
  borrowing_id INT, 
  actual_return_due_date DATE,
  FOREIGN KEY (borrowing_id) REFERENCES borrowingHistories(id) 
);

