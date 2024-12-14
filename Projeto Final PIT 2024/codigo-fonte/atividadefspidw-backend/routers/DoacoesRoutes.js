const DoacaoController = require('../controller/DoacaoController.js')
const doacaoController = new DoacaoController( )
const express = require('express')
const router = express.Router( )
router.get('/doacoes', doacaoController.obterTodos)
router.get('/doacoes/:id', doacaoController.obterPorId)
router.post('/doacoes', doacaoController.adicionar)
router.put('/doacoes/:id',doacaoController.atualizar)
router.delete('/doacoes/:id', doacaoController.excluir)
router.get('/doacoes/filtrar/:termobusca',doacaoController.filtrar)

router.get('/doacoes', async (req, res) => {
    try {
        const doacoes = await Doacao.findAll(); // Assumindo que `findAll` é compatível com o ORM ou driver em uso
        res.json(doacoes);
    } catch (error) {
        res.status(500).send({ error: 'Erro ao buscar doações' });
    }
});

module.exports = router