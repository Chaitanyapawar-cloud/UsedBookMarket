'use client';
import { useState, useEffect } from 'react';
import { initialBookForm } from '../../../models/Books';
import { useRouter } from 'next/navigation';

export default function SellerDashboard() {
  const [form, setForm] = useState(initialBookForm);
    const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      window.location.href = '/login';
    }
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    const res = await fetch('/api/books', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify(form)
    });
   
     if (res.ok) {
       alert('Book submitted successfully');
      setTimeout(() => {
        router.push('/books'); // ✅ Navigate to list page
      }, 1000); // Optional delay to show success message briefly
    } else {
       alert('Error submitting');
    }
  };

  const formStyle = {
    maxWidth: '640px',
    margin: '40px auto',
    backgroundColor: 'white',
    padding: '24px',
    borderRadius: '12px',
    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
     textAlign: 'center'
  };

  const inputStyle = {
    width: '88%',
    padding: '10px',
    margin: '0 auto 16px auto',
    border: '1px solid #ccc',
    borderRadius: '4px',
    fontSize: '16px',
    display: 'block'
  };

  const buttonStyle = {
    backgroundColor: '#2563eb',
    color: 'white',
    padding: '10px 20px',
    borderRadius: '4px',
    fontSize: '16px',
    border: 'none',
    cursor: 'pointer',
    display: 'block',          
    margin: '0 auto'
  };

  const headingStyle = {
    fontSize: '20px',
    fontWeight: '600',
    marginBottom: '20px',
  };

  return (
    <form onSubmit={handleSubmit} style={formStyle}>
      <h2 style={headingStyle}>Submit Book Details</h2>
      {Object.keys(initialBookForm).map((field) => (
        <input
          key={field}
          name={field}
          placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
          onChange={handleChange}
          required
          type={field === 'price'|| field ==='phoneNumber' || field === 'publicationYear' ? 'number' : 'text'}
          style={inputStyle}
        />
      ))}
      <button type="submit" style={buttonStyle}>Submit</button>
    </form>
  );
}
