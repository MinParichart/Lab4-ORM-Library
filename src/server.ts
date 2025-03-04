import express, { Request, Response } from "express";
const app = express();
const port = 3010;

app.get("/", (req: Request, res: Response) => { //localhost:3010
  res.send("Hello World!");
});

app.get("/test", (req, res) => { //localhost:3010/test
  let returnObj = {
    name: "test",
    age: 20,
    address: "Thai",
  };
  res.send(returnObj);
});

app.get("/test2", (req, res) => { // localhost:3010/test2?id=5
 const id = req.query.id;
 const output = `id : ${id}`; 
 res.send(output);
})

app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`);
});
