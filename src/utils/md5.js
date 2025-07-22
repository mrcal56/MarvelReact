import CryptoJS from "crypto-js";

const md5 = (value) => {
  return CryptoJS.MD5(value).toString();
};

export default md5;
