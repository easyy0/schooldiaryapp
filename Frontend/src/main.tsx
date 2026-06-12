import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import { BrowserRouter } from "react-router-dom";
import "./index.css";
import { HelmetProvider } from "react-helmet-async";
import ThemeProvider from "./theme/theme.tsx";
import { AuthProvider } from "./context/AuthContext.tsx";
import { UnreadMessagesCountProvider } from "./context/UnreadMessagesContext.tsx";
import { AccountProvider } from "./context/AccountContext.tsx";
import { ActiveMessageProvider } from "./context/ActiveMessageContext.tsx";

import { I18nextProvider } from "react-i18next";
import i18next from "./translations/i18n.ts";

ReactDOM.createRoot(document.getElementById("root")!).render(
    <React.StrictMode>
        <I18nextProvider i18n={i18next}>
            <BrowserRouter>
                <AccountProvider>
                    <AuthProvider>
                        <ThemeProvider>
                            <HelmetProvider>
                                <UnreadMessagesCountProvider>
                                    <ActiveMessageProvider>
                                        <App />
                                    </ActiveMessageProvider>
                                </UnreadMessagesCountProvider>
                            </HelmetProvider>
                        </ThemeProvider>
                    </AuthProvider>
                </AccountProvider>
            </BrowserRouter>
        </I18nextProvider>
    </React.StrictMode>
);
