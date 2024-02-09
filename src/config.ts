const config = {
  PORT: envVal("PORT")
}

function envVal(key: string): string {
  let val = process.env[key]
  if (!val) {
    throw new Error("ENV " + key + " not set")
  }
  return val
}

function envValNullable(key: string): string | undefined {
  return process.env[key]
}

export default config