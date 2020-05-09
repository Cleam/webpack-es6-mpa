/**！
 * 东方头条APP - JS交互协议方法集合
 */
const ua = window.navigator.userAgent;
const isIos = !!ua.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); // IOS终端
// const isAndroid = ua.indexOf('Android') > -1 || ua.indexOf('Adr') > -1; // Android终端
const getRandom = () => {
  return (
    +new Date() +
    Math.random()
      .toString()
      .split('.')[1]
      .substring(0, 4)
  );
};
/**
 * postMessage协议方法
 * @example
    // 成功回调方法名
    var callbackName = 'dfttappcb';
    // 失败回调方法名
    var failCallbackName = 'dfttappfcb';
    // 参数对象
    var obj = {
      // ...,
      callback: callbackName,
      failCallback: failCallbackName
    };
    // Android
    window.JSToNative.postMessage(JSON.stringify(obj));
    // IOS
    window.webkit.messageHandlers.JSToNative_iOS.postMessage(obj);
    // 成功回调(options：回调参数对象)
    window[callbackName] = function(options) {
      // todo...
    };
    // 成功回调(options：回调参数对象)
    window[failCallbackName] = function(options) {
      // todo...
    };
 */
const PostMessage = (function() {
  return {
    /**
     * 方案一【推荐】：参数在一个对象 params 中和 method、callback 分离，代码清晰。
     * @example
     * // 使用方法
     * SLAPP.Dftt.PostMessage.m1({
     *  method: 'xxxx',
     *  params: {},
     *  callback: function(res){console.log(res);},
     *  failCallback: function(res){console.log(res);}
     * })
     */
    m1: function(opt) {
      const _random = getRandom();
      // 成功回调方法名
      const callbackName = `dfttappcb${_random}`;
      // 失败回调方法名
      const failCallbackName = `dfttappfcb${_random}`;
      // 协议回调函数key（可能不为默认的callback）
      let callbackKey = 'callback';
      // 协议失败回调函数key（可能不为默认的callback）
      let failCallbackKey = 'failCallback';
      let obj = {};
      if (typeof opt === 'object') {
        const { method, params, callback, failCallback } = opt;
        if (opt.callbackKey) {
          callbackKey = opt.callbackKey.callbackKey || 'callback';
          failCallbackKey = opt.callbackKey.failCallbackKey || 'failCallback';
        }
        obj = {
          params: params,
          method: method,
          [callbackKey]: callbackName,
          [failCallbackKey]: failCallbackName
        };
        window[callbackName] = callback || function() {};
        window[failCallbackName] = failCallback || function() {};
      } else {
        throw new Error('传参异常');
      }
      try {
        if (isIos) {
          window.webkit.messageHandlers.JSToNative_iOS.postMessage(obj);
        } else {
          window.JSToNative.postMessage(JSON.stringify(obj));
        }
      } catch (e) {
        console.error(e);
      }
    },
    /**
     * 方案二【不推荐】：参数未统一到一个对象和 method、callback 混在一起，容易混乱。
     * @example
     * SLAPP.Dftt.PostMessage.m2({
     *  method: 'xxxx',
     *  params: {},
     *  callback: function(res){console.log(res);},
     *  failCallback: function(res){console.log(res);}
     * })
     */
    m2: function(opt) {
      const _random = getRandom();
      // 成功回调方法名
      const callbackName = `dfttappcb${_random}`;
      // 失败回调方法名
      const failCallbackName = `dfttappfcb${_random}`;
      // 协议回调函数key（可能不为默认的callback）
      let callbackKey = 'callback';
      // 协议失败回调函数key（可能不为默认的callback）
      let failCallbackKey = 'failCallback';
      let obj = {};
      if (typeof opt === 'object') {
        const { method, params, callback, failCallback } = opt;
        if (opt.callbackKey) {
          callbackKey = opt.callbackKey.callbackKey || 'callback';
          failCallbackKey = opt.callbackKey.failCallbackKey || 'failCallback';
        }
        obj = {
          ...params,
          method: method,
          [callbackKey]: callbackName,
          [failCallbackKey]: failCallbackName
        };
        window[callbackName] = callback || function() {};
        window[failCallbackName] = failCallback || function() {};
      } else {
        throw new Error('传参异常');
      }
      try {
        if (isIos) {
          window.webkit.messageHandlers.JSToNative_iOS.postMessage(obj);
        } else {
          window.JSToNative.postMessage(JSON.stringify(obj));
        }
      } catch (e) {
        console.error(e);
      }
    },
    /**
     * 方案三【不可取】：安卓调用方法在一个约定的对象中（如：NewsDetail），规则和 IOS 不统一，容易出错。
     * @example
     * SLAPP.Dftt.PostMessage.m3({
     *  method: 'xxxx',
     *  params: {},
     *  callback: function(res){console.log(res);},
     *  failCallback: function(res){console.log(res);}
     * })
     */
    m3: function(opt) {
      const _random = getRandom();
      // 成功回调方法名
      const callbackName = `dfttappcb${_random}`;
      // 失败回调方法名
      const failCallbackName = `dfttappfcb${_random}`;
      // 协议回调函数key（可能不为默认的callback）
      let callbackKey = 'callback';
      // 协议失败回调函数key（可能不为默认的callback）
      let failCallbackKey = 'failCallback';
      let obj = {};
      if (typeof opt === 'object') {
        const { method, params, callback, failCallback } = opt;
        if (opt.callbackKey) {
          callbackKey = opt.callbackKey.callbackKey || 'callback';
          failCallbackKey = opt.callbackKey.failCallbackKey || 'failCallback';
        }
        obj = {
          ...params,
          method: method,
          [callbackKey]: callbackName,
          [failCallbackKey]: failCallbackName
        };
        window[callbackName] = callback || function() {};
        window[failCallbackName] = failCallback || function() {};
      } else {
        throw new Error('传参异常');
      }
      try {
        if (isIos) {
          window.webkit.messageHandlers.JSToNative_iOS.postMessage(obj);
        } else {
          window.NewsDetail[obj.method](JSON.stringify(obj));
        }
      } catch (e) {
        console.error(e);
      }
    },
    /**
     * 方案四【严重不可取】：直接口头约定回调方法，造成代码看不懂，极其容易出错。
     * @example
     * SLAPP.Dftt.PostMessage.m4({
     *  method: 'xxxx',
     *  params: {},
     *  callbackName: '', // 回调方法名
     *  callback: function(res){console.log(res);} // 回调方法
     * })
     */
    m4: function(opt) {
      let obj = {};
      if (typeof opt === 'object') {
        const { method, params, callback, callbackName } = opt;
        obj = {
          ...params,
          method
        };
        window[callbackName] = callback || function() {};
      } else {
        throw new Error('传参异常');
      }
      try {
        if (isIos) {
          window.webkit.messageHandlers.JSToNative_iOS.postMessage(obj);
        } else {
          window.JSToNative.postMessage(JSON.stringify(obj));
        }
      } catch (e) {
        console.error(e);
      }
    }
  };
})();

