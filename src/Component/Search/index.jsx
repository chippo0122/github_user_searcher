import React, { Component } from 'react'
import axios from 'axios'
import './index.scss'

export default class Search extends Component {
    render() {
        return (
            <div className="w-100 container-xl pt-5">
                <div className="w-100 d-flex justify-content-center">
                    <i className="fab fa-github display-1 icon-color"></i>
                </div>
                <h1 className="text-center text-open display-3 text-light">Github User Searcher</h1>
                <div className="p-2 input-group">
                    <input onKeyUp={this.keyUpSearch} ref={this.searchInput} className="form-control text-center text-light search-input" id="searchInput" type="text" placeholder="Search Users..." />
                    <button onClick={this.search(1)} className="btn-search btn text-light text-open fs-4">Search</button>
                </div>
            </div>
        )
    }

    searchInput = React.createRef();

    keyUpSearch = (e) => {
        if (e.code === 'Enter') {
            this.search(1)();
        }
    }

    search = (page) => {
        return () => {
            const { value } = this.searchInput.current;
            const perPage = 50;
            const url = `https://api.github.com/search/users?q=${value};page=${page};per_page=${perPage}`;

            if (!value) return
            this.props.setLoading(true);
            axios.get(url).then(res => {
                if (!res.data.incomplete_results) {
                    const users = res.data.items;
                    let total = Math.floor(res.data.total_count / perPage) + 1;
                    total = total > 20 ? 20 : total;
                    this.props.sendUsers({ users, total, page, value });
                    this.props.setLoading(false);
                } else {
                    alert('get data fail');
                    this.props.setLoading(false);
                }
            }).catch(res => {
                alert('request fail');
                this.props.setLoading(false);
            });
        }
    }
}
