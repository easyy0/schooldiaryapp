export function logoutController() {
    localStorage.removeItem("jwtToken")
    window.location.href = "../pages/login.html"
}