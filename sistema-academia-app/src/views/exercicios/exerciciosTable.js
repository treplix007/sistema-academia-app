import React from 'react'

export default props => {

    const rows = props.exercicios.map( exercicio => {
        return (
            <tr key={exercicio.id}>
                <td>{exercicio.nome}</td>
                <td>{exercicio.dica}</td>
                <td>{exercicio.repeticoes}</td>
                <td>{exercicio.series}</td>
                <td>{exercicio.carga}</td>
            </tr>
        )
    })

    return (
        <table className="table table-hover">
            <thead>
                <tr>
                    <th scope="col">Nome</th>
                    <th scope="col">Dica</th>
                    <th scope="col">Repetições</th>
                    <th scope="col">Séries</th>
                    <th scope="col">Carga</th>
                </tr>
            </thead>

            <tbody>
                {rows}
            </tbody>
        </table>
    )
}