import Link from 'next/link';
import styled from 'styled-components';
import AccountIcon from './Icons/AccountIcon';
import ListIcon from './Icons/ListIcon';

const StyledNavbar = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  display: flex;
  background-color: #fafafa;
  align-items: center;
  justify-content: center;
  gap: 100px;
  padding: 12px 0;

  & > div {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 12px;
  }
`;

const Navbar = () => {
  return (
    <StyledNavbar>
      <Link href='/listings'>
        <div>
          <ListIcon />
          <p>List</p>
        </div>
      </Link>

      <Link href='/'>
        <div>
          <AccountIcon />
          <p>Account</p>
        </div>
      </Link>
    </StyledNavbar>
  );
};

export default Navbar;
