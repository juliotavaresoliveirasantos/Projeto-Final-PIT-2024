const MembrosController = require('../controller/MembrosController')
const membroController = new MembrosController( )
const express = require('express')
const router = express.Router( )

router.get('/membro', membroController.listar);
router.get('/membro/:id', membroController.obterPorId);
router.post('/membro', membroController.adicionar);
router.put('/membro/:id', membroController.atualizar);
router.delete('/membro/:id', membroController.excluir);
router.get('/membro/filtrar/:termobusca', membroController.filtrar);

module.exports = router;
