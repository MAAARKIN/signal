import React from 'react'

import { Layout, Menu, Icon, Row } from 'antd';

const { Sider } = Layout;
const SubMenu = Menu.SubMenu;

class SideBar extends React.Component {

    render() {
        return (
            <Sider width={200} style={{paddingTop: 50}} collapsed={this.props.collapsed} onCollapse={this.props.onCollapse}>
                <Row className="logo" style={{marginBottom: 20}} type="flex" justify="center" gutter={16}>
                    <h2 style={{color: 'white'}}>Signal</h2>
                </Row>
                <Row type="flex" justify="center" align="top">
                    <span style={{color: 'white'}}>History</span>
                </Row>
            </Sider>
        )
    }
}

export default SideBar