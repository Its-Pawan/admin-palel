import { configureStore } from '@reduxjs/toolkit';
import authSlice from 'features/auth/authSlice';
import blogSlice from 'features/blogs/blogSlice';
import profileSlice from 'features/profile/profileSlice';
import projectSlice from 'features/projects/projectSlice';
import versionSlice from 'features/version/versionSlice';

const store = configureStore({
    reducer: {
        auth: authSlice,
        blog: blogSlice,
        project: projectSlice,
        version: versionSlice,
        profile: profileSlice,
    },
});

export default store;