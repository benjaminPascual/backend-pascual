const {Router} = require("express");
const multer = require("multer");
const path = require("path");

const router = Router();
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.resolve(__dirname+"../../../public/img"))
    },
    filename:(req, file, cb)=>{
        cb(null, file.originalname)
    }
})

const uploader = multer({storage});

router.post("/", uploader.single("file"),(req,res)=>{
    if(!req.file){
        return req.statusCode(400).json({
            status: "error",
            error: "you don't uploaded any file"
        });
    }
    res.json({
        status: "success",
        data: res.file
    })
})


module.exports = router