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
          flexDirection: 'column',
          gap: '30px',
          alignItems: 'center',
          padding: '5px 10px'
        }}
      >
         <img
          src="images/White Blue Simple Be Good Phone Wallpaper.png"
          alt="Buy Books"
          style={{
            width: '300px',
            height: '500px',
            objectFit: 'fill',
            borderRadius: '8px'
          }}
        />
        <img
          src="images/Life Savers.png"
          alt="Buy Books"
          style={{
            width: '300px',
            height: '300px',
            objectFit: 'fill',
            borderRadius: '8px'
          }}
        />
           <img
          src="images/freepik__the-style-is-modern-and-it-is-a-detailed-illustrat__91789.png"
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
