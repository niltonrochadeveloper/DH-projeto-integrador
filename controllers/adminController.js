
const models = require('../models')

const controller = {
    index: async (req, res) => {
        try {
            if(req.session.authenticated && req.session.isAdmin) {
                res.render('admin/usuarios')
            } else {
                res.redirect('/')
            }
        } catch(erro) {
            res.redirect('/')
        }
    }
}


module.exports = controller


