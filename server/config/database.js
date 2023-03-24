const mongoose=require("mongoose")
mongoose.connect(process.env.DB_URL)

    .then(res => {
        console.log('Connect Database!');
    })
    .catch(err => {
        console.log('err', err);
    })