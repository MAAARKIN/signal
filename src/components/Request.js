import React from 'react'
import AceEditor from 'react-ace'
import brace from 'brace'

// Import a Mode (language)
import 'brace/mode/java';

// Import a Theme (okadia, github, xcode etc)
import 'brace/theme/iplastic';

import { Row, Col, Input, Select, Form, Icon, Button } from 'antd';

const Option = Select.Option

let uuid = 0;

class Request extends React.Component {

    state = {
        headers: this.props.request && this.props.request.headers ? Object.entries(this.props.request.headers).map(([key, value]) => {
            return { key: key, value: value }
        }) : []
    }

    remove = (k) => {
        const { form } = this.props
        // can use data-binding to get
        const headersCount = form.getFieldValue('headersCount')
        // We need at least one passenger
        if (headersCount.length === 0) {
            return
        }

        const headersForm = form.getFieldValue('headers');
        headersForm.splice(k, 1)

        form.setFieldsValue({
            headersCount: headersCount.filter((value, key) => key !== k)
        })

        this.setState({ headers: headersForm })
    }

    add = () => {
        const { form } = this.props;
        // can use data-binding to get
        const headersCount = form.getFieldValue('headersCount');
        const nextHeaders = headersCount.concat(uuid);
        uuid++;

        // can use data-binding to set
        // important! notify form to detect changes
        form.setFieldsValue({
            headersCount: nextHeaders,
        });
    }

    handleForm = () => {
        // e.preventDefault();
        this.props.form.validateFieldsAndScroll((err, payload) => {
            if (!err) {
                if (payload.headers) {
                    const headersArray = payload.headers
                    let headers = {}
                    headersArray.forEach(currentHeader => {
                        if (currentHeader.key) {
                            headers[currentHeader.key] = currentHeader.value
                        }
                    })
                    payload.headers = headers
                }
                this.props.handleSubmit(payload)
            }
        });
    }

    render() {
        const { getFieldDecorator, getFieldProps, getFieldValue } = this.props.form;

        const prefixSelector = getFieldDecorator('verb', {
            initialValue: 'GET',
        })(
            <Select style={{ width: 110, color: 'green' }}>
                <Option value="GET">GET</Option>
                <Option value="POST">POST</Option>
                <Option value="PUT">PUT</Option>
                <Option value="DELETE">DELETE</Option>
            </Select>
        );

        getFieldDecorator('headersCount', { initialValue: this.state.headers });
        const headersCount = getFieldValue('headersCount');
        
        const formItems = headersCount.map((k, index) => {
            return (
                <Row gutter={16} type="flex" justify="center" align="middle" key={index}>
                    <Col sm={11} md={11}>
                        <Form.Item key={index} style={{ marginBottom: 5 }}>
                            {getFieldDecorator(`headers[${index}].key`, {
                                initialValue: this.state.headers[index] && this.state.headers[index].key,
                                validateTrigger: ['onChange', 'onBlur']
                            })(
                                <Input placeholder="header" style={{ marginRight: 8 }} />
                            )}
                        </Form.Item>
                    </Col>
                    <Col sm={11} md={11}>
                        <Form.Item key={index} style={{ marginBottom: 5 }}>
                            {getFieldDecorator(`headers[${index}].value`, {
                                initialValue: this.state.headers[index] && this.state.headers[index].value,
                                validateTrigger: ['onChange', 'onBlur']
                            })(
                                <Input placeholder="value" style={{ marginRight: 8 }} />
                            )}
                        </Form.Item>
                    </Col>
                    {headersCount.length >= 1 ? (
                        <Col sm={2} md={2}>
                            <Icon
                                style={{ marginBottom: 10 }}
                                className="dynamic-delete-button"
                                type="minus-circle-o"
                                disabled={headersCount.length === 1}
                                onClick={() => this.remove(index)}
                            />
                        </Col>
                    ) : null}
                </Row>
            );
        });

        return (
            <div style={{ marginBottom: 10 }}>
                <Form>
                    <Row>
                        <Col sm={24}>
                            <Form.Item>
                                {getFieldDecorator('url', {
                                    initialValue: 'http://httpbin.org/get',
                                    rules: [{ required: true, message: 'Please input the url!' }]
                                })(
                                    <Input addonBefore={prefixSelector} suffix={<Button type="primary" onClick={this.handleForm}>Send</Button>} placeholder="endpoint.com.br" />
                                )}
                            </Form.Item>
                        </Col>
                    </Row>
                    <div style={{ padding: 24, background: '#fff' }}>
                        <Row gutter={16}>
                            <Col sm={10}>
                                <Row>
                                    {formItems}
                                </Row>
                                <Button type="dashed" onClick={this.add} style={{ width: '100%' }}>
                                    <Icon type="plus" /> Add Header
                                </Button>
                            </Col>
                            <Col sm={14}>
                                <AceEditor
                                    mode="java"
                                    theme="iplastic"
                                    showPrintMargin={false}
                                    editorProps={{ $blockScrolling: true }}
                                    {...getFieldProps('body')}
                                    style={{ width: '100%', height: '100%', minHeight: 250 }}
                                />

                            </Col>
                        </Row>
                    </div>
                </Form>
            </div>
        )
    }
}

export default Form.create({})(Request)