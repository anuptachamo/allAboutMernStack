const  app = require ("express")();
const { connectDatabase } = require("./database/database");

// Database connection function
connectDatabase()

//GET API
app.get("/", (req,res)=>{
    res.json({
        status : 200,
        message : "Success"
    })
})






app.listen(3000, ()=>{
    console.log("Node js project started at port 3000")
})