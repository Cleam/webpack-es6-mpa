var Arr = {
  /**
   * 获取数组1中排除数组2中的值之后的数组
   * @param  {[type]} arr1 仅包含基本数据类型值的数组1
   * @param  {[type]} arr2 仅包含基本数据类型值的数组2
   * @returns 新数组
   */
  difference(arr1, arr2) {
    try {
      let arr = [];
      let i = 0;
      let len1 = arr1.length;
      for (i = 0; i < len1; i++) {
        if (!arr2.contains(arr1[i])) {
          arr.push(arr1[i]);
        }
      }
      return arr;
    } catch (e) {
      return arr1;
    }
  },
  /**
   * 打乱数组
   * @param  {[type]} arr 目标数组
   * @return {[type]}     [description]
   */
  upsetArr(arr) {
    return arr.sort(function() {
      return 0.5 - Math.random();
    });
  }
};

let ua = navigator.userAgent;
var Browser = {
  wechat: ua.indexOf('MicroMessenger') > -1, // 在微信中打开
  weibo: ua.toLowerCase().indexOf('weibo') > -1, // 在新浪微博客户端打开
  qq: ua.indexOf('QQ/') > -1, // 在QQ、QQ空间中打开
  qqbrowser: ua.indexOf('MQQBrowser') > -1, // 在QQ空间打开
  /**
   * browser的判断
   * @return {[type]} [description]
   */
  getBrowserType() {
    var agent = ua.toLowerCase();
    var browserType = '';
    if (agent.indexOf('msie') > 0) {
      browserType = 'IE';
    }
    if (agent.indexOf('firefox') > 0) {
      browserType = 'firefox';
    }
    if (
      agent.indexOf('chrome') > 0 &&
      agent.indexOf('mb2345browser') < 0 &&
      agent.indexOf('360 aphone browser') < 0
    ) {
      browserType = 'chrome';
    }
    if (agent.indexOf('360 aphone browser') > 0 || agent.indexOf('qhbrowser') > 0) {
      browserType = '360';
    }
    if (agent.indexOf('ucbrowser') > 0) {
      browserType = 'UC';
    }
    if (agent.indexOf('micromessenger') > 0) {
      browserType = 'WeChat';
    }
    if (
      (agent.indexOf('mqqbrowser') > 0 || agent.indexOf('qq') > 0) &&
      agent.indexOf('micromessenger') < 0
    ) {
      browserType = 'QQ';
    }
    if (agent.indexOf('miuibrowser') > 0) {
      browserType = 'MIUI';
    }
    if (agent.indexOf('mb2345browser') > 0) {
      browserType = '2345';
    }
    if (agent.indexOf('sogoumobilebrowser') > 0) {
      browserType = 'sogou';
    }
    if (agent.indexOf('liebaofast') > 0) {
      browserType = 'liebao';
    }
    if (agent.indexOf('weibo') > 0) {
      browserType = 'weibo';
    }
    if (
      agent.indexOf('safari') > 0 &&
      agent.indexOf('chrome') < 0 &&
      agent.indexOf('ucbrowser') < 0 &&
      agent.indexOf('micromessenger') < 0 &&
      agent.indexOf('mqqbrowser') < 0 &&
      agent.indexOf('miuibrowser') < 0 &&
      agent.indexOf('mb2345browser') < 0 &&
      agent.indexOf('sogoumobilebrowser') < 0 &&
      agent.indexOf('liebaofast') < 0 &&
      agent.indexOf('qhbrowser') < 0 &&
      agent.indexOf('weibo') < 0
    ) {
      browserType = 'safari';
    }
    return browserType;
  }
};

