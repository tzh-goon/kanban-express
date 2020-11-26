export function sendErrorResp(res, status, errcode, errmsg, data) {
  res.status(status).json({ errcode, errmsg, data })
}

export function sendResp(res, data) {
  res.status(200).json({ errcode: '0', errmsg: 'ok', data })
}
