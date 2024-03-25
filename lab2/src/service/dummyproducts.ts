import { GENERALCOLOR, CATEGORY } from './../helper/utils';
import { productConstructor } from '../helper/utils';
import { Product } from '../model/product';
import { ProductService } from './ProductService';
import { ProductError } from "../model/ProductError";


/* Hardcoded method for initialization of shoe objects*/

export function initShoes(service:ProductService){
    console.log("init shoes fren");

    const promises = [
    createProduct(service,"Foam Runners","Yeezy","Stone Salt",GENERALCOLOR.BEIGE,3495,"https://cdn.shopify.com/s/files/1/1626/5391/products/Yeezy-Foam-RNNR-Stone-Salt-Crepslocker-Front_970x.jpg?v=1670005153","https://cdn.shopify.com/s/files/1/1626/5391/products/Yeezy-Foam-RNNR-Stone-Salt-Crepslocker-Front-Side_970x.jpg?v=1670404734","https://cdn.shopify.com/s/files/1/1626/5391/products/Yeezy-Foam-RNNR-Stone-Salt-Crepslocker-Sole_970x.jpg?v=1670404734"),
    createProduct(service,"Foam Runners","Yeezy","MXT Moon Grey",GENERALCOLOR.GRAY,3495,"https://cdn.shopify.com/s/files/1/1626/5391/products/Yeezy-Foam-RNNR-MXT-Moon-Grey-Crepslocker-2048x2048-1_f47252b8-46a2-4987-a9f6-4428f8c197ca_970x.jpg?v=1648475497","https://cdn.shopify.com/s/files/1/1626/5391/products/Yeezy-Foam-RNNR-MXT-Moon-Grey-Crepslocker-2048x2048-2_1aea5deb-560b-4388-a7f5-0eac2aa597b5_970x.jpg?v=1648475497",),
    createProduct(service,"Air Jordan 1 Low","Nike","True Blue",GENERALCOLOR.BLUE,1249,"https://cdn.shopify.com/s/files/1/1626/5391/products/Air-Jordan-1-Low-True-Blue-_GS_-Crepslocker-Front_970x.jpg?v=1674236361","https://cdn.shopify.com/s/files/1/1626/5391/products/Air-Jordan-1-Low-True-Blue-_GS_-Crepslocker-Top_970x.jpg?v=1676626230","https://cdn.shopify.com/s/files/1/1626/5391/products/Air-Jordan-1-Low-True-Blue-_GS_-Crepslocker-Front-Side_970x.jpg?v=1674236361","https://cdn.shopify.com/s/files/1/1626/5391/products/Air-Jordan-1-Low-True-Blue-_GS_-Crepslocker-Back_970x.jpg?v=1676626230"),
    createProduct(service,"Air Jordan 1 Low","Nike","Green Toe",GENERALCOLOR.GREEN,4200,"https://cdn.shopify.com/s/files/1/1626/5391/products/Air-Jordan-1-Low-Green-Toe-Crepslocker-Front_56b39ac6-a7f7-4d5e-a7b9-c0b039ad9097_970x.jpg?v=1648461426","https://cdn.shopify.com/s/files/1/1626/5391/products/Air-Jordan-1-Low-Green-Toe-Crepslocker-Back-Side_970x.jpg?v=1648461426"),
    createProduct(service,"Travis Scott x Air Jordan 1 Low","Nike","OG SP Black Phantom",GENERALCOLOR.BLACK,10000,"https://cdn.shopify.com/s/files/1/1626/5391/products/Air-Jordan-X-Travis-Scott-1-Low-OG-SP-Black-Phantom-Crepslocker-Front_970x.jpg?v=1670490242","https://cdn.shopify.com/s/files/1/1626/5391/products/Air-Jordan-X-Travis-Scott-1-Low-OG-SP-Black-Phantom-Crepslocker-Front-Side_970x.jpg?v=1670490242","https://cdn.shopify.com/s/files/1/1626/5391/products/Air-Jordan-X-Travis-Scott-1-Low-OG-SP-Black-Phantom-Crepslocker-Back-Side_970x.jpg?v=1670490242","https://cdn.shopify.com/s/files/1/1626/5391/products/Air-Jordan-X-Travis-Scott-1-Low-OG-SP-Black-Phantom-Crepslocker-Back_970x.jpg?v=1670490242","https://cdn.shopify.com/s/files/1/1626/5391/products/Air-Jordan-X-Travis-Scott-1-Low-OG-SP-Black-Phantom-Crepslocker-Sole_970x.jpg?v=1670490242"),
    createProduct(service,"Dior x Air Jordan 1 Low","Nike","OG Grey",GENERALCOLOR.GRAY,149990,"https://cdn.shopify.com/s/files/1/1626/5391/products/DIOR-X-AIR-JORDAN-1-LOW-OG-GREY-SNEAKER-Crepslocker-Front_970x.jpg?v=1648204697"),
    createProductCategory(service,"1460 Bex ankle boots","Dr. Martens","Black",GENERALCOLOR.BLACK,CATEGORY.HIGH,2400,"https://cdn-images.farfetch-contents.com/18/16/77/50/18167750_39511025_1000.jpg","https://cdn-images.farfetch-contents.com/18/16/77/50/18167750_39511021_1000.jpg","https://cdn-images.farfetch-contents.com/18/16/77/50/18167750_39511020_1000.jpg","https://cdn-images.farfetch-contents.com/18/16/77/50/18167750_39511024_1000.jpg"),
    createProductCategory(service,"1460 Bex ankle boots","Dr. Martens","White",GENERALCOLOR.WHITE,CATEGORY.HIGH,2800,"https://cdn-images.farfetch-contents.com/18/11/24/01/18112401_38489716_1000.jpg","https://cdn-images.farfetch-contents.com/18/11/24/01/18112401_38491420_1000.jpg","https://cdn-images.farfetch-contents.com/18/11/24/01/18112401_38489714_1000.jpg","https://cdn-images.farfetch-contents.com/18/11/24/01/18112401_38518098_1000.jpg"),
    createProductCategory(service,"1460 Bex ankle boots","A-COLD-WALL* x Dr. Martens","White",GENERALCOLOR.WHITE,CATEGORY.HIGH,4000,"https://cdn-images.farfetch-contents.com/19/54/33/68/19543368_43561650_1000.jpg","https://cdn-images.farfetch-contents.com/19/54/33/68/19543368_43561649_1000.jpg","https://cdn-images.farfetch-contents.com/19/54/33/68/19543368_43561646_1000.jpg","https://cdn-images.farfetch-contents.com/19/54/33/68/19543368_43561648_1000.jpg"),
    createProduct(service,"Dunk Low","Off-White x Nike ","Lot 47 (White/Neutral Grey-Green Spark-Court Purple)",GENERALCOLOR.MULTICOLORED,7702 ,"https://cdn.shopify.com/s/files/1/1626/5391/products/Nike-x-Off-White-Dunk-Low-Lot-47-Crepslocker-Front_970x.jpg?v=1648146730"),
    createProduct(service,"Dunk Low","Off-White x Nike ","Lot 1 (White/Metallic Silver-Butter)",GENERALCOLOR.WHITE,18612 ,"https://cdn.shopify.com/s/files/1/1626/5391/products/Nike-x-Off-White-Dunk-Low-Lot-1-Crepslocker-Side_970x.jpg?v=1656786098"),
    createProduct(service,"Dunk Low","Off-White x Nike ","White/Pine Green-Pine Green",GENERALCOLOR.GREEN,12194 ,"https://cdn.shopify.com/s/files/1/1626/5391/products/Nike-x-Off-White-Dunk-Low-Pine-Green-Crepslocker-Front_970x.jpg?v=1672824872"),
    createProduct(service,"Dunk Low","Off-White x Nike ","Lot 32 (White/Neutral Grey-Chlorophyll-Game Royal)",GENERALCOLOR.MULTICOLORED,8985 ,"https://cdn.shopify.com/s/files/1/1626/5391/products/Nike-x-Off-White-Dunk-Low-Lot-32-Crepslocker-Front_a9293199-8e42-4a5c-85ac-13d8d401633e_970x.jpg?v=1648145863"),
    createProduct(service,"Dunk Low","Off-White x Nike ","Lot 45 (Sail/Neutral Grey/Magenta)",GENERALCOLOR.GRAY,7702 ,"https://cdn.shopify.com/s/files/1/1626/5391/products/Nike-x-Off-White-Dunk-Low-Lot-45-Crepslocker-Front_jpg_1_970x.jpg?v=1648146480"),
    createProduct(service,"Dunk Low","Off-White x Nike ","Lot 42 (Sail/Neutral Grey)",GENERALCOLOR.GRAY,7702 ,"https://cdn.shopify.com/s/files/1/1626/5391/products/Nike-x-Off-White-Dunk-Low-Lot-48-Crepslocker-Front_970x.jpg?v=1648146821"),
    createProduct(service,"Dunk Low","Off-White x Nike ","Lot 31 (Sail/Neutral Grey/Total Orange)",GENERALCOLOR.GRAY,-1 ,"https://cdn.shopify.com/s/files/1/1626/5391/products/Nike-x-Off-White-Dunk-Low-Lot-31-Crepslocker-Front_8c207da0-78fe-4afb-8bc1-85e81ab4e1fb_970x.jpg?v=1662471365"),
    createProduct(service,"Dunk Low","Off-White x Nike ","Lot 21 ( White/Neutral Grey-Yellow Strike-Fuchsia)",GENERALCOLOR.MULTICOLORED,6500 ,"https://cdn.shopify.com/s/files/1/1626/5391/products/Nike-x-Off-White-Dunk-Low-Lot-21-Crepslocker-Front_f1a90d88-734e-4432-b5d8-f077388543e4_970x.jpg?v=1648124822"),
    createProduct(service,"Dunk Low","Off-White x Nike ","Lot 34 (Sail/Neutral Grey/Light Ginger)",GENERALCOLOR.MULTICOLORED,8000 ,"https://cdn.shopify.com/s/files/1/1626/5391/products/Nike-x-Off-White-Dunk-Low-Lot-34-Crepslocker-Front_0f6a8c68-0c7a-4827-95a8-b23f607b6c48_970x.jpg?v=1656606927"),
    createProduct(service,"Dunk Low","Off-White x Nike ","Lot 50 ( Black/Metallic Silver-Black)",GENERALCOLOR.BLACK,17649 ,"https://cdn.shopify.com/s/files/1/1626/5391/products/Nike-x-Off-White-Dunk-Low-Lot-50-Crepslocker-Front_9aa53aed-8cc0-4228-9c87-f3f469d352e2_970x.jpg?v=1648146903"),
    createProduct(service,"Air Force 1 Low","Louis Vuitton x Nike ","White Royal Blue",GENERALCOLOR.BLUE,102618 ,"https://cdn.shopify.com/s/files/1/1626/5391/products/Louis-Vuitton-x-Nike-Air-Force-1-Low-White-Royal-Blue-Crepslocker-Front_970x.jpg?v=1669312605","https://cdn.shopify.com/s/files/1/1626/5391/products/Louis-Vuitton-x-Nike-Air-Force-1-Low-White-Royal-Blue-Crepslocker-Front-Side_970x.jpg?v=1669312605","https://cdn.shopify.com/s/files/1/1626/5391/products/Louis-Vuitton-x-Nike-Air-Force-1-Low-White-Royal-Blue-Crepslocker-Back-Side_970x.jpg?v=1669312605"),
    createProduct(service,"Air Force 1 Low","Louis Vuitton x Nike ","White Green",GENERALCOLOR.GREEN,83430 ,"https://cdn.shopify.com/s/files/1/1626/5391/products/Louis-Vuitton-x-Nike-Air-Force-1-Low-White-Green-Crepslocker-Front_970x.jpg?v=1659959400"),
    createProduct(service,"Air Force 1 Low","Louis Vuitton x Nike ","White Red",GENERALCOLOR.RED,80221 ,"https://cdn.shopify.com/s/files/1/1626/5391/products/Louis-Vuitton-x-Nike-Air-Force-1-Low-White-Red-Crepslocker-Front1_970x.jpg?v=1671699319","https://cdn.shopify.com/s/files/1/1626/5391/products/Louis-Vuitton-x-Nike-Air-Force-1-Low-White-Red-Crepslocker-Front-Side_970x.jpg?v=1671699319","https://cdn.shopify.com/s/files/1/1626/5391/products/Louis-Vuitton-x-Nike-Air-Force-1-Low-White-Red-Crepslocker-Back-Side_970x.jpg?v=1671699319","https://cdn.shopify.com/s/files/1/1626/5391/products/Louis-Vuitton-x-Nike-Air-Force-1-Low-White-Red-Crepslocker-Front_970x.jpg?v=1671699319","https://cdn.shopify.com/s/files/1/1626/5391/products/Louis-Vuitton-x-Nike-Air-Force-1-Low-White-Red-Crepslocker-Close-Up_970x.jpg?v=1671699291"),
    createProduct(service,"Monogram Denim Sneaker","Louis Vuitton","Green",GENERALCOLOR.GREEN,33495,"https://cdn.shopify.com/s/files/1/1626/5391/products/Louis-Vuitton-LV-Monogram-Green-Denim-Sneaker-Crepslocker-Front_9eb0212d-b15f-4008-8541-a2bd05bf3e09_970x.jpg?v=1652172991"),
    createProduct(service,"Monogram Denim Sneaker","Louis Vuitton","Navy",GENERALCOLOR.BLUE,53495,"https://cdn.shopify.com/s/files/1/1626/5391/products/Louis-Vuitton-LV-Monogram-Blue-Denim-Sneaker-Crepslocker-Front_a46429a1-c2f3-4478-9ccf-8fa31e2669bb_970x.jpg?v=1652172453"),
    createProduct(service,"Monogram Denim Sneaker","Louis Vuitton","Black",GENERALCOLOR.BLACK,43495,"https://cdn.shopify.com/s/files/1/1626/5391/products/Louis-Vuitton-LV-Monogram-Black-Denim-Sneaker-Front.jpg?v=1657542874"),
]
    console.log("promises resolving")
    Promise.all(promises).then(e => console.log("res",e)).catch(e => console.log("error",e))
    
}


