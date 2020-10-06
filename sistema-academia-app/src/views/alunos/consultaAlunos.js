import React from 'react'
import { withRouter } from 'react-router-dom'

import Card from '../../components/card'
import AlunosTables from './alunosTable'
import NavbarInstrutor from '../../components/navbar-instrutor'

import AlunoService from '../../app/service/alunoService'
import LocalStorageService from '../../app/service/localStorageService'

import * as messages from '../../components/toastr'

import { Dialog } from 'primereact/dialog'
import { Button } from 'primereact/button'

class ConsultaAlunos extends React.Component {

    state = {
        alunos : [],
        professores : [],
        professor: '',
        showConfirmDialog: false,
        alunoDeletar: {}
    }

    constructor() {
        super();
        this.service = new AlunoService()
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
        }          
    }

    cadastrarNovo = () => {
        this.props.history.push('/cadastro-alunos')
    }

    imprimirPdf = () => {
        this.props.history.push('/alunos-pdf')
    }

    buscarTodos = () => {
        this.service
            .buscarTodos()
            .then( resposta => {
                this.setState({ alunos: resposta.data})
                this.setState({ professores: resposta.data})
            }).catch( error => {
                console.log(error)
            })
    }

    buscarPorIdUsuario = () => {
        this.service
            .buscarPorIdUsuario(this.state.professor)
            .then( resposta => {
                this.setState({ alunos: resposta.data})
            }).catch( error => {
                console.log(error)
            })
    }

    editar = (id) => {
        console.log(id)
    }

    abrirConfirmacao = (aluno) => {
        this.setState({ showConfirmDialog: true, alunoDeletar: aluno })
    }

    cancelarDelecao = () => {
        this.setState({ showConfirmDialog: false, alunoDeletar: {} })
    }

    deletar = () => {
        this.service
            .deletar(this.state.alunoDeletar.id)
            .then( response => {
                const alunos = this.state.alunos
                const index = alunos.indexOf(this.state.alunoDeletar)
                alunos.splice(index, 1)
                this.setState({ alunos: alunos, showConfirmDialog: false })
                messages.mensagemSucesso('Aluno deletado com sucesso.')
            }).catch( error => {
                messages.mensagemErro('Erro ao tentar deletar o Aluno.')
            })
    }

    render() {

        const professores = [
            { label: 'Selecione...', value: '' }
        ]

        const confirmDialogFooter = (
            <div>
                <Button label="Confirmar" icon="pi pi-check" onClick={this.deletar} />
                <Button label="Cancelar" icon="pi pi-times" onClick={this.cancelarDelecao} />
            </div>
        );

        this.state.professores.map( professor => {
            return (
                professores.push({ label: professor.nome, value: professor.id })
            )
        });

        return (
            <>
            <NavbarInstrutor />
            <Card title="Consulta Alunos">
                <div className="row">
                    <div className="col-md-12">
                        <div className="bs-component">
                            <button onClick={this.cadastrarNovo} type="button" className="btn btn-primary">Cadastrar Novo</button>
                            <button onClick={this.imprimirPdf} type="button" className="btn btn-danger">Imprimir PDF</button>

                            {/* <br />
                            <br />
                            <FormGroup htmlFor="inputProfessores" label="Professores: ">
                                <SelectMenu id="inputProfessores" className="form-control" lista={professores} onChange={e => this.setState({professor: e.target.value})} />
                            </FormGroup>

                            <button onClick={this.buscarPorIdUsuario} type="button" className="btn btn-success">Buscar</button>
                            <button onClick={this.buscarTodos} type="button" className="btn btn-danger">Buscar Todos</button> */}

                            <br />
                            <br />
                            <AlunosTables alunos={this.state.alunos} 
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
                        Confirma a exclusão do Aluno?
                    </Dialog>
                </div>
            </Card>
            </>
        )
    }
}

export default withRouter( ConsultaAlunos )