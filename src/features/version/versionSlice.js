import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { notifySuccess } from 'components/utils/ToastNotifications';
import { notifyInfo } from 'components/utils/ToastNotifications';
import { notifyError } from 'components/utils/ToastNotifications';

const api_url = process.env.REACT_APP_API_URL

export const getAllVersion = createAsyncThunk(
    'versions',
    async (_, thunkAPI) => {
        try {
            const response = await axios.get(`${api_url}/version`);
            // console.log(response.data.data);
            // console.log(response.data.data.projects);
            return response.data;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.response?.message || { message: 'An error occurred' });
        }
    })

export const addNewVersion = createAsyncThunk(
    'versions/addNewVersion',
    async (versionData, thunkAPI) => {
        try {
            const response = await axios.post(`${api_url}/version/add-new`, versionData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
                withCredentials: true,
            });
            console.log("Success to response");
            return response.data;
        } catch (error) {
            console.log("Failed to connect");
            return thunkAPI.rejectWithValue(
                error.response ? error.response.data : { message: 'An error occurred' }
            );
        }
    }
);

export const updateBySlug = createAsyncThunk(
    'versions/updateBySlug',
    async ({ slug, versionData }, thunkAPI) => {
        try {
            const response = await axios.patch(`${api_url}/version/update/${slug}`, versionData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
                withCredentials: true,
            });
            return response.data;
        } catch (error) {
            return thunkAPI.rejectWithValue(
                error.response ? error.response.data : { message: 'An error occurred' }
            );
        }
    }
);

export const getVarsionBySlug = createAsyncThunk(
    'versions/bySlug',
    async (slug, thunkAPI) => {
        try {
            const response = await axios.get(`${api_url}/version/${slug}`);
            // console.log(response.data.data.blogs);
            return response.data;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.response ? error.response.data : { message: 'An error occurred' });
        }
    })

export const deleteById = createAsyncThunk(
    'versions/deleteById',
    async (id, thunkAPI) => {
        try {
            const response = await axios.delete(`${api_url}/version/delete/${id}`, {
                withCredentials: true,
            });
            return response.data;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.response ? error.response.data : { message: 'An error occurred' });
        }
    }
)



const initialState = {
    versions: [],
    isLoading: false,
    error: null,
    success: false,
    isLoadingForUpload: false,
    singleVersion: []
}


const versionSlice = createSlice({
    name: 'version',
    initialState: initialState,
    reducers: {
    },
    extraReducers: (builder) => {
        builder
            .addCase(getAllVersion.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(getAllVersion.fulfilled, (state, action) => {
                state.isLoading = false;
                state.versions = action.payload.data;
            })
            .addCase(getAllVersion.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload.message || 'An error occurred';
                notifyError("An error occurred")
            });

        builder
            .addCase(addNewVersion.pending, (state) => {
                state.isLoadingForUpload = true;
                state.error = null;
                state.success = false;
                notifyInfo("Prossing...")
            })
            .addCase(addNewVersion.fulfilled, (state, action) => {
                state.isLoadingForUpload = false;
                state.versions.push(action.payload.data);
                state.success = true;
                notifySuccess("Item added successfully")
            })
            .addCase(addNewVersion.rejected, (state, action) => {
                state.isLoadingForUpload = false;
                state.error = action.payload.message || 'An error occurred';
                state.success = false;
                notifyError("Failed to process")
            });
        builder
            .addCase(updateBySlug.pending, (state) => {
                state.isLoadingForUpload = true;
                state.success = false;
                state.error = null;
                notifyInfo("Prossing...")
            })
            .addCase(updateBySlug.fulfilled, (state, action) => {
                state.isLoadingForUpload = false;
                state.versions.push(action.payload.data);
                state.success = true;
                notifySuccess("Project updated successfully")
            })
            .addCase(updateBySlug.rejected, (state, action) => {
                state.isLoadingForUpload = false;
                state.error = action.payload.message || 'An error occurred';
                state.success = false;
                notifyError("Failed to update project")
            });

        builder
            .addCase(getVarsionBySlug.pending, (state) => {
                state.error = null;
                state.isLoadingForUpload = true;
                state.success = false;
            })
            .addCase(getVarsionBySlug.fulfilled, (state, action) => {
                state.isLoadingForUpload = false;
                state.success = true;
                state.singleVersion = action.payload.data;
            })
            .addCase(getVarsionBySlug.rejected, (state, action) => {
                state.isLoadingForUpload = false;
                state.success = false;
                state.error = action.payload.message || 'An error occurred';
            });
        builder
            .addCase(deleteById.pending, (state) => {
                state.error = null;
                state.isLoadingForUpload = true;
                state.success = false;
                notifyInfo("Processing...")
            })
            .addCase(deleteById.fulfilled, (state, action) => {
                state.isLoadingForUpload = false;
                state.success = true;
                notifySuccess("Item deleted successfully.")
            })
            .addCase(deleteById.rejected, (state, action) => {
                state.isLoadingForUpload = false;
                state.success = false;
                state.error = action.payload.message || 'An error occurred';
                notifyError("Failed to process...")
            });

    }
})

export default versionSlice.reducer;