/**
 * Передаваемые параметры
 *
 * auth_token - Токен авторизации
 *
 *
 *
 * */

export default function axiosAuthConfig(
  crm_auth_token: string | undefined = undefined,
  crm_api_token: string | undefined = undefined,
  crm_source: string | undefined = undefined
) {
  return {
    headers: {
      crm_authorized: crm_auth_token ? 'crm_auth_token ' + crm_auth_token : '',
      crm_allowed_api: crm_api_token ? 'crm_api_token ' + crm_api_token : '',
      crm_source_request: crm_source ? 'crm_source ' + crm_source : ''
    },
  }
}
