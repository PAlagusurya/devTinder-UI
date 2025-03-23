import { createSlice } from "@reduxjs/toolkit";

const feedSlice = createSlice({
  name: "feed",
  initialState: null,
  reducers: {
    addFeed: (state, action) => action.payload,
    removeUsersFromFeed: (state, action) => {
      const newFeedData = state.filter((feed) => feed._id !== action.payload);
      return newFeedData;
    },
  },
});

export const { addFeed, removeUsersFromFeed } = feedSlice.actions;

export default feedSlice.reducer;
