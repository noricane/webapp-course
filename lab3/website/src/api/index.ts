import { multiProduct } from './../model/user';
import axios, { Axios, AxiosError, AxiosResponse } from "axios";
import Cookies from "js-cookie";
import { config } from "../model/config";
import { Product } from "../model/product";
import { ProductError, User } from "../model/user";


export async function getProducts():Promise<Product[] | undefined>{
    try {
      let arr:Product[]= []
      const {data}:{data:Map<string,Map<string,Product>>} =  await axios.get(`${config.URL}/product`);
      Array.from(data.values()).forEach((e:any) => {
        e.value.forEach((element:any) => {
          arr.push(element.value)
        })
      })
      if( arr.length == 0 ) {return undefined}
      return arr
    } catch (error) {
      
    }
}
export async function getProduct(id:string,color:string):Promise<Product | undefined>{
    try {
      let arr:Product[]= []
      const {data}:{data:Product} =  await axios.get(`${config.URL}/product/${id}?color=${color}`);

      
      if (data != null) {
        return data
    }
      return undefined
    } catch (error) {
      
    }
}

export async function  registerUser(name:string,email:string,phonenumber:string,birthdate:Date,street:string,city:string,country:string,zip:string,password:string):Promise<true | string>{
    try {
        let message = ""
        console.log("In register");
        const user = {name:name, email:email,phonenumber:phonenumber, birthdate:birthdate, street:street, city:city, country:country, zip:zip, password:password}
        const {data}:{data:any} =  await axios.post(`${config.URL}/user/register`,{user:user}).catch((e:AxiosError) =>{
            e.response?.data == null ? message = e.message : message = e.response.data as string;
            throw new Error (message)
        });       
        console.log("data after get",data);
        
        if (data === true) {
            return true
            
      }else{
        const {message } = data
        return message
      }
      } catch (error:any) {
        return error
      }
}

export async function logInUser(em:string,pw:string):Promise<any>{

    const resp = await axios.post(`${config.URL}/user/login`,{
        email: em,
        password: pw
      }).then(e => {console.log("response",e); return e}
      ).catch((e:AxiosError) =>{
        throw new Error (e.response?.data == null ? e.message : e.response.data as string)})
      if(resp != null &&  typeof(resp.data) == "string" && resp.status != 200){
        throw new Error(resp.data);
        
      }
      const object = JSON.parse(decodeURIComponent(Cookies.get('user') as string)) 
      return object

}

export async function processOrder(email:string,order:multiProduct[]):Promise<string | multiProduct[] | {id:number, items:multiProduct[]}> {
  try {
    let msg = ""
    const resp = await axios.post(`${config.URL}/user/order`,{id:email,items:order})
    if(resp?.data.id != null && resp?.data.items != null){
        return resp.data
    }else if(Array.isArray(resp.data)){
      return resp.data
    }
    
    return msg
    
  } catch (e:any) {  
    console.log(e.data);
    
    let msg = ""
    typeof e.response?.data == "string" ? msg = e.response.data : msg = "Unknown error occured"
    if(msg != ""){
      return msg
    }
    return e as string
    
  }
}