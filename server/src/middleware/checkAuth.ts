import TokenService from '../service/tokenService.js'
import SecurityService from '../service/securityService.js'

export async function checkAuth(req: any, res: any, next: (err?: any) => any) {
  try {
    let stepValid: number = 0

    const { crm_authorized, crm_allowed_api, crm_source_request } = req.headers
    const authorized = crm_authorized.split('crm_auth_token ')[1]

    // Проверяем авторизацию
    const validToken = new TokenService().validateAccessToken(authorized)
    if (validToken) {
      stepValid++
    }

    // Проверяем источник запроса
    const sourceRequest = crm_source_request.split('crm_source ')[1]
    switch (sourceRequest) {
      case 'crm_client':
        const data: any = await new SecurityService().checkDeviceUser(req)
        if (!data.message) stepValid++
        break
      case 'crm_api_client':
        const allowed_api = crm_allowed_api.split('crm_api_token ')[1]
        // todo allowed api validate

        stepValid++
        break
      default:
        break
    }

    return stepValid >= 2 ? next() : null
  } catch (e) {
    return res.send({
      message: 'Ошибка сервера',
      error: e,
    })
  }
}
