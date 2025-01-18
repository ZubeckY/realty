const config = {
  IS_PROD: true,
  //
  PORT: 4000,
  CLIENT_PORT: 3000,
  //
  API_URL: 'http://localhost',
  CLIENT_URL:  'http://localhost',
  //
  DB_HOST: 'localhost',
  DB_HOST_PROD: '31.129.98.120',

  DB_PORT: 5432,
  DB_USERNAME: 'postgres',
  DB_USERNAME_PROD: 'serverUser',

  DB_PASSWORD: 'root1234',
  DB_PASSWORD_PROD: 'mQBeWsb134',

  DB_DATABASE: 'realty',
  //
  JWT_ACCESS_SECRET: 'realtyPhraseAccessToken',
  JWT_REFRESH_SECRET: 'realtyPhraseRefreshToken',
  //
  SMTP_HOST: 'smtp.gmail.com',
  SMTP_PORT: 587,
  SMTP_USER: 'help.realtycrm@gmail.com',
  SMTP_PASSWORD: 'scry vpcs akwe lacf',
}
export default config
