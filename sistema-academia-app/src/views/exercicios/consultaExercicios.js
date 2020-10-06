import React from 'react'
import { withRouter } from 'react-router-dom'

import Card from '../../components/card'
import FormGroup from '../../components/form-group'
import SelectMenu from '../../components/selectMenu'
import NavbarInstrutor from '../../components/navbar-instrutor'
import NavbarAluno from '../../components/navbar-aluno'
import ExerciciosTable from './exerciciosTable'

import TreinoService from '../../app/service/treinoService'
import ExercicioService from '../../app/service/exercicioService'
import LocalStorageService from '../../app/service/localStorageService'

import * as messages from '../../components/toastr'

class ConsultaExercicios extends React.Component {

    state = {
        exercicios: [],
        treinosAluno: [],
        treinoAluno: '',
        treinosInstrutor: [],
        treinoInstrutor: '',
        showConfirmDialog: false,
        treinoDeletar: {}
    }

    constructor() {
        super();
        this.treinoService = new TreinoService()
        this.exercicioService = new ExercicioService()
    }

    componentDidMount() {
        const usuarioLogado = LocalStorageService.obterItem('_usuario_logado')

        if (usuarioLogado == null) {
            messages.mensagemAlerta('Por favor logar para acessar o sistema.')
            this.props.history.push('/login')
        } else if (usuarioLogado.tipoUsuario === 1) {
            this.buscarTodosTreinos(usuarioLogado.id)
        } else if (usuarioLogado.tipoUsuario === 2) {
            messages.mensagemAlerta('Você não tem permissão para acessar essa página.')
            this.props.history.push('/home')
        }       
    }

    cadastrarNovo = () => {
        this.props.history.push('/cadastro-exercicios')
    }

    buscarTodosTreinos = (aluno) => {
        this.treinoService
            .consultarPorAluno(aluno)
            .then( resposta => {
                this.setState({ treinosAluno: resposta.data})
            }).catch( error => {
                console.log(error)
            })
    }

    editar = (id) => {
        console.log(id)
    }

    abrirConfirmacao = (treino) => {
        this.setState({ showConfirmDialog: true, treinoDeletar: treino })
    }

    cancelarDelecao = () => {
        this.setState({ showConfirmDialog: false, treinoDeletar: {} })
    }

    deletar = () => {
        this.treinoService
            .deletar(this.state.treinoDeletar.id)
            .then( response => {
                const treinos = this.state.treinos
                const index = treinos.indexOf(this.state.treinoDeletar)
                treinos.splice(index, 1)
                this.setState({ treinos: treinos, showConfirmDialog: false })
                messages.mensagemSucesso('Treino deletado com sucesso.')
            }).catch( error => {
                messages.mensagemErro('Erro ao tentar deletar o Treino.')
            })
    }

    buscar = () => {
        if(!this.state.treinoAluno) {
            messages.mensagemErro('O preenchimento do campo Treino é obrigatório.')
            return false;
        }

        this.exercicioService
            .consultarPorTreino(this.state.treinoAluno)
            .then( resposta => {
                this.setState({ exercicios: resposta.data})
            }).catch( error => {
                console.log(error)
            })
    }

    render() {

        const treinos = [
            { label: 'Selecione...', value: '' }
        ]

        this.state.treinosAluno.map( treino => {
            return (
                treinos.push({ label: treino.nome, value: treino.id })
            )
        });

        return (
            <>
            <NavbarAluno />
            <Card title="Consulta Exercícios">
                <div className="row">
                    <div className="col-md-6">
                        <div className="bs-component">
                            <FormGroup htmlFor="inputTreinos" label="Treinos: *">
                                <SelectMenu id="inputTreinos" className="form-control" lista={treinos} onChange={e => this.setState({treinoAluno: e.target.value})} />
                            </FormGroup>

                            <button onClick={this.buscar} type="button" className="btn btn-success">Buscar</button>
                        </div>
                    </div>
                </div>

                <br />
                <br />
                <div className="row">
                    <div className="col-md-12">
                        <div className="bs-component">
                            <ExerciciosTable exercicios={this.state.exercicios} />
                        </div>
                    </div>
                </div>
            </Card>
            </>
        )

    }
}

export default withRouter( ConsultaExercicios )