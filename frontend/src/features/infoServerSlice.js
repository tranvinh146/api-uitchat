import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { API_URL, HTTP_STATUS } from "../app/constant";
import authHeader from "../services/auth-header";
import axios from 'axios';
export const fetchInfoServerData = createAsyncThunk(
  'infoServer/fetchInfoServerData',
  async (serverId) => {
      const {data} = await axios.get(`${API_URL}/servers/${serverId}`, { headers: authHeader() })
      console.log(data)
      return data
  }
)

const infoServerSlice = createSlice({
  name: "infoServer",
  initialState: {
      loading: null,
      data: null
  },
  reducers:{},
  extraReducers: {
      [fetchInfoServerData.pending](state) {
          state.loading = HTTP_STATUS.PENDING
      },
      [fetchInfoServerData.fulfilled](state, {payload}) {
          state.loading = HTTP_STATUS.FULFILLED
          state.data = payload
      },
      [fetchInfoServerData.rejected](state) {
          state.loading = HTTP_STATUS.REJECTED
      },
  }
})
export const selectInfoServer = (state) => state.infoServer.data;
export default infoServerSlice.reducer
