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

    /*  This will call fetchNews function which will call news API */
    async componentDidMount() {
        this.props.fetchNews()
    }

    /*  This function is to set state after getting news list */
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
        this.setState({newsLocal: newsFilter, currentPage: 1})                
    }

    /*  This function will to set page number in component state after page change from pagination  */
    handlePageChange = (e, { activePage }) => {
        this.setState({currentPage: activePage})        
    }

    render() {
        const { loading, newsLocal, currentPage } = this.state

        /*  To get total news count */
        var newsCount = 0, key
        for (key in newsLocal) {
            newsCount++;
        }

        /*  To get total pages according to news count */
        var countPerPage = 10
        const totalPages = Math.ceil(newsCount/countPerPage)

        /*  To get starting index of news according to page */
        const start_offset = (currentPage-1)*countPerPage

        let start_count = 0
        
        return(
            <div className="ui center aligned segment" style={{justifyContent: 'center', margin:'2rem 0'}}>
                <Header />
                <h1 className="ui header">
                    News List
                </h1>

                {/*  This will show loading animation till FETCH_NEWS gets the result */}
                {loading && <Loading />}
                
                {/*  This will render search box only if there are some news in the component state */}
                {newsLocal && <Input icon='search' style={{margin:'0 5% auto'}} fluid={true} placeholder='Search...' onChange={this.onNewsSearch}/>}

                {/* This will render pagination buttons only if there are some news in the component state 
                *   The button count will be according to the newscount 
                */}
                {newsLocal && <Pagination activePage={currentPage} totalPages={totalPages} onPageChange={this.handlePageChange}/>}

                {/* This will render each news only if there are some news in the component state 
                *   The news count will be according to the total news on that page 
                */}
                {newsLocal && Object.keys(newsLocal).map(function(value, key){   
                    if(key >= start_offset && start_count < countPerPage)   {
                        start_count++
                        return <News key={key} index={key} value={newsLocal[key]} />
                    }                   
                })}


                {/* This will render pagination buttons only if there are some news in the component state 
                *   The button count will be according to the newscount 
                */}
                {newsLocal && <Pagination activePage={currentPage} totalPages={totalPages} onPageChange={this.handlePageChange}/>}

                {/* This will show message, till there is no news in local news object
                */}
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
