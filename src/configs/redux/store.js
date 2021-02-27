import { configureStore, getDefaultMiddleware } from 'redux-starter-kit'

//import monitorReducersEnhancer from './enhancers/monitorReducers'
//import loggerMiddleware from './middleware/logger'
import {rootReducer} from './rootReducer'

export function configureAppStore(preloadedState) {
  const store = configureStore({
    reducer: rootReducer,
    middleware: [...getDefaultMiddleware()], //loggerMiddleware, 
    preloadedState,
    devTools: process.env.NODE_ENV !== 'production',
    //enhancers: [monitorReducersEnhancer]
  })

  if (process.env.NODE_ENV !== 'production' && module.hot) {
    module.hot.accept('./rootReducer', () => store.replaceReducer(rootReducer))
  }
  return store
}
