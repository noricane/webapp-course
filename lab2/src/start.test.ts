import * as SuperTest from "supertest"
import { productConstructor } from "../helper/utils"
import { stockedSize } from "./model/product"



import { app } from "./start"



const request = SuperTest.default(app)

test("End-to-end test", async ()=>{
    const stock:stockedSize = {
        size: 0,
        amount: 0
    }
    const desc:productConstructor = {name: "string",
        brand: "string",
        description: "string",
        color: "string",
        price: 10,
        category: "string",
        stock: [stock],
        price_factor: 10,
        url: ["url"]}

    const res1 = await request.post("/product").send(desc)
    expect(res1.statusCode).toEqual(200)
})