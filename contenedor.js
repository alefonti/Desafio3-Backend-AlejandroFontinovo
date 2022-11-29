const fs = require('fs')

class Contenedor {
    constructor(path) {
        this.file = path;
    }

    async getAll() {
        try {
            const elements = await fs.promises.readFile(this.file, 'utf-8');
            return JSON.parse(elements)
        } catch(err) {
            console.log(`Error: ${err}`);
        }
    }

    async saveFile(path, objects) {
        try {
            await fs.promises.writeFile(path, JSON.stringify(objects, null, 2));
        } catch(err) {
            console.log(`Error: ${err}`);
        }
    }

    async save(object) {
        const elements = await this.getAll();
        try {
            let newId;
            if (elements.length === 0) {
                newId = 1;
            } else {
                newId = elements[elements.length-1].id + 1;
            }
            const newElement = {id: newId, ...object}
            elements.push(newElement);
            await this.saveFile(this.file, elements);
            return newId;
        } catch(err) {
            console.log(`Error: ${err}`);
        }
    }


    async getById(id) {
        const elements = await this.getAll();
        try {
            const element = elements.find( prod => prod.id === id )
            return element ? element : null;
        } catch(err) {
            console.log(`Error: ${err}`);
        }
    }

    

    async deleteById(id) {
        let elements = await this.getAll();
        try {
            elements = elements.filter(prod => prod.id != id)
            await this.saveFile(this.file, elements);
        } catch(err) {
            console.log(`Error: ${err}`);
        }
    }

    async deleteAll() {
        await this.saveFile(this.file, [])
    }

}

module.exports = Contenedor;