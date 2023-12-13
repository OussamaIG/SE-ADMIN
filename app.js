const express = require("express");
const connectDB = require("./db/connect");
const studentsRouter = require("./routes/student");
const coursesRouter = require("./routes/course");
const groupsRouter = require("./routes/group")
const morgan = require("morgan");
const app = express();
require("dotenv").config();
const notFound = require("./middleware/not-found");
const errorHandlerMiddleware = require("./middleware/error-handler");

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

app.use(express.json());

app.get("/", (req, res) => {
  res.send('<h1>Store API</h1><a href="/api/v1/products">products route</a>');
});

app.get("/api/v1/test", (req, res) => {
  res.json({ msg: "test route" });
});

app.use("/api/students", studentsRouter);
app.use("/api/courses", coursesRouter);
app.use("/api/groups", groupsRouter)

app.use(notFound);
app.use(errorHandlerMiddleware);
const port = process.env.PORT || 3000;

const start = async () => {
  try {
    // connectDB;
    await connectDB(process.env.MONGO_URI);
    app.listen(port, () => console.log(`Server is listening port ${port}...`));
  } catch (error) {
    console.log(error);
  }
};

start();