var Cookie = {
  /**
   * 设置cookie
   * @param name 名称
   * @param value 值
   * @param expires 有效时间（单位：小时）（可选） 默认：24h
   */
  set(name, value, expires) {
    const expTimes = expires ? Number(expires) * 60 * 60 * 1000 : 24 * 60 * 60 * 1000; // 毫秒
    const expDate = new Date();
    expDate.setTime(expDate.getTime() + expTimes);
    const expString = `; expires=${expDate.toUTCString()}`;
    const pathString = '; path=/';
    document.cookie = `${name}=${encodeURI(value)}${expString}${pathString}`;
  },
  /**
   * 读cookie
   * @param name
   */
  get(name) {
    const cookieStr = `; ${document.cookie}; `;
    const index = cookieStr.indexOf(`; ${name}=`);
    if (index !== -1) {
      let s = cookieStr.substring(index + name.length + 3, cookieStr.length);
      return decodeURI(s.substring(0, s.indexOf('; ')));
    } else {
      return null;
    }
  },
  /**
   * 删除cookie
   * @param name
   */
  del(name) {
    const exp = new Date(new Date().getTime() - 1);
    const s = this.get(name);
    if (s !== null) {
      document.cookie = `${name}=${s}; expires=${exp.toUTCString()}; path=/`;
    }
  }
};

var DateTime = {
  /**
   * 字符串转换成时间戳（毫秒）
   * @param  {string} str 时间字符串（格式：yyyy-MM-dd HH:mm 或 yyyy/MM/dd HH:mm）
   * 注意：iphone不支持（格式：2016-02-26 09:12）需要转换成：（格式：2016/02/26 09:12）
   * @return {number}     [description]
   */
  strToTimestamp: function(str) {
    return Date.parse(str.replace(/-/g, '/'));
  },
  strToDate: function(str) {
    return new Date(str.replace(/-/g, '/'));
  },
  /**
   * 时间戳转换为字符串
   * @param  {[type]} t 时间戳
   * @param  {[type]} splitStr 分隔符
   * @return {[type]}   [description]
   */
  timestampToDateStr: function(t, splitStr) {
    return this.dateToString(this.timestampToDate(t), splitStr);
  },

  /**
   * 时间戳转日期时间
   * @param  {[type]} t 时间戳
   * @return {[type]}   日期时间
   */
  timestampToDate: function(t) {
    return new Date(t);
  },

  /**
   * 日期转字符串（默认不带年份）
   * @param  {[type]} d           日期时间
   * @param  {[type]} splitStr 分隔符
   * @return {[type]}             默认返回 MM-dd HH:mm
   */
  dateToString(d, splitStr, withYear = false) {
    var year = d.getFullYear().toString(),
      month = (d.getMonth() + 1).toString(),
      day = d.getDate().toString(),
      h = d.getHours().toString(),
      m = d.getMinutes().toString();
    month = month.length > 1 ? month : `0${month}`;
    day = day.length > 1 ? day : `0${day}`;
    h = h.length > 1 ? h : `0${h}`;
    m = m.length > 1 ? m : `0${m}`;
    var str = `${(withYear ? `${year}-` : '') + month}-${day} ${h}:${m}`; // MM-dd HH:mm
    if (splitStr) {
      str = str.replace(/-/g, splitStr);
    }
    return str;
  },

  /**
   * 日期转字符串(带年份)
   * @param  {Date} d           日期时间
   * @param  {string} splitStr 分隔符
   * @return {string}             默认返回 yyyy-MM-dd HH:mm
   */
  dateToStringWithYear: function(d, splitStr) {
    return this.dateToString(d, splitStr, true);
  },
  /**
   * 计算指定时间与当前时间的时间差 并转换成相应格式字符串
   * 如：xx分钟前，xx小时前，昨天 HH:mm，前天 HH:mm，MM-dd HH:mm
   * @param  {string} str 时间字符串（格式：2016-02-26 09:12）
   * @return {string}
   */
  getSpecialTimeStr: function(str) {
    const targetDate = this.strToDate(str);
    const targetTime = targetDate.getTime();
    const targetGetDate = targetDate.getDate();
    const currentDate = new Date();
    const currentTime = currentDate.getTime();
    const currentGetDate = currentDate.getDate();
    if (!targetTime) {
      return false;
    }

    const tdoa = Number(currentTime - targetTime),
      dayTime = 24 * 60 * 60 * 1000, // 1天
      hourTime = 60 * 60 * 1000, // 1小时
      minuteTime = 60 * 1000; // 1分钟

    // 天
    const h = tdoa / dayTime;
    if (h < 2) {
      if (currentGetDate - targetGetDate === 1) {
        return '昨天';
      } else if (currentGetDate - targetGetDate === 2) {
        return '前天';
      } else if (currentGetDate - targetGetDate === 0) {
        if (tdoa >= hourTime) {
          // 小时
          return `${Math.floor(tdoa / hourTime)}小时前`;
        } else if (tdoa >= minuteTime) {
          return `${Math.floor(tdoa / minuteTime)}分钟前`;
        } else {
          return '最新';
          // return Math.floor(tdoa / 1000) + '秒前';
        }
      }
    } else if (h >= 2 && h < 3 && currentGetDate - targetGetDate === 2) {
      return '前天';
    } else {
      return this.dateToString(targetDate);
    }
  },
  /**
   * 秒转成时间字符串
   * @param  {Number}  seconds 秒[必需]
   * @param  {Boolean} hasHour 是否需要区分小时[可选]
   * @return {String}          hasHour[true]: hh:mm:ss；否则[默认]：mm:ss。
   */
  secondsToTimestr(seconds, hasHour = false) {
    var hh, mm, ss;
    // 传入的时间为空或小于0
    if (seconds == null || seconds < 0) {
      return;
    }
    seconds = Math.ceil(seconds);
    // 得到小时
    hh = parseInt(seconds / 3600) | 0;
    seconds = parseInt(seconds) - hh * 3600;
    if (hh < 10) {
      hh = `0${hh}`;
    }
    // 得到分
    mm = (seconds / 60) | 0;
    if (parseInt(mm) < 10) {
      mm = `0${mm}`;
    }
    // 得到秒
    ss = parseInt(seconds) - mm * 60;
    if (ss < 10) {
      ss = `0${ss}`;
    }
    if (hasHour) {
      return `${hh}:${mm}:${ss}`;
    }
    return `${mm}:${ss}`;
  },
  /**
   * 时间戳转成时间字符串
   * @param  {Number}  seconds 时间戳[必需]
   * @param  {Boolean} hasHour 是否需要区分小时[可选]
   * @return {String}          hasHour[true]: hh:mm:ss；否则[默认]：mm:ss。
   */
  timestampToTimestr: function(ts, hasHour) {
    var seconds = ts ? Number(ts) / 1000 : 0;
    seconds = (parseInt(seconds) % (60 * 60 * 24)) + 8 * 60 * 60; //北京时间东八区加八个小时
    return this.secondsToTimestr(seconds, hasHour);
  }
};

