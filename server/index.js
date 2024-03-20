import express from "express";
import mysql from "mysql";
import cors from "cors";
const app = express();
app.use(express.json());
app.use(cors());

app.listen(3366,()=>{
  console.log("Running")
})

const db = mysql.createConnection({
  host: "127.0.0.1",
  port: 3306,
  user: "root",
  password: "Lahore@12345Haris",
  database: "test",
   dateStrings:'date'
});
app.get('/', (req, res) => {
  const sql = "SELECT * FROM book";
  db.query(sql, (err, data) => {
    console.log('DB error: ', err);
    if (err) {
      return res.json({ Error: "Error" });
    }
    return res.json(data);
  });
});
app.post('/create', (req, res) => {
    const sql = "INSERT INTO book(publisher,name,date) VALUES (?)";
    const values=[
        req.body.publisher,
        req.body.name,
        req.body.date
    ]
    db.query(sql,[values], (err, data) => {
      if (err) {
        return res.json({ Error: "Error" });
      }
      return res.json(data)
    });
  });
  app.put('/update/:id', (req, res) => {
    const sql = "UPDATE book SET publisher=?, name=?, date=? WHERE id=?";
    const values = [
      req.body.publisher,
      req.body.name,
      req.body.date,
      req.params.id 
    ];
    db.query(sql, values, (err, data) => {
      if (err) {
        return res.json({ Error: "Error" });
      }
      return res.json(data);
    });
  });
  
  app.delete('/delete/:id', (req, res) => {
    const sql = "delete from book where id=?";
  
    const id=req.params.id;
    db.query(sql,[id], (err, data) => {
      if (err) {
        return res.json({ Error: "Error" });
      }
      return res.json(data)
    });
  });
  app.get('/getrecord/:id',(req,res)=>{
    const id=req.params.id;
    const sql="select * from book where id=?"
    db.query(sql,[id], (err, data) => {
        if (err) {
          return res.json({ Error: "Error" });
        }
        return res.json(data)
      });
  })
// app.listen(3366, () => {
//   console.log("Running");
// });
