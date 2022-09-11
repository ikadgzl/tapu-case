import { NextPage } from 'next';
import Head from 'next/head';
import styled from 'styled-components';
import List from '../componets/Listings/List';
import { useCartContext } from '../store/cart/context';
import { formatPrice } from '../utils/formatPrice';

const StyledListings = styled.div`
  padding: 48px 24px;

  h2 {
    margin-top: 40px;
  }

  & > div {
    margin-top: 16px;

    & > p {
      margin-bottom: 16px;
    }
  }
`;

const Listings: NextPage = () => {
  const { items } = useCartContext();

  const total = items.reduce((acc, item) => acc + item.price, 0);
  const taxesAndShipment = total * 0.1 + total * 0.025;

  return (
    <StyledListings>
      <Head>
        <title>Tapu Listings</title>
        <meta name='description' content='Listings' />
        <link rel='icon' href='/favicon.ico' />
      </Head>

      <List />
      <h2>Total price: </h2>

      <div>
        <p>Total: {formatPrice(total)} TL</p>
        <p>Taxes + Shipment Fee: {formatPrice(taxesAndShipment)} TL</p>
        <h3>Final Total: {formatPrice(total + taxesAndShipment)} TL</h3>
      </div>
    </StyledListings>
  );
};

export default Listings;
