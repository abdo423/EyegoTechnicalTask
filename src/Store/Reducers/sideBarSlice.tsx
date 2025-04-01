import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isOpen: true, // Sidebar starts open
};

const sidebarSlice = createSlice({
  name: "sidebar",
  initialState,
  reducers: {
    toggleSidebar: (state) => {
      state.isOpen = !state.isOpen;
    },
  },
});

export const { toggleSidebar } = sidebarSlice.actions;
export default sidebarSlice.reducer;
