import { createSlice, createAsyncThunk, current } from "@reduxjs/toolkit";
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
    console.log(newServer)
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
      .delete(`${API_URL}/servers`, {
        data: { server_id: serverId },
        headers: authHeader(),
      })
      .then(function (response) {
        // console.log(response.data);
      })
      .catch(function (error) {
        // console.log(error.message);
      });
    return serverId;
  }
);
export const fetchUpdateServer = createAsyncThunk(
  "server/fetchUpdateServer",
  async (server) => {
    const { data } = await axios.patch(`${API_URL}/servers`, server, {
      headers: authHeader(),
    });
    return server;
  }
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
    [fetchDeleteServer.fulfilled](state, { payload }) {
      state.loading = HTTP_STATUS.FULFILLED;
      state.data = current(state).data.filter(
        (server) => server._id !== payload
      );
    },
    [fetchUpdateServer.fulfilled](state, { payload }) {
      state.loading = HTTP_STATUS.FULFILLED;
      state.data = current(state).data.forEach((server) => {
        if(server._id !== payload.server_id) {
          server.name = payload.name;
          server.avatar = payload.avatar
        }
      }
      );
    },
  },
});
export const selectServer = (state) => state.server.data;
export default serverSlice.reducer;
