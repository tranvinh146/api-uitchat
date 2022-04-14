import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { API_URL, HTTP_STATUS } from "../app/constant";
import axios from 'axios';

export const fetchServerData = createAsyncThunk(
    'server/fetchServerData',
    async () => {
        // const {data} = await axios.get(`${API_URL}/servers`)
        const {data} =await axios.get('http://localhost:8000/servers')
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
            state.data = payload
        },
        [fetchServerData.rejected](state) {
            state.loading = HTTP_STATUS.REJECTED
        }
    }
})
export const selectServer = (state) => state.server.data;
export default serverSlice.reducer
