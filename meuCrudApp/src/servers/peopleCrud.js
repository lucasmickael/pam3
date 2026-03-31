import api from './configApi';

// Função para LISTAR (Read)
export const getPeople = () => {
    return api.get('/people');
};

// Função para CADASTRAR (Create)
export const createPerson = (data) => {
    return api.post('/people', data);
};

export const deletePerson = (id) => api.delete(`/people/${id}`);