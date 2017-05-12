import React, { Component, PropTypes } from 'react'
import LoadingOverlay from 'stemn-shared/misc/Loading/LoadingOverlay/LoadingOverlay'

export default class RouteLoading extends Component {
  static propTypes = {
  }
  render() {
    const { loading } = this.props
    return <LoadingOverlay
     show={ loading }
     linear
     background="rgba(255, 255, 255, 0.6)"
     style={ { position: 'fixed' } }
    />
  }
}
