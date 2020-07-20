import ajax from '@/utils/ajax'
import { getToken } from '@/utils/auth'

// 登录
export function login(account, password) {
  // const params = {
  //   account: account,
  //   password: password
  // }
  // return ajax.post('user/login', params)

  const params = {
    responseType: 4,
    account: account,
    password: password
  }

  return ajax.post('', params)
}

// 注册
export function register(email, validateCode, password, repassword) {
  const params = {
    responseType: 3,
    email: email,
    emailCode: validateCode,
    password: password,
    repassword: repassword
  }

  return ajax.post('', params)
}

// 获取用户信息
export function getUserInfo(params) {
  // return ajax.post('user/info', params)

  params = {
    responseType: 5
  }

  return ajax.post('', params)
}

// 退出登录
export function logout() {
  // return ajax.post('user/logout')
}

// 获取验证图片地址
export function getValidateCodeImage() {
  const params = {
    responseType: 1
  }

  return ajax.post('', params)
}

// 获取邮箱验证码
export function getEmailValidateCode(email, type) {
  const params = {
    responseType: 2,
    email: email,
    type: type// 0->注册 1->找回密码 2->解绑邮箱 3->绑定邮箱
  }

  return ajax.post('', params)
}

// 修改密码
export function modifyPassword(originalPassword, newPassword, repassword) {
  const params = {
    responseType: 8,
    oldPassword: originalPassword,
    newPassword: newPassword,
    reNewPassword: repassword
  }

  return ajax.post('', params)
}

// 判断邮箱是否存在
export function isEmailExist(email) {
  const params = {
    responseType: 10,
    email: email
  }

  return ajax.post('', params)
}

// 修改用户信息
export function modifyUserInfo(sex = null, birthday = null, address = null, nickName = null, avatar = null) {
  const formData = new FormData()
  formData.append('responseType', 14)
  formData.append('userId', getToken())

  if (sex != null) {
    formData.append('sex', sex)
  }

  if (birthday != null) {
    formData.append('birthday', birthday)
  }

  if (address != null) {
    formData.append('province', address)
  }

  if (nickName != null) {
    formData.append('nickName', nickName)
  }

  if (avatar != null) {
    formData.append('img', avatar)
  }

  return ajax.postForm('', formData)
}

// 获取企业信息
export function getEnterpriseInfo() {
  const params = {
    responseType: 16
  }

  return ajax.post('', params)
}

// 新增/修改企业信息
export function modifyEnterpriseInfo(name = null, country = null, license = null, phone = null, address = null, photo = null) {
  const formData = new FormData()
  formData.append('responseType', 17)
  formData.append('userId', getToken())

  if (name != null) {
    formData.append('name', name)
  }

  if (country != null) {
    formData.append('countryId', country)
  }

  if (license != null) {
    formData.append('businessLicense', license)
  }

  if (phone != null) {
    formData.append('phone', phone)
  }

  if (address != null) {
    formData.append('address', address)
  }

  if (photo != null) {
    formData.append('img', photo)
  }

  return ajax.postForm('', formData)
}

// 获取收货地址列表
export function getAddressList() {
  const params = {
    responseType: 18
  }

  return ajax.post('', params)
}

// 新增/修改收货地址
export function modifyReceiveAddress(name = null, province = null, city = null, district = null, detailAddress = null, phone = null, isDefault = null, mid = null) {
  const params = {
    responseType: 19
  }

  if (name != null) {
    params.name = name
  }

  if (province != null) {
    params.provincialCode = province
  }

  if (city != null) {
    params.cityCode = city
  }

  if (district != null) {
    params.areasCode = district
  }

  if (detailAddress != null) {
    params.address = detailAddress
  }

  if (phone != null) {
    params.phone = phone
  }

  if (isDefault != null) {
    params.is_default = isDefault
  }

  if (mid != null) {
    params.saId = mid
  }

  return ajax.post('', params)
}

// 删除收货地址
export function deleteReceiveAddress(mid) {
  const params = {
    responseType: 20,
    saId: mid
  }

  return ajax.post('', params)
}

// 获取省市区列表
export function getRegionList(type = null, code = null) {
  const params = {
    responseType: 21
  }

  if (type != null) {
    params.type = type
  }

  if (code != null) {
    params.code = code
  }

  return ajax.post('', params)
}

// 绑定/解绑邮箱
export function modifyEmail(type, email, validateCode) {
  const params = {
    responseType: 22,
    type: type, // 2->解绑邮箱 3->绑定邮箱
    email: email,
    emailCode: validateCode
  }

  return ajax.post('', params)
}

