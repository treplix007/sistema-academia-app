import React from 'react'
import { withRouter } from 'react-router-dom'

import Card from '../../components/card'
import FormGroup from '../../components/form-group'
import SelectMenu from '../../components/selectMenu'
import AvaliacoesTables from './avaliacoesTable'
import NavbarInstrutor from '../../components/navbar-instrutor'
import NavbarAluno from '../../components/navbar-aluno'

import AvaliacaoService from '../../app/service/avaliacaoService'
import AlunoService from '../../app/service/alunoService'
import LocalStorageService from '../../app/service/localStorageService'

import * as messages from '../../components/toastr'

import { Dialog } from 'primereact/dialog'
import { Button } from 'primereact/button'

class ConsultaAvaliacoes extends React.Component {

    state = {
        alunos : [],
        aluno: '',
        showConfirmDialog: false,
        avaliacaoDeletar: {},
        avaliacoes : []
    }

    constructor() {
        super();
        this.avaliacaoService = new AvaliacaoService()
        this.alunoService = new AlunoService()
    }

    componentDidMount() {
        const usuarioLogado = LocalStorageService.obterItem('_usuario_logado')

        if (usuarioLogado == null) {
            messages.mensagemAlerta('Por favor logar para acessar o sistema.')
            this.props.history.push('/login')
        } else if(usuarioLogado.tipoUsuario === 1) {
            this.consultarAlunoLogado(usuarioLogado.id)
            console.log(this.consultarAlunoLogado(usuarioLogado.id))
        }  else {
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

    buscar = () => {
        if(!this.state.aluno) {
            messages.mensagemErro('O preenchimento do campo Aluno é obrigatório.')
            return false;
        }

        this.avaliacaoService
            .consultarPorAluno(this.state.aluno)
            .then( resposta => {
                this.setState({ avaliacoes: resposta.data})
            }).catch( error => {
                console.log(error)
            })
    }

    editar = (id) => {
        console.log(id)
    }

    abrirConfirmacao = (avaliacao) => {
        this.setState({ showConfirmDialog: true, avaliacaoDeletar: avaliacao })
    }

    cancelarDelecao = () => {
        this.setState({ showConfirmDialog: false, avaliacaoDeletar: {} })
    }

    cadastrar = () => {
        this.props.history.push('/cadastro-avaliacoes')
    }

    deletar = () => {
        this.service
            .deletar(this.state.avaliacaoDeletar.id)
            .then( response => {
                const lancamentos = this.state.lancamentos
                const index = lancamentos.indexOf(this.state.lancamentoDeletar)
                lancamentos.splice(index, 1)
                this.setState({ lancamentos: lancamentos, showConfirmDialog: false })
                messages.mensagemSucesso('Lançamento deletado com sucesso.')
            }).catch( error => {
                messages.mensagemErro('Erro ao tentar deletar o Lançamento.')
            })
    }

    consultarAlunoLogado = (id) => {
        this.alunoService
            .buscarPorIdUsuario(id)
            .then( resposta => {
                console.log(resposta.data[0].id)
                 this.avaliacaoService
                     .consultarPorAluno(resposta.data[0].id)
                     .then( resposta => {
                         this.setState({ avaliacoes: resposta.data})
                     }).catch( error => {
                         console.log(error)
                     })
            }).catch( error => {
                console.log(error)
            })
    }

    render() {
        const usuarioLogado = LocalStorageService.obterItem('_usuario_logado')

        const confirmDialogFooter = (
            <div>
                <Button label="Confirmar" icon="pi pi-check" onClick={this.deletar} />
                <Button label="Cancelar" icon="pi pi-times" onClick={this.cancelarDelecao} />
            </div>
        );

        const alunos = [
            { label: 'Selecione...', value: '' }
        ]

        this.state.alunos.map( aluno => {
            return (
                alunos.push({ label: aluno.nome + ' - ' + aluno.cpf, value: aluno.id })
            )
        });

        if (usuarioLogado !== null) {
            if (usuarioLogado.tipoUsuario === 1) {
                return (
                    <>
                    <NavbarAluno />
                    <Card title="Consulta Avaliações Físicas">
                        <div className="row">
                            <div className="col-md-12">
                                <div className="bs-component">
                                    <AvaliacoesTables avaliacoes={this.state.avaliacoes} 
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
                                Confirma a exclusão da Avaliação Física?
                            </Dialog>
                        </div>
                    </Card>
                    </>
                )
            }

        }
        
        return (
            <>
            <NavbarInstrutor />
            <Card title="Consulta Avaliações Físicas">
                <div className="row">
                    <div className="col-md-6">
                        <div className="bs-component">
                            <FormGroup htmlFor="inputAlunos" label="Alunos: *">
                                <SelectMenu id="inputAlunos" className="form-control" lista={alunos} onChange={e => this.setState({aluno: e.target.value})} />
                            </FormGroup>

                            <button onClick={this.buscar} type="button" className="btn btn-danger">Buscar</button>
                            <button onClick={this.cadastrar} type="button" className="btn btn-success">Cadastrar</button>
                        </div>
                    </div>
                </div>

                <br />
                <div className="row">
                    <div className="col-md-12">
                        <div className="bs-component">
                            <AvaliacoesTables avaliacoes={this.state.avaliacoes} 
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
                        Confirma a exclusão da Avaliação Física?
                    </Dialog>
                </div>
            </Card>
            </>
        )
    }
}

export default withRouter( ConsultaAvaliacoes )