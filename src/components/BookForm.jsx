import React, { useState } from 'react';

const BookForm = () => {
  const [title, setTitle] = useState('');
  const [pagesRead, setPagesRead] = useState('');
  const [totalPages, setTotalPages] = useState('');
  const [dateStart, setDateStart] = useState('');
  const [dateFinish, setDateFinish] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    setMessage('');

    if (!title || !pagesRead || !totalPages || !dateStart || !dateFinish) {
      setMessage('Please fill in all fields');
      return;
    }

    const pagesReadNum = parseInt(pagesRead, 10);
    const totalPagesNum = parseInt(totalPages, 10);

    if (isNaN(pagesReadNum) || isNaN(totalPagesNum) || pagesReadNum > totalPagesNum) {
      setMessage('Please enter valid page numbers');
      return;
    }

    try {
        const response = await fetch('http://localhost:8000/books', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            title,
            pages_read: pagesReadNum,
            total_pages: totalPagesNum,
            date_start: dateStart,
            date_finish: dateFinish
          })
      });
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }      
      setMessage('Book added successfully');
      setTitle('');
      setPagesRead('');
      setTotalPages('');
    } catch (error) {
      console.error(error);
      setMessage('Failed to add book');
    }
  };

  return (
    <div>
      <h1>Add a New Book</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="title">Title </label>
          <input
            type="text"
            id="title"
            name="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="pagesRead">Pages Read </label>
          <input
            type="number"
            id="pagesRead"
            name="pagesRead"
            value={pagesRead}
            onChange={(e) => setPagesRead(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="totalPages">Total Pages </label>
          <input
            type="number"
            id="totalPages"
            name="totalPages"
            value={totalPages}
            onChange={(e) => setTotalPages(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="dateStart">Start Date </label>
          <input
            type="date"
            id="dateStart"
            name="dateStart"
            value={dateStart}
            onChange={(e) => setDateStart(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="dateFinish">Date Finish </label>
          <input
            type="date"
            id="dateFinish"
            name="dateFinish"
            value={dateFinish}
            onChange={(e) => setDateFinish(e.target.value)}
          />
        </div>

        <button type="submit">Add Book</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
};

export default BookForm;
