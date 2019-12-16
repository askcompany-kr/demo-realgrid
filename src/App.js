import React from 'react';
import './App.css';
import { RealGridExample } from "./RealGrid";
import {Col, Row} from "antd";
import JqGrid from "./JqGrid";


function App() {
  return (
    <div>
      <h1>RealGrid와 jqxGrid 비교</h1>
      <Row>
        <Col span={24}>
          <h2>Real Grid</h2>
          <div style={{ padding: 10 }}>
            <RealGridExample style={{ height: 500 }} />
          </div>
        </Col>
        <Col span={24}>
          <h2>jqxGrid</h2>
          <div style={{ padding: 10 }}>
            <JqGrid />
          </div>
        </Col>
      </Row>
    </div>
  );
}


export default App;
