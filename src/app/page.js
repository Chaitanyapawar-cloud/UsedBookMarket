import LinkButton from '../components/LinkButton';

export default function HomePage() {
  return (

    <main>
   
      <div style={{ display: 'flex', gap: '20px', justifyContent: 'center',padding: '70px 10px',flexWrap: 'wrap'}}>
         <LinkButton href="/books">Buyer: Buy Books</LinkButton>
      
        <LinkButton href="/login">Seller: Sell Books</LinkButton>
      </div>

       <div
        style={{
          display: 'flex',
          gap: '15px',
          justifyContent: 'center',
          padding: '5px 10px',
          flexWrap: 'wrap'
        }}
      >
        <img
          src="/images/freepik__the-style-is-modern-and-it-is-a-detailed-illustrat__91791.png"
          alt="Buy Books"
          style={{
            width: '300px',
            height: '300px',
            objectFit: 'fill',
            borderRadius: '8px'
          }}
        />
        
      </div>
    </main>
  );
}
