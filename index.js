import {promises as fs} from "fs"
const products = async () => {
    await fs.writeFile("./personas.txt", "hello from index")
    await fs.appendFile("./personas.txt", "\nbuin y tu?")
    const response = await fs.readFile("./personas.txt", "utf-8")
    console.log(response);
    // await fs.unlink("./personas.txt")
}

products();