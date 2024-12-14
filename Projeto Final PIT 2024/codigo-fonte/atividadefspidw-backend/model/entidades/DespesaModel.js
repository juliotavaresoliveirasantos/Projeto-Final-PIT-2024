const Database = require("../database")

const database = new Database( )
class DespesaModel {
    constructor(id, nome, tipo, duracao, valor, data, horario){
        this.id = id
        this.nome = nome
        this.tipo = tipo
        this.duracao = duracao
        this.valor = valor
        this.data = data
        this.horario = horario
    }

    async obterTodos( ){
        const listaDespesas = await database.ExecutaComando('select * from despesas ORDER BY nome')
        return listaDespesas
    }

    async obterPorId(id) {
        const result = await database.ExecutaComando('select * from despesas where id=? ',[id])
        return result[0]
    }

    async adicionar(dadosDespesa){
        await database.ExecutaComandoNonQuery('insert into despesas set ?',dadosDespesa)
    }

    async atualizar(id, dadosDespesa){
        await database.ExecutaComandoNonQuery('update despesas set ? where id = ?',[
            dadosDespesa,
            id
        ])
    }
    async delete (id){
        await database.ExecutaComandoNonQuery('delete from despesas where id = ?',[id])
    }

    async filtrar (termobusca) {
        const despesas = await database.ExecutaComando('select * from despesas where nome like ?',
            [`%${termobusca}%`]
        )
        return despesas
    }
}

module.exports = DespesaModel