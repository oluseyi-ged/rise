import {createSlice} from '@reduxjs/toolkit';

const initialState: any = [];

const restaurantsSlice = createSlice({
  name: 'restaurants',
  initialState,
  reducers: {
    addRestaurant: (state, action) => {
      state.push(action.payload);
    },
    updateRestaurant: (state, action) => {
      const {restaurantId, updatedRestaurant} = action.payload;
      const index = state.findIndex(
        restaurant => restaurant.restaurantId === restaurantId,
      );
      if (index !== -1) {
        state[index] = {...state[index], ...updatedRestaurant};
      }
    },
    updateMeal: (state, action) => {
      const {restaurantId, mealId, updatedMeal} = action.payload;

      // Create a deep clone of the state
      const newState = JSON.parse(JSON.stringify(state));

      // Find the restaurant with the given restaurantId
      const restaurantIndex = newState.findIndex(
        restaurant => restaurant.restaurantId === restaurantId,
      );

      if (restaurantIndex !== -1) {
        const restaurant = newState[restaurantIndex];

        // Find the meal with the given mealId within the restaurant
        const mealIndex = restaurant.meals.findIndex(
          meal => meal.selectedMealId === mealId,
        );

        if (mealIndex !== -1) {
          // Update the meal by creating a new object
          restaurant.meals[mealIndex] = {
            ...restaurant.meals[mealIndex],
            ...updatedMeal,
          };
        }
      }

      // Return the updated state
      return newState;
    },
    addMeal: (state, action) => {
      const {restaurantId, newMeal} = action.payload;
      const restaurant = state.find(
        restaurant => restaurant.restaurantId === restaurantId,
      );
      if (restaurant) {
        restaurant.meals.push(newMeal);
      }
    },
    deleteMeal: (state, action) => {
      const {restaurantId, mealId} = action.payload;

      // Create a deep clone of the state
      const newState = JSON.parse(JSON.stringify(state));

      // Find the restaurant with the given restaurantId
      const restaurantIndex = newState.findIndex(
        restaurant => restaurant?.restaurantId === restaurantId,
      );

      if (restaurantIndex !== -1) {
        const restaurant = newState[restaurantIndex];
        console.log(restaurantIndex, 'ready');

        // Filter out the meal with the given mealId from the restaurant's meals array
        restaurant.meals = restaurant?.meals?.filter(
          meal => meal?.selectedMealId !== mealId,
        );
      }

      // Return the updated state
      return newState;
    },

    deleteRestaurant: (state, action) => {
      const restaurantId = action.payload;
      return state.filter(
        restaurant => restaurant.restaurantId !== restaurantId,
      );
    },
    clearRestaurants: () => {
      return [];
    },
  },
});

export const {
  addRestaurant,
  updateRestaurant,
  updateMeal,
  addMeal,
  deleteMeal,
  clearRestaurants,
} = restaurantsSlice.actions;

export default restaurantsSlice.reducer;

// dispatch(
//   addRestaurant({
//     restaurantName: 'New Restaurant',
//     restaurantId: 4,
//     meals: [],
//   }),
// );

// dispatch(
//   updateRestaurant({
//     restaurantId: 1,
//     updatedRestaurant: {
//       restaurantName: 'Updated Restaurant Name',
//       // ... other properties ...
//     },
//   }),
// );

// dispatch(
//   updateMeal({
//     restaurantId: 1,
//     mealId: 101,
//     updatedMeal: {
//       mealName: 'New Name',
//       amount: 15.99,
//     },
//   }),
// );

// dispatch(
//   addMeal({
//     restaurantId: 1,
//     newMeal: {
//       mealId: 104,
//       mealName: 'New Meal',
//       amount: 8.99,
//     },
//   }),
// );

// dispatch(
//   deleteMeal({
//     restaurantId: 1,
//     mealId: 101,
//   }),
// );

// dispatch(deleteRestaurant(1));
