import { createSlice } from "@reduxjs/toolkit";


const initialState = {
    bannerAds: [],
    sideAds: [],
    detailAds: [],
    loading: false,
    error: null,
};


const adsSlice = createSlice({
    name: 'ads',
    initialState,
    reducers: {
        getAds: (state) => {
            state.loading = true;
        },
        getAdsSuccess: (state, action) => {
            state.bannerAds = action.payload.bannerAds;
            state.sideAds = action.payload.sideAds;
            state.detailAds = action.payload.detailAds;
            state.error = null;
            state.loading = false;
        },
        getAdsFail: (state, action) => {
            state.error = action.payload;
            state.loading = false;
        }
    }
})


export const { getAds, getAdsSuccess, getAdsFail } = adsSlice.actions

export default adsSlice.reducer;