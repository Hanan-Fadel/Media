import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from 'axios';
const removeUser = createAsyncThunk('users/remove', async (user)=>{

    //const response = await axios.delete(`http://localhost:3005/users/${user.id}`);
    // return response.data; //empty (when we make a delete request the return response is empty)
    
    await axios.delete(`http://localhost:3005/users/${user.id}`);

    //DEV ONLY!!!
    await pause(3000); //make a pause for testing Loading...


    return user;
});

//DEV ONLY!!!
//Adding a Pause for testing in case of showing Loading... to the user
const pause = (duration) => {
    return new Promise((resolve)=> {
        setTimeout(resolve, duration);
    });
}

export {removeUser};