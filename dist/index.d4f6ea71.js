/*!
 * MotionPathPlugin 3.9.0
 * https://greensock.com
 * 
 * @license Copyright 2021, GreenSock. All rights reserved.
 * Subject to the terms at https://greensock.com/standard-license or for Club GreenSock members, the agreement issued with that membership.
 * @author: Jack Doyle, jack@greensock.com
 */ !function(t, e) {
    "object" == typeof exports && "undefined" != typeof module ? e(exports) : "function" == typeof define && define.amd ? define([
        "exports"
    ], e) : e((t = t || self).window = t.window || {
    });
}(this, function(t1) {
    "use strict";
    function p1(t) {
        return "string" == typeof t;
    }
    function x1(t) {
        return Math.round(10000000000 * t) / 10000000000 || 0;
    }
    function y1(t, e, n, r) {
        var a = t[e], o = 1 === r ? 6 : subdivideSegment(a, n, r);
        if (o && o + n + 2 < a.length) return t.splice(e, 0, a.slice(0, n + o + 2)), a.splice(0, n + o), 1;
    }
    function C1(t, e) {
        var n = t.length, r = t[n - 1] || [], a = r.length;
        n && e[0] === r[a - 2] && e[1] === r[a - 1] && (e = r.concat(e.slice(2)), n--), t[n] = e;
    }
    var M1 = /[achlmqstvz]|(-?\d*\.?\d*(?:e[\-+]?\d+)?)[0-9]/gi, T1 = /(?:(-)?\d*\.?\d*(?:e[\-+]?\d+)?)[0-9]/gi, L1 = /[\+\-]?\d*\.?\d+e[\+\-]?\d+/gi, r1 = /(^[#\.][a-z]|[a-y][a-z])/i, q = Math.PI / 180, s1 = 180 / Math.PI, F = Math.sin, U = Math.cos, H = Math.abs, $ = Math.sqrt, S1 = Math.atan2, A1 = 100000000, l1 = function _isNumber(t) {
        return "number" == typeof t;
    }, N1 = {
    }, _1 = {
    }, e1 = 100000, d1 = function _wrapProgress(t) {
        return Math.round((t + A1) % 1 * e1) / e1 || (t < 0 ? 0 : 1);
    }, B1 = function _round(t) {
        return Math.round(t * e1) / e1 || 0;
    }, m1 = function _getSampleIndex(t, e, n) {
        var r = t.length, a = ~~(n * r);
        if (t[a] > e) for(; --a && t[a] > e;);
        else for(; t[++a] < e && a < r;);
        return a < r ? a : r - 1;
    }, O1 = function _copyMetaData(t, e) {
        return e.totalLength = t.totalLength, t.samples ? (e.samples = t.samples.slice(0), e.lookup = t.lookup.slice(0), e.minLength = t.minLength, e.resolution = t.resolution) : t.totalPoints && (e.totalPoints = t.totalPoints), e;
    };
    function getRawPath(t) {
        var e, n = (t = p1(t) && r1.test(t) && document.querySelector(t) || t).getAttribute ? t : 0;
        return n && (t = t.getAttribute("d")) ? (n._gsPath || (n._gsPath = {
        }), (e = n._gsPath[t]) && !e._dirty ? e : n._gsPath[t] = stringToRawPath(t)) : t ? p1(t) ? stringToRawPath(t) : l1(t[0]) ? [
            t
        ] : t : console.warn("Expecting a <path> element or an SVG path data string");
    }
    function reverseSegment(t) {
        var e, n = 0;
        for(t.reverse(); n < t.length; n += 2)e = t[n], t[n] = t[n + 1], t[n + 1] = e;
        t.reversed = !t.reversed;
    }
    var I1 = {
        rect: "rx,ry,x,y,width,height",
        circle: "r,cx,cy",
        ellipse: "rx,ry,cx,cy",
        line: "x1,x2,y1,y2"
    };
    function convertToPath(t2, e2) {
        var n2, r2, a2, o2, i, s, l, h, u, g, f, c, p, d, m, v, x, y, P, w, b, M, R = t2.tagName.toLowerCase(), L = 0.552284749831;
        return "path" !== R && t2.getBBox ? (s = (function _createPath(t, e) {
            var n, r = document.createElementNS("http://www.w3.org/2000/svg", "path"), a = [].slice.call(t.attributes), o = a.length;
            for(e = "," + e + ","; -1 < --o;)n = a[o].nodeName.toLowerCase(), e.indexOf("," + n + ",") < 0 && r.setAttributeNS(null, n, a[o].nodeValue);
            return r;
        })(t2, "x,y,width,height,cx,cy,rx,ry,r,x1,x2,y1,y2,points"), M = (function _attrToObj(t, e) {
            for(var n = e ? e.split(",") : [], r = {
            }, a = n.length; -1 < --a;)r[n[a]] = +t.getAttribute(n[a]) || 0;
            return r;
        })(t2, I1[R]), "rect" === R ? (o2 = M.rx, i = M.ry || o2, r2 = M.x, a2 = M.y, g = M.width - 2 * o2, f = M.height - 2 * i, n2 = o2 || i ? "M" + (v = (d = (p = r2 + o2) + g) + o2) + "," + (y = a2 + i) + " V" + (P = y + f) + " C" + [
            v,
            w = P + i * L,
            m = d + o2 * L,
            b = P + i,
            d,
            b,
            d - (d - p) / 3,
            b,
            p + (d - p) / 3,
            b,
            p,
            b,
            c = r2 + o2 * (1 - L),
            b,
            r2,
            w,
            r2,
            P,
            r2,
            P - (P - y) / 3,
            r2,
            y + (P - y) / 3,
            r2,
            y,
            r2,
            x = a2 + i * (1 - L),
            c,
            a2,
            p,
            a2,
            p + (d - p) / 3,
            a2,
            d - (d - p) / 3,
            a2,
            d,
            a2,
            m,
            a2,
            v,
            x,
            v,
            y
        ].join(",") + "z" : "M" + (r2 + g) + "," + a2 + " v" + f + " h" + -g + " v" + -f + " h" + g + "z") : "circle" === R || "ellipse" === R ? (h = "circle" === R ? (o2 = i = M.r) * L : (o2 = M.rx, (i = M.ry) * L), n2 = "M" + ((r2 = M.cx) + o2) + "," + (a2 = M.cy) + " C" + [
            r2 + o2,
            a2 + h,
            r2 + (l = o2 * L),
            a2 + i,
            r2,
            a2 + i,
            r2 - l,
            a2 + i,
            r2 - o2,
            a2 + h,
            r2 - o2,
            a2,
            r2 - o2,
            a2 - h,
            r2 - l,
            a2 - i,
            r2,
            a2 - i,
            r2 + l,
            a2 - i,
            r2 + o2,
            a2 - h,
            r2 + o2,
            a2
        ].join(",") + "z") : "line" === R ? n2 = "M" + M.x1 + "," + M.y1 + " L" + M.x2 + "," + M.y2 : "polyline" !== R && "polygon" !== R || (n2 = "M" + (r2 = (u = (t2.getAttribute("points") + "").match(T1) || []).shift()) + "," + (a2 = u.shift()) + " L" + u.join(","), "polygon" === R && (n2 += "," + r2 + "," + a2 + "z")), s.setAttribute("d", rawPathToString(s._gsRawPath = stringToRawPath(n2))), e2 && t2.parentNode && (t2.parentNode.insertBefore(s, t2), t2.parentNode.removeChild(t2)), s) : t2;
    }
    function getRotationAtBezierT(t, e, n) {
        var r, a = t[e], o = t[e + 2], i = t[e + 4];
        return a += (o - a) * n, a += ((o += (i - o) * n) - a) * n, r = o + (i + (t[e + 6] - i) * n - o) * n - a, a = t[e + 1], a += ((o = t[e + 3]) - a) * n, a += ((o += ((i = t[e + 5]) - o) * n) - a) * n, B1(S1(o + (i + (t[e + 7] - i) * n - o) * n - a, r) * s1);
    }
    function sliceRawPath(t3, e3, n3) {
        n3 = (function _isUndefined(t) {
            return void 0 === t;
        })(n3) ? 1 : x1(n3) || 0, e3 = x1(e3) || 0;
        var r = Math.max(0, ~~(H(n3 - e3) - 0.00000001)), a = function copyRawPath(t) {
            for(var e = [], n = 0; n < t.length; n++)e[n] = O1(t[n], t[n].slice(0));
            return O1(t, e);
        }(t3);
        if (n3 < e3 && (e3 = 1 - e3, n3 = 1 - n3, (function _reverseRawPath(t, e) {
            var n = t.length;
            for(e || t.reverse(); n--;)t[n].reversed || reverseSegment(t[n]);
        })(a), a.totalLength = 0), e3 < 0 || n3 < 0) {
            var o = Math.abs(~~Math.min(e3, n3)) + 1;
            e3 += o, n3 += o;
        }
        a.totalLength || cacheRawPathMeasurements(a);
        var i, s, l, h, u, g, f, c, p = 1 < n3, d = getProgressData(a, e3, N1, !0), m = getProgressData(a, n3, _1), v = m.segment, P = d.segment, w = m.segIndex, b = d.segIndex, M = m.i, R = d.i, L = b === w, T = M === R && L;
        if (p || r) {
            for(i = w < b || L && M < R || T && m.t < d.t, y1(a, b, R, d.t) && (b++, i || (w++, T ? (m.t = (m.t - d.t) / (1 - d.t), M = 0) : L && (M -= R))), Math.abs(1 - (n3 - e3)) < 0.00001 ? w = b - 1 : !m.t && w ? w-- : y1(a, w, M, m.t) && i && b++, 1 === d.t && (b = (b + 1) % a.length), u = [], f = 1 + (g = a.length) * r, f += (g - (c = b) + w) % g, h = 0; h < f; h++)C1(u, a[(c++) % g]);
            a = u;
        } else if (l = 1 === m.t ? 6 : subdivideSegment(v, M, m.t), e3 !== n3) for(s = subdivideSegment(P, R, T ? d.t / m.t : d.t), L && (l += s), v.splice(M + l + 2), (s || R) && P.splice(0, R + s), h = a.length; h--;)(h < b || w < h) && a.splice(h, 1);
        else v.angle = getRotationAtBezierT(v, M + l, 0), d = v[M += l], m = v[M + 1], v.length = v.totalLength = 0, v.totalPoints = a.totalPoints = 8, v.push(d, m, d, m, d, m, d, m);
        return a.totalLength = 0, a;
    }
    function measureSegment(t, e, n) {
        e = e || 0, t.samples || (t.samples = [], t.lookup = []);
        var r, a, o, i, s, l, h, u, g, f, c, p, d, m, v, x, y, P = ~~t.resolution || 12, w = 1 / P, b = n ? e + 6 * n + 1 : t.length, M = t[e], R = t[e + 1], L = e ? e / 6 * P : 0, T = t.samples, S = t.lookup, N = (e ? t.minLength : A1) || A1, _ = T[L + n * P - 1], C = e ? T[L - 1] : 0;
        for(T.length = S.length = 0, a = e + 2; a < b; a += 6){
            if (o = t[a + 4] - M, i = t[a + 2] - M, s = t[a] - M, u = t[a + 5] - R, g = t[a + 3] - R, f = t[a + 1] - R, l = h = c = p = 0, H(o) < 0.01 && H(u) < 0.01 && H(s) + H(f) < 0.01) 8 < t.length && (t.splice(a, 6), a -= 6, b -= 6);
            else for(r = 1; r <= P; r++)l = h - (h = ((m = w * r) * m * o + 3 * (d = 1 - m) * (m * i + d * s)) * m), c = p - (p = (m * m * u + 3 * d * (m * g + d * f)) * m), (x = $(c * c + l * l)) < N && (N = x), C += x, T[L++] = C;
            M += o, R += u;
        }
        if (_) for(_ -= C; L < T.length; L++)T[L] += _;
        if (T.length && N) {
            if (t.totalLength = y = T[T.length - 1] || 0, y / (t.minLength = N) < 9999) for(x = v = 0, r = 0; r < y; r += N)S[x++] = T[v] < r ? ++v : v;
        } else t.totalLength = T[0] = 0;
        return e ? C - T[e / 2 - 1] : C;
    }
    function cacheRawPathMeasurements(t, e) {
        var n, r, a;
        for(a = n = r = 0; a < t.length; a++)t[a].resolution = ~~e || 12, r += t[a].length, n += measureSegment(t[a]);
        return t.totalPoints = r, t.totalLength = n, t;
    }
    function subdivideSegment(t, e, n) {
        if (n <= 0 || 1 <= n) return 0;
        var r = t[e], a = t[e + 1], o = t[e + 2], i = t[e + 3], s = t[e + 4], l = t[e + 5], h = r + (o - r) * n, u = o + (s - o) * n, g = a + (i - a) * n, f = i + (l - i) * n, c = h + (u - h) * n, p = g + (f - g) * n, d = s + (t[e + 6] - s) * n, m = l + (t[e + 7] - l) * n;
        return u += (d - u) * n, f += (m - f) * n, t.splice(e + 2, 4, B1(h), B1(g), B1(c), B1(p), B1(c + (u - c) * n), B1(p + (f - p) * n), B1(u), B1(f), B1(d), B1(m)), t.samples && t.samples.splice(e / 6 * t.resolution | 0, 0, 0, 0, 0, 0, 0, 0), 6;
    }
    function getProgressData(t, e, n, r) {
        n = n || {
        }, t.totalLength || cacheRawPathMeasurements(t), (e < 0 || 1 < e) && (e = d1(e));
        var a, o, i, s, l, h, u, g = 0, f = t[0];
        if (e) {
            if (1 === e) u = 1, h = (f = t[g = t.length - 1]).length - 8;
            else {
                if (1 < t.length) {
                    for(i = t.totalLength * e, l = h = 0; (l += t[h++].totalLength) < i;)g = h;
                    e = (i - (s = l - (f = t[g]).totalLength)) / (l - s) || 0;
                }
                a = f.samples, o = f.resolution, i = f.totalLength * e, s = (h = f.lookup.length ? f.lookup[~~(i / f.minLength)] || 0 : m1(a, i, e)) ? a[h - 1] : 0, (l = a[h]) < i && (s = l, l = a[++h]), u = 1 / o * ((i - s) / (l - s) + h % o), h = 6 * ~~(h / o), r && 1 === u && (h + 6 < f.length ? (h += 6, u = 0) : g + 1 < t.length && (h = u = 0, f = t[++g]));
            }
        } else u = h = g = 0, f = t[0];
        return n.t = u, n.i = h, n.path = t, n.segment = f, n.segIndex = g, n;
    }
    function getPositionOnPath(t, e, n, r) {
        var a, o, i, s, l, h, u, g, f, c = t[0], p = r || {
        };
        if ((e < 0 || 1 < e) && (e = d1(e)), 1 < t.length) {
            for(i = t.totalLength * e, l = h = 0; (l += t[h++].totalLength) < i;)c = t[h];
            e = (i - (s = l - c.totalLength)) / (l - s) || 0;
        }
        return a = c.samples, o = c.resolution, i = c.totalLength * e, s = (h = c.lookup.length ? c.lookup[e < 1 ? ~~(i / c.minLength) : c.lookup.length - 1] || 0 : m1(a, i, e)) ? a[h - 1] : 0, (l = a[h]) < i && (s = l, l = a[++h]), f = 1 - (u = 1 / o * ((i - s) / (l - s) + h % o) || 0), g = c[h = 6 * ~~(h / o)], p.x = B1((u * u * (c[h + 6] - g) + 3 * f * (u * (c[h + 4] - g) + f * (c[h + 2] - g))) * u + g), p.y = B1((u * u * (c[h + 7] - (g = c[h + 1])) + 3 * f * (u * (c[h + 5] - g) + f * (c[h + 3] - g))) * u + g), n && (p.angle = c.totalLength ? getRotationAtBezierT(c, h, 1 <= u ? 1 - 0.000000001 : u || 0.000000001) : c.angle || 0), p;
    }
    function transformRawPath(t, e, n, r, a, o, i) {
        for(var s, l, h, u, g, f = t.length; -1 < --f;)for(l = (s = t[f]).length, h = 0; h < l; h += 2)u = s[h], g = s[h + 1], s[h] = u * e + g * r + o, s[h + 1] = u * n + g * a + i;
        return t._dirty = 1, t;
    }
    function arcToSegment(t, e, n, r, a, o, i, s, l) {
        if (t !== s || e !== l) {
            n = H(n), r = H(r);
            var h = a % 360 * q, u = U(h), g = F(h), f = Math.PI, c = 2 * f, p = (t - s) / 2, d = (e - l) / 2, m = u * p + g * d, v = -g * p + u * d, x = m * m, y = v * v, P = x / (n * n) + y / (r * r);
            1 < P && (n = $(P) * n, r = $(P) * r);
            var w = n * n, b = r * r, M = (w * b - w * y - b * x) / (w * y + b * x);
            M < 0 && (M = 0);
            var R = (o === i ? -1 : 1) * $(M), L = n * v / r * R, T = -r * m / n * R, S = u * L - g * T + (t + s) / 2, N = g * L + u * T + (e + l) / 2, _ = (m - L) / n, C = (v - T) / r, A = (-m - L) / n, B = (-v - T) / r, O = _ * _ + C * C, I = (C < 0 ? -1 : 1) * Math.acos(_ / $(O)), E = (_ * B - C * A < 0 ? -1 : 1) * Math.acos((_ * A + C * B) / $(O * (A * A + B * B)));
            isNaN(E) && (E = f), !i && 0 < E ? E -= c : i && E < 0 && (E += c), I %= c, E %= c;
            var G, D = Math.ceil(H(E) / (c / 4)), X = [], z = E / D, k = 4 / 3 * F(z / 2) / (1 + U(z / 2)), Z = u * n, V = g * n, Y = g * -r, j = u * r;
            for(G = 0; G < D; G++)m = U(a = I + G * z), v = F(a), _ = U(a += z), C = F(a), X.push(m - k * v, v + k * m, _ + k * C, C - k * _, _, C);
            for(G = 0; G < X.length; G += 2)m = X[G], v = X[G + 1], X[G] = m * Z + v * Y + S, X[G + 1] = m * V + v * j + N;
            return X[G - 2] = s, X[G - 1] = l, X;
        }
    }
    function stringToRawPath(t4) {
        function Af(t, e, n, r) {
            u = (n - t) / 3, g = (r - e) / 3, s.push(t + u, e + g, n - u, r - g, n, r);
        }
        var e4, n4, r3, a, o, i, s, l, h, u, g, f, c, p, d, m = (t4 + "").replace(L1, function(t) {
            var e = +t;
            return e < 0.0001 && -0.0001 < e ? 0 : e;
        }).match(M1) || [], v = [], x = 0, y = 0, P = m.length, w = 0, b = "ERROR: malformed path: " + t4;
        if (!t4 || !isNaN(m[0]) || isNaN(m[1])) return console.log(b), v;
        for(e4 = 0; e4 < P; e4++)if (c = o, isNaN(m[e4]) ? i = (o = m[e4].toUpperCase()) !== m[e4] : e4--, r3 = +m[e4 + 1], a = +m[e4 + 2], i && (r3 += x, a += y), e4 || (l = r3, h = a), "M" === o) s && (s.length < 8 ? --v.length : w += s.length), x = l = r3, y = h = a, s = [
            r3,
            a
        ], v.push(s), e4 += 2, o = "L";
        else if ("C" === o) i || (x = y = 0), (s = s || [
            0,
            0
        ]).push(r3, a, x + 1 * m[e4 + 3], y + 1 * m[e4 + 4], x += 1 * m[e4 + 5], y += 1 * m[e4 + 6]), e4 += 6;
        else if ("S" === o) u = x, g = y, "C" !== c && "S" !== c || (u += x - s[s.length - 4], g += y - s[s.length - 3]), i || (x = y = 0), s.push(u, g, r3, a, x += 1 * m[e4 + 3], y += 1 * m[e4 + 4]), e4 += 4;
        else if ("Q" === o) u = x + 2 / 3 * (r3 - x), g = y + 2 / 3 * (a - y), i || (x = y = 0), x += 1 * m[e4 + 3], y += 1 * m[e4 + 4], s.push(u, g, x + 2 / 3 * (r3 - x), y + 2 / 3 * (a - y), x, y), e4 += 4;
        else if ("T" === o) u = x - s[s.length - 4], g = y - s[s.length - 3], s.push(x + u, y + g, r3 + 2 / 3 * (x + 1.5 * u - r3), a + 2 / 3 * (y + 1.5 * g - a), x = r3, y = a), e4 += 2;
        else if ("H" === o) Af(x, y, x = r3, y), e4 += 1;
        else if ("V" === o) Af(x, y, x, y = r3 + (i ? y - x : 0)), e4 += 1;
        else if ("L" === o || "Z" === o) "Z" === o && (r3 = l, a = h, s.closed = !0), ("L" === o || 0.5 < H(x - r3) || 0.5 < H(y - a)) && (Af(x, y, r3, a), "L" === o && (e4 += 2)), x = r3, y = a;
        else if ("A" === o) {
            if (p = m[e4 + 4], d = m[e4 + 5], u = m[e4 + 6], g = m[e4 + 7], n4 = 7, 1 < p.length && (p.length < 3 ? (g = u, u = d, n4--) : (g = d, u = p.substr(2), n4 -= 2), d = p.charAt(1), p = p.charAt(0)), f = arcToSegment(x, y, +m[e4 + 1], +m[e4 + 2], +m[e4 + 3], +p, +d, (i ? x : 0) + 1 * u, (i ? y : 0) + 1 * g), e4 += n4, f) for(n4 = 0; n4 < f.length; n4++)s.push(f[n4]);
            x = s[s.length - 2], y = s[s.length - 1];
        } else console.log(b);
        return (e4 = s.length) < 6 ? (v.pop(), e4 = 0) : s[0] === s[e4 - 2] && s[1] === s[e4 - 1] && (s.closed = !0), v.totalPoints = w + e4, v;
    }
    function flatPointsToSegment(t, e) {
        void 0 === e && (e = 1);
        for(var n = t[0], r = 0, a = [
            n,
            r
        ], o = 2; o < t.length; o += 2)a.push(n, r, t[o], r = (t[o] - n) * e / 2, n = t[o], -r);
        return a;
    }
    function pointsToSegment(t, e, n) {
        H(t[0] - t[2]) < 0.0001 && H(t[1] - t[3]) < 0.0001 && (t = t.slice(2));
        var r, a, o, i, s, l, h, u, g, f, c, p, d, m, v = t.length - 2, x = +t[0], y = +t[1], P = +t[2], w = +t[3], b = [
            x,
            y,
            x,
            y
        ], M = P - x, R = w - y, L = Math.abs(t[v] - x) < 0.001 && Math.abs(t[v + 1] - y) < 0.001;
        for(isNaN(n) && (n = Math.PI / 10), L && (t.push(P, w), P = x, w = y, x = t[v - 2], y = t[v - 1], t.unshift(x, y), v += 4), e = e || 0 === e ? +e : 1, s = 2; s < v; s += 2)r = x, a = y, x = P, y = w, P = +t[s + 2], w = +t[s + 3], x === P && y === w || (p = (l = M) * l + (u = R) * u, d = (M = P - x) * M + (R = w - y) * R, m = (h = P - r) * h + (g = w - a) * g, c = (o = Math.acos((p + d - m) / $(4 * p * d))) / Math.PI * e, f = $(p) * c, c *= $(d), x === r && y === a || (n < o ? (i = S1(g, h), b.push(B1(x - U(i) * f), B1(y - F(i) * f), B1(x), B1(y), B1(x + U(i) * c), B1(y + F(i) * c))) : (i = S1(u, l), b.push(B1(x - U(i) * f), B1(y - F(i) * f)), i = S1(R, M), b.push(B1(x), B1(y), B1(x + U(i) * c), B1(y + F(i) * c)))));
        return x !== P || y !== w || b.length < 4 ? b.push(B1(P), B1(w), B1(P), B1(w)) : b.length -= 2, L && (b.splice(0, 6), b.length = b.length - 6), b;
    }
    function rawPathToString(t) {
        l1(t[0]) && (t = [
            t
        ]);
        var e, n, r, a, o = "", i = t.length;
        for(n = 0; n < i; n++){
            for(a = t[n], o += "M" + B1(a[0]) + "," + B1(a[1]) + " C", e = a.length, r = 2; r < e; r++)o += B1(a[r++]) + "," + B1(a[r++]) + " " + B1(a[r++]) + "," + B1(a[r++]) + " " + B1(a[r++]) + "," + B1(a[r]) + " ";
            a.closed && (o += "z");
        }
        return o;
    }
    function R1(t) {
        var e = t.ownerDocument || t;
        !(z1 in t.style) && "msTransform" in t.style && (k1 = (z1 = "msTransform") + "Origin");
        for(; e.parentNode && (e = e.parentNode););
        if (v1 = window, E1 = new j1, e) {
            P1 = (c1 = e).documentElement, w1 = e.body, (G1 = c1.createElementNS("http://www.w3.org/2000/svg", "g")).style.transform = "none";
            var n = e.createElement("div"), r = e.createElement("div");
            w1.appendChild(n), n.appendChild(r), n.style.position = "static", n.style[z1] = "translate3d(0,0,1px)", D1 = r.offsetParent !== n, w1.removeChild(n);
        }
        return e;
    }
    function X1(t) {
        return t.ownerSVGElement || ("svg" === (t.tagName + "").toLowerCase() ? t : null);
    }
    function Z1(t, e) {
        if (t.parentNode && (c1 || R1(t))) {
            var n = X1(t), r = n ? n.getAttribute("xmlns") || "http://www.w3.org/2000/svg" : "http://www.w3.org/1999/xhtml", a = n ? e ? "rect" : "g" : "div", o = 2 !== e ? 0 : 100, i = 3 === e ? 100 : 0, s = "position:absolute;display:block;pointer-events:none;margin:0;padding:0;", l = c1.createElementNS ? c1.createElementNS(r.replace(/^https/, "http"), a) : c1.createElement(a);
            return e && (n ? (b1 = b1 || Z1(t), l.setAttribute("width", 0.01), l.setAttribute("height", 0.01), l.setAttribute("transform", "translate(" + o + "," + i + ")"), b1.appendChild(l)) : (f1 || ((f1 = Z1(t)).style.cssText = s), l.style.cssText = s + "width:0.1px;height:0.1px;top:" + i + "px;left:" + o + "px", f1.appendChild(l))), l;
        }
        throw "Need document and parent.";
    }
    function aa(t5, e5) {
        var n5, r, a, o, i, s, l = X1(t5), h = t5 === l, u = l ? V1 : Y1, g = t5.parentNode;
        if (t5 === v1) return t5;
        if (u.length || u.push(Z1(t5, 1), Z1(t5, 2), Z1(t5, 3)), n5 = l ? b1 : f1, l) h ? (o = -(a = function _getCTM(t) {
            var e, n = t.getCTM();
            return n || (e = t.style[z1], t.style[z1] = "none", t.appendChild(G1), n = G1.getCTM(), t.removeChild(G1), e ? t.style[z1] = e : t.style.removeProperty(z1.replace(/([A-Z])/g, "-$1").toLowerCase())), n || E1.clone();
        }(t5)).e / a.a, i = -a.f / a.d, r = E1) : (a = t5.getBBox(), o = (r = (r = t5.transform ? t5.transform.baseVal : {
        }).numberOfItems ? 1 < r.numberOfItems ? (function _consolidate(t) {
            for(var e = new j1, n = 0; n < t.numberOfItems; n++)e.multiply(t.getItem(n).matrix);
            return e;
        })(r) : r.getItem(0).matrix : E1).a * a.x + r.c * a.y, i = r.b * a.x + r.d * a.y), e5 && "g" === t5.tagName.toLowerCase() && (o = i = 0), (h ? l : g).appendChild(n5), n5.setAttribute("transform", "matrix(" + r.a + "," + r.b + "," + r.c + "," + r.d + "," + (r.e + o) + "," + (r.f + i) + ")");
        else {
            if (o = i = 0, D1) for(r = t5.offsetParent, a = t5; (a = a && a.parentNode) && a !== r && a.parentNode;)4 < (v1.getComputedStyle(a)[z1] + "").length && (o = a.offsetLeft, i = a.offsetTop, a = 0);
            if ("absolute" !== (s = v1.getComputedStyle(t5)).position && "fixed" !== s.position) for(r = t5.offsetParent; g && g !== r;)o += g.scrollLeft || 0, i += g.scrollTop || 0, g = g.parentNode;
            (a = n5.style).top = t5.offsetTop - i + "px", a.left = t5.offsetLeft - o + "px", a[z1] = s[z1], a[k1] = s[k1], a.position = "fixed" === s.position ? "fixed" : "absolute", t5.parentNode.appendChild(n5);
        }
        return n5;
    }
    function ba(t, e, n, r, a, o, i) {
        return t.a = e, t.b = n, t.c = r, t.d = a, t.e = o, t.f = i, t;
    }
    var c1, v1, P1, w1, f1, b1, E1, G1, D1, n1, z1 = "transform", k1 = z1 + "Origin", V1 = [], Y1 = [], j1 = ((n1 = Matrix2D.prototype).inverse = function inverse() {
        var t = this.a, e = this.b, n = this.c, r = this.d, a = this.e, o = this.f, i = t * r - e * n || 0.0000000001;
        return ba(this, r / i, -e / i, -n / i, t / i, (n * o - r * a) / i, -(t * o - e * a) / i);
    }, n1.multiply = function multiply(t) {
        var e = this.a, n = this.b, r = this.c, a = this.d, o = this.e, i = this.f, s = t.a, l = t.c, h = t.b, u = t.d, g = t.e, f = t.f;
        return ba(this, s * e + h * r, s * n + h * a, l * e + u * r, l * n + u * a, o + g * e + f * r, i + g * n + f * a);
    }, n1.clone = function clone() {
        return new Matrix2D(this.a, this.b, this.c, this.d, this.e, this.f);
    }, n1.equals = function equals(t) {
        var e = this.a, n = this.b, r = this.c, a = this.d, o = this.e, i = this.f;
        return e === t.a && n === t.b && r === t.c && a === t.d && o === t.e && i === t.f;
    }, n1.apply = function apply(t, e) {
        void 0 === e && (e = {
        });
        var n = t.x, r = t.y, a = this.a, o = this.b, i = this.c, s = this.d, l = this.e, h = this.f;
        return e.x = n * a + r * i + l || 0, e.y = n * o + r * s + h || 0, e;
    }, Matrix2D);
    function Matrix2D(t, e, n, r, a, o) {
        void 0 === t && (t = 1), void 0 === e && (e = 0), void 0 === n && (n = 0), void 0 === r && (r = 1), void 0 === a && (a = 0), void 0 === o && (o = 0), ba(this, t, e, n, r, a, o);
    }
    function getGlobalMatrix(t6, e6, n6, r) {
        if (!t6 || !t6.parentNode || (c1 || R1(t6)).documentElement === t6) return new j1;
        var a = function _forceNonZeroScale(t) {
            for(var e, n; t && t !== w1;)(n = t._gsap) && n.uncache && n.get(t, "x"), n && !n.scaleX && !n.scaleY && n.renderTransform && (n.scaleX = n.scaleY = 0.0001, n.renderTransform(1, n), e ? e.push(n) : e = [
                n
            ]), t = t.parentNode;
            return e;
        }(t6), o = X1(t6) ? V1 : Y1, i = aa(t6, n6), s = o[0].getBoundingClientRect(), l = o[1].getBoundingClientRect(), h = o[2].getBoundingClientRect(), u = i.parentNode, g = !r && function _isFixed(t) {
            return "fixed" === v1.getComputedStyle(t).position || ((t = t.parentNode) && 1 === t.nodeType ? _isFixed(t) : void 0);
        }(t6), f = new j1((l.left - s.left) / 100, (l.top - s.top) / 100, (h.left - s.left) / 100, (h.top - s.top) / 100, s.left + (g ? 0 : function _getDocScrollLeft() {
            return v1.pageXOffset || c1.scrollLeft || P1.scrollLeft || w1.scrollLeft || 0;
        }()), s.top + (g ? 0 : function _getDocScrollTop() {
            return v1.pageYOffset || c1.scrollTop || P1.scrollTop || w1.scrollTop || 0;
        }()));
        if (u.removeChild(i), a) for(s = a.length; s--;)(l = a[s]).scaleX = l.scaleY = 0, l.renderTransform(1, l);
        return e6 ? f.inverse() : f;
    }
    function la(t, e, n, r) {
        for(var a = e.length, o = 2 === r ? 0 : r, i = 0; i < a; i++)t[o] = parseFloat(e[i][n]), 2 === r && (t[o + 1] = 0), o += 2;
        return t;
    }
    function ma(t, e, n) {
        return parseFloat(t._gsap.get(t, e, n || "px")) || 0;
    }
    function na(t) {
        var e, n = t[0], r = t[1];
        for(e = 2; e < t.length; e += 2)n = t[e] += n, r = t[e + 1] += r;
    }
    function oa(t, e, n, r, a, o, i, s, l) {
        return e = "cubic" === i.type ? [
            e
        ] : (!1 !== i.fromCurrent && e.unshift(ma(n, r, s), a ? ma(n, a, l) : 0), i.relative && na(e), [
            (a ? pointsToSegment : flatPointsToSegment)(e, i.curviness)
        ]), e = o(nt(e, n, i)), rt(t, n, r, e, "x", s), a && rt(t, n, a, e, "y", l), cacheRawPathMeasurements(e, i.resolution || (0 === i.curviness ? 20 : 12));
    }
    function pa(t) {
        return t;
    }
    function ra(t, e, n) {
        var r, a = getGlobalMatrix(t), o = 0, i = 0;
        return "svg" === (t.tagName + "").toLowerCase() ? (r = t.viewBox.baseVal).width || (r = {
            width: +t.getAttribute("width"),
            height: +t.getAttribute("height")
        }) : r = e && t.getBBox && t.getBBox(), e && "auto" !== e && (o = e.push ? e[0] * (r ? r.width : t.offsetWidth || 0) : e.x, i = e.push ? e[1] * (r ? r.height : t.offsetHeight || 0) : e.y), n.apply(o || i ? a.apply({
            x: o,
            y: i
        }) : {
            x: a.e,
            y: a.f
        });
    }
    function sa(t, e, n, r) {
        var a, o = getGlobalMatrix(t.parentNode, !0, !0), i = o.clone().multiply(getGlobalMatrix(e)), s = ra(t, n, o), l = ra(e, r, o), h = l.x, u = l.y;
        return i.e = i.f = 0, "auto" === r && e.getTotalLength && "path" === e.tagName.toLowerCase() && (a = e.getAttribute("d").match(et) || [], h += (a = i.apply({
            x: +a[0],
            y: +a[1]
        })).x, u += a.y), (a || e.getBBox && t.getBBox && e.ownerSVGElement === t.ownerSVGElement) && (h -= (a = i.apply(e.getBBox())).x, u -= a.y), i.e = h - s.x, i.f = u - s.y, i;
    }
    var Q, g1, W, J, K = "x,translateX,left,marginLeft,xPercent".split(","), tt = "y,translateY,top,marginTop,yPercent".split(","), o1 = Math.PI / 180, et = /[-+\.]*\d+\.?(?:e-|e\+)?\d*/g, nt = function _align(t, e, n) {
        var r, a, o, i = n.align, s = n.matrix, l = n.offsetX, h = n.offsetY, u = n.alignOrigin, g = t[0][0], f = t[0][1], c = ma(e, "x"), p = ma(e, "y");
        return t && t.length ? (i && ("self" === i || (r = J(i)[0] || e) === e ? transformRawPath(t, 1, 0, 0, 1, c - g, p - f) : (u && !1 !== u[2] ? Q.set(e, {
            transformOrigin: 100 * u[0] + "% " + 100 * u[1] + "%"
        }) : u = [
            ma(e, "xPercent") / -100,
            ma(e, "yPercent") / -100
        ], o = (a = sa(e, r, u, "auto")).apply({
            x: g,
            y: f
        }), transformRawPath(t, a.a, a.b, a.c, a.d, c + a.e - (o.x - a.e), p + a.f - (o.y - a.f)))), s ? transformRawPath(t, s.a, s.b, s.c, s.d, s.e, s.f) : (l || h) && transformRawPath(t, 1, 0, 0, 1, l || 0, h || 0), t) : getRawPath("M0,0L0,0");
    }, rt = function _addDimensionalPropTween(t, e, n, r, a, o) {
        var i = e._gsap, s = i.harness, l = s && s.aliases && s.aliases[n], h = l && l.indexOf(",") < 0 ? l : n, u = t._pt = new g1(t._pt, e, h, 0, 0, pa, 0, i.set(e, h, t));
        u.u = W(i.get(e, h, o)) || 0, u.path = r, u.pp = a, t._props.push(h);
    }, a1 = {
        version: "3.9.0",
        name: "motionPath",
        register: function register(t, e, n) {
            W = (Q = t).utils.getUnit, J = Q.utils.toArray, g1 = n;
        },
        init: function init(t7, e7) {
            if (!Q) return console.warn("Please gsap.registerPlugin(MotionPathPlugin)"), !1;
            "object" == typeof e7 && !e7.style && e7.path || (e7 = {
                path: e7
            });
            var n7, r, a = [], o = e7.path, i = e7.autoRotate, s = e7.unitX, l = e7.unitY, h = e7.x, u = e7.y, g = o[0], f = function _sliceModifier(e, n) {
                return function(t) {
                    return e || 1 !== n ? sliceRawPath(t, e, n) : t;
                };
            }(e7.start, "end" in e7 ? e7.end : 1);
            if (this.rawPaths = a, this.target = t7, (this.rotate = i || 0 === i) && (this.rOffset = parseFloat(i) || 0, this.radians = !!e7.useRadians, this.rProp = e7.rotation || "rotation", this.rSet = t7._gsap.set(t7, this.rProp, this), this.ru = W(t7._gsap.get(t7, this.rProp)) || 0), !Array.isArray(o) || "closed" in o || "number" == typeof g) cacheRawPathMeasurements(n7 = f(nt(getRawPath(e7.path), t7, e7)), e7.resolution), a.push(n7), rt(this, t7, e7.x || "x", n7, "x", e7.unitX || "px"), rt(this, t7, e7.y || "y", n7, "y", e7.unitY || "px");
            else {
                for(r in g)!h && ~K.indexOf(r) ? h = r : !u && ~tt.indexOf(r) && (u = r);
                for(r in h && u ? a.push(oa(this, la(la([], o, h, 0), o, u, 1), t7, h, u, f, e7, s || W(o[0][h]), l || W(o[0][u]))) : h = u = 0, g)r !== h && r !== u && a.push(oa(this, la([], o, r, 2), t7, r, 0, f, e7, W(o[0][r])));
            }
        },
        render: function render(t, e) {
            var n = e.rawPaths, r = n.length, a = e._pt;
            for(1 < t ? t = 1 : t < 0 && (t = 0); r--;)getPositionOnPath(n[r], t, !r && e.rotate, n[r]);
            for(; a;)a.set(a.t, a.p, a.path[a.pp] + a.u, a.d, t), a = a._next;
            e.rotate && e.rSet(e.target, e.rProp, n[0].angle * (e.radians ? o1 : 1) + e.rOffset + e.ru, e, t);
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
        convertToPath: function convertToPath$1(t8, e) {
            return J(t8).map(function(t) {
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
            var n = la(la([], t, (e = e || {
            }).x || "x", 0), t, e.y || "y", 1);
            return e.relative && na(n), [
                "cubic" === e.type ? n : pointsToSegment(n, e.curviness)
            ];
        }
    };
    !function _getGSAP() {
        return Q || "undefined" != typeof window && (Q = window.gsap) && Q.registerPlugin && Q;
    }() || Q.registerPlugin(a1), t1.MotionPathPlugin = a1, t1.default = a1;
    if (typeof window === "undefined" || window !== t1) Object.defineProperty(t1, "__esModule", {
        value: !0
    });
    else delete t1.default;
});

//# sourceMappingURL=index.d4f6ea71.js.map
