import md5 from "md5";

export default function generateMD5Hash(data){
    return md5(data);
}