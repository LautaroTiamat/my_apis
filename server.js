const express = require('express');
const { analyzeBarcodes } = require('./functions/barcode');

const app = express();
const PORT = 5000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get('/', (req, res) => {
    res.send('Sywsorld S.A.');
});

app.post('/validate_dni_img', (req, res) => {
    analyzeBarcodes(req.body.url_img)
        .then(data => res.send(data))
        .catch(err => res.send({ status: 0, message: 'Error interno' }));
});

app.listen(PORT, () => {
    console.log(`🚀 Servidor iniciado en la ruta http://localhost:${PORT}`);
});