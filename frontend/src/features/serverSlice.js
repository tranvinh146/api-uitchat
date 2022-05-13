import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { API_URL, HTTP_STATUS } from "../app/constant";
import authHeader from "../services/auth-header";
import axios from "axios";

export const fetchServerData = createAsyncThunk(
  "server/fetchServerData",
  async () => {
    const { data } = await axios.get(`${API_URL}/servers`, {
      headers: authHeader(),
    });
    return data;
  }
);
export const fetchAddNewServer = createAsyncThunk(
  "server/fetchAddNewServer",
  async (newServer) => {
    const { data } = await axios.post(`${API_URL}/servers`, newServer, {
      headers: authHeader(),
    });
    return data;
  }
);
export const fetchDeleteServer = createAsyncThunk(
  "server/fetchDeleteServer",
  (serverId) => {
    axios
      .delete(
        "http://localhost:8000/api/v1/uitchat/servers",
        { serverId },
        { headers: authHeader() }
      )
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });
  }
  // async (serverId) => {
  //     console.log(serverId)
  //     const {res} = await axios.delete(`${API_URL}/servers`,serverId, {headers: authHeader()})
  //     console.log(res)
  //     return serverId.server_id;
  // }
);
const serverSlice = createSlice({
  name: "server",
  initialState: {
    loading: null,
    data: [],
  },
  reducers: {},
  extraReducers: {
    [fetchServerData.pending](state) {
      state.loading = HTTP_STATUS.PENDING;
    },
    [fetchServerData.fulfilled](state, { payload }) {
      state.loading = HTTP_STATUS.FULFILLED;
      state.data = payload.serversList;
    },
    [fetchServerData.rejected](state) {
      state.loading = HTTP_STATUS.REJECTED;
    },
    [fetchAddNewServer.fulfilled](state, { payload }) {
      state.loading = HTTP_STATUS.FULFILLED;
      state.data.push(payload.server);
    },
    [fetchDeleteServer.fulfilled](state) {
      state.loading = HTTP_STATUS.FULFILLED;
    },
  },
});
export const selectServer = (state) => state.server.data;
export default serverSlice.reducer;
