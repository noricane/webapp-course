import { GENERALCOLOR } from './../helper/utils';
import { normalizeString, productConstructor } from '../helper/utils';
import {Product} from '../model/product'

export function initShoes():Map<string,Map<string,Product>>{
    const map: Map<string,Map<string,Product>> = new Map();
    
    const p1 = createProduct("Air Jordan 1 Low","Nike","Ashen Slate",GENERALCOLOR.BLUE,1249,"https://cdn.restocks.net/cdn-cgi/image/width=1000/storage/images/products/553558-414/1.png","https://cdn.restocks.net/cdn-cgi/image/width=1000/storage/images/products/553558-414/2.png");
    const p2 = createProduct("Air Jordan 1 Low","Nike","Pine Green",GENERALCOLOR.GREEN,1249,"https://cdn-images.farfetch-contents.com/15/27/64/90/15276490_26461606_1000.jpg","https://cdn-images.farfetch-contents.com/15/27/64/90/15276490_26461605_1000.jpg","https://cdn-images.farfetch-contents.com/15/27/64/90/15276490_26461607_1000.jpg","https://cdn-images.farfetch-contents.com/15/27/64/90/15276490_26461608_1000.jpg");
    const p3 = createProduct("Foam Runners","Yeezy","Sand",GENERALCOLOR.BEIGE,3495,"https://cdn.restocks.net/cdn-cgi/image/width=1000/storage/images/products/FY4567/1.png","https://cdn.restocks.net/cdn-cgi/image/width=1000/storage/images/products/FY4567/3.png","https://cdn.restocks.net/cdn-cgi/image/width=1000/storage/images/products/FY4567/4.png");
    const p4 = createProduct("Foam Runners","Yeezy","MXT Moon Grey",GENERALCOLOR.GRAY,3495,"https://cdn.shopify.com/s/files/1/0496/3971/9073/products/foamrunnermxt2_720x.jpg?v=1633515413","https://cdn.shopify.com/s/files/1/0496/3971/9073/products/foamrunnermxt_720x.jpg?v=1633515413");
    
    const lp = [p1,p2,p3,p4]

    lp.forEach(e => {
        const query = map.get(e.id)
        if( query != null){
            let elems: string[] = []
            const newColor = normalizeString(e.color);
            const innerQuery: Product | undefined =  query.get(newColor);
            console.log("before innerqery");
            
            if( innerQuery == null){
                query.set(newColor/**NORMALIZED STRING HERE */,e)
                console.log("Added new color");
                console.log("New map", query);
                
                return
            }return

        }
        const init: [string, Product] = [normalizeString(e.color),e]
        map.set(e.id,new Map([init]))
    })

    return map
}


const createProduct = (name:string, brand: string, color: string,generalColor:GENERALCOLOR, price: number,...url:string[]):Product=>{
    const luh =  [
        {
            size: 42,
            amount: 42
        }
    ]
    return new Product(name,brand,"Shoes",color,generalColor,price,"Low Sneakers",luh,.1,url)

}