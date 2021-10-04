import React from 'react';
import ReactDOM from 'react-dom';
import App from '@/app/app';
import 'antd/dist/antd.css';
import '@/styles/styles.less';
import 'cropperjs/dist/cropper.css';

ReactDOM.render(<App />, document.getElementById('root'));

if (module.hot) {
  module.hot.accept();
}
