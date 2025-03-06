import mysql from 'mysql2/promise';
const connection = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: 'rootpassword',
  database: 'books', // เปลี่ยนเป็นชื่อ database ที่เราสร้าง
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});
 export default connection