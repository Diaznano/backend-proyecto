const express = require("express");
const cors = require("cors")
const dotenv = require("dotenv")

dotenv.config()

require("./database/database")

const routes = require("./routes/routes")

const app = express();

app.use(cors())
app.use(express.json())

app.use("/api",routes)


app.get("/", (req: any, res: any) => {
  res.send("Hello, World!");
});

app.listen(process.env.PORT, () => {
  console.log(`Server is running on port` + process.env.PORT);
});
