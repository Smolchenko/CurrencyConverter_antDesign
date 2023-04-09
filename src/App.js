import { useState } from "react";
import { Layout, Col, Row } from "antd";

import CurrencyCalculationForm from "./CurrencyCalculation";
import SelectedPairs from "./SelectedPairs";

import "./styles.css";

const { Header, Content, Footer } = Layout;

export default function App() {
  const [base_currency, setBaseCurrency] = useState("");
  const [target_currency, setTargetCurrency] = useState("");
  const [activeButton, setActiveButton] = useState("");

  const handleCurrencySelection = (pair) => {
    setBaseCurrency(pair.base);
    setTargetCurrency(pair.target);
  };

  const handleSetActiveButton = (pair) => {
    setActiveButton(`${pair.base}.${pair.target}`);
  };

  return (
    <Layout>
      <Header
        style={{
          padding: "0 24px",
          background: "#525E75",
          color: "#fff",
          fontSize: "18px"
        }}
      >
        Currency Converter
      </Header>
      <Content style={{ margin: "24px 16px 0" }}>
        <Row>
          <Col
            // style={{ backgroundColor: "blue" }}
            xs={{ span: 24, order: 2 }}
            md={{ span: 18, order: 1 }}
            lg={{ span: 15, offset: 3 }}
          >
            <CurrencyCalculationForm
              base_currency={base_currency}
              target_currency={target_currency}
              setActiveButton={handleSetActiveButton}
            />
          </Col>
          <Col
            xs={{ span: 24, order: 1 }}
            md={{ span: 6, order: 2 }}
            lg={{ span: 3, offset: -3 }}
          >
            <SelectedPairs
              onCurrencySelection={handleCurrencySelection}
              onUpdateActiveButton={handleSetActiveButton}
              activeButton={activeButton}
            />
          </Col>
        </Row>
      </Content>
      <Footer>Reenie Smooch ©2023</Footer>
    </Layout>
  );
}
