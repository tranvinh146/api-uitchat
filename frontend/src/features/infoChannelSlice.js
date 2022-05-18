import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { API_URL, HTTP_STATUS } from "../app/constant";
import authHeader from "../services/auth-header";
import axios from 'axios';
export const fetchInfoChannelData = createAsyncThunk(
  'infoChannel/fetchInfoChannelData',
  async (channelId, serverId) => {
      console.log(channelId)
      const {data} = await axios.get(`${API_URL}/channels/${serverId}/${channelId}`, { headers: authHeader() })
      console.log(data)
      return data
  }
)

const infoChannelSlice = createSlice({
  name: "infoChannel",
  initialState: {
      loading: null,
      data: null
  },
  reducers:{},
  extraReducers: {
      [fetchInfoChannelData.pending](state) {
          state.loading = HTTP_STATUS.PENDING
      },
      [fetchInfoChannelData.fulfilled](state, {payload}) {
          state.loading = HTTP_STATUS.FULFILLED
          state.data = payload
      },
      [fetchInfoChannelData.rejected](state) {
          state.loading = HTTP_STATUS.REJECTED
      },
  }
})
export const selectInfoChannel = (state) => state.infoChannel.data;
export default infoChannelSlice.reducer
