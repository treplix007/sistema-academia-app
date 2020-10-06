import ApiService from '../apiservice'

export default class InstrutorService extends ApiService {

    constructor() {
        super('/api/instrutores')
    }

    buscarTodos() {
        return this.get('')
    }

    deletar(id) {
        return this.delete(`/${id}`)
    }
}