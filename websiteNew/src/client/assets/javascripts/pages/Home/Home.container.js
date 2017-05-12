import React, { Component } from 'react'
import { connect } from 'react-redux'
import { getFeed } from 'stemn-shared/misc/SyncTimeline/SyncTimeline.actions.js'
import fetchDataHoc from 'stemn-shared/misc/FetchDataHoc'
import Home from './Home'
import { push, replace } from 'react-router-redux'
import { get } from 'lodash'
import { landingRoute } from 'route-actions'

const stateToProps = ({ syncTimeline, auth }, { location }) => {
  const filterValue = location.query.filter || 'all'
  return {
    timeline: get(syncTimeline, [filterValue, 'data'], []),
    filterValue,
    isLoggedIn: auth.authToken && auth.user._id,
  }
}

const dispatchToProps = {
  getFeed,
  push,
  replace,
}

const fetchConfigs = [{
  hasChanged: 'filterValue',
  onChange: (props) => {
    if (props.isLoggedIn) {
      props.getFeed({
        feedType: props.filterValue,
      })
    }
  }
}]

@connect(stateToProps, dispatchToProps)
@fetchDataHoc(fetchConfigs)
export default class HomeContainer extends Component {
  componentWillMount() {
    // Redirect to landing route if the user is not logged in.
    const { replace, isLoggedIn } = this.props
    if (!isLoggedIn) {
      replace(landingRoute())
    }
  }
  render() {
    const { isLoggedIn } = this.props
    if (isLoggedIn) {
      return <Home {...this.props} />
    } else {
      return null
    }
  }
}

