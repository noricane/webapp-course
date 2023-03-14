import { GENERALCOLOR, CATEGORY } from './../helper/utils';
import { IProduct } from "../model/product";
import { makeProductService } from "./ProductService";


const test_env = makeProductService()


test('Adds product to test_env and logs newly added product', async () => {
    const desc = {
          name: "string",
          brand: "strasfing",
          description: "strfing",
          color: "string",
          generalColor:GENERALCOLOR.BLACK,
          category:CATEGORY.LOW,
          price: 10,
          stock: [{
            size: 0,
            amount: 0,
          }],
          price_factor: 10,
          url: ["url"],
      };
      const res1 = await test_env.addProduct(desc)

      const res2 = await test_env.addProduct(desc)
    expect(res1 instanceof Product).toBeTruthy();
    expect(res2 instanceof Product).toBeFalsy();

    let id:string = ""
    
    if(res1 instanceof Product){
        id = res1.id
    }

    const res3 = await test_env.removeProduct(id)
    expect(res3 instanceof Map).toBeTruthy();

});