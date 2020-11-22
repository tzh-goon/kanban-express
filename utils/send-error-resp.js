export function sendErrorResp(res, status, errcode = '0', errmsg = 'ok', data = null) {
  res.status(status).json({ errcode, errmsg, data })
}

export function sendResp(res, data) {
  res.status(200).json({ errcode: '0', errmsg: 'ok', data })
}
