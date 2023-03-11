import axios, { AxiosError } from "axios";
import { config } from "../../model/config";
import Cookies from "js-cookie";

export async function logInUser(em:string,pw:string):Promise<any>{

    const resp = await axios.post(`${config.URL}/7b2e9f54cdff413fcde01f330af6896c3cd7e6cd/login`,{
        email: em,
        password: pw
      }).then(e => {console.log("response",e); return e}
      ).catch((e:AxiosError) =>{
        throw new Error (e.response?.data == null ? e.message : e.response.data as string)})
      if(resp != null &&  typeof(resp.data) == "string" && resp.status != 200){
        throw new Error(resp.data);
        
      }
      let cookie = Cookies.get('user') as string;
      if(cookie == null){return}
      const object = JSON.parse(decodeURIComponent(cookie)) 
      console.log(object);
      
      return object

}