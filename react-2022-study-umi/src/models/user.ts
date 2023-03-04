const user = {
  namespace: 'user',
  state: {
    user: ''
  },
  reducers: {
    login() {
      return {
        user: 'lxm'
      }
    },
    logout() {
      return {
        user: ''
      }
    }
  }
}
export default user