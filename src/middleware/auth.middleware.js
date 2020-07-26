
let count = 0
module.exports = {
     
      async validateUser(req, res, next) {

        console.log(`User ${count++} authorizated`)
        next();
    }
}