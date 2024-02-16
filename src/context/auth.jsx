import { createContext, useEffect, useState } from "react";

export const AuthContext = createContext({});

export const AuthProvider =({ children }) => {
    const [user, setUser] = useState();

    useEffect(() => {
      const userToken = localStorage.getItem('user_token');
      const usersStorage = localStorage.getItem('users_db');

      if (userToken && usersStorage) {
        const hasUser = JSON.parse(usersStorage)?.filter(
            (user) => user.email === JSON.parse(userToken).email
        );

        if(hasUser) setUser(hasUser[0]);
      }
    }, []);

    const signin = (email, password) => {
        const usersStorage = JSON.parse(localStorage.getItem('users_db'));
        const hasUser = usersStorage?.filter((user) => user.email === email);
        const userAble = usersStorage?.find((user) => user.email === email);
        const name = userAble.name;

        if (hasUser?.length) {
            if (hasUser[0].email === email && hasUser[0].password === password) {
                const token = Math.random().toString(36).substring(2);
                localStorage.setItem('user_token', JSON.stringify({name, email, token}));
                setUser({email, password});
                return;
            } else {
                return 'Email ou senha incorretos';
            }
        } else {
            return 'Usuário não cadastrado';
        }
    };

    const signup = (name, email, password) => {
        const usersStorage = JSON.parse(localStorage.getItem('users_db'));
        const hasUser = usersStorage?.filter((user) => user.email === email);

        if (hasUser?.length) {
            return 'Email já cadastrado!';
        }

        let newUser;

        if (usersStorage) {
            newUser = [...usersStorage, {name, email, password}];
        } else {
            newUser = [{name, email, password}];
        }
        localStorage.setItem('users_db', JSON.stringify(newUser));
        return;
    };

    const signout = () => {
        setUser(null);
        localStorage.removeItem('user_token');
    };
    
    return <AuthContext.Provider
        value={{user, signed: !!user, signin, signout, signup}}
    >
        {children}
    </AuthContext.Provider>;
};