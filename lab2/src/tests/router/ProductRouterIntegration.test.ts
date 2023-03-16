
import { stockedSize } from './../../model/product';
import * as SuperTest from "supertest";
import { CATEGORY, hashize } from "../../helper/utils";

import { app } from "../../start";

const request = SuperTest.default(app);

test("End-to-end test", async () => {
  const stock: stockedSize[] = [{
    size:7,
        amount: 8,
  }];
  const desc = {
    productInformation:{
      name: "testingrouter",
      brand: "testingrouter",
      description: "testingrouter",
      color: "testingrouter",
      generalColor:"BLACK",
      category:'1',
      price: 1000,
      stock: stock,
      price_factor: 1,
      images: ["url"],
     }
  };


  const add_product_request = await request.post("/product").send(desc);
  console.log(add_product_request.statusCode);
  console.log(add_product_request.text);
  console.log("BODUID",add_product_request.body.id);

  
  expect(add_product_request.statusCode).toEqual(200);
  if(add_product_request.statusCode == 200){
  //else delete product too

  const res2 = await request.delete(`/product/${hashize("testingrouter".concat("testingrouter"))}`).send();//This is the resulting id of the hardcoded productdescription
  console.log(res2.statusCode);
  console.log(res2.text);
  
  expect(res2.statusCode).toEqual(200);
  
  }
});
