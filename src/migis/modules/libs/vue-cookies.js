import Vue from 'vue'
import VueCookies from 'vue-cookies'
import jwt from 'jsonwebtoken'

Vue.use(VueCookies)

export const encryptCookies = async (value) => {
  const encrypted = Buffer.from(value).toString('base64')
  return encrypted
};

export const decryptCookies = async (value) => {
  const decrypted = Buffer.from(value, 'base64').toString('utf-8')
  return decrypted
};

export const storeToken = async (token) => {
  const encryptedToken = await encryptCookies(token)
  Vue.$cookies.set('express-token', encryptedToken, process.env.VUE_APP_COOKIE_VALIDITY, null, null, false)
};

export const getToken = async () => {
  const encryptedCookies = Vue.$cookies.get('express-token')
  if(!encryptedCookies){
    return null 
  } else {
    const decryptedToken = await decryptCookies(encryptedCookies)
    return decryptedToken
  }
};

export const verifyToken = async () => {
  const token = await getToken()
  try {
    const decoded = jwt.verify(token, process.env.VUE_APP_KEY)
    return decoded
  } catch (e) {
    console.log(e)
    return null
  }
};

export const removeToken = async () => {
  const checkToken = await getToken()
  if(checkToken) Vue.$cookies.remove('express-token')
};

export const checkToken = async () => {
  const token = await getToken()
  return token !== null
}

