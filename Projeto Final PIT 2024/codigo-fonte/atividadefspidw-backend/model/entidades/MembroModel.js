const Database = require("../database")

const database = new Database( )
class MembroModel {
    constructor( id,nome, cpf, genero, telefone, email, endereco, ativo){
        this.id = id
        this.nome = nome
        this.cpf = cpf
        this.genero = genero
        this.telefone = telefone
        this.email = email
        this.endereco = endereco
        this.ativo = ativo
     
    }

    async listar( ){
        const listaMembros = await database.ExecutaComando('select * from membros ORDER BY nome')
        return listaMembros
    }

    async obterPorId(id) {
        const result = await database.ExecutaComando('select * from membros where id=? ',[id])
        return result[0]
    }

    async adicionar(dadosMembro){
        await database.ExecutaComandoNonQuery('insert into membros set ?', dadosMembro)
    }

    async atualizar(id, dadosMembro){
        await database.ExecutaComandoNonQuery('update membros set ? where id = ?',[
            dadosMembro,
            id
        ])
    }
    async delete (id){
        await database.ExecutaComandoNonQuery('delete from membros where id = ?',[id])
    }

    async filtrar (termobusca) {
        const membros = await database.ExecutaComando('select * from membros where nome like ?',
            [`%${termobusca}%`]
        )
        return membros
    }
}

module.exports = MembroModel