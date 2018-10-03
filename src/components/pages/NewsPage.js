import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { fetchNews } from '../../actions/news'
import { Input } from 'semantic-ui-react'
import News from './News'
import Loading from '../messages/Loading';

class NewsPage extends Component {

    constructor(props) {
        super(props)
        this.state = {
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

    onChange = e => {
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
    }

    render() {
        const { loading, newsLocal } = this.state
        
        return(
            <div className="ui center aligned segment" style={{justifyContent: 'center'}}>
                <h1 className="ui header">
                    News List
                </h1>
                {loading && <Loading />}
                {newsLocal && <Input icon='search' placeholder='Search...' onChange={this.onChange}/>}
                {newsLocal && Object.keys(newsLocal).map(function(value, key){                    
                    return <News key={key} index={key} value={newsLocal[key]} />
                })}
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
