const express = require("express");
const Book = require("../modals/Book");

const router = express.Router();

router.get("/", (req, res) => {
  res.send("hellllooooo");
});

// add a new book

router.post("/create-new-book", async (req, res) => {
  try {
    const { name, desc, auther, price } = req.body;
    console.log("---", name, desc, auther, price);
    if (!name || !desc || !auther || !price) {
      return res.send({
        response: "pls fill all the basic details to create a new book",
      });
    }
    const newBook = new Book({ name, desc, auther, price });
    await newBook.save();
    return res.send({ response: true, newBook });
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
    const { name, desc, auther, price } = req.body;
    if (!name || !desc || !auther || !price) {
      return res.send({
        response: "pls fill all the basic details to update a book",
      });
    }
    const updatedBook = await Book.findByIdAndUpdate(
      id,
      { name, desc, auther, price },
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

module.exports = router;
