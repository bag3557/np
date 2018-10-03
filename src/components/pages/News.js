import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Segment, Accordion } from 'semantic-ui-react'

class News extends Component {
    constructor(props){
        super(props)
        this.state = {
            activeIndex: ''
        }        
    }

    handleClick = (e, titleProps) => {
        const { index } = titleProps
        const { activeIndex } = this.state
        const newIndex = activeIndex === index ? -1 : index
    
        this.setState({ activeIndex: newIndex })
    }

    render() {
        const { activeIndex } = this.state
        const { value, index } = this.props
        
        return (
            <Segment  style={{border: 'none', boxShadow: 'none', textAlign: 'left'}}>
                <Accordion fluid styled>
                    <Accordion.Title active={activeIndex === index} index={index} onClick={this.handleClick}>
                    {value.title} {' :'} <b>{value.author}</b>
                    </Accordion.Title>
                    <Accordion.Content active={activeIndex === index}>
                    <p>{value.text}</p>
                    </Accordion.Content>
                </Accordion>
            </Segment>
        )
    }
}

News.propTypes = {
    value: PropTypes.object.isRequired,
    index: PropTypes.number.isRequired,
};

export default News
