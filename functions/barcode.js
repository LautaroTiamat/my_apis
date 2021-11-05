const bx = require('barcode-js');

const analyzeBarcodes = async (url_file) => {
    return await bx.analyze(url_file, { type: 'PDF417' })
        .then(res => {
            if(res.length > 0){
                const newValue = res[0].value.replace('** UNLICENSED accusoft.com', '');
                res = newValue.split('@');

                const newDate = res[6].split('/');
                res[6] = newDate[0] + '-' + newDate[1] + '-' + newDate[2];

                return {
                    status: 1,
                    data: {
                        raw_information: newValue,
                        tramitnumber: res[0],
                        lastname: res[1],
                        name: res[2],
                        sex: res[3],
                        dni: res[4],
                        birthdate: res[6]
                    }
                }
            } else return { status: 2, message: 'DNI no válido.' };
        }).catch(() => {
            return { status: 0, message: 'Ocurrió un error al intentar leer la imágen del DNI.' }
        });
};

module.exports = {
    analyzeBarcodes
}