
import {FaCog, FaEdit, FaListAlt, FaPlusCircle, FaSearchPlus, FaTrash} from "react-icons/fa"
import {useEffect, useState} from "react"
import {Container, Card, Row, Col, Button, Form, Table} from "react-bootstrap"
import {Link} from 'react-router-dom'
import DoadorService from '../../services/DoadorService'

const doadorService = new DoadorService ( )
function Doadores ( ) {
    const [listaDoadores, setListaDoadores] = useState([ ])
    const [termoBusca, setTermoBusca] = useState("")
    const handleBuscaChange = (event) => {
        setTermoBusca(event.target.value)
    }

    const handleFiltrar = async ( )=> {
        await listarDoadores(termoBusca)
    }

    const listarDoadores = async (termoBusca) => {
        let dados = []
        if(termoBusca) {
            dados = await doadorService.filtrar(termoBusca)
            setListaDoadores(dados)
        } else {
            dados = await doadorService.obterTodos( )
            setListaDoadores(dados)
        }

    }

    useEffect(( )=>{
        listarDoadores ( )
    }, [ ])
/*         const listaSalva = localStorage.getItem('evento')
            if(listaSalva!=null) {
                setListaEventos(JSON.parse(listaSalva))
            } */


    const handleExcluir = async (id) => {
        if(window.confirm('Tem certeza que deseja excluir o doador?')) {
            await doadorService.delete(id)
            await listarDoadores( )
        }
    }
/*         const novosEventos = listaEventos.filter(evento => evento.id!==id)
        setListaEventos(novosEventos)
        localStorage.setItem('evento',JSON.stringify(novosEventos)) */


    return (<>
        <h1><FaListAlt></FaListAlt> Doadores</h1>

        <Container>

        <Col lg='12'>
                <div className="d-grid">
                <Button size="lg" as={Link} to='/doadores/novo' variant="primary"><FaPlusCircle></FaPlusCircle></Button>
                </div>
        </Col>

        <br></br>
        </Container>
        <Container>
        <Card>
            <Card.Header as="h4">Doadores cadastrados</Card.Header>
            <Card.Body>
            <Row lg='12'>
                <div className="d-grid">
                <Form.Control type="text" onChange={handleBuscaChange} placeholder="Nome"></Form.Control>
                <Button onClick={handleFiltrar} variant="primary"><FaSearchPlus> Pesquisar</FaSearchPlus></Button>
                </div>
            </Row>
            <br></br>
            <Table striped bordered hover>
                <thead>
                    <tr>
                    <th>Código</th>
                    <th>Nome</th>
                    <th>CPF</th>
                    <th>Gênero</th>
                    <th>Telefone</th>
                    <th>Email</th>
                    <th>Endereço</th>
                    <th>Membro</th>
                    <th><FaCog></FaCog></th>
                    </tr>
                </thead>
                <tbody>
                    {
                        listaDoadores.length<=0? "Nenhuma doador registrado.":
                        listaDoadores.map(doador=>(
                        <tr>
                            <td>{doador.id}</td>
                            <td>{doador.nome}</td> 
                            <td>{doador.cpf}</td>
                            <td>{doador.genero}</td>
                            <td>{doador.telefone}</td>
                            <td>{doador.email}</td>
                            <td>{doador.endereco}</td>
                            <td>{doador.membro}</td>
                            <td id="BotoesTabela">
                                <Link to = {`/doadores/${doador.id}`} className="btn btn-warning m-1"><FaEdit></FaEdit> Alterar</Link>
                                <Button onClick={( )=> handleExcluir(doador.id)} className="btn btn-danger m-1"><FaTrash></FaTrash> Excluir</Button>
                            </td>
                        </tr>
                        ))
                    }
                </tbody>
            </Table>
            </Card.Body>
        </Card>
        </Container>
    </>)
}

export default Doadores