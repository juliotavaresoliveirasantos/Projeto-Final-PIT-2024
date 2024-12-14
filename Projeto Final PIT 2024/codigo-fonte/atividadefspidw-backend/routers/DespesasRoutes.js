const DespesaController = require('../controller/DespesaController.js')
const despesaController = new DespesaController( )
const express = require('express')
const router = express.Router( )
router.get('/despesa', despesaController.obterTodos)
router.get('/despesa/:id', despesaController.obterPorId)
router.post('/despesa', despesaController.adicionar)
router.put('/despesa/:id', despesaController.atualizar)
router.delete('/despesa/:id', despesaController.excluir)
router.get('/despesa/filtrar/:termobusca', despesaController.filtrar)

module.exports = router