// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles

(function(modules, entry, mainEntry, parcelRequireName, globalName) {
  /* eslint-disable no-undef */
  var globalObject =
    typeof globalThis !== 'undefined'
      ? globalThis
      : typeof self !== 'undefined'
      ? self
      : typeof window !== 'undefined'
      ? window
      : typeof global !== 'undefined'
      ? global
      : {};
  /* eslint-enable no-undef */

  // Save the require from previous bundle to this closure if any
  var previousRequire =
    typeof globalObject[parcelRequireName] === 'function' &&
    globalObject[parcelRequireName];

  var cache = previousRequire.cache || {};
  // Do not use `require` to prevent Webpack from trying to bundle this call
  var nodeRequire =
    typeof module !== 'undefined' &&
    typeof module.require === 'function' &&
    module.require.bind(module);

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire =
          typeof globalObject[parcelRequireName] === 'function' &&
          globalObject[parcelRequireName];
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error("Cannot find module '" + name + "'");
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = (cache[name] = new newRequire.Module(name));

      modules[name][0].call(
        module.exports,
        localRequire,
        module,
        module.exports,
        this
      );
    }

    return cache[name].exports;

    function localRequire(x) {
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x) {
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function(id, exports) {
    modules[id] = [
      function(require, module) {
        module.exports = exports;
      },
      {},
    ];
  };

  Object.defineProperty(newRequire, 'root', {
    get: function() {
      return globalObject[parcelRequireName];
    },
  });

  globalObject[parcelRequireName] = newRequire;

  for (var i = 0; i < entry.length; i++) {
    newRequire(entry[i]);
  }

  if (mainEntry) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(mainEntry);

    // CommonJS
    if (typeof exports === 'object' && typeof module !== 'undefined') {
      module.exports = mainExports;

      // RequireJS
    } else if (typeof define === 'function' && define.amd) {
      define(function() {
        return mainExports;
      });

      // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }
})({"6Lkf8":[function(require,module,exports) {
var HMR_HOST = null;
var HMR_PORT = 1234;
var HMR_SECURE = false;
var HMR_ENV_HASH = "d751713988987e9331980363e24189ce";
module.bundle.HMR_BUNDLE_ID = "6a74567a189b70b0a7a5a158df4a3c68";
// @flow
/*global HMR_HOST, HMR_PORT, HMR_ENV_HASH, HMR_SECURE*/
/*::
import type {
HMRAsset,
HMRMessage,
} from '@parcel/reporter-dev-server/src/HMRServer.js';
interface ParcelRequire {
(string): mixed;
cache: {|[string]: ParcelModule|};
hotData: mixed;
Module: any;
parent: ?ParcelRequire;
isParcelRequire: true;
modules: {|[string]: [Function, {|[string]: string|}]|};
HMR_BUNDLE_ID: string;
root: ParcelRequire;
}
interface ParcelModule {
hot: {|
data: mixed,
accept(cb: (Function) => void): void,
dispose(cb: (mixed) => void): void,
// accept(deps: Array<string> | string, cb: (Function) => void): void,
// decline(): void,
_acceptCallbacks: Array<(Function) => void>,
_disposeCallbacks: Array<(mixed) => void>,
|};
}
declare var module: {bundle: ParcelRequire, ...};
declare var HMR_HOST: string;
declare var HMR_PORT: string;
declare var HMR_ENV_HASH: string;
declare var HMR_SECURE: boolean;
*/
var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;
function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    data: module.bundle.hotData,
    _acceptCallbacks: [],
    _disposeCallbacks: [],
    accept: function (fn) {
      this._acceptCallbacks.push(fn || (function () {}));
    },
    dispose: function (fn) {
      this._disposeCallbacks.push(fn);
    }
  };
  module.bundle.hotData = undefined;
}
module.bundle.Module = Module;
var checkedAssets, /*: {|[string]: boolean|}*/
acceptedAssets, /*: {|[string]: boolean|}*/
/*: {|[string]: boolean|}*/
assetsToAccept;
function getHostname() {
  return HMR_HOST || (location.protocol.indexOf('http') === 0 ? location.hostname : 'localhost');
}
function getPort() {
  return HMR_PORT || location.port;
}
// eslint-disable-next-line no-redeclare
var parent = module.bundle.parent;
if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = getHostname();
  var port = getPort();
  var protocol = HMR_SECURE || location.protocol == 'https:' && !(/localhost|127.0.0.1|0.0.0.0/).test(hostname) ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + (port ? ':' + port : '') + '/');
  // $FlowFixMe
  ws.onmessage = function (event) /*: {data: string, ...}*/
  {
    checkedAssets = {
      /*: {|[string]: boolean|}*/
    };
    acceptedAssets = {
      /*: {|[string]: boolean|}*/
    };
    assetsToAccept = [];
    var data = /*: HMRMessage*/
    JSON.parse(event.data);
    if (data.type === 'update') {
      // Remove error overlay if there is one
      removeErrorOverlay();
      let assets = data.assets.filter(asset => asset.envHash === HMR_ENV_HASH);
      // Handle HMR Update
      var handled = false;
      assets.forEach(asset => {
        var didAccept = asset.type === 'css' || asset.type === 'js' && hmrAcceptCheck(module.bundle.root, asset.id, asset.depsByBundle);
        if (didAccept) {
          handled = true;
        }
      });
      if (handled) {
        console.clear();
        assets.forEach(function (asset) {
          hmrApply(module.bundle.root, asset);
        });
        for (var i = 0; i < assetsToAccept.length; i++) {
          var id = assetsToAccept[i][1];
          if (!acceptedAssets[id]) {
            hmrAcceptRun(assetsToAccept[i][0], id);
          }
        }
      } else {
        window.location.reload();
      }
    }
    if (data.type === 'error') {
      // Log parcel errors to console
      for (let ansiDiagnostic of data.diagnostics.ansi) {
        let stack = ansiDiagnostic.codeframe ? ansiDiagnostic.codeframe : ansiDiagnostic.stack;
        console.error('🚨 [parcel]: ' + ansiDiagnostic.message + '\n' + stack + '\n\n' + ansiDiagnostic.hints.join('\n'));
      }
      // Render the fancy html overlay
      removeErrorOverlay();
      var overlay = createErrorOverlay(data.diagnostics.html);
      // $FlowFixMe
      document.body.appendChild(overlay);
    }
  };
  ws.onerror = function (e) {
    console.error(e.message);
  };
  ws.onclose = function (e) {
    if (undefined !== 'test') {
      console.warn('[parcel] 🚨 Connection to the HMR server was lost');
    }
  };
}
function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);
  if (overlay) {
    overlay.remove();
    console.log('[parcel] ✨ Error resolved');
  }
}
function createErrorOverlay(diagnostics) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID;
  let errorHTML = '<div style="background: black; opacity: 0.85; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; font-family: Menlo, Consolas, monospace; z-index: 9999;">';
  for (let diagnostic of diagnostics) {
    let stack = diagnostic.codeframe ? diagnostic.codeframe : diagnostic.stack;
    errorHTML += `
      <div>
        <div style="font-size: 18px; font-weight: bold; margin-top: 20px;">
          🚨 ${diagnostic.message}
        </div>
        <pre>
          ${stack}
        </pre>
        <div>
          ${diagnostic.hints.map(hint => '<div>' + hint + '</div>').join('')}
        </div>
      </div>
    `;
  }
  errorHTML += '</div>';
  overlay.innerHTML = errorHTML;
  return overlay;
}
function getParents(bundle, id) /*: Array<[ParcelRequire, string]>*/
{
  var modules = bundle.modules;
  if (!modules) {
    return [];
  }
  var parents = [];
  var k, d, dep;
  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];
      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push([bundle, k]);
      }
    }
  }
  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }
  return parents;
}
function updateLink(link) {
  var newLink = link.cloneNode();
  newLink.onload = function () {
    if (link.parentNode !== null) {
      // $FlowFixMe
      link.parentNode.removeChild(link);
    }
  };
  newLink.setAttribute('href', // $FlowFixMe
  link.getAttribute('href').split('?')[0] + '?' + Date.now());
  // $FlowFixMe
  link.parentNode.insertBefore(newLink, link.nextSibling);
}
var cssTimeout = null;
function reloadCSS() {
  if (cssTimeout) {
    return;
  }
  cssTimeout = setTimeout(function () {
    var links = document.querySelectorAll('link[rel="stylesheet"]');
    for (var i = 0; i < links.length; i++) {
      // $FlowFixMe[incompatible-type]
      var href = /*: string*/
      links[i].getAttribute('href');
      var hostname = getHostname();
      var servedFromHMRServer = hostname === 'localhost' ? new RegExp('^(https?:\\/\\/(0.0.0.0|127.0.0.1)|localhost):' + getPort()).test(href) : href.indexOf(hostname + ':' + getPort());
      var absolute = (/^https?:\/\//i).test(href) && href.indexOf(window.location.origin) !== 0 && !servedFromHMRServer;
      if (!absolute) {
        updateLink(links[i]);
      }
    }
    cssTimeout = null;
  }, 50);
}
function hmrApply(bundle, /*: ParcelRequire*/
asset) /*:  HMRAsset*/
{
  var modules = bundle.modules;
  if (!modules) {
    return;
  }
  if (asset.type === 'css') {
    reloadCSS();
    return;
  }
  let deps = asset.depsByBundle[bundle.HMR_BUNDLE_ID];
  if (deps) {
    var fn = new Function('require', 'module', 'exports', asset.output);
    modules[asset.id] = [fn, deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}
function hmrAcceptCheck(bundle, /*: ParcelRequire*/
id, /*: ParcelRequire*/
/*: string*/
depsByBundle) /*: ?{ [string]: { [string]: string } }*/
{
  var modules = bundle.modules;
  if (!modules) {
    return;
  }
  if (depsByBundle && !depsByBundle[bundle.HMR_BUNDLE_ID]) {
    // If we reached the root bundle without finding where the asset should go,
    // there's nothing to do. Mark as "accepted" so we don't reload the page.
    if (!bundle.parent) {
      return true;
    }
    return hmrAcceptCheck(bundle.parent, id, depsByBundle);
  }
  if (checkedAssets[id]) {
    return;
  }
  checkedAssets[id] = true;
  var cached = bundle.cache[id];
  assetsToAccept.push([bundle, id]);
  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    return true;
  }
  return getParents(module.bundle.root, id).some(function (v) {
    return hmrAcceptCheck(v[0], v[1], null);
  });
}
function hmrAcceptRun(bundle, /*: ParcelRequire*/
id) /*: string*/
{
  var cached = bundle.cache[id];
  bundle.hotData = {};
  if (cached && cached.hot) {
    cached.hot.data = bundle.hotData;
  }
  if (cached && cached.hot && cached.hot._disposeCallbacks.length) {
    cached.hot._disposeCallbacks.forEach(function (cb) {
      cb(bundle.hotData);
    });
  }
  delete bundle.cache[id];
  bundle(id);
  cached = bundle.cache[id];
  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    cached.hot._acceptCallbacks.forEach(function (cb) {
      var assetsToAlsoAccept = cb(function () {
        return getParents(module.bundle.root, id);
      });
      if (assetsToAlsoAccept && assetsToAccept.length) {
        assetsToAccept.push.apply(assetsToAccept, assetsToAlsoAccept);
      }
    });
  }
  acceptedAssets[id] = true;
}

},{}],"1mqC0":[function(require,module,exports) {
var define;
/*!
* MotionPathPlugin 3.9.0
* https://greensock.com
*
* @license Copyright 2021, GreenSock. All rights reserved.
* Subject to the terms at https://greensock.com/standard-license or for Club GreenSock members, the agreement issued with that membership.
* @author: Jack Doyle, jack@greensock.com
*/
!(function (t, e) {
  "object" == typeof exports && "undefined" != typeof module ? e(exports) : "function" == typeof define && define.amd ? define(["exports"], e) : e((t = t || self).window = t.window || ({}));
})(this, function (t) {
  "use strict";
  function p(t) {
    return "string" == typeof t;
  }
  function x(t) {
    return Math.round(1e10 * t) / 1e10 || 0;
  }
  function y(t, e, n, r) {
    var a = t[e], o = 1 === r ? 6 : subdivideSegment(a, n, r);
    if (o && o + n + 2 < a.length) return (t.splice(e, 0, a.slice(0, n + o + 2)), a.splice(0, n + o), 1);
  }
  function C(t, e) {
    var n = t.length, r = t[n - 1] || [], a = r.length;
    (n && e[0] === r[a - 2] && e[1] === r[a - 1] && (e = r.concat(e.slice(2)), n--), t[n] = e);
  }
  var M = /[achlmqstvz]|(-?\d*\.?\d*(?:e[\-+]?\d+)?)[0-9]/gi, T = /(?:(-)?\d*\.?\d*(?:e[\-+]?\d+)?)[0-9]/gi, L = /[\+\-]?\d*\.?\d+e[\+\-]?\d+/gi, r = /(^[#\.][a-z]|[a-y][a-z])/i, q = Math.PI / 180, s = 180 / Math.PI, F = Math.sin, U = Math.cos, H = Math.abs, $ = Math.sqrt, S = Math.atan2, A = 1e8, l = function _isNumber(t) {
    return "number" == typeof t;
  }, N = {}, _ = {}, e = 1e5, d = function _wrapProgress(t) {
    return Math.round((t + A) % 1 * e) / e || (t < 0 ? 0 : 1);
  }, B = function _round(t) {
    return Math.round(t * e) / e || 0;
  }, m = function _getSampleIndex(t, e, n) {
    var r = t.length, a = ~~(n * r);
    if (t[a] > e) for (; --a && t[a] > e; ) ; else for (; t[++a] < e && a < r; ) ;
    return a < r ? a : r - 1;
  }, O = function _copyMetaData(t, e) {
    return (e.totalLength = t.totalLength, t.samples ? (e.samples = t.samples.slice(0), e.lookup = t.lookup.slice(0), e.minLength = t.minLength, e.resolution = t.resolution) : t.totalPoints && (e.totalPoints = t.totalPoints), e);
  };
  function getRawPath(t) {
    var e, n = (t = p(t) && r.test(t) && document.querySelector(t) || t).getAttribute ? t : 0;
    return n && (t = t.getAttribute("d")) ? (n._gsPath || (n._gsPath = {}), (e = n._gsPath[t]) && !e._dirty ? e : n._gsPath[t] = stringToRawPath(t)) : t ? p(t) ? stringToRawPath(t) : l(t[0]) ? [t] : t : console.warn("Expecting a <path> element or an SVG path data string");
  }
  function reverseSegment(t) {
    var e, n = 0;
    for (t.reverse(); n < t.length; n += 2) (e = t[n], t[n] = t[n + 1], t[n + 1] = e);
    t.reversed = !t.reversed;
  }
  var I = {
    rect: "rx,ry,x,y,width,height",
    circle: "r,cx,cy",
    ellipse: "rx,ry,cx,cy",
    line: "x1,x2,y1,y2"
  };
  function convertToPath(t, e) {
    var n, r, a, o, i, s, l, h, u, g, f, c, p, d, m, v, x, y, P, w, b, M, R = t.tagName.toLowerCase(), L = .552284749831;
    return "path" !== R && t.getBBox ? (s = (function _createPath(t, e) {
      var n, r = document.createElementNS("http://www.w3.org/2000/svg", "path"), a = [].slice.call(t.attributes), o = a.length;
      for (e = "," + e + ","; -1 < --o; ) (n = a[o].nodeName.toLowerCase(), e.indexOf("," + n + ",") < 0 && r.setAttributeNS(null, n, a[o].nodeValue));
      return r;
    })(t, "x,y,width,height,cx,cy,rx,ry,r,x1,x2,y1,y2,points"), M = (function _attrToObj(t, e) {
      for (var n = e ? e.split(",") : [], r = {}, a = n.length; -1 < --a; ) r[n[a]] = +t.getAttribute(n[a]) || 0;
      return r;
    })(t, I[R]), "rect" === R ? (o = M.rx, i = M.ry || o, r = M.x, a = M.y, g = M.width - 2 * o, f = M.height - 2 * i, n = o || i ? "M" + (v = (d = (p = r + o) + g) + o) + "," + (y = a + i) + " V" + (P = y + f) + " C" + [v, w = P + i * L, m = d + o * L, b = P + i, d, b, d - (d - p) / 3, b, p + (d - p) / 3, b, p, b, c = r + o * (1 - L), b, r, w, r, P, r, P - (P - y) / 3, r, y + (P - y) / 3, r, y, r, x = a + i * (1 - L), c, a, p, a, p + (d - p) / 3, a, d - (d - p) / 3, a, d, a, m, a, v, x, v, y].join(",") + "z" : "M" + (r + g) + "," + a + " v" + f + " h" + -g + " v" + -f + " h" + g + "z") : "circle" === R || "ellipse" === R ? (h = "circle" === R ? (o = i = M.r) * L : (o = M.rx, (i = M.ry) * L), n = "M" + ((r = M.cx) + o) + "," + (a = M.cy) + " C" + [r + o, a + h, r + (l = o * L), a + i, r, a + i, r - l, a + i, r - o, a + h, r - o, a, r - o, a - h, r - l, a - i, r, a - i, r + l, a - i, r + o, a - h, r + o, a].join(",") + "z") : "line" === R ? n = "M" + M.x1 + "," + M.y1 + " L" + M.x2 + "," + M.y2 : "polyline" !== R && "polygon" !== R || (n = "M" + (r = (u = (t.getAttribute("points") + "").match(T) || []).shift()) + "," + (a = u.shift()) + " L" + u.join(","), "polygon" === R && (n += "," + r + "," + a + "z")), s.setAttribute("d", rawPathToString(s._gsRawPath = stringToRawPath(n))), e && t.parentNode && (t.parentNode.insertBefore(s, t), t.parentNode.removeChild(t)), s) : t;
  }
  function getRotationAtBezierT(t, e, n) {
    var r, a = t[e], o = t[e + 2], i = t[e + 4];
    return (a += (o - a) * n, a += ((o += (i - o) * n) - a) * n, r = o + (i + (t[e + 6] - i) * n - o) * n - a, a = t[e + 1], a += ((o = t[e + 3]) - a) * n, a += ((o += ((i = t[e + 5]) - o) * n) - a) * n, B(S(o + (i + (t[e + 7] - i) * n - o) * n - a, r) * s));
  }
  function sliceRawPath(t, e, n) {
    (n = (function _isUndefined(t) {
      return void 0 === t;
    })(n) ? 1 : x(n) || 0, e = x(e) || 0);
    var r = Math.max(0, ~~(H(n - e) - 1e-8)), a = (function copyRawPath(t) {
      for (var e = [], n = 0; n < t.length; n++) e[n] = O(t[n], t[n].slice(0));
      return O(t, e);
    })(t);
    if ((n < e && (e = 1 - e, n = 1 - n, (function _reverseRawPath(t, e) {
      var n = t.length;
      for (e || t.reverse(); n--; ) t[n].reversed || reverseSegment(t[n]);
    })(a), a.totalLength = 0), e < 0 || n < 0)) {
      var o = Math.abs(~~Math.min(e, n)) + 1;
      (e += o, n += o);
    }
    a.totalLength || cacheRawPathMeasurements(a);
    var i, s, l, h, u, g, f, c, p = 1 < n, d = getProgressData(a, e, N, !0), m = getProgressData(a, n, _), v = m.segment, P = d.segment, w = m.segIndex, b = d.segIndex, M = m.i, R = d.i, L = b === w, T = M === R && L;
    if (p || r) {
      for ((i = w < b || L && M < R || T && m.t < d.t, y(a, b, R, d.t) && (b++, i || (w++, T ? (m.t = (m.t - d.t) / (1 - d.t), M = 0) : L && (M -= R))), Math.abs(1 - (n - e)) < 1e-5 ? w = b - 1 : !m.t && w ? w-- : y(a, w, M, m.t) && i && b++, 1 === d.t && (b = (b + 1) % a.length), u = [], f = 1 + (g = a.length) * r, f += (g - (c = b) + w) % g, h = 0); h < f; h++) C(u, a[c++ % g]);
      a = u;
    } else if ((l = 1 === m.t ? 6 : subdivideSegment(v, M, m.t), e !== n)) for ((s = subdivideSegment(P, R, T ? d.t / m.t : d.t), L && (l += s), v.splice(M + l + 2), (s || R) && P.splice(0, R + s), h = a.length); h--; ) (h < b || w < h) && a.splice(h, 1); else (v.angle = getRotationAtBezierT(v, M + l, 0), d = v[M += l], m = v[M + 1], v.length = v.totalLength = 0, v.totalPoints = a.totalPoints = 8, v.push(d, m, d, m, d, m, d, m));
    return (a.totalLength = 0, a);
  }
  function measureSegment(t, e, n) {
    (e = e || 0, t.samples || (t.samples = [], t.lookup = []));
    var r, a, o, i, s, l, h, u, g, f, c, p, d, m, v, x, y, P = ~~t.resolution || 12, w = 1 / P, b = n ? e + 6 * n + 1 : t.length, M = t[e], R = t[e + 1], L = e ? e / 6 * P : 0, T = t.samples, S = t.lookup, N = (e ? t.minLength : A) || A, _ = T[L + n * P - 1], C = e ? T[L - 1] : 0;
    for ((T.length = S.length = 0, a = e + 2); a < b; a += 6) {
      if ((o = t[a + 4] - M, i = t[a + 2] - M, s = t[a] - M, u = t[a + 5] - R, g = t[a + 3] - R, f = t[a + 1] - R, l = h = c = p = 0, H(o) < .01 && H(u) < .01 && H(s) + H(f) < .01)) 8 < t.length && (t.splice(a, 6), a -= 6, b -= 6); else for (r = 1; r <= P; r++) (l = h - (h = ((m = w * r) * m * o + 3 * (d = 1 - m) * (m * i + d * s)) * m), c = p - (p = (m * m * u + 3 * d * (m * g + d * f)) * m), (x = $(c * c + l * l)) < N && (N = x), C += x, T[L++] = C);
      (M += o, R += u);
    }
    if (_) for (_ -= C; L < T.length; L++) T[L] += _;
    if (T.length && N) {
      if ((t.totalLength = y = T[T.length - 1] || 0, y / (t.minLength = N) < 9999)) for ((x = v = 0, r = 0); r < y; r += N) S[x++] = T[v] < r ? ++v : v;
    } else t.totalLength = T[0] = 0;
    return e ? C - T[e / 2 - 1] : C;
  }
  function cacheRawPathMeasurements(t, e) {
    var n, r, a;
    for (a = n = r = 0; a < t.length; a++) (t[a].resolution = ~~e || 12, r += t[a].length, n += measureSegment(t[a]));
    return (t.totalPoints = r, t.totalLength = n, t);
  }
  function subdivideSegment(t, e, n) {
    if (n <= 0 || 1 <= n) return 0;
    var r = t[e], a = t[e + 1], o = t[e + 2], i = t[e + 3], s = t[e + 4], l = t[e + 5], h = r + (o - r) * n, u = o + (s - o) * n, g = a + (i - a) * n, f = i + (l - i) * n, c = h + (u - h) * n, p = g + (f - g) * n, d = s + (t[e + 6] - s) * n, m = l + (t[e + 7] - l) * n;
    return (u += (d - u) * n, f += (m - f) * n, t.splice(e + 2, 4, B(h), B(g), B(c), B(p), B(c + (u - c) * n), B(p + (f - p) * n), B(u), B(f), B(d), B(m)), t.samples && t.samples.splice(e / 6 * t.resolution | 0, 0, 0, 0, 0, 0, 0, 0), 6);
  }
  function getProgressData(t, e, n, r) {
    (n = n || ({}), t.totalLength || cacheRawPathMeasurements(t), (e < 0 || 1 < e) && (e = d(e)));
    var a, o, i, s, l, h, u, g = 0, f = t[0];
    if (e) if (1 === e) (u = 1, h = (f = t[g = t.length - 1]).length - 8); else {
      if (1 < t.length) {
        for ((i = t.totalLength * e, l = h = 0); (l += t[h++].totalLength) < i; ) g = h;
        e = (i - (s = l - (f = t[g]).totalLength)) / (l - s) || 0;
      }
      (a = f.samples, o = f.resolution, i = f.totalLength * e, s = (h = f.lookup.length ? f.lookup[~~(i / f.minLength)] || 0 : m(a, i, e)) ? a[h - 1] : 0, (l = a[h]) < i && (s = l, l = a[++h]), u = 1 / o * ((i - s) / (l - s) + h % o), h = 6 * ~~(h / o), r && 1 === u && (h + 6 < f.length ? (h += 6, u = 0) : g + 1 < t.length && (h = u = 0, f = t[++g])));
    } else (u = h = g = 0, f = t[0]);
    return (n.t = u, n.i = h, n.path = t, n.segment = f, n.segIndex = g, n);
  }
  function getPositionOnPath(t, e, n, r) {
    var a, o, i, s, l, h, u, g, f, c = t[0], p = r || ({});
    if (((e < 0 || 1 < e) && (e = d(e)), 1 < t.length)) {
      for ((i = t.totalLength * e, l = h = 0); (l += t[h++].totalLength) < i; ) c = t[h];
      e = (i - (s = l - c.totalLength)) / (l - s) || 0;
    }
    return (a = c.samples, o = c.resolution, i = c.totalLength * e, s = (h = c.lookup.length ? c.lookup[e < 1 ? ~~(i / c.minLength) : c.lookup.length - 1] || 0 : m(a, i, e)) ? a[h - 1] : 0, (l = a[h]) < i && (s = l, l = a[++h]), f = 1 - (u = 1 / o * ((i - s) / (l - s) + h % o) || 0), g = c[h = 6 * ~~(h / o)], p.x = B((u * u * (c[h + 6] - g) + 3 * f * (u * (c[h + 4] - g) + f * (c[h + 2] - g))) * u + g), p.y = B((u * u * (c[h + 7] - (g = c[h + 1])) + 3 * f * (u * (c[h + 5] - g) + f * (c[h + 3] - g))) * u + g), n && (p.angle = c.totalLength ? getRotationAtBezierT(c, h, 1 <= u ? 1 - 1e-9 : u || 1e-9) : c.angle || 0), p);
  }
  function transformRawPath(t, e, n, r, a, o, i) {
    for (var s, l, h, u, g, f = t.length; -1 < --f; ) for ((l = (s = t[f]).length, h = 0); h < l; h += 2) (u = s[h], g = s[h + 1], s[h] = u * e + g * r + o, s[h + 1] = u * n + g * a + i);
    return (t._dirty = 1, t);
  }
  function arcToSegment(t, e, n, r, a, o, i, s, l) {
    if (t !== s || e !== l) {
      (n = H(n), r = H(r));
      var h = a % 360 * q, u = U(h), g = F(h), f = Math.PI, c = 2 * f, p = (t - s) / 2, d = (e - l) / 2, m = u * p + g * d, v = -g * p + u * d, x = m * m, y = v * v, P = x / (n * n) + y / (r * r);
      1 < P && (n = $(P) * n, r = $(P) * r);
      var w = n * n, b = r * r, M = (w * b - w * y - b * x) / (w * y + b * x);
      M < 0 && (M = 0);
      var R = (o === i ? -1 : 1) * $(M), L = n * v / r * R, T = -r * m / n * R, S = u * L - g * T + (t + s) / 2, N = g * L + u * T + (e + l) / 2, _ = (m - L) / n, C = (v - T) / r, A = (-m - L) / n, B = (-v - T) / r, O = _ * _ + C * C, I = (C < 0 ? -1 : 1) * Math.acos(_ / $(O)), E = (_ * B - C * A < 0 ? -1 : 1) * Math.acos((_ * A + C * B) / $(O * (A * A + B * B)));
      (isNaN(E) && (E = f), !i && 0 < E ? E -= c : i && E < 0 && (E += c), I %= c, E %= c);
      var G, D = Math.ceil(H(E) / (c / 4)), X = [], z = E / D, k = 4 / 3 * F(z / 2) / (1 + U(z / 2)), Z = u * n, V = g * n, Y = g * -r, j = u * r;
      for (G = 0; G < D; G++) (m = U(a = I + G * z), v = F(a), _ = U(a += z), C = F(a), X.push(m - k * v, v + k * m, _ + k * C, C - k * _, _, C));
      for (G = 0; G < X.length; G += 2) (m = X[G], v = X[G + 1], X[G] = m * Z + v * Y + S, X[G + 1] = m * V + v * j + N);
      return (X[G - 2] = s, X[G - 1] = l, X);
    }
  }
  function stringToRawPath(t) {
    function Af(t, e, n, r) {
      (u = (n - t) / 3, g = (r - e) / 3, s.push(t + u, e + g, n - u, r - g, n, r));
    }
    var e, n, r, a, o, i, s, l, h, u, g, f, c, p, d, m = (t + "").replace(L, function (t) {
      var e = +t;
      return e < 1e-4 && -1e-4 < e ? 0 : e;
    }).match(M) || [], v = [], x = 0, y = 0, P = m.length, w = 0, b = "ERROR: malformed path: " + t;
    if (!t || !isNaN(m[0]) || isNaN(m[1])) return (console.log(b), v);
    for (e = 0; e < P; e++) if ((c = o, isNaN(m[e]) ? i = (o = m[e].toUpperCase()) !== m[e] : e--, r = +m[e + 1], a = +m[e + 2], i && (r += x, a += y), e || (l = r, h = a), "M" === o)) (s && (s.length < 8 ? --v.length : w += s.length), x = l = r, y = h = a, s = [r, a], v.push(s), e += 2, o = "L"); else if ("C" === o) (i || (x = y = 0), (s = s || [0, 0]).push(r, a, x + 1 * m[e + 3], y + 1 * m[e + 4], x += 1 * m[e + 5], y += 1 * m[e + 6]), e += 6); else if ("S" === o) (u = x, g = y, "C" !== c && "S" !== c || (u += x - s[s.length - 4], g += y - s[s.length - 3]), i || (x = y = 0), s.push(u, g, r, a, x += 1 * m[e + 3], y += 1 * m[e + 4]), e += 4); else if ("Q" === o) (u = x + 2 / 3 * (r - x), g = y + 2 / 3 * (a - y), i || (x = y = 0), x += 1 * m[e + 3], y += 1 * m[e + 4], s.push(u, g, x + 2 / 3 * (r - x), y + 2 / 3 * (a - y), x, y), e += 4); else if ("T" === o) (u = x - s[s.length - 4], g = y - s[s.length - 3], s.push(x + u, y + g, r + 2 / 3 * (x + 1.5 * u - r), a + 2 / 3 * (y + 1.5 * g - a), x = r, y = a), e += 2); else if ("H" === o) (Af(x, y, x = r, y), e += 1); else if ("V" === o) (Af(x, y, x, y = r + (i ? y - x : 0)), e += 1); else if ("L" === o || "Z" === o) ("Z" === o && (r = l, a = h, s.closed = !0), ("L" === o || .5 < H(x - r) || .5 < H(y - a)) && (Af(x, y, r, a), "L" === o && (e += 2)), x = r, y = a); else if ("A" === o) {
      if ((p = m[e + 4], d = m[e + 5], u = m[e + 6], g = m[e + 7], n = 7, 1 < p.length && (p.length < 3 ? (g = u, u = d, n--) : (g = d, u = p.substr(2), n -= 2), d = p.charAt(1), p = p.charAt(0)), f = arcToSegment(x, y, +m[e + 1], +m[e + 2], +m[e + 3], +p, +d, (i ? x : 0) + 1 * u, (i ? y : 0) + 1 * g), e += n, f)) for (n = 0; n < f.length; n++) s.push(f[n]);
      (x = s[s.length - 2], y = s[s.length - 1]);
    } else console.log(b);
    return ((e = s.length) < 6 ? (v.pop(), e = 0) : s[0] === s[e - 2] && s[1] === s[e - 1] && (s.closed = !0), v.totalPoints = w + e, v);
  }
  function flatPointsToSegment(t, e) {
    void 0 === e && (e = 1);
    for (var n = t[0], r = 0, a = [n, r], o = 2; o < t.length; o += 2) a.push(n, r, t[o], r = (t[o] - n) * e / 2, n = t[o], -r);
    return a;
  }
  function pointsToSegment(t, e, n) {
    H(t[0] - t[2]) < 1e-4 && H(t[1] - t[3]) < 1e-4 && (t = t.slice(2));
    var r, a, o, i, s, l, h, u, g, f, c, p, d, m, v = t.length - 2, x = +t[0], y = +t[1], P = +t[2], w = +t[3], b = [x, y, x, y], M = P - x, R = w - y, L = Math.abs(t[v] - x) < .001 && Math.abs(t[v + 1] - y) < .001;
    for ((isNaN(n) && (n = Math.PI / 10), L && (t.push(P, w), P = x, w = y, x = t[v - 2], y = t[v - 1], t.unshift(x, y), v += 4), e = e || 0 === e ? +e : 1, s = 2); s < v; s += 2) (r = x, a = y, x = P, y = w, P = +t[s + 2], w = +t[s + 3], x === P && y === w || (p = (l = M) * l + (u = R) * u, d = (M = P - x) * M + (R = w - y) * R, m = (h = P - r) * h + (g = w - a) * g, c = (o = Math.acos((p + d - m) / $(4 * p * d))) / Math.PI * e, f = $(p) * c, c *= $(d), x === r && y === a || (n < o ? (i = S(g, h), b.push(B(x - U(i) * f), B(y - F(i) * f), B(x), B(y), B(x + U(i) * c), B(y + F(i) * c))) : (i = S(u, l), b.push(B(x - U(i) * f), B(y - F(i) * f)), i = S(R, M), b.push(B(x), B(y), B(x + U(i) * c), B(y + F(i) * c))))));
    return (x !== P || y !== w || b.length < 4 ? b.push(B(P), B(w), B(P), B(w)) : b.length -= 2, L && (b.splice(0, 6), b.length = b.length - 6), b);
  }
  function rawPathToString(t) {
    l(t[0]) && (t = [t]);
    var e, n, r, a, o = "", i = t.length;
    for (n = 0; n < i; n++) {
      for ((a = t[n], o += "M" + B(a[0]) + "," + B(a[1]) + " C", e = a.length, r = 2); r < e; r++) o += B(a[r++]) + "," + B(a[r++]) + " " + B(a[r++]) + "," + B(a[r++]) + " " + B(a[r++]) + "," + B(a[r]) + " ";
      a.closed && (o += "z");
    }
    return o;
  }
  function R(t) {
    var e = t.ownerDocument || t;
    !((z in t.style)) && ("msTransform" in t.style) && (k = (z = "msTransform") + "Origin");
    for (; e.parentNode && (e = e.parentNode); ) ;
    if ((v = window, E = new j(), e)) {
      (P = (c = e).documentElement, w = e.body, (G = c.createElementNS("http://www.w3.org/2000/svg", "g")).style.transform = "none");
      var n = e.createElement("div"), r = e.createElement("div");
      (w.appendChild(n), n.appendChild(r), n.style.position = "static", n.style[z] = "translate3d(0,0,1px)", D = r.offsetParent !== n, w.removeChild(n));
    }
    return e;
  }
  function X(t) {
    return t.ownerSVGElement || ("svg" === (t.tagName + "").toLowerCase() ? t : null);
  }
  function Z(t, e) {
    if (t.parentNode && (c || R(t))) {
      var n = X(t), r = n ? n.getAttribute("xmlns") || "http://www.w3.org/2000/svg" : "http://www.w3.org/1999/xhtml", a = n ? e ? "rect" : "g" : "div", o = 2 !== e ? 0 : 100, i = 3 === e ? 100 : 0, s = "position:absolute;display:block;pointer-events:none;margin:0;padding:0;", l = c.createElementNS ? c.createElementNS(r.replace(/^https/, "http"), a) : c.createElement(a);
      return (e && (n ? (b = b || Z(t), l.setAttribute("width", .01), l.setAttribute("height", .01), l.setAttribute("transform", "translate(" + o + "," + i + ")"), b.appendChild(l)) : (f || ((f = Z(t)).style.cssText = s), l.style.cssText = s + "width:0.1px;height:0.1px;top:" + i + "px;left:" + o + "px", f.appendChild(l))), l);
    }
    throw "Need document and parent.";
  }
  function aa(t, e) {
    var n, r, a, o, i, s, l = X(t), h = t === l, u = l ? V : Y, g = t.parentNode;
    if (t === v) return t;
    if ((u.length || u.push(Z(t, 1), Z(t, 2), Z(t, 3)), n = l ? b : f, l)) (h ? (o = -(a = (function _getCTM(t) {
      var e, n = t.getCTM();
      return (n || (e = t.style[z], t.style[z] = "none", t.appendChild(G), n = G.getCTM(), t.removeChild(G), e ? t.style[z] = e : t.style.removeProperty(z.replace(/([A-Z])/g, "-$1").toLowerCase())), n || E.clone());
    })(t)).e / a.a, i = -a.f / a.d, r = E) : (a = t.getBBox(), o = (r = (r = t.transform ? t.transform.baseVal : {}).numberOfItems ? 1 < r.numberOfItems ? (function _consolidate(t) {
      for (var e = new j(), n = 0; n < t.numberOfItems; n++) e.multiply(t.getItem(n).matrix);
      return e;
    })(r) : r.getItem(0).matrix : E).a * a.x + r.c * a.y, i = r.b * a.x + r.d * a.y), e && "g" === t.tagName.toLowerCase() && (o = i = 0), (h ? l : g).appendChild(n), n.setAttribute("transform", "matrix(" + r.a + "," + r.b + "," + r.c + "," + r.d + "," + (r.e + o) + "," + (r.f + i) + ")")); else {
      if ((o = i = 0, D)) for ((r = t.offsetParent, a = t); (a = a && a.parentNode) && a !== r && a.parentNode; ) 4 < (v.getComputedStyle(a)[z] + "").length && (o = a.offsetLeft, i = a.offsetTop, a = 0);
      if ("absolute" !== (s = v.getComputedStyle(t)).position && "fixed" !== s.position) for (r = t.offsetParent; g && g !== r; ) (o += g.scrollLeft || 0, i += g.scrollTop || 0, g = g.parentNode);
      ((a = n.style).top = t.offsetTop - i + "px", a.left = t.offsetLeft - o + "px", a[z] = s[z], a[k] = s[k], a.position = "fixed" === s.position ? "fixed" : "absolute", t.parentNode.appendChild(n));
    }
    return n;
  }
  function ba(t, e, n, r, a, o, i) {
    return (t.a = e, t.b = n, t.c = r, t.d = a, t.e = o, t.f = i, t);
  }
  var c, v, P, w, f, b, E, G, D, n, z = "transform", k = z + "Origin", V = [], Y = [], j = ((n = Matrix2D.prototype).inverse = function inverse() {
    var t = this.a, e = this.b, n = this.c, r = this.d, a = this.e, o = this.f, i = t * r - e * n || 1e-10;
    return ba(this, r / i, -e / i, -n / i, t / i, (n * o - r * a) / i, -(t * o - e * a) / i);
  }, n.multiply = function multiply(t) {
    var e = this.a, n = this.b, r = this.c, a = this.d, o = this.e, i = this.f, s = t.a, l = t.c, h = t.b, u = t.d, g = t.e, f = t.f;
    return ba(this, s * e + h * r, s * n + h * a, l * e + u * r, l * n + u * a, o + g * e + f * r, i + g * n + f * a);
  }, n.clone = function clone() {
    return new Matrix2D(this.a, this.b, this.c, this.d, this.e, this.f);
  }, n.equals = function equals(t) {
    var e = this.a, n = this.b, r = this.c, a = this.d, o = this.e, i = this.f;
    return e === t.a && n === t.b && r === t.c && a === t.d && o === t.e && i === t.f;
  }, n.apply = function apply(t, e) {
    void 0 === e && (e = {});
    var n = t.x, r = t.y, a = this.a, o = this.b, i = this.c, s = this.d, l = this.e, h = this.f;
    return (e.x = n * a + r * i + l || 0, e.y = n * o + r * s + h || 0, e);
  }, Matrix2D);
  function Matrix2D(t, e, n, r, a, o) {
    (void 0 === t && (t = 1), void 0 === e && (e = 0), void 0 === n && (n = 0), void 0 === r && (r = 1), void 0 === a && (a = 0), void 0 === o && (o = 0), ba(this, t, e, n, r, a, o));
  }
  function getGlobalMatrix(t, e, n, r) {
    if (!t || !t.parentNode || (c || R(t)).documentElement === t) return new j();
    var a = (function _forceNonZeroScale(t) {
      for (var e, n; t && t !== w; ) ((n = t._gsap) && n.uncache && n.get(t, "x"), n && !n.scaleX && !n.scaleY && n.renderTransform && (n.scaleX = n.scaleY = 1e-4, n.renderTransform(1, n), e ? e.push(n) : e = [n]), t = t.parentNode);
      return e;
    })(t), o = X(t) ? V : Y, i = aa(t, n), s = o[0].getBoundingClientRect(), l = o[1].getBoundingClientRect(), h = o[2].getBoundingClientRect(), u = i.parentNode, g = !r && (function _isFixed(t) {
      return "fixed" === v.getComputedStyle(t).position || ((t = t.parentNode) && 1 === t.nodeType ? _isFixed(t) : void 0);
    })(t), f = new j((l.left - s.left) / 100, (l.top - s.top) / 100, (h.left - s.left) / 100, (h.top - s.top) / 100, s.left + (g ? 0 : (function _getDocScrollLeft() {
      return v.pageXOffset || c.scrollLeft || P.scrollLeft || w.scrollLeft || 0;
    })()), s.top + (g ? 0 : (function _getDocScrollTop() {
      return v.pageYOffset || c.scrollTop || P.scrollTop || w.scrollTop || 0;
    })()));
    if ((u.removeChild(i), a)) for (s = a.length; s--; ) ((l = a[s]).scaleX = l.scaleY = 0, l.renderTransform(1, l));
    return e ? f.inverse() : f;
  }
  function la(t, e, n, r) {
    for (var a = e.length, o = 2 === r ? 0 : r, i = 0; i < a; i++) (t[o] = parseFloat(e[i][n]), 2 === r && (t[o + 1] = 0), o += 2);
    return t;
  }
  function ma(t, e, n) {
    return parseFloat(t._gsap.get(t, e, n || "px")) || 0;
  }
  function na(t) {
    var e, n = t[0], r = t[1];
    for (e = 2; e < t.length; e += 2) (n = t[e] += n, r = t[e + 1] += r);
  }
  function oa(t, e, n, r, a, o, i, s, l) {
    return (e = "cubic" === i.type ? [e] : (!1 !== i.fromCurrent && e.unshift(ma(n, r, s), a ? ma(n, a, l) : 0), i.relative && na(e), [(a ? pointsToSegment : flatPointsToSegment)(e, i.curviness)]), e = o(nt(e, n, i)), rt(t, n, r, e, "x", s), a && rt(t, n, a, e, "y", l), cacheRawPathMeasurements(e, i.resolution || (0 === i.curviness ? 20 : 12)));
  }
  function pa(t) {
    return t;
  }
  function ra(t, e, n) {
    var r, a = getGlobalMatrix(t), o = 0, i = 0;
    return ("svg" === (t.tagName + "").toLowerCase() ? (r = t.viewBox.baseVal).width || (r = {
      width: +t.getAttribute("width"),
      height: +t.getAttribute("height")
    }) : r = e && t.getBBox && t.getBBox(), e && "auto" !== e && (o = e.push ? e[0] * (r ? r.width : t.offsetWidth || 0) : e.x, i = e.push ? e[1] * (r ? r.height : t.offsetHeight || 0) : e.y), n.apply(o || i ? a.apply({
      x: o,
      y: i
    }) : {
      x: a.e,
      y: a.f
    }));
  }
  function sa(t, e, n, r) {
    var a, o = getGlobalMatrix(t.parentNode, !0, !0), i = o.clone().multiply(getGlobalMatrix(e)), s = ra(t, n, o), l = ra(e, r, o), h = l.x, u = l.y;
    return (i.e = i.f = 0, "auto" === r && e.getTotalLength && "path" === e.tagName.toLowerCase() && (a = e.getAttribute("d").match(et) || [], h += (a = i.apply({
      x: +a[0],
      y: +a[1]
    })).x, u += a.y), (a || e.getBBox && t.getBBox && e.ownerSVGElement === t.ownerSVGElement) && (h -= (a = i.apply(e.getBBox())).x, u -= a.y), i.e = h - s.x, i.f = u - s.y, i);
  }
  var Q, g, W, J, K = ("x,translateX,left,marginLeft,xPercent").split(","), tt = ("y,translateY,top,marginTop,yPercent").split(","), o = Math.PI / 180, et = /[-+\.]*\d+\.?(?:e-|e\+)?\d*/g, nt = function _align(t, e, n) {
    var r, a, o, i = n.align, s = n.matrix, l = n.offsetX, h = n.offsetY, u = n.alignOrigin, g = t[0][0], f = t[0][1], c = ma(e, "x"), p = ma(e, "y");
    return t && t.length ? (i && ("self" === i || (r = J(i)[0] || e) === e ? transformRawPath(t, 1, 0, 0, 1, c - g, p - f) : (u && !1 !== u[2] ? Q.set(e, {
      transformOrigin: 100 * u[0] + "% " + 100 * u[1] + "%"
    }) : u = [ma(e, "xPercent") / -100, ma(e, "yPercent") / -100], o = (a = sa(e, r, u, "auto")).apply({
      x: g,
      y: f
    }), transformRawPath(t, a.a, a.b, a.c, a.d, c + a.e - (o.x - a.e), p + a.f - (o.y - a.f)))), s ? transformRawPath(t, s.a, s.b, s.c, s.d, s.e, s.f) : (l || h) && transformRawPath(t, 1, 0, 0, 1, l || 0, h || 0), t) : getRawPath("M0,0L0,0");
  }, rt = function _addDimensionalPropTween(t, e, n, r, a, o) {
    var i = e._gsap, s = i.harness, l = s && s.aliases && s.aliases[n], h = l && l.indexOf(",") < 0 ? l : n, u = t._pt = new g(t._pt, e, h, 0, 0, pa, 0, i.set(e, h, t));
    (u.u = W(i.get(e, h, o)) || 0, u.path = r, u.pp = a, t._props.push(h));
  }, a = {
    version: "3.9.0",
    name: "motionPath",
    register: function register(t, e, n) {
      (W = (Q = t).utils.getUnit, J = Q.utils.toArray, g = n);
    },
    init: function init(t, e) {
      if (!Q) return (console.warn("Please gsap.registerPlugin(MotionPathPlugin)"), !1);
      "object" == typeof e && !e.style && e.path || (e = {
        path: e
      });
      var n, r, a = [], o = e.path, i = e.autoRotate, s = e.unitX, l = e.unitY, h = e.x, u = e.y, g = o[0], f = (function _sliceModifier(e, n) {
        return function (t) {
          return e || 1 !== n ? sliceRawPath(t, e, n) : t;
        };
      })(e.start, ("end" in e) ? e.end : 1);
      if ((this.rawPaths = a, this.target = t, (this.rotate = i || 0 === i) && (this.rOffset = parseFloat(i) || 0, this.radians = !!e.useRadians, this.rProp = e.rotation || "rotation", this.rSet = t._gsap.set(t, this.rProp, this), this.ru = W(t._gsap.get(t, this.rProp)) || 0), !Array.isArray(o) || ("closed" in o) || "number" == typeof g)) (cacheRawPathMeasurements(n = f(nt(getRawPath(e.path), t, e)), e.resolution), a.push(n), rt(this, t, e.x || "x", n, "x", e.unitX || "px"), rt(this, t, e.y || "y", n, "y", e.unitY || "px")); else {
        for (r in g) !h && ~K.indexOf(r) ? h = r : !u && ~tt.indexOf(r) && (u = r);
        for (r in (h && u ? a.push(oa(this, la(la([], o, h, 0), o, u, 1), t, h, u, f, e, s || W(o[0][h]), l || W(o[0][u]))) : h = u = 0, g)) r !== h && r !== u && a.push(oa(this, la([], o, r, 2), t, r, 0, f, e, W(o[0][r])));
      }
    },
    render: function render(t, e) {
      var n = e.rawPaths, r = n.length, a = e._pt;
      for (1 < t ? t = 1 : t < 0 && (t = 0); r--; ) getPositionOnPath(n[r], t, !r && e.rotate, n[r]);
      for (; a; ) (a.set(a.t, a.p, a.path[a.pp] + a.u, a.d, t), a = a._next);
      e.rotate && e.rSet(e.target, e.rProp, n[0].angle * (e.radians ? o : 1) + e.rOffset + e.ru, e, t);
    },
    getLength: function getLength(t) {
      return cacheRawPathMeasurements(getRawPath(t)).totalLength;
    },
    sliceRawPath: sliceRawPath,
    getRawPath: getRawPath,
    pointsToSegment: pointsToSegment,
    stringToRawPath: stringToRawPath,
    rawPathToString: rawPathToString,
    transformRawPath: transformRawPath,
    getGlobalMatrix: getGlobalMatrix,
    getPositionOnPath: getPositionOnPath,
    cacheRawPathMeasurements: cacheRawPathMeasurements,
    convertToPath: function convertToPath$1(t, e) {
      return J(t).map(function (t) {
        return convertToPath(t, !1 !== e);
      });
    },
    convertCoordinates: function convertCoordinates(t, e, n) {
      var r = getGlobalMatrix(e, !0, !0).multiply(getGlobalMatrix(t));
      return n ? r.apply(n) : r;
    },
    getAlignMatrix: sa,
    getRelativePosition: function getRelativePosition(t, e, n, r) {
      var a = sa(t, e, n, r);
      return {
        x: a.e,
        y: a.f
      };
    },
    arrayToRawPath: function arrayToRawPath(t, e) {
      var n = la(la([], t, (e = e || ({})).x || "x", 0), t, e.y || "y", 1);
      return (e.relative && na(n), ["cubic" === e.type ? n : pointsToSegment(n, e.curviness)]);
    }
  };
  (!(function _getGSAP() {
    return Q || "undefined" != typeof window && (Q = window.gsap) && Q.registerPlugin && Q;
  })() || Q.registerPlugin(a), t.MotionPathPlugin = a, t.default = a);
  if (typeof window === "undefined" || window !== t) {
    Object.defineProperty(t, "__esModule", {
      value: !0
    });
  } else {
    delete t.default;
  }
});

},{}]},["6Lkf8","1mqC0"], "1mqC0", "parcelRequire427e")

//# sourceMappingURL=index.df4a3c68.js.map
