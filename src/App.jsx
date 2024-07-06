import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import AddBook from './pages/AddBook';
import Navbar from './components/Navbar';
import BookInfo from './pages/BookInfo';
import BookUpdate from './components/BookUpdate';
import BookDetails from './components/BookDetails';
import BookFinishedDetails from './components/BookFinishedDetails';
import BookFinishedList from './components/BookFinishedList'

const App = () => {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/add" element={<AddBook />} />
        <Route path="/update" element={<BookInfo />} />
        <Route path="/books/:id" element={<BookUpdate />} />
        <Route path="/info/books/:id" element={<BookDetails />} />
        <Route path="/books/finished/:id" element={<BookFinishedDetails />} />
        <Route path="/books/finished" element={<BookFinishedList />} />
      </Routes>
    </Router>
  );
};

export default App;
