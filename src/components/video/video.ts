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
    // 定义类型为HTMLVideoElement， 后面在调用相关方法的时候，IDE就会有相关提示
    let videoContent: HTMLVideoElement = this.tempContainer.querySelector(`.${styles['video-content']}`);
    let videoControls = this.tempContainer.querySelector(`.${styles['video-controls']}`);
    let videoPlay = this.tempContainer.querySelector(`.${styles['video-controls']} i`);
    let videoTimes = this.tempContainer.querySelectorAll(`.${styles['video-time']} span`);
    let videoFull = this.tempContainer.querySelector(`.${styles['video-full']} i`);
    let videoProgress = this.tempContainer.querySelectorAll(`.${styles['video-progress']} div`);
    let videoVprogress = this.tempContainer.querySelectorAll(`.${styles['video-vprogress']} div`);

    let timer;
    videoContent.volume = 0.5; // 初始化音量

    // 对自动播放功能的实现
    if(this.settings.autoplay){
      timer = setInterval(playing, 1000);
      videoContent.play();
    }

    this.tempContainer.addEventListener('mouseenter', () => {
      videoControls.style.bottom = 0;
    });

    this.tempContainer.addEventListener('mouseleave', () => {
      videoControls.style.bottom = '-60px';
    });

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

    // 播放-暂停按钮的点击事件
    videoPlay.addEventListener('click', () => {
      if(videoContent.paused) {
        videoContent.play();
      } else {
        videoContent.pause();
      }
    });

    // 播放-暂停按钮的点击事件
    videoFull.addEventListener('click', () => {
      videoContent.requestFullscreen();
    });

    // 拖拽进度条的功能
    videoProgress[2].addEventListener('mousedown', function(e: MouseEvent) {
      let downX = e.pageX; // 鼠标按下时候的位置
      let downL = this.offsetLeft; // 当前播放的位置
      document.onmousemove = (e: MouseEvent) => {
        // 在拖动的过程中更新比例
        let scale = (e.pageX - downX + downL + 8) / this.parentNode.offsetWidth;
        if(scale < 0) {
          scale = 0
        } else if(scale > 1) {
          scale = 1;
        }
        videoProgress[0].style.width = `${scale * 100}%`;
        videoProgress[1].style.width = `${scale * 100}%`;
        this.style.left = `${scale * 100}%`;
        videoContent.currentTime = scale * videoContent.duration; // 当前播放时间发生变化，完成视频的拖动功能
      };
      document.onmouseup = (e: MouseEvent) => {
        document.onmousemove = null;
        document.onmouseup = null;
      }
      e.preventDefault();
    });

    // 拖拽进度条的功能
    videoVprogress[1].addEventListener('mousedown', function(e: MouseEvent) {
      let downX = e.pageX; // 鼠标按下时候的位置
      let downL = this.offsetLeft; // 当前播放的位置
      document.onmousemove = (e: MouseEvent) => {
        // 在拖动的过程中更新比例
        let scale = (e.pageX - downX + downL + 8) / this.parentNode.offsetWidth;
        if(scale < 0) {
          scale = 0
        } else if(scale > 1) {
          scale = 1;
        }
        videoVprogress[0].style.width = `${scale * 100}%`;
        this.style.left = `${scale * 100}%`;
        videoContent.volume = scale;
      };
      document.onmouseup = (e: MouseEvent) => {
        document.onmousemove = null;
        document.onmouseup = null;
      }
      e.preventDefault();
    });

    // 正在播放中的监听
    function playing() {
      videoTimes[0].innerHTML = tools.formatTime(videoContent.currentTime); // 播放时间设置
      let scale = videoContent.currentTime / videoContent.duration; // 当前时间除以总时间
      let scaleSuc = videoContent.buffered.end(0) / videoContent.duration; // 缓存节点时间除以总时间
      videoProgress[0].style.width = `${scale * 100}%`; // 当前播放进度
      videoProgress[1].style.width = `${scaleSuc * 100}%`; // 当前播放进度
      videoProgress[2].style.left = `${scale * 100}%`; // bar的位置
    }
  };


}

export default video;