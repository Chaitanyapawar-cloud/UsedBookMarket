"use client";
import { useEffect, useState } from "react";

export default function BooksPage() {
  const [books, setBooks] = useState([]);
  const [sortNewest, setSortNewest] = useState(true);
  const [selectedBook, setSelectedBook] = useState(null);
  const [page, setPage] = useState(1);
  const limit = 10;
  const [totalPages, setTotalPages] = useState(1);
  const sortOrder = sortNewest ? "desc" : "asc";
  const [searchTerm, setSearchTerm] = useState("");
  const [currentSearch, setCurrentSearch] = useState("");
  const [loading, setLoading] = useState(false);


  const fetchBooks = async (pageNum, limitNum, search, sort) => {
    try {
      setLoading(true); // show loader
      const res = await fetch(
        `/api/books?page=${pageNum}&limit=${limitNum}&search=${encodeURIComponent(search)}&sortOrder=${sort}`
      );
      const data = await res.json();
      setBooks(data.books);
      setTotalPages(data.totalPages);
    } catch (err) {
      console.error("Error fetching books:", err);
    } finally {
      setLoading(false); // hide loader
    }
  };



  useEffect(() => {
    fetchBooks(page, limit, currentSearch, sortOrder);
  }, [page, sortOrder, currentSearch]);


  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      setPage(1);
      setCurrentSearch(searchTerm.trim());
    }
  };

  return (
    <div style={{ maxWidth: "1000px", margin: "2rem auto", padding: "1rem" }}>
      <h2 style={{ fontSize: "1.5rem", marginBottom: "1rem" }}>Book Listings</h2>

      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "1rem", gap: "7px", flexWrap: "wrap", marginTop: "2rem" }}>
        <input
          type="text"
          placeholder="Search by Book Name"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          onKeyDown={handleKeyDown}
          style={{ padding: "0.5rem", flex: "1 1 250px", fontSize: "1rem", minWidth: "200px", maxWidth: "100%" }}
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
            flex: "0 0 auto"
          }}
        >
          Sort: {sortNewest ? "Newest First" : "Oldest First"}
        </button>
      </div>

      {/* Desktop Table View */}
      <div className="desktop-table">
        {loading ? (
          <div style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '100px'
          }}>
            <div className="loader"></div>
            <span style={{ marginLeft: '10px' }}>Loading books...</span>
          </div>
        ) : (
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead>
              <tr style={{ backgroundColor: "#f2f2f2" }}>
                <th style={thStyle}>Book Name</th>
                <th style={thStyle}>Publication</th>
                <th style={thStyle}>Price</th>
                <th style={thStyle}>State</th>
                <th style={thStyle}>Address</th>
                <th style={thStyle}>Phone Number</th>
                <th style={thStyle}>Email</th>
                <th style={thStyle}>Date</th>
              </tr>
            </thead>
            <tbody>
              {books.map((book) => (
                <tr key={book.id}>
                  <td style={tdStyle}>{book.bookName}</td>
                  <td style={tdStyle}>{book.publication}</td>
                  <td style={tdStyle}>₹{book.price}</td>
                  <td style={tdStyle}>{book.state}</td>
                  <td style={tdStyle}>{book.address}</td>
                  <td style={tdStyle}>{book.phoneNumber}</td>
                  <td style={tdStyle}>{book.email}</td>
                  <td style={tdStyle}>{new Date(book.createdAt).toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>


      {/* Mobile Card View */}
      <div className="mobile-cards">
          {loading ? (
          <div style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '100px'
          }}>
            <div className="loader"></div>
            <span style={{ marginLeft: '10px' }}>Loading books...</span>
          </div>
        ) : (
          <div>
          {books.map((book) => (
              <div key={book.bookName} style={cardStyle} onClick={() => setSelectedBook(book)}>
                <p><strong>📚 {book.bookName}</strong></p>
                <p>💰 ₹{book.price}</p>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span>📍 {book.state}</span>
                  <span style={{ fontStyle: 'italic', fontSize: '0.9rem', color: '#0070f3' }}>click for more info</span>
                </div>
              </div>
            ))
          }
          </div>
        )}
        {selectedBook && (
          <div style={modalOverlayStyle} onClick={() => setSelectedBook(null)}>
            <div style={modalContentStyle} onClick={(e) => e.stopPropagation()}>
              <h3>{selectedBook.bookName}</h3>
              <p><strong>Publication:</strong> ₹{selectedBook.publication}</p>
              <p><strong>Price:</strong> ₹{selectedBook.price}</p>
              <p><strong>State:</strong> {selectedBook.state}</p>
              <p><strong>Address:</strong> {selectedBook.address}</p>
              <p><strong>Phone:</strong> {selectedBook.phoneNumber}</p>
              <p><strong>Email:</strong> {selectedBook.email}</p>
              <p><strong>Date:</strong> {new Date(selectedBook.createdAt).toLocaleString()}</p>
              <button onClick={() => setSelectedBook(null)} style={closeBtnStyle}>Close</button>
            </div>
          </div>
        )}
    
      </div>

      {books.length === 0 && (
        <p style={{ marginTop: "1rem", textAlign: "center" }}>No books found.</p>
      )}

      <div style={{ display: "flex", justifyContent: "center", gap: "10px", marginTop: "1rem" }}>
        <button onClick={() => setPage((p) => Math.max(p - 1, 1))} disabled={page === 1}>Previous</button>
        <span>Page {page}</span>
        <button onClick={() => setPage((p) => p + 1)} disabled={page >= totalPages}>Next</button>
      </div>

      

      <style jsx>{`
        .desktop-table {
          display: block;
        }

        .mobile-cards {
          display: none;
        }

        @media (max-width: 768px) {
          .desktop-table {
            display: none;
          }

          .mobile-cards {
            display: block;
          }
        }
      `}</style>
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

const cardStyle = {
  border: "1px solid #ccc",
  borderRadius: "10px",
  padding: "1rem",
  marginBottom: "1rem",
  boxShadow: "0 2px 5px rgba(0,0,0,0.1)",
  fontSize: "0.95rem",
};

const modalOverlayStyle = {
  position: "fixed",
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  backgroundColor: "rgba(0,0,0,0.5)",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  zIndex: 1000,
};

const modalContentStyle = {
  backgroundColor: "#fff",
  padding: "2rem",
  borderRadius: "10px",
  maxWidth: "90%",
  boxShadow: "0 5px 15px rgba(0,0,0,0.3)",
};

const closeBtnStyle = {
  marginTop: "1rem",
  backgroundColor: "#0070f3",
  color: "#fff",
  border: "none",
  padding: "0.5rem 1rem",
  borderRadius: "5px",
  cursor: "pointer",
};

