import axios from 'axios'
import axiosAuthConfig from "~/assets/script/functions/axiosAuthConfig";

export default async function checkAuth(user: any) {
  try {
    if (user.id === 0) {
      let authToken = localStorage.getItem('token')

      console.log(authToken);

      if (!authToken) {
        return null
      }

      return await axios.post('/api/auth/valid-token/' + authToken, {}, {
        ...axiosAuthConfig(authToken, '', 'crm_client')
      })
        .then((data: any) => {
          if (!data.data.auth) {
            localStorage.removeItem('token')
            return null
          }
          return data.data.user
        })
    }
  } catch (e) {
    console.log(e)
  }
}
