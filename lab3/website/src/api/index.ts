import { multiProduct } from '../model/types';
import axios, { Axios, AxiosError, AxiosResponse } from "axios";
import Cookies from "js-cookie";
import { config } from "../model/config";
import { Product } from "../model/product";
import { ProductError, User } from "../model/types";

/* 
Get all products from backend*/
export async function getProducts():Promise<Product[]>{
    try {
      let arr:Product[]= []
      const {data}:{data:Map<string,Map<string,Product>>} =  await axios.get(`${config.URL}/product`);

      //Add all map entries to arr to return, should be in server but bugs were met while doing so, TODO try again
      Array.from(data.values()).forEach((e:any) => {
        e.value.forEach((element:any) => {
          arr.push(element.value)
        })
      })

      //Return array of all products if no error was met
      return arr
    } catch (error) {
      console.log(error);
      return []
    }
}

/* Update a list of multiProducts[], this will return the same 
list assuming that nothing has been deleted on the server. 
post request returns a list of multiProducts[], 
for each element
  if original  elements.amount less than or equal to server's value the same element is returned 
  else, a new element with amount set to the amount of available items is returned
 */
export async function getProductCollection(list:multiProduct[]):Promise<multiProduct[] | undefined>{
    try {
      const {data}:{data:multiProduct[]} =  await axios.post(`${config.URL}/product/updatecart`,{
        clientlist:list,
        /* Send cookie in body? */
      });
      return data
    } catch (error) {
      return undefined
    }
}

/* 
Return a specific product if it is found */
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

/* Register user and return true if successful else return  response string */
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

export async function getUserInfo(em:string):Promise<any>{
  const resp = await axios.get(`${config.URL}/user/${em}`,{
    headers: {
      'Content-Type': 'application/json'
    },
    withCredentials: true
  }).catch((e:AxiosError) =>{
    throw new Error (e.response?.data == null ? e.message : e.response.data as string)})
  console.log("email",em);
  
  console.log("getuserinfo resp",resp);
  
  const cookie = Cookies.get('user') as string;
  if(cookie == null){return false}
  const object = JSON.parse(decodeURIComponent(cookie)) 
  console.log("object",object);
  
  return object
}

/* 
Function for logging in user, takes an email and password as input and sends them to backend
Result is either a string or a User object */
export async function logInUser(em:string,pw:string):Promise<string | User>{
    let message:string = ""
    const resp = await axios.post(`${config.URL}/user/login`,{
        email: em,
        password: pw
      },{
        headers: {
          'Content-Type': 'application/json'
        },
        withCredentials: true
      }).catch((e:AxiosError) =>{
        console.log(e);
        
         message= (e.response?.data == null ? e.message : e.response.data as string)})
      
      if(message.length > 0){
        console.log(resp);
        return message
      }else{
        return resp?.data
      }
      


}

/* 
sends a request to the server to process that an order is valid, 
validity means that the order element's amount values don't exceed what is stocked in the server and of course that the items exist
if request is processed as valid it will return {id:order id  and items:list of purchacesd items} 
if error is met a string will be returned*/
export async function processOrder(email:string,order:multiProduct[]):Promise<string |??multiProduct[] |??{id:number, items:multiProduct[]}> {
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

/* 
Simple function for adding a newsletter subscriber */
export async function newsletterRequest(email:string):Promise<boolean> {
  try {
    console.log("eamils is",email);
    
    const resp = await axios.post(`${config.URL}/user/newsletter`,{email:email})
    console.log("resp",resp);    
    return true
    
  } catch (e:any) {  
    console.log(e.data);
    return false
    
  }
}

