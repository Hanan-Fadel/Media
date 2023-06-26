import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from 'axios';
import { faker } from "@faker-js/faker"; //a library to create a random name 

const addUser = createAsyncThunk('users/add', async ()=>{
    //create a user
    const response = await axios.post('http://localhost:3005/users', {
        name: faker.name.fullName() //create a random name using faker library
    });
   
      //DEV ONLY!!!
      await pause(3000); //make a pause for testing Loading...

    return response.data;
});

//DEV ONLY!!!
//Adding a Pause for testing in case of showing Loading... to the user
const pause = (duration) => {
    return new Promise((resolve)=> {
        setTimeout(resolve, duration);
    });
}

export {addUser};