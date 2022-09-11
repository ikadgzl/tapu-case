import Image from 'next/image';
import { useState } from 'react';
import styled from 'styled-components';
import { CartItem, useCartContext } from '../../store/cart/context';
import AddIcon from '../Icons/AddIcon';
import LocationIcon from '../Icons/LocationIcon';
import RemoveIcon from '../Icons/RemoveIcon';
import StarIcon from '../Icons/StarIcon';

type ListItemProps = {
  item: CartItem;
};

const StyledListItem = styled.div`
  display: flex;
  padding: 16px 0;
  border-bottom: 1px solid ${({ theme }) => theme.colors.gray10};

  & > div:first-child {
    border-radius: ${({ theme }) => theme.borderRadius};
    overflow: hidden;
    height: 72px;
    background: linear-gradient(
      180deg,
      rgba(0, 0, 0, 0) 40%,
      rgba(0, 0, 0, 0.8) 80%
    );
    box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.25);
    & img {
      z-index: -1;
    }
  }

  p {
    font-size: 12px;
  }
`;

const StyledListContent = styled.div`
  margin-left: 16px;
  flex: 1;

  h4 {
    color: ${({ theme }) => theme.colors.black100};
    font-weight: 600;
  }

  & > p {
    margin-top: 8px;
  }

  & > p:not(:last-child) {
    color: ${({ theme }) => theme.colors.gray100};
  }
`;

const StyledListIconContainer = styled.div`
  display: flex;
  align-items: center;
  margin-top: 8px;

  & > div {
    display: flex;
    align-items: center;
    margin-right: 24px;

    p {
      margin-left: 4px;
      color: ${({ theme }) => theme.colors.black100};
    }
  }
`;

const StyledAction = styled.div<{ isAdded: boolean }>`
  align-self: flex-end;
  display: flex;
  align-items: center;
  gap: 4px;

  p {
    color: ${({ theme, isAdded }) =>
      isAdded ? theme.colors.error : theme.colors.blue100};
    font-weight: 700;
    text-transform: uppercase;
  }
`;

const ListItem = ({ item }: ListItemProps) => {
  const { items, actions } = useCartContext();
  // TODO: put an isAdded flag for each item in the cart instead of for looping for every item, this is not efficient
  const [isAdded, setIsAdded] = useState(!!items.find((i) => i.id === item.id));

  const handleCartAction = () => {
    if (isAdded) {
      actions.remove(item.id);
    } else {
      actions.add(item);
    }

    setIsAdded(!isAdded);
  };

  console.log(items);

  return (
    <StyledListItem>
      <div>
        <Image
          src={item.img}
          alt={item.title}
          width={72}
          height={72}
          objectFit='cover'
        />
      </div>

      <StyledListContent>
        <h4>{item.title}</h4>
        <p>{item.description}</p>

        <StyledListIconContainer>
          <div>
            <StarIcon />
            <p>{item.rate}</p>
          </div>

          <div>
            <LocationIcon />
            <p>{item.distance} km</p>
          </div>
        </StyledListIconContainer>

        <p>Fiyat: 20.000 TL</p>
      </StyledListContent>

      <StyledAction isAdded={isAdded} onClick={handleCartAction}>
        {isAdded ? <Remove /> : <Add />}
      </StyledAction>
    </StyledListItem>
  );
};

export default ListItem;

const Remove = () => {
  return (
    <>
      <RemoveIcon />
      <p>Remove </p>
    </>
  );
};

const Add = () => {
  return (
    <>
      <AddIcon />
      <p>Add </p>
    </>
  );
};
