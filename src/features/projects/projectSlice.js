import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { notifySuccess } from 'components/utils/ToastNotifications';
import { notifyInfo } from 'components/utils/ToastNotifications';
import { notifyError } from 'components/utils/ToastNotifications';

const api_url = process.env.REACT_APP_API_URL

export const getAllProjects = createAsyncThunk(
    'projects',
    async (_, thunkAPI) => {
        try {
            const response = await axios.get(`${api_url}/projects`);
            // console.log(response.data.data.blogs);
            // console.log(response.data.data.projects);
            return response.data;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.response?.message || { message: 'An error occurred' });
        }
    })

export const addNewProject = createAsyncThunk(
    'blog/addNewProject',
    async (projectData, thunkAPI) => {
        try {
            console.log(projectData);
            const response = await axios.post(`${api_url}/projects/add-project`, projectData, {
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

export const updateBySlug = createAsyncThunk(
    'projects/updateBySlug',
    async ({ slug, projectData }, thunkAPI) => {
        try {
            const formData = new FormData();
            formData.append("projectName", projectData.projectName);
            formData.append("description", projectData.description);
            formData.append("shortDescription", projectData.shortDescription);
            formData.append("projectLink", projectData.projectLink);
            formData.append("techStack", projectData.techStack);
            if (projectData.projectThumbnail) {
                formData.append("projectThumbnail", projectData.projectThumbnail);
            }
            console.log(projectData);
            const response = await axios.patch(`${api_url}/projects/update/${slug}`, formData, {
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

export const getProjectBySlug = createAsyncThunk(
    'projects/bySlug',
    async (slug, thunkAPI) => {
        try {
            const response = await axios.get(`${api_url}/projects/${slug}`);
            // console.log(response.data.data.blogs);
            return response.data;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.response ? error.response.data : { message: 'An error occurred' });
        }
    })

export const deleteById = createAsyncThunk(
    'projects/deleteById',
    async (id, thunkAPI) => {
        try {
            const response = await axios.delete(`${api_url}/projects/delete/${id}`, {
                withCredentials: true,
            });
            return response.data;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.response ? error.response.data : { message: 'An error occurred' });
        }
    }
)



const initialState = {
    projects: [],
    isLoading: false,
    error: null,
    success: false,
    isLoadingForUpload: false,
    singleProject: []
}


const projectSlice = createSlice({
    name: 'project',
    initialState: initialState,
    reducers: {
    },
    extraReducers: (builder) => {
        builder
            .addCase(getAllProjects.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(getAllProjects.fulfilled, (state, action) => {
                state.isLoading = false;
                state.projects = action.payload.data;
            })
            .addCase(getAllProjects.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload.message || 'An error occurred';
            });

        builder
            .addCase(addNewProject.pending, (state) => {
                state.isLoadingForUpload = true;
                state.error = null;
                state.success = false;
                notifyInfo("Prossing...")
            })
            .addCase(addNewProject.fulfilled, (state, action) => {
                state.isLoadingForUpload = false;
                state.projects.push(action.payload.data.projects);
                state.success = true;
                notifySuccess("New project added successfully")
            })
            .addCase(addNewProject.rejected, (state, action) => {
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
                state.projects.push(action.payload.data.projects); // Assuming the response contains the added blog
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
            .addCase(getProjectBySlug.pending, (state) => {
                state.error = null;
                state.isLoadingForUpload = true;
                state.success = false;
            })
            .addCase(getProjectBySlug.fulfilled, (state, action) => {
                state.isLoadingForUpload = false;
                state.success = true;
                state.singleProject = action.payload.data.project;
                console.log(action.payload.data.foundProject);
            })
            .addCase(getProjectBySlug.rejected, (state, action) => {
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
                notifySuccess("Project deleted successfully.")
            })
            .addCase(deleteById.rejected, (state, action) => {
                state.isLoadingForUpload = false;
                state.success = false;
                state.error = action.payload.message || 'An error occurred';
                notifyError("Failed to process...")
            });

    }
})

export default projectSlice.reducer;