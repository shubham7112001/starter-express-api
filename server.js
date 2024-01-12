const express = require('express');
const fs = require('fs');

const app = express();
app.use(express.json());

const filePath = './data/movies.json';
let movies = JSON.parse(fs.readFileSync(filePath));

app.post('/data/v1/datas',(req,res)=>{
  const newId = movies[movies.length-1].id + 1;

  const  newMovie = Object.assign({id:newId},req.body);

  movies.push(newMovie);

  fs.writeFile(filePath,JSON.stringify(movies),(err)=>{
    res.status(201).json({
      status:"success",
      data: {
        movie : newMovie
      }
    })
  })
  // console.log(req.body);
})


app.get('/data/v1/datas',(req,res)=>{
  res.status(200).json(
    {
      "status" :"success",
      count : movies.length,
      movies : movies
    }
  );
})

app.listen(3000,'127.0.0.1',()=>{
  console.log("Server is running");
})