
export const projectConfig = {
    clientURL: `${window.location.protocol}//${window.location.hostname}`,
    axios: {
        apiBaseUrl: process.env.VUE_APP_API_BASE_URL || "",
        refreshTokenPath: "/api/v1/auth/refresh",
        loginUrl: '/login',
        httpHeaders: {}
    }
}