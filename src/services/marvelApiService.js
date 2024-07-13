import axios from "axios";
import md5 from "md5";

const publicKey = '723508964020f4e3b6a4c4e754fff222'
const privateKey = 'af7351300c1ee3d0361f9fbe2697f1746ed26cd1'
const baseURL = 'https://gateway.marvel.com/v1/public/characters'

const MarvelApiService = {
    async fetchCharacters(limit=80 , offset=0 , nameStartsWith = '' ) {
        const ts = new Date().getTime().toString();
        const hash = md5(ts + privateKey + publicKey)

        try{
            
              let params = {
                ts: ts,
                apikey: publicKey,
                hash: hash,
                limit: limit,
                offset: offset,
                orderBy: '-name', 
                
            };

            if(nameStartsWith.trim() !== ''){
                params.nameStartsWith = nameStartsWith.trim()
            }

            const response =  await axios.get(baseURL,{params})

            

            return response.data.data.results;
        }catch (error){
            console.error ('Error buscando personajes',error)
            throw error;

        }
    },


    async fetchCharacterById( characterId ) {
        const ts = new Date().getTime().toString();
        const hash = md5(ts + privateKey + publicKey)

        try{
            const response =  await axios.get(`${baseURL}/${characterId}`,{
                params : {
                    ts: ts,
                    apikey: publicKey,
                    hash: hash
                }
            });
            
            return response.data.data.results[0];
        }catch (error){
            console.error(`Error buscando personaje con ID ${characterId}`,error)
            throw error;

        }
    }
};

export default MarvelApiService;