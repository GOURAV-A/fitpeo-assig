import React, { useState } from 'react';
import { Button, Form, Input, Space } from 'antd';
 
const SubmitButton = ({ form, onClick }) => {
  const [submittable, setSubmittable] = React.useState(false);
 
  // Watch all values
  const values = Form.useWatch([], form);
  React.useEffect(() => {
    form
      .validateFields({
        validateOnly: true,
      })
      .then(
        () => {
          setSubmittable(true);
        },
        () => {
          setSubmittable(false);
        },
      );
  }, [values]);
 
  return (
    <Button type="primary" htmlType="submit" disabled={!submittable} onClick={onClick}>
      Submit
    </Button>
  );
};
 
const App = () => {
  const [form] = Form.useForm();
  const formStyle = {
    backgroundColor: '#f0f2f5',
    padding: '20px',
    borderRadius: '8px',
  };
 
  const [data, setData] = useState('');
 
  const saveData = () => {
    // Extract necessary values from the form
    const formData = form.getFieldsValue(['name', 'email', 'mobile']);
    setData([...data, formData]);
    localStorage.setItem('myData', JSON.stringify(formData));
  };
 
  return (
    <Form form={form} name="validateOnly" layout="vertical" autoComplete="off" style={formStyle}>
      <Form.Item
        name="name"
        label="Name"
        rules={[
          {
            required: true,
          },
        ]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        name="email"
        label="Email"
        rules={[
          {
            required: true,
          },
        ]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        name="mobile"
        label="Mobile"
        rules={[
          {
            required: true,
          },
        ]}
      >
        <Input />
      </Form.Item>
      <Form.Item>
        <Space>
          <SubmitButton form={form} onClick={saveData} />
          <Button htmlType="reset">Reset</Button>
        </Space>
      </Form.Item>
    </Form>
  );
};
 
export default App;