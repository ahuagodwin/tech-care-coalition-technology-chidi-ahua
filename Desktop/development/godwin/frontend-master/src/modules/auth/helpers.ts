import TokenService from '@/services/token-service'
import AuthService from '@/services/auth-service'

export function setLogIn(data:any) {
  TokenService.saveToken(data.token)
  const user = data.user
  user.token = data.token
  user.permissions = data.permissions
  user.roles = data.roles
  AuthService.setLoggedInUser(user)
}

export function setCurrentUserAccount(user:any) {
  TokenService.saveToken(user.token)
  AuthService.setLoggedInUser(user)
}

export function userIsAvailable() {
  const user = AuthService.getLoggedInUser()
  return user?.id
}
