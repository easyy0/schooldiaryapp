import React, { createContext, useContext, useState } from "react";

interface UnreadMessagesCountContextType {
    unreadMessagesCount: number;
    setUnreadMessagesCount: React.Dispatch<React.SetStateAction<number>>;
}

interface UnreadMessagesCountProviderProps {
    children: React.ReactNode;
}

const UnreadMessagesCountContext = createContext<UnreadMessagesCountContextType | undefined>(undefined);

export function UnreadMessagesCountProvider({
    children,
}: UnreadMessagesCountProviderProps) {
    const [unreadMessagesCount, setUnreadMessagesCount] = useState<number>(0);

    return (
        <UnreadMessagesCountContext.Provider
            value={{ unreadMessagesCount, setUnreadMessagesCount }}
        >
            {children}
        </UnreadMessagesCountContext.Provider>
    );
}

export function useUnreadMessagesCount() {
    const context = useContext(UnreadMessagesCountContext);
    if (!context) {
        throw new Error(
            "useUnreadMessagesCount must be used within an AuthProvider"
        );
    }
    return context;
}
