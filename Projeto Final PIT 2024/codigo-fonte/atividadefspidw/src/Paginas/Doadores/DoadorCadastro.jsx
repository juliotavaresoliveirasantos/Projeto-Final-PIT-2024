
import {Container, Card, Button, Col, Form, Alert, Row} from 'react-bootstrap'
import {useEffect, useState} from "react"
import {FaArrowLeft, FaCheckCircle, FaFileUpload, FaRegSave} from "react-icons/fa"
import {Link, useParams} from "react-router-dom"
import DoadorService from '../../services/DoadorService'

const doadorService = new DoadorService( )
function DoadorCadastro ( ) {
    const [sucessoMensagem, setSucessoMensagem] = useState('')
    const [validated, setValidated] = useState(false)
    const [nome, setNome] = useState("")
    const [cpf, setCpf] = useState("")
    const [genero, setGenero] = useState("")
    const [telefone, setTelefone] = useState("")
    const [email, setEmail] = useState("")
    const [endereco, setEndereco] = useState("")
    const [membro, setMembro] = useState("")
    const [errors, setErrors] = useState({ })
    const {idDoador} = useParams( )

    useEffect(( )=> {
        const obterDoador = async ()=> {
            const dados = await doadorService.obterPorId(idDoador)
            console.log('dados',dados)
            setNome(dados.nome)
            setCpf(dados.cpf)
            setGenero(dados.genero)
            setTelefone(dados.telefone)
            setEmail(dados.email)
            setEndereco(dados.endereco)
            setMembro(dados.membro)
        }
        if(idDoador!==undefined){
         obterDoador()
        }
    })

    const handleNomeChange = (e) => {
        const value = e.target.value
            setNome(value)
            if(value && value.length<=50) {
                setErrors((prev)=>({...prev,nome:null}))
            } else {
                if(value==="") {
                    setErrors((prev)=>({...prev,nome:'Nome do doador não pode estar vazio.'}))
                } else {
                    setErrors((prev)=>({...prev,nome:'Nome do doador não pode exceder 50 caracteres.'}))
                }
            }
    }

    const handleCpfChange = (e) => {
        const value = e.target.value
            setCpf(value)
            if(value && value.length<=50) {
                setErrors((prev)=>({...prev,cpf:null}))
            } else {
                if(value===""){
                    setErrors((prev)=>({...prev,cpf:'CPF não pode estar vazio.'}))
                }
            }
    }


    const handleGeneroChange = (e) => {
        const value = e.target.value
            setGenero(value)
            if(value && value.length<=50) {
                setErrors((prev)=>({...prev,genero:null}))
            } else {
                if(value===""){
                    setErrors((prev)=>({...prev,genero:'Genêro não pode estar vazio.'}))
                }
            }
    }
    const handleMembroChange = (e) => {
        const value = e.target.value;
        setMembro(value);
        if (!value) {
            setErrors(prev => ({ ...prev, membro: 'Membro é um campo obrigatório.' }));
        } else {
            setErrors(prev => ({ ...prev, membro: null }));
        }
    };

    async function handleSalvar(event) {
            event.preventDefault( )
            const form = event.currentTarget
            let newErrors = { }

            if(form.checkValidity( )===false) {
                event.stopPropagation( )
            }

            if(!nome) {
                newErrors.nome='Nome do doador não pode estar vazio.'
            } else if(nome.length>50) {
                newErrors.descricao='Nome do doador não pode exceder 50 caracteres.'
            }

            if (!cpf) {
                newErrors.cpf='CPF não pode estar vazio.'
            }

            if (!genero) {
                newErrors.genero='Gênero não pode estar vazio.'
            }

            if (!membro) {
                newErrors.membro='Membro não pode estar vazio.'
            }


            if(Object.keys(newErrors).length>0) {
                setErrors(newErrors)
            } else {
                const doador = {
                    id: 0,
                    nome: form.nomeDoador.value,
                    cpf: form.cpfDoador.value,
                    genero: form.generoDoador.value,
                    telefone: form.telefoneDoador.value,
                    email: form.emailDoador.value,
                    endereco: form.enderecoDoador.value,
                    membro: form.membroDoador.value
                }
                console.log('doador',doador)

                if(idDoador===undefined) {
                    await doadorService.adicionar(doador)
                    setSucessoMensagem('Doador cadastrado com sucesso!')
                } else {
                    await doadorService.atualizar(idDoador, doador)
                    setSucessoMensagem('Doador atualizado com sucesso!')
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
    <Button variant="secondary" as={Link} to='/doadores'><FaArrowLeft></FaArrowLeft> Voltar</Button>
    <br></br>
    <br></br>

    <Container className="mt-5">
    <div id="CardCadastroDoador">
    <Card>
    <Card.Header>
            <h1><FaFileUpload></FaFileUpload> Cadastro de doador {idDoador}</h1>
    </Card.Header>


    <Card.Body>
    <Form noValidate validated={validated} onSubmit={handleSalvar}>

        <Row>
        <Col id="ColInfoDoador">
            <Col>
            <Form.Group controlId="nomeDoador">
                <Form.Label>Nome</Form.Label>
                    <Form.Control
                        defaultValue={nome}
                        type="text"
                        id="nomeDoador"
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
            <Form.Group controlId="cpfDoador">
                <Form.Label>CPF</Form.Label>
                <Form.Control
                        defaultValue={cpf}
                        type="cpf"
                        id="cpfDoador"
                        required
                        onChange={handleCpfChange}
                        isInvalid={!!errors.cpf}
                        />
                    <Form.Control.Feedback type="invalid">
                        {errors.cpf}
                    </Form.Control.Feedback>
            </Form.Group>
            </Col>
            <br></br>

            <Col>
            <Form.Group controlId="generoDoador">
                <Form.Label>Gênero</Form.Label>
                    <Form.Select defaultValue={genero} onChange={handleGeneroChange} required aria-label="Default select example">
                        <option value="" hidden selected>Selecione o gênero</option>
                        <option value="masculino ">Masculino</option>
                        <option value=" feminino">Feminino</option>
                        <option value=" naodizer">Prefiro não dizer</option>
                        
                    </Form.Select>
                    <Form.Control.Feedback type="invalid">
                            Selecione o gênero do doador
                    </Form.Control.Feedback>
            </Form.Group>
            </Col>
            <br></br>

            <Col>
            <Form.Group controlId="telefoneDoador">
                <Form.Label>Telefone</Form.Label>
                    <Form.Control
                        defaultValue={telefone}
                        type="tel"
                        id="telefoneDoador"
                        required
                        
                        />
                    <Form.Control.Feedback type="invalid">
                        {errors.telefone}
                    </Form.Control.Feedback>
            </Form.Group>
            </Col>
            <br></br>

            <Col>
            <Form.Group controlId="emailDoador">
                <Form.Label>Email</Form.Label>
                    <Form.Control
                        type="email"
                        id="emailDoador"
                        required
                        defaultValue={email}
                        
                       
                        />
                    <Form.Control.Feedback type="invalid">
                        {errors.email}
                    </Form.Control.Feedback>
            </Form.Group>
            </Col>
            <br></br>

            <Col>
            <Form.Group controlId="enderecoDoador">
                <Form.Label>Endereço</Form.Label>
                    <Form.Control
                    type="local"
                    id="enderecoDoador"
                    required
                    defaultValue={endereco}
                    
                   
                    />
                    <Form.Control.Feedback type="invalid">
                        {errors.endereco}
                    </Form.Control.Feedback>
            </Form.Group>
            </Col>
            <br></br>

            <Col>
            <Form.Group controlId="membroDoador">
                <Form.Label>Membro</Form.Label>
                <Form.Select value={membro} onChange={handleMembroChange} required>
    <option value="" hidden>Selecione</option>
    <option value="Sim">Sim</option>
    <option value="Não">Não</option>
</Form.Select>
                    <Form.Control.Feedback type="invalid">
                            Selecione se o doador é um membro ou não
                    </Form.Control.Feedback>
            </Form.Group>
            </Col>
            <br></br>

        </Col>
        </Row>
        <Col>
        <div className="d-grid">
        <Button id="BotaoSalvarDespesa" width="100%" size="lg" type="submit" variant="success m-1"><FaRegSave></FaRegSave></Button>
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

export default DoadorCadastro