const express = require("express");
const Book = require("../modals/Book");
const Author = require("../modals/Author");

const router = express.Router();

router.get("/", (req, res) => {
  res.send("hellllooooo");
});

// add a new book

router.post("/create-new-book", async (req, res) => {
  try {
    const { name, desc, author, price } = req.body;
    if (!name || !desc || !author || !price) {
      return res.send({
        response: "pls fill all the basic details to create a new book",
      });
    }
    // console.log("---", name, desc, author, price);
    let authorExist = await Author.findOne({ name: author });
    if (!authorExist) {
      authorExist = new Author({ name: author });
      await authorExist.save();
    }
    console.log("---", authorExist?._id);

    const newBook = new Book({ name, desc, author_id: authorExist._id, price });
    await newBook.save();
    return res.send({ response: true, newBook, authername: authorExist?.name });
  } catch (error) {
    return res.send({ response: false, error: "error in creating book !!" });
  }
});

// list of all book

router.get("/get-all-books", async (req, res) => {
  try {
    const allBook = await Book.find();
    if (allBook.length < 1) {
      return res.send({ response: false, message: "no book present !" });
    }

    return res.send({ response: true, allBook });
  } catch (error) {
    return res.send({ response: false, error: "error in finding books !!" });
  }
});

// get book by id

router.get("/getBook/:id", async (req, res) => {
  try {
    const { id } = req.params;
    if (!id) {
      return res.send({
        response: "pls provide the id book !",
      });
    }
    const book = await Book.findById(id);

    if (!book) {
      return res.send({ response: false, message: "book not present !" });
    }
    return res.send({ response: true, book });
  } catch (error) {
    return res.send({ response: false, error: "error in getting book !!" });
  }
});

// update book by id

router.put("/updateBook/:id", async (req, res) => {
  try {
    const { id } = req.params;
    if (!id) {
      return res.send({
        response: "pls provide the book id !",
      });
    }
    const { name, desc, author, price } = req.body;
    if (!name || !desc || !author || !price) {
      return res.send({
        response: "pls fill all the basic details to update a book",
      });
    }
    const updatedBook = await Book.findByIdAndUpdate(
      id,
      { name, desc, author, price },
      { new: true }
    );

    if (!updatedBook) {
      return res.send({ response: false, message: "book not present !" });
    }
    return res.send({ response: true, message: "book updated", updatedBook });
  } catch (error) {
    return res.send({ response: false, error: "error in updating book !!" });
  }
});

// get all the books by auther

router.get("/getBooks/:authorName", async (req, res) => {
  try {
    const { authorName } = req.params;
    console.log("req.params::", req.params);

    if (!authorName) {
      return res.send({
        response: "pls provide the name of authror !",
      });
    }
    console.log("authorName::", authorName);

    let authorExist = await Author.findOne({ name: authorName });
    if (!authorExist) {
      return res.send({ response: false, message: "Author Not found !" });
    }
    const book = await Book.find({ author_id: authorExist?._id })
      .lean()
      .populate("author_id", "name");

    if (!book) {
      return res.send({
        response: false,
        message: "book not present of this author!",
      });
    }
    return res.send({ response: true, book });
  } catch (error) {
    return res.send({ response: false, error: "error in getting book !!" });
  }
});

module.exports = router;
