const mongoose = require("mongoose")

dotenv.config()

const mongoUri = process.env.MONGO_URI

mongoose.set("strictQuery" , true)
mongoose
    .connect(mongoUri,{useNewUrlParser: true})
    .then(() => console.log("DB conectada"))
    .catch(err => console.log("ERROR: " + err))