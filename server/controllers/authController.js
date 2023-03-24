const {authModel}=require("../models/authSchema")
const nodemailer = require("nodemailer");
const jwt = require("jsonwebtoken");
const multer=require("multer")
const path=require("path")
let privateKey = process.env.PRiVET_KEY;

const storage=multer.diskStorage({
  destination:(req,file,cb)=>{
    cb(null,"Images")
  },
  filename:(req,file,cb)=>{
    cb(null,Date.now() + path.extname(file.originalname))
  }
})

const transporter = nodemailer.createTransport({
  direct: true,
  host: process.env.HOST,
  port: 465,
  auth: {
    user: process.env.USER,
    pass: process.env.PASS,
  },
  secure: true,
});

const authController = {
  getAll: (req, res) => {
    authModel
      .find({ isDeleted: false })
      .select("_id email")
      .exec((err, docs) => {
        if (!err) res.json(docs);
        else res.status(500).json(err);
      });
  },
  getUser:(res,req)=>{
    const userId=req.params.userId
    try{
      const user=authModel.findById(userId)
      res.status(200).json(user)
    }catch(error){
      res.status(500).json(error)
    }
  },
  register: async (req,res)=>{
    const {email,username,password,image}=req.body
    try{
      const user= await authModel.findOne({email:email})
      if(user){
        return res.status(500).json({
          message:"This email is already registered"
        }) 
      }else{
        const newAuth=new authModel({
          email:email,
          username:username,
          password:password,
          image:image
        })
          newAuth.save((err,doc)=>{
           if(err){
             return res.status(500).json({
               message:"There was a problem during registration"
             })
           }else{
             return res.status(201).json(doc)
           }
        })
      }
    }catch(error){
      res.status(500).json(error);
    }
  },
  login: (req, res) => {
    const {email,password}=req.body
    authModel.findOne({ email: email, password: password}, (err, doc) => {
      if (!err) {
        if (doc) {
          console.log("doc", doc);
          let confirmCode = Math.floor(Math.random() * 999999);

          doc.confirmCode = confirmCode;

          doc.save((saveErr, saveDoc) => {
            if (!saveErr) {
              res.json(saveDoc);
            } else {
              res.status(500).json(saveErr);
            }
          });

          var mailOptions = {
            from: process.env.USER,
            to: doc.email,
            subject: "Login Confirm Code",
            text: "Confirm Code: " + confirmCode,
          };

          transporter.sendMail(mailOptions, function (error, info) {
            if (error) {
              return console.log(error);
            }
          });
        } else {
          res.status(404).json({ msg: "not found" });
        }
      } else {
        res.status(500).json(err);
      }
    });
  },
  confirmCode: (req, res) => {
    let confirmCode = req.body.confirmCode;
    let webUserId = req.body.webUserId;

    authModel.findOne(
      { confirmCode: confirmCode, id: webUserId, isDeleted: false },
      (err, doc) => {
        if (!err) {
          if (doc) {
            let token = jwt.sign({ email: doc.email }, privateKey, {
              algorithm: "HS256",
              expiresIn: "5h",
            });
            res.json({ token: token });
          } else {
            res.status(404).json({ message: "not found" });
          }
        } else {
          res.status(500).json(err);
        }
      }
    );
  },
  logout:(req,res)=>{
    console.log(req.params.id)
    const id=req.params.id
    authModel.findById(id,(err,docs)=>{
        if(!err){
            docs.save()
            docs.isDeleted = true;
            res.json(docs)
        }else{
            res.status(500).json(err)
        }
    })
},
};

module.exports={
    authController
}
