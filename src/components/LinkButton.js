import Link from 'next/link';

export default function LinkButton({ href, children }) {
  return (
    <Link href={href}>
       <button
        style={{
          backgroundColor: "#28a745",
          color: "white",
          padding: "15px 30px",
          border: "none",
          borderRadius: "5px",
          cursor: "pointer",
          fontSize: "16px",
          width: "100%",
          maxWidth: "300px", // limit size on large screens
          margin: "5px" // small gap on wrap
        }}
      >
        {children}
      </button>
    </Link>
  );
}
