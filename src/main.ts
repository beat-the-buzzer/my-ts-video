// import a from './a.ts'; // TS警告：导入路径不能已.ts扩展名结束 
import a from './a'; // 默认匹配a.js 需要修改webpack配置
import './a.css';

// let a: string = 'hello world!';
console.log(a);