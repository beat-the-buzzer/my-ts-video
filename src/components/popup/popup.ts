// import './popup.css';  // 全局引入CSS
// import styles from './popup.css'; // 报错，TS不会识别CSS文件 需要写声明文件
let styles = require('./popup.css').default ? require('./popup.css').default : require('./popup.css');

// 与接口文档相关，用于规范组件使用人员和组件文档的编写
interface Ipopup {
  width?: string;
  height?: string;
  title?: string;
  pos?: string;
  mask?: boolean;
  content?: (conten: HTMLElement) => void;
}

// 这个接口的规范可以从其他文件里面import进去
// 组件的接口，用于规范组件开发人员
interface Icomponent {
  tempContainer: HTMLElement;
  init: () => void;
  template: () => void;
  handle: () => void;
  createMask: () => void;
}

function popup(options: Ipopup) {
  return new Popup(options);
}

class Popup implements Icomponent {
  constructor(private settings: Ipopup) {
    // 默认值设置
    this.settings = Object.assign({
      width: '100%',
      height: '100%',
      title: '',
      pos: 'center',
      mask: true,
      content: function() {},
      contentCallback: function() {}
    }, this.settings);
    this.init();
  }
  tempContainer;
  mask;
  // 初始化
  init() {
    this.template();
    this.settings.mask && this.createMask();
    this.handle();
    this.contentCallback();
  }
  
  // 创建模板
  template() {
    // 取传过来的参数，进行赋值操作
    this.tempContainer = document.createElement('div');
    this.tempContainer.style.width = this.settings.width;
    this.tempContainer.style.height = this.settings.height;
    this.tempContainer.className = styles.popup;
    // this.tempContainer.innerHTML = `<h1 class="${styles.popup}">hello world!</h1>`;
    this.tempContainer.innerHTML = `
    <div class="${styles['popup-title']}">
      <h3>${this.settings.title}</h3>
      <i class="iconfont icon-guanbi"></i>
    </div>
    <div class="${styles['popup-content']}"></div>
    `
    document.body.appendChild(this.tempContainer);

    // 设置弹出层的位置
    if(this.settings.pos === 'left') {
      this.tempContainer.style.left = 0;
      this.tempContainer.style.top = window.innerHeight - this.tempContainer.offsetHeight;
    } else if(this.settings.pos === 'right') {
      this.tempContainer.style.right = 0;
      this.tempContainer.style.top = window.innerHeight - this.tempContainer.offsetHeight;
    } else { // 传错了也走center的逻辑
      this.tempContainer.style.left = ((window.innerWidth - this.tempContainer.offsetWidth) / 2) + 'px';
      this.tempContainer.style.top = ((window.innerHeight - this.tempContainer.offsetHeight) / 2) + 'px';
    }

  }

  // 事件操作
  handle() {
    let popupClose = this.tempContainer.querySelector(`.${styles['popup-title']} i`);
    popupClose.addEventListener('click', () => {
      document.body.removeChild(this.tempContainer);
      this.settings.mask && document.body.removeChild(this.mask);
    });
  }

  // 创建遮罩的操作
  createMask() {
    this.mask = document.createElement('div');
    this.mask.className = styles.mask;
    document.body.appendChild(this.mask);
  }

  contentCallback() {
    let popupContent = this.tempContainer.querySelector(`.${styles['popup-content']}`);
    this.settings.content(popupContent); // 上面指定了类型，必须要传htmlElement对象
  }
}

export default popup