import React, { Component } from 'react'
import Search from './Component/Search'
import List from './Component/List'
import Loading from './Component/Loading'

import './App.scss'

export default class App extends Component {
  state = {
    users: [],
    total: 1,
    currentPage: 1,
    value: '',
    isLoading: false
  }

  render() {
    return (
      <div>
        <Loading isLoading={this.state.isLoading}/>
        <Search sendUsers={this.sendUsers} setLoading={this.setLoading}/>
        <List {...this.state}  sendUsers={this.sendUsers} setLoading={this.setLoading}/>
        <footer>
          <p className="text-open text-light text-center">Made by Chippo19970122@gmail.com, 2021</p>
          <a className="d-block text-center text-open" href="https://github.com/chippo0122" target="_blank" rel="noreferrer">My Github Page</a>
        </footer>
      </div>
    )
  }

  sendUsers = (newUsers) => {
    this.setState({users: newUsers.users, total: newUsers.total, currentPage: newUsers.page, value: newUsers.value});
  }

  setLoading = (status) => {
    this.setState({isLoading: status})
  }
}

