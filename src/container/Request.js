import React from 'react'

import { Row, Col, Input, Select, Form, Icon, Button } from 'antd';

const Option = Select.Option

class Request extends React.Component {

    render() {
        const selectBefore = (
            <Select defaultValue="Http://" style={{ width: 110, color: 'green' }}>
                <Option value="Http://">Http://</Option>
                <Option value="Https://">Https://</Option>
            </Select>
        )

        const { getFieldDecorator } = this.props.form;
        return (
            <div style={{ marginBottom: 10 }}>
                <Row>
                    <Col sm={24}>
                        <Form.Item>
                            {getFieldDecorator('url', {
                                rules: [{ required: true, message: 'Please input your username!' }],
                            })(
                                <Input addonBefore={selectBefore} placeholder="endpoint.com.br" />
                            )}
                        </Form.Item>
                    </Col>
                </Row>
                <div style={{ padding: 24, background: '#fff' }}>
                    <Row gutter={16}>
                        <Col sm={8}>
                            <Form.Item>
                                {getFieldDecorator('headers', {
                                    rules: [{ required: true, message: 'Please input your username!' }],
                                })(
                                    <Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="Username" />
                                )}
                            </Form.Item>
                        </Col>
                        <Col sm={16}>
                            <Form.Item>
                                {getFieldDecorator('body', {
                                    rules: [{ required: true, message: 'Please input your username!' }],
                                })(
                                    <Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="Username" />
                                )}
                            </Form.Item>
                        </Col>
                    </Row>
                    <Button type="primary">Primary</Button>
                </div>

            </div>
        )
    }
}

export default Form.create({})(Request)