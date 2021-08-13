import React, { Component } from 'react'
import './index.scss'

export default class Card extends Component {
    render() {
        const {user} = this.props;
        return (
            <li className="col-lg-3 col-md-4 col-sm-6 col-12 p-2">
                <div className="card search-card mx-auto">
                    <a className="w-100 d-block card-link" href={user.html_url} target="_blank" rel="noreferrer">
                        <img src={user.avatar_url} className="img-top" alt="no profile" />
                        <h3 className="text-open text-light py-2 card-title">{user.login}</h3>
                    </a>
                </div>
            </li>
        )
    }
}
