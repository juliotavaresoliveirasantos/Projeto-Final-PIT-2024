
const DoadorController = require('../controller/DoadorController.js')
const doadorController = new DoadorController()
const express = require('express')
const router = express.Router()

router.get('/doadores', doadorController.obterTodos)
router.get('/doadores/:id', doadorController.obterPorId)
router.post('/doadores', doadorController.adicionar)
router.put('/doadores/:id', doadorController.atualizar)
router.delete('/doadores/:id', doadorController.excluir)
router.get('/doadores/filtrar/:termobusca', doadorController.filtrar)

// Nova rota para buscar doadores por nome
router.get('/doadores/buscar/:nome', doadorController.buscarPorNome)

module.exports = router
