import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { API_URL, HTTP_STATUS } from "../app/constant";
import authHeader from "../services/auth-header";
import axios from "axios";

export const fetchAddMember = createAsyncThunk(
    "member/fetchAddMember",
    async (member) => {
      console.log(member)
      const { data } = await axios.post(`${API_URL}/servers/users`,member, {
        headers: authHeader(),
      });
      console.log(data);
      return data;
    }
  );
  const memberSlice = createSlice({
    name: "member",
    initialState: {
      loading: null,
      data: [],
    },
    reducers: {},
    extraReducers: {
      [fetchAddMember.pending](state) {
        state.loading = HTTP_STATUS.PENDING;
      },
      [fetchAddMember.fulfilled](state, { payload }) {
        state.loading = HTTP_STATUS.FULFILLED;
        //state.data.push(payload.server);
      },
      [fetchAddMember.rejected](state) {
        state.loading = HTTP_STATUS.REJECTED;
      },
    },
  });
  export const selectMember = (state) => state.member.data;
  export default memberSlice.reducer;