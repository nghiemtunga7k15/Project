import MyService from './../../service'
const UserApi = {
    register(params) {
      try {
        const  data  = MyService.postRequestData('/auth/register',params)
        return data;
      } catch (e) {
        console.error(e);
        return []
      }
    },
    login(params) {
      try {
        const  data  = MyService.postRequestData('/auth/basic',params)
        return data;
      } catch (e) {
        console.error(e);
        return []
      }
    },
    loginWithFacebook(email) {
      try {
        const  data  = MyService.getRequestData(`/auth/facebook-info?email=${email}`,{} , {})
        return data;
      } catch (e) {
        console.error(e);
        return []
      }
    },
    getInfo(token) {
      try {
        const  data  = MyService.getRequestData('/user',{}, token)
        return data;
      } catch (e) {
        console.error(e);
        return []
      }
    },
    updateInfo(update,token) {
      try {
        const  data  = MyService.patchRequestData('/user', update, token)
        return data;
      } catch (e) {
        console.error(e);
        return []
      }
    },
    generateTwoFa(token) {
      try {
        const  data  = MyService.postRequestData('/user/2fa/generate',{},token)
        return data;
      } catch (e) {
        console.error(e);
        return []
      }
    },
    onOffTwoFa(token, code) {
      try {
        const  data  = MyService.postRequestData('/user/2fa/generate',{code},token)
        return data;
      } catch (e) {
        console.error(e);
        return []
      }
    },
};

export default UserApi;