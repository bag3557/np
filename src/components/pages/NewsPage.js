import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { fetchNews } from '../../actions/news'
import { Input, Pagination, Segment } from 'semantic-ui-react'

import News from './News'
import Loading from '../messages/Loading';
import Header from '../layout/Header';

class NewsPage extends Component {

    constructor(props) {
        super(props)
        this.state = {
            currentPage: 1,
            loading: true,
            newsLocal: this.props.news
        }
    }

    async componentDidMount() {
        this.props.fetchNews()
    }

    componentWillReceiveProps(nextProps){
        this.setState({loading: false, newsLocal: nextProps.newsList.news})
    }

    /* 
    *   This function is to search news
    *   This takes query string from search box
    *   sets state after search successful: newsLocal 
    */
    onNewsSearch = e => {
        const query = e.target.value
        const { news } = this.props.newsList
        var newsFilter = null
        newsFilter = Object.keys(news).map(function(k) {
            if(news[k].author.includes(query) || news[k].text.includes(query) || news[k].title.includes(query))
                    return news[k]
        }).filter(function( element ) {
            return element !== undefined;
        })
        this.setState({newsLocal: newsFilter}) 
        this.setState({currentPage: 1})                
    }

    handlePageChange = (e, { activePage }) => {
        this.setState({currentPage: activePage})        
    }

    render() {
        const { loading, newsLocal, currentPage } = this.state
        var newsCount = 0, key
        var countPerPage = 10
        for (key in newsLocal) {
            newsCount++;
        }
        const totalPages = Math.ceil(newsCount/countPerPage)
        const start_offset = (currentPage-1)*countPerPage
        let start_count=0
        
        return(
            <div className="ui center aligned segment" style={{justifyContent: 'center', margin:'2rem 0'}}>
                <Header />
                <h1 className="ui header">
                    News List
                </h1>
                {loading && <Loading />}
                
                {newsLocal && <Input icon='search' style={{margin:'0 5% auto'}} fluid={true} placeholder='Search...' onChange={this.onNewsSearch}/>}

                {newsLocal && <Pagination activePage={currentPage} totalPages={totalPages} onPageChange={this.handlePageChange}/>}


                {newsLocal && Object.keys(newsLocal).map(function(value, key){   
                    if(key >= start_offset && start_count < countPerPage)   {
                        start_count++
                        return <News key={key} index={key} value={newsLocal[key]} />
                    }                   
                })}

                {!newsLocal && <Segment><p>No news for your search</p></Segment>}
                
            </div>
        )
    }
}

NewsPage.propTypes = {
    fetchNews: PropTypes.func.isRequired,
    newsList: PropTypes.object,
};

const mapStateToProps = state => ({
    newsList: state.news
})


export default connect(mapStateToProps, { fetchNews })(NewsPage)
