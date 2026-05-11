import { Router } from "express";
import { Book } from "../models/book/Book.js";
import { verifyToken } from "../middleware/auth.js";

const router = Router();

router.get("/books", async (req, res) => {
  const books = await Book.findAll();
  res.json(books);
});

router.get(`/books/:id`, async (req, res) => {
  const { id } = req.params;
  const book = await Book.findOne({
    where: {
      id,
    },
  });
  if(!book)
    return res.status(404).send({ message: "Book not found"})
  res.json(book);
});

router.post("/books", verifyToken,  async (req, res) => {
  const { title, author, rating, pageCount, summary, imageUrl, available } =
    req.body;

if(!title || !author)
    return res.status(400).send({ message: "Title and author are required"})

  const newBook = await Book.create({
    title,
    author,
    rating,
    pageCount,
    summary,
    imageUrl,
    available,
  });
  res.send(newBook?.id);
});

router.put("/books/:id", async (req, res) => {
  const { id } = req.params;
  const { title, author, rating, pageCount, summary, imageUrl, available } =
    req.body;

if(!title || !author)
    return res.status(400).send({ message: "Title and author are required"})

  const book = await Book.findByPk(id);

  await book.update({
    title,
    author,
    rating,
    pageCount,
    summary,
    imageUrl,
    available,
  });

  await book.save();

  res.json(book);
});

router.delete("/books/:id", verifyToken, async (req, res) => {
  const { id } = req.params;
  const book = await Book.findByPk(id);

  await book.destroy();

  res.send(`Book with ID:${id} deleted...`);
});

export default router;
