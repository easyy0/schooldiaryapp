import { createContext, useContext, useState } from "react";
import { Message } from "../typings/Message";

interface ActiveMessageContextType {
    readingMessage: Message | null;
    openMessage: (message: Message) => void;
    closeMessage: () => void;
}

const ActiveMessageContext = createContext<ActiveMessageContextType | undefined>(undefined);

export const ActiveMessageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [ readingMessage, setReadingMessage ] = useState<Message | null>(null);

    const openMessage = (message: Message) => setReadingMessage(message);
    const closeMessage = () => setReadingMessage(null);


    return (
        <ActiveMessageContext.Provider value={{ readingMessage, openMessage, closeMessage }}>
            {children}
        </ActiveMessageContext.Provider>
    )
}

export const useActiveMessage = () => {
    const context = useContext(ActiveMessageContext);
    if (!context) {
        throw new Error("useMessageDialog must be used within a MessageDialogProvider");
    }
    return context;
};