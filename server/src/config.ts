const config = {
  PORT: 4000,
  //
  API_URL: 'http://localhost' + config.PORT,
  CLIENT_URL: 'http://localhost',
  //
  DB_HOST: 'localhost',
  DB_PORT: 5432,
  DB_USERNAME: 'postgres',
  DB_PASSWORD: 'root1234',
  DB_DATABASE: 'test_realty',
  //
  JWT_ACCESS_SECRET: 'realty_phrase_access_token',
  JWT_REFRESH_SECRET: 'realty_phrase_refresh_token',
  //
  SMTP_HOST: '',
  SMTP_PORT: '',
  SMTP_USER: '',
  SMTP_PASSWORD: '',
  //
}
export default config
