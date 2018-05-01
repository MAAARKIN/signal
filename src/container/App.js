import React from 'react'
import { connect } from 'react-redux'
import { pd } from 'pretty-data'

import { sendRequest } from '../actions/http';

import { Layout, Menu, Breadcrumb, Icon, Row } from 'antd';
import SideBar from '../components/ui/SideBar'
import Request from '../components/Request'
import { MEDIATYPE_XML, MEDIATYPE_JSON } from '../constants/Headers';

const { Header, Content, Footer, Sider } = Layout;
const SubMenu = Menu.SubMenu;

class App extends React.Component {

    state = {
        collapsed: false,
    }

    onCollapse = (collapsed) => {
        console.log(collapsed);
        this.setState({ collapsed });
    }

    handleRequest = (formObject) => {
        this.props.dispatch(sendRequest(formObject))
    }

    prettify = (data) => {
        const headers = this.props.response.headers
        if (headers) {
            if (headers['content-type']) {
                if (headers['content-type'].includes(MEDIATYPE_XML)) {
                    console.log('xml')
                    return pd.xml(data)
                } else if (headers['content-type'].includes(MEDIATYPE_JSON)) {
                    console.log('json')
                    return pd.json(data)
                } else {
                    return data
                }
            }
        }
    }

    render() {
        console.log('rending')
        console.log(this.props.response)
        return (
            <Layout style={{ minHeight: '100vh' }}>
                <SideBar collapsed={this.state.collapsed} onCollapse={this.onCollapse} />
                <Layout>
                    <Header className="header">
                        <Row type="flex" justify="center" align="top">
                            <span>Signal</span>
                        </Row>
                    </Header>
                    <Content className='container'>

                        <Request handleSubmit={this.handleRequest} />

                        <div style={{ padding: 24, background: '#fff' }}>
                            <pre>
                                {this.props.response && this.prettify(this.props.response.data)}
                            </pre>
                        </div>
                    </Content>
                    <Footer style={{ textAlign: 'center' }}>
                        Signal ©2018 Created by Marcos Filho
                    </Footer>
                </Layout>
            </Layout>
        )
    }
}

const mapStateToProps = state => {
    return {
        response: state.http.response
    }
}

export default connect(mapStateToProps)(App)