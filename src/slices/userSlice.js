import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
  name: "user",
  initialState: {
    number: "",
    isVerified: false,
    token: "",
    isLoading: false,
    balance: "",
    sentRequests: [],
    receivedRequests: [],
    typeOfMessage: "",
    disMessage: "",
    isRefresh: false
  },
  reducers: {
    addMobile(state, action) {
      state.number = action.payload.number;
    },
    changeIsVerified(state, action) {
      state.isVerified = action.payload.isVerified;
    },
    changeIsLoading(state, action) {
      state.isLoading = action.payload.isLoading;
    },
    changeBalance(state, action) {
      state.balance = action.payload.balance;
    },
    changeSentRequests(state, action) {
      state.sentRequests = action.payload.sentRequests;
    },
    changeReceivedRequests(state, action) {
      state.receivedRequests = action.payload.receivedRequests;
    },
    changeTypeOfMessage(state, action) {
      state.typeOfMessage = action.payload.typeOfMessage;
      state.disMessage = action.payload.disMessage;
    },
    changeIsRefresh(state, action) {
      state.isRefresh = action.payload.isRefresh;
    }
  }
});

export const {
  addMobile,
  changeIsVerified,
  changeIsLoading,
  changeBalance,
  changeSentRequests,
  changeReceivedRequests,
  changeTypeOfMessage,
  changeIsRefresh
} = userSlice.actions;

export default userSlice.reducer;
