import ApiService from '../apiservice'

export default class ExercicioService extends ApiService {

    constructor() {
        super('/api/exercicios')
    }

    buscarTodos() {
        return this.get('')
    }

    salvar(exercicioDTO) {
        return this.post('', exercicioDTO)
    }

    consultarPorTreino(treino) {
        return this.get(`/treino/${treino}`)
    }
}