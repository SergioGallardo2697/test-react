import Axios from '../api/api';

export function crearUsuario(usuario) {
  return Axios.post('users', usuario);
}

export default crearUsuario;