
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
    name: "Jimmy B",
    email: "jb@jb.com",
    password: "its jb",
    phonenumber: '454545',
    birthdate: new Date(Date.now()),
    street: "JavaScript street ES8",
    city: "NYC",
    country: "USA",
    zip: "Zip",
};


  const add_user_request = await request.post("/user/register").send({user:desc});
  console.log(add_user_request.statusCode);
  console.log(add_user_request.text);
  console.log("EAMIL NEW USER",add_user_request.body);

  
  expect(add_user_request.statusCode).toEqual(200);
  if(add_user_request.statusCode == 200){
    const user_to_obj = JSON.parse(add_user_request.text)
  //else delete product too

  const res2 = await request.delete(`/user/${user_to_obj.email}`).send();//This is the resulting id of the hardcoded productdescription
  console.log(res2.statusCode);
  console.log(res2.text);
  
  expect(res2.statusCode).toEqual(200);
  
  }
});
