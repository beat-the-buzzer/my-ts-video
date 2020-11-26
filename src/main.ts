// import a from './a.ts'; // TS警告：导入路径不能已.ts扩展名结束 
// import a from './a'; // 默认匹配a.js 需要修改webpack配置

import './main.css';
import popup from './components/popup/popup';
import video from './components/video/video';

let listItem = document.querySelectorAll('#list li');

for(let i =0; i < listItem.length; i++) {
  listItem[i].addEventListener('click', function() {
    let { url, title } = this.dataset;
    popup({
      width: '880px',
      height: '556px',
      title,
      pos: 'center',
      mask: true,
      content(ele) {
        console.log('打印出元素');
        console.log(ele);
        video({
          url,
          ele,
        })
      }

    })
  })
}