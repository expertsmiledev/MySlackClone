const express = require("express")
const dotenv = require("dotenv").config()
const { default: mongoose } = require("mongoose")
const authRouter = require("./routes/authRouter")
const groupChatRouter=require("./routes/groupChatRouter")
const cors = require("cors")
const jwt = require("jsonwebtoken")
const app = express()
const PORT = process.env.PORT
const http = require('http').Server(app);
const io = require("socket.io")(http)
require("./config/database")
let privateKey = process.env.PRiVET_KEY;
const {chatModel}=require("./models/groupChatSchema")

app.use(cors())
app.use(express.json());
app.use(express.urlencoded())
// app.use((req, res, next) => {

//   if (req.url == '/api/auth/register' || req.url == '/api/auth/login' || req.url == '/api/auth'|| req.url == '/api/auth/confirmcode') {
//    return next();
//   }

//   let auth = req.headers.authorization?.split(' ');
//   let token = '';

//   if (auth) {
//     if (auth.length == 2) {
//       token = auth[1];
//     }
//     else {
//       res.status(401).json({ 'message': 'Access Error!' })
//     }
//   }
//   else {
//     res.status(401).json({ 'message': 'Access Error!' })
//   }



//   jwt.verify(token, privateKey, function (err, decode) {
//     if (err) {
//       res.status(401).json(err);
//     }
//     else {
//         const newToken = jwt.sign({ email: decode.email }, privateKey, {
//             expiresIn: "5h",
//           });
//           res.locals.token = newToken;
//       next()
//     }
//   })

// })

io.on("connection", (socket) => {
  socket.on("room", data => {
    socket.join(data)
  })

  socket.on("send", data => {
    console.log(data)
    socket.to(data.room).emit("groupmessage",data)
  })
})

app.use((req, res, next) => {
  if (res.locals.token) {
    res.setHeader("Authorization", `Bearer ${res.locals.token}`);
  }
  next();
});

app.get('/', function (req, res) {
  res.json("Hello WORLD");
})
app.use("/api/auth", authRouter);
app.use("/api/group",groupChatRouter)

// static Images folder
app.use("/Images",express.static("./Images"))
http.listen(PORT, () => {
  console.log(`Server is running on port:${PORT}`)
})
