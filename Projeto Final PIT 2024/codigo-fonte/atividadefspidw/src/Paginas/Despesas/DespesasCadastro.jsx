import './DespesasCadastro.css'
import {Container, Card, Button, Col, Form, Alert, Row} from 'react-bootstrap'
import {useEffect, useState} from "react"
import {FaArrowLeft, FaCheckCircle, FaFileUpload, FaRegSave} from "react-icons/fa"
import {Link, useParams} from "react-router-dom"
import DespesaService from '../../services/DespesaService'

const despesaService = new DespesaService( )
function DespesasCadastro ( ) {
    const [sucessoMensagem, setSucessoMensagem] = useState('')
    const [validated, setValidated] = useState(false)
    const [nome, setNome] = useState("")
    const [tipo, setTipo] = useState("")
    const [duracaoDespesa, setDuracaoDespesa] = useState("")
    const [valorDespesa, setValorDespesa] = useState("")
    const [dataDespesa, setDataDespesa] = useState("")
    const [horarioDespesa, setHorarioDespesa] = useState("")
    const [errors, setErrors] = useState({ })
    const {idDespesa} = useParams( )

    useEffect(( )=> {
        const obterDespesa = async ( )=> {
            const dados = await despesaService.obterPorId(idDespesa)
            setNome(dados.nome)
            setTipo(dados.tipo)
            setDuracaoDespesa(dados.duracaoDespesa)
            setValorDespesa(dados.valor)
            setDataDespesa(dados.data)
            setHorarioDespesa(dados.horario)
        }
        if(idDespesa!==undefined){
         obterDespesa( )
        }
    })

    const handleNomeChange = (e) => {
        const value = e.target.value
            setNome(value)
            if(value && value.length<=50) {
                setErrors((prev)=>({...prev,nome:null}))
            } else {
                if(value==="") {
                    setErrors((prev)=>({...prev,nome:'Nome da despesa não pode estar vazio.'}))
                } else {
                    setErrors((prev)=>({...prev,nome:'Nome da despesa não pode exceder 50 caracteres.'}))
                }
            }
    }

    const handleHorarioDespesaChange = (e) => {
        const value = e.target.value
            setHorarioDespesa(value)
            if(value && value.length<=50) {
                setErrors((prev)=>({...prev,horaDespesa:null}))
            } else {
                if(value===""){
                    setErrors((prev)=>({...prev,horaDespesa:'Horário de cadastro da despesa não pode estar vazio.'}))
                }
            }
    }


    const handleDataDespesaChange = (e) => {
        const value = e.target.value
            setDataDespesa(value)
            if(value && value.length<=50) {
                setErrors((prev)=>({...prev,dataDespesa:null}))
            } else {
                if(value===""){
                    setErrors((prev)=>({...prev,dataDespesa:'Data de cadastro da despesa não pode estar vazia.'}))
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

            if(!nome) {
                newErrors.nome='Nome da despesa não pode estar vazio.'
            } else if(nome.length>50) {
                newErrors.descricao='Nome da despesa não pode exceder 50 caracteres.'
            }

            if (!horarioDespesa) {
                newErrors.horarioDespesa='Horário de cadastro da despesa não pode estar vazio.'
            }

            if (!dataDespesa) {
                newErrors.dataDespesa='Data de cadastro da despesa não pode estar vazia.'
            }


            if(Object.keys(newErrors).length>0) {
                setErrors(newErrors)
            } else {
                const despesa = {
                    id: 0,
                    nome: form.nomeDespesa.value,
                    tipo: form.tipoDespesa.value,
                    duracao: form.duracaoDespesa.value,
                    valor: form.valorDespesa.value,
                    data: form.dataDespesa.value,
                    horario: form.horarioDespesa.value
                }
                console.log('despesa',despesa)

                if(idDespesa===undefined) {
                    await despesaService.adicionar(despesa)
                    setSucessoMensagem('Despesa cadastrada com sucesso!')
                } else {
                    await despesaService.atualizar(idDespesa, despesa)
                    setSucessoMensagem('Despesa atualizada com sucesso!')
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
    <Button variant="secondary" as={Link} to='/despesas'><FaArrowLeft></FaArrowLeft> Voltar</Button>
    <br></br>
    <br></br>

    <Container className="mt-5">
    <div id="CardCadastroDespesa">
    <Card>
    <Card.Header>
            <h1><FaFileUpload></FaFileUpload> Cadastro de despesas {idDespesa}</h1>
    </Card.Header>


    <Card.Body>
    <Form noValidate validated={validated} onSubmit={handleSalvar}>

        <Row>
        <Col id="ColInfoDespesa">
            <Col>
            <Form.Group controlId="nomeDespesa">
                <Form.Label>Nome</Form.Label>
                    <Form.Control
                        defaultValue={nome}
                        type="text"
                        id="nomeDespesa"
                        required
                        onChange={handleNomeChange}
                        isInvalid={!!errors.nome}
                        />
                    <Form.Control.Feedback type="invalid">
                        {errors.nome}
                    </Form.Control.Feedback>
            </Form.Group>
            </Col>
            <br></br>


            <Col>
            <Form.Group controlId="tipoDespesa">
                <Form.Label>Tipo da despesa</Form.Label>
                    <Form.Select defaultValue={tipo} required aria-label="Default select example">
                        <option value="Despesa fixa">Despesa fixa</option>
                        <option value="Despesa variável">Despesa variável</option>
                        <option value="Despesa operacional">Despesa operacional</option>
                        <option value="Despesa não operacional">Despesa não operacional</option>
                    </Form.Select>
                    <Form.Control.Feedback type="invalid">
                            Selecione o tipo de despesa
                    </Form.Control.Feedback>
            </Form.Group>
            </Col>
            <br></br>

            <Col>
            <Form.Group controlId="duracaoDespesa">
                <Form.Label>Pagamento da despesa</Form.Label>
                    <Form.Select defaultValue={duracaoDespesa} required aria-label="Default select example">
                        <option value="Pagamento único">Pagamento único</option>
                        <option value="Dois pagamentos">Dois pagamentos</option>
                        <option value="Três pagamentos">Três pagamentos</option>
                        <option value="Quatro pagamentos">Quatro pagamentos</option>
                        <option value="Cinco pagamentos">Cinco pagamentos</option>
                        <option value="Seis pagamentos">Seis pagamentos</option>
                        <option value="Recorrente">Recorrente</option>
                    </Form.Select>
                    <Form.Control.Feedback type="invalid">
                            Selecione a duração da despesa
                    </Form.Control.Feedback>
            </Form.Group>
            </Col>
            <br></br>

            <Col>
            <Form.Group controlId="valorDespesa">
                <Form.Label>Valor</Form.Label>
                    <Form.Control
                        defaultValue={valorDespesa}
                        type="text"
                        id="valorDespesa"
                        required
                        isInvalid={!!errors.valor}
                        />
                    <Form.Control.Feedback type="invalid">
                        {errors.valor}
                    </Form.Control.Feedback>
            </Form.Group>
            </Col>
            <br></br>

            <Col>
            <Form.Group controlId="dataDespesa">
                <Form.Label>Data de cadastro</Form.Label>
                    <Form.Control
                        type="date"
                        id="dataDespesa"
                        required
                        defaultValue={dataDespesa}
                        onChange={handleDataDespesaChange}
                        isInvalid={!!errors.dataDespesa}
                        />
                    <Form.Control.Feedback type="invalid">
                        {errors.dataDespesa}
                    </Form.Control.Feedback>
            </Form.Group>
            </Col>
            <br></br>

            <Col>
            <Form.Group controlId="horarioDespesa">
                <Form.Label>Horário de cadastro</Form.Label>
                    <Form.Control
                    type="time"
                    id="horarioDespesa"
                    required
                    defaultValue={horarioDespesa}
                    onChange={handleHorarioDespesaChange}
                    isInvalid={!!errors.horarioDespesa}
                    />
                    <Form.Control.Feedback type="invalid">
                        {errors.horarioDespesa}
                    </Form.Control.Feedback>
            </Form.Group>
            </Col>
            <br></br>

        </Col>
        </Row>
        <Col>
        <div className="d-grid">
        <Button id="BotaoSalvarDespesa" size="lg" type="submit" variant="success m-1"><FaRegSave></FaRegSave></Button>
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

export default DespesasCadastro