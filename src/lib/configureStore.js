/**
 * # configureStore.js
 *
 * A Redux boilerplate setup
 *
 */
'use strict'

/**
 * ## Imports
 *
 * redux functions
 */
import { composeWithDevTools } from 'remote-redux-devtools'
import { createStore, applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk'

/**
* ## Reducer
* The reducer contains the 4 reducers from
* device, global, auth, profile
*/
import reducer from '../reducers'

/**
 * ## creatStoreWithMiddleware
 * Like the name...
 */
const composeEnhancers = composeWithDevTools({name: 'School Application'})



/**
 * ## configureStore
 * @param {Object} the state with for keys:
 * device, global, auth, profile
 *
 */
export default function configureStore (initialState) {
  return createStore(reducer, initialState, composeEnhancers(
    applyMiddleware(thunk)
  ))
}
