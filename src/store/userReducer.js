const INITIAL_STATE = {
  email: '',
  logado: false
}

function userReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case 'LOG_IN':
      return { ...state, logado: true, email: action.email }
    case 'LOG_OUT':
      return { ...state, logado: false, email: '' }
    default:
      return state  // retorna o estado atual
  }
}

export default userReducer