var Html = {
  /**
   * 动态加载js文件
   * @param  {string}   url      js文件的url地址
   * @param  {Function} callback 加载完成后的回调函数
   */
  getScript(url, callback, element) {
    var head = document.getElementsByTagName('head')[0],
      js = document.createElement('script');

    js.setAttribute('type', 'text/javascript');
    js.setAttribute('src', url);
    if (element) {
      element.appendChild(js);
    } else {
      head.appendChild(js);
    }
    //执行回调
    var callbackFn = function() {
      if (typeof callback === 'function') {
        callback();
      }
    };

    if (document.all) {
      // IE
      js.onreadystatechange = function() {
        if (js.readyState === 'loaded' || js.readyState === 'complete') {
          callbackFn();
        }
      };
    } else {
      js.onload = function() {
        callbackFn();
      };
    }
  },
  /**
   * 动态创建广告代码
   * @param  {string}   scriptCode     脚本代码
   * @param  {Function} callback   回调
   * @param  {DOM}   element  js代码父级标签
   * @return {undefined}
   */
  createScript(scriptCode, callback, element) {
    if (scriptCode) {
      var head = document.getElementsByTagName('head')[0],
        js = document.createElement('script');
      js.setAttribute('type', 'text/javascript');
      js.innerHTML = scriptCode;
      if (element) {
        element.appendChild(js);
      } else {
        head.appendChild(js);
      }
      //执行回调
      callback();
    }
  },
  /**
   * 动态加载css
   * @param  {String} style css代码
   * @param {Function} callback css代码加载成功后的回调函数
   * @param {DOM} element DOM节点
   */
  createStyle(style, callback, element) {
    if (style) {
      var head = document.getElementsByTagName('head')[0],
        css = document.createElement('style');
      css.innerHTML = style;
      if (element) {
        element.appendChild(css);
      } else {
        head.appendChild(css);
      }
      //执行回调
      callback && callback();
    }
  },
  /**
   * 过滤html标签
   * @param  {String} str 源字符串
   * @return {String}     过滤之后的字符串
   */
  filterHtmlTags(str) {
    if (!str || typeof str !== 'string') {
      return '';
    }
    return str.replace(/<\/?[^>]*>/g, '');
  },
  /**
   * 获取滚动高度
   * @return {[type]} [description]
   */
  getScrollTop() {
    var scrollTop = 0,
      bodyScrollTop = 0,
      documentScrollTop = 0;
    try {
      if (document.body) {
        bodyScrollTop = document.body.scrollTop;
      }
      if (document.documentElement) {
        documentScrollTop = document.documentElement.scrollTop;
      }
    } catch (e) {
      console.error(e);
    }
    scrollTop = bodyScrollTop - documentScrollTop > 0 ? bodyScrollTop : documentScrollTop;
    return scrollTop;
  }
};

