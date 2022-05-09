import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { API_URL, HTTP_STATUS } from "../app/constant";
import authHeader from "../services/auth-header";
import axios from 'axios';
export const fetchChannelData = createAsyncThunk(
  'channel/fetchChannelData',
  async (serverId) => {
      const {data} = await axios.get(`${API_URL}/channels/${serverId}`, { headers: authHeader() })
      return data
  }
)

export const fetchAddNewChannel = createAsyncThunk(
    'channel/fetchAddNewChannel',
    async (serverId) => {
        const {data} = await axios.get(`${API_URL}/channels/${serverId}`, { headers: authHeader() })
        return data
    }
  )

const channelSlice = createSlice({
  name: "channel",
  initialState: {
      loading: null,
      data: []
  },
  reducers:{},
  extraReducers: {
      [fetchChannelData.pending](state) {
          state.loading = HTTP_STATUS.PENDING
      },
      [fetchChannelData.fulfilled](state, {payload}) {
          state.loading = HTTP_STATUS.FULFILLED
          console.log(payload)
          state.data = payload
      },
      [fetchChannelData.rejected](state) {
          state.loading = HTTP_STATUS.REJECTED
      },
  }
})
export const selectChannel = (state) => state.channel.data;
export default channelSlice.reducer
