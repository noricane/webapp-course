import * as SuperTest from "supertest";

import { app } from "./start";

const request = SuperTest.default(app);

test("End-to-end test", async () => {
  const stock = {
    size: 0,
    amount: 0,
  };
  const desc = {
    productInformation: {
      name: "string",
      brand: "strasfing",
      description: "strfing",
      color: "string",
      price: 10,
      category: "string",
      stock: [stock],
      price_factor: 10,
      url: ["url"],
    },
  };

  const res1 = await request.post("/product").send(desc);
  console.log(res1.statusCode);

  expect(res1.statusCode).toEqual(200);
});
