// import a from './a.ts'; // TS警告：导入路径不能已.ts扩展名结束 
// import a from './a'; // 默认匹配a.js 需要修改webpack配置

import './main.css';
import popup from './components/popup/popup';

let listItem = document.querySelectorAll('#list li');

for(let i =0; i < listItem.length; i++) {
  listItem[i].addEventListener('click', function() {
    let { url, title } = this.dataset;
    console.error('hehe')
    popup({
      width: '200px',

    })
  })
}