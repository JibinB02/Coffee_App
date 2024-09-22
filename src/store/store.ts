import {create} from 'zustand';
import {produce} from 'immer';
import {persist, createJSONStorage} from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';
import CoffeeData from '../data/CoffeeData';
import BeansData from '../data/BeansData';

export const useStore = create(
  persist(
    (set, get) => ({
      CoffeeList: CoffeeData,
      BeanList: BeansData,
      CartPrice: 0,
      FavoritesList: [],
      CartList: [],
      OrderHistoryList: [],
      addToCart: (cartItem: any) =>
        set(
          produce(state => {
            // Find the item in the cart by ID
            const existingItem = state.CartList.find(
              (item: any) => item.id === cartItem.id,
            );

            if (existingItem) {
              // Find if the size exists in the cart
              const existingSize = existingItem.prices.find(
                (price: any) => price.size === cartItem.prices[0].size,
              );

              if (existingSize) {
                // Increase the quantity for the existing size
                existingSize.quantity++;
              } else {
                // Add new size if it doesn't exist
                existingItem.prices.push({...cartItem.prices[0]});
              }
            } else {
              // Add new item to the cart if it doesn't exist
              state.CartList.push(cartItem);
            }
          }),
        ),
      calculateCartPrice: () =>
        set(
          produce(state => {
            // Initialize total cart price
            let totalPrice = 0;

            // Loop through each cart item
            state.CartList.forEach((item: any) => {
              // Calculate total price for each item based on quantity and price
              const itemPrice = item.prices.reduce(
                (acc: any, price: any) =>
                  acc + parseFloat(price.price) * price.quantity,
                0,
              );

              // Set individual item price
              item.ItemPrice = itemPrice.toFixed(2).toString();

              // Accumulate to total cart price
              totalPrice += itemPrice;
            });

            // Set total price to state (if needed)
            state.CartPrice = totalPrice.toFixed(2).toString();
          }),
        ),
      addToFavoriteList: (type: string, id: string) =>
        set(
          produce(state => {
            let itemToAdd;

            // Determine the list and find the item based on type
            if (type === 'Coffee') {
              itemToAdd = state.CoffeeList.find((item: any) => item.id === id);
            } else if (type === 'Bean') {
              itemToAdd = state.BeanList.find((item: any) => item.id === id);
            }

            // If the item was found and it's not already a favorite
            if (itemToAdd && !itemToAdd.favourite) {
              itemToAdd.favourite = true;
              state.FavoritesList.unshift(itemToAdd);
            }
          }),
        ),
      deleteFromFavorites: (type: string, id: string) =>
        set(
          produce(state => {
            let itemToDelete;
            if (type == 'Coffee') {
              itemToDelete = state.CoffeeList.find(
                (item: any) => item.id === id,
              );
            }
            if (type == 'Bean') {
              itemToDelete = state.BeanList.find((item: any) => item.id === id);
            }
            if (itemToDelete && itemToDelete.favourite) {
              itemToDelete.favourite = false;
              state.FavoritesList = state.FavoritesList.filter(
                (item: any) => item.id !== id,
              );
            }
          }),
        ),
      incrementCartItemQuantity: (id: string, size: string) =>
        set(
          produce(state => {
            const existingItem = state.CartList.find(
              (item: any) => item.id === id,
            );

            if (existingItem) {
              const existingSize = existingItem.prices.find(
                (price: any) => price.size === size,
              );
              if (existingSize) {
                existingSize.quantity++;
              }
            }
          }),
        ),
      decrementCartItemQuantity: (id: string, size: string) =>
        set(
          produce(state => {
            const existingItem = state.CartList.find(
              (item: any) => item.id === id,
            );

            if (existingItem) {
              const existingSize = existingItem.prices.find(
                (price: any) => price.size === size,
              );
              if (existingSize) {
                if (existingSize.quantity > 1) {
                  existingSize.quantity--;
                } else {
                  existingItem.prices = existingItem.prices.filter(
                    (price: any) => price.size !== size,
                  );
                }
                if (existingItem.prices.length === 0) {
                  state.CartList = state.CartList.filter(
                    (item: any) => item.id !== id,
                  );
                }
              }
            }
          }),
        ),
      addToOrderHistoryListFromCart: () =>
        set(
          produce(state => {
            let temp = state.CartList.reduce(
              (acc: number, currentValue: any) =>
                acc + parseFloat(currentValue.ItemPrice),
              0,
            );

            const newOrder = {
              items: [...state.CartList],
              CartListPrice: temp.toFixed(2).toString(),
              date:
                new Date().toDateString() +
                ' ' +
                new Date().toLocaleTimeString(),
            };
            if (state.OrderHistoryList.length > 0) {
              state.OrderHistoryList.unshift(newOrder);
            } else {
              state.OrderHistoryList.push(newOrder);
            }
            state.CartList = [];
            state.CartPrice = 0;
          }),
        ),
    }),
    {name: 'coffee-app', storage: createJSONStorage(() => AsyncStorage)},
  ),
);
