import React from 'react';
import { Card } from 'antd';

function Login() {
  return (
    <div className="layout-padding">
      <Card title="Redux Test" className="mb-16">
        <p>redux count : 1</p>
        <p>redux countAlias : 2</p>
      </Card>
    </div>
  );
}

export default Login;
