export default function getAuthToken() {
  let authToken = localStorage.getItem('token')

  if (!authToken){
    authToken = sessionStorage.getItem('token')
  }
  return authToken ?? null
}