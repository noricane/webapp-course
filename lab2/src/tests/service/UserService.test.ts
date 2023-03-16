import { addressType } from './../../model/adress';
import { PastOrder } from './../../model/pastorder';
import { multiProduct } from '../../model/pastorder';


import { Product } from "../../model/product";
import { ProductError } from "../../model/ProductError";
import { makeProductService } from "../../service/ProductService";
import { makeUserService } from '../../service/UserService';
import { User } from '../../model/user';
import { arraysEqual, GENERALCOLOR } from '../../helper/utils';

const dependency_injection = makeProductService();
const test_env = makeUserService(dependency_injection);


test('Adds user to test_env and logs newly added user, then removes the user', async () => {
    
    const desc:User = {
        id: -1,
        name: "John Doe",
        email: "jd@node.com",
        password: "bananacandy25",
        phonenumber: '454545',
        birthdate: new Date(Date.now()),
        orders: [],
        adresses: [{
            id: Date.now(),
            addressType: addressType.DELIVERY,
            street: "JavaScript street ES8",
            city: "NYC",
            country: "USA",
            zip: "Zip",
        }],

    };
    //Will add
    const add_user = await test_env.addUser(desc.name,desc.email,desc.password,desc.phonenumber,desc.birthdate,desc.adresses,...desc.orders)
    //Already exists product error


      
    expect(!(add_user instanceof ProductError)).toBeTruthy();
    
    if(add_user instanceof ProductError){return}
      /* Make sure this request is sent after res1 has been processed */
     const add_user2 = await test_env.addUser(desc.name,desc.email,desc.password,desc.phonenumber,desc.birthdate,desc.adresses,...desc.orders)
      /* Since we're sending the same object we should receive a 
          409 - Product already exists, did you mean to restock? message 
      */
      expect((add_user2 as ProductError).code ==  400).toBeTruthy();


    let id:string = (add_user as User).email
    

    const remove_user1 = await test_env.removeUser(id).then(e => {
      (async ()=>{
        const remove_user2 = await test_env.removeUser(id)//To make sure this is not called before res1 is finished
        console.log(remove_user2);
        
        expect((remove_user2 as ProductError).code ==  404).toBeTruthy();

      })()

      return e
    })
    console.log(remove_user1);
    
    expect(!(remove_user1 instanceof ProductError)).toBeTruthy();
    

});


test('Adds user to test_env and logs newly added user, gets the users orders and then removes the user', async () => {
    const fakeProduct:Product = {
        id: "fakeid",
        name: "testuserservice",
        brand: "testuserservice",
        description: "testuserservice",
        color: "testuserservice",
        generalColor:2,
        category:1,
        price: 1000,
        stock: [{
          size:4,
          amount: 26,
        }],
        price_factor: 1,
        images: ["url"],
    };
    
    
    const mockOrder:multiProduct[] = [{amount:6,size:4,item:fakeProduct}]
    const desc:User = {
        id: -1,
        name: "Jason Bourne",
        email: "jb@cia.com",
        password: "its jason bourne",
        phonenumber: '454545',
        birthdate: new Date(Date.now()),
        orders: [{id:Date.now()+1,items:mockOrder},{id:Date.now()+2,items:mockOrder},{id:Date.now()+3,items:mockOrder}],
        adresses: [{
            id: Date.now(),
            addressType: addressType.DELIVERY,
            street: "JavaScript street ES8",
            city: "NYC",
            country: "USA",
            zip: "Zip",
        }],

    };
    //Will add
    const add_user = await test_env.addUser(desc.name,desc.email,desc.password,desc.phonenumber,desc.birthdate,desc.adresses,...desc.orders)
    //Already exists product error
    expect(!(add_user instanceof ProductError)).toBeTruthy();

    if(add_user instanceof ProductError){return}
 
    let id:string = (add_user as User).email
    
    const orders = await test_env.getUserOrders(id)
    if(orders instanceof ProductError){return}

    (orders as PastOrder[]).forEach(element => {
        expect(arraysEqual(element.items,mockOrder))
    });
    const remove_user = await test_env.removeUser(id)
    console.log(remove_user);
    expect(!(remove_user instanceof ProductError)).toBeTruthy();
    

});

