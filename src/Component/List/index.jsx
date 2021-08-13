import React, { Component } from 'react'
import Card from '../Card'
import axios from 'axios'

import './index.scss'

export default class List extends Component {
    render() { 
        return (
            <div className="container-xl">
                <ul className="row list-unstyled g-0">
                    {
                        this.props.users.map(el => {
                            return <Card user={el} key={el.id} />
                        })
                    }
                    <p stye={{display: this.props.users.length < 1 ? 'block' : 'none'}} className="text-center text-light text-open fs-4">No Users' Data...</p>
                </ul>
                <nav aria-label="Page navigation example" style={{display: this.props.total <= 1 ? 'none' : 'block'}}>
                    <ul className="pagination justify-content-center">
                        <li className="page-item">
                            <button onClick={this.searchPage(1)} className="page-link text-open" href="#" aria-label="Previous">
                                First
                            </button>
                        </li>
                        {
                            this.makePages(this.props.currentPage).map(el => {
                                let classes = 'page-item';
                                if(el === this.props.currentPage) classes += ' page-active';
                                if(el > this.props.total) classes = 'd-none';
                                return <li className={classes} key={el}><button onClick={this.searchPage(el)} className="page-link" href="#">{el}</button></li>
                            })
                        }
                        <li className="page-item">
                            <button onClick={this.searchPage(this.props.total)} className="page-link text-open" href="#" aria-label="Next">
                                Last
                            </button>
                        </li>
                    </ul>
                </nav>
            </div>
        )
    }

    makePages = (currentPage)=> {
        let init = currentPage - 2,
            output = [];

        if(init < 1) init = 1;
        
        while(output.length < 5) {
            output.push(init);
            init++;
        }

        while(output.length > this.props.total) {
            output.pop()
        }

        return output;
    }

    searchPage(page) {
        if(page < 0 || page > this.props.total) return;
        return ()=> {
            const {value} = this.props;
            const perPage = 50;
            const url = `https://api.github.com/search/users?q=${value};page=${page};per_page=${perPage}`;
    
            if(!value) return
            this.props.setLoading(true);
            axios.get(url).then(res => {
                if(!res.data.incomplete_results) {
                    const users = res.data.items,
                          total = Math.floor(res.data.total_count / perPage) + 1;

                    this.props.sendUsers({users, total, page, value});
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
