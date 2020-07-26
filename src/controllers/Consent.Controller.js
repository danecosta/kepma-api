
const consentService = require('../services/Consent.service');
const static_group_token = "MWNlMzYwMTItN2NiNy00ZWU2LWI3OWEtMjA1ZmQyNzBjYjk5OmI2MTNhNDRlLTg5MDMtNDVkNC05ZjJjLTkwZWIzNjcwZDdiZg==";

module.exports = ConsentController = {

    async getConsentUserToken(req, res) {
        consentService.getPageToAccessToken(static_group_token).then(resp => {
            return res.send(resp)
        })
    },

    async getFinalToken(req, res) {
        consentService.getFinalToken(req.query.code).then(resp => {
            return res.send(resp)
        })
    },

   
    async getFirstConsent(req, res) {
     consentService.getFirstConsentTokenBankTwo(static_group_token).then(resp => {
          return res.send(resp); 
      })
    },

    async getSecondConsent(req, res) {
        console.log(2)
        consentService.getSecondConsentTokenBankTwo(static_group_token).then(resp => {
             return res.send(resp); 
         })
    },

    async getThirdConsent(req, res) {
        console.log(3)
        consentService.getThirdConsentTokenBankTwo(static_group_token).then(resp => {
             return res.send(resp); 
         })
    }


}