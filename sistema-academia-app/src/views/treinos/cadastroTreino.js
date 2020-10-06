import React from 'react'

import { withRouter } from 'react-router-dom'
import Card from '../../components/card'
import FormGroup from '../../components/form-group'
import SelectMenu from '../../components/selectMenu'
import NavbarInstrutor from '../../components/navbar-instrutor'

import TreinoService from '../../app/service/treinoService'
import AlunoService from '../../app/service/alunoService'
import LocalStorageService from '../../app/service/localStorageService'

import { mensagemSucesso, mensagemErro, mensagemAlerta } from '../../components/toastr'

class CadastroTreinos extends React.Component {

    state = {
        alunos : [],
        aluno: '',
        nome: '',
        tipoTreino: ''
    }

    constructor() {
        super()
        this.treinoService = new TreinoService()
        this.alunoService = new AlunoService()
    }

    componentDidMount() {
        const usuarioLogado = LocalStorageService.obterItem('_usuario_logado')

        if (usuarioLogado == null) {
            mensagemAlerta('Por favor logar para acessar o sistema.')
            this.props.history.push('/login')
        } else if(usuarioLogado.tipoUsuario === 1) {
            mensagemAlerta('Você não tem permissão para acessar essa tela.')
            this.props.history.push('/home')
        } else {
            this.buscarTodosAlunos()
        }        
    }

    buscarTodosAlunos = () => {
        this.alunoService
            .buscarTodos()
            .then( resposta => {
                this.setState({ alunos: resposta.data})
            }).catch( error => {
                console.log(error)
            })
    }

    validar() {
        const msgs = []

        if(!this.state.nome) {
            msgs.push('O campo Nome é obrigatório.')
        }

        if(!this.state.nome) {
            msgs.push('O campo Tipo Treino é obrigatório.')
        }

        if(!this.state.aluno) {
            msgs.push('O campo Aluno é obrigatório.')
        }

        return msgs
    }

    cadastrar = () => {
        const msgs = this.validar();

        if(msgs && msgs.length > 0) {
            msgs.forEach( (msg, index) => {
                mensagemErro(msg)
            });
            return false;
        }

        const treinoDTO = {
            nome: this.state.nome,
            tipoTreino: this.state.tipoTreino,
            aluno: this.state.aluno
        }

        this.treinoService.salvar(treinoDTO)
            .then( response => {
                mensagemSucesso('Treino cadastrado com sucesso!')
                this.props.history.push('/consulta-treinos')
            }).catch( error => {
                mensagemErro(error.response.data)
            });
    }

    cancelar = () => {
        this.props.history.push('/consulta-treinos')
    }

    consultarTreinos = () => {
        this.props.history.push('/consulta-treinos')
    }

    render() {

        const alunos = [
            { label: 'Selecione...', value: '' }
        ]

        this.state.alunos.map( aluno => {
            return (
                alunos.push({ label: aluno.nome + ' - ' + aluno.cpf, value: aluno.id })
            )
        });

        return (
            <>
            <NavbarInstrutor />
            <Card title="Cadastro de Treinos">
                <div className="row">
                    <div className="col-lg-12">
                        <div className="bs-component">
                            <button onClick={this.consultarTreinos} type="button" className="btn btn-primary">Consultar Treinos</button>

                            <br />
                            <br />
                            <FormGroup htmlFor="inputAlunos" label="Alunos: *">
                                <SelectMenu id="inputAlunos" className="form-control" lista={alunos} onChange={e => this.setState({aluno: e.target.value})} />
                            </FormGroup>

                            <FormGroup label="Nome: *" htmlFor="inputNome">
                                <input type="text" 
                                        id="inputNome"
                                        className="form-control" 
                                        name="nome"
                                        placeholder="Ex.: Treino BiSet" 
                                        onChange={e => this.setState({nome: e.target.value})} />
                            </FormGroup>

                            <FormGroup label="Tipo Treino: *" htmlFor="inputTipoTreino">
                                <input type="text" 
                                        id="inputTipoTreino" 
                                        className="form-control" 
                                        name="tipoTreino" 
                                        placeholder="Ex.: Ganho de Massa Muscular" 
                                        onChange={e => this.setState({tipoTreino: e.target.value})} />
                            </FormGroup>

                            <button onClick={this.cadastrar} type="button" className="btn btn-success">Salvar</button>
                            <button onClick={this.cancelar} type="button" className="btn btn-danger">Cacelar</button>
                        </div>
                    </div>
                </div>
            </Card>
            </>
        );
    }
}

export default withRouter( CadastroTreinos )