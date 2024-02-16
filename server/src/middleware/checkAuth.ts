export function checkAuth(req: any, res: any, next: (err?: any) => any): any {
  try {
    const {} = req.cookies


    return next();
  } catch (e) {
    return res.send({
      message: 'Ошибка сервера',
      error: e
    })
  }
}