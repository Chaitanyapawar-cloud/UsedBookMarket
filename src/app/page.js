import LinkButton from '../components/LinkButton';

export default function HomePage() {
  return (

    <main>
   
      <div style={{ display: 'flex', gap: '10px', justifyContent: 'center',padding: '70px 10px' }}>
         <LinkButton href="/books">Buyer: Buy Books</LinkButton>
      
        <LinkButton href="/login">Seller: Sell Books</LinkButton>
      </div>
    </main>
  );
}
