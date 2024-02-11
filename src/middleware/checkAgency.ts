export function checkAgency(req: any, res: any, next: (err?: any) => any): any {
  try {
    const { authorization } = req.headers

    return next();
  } catch (e) {
    return {

    }
  }
}