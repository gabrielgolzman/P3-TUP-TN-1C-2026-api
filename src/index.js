import express from "express";
import bookRoutes from "./routes/books.routes.js"
import userRoutes from "./routes/users.routes.js"
import { sequelize } from "./db.js";
import "./models/book/Book.js";
import "./models/user/User.js"

const app = express();
const port = 3000;

try {

app.use(express.json());
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "*");
    res.header("Access-Control-Allow-Methods", "GET, POST, PUT,PATCH,DELETE");
    next();
})
app.listen(port);
app.use(bookRoutes);
app.use(userRoutes);

await sequelize.sync();

console.log(`Server listening on port ${port}`)
    
} catch (error) {
    console.log("There was an error at initialization.")
}


