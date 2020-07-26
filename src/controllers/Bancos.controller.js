const bancosService = require('../services/Bancos.service');

module.exports = BancosController = {

    async getAllBanks(req, res) {
        bancosService.getBancosDoBrasil().then(resp => {
            res.json(resp);
        })
    }, 

}