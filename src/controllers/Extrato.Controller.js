
const extratoService = require('../services/Extrato.service');
const static_group_token = "MWNlMzYwMTItN2NiNy00ZWU2LWI3OWEtMjA1ZmQyNzBjYjk5OmI2MTNhNDRlLTg5MDMtNDVkNC05ZjJjLTkwZWIzNjcwZDdiZg==";

module.exports = ExtratoController = {

    async obterExtratoDeTodasContas(req, res) {
        extratoService.getTodosExtratosDeTodasContas().then((retorno) => {
            res.json(retorno)
        });
    },

    async obterTodosExtratoDeUmaConta(req, res) {
        extratoService.getExtratoContaEspecifica(req.query).then((retorno) => {
            res.json(retorno)
        });
    },

    async obterTodosExtratoDeUmaConta(req, res) {
        extratoService.getExtratosContaEspecifica().then((retorno) => {
            res.json(retorno)
        });
    },

    async obterTransacoesExtratoConta(req, res) {
        extratoService.getTodosExtratosDeTodasContas().then((retorno) => {
            res.json(retorno)
        });
    }
        

}