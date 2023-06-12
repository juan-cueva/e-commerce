import fs from "fs";

export default class ProductManager {
    id = 0;
    product = {}
    constructor(path) {
        this.path = path;
        this.products = [];
    }

    addProduct = async (producto) => {
        this.id++;
        producto.id = this.id;
        this.products.push(producto);
        await fs.promises.writeFile(this.path, JSON.stringify(this.products, null, '\t'), "utf-8")
        .then(console.log("Se guardó el producto"));
    };

    getProducts = async () => {
        let productsString = await fs.promises.readFile(this.path, "utf-8");
        let productsObj = JSON.parse(productsString);
        return await productsObj;
    }

    getProductById = async (id) => {
        let productsStr = await fs.promises.readFile(this.path, "utf-8");
        let productsObj = await JSON.parse(productsStr);
        console.log(productsObj);
        let product = await productsObj.find((p) => p.id === id);
        console.log(product);
        return await product;
    }

    updateProduct = async(id, producto) => {
        let index;
        this.products = JSON.parse(await fs.promises.readFile(this.path, "utf-8"));
        index = this.products.findIndex((pid) => pid.id === id);
        this.products[index] = {
            id: id,
            title: producto.title,
            description: producto.description,
            price: producto.price,
            thumbnail: producto.thumbnail,
            code: producto.code,
            stock: producto.stock
        };
        await fs.promises.writeFile(this.path, JSON.stringify(this.products, null, '\t'))
    }

    deleteProduct = async(id) => {
        this.products = await JSON.parse(fs.readFileSync(this.path, "utf-8"));
        this.products = this.products.filter((p) => p.id !== id);
        await fs.promises.writeFile(this.path, JSON.stringify(this.products, null, '\t'));
    }
}