var Num = {
  /**
   * 对数量进行处理，过万的数据显示“xxx万”（xxx：向上取整, 如：10.2万以及10.9万 都会转化成 11万）
   * @param  {String|Number} num 数量
   * @return {String}    处理后的数据
   */
  getSpecialCountStr(num) {
    if (typeof num !== 'string' && typeof num !== 'number') {
      return num;
    }
    num = parseInt(num, 10);
    if (num > 9999) {
      return `${Math.ceil(num / 10000)}万`;
    }
    return `${num}`;
  }
};

let u = navigator.userAgent,
  Agents = new Array('Android', 'iPhone', 'SymbianOS', 'Windows Phone', 'iPad', 'iPod'),
  mobile = false;
for (let v = 0; v < Agents.length; v++) {
  if (u.indexOf(Agents[v]) > -1) {
    mobile = true;
    break;
  }
}

var Os = {
  //移动终端浏览器版本信息
  mobile: mobile, //是否为移动终端
  ios: !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/), //ios终端
  android: u.indexOf('Android') > -1 || u.indexOf('Linux') > -1, //android终端
  iphone: u.indexOf('iPhone') > -1, //是否为iPhone或者QQHD浏览器
  ipad: u.indexOf('iPad') > -1, //是否iPad
  /**
   * OS的判断
   * @return {[type]} [description]
   */
  getOsType() {
    var agent = navigator.userAgent.toLowerCase(),
      osType = '',
      index = '',
      version = '';
    if (/android/i.test(navigator.userAgent)) {
      index = agent.indexOf('android');
      version = agent.substr(index + 8, 3);
      osType = `Android ${version}`;
    }
    if (/(iPhone|iPad|iPod|iOS)/i.test(navigator.userAgent)) {
      index = agent.indexOf('os');
      version = agent.substr(index + 3, 4);
      osType = `iOS ${version}`;
    }
    if (
      /Linux/i.test(navigator.userAgent) &&
      !/android/i.test(navigator.userAgent) &&
      !/(iPhone|iPad|iPod|iOS)/i.test(navigator.userAgent)
    ) {
      osType = 'Linux';
    }
    if (/windows|win32/i.test(navigator.userAgent)) {
      osType = 'windows32';
    }
    if (/windows|win64/i.test(navigator.userAgent)) {
      osType = 'windows64';
    }
    return osType;
  }
};

