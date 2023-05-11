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

    deleteProdcutcByCode = async (code) => {
        let response = await this.readPorducts()
        const result = response.filter(prod => prod.code !== code)
        await fs.writeFile(this.path, JSON.stringify(result, null, "\t"))
    }

    deleteProdcutcById = async (id) => {
        let response = await this.readPorducts()
        const result = response.filter(prod => prod.id !== id)
        await fs.writeFile(this.path, JSON.stringify(result, null, "\t"))
    }

    updateProduct = async ({id, ...product}) => {
        await this.deleteProdcutcById(id)
        let products = await this.readPorducts()
        let newProducts = [{...product, id}, ...products]
        await fs.writeFile(this.path, JSON.stringify(newProducts, null, "\t"))

    }

}

const products = new ProductManager()


const env = async () => {
    // products.addProducts("product1", "kakak", 1500, "imagen1.jpg", 15, 45456)
    // products.addProducts("product2", "kakak", 1500, "imagen2.jpg", 15, 45457)
    // products.addProducts("product3", "kakak", 1500, "imagen2.jpg", 15, 45458)
    // products.addProducts("product3", "kakak", 1500, "imagen2.jpg", 15, 45459)
    // products.deleteProdcutcById(2)
    // console.log(await products.getProductByCode(45458))
    // products.deleteProdcutcByCode(45456)
    products.updateProduct(
        {
            title: 'product3',
            description: 'kakak',
            price: 2500,
            thumbnail: 'imagen2.jpg',
            stock: 15,
            code: 45459,
            id: 4
          }
    )
}

env()