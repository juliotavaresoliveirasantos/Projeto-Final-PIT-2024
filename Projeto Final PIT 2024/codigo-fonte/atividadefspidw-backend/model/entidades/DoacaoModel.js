const Database = require("../database")

const database = new Database( )
class DoacaoModel {
    constructor( id,nome, cpf, tipo, descricao){
        this.id = id
        this.nome = nome
        this.cpf = cpf
        this.tipo = tipo
        this.descricao = descricao
     
    }

    async obterTodos( ){
        const listaDoacoes = await database.ExecutaComando('select * from doacoes ORDER BY nome')
        return listaDoacoes
    }

    async obterPorId(id) {
        const result = await database.ExecutaComando('select * from doacoes where id=? ',[id])
        return result[0]
    }

    async adicionar(dadosDoacao){
        await database.ExecutaComandoNonQuery('insert into doacoes set ?', dadosDoacao)
    }

    async atualizar(id, dadosDoacao){
        await database.ExecutaComandoNonQuery('update doacoes set ? where id = ?',[
            dadosDoacao,
            id
        ])
    }
    async delete (id){
        await database.ExecutaComandoNonQuery('delete from doacoes where id = ?',[id])
    }

    async filtrar (termobusca) {
        const doacoes = await database.ExecutaComando('select * from doacoes where nome like ?',
            [`%${termobusca}%`]
        )
        return doacoes
    }
}

module.exports = DoacaoModel