
const transactionService = require('../services/Transacao.service');
const static_group_token = "MWNlMzYwMTItN2NiNy00ZWU2LWI3OWEtMjA1ZmQyNzBjYjk5OmI2MTNhNDRlLTg5MDMtNDVkNC05ZjJjLTkwZWIzNjcwZDdiZg==";

module.exports = TransacaoController = {

    async obterTransacoesConta(req, res) {
        transactionService.getTodasTransacoesDasContas().then((retorno) => {
            res.json(retorno)
        })
    },

    async obterTransacaoContaEspecifica(req, res) {
        transactionService.getTransacaoContaEspecifica(req.quer.final_token, req.query.account_id, ).then((retorno) => {
            res.json(retorno)
        })
    },  

}