export const locales = {
  root: {
    label: "简体中文",
    lang: "zh-CN",
  },
  en: {
    label: "English",
    lang: "en",
  },
  ja: {
    label: "日本語",
    lang: "ja",
  },
};

export const sidebar = [
  {
    label: "简介",
    translations: {
      en: "Introduction",
      ja: "イントロダクション",
    },
    link: "/introduce",
  },
  {
    label: "从这里开始",
    translations: {
      en: "Start Here",
      ja: "ここから始める",
    },
    autogenerate: {
      directory: "getting-started",
    },
  },
  {
    label: "指南",
    translations: {
      en: "Guides",
      ja: "ガイドライン",
    },
    autogenerate: {
      directory: "guides",
    },
  },
  {
    label: "插件",
    translations: {
      en: "Plugins",
      ja: "プラグイン",
    },
    autogenerate: {
      directory: "plugins",
    },
  },
  {
    label: "参考",
    translations: {
      en: "Reference",
      ja: "リファレンス",
    },
    autogenerate: {
      directory: "reference",
    },
  },
  {
    label: "资源",
    translations: {
      en: "Resources",
      ja: "リソース",
    },
    autogenerate: {
      directory: "resources",
    },
  },
];

export const head = [
  {
    tag: "script",
    attrs: {
      src: "https://www.googletagmanager.com/gtag/js?id=G-7Y35RMZFVD",
      async: true,
    },
  },
  {
    tag: "script",
    content: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
          
            gtag('config', 'G-7Y35RMZFVD');
          `,
  },
  {
    tag: "script",
    content: `
            var _hmt = _hmt || [];
            (function() {
              var hm = document.createElement("script");
              hm.src = "https://hm.baidu.com/hm.js?577e65b88c06c034335c395caa4b6205";
              var s = document.getElementsByTagName("script")[0]; 
              s.parentNode.insertBefore(hm, s);
            })();
          `,
  },
  {
    tag: "script",
    attrs: {
      src: "https://cdn.wwads.cn/js/makemoney.js",
      async: true,
    },
  },
  {
    tag: "script",
    attrs: {
      src: "https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-4147143076931995",
      crossorigin: "anonymous",
      async: true,
    },
  },
  {
    tag: "script",
    attrs: {
      src: "https://fundingchoicesmessages.google.com/i/pub-4147143076931995?ers=1",
      async: true,
    },
  },
  {
    tag: "script",
    content: `
            (function() {function signalGooglefcPresent() {if (!window.frames['googlefcPresent']) {if (document.body) {const iframe = document.createElement('iframe'); iframe.style = 'width: 0; height: 0; border: none; z-index: -1000; left: -1000px; top: -1000px;'; iframe.style.display = 'none'; iframe.name = 'googlefcPresent'; document.body.appendChild(iframe);} else {setTimeout(signalGooglefcPresent, 0);}}}signalGooglefcPresent();})();
          `,
  },
  {
    tag: "script",
    content: `
            (function(){'use strict';function aa(a){var b=0;return function(){return b<a.length?{done:!1,value:a[b++]}:{done:!0}}}var ba=typeof Object.defineProperties=="function"?Object.defineProperty:function(a,b,c){if(a==Array.prototype||a==Object.prototype)return a;a[b]=c.value;return a};
            function ca(a){a=["object"==typeof globalThis&&globalThis,a,"object"==typeof window&&window,"object"==typeof self&&self,"object"==typeof global&&global];for(var b=0;b<a.length;++b){var c=a[b];if(c&&c.Math==Math)return c}throw Error("Cannot find global object");}var da=ca(this);function l(a,b){if(b)a:{var c=da;a=a.split(".");for(var d=0;d<a.length-1;d++){var e=a[d];if(!(e in c))break a;c=c[e]}a=a[a.length-1];d=c[a];b=b(d);b!=d&&b!=null&&ba(c,a,{configurable:!0,writable:!0,value:b})}}
            function ea(a){return a.raw=a}function n(a){var b=typeof Symbol!="undefined"&&Symbol.iterator&&a[Symbol.iterator];if(b)return b.call(a);if(typeof a.length=="number")return{next:aa(a)};throw Error(String(a)+" is not an iterable or ArrayLike");}function fa(a){for(var b,c=[];!(b=a.next()).done;)c.push(b.value);return c}var ha=typeof Object.create=="function"?Object.create:function(a){function b(){}b.prototype=a;return new b},p;
            if(typeof Object.setPrototypeOf=="function")p=Object.setPrototypeOf;else{var q;a:{var ja={a:!0},ka={};try{ka.__proto__=ja;q=ka.a;break a}catch(a){}q=!1}p=q?function(a,b){a.__proto__=b;if(a.__proto__!==b)throw new TypeError(a+" is not extensible");return a}:null}var la=p;
            function t(a,b){a.prototype=ha(b.prototype);a.prototype.constructor=a;if(la)la(a,b);else for(var c in b)if(c!="prototype")if(Object.defineProperties){var d=Object.getOwnPropertyDescriptor(b,c);d&&Object.defineProperty(a,c,d)}else a[c]=b[c];a.A=b.prototype}function ma(){for(var a=Number(this),b=[],c=a;c<arguments.length;c++)b[c-a]=arguments[c];return b}l("Object.is",function(a){return a?a:function(b,c){return b===c?b!==0||1/b===1/c:b!==b&&c!==c}});
            l("Array.prototype.includes",function(a){return a?a:function(b,c){var d=this;d instanceof String&&(d=String(d));var e=d.length;c=c||0;for(c<0&&(c=Math.max(c+e,0));c<e;c++){var f=d[c];if(f===b||Object.is(f,b))return!0}return!1}});
            l("String.prototype.includes",function(a){return a?a:function(b,c){if(this==null)throw new TypeError("The 'this' value for String.prototype.includes must not be null or undefined");if(b instanceof RegExp)throw new TypeError("First argument to String.prototype.includes must not be a regular expression");return this.indexOf(b,c||0)!==-1}});l("Number.MAX_SAFE_INTEGER",function(){return 9007199254740991});
            l("Number.isFinite",function(a){return a?a:function(b){return typeof b!=="number"?!1:!isNaN(b)&&b!==Infinity&&b!==-Infinity}});l("Number.isInteger",function(a){return a?a:function(b){return Number.isFinite(b)?b===Math.floor(b):!1}});l("Number.isSafeInteger",function(a){return a?a:function(b){return Number.isInteger(b)&&Math.abs(b)<=Number.MAX_SAFE_INTEGER}});
            l("Math.trunc",function(a){return a?a:function(b){b=Number(b);if(isNaN(b)||b===Infinity||b===-Infinity||b===0)return b;var c=Math.floor(Math.abs(b));return b<0?-c:c}});/*

            Copyright The Closure Library Authors.
            SPDX-License-Identifier: Apache-2.0
            */
            var u=this||self;function v(a,b){a:{var c=["CLOSURE_FLAGS"];for(var d=u,e=0;e<c.length;e++)if(d=d[c[e]],d==null){c=null;break a}c=d}a=c&&c[a];return a!=null?a:b}function w(a){return a};function na(a){u.setTimeout(function(){throw a;},0)};var oa=v(610401301,!1),pa=v(188588736,!0),qa=v(645172343,v(1,!0));var x,ra=u.navigator;x=ra?ra.userAgentData||null:null;function z(a){return oa?x?x.brands.some(function(b){return(b=b.brand)&&b.indexOf(a)!=-1}):!1:!1}function A(a){var b;a:{if(b=u.navigator)if(b=b.userAgent)break a;b=""}return b.indexOf(a)!=-1};function B(){return oa?!!x&&x.brands.length>0:!1}function C(){return B()?z("Chromium"):(A("Chrome")||A("CriOS"))&&!(B()?0:A("Edge"))||A("Silk")};var sa=B()?!1:A("Trident")||A("MSIE");!A("Android")||C();C();A("Safari")&&(C()||(B()?0:A("Coast"))||(B()?0:A("Opera"))||(B()?0:A("Edge"))||(B()?z("Microsoft Edge"):A("Edg/"))||B()&&z("Opera"));var ta={},D=null;var ua=typeof Uint8Array!=="undefined",va=!sa&&typeof btoa==="function";var wa;function E(){return typeof BigInt==="function"};var F=typeof Symbol==="function"&&typeof Symbol()==="symbol";function xa(a){return typeof Symbol==="function"&&typeof Symbol()==="symbol"?Symbol():a}var G=xa(),ya=xa("2ex");var za=F?function(a,b){a[G]|=b}:function(a,b){a.g!==void 0?a.g|=b:Object.defineProperties(a,{g:{value:b,configurable:!0,writable:!0,enumerable:!1}})},H=F?function(a){return a[G]|0}:function(a){return a.g|0},I=F?function(a){return a[G]}:function(a){return a.g},J=F?function(a,b){a[G]=b}:function(a,b){a.g!==void 0?a.g=b:Object.defineProperties(a,{g:{value:b,configurable:!0,writable:!0,enumerable:!1}})};function Aa(a,b){J(b,(a|0)&-14591)}function Ba(a,b){J(b,(a|34)&-14557)};var K={},Ca={};function Da(a){return!(!a||typeof a!=="object"||a.g!==Ca)}function Ea(a){return a!==null&&typeof a==="object"&&!Array.isArray(a)&&a.constructor===Object}function L(a,b,c){if(!Array.isArray(a)||a.length)return!1;var d=H(a);if(d&1)return!0;if(!(b&&(Array.isArray(b)?b.includes(c):b.has(c))))return!1;J(a,d|1);return!0};var M=0,N=0;function Fa(a){var b=a>>>0;M=b;N=(a-b)/4294967296>>>0}function Ga(a){if(a<0){Fa(-a);var b=n(Ha(M,N));a=b.next().value;b=b.next().value;M=a>>>0;N=b>>>0}else Fa(a)}function Ia(a,b){b>>>=0;a>>>=0;if(b<=2097151)var c=""+(4294967296*b+a);else E()?c=""+(BigInt(b)<<BigInt(32)|BigInt(a)):(c=(a>>>24|b<<8)&16777215,b=b>>16&65535,a=(a&16777215)+c*6777216+b*6710656,c+=b*8147497,b*=2,a>=1E7&&(c+=a/1E7>>>0,a%=1E7),c>=1E7&&(b+=c/1E7>>>0,c%=1E7),c=b+Ja(c)+Ja(a));return c}
            function Ja(a){a=String(a);return"0000000".slice(a.length)+a}function Ha(a,b){b=~b;a?a=~a+1:b+=1;return[a,b]};var Ka=/^-?([1-9][0-9]*|0)(\.[0-9]+)?$/;var O;function La(a,b){O=b;a=new a(b);O=void 0;return a}
            function P(a,b,c){a==null&&(a=O);O=void 0;if(a==null){var d=96;c?(a=[c],d|=512):a=[];b&&(d=d&-16760833|(b&1023)<<14)}else{if(!Array.isArray(a))throw Error("narr");d=H(a);if(d&2048)throw Error("farr");if(d&64)return a;d|=64;if(c&&(d|=512,c!==a[0]))throw Error("mid");a:{c=a;var e=c.length;if(e){var f=e-1;if(Ea(c[f])){d|=256;b=f-(+!!(d&512)-1);if(b>=1024)throw Error("pvtlmt");d=d&-16760833|(b&1023)<<14;break a}}if(b){b=Math.max(b,e-(+!!(d&512)-1));if(b>1024)throw Error("spvt");d=d&-16760833|(b&1023)<<
            14}}}J(a,d);return a};function Ma(a){switch(typeof a){case "number":return isFinite(a)?a:String(a);case "boolean":return a?1:0;case "object":if(a)if(Array.isArray(a)){if(L(a,void 0,0))return}else if(ua&&a!=null&&a instanceof Uint8Array){if(va){for(var b="",c=0,d=a.length-10240;c<d;)b+=String.fromCharCode.apply(null,a.subarray(c,c+=10240));b+=String.fromCharCode.apply(null,c?a.subarray(c):a);a=btoa(b)}else{b===void 0&&(b=0);if(!D){D={};c="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789".split("");d=["+/=",
            "+/","-_=","-_.","-_"];for(var e=0;e<5;e++){var f=c.concat(d[e].split(""));ta[e]=f;for(var g=0;g<f.length;g++){var h=f[g];D[h]===void 0&&(D[h]=g)}}}b=ta[b];c=Array(Math.floor(a.length/3));d=b[64]||"";for(e=f=0;f<a.length-2;f+=3){var k=a[f],m=a[f+1];h=a[f+2];g=b[k>>2];k=b[(k&3)<<4|m>>4];m=b[(m&15)<<2|h>>6];h=b[h&63];c[e++]=g+k+m+h}g=0;h=d;switch(a.length-f){case 2:g=a[f+1],h=b[(g&15)<<2]||d;case 1:a=a[f],c[e]=b[a>>2]+b[(a&3)<<4|g>>4]+h+d}a=c.join("")}return a}}return a};function Na(a,b,c){a=Array.prototype.slice.call(a);var d=a.length,e=b&256?a[d-1]:void 0;d+=e?-1:0;for(b=b&512?1:0;b<d;b++)a[b]=c(a[b]);if(e){b=a[b]={};for(var f in e)Object.prototype.hasOwnProperty.call(e,f)&&(b[f]=c(e[f]))}return a}function Oa(a,b,c,d,e){if(a!=null){if(Array.isArray(a))a=L(a,void 0,0)?void 0:e&&H(a)&2?a:Pa(a,b,c,d!==void 0,e);else if(Ea(a)){var f={},g;for(g in a)Object.prototype.hasOwnProperty.call(a,g)&&(f[g]=Oa(a[g],b,c,d,e));a=f}else a=b(a,d);return a}}
            function Pa(a,b,c,d,e){var f=d||c?H(a):0;d=d?!!(f&32):void 0;a=Array.prototype.slice.call(a);for(var g=0;g<a.length;g++)a[g]=Oa(a[g],b,c,d,e);c&&c(f,a);return a}function Qa(a){return a.s===K?a.toJSON():Ma(a)};function Ra(a,b,c){c=c===void 0?Ba:c;if(a!=null){if(ua&&a instanceof Uint8Array)return b?a:new Uint8Array(a);if(Array.isArray(a)){var d=H(a);if(d&2)return a;b&&(b=d===0||!!(d&32)&&!(d&64||!(d&16)));return b?(J(a,(d|34)&-12293),a):Pa(a,Ra,d&4?Ba:c,!0,!0)}a.s===K&&(c=a.h,d=I(c),a=d&2?a:La(a.constructor,Sa(c,d,!0)));return a}}function Sa(a,b,c){var d=c||b&2?Ba:Aa,e=!!(b&32);a=Na(a,b,function(f){return Ra(f,e,d)});za(a,32|(c?2:0));return a};function Ta(a,b){a=a.h;return Ua(a,I(a),b)}function Va(a,b,c,d){b=d+(+!!(b&512)-1);if(!(b<0||b>=a.length||b>=c))return a[b]}
            function Ua(a,b,c,d){if(c===-1)return null;var e=b>>14&1023||536870912;if(c>=e){if(b&256)return a[a.length-1][c]}else{var f=a.length;if(d&&b&256&&(d=a[f-1][c],d!=null)){if(Va(a,b,e,c)&&ya!=null){var g;a=(g=wa)!=null?g:wa={};g=a[ya]||0;g>=4||(a[ya]=g+1,g=Error(),g.__closure__error__context__984382||(g.__closure__error__context__984382={}),g.__closure__error__context__984382.severity="incident",na(g))}return d}return Va(a,b,e,c)}}
            function Wa(a,b,c,d,e){var f=b>>14&1023||536870912;if(c>=f||e&&!qa){var g=b;if(b&256)e=a[a.length-1];else{if(d==null)return;e=a[f+(+!!(b&512)-1)]={};g|=256}e[c]=d;c<f&&(a[c+(+!!(b&512)-1)]=void 0);g!==b&&J(a,g)}else a[c+(+!!(b&512)-1)]=d,b&256&&(a=a[a.length-1],c in a&&delete a[c])}
            function Xa(a,b){var c=Ya;var d=d===void 0?!1:d;var e=a.h;var f=I(e),g=Ua(e,f,b,d);if(g!=null&&typeof g==="object"&&g.s===K)c=g;else if(Array.isArray(g)){var h=H(g),k=h;k===0&&(k|=f&32);k|=f&2;k!==h&&J(g,k);c=new c(g)}else c=void 0;c!==g&&c!=null&&Wa(e,f,b,c,d);e=c;if(e==null)return e;a=a.h;f=I(a);f&2||(g=e,c=g.h,h=I(c),g=h&2?La(g.constructor,Sa(c,h,!1)):g,g!==e&&(e=g,Wa(a,f,b,e,d)));return e}function Za(a,b){a=Ta(a,b);return a==null||typeof a==="string"?a:void 0}
            function $a(a,b){var c=c===void 0?0:c;a=Ta(a,b);if(a!=null)if(b=typeof a,b==="number"?Number.isFinite(a):b!=="string"?0:Ka.test(a))if(typeof a==="number"){if(a=Math.trunc(a),!Number.isSafeInteger(a)){Ga(a);b=M;var d=N;if(a=d&2147483648)b=~b+1>>>0,d=~d>>>0,b==0&&(d=d+1>>>0);b=d*4294967296+(b>>>0);a=a?-b:b}}else if(b=Math.trunc(Number(a)),Number.isSafeInteger(b))a=String(b);else{if(b=a.indexOf("."),b!==-1&&(a=a.substring(0,b)),!(a[0]==="-"?a.length<20||a.length===20&&Number(a.substring(0,7))>-922337:
            a.length<19||a.length===19&&Number(a.substring(0,6))<922337)){if(a.length<16)Ga(Number(a));else if(E())a=BigInt(a),M=Number(a&BigInt(4294967295))>>>0,N=Number(a>>BigInt(32)&BigInt(4294967295));else{b=+(a[0]==="-");N=M=0;d=a.length;for(var e=b,f=(d-b)%6+b;f<=d;e=f,f+=6)e=Number(a.slice(e,f)),N*=1E6,M=M*1E6+e,M>=4294967296&&(N+=Math.trunc(M/4294967296),N>>>=0,M>>>=0);b&&(b=n(Ha(M,N)),a=b.next().value,b=b.next().value,M=a,N=b)}a=M;b=N;b&2147483648?E()?a=""+(BigInt(b|0)<<BigInt(32)|BigInt(a>>>0)):(b=
            n(Ha(a,b)),a=b.next().value,b=b.next().value,a="-"+Ia(a,b)):a=Ia(a,b)}}else a=void 0;return a!=null?a:c}function R(a,b){var c=c===void 0?"":c;a=Za(a,b);return a!=null?a:c};var S;function T(a,b,c){this.h=P(a,b,c)}T.prototype.toJSON=function(){return ab(this)};T.prototype.s=K;T.prototype.toString=function(){try{return S=!0,ab(this).toString()}finally{S=!1}};
            function ab(a){var b=S?a.h:Pa(a.h,Qa,void 0,void 0,!1);var c=!S;var d=pa?void 0:a.constructor.v;var e=I(c?a.h:b);if(a=b.length){var f=b[a-1],g=Ea(f);g?a--:f=void 0;e=+!!(e&512)-1;var h=b;if(g){b:{var k=f;var m={};g=!1;if(k)for(var r in k)if(Object.prototype.hasOwnProperty.call(k,r))if(isNaN(+r))m[r]=k[r];else{var y=k[r];Array.isArray(y)&&(L(y,d,+r)||Da(y)&&y.size===0)&&(y=null);y==null&&(g=!0);y!=null&&(m[r]=y)}if(g){for(var Q in m)break b;m=null}else m=k}k=m==null?f!=null:m!==f}for(var ia;a>0;a--){Q=
            a-1;r=h[Q];Q-=e;if(!(r==null||L(r,d,Q)||Da(r)&&r.size===0))break;ia=!0}if(h!==b||k||ia){if(!c)h=Array.prototype.slice.call(h,0,a);else if(ia||k||m)h.length=a;m&&h.push(m)}b=h}return b};function bb(a){return function(b){if(b==null||b=="")b=new a;else{b=JSON.parse(b);if(!Array.isArray(b))throw Error("dnarr");za(b,32);b=La(a,b)}return b}};function cb(a){this.h=P(a)}t(cb,T);var db=bb(cb);var U;function V(a){this.g=a}V.prototype.toString=function(){return this.g+""};var eb={};function fb(a){if(U===void 0){var b=null;var c=u.trustedTypes;if(c&&c.createPolicy){try{b=c.createPolicy("goog#html",{createHTML:w,createScript:w,createScriptURL:w})}catch(d){u.console&&u.console.error(d.message)}U=b}else U=b}a=(b=U)?b.createScriptURL(a):a;return new V(a,eb)};/*

            SPDX-License-Identifier: Apache-2.0
            */
            function gb(a){var b=ma.apply(1,arguments);if(b.length===0)return fb(a[0]);for(var c=a[0],d=0;d<b.length;d++)c+=encodeURIComponent(b[d])+a[d+1];return fb(c)};function hb(a,b){a.src=b instanceof V&&b.constructor===V?b.g:"type_error:TrustedResourceUrl";var c,d;(c=(b=(d=(c=(a.ownerDocument&&a.ownerDocument.defaultView||window).document).querySelector)==null?void 0:d.call(c,"script[nonce]"))?b.nonce||b.getAttribute("nonce")||"":"")&&a.setAttribute("nonce",c)};function ib(){return Math.floor(Math.random()*2147483648).toString(36)+Math.abs(Math.floor(Math.random()*2147483648)^Date.now()).toString(36)};function jb(a,b){b=String(b);a.contentType==="application/xhtml+xml"&&(b=b.toLowerCase());return a.createElement(b)}function kb(a){this.g=a||u.document||document};function lb(a){a=a===void 0?document:a;return a.createElement("script")};function mb(a,b,c,d,e,f){try{var g=a.g,h=lb(g);h.async=!0;hb(h,b);g.head.appendChild(h);h.addEventListener("load",function(){e();d&&g.head.removeChild(h)});h.addEventListener("error",function(){c>0?mb(a,b,c-1,d,e,f):(d&&g.head.removeChild(h),f())})}catch(k){f()}};var nb=u.atob("aHR0cHM6Ly93d3cuZ3N0YXRpYy5jb20vaW1hZ2VzL2ljb25zL21hdGVyaWFsL3N5c3RlbS8xeC93YXJuaW5nX2FtYmVyXzI0ZHAucG5n"),ob=u.atob("WW91IGFyZSBzZWVpbmcgdGhpcyBtZXNzYWdlIGJlY2F1c2UgYWQgb3Igc2NyaXB0IGJsb2NraW5nIHNvZnR3YXJlIGlzIGludGVyZmVyaW5nIHdpdGggdGhpcyBwYWdlLg=="),pb=u.atob("RGlzYWJsZSBhbnkgYWQgb3Igc2NyaXB0IGJsb2NraW5nIHNvZnR3YXJlLCB0aGVuIHJlbG9hZCB0aGlzIHBhZ2Uu");function qb(a,b,c){this.i=a;this.u=b;this.o=c;this.g=null;this.j=[];this.m=!1;this.l=new kb(this.i)}
            function rb(a){if(a.i.body&&!a.m){var b=function(){sb(a);u.setTimeout(function(){tb(a,3)},50)};mb(a.l,a.u,2,!0,function(){u[a.o]||b()},b);a.m=!0}}
            function sb(a){for(var b=W(1,5),c=0;c<b;c++){var d=X(a);a.i.body.appendChild(d);a.j.push(d)}b=X(a);b.style.bottom="0";b.style.left="0";b.style.position="fixed";b.style.width=W(100,110).toString()+"%";b.style.zIndex=W(2147483544,2147483644).toString();b.style.backgroundColor=ub(249,259,242,252,219,229);b.style.boxShadow="0 0 12px #888";b.style.color=ub(0,10,0,10,0,10);b.style.display="flex";b.style.justifyContent="center";b.style.fontFamily="Roboto, Arial";c=X(a);c.style.width=W(80,85).toString()+
            "%";c.style.maxWidth=W(750,775).toString()+"px";c.style.margin="24px";c.style.display="flex";c.style.alignItems="flex-start";c.style.justifyContent="center";d=jb(a.l.g,"IMG");d.className=ib();d.src=nb;d.alt="Warning icon";d.style.height="24px";d.style.width="24px";d.style.paddingRight="16px";var e=X(a),f=X(a);f.style.fontWeight="bold";f.textContent=ob;var g=X(a);g.textContent=pb;Y(a,e,f);Y(a,e,g);Y(a,c,d);Y(a,c,e);Y(a,b,c);a.g=b;a.i.body.appendChild(a.g);b=W(1,5);for(c=0;c<b;c++)d=X(a),a.i.body.appendChild(d),
            a.j.push(d)}function Y(a,b,c){for(var d=W(1,5),e=0;e<d;e++){var f=X(a);b.appendChild(f)}b.appendChild(c);c=W(1,5);for(d=0;d<c;d++)e=X(a),b.appendChild(e)}function W(a,b){return Math.floor(a+Math.random()*(b-a))}function ub(a,b,c,d,e,f){return"rgb("+W(Math.max(a,0),Math.min(b,255)).toString()+","+W(Math.max(c,0),Math.min(d,255)).toString()+","+W(Math.max(e,0),Math.min(f,255)).toString()+")"}function X(a){a=jb(a.l.g,"DIV");a.className=ib();return a}
            function tb(a,b){b<=0||a.g!=null&&a.g.offsetHeight!==0&&a.g.offsetWidth!==0||(vb(a),sb(a),u.setTimeout(function(){tb(a,b-1)},50))}function vb(a){for(var b=n(a.j),c=b.next();!c.done;c=b.next())(c=c.value)&&c.parentNode&&c.parentNode.removeChild(c);a.j=[];(b=a.g)&&b.parentNode&&b.parentNode.removeChild(b);a.g=null};function wb(a,b,c,d,e){function f(k){document.body?g(document.body):k>0?u.setTimeout(function(){f(k-1)},e):b()}function g(k){k.appendChild(h);u.setTimeout(function(){h?(h.offsetHeight!==0&&h.offsetWidth!==0?b():a(),h.parentNode&&h.parentNode.removeChild(h)):a()},d)}var h=xb(c);f(3)}function xb(a){var b=document.createElement("div");b.className=a;b.style.width="1px";b.style.height="1px";b.style.position="absolute";b.style.left="-10000px";b.style.top="-10000px";b.style.zIndex="-10000";return b};function Ya(a){this.h=P(a)}t(Ya,T);function yb(a){this.h=P(a)}t(yb,T);var zb=bb(yb);function Ab(a){if(!a)return null;a=Za(a,4);var b;a===null||a===void 0?b=null:b=fb(a);return b};var Bb=ea([""]),Cb=ea([""]);function Db(a,b){this.m=a;this.o=new kb(a.document);this.g=b;this.j=R(this.g,1);this.u=Ab(Xa(this.g,2))||gb(Bb);this.i=!1;b=Ab(Xa(this.g,13))||gb(Cb);this.l=new qb(a.document,b,R(this.g,12))}Db.prototype.start=function(){Eb(this)};
            function Eb(a){Fb(a);mb(a.o,a.u,3,!1,function(){a:{var b=a.j;var c=u.btoa(b);if(c=u[c]){try{var d=db(u.atob(c))}catch(e){b=!1;break a}b=b===Za(d,1)}else b=!1}b?Z(a,R(a.g,14)):(Z(a,R(a.g,8)),rb(a.l))},function(){wb(function(){Z(a,R(a.g,7));rb(a.l)},function(){return Z(a,R(a.g,6))},R(a.g,9),$a(a.g,10),$a(a.g,11))})}function Z(a,b){a.i||(a.i=!0,a=new a.m.XMLHttpRequest,a.open("GET",b,!0),a.send())}function Fb(a){var b=u.btoa(a.j);a.m[b]&&Z(a,R(a.g,5))};(function(a,b){u[a]=function(){var c=ma.apply(0,arguments);u[a]=function(){};b.call.apply(b,[null].concat(c instanceof Array?c:fa(n(c))))}})("__h82AlnkH6D91__",function(a){typeof window.atob==="function"&&(new Db(window,zb(window.atob(a)))).start()});}).call(this);

            window.__h82AlnkH6D91__("WyJwdWItNDE0NzE0MzA3NjkzMTk5NSIsW251bGwsbnVsbCxudWxsLCJodHRwczovL2Z1bmRpbmdjaG9pY2VzbWVzc2FnZXMuZ29vZ2xlLmNvbS9iL3B1Yi00MTQ3MTQzMDc2OTMxOTk1Il0sbnVsbCxudWxsLCJodHRwczovL2Z1bmRpbmdjaG9pY2VzbWVzc2FnZXMuZ29vZ2xlLmNvbS9lbC9BR1NLV3hWX1dBYnJMWWdVMnRCVTFvWDNsdzU1QVF3WlJDaDE4SUt1V1NURzRIVTU4YVRXV08yWkcyX2VTei1DYnBMOTlaZllMLXVqQmxVWmVOMVM4dlpQSWVRa1R3XHUwMDNkXHUwMDNkP3RlXHUwMDNkVE9LRU5fRVhQT1NFRCIsImh0dHBzOi8vZnVuZGluZ2Nob2ljZXNtZXNzYWdlcy5nb29nbGUuY29tL2VsL0FHU0tXeFZGTnN1aTVBdkdfZG9VUDVUQ1BWZERLWXJsNGVOWnZ3REVVRVdGLURVblhkcUJ6ZDNNSlE1MEJtVTF1dHNuY09XT3hGQ0k2R2FFS0d4bERUMnc2YVlLblFcdTAwM2RcdTAwM2Q/YWJcdTAwM2QxXHUwMDI2c2JmXHUwMDNkMSIsImh0dHBzOi8vZnVuZGluZ2Nob2ljZXNtZXNzYWdlcy5nb29nbGUuY29tL2VsL0FHU0tXeFdSb3JtRzd3YjVoREdNV0tLLTFKaGFMeWZyWHVNa3JCU0tFX1NFb01jczJuU3ZaNE5iS3R4LVlTN2ROQTc2S2RsUlU5cHZ4NmlPZnZQSEoxVHl2cm93ZFFcdTAwM2RcdTAwM2Q/YWJcdTAwM2QyXHUwMDI2c2JmXHUwMDNkMSIsImh0dHBzOi8vZnVuZGluZ2Nob2ljZXNtZXNzYWdlcy5nb29nbGUuY29tL2VsL0FHU0tXeFZvMmVPa29EUHNZQnZEbGFCVGFuSHpTUXdTRDI2QlBpZUI1Z21UNUozVVNaUGx0T3BHY0NwRTJZc296NksyYTFQZEFxMHhST20zSHJOcXFJWmdCRmJzTmdcdTAwM2RcdTAwM2Q/c2JmXHUwMDNkMiIsImRpdi1ncHQtYWQiLDIwLDEwMCwiY0hWaUxUUXhORGN4TkRNd056WTVNekU1T1RVXHUwMDNkIixbbnVsbCxudWxsLG51bGwsImh0dHBzOi8vd3d3LmdzdGF0aWMuY29tLzBlbW4vZi9wL3B1Yi00MTQ3MTQzMDc2OTMxOTk1LmpzP3VzcXBcdTAwM2RDQWciXSwiaHR0cHM6Ly9mdW5kaW5nY2hvaWNlc21lc3NhZ2VzLmdvb2dsZS5jb20vZWwvQUdTS1d4VjF4aWpWdkh4TEpWemF3VnhaVFkxeXBKaTI1Tnp6bnNNTlFTODBwUFBJb2hKT21OWXRNeHBvc0NuSmhuLTZhb3FHTGplbU5yRFFVeVZadGdjclVCYWt2QVx1MDAzZFx1MDAzZCJd");
          `,
  },
];
