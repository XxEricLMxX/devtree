import { CorsOptions} from 'cors'

console.log(process.env.FRONTEND_URL)
export const corsConfig : CorsOptions = {
    origin: function(origin, callback){
        if(origin === process.env.FRONTEND_URL){
            callback(null, true)
        }else{
            callback(new Error('Error de CORS'))
        }
    }
}