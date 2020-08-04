const getters = {
  language: state => state.app.language,
  keyword: state => state.app.keyword,
  token: state => state.user.token,
  avatar: state => state.user.avatar,
  name: state => state.user.name,
  email: state => state.user.email,
  roles: state => state.user.roles,
  immersive: state => state.theme.immersive,
  color: state => state.theme.color,
  opacity: state => state.theme.opacity,
  withHeader: state => state.theme.withHeader,
  withFooter: state => state.theme.withFooter
}
export default getters
