import React from 'react'

// import Intro from './Intro'
import SideBar from '../components/ui/SideBar'
import Request from './Request'
import { Layout, Menu, Breadcrumb, Icon } from 'antd';

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

    render() {
        return (
            <Layout style={{ minHeight: '100vh' }}>
                <SideBar collapsed={this.state.collapsed} onCollapse={this.onCollapse} />
                <Layout>
                    <Header className="header">Header</Header>
                    <Content className='container'>
                        
                        <Request />
                        
                        <div style={{ padding: 24, background: '#fff', minHeight: 360 }}>
                            response will be here
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

export default App