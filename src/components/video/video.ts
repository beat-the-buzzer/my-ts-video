import tools from "../tools";

let styles = require('./video.css').default ? require('./video.css').default : require('./video.css');

interface Ivideo {
  url: string;
  ele: HTMLElement | string; // 联合类型
  width?: string;
  height?: string;
  autoplay?: boolean;
}

// 这个接口的规范可以从其他文件里面import进去
// 组件的接口，用于规范组件开发人员
interface Icomponent {
  tempContainer: HTMLElement;
  init: () => void;
  template: () => void;
  handle: () => void;
}

function video(options: Ivideo) {
  return new Video(options);
}

class Video implements Icomponent{
  constructor(private settings: Ivideo) {
    this.settings = Object.assign({
      width: '100%',
      height: '100%',
      autoplay: false,
    }, this.settings);
    this.init();
  }
  tempContainer;
  init() {
    this.template();
    this.handle();
  };
  template() {
    this.tempContainer = document.createElement('div');
    this.tempContainer.className = styles.video;
    this.tempContainer.style.width = this.settings.width;
    this.tempContainer.style.height = this.settings.height;
    this.tempContainer.innerHTML = `
      <video class="${styles['video-content']}" src="${this.settings.url}"></video>
      <div class="${styles['video-controls']}">
        <div class="${styles['video-progress']}">
          <div class="${styles['video-progress-now']}"></div>
          <div class="${styles['video-progress-suc']}"></div>
          <div class="${styles['video-progress-bar']}"></div>
        </div>
        <div class="${styles['video-play']}">
          <i class="iconfont icon-bofang"></i>
        </div>
        <div class="${styles['video-time']}">
          <span>00:00</span>/<span>00:00</span>
        </div>
        <div class="${styles['video-full']}">
          <i class="iconfont icon-quanping"></i>
        </div>
        <div class="${styles['video-voice']}">
          <i class="iconfont icon-yinliangdefuben"></i>
          <div class="${styles['video-vprogress']}">
            <div class="${styles['video-vprogress-now']}"></div>
            <div class="${styles['video-vprogress-bar']}"></div>
          </div>
        </div>
      </div>
    `;
    if(typeof this.settings.ele === 'string') {
      document.querySelector(`${this.settings.ele}`).appendChild(this.tempContainer);
    } else {
      console.log(this.tempContainer)
      this.settings.ele.appendChild(this.tempContainer);
    }
  };
  handle() {
    let videoContent = this.tempContainer.querySelector(`.${styles['video-content']}`);
    let videoControls = this.tempContainer.querySelector(`.${styles['video-controls']}`);
    let videoPlay = this.tempContainer.querySelector(`.${styles['video-controls']} i`);
    let videoTimes = this.tempContainer.querySelectorAll(`.${styles['video-time']} span`);

    let timer;

    // 视频加载完毕
    videoContent.addEventListener('canplay', () => {
      videoTimes[1].innerHTML = tools.formatTime(videoContent.duration); // 转成时间和秒 
    });

    // 视频播放事件
    videoContent.addEventListener('play', () => {
      videoPlay.className = 'iconfont icon-zanting';
      timer = setInterval(playing, 1000);
    });

    // 视频暂停事件
    videoContent.addEventListener('pause', () => {
      videoPlay.className = 'iconfont icon-bofang';
      clearInterval(timer);
    });

    videoPlay.addEventListener('click', () => {
      if(videoContent.paused) {
        videoContent.play();
      } else {
        videoContent.pause();
      }
    })

    function playing() {
      videoTimes[0].innerHTML = tools.formatTime(videoContent.currentTime);
    }
  };


}

export default video;