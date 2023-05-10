import {promises as fs} from "fs"

class ProductManager{
    constructor(){
        this.path = "./productos.txt"
        this.products = []
    }

    static id = 0

    addProducts = async (title, description, price, thumbnail, stock, code) => {
        ProductManager.id++
        const product = {
            title,
            description,
            price,
            thumbnail,
            stock,
            code,
            id: ProductManager.id
        }
        this.products.push(product)
        await fs.writeFile(this.path, JSON.stringify(this.products, null, "\t"))
    }

    readPorducts = async () => {
        const response = await fs.readFile(this.path, "utf-8")
        return JSON.parse(response)
    }

    getProducts = async () => {
        let response = await this.readPorducts()
        return response
    }

    getProductByCode = async (code) => {
        let response = await this.readPorducts()
        const result = response.find(prod => prod.code == code)
        if(!result) return "producto no encontrado"
        return result
    }

}

const products = new ProductManager()


const env = async () => {
    // products.addProducts("product1", "kakak", 1500, "imagen1.jpg", 15, 45456)
    // products.addProducts("product2", "kakak", 1500, "imagen2.jpg", 15, 45457)
    // products.addProducts("product3", "kakak", 1500, "imagen2.jpg", 15, 45458)
    // products.addProducts("product3", "kakak", 1500, "imagen2.jpg", 15, 45459)
    console.log(await products.getProductByCode(45458))
}

env()