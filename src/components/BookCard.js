export default function BookCard({ book }) {
  return (
    <li
      style={{
        border: "1px solid #ccc",
        borderRadius: "8px",
        padding: "1rem",
        marginBottom: "1rem",
        background: "#f9f9f9",
      }}
    >
      <h3 style={{ margin: 0 }}>{book.bookName}</h3>
      <p style={{ margin: "0.5rem 0" }}>
        <strong>Seller:</strong> {book.email}
      </p>
      <p style={{ margin: "0.5rem 0" }}>
        <strong>Price:</strong> ₹{book.price}
      </p>
      <p style={{ margin: "0.5rem 0" }}>
        <strong>Location:</strong> {book.location}
      </p>
    </li>
  );
}
