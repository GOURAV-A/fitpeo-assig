
import React from "react";
import {
  FileOutlined,
  PieChartOutlined,
  TeamOutlined,
  UserOutlined,
  SettingFilled,
} from "@ant-design/icons";
import { Layout, Menu, theme, Input, Row, Col, Card, Table, Button, Modal } from "antd";
import "./app.scss";
import DonutChartComponent from "./DonutChartComponent";
import BarChartComponent from "./BarChartComponent";
import { BrowserRouter as Router, Link, Route, Routes } from "react-router-dom";
import ModalForm from "./ModalForm";
 
 
 
 
const { Header, Content, Sider } = Layout;
const { Search } = Input;
function getItem(label, key, icon, children) {
  return {
    key,
    icon,
    children,
    label,
  };
}
 
const items = [
  getItem("Dashboard", "1", <PieChartOutlined />),
  getItem("Product", "sub1", <UserOutlined />, [
    getItem("Product 1", "3"),
    getItem("Product 2", "4"),
    getItem("Product 3", "5"),
  ]),
  getItem("Customer", "sub2", <TeamOutlined />, [
    getItem("Team 1", "6"),
    getItem("Team 2", "8"),
  ]),
  getItem("Help", "9", <FileOutlined />),
];
const App = () => {
  const [isModalVisible, setIsModalVisible] = React.useState(false);
 
  const showModal = () => {
    setIsModalVisible(true);
  };
 
  const handleOk = () => {
    setIsModalVisible(false);
  };
 
  const handleCancel = () => {
    setIsModalVisible(false);
  };
 
  const {
    token: { colorBgContainer },
  } = theme.useToken();
 
  const columns = [
    {
      title: "Product name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Stock",
      dataIndex: "stock",
      key: "stock",
    },
    {
      title: "Price",
      dataIndex: "price",
      key: "price",
    },
    {
      title: "Total Sales",
      dataIndex: "number",
      key: "sales",
    },
  ];
 
  const dataSource = [
    {
      key: "1",
      name: "Abstract 3D",
      stock: "32 in Stock",
      price: "$45.99",
      number: "20",
    },
    {
      key: "2",
      name: "Sarphens Illustrations",
      stock: "32 in Stock",
      price: "$45.99",
      number: "20",
    },
  ];
 
  return (
    <Layout>
      <Layout>
        <Sider>
          <div className="demo-logo-vertical" />
          <div className="siderHeading">
            <SettingFilled />
            Dashboard
          </div>
          <Menu
            theme="dark"
            defaultSelectedKeys={["1"]}
            mode="inline"
            items={items}
          />
        </Sider>
 
        <Layout
          style={{
            padding: "0 24px 24px",
          }}
        >
          <Header>
            <div className="header_name">Hello fitpeo,</div>
            <Search
              placeholder="search"
              style={{
                width: 200,
              }}
            />
            <Button type="primary" onClick={showModal}>
              Modal
            </Button>
          </Header>
 
          <Modal
            title="Form "
            visible={isModalVisible}
            onOk={handleOk}
            onCancel={handleCancel}
          >
            <ModalForm />
          </Modal>
 
          <Content
            className="Conatiner"
            style={{
              padding: 24,
              margin: 0,
              minHeight: 280,
              background: colorBgContainer,
            }}
          >
            <Row className="row1" gutter={16}>
              <Col span={6}>
                <Card className="card" bordered={false}>
                  <div className="image">
                    <img src="public/earning.webp" alt="earnings" />
                  </div>
                  <div className="info">
                    <div className="head">Earning</div>
                    <div className="price">$198k</div>
                    <div className="percent">
                      <span className="green">37.8%</span> this month
                    </div>
 
                  </div>
                </Card>
              </Col>
              <Col span={6}>
                <Card className="card" bordered={false}>
                  <div className="image">
                    <img src="public/orders.webp" alt="order" />
                  </div>
                  <div className="info">
                    <div className="head">Orders</div>
                    <div className="price">$2.4k</div>
                    <div className="percent">
                      <span className="red">2.8%</span> this month
                    </div>
                  </div>
                </Card>
              </Col>
              <Col span={6}>
                <Card className="card" bordered={false}>
                  <div className="image">
                    <img src="public/recharge.png" alt="balance" />
                  </div>
                  <div className="info">
                    <div className="head">Balance</div>
                    <div className="price">$2.4k</div>
                    <div className="percent">
                      <span className="red">2%</span> this month
                    </div>
                  </div>
                </Card>
              </Col>
              <Col span={6}>
                <Card className="card" bordered={false}>
                  <div className="image">
                    <img src="public/sales.webp" alt="sales" />
                  </div>
                  <div className="info">
                    <div className="head">Total Sales</div>
                    <div className="price">$89k</div>
                    <div className="percent">
                      <span className="green">11.8%</span> this week
                    </div>
                  </div>
                </Card>
              </Col>
            </Row>
            <Row className="row2" gutter={16} style={{ marginTop: "24px" }}>
              <Col span={16}>
                <Card className="barChart" bordered={false}>
                  <div className="head">Overview</div>
                  <div className="info">Monthly Earning</div>
                  <BarChartComponent />
                </Card>
              </Col>
              <Col span={8}>
                <Card className="donutChart" bordered={false}>
                  <div className="head">Customers</div>
                  <div className="info">Customers that buy products</div>
                  <DonutChartComponent />
                </Card>
              </Col>
            </Row>
            <Row gutter={16} style={{ marginTop: "24px" }}>
              <Col span={24}>
                <Card bordered={true}>
                  <Table dataSource={dataSource} columns={columns} />
                </Card>
              </Col>
            </Row>
          </Content>
        </Layout>
 
      </Layout>
    </Layout>
  );
};
export default App;