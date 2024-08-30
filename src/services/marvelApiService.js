import axios from "axios";
import md5 from "md5";

const publicKey = process.env.REACT_APP_MARVEL_PUBLIC_KEY;
const privateKey = process.env.REACT_APP_MARVEL_PRIVATE_KEY;
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
                orderBy: 'name', 
                
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
            if (error.response) {
                console.error(`Response data for ID ${characterId}:`, error.response.data);
                console.error('Response status:', error.response.status);
                console.error('Response headers:', error.response.headers);
            } else if (error.request) {
                console.error(`Request data for ID ${characterId}:`, error.request);
            } else {
                console.error('Error', error.message);
            }
            console.error('Config:', error.config);
            throw error;

        }
    }
};

export default MarvelApiService;