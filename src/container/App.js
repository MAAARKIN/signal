import React from 'react'
import { connect } from 'react-redux'

import { sendRequest } from '../actions/http';

import { Layout, Menu, Breadcrumb, Icon, Row } from 'antd';
import SideBar from '../components/ui/SideBar'
import Request from '../components/Request'

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
                            response will be here
                            {JSON.stringify(this.props.response.data)}
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