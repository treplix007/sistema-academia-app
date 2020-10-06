import React from 'react'

import AvaliacoesChart from './avaliacoesChart'

export default props => {

    console.log(props.avaliacoes)

    const rows = props.avaliacoes.map( avaliacao => {
        console.log(avaliacao)
        return (
            <tr key={avaliacao.id}>
                <td>{avaliacao.aluno.nome}</td>
                <td>{avaliacao.avaliador}</td>
                <td>{avaliacao.dataAvaliacao[2]}/{avaliacao.dataAvaliacao[1]}/{avaliacao.dataAvaliacao[0]}</td>
                <td>{avaliacao.desempenho.altura}</td>
                <td>{avaliacao.desempenho.gorduraCorporal}</td>
                <td>
                    {/* <button type="button" 
                            className="btn btn-primary"
                            onClick={e => props.editar(avaliacao.id)}>
                                Editar
                    </button> */}
                    <button type="button" 
                            className="btn btn-danger" 
                            onClick={e => props.deletar(avaliacao.id)}>
                                Deletar
                    </button>
                </td>
            </tr>
        )
    })

    /* const avaliacoesChart = props.avaliacoes.map( avaliacao => {
        return (
            <AvaliacoesChart avaliacao={avaliacao} />
        )
    }) */

    const avaliacoesChart = <AvaliacoesChart avaliacoes={props.avaliacoes} />

    return (
        <>
        <table className="table table-hover">
            <thead>
                <tr>
                    <th scope="col">Nome</th>
                    <th scope="col">Avaliador</th>
                    <th scope="col">Data Avaliação</th>
                    <th scope="col">Altura</th>
                    <th scope="col">Gordura Corporal</th>
                    <th scope="col">Ações</th>
                </tr>
            </thead>

            <tbody>
                {rows}
            </tbody>
        </table>

        {/* {avaliacoesChart} */}
        </>
    )
}