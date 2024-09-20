import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const api_url = process.env.REACT_APP_API_URL

export const getAllBlogs = createAsyncThunk(
    'blog/blogs',
    async (_, thunkAPI) => {
        try {
            const response = await axios.get(`${api_url}/blogs`);
            // console.log(response.data.data.blogs);
            return response.data;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.response ? error.response.data : { message: 'An error occurred' });
        }
    })

export const addNewBlog = createAsyncThunk(
    'blog/addNewBlog',
    async (blogData, thunkAPI) => {
        try {
            console.log(blogData);
            const response = await axios.post(`${api_url}/blogs/create-blog`, blogData, {
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
    'blog/updateBySlug',
    async ({ slug, blogData }, thunkAPI) => {
        try {
            const formData = new FormData();
            formData.append("title", blogData.title);
            formData.append("description", blogData.description);
            formData.append("content", blogData.content);
            if (blogData.thumbnail) {
                formData.append("thumbnail", blogData.thumbnail);
            }
            const response = await axios.post(`${api_url}/blogs/update/${slug}`, formData, {
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

export const getBlogBySlug = createAsyncThunk(
    'blog/bySlug',
    async (slug, thunkAPI) => {
        try {
            const response = await axios.get(`${api_url}/blogs/${slug}`);
            // console.log(response.data.data.blogs);
            return response.data;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.response ? error.response.data : { message: 'An error occurred' });
        }
    })
export const deleteById = createAsyncThunk(
    'blog/deleteById',
    async (id, thunkAPI) => {
        try {
            const response = await axios.get(`${api_url}/blogs/delete-blog/${id}`, {
                withCredentials: true,
            });
            // console.log(response.data.data.blogs);
            return response.data;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.response ? error.response.data : { message: 'An error occurred' });
        }
    })



const initialState = {
    blogs: [],
    isLoading: false,
    error: null,
    success: false,
    isLoadingForUpload: false,
    singleBlog: []
}


const blogSlice = createSlice({
    name: 'blog',
    initialState: initialState,
    reducers: {
        // getAllBlogs: () => { },
        // postBlog: () => { },
        // deleteBlog: () => { },
        // getBlogBySlug: () => { },
        // updateBlog: () => { }
    },
    extraReducers: (builder) => {
        builder
            .addCase(getAllBlogs.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(getAllBlogs.fulfilled, (state, action) => {
                state.isLoading = false;
                state.blogs = action.payload.data.blogs; 
            })
            .addCase(getAllBlogs.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload.message || 'An error occurred';
            });

        builder
            .addCase(addNewBlog.pending, (state) => {
                state.isLoadingForUpload = true;
                state.error = null;
                state.success = false;
            })
            .addCase(addNewBlog.fulfilled, (state, action) => {
                state.isLoadingForUpload = false;
                state.blogs.push(action.payload.data.blog); // Assuming the response contains the added blog
                state.success = true;
            })
            .addCase(addNewBlog.rejected, (state, action) => {
                state.isLoadingForUpload = false;
                state.error = action.payload.message || 'An error occurred';
                state.success = false;
            });
        builder
            .addCase(updateBySlug.pending, (state) => {
                state.isLoadingForUpload = true;
                state.success = false;
                state.error = null;
            })
            .addCase(updateBySlug.fulfilled, (state, action) => {
                state.isLoadingForUpload = false;
                state.blogs.push(action.payload.data.blog); // Assuming the response contains the added blog
                state.success = true;
            })
            .addCase(updateBySlug.rejected, (state, action) => {
                state.isLoadingForUpload = false;
                state.error = action.payload.message || 'An error occurred';
                state.success = false;
            });

        builder
            .addCase(getBlogBySlug.pending, (state) => {
                state.error = null;
                state.isLoadingForUpload = true;
                state.success = false;
            })
            .addCase(getBlogBySlug.fulfilled, (state, action) => {
                state.isLoadingForUpload = false;
                state.success = true;
                state.singleBlog = action.payload.data.blogs;
            })
            .addCase(getBlogBySlug.rejected, (state, action) => {
                state.isLoadingForUpload = false;
                state.success = false;
                state.error = action.payload.message || 'An error occurred';
            });
        builder
            .addCase(deleteById.pending, (state) => {
                state.error = null;
                state.isLoadingForUpload = true;
                state.success = false;
            })
            .addCase(deleteById.fulfilled, (state, action) => {
                state.isLoadingForUpload = false;
                state.success = true;
            })
            .addCase(deleteById.rejected, (state, action) => {
                state.isLoadingForUpload = false;
                state.success = false;
                state.error = action.payload.message || 'An error occurred';
            });

    }
})

export default blogSlice.reducer;