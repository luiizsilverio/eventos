import { createStore } from "redux"
import userReducer from './userReducer'

import { persistReducer, persistStore } from "redux-persist"
import storage from "redux-persist/lib/storage"

const persistConfig = {
  key: 'my-eventos',
  storage
}

const persistedReducer = persistReducer(persistConfig, userReducer)

// store vai estar disponível para todos os componentes da aplicação
// funciona como um estado do React.

const store = createStore(persistedReducer)
const persistor = persistStore(store)

export { store, persistor }