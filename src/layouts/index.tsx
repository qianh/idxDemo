import React from 'react';
import './index.css';

const BasicLayout: React.FC = props => {
  return (
    <div className="layout-normal">
      <h1 className="title">Yay! Welcome to umi!</h1>
      {props.children}
    </div>
  );
};

export default BasicLayout;
