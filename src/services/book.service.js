import { Book } from "../models/book/Book.js";

export const getAllBooks = async (req, res) => {
  const books = await Book.findAll();
  res.json(books);
}

export const getOneBook =  async (req, res) => {
  const { id } = req.params;
  const book = await Book.findOne({
    where: {
      id,
    },
  });
  if(!book)
    return res.status(404).send({ message: "Book not found"})
  res.json(book);
}

export const createBook = async (req, res) => {
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
}

export const updateBook = async (req, res) => {
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
}

export const deleteBook = async (req, res) => {
  const { id } = req.params;
  const book = await Book.findByPk(id);

  await book.destroy();

  res.send(`Book with ID:${id} deleted...`);
}