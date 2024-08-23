const express = require("express")
const sqlite3 = require("sqlite3")
const path = require("path")
const {open} = require("sqlite")
const bodyParser = require("body-parser")
const cors = require("cors")


const app = express()

app.use(express.json())

app.use(cors())


const blogsRouter = require("./routes/blogs")

const dbBasepath = path.join(__dirname, "zuAIDatabase.db")
console.log("databasepath :", dbBasepath)

let dataBase = null 

const initializedbAndServer = async()=> {

    try {
      dataBase =   await open({
        filename:dbBasepath, 
        driver: sqlite3.Database
    })

    await dataBase.exec(`
        CREATE TABLE IF NOT EXISTS blogs (
        id INTEGER PRIMARY KEY AUTOINCREMENT, 
        title TEXT NOT NULL, 
        content TEXT NOT NULL, 
        author TEXT NOT NULL, 
        
        created_at DEFAULT CURRENT_TIMESTAMP
        )
        `);
        console.log("already created")

        app.locals.dataBase = dataBase;
   

    app.listen(5001,()=> {
        console.log(`server is runnig on 5001`)
    })
} 
catch (error) {
    console.log(`DB Error : ${error.message}`);
    process.exit(1)
}
}

initializedbAndServer()





app.use("/posts",blogsRouter)


module.exports = app