

import React from 'react';
import theme from './theme';
import { ConfigProvider, Modal } from 'antd';

export function rootContainer(container: React.ReactNode) {
  Modal.config({
    rootPrefixCls: `${theme['ant-prefix']}`,
  });
  return React.createElement(ConfigProvider, {
    prefixCls: theme["ant-prefix"]
  }, container);
}

