import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const BookFinishedDetails = () => {
  const { id } = useParams();
  const [book, setBook] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch(`http://localhost:8000/books/finished/${id}`, {
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
              // Format date fields to display only the date part
      data.date_start = new Date(data.date_start).toLocaleDateString();
      data.date_finish = new Date(data.date_finish).toLocaleDateString();

      setBook(data);
      setLoading(false);
    })
    .catch(error => {
      console.error('Fetch error:', error);
      setError(error.message);
      setLoading(false);
    });
  }, [id]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <>
      <h1>{book.title}</h1>
      <p>Total Pages: {book.total_pages}</p>
      <p>Pages Read: {book.pages_read}</p>
      <p>Start Date: {book.date_start}</p>
      <p>Finish Date: {book.date_finish}</p>
    </>
  );
}

export default BookFinishedDetails;
