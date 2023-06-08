const express = require('express');
const cors = require('cors');

const app = express();
app.use(express.json());

app.use(cors());

app.post('/verify',(req,res)=>{
    try{
    console.log("req.body",req.body)
    const code = req.body.code;
    if( code.length !=6){
        throw new Error("Invalid Code Lengtg")
    }else if(code[5]=== 7){
        throw new Error("Invalid digit 7 at the end")
    }
    res.status(200).json({
        message: "Success"
    })
    }catch(err){
        res.status(200).json({
            message : "Error",
            error : err
        })
    }

})

app.listen(3030,(err,done)=>{
    if(err){
        console.log(err,"error")
    }else{
        console.log("listening at 3030")
    }
})