"use client";
import { useEffect, useState } from "react";

export default function BooksPage() {
  const [books, setBooks] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortNewest, setSortNewest] = useState(true);

 useEffect(() => {
  const fetchBooks = async () => {
    try {
      const res = await fetch("/api/books");
      if (!res.ok) throw new Error("Failed to fetch books");
      const data = await res.json();
      setBooks(data);
      setFiltered(data);
    } catch (error) {
      console.error(error);
    }
  };

  fetchBooks();
}, []);


  useEffect(() => {
    let result = books.filter((book) =>
      book.bookName.toLowerCase().includes(searchTerm.toLowerCase())
    );

    result.sort((a, b) =>
      sortNewest
        ? new Date(b.createdAt) - new Date(a.createdAt)
        : new Date(a.createdAt) - new Date(b.createdAt)
    );

    setFiltered(result);
  }, [searchTerm, books, sortNewest]);

  return (
    <div style={{ maxWidth: "1000px", margin: "2rem auto", padding: "1rem" }}>
      <h2 style={{ fontSize: "1.5rem", marginBottom: "1rem" }}>Book Listings</h2>

      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "1rem" }}>
        <input
          type="text"
          placeholder="Search by Book Name"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={{ padding: "0.5rem", width: "300px", fontSize: "1rem" }}
        />
        <button
          onClick={() => setSortNewest(!sortNewest)}
          style={{
            padding: "0.5rem 1rem",
            backgroundColor: "#0070f3",
            color: "#fff",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
          }}
        >
          Sort: {sortNewest ? "Newest First" : "Oldest First"}
        </button>
      </div>

      <div style={{ overflowX: 'auto' }}>
      <table style={{ width: "100%", borderCollapse: "collapse", tableLayout: "auto" }}>
        <thead>
          <tr style={{ backgroundColor: "#f2f2f2" }}>
            <th style={thStyle}>Book Name</th>
            <th style={thStyle}>Price</th>
            <th style={thStyle}>Location</th>
            <th style={thStyle}>Phone Number</th>
            <th style={thStyle}>Email</th>
            <th style={thStyle}>Date</th>
          </tr>
        </thead>
        <tbody>
          {filtered.map((book) => (
            <tr key={book.id}>
              <td style={tdStyle}>{book.bookName}</td>
              <td style={tdStyle}>₹{book.price}</td>
              <td style={tdStyle}>{book.location}</td>
              <td style={tdStyle}>{book.phoneNumber}</td>
              <td style={tdStyle}>{book.email}</td>
              <td style={tdStyle}>{new Date(book.createdAt).toLocaleString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
       </div>

      {filtered.length === 0 && (
        <p style={{ marginTop: "1rem", textAlign: "center" }}>No books found.</p>
      )}
    </div>
  );
}

const thStyle = {
  padding: "0.75rem",
  borderBottom: "1px solid #ddd",
  textAlign: "left",
};

const tdStyle = {
  padding: "0.75rem",
  borderBottom: "1px solid #eee",
};
