const axios = require('axios');
const qs = require('qs');
const https = require('https');
const fs = require('fs');
const path = require('path');
var request = require("request");
var req = request.defaults();
const static_group_token = "MWNlMzYwMTItN2NiNy00ZWU2LWI3OWEtMjA1ZmQyNzBjYjk5OmI2MTNhNDRlLTg5MDMtNDVkNC05ZjJjLTkwZWIzNjcwZDdiZg==";
// const puppeteer = require('puppeteer');

module.exports = ConsentService = {
    //this.getThirdConsentTokenBankTwo(JSON.parse(second_result).ConsentId)

    async getPageToAccessToken() {
        primeiro_request = await this.getFirstConsentTokenBankTwo(static_group_token);
        segundo_request = await this.getSecondConsentTokenBankTwo(JSON.parse(primeiro_request).access_token)
        terceiro_request = await this.getThirdConsentTokenBankTwo(JSON.parse(segundo_request).Data.ConsentId)
        return terceiro_request;
    },

    async getFirstConsentTokenBankTwo(static_group_token) {

        const data = qs.stringify({
            'grant_type': 'client_credentials',
            'scope': `accounts openid`,
        });

        const resp = await req.post({
            uri: "https://as2.tecban-sandbox.o3bank.co.uk/token",
            cert: fs.readFileSync("/Users/mviniciusmarques/Downloads/TPP218/Banco_2/certs/client_certificate.crt"),
            key: fs.readFileSync("/Users/mviniciusmarques/Downloads/TPP218/Banco_2/certs/client_private_key.key"),
            body: data,
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'Authorization': `Basic ${static_group_token}`
            },
            form:
            {
                grant_type: 'client_credentials',
                scope: 'accounts openid'
            },
            rejectUnauthorized: false
        })

        return new Promise((resolve, reject) => {
            let retorno;
            resp.on('data', chunck => {
                console.log(` PRIMEIRO TOKEN ======= ${chunck.toString('utf8')}`)
                retorno = chunck.toString('utf8');
                resolve(retorno);
            })
        })
    },

    async getSecondConsentTokenBankTwo(access_token) {
        //access_token = '12420c0a-d957-44a2-b184-fa263dd6adaa'
        console.log(`ESTOU RECEBENDO ISSO AQUI ${access_token}`)
        const resp = await req.post({
            uri: "https://rs2.tecban-sandbox.o3bank.co.uk/open-banking/v3.1/aisp/account-access-consents",
            cert: fs.readFileSync("/Users/mviniciusmarques/Downloads/TPP218/Banco_2/certs/client_certificate.crt"),
            key: fs.readFileSync("/Users/mviniciusmarques/Downloads/TPP218/Banco_2/certs/client_private_key.key"),
            json: {
                "Data": {
                    "Permissions": [
                        "ReadAccountsBasic",
                        "ReadAccountsDetail",
                        "ReadBalances",
                        "ReadBeneficiariesBasic",
                        "ReadBeneficiariesDetail",
                        "ReadDirectDebits",
                        "ReadTransactionsBasic",
                        "ReadTransactionsCredits",
                        "ReadTransactionsDebits",
                        "ReadTransactionsDetail",
                        "ReadProducts",
                        "ReadStandingOrdersDetail",
                        "ReadProducts",
                        "ReadStandingOrdersDetail",
                        "ReadStatementsDetail",
                        "ReadParty",
                        "ReadOffers",
                        "ReadScheduledPaymentsBasic",
                        "ReadScheduledPaymentsDetail",
                        "ReadPartyPSU"]
                },
                "Risk": {}
            },
            headers: {
                'Content-Type': 'application/json',
                'x-fapi-financial-id': 'c3c937c4-ab71-427f-9b59-4099b7c680ab',
                'x-fapi-interaction-id': '66cd00a2-3d4f-45e8-bb3e-967f3a45f464',
                'Authorization': `Bearer ${access_token}`
            },
            rejectUnauthorized: false
        });

        return new Promise((resolve, reject) => {
            let retorno;
            resp.on('data', chunck => {
                console.log(`SEGUNDO TOKEN ============ ${chunck.toString('utf8')}`)
                retorno = chunck.toString('utf8');
                resolve(retorno);
            })
        });
    },

    async getThirdConsentTokenBankTwo(intent_id) {
        const base_url = `https://rs2.tecban-sandbox.o3bank.co.uk/`
        //const intent_id = `aac-65b94dce-6410-404f-9c74-bef3967efa64`;
        const resquest_scope = 'accounts'

        const resp = await req.get({
            uri: `${base_url}ozone/v1.0/auth-code-url/${intent_id}?scope=${resquest_scope}&alg=none`,
            cert: fs.readFileSync("/Users/mviniciusmarques/Downloads/TPP218/Banco_2/certs/client_certificate.crt"),
            key: fs.readFileSync("/Users/mviniciusmarques/Downloads/TPP218/Banco_2/certs/client_private_key.key"),
            headers: {
                'Authorization': `Basic ${static_group_token}`
            },
            rejectUnauthorized: false
        });

        return new Promise((resolve, reject) => {
            let retorno;
            resp.on('data', chunck => {
                console.log(`TERCEIRO TOKEN ============  ${chunck.toString('utf8')}`)
                retorno = chunck.toString('utf8');
                resolve(retorno);
            })
        });
    },

    async getFinalToken(code) {
        console.log(`======================== FINALIZAR AUTENTICACAO COM O CODE = ${code}  ========================`)
        const base_url = `https://as2.tecban-sandbox.o3bank.co.uk/token`;

        const data = qs.stringify({
            'grant_type': 'authorization_code',
            'scope': `accounts`,
            'code': `${code}`,
            'redirect_uri': `http://www.google.co.uk`
        });

        const resp = await req.post({
            uri: `${base_url}`,
            cert: fs.readFileSync("/Users/mviniciusmarques/Downloads/TPP218/Banco_2/certs/client_certificate.crt"),
            key: fs.readFileSync("/Users/mviniciusmarques/Downloads/TPP218/Banco_2/certs/client_private_key.key"),
            body: data,
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'Authorization': `Basic ${static_group_token}`
            },
            rejectUnauthorized: false
        })

        return new Promise((resolve, reject) => {
            let retorno;
            resp.on('data', chunck => {
                console.log(` ULTIMO TOKEN ======= ${chunck.toString('utf8')}`)
                retorno = chunck.toString('utf8');
                resolve(retorno);
            })
        })

    }






}