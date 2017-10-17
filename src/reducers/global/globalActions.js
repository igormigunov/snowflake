/**
 * # globalActions.js
 *
 * Actions that are global in nature
 */
'use strict'

import {appAuthToken} from '../../lib/AppAuthToken'
import {Actions} from 'react-native-router-flux';

const BackendFactory = require('../../lib/BackendFactory').default
/**
 * ## Imports
 *
 * The actions supported
 */
const {
  SET_SESSION_TOKEN,
  SET_STORE,
  SET_STATE,
  GET_STATE,
  GET_MARKS_REQUEST,
  GET_MARKS_SUCCESS,
  GET_MARKS_FAILURE
} = require('../../lib/constants').default

/**
 * ## set the sessionToken
 *
 */
export function setSessionToken (sessionToken) {
  return {
    type: SET_SESSION_TOKEN,
    payload: sessionToken
  }
}
/**
 * ## set the store
 *
 * this is the Redux store
 *
 * this is here to support Hot Loading
 *
 */
export function setStore (store) {
  return {
    type: SET_STORE,
    payload: store
  }
}
/**
 * ## set state
 *
 */
export function setState (newState) {
  return {
    type: SET_STATE,
    payload: newState
  }
}
/**
 * ## getState
 *
 */
export function getState (toggle) {
  return {
    type: GET_STATE,
    payload: toggle
  }
}
export function getMarksRequest () {
  return {
    type: GET_MARKS_REQUEST
  }
}

export function getMarksSuccess (json) {
  return {
    type: GET_MARKS_SUCCESS,
    payload: json
  }
}

export function getMarksFailure (error) {
  return {
    type: GET_MARKS_FAILURE,
    payload: error
  }
}
export function getMarks () {
  return dispatch => {
    dispatch(getMarksRequest())
    return appAuthToken.getSessionToken()
      .then((token) => BackendFactory(token)._fetch({ url: '/api/user/marks' })
        .then((json) => {
          dispatch(getMarksSuccess(json.json))
        })
        .catch((error) => {
          dispatch(getMarksFailure(error));
          Actions.InitialLoginForm()
        }))
  }
}
