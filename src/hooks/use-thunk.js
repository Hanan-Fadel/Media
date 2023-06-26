import { useDispatch } from "react-redux";
import { useState, useCallback } from "react";

function useThunk(thunk) {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const dispatch = useDispatch();

    const runThunk = useCallback((arg)=> {
        //run the thunk and dispatch it and update the loading and error states
        setIsLoading(true);
        dispatch(thunk(arg))
        .unwrap()
        .catch((err)=> setError(err))
        .finally(()=> setIsLoading(false));
    }, [dispatch, thunk])

    return [runThunk, isLoading, error];
}

export {useThunk};