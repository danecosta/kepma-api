const express = require('express');
const swaggerUi = require('swagger-ui-express');
const authMiddleware = require('../src/middleware/auth.middleware')
const HealthCheckController = require('../src/controllers/HealthCheck.controller');
const swaggerDocument = require('../swagger.json');
const ConsentController = require('../src/controllers/Consent.Controller');
const BancosController = require('../src/controllers/Bancos.controller');
const SaldoService = require('../src/controllers/Saldo.controller');
const SaldoController = require('../src/controllers/Saldo.controller');

const routes = express.Router();
// routes.use('/api-docs', swaggerUi.serve);
// routes.get('/api-docs', swaggerUi.setup(swaggerDocument));
// routes.use(authMiddleware.validateUser);
routes.get('/health-check', HealthCheckController.index);

// ## TOKEN ## 

routes.get('/api/bank/first-token', ConsentController.getFirstConsent);
routes.get('/api/bank/second-token', ConsentController.getSecondConsent);
routes.get('/api/bank/third-token', ConsentController.getThirdConsent);
routes.get('/api/bank/page-auth-token', ConsentController.getConsentUserToken);
routes.get('/api/bank/final-token', ConsentController.getFinalToken);


// ## BANKS ## 

routes.get('/api/bank/all', BancosController.getAllBanks);
routes.get('/api/bank/all', BancosController.getAllBanks);
routes.get('/api/bank/all', BancosController.getAllBanks);

// ## SALDO ##

routes.get('/api/bank/saldo', SaldoController.obterSaldoDeTodasContas);
routes.get('/api/bank/saldo/conta', SaldoController.obterSaldoExtratoDeUmaConta);

// ## TRANSACAO ##


// ## EXTRATO ##


module.exports = routes;

