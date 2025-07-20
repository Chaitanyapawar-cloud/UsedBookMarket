'use client';
import '../styles/globals.css';
import { useRouter } from 'next/navigation';

export default function RootLayout({ children }) {
  const router = useRouter();

  const navigateHome = () => {
    router.push('/');
  };

  const navigateLogin = () => {
    router.push('/login');
  };
   return (
    <html lang="en">
      <body>
        <header style={{
          backgroundColor: '#f8f8f8',
          padding: '15px 25px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          borderBottom: '1px solid #ddd'
        }}>
          <h2 style={{ margin: 0, fontSize: '22px' }}>📚 Used Books Market</h2>
          <div>
            <button onClick={navigateHome} style={navButtonStyle}>Home</button>
          </div>
        </header>

        <main style={{ padding: '21px' }}>
          {children}
        </main>
      </body>
    </html>
  );
}

const navButtonStyle = {
  marginLeft: '12px',
  padding: '12px 24px',
  fontSize: '16px',
  backgroundColor: '#0070f3',
  color: 'white',
  border: 'none',
  borderRadius: '6px',
  cursor: 'pointer'
};