
const qs = require('qs');
const fs = require('fs');
const request = require("request");
const req = request.defaults();

module.exports = TransacaoService = {

    async getTodasTransacoesDasContas(final_token) {
        const base_url_rs = ` https://rs2.tecban-sandbox.o3bank.co.uk`

        const resp = await req.post({
        uri : `${base_url_rs}/open-banking/v3.1/aisp/transactions`,
        cert: fs.readFileSync("/Users/mviniciusmarques/Downloads/TPP218/Banco_2/certs/client_certificate.crt"),
        key: fs.readFileSync("/Users/mviniciusmarques/Downloads/TPP218/Banco_2/certs/client_private_key.key"),
        headers: {
            'Content-Type': 'application/json',
            'x-fapi-financial-id': 'c3c937c4-ab71-427f-9b59-4099b7c680ab',
            'x-fapi-interaction-id': '66cd00a2-3d4f-45e8-bb3e-967f3a45f464',
            'Authorization': `Bearer ${final_token}`
        },
        rejectUnauthorized: false
    });

    return new Promise ((resolve, reject) => { 
        let retorno;
        resp.on('data', chunck => {
            console.log(`TODOS OS SALDOS DE TODAS AS CONTAS ============ ${chunck.toString('utf8')}`)
            retorno = chunck.toString('utf8');
            resolve(retorno);
            })
       });
    },

    async getTransacaoContaEspecifica(final_token, account_id) {
        const base_url_rs = ` https://rs2.tecban-sandbox.o3bank.co.uk`

        const resp = await req.post({
        uri : `${base_url_rs}/open-banking/v3.1/aisp/${account_id}/transactions`,
        cert: fs.readFileSync("/Users/mviniciusmarques/Downloads/TPP218/Banco_2/certs/client_certificate.crt"),
        key: fs.readFileSync("/Users/mviniciusmarques/Downloads/TPP218/Banco_2/certs/client_private_key.key"),
        headers: {
            'Content-Type': 'application/json',
            'x-fapi-financial-id': 'c3c937c4-ab71-427f-9b59-4099b7c680ab',
            'x-fapi-interaction-id': '66cd00a2-3d4f-45e8-bb3e-967f3a45f464',
            'Authorization': `Bearer ${final_token}`
        },
        rejectUnauthorized: false
    });

    return new Promise ((resolve, reject) => { 
        let retorno;
        resp.on('data', chunck => {
            console.log(`TODOS OS SALDOS DE TODAS AS CONTAS ============ ${chunck.toString('utf8')}`)
            retorno = chunck.toString('utf8');
            resolve(retorno);
            })
       });
    },

}