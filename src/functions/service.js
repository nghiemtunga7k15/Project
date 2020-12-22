import axios from 'axios';
import  config  from './config';

const getHeaders = (token) => ({
  Accept: 'application/json',
  'Content-Type': 'application/json;charset=UTF-8',
  Authorization: `Token ${token}`,
});
const MyService = {
  async getRequestData(url, params, token) {
    let result;
    await axios({
      method: 'get',
      url: config.BASE_URL + url,
      headers: getHeaders(token),
      params,
    })
      .then((response) => {
        result = response.data;
      })
      .catch((error) => (result = error));
    return result;
  },
  async postRequestData(url, data) {
    let result;
    await axios
      .post(config.BASE_URL + url, data)
      .then((response) => {
        result = response.data;
      })
      .catch((error) => (result = error));
    return result;
  },

  async patchRequestData(url, data, token) {
     let result;
      await axios
        .patch(config.BASE_URL + url, data, {
          headers: getHeaders(token),
        })
        .then((response) => {
          result = response.data;
        })
        .catch((error) => (result = error));
    return result;
  },
  async deleteRequestData(url) {
    
  },
};

export default MyService;
