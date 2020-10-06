import React from 'react'

import Login from '../views/login'
import Home from '../views/home'

import CadastroAlunos from '../views/alunos/cadastroAlunos'
import CadastroInstrutores from '../views/instrutores/cadastroInstrutores'
import CadastroAvaliacoes from '../views/avaliacao-fisica/cadastroAvaliacoes'
import CadastroTreinos from '../views/treinos/cadastroTreino'
import CadastroExercicios from '../views/exercicios/cadastroExercicios'

import ConsultaLancamentos from '../views/lancamentos/consultaLancamentos'
import ConsultaAlunos from '../views/alunos/consultaAlunos'
import ConsultaInstrutores from '../views/instrutores/consultaInstrutores'
import ConsultaAvaliacoes from '../views/avaliacao-fisica/consultaAvaliacoes'
import ConsultaTreinos from '../views/treinos/consultaTreinos'
import ConsultaExercicios from '../views/exercicios/consultaExercicios'

import AlunosPrintPdf from '../views/alunos/alunosPrintPdf'

import { Route, Switch, HashRouter } from 'react-router-dom'

function Rotas() {
    return (
        <HashRouter>
            <Switch>
                <Route path="/home" component={Home} />
                <Route path="/login" component={Login} />

                <Route path="/cadastro-alunos" component={CadastroAlunos} />
                <Route path="/cadastro-instrutores" component={CadastroInstrutores} />
                <Route path="/cadastro-avaliacoes" component={CadastroAvaliacoes} />
                <Route path="/cadastro-treinos" component={CadastroTreinos} />
                <Route path="/cadastro-exercicios" component={CadastroExercicios} />

                <Route path="/consulta-lancamentos" component={ConsultaLancamentos} />
                <Route path="/consulta-alunos" component={ConsultaAlunos} />
                <Route path="/consulta-instrutores" component={ConsultaInstrutores} />
                <Route path="/consulta-avaliacoes" component={ConsultaAvaliacoes} />
                <Route path="/consulta-treinos" component={ConsultaTreinos} />
                <Route path="/consulta-exercicios" component={ConsultaExercicios} />

                <Route path="/alunos-pdf" component={AlunosPrintPdf} />
            </Switch>
        </HashRouter>
    );
}

export default Rotas