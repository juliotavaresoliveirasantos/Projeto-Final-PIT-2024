const express = require('express')
const cors = require('cors')

/* rotas */
const eventoRoutes = require('./routers/EventosRoutes')
const despesaRoutes = require('./routers/DespesasRoutes')
const doadorRoutes = require ('./routers/DoadoresRoutes')
const doacaoRoutes = require ('./routers/DoacoesRoutes')
const membroRoutes = require ('./routers/MembrosRoutes')

const app = express( )
const port = 3006
app.use(express.json( ))
app.use(cors( ))
app.use(eventoRoutes)
app.use(despesaRoutes)
app.use(doadorRoutes)
app.use(doacaoRoutes)
app.use(membroRoutes)
app.listen(port, ( ) => `Executando na porta ${port}`)