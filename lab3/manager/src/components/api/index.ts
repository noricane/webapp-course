import { Admin, stockedSize } from "./../../model/config";
import { GENERALCOLOR, CATEGORY } from "./../../model/misc";
import axios, { AxiosError } from "axios";
import { config } from "../../model/config";
import Cookies from "js-cookie";
import { Product } from "../../model/product";

export async function registerUser(name:string,em: string, pw: string,): Promise<any> {
  const resp = await axios
  .post(`${config.URL}/7b2e9f54cdff413fcde01f330af6896c3cd7e6cd/`, {
    admin:{
      name:name,
    email: em,
    password: pw,
    }
  })
  .then((e) => {
    console.log("response", e);
    return e;
  })
  .catch((e: AxiosError) => {
    return(
      e.response?.data == null ? e.message : (e.response.data as string)
    );
  });
  if (typeof(resp) != "string" && typeof resp.data == "string" && resp.status != 200) {
    console.log("returning not string data");
    
    return (resp.data);
  } if(typeof(resp) != "string" && resp.status == 200){
    return true;
    
  }
  

  return resp;
}
export async function logInUser(em: string, pw: string): Promise<any> {
  const resp = await axios
    .post(`${config.URL}/7b2e9f54cdff413fcde01f330af6896c3cd7e6cd/login`, {
      email: em,
      password: pw,
    })
    .then((e) => {
      console.log("response", e);
      return e;
    })
    .catch((e: AxiosError) => {
      return e.response?.data == null ? e.message : (e.response.data as string);
    });
  if (resp != null && typeof resp == "string") {
    return resp;
  }
  if(resp.status != 200){
    return "Something went wrong"
  }
  let cookie = Cookies.get("user") as string;
  if (cookie == null) {
    return;
  }
  const object = JSON.parse(decodeURIComponent(cookie));
  console.log(object);

  return object;
}

export async function addProduct(
  name: string,
  brand: string,
  description: string,
  color: string,
  generalColor: GENERALCOLOR,
  category: CATEGORY,
  price: number,
  price_factor: number,
  stock: stockedSize[],
  images: string[]
): Promise<true | string> {
  try {
    console.log(generalColor);
    
    let msg = true;
    const resp = await axios.post(`${config.URL}/product/`, {
      productInformation: {
        name: name,
        brand: brand,
        description: description,
        color: color,
        generalColor: generalColor,
        category: category,
        price: price,
        price_factor: price_factor,
        stock: stock,
        images: images,
      },
    });
    console.log("resp",resp);

    return msg;
  } catch (error) {
    return error as string;
  }
}
export async function editProduct(
  name: string,
  brand: string,
  description: string,
  color: string,
  generalColor: GENERALCOLOR,
  category: CATEGORY,
  price: number,
  price_factor: number,
  stock: stockedSize[],
  images: string[]
): Promise<true | string> {
  try {
    let msg = true;
    console.log(generalColor);
    
    const resp = await axios.put(`${config.URL}/product/`, {
      productInformation: {
        name: name,
        brand: brand,
        description: description,
        color: color,
        generalColor: generalColor,
        category: category,
        price: price,
        price_factor: price_factor,
        stock: stock,
        images: images,
      },
    });
    console.log(resp);
    
    return msg;
  } catch (error) {
    return error as string;
  }
}

export async function getProduct(id:string):Promise<Product[] | undefined>{
  try {
    let arr:Product[]= []
    const {data}:{data:{key:string,value:Product}[]|string} = await axios.get(`${config.URL}/product/${id}`)
    if(typeof(data) == "string"){return}
    const list:Product[] = []
    console.log(data)
    data.forEach(e => list.push(e.value))
    return list

  } catch (error) {
    
  }
}
export async function getProductVariant(id:string,color:string):Promise<Product | undefined>{
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



export async function removeAdmin(id:string):Promise<Admin|string>{/* for now any */
  
 try {

    const {data}:{data:Admin|string} =  await axios.delete(`${config.URL}/7b2e9f54cdff413fcde01f330af6896c3cd7e6cd/${id}`);

    
      return data


  } catch (error) {
    return (error as string)
  }
}
export async function removeProduct(id:string):Promise<any>{/* for now any */
  
 try {
    let arr:Product[]= []
    const {data}:{data:Product} =  await axios.delete(`${config.URL}/product/${id}`);

    
    if (data != null) {
      return data
  }
    return undefined
  } catch (error) {
    
  }
}
export async function removeVariant(id:string,color:string):Promise<any>{/* for now any */
 try {
    let arr:Product[]= []
    const {data}:{data:Product} =  await axios.delete(`${config.URL}/product/${id}/${color}`);
    
    console.log("Here is data ",data);
  
    
    if (data != null) {
      return data
  }
    return undefined
  } catch (error) {
    
  }
}