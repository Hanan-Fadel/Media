import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';
import { usersReducer } from './slices/usersSlice';
import { albumsApi } from './apis/albumsApi';
import { photosApi } from './apis/photosApi';

export const store = configureStore({
  reducer: {
    users: usersReducer,
    [albumsApi.reducerPath]: albumsApi.reducer, //add the combined reducer from albumsApi
    [photosApi.reducerPath]: photosApi.reducer
  },
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware()
      .concat(albumsApi.middleware)
      .concat(photosApi.middleware)
  },
});

//TEMPORARY: To debug the state in the browser
window.store = store; //in the browser => console tab > write the command store.getState();

//call setup listener
setupListeners(store.dispatch);

export * from './thunks/fetchUsers'; //we use index.js as the central exporting point for everything releated to redux
export * from './thunks/addUser';
export * from './thunks/removeUser';


export {
  useFetchAlbumsQuery, 
  useAddAlbumMutation, 
  useRemoveAlbumMutation
} from './apis/albumsApi';

  export {
    useFetchPhotosQuery,
    useAddPhotoMutation, 
    useRemovePhotoMutation
} from './apis/photosApi';
