const Database = require("../database")

const database = new Database( )
class EventoModel {
    constructor(id, titulo, quantidade, data, datab, hora, horab){
        this.id = id
        this.titulo = titulo
        this.quantidade = quantidade
        this.data = data
        this.datab = datab
        this.hora = hora
        this.horab = horab
    }

    async obterTodos( ){
        const listaEventos = await database.ExecutaComando('select * from eventos ORDER BY titulo')
        return listaEventos
    }

    async obterPorId(id) {
        const result = await database.ExecutaComando('select * from eventos where id=? ',[id])
        return result[0]
    }

    async adicionar(dadosEvento){
        await database.ExecutaComandoNonQuery('insert into eventos set ?',dadosEvento)
    }

    async atualizar(id, dadosEvento){
        await database.ExecutaComandoNonQuery('update eventos set ? where id = ?',[
            dadosEvento,
            id
        ])
    }
    async delete (id){
        await database.ExecutaComandoNonQuery('delete from eventos where id = ?',[id])
    }

    async filtrar (termobusca) {
        const eventos = await database.ExecutaComando('select * from eventos where titulo like ?',
            [`%${termobusca}%`]
        )
        return eventos
    }
}

module.exports = EventoModel