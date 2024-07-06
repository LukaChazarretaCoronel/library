import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const BookUpdate = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [book, setBook] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    total_pages: '',
    pages_read: '',
    date_start: '',
    date_finish: ''
  });

  useEffect(() => {
    fetch(`http://localhost:8000/books/${id}`, {
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
        setBook(data);
        setFormData({
          title: data.title,
          total_pages: data.total_pages,
          pages_read: data.pages_read,
          date_start: data.date_start,
          date_finish: data.date_finish
        });
        setLoading(false);
      })
      .catch(error => {
        console.error('Fetch error:', error);
        setError(error.message);
        setLoading(false);
      });
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    fetch(`http://localhost:8000/books/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(formData)
    })
      .then(response => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      })
      .then(data => {
        setBook(data);
        alert('Book updated successfully');
      })
      .catch(error => {
        console.error('Fetch error:', error);
        setError(error.message);
      });
  };
  const handleFinishBook = () => {
    fetch(`http://localhost:8000/books/finish/${id}`, { 
      method: 'POST',
      headers:{
        "Content-Type":"application/json"
      }
    })
    .then(response => { 
      if (!response.ok){
        throw new Error(`HTTP error! Status: ${response.status}`)
      }
      return response.json()
     })
     .then(data => {
      alert('Libro movido a la tabla BookRead');
      navigate('/'); // Redirigir a la página principal o a otra página apropiada
    })
    .catch(error => {
    console.error('Fetch error:', error);
    setError(error.message);
    });
  };
  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      <h1>{book.title}</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Title:</label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Total Pages:</label>
          <input
            type="number"
            name="total_pages"
            value={formData.total_pages}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Pages Read:</label>
          <input
            type="number"
            name="pages_read"
            value={formData.pages_read}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Start Date:</label>
          <input
            type="datetime-local"
            name="date_start"
            value={formData.date_start}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Finish Date:</label>
          <input
            type="datetime-local"
            name="date_finish"
            value={formData.date_finish}
            onChange={handleChange}
          />
        </div>
        <button type="submit">Update Book</button>
      </form>
      <button onClick={handleFinishBook}>Book Finished </button>
    </div>
  );
};

export default BookUpdate;