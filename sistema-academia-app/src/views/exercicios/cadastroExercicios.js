import React from 'react'

import { withRouter } from 'react-router-dom'
import Card from '../../components/card'
import FormGroup from '../../components/form-group'
import SelectMenu from '../../components/selectMenu'
import NavbarInstrutor from '../../components/navbar-instrutor'

import TreinoService from '../../app/service/treinoService'
import ExercicioService from '../../app/service/exercicioService'
import LocalStorageService from '../../app/service/localStorageService'

import { mensagemSucesso, mensagemErro, mensagemAlerta } from '../../components/toastr'

class CadastroExercicios extends React.Component {

    state = {
        treinos: [],
        treino: '',
        nome: '',
        dica: '',
        grupoMuscular: '',
        repeticoes: '',
        carga: '',
        series: ''
    }

    constructor() {
        super()
        this.treinoService = new TreinoService()
        this.exercicioService = new ExercicioService()
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
            this.buscarTodosTreinos()
        }     
    }

    buscarTodosTreinos = () => {
        this.treinoService
            .buscarTodos()
            .then( resposta => {
                this.setState({ treinos: resposta.data})
            }).catch( error => {
                console.log(error)
            })
    }

    validar() {
        const msgs = []

        if(!this.state.nome) {
            msgs.push('O campo Nome é obrigatório.')
        }

        if(!this.state.dica) {
            msgs.push('O campo Dica é obrigatório.')
        }

        if(!this.state.grupoMuscular) {
            msgs.push('O campo Grupo Muscular é obrigatório.')
        }

        if(!this.state.repeticoes) {
            msgs.push('O campo Repetições é obrigatório.')
        }

        if(!this.state.carga) {
            msgs.push('O campo Carga é obrigatório.')
        }

        if(!this.state.series) {
            msgs.push('O campo Series é obrigatório.')
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

        const exercicioDTO = {
            nome: this.state.nome,
            treino: this.state.treino,
            dica: this.state.dica,
            grupoMuscular: this.state.grupoMuscular,
            repeticoes: this.state.repeticoes,
            carga: this.state.carga,
            series: this.state.series
        }

        this.exercicioService.salvar(exercicioDTO)
            .then( response => {
                mensagemSucesso('Exercício cadastrado com sucesso!')
                this.props.history.push('/cadastro-exercicios')
            }).catch( error => {
                mensagemErro(error.response.data)
            });
    }

    cancelar = () => {
        this.props.history.push('/home')
    }

    render() {

        const treinos = [
            { label: 'Selecione...', value: '' }
        ]

        this.state.treinos.map( treino => {
            return (
                treinos.push({ label: treino.nome, value: treino.id })
            )
        });

        return (
            <>
            <NavbarInstrutor />
            <Card title="Cadastro de Exercícios">
                <div className="row">
                    <div className="col-lg-12">
                        <div className="bs-component">
                            <FormGroup htmlFor="inputTreinos" label="Treinos: *">
                                <SelectMenu id="inputTreinos" className="form-control" lista={treinos} onChange={e => this.setState({treino: e.target.value})} />
                            </FormGroup>

                            <FormGroup label="Nome: *" htmlFor="inputNome">
                                <input type="text" 
                                        id="inputNome"
                                        className="form-control" 
                                        name="nome"
                                        placeholder="Ex.: Exercício Teste" 
                                        onChange={e => this.setState({nome: e.target.value})} />
                            </FormGroup>

                            <FormGroup label="Dica: *" htmlFor="inputDica">
                                <input type="text" 
                                        id="inputDica" 
                                        className="form-control" 
                                        name="dica" 
                                        placeholder="Ex.: Descer até angulo de 90º" 
                                        onChange={e => this.setState({dica: e.target.value})} />
                            </FormGroup>

                            <FormGroup label="Grupo Muscular: *" htmlFor="inputGrupoMuscular">
                                <input type="text" 
                                        id="inputGrupoMuscular" 
                                        className="form-control" 
                                        name="grupoMuscular" 
                                        onChange={e => this.setState({grupoMuscular: e.target.value})} />
                            </FormGroup>

                            <FormGroup label="Repetições: *" htmlFor="inputRepeticoes">
                                <input type="number" 
                                        id="inputRepeticoes" 
                                        className="form-control" 
                                        name="repeticoes" 
                                        onChange={e => this.setState({repeticoes: e.target.value})} />
                            </FormGroup>

                            <FormGroup label="Carga: *" htmlFor="inputCarga">
                                <input type="number" 
                                        id="inputCarga" 
                                        className="form-control" 
                                        name="carga" 
                                        onChange={e => this.setState({carga: e.target.value})} />
                            </FormGroup>

                            <FormGroup label="Séries: *" htmlFor="inputSeries">
                                <input type="number" 
                                        id="inputSeries" 
                                        className="form-control" 
                                        name="series" 
                                        onChange={e => this.setState({series: e.target.value})} />
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

export default withRouter( CadastroExercicios )