import {createSlice} from "@reduxjs/toolkit";

const initialState = {
    initialized: false,
    isAuth: false,
    username: '',
    updatingCounts: false,
}

// / action - объект у которого есть как минимум свойство type и именно action мы можем dipatch'ить в store
const appSlice = createSlice({
    name: "app",
    initialState,
    reducers: {
        initializedSuccess(state, action) {
            state.initialized = action.payload
        },
        setIsAuthFalse(state) {
            state.isAuth = false
        },
        setIsAuthTrue(state) {
            state.isAuth = true
        },
        setUsername(state, action) {
            state.username = action.payload
        },
        checkAuth(state) {
            if (localStorage.getItem('token')) {
                state.isAuth = true
            }
        }
    },
})
// @ts-ignore
export const initializeApp = () => async (dispatch) => {
    const promise = await
    dispatch(checkAuth())
    // dispatch(someThunk())
    // dispatch(someThunk())
    // Когда все промисы resolv'ятся сделай что-то
    Promise.all([promise])
        .then(() => {
            dispatch(initializedSuccess(true));
        });
};

export const { initializedSuccess, checkAuth, setIsAuthFalse, setIsAuthTrue, setUsername } = appSlice.actions;
export default appSlice.reducer