export function checkAuth(req: any, res: any, next: (err?: any) => any): any {
  try {

    return next();
  } catch (e) {

    return {
    }
  }
}