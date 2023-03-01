import { GENERALCOLOR } from './../helper/utils';
import { normalizeString, productConstructor } from '../helper/utils';
import {Product} from '../model/product'

export function initShoes():Map<string,Map<string,Product>>{
    const map: Map<string,Map<string,Product>> = new Map();
    
    const p1 = createProduct("Air Jordan 1 low","Nike","Royal Blue",GENERALCOLOR.BLUE,1249);
    const p2 = createProduct("Air Jordan 1 low","Nike","Celtic Green",GENERALCOLOR.GREEN,1249);
    const p3 = createProduct("Foam Runners","Yeezy","Sand",GENERALCOLOR.BEIGE,3495);
    const p4 = createProduct("Foam Runners","Yeezy","MXT Moon Grey",GENERALCOLOR.GRAY,3495);
    
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


const createProduct = (name:string, brand: string, color: string,generalColor:GENERALCOLOR, price: number):Product=>{
    const luh =  [
        {
            size: 42,
            amount: 42
        }
    ]
    return new Product(name,brand,"Shoes",color,generalColor,price,"Low Sneakers",luh,1,[`https://images.unsplash.com/photo-1587563871167-1ee9c731aefb?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1131&q=80`])

}