const express = require('express');
const cors = require('cors');

const app = express();
app.use(express.json());

app.use(cors());

app.post('/verify', (req, res) => {
    try {

        console.log("req.body", req.body)
        const code = req.body.code;
        if (code.length != 6) {
            console.log("length")
            throw new Error("Invalid Code Lengtg")
        } else if (code[5] === '7') {
            console.log("seven")

            throw new Error("Invalid digit 7 at the end")
        } else if (isNaN(code)) {
            console.log("string")
            throw new Error("Invalid the Code has String")

        }
        res.status(200).json({
            message: "Success"
        })

    } catch (error) {
        console.log(error,"err")
        res.status(400).json({
            message: "Error",
            error : error.message
        })
    }

})

app.listen(3030, (err, done) => {
    if (err) {
        console.log(err, "error")
    } else {
        console.log("listening at 3030")
    }
})