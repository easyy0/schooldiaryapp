import { CustomShadows } from "./custom-shadows";

declare module "@mui/material/styles" {
    interface Theme {
        customShadows: CustomShadows;
    }

    interface ThemeOptions {
        customShadows?: CustomShadows;
    }
}