/**
 * jsAction协议方法
 * @example
    // 方法名（如：setUserInfo）
    var functionName = 'setUserInfo';
    // 访问（functionName: 方法名）
    // 方式一（推荐）：
    var iframe = document.createElement('iframe');
    iframe.style.display = 'none';
    iframe.style.visibility = 'hidden';
    iframe.src = 'js-m-action://' + functionName;
    document.body.appendChild(iframe);
    // 方式二：
    window.location.href = 'js-m-action://' + functionName;
    // 回调（options：回调参数对象）
    window[functionName] = function(options) {
      // todo...
    };
 */
const JsAction = (function() {
  /**
   * 通过约定的js-m-action协议调用app指定方法。
   * @param {string} funcName 方法名
   */
  function callapp(funcName) {
    var iframe = document.createElement('iframe');
    iframe.style.display = 'none';
    iframe.style.visibility = 'hidden';
    iframe.src = `js-m-action://${funcName}`;
    document.body.appendChild(iframe);
  }
  return {
    /**
     * 获取用户信息
     * @example
     * SLAPP.Dftt.JsAction.getUserInfo(function(res){
     *   console.log(res);  // { accid, mobile, nick, image, bonus, money }
     * })
     */
    getUserInfo: function(cb) {
      callapp('setUserInfo');
      /**
       * 获取用户信息（提供给APP调用的方法，APP负责传参过来。）
       * @param {string} accid  当前用户ID【0表示未登录】
       * @param {string} mobile 当前用户手机【空字符串表示没有绑定手机】
       * @param {string} nick 当前用户昵称
       * @param {string} image 当前用户头像图片
       * @param {string} bonus 当前用户金币
       * @param {string} money 当前用户零钱
       */
      window.setUserInfo = function(accid, mobile, nick, image, bonus, money) {
        cb({
          accid,
          mobile,
          nick,
          image,
          bonus,
          money
        });
      };
    },
    /**
     * 获取客户端信息
     * @example
     * SLAPP.Dftt.JsAction.getClientInfo(function(res){
     *   console.log(res);  // { version, oem, qid, imei, machine, plantform }
     * })
     */
    getClientInfo: function(cb) {
      callapp('setClientInfo');
      /**
       * 获取客户端信息（提供给APP调用的方法，APP负责传参过来。）
       * @param {string} version  当前应用版本号
       * @param {string} oem 当前应用OEM号
       * @param {string} qid 当前应用渠道号
       * @param {string} imei 当前应用IMEI号
       * @param {string} machine 当前应用所在机型
       * @param {string} plantform 当前应用所在操作系统
       */
      window.setClientInfo = function(version, oem, qid, imei, machine, plantform) {
        cb({
          version,
          oem,
          qid,
          imei,
          machine,
          plantform
        });
      };
    },
    /**
     * 获取用户微信信息
     * SLAPP.Dftt.JsAction.getUserWxInfo(function(res){
     *   console.log(res);  // { nick, image, openid}
     * })
     */
    getUserWxInfo: function(cb) {
      callapp('setUserWxInfo');
      /**
       * 获取用户微信信息（提供给APP调用的方法，APP负责传参过来。）
       * @param {string} nick  当前用户微信账号昵称
       * @param {string} image 当前用户头像图片
       * @param {string} openid 当前用户微信Openid
       */
      window.setUserWxInfo = function(nick, image, openid) {
        cb({
          nick,
          image,
          openid
        });
      };
    },
    goback: function() {
      callapp('goback');
    },
    pushimgToClient: function(opt) {
      init_pushimg_info(opt); // eslint-disable-line
      callapp('pushimgToClient');
    },
    goToViewLogin: function() {
      callapp('goToViewLogin');
    },
    goToViewHome: function() {
      callapp('goToViewHome');
    },
    goToViewMy: function() {
      callapp('goToViewMy');
    },
    goToViewWallet: function() {
      callapp('goToViewWallet');
    },
    goToViewmall: function() {
      callapp('goToViewmall');
    },
    goToViewmission: function() {
      callapp('goToViewmission');
    },
    goToViewInvitation: function() {
      callapp('goToViewInvitation');
    },
    goToViewWakeupApprentice: function() {
      callapp('goToViewWakeupApprentice');
    },
    goToViewBindMobile: function() {
      callapp('goToViewBindMobile');
    },
    goToViewBindWx: function() {
      callapp('goToViewBindWx');
    },
    openWxClient: function() {
      callapp('openWxClient');
    },
    /**
     * 调用app分享功能
     * @param {string} funcName 方法名
     * 支持：
     *  shareWithWebdata （调用分享）
     *  shareWithWebdataToWXHY （微信好友）
     *  shareWithWebdataToWXPYQ （微信朋友圈）
     *  shareWithWebdataToQQ （QQ）
     *  shareWithWebdataToQQKJ （QQ空间）
     *  shareWithWebdataToSINAWB （新浪）
     * @param {Object} options 分享参数
     * img: 分享图片
     * title: 分享标题
     * desc: 分享描述
     * url: 分享的地址
     * system: 0表示非系统分享；1表示系统分享
     * type: 分享类型
     * tip: 分享文案
     * bonus: 分享金币
     * bgimg: 分享背景图
     * from: 分享来源
     * code: 是否绘制二维码； 0不需要，1需要
     * @example
     * SLAPP.Dftt.JsAction.share('shareWithWebdataToWXPYQ', { img, title, desc, url, system, type, tip, bonus, bgimg, from, code })
     */
    share: function(
      funcName = 'shareWithWebdata',
      { img, title, desc, url, system, type, tip, bonus, bgimg, from, code }
    ) {
      window[funcName] = function() {
        return `${img}@#$${title}@#$${desc}@#$${url}@#$${system}@#$${type}@#$${tip}@#$${bonus}@#$${bgimg}@#$${from}@#$${code}`;
      };
      callapp(funcName);
    }
  };
})();

var Dftt = {
  PostMessage,
  JsAction
};

var index = {
  Dftt
};

export default index;
