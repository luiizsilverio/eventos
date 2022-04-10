import { createStore } from "redux"
import userReducer from './userReducer'
// store vai estar disponível para todos os componentes da aplicação
// funciona como um estado do React.

const store = createStore(userReducer)


export default store