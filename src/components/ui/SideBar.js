import React from 'react'

import { Layout, Menu, Icon, Row } from 'antd';

const { Sider } = Layout;
const SubMenu = Menu.SubMenu;

class SideBar extends React.Component {

    render() {
        return (
            <Sider width={200} style={{paddingTop: 50}} collapsed={this.props.collapsed} onCollapse={this.props.onCollapse}>
                <div className="logo" style={{color: 'green'}}>
                    logo
                </div>
                <Row type="flex" justify="center" align="top">
                    <span style={{color: 'white'}}>History</span>
                </Row>
                <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline">
                    <Menu.Item key="1">
                        <Icon type="pie-chart" />
                        <span>Option 1</span>
                    </Menu.Item>
                    <Menu.Item key="2">
                        <Icon type="desktop" />
                        <span>Option 2</span>
                    </Menu.Item>
                </Menu>
            </Sider>
        )
    }
}

export default SideBar