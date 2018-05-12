import React from 'react'
import PropTypes from 'prop-types'

import { pd } from 'pretty-data'
import Highlight from 'react-highlight'

import { Row, Col } from 'antd'

import { MEDIATYPE_XML, MEDIATYPE_JSON } from '../constants/Headers';

class Response extends React.Component {

    state = { language: 'json' }

    prettify = (data) => {
        const headers = this.props.response.headers
        if (headers) {
            if (headers['content-type']) {
                if (headers['content-type'].includes(MEDIATYPE_XML)) {
                    console.log('xml')
                    // this.setState({...this.state, language: 'xml'})
                    return pd.xml(data)
                } else if (headers['content-type'].includes(MEDIATYPE_JSON)) {
                    // this.setState({...this.state, language: 'json'})
                    console.log('json')
                    return pd.json(data)
                } else {
                    return data
                }
            }
        }
    }

    render() {

        return (
            <div style={{ padding: 24, background: '#fff' }}>
                {this.props.response &&
                    <Row style={{ backgroundColor: this.props.response.status >= 200 && this.props.response.status < 400 ? '#52b352' : '#ff4c4b', padding: 5 }} type="flex" align="middle">
                        <Col>
                            <h3 style={{marginLeft: 10, marginTop: 5}}>
                                {this.props.response.status} - {this.props.response.statusText}
                            </h3>
                        </Col>
                    </Row>
                }
                <Highlight language={this.state.language}>
                    {this.props.response && this.prettify(this.props.response.data)}
                </Highlight>
            </div>
        )
    }
}

Response.propTypes = {
    response: PropTypes.object
}

export default Response