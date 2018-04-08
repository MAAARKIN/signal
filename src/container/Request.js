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

    remove = (k) => {
        const { form } = this.props;
        // can use data-binding to get
        const headers = form.getFieldValue('headers');
        // We need at least one passenger
        if (headers.length === 0) {
            return;
        }

        // can use data-binding to set
        form.setFieldsValue({
            headers: headers.filter(header => key !== k),
        });
    }

    add = () => {
        const { form } = this.props;
        // can use data-binding to get
        const headers = form.getFieldValue('headers');
        const nextHeaders = headers.concat(uuid);
        uuid++;
        // can use data-binding to set
        // important! notify form to detect changes
        form.setFieldsValue({
            headers: nextHeaders,
        });
    }

    handleForm = () => {
        // e.preventDefault();
        this.props.form.validateFieldsAndScroll((err, values) => {
            if (!err) {
                console.log('Received values of form: ', values);
                console.log(JSON.stringify(values))
                this.props.httpStore.addRequest('teste')
            }
        });
    }

    render() {
        const { getFieldDecorator, getFieldProps, getFieldValue } = this.props.form;

        const prefixSelector = getFieldDecorator('prefix', {
            initialValue: 'Http://',
        })(
            <Select style={{ width: 110, color: 'green' }}>
                <Option value="Http://">Http://</Option>
                <Option value="Https://">Https://</Option>
            </Select>
        );

        getFieldDecorator('headers', { initialValue: [] });
        const headers = getFieldValue('headers');
        const formItems = headers.map((k, index) => {
            return (
                <div>
                    <Col sm={22} md={22}>
                        <Form.Item key={k} style={{ marginBottom: 5 }}>
                            {getFieldDecorator(`names[${k}].header`, {
                                validateTrigger: ['onChange', 'onBlur']
                            })(
                                <Input placeholder="passenger name" style={{ marginRight: 8 }} />
                            )}
                        </Form.Item>
                    </Col>
                    {headers.length >= 1 ? (
                        <Col sm={2} md={2}>
                            <Icon
                                style={{ marginLeft: 10 }}
                                className="dynamic-delete-button"
                                type="minus-circle-o"
                                disabled={headers.length === 1}
                                onClick={() => this.remove(k)}
                            />
                        </Col>
                    ) : null}
                </div>
            );
        });

        return (
            <div style={{ marginBottom: 10 }}>
                <Form>
                    <Row>
                        <Col sm={24}>
                            <Form.Item>
                                {getFieldDecorator('url', {
                                    initialValue: 'httpbin.org/get',
                                    rules: [{ required: true, message: 'Please input the url!' }]
                                })(
                                    <Input addonBefore={prefixSelector} suffix={<Button type="primary" onClick={this.handleForm}>Send</Button>} placeholder="endpoint.com.br" />
                                )}
                            </Form.Item>
                        </Col>
                    </Row>
                    <div style={{ padding: 24, background: '#fff' }}>
                        <Row gutter={16}>
                            <Col sm={8}>
                                <Row>
                                    {formItems}
                                </Row>
                                <Button type="dashed" onClick={this.add} style={{ width: '100%' }}>
                                    <Icon type="plus" /> Add Header
                                </Button>
                            </Col>
                            <Col sm={16}>
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