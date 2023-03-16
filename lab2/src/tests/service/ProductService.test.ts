import { PastOrder } from './../../model/pastorder';
import { multiProduct } from '../../model/pastorder';

import { arraysEqual, CATEGORY, GENERALCOLOR } from "../../helper/utils";
import { Product } from "../../model/product";
import { ProductError } from "../../model/ProductError";
import { makeProductService } from "../../service/ProductService";


const test_env = makeProductService()


test('Adds product to test_env and logs newly added product, then removes the product', async () => {
    const desc = {
          name: "testaddservice",
          brand: "testaddservice",
          description: "testaddservice",
          color: "testaddservice",
          generalColor:"BLACK",
          category:CATEGORY.LOW,
          price: 1000,
          stock: [{
            size:7,
            amount: 8,
          }],
          price_factor: 1,
          images: ["url"],
      };
    //Will add
    const res1 = await test_env.addProduct(desc)
    //Already exists product error
    

      
    expect(!(res1 instanceof ProductError)).toBeTruthy();
    
    if(res1 instanceof ProductError){return}
      /* Make sure this request is sent after res1 has been processed */
     const res2 = await test_env.addProduct(desc)
      /* Since we're sending the same object we should receive a 
          409 - Product already exists, did you mean to restock? message 
      */
      expect((res2 as ProductError).code ==  409).toBeTruthy();


    let id:string = ""
    
    if(!(res1 instanceof ProductError) && (res2 instanceof ProductError)){
      id = (res1 as Product).id
    }

    const res3 = await test_env.removeProduct(id).then(e => {
      (async ()=>{
        const res4 = await test_env.removeProduct(id)//To make sure this is not called before res1 is finished
        console.log(res4);
        
        expect((res4 as ProductError).code ==  404).toBeTruthy();

      })()

      return e
    })
    console.log(res3);
    
    expect(!(res3 instanceof ProductError)).toBeTruthy();
    

});
test('Queries the service for an updated version of the passed multiProduct array', async () => {
    const desc = {
          id:"testupdatecartservice",
          name: "testupdatecartservice",
          brand: "testupdatecartservice",
          description: "testupdatecartservice",
          color: "testupdatecartservice",
          generalColor:GENERALCOLOR.BLACK,
          category:CATEGORY.LOW,
          price: 1000,
          stock: [{
            size:7,
            amount: 8,
          }],
          price_factor: 1,
          images: ["url"],
      };

    const multiproduct:multiProduct[] = [{amount:0,size:0, item:desc}]
    //Will update
    const list =  await test_env.updateClientList(multiproduct)
    
    //This random product object doesn't exist on server, hence the list returned will be empty
    expect(list.length == 0).toBeTruthy();
});
test('Adds product and then proceeds to process order', async () => {
  const desc = {
    name: "testingorderservicelist",
    brand: "testingorderservicelist",
    description: "testingorderservicelist",
    color: "string",
    generalColor:"BLACK",
    category:CATEGORY.LOW,
    price: 1000,
    stock: [{
      size:7,
      amount: 8,
    }],
    price_factor: 1,
    images: ["url"],
};
  
//Will add
const add_res = await test_env.addProduct(desc)
expect(!(add_res instanceof ProductError)).toBeTruthy()
if(!(add_res instanceof ProductError)){
  const multiProduct: multiProduct[]= [{item:add_res,size:7,amount: 8,}]
  const process_res = await test_env.processOrder(...multiProduct)
  expect(arraysEqual(process_res,multiProduct)).toBeTruthy()
  const remove_res = await test_env.removeProduct(add_res.id)
  expect(!(remove_res instanceof ProductError)).toBeTruthy()
}

});

