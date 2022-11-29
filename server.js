const express = require('express');
const Contenedor = require('./contenedor')
const app = express();
const PORT = 8080;

const server = app.listen(process.env.PORT || PORT, () => {
    console.log(`Server funcionando en puerto ${PORT}`);
});

server.on('error', err => console.log(`error: ${err}`));

const products = new Contenedor('productos.txt');

app.get('/productos', async (req,res) => {
    const productsArray = await products.getAll();
    res.send(productsArray);
})


app.get('/productoRandom', async (req,res) => {
    const productsArray = await products.getAll();
    let randomNum = Math.floor(Math.random() * productsArray.length);
    res.send(productsArray[randomNum]);
})