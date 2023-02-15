import * as SuperTest from "supertest"
import { app } from '.'
import { Product } from "./model/product"



const request = SuperTest.default(app)

test("End-to-end test", async ()=>{
    const desc = "Test description"

    const res1 = await request.post("/product").send(desc)
    expect(res1.statusCode).toEqual(200)
})