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
        try {
            const response = await fs.readFile(this.path, "utf-8")
            return JSON.parse(response)
        } catch (error) {
            if (error.code === 'ENOENT') {
                return [] // Devuelve un arreglo vacío si el archivo no existe
            } else {
                throw error
            }
        }
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

    getProductById = async (id) => {
        let response = await this.readPorducts()
        const result = response.filter(prod => prod.id == id)
        return result
    }

    deleteProdcutcByCode = async (code) => {
        let response = await this.readPorducts()
        const result = response.filter(prod => prod.code !== code)
        await fs.writeFile(this.path, JSON.stringify(result, null, "\t"))
    }

    deleteProdcutcById = async (id) => {
        let response = await this.readPorducts();
        
        if (!Array.isArray(response)) {
          return console.log(`Error: 'response' is not an array.`);
        }
        
        const result = response.filter((prod) => prod.id !== id);
        
        await fs.writeFile(this.path, JSON.stringify(result, null, "\t"));
      }

    updateProduct = async ({id, ...product}) => {
        await this.deleteProdcutcById(id)
        let products = await this.readPorducts()
        let newProducts = [{...product, id}, ...products]
        await fs.writeFile(this.path, JSON.stringify(newProducts, null, "\t"))
        return "producto actualizado"
    }

}


//Se creará una instancia de la clase “ProductManager”
const products = new ProductManager()

const env = async () => {
    //Se llamará “getProducts” recién creada la instancia, debe devolver un arreglo vacío []
    // console.log(await products.getProducts())

    //Se llamará al método “addProduct” con los campos:title: “producto prueba”, description: ”Este es un producto prueba”, price:200, thumbnail:”Sin imagen” code:”abc123”, stock:25
    // products.addProducts("producto prueba", "Este es un producto prueba", 200, "Sin imagen", 25, "abc123")

    //El objeto debe agregarse satisfactoriamente con un id generado automáticamente SIN REPETIRSE
    // products.addProducts("producto prueba", "Este es un producto prueba", 200, "Sin imagen", 25, "abc123")
    // console.log(await products.getProducts())

    //Se llamará al método “getProductById” y se corroborará que devuelva el producto con el id especificado, en caso de no existir, debe arrojar un error.
    // console.log(await products.getProductById(1))
    //Se llamará al método “updateProduct” y se intentará cambiar un campo de algún producto, se evaluará que no se elimine el id y que sí se haya hecho la actualización.
    // console.log( await
    //     products.updateProduct(
    //         {
    //             title: 'producto prueba 2 actualizacion 2',
    //             description: 'Este es un producto prueba',
    //             price: 200,
    //             thumbnail: 'Sin imagen',
    //             stock: 25,
    //             code: 'abc123',
    //             id: 2
    //           }
    //     )
    // )
    //Se llamará al método “deleteProduct”, se evaluará que realmente se elimine el producto o que arroje un error en caso de no existir.
    console.log(await products.deleteProdcutcById(1));
}

env()