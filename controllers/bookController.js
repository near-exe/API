// controllers/bookController.js (or wherever you're handling the logic)
const db = require('../firebase');

const getAllBooks = async (req, res) => {
  try {
    const booksRef = db.collection('Books');
    const snapshot = await booksRef.get();

    if (snapshot.empty) {
      return res.status(404).json({ message: 'No books found' });
    }

    const books = [];
    snapshot.forEach(doc => {
        books.push({ id: doc.id, ...doc.data() });
    });

    return res.status(200).json(books);
  } catch (error) {
    console.error('Error getting books:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};


const addBook = async (req, res) =>{
    try{
        const {title, genre,year,author,synopsis} = req.body;
        
        if(!title  || !genre || !year || !author || !synopsis )
        {
            return res.status(400).json({message:"Missing fields in the request"});
        }
        else
        {
            const book = {
                title,
                genre,
                year,
                author,
                synopsis,
                createdAt: new Date()
            }

           const bookRef = await db.collection('Books').add(book);
           res.status(201).json({ message: 'Book added', id: bookRef.id });
        }
    }
    catch(err)
    {
        console.error("Console error ", err);
        res.status(500).json({message:"Internal server error"});
    }
}

const deleteBook = async (req, res) => {
    try {
      const id = req.params.id;
      const booksRef = db.collection('Books').doc(id);
      const doc = await booksRef.get();
  
      if (!doc.exists) {
        return res.status(404).json({ message: "That entry doesn't exist" });
      }
  
      await booksRef.delete();
      res.status(200).json({ message: "Book deleted successfully" });
  
    } catch (err) {
      res.status(500).json({ message: "Internal server error" });
    }
  };

  const getBook = async (req,res) =>
  {
    try{
        const id = req.params.id;
        const booksRef = db.collection('Books').doc(id);
        const doc = await booksRef.get();
    
        if (!doc.exists) {
            return res.status(404).json({ message: "That entry doesn't exist" });
        }

        const response = doc.data();
        return res.status(200).json(response);
      }
      catch(err)
      {
        return res.status(500).json({message: "Internal server error"});
      }
  }

  const updateBook = async (req, res) => {
  try {
    const id = req.params.id;
    const updateData = req.body;

    if (!updateData || Object.keys(updateData).length === 0) {
      return res.status(400).json({ message: "No data provided to update." });
    }

    const allowedFields = ["title", "genre", "year", "author", "synopsis"];
    const filteredData = {};

    for (const key of allowedFields) {
      if (updateData[key] !== undefined && updateData[key] !== "") {
        filteredData[key] = updateData[key];
      }
    }

    if (Object.keys(filteredData).length === 0) {
      return res.status(400).json({ message: "No valid fields to update." });
    }

    const bookRef = db.collection("Books").doc(id);
    const doc = await bookRef.get();

    if (!doc.exists) {
      return res.status(404).json({ message: "Book not found." });
    }

    await bookRef.update(filteredData);
    return res.status(200).json({ message: "Book updated successfully." });

  } catch (error) {
    console.error("Error updating book:", error);
    return res.status(500).json({ message: "Internal server error." });
  }
};

  

module.exports = { getAllBooks , addBook, deleteBook, getBook, updateBook };
