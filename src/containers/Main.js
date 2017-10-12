/**
 * # Main.js
 *  This is the main app screen
 *
 */
'use strict'
/*
 * ## Imports
 *
 * Imports from redux
 */
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

/**
 * The actions we need
 */
import * as authActions from '../reducers/auth/authActions'
import * as globalActions from '../reducers/global/globalActions'

/**
 * Router
 */
import {Actions} from 'react-native-router-flux'

/**
 * The Header will display a Image and support Hot Loading
 */

/**
 * The components needed from React
 */
import React, {Component} from 'react'
import
{
  StyleSheet,
  View,
  Text
}
from 'react-native'
/**
 *  Instead of including all app states via ...state
 *  One could explicitly enumerate only those which Main.js will depend on.
 *
 */
function mapStateToProps (state) {
  return {
    auth: {
      form: {
        isFetching: state.auth.form.isFetching
      }
    },
    global: {
      currentState: state.global.currentState,
      showState: state.global.showState,
      marks: state.global.marks,
      marksLoading: state.global.marksLoading
    }
  }
}

/*
 * Bind all the actions
 */
function mapDispatchToProps (dispatch) {
  return {
    actions: bindActionCreators({ ...authActions, ...globalActions }, dispatch)
  }
}

var styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    flex: 1,
    padding: 10
  },
  summary: {
    fontFamily: 'BodoniSvtyTwoITCTT-Book',
    fontSize: 18,
    fontWeight: 'bold'
  },
  head: { height: 40, backgroundColor: '#f1f8ff' },
  title: { fontWeight: 'bold' },
  row: { height: 35 },
  text: { textAlign: 'center' }
})
/**
 * ### Translations
 */
var I18n = require('react-native-i18n')
import Translations from '../lib/Translations'
I18n.translations = Translations

/**
 * ## App class
 */
const getAvg = marks => marks.reduce((r, i) => { r += i; return r }) / marks.length

class Main extends Component {
  renderMark (sub, marks, showAll = true) {
    const avg = getAvg(marks).toFixed(2)
    return (<Text key={sub} style={styles.row}>
      <Text style={styles.title}>{sub}</Text> {showAll && marks.join(', ')} <Text style={styles.summary}>{avg} ({Math.round(avg)})</Text>
    </Text>)
  }
  render () {
    const { marks, marksLoading } = this.props.global
    return (
      <View style={styles.container}>
        { !marksLoading && <Text>{ I18n.t('Main.loading') }</Text>}
        <View style={ { opacity: !marksLoading ? 0.3 : 1} }>
        { marks && Object.keys(marks.grouped).map(key => this.renderMark(key, marks.grouped[key]))}
          { marks && this.renderMark(I18n.t('Main.avgMark'),
            Object.keys(marks.grouped).map(key =>
              Math.round(getAvg(marks.grouped[key]))), false
          ) }
        </View>
      </View>
    )
  }
}
/**
 * Connect the properties
 */
export default connect(mapStateToProps, mapDispatchToProps)(Main)
