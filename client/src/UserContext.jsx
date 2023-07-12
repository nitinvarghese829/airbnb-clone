import {createContext, useEffect, useState} from "react";
import axios from "axios";

export const UserContext = createContext({});

// eslint-disable-next-line react/prop-types
export const UserContextProvider = ({children}) => {
    const [user, setUser] = useState(null);
    const [search, setSearch] = useState('');
    useEffect(() => {
        if(!user){
           axios.get('/profile').then(({data}) => {
               console.log("data", data);
               setUser(data);
           });
        }
    }, [])
    return(
        <UserContext.Provider value={{user, setUser, search, setSearch}}>
            {children}
        </UserContext.Provider>
    );
}