! function e(t, n, r) {
    function o(a, u) {
        if (!n[a]) {
            if (!t[a]) {
                var s = "function" == typeof require && require;
                if (!u && s) return s(a, !0);
                if (i) return i(a, !0);
                throw new Error("Cannot find module '" + a + "'")
            }
            var f = n[a] = {
                exports: {}
            };
            t[a][0].call(f.exports, function(e) {
                var n = t[a][1][e];
                return o(n ? n : e)
            }, f, f.exports, e, t, n, r)
        }
        return n[a].exports
    }
    for (var i = "function" == typeof require && require, a = 0; a < r.length; a++) o(r[a]);
    return o
}({
    1: [function(e, t, n) {
        (function() {
            var e = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
            ! function(t) {
                "use strict";

                function n(e) {
                    var t = e.charCodeAt(0);
                    return t === a || t === c ? 62 : t === u || t === d ? 63 : s > t ? -1 : s + 10 > t ? t - s + 26 + 26 : l + 26 > t ? t - l : f + 26 > t ? t - f + 26 : void 0
                }

                function r(e) {
                    function t(e) {
                        f[c++] = e
                    }
                    var r, o, a, u, s, f;
                    if (e.length % 4 > 0) throw new Error("Invalid string. Length must be a multiple of 4");
                    var l = e.length;
                    s = "=" === e.charAt(l - 2) ? 2 : "=" === e.charAt(l - 1) ? 1 : 0, f = new i(3 * e.length / 4 - s), a = s > 0 ? e.length - 4 : e.length;
                    var c = 0;
                    for (r = 0, o = 0; a > r; r += 4, o += 3) u = n(e.charAt(r)) << 18 | n(e.charAt(r + 1)) << 12 | n(e.charAt(r + 2)) << 6 | n(e.charAt(r + 3)), t((16711680 & u) >> 16), t((65280 & u) >> 8), t(255 & u);
                    return 2 === s ? (u = n(e.charAt(r)) << 2 | n(e.charAt(r + 1)) >> 4, t(255 & u)) : 1 === s && (u = n(e.charAt(r)) << 10 | n(e.charAt(r + 1)) << 4 | n(e.charAt(r + 2)) >> 2, t(u >> 8 & 255), t(255 & u)), f
                }

                function o(t) {
                    function n(t) {
                        return e.charAt(t)
                    }

                    function r(e) {
                        return n(e >> 18 & 63) + n(e >> 12 & 63) + n(e >> 6 & 63) + n(63 & e)
                    }
                    var o, i, a, u = t.length % 3,
                        s = "";
                    for (o = 0, a = t.length - u; a > o; o += 3) i = (t[o] << 16) + (t[o + 1] << 8) + t[o + 2], s += r(i);
                    switch (u) {
                        case 1:
                            i = t[t.length - 1], s += n(i >> 2), s += n(i << 4 & 63), s += "==";
                            break;
                        case 2:
                            i = (t[t.length - 2] << 8) + t[t.length - 1], s += n(i >> 10), s += n(i >> 4 & 63), s += n(i << 2 & 63), s += "="
                    }
                    return s
                }
                var i = "undefined" != typeof Uint8Array ? Uint8Array : Array,
                    a = "+".charCodeAt(0),
                    u = "/".charCodeAt(0),
                    s = "0".charCodeAt(0),
                    f = "a".charCodeAt(0),
                    l = "A".charCodeAt(0),
                    c = "-".charCodeAt(0),
                    d = "_".charCodeAt(0);
                t.toByteArray = r, t.fromByteArray = o
            }("undefined" == typeof n ? this.base64js = {} : n)
        }).call(this, e("b55mWE"), "undefined" != typeof self ? self : "undefined" != typeof window ? window : {}, e("buffer").Buffer, arguments[3], arguments[4], arguments[5], arguments[6], "/../../node_modules/base64-js/lib/b64.js", "/../../node_modules/base64-js/lib")
    }, {
        b55mWE: 3,
        buffer: 2
    }],
    2: [function(e, t, n) {
        (function(t, r, o) {
            function o(e, t, n) {
                if (!(this instanceof o)) return new o(e, t, n);
                var r = typeof e;
                if ("base64" === t && "string" === r)
                    for (e = S(e); e.length % 4 !== 0;) e += "=";
                var i;
                if ("number" === r) i = M(e);
                else if ("string" === r) i = o.byteLength(e, t);
                else {
                    if ("object" !== r) throw new Error("First argument needs to be a number, array or string.");
                    i = M(e.length)
                }
                var a;
                o._useTypedArrays ? a = o._augment(new Uint8Array(i)) : (a = this, a.length = i, a._isBuffer = !0);
                var u;
                if (o._useTypedArrays && "number" == typeof e.byteLength) a._set(e);
                else if (N(e))
                    for (u = 0; i > u; u++) a[u] = o.isBuffer(e) ? e.readUInt8(u) : e[u];
                else if ("string" === r) a.write(e, 0, t);
                else if ("number" === r && !o._useTypedArrays && !n)
                    for (u = 0; i > u; u++) a[u] = 0;
                return a
            }

            function i(e, t, n, r) {
                n = Number(n) || 0;
                var i = e.length - n;
                r ? (r = Number(r), r > i && (r = i)) : r = i;
                var a = t.length;
                J(a % 2 === 0, "Invalid hex string"), r > a / 2 && (r = a / 2);
                for (var u = 0; r > u; u++) {
                    var s = parseInt(t.substr(2 * u, 2), 16);
                    J(!isNaN(s), "Invalid hex string"), e[n + u] = s
                }
                return o._charsWritten = 2 * u, u
            }

            function a(e, t, n, r) {
                var i = o._charsWritten = O(F(t), e, n, r);
                return i
            }

            function u(e, t, n, r) {
                var i = o._charsWritten = O(W(t), e, n, r);
                return i
            }

            function s(e, t, n, r) {
                return u(e, t, n, r)
            }

            function f(e, t, n, r) {
                var i = o._charsWritten = O(D(t), e, n, r);
                return i
            }

            function l(e, t, n, r) {
                var i = o._charsWritten = O(j(t), e, n, r);
                return i
            }

            function c(e, t, n) {
                return 0 === t && n === e.length ? Y.fromByteArray(e) : Y.fromByteArray(e.slice(t, n))
            }

            function d(e, t, n) {
                var r = "",
                    o = "";
                n = Math.min(e.length, n);
                for (var i = t; n > i; i++) e[i] <= 127 ? (r += R(o) + String.fromCharCode(e[i]), o = "") : o += "%" + e[i].toString(16);
                return r + R(o)
            }

            function g(e, t, n) {
                var r = "";
                n = Math.min(e.length, n);
                for (var o = t; n > o; o++) r += String.fromCharCode(e[o]);
                return r
            }

            function h(e, t, n) {
                return g(e, t, n)
            }

            function p(e, t, n) {
                var r = e.length;
                (!t || 0 > t) && (t = 0), (!n || 0 > n || n > r) && (n = r);
                for (var o = "", i = t; n > i; i++) o += k(e[i]);
                return o
            }

            function w(e, t, n) {
                for (var r = e.slice(t, n), o = "", i = 0; i < r.length; i += 2) o += String.fromCharCode(r[i] + 256 * r[i + 1]);
                return o
            }

            function y(e, t, n, r) {
                r || (J("boolean" == typeof n, "missing or invalid endian"), J(void 0 !== t && null !== t, "missing offset"), J(t + 1 < e.length, "Trying to read beyond buffer length"));
                var o = e.length;
                if (!(t >= o)) {
                    var i;
                    return n ? (i = e[t], o > t + 1 && (i |= e[t + 1] << 8)) : (i = e[t] << 8, o > t + 1 && (i |= e[t + 1])), i
                }
            }

            function m(e, t, n, r) {
                r || (J("boolean" == typeof n, "missing or invalid endian"), J(void 0 !== t && null !== t, "missing offset"), J(t + 3 < e.length, "Trying to read beyond buffer length"));
                var o = e.length;
                if (!(t >= o)) {
                    var i;
                    return n ? (o > t + 2 && (i = e[t + 2] << 16), o > t + 1 && (i |= e[t + 1] << 8), i |= e[t], o > t + 3 && (i += e[t + 3] << 24 >>> 0)) : (o > t + 1 && (i = e[t + 1] << 16), o > t + 2 && (i |= e[t + 2] << 8), o > t + 3 && (i |= e[t + 3]), i += e[t] << 24 >>> 0), i
                }
            }

            function v(e, t, n, r) {
                r || (J("boolean" == typeof n, "missing or invalid endian"), J(void 0 !== t && null !== t, "missing offset"), J(t + 1 < e.length, "Trying to read beyond buffer length"));
                var o = e.length;
                if (!(t >= o)) {
                    var i = y(e, t, n, !0),
                        a = 32768 & i;
                    return a ? -1 * (65535 - i + 1) : i
                }
            }

            function b(e, t, n, r) {
                r || (J("boolean" == typeof n, "missing or invalid endian"), J(void 0 !== t && null !== t, "missing offset"), J(t + 3 < e.length, "Trying to read beyond buffer length"));
                var o = e.length;
                if (!(t >= o)) {
                    var i = m(e, t, n, !0),
                        a = 2147483648 & i;
                    return a ? -1 * (4294967295 - i + 1) : i
                }
            }

            function E(e, t, n, r) {
                return r || (J("boolean" == typeof n, "missing or invalid endian"), J(t + 3 < e.length, "Trying to read beyond buffer length")), X.read(e, t, n, 23, 4)
            }

            function I(e, t, n, r) {
                return r || (J("boolean" == typeof n, "missing or invalid endian"), J(t + 7 < e.length, "Trying to read beyond buffer length")), X.read(e, t, n, 52, 8)
            }

            function B(e, t, n, r, o) {
                o || (J(void 0 !== t && null !== t, "missing value"), J("boolean" == typeof r, "missing or invalid endian"), J(void 0 !== n && null !== n, "missing offset"), J(n + 1 < e.length, "trying to write beyond buffer length"), P(t, 65535));
                var i = e.length;
                if (!(n >= i))
                    for (var a = 0, u = Math.min(i - n, 2); u > a; a++) e[n + a] = (t & 255 << 8 * (r ? a : 1 - a)) >>> 8 * (r ? a : 1 - a)
            }

            function L(e, t, n, r, o) {
                o || (J(void 0 !== t && null !== t, "missing value"), J("boolean" == typeof r, "missing or invalid endian"), J(void 0 !== n && null !== n, "missing offset"), J(n + 3 < e.length, "trying to write beyond buffer length"), P(t, 4294967295));
                var i = e.length;
                if (!(n >= i))
                    for (var a = 0, u = Math.min(i - n, 4); u > a; a++) e[n + a] = t >>> 8 * (r ? a : 3 - a) & 255
            }

            function A(e, t, n, r, o) {
                o || (J(void 0 !== t && null !== t, "missing value"), J("boolean" == typeof r, "missing or invalid endian"), J(void 0 !== n && null !== n, "missing offset"), J(n + 1 < e.length, "Trying to write beyond buffer length"), q(t, 32767, -32768));
                var i = e.length;
                n >= i || (t >= 0 ? B(e, t, n, r, o) : B(e, 65535 + t + 1, n, r, o))
            }

            function U(e, t, n, r, o) {
                o || (J(void 0 !== t && null !== t, "missing value"), J("boolean" == typeof r, "missing or invalid endian"), J(void 0 !== n && null !== n, "missing offset"), J(n + 3 < e.length, "Trying to write beyond buffer length"), q(t, 2147483647, -2147483648));
                var i = e.length;
                n >= i || (t >= 0 ? L(e, t, n, r, o) : L(e, 4294967295 + t + 1, n, r, o))
            }

            function C(e, t, n, r, o) {
                o || (J(void 0 !== t && null !== t, "missing value"), J("boolean" == typeof r, "missing or invalid endian"), J(void 0 !== n && null !== n, "missing offset"), J(n + 3 < e.length, "Trying to write beyond buffer length"), z(t, 3.4028234663852886e38, -3.4028234663852886e38));
                var i = e.length;
                n >= i || X.write(e, t, n, r, 23, 4)
            }

            function _(e, t, n, r, o) {
                o || (J(void 0 !== t && null !== t, "missing value"), J("boolean" == typeof r, "missing or invalid endian"), J(void 0 !== n && null !== n, "missing offset"), J(n + 7 < e.length, "Trying to write beyond buffer length"), z(t, 1.7976931348623157e308, -1.7976931348623157e308));
                var i = e.length;
                n >= i || X.write(e, t, n, r, 52, 8)
            }

            function S(e) {
                return e.trim ? e.trim() : e.replace(/^\s+|\s+$/g, "")
            }

            function T(e, t, n) {
                return "number" != typeof e ? n : (e = ~~e, e >= t ? t : e >= 0 ? e : (e += t, e >= 0 ? e : 0))
            }

            function M(e) {
                return e = ~~Math.ceil(+e), 0 > e ? 0 : e
            }

            function x(e) {
                return (Array.isArray || function(e) {
                    return "[object Array]" === Object.prototype.toString.call(e)
                })(e)
            }

            function N(e) {
                return x(e) || o.isBuffer(e) || e && "object" == typeof e && "number" == typeof e.length
            }

            function k(e) {
                return 16 > e ? "0" + e.toString(16) : e.toString(16)
            }

            function F(e) {
                for (var t = [], n = 0; n < e.length; n++) {
                    var r = e.charCodeAt(n);
                    if (127 >= r) t.push(e.charCodeAt(n));
                    else {
                        var o = n;
                        r >= 55296 && 57343 >= r && n++;
                        for (var i = encodeURIComponent(e.slice(o, n + 1)).substr(1).split("%"), a = 0; a < i.length; a++) t.push(parseInt(i[a], 16))
                    }
                }
                return t
            }

            function W(e) {
                for (var t = [], n = 0; n < e.length; n++) t.push(255 & e.charCodeAt(n));
                return t
            }

            function j(e) {
                for (var t, n, r, o = [], i = 0; i < e.length; i++) t = e.charCodeAt(i), n = t >> 8, r = t % 256, o.push(r), o.push(n);
                return o
            }

            function D(e) {
                return Y.toByteArray(e)
            }

            function O(e, t, n, r) {
                for (var o = 0; r > o && !(o + n >= t.length || o >= e.length); o++) t[o + n] = e[o];
                return o
            }

            function R(e) {
                try {
                    return decodeURIComponent(e)
                } catch (t) {
                    return String.fromCharCode(65533)
                }
            }

            function P(e, t) {
                J("number" == typeof e, "cannot write a non-number as a number"), J(e >= 0, "specified a negative value for writing an unsigned value"), J(t >= e, "value is larger than maximum value for type"), J(Math.floor(e) === e, "value has a fractional component")
            }

            function q(e, t, n) {
                J("number" == typeof e, "cannot write a non-number as a number"), J(t >= e, "value larger than maximum allowed value"), J(e >= n, "value smaller than minimum allowed value"), J(Math.floor(e) === e, "value has a fractional component")
            }

            function z(e, t, n) {
                J("number" == typeof e, "cannot write a non-number as a number"), J(t >= e, "value larger than maximum allowed value"), J(e >= n, "value smaller than minimum allowed value")
            }

            function J(e, t) {
                if (!e) throw new Error(t || "Failed assertion")
            }
            var Y = e("base64-js"),
                X = e("ieee754");
            n.Buffer = o, n.SlowBuffer = o, n.INSPECT_MAX_BYTES = 50, o.poolSize = 8192, o._useTypedArrays = function() {
                try {
                    var e = new ArrayBuffer(0),
                        t = new Uint8Array(e);
                    return t.foo = function() {
                        return 42
                    }, 42 === t.foo() && "function" == typeof t.subarray
                } catch (n) {
                    return !1
                }
            }(), o.isEncoding = function(e) {
                switch (String(e).toLowerCase()) {
                    case "hex":
                    case "utf8":
                    case "utf-8":
                    case "ascii":
                    case "binary":
                    case "base64":
                    case "raw":
                    case "ucs2":
                    case "ucs-2":
                    case "utf16le":
                    case "utf-16le":
                        return !0;
                    default:
                        return !1
                }
            }, o.isBuffer = function(e) {
                return !(null === e || void 0 === e || !e._isBuffer)
            }, o.byteLength = function(e, t) {
                var n;
                switch (e += "", t || "utf8") {
                    case "hex":
                        n = e.length / 2;
                        break;
                    case "utf8":
                    case "utf-8":
                        n = F(e).length;
                        break;
                    case "ascii":
                    case "binary":
                    case "raw":
                        n = e.length;
                        break;
                    case "base64":
                        n = D(e).length;
                        break;
                    case "ucs2":
                    case "ucs-2":
                    case "utf16le":
                    case "utf-16le":
                        n = 2 * e.length;
                        break;
                    default:
                        throw new Error("Unknown encoding")
                }
                return n
            }, o.concat = function(e, t) {
                if (J(x(e), "Usage: Buffer.concat(list, [totalLength])\nlist should be an Array."), 0 === e.length) return new o(0);
                if (1 === e.length) return e[0];
                var n;
                if ("number" != typeof t)
                    for (t = 0, n = 0; n < e.length; n++) t += e[n].length;
                var r = new o(t),
                    i = 0;
                for (n = 0; n < e.length; n++) {
                    var a = e[n];
                    a.copy(r, i), i += a.length
                }
                return r
            }, o.prototype.write = function(e, t, n, r) {
                if (isFinite(t)) isFinite(n) || (r = n, n = void 0);
                else {
                    var o = r;
                    r = t, t = n, n = o
                }
                t = Number(t) || 0;
                var c = this.length - t;
                n ? (n = Number(n), n > c && (n = c)) : n = c, r = String(r || "utf8").toLowerCase();
                var d;
                switch (r) {
                    case "hex":
                        d = i(this, e, t, n);
                        break;
                    case "utf8":
                    case "utf-8":
                        d = a(this, e, t, n);
                        break;
                    case "ascii":
                        d = u(this, e, t, n);
                        break;
                    case "binary":
                        d = s(this, e, t, n);
                        break;
                    case "base64":
                        d = f(this, e, t, n);
                        break;
                    case "ucs2":
                    case "ucs-2":
                    case "utf16le":
                    case "utf-16le":
                        d = l(this, e, t, n);
                        break;
                    default:
                        throw new Error("Unknown encoding")
                }
                return d
            }, o.prototype.toString = function(e, t, n) {
                var r = this;
                if (e = String(e || "utf8").toLowerCase(), t = Number(t) || 0, n = void 0 !== n ? Number(n) : n = r.length, n === t) return "";
                var o;
                switch (e) {
                    case "hex":
                        o = p(r, t, n);
                        break;
                    case "utf8":
                    case "utf-8":
                        o = d(r, t, n);
                        break;
                    case "ascii":
                        o = g(r, t, n);
                        break;
                    case "binary":
                        o = h(r, t, n);
                        break;
                    case "base64":
                        o = c(r, t, n);
                        break;
                    case "ucs2":
                    case "ucs-2":
                    case "utf16le":
                    case "utf-16le":
                        o = w(r, t, n);
                        break;
                    default:
                        throw new Error("Unknown encoding")
                }
                return o
            }, o.prototype.toJSON = function() {
                return {
                    type: "Buffer",
                    data: Array.prototype.slice.call(this._arr || this, 0)
                }
            }, o.prototype.copy = function(e, t, n, r) {
                var i = this;
                if (n || (n = 0), r || 0 === r || (r = this.length), t || (t = 0), r !== n && 0 !== e.length && 0 !== i.length) {
                    J(r >= n, "sourceEnd < sourceStart"), J(t >= 0 && t < e.length, "targetStart out of bounds"), J(n >= 0 && n < i.length, "sourceStart out of bounds"), J(r >= 0 && r <= i.length, "sourceEnd out of bounds"), r > this.length && (r = this.length), e.length - t < r - n && (r = e.length - t + n);
                    var a = r - n;
                    if (100 > a || !o._useTypedArrays)
                        for (var u = 0; a > u; u++) e[u + t] = this[u + n];
                    else e._set(this.subarray(n, n + a), t)
                }
            }, o.prototype.slice = function(e, t) {
                var n = this.length;
                if (e = T(e, n, 0), t = T(t, n, n), o._useTypedArrays) return o._augment(this.subarray(e, t));
                for (var r = t - e, i = new o(r, void 0, !0), a = 0; r > a; a++) i[a] = this[a + e];
                return i
            }, o.prototype.get = function(e) {
                return console.log(".get() is deprecated. Access using array indexes instead."), this.readUInt8(e)
            }, o.prototype.set = function(e, t) {
                return console.log(".set() is deprecated. Access using array indexes instead."), this.writeUInt8(e, t)
            }, o.prototype.readUInt8 = function(e, t) {
                return t || (J(void 0 !== e && null !== e, "missing offset"), J(e < this.length, "Trying to read beyond buffer length")), e >= this.length ? void 0 : this[e]
            }, o.prototype.readUInt16LE = function(e, t) {
                return y(this, e, !0, t)
            }, o.prototype.readUInt16BE = function(e, t) {
                return y(this, e, !1, t)
            }, o.prototype.readUInt32LE = function(e, t) {
                return m(this, e, !0, t)
            }, o.prototype.readUInt32BE = function(e, t) {
                return m(this, e, !1, t)
            }, o.prototype.readInt8 = function(e, t) {
                if (t || (J(void 0 !== e && null !== e, "missing offset"), J(e < this.length, "Trying to read beyond buffer length")), !(e >= this.length)) {
                    var n = 128 & this[e];
                    return n ? -1 * (255 - this[e] + 1) : this[e]
                }
            }, o.prototype.readInt16LE = function(e, t) {
                return v(this, e, !0, t)
            }, o.prototype.readInt16BE = function(e, t) {
                return v(this, e, !1, t)
            }, o.prototype.readInt32LE = function(e, t) {
                return b(this, e, !0, t)
            }, o.prototype.readInt32BE = function(e, t) {
                return b(this, e, !1, t)
            }, o.prototype.readFloatLE = function(e, t) {
                return E(this, e, !0, t)
            }, o.prototype.readFloatBE = function(e, t) {
                return E(this, e, !1, t)
            }, o.prototype.readDoubleLE = function(e, t) {
                return I(this, e, !0, t)
            }, o.prototype.readDoubleBE = function(e, t) {
                return I(this, e, !1, t)
            }, o.prototype.writeUInt8 = function(e, t, n) {
                n || (J(void 0 !== e && null !== e, "missing value"), J(void 0 !== t && null !== t, "missing offset"), J(t < this.length, "trying to write beyond buffer length"), P(e, 255)), t >= this.length || (this[t] = e)
            }, o.prototype.writeUInt16LE = function(e, t, n) {
                B(this, e, t, !0, n)
            }, o.prototype.writeUInt16BE = function(e, t, n) {
                B(this, e, t, !1, n)
            }, o.prototype.writeUInt32LE = function(e, t, n) {
                L(this, e, t, !0, n)
            }, o.prototype.writeUInt32BE = function(e, t, n) {
                L(this, e, t, !1, n)
            }, o.prototype.writeInt8 = function(e, t, n) {
                n || (J(void 0 !== e && null !== e, "missing value"), J(void 0 !== t && null !== t, "missing offset"), J(t < this.length, "Trying to write beyond buffer length"), q(e, 127, -128)), t >= this.length || (e >= 0 ? this.writeUInt8(e, t, n) : this.writeUInt8(255 + e + 1, t, n))
            }, o.prototype.writeInt16LE = function(e, t, n) {
                A(this, e, t, !0, n)
            }, o.prototype.writeInt16BE = function(e, t, n) {
                A(this, e, t, !1, n)
            }, o.prototype.writeInt32LE = function(e, t, n) {
                U(this, e, t, !0, n)
            }, o.prototype.writeInt32BE = function(e, t, n) {
                U(this, e, t, !1, n)
            }, o.prototype.writeFloatLE = function(e, t, n) {
                C(this, e, t, !0, n)
            }, o.prototype.writeFloatBE = function(e, t, n) {
                C(this, e, t, !1, n)
            }, o.prototype.writeDoubleLE = function(e, t, n) {
                _(this, e, t, !0, n)
            }, o.prototype.writeDoubleBE = function(e, t, n) {
                _(this, e, t, !1, n)
            }, o.prototype.fill = function(e, t, n) {
                if (e || (e = 0), t || (t = 0), n || (n = this.length), "string" == typeof e && (e = e.charCodeAt(0)), J("number" == typeof e && !isNaN(e), "value is not a number"), J(n >= t, "end < start"), n !== t && 0 !== this.length) {
                    J(t >= 0 && t < this.length, "start out of bounds"), J(n >= 0 && n <= this.length, "end out of bounds");
                    for (var r = t; n > r; r++) this[r] = e
                }
            }, o.prototype.inspect = function() {
                for (var e = [], t = this.length, r = 0; t > r; r++)
                    if (e[r] = k(this[r]), r === n.INSPECT_MAX_BYTES) {
                        e[r + 1] = "...";
                        break
                    }
                return "<Buffer " + e.join(" ") + ">"
            }, o.prototype.toArrayBuffer = function() {
                if ("undefined" != typeof Uint8Array) {
                    if (o._useTypedArrays) return new o(this).buffer;
                    for (var e = new Uint8Array(this.length), t = 0, n = e.length; n > t; t += 1) e[t] = this[t];
                    return e.buffer
                }
                throw new Error("Buffer.toArrayBuffer not supported in this browser")
            };
            var G = o.prototype;
            o._augment = function(e) {
                return e._isBuffer = !0, e._get = e.get, e._set = e.set, e.get = G.get, e.set = G.set, e.write = G.write, e.toString = G.toString, e.toLocaleString = G.toString, e.toJSON = G.toJSON, e.copy = G.copy, e.slice = G.slice, e.readUInt8 = G.readUInt8, e.readUInt16LE = G.readUInt16LE, e.readUInt16BE = G.readUInt16BE, e.readUInt32LE = G.readUInt32LE, e.readUInt32BE = G.readUInt32BE, e.readInt8 = G.readInt8, e.readInt16LE = G.readInt16LE, e.readInt16BE = G.readInt16BE, e.readInt32LE = G.readInt32LE, e.readInt32BE = G.readInt32BE, e.readFloatLE = G.readFloatLE, e.readFloatBE = G.readFloatBE, e.readDoubleLE = G.readDoubleLE, e.readDoubleBE = G.readDoubleBE, e.writeUInt8 = G.writeUInt8, e.writeUInt16LE = G.writeUInt16LE, e.writeUInt16BE = G.writeUInt16BE, e.writeUInt32LE = G.writeUInt32LE, e.writeUInt32BE = G.writeUInt32BE, e.writeInt8 = G.writeInt8, e.writeInt16LE = G.writeInt16LE, e.writeInt16BE = G.writeInt16BE, e.writeInt32LE = G.writeInt32LE, e.writeInt32BE = G.writeInt32BE, e.writeFloatLE = G.writeFloatLE, e.writeFloatBE = G.writeFloatBE, e.writeDoubleLE = G.writeDoubleLE, e.writeDoubleBE = G.writeDoubleBE, e.fill = G.fill, e.inspect = G.inspect, e.toArrayBuffer = G.toArrayBuffer, e
            }
        }).call(this, e("b55mWE"), "undefined" != typeof self ? self : "undefined" != typeof window ? window : {}, e("buffer").Buffer, arguments[3], arguments[4], arguments[5], arguments[6], "/../../node_modules/gulp-browserify/node_modules/buffer/index.js", "/../../node_modules/gulp-browserify/node_modules/buffer")
    }, {
        b55mWE: 3,
        "base64-js": 1,
        buffer: 2,
        ieee754: 4
    }],
    3: [function(e, t) {
        (function(e) {
            function n() {}
            var e = t.exports = {};
            e.nextTick = function() {
                var e = "undefined" != typeof window && window.setImmediate,
                    t = "undefined" != typeof window && window.postMessage && window.addEventListener;
                if (e) return function(e) {
                    return window.setImmediate(e)
                };
                if (t) {
                    var n = [];
                    return window.addEventListener("message", function(e) {
                            var t = e.source;
                            if ((t === window || null === t) && "process-tick" === e.data && (e.stopPropagation(), n.length > 0)) {
                                var r = n.shift();
                                r()
                            }
                        }, !0),
                        function(e) {
                            n.push(e), window.postMessage("process-tick", "*")
                        }
                }
                return function(e) {
                    setTimeout(e, 0)
                }
            }(), e.title = "browser", e.browser = !0, e.env = {}, e.argv = [], e.on = n, e.addListener = n, e.once = n, e.off = n, e.removeListener = n, e.removeAllListeners = n, e.emit = n, e.binding = function() {
                throw new Error("process.binding is not supported")
            }, e.cwd = function() {
                return "/"
            }, e.chdir = function() {
                throw new Error("process.chdir is not supported")
            }
        }).call(this, e("b55mWE"), "undefined" != typeof self ? self : "undefined" != typeof window ? window : {}, e("buffer").Buffer, arguments[3], arguments[4], arguments[5], arguments[6], "/../../node_modules/gulp-browserify/node_modules/process/browser.js", "/../../node_modules/gulp-browserify/node_modules/process")
    }, {
        b55mWE: 3,
        buffer: 2
    }],
    4: [function(e, t, n) {
        (function() {
            n.read = function(e, t, n, r, o) {
                var i, a, u = 8 * o - r - 1,
                    s = (1 << u) - 1,
                    f = s >> 1,
                    l = -7,
                    c = n ? o - 1 : 0,
                    d = n ? -1 : 1,
                    g = e[t + c];
                for (c += d, i = g & (1 << -l) - 1, g >>= -l, l += u; l > 0; i = 256 * i + e[t + c], c += d, l -= 8);
                for (a = i & (1 << -l) - 1, i >>= -l, l += r; l > 0; a = 256 * a + e[t + c], c += d, l -= 8);
                if (0 === i) i = 1 - f;
                else {
                    if (i === s) return a ? 0 / 0 : 1 / 0 * (g ? -1 : 1);
                    a += Math.pow(2, r), i -= f
                }
                return (g ? -1 : 1) * a * Math.pow(2, i - r)
            }, n.write = function(e, t, n, r, o, i) {
                var a, u, s, f = 8 * i - o - 1,
                    l = (1 << f) - 1,
                    c = l >> 1,
                    d = 23 === o ? Math.pow(2, -24) - Math.pow(2, -77) : 0,
                    g = r ? 0 : i - 1,
                    h = r ? 1 : -1,
                    p = 0 > t || 0 === t && 0 > 1 / t ? 1 : 0;
                for (t = Math.abs(t), isNaN(t) || 1 / 0 === t ? (u = isNaN(t) ? 1 : 0, a = l) : (a = Math.floor(Math.log(t) / Math.LN2), t * (s = Math.pow(2, -a)) < 1 && (a--, s *= 2), t += a + c >= 1 ? d / s : d * Math.pow(2, 1 - c), t * s >= 2 && (a++, s /= 2), a + c >= l ? (u = 0, a = l) : a + c >= 1 ? (u = (t * s - 1) * Math.pow(2, o), a += c) : (u = t * Math.pow(2, c - 1) * Math.pow(2, o), a = 0)); o >= 8; e[n + g] = 255 & u, g += h, u /= 256, o -= 8);
                for (a = a << o | u, f += o; f > 0; e[n + g] = 255 & a, g += h, a /= 256, f -= 8);
                e[n + g - h] |= 128 * p
            }
        }).call(this, e("b55mWE"), "undefined" != typeof self ? self : "undefined" != typeof window ? window : {}, e("buffer").Buffer, arguments[3], arguments[4], arguments[5], arguments[6], "/../../node_modules/ieee754/index.js", "/../../node_modules/ieee754")
    }, {
        b55mWE: 3,
        buffer: 2
    }],
    5: [function(e, t) {
        (function() {
            ! function(n, r) {
                "use strict";
                "object" == typeof t && t.exports && "function" == typeof e ? t.exports = r() : "function" == typeof define && "object" == typeof define.amd ? define(r) : n.log = r()
            }(this, function() {
                "use strict";

                function e(e) {
                    return typeof console === u ? !1 : void 0 !== console[e] ? t(console, e) : void 0 !== console.log ? t(console, "log") : a
                }

                function t(e, t) {
                    var n = e[t];
                    if ("function" == typeof n.bind) return n.bind(e);
                    try {
                        return Function.prototype.bind.call(n, e)
                    } catch (r) {
                        return function() {
                            return Function.prototype.apply.apply(n, [e, arguments])
                        }
                    }
                }

                function n(e, t, n) {
                    return function() {
                        typeof console !== u && (r.call(this, t, n), this[e].apply(this, arguments))
                    }
                }

                function r(e, t) {
                    for (var n = 0; n < s.length; n++) {
                        var r = s[n];
                        this[r] = e > n ? a : this.methodFactory(r, e, t)
                    }
                }

                function o(t) {
                    return e(t) || n.apply(this, arguments)
                }

                function i(e, t, n) {
                    function i(e) {
                        var t = (s[e] || "silent").toUpperCase();
                        try {
                            return window.localStorage[c] = t, void 0
                        } catch (n) {}
                        try {
                            window.document.cookie = encodeURIComponent(c) + "=" + t + ";"
                        } catch (n) {}
                    }

                    function a() {
                        var e;
                        try {
                            e = window.localStorage[c]
                        } catch (t) {}
                        if (typeof e === u) try {
                            var n = window.document.cookie,
                                r = n.indexOf(encodeURIComponent(c) + "=");
                            r && (e = /^([^;]+)/.exec(n.slice(r))[1])
                        } catch (t) {}
                        return void 0 === l.levels[e] && (e = void 0), e
                    }
                    var f, l = this,
                        c = "loglevel";
                    e && (c += ":" + e), l.levels = {
                        TRACE: 0,
                        DEBUG: 1,
                        INFO: 2,
                        WARN: 3,
                        ERROR: 4,
                        SILENT: 5
                    }, l.methodFactory = n || o, l.getLevel = function() {
                        return f
                    }, l.setLevel = function(t, n) {
                        if ("string" == typeof t && void 0 !== l.levels[t.toUpperCase()] && (t = l.levels[t.toUpperCase()]), !("number" == typeof t && t >= 0 && t <= l.levels.SILENT)) throw "log.setLevel() called with invalid level: " + t;
                        return f = t, n !== !1 && i(t), r.call(l, t, e), typeof console === u && t < l.levels.SILENT ? "No console available for logging" : void 0
                    }, l.setDefaultLevel = function(e) {
                        a() || l.setLevel(e, !1)
                    }, l.enableAll = function(e) {
                        l.setLevel(l.levels.TRACE, e)
                    }, l.disableAll = function(e) {
                        l.setLevel(l.levels.SILENT, e)
                    };
                    var d = a();
                    null == d && (d = null == t ? "WARN" : t), l.setLevel(d, !1)
                }
                var a = function() {},
                    u = "undefined",
                    s = ["trace", "debug", "info", "warn", "error"],
                    f = new i,
                    l = {};
                f.getLogger = function(e) {
                    if ("string" != typeof e || "" === e) throw new TypeError("You must supply a name when creating a logger.");
                    var t = l[e];
                    return t || (t = l[e] = new i(e, f.getLevel(), f.methodFactory)), t
                };
                var c = typeof window !== u ? window.log : void 0;
                return f.noConflict = function() {
                    return typeof window !== u && window.log === f && (window.log = c), f
                }, f
            })
        }).call(this, e("b55mWE"), "undefined" != typeof self ? self : "undefined" != typeof window ? window : {}, e("buffer").Buffer, arguments[3], arguments[4], arguments[5], arguments[6], "/../../node_modules/loglevel/lib/loglevel.js", "/../../node_modules/loglevel/lib")
    }, {
        b55mWE: 3,
        buffer: 2
    }],
    6: [function(e) {
        (function() {
            "use strict";

            function t(e, t, n) {
                return t > e || e > n
            }

            function n(e) {
                return !e || isNaN(e) ? (d.info("Set frame height to default"), h) : (t(e, p, w) && d.debug("Frame height %d out of bounds.", e), c(e, p, w))
            }

            function r() {
                return "100%"
            }

            function o(e) {
                var t = e.href,
                    n = t.indexOf("#"),
                    r = t.length;
                return n >= 0 && (r = n), t.substring(0, r)
            }

            function i(e) {
                if (!f.staticEmbedPage) throw new Error('"staticEmbedPage" parameter missing.');
                return f.staticEmbedPage + "?" + e
            }

            function a() {
                var e, t, o, a = g(this),
                    u = a.data("podlove-web-player-source");
                if (!u) {
                    var s = a.get(0).id;
                    if (!s) throw new Error("Element without source set needs an ID");
                    if (u = i(s), o = window[v][s], !o) throw new Error('No data found for "' + s + '"')
                }
                return m && b[0] && (m = !1, u += "#t=" + l.getFragment("t")), e = g("<iframe>", {
                    src: u,
                    height: n(a.data("podlove-web-player-height")),
                    width: r(a.data("podlove-web-player-width")),
                    className: "podlove-webplayer-frame",
                    css: {
                        border: "none",
                        overflow: "hidden"
                    }
                }), t = e.get(0), y[t.src] = {
                    data: o,
                    frame: e,
                    state: -1
                }, d.info("registered player with id", t.src), e
            }

            function u(e) {
                var t, n, r = {
                    action: "pause"
                };
                for (n in y) n !== e && y.hasOwnProperty(n) && (t = y[n], 0 !== t.state && t.frame.get(0).contentWindow.postMessage(r, n))
            }

            function s(e) {
                var t = e.originalEvent,
                    r = t.data,
                    i = r.action,
                    a = r.arg,
                    s = o(t.source.location),
                    f = y[s];
                return d.debug("received message", i, a), f ? null === i || null === a ? (d.warn("no action or data was given"), void 0) : (d.debug("received", i, "from", s, "with", a), "waiting" === i && f.frame.get(0).contentWindow.postMessage({
                    playerOptions: f.data
                }, "*"), ("ready" === i || "pause" === i) && (f.state = 0), "play" === i && (f.state = 1, u(s)), "resize" === i && f.frame.height(n(a)), void 0) : (d.warn("no player found with id", s), void 0)
            }
            var f, l = e("./url"),
                c = e("./util").cap,
                d = e("./logging").getLogger("Moderator"),
                g = jQuery,
                h = 300,
                p = 100,
                w = 3e3,
                y = {},
                m = !0,
                v = "pwp_metadata",
                b = l.checkCurrent();
            g(window).on("message", s), g.fn.podlovewebplayer = function(e) {
                return f = e || {}, this.replaceWith(a)
            }, window.pwp = {
                players: y
            }
        }).call(this, e("b55mWE"), "undefined" != typeof self ? self : "undefined" != typeof window ? window : {}, e("buffer").Buffer, arguments[3], arguments[4], arguments[5], arguments[6], "/fake_c23cfb2d.js", "/")
    }, {
        "./logging": 7,
        "./url": 9,
        "./util": 10,
        b55mWE: 3,
        buffer: 2
    }],
    7: [function(e, t) {
        (function() {
            {
                var n = e("loglevel");
                n.methodFactory
            }
            n.setLevel(n.levels.INFO), t.exports = n
        }).call(this, e("b55mWE"), "undefined" != typeof self ? self : "undefined" != typeof window ? window : {}, e("buffer").Buffer, arguments[3], arguments[4], arguments[5], arguments[6], "/logging.js", "/")
    }, {
        b55mWE: 3,
        buffer: 2,
        loglevel: 5
    }],
    8: [function(e, t) {
        (function() {
            "use strict";

            function n(e) {
                if (!e) return !1;
                var t = a.exec(e);
                if (!t) return i.warn("Could not extract time from", e), !1;
                var n = 0;
                return n += t[1] ? 60 * parseInt(t[1], 10) * 60 : 0, n += 60 * parseInt(t[2], 10), n += parseInt(t[3], 10), n += t[4] ? parseFloat(t[4]) : 0, n = Math.max(n, 0)
            }

            function r(e, t, n, r) {
                var i, a, u, s, f = "";
                return 0 === e ? n ? "00:00:00" : "00:00" : !e || 0 >= e ? n ? "--:--:--" : "--:--" : (i = Math.floor(e / 60 / 60), a = Math.floor(e / 60) % 60, u = Math.floor(e % 60) % 60, s = Math.floor(e % 1 * 1e3), r && s && (f = "." + o(s, 3)), f = ":" + o(u, 2) + f, 0 !== i || n || t ? (f = o(a, 2) + f, 0 !== i || n ? t ? o(i, 2) + ":" + f : i + ":" + f : f) : a.toString() + f)
            }
            var o = e("./util").zeroFill,
                i = e("./logging").getLogger("TimeCode"),
                a = /(?:(\d+):)?(\d{1,2}):(\d\d)(\.\d{1,3})?/;
            t.exports = {
                fromTimeStamp: function(e) {
                    return r(e, !0, !0)
                },
                generate: function(e, t, n) {
                    return e[1] > 0 && e[1] < 9999999 && e[0] < e[1] ? r(e[0], t, n) + "," + r(e[1], t, n) : r(e[0], t, n)
                },
                parse: function(e) {
                    if (!e) return [!1, !1];
                    var t = e.split("-");
                    if (!t.length) return i.warn("no timeparts:", e), [!1, !1];
                    var r = n(t.shift()),
                        o = n(t.shift());
                    return o > r ? [r, o] : [r, !1]
                },
                getStartTimeCode: function(e) {
                    return this.parse(e)[0]
                }
            }
        }).call(this, e("b55mWE"), "undefined" != typeof self ? self : "undefined" != typeof window ? window : {}, e("buffer").Buffer, arguments[3], arguments[4], arguments[5], arguments[6], "/timecode.js", "/")
    }, {
        "./logging": 7,
        "./util": 10,
        b55mWE: 3,
        buffer: 2
    }],
    9: [function(e, t) {
        (function() {
            "use strict";

            function n(e) {
                var t = window.location.hash.substring(1),
                    n = t.split("&");
                if (-1 === t.indexOf(e)) return !1;
                for (var r = 0, o = n.length; o > r; r++) {
                    var i = n[r].split("=");
                    if (i[0] === e) return 1 === i.length ? !0 : decodeURIComponent(i[1])
                }
                return !1
            }
            var r = e("./timecode");
            t.exports = {
                getFragment: n,
                checkCurrent: function() {
                    var e = n("t");
                    return r.parse(e)
                }
            }
        }).call(this, e("b55mWE"), "undefined" != typeof self ? self : "undefined" != typeof window ? window : {}, e("buffer").Buffer, arguments[3], arguments[4], arguments[5], arguments[6], "/url.js", "/")
    }, {
        "./timecode": 8,
        b55mWE: 3,
        buffer: 2
    }],
    10: [function(e, t) {
        (function() {
            "use strict";

            function e(e, t, n) {
                return e = Math.max(e, t), e = Math.min(e, n)
            }

            function n(e, t) {
                for (var n = e.toString(); n.length < t;) n = "0" + n;
                return n
            }
            t.exports = {
                cap: e,
                zeroFill: n
            }
        }).call(this, e("b55mWE"), "undefined" != typeof self ? self : "undefined" != typeof window ? window : {}, e("buffer").Buffer, arguments[3], arguments[4], arguments[5], arguments[6], "/util.js", "/")
    }, {
        b55mWE: 3,
        buffer: 2
    }]
}, {}, [6]);