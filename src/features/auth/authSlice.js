import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { notifySuccess } from 'components/utils/ToastNotifications';
import { notifyError } from 'components/utils/ToastNotifications';

const api_url = process.env.REACT_APP_API_URL

console.log(api_url);

// Async thunk for login
export const loginUser = createAsyncThunk(
    'auth/loginUser',
    async (credentials, thunkAPI) => {
        try {
            const response = await axios.post(`${api_url}/users/login`,
                credentials,
                {
                    withCredentials: true,
                    validateStatus: function (status) {
                        return status < 500; // Resolve only if the status code is less than 500
                    },
                });
            if (response.status === 404) {
                return thunkAPI.rejectWithValue('Invalid credentials, user not found.');
            }
            return response.data;
        } catch (error) {
            if (error.response && error.response.status === 404) {
                // Handle specific 404 error or other status codes
                console.log(111111);
                return thunkAPI.rejectWithValue('Invalid credentials, user not found.');
            }
            notifyError("Failed to Login")
            setTimeout(() => {
                notifyError("501 Internal Server Error ")
            }, 1000);
            return thunkAPI.rejectWithValue(
                error.response ? error.response.data : { message: 'An error occurred' }
            );
        }
    }
);

// Async thunk for logout
export const logoutUser = createAsyncThunk(
    'auth/logoutUser',
    async (_, thunkAPI) => {
        try {
            await axios.post(`${api_url}/users/logout`, {},
                {
                    withCredentials: true,
                });
        }
        catch (error) {
            return thunkAPI.rejectWithValue(
                error.response?.data || { message: 'An error occurred during logout' }
            );
        }
    }
);

const initialState = {
    user: null,
    token: null,
    isAuthenticated: false,
    isLoading: false,
    error: null,
}

const authSlice = createSlice({
    name: 'auth',
    initialState: initialState,
    reducers: {

    },
    extraReducers: (builder) => {
        builder
            .addCase(loginUser.pending, (state) => {
                state.isLoading = true;
                state.error = null;
                state.isAuthenticated = false
            })
            .addCase(loginUser.fulfilled, (state, action) => {
                state.isLoading = false;
                const user = action.payload?.data?.user; // Safely access the user data
                const token = action.payload?.data?.refreshToken; // Safely access the refreshToken

                if (user && token) {
                    state.user = user;
                    state.token = token;
                    state.isAuthenticated = true;
                    notifySuccess("Login Success.")
                } else {
                    state.error = 'User or refreshToken is missing in the response payload';
                    state.isAuthenticated = false;
                }

            })
            .addCase(loginUser.rejected, (state, action) => {
                state.isAuthenticated = false
                state.isLoading = false;
                state.error = action.payload || 'Failed to login';
                notifyError(state.error)
            });

        builder
            .addCase(logoutUser.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(logoutUser.fulfilled, (state) => {
                state.isLoading = false;
                state.user = null;
                state.token = null;
                state.isAuthenticated = false;
                notifySuccess("Logout Success.")
            })
            .addCase(logoutUser.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload?.message || 'Failed to logout';
                notifyError(state.error)
            });
    },
});

export default authSlice.reducer;