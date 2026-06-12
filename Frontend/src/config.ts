export const Config = {
    API_URL: import.meta.env.VITE_API_URL ?? "http://localhost:8081",
    LAYOUT: {
        HEADER: {
            H_MOBILE: 64,
            H_DESKTOP: 80,
            H_DESKTOP_OFFSET: 80 - 16,
        },
        NAV: {
            WIDTH: 280,
        },
    },
};
