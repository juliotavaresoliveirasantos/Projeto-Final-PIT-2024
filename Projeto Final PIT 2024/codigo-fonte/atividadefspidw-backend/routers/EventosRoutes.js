const EventoController = require('../controller/EventoController')
const eventoController = new EventoController( )
const express = require('express')
const router = express.Router( )
router.get('/evento', eventoController.obterTodos)
router.get('/evento/:id', eventoController.obterPorId)
router.post('/evento', eventoController.adicionar)
router.put('/evento/:id', eventoController.atualizar)
router.delete('/evento/:id', eventoController.excluir)
router.get('/evento/filtrar/:termobusca', eventoController.filtrar)

module.exports = router