const createProductCategory = async (service:ProductService,name:string, brand: string, color: string,generalColor:GENERALCOLOR, category:CATEGORY,price: number,...url:string[]):Promise<Product|ProductError>=>{
    const sizes =  [[{size: 43,amount: 42},{size: 44,amount: 42},{size: 45,amount: 42}],[{size: 40,amount: 42},{size: 41,amount: 0},{size: 43,amount: 0},{size: 44,amount: 42}],[{size: 35,amount: 42},{size: 36,amount: 42},{size: 37,amount: 42},{size: 38,amount: 42}],[{size: 41,amount: 42},{size: 42,amount: 42},{size: 43,amount: 42}], [ {size: 39,amount: 42},{size: 42,amount: 42},{size: 44,amount: 0},{size: 45,amount: 9} ]]
    const desc: string= "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Asperiores aspernatur ab reiciendis perspiciatis porro placeat saepe. Ea veritatis cupiditate vero!"

    const size = sizes[Math.floor(Math.random() * sizes.length)];
    const data: productConstructor = {name:name,brand:brand,description:desc,color:color,generalColor:(generalColor+"").toUpperCase(),price:price,category:category,stock:size,price_factor:1,images:url}

    const resp =  await service.addProduct(data)
    console.log(resp);
    
    return resp

}
const createProduct = async (service:ProductService,name:string, brand: string, color: string,generalColor:GENERALCOLOR, price: number,...url:string[]):Promise<Product|ProductError>=>{
    const sizes =  [[{size: 43,amount: 42},{size: 44,amount: 42},{size: 45,amount: 42}],[{size: 40,amount: 42},{size: 41,amount: 0},{size: 43,amount: 0},{size: 44,amount: 42}],[{size: 35,amount: 42},{size: 36,amount: 42},{size: 37,amount: 42},{size: 38,amount: 42}],[{size: 41,amount: 42},{size: 42,amount: 42},{size: 43,amount: 42}], [ {size: 39,amount: 42},{size: 42,amount: 42},{size: 44,amount: 0},{size: 45,amount: 9} ]]

    const size = sizes[Math.floor(Math.random() * sizes.length)];

    const desc: string= "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Asperiores aspernatur ab reiciendis perspiciatis porro placeat saepe. Ea veritatis cupiditate vero!"
    const data: productConstructor = {name:name,brand:brand,description:desc,color:color,generalColor:(generalColor+"").toUpperCase(),price:price,category:CATEGORY.LOW,stock:size,price_factor:1,images:url}
    const resp =  await service.addProduct(data)
    console.log("resp",resp);

    return resp

}