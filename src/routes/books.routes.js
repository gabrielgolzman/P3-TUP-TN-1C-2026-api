import { Router } from "express";
import { Book } from "../models/book/Book.js";
import { verifyToken } from "../middleware/auth.js";
import { createBook, deleteBook, getAllBooks, getOneBook, updateBook } from "../services/book.service.js";

const router = Router();

router.get("/books",getAllBooks );

router.get(`/books/:id`, getOneBook);

router.post("/books", verifyToken, createBook );

router.put("/books/:id", verifyToken, updateBook );

router.delete("/books/:id", verifyToken, deleteBook );

export default router;