// 获取商品类型列表
export function getGoodsTypeList(type = 1) {
  const params = {
    responseType: 23,
    type: type
  }

  return ajax.post('', params)
}

// 获取商品列表
export function getGoodsList(type = null, isRecommend = 0, pageSize = null, pageIndex = null) {
  const params = {
    responseType: 24
  }

  if (type != null) {
    params.type = type
  }

  if (isRecommend != null) {
    params.is_rec = isRecommend
  }

  if (pageSize != null) {
    params.pre_page = pageSize
  }

  if (pageIndex != null) {
    params.page = pageIndex
  }

  return ajax.post('', params)
}

// 获取商品详情
export function getGoodsDetail(mid) {
  const params = {
    responseType: 25,
    goodsId: mid
  }

  return ajax.post('', params)
}

// 获取售后政策
export function getAfterSalePolicy() {
  const params = {
    responseType: 26
  }

  return ajax.post('', params)
}

// 获取购物车条数统计
export function getShopcartCount() {
  const params = {
    responseType: 36
  }

  return ajax.post('', params)
}

// 获取购物车列表
export function getShopcartList(shopcartId = null, pageIndex = null, pageSize = null) {
  const params = {
    responseType: 27
  }

  if (shopcartId != null) {
    params.scIdArr = shopcartId
  }

  if (pageIndex != null) {
    params.page = pageIndex
  }

  if (pageSize != null) {
    params.pre_page = pageSize
  }

  return ajax.post('', params)
}

// 修改购物车
export function modifyShopcart(count, shopcartId = null, goodsId = null) {
  const params = {
    responseType: 28,
    cnt: count
  }

  if (shopcartId != null) {
    params.shopCartId = shopcartId
  }

  if (goodsId != null) {
    params.goodsId = goodsId
  }

  return ajax.post('', params)
}

// 删除购物车
export function deleteShopcart(shopcartArray) {
  const params = {
    responseType: 29,
    scIdArr: shopcartArray
  }

  return ajax.post('', params)
}

// 生成订单
export function generateOrder(receiveId, shopcartArray = null, goodsId = null, count = null, remark = null, isInvoice = null, expressFee = null) {
  const params = {
    responseType: 30,
    shipId: receiveId
  }

  if (shopcartArray != null) {
    params.scIdArr = shopcartArray
  }

  if (goodsId != null) {
    params.goodsId = goodsId
  }

  if (count != null) {
    params.buyCnt = count
  }

  if (remark != null) {
    params.remake = remark
  }

  if (isInvoice != null) {
    params.isInvoice = isInvoice
  }

  if (expressFee != null) {
    params.fare = expressFee
  }

  return ajax.post('', params)
}

// 获取订单详情
export function getOrderDetail(mid) {
  const params = {
    responseType: 31,
    orderId: mid
  }

  return ajax.post('', params)
}

// 确认支付
export function confirmPayment(orderId, paymentId, remark = null) {
  const params = {
    responseType: 32,
    orderId: orderId,
    pmId: paymentId
  }

  if (remark != null) {
    params.payRemake = remark
  }

  return ajax.post('', params)
}

// 获取订单取消原因
export function getCancelOrderCause() {
  const params = {
    responseType: 33
  }

  return ajax.post('', params)
}

// 获取用户订单列表
export function getOrderList(type = 0, pageIndex = null, pageSize = null, keyword = null) {
  const params = {
    responseType: 35
  }

  params.type = type// 0->全部 1->待付款 2->待发货 3->待收货

  if (pageIndex != null) {
    params.page = pageIndex
  }

  if (pageSize != null) {
    params.pre_page = pageSize
  }

  if (keyword != null) {
    params.search = keyword
  }

  return ajax.post('', params)
}

// 确认收货
export function confirmReceive(orderId, password) {
  const params = {
    responseType: 37,
    orderId: orderId,
    pwd: password
  }

  return ajax.post('', params)
}

// 取消订单
export function cancelOrder(orderId, causeId, remark) {
  const params = {
    responseType: 34,
    orderId: orderId,
    orId: causeId
  }

  if (remark != null) {
    params.remake = remark
  }

  return ajax.post('', params)
}

// 获取广告列表
export function getAdvert(position = null, show = null) {
  const params = {
    responseType: 38
  }

  if (position != null) {
    params.position = position
  }

  if (show != null) {
    params.show = show
  }

  return ajax.post('', params)
}

// 邮箱重置密码
export function resetPasswordByEmail(validateCode, newPassword, repassword) {
  const params = {
    responseType: 39,
    emailCode: validateCode,
    newPassword: newPassword,
    reNewPassword: repassword
  }

  return ajax.post('', params)
}
