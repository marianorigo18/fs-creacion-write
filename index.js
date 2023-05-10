import {promises as fs} from "fs"

class ProductManager{
    constructor(){
        this.path = "./productos.txt"
    }

    static id = 0

    addProducts = async (title, description, price, thumbnail, stock, code) => {
        ProductManager.id++
        const products = {
            title,
            description,
            price,
            thumbnail,
            stock,
            code,
            id: ProductManager.id
        }
        console.log(products)
        await fs.writeFile(this.path, "Hello from txt")
    }

}

const products = new ProductManager()

products.addProducts("product1", "kakak", 1500, "imagen1.jpg", 15, 45456)