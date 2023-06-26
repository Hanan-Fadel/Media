
import { useEffect} from "react";
import Button from './Button';

import {useSelector } from "react-redux";
import { fetchUsers, addUser } from "../store";
import Skeleton from "./Skeleton";

import { useThunk } from "../hooks/use-thunk";
import UsersListItem from "./UsersListItem";

function UsersList() {
    const [doFetchUsers, isLoadingUsers, loadingUsersError] = useThunk(fetchUsers);
    const [doAddUser, isCreatingUser, creatingUserError] = useThunk(addUser);

    const { data } =  useSelector((state)=> {
        return state.users; //it returns that objec {data: [], isLoading: false, error: null} so we need to districture it
    });

    useEffect(()=>{
        doFetchUsers();
        //setIsLoadingUsers(true); //to show the spinner while waiting the response

        // //run our thubk
        // dispatch(fetchUsers())
        // .unwrap()
        // // .then(()=> {
        // //     //will be called only if the request succeed 
        // // })
        // .catch((err)=> {
        //     //will be called only if the request fail
        //     setLoadingUsersError(err);
        // }).finally(()=>{
        //     //will be called whether the request succeeded or failed
        //     setIsLoadingUsers(false); //to hide spinner
        // });
        
    }, [doFetchUsers]);
    
    const handleUserAdd = ()=> {
        doAddUser();

        // setIsCreatingUser(true);

        // //run the addUser Thunk, returns a promise
        // dispatch(addUser())
        // .unwrap() //to get a normal Promise
        // .catch((err)=>{
        //     setCreatingUserError(err)
        // })
        // .finally(()=>{
        //     setIsCreatingUser(false); //hide the spinner
        // });
    };

    let content;
    if (isLoadingUsers) {
        content = <Skeleton times={6} className="h-10 w-full"/>;
    } else if (loadingUsersError) {
        content = <div>Error fetching data...</div>;
    } else {
        content = data.map((user)=>{
            return <UsersListItem  key={user.id} user={user}/>
        });
    }
    return <div>
        <div className="flex flex-row justify-between items-center m-3">
            <h1 className="m-2 text-xl">Users</h1>
            <Button loading={isCreatingUser} onClick={handleUserAdd}>+ Add User</Button>
            {creatingUserError && 'Error creating user...'}
        </div>
        {content}
    </div>
};

export default UsersList;