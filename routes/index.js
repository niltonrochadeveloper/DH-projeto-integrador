const express = require('express')
const router = express.Router()

const indexController = require('../controllers/indexController')

//página inicial
router.get('/', indexController.index)
router.get('/area-de-trabalho/:id', indexController.areasdetrabalho)

router.get('/areas', indexController.areas)
router.get('/ajuda', indexController.ajuda)
router.get('/meu-perfil', indexController.meu_perfil)
router.get('/configuracoes', indexController.configuracoes)
router.get('/quadros', indexController.todos_os_quadros)
router.get('/tarefas', indexController.tarefas)


             
module.exports = router