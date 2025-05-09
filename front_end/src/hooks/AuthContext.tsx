import React, { createContext, useContext, useState }from 'react';
import { authService } from '../services/authService';
import { LoginCredentials, RegisterCredentials, User } from '../models/models';
import { storageHandler } from '../services/storageHandler';

interface AuthContextType {
    user: User | null;
    logUserIn: (credentials: LoginCredentials | string) => Promise<void>;
    registerUser: (credentials: RegisterCredentials) => Promise<void>;
    logUserOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType>({} as AuthContextType);

export const AuthProvider = ({ children }: { children: React.ReactNode}) => {
    console.log("AuthProvider rendered");
    const [user, setUser] = useState<User | null>(storageHandler.getUserFromStorage());

    const logUserIn = async (credentials: LoginCredentials | string) => {
        let user;
        if (typeof credentials === 'string') {
            user = await authService.googleLogAuth(credentials);
        }else {
            user = await authService.login(credentials);
        }
        setUser(user);
    };

    const registerUser = async (credentials: RegisterCredentials) => {
        const user = await authService.register(credentials);
        setUser(user);
    };

    const logUserOut = async () => {
        await authService.logout();
        setUser(null);
    };

    return <AuthContext.Provider value={{user, logUserIn, registerUser, logUserOut}}>
        {children}
    </AuthContext.Provider>
};

export const useAuth = (): AuthContextType => useContext(AuthContext);