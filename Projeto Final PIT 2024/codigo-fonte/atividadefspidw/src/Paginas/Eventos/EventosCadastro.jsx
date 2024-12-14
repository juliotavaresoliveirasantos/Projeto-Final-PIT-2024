import './EventosCadastro.css'
import {Container, Card, Button, Col, Form, Alert, Row} from 'react-bootstrap'
import {useEffect, useState} from "react"
import {FaArrowLeft, FaCheckCircle, FaFileUpload, FaRegSave} from "react-icons/fa"
import {Link, useParams} from "react-router-dom"
import EventoService from '../../services/EventoService'

const eventoService = new EventoService( )
function EventosCadastro ( ) {
    const [sucessoMensagem, setSucessoMensagem] = useState('')
    const [validated, setValidated] = useState(false)
    const [titulo, setTitulo] = useState("")
    const [quantidade, setQuantidade] = useState("")
    const [dataEvento, setDataEvento] = useState("")
    const [databEvento, setDatabEvento] = useState("")
    const [horaEvento, setHoraEvento] = useState("")
    const [horabEvento, setHorabEvento] = useState("")
    const [errors, setErrors] = useState({ })
    const {idEvento} = useParams( )

    useEffect(( )=> {
        const obterEvento = async ( )=> {
            const dados = await eventoService.obterPorId(idEvento)
            setTitulo(dados.titulo)
            setQuantidade(dados.quantidade)
            setDataEvento(new Date(dados.data).toISOString( ).slice(0,10))
            setDatabEvento(new Date(dados.datab).toISOString( ).slice(0,10))
            setHoraEvento(dados.hora)
            setHorabEvento(dados.horab)
        }
        if(idEvento!==undefined){
         obterEvento( )
        }
    })

    const handleTituloChange = (e) => {
        const value = e.target.value
            setTitulo(value)
            if(value && value.length<=50) {
                setErrors((prev)=>({...prev,titulo:null}))
            } else {
                if(value==="") {
                    setErrors((prev)=>({...prev,titulo:'Título do evento não pode estar vazio.'}))
                } else {
                    setErrors((prev)=>({...prev,titulo:'Título do evento não pode exceder 50 caracteres.'}))
                }
            }
    }

    const handleHoraEventoChange = (e) => {
        const value = e.target.value
            setHoraEvento(value)
            if(value && value.length<=50) {
                setErrors((prev)=>({...prev,horaEvento:null}))
            } else {
                if(value===""){
                    setErrors((prev)=>({...prev,horaEvento:'Horário de início do evento não pode estar vazio.'}))
                }
            }
    }

    const handleHorabEventoChange = (e) => {
        const value = e.target.value
            setHorabEvento(value)
            if(value && value.length<=50) {
                setErrors((prev)=>({...prev,horabEvento:null}))
            } else {
                if(value===""){
                    setErrors((prev)=>({...prev,horabEvento:'Horário de término do evento não pode estar vazio.'}))
                }
            }
    }

    const handleDataEventoChange = (e) => {
        const value = e.target.value
            setDataEvento(value)
            if(value && value.length<=50) {
                setErrors((prev)=>({...prev,dataEvento:null}))
            } else {
                if(value===""){
                    setErrors((prev)=>({...prev,dataEvento:'Data de início do evento não pode estar vazia.'}))
                }
            }
    }

    const handleDatabEventoChange = (e) => {
        const value = e.target.value
            setDatabEvento(value)
            if(value && value.length<=50) {
                setErrors((prev)=>({...prev,databEvento:null}))
            } else {
                if(value===""){
                    setErrors((prev)=>({...prev,databEvento:'Data de término do evento não pode estar vazia.'}))
                }
            }
    }

    async function handleSalvar(event) {
            event.preventDefault( )
            const form = event.currentTarget
            let newErrors = { }

            if(form.checkValidity( )===false) {
                event.stopPropagation( )
            }

            if(!titulo) {
                newErrors.titulo='Título do evento não pode estar vazio.'
            } else if(titulo.length>50) {
                newErrors.descricao='Título do evento não pode exceder 50 caracteres.'
            }

            if (!horaEvento) {
                newErrors.horaEvento='Horário de início evento não pode estar vazio.'
            }

            if (!horabEvento) {
                newErrors.horabEvento='Horário de término do evento não pode estar vazio.'
            }

            if (!dataEvento) {
                newErrors.dataEvento='Data de início do evento não pode estar vazia.'
            }

            if (!databEvento) {
                newErrors.databEvento='Data de término do evento não pode estar vazia.'
            }

            if (dataEvento > databEvento) {
                newErrors.databEvento='Data de término do evento não pode ser antes da data de início.'
            }

            if (horaEvento > horabEvento) {
                newErrors.horabEvento='Horário de término do evento não pode ser antes do horário de início.'
            }

            if(Object.keys(newErrors).length>0) {
                setErrors(newErrors)
            } else {
                const evento = {
                    id: 0,
                    titulo: form.tituloEvento.value,
                    quantidade: form.quantidadeEvento.value,
                    data: form.dataEvento.value,
                    datab: form.databEvento.value,
                    hora: form.horaEvento.value,
                    horab: form.horabEvento.value
                }
                console.log('evento',evento)

                if(idEvento===undefined) {
                    await eventoService.adicionar(evento)
                    setSucessoMensagem('Evento cadastrado com sucesso!')
                } else {
                    await eventoService.atualizar(idEvento, evento)
                    setSucessoMensagem('Evento atualizado com sucesso!')
                }

                
/*              const listaSalva = localStorage.getItem('evento')
                const eventos = listaSalva==null?[ ]:JSON.parse(listaSalva)
                evento.id = eventos.length+1
                eventos.push(evento)
                localStorage.setItem('evento',JSON.stringify(eventos)) */
            }
        setValidated(true)
    }

    return (<>
    <Button variant="secondary" as={Link} to='/eventos'><FaArrowLeft></FaArrowLeft> Voltar</Button>
    <br></br>
    <br></br>

    <Container className="mt-5">
    <div id="CardCadastroEvento">
    <Card>
    <Card.Header>
            <h1><FaFileUpload></FaFileUpload> Cadastro de eventos {idEvento}</h1>
    </Card.Header>


    <Card.Body>
    <Form noValidate validated={validated} onSubmit={handleSalvar}>

        <Row>
        <Col>
        <Card id="CardCapaEvento" style={{width:'18rem'}}>
        <h3 id="CapaTitulo">Capa do evento</h3>
        <Card.Img variant="top" src={require('./Imagens/up.png')}/><Form.Control type="file"/>
        </Card>
        </Col>

        <Col id="ColInfoEvento">
            <Col>
            <Form.Group controlId="tituloEvento">
                <Form.Label>Título</Form.Label>
                    <Form.Control
                        defaultValue={titulo}
                        type="text"
                        id="tituloEvento"
                        required
                        onChange={handleTituloChange}
                        isInvalid={!!errors.titulo}
                        />
                    <Form.Control.Feedback type="invalid">
                        {errors.titulo}
                    </Form.Control.Feedback>
            </Form.Group>
            </Col>
            <br></br>


            <Col>
            <Form.Group controlId="quantidadeEvento">
                <Form.Label>Quantidade de pessoas</Form.Label>
                    <Form.Select defaultValue={quantidade} required aria-label="Default select example">
                        <option value="50 pessoas">50 pessoas</option>
                        <option value="75 pessoas">75 pessoas</option>
                        <option value="100 pessoas">100 pessoas</option>
                        <option value="150 pessoas">150 pessoas</option>
                    </Form.Select>
                    <Form.Control.Feedback type="invalid">
                            Selecione a quantidade de pessoas
                    </Form.Control.Feedback>
            </Form.Group>
            </Col>
            <br></br>


            <Col>
            <Form.Group controlId="dataEvento">
                <Form.Label>Data de Início</Form.Label>
                    <Form.Control
                        type="date"
                        id="dataEvento"
                        required
                        defaultValue={dataEvento}
                        onChange={handleDataEventoChange}
                        isInvalid={!!errors.dataEvento}
                        />
                    <Form.Control.Feedback type="invalid">
                        {errors.dataEvento}
                    </Form.Control.Feedback>
            </Form.Group>
            </Col>
            <br></br>

            <Col>
            <Form.Group controlId="databEvento">
                <Form.Label>Data Final</Form.Label>
                    <Form.Control
                        type="date"
                        id="databEvento"
                        required
                        defaultValue={databEvento}
                        onChange={handleDatabEventoChange}
                        isInvalid={!!errors.databEvento}
                        />
                    <Form.Control.Feedback type="invalid">
                        {errors.databEvento}
                    </Form.Control.Feedback>
            </Form.Group>
            </Col>
            <br></br>

            <Col>
            <Form.Group controlId="horaEvento">
                <Form.Label>Horário de Início</Form.Label>
                    <Form.Control
                    type="time"
                    id="horaEvento"
                    required
                    defaultValue={horaEvento}
                    onChange={handleHoraEventoChange}
                    isInvalid={!!errors.horaEvento}
                    />
                    <Form.Control.Feedback type="invalid">
                        {errors.horaEvento}
                    </Form.Control.Feedback>
            </Form.Group>
            </Col>
            <br></br>

            <Col>
            <Form.Group controlId="horabEvento">
                <Form.Label>Horário Final</Form.Label>
                    <Form.Control
                    type="time"
                    id="horabEvento"
                    required
                    defaultValue={horabEvento}
                    onChange={handleHorabEventoChange}
                    isInvalid={!!errors.horabEvento}
                    />
                    <Form.Control.Feedback type="invalid">
                        {errors.horabEvento}
                    </Form.Control.Feedback>
            </Form.Group>
            </Col>
            <br></br>

        </Col>
        </Row>
        <Col>
        <div className="d-grid">
        <Button id="BotaoSalvarEvento" size="lg" type="submit" variant="success m-1"><FaRegSave></FaRegSave></Button>
        </div>
        </Col>
    </Form>
    </Card.Body>

    <Card.Footer>

    </Card.Footer>
    </Card>
    <br></br>
    </div>

    <Alert variant="success" show={sucessoMensagem!==""}><b><FaCheckCircle></FaCheckCircle> {sucessoMensagem}</b></Alert>
    </Container>
    </>);
}

export default EventosCadastro