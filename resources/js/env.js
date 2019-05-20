export const server_url = "http://127.0.0.1:4444/"
export const user = localStorage.getItem("token") != null ? true : false
export const token = localStorage.getItem("token")
export const auth = user ? { headers: { "Authorization": "Bearer " + token } } : false
export function _removeUser() {
    if( user ) {
        localStorage.removeItem("token")
    }
}
export function _redirectJS(url) {
    window.location.href=url
}