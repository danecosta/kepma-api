
const saldoService = require('../services/Saldo.service');
const static_group_token = "MWNlMzYwMTItN2NiNy00ZWU2LWI3OWEtMjA1ZmQyNzBjYjk5OmI2MTNhNDRlLTg5MDMtNDVkNC05ZjJjLTkwZWIzNjcwZDdiZg==";

module.exports = Saldoontroller = {

    async obterSaldoDeTodasContas(req, res) {
        saldoService.getSaldosTodasContas(req.query.code).then((retorno) => {
            res.json(retorno)
        });
    },

    async obterSaldoExtratoDeUmaConta(req, res) {
        saldoService.getSaldoContaEspecifica().then((retorno) => {
            res.json(retorno)
        });
    },
        

}