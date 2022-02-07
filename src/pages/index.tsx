import React from 'react';
import './index.css';
import { DEFAULT } from './hello';

export default function() {
  return (
    <div className="normal">
      <div className="welcome" />
      <ul className="list">
        <li>To get started, edit <code>src/pages/index.js</code> and save to reload.</li>
        <li>
          <a href="https://umijs.org/guide/getting-started.html">
            {`开始${DEFAULT}中文增量啊啦啦啦3123123`}
          </a>
        </li>
      </ul>
    </div>
  );
}
