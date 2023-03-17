
import { stockedSize } from '../../model/product';
import * as SuperTest from "supertest";
import { CATEGORY } from "../../helper/utils";

import { app } from "../../start";
import { User } from '../../model/user';
import { addressType } from '../../model/adress';

const request = SuperTest.default(app);

test("End-to-end test", async () => {
  const stock: stockedSize[] = [{
    size:7,
        amount: 8,
  }];
  const desc = {
    name: "admin test admin test",
    email: "atat@admin.com",
    password: "admin2323",
   };


  const add_user_request = await request.post("/7b2e9f54cdff413fcde01f330af6896c3cd7e6cd/").send({admin:desc});
  console.log(add_user_request.statusCode);
  console.log(add_user_request.text);
  console.log("EAMIL NEW USER",add_user_request.body);

  
  expect(add_user_request.statusCode).toEqual(200);
  if(add_user_request.statusCode == 200){
    const user_to_obj = JSON.parse(add_user_request.text)
  //else delete product too

  const res2 = await request.delete(`/7b2e9f54cdff413fcde01f330af6896c3cd7e6cd/${desc.email}`).send();//This is the resulting id of the hardcoded productdescription
  console.log(res2.statusCode);
  console.log(res2.text);
  
  expect(res2.statusCode).toEqual(200);
  
  }
});
