import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const BookFinishedList = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch('http://localhost:8000/books/finished/', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    })
    .then(response => {
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      return response.json();
    })
    .then(data => {
      setBooks(data);
      setLoading(false);
    })
    .catch(error => {
      console.error('Fetch error:', error);
      setError(error.message);
      setLoading(false);
    });
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      <h1>Book Finish</h1>
      <ul>
        {books.map(book => (
          <li key={book.id}>
            <Link to={`/books/finished/${book.id}`}>{book.title}</Link>            
          </li>
        ))}
      </ul>
    </div>
  );
};

export default BookFinishedList;

