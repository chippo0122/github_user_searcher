import React, { Component } from 'react'
import './index.scss'

export default class Loading extends Component {
    render() {
        return (
            <div className="loading-wrap" style={{display: this.props.isLoading ? 'flex' : 'none'}}>
                <i className="fas fa-cog loading-gear"></i>
            </div>
        )
    }
}
