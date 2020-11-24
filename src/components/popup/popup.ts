// 与接口文档相关，用于规范组件使用人员和组件文档的编写
interface Ipopup {
  width?: string;
  height?: string;
  title?: string;
  pos?: string;
  mask?: boolean;
  content?: () => void;
}

// 这个接口的规范可以从其他文件里面import进去
// 组件的接口，用于规范组件开发人员
interface Icomponent {
  tempContainer: HTMLElement;
  init: () => void;
  template: () => void;
  handle: () => void;
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
      content: function() {}
    }, this.settings);
    this.init();
  }
  tempContainer;
  // 初始化
  init() {
    this.template();
  }
  
  // 创建模板
  template() {
    this.tempContainer = document.createElement('div');
    this.tempContainer.innerHTML = `<h1>hello world!</h1>`;
    document.body.appendChild(this.tempContainer);
  }

  // 事件操作
  handle() {

  }
}

export default popup