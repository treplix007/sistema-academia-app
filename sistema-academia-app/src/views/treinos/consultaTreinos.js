import React from 'react'
import { withRouter } from 'react-router-dom'

import Card from '../../components/card'
import FormGroup from '../../components/form-group'
import SelectMenu from '../../components/selectMenu'
import TreinosTable from './treinosTable'

import TreinoService from '../../app/service/treinoService'
import AlunoService from '../../app/service/alunoService'
import LocalStorageService from '../../app/service/localStorageService'

import * as messages from '../../components/toastr'

import { Dialog } from 'primereact/dialog'
import { Button } from 'primereact/button'
import NavbarInstrutor from '../../components/navbar-instrutor'

class ConsultaTreinos extends React.Component {

    state = {
        treinos : [],
        showConfirmDialog: false,
        treinoDeletar: {},
        alunos : [],
        aluno: ''
    }

    constructor() {
        super();
        this.treinoService = new TreinoService()
        this.alunoService = new AlunoService()
    }

    componentDidMount() {
        const usuarioLogado = LocalStorageService.obterItem('_usuario_logado')

        if (usuarioLogado == null) {
            messages.mensagemAlerta('Por favor logar para acessar o sistema.')
            this.props.history.push('/login')
        } else if(usuarioLogado.tipoUsuario === 1) {
            messages.mensagemAlerta('Você não tem permissão para acessar essa tela.')
            this.props.history.push('/home')
        } else {
            this.buscarTodos()
            this.buscarTodosAlunos()
        }        
    }

    cadastrarNovo = () => {
        this.props.history.push('/cadastro-treinos')
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

    buscarTodos = () => {
        this.treinoService
            .buscarTodos()
            .then( resposta => {
                this.setState({ treinos: resposta.data})
            }).catch( error => {
                console.log(error)
            })
    }

    buscar = () => {
        if(!this.state.aluno) {
            messages.mensagemErro('O preenchimento do campo Aluno é obrigatório.')
            return false;
        }

        this.treinoService
            .consultarPorAluno(this.state.aluno)
            .then( resposta => {
                this.setState({ treinos: resposta.data})
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

    render() {

        const alunos = [
            { label: 'Selecione...', value: '' }
        ]

        this.state.alunos.map( aluno => {
            return (
                alunos.push({ label: aluno.nome + ' - ' + aluno.cpf, value: aluno.id })
            )
        });

        const confirmDialogFooter = (
            <div>
                <Button label="Confirmar" icon="pi pi-check" onClick={this.deletar} />
                <Button label="Cancelar" icon="pi pi-times" onClick={this.cancelarDelecao} />
            </div>
        );

        return (
            <>
            <NavbarInstrutor />
            <Card title="Consulta Treinos">
                <div className="row">
                    <div className="col-md-12">
                        <div className="bs-component">
                            <button onClick={this.cadastrarNovo} type="button" className="btn btn-primary">Cadastrar Novo</button>
                        </div>
                    </div>
                </div>

                <br/>
                <br/>
                <div className="row">
                    <div className="col-md-6">
                        <div className="bs-component">
                            <FormGroup htmlFor="inputAlunos" label="Alunos: *">
                                <SelectMenu id="inputAlunos" className="form-control" lista={alunos} onChange={e => this.setState({aluno: e.target.value})} />
                            </FormGroup>

                            <button onClick={this.buscar} type="button" className="btn btn-success">Buscar</button>
                            <button onClick={this.buscarTodos} type="button" className="btn btn-danger">Buscar Todos</button>
                        </div>
                    </div>
                </div>

                <br />
                <br />
                <div className="row">
                    <div className="col-md-12">
                        <div className="bs-component">
                            <TreinosTable treinos={this.state.treinos} 
                                          deletar={this.abrirConfirmacao}
                                          editar={this.editar} />
                        </div>
                    </div>
                </div>

                <div>
                    <Dialog header="Confirmação"
                            visible={this.state.showConfirmDialog}
                            style={{width: '50vw'}}
                            footer={confirmDialogFooter}
                            modal={true}
                            onHide={() => this.setState({visible: false})}>
                        Confirma a exclusão do Treino?
                    </Dialog>
                </div>
            </Card>
            </>
        )
    }
}

export default withRouter( ConsultaTreinos )