var prefixSupport,
  keyWithPrefix = function(prefix, key) {
    if (prefix !== '') {
      // 首字母大写
      return prefix + key.slice(0, 1).toUpperCase() + key.slice(1);
    }
    return key;
  };
var isPageVisibilitySupport = (function() {
  var support = false;
  if (typeof window.screenX === 'number') {
    ['webkit', 'moz', 'ms', 'o', ''].forEach(function(prefix) {
      if (support === false && document[keyWithPrefix(prefix, 'hidden')] !== undefined) {
        prefixSupport = prefix;
        support = true;
      }
    });
  }
  return support;
})();

var isHidden = function() {
  if (isPageVisibilitySupport) {
    return document[keyWithPrefix(prefixSupport, 'hidden')];
  }
  return undefined;
};

var visibilityState = function() {
  if (isPageVisibilitySupport) {
    return document[keyWithPrefix(prefixSupport, 'visibilityState')];
  }
  return undefined;
};

var PageVisibility = {
  hidden: isHidden(),
  visibilityState: visibilityState(),
  visibilitychange: function(fn, usecapture) {
    usecapture = false;
    if (isPageVisibilitySupport && typeof fn === 'function') {
      return document.addEventListener(
        `${prefixSupport}visibilitychange`,
        function(evt) {
          this.hidden = isHidden();
          this.visibilityState = visibilityState();
          fn.call(this, evt);
        }.bind(this),
        usecapture
      );
    }
    return undefined;
  }
};

var Str = {
  /**
   * 去掉空格
   * @param {string} str 目标字符串
   * @param {number} pos 可选 0: 去掉所有空格；1：去掉字符串前面空格；2：去掉字符串后面空格；默认：去掉字符串前后空格。
   */
  trim(str, pos) {
    switch (pos) {
      case 0:
        return str.replace(/\s+/g, '');
      case 1:
        return str.replace(/(^\s*)/g, '');
      case 2:
        return str.replace(/(\s*$)/g, '');
      default:
        return str.replace(/(^\s*)|(\s*$)/g, '');
    }
  },
  /**
   * 获取字符串字节数
   * @param  {string} str 目标字符串
   * @return {number}     字节数
   */
  getBytes: function(str) {
    var byteLen = 0,
      len = str.length;
    if (str) {
      for (var i = 0; i < len; i++) {
        if (str.charCodeAt(i) > 255) {
          byteLen += 2;
        } else {
          byteLen++;
        }
      }
      return byteLen;
    } else {
      return 0;
    }
  },

  /**
   * 版本号比较
   * @param {string} v1 版本号1
   * @param {string} v2 版本号2
   * @returns 返回1，表示大于；返回-1，表示小于；返回0，表示等于。
   * @link https://developers.weixin.qq.com/miniprogram/dev/framework/compatibility.html?search-key=compareversion
   * @example
   * compareVersion('1.11.0', '1.9.9'); // 1
   */
  compareVersion: function(v1, v2) {
    v1 = v1.split('.');
    v2 = v2.split('.');
    var len = Math.max(v1.length, v2.length);

    while (v1.length < len) {
      v1.push('0');
    }
    while (v2.length < len) {
      v2.push('0');
    }

    for (var i = 0; i < len; i++) {
      var num1 = parseInt(v1[i]);
      var num2 = parseInt(v2[i]);

      if (num1 > num2) {
        return 1;
      } else if (num1 < num2) {
        return -1;
      }
    }

    return 0;
  }
};

var Url = {
  /**
   * 特定字符串转换成object对象
   * @param {string} str 目标字符串
   * @example
      a=Hello&b=lizhigao&c=0&d=123&e=null
      =>
      {
        a: 'Hello',
        b: 'lizhigao',
        c: 0,
        d: 123,
        e: null
      }
   */
  parse(str) {
    if (str === undefined || str === '') {
      return {};
    }
    let obj = {};
    let arr = str.split('&');
    arr.map(value => {
      obj[value.split('=')[0]] = value.split('=')[1] || '';
    });
    return obj;
  },
  parseQueryString() {
    const str = location.search.length ? location.search.slice(1) : '';
    // const str = 'qid=null&idx=1&recommendtype=-1&ishot=1&fr=toutiao&pgnum=1';
    return this.parse(str);
  },
  /**
   * 将obj对象转换成“&”符号连接的字符串
   * @param {object} obj json对象（暂时只支持基本类型不支持嵌套对象和数组）
   * @example
   *  {
        a: 'Hello',
        b: 'lizhigao',
        c: 0,
        d: 123,
        e: null
      }
      =>
      a=Hello&b=lizhigao&c=0&d=123&e=null
   *
   */
  stringify(obj) {
    return obj
      ? Object.keys(obj)
          .map(key => {
            const value = obj[key];
            if (value === undefined) {
              return '';
            }
            return `${encodeURI(key)}=${encodeURI(value)}`;
          })
          .filter(x => x.length > 0)
          .join('&')
      : '';
  },
  /**
   * 获取url中参数的值
   * @param  {string} name 参数名
   * @return {string}      参数值，默认返回空字符串''
   */
  getQueryString(name) {
    var reg = new RegExp(`(^|&)${name}=([^&]*)(&|$)`, 'i');
    var r = window.location.search.substr(1).match(reg);
    if (r != null) return decodeURI(r[2]);
    return '';
  },
  /**
   * 获取页面来源(referer)
   * @link http://www.au92.com/archives/javascript-get-referer.html
   */
  getReferrer() {
    let referrer = '';
    try {
      referrer = window.top.document.referrer;
    } catch (e) {
      if (window.parent) {
        try {
          referrer = window.parent.document.referrer;
        } catch (e2) {
          referrer = '';
        }
      }
    }
    if (referrer === '') {
      referrer = document.referrer;
    }
    return referrer;
  },
  /**
   * 获取url（排除url中参数）
   */
  getUrlNoParams() {
    let locaUrl = window.location.href,
      endIndex = 0;
    if (locaUrl.indexOf('?') >= 0) {
      endIndex = locaUrl.indexOf('?');
      return locaUrl.substring(0, endIndex);
    }
    if (locaUrl.indexOf('#') >= 0) {
      endIndex = locaUrl.indexOf('#');
      return locaUrl.substring(0, endIndex);
    }
    return locaUrl;
  }
};

var Util = {
  /**
   * 生成唯一id（当前时间戳13位+4位数随机数）
   * @returns {string} 17位数字组成的字符串
   */
  getUid: function() {
    return (
      +new Date() +
      Math.random()
        .toString(10)
        .substring(2, 6)
    );
  },
  /**
   * 获取随机数
   * @param  {number} min 随机数下限
   * @param  {number} max 随机数上限
   * @returns 大于等于min且小于max的数
   */
  getRandom: function(min, max) {
    return Math.floor(Math.random() * (max - min) + min);
  },
  isNumber: function(s) {
    return !isNaN(s);
  },
  isString: function(s) {
    return typeof s === 'string';
  },
  isBoolean: function(s) {
    return typeof s === 'boolean';
  },
  isFunction: function(s) {
    return typeof s === 'function';
  },
  isNull: function(s) {
    return s === null;
  },
  isUndefined: function(s) {
    return typeof s === 'undefined';
  },
  isEmpty: function(s) {
    return /^\s*$/.test(s);
  },
  isArray: function(s) {
    return s instanceof Array;
  }
};

var index = {
  Arr,
  Browser,
  Cookie,
  DateTime,
  Html,
  Num,
  Os,
  PageVisibility,
  Str,
  Url,
  Util
};

export default index;
export { Arr, Browser, Cookie, DateTime, Html, Num, Os, PageVisibility, Str, Url, Util };
