const  express = require ("express")
const app = express();
const { connectDatabase } = require("./database/database");
const Students = require("./model/studentModel");

//parsing FormData (form bata aako data laii parse gareko)
app.use(express.json());
app.use(express.urlencoded({extended: true}));


// Database connection function
connectDatabase()

//GET API
app.get("/", (req,res)=>{
    res.json({
        status : 200,
        message : "Success"
    })
})


// Create students API
app.post("/addStudent", async(req, res)=>{
    
    const fullname = req.body.fullname
    const address = req.body.address
    const grade = req.body.grade
    const rollno = req.body.rollno
    const age = req.body.age
    const contactno = req.body.contactno

    //*Alternative (object destructuring)
    // const {fullname, address, grade, rollno, age, contactno} = req.body

    //Insert to database logic goes here
    await Students.create({  //Students is table name
        fullname : fullname,
        address: address,
        grade : grade,
        rollno : rollno,
        age : age,
        contactno : contactno
        })

    res.json({
        status : 201,
        message : "Students details add successfully"
    })

    /* ?Alternative
    *code no. 46 to 49 same to this 
    res.status(200).json({
        message : "Students details add successfully"
    })*/
})

// GET API => All Students Details
app.get("/AllStudentsDetails", async (req, res)=>{

    // fetching/reading all students details from studentModel
    const StudentsDetails = await Students.find()  //find le array vitra ko data dinchha (insert vako data sabaii show gar vaneko)

    //check if AllstudentsDetails contains data vor not
    if (Students. length == 0){  
        res.json({
            status : 404,
            message : "Nothing to show"
             
        }) //yo condition le Students table ma kei data vayena vaney "Nothing to show" dekhau vaneko cha
      }else{
        res.json({
            status : 202,
            message : "Students Details fetched successfully",
            data : StudentsDetails    //line no. 27 bata Studentsdetails object laii call gareko 
        }) //yo condition le Students table ma data xa vaney "Students Details fetched successfully" dekhau vaneko cha
    }
}) 


// GET API => Single student details
app.get ("/AllStudentsdetails/:id", async(req, res)=>{
    const id = req.params.id //req.params.id le single data dekhaune kaam garxa
    //const {id} = req.params  --Alternative of line no. 83

    const singleStudentDetails = await Students.find({_id :id})
    
    //check if AllstudentsDetails contains data or not
    if (singleStudentDetails. length == 0){  
        res.json({
            status : 404,
            message : "Wrong id"
             
        }) //yo condition le Students table ma kei data vayena vaney "Wrong id" dekhau vaneko cha
      }else{
        res.json({
            status : 200,
            message : "Single data fetch successfully",
            data : singleStudentDetails
        })
        
    }

    /*
    // *Alternative (same meaning as in line no. 86)
    const singleStudentDetails = await Students.findById(id)
        if(singleStudentDetails){
            res.status(200).json({
                message : "Single student data fetched successfully",
                data : singleStudentDetails
            })
        }else{
            res.status(404).json({
                message : "No student data found"
            })
        }
    */
}) 

// Update students API
app.patch("/AllStudentsdetails/:id", async (req, res)=>{
    const id = req.params.id

    const fullname = req.body.fullname
    const address = req.body.address
    const grade = req.body.grade
    const rollno = req.body.rollno
    const age = req.body.age
    const contactno = req.body.contactno

    //*Alternative (object destructuring)
    // const {fullname, address, grade, rollno, age, contactno} = req.body

    await Students.findByIdAndUpdate( id,{
        fullname : fullname,
        address: address,
        grade : grade,
        rollno : rollno,
        age : age,
        contactno : contactno
    })

    res.status(200).json({
        message : "Students details Updated Successfully"
    })

})

// DELETE API
app.delete("/AllStudentsdetails/:id", async (req, res)=>{
    const id = req.params.id

    await Students.findByIdAndDelete(id)

    res.status(200).json({
        message : "Students details deleted Successfully"
    })
})




app.listen(3000, ()=>{
    console.log("Node js project started at port 3000")
})