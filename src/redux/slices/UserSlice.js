import {createSlice} from '@reduxjs/toolkit';
import vanilla from '../../assets/vanilla.jpg';
import strawberry from '../../assets/strawberry.png';
import strawberry1 from '../../assets/strawberry1.png';
import vanillaflavor from '../../assets/vanillaflavor.png';

const initialState = {
  name: '',
  destination: '',
  balance: 43000,
  discount: 20,
  search: '',
  location: '12BC louis Ville Estate, New Haven, Enugu',
  orderNow: {
    id: 1,
    flavor: 'Vanilla',
    price: 1790,
    image: vanilla,
    amount: 1,
    orderSize: 'small',
    favorite: false,
    cart: false,
    topping:
      'Hot Fudge, Sprinkles, Caramel, Oreos, Cookie Dough, Whipped Cream',
  },
  cartItems: [],
  favorites: [],
  homeItems: [
    {
      id: 1,
      flavor: 'Vanilla',
      price: 1700,
      smallPrice: 1700,
      mediumPrice: 2700,
      largePrice: 3700,
      image: vanilla,
      amount: 1,
      orderSize: 'small',
      favorite: false,
      cart: false,
      topping:
        'Hot Fudge, Sprinkles, Caramel, Oreos, Cookie Dough, Whipped Cream',
    },
    {
      id: 2,
      flavor: 'Strawberry',
      price: 2500,
      smallPrice: 2500,
      mediumPrice: 3500,
      largePrice: 4500,
      image: strawberry,
      amount: 1,
      orderSize: 'small',
      favorite: false,
      cart: false,
      topping:
        'Hot Fudge, Sprinkles, Caramel, Oreos, Cookie Dough, Whipped Cream',
    },
    {
      id: 3,
      flavor: 'Strawberry',
      price: 2700,
      smallPrice: 2700,
      mediumPrice: 3700,
      largePrice: 4700,
      image: strawberry,
      amount: 1,
      orderSize: 'small',
      favorite: false,
      cart: false,
      topping:
        'Hot Fudge, Sprinkles, Caramel, Oreos, Cookie Dough, Whipped Cream',
    },
  ],
  homeSuggestionItems: [
    {id: 1, image: vanillaflavor, title: 'Vanilla', value: 'Vanilla'},
    {id: 1, image: strawberry1, title: 'Strawberry', value: 'Strawberry'},
    {id: 1, image: vanillaflavor, title: 'Vanilla', value: 'Vanilla'},
    {id: 1, image: strawberry1, title: 'All', value: ''},
  ],
  history: [
    {
      id: 7,
      flavor: 'Strawberry',
      topping: 'Hot Fudge, Sprinkles, Caramel...',
      date: '01/05/21',
      image: strawberry1,
      cart: false,
      price: '2,350',
      amount: 1,
      favorite: false,
    },
    {
      id: 9,
      flavor: 'Vanilla',
      topping: 'Sprinkles, Caramel, Milkshake...',
      date: '17/09/21',
      image: vanillaflavor,
      cart: false,
      price: '1,200',
      amount: 3,
      favorite: false,
    },
  ],
};

export const UserSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    increment: (state, action) => {
      const id = action.payload.id;
      const newItem = state.cartItems.map(item => {
        if (item.id === id) {
          return {...item, amount: item.amount + 1};
        }
        return item;
      });
      console.log(newItem);
      state.cartItems = newItem;
    },

    setName: (state, action) => {
      state.name = action.payload.username;
    },

    decrement: (state, action) => {
      const id = action.payload.id;
      const newItem = state.cartItems.map(item => {
        if (item.id === id) {
          return {
            ...item,
            amount: item.amount === 1 ? (item.amount = 1) : item.amount - 1,
          };
        }
        return item;
      });
      console.log(newItem);
      state.cartItems = newItem;
    },

    addToCartItems: (state, action) => {
      const id = action.payload.id;
      const check = state.cartItems.some(e => e.id === id);
      if (check === true) {
        state.homeItems.map(item => {
          if (item.id === id) {
            return {...item, cart: (item.cart = false)};
          }
          return item;
        });
        const newArray = state.cartItems.filter(item => item.id !== id);
        state.cartItems = newArray;
        console.log('deleted...');
        console.log(state.homeItems);
        console.log(state.cartItems);
      } else {
        state.homeItems.map(item => {
          if (item.id === id) {
            return [
              state.cartItems.unshift(item),
              {...item, cart: (item.cart = true)},
            ];
          }
          return item;
        });
      }

      console.log('Added...');
      console.log(state.homeItems);
      console.log(state.cartItems);
    },

    removeCartItem: (state, action) => {
      const id = action.payload.id;
      const newArray = state.cartItems.filter(item => item.id !== id);
      state.cartItems = newArray;
    },

    addToFavorites: (state, action) => {
      const id = action.payload.id;
      const check = state.favorites.some(e => e.id === id);
      if (check === true) {
        const updateHomeFavorites = state.homeItems.map(item => {
          if (item.id === id) {
            return {
              ...item,
              favorite: false,
            };
          }
          return item;
        });
        state.homeItems = updateHomeFavorites;
        const updateCartFavorites = state.cartItems.map(item => {
          if (item.id === id) {
            return {
              ...item,
              favorite: false,
            };
          }
          return item;
        });
        state.cartItems = updateCartFavorites;
        const updateHistoryFavorites = state.history.map(item => {
          if (item.id === id) {
            return {
              ...item,
              favorite: false,
            };
          }
          return item;
        });
        state.history = updateHistoryFavorites;
        const newArray = state.favorites.filter(item => item.id !== id);
        state.favorites = newArray;
        console.log(state.history);
        console.log(state.favorites);
        console.log('removed....false set');
      } else {
        const updateHomeFavorites = state.homeItems.map(item => {
          if (item.id === id) {
            return {
              ...item,
              favorite: true,
            };
          }
          return item;
        });
        state.homeItems = updateHomeFavorites;
        const updateCartFavorites = state.cartItems.map(item => {
          if (item.id === id) {
            return {
              ...item,
              favorite: true,
            };
          }
          return item;
        });
        state.cartItems = updateCartFavorites;
        const updateHistoryFavorites = state.history.map(item => {
          if (item.id === id) {
            return {
              ...item,
              favorite: true,
            };
          }
          return item;
        });
        state.history = updateHistoryFavorites;
        state.homeItems.map(item => {
          if (item.id === id) {
            state.favorites.unshift(item);
          }
        });
        state.history.map(item => {
          if (item.id === id) {
            state.favorites.unshift(item);
          }
        });
        console.log(state.history);
        console.log(state.favorites);
        console.log('added....true set');
      }
    },

    removeFromFavorites: (state, action) => {
      const id = action.payload.id;
      const newArray = state.favorites.filter(item => item.id !== id);
      state.favorites = newArray;
      console.log(state.favorites);
    },

    clearCart: state => {
      while (state.cartItems.length > 0) {
        state.cartItems.pop();
      }
      console.log(state.cartItems);
    },

    setSearch: (state, action) => {
      state.search = action.payload.text;
    },

    setOrderSize: (state, action) => {
      const id = action.payload.id;
      const value = action.payload.value;
      const newCartItems = state.cartItems.map(item => {
        if (item.id === id) {
          return {...item, orderSize: (item.orderSize = value)};
        }
        return item;
      });
      state.cartItems = newCartItems;
    },

    setOrderPrice: (state, action) => {
      const id = action.payload.id;
      const value = action.payload.value;
      const newCartItems = state.cartItems.map(item => {
        if (item.id === id) {
          return {...item, price: (item.price = value)};
        }
        return item;
      });
      state.cartItems = newCartItems;
    },

    addHistoryToCart: (state, action) => {
      const id = action.payload.id;
      const check = state.cartItems.some(e => e.id === id);
      if (check === true) {
        const updateHistoryItemStatus = state.history.map(item => {
          if (item.id === id) {
            return {...item, cart: (item.cart = false)};
          }
          return item;
        });
        state.history = updateHistoryItemStatus;
        const newCartArraw = state.cartItems.filter(item => item.id !== id);
        state.cartItems = newCartArraw;
        console.log('removed....false set');
        console.log(state.cartItems);
        console.log(state.history);
      } else {
        state.history.map(item => {
          const updateHistoryItemStatus = state.history.map(item => {
            if (item.id === id) {
              return {...item, cart: (item.cart = true)};
            }
            return item;
          });
          state.history = updateHistoryItemStatus;
          if (item.id === id) {
            state.cartItems.unshift(item);
          }
        });
        console.log('removed....false set');
        console.log(state.cartItems);
        console.log(state.history);
      }
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  increment,
  decrement,
  clearCart,
  addToCartItems,
  setSearch,
  removeCartItem,
  addToFavorites,
  removeFromFavorites,
  setOrderSize,
  addHistoryToCart,
  setName,
  setOrderPrice,
} = UserSlice.actions;

export default UserSlice.reducer;
