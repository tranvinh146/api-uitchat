import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { API_URL, HTTP_STATUS } from "../app/constant";
import authHeader from "../services/auth-header";
import axios from 'axios';

export const fetchServerData = createAsyncThunk(
    'server/fetchServerData',
    async () => {
        const {data} = await axios.get(`${API_URL}/servers`, { headers: authHeader() })
        console.log(data)
        return data
    }
)
export const fetchAddNewServer = createAsyncThunk(
    'server/fetchAddNewServer',
    async (newServer) => {
        console.log(newServer)
        const {data} = await axios.post(`${API_URL}/servers`,newServer, {headers: authHeader()})
        console.log(data)
        return data
    }
)
const serverSlice = createSlice({
    name: "server",
    initialState: {
        loading: null,
        data: []
    },
    reducers:{},
    extraReducers: {
        [fetchServerData.pending](state) {
            state.loading = HTTP_STATUS.PENDING
        },
        [fetchServerData.fulfilled](state, {payload}) {
            state.loading = HTTP_STATUS.FULFILLED
            console.log(payload)
            state.data = payload.serversList
        },
        [fetchServerData.rejected](state) {
            state.loading = HTTP_STATUS.REJECTED
        },
        [fetchAddNewServer.fulfilled](state, {payload}) {
            state.loading = HTTP_STATUS.FULFILLED
            state.data.push(payload.new_server)
        },
    }
})
export const selectServer = (state) => state.server.data;
export default serverSlice.reducer
