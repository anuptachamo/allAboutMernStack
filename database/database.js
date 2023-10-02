const mongoose = require ("mongoose");
exports.connectDatabase = async() =>{

    //connecting to database
    await mongoose.connect("mongodb+srv://anuptachamo:mongo@cluster0.bt5xt0j.mongodb.net/?retryWrites=true&w=majority")
        console.log("Database connected successfully")
    /*.then(() =>{
    console.log("Database connected successfully")   //
})*/
}