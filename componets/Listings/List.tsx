import { CartItem } from '../../store/cart/context';
import ListItem from './ListItem';

const ITEMS: CartItem[] = [
  {
    id: 1,
    title: 'Villa Bosphorus',
    description: 'Lorem İpsum Sit Dolor Met',
    rate: 5,
    distance: 3.7,
    price: 20_000,
    img: 'https://picsum.photos/id/81/200/',
  },
  {
    id: 2,
    title: 'Villa Bosphorus',
    description: 'Lorem İpsum Sit Dolor Met',
    rate: 5,
    distance: 3.7,
    price: 20_000,
    img: 'https://picsum.photos/id/212/200/',
  },
  {
    id: 3,
    title: 'Villa Bosphorus',
    description: 'Lorem İpsum Sit Dolor Met',
    rate: 5,
    distance: 3.7,
    price: 20_000,
    img: 'https://picsum.photos/id/124/200/',
  },
];

const List = () => {
  return (
    <div>
      {ITEMS.map((item: CartItem) => (
        <ListItem key={item.id} item={item} />
      ))}
    </div>
  );
};

export default List;
