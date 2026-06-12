import React, { createContext, useContext, useState, useMemo, ReactNode } from 'react';
import { User } from '../typings/User';

type AccountContextType = {
    account: User | null;
    setAccount: (user: User) => void;
} | null;

const AccountContext = createContext<AccountContextType | undefined>(undefined);

interface AccountProviderProps {
    children: ReactNode;
}

export const AccountProvider: React.FC<AccountProviderProps> = ({ children }) => {
    const [account, setAccount] = useState<User | null>(null);

    const value = useMemo(() => ({ account, setAccount }), [account]);

    return (
        <AccountContext.Provider value={value}>
            {children}
        </AccountContext.Provider>
    );
};

export const useAccount = () => {
    const context = useContext(AccountContext);
    if (!context) {
        throw new Error('useAccount must be used within an AccountProvider');
    }
    return context;
};
