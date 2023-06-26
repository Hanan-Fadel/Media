import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';
import {faker} from '@faker-js/faker';

//DEV ONLY!!
const pause = (duration) => {
return new Promise((resolve)=> {
    setTimeout(resolve, duration);
});
};
const albumsApi = createApi({
    reducerPath: 'albums',
    baseQuery: fetchBaseQuery({//fetchBaseQuery gives us a preconfigured version of fetch
        baseUrl: 'http://localhost:3005',
        fetchFn: async(...args)=> {
            //DEV ONLY (Override browser default fetch functione)
            await pause(1000);
            return fetch(...args);
        }
    }),
    endpoints(builder){ // a function that will be called automatically with an argument called builder
        return {
            //a bunch of configuration
            removeAlbum: builder.mutation({
                invalidatesTags: (result, error, album)=> {
                    return [{type: 'Album', id: album.id}];
                },
                query: (album)=>{
                    return {
                        url: `/albums/${album.id}`,
                        method: 'DELETE'
                    };
                }
            }),
            addAlbum: builder.mutation({ //we are about to create an endpoint to change the data

                //whenever we run this mutation we will go and find all the queries that is using 
                //this tag 'Album' and mark them all as out of date that way way RTK will make de-duplicate request
                invalidatesTags: (result, error, user)=>{
                    return [{type: 'UsersAlbums', id: user.id}];
                },
                query: (user)=> {
                    return {
                        url: '/albums',
                        method: 'POST',
                        body: {
                            userId: user.id,
                            title: faker.commerce.productName() //randomly generated title
                        }
                    };
                }
            }),
            fetchAlbums: builder.query({
                providesTags: (result, error, user)=>{ //evry query to fetch albums will be marked with this tag
                    const tags = result.map(album=> { //create tag for each album
                        return {type: 'Album', id: album.id}
                    });
                    tags.push({type: 'UsersAlbums', id: user.id}) //create a tag for each user
                    return tags;
                }, 
                query: (user)=>{ 
                    return {
                        url: '/albums',
                        params: {
                            userId: user.id,
                        },
                        method: 'GET',
                    };
                }
            }),
        }
    }

});


//NOTE: once we createApi, a slice is automatically created for us to store states related 
//to all the different requests added by API to handle requests

//export all the automatically created hooks
export const {
    useFetchAlbumsQuery, 
    useAddAlbumMutation, 
    useRemoveAlbumMutation} = albumsApi;

//export the endpoint as well
export {albumsApi};