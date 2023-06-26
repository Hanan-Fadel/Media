import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from 'axios';

//createAsyncThunk(
    //1st argument<base type used to generate the action type, i.e. pending, fullfilled, rejected....>,
    //2nd argument<arrow function>
//)
const fetchUsers = createAsyncThunk('users/fetch', async ()=> {
    //fetch data request
    const response = await axios.get('http://localhost:3005/users');

    //DEV ONLY!!!
    await pause(3000); //make a pause for testing Loading...

    return response.data; //this will be automatically assigned to the payload property of the fullfilled action type
}); 

//DEV ONLY!!!
//Adding a Pause for testing in case of showing Loading... to the user
const pause = (duration) => {
    return new Promise((resolve)=> {
        setTimeout(resolve, duration);
    });
};

export {fetchUsers};