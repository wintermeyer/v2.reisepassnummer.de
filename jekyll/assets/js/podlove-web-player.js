! function e(t, n, i) {
    function r(o, s) {
        if (!n[o]) {
            if (!t[o]) {
                var u = "function" == typeof require && require;
                if (!s && u) return u(o, !0);
                if (a) return a(o, !0);
                throw new Error("Cannot find module '" + o + "'")
            }
            var l = n[o] = {
                exports: {}
            };
            t[o][0].call(l.exports, function(e) {
                var n = t[o][1][e];
                return r(n ? n : e)
            }, l, l.exports, e, t, n, i)
        }
        return n[o].exports
    }
    for (var a = "function" == typeof require && require, o = 0; o < i.length; o++) r(i[o]);
    return r
}({
    1: [function(e) {
        (function() {
            var e = e || {};
            e.version = "2.16.4", e.meIndex = 0, e.plugins = {
                    silverlight: [{
                        version: [3, 0],
                        types: ["video/mp4", "video/m4v", "video/mov", "video/wmv", "audio/wma", "audio/m4a", "audio/mp3", "audio/wav", "audio/mpeg"]
                    }],
                    flash: [{
                        version: [9, 0, 124],
                        types: ["video/mp4", "video/m4v", "video/mov", "video/flv", "video/rtmp", "video/x-flv", "audio/flv", "audio/x-flv", "audio/mp3", "audio/m4a", "audio/mpeg", "video/youtube", "video/x-youtube", "application/x-mpegURL"]
                    }],
                    youtube: [{
                        version: null,
                        types: ["video/youtube", "video/x-youtube", "audio/youtube", "audio/x-youtube"]
                    }],
                    vimeo: [{
                        version: null,
                        types: ["video/vimeo", "video/x-vimeo"]
                    }]
                }, e.Utility = {
                    encodeUrl: function(e) {
                        return encodeURIComponent(e)
                    },
                    escapeHTML: function(e) {
                        return e.toString().split("&").join("&amp;").split("<").join("&lt;").split('"').join("&quot;")
                    },
                    absolutizeUrl: function(e) {
                        var t = document.createElement("div");
                        return t.innerHTML = '<a href="' + this.escapeHTML(e) + '">x</a>', t.firstChild.href
                    },
                    getScriptPath: function(e) {
                        for (var t, n, i, r, a, o, s = 0, u = "", l = "", d = document.getElementsByTagName("script"), c = d.length, p = e.length; c > s; s++) {
                            for (r = d[s].src, n = r.lastIndexOf("/"), n > -1 ? (o = r.substring(n + 1), a = r.substring(0, n + 1)) : (o = r, a = ""), t = 0; p > t; t++)
                                if (l = e[t], i = o.indexOf(l), i > -1) {
                                    u = a;
                                    break
                                }
                            if ("" !== u) break
                        }
                        return u
                    },
                    secondsToTimeCode: function(e, t, n, i) {
                        "undefined" == typeof n ? n = !1 : "undefined" == typeof i && (i = 25);
                        var r = Math.floor(e / 3600) % 24,
                            a = Math.floor(e / 60) % 60,
                            o = Math.floor(e % 60),
                            s = Math.floor((e % 1 * i).toFixed(3)),
                            u = (t || r > 0 ? (10 > r ? "0" + r : r) + ":" : "") + (10 > a ? "0" + a : a) + ":" + (10 > o ? "0" + o : o) + (n ? ":" + (10 > s ? "0" + s : s) : "");
                        return u
                    },
                    timeCodeToSeconds: function(e, t, n, i) {
                        "undefined" == typeof n ? n = !1 : "undefined" == typeof i && (i = 25);
                        var r = e.split(":"),
                            a = parseInt(r[0], 10),
                            o = parseInt(r[1], 10),
                            s = parseInt(r[2], 10),
                            u = 0,
                            l = 0;
                        return n && (u = parseInt(r[3]) / i), l = 3600 * a + 60 * o + s + u
                    },
                    convertSMPTEtoSeconds: function(e) {
                        if ("string" != typeof e) return !1;
                        e = e.replace(",", ".");
                        var t = 0,
                            n = -1 != e.indexOf(".") ? e.split(".")[1].length : 0,
                            i = 1;
                        e = e.split(":").reverse();
                        for (var r = 0; r < e.length; r++) i = 1, r > 0 && (i = Math.pow(60, r)), t += Number(e[r]) * i;
                        return Number(t.toFixed(n))
                    },
                    removeSwf: function(t) {
                        var n = document.getElementById(t);
                        n && /object|embed/i.test(n.nodeName) && (e.MediaFeatures.isIE ? (n.style.display = "none", function() {
                            4 == n.readyState ? e.Utility.removeObjectInIE(t) : setTimeout(arguments.callee, 10)
                        }()) : n.parentNode.removeChild(n))
                    },
                    removeObjectInIE: function(e) {
                        var t = document.getElementById(e);
                        if (t) {
                            for (var n in t) "function" == typeof t[n] && (t[n] = null);
                            t.parentNode.removeChild(t)
                        }
                    }
                }, e.PluginDetector = {
                    hasPluginVersion: function(e, t) {
                        var n = this.plugins[e];
                        return t[1] = t[1] || 0, t[2] = t[2] || 0, n[0] > t[0] || n[0] == t[0] && n[1] > t[1] || n[0] == t[0] && n[1] == t[1] && n[2] >= t[2] ? !0 : !1
                    },
                    nav: window.navigator,
                    ua: window.navigator.userAgent.toLowerCase(),
                    plugins: [],
                    addPlugin: function(e, t, n, i, r) {
                        this.plugins[e] = this.detectPlugin(t, n, i, r)
                    },
                    detectPlugin: function(e, t, n, i) {
                        var r, a, o, s = [0, 0, 0];
                        if ("undefined" != typeof this.nav.plugins && "object" == typeof this.nav.plugins[e]) {
                            if (r = this.nav.plugins[e].description, r && ("undefined" == typeof this.nav.mimeTypes || !this.nav.mimeTypes[t] || this.nav.mimeTypes[t].enabledPlugin))
                                for (s = r.replace(e, "").replace(/^\s+/, "").replace(/\sr/gi, ".").split("."), a = 0; a < s.length; a++) s[a] = parseInt(s[a].match(/\d+/), 10)
                        } else if ("undefined" != typeof window.ActiveXObject) try {
                            o = new ActiveXObject(n), o && (s = i(o))
                        } catch (u) {}
                        return s
                    }
                }, e.PluginDetector.addPlugin("flash", "Shockwave Flash", "application/x-shockwave-flash", "ShockwaveFlash.ShockwaveFlash", function(e) {
                    var t = [],
                        n = e.GetVariable("$version");
                    return n && (n = n.split(" ")[1].split(","), t = [parseInt(n[0], 10), parseInt(n[1], 10), parseInt(n[2], 10)]), t
                }), e.PluginDetector.addPlugin("silverlight", "Silverlight Plug-In", "application/x-silverlight-2", "AgControl.AgControl", function(e) {
                    var t = [0, 0, 0, 0],
                        n = function(e, t, n, i) {
                            for (; e.isVersionSupported(t[0] + "." + t[1] + "." + t[2] + "." + t[3]);) t[n] += i;
                            t[n] -= i
                        };
                    return n(e, t, 0, 1), n(e, t, 1, 1), n(e, t, 2, 1e4), n(e, t, 2, 1e3), n(e, t, 2, 100), n(e, t, 2, 10), n(e, t, 2, 1), n(e, t, 3, 1), t
                }), e.MediaFeatures = {
                    init: function() {
                        var t, n, i = this,
                            r = document,
                            a = e.PluginDetector.nav,
                            o = e.PluginDetector.ua.toLowerCase(),
                            s = ["source", "track", "audio", "video"];
                        i.isiPad = null !== o.match(/ipad/i), i.isiPhone = null !== o.match(/iphone/i), i.isiOS = i.isiPhone || i.isiPad, i.isAndroid = null !== o.match(/android/i), i.isBustedAndroid = null !== o.match(/android 2\.[12]/), i.isBustedNativeHTTPS = "https:" === location.protocol && (null !== o.match(/android [12]\./) || null !== o.match(/macintosh.* version.* safari/)), i.isIE = -1 != a.appName.toLowerCase().indexOf("microsoft") || null !== a.appName.toLowerCase().match(/trident/gi), i.isChrome = null !== o.match(/chrome/gi), i.isChromium = null !== o.match(/chromium/gi), i.isFirefox = null !== o.match(/firefox/gi), i.isWebkit = null !== o.match(/webkit/gi), i.isGecko = null !== o.match(/gecko/gi) && !i.isWebkit && !i.isIE, i.isOpera = null !== o.match(/opera/gi), i.hasTouch = "ontouchstart" in window, i.svg = !!document.createElementNS && !!document.createElementNS("http://www.w3.org/2000/svg", "svg").createSVGRect;
                        for (t = 0; t < s.length; t++) n = document.createElement(s[t]);
                        i.supportsMediaTag = "undefined" != typeof n.canPlayType || i.isBustedAndroid;
                        try {
                            n.canPlayType("video/mp4")
                        } catch (u) {
                            i.supportsMediaTag = !1
                        }
                        i.hasSemiNativeFullScreen = "undefined" != typeof n.webkitEnterFullscreen, i.hasNativeFullscreen = "undefined" != typeof n.requestFullscreen, i.hasWebkitNativeFullScreen = "undefined" != typeof n.webkitRequestFullScreen, i.hasMozNativeFullScreen = "undefined" != typeof n.mozRequestFullScreen, i.hasMsNativeFullScreen = "undefined" != typeof n.msRequestFullscreen, i.hasTrueNativeFullScreen = i.hasWebkitNativeFullScreen || i.hasMozNativeFullScreen || i.hasMsNativeFullScreen, i.nativeFullScreenEnabled = i.hasTrueNativeFullScreen, i.hasMozNativeFullScreen ? i.nativeFullScreenEnabled = document.mozFullScreenEnabled : i.hasMsNativeFullScreen && (i.nativeFullScreenEnabled = document.msFullscreenEnabled), i.isChrome && (i.hasSemiNativeFullScreen = !1), i.hasTrueNativeFullScreen && (i.fullScreenEventName = "", i.hasWebkitNativeFullScreen ? i.fullScreenEventName = "webkitfullscreenchange" : i.hasMozNativeFullScreen ? i.fullScreenEventName = "mozfullscreenchange" : i.hasMsNativeFullScreen && (i.fullScreenEventName = "MSFullscreenChange"), i.isFullScreen = function() {
                            return i.hasMozNativeFullScreen ? r.mozFullScreen : i.hasWebkitNativeFullScreen ? r.webkitIsFullScreen : i.hasMsNativeFullScreen ? null !== r.msFullscreenElement : void 0
                        }, i.requestFullScreen = function(e) {
                            i.hasWebkitNativeFullScreen ? e.webkitRequestFullScreen() : i.hasMozNativeFullScreen ? e.mozRequestFullScreen() : i.hasMsNativeFullScreen && e.msRequestFullscreen()
                        }, i.cancelFullScreen = function() {
                            i.hasWebkitNativeFullScreen ? document.webkitCancelFullScreen() : i.hasMozNativeFullScreen ? document.mozCancelFullScreen() : i.hasMsNativeFullScreen && document.msExitFullscreen()
                        }), i.hasSemiNativeFullScreen && o.match(/mac os x 10_5/i) && (i.hasNativeFullScreen = !1, i.hasSemiNativeFullScreen = !1)
                    }
                }, e.MediaFeatures.init(), e.HtmlMediaElement = {
                    pluginType: "native",
                    isFullScreen: !1,
                    setCurrentTime: function(e) {
                        this.currentTime = e
                    },
                    setMuted: function(e) {
                        this.muted = e
                    },
                    setVolume: function(e) {
                        this.volume = e
                    },
                    stop: function() {
                        this.pause()
                    },
                    setSrc: function(e) {
                        for (var t = this.getElementsByTagName("source"); t.length > 0;) this.removeChild(t[0]);
                        if ("string" == typeof e) this.src = e;
                        else {
                            var n, i;
                            for (n = 0; n < e.length; n++)
                                if (i = e[n], this.canPlayType(i.type)) {
                                    this.src = i.src;
                                    break
                                }
                        }
                    },
                    setVideoSize: function(e, t) {
                        this.width = e, this.height = t
                    }
                }, e.PluginMediaElement = function(e, t, n) {
                    this.id = e, this.pluginType = t, this.src = n, this.events = {}, this.attributes = {}
                }, e.PluginMediaElement.prototype = {
                    pluginElement: null,
                    pluginType: "",
                    isFullScreen: !1,
                    playbackRate: -1,
                    defaultPlaybackRate: -1,
                    seekable: [],
                    played: [],
                    paused: !0,
                    ended: !1,
                    seeking: !1,
                    duration: 0,
                    error: null,
                    tagName: "",
                    muted: !1,
                    volume: 1,
                    currentTime: 0,
                    play: function() {
                        null != this.pluginApi && ("youtube" == this.pluginType || "vimeo" == this.pluginType ? this.pluginApi.playVideo() : this.pluginApi.playMedia(), this.paused = !1)
                    },
                    load: function() {
                        null != this.pluginApi && ("youtube" == this.pluginType || "vimeo" == this.pluginType || this.pluginApi.loadMedia(), this.paused = !1)
                    },
                    pause: function() {
                        null != this.pluginApi && ("youtube" == this.pluginType || "vimeo" == this.pluginType ? this.pluginApi.pauseVideo() : this.pluginApi.pauseMedia(), this.paused = !0)
                    },
                    stop: function() {
                        null != this.pluginApi && ("youtube" == this.pluginType || "vimeo" == this.pluginType ? this.pluginApi.stopVideo() : this.pluginApi.stopMedia(), this.paused = !0)
                    },
                    canPlayType: function(t) {
                        var n, i, r, a = e.plugins[this.pluginType];
                        for (n = 0; n < a.length; n++)
                            if (r = a[n], e.PluginDetector.hasPluginVersion(this.pluginType, r.version))
                                for (i = 0; i < r.types.length; i++)
                                    if (t == r.types[i]) return "probably";
                        return ""
                    },
                    positionFullscreenButton: function(e, t, n) {
                        null != this.pluginApi && this.pluginApi.positionFullscreenButton && this.pluginApi.positionFullscreenButton(Math.floor(e), Math.floor(t), n)
                    },
                    hideFullscreenButton: function() {
                        null != this.pluginApi && this.pluginApi.hideFullscreenButton && this.pluginApi.hideFullscreenButton()
                    },
                    setSrc: function(t) {
                        if ("string" == typeof t) this.pluginApi.setSrc(e.Utility.absolutizeUrl(t)), this.src = e.Utility.absolutizeUrl(t);
                        else {
                            var n, i;
                            for (n = 0; n < t.length; n++)
                                if (i = t[n], this.canPlayType(i.type)) {
                                    this.pluginApi.setSrc(e.Utility.absolutizeUrl(i.src)), this.src = e.Utility.absolutizeUrl(t);
                                    break
                                }
                        }
                    },
                    setCurrentTime: function(e) {
                        null != this.pluginApi && ("youtube" == this.pluginType || "vimeo" == this.pluginType ? this.pluginApi.seekTo(e) : this.pluginApi.setCurrentTime(e), this.currentTime = e)
                    },
                    setVolume: function(e) {
                        null != this.pluginApi && ("youtube" == this.pluginType ? this.pluginApi.setVolume(100 * e) : this.pluginApi.setVolume(e), this.volume = e)
                    },
                    setMuted: function(e) {
                        null != this.pluginApi && ("youtube" == this.pluginType ? (e ? this.pluginApi.mute() : this.pluginApi.unMute(), this.muted = e, this.dispatchEvent("volumechange")) : this.pluginApi.setMuted(e), this.muted = e)
                    },
                    setVideoSize: function(e, t) {
                        this.pluginElement && this.pluginElement.style && (this.pluginElement.style.width = e + "px", this.pluginElement.style.height = t + "px"), null != this.pluginApi && this.pluginApi.setVideoSize && this.pluginApi.setVideoSize(e, t)
                    },
                    setFullscreen: function(e) {
                        null != this.pluginApi && this.pluginApi.setFullscreen && this.pluginApi.setFullscreen(e)
                    },
                    enterFullScreen: function() {
                        null != this.pluginApi && this.pluginApi.setFullscreen && this.setFullscreen(!0)
                    },
                    exitFullScreen: function() {
                        null != this.pluginApi && this.pluginApi.setFullscreen && this.setFullscreen(!1)
                    },
                    addEventListener: function(e, t) {
                        this.events[e] = this.events[e] || [], this.events[e].push(t)
                    },
                    removeEventListener: function(e, t) {
                        if (!e) return this.events = {}, !0;
                        var n = this.events[e];
                        if (!n) return !0;
                        if (!t) return this.events[e] = [], !0;
                        for (var i = 0; i < n.length; i++)
                            if (n[i] === t) return this.events[e].splice(i, 1), !0;
                        return !1
                    },
                    dispatchEvent: function(e) {
                        var t, n, i = this.events[e];
                        if (i)
                            for (n = Array.prototype.slice.call(arguments, 1), t = 0; t < i.length; t++) i[t].apply(this, n)
                    },
                    hasAttribute: function(e) {
                        return e in this.attributes
                    },
                    removeAttribute: function(e) {
                        delete this.attributes[e]
                    },
                    getAttribute: function(e) {
                        return this.hasAttribute(e) ? this.attributes[e] : ""
                    },
                    setAttribute: function(e, t) {
                        this.attributes[e] = t
                    },
                    remove: function() {
                        e.Utility.removeSwf(this.pluginElement.id), e.MediaPluginBridge.unregisterPluginElement(this.pluginElement.id)
                    }
                }, e.MediaPluginBridge = {
                    pluginMediaElements: {},
                    htmlMediaElements: {},
                    registerPluginElement: function(e, t, n) {
                        this.pluginMediaElements[e] = t, this.htmlMediaElements[e] = n
                    },
                    unregisterPluginElement: function(e) {
                        delete this.pluginMediaElements[e], delete this.htmlMediaElements[e]
                    },
                    initPlugin: function(e) {
                        var t = this.pluginMediaElements[e],
                            n = this.htmlMediaElements[e];
                        if (t) {
                            switch (t.pluginType) {
                                case "flash":
                                    t.pluginElement = t.pluginApi = document.getElementById(e);
                                    break;
                                case "silverlight":
                                    t.pluginElement = document.getElementById(t.id), t.pluginApi = t.pluginElement.Content.MediaElementJS
                            }
                            null != t.pluginApi && t.success && t.success(t, n)
                        }
                    },
                    fireEvent: function(e, t, n) {
                        var i, r, a, o = this.pluginMediaElements[e];
                        if (o) {
                            i = {
                                type: t,
                                target: o
                            };
                            for (r in n) o[r] = n[r], i[r] = n[r];
                            a = n.bufferedTime || 0, i.target.buffered = i.buffered = {
                                start: function() {
                                    return 0
                                },
                                end: function() {
                                    return a
                                },
                                length: 1
                            }, o.dispatchEvent(i.type, i)
                        }
                    }
                }, e.MediaElementDefaults = {
                    mode: "auto",
                    plugins: ["flash", "silverlight", "youtube", "vimeo"],
                    enablePluginDebug: !1,
                    httpsBasicAuthSite: !1,
                    type: "",
                    pluginPath: e.Utility.getScriptPath(["mediaelement.js", "mediaelement.min.js", "mediaelement-and-player.js", "mediaelement-and-player.min.js"]),
                    flashName: "flashmediaelement.swf",
                    flashStreamer: "",
                    enablePluginSmoothing: !1,
                    enablePseudoStreaming: !1,
                    pseudoStreamingStartQueryParam: "start",
                    silverlightName: "silverlightmediaelement.xap",
                    defaultVideoWidth: 480,
                    defaultVideoHeight: 270,
                    pluginWidth: -1,
                    pluginHeight: -1,
                    pluginVars: [],
                    timerRate: 250,
                    startVolume: .8,
                    success: function() {},
                    error: function() {}
                }, e.MediaElement = function(t, n) {
                    return e.HtmlMediaElementShim.create(t, n)
                }, e.HtmlMediaElementShim = {
                    create: function(t, n) {
                        var i, r, a = e.MediaElementDefaults,
                            o = "string" == typeof t ? document.getElementById(t) : t,
                            s = o.tagName.toLowerCase(),
                            u = "audio" === s || "video" === s,
                            l = u ? o.getAttribute("src") : o.getAttribute("href"),
                            d = o.getAttribute("poster"),
                            c = o.getAttribute("autoplay"),
                            p = o.getAttribute("preload"),
                            f = o.getAttribute("controls");
                        for (r in n) a[r] = n[r];
                        return l = "undefined" == typeof l || null === l || "" == l ? null : l, d = "undefined" == typeof d || null === d ? "" : d, p = "undefined" == typeof p || null === p || "false" === p ? "none" : p, c = !("undefined" == typeof c || null === c || "false" === c), f = !("undefined" == typeof f || null === f || "false" === f), i = this.determinePlayback(o, a, e.MediaFeatures.supportsMediaTag, u, l), i.url = null !== i.url ? e.Utility.absolutizeUrl(i.url) : "", "native" == i.method ? (e.MediaFeatures.isBustedAndroid && (o.src = i.url, o.addEventListener("click", function() {
                            o.play()
                        }, !1)), this.updateNative(i, a, c, p)) : "" !== i.method ? this.createPlugin(i, a, d, c, p, f) : (this.createErrorMessage(i, a, d), this)
                    },
                    determinePlayback: function(t, n, i, r, a) {
                        var o, s, u, l, d, c, p, f, h, m, g, v = [],
                            b = {
                                method: "",
                                url: "",
                                htmlMediaElement: t,
                                isVideo: "audio" != t.tagName.toLowerCase()
                            };
                        if ("undefined" != typeof n.type && "" !== n.type)
                            if ("string" == typeof n.type) v.push({
                                type: n.type,
                                url: a
                            });
                            else
                                for (o = 0; o < n.type.length; o++) v.push({
                                    type: n.type[o],
                                    url: a
                                });
                        else if (null !== a) c = this.formatType(a, t.getAttribute("type")), v.push({
                            type: c,
                            url: a
                        });
                        else
                            for (o = 0; o < t.childNodes.length; o++) d = t.childNodes[o], 1 == d.nodeType && "source" == d.tagName.toLowerCase() && (a = d.getAttribute("src"), c = this.formatType(a, d.getAttribute("type")), g = d.getAttribute("media"), (!g || !window.matchMedia || window.matchMedia && window.matchMedia(g).matches) && v.push({
                                type: c,
                                url: a
                            }));
                        if (!r && v.length > 0 && null !== v[0].url && this.getTypeFromFile(v[0].url).indexOf("audio") > -1 && (b.isVideo = !1), e.MediaFeatures.isBustedAndroid && (t.canPlayType = function(e) {
                                return null !== e.match(/video\/(mp4|m4v)/gi) ? "maybe" : ""
                            }), e.MediaFeatures.isChromium && (t.canPlayType = function(e) {
                                return null !== e.match(/video\/(webm|ogv|ogg)/gi) ? "maybe" : ""
                            }), !(!i || "auto" !== n.mode && "auto_plugin" !== n.mode && "native" !== n.mode || e.MediaFeatures.isBustedNativeHTTPS && n.httpsBasicAuthSite === !0)) {
                            for (r || (m = document.createElement(b.isVideo ? "video" : "audio"), t.parentNode.insertBefore(m, t), t.style.display = "none", b.htmlMediaElement = t = m), o = 0; o < v.length; o++)
                                if ("video/m3u8" == v[o].type || "" !== t.canPlayType(v[o].type).replace(/no/, "") || "" !== t.canPlayType(v[o].type.replace(/mp3/, "mpeg")).replace(/no/, "") || "" !== t.canPlayType(v[o].type.replace(/m4a/, "mp4")).replace(/no/, "")) {
                                    b.method = "native", b.url = v[o].url;
                                    break
                                }
                            if ("native" === b.method && (null !== b.url && (t.src = b.url), "auto_plugin" !== n.mode)) return b
                        }
                        if ("auto" === n.mode || "auto_plugin" === n.mode || "shim" === n.mode)
                            for (o = 0; o < v.length; o++)
                                for (c = v[o].type, s = 0; s < n.plugins.length; s++)
                                    for (p = n.plugins[s], f = e.plugins[p], u = 0; u < f.length; u++)
                                        if (h = f[u], null == h.version || e.PluginDetector.hasPluginVersion(p, h.version))
                                            for (l = 0; l < h.types.length; l++)
                                                if (c == h.types[l]) return b.method = p, b.url = v[o].url, b;
                        return "auto_plugin" === n.mode && "native" === b.method ? b : ("" === b.method && v.length > 0 && (b.url = v[0].url), b)
                    },
                    formatType: function(e, t) {
                        return e && !t ? this.getTypeFromFile(e) : t && ~t.indexOf(";") ? t.substr(0, t.indexOf(";")) : t
                    },
                    getTypeFromFile: function(e) {
                        e = e.split("?")[0];
                        var t = e.substring(e.lastIndexOf(".") + 1).toLowerCase();
                        return (/(mp4|m4v|ogg|ogv|m3u8|webm|webmv|flv|wmv|mpeg|mov)/gi.test(t) ? "video" : "audio") + "/" + this.getTypeFromExtension(t)
                    },
                    getTypeFromExtension: function(e) {
                        switch (e) {
                            case "mp4":
                            case "m4v":
                            case "m4a":
                                return "mp4";
                            case "webm":
                            case "webma":
                            case "webmv":
                                return "webm";
                            case "ogg":
                            case "oga":
                            case "ogv":
                                return "ogg";
                            default:
                                return e
                        }
                    },
                    createErrorMessage: function(t, n, i) {
                        var r = t.htmlMediaElement,
                            a = document.createElement("div");
                        a.className = "me-cannotplay";
                        try {
                            a.style.width = r.width + "px", a.style.height = r.height + "px"
                        } catch (o) {}
                        a.innerHTML = n.customError ? n.customError : "" !== i ? '<a href="' + t.url + '"><img src="' + i + '" width="100%" height="100%" /></a>' : '<a href="' + t.url + '"><span>' + e.i18n.t("Download File") + "</span></a>", r.parentNode.insertBefore(a, r), r.style.display = "none", n.error(r)
                    },
                    createPlugin: function(t, n, i, r, a, o) {
                        var s, u, l, d = t.htmlMediaElement,
                            c = 1,
                            p = 1,
                            f = "me_" + t.method + "_" + e.meIndex++,
                            h = new e.PluginMediaElement(f, t.method, t.url),
                            m = document.createElement("div");
                        h.tagName = d.tagName;
                        for (var g = 0; g < d.attributes.length; g++) {
                            var v = d.attributes[g];
                            1 == v.specified && h.setAttribute(v.name, v.value)
                        }
                        for (u = d.parentNode; null !== u && "body" !== u.tagName.toLowerCase() && null != u.parentNode;) {
                            if ("p" === u.parentNode.tagName.toLowerCase()) {
                                u.parentNode.parentNode.insertBefore(u, u.parentNode);
                                break
                            }
                            u = u.parentNode
                        }
                        switch (t.isVideo ? (c = n.pluginWidth > 0 ? n.pluginWidth : n.videoWidth > 0 ? n.videoWidth : null !== d.getAttribute("width") ? d.getAttribute("width") : n.defaultVideoWidth, p = n.pluginHeight > 0 ? n.pluginHeight : n.videoHeight > 0 ? n.videoHeight : null !== d.getAttribute("height") ? d.getAttribute("height") : n.defaultVideoHeight, c = e.Utility.encodeUrl(c), p = e.Utility.encodeUrl(p)) : n.enablePluginDebug && (c = 320, p = 240), h.success = n.success, e.MediaPluginBridge.registerPluginElement(f, h, d), m.className = "me-plugin", m.id = f + "_container", t.isVideo ? d.parentNode.insertBefore(m, d) : document.body.insertBefore(m, document.body.childNodes[0]), l = ["id=" + f, "jsinitfunction=mejs.MediaPluginBridge.initPlugin", "jscallbackfunction=mejs.MediaPluginBridge.fireEvent", "isvideo=" + (t.isVideo ? "true" : "false"), "autoplay=" + (r ? "true" : "false"), "preload=" + a, "width=" + c, "startvolume=" + n.startVolume, "timerrate=" + n.timerRate, "flashstreamer=" + n.flashStreamer, "height=" + p, "pseudostreamstart=" + n.pseudoStreamingStartQueryParam], null !== t.url && ("flash" == t.method ? l.push("file=" + e.Utility.encodeUrl(t.url)) : l.push("file=" + t.url)), n.enablePluginDebug && l.push("debug=true"), n.enablePluginSmoothing && l.push("smoothing=true"), n.enablePseudoStreaming && l.push("pseudostreaming=true"), o && l.push("controls=true"), n.pluginVars && (l = l.concat(n.pluginVars)), t.method) {
                            case "silverlight":
                                m.innerHTML = '<object data="data:application/x-silverlight-2," type="application/x-silverlight-2" id="' + f + '" name="' + f + '" width="' + c + '" height="' + p + '" class="mejs-shim"><param name="initParams" value="' + l.join(",") + '" /><param name="windowless" value="true" /><param name="background" value="black" /><param name="minRuntimeVersion" value="3.0.0.0" /><param name="autoUpgrade" value="true" /><param name="source" value="' + n.pluginPath + n.silverlightName + '" /></object>';
                                break;
                            case "flash":
                                e.MediaFeatures.isIE ? (s = document.createElement("div"), m.appendChild(s), s.outerHTML = '<object classid="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000" codebase="//download.macromedia.com/pub/shockwave/cabs/flash/swflash.cab" id="' + f + '" width="' + c + '" height="' + p + '" class="mejs-shim"><param name="movie" value="' + n.pluginPath + n.flashName + "?x=" + new Date + '" /><param name="flashvars" value="' + l.join("&amp;") + '" /><param name="quality" value="high" /><param name="bgcolor" value="#000000" /><param name="wmode" value="transparent" /><param name="allowScriptAccess" value="always" /><param name="allowFullScreen" value="true" /><param name="scale" value="default" /></object>') : m.innerHTML = '<embed id="' + f + '" name="' + f + '" play="true" loop="false" quality="high" bgcolor="#000000" wmode="transparent" allowScriptAccess="always" allowFullScreen="true" type="application/x-shockwave-flash" pluginspage="//www.macromedia.com/go/getflashplayer" src="' + n.pluginPath + n.flashName + '" flashvars="' + l.join("&") + '" width="' + c + '" height="' + p + '" scale="default"class="mejs-shim"></embed>';
                                break;
                            case "youtube":
                                var b; - 1 != t.url.lastIndexOf("youtu.be") ? (b = t.url.substr(t.url.lastIndexOf("/") + 1), -1 != b.indexOf("?") && (b = b.substr(0, b.indexOf("?")))) : b = t.url.substr(t.url.lastIndexOf("=") + 1), youtubeSettings = {
                                    container: m,
                                    containerId: m.id,
                                    pluginMediaElement: h,
                                    pluginId: f,
                                    videoId: b,
                                    height: p,
                                    width: c
                                }, e.PluginDetector.hasPluginVersion("flash", [10, 0, 0]) ? e.YouTubeApi.createFlash(youtubeSettings) : e.YouTubeApi.enqueueIframe(youtubeSettings);
                                break;
                            case "vimeo":
                                var y = f + "_player";
                                if (h.vimeoid = t.url.substr(t.url.lastIndexOf("/") + 1), m.innerHTML = '<iframe src="//player.vimeo.com/video/' + h.vimeoid + "?api=1&portrait=0&byline=0&title=0&player_id=" + y + '" width="' + c + '" height="' + p + '" frameborder="0" class="mejs-shim" id="' + y + '" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe>', "function" == typeof $f) {
                                    var w = $f(m.childNodes[0]);
                                    w.addEvent("ready", function() {
                                        function t(e, t, n, i) {
                                            var r = {
                                                type: n,
                                                target: t
                                            };
                                            "timeupdate" == n && (t.currentTime = r.currentTime = i.seconds, t.duration = r.duration = i.duration), t.dispatchEvent(r.type, r)
                                        }
                                        w.playVideo = function() {
                                            w.api("play")
                                        }, w.stopVideo = function() {
                                            w.api("unload")
                                        }, w.pauseVideo = function() {
                                            w.api("pause")
                                        }, w.seekTo = function(e) {
                                            w.api("seekTo", e)
                                        }, w.setVolume = function(e) {
                                            w.api("setVolume", e)
                                        }, w.setMuted = function(e) {
                                            e ? (w.lastVolume = w.api("getVolume"), w.api("setVolume", 0)) : (w.api("setVolume", w.lastVolume), delete w.lastVolume)
                                        }, w.addEvent("play", function() {
                                            t(w, h, "play"), t(w, h, "playing")
                                        }), w.addEvent("pause", function() {
                                            t(w, h, "pause")
                                        }), w.addEvent("finish", function() {
                                            t(w, h, "ended")
                                        }), w.addEvent("playProgress", function(e) {
                                            t(w, h, "timeupdate", e)
                                        }), h.pluginElement = m, h.pluginApi = w, e.MediaPluginBridge.initPlugin(f)
                                    })
                                } else console.warn("You need to include froogaloop for vimeo to work")
                        }
                        return d.style.display = "none", d.removeAttribute("autoplay"), h
                    },
                    updateNative: function(t, n) {
                        var i, r = t.htmlMediaElement;
                        for (i in e.HtmlMediaElement) r[i] = e.HtmlMediaElement[i];
                        return n.success(r, r), r
                    }
                }, e.YouTubeApi = {
                    isIframeStarted: !1,
                    isIframeLoaded: !1,
                    loadIframeApi: function() {
                        if (!this.isIframeStarted) {
                            var e = document.createElement("script");
                            e.src = "//www.youtube.com/player_api";
                            var t = document.getElementsByTagName("script")[0];
                            t.parentNode.insertBefore(e, t), this.isIframeStarted = !0
                        }
                    },
                    iframeQueue: [],
                    enqueueIframe: function(e) {
                        this.isLoaded ? this.createIframe(e) : (this.loadIframeApi(), this.iframeQueue.push(e))
                    },
                    createIframe: function(t) {
                        var n = t.pluginMediaElement,
                            i = new YT.Player(t.containerId, {
                                height: t.height,
                                width: t.width,
                                videoId: t.videoId,
                                playerVars: {
                                    controls: 0
                                },
                                events: {
                                    onReady: function() {
                                        t.pluginMediaElement.pluginApi = i, e.MediaPluginBridge.initPlugin(t.pluginId), setInterval(function() {
                                            e.YouTubeApi.createEvent(i, n, "timeupdate")
                                        }, 250)
                                    },
                                    onStateChange: function(t) {
                                        e.YouTubeApi.handleStateChange(t.data, i, n)
                                    }
                                }
                            })
                    },
                    createEvent: function(e, t, n) {
                        var i = {
                            type: n,
                            target: t
                        };
                        if (e && e.getDuration) {
                            t.currentTime = i.currentTime = e.getCurrentTime(), t.duration = i.duration = e.getDuration(), i.paused = t.paused, i.ended = t.ended, i.muted = e.isMuted(), i.volume = e.getVolume() / 100, i.bytesTotal = e.getVideoBytesTotal(), i.bufferedBytes = e.getVideoBytesLoaded();
                            var r = i.bufferedBytes / i.bytesTotal * i.duration;
                            i.target.buffered = i.buffered = {
                                start: function() {
                                    return 0
                                },
                                end: function() {
                                    return r
                                },
                                length: 1
                            }
                        }
                        t.dispatchEvent(i.type, i)
                    },
                    iFrameReady: function() {
                        for (this.isLoaded = !0, this.isIframeLoaded = !0; this.iframeQueue.length > 0;) {
                            var e = this.iframeQueue.pop();
                            this.createIframe(e)
                        }
                    },
                    flashPlayers: {},
                    createFlash: function(t) {
                        this.flashPlayers[t.pluginId] = t;
                        var n, i = "//www.youtube.com/apiplayer?enablejsapi=1&amp;playerapiid=" + t.pluginId + "&amp;version=3&amp;autoplay=0&amp;controls=0&amp;modestbranding=1&loop=0";
                        e.MediaFeatures.isIE ? (n = document.createElement("div"), t.container.appendChild(n), n.outerHTML = '<object classid="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000" codebase="//download.macromedia.com/pub/shockwave/cabs/flash/swflash.cab" id="' + t.pluginId + '" width="' + t.width + '" height="' + t.height + '" class="mejs-shim"><param name="movie" value="' + i + '" /><param name="wmode" value="transparent" /><param name="allowScriptAccess" value="always" /><param name="allowFullScreen" value="true" /></object>') : t.container.innerHTML = '<object type="application/x-shockwave-flash" id="' + t.pluginId + '" data="' + i + '" width="' + t.width + '" height="' + t.height + '" style="visibility: visible; " class="mejs-shim"><param name="allowScriptAccess" value="always"><param name="wmode" value="transparent"></object>'
                    },
                    flashReady: function(t) {
                        var n = this.flashPlayers[t],
                            i = document.getElementById(t),
                            r = n.pluginMediaElement;
                        r.pluginApi = r.pluginElement = i, e.MediaPluginBridge.initPlugin(t), i.cueVideoById(n.videoId);
                        var a = n.containerId + "_callback";
                        window[a] = function(t) {
                            e.YouTubeApi.handleStateChange(t, i, r)
                        }, i.addEventListener("onStateChange", a), setInterval(function() {
                            e.YouTubeApi.createEvent(i, r, "timeupdate")
                        }, 250), e.YouTubeApi.createEvent(i, r, "canplay")
                    },
                    handleStateChange: function(t, n, i) {
                        switch (t) {
                            case -1:
                                i.paused = !0, i.ended = !0, e.YouTubeApi.createEvent(n, i, "loadedmetadata");
                                break;
                            case 0:
                                i.paused = !1, i.ended = !0, e.YouTubeApi.createEvent(n, i, "ended");
                                break;
                            case 1:
                                i.paused = !1, i.ended = !1, e.YouTubeApi.createEvent(n, i, "play"), e.YouTubeApi.createEvent(n, i, "playing");
                                break;
                            case 2:
                                i.paused = !0, i.ended = !1, e.YouTubeApi.createEvent(n, i, "pause");
                                break;
                            case 3:
                                e.YouTubeApi.createEvent(n, i, "progress");
                                break;
                            case 5:
                        }
                    }
                }, window.mejs = e, window.MediaElement = e.MediaElement,
                function(e, t) {
                    "use strict";
                    var n = {
                        locale: {
                            language: t.i18n && t.i18n.locale.language || "",
                            strings: t.i18n && t.i18n.locale.strings || {}
                        },
                        ietf_lang_regex: /^(x\-)?[a-z]{2,}(\-\w{2,})?(\-\w{2,})?$/,
                        methods: {}
                    };
                    n.getLanguage = function() {
                        var e = n.locale.language || window.navigator.userLanguage || window.navigator.language;
                        return n.ietf_lang_regex.exec(e) ? e : null
                    }, "undefined" != typeof mejsL10n && (n.locale.language = mejsL10n.language), n.methods.checkPlain = function(e) {
                        var t, n, i = {
                            "&": "&amp;",
                            '"': "&quot;",
                            "<": "&lt;",
                            ">": "&gt;"
                        };
                        e = String(e);
                        for (t in i) i.hasOwnProperty(t) && (n = new RegExp(t, "g"), e = e.replace(n, i[t]));
                        return e
                    }, n.methods.t = function(e, t) {
                        return n.locale.strings && n.locale.strings[t.context] && n.locale.strings[t.context][e] && (e = n.locale.strings[t.context][e]), n.methods.checkPlain(e)
                    }, n.t = function(e, t) {
                        if ("string" == typeof e && e.length > 0) {
                            var i = n.getLanguage();
                            return t = t || {
                                context: i
                            }, n.methods.t(e, t)
                        }
                        throw {
                            name: "InvalidArgumentException",
                            message: "First argument is either not a string or empty."
                        }
                    }, t.i18n = n
                }(document, e),
                function(e) {
                    "use strict";
                    "undefined" != typeof mejsL10n && (e[mejsL10n.language] = mejsL10n.strings)
                }(e.i18n.locale.strings)
        }).call(this, e("b55mWE"), "undefined" != typeof self ? self : "undefined" != typeof window ? window : {}, e("buffer").Buffer, arguments[3], arguments[4], arguments[5], arguments[6], "/../../bower_components/mediaelement/build/mediaelement.js", "/../../bower_components/mediaelement/build")
    }, {
        b55mWE: 4,
        buffer: 3
    }],
    2: [function(e, t, n) {
        (function() {
            var e = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
            ! function(t) {
                "use strict";

                function n(e) {
                    var t = e.charCodeAt(0);
                    return t === o || t === c ? 62 : t === s || t === p ? 63 : u > t ? -1 : u + 10 > t ? t - u + 26 + 26 : d + 26 > t ? t - d : l + 26 > t ? t - l + 26 : void 0
                }

                function i(e) {
                    function t(e) {
                        l[c++] = e
                    }
                    var i, r, o, s, u, l;
                    if (e.length % 4 > 0) throw new Error("Invalid string. Length must be a multiple of 4");
                    var d = e.length;
                    u = "=" === e.charAt(d - 2) ? 2 : "=" === e.charAt(d - 1) ? 1 : 0, l = new a(3 * e.length / 4 - u), o = u > 0 ? e.length - 4 : e.length;
                    var c = 0;
                    for (i = 0, r = 0; o > i; i += 4, r += 3) s = n(e.charAt(i)) << 18 | n(e.charAt(i + 1)) << 12 | n(e.charAt(i + 2)) << 6 | n(e.charAt(i + 3)), t((16711680 & s) >> 16), t((65280 & s) >> 8), t(255 & s);
                    return 2 === u ? (s = n(e.charAt(i)) << 2 | n(e.charAt(i + 1)) >> 4, t(255 & s)) : 1 === u && (s = n(e.charAt(i)) << 10 | n(e.charAt(i + 1)) << 4 | n(e.charAt(i + 2)) >> 2, t(s >> 8 & 255), t(255 & s)), l
                }

                function r(t) {
                    function n(t) {
                        return e.charAt(t)
                    }

                    function i(e) {
                        return n(e >> 18 & 63) + n(e >> 12 & 63) + n(e >> 6 & 63) + n(63 & e)
                    }
                    var r, a, o, s = t.length % 3,
                        u = "";
                    for (r = 0, o = t.length - s; o > r; r += 3) a = (t[r] << 16) + (t[r + 1] << 8) + t[r + 2], u += i(a);
                    switch (s) {
                        case 1:
                            a = t[t.length - 1], u += n(a >> 2), u += n(a << 4 & 63), u += "==";
                            break;
                        case 2:
                            a = (t[t.length - 2] << 8) + t[t.length - 1], u += n(a >> 10), u += n(a >> 4 & 63), u += n(a << 2 & 63), u += "="
                    }
                    return u
                }
                var a = "undefined" != typeof Uint8Array ? Uint8Array : Array,
                    o = "+".charCodeAt(0),
                    s = "/".charCodeAt(0),
                    u = "0".charCodeAt(0),
                    l = "a".charCodeAt(0),
                    d = "A".charCodeAt(0),
                    c = "-".charCodeAt(0),
                    p = "_".charCodeAt(0);
                t.toByteArray = i, t.fromByteArray = r
            }("undefined" == typeof n ? this.base64js = {} : n)
        }).call(this, e("b55mWE"), "undefined" != typeof self ? self : "undefined" != typeof window ? window : {}, e("buffer").Buffer, arguments[3], arguments[4], arguments[5], arguments[6], "/../../node_modules/base64-js/lib/b64.js", "/../../node_modules/base64-js/lib")
    }, {
        b55mWE: 4,
        buffer: 3
    }],
    3: [function(e, t, n) {
        (function(t, i, r) {
            function r(e, t, n) {
                if (!(this instanceof r)) return new r(e, t, n);
                var i = typeof e;
                if ("base64" === t && "string" === i)
                    for (e = B(e); e.length % 4 !== 0;) e += "=";
                var a;
                if ("number" === i) a = F(e);
                else if ("string" === i) a = r.byteLength(e, t);
                else {
                    if ("object" !== i) throw new Error("First argument needs to be a number, array or string.");
                    a = F(e.length)
                }
                var o;
                r._useTypedArrays ? o = r._augment(new Uint8Array(a)) : (o = this, o.length = a, o._isBuffer = !0);
                var s;
                if (r._useTypedArrays && "number" == typeof e.byteLength) o._set(e);
                else if (U(e))
                    for (s = 0; a > s; s++) o[s] = r.isBuffer(e) ? e.readUInt8(s) : e[s];
                else if ("string" === i) o.write(e, 0, t);
                else if ("number" === i && !r._useTypedArrays && !n)
                    for (s = 0; a > s; s++) o[s] = 0;
                return o
            }

            function a(e, t, n, i) {
                n = Number(n) || 0;
                var a = e.length - n;
                i ? (i = Number(i), i > a && (i = a)) : i = a;
                var o = t.length;
                R(o % 2 === 0, "Invalid hex string"), i > o / 2 && (i = o / 2);
                for (var s = 0; i > s; s++) {
                    var u = parseInt(t.substr(2 * s, 2), 16);
                    R(!isNaN(u), "Invalid hex string"), e[n + s] = u
                }
                return r._charsWritten = 2 * s, s
            }

            function o(e, t, n, i) {
                var a = r._charsWritten = _(P(t), e, n, i);
                return a
            }

            function s(e, t, n, i) {
                var a = r._charsWritten = _($(t), e, n, i);
                return a
            }

            function u(e, t, n, i) {
                return s(e, t, n, i)
            }

            function l(e, t, n, i) {
                var a = r._charsWritten = _(W(t), e, n, i);
                return a
            }

            function d(e, t, n, i) {
                var a = r._charsWritten = _(j(t), e, n, i);
                return a
            }

            function c(e, t, n) {
                return 0 === t && n === e.length ? H.fromByteArray(e) : H.fromByteArray(e.slice(t, n))
            }

            function p(e, t, n) {
                var i = "",
                    r = "";
                n = Math.min(e.length, n);
                for (var a = t; n > a; a++) e[a] <= 127 ? (i += D(r) + String.fromCharCode(e[a]), r = "") : r += "%" + e[a].toString(16);
                return i + D(r)
            }

            function f(e, t, n) {
                var i = "";
                n = Math.min(e.length, n);
                for (var r = t; n > r; r++) i += String.fromCharCode(e[r]);
                return i
            }

            function h(e, t, n) {
                return f(e, t, n)
            }

            function m(e, t, n) {
                var i = e.length;
                (!t || 0 > t) && (t = 0), (!n || 0 > n || n > i) && (n = i);
                for (var r = "", a = t; n > a; a++) r += N(e[a]);
                return r
            }

            function g(e, t, n) {
                for (var i = e.slice(t, n), r = "", a = 0; a < i.length; a += 2) r += String.fromCharCode(i[a] + 256 * i[a + 1]);
                return r
            }

            function v(e, t, n, i) {
                i || (R("boolean" == typeof n, "missing or invalid endian"), R(void 0 !== t && null !== t, "missing offset"), R(t + 1 < e.length, "Trying to read beyond buffer length"));
                var r = e.length;
                if (!(t >= r)) {
                    var a;
                    return n ? (a = e[t], r > t + 1 && (a |= e[t + 1] << 8)) : (a = e[t] << 8, r > t + 1 && (a |= e[t + 1])), a
                }
            }

            function b(e, t, n, i) {
                i || (R("boolean" == typeof n, "missing or invalid endian"), R(void 0 !== t && null !== t, "missing offset"), R(t + 3 < e.length, "Trying to read beyond buffer length"));
                var r = e.length;
                if (!(t >= r)) {
                    var a;
                    return n ? (r > t + 2 && (a = e[t + 2] << 16), r > t + 1 && (a |= e[t + 1] << 8), a |= e[t], r > t + 3 && (a += e[t + 3] << 24 >>> 0)) : (r > t + 1 && (a = e[t + 1] << 16), r > t + 2 && (a |= e[t + 2] << 8), r > t + 3 && (a |= e[t + 3]), a += e[t] << 24 >>> 0), a
                }
            }

            function y(e, t, n, i) {
                i || (R("boolean" == typeof n, "missing or invalid endian"), R(void 0 !== t && null !== t, "missing offset"), R(t + 1 < e.length, "Trying to read beyond buffer length"));
                var r = e.length;
                if (!(t >= r)) {
                    var a = v(e, t, n, !0),
                        o = 32768 & a;
                    return o ? -1 * (65535 - a + 1) : a
                }
            }

            function w(e, t, n, i) {
                i || (R("boolean" == typeof n, "missing or invalid endian"), R(void 0 !== t && null !== t, "missing offset"), R(t + 3 < e.length, "Trying to read beyond buffer length"));
                var r = e.length;
                if (!(t >= r)) {
                    var a = b(e, t, n, !0),
                        o = 2147483648 & a;
                    return o ? -1 * (4294967295 - a + 1) : a
                }
            }

            function E(e, t, n, i) {
                return i || (R("boolean" == typeof n, "missing or invalid endian"), R(t + 3 < e.length, "Trying to read beyond buffer length")), Y.read(e, t, n, 23, 4)
            }

            function T(e, t, n, i) {
                return i || (R("boolean" == typeof n, "missing or invalid endian"), R(t + 7 < e.length, "Trying to read beyond buffer length")), Y.read(e, t, n, 52, 8)
            }

            function C(e, t, n, i, r) {
                r || (R(void 0 !== t && null !== t, "missing value"), R("boolean" == typeof i, "missing or invalid endian"), R(void 0 !== n && null !== n, "missing offset"), R(n + 1 < e.length, "trying to write beyond buffer length"), V(t, 65535));
                var a = e.length;
                if (!(n >= a))
                    for (var o = 0, s = Math.min(a - n, 2); s > o; o++) e[n + o] = (t & 255 << 8 * (i ? o : 1 - o)) >>> 8 * (i ? o : 1 - o)
            }

            function S(e, t, n, i, r) {
                r || (R(void 0 !== t && null !== t, "missing value"), R("boolean" == typeof i, "missing or invalid endian"), R(void 0 !== n && null !== n, "missing offset"), R(n + 3 < e.length, "trying to write beyond buffer length"), V(t, 4294967295));
                var a = e.length;
                if (!(n >= a))
                    for (var o = 0, s = Math.min(a - n, 4); s > o; o++) e[n + o] = t >>> 8 * (i ? o : 3 - o) & 255
            }

            function A(e, t, n, i, r) {
                r || (R(void 0 !== t && null !== t, "missing value"), R("boolean" == typeof i, "missing or invalid endian"), R(void 0 !== n && null !== n, "missing offset"), R(n + 1 < e.length, "Trying to write beyond buffer length"), z(t, 32767, -32768));
                var a = e.length;
                n >= a || (t >= 0 ? C(e, t, n, i, r) : C(e, 65535 + t + 1, n, i, r))
            }

            function I(e, t, n, i, r) {
                r || (R(void 0 !== t && null !== t, "missing value"), R("boolean" == typeof i, "missing or invalid endian"), R(void 0 !== n && null !== n, "missing offset"), R(n + 3 < e.length, "Trying to write beyond buffer length"), z(t, 2147483647, -2147483648));
                var a = e.length;
                n >= a || (t >= 0 ? S(e, t, n, i, r) : S(e, 4294967295 + t + 1, n, i, r))
            }

            function k(e, t, n, i, r) {
                r || (R(void 0 !== t && null !== t, "missing value"), R("boolean" == typeof i, "missing or invalid endian"), R(void 0 !== n && null !== n, "missing offset"), R(n + 3 < e.length, "Trying to write beyond buffer length"), O(t, 3.4028234663852886e38, -3.4028234663852886e38));
                var a = e.length;
                n >= a || Y.write(e, t, n, i, 23, 4)
            }

            function M(e, t, n, i, r) {
                r || (R(void 0 !== t && null !== t, "missing value"), R("boolean" == typeof i, "missing or invalid endian"), R(void 0 !== n && null !== n, "missing offset"), R(n + 7 < e.length, "Trying to write beyond buffer length"), O(t, 1.7976931348623157e308, -1.7976931348623157e308));
                var a = e.length;
                n >= a || Y.write(e, t, n, i, 52, 8)
            }

            function B(e) {
                return e.trim ? e.trim() : e.replace(/^\s+|\s+$/g, "")
            }

            function x(e, t, n) {
                return "number" != typeof e ? n : (e = ~~e, e >= t ? t : e >= 0 ? e : (e += t, e >= 0 ? e : 0))
            }

            function F(e) {
                return e = ~~Math.ceil(+e), 0 > e ? 0 : e
            }

            function L(e) {
                return (Array.isArray || function(e) {
                    return "[object Array]" === Object.prototype.toString.call(e)
                })(e)
            }

            function U(e) {
                return L(e) || r.isBuffer(e) || e && "object" == typeof e && "number" == typeof e.length
            }

            function N(e) {
                return 16 > e ? "0" + e.toString(16) : e.toString(16)
            }

            function P(e) {
                for (var t = [], n = 0; n < e.length; n++) {
                    var i = e.charCodeAt(n);
                    if (127 >= i) t.push(e.charCodeAt(n));
                    else {
                        var r = n;
                        i >= 55296 && 57343 >= i && n++;
                        for (var a = encodeURIComponent(e.slice(r, n + 1)).substr(1).split("%"), o = 0; o < a.length; o++) t.push(parseInt(a[o], 16))
                    }
                }
                return t
            }

            function $(e) {
                for (var t = [], n = 0; n < e.length; n++) t.push(255 & e.charCodeAt(n));
                return t
            }

            function j(e) {
                for (var t, n, i, r = [], a = 0; a < e.length; a++) t = e.charCodeAt(a), n = t >> 8, i = t % 256, r.push(i), r.push(n);
                return r
            }

            function W(e) {
                return H.toByteArray(e)
            }

            function _(e, t, n, i) {
                for (var r = 0; i > r && !(r + n >= t.length || r >= e.length); r++) t[r + n] = e[r];
                return r
            }

            function D(e) {
                try {
                    return decodeURIComponent(e)
                } catch (t) {
                    return String.fromCharCode(65533)
                }
            }

            function V(e, t) {
                R("number" == typeof e, "cannot write a non-number as a number"), R(e >= 0, "specified a negative value for writing an unsigned value"), R(t >= e, "value is larger than maximum value for type"), R(Math.floor(e) === e, "value has a fractional component")
            }

            function z(e, t, n) {
                R("number" == typeof e, "cannot write a non-number as a number"), R(t >= e, "value larger than maximum allowed value"), R(e >= n, "value smaller than minimum allowed value"), R(Math.floor(e) === e, "value has a fractional component")
            }

            function O(e, t, n) {
                R("number" == typeof e, "cannot write a non-number as a number"), R(t >= e, "value larger than maximum allowed value"), R(e >= n, "value smaller than minimum allowed value")
            }

            function R(e, t) {
                if (!e) throw new Error(t || "Failed assertion")
            }
            var H = e("base64-js"),
                Y = e("ieee754");
            n.Buffer = r, n.SlowBuffer = r, n.INSPECT_MAX_BYTES = 50, r.poolSize = 8192, r._useTypedArrays = function() {
                try {
                    var e = new ArrayBuffer(0),
                        t = new Uint8Array(e);
                    return t.foo = function() {
                        return 42
                    }, 42 === t.foo() && "function" == typeof t.subarray
                } catch (n) {
                    return !1
                }
            }(), r.isEncoding = function(e) {
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
            }, r.isBuffer = function(e) {
                return !(null === e || void 0 === e || !e._isBuffer)
            }, r.byteLength = function(e, t) {
                var n;
                switch (e += "", t || "utf8") {
                    case "hex":
                        n = e.length / 2;
                        break;
                    case "utf8":
                    case "utf-8":
                        n = P(e).length;
                        break;
                    case "ascii":
                    case "binary":
                    case "raw":
                        n = e.length;
                        break;
                    case "base64":
                        n = W(e).length;
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
            }, r.concat = function(e, t) {
                if (R(L(e), "Usage: Buffer.concat(list, [totalLength])\nlist should be an Array."), 0 === e.length) return new r(0);
                if (1 === e.length) return e[0];
                var n;
                if ("number" != typeof t)
                    for (t = 0, n = 0; n < e.length; n++) t += e[n].length;
                var i = new r(t),
                    a = 0;
                for (n = 0; n < e.length; n++) {
                    var o = e[n];
                    o.copy(i, a), a += o.length
                }
                return i
            }, r.prototype.write = function(e, t, n, i) {
                if (isFinite(t)) isFinite(n) || (i = n, n = void 0);
                else {
                    var r = i;
                    i = t, t = n, n = r
                }
                t = Number(t) || 0;
                var c = this.length - t;
                n ? (n = Number(n), n > c && (n = c)) : n = c, i = String(i || "utf8").toLowerCase();
                var p;
                switch (i) {
                    case "hex":
                        p = a(this, e, t, n);
                        break;
                    case "utf8":
                    case "utf-8":
                        p = o(this, e, t, n);
                        break;
                    case "ascii":
                        p = s(this, e, t, n);
                        break;
                    case "binary":
                        p = u(this, e, t, n);
                        break;
                    case "base64":
                        p = l(this, e, t, n);
                        break;
                    case "ucs2":
                    case "ucs-2":
                    case "utf16le":
                    case "utf-16le":
                        p = d(this, e, t, n);
                        break;
                    default:
                        throw new Error("Unknown encoding")
                }
                return p
            }, r.prototype.toString = function(e, t, n) {
                var i = this;
                if (e = String(e || "utf8").toLowerCase(), t = Number(t) || 0, n = void 0 !== n ? Number(n) : n = i.length, n === t) return "";
                var r;
                switch (e) {
                    case "hex":
                        r = m(i, t, n);
                        break;
                    case "utf8":
                    case "utf-8":
                        r = p(i, t, n);
                        break;
                    case "ascii":
                        r = f(i, t, n);
                        break;
                    case "binary":
                        r = h(i, t, n);
                        break;
                    case "base64":
                        r = c(i, t, n);
                        break;
                    case "ucs2":
                    case "ucs-2":
                    case "utf16le":
                    case "utf-16le":
                        r = g(i, t, n);
                        break;
                    default:
                        throw new Error("Unknown encoding")
                }
                return r
            }, r.prototype.toJSON = function() {
                return {
                    type: "Buffer",
                    data: Array.prototype.slice.call(this._arr || this, 0)
                }
            }, r.prototype.copy = function(e, t, n, i) {
                var a = this;
                if (n || (n = 0), i || 0 === i || (i = this.length), t || (t = 0), i !== n && 0 !== e.length && 0 !== a.length) {
                    R(i >= n, "sourceEnd < sourceStart"), R(t >= 0 && t < e.length, "targetStart out of bounds"), R(n >= 0 && n < a.length, "sourceStart out of bounds"), R(i >= 0 && i <= a.length, "sourceEnd out of bounds"), i > this.length && (i = this.length), e.length - t < i - n && (i = e.length - t + n);
                    var o = i - n;
                    if (100 > o || !r._useTypedArrays)
                        for (var s = 0; o > s; s++) e[s + t] = this[s + n];
                    else e._set(this.subarray(n, n + o), t)
                }
            }, r.prototype.slice = function(e, t) {
                var n = this.length;
                if (e = x(e, n, 0), t = x(t, n, n), r._useTypedArrays) return r._augment(this.subarray(e, t));
                for (var i = t - e, a = new r(i, void 0, !0), o = 0; i > o; o++) a[o] = this[o + e];
                return a
            }, r.prototype.get = function(e) {
                return console.log(".get() is deprecated. Access using array indexes instead."), this.readUInt8(e)
            }, r.prototype.set = function(e, t) {
                return console.log(".set() is deprecated. Access using array indexes instead."), this.writeUInt8(e, t)
            }, r.prototype.readUInt8 = function(e, t) {
                return t || (R(void 0 !== e && null !== e, "missing offset"), R(e < this.length, "Trying to read beyond buffer length")), e >= this.length ? void 0 : this[e]
            }, r.prototype.readUInt16LE = function(e, t) {
                return v(this, e, !0, t)
            }, r.prototype.readUInt16BE = function(e, t) {
                return v(this, e, !1, t)
            }, r.prototype.readUInt32LE = function(e, t) {
                return b(this, e, !0, t)
            }, r.prototype.readUInt32BE = function(e, t) {
                return b(this, e, !1, t)
            }, r.prototype.readInt8 = function(e, t) {
                if (t || (R(void 0 !== e && null !== e, "missing offset"), R(e < this.length, "Trying to read beyond buffer length")), !(e >= this.length)) {
                    var n = 128 & this[e];
                    return n ? -1 * (255 - this[e] + 1) : this[e]
                }
            }, r.prototype.readInt16LE = function(e, t) {
                return y(this, e, !0, t)
            }, r.prototype.readInt16BE = function(e, t) {
                return y(this, e, !1, t)
            }, r.prototype.readInt32LE = function(e, t) {
                return w(this, e, !0, t)
            }, r.prototype.readInt32BE = function(e, t) {
                return w(this, e, !1, t)
            }, r.prototype.readFloatLE = function(e, t) {
                return E(this, e, !0, t)
            }, r.prototype.readFloatBE = function(e, t) {
                return E(this, e, !1, t)
            }, r.prototype.readDoubleLE = function(e, t) {
                return T(this, e, !0, t)
            }, r.prototype.readDoubleBE = function(e, t) {
                return T(this, e, !1, t)
            }, r.prototype.writeUInt8 = function(e, t, n) {
                n || (R(void 0 !== e && null !== e, "missing value"), R(void 0 !== t && null !== t, "missing offset"), R(t < this.length, "trying to write beyond buffer length"), V(e, 255)), t >= this.length || (this[t] = e)
            }, r.prototype.writeUInt16LE = function(e, t, n) {
                C(this, e, t, !0, n)
            }, r.prototype.writeUInt16BE = function(e, t, n) {
                C(this, e, t, !1, n)
            }, r.prototype.writeUInt32LE = function(e, t, n) {
                S(this, e, t, !0, n)
            }, r.prototype.writeUInt32BE = function(e, t, n) {
                S(this, e, t, !1, n)
            }, r.prototype.writeInt8 = function(e, t, n) {
                n || (R(void 0 !== e && null !== e, "missing value"), R(void 0 !== t && null !== t, "missing offset"), R(t < this.length, "Trying to write beyond buffer length"), z(e, 127, -128)), t >= this.length || (e >= 0 ? this.writeUInt8(e, t, n) : this.writeUInt8(255 + e + 1, t, n))
            }, r.prototype.writeInt16LE = function(e, t, n) {
                A(this, e, t, !0, n)
            }, r.prototype.writeInt16BE = function(e, t, n) {
                A(this, e, t, !1, n)
            }, r.prototype.writeInt32LE = function(e, t, n) {
                I(this, e, t, !0, n)
            }, r.prototype.writeInt32BE = function(e, t, n) {
                I(this, e, t, !1, n)
            }, r.prototype.writeFloatLE = function(e, t, n) {
                k(this, e, t, !0, n)
            }, r.prototype.writeFloatBE = function(e, t, n) {
                k(this, e, t, !1, n)
            }, r.prototype.writeDoubleLE = function(e, t, n) {
                M(this, e, t, !0, n)
            }, r.prototype.writeDoubleBE = function(e, t, n) {
                M(this, e, t, !1, n)
            }, r.prototype.fill = function(e, t, n) {
                if (e || (e = 0), t || (t = 0), n || (n = this.length), "string" == typeof e && (e = e.charCodeAt(0)), R("number" == typeof e && !isNaN(e), "value is not a number"), R(n >= t, "end < start"), n !== t && 0 !== this.length) {
                    R(t >= 0 && t < this.length, "start out of bounds"), R(n >= 0 && n <= this.length, "end out of bounds");
                    for (var i = t; n > i; i++) this[i] = e
                }
            }, r.prototype.inspect = function() {
                for (var e = [], t = this.length, i = 0; t > i; i++)
                    if (e[i] = N(this[i]), i === n.INSPECT_MAX_BYTES) {
                        e[i + 1] = "...";
                        break
                    }
                return "<Buffer " + e.join(" ") + ">"
            }, r.prototype.toArrayBuffer = function() {
                if ("undefined" != typeof Uint8Array) {
                    if (r._useTypedArrays) return new r(this).buffer;
                    for (var e = new Uint8Array(this.length), t = 0, n = e.length; n > t; t += 1) e[t] = this[t];
                    return e.buffer
                }
                throw new Error("Buffer.toArrayBuffer not supported in this browser")
            };
            var q = r.prototype;
            r._augment = function(e) {
                return e._isBuffer = !0, e._get = e.get, e._set = e.set, e.get = q.get, e.set = q.set, e.write = q.write, e.toString = q.toString, e.toLocaleString = q.toString, e.toJSON = q.toJSON, e.copy = q.copy, e.slice = q.slice, e.readUInt8 = q.readUInt8, e.readUInt16LE = q.readUInt16LE, e.readUInt16BE = q.readUInt16BE, e.readUInt32LE = q.readUInt32LE, e.readUInt32BE = q.readUInt32BE, e.readInt8 = q.readInt8, e.readInt16LE = q.readInt16LE, e.readInt16BE = q.readInt16BE, e.readInt32LE = q.readInt32LE, e.readInt32BE = q.readInt32BE, e.readFloatLE = q.readFloatLE, e.readFloatBE = q.readFloatBE, e.readDoubleLE = q.readDoubleLE, e.readDoubleBE = q.readDoubleBE, e.writeUInt8 = q.writeUInt8, e.writeUInt16LE = q.writeUInt16LE, e.writeUInt16BE = q.writeUInt16BE, e.writeUInt32LE = q.writeUInt32LE, e.writeUInt32BE = q.writeUInt32BE, e.writeInt8 = q.writeInt8, e.writeInt16LE = q.writeInt16LE, e.writeInt16BE = q.writeInt16BE, e.writeInt32LE = q.writeInt32LE, e.writeInt32BE = q.writeInt32BE, e.writeFloatLE = q.writeFloatLE, e.writeFloatBE = q.writeFloatBE, e.writeDoubleLE = q.writeDoubleLE, e.writeDoubleBE = q.writeDoubleBE, e.fill = q.fill, e.inspect = q.inspect, e.toArrayBuffer = q.toArrayBuffer, e
            }
        }).call(this, e("b55mWE"), "undefined" != typeof self ? self : "undefined" != typeof window ? window : {}, e("buffer").Buffer, arguments[3], arguments[4], arguments[5], arguments[6], "/../../node_modules/gulp-browserify/node_modules/buffer/index.js", "/../../node_modules/gulp-browserify/node_modules/buffer")
    }, {
        b55mWE: 4,
        "base64-js": 2,
        buffer: 3,
        ieee754: 5
    }],
    4: [function(e, t) {
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
                                var i = n.shift();
                                i()
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
        b55mWE: 4,
        buffer: 3
    }],
    5: [function(e, t, n) {
        (function() {
            n.read = function(e, t, n, i, r) {
                var a, o, s = 8 * r - i - 1,
                    u = (1 << s) - 1,
                    l = u >> 1,
                    d = -7,
                    c = n ? r - 1 : 0,
                    p = n ? -1 : 1,
                    f = e[t + c];
                for (c += p, a = f & (1 << -d) - 1, f >>= -d, d += s; d > 0; a = 256 * a + e[t + c], c += p, d -= 8);
                for (o = a & (1 << -d) - 1, a >>= -d, d += i; d > 0; o = 256 * o + e[t + c], c += p, d -= 8);
                if (0 === a) a = 1 - l;
                else {
                    if (a === u) return o ? 0 / 0 : 1 / 0 * (f ? -1 : 1);
                    o += Math.pow(2, i), a -= l
                }
                return (f ? -1 : 1) * o * Math.pow(2, a - i)
            }, n.write = function(e, t, n, i, r, a) {
                var o, s, u, l = 8 * a - r - 1,
                    d = (1 << l) - 1,
                    c = d >> 1,
                    p = 23 === r ? Math.pow(2, -24) - Math.pow(2, -77) : 0,
                    f = i ? 0 : a - 1,
                    h = i ? 1 : -1,
                    m = 0 > t || 0 === t && 0 > 1 / t ? 1 : 0;
                for (t = Math.abs(t), isNaN(t) || 1 / 0 === t ? (s = isNaN(t) ? 1 : 0, o = d) : (o = Math.floor(Math.log(t) / Math.LN2), t * (u = Math.pow(2, -o)) < 1 && (o--, u *= 2), t += o + c >= 1 ? p / u : p * Math.pow(2, 1 - c), t * u >= 2 && (o++, u /= 2), o + c >= d ? (s = 0, o = d) : o + c >= 1 ? (s = (t * u - 1) * Math.pow(2, r), o += c) : (s = t * Math.pow(2, c - 1) * Math.pow(2, r), o = 0)); r >= 8; e[n + f] = 255 & s, f += h, s /= 256, r -= 8);
                for (o = o << r | s, l += r; l > 0; e[n + f] = 255 & o, f += h, o /= 256, l -= 8);
                e[n + f - h] |= 128 * m
            }
        }).call(this, e("b55mWE"), "undefined" != typeof self ? self : "undefined" != typeof window ? window : {}, e("buffer").Buffer, arguments[3], arguments[4], arguments[5], arguments[6], "/../../node_modules/ieee754/index.js", "/../../node_modules/ieee754")
    }, {
        b55mWE: 4,
        buffer: 3
    }],
    6: [function(e, t) {
        (function() {
            ! function(n, i) {
                "use strict";
                "object" == typeof t && t.exports && "function" == typeof e ? t.exports = i() : "function" == typeof define && "object" == typeof define.amd ? define(i) : n.log = i()
            }(this, function() {
                "use strict";

                function e(e) {
                    return typeof console === s ? !1 : void 0 !== console[e] ? t(console, e) : void 0 !== console.log ? t(console, "log") : o
                }

                function t(e, t) {
                    var n = e[t];
                    if ("function" == typeof n.bind) return n.bind(e);
                    try {
                        return Function.prototype.bind.call(n, e)
                    } catch (i) {
                        return function() {
                            return Function.prototype.apply.apply(n, [e, arguments])
                        }
                    }
                }

                function n(e, t, n) {
                    return function() {
                        typeof console !== s && (i.call(this, t, n), this[e].apply(this, arguments))
                    }
                }

                function i(e, t) {
                    for (var n = 0; n < u.length; n++) {
                        var i = u[n];
                        this[i] = e > n ? o : this.methodFactory(i, e, t)
                    }
                }

                function r(t) {
                    return e(t) || n.apply(this, arguments)
                }

                function a(e, t, n) {
                    function a(e) {
                        var t = (u[e] || "silent").toUpperCase();
                        try {
                            return window.localStorage[c] = t, void 0
                        } catch (n) {}
                        try {
                            window.document.cookie = encodeURIComponent(c) + "=" + t + ";"
                        } catch (n) {}
                    }

                    function o() {
                        var e;
                        try {
                            e = window.localStorage[c]
                        } catch (t) {}
                        if (typeof e === s) try {
                            var n = window.document.cookie,
                                i = n.indexOf(encodeURIComponent(c) + "=");
                            i && (e = /^([^;]+)/.exec(n.slice(i))[1])
                        } catch (t) {}
                        return void 0 === d.levels[e] && (e = void 0), e
                    }
                    var l, d = this,
                        c = "loglevel";
                    e && (c += ":" + e), d.levels = {
                        TRACE: 0,
                        DEBUG: 1,
                        INFO: 2,
                        WARN: 3,
                        ERROR: 4,
                        SILENT: 5
                    }, d.methodFactory = n || r, d.getLevel = function() {
                        return l
                    }, d.setLevel = function(t, n) {
                        if ("string" == typeof t && void 0 !== d.levels[t.toUpperCase()] && (t = d.levels[t.toUpperCase()]), !("number" == typeof t && t >= 0 && t <= d.levels.SILENT)) throw "log.setLevel() called with invalid level: " + t;
                        return l = t, n !== !1 && a(t), i.call(d, t, e), typeof console === s && t < d.levels.SILENT ? "No console available for logging" : void 0
                    }, d.setDefaultLevel = function(e) {
                        o() || d.setLevel(e, !1)
                    }, d.enableAll = function(e) {
                        d.setLevel(d.levels.TRACE, e)
                    }, d.disableAll = function(e) {
                        d.setLevel(d.levels.SILENT, e)
                    };
                    var p = o();
                    null == p && (p = null == t ? "WARN" : t), d.setLevel(p, !1)
                }
                var o = function() {},
                    s = "undefined",
                    u = ["trace", "debug", "info", "warn", "error"],
                    l = new a,
                    d = {};
                l.getLogger = function(e) {
                    if ("string" != typeof e || "" === e) throw new TypeError("You must supply a name when creating a logger.");
                    var t = d[e];
                    return t || (t = d[e] = new a(e, l.getLevel(), l.methodFactory)), t
                };
                var c = typeof window !== s ? window.log : void 0;
                return l.noConflict = function() {
                    return typeof window !== s && window.log === l && (window.log = c), l
                }, l
            })
        }).call(this, e("b55mWE"), "undefined" != typeof self ? self : "undefined" != typeof window ? window : {}, e("buffer").Buffer, arguments[3], arguments[4], arguments[5], arguments[6], "/../../node_modules/loglevel/lib/loglevel.js", "/../../node_modules/loglevel/lib")
    }, {
        b55mWE: 4,
        buffer: 3
    }],
    7: [function(e, t) {
        (function() {
            "use strict";

            function n() {
                return $('<ul class="timecontrolbar"></ul>')
            }

            function i() {
                return $('<div class="controlbar bar"></div>')
            }

            function r(e) {
                return "number" == typeof e.currentTime && e.currentTime > 0
            }

            function a(e) {
                return function(t) {
                    u.debug("Controls", "controlbutton clicked", t), t.preventDefault(), u.debug("Controls", "player started?", r(this.player)), r(this.player) || this.player.play();
                    var n = e.bind(this);
                    n()
                }
            }

            function o(e) {
                this.player = e.player, this.timeline = e, this.box = i(), this.timeControlElement = n(), this.box.append(this.timeControlElement)
            }
            var s = e("./modules/chapter"),
                u = e("./logging").getLogger("Chapters");
            o.prototype.createTimeControls = function(e) {
                var t = e instanceof s;
                t || u.info("Controls", "createTimeControls", "no chapterTab found"), t && this.createButton("pwp-controls-previous-chapter", "Back to the previous chapter", function() {
                    var t = e.getActiveChapter();
                    return this.timeline.getTime() > t.start + 10 ? (u.debug("Controls", "Back to the beginning of the chapter", e.currentChapter, "from", this.timeline.getTime()), e.playCurrentChapter()) : (u.debug("Controls", "Back to the previous chapter", e.currentChapter), e.previous())
                }), this.createButton("pwp-controls-back-30", "30 seconds back", function() {
                    u.debug("Controls", "rewind before", this.timeline.getTime()), this.timeline.setTime(this.timeline.getTime() - 30), u.debug("Controls", "rewind after", this.timeline.getTime())
                }), this.createButton("pwp-controls-forward-30", "30 seconds ahead", function() {
                    u.debug("Controls", "ffwd before", this.timeline.getTime()), this.timeline.setTime(this.timeline.getTime() + 30), u.debug("Controls", "ffwd after", this.timeline.getTime())
                }), t && this.createButton("pwp-controls-next-chapter", "Jump to the next chapter", function() {
                    u.debug("Controls", "next Chapter before", this.timeline.getTime()), e.next(), u.debug("Controls", "next Chapter after", this.timeline.getTime())
                })
            }, o.prototype.createButton = function(e, t, n) {
                var i = $('<li><a href="#" class="button button-control" title="' + t + '"><i class="icon ' + e + '"></i></a></li>');
                this.timeControlElement.append(i);
                var r = a(n);
                i.on("click", r.bind(this))
            }, t.exports = o
        }).call(this, e("b55mWE"), "undefined" != typeof self ? self : "undefined" != typeof window ? window : {}, e("buffer").Buffer, arguments[3], arguments[4], arguments[5], arguments[6], "/controls.js", "/")
    }, {
        "./logging": 10,
        "./modules/chapter": 11,
        b55mWE: 4,
        buffer: 3
    }],
    8: [function(e, t) {
        (function() {
            "use strict";

            function n(e) {
                u.debug("postToOpener", e), window.parent.postMessage(e, "*")
            }

            function i(e) {
                var t = e.originalEvent;
                "pause" === t.data.action && l.forEach(function(e) {
                    e.pause()
                })
            }

            function r(e) {
                function t(t) {
                    var n = t.originalEvent;
                    n.data.playerOptions && e(n.data.playerOptions)
                }
                $(window).on("message", t)
            }

            function a() {
                var e = s.height();
                d !== e && n({
                    action: "resize",
                    arg: e
                }), d = e, requestAnimationFrame(a, document.body)
            }

            function o(e, t) {
                l = t, s = e(document.body), e(window).on("message", i), a()
            }
            var s, u = e("./logging").getLogger("Embed"),
                l = [],
                d = 0;
            t.exports = {
                postToOpener: n,
                waitForMetadata: r,
                init: o
            }
        }).call(this, e("b55mWE"), "undefined" != typeof self ? self : "undefined" != typeof window ? window : {}, e("buffer").Buffer, arguments[3], arguments[4], arguments[5], arguments[6], "/embed.js", "/")
    }, {
        "./logging": 10,
        b55mWE: 4,
        buffer: 3
    }],
    9: [function(e) {
        (function() {
            "use strict";

            function t(e, t) {
                return e ? (t && (e = '<a href="' + t + '" target="_blank" title=">' + e + "</a>"), '<h3 class="showtitle">' + e + "</h3>") : ""
            }

            function n(e, t) {
                var n = '<h1 class="episodetitle">',
                    i = "</h1>";
                return void 0 !== e && void 0 !== t && (e = '<a href="' + t + '"  target="_blank" title="Link to the Episode">' + e + "</a>"), n + e + i
            }

            function i(e) {
                return e ? '<h2 class="subtitle">' + e + "</h2>" : ""
            }

            function r(e) {
                return "<header>" + t(e.show.title, e.show.url) + n(e.title, e.permalink) + i(e.subtitle) + "</header>"
            }

            function a() {
                return $('<a class="play" title="Abspielen" href="javascript:;"></a>')
            }

            function o(e) {
                return e ? '<div class="coverart"><img class="coverimg" src="' + e + '" data-img="' + e + '" alt="Poster Image"></div>' : ""
            }

            function s() {
                var e = ["hidden", "mozHidden", "msHidden", "webkitHidden"];
                for (var t in e)
                    if (e[t] in document) return !!document[e[t]];
                return !1
            }

            function u(e, t, n) {
                var i, r = new p,
                    a = e.hasChapters,
                    o = new w(e),
                    s = o.box;
                a && (i = new b(e, n), e.addModule(i)), o.createTimeControls(i);
                var u = new y(e, n);
                e.addModule(u);
                var l = new T(e);
                e.addModule(l);
                var d = new g(n),
                    c = new v(n),
                    f = new m(n);
                a && r.add(i.tab), r.add(d.tab), r.add(c.tab), r.add(f.tab), r.openInitial(n.activeTab);
                var h = $('<div class="controlbar-wrapper"></div>');
                h.append(r.togglebar), h.append(s), t.append(l.render()).append(h).append(r.container), l.addEvents()
            }

            function l(t, n, i) {
                var l, d = $(t),
                    p = new h(t, n),
                    m = $('<div class="titlebar"></div>'),
                    g = n.type,
                    v = a(),
                    b = n.poster || d.attr("poster"),
                    y = !p.duration || isNaN(p.duration) || p.duration <= 0;
                if (S.info("Metadata", p.getData()), d.prop({
                        controls: null
                    }), y && d.prop({
                        preload: "metadata"
                    }), i.addClass("podlovewebplayer_" + g).data("podlovewebplayer", {
                        player: d
                    }), "audio" === g && (m.prepend(v), m.append(o(b)), i.prepend(m)), "video" === g) {
                    var w = $('<div class="video-pane"></div>'),
                        E = $('<div class="video-overlay"></div>');
                    E.append(v), E.on("click", function() {
                        return t.paused ? (v.addClass("playing"), t.play(), void 0) : (v.removeClass("playing"), t.pause(), void 0)
                    }), w.append(E).append(d), i.append(m).append(w), d.prop({
                        poster: b
                    })
                }
                if (m.append(r(n)), l = e("./url").checkCurrent(), l[0] && 1 === c.players.length) {
                    var T = {
                        preload: "auto"
                    };
                    s() || (T.autoplay = "autoplay"), d.attr(T), p.playRange(l), $("html, body").delay(150).animate({
                        scrollTop: $(".container:first").offset().top - 25
                    })
                }
                v.on("click", function(e) {
                    return e.preventDefault(), e.stopPropagation(), t.currentTime && t.currentTime > 0 && !t.paused ? (v.removeClass("playing"), t.pause(), "flash" === t.pluginType && t.pause(), void 0) : (v.hasClass("playing") || v.addClass("playing"), t.play(), void 0)
                }), $(document).on("keydown", function(e) {
                    S.debug("Keydown", e);
                    var t = e.which,
                        n = p.player.duration,
                        i = p.player.currentTime;
                    switch (t) {
                        case 37:
                            i -= 1;
                            break;
                        case 39:
                            i += 1;
                            break;
                        case 38:
                            if (p.hasChapters) return p.modules[0].next(), !1;
                            i += Math.floor(.1 * n);
                            break;
                        case 40:
                            if (p.hasChapters) return p.modules[0].previous(), !1;
                            i -= Math.floor(.1 * n);
                            break;
                        case 36:
                            i = 0;
                            break;
                        case 35:
                            i = n;
                            break;
                        case 10:
                        case 32:
                            return p.player.paused ? (p.player.play(), !1) : (p.player.pause(), !1);
                        default:
                            return !0
                    }
                    return p.setTime(i), !1
                }), d.on("timelineElement", function(e) {
                    S.trace(e.currentTarget.id, e)
                }).on("timeupdate progress", function(e) {
                    p.update(e)
                }).on("play", function() {}).on("playing", function() {
                    v.addClass("playing"), f.postToOpener({
                        action: "play",
                        arg: t.currentTime
                    })
                }).on("pause", function() {
                    v.removeClass("playing"), f.postToOpener({
                        action: "pause",
                        arg: t.currentTime
                    })
                }).on("ended", function() {
                    f.postToOpener({
                        action: "stop",
                        arg: t.currentTime
                    }), p.rewind()
                }), y || u(p, i, n), d.one("canplay", function() {
                    p.duration = t.duration, y && u(p, i, n)
                })
            }

            function d(e) {
                return function(t) {
                    var n = $.extend({}, E.defaults, t);
                    t.sources.forEach(function(t) {
                        $("<source>", t).appendTo(e)
                    }), E.create(e, n, l)
                }
            }
            var c, p = e("./tabregistry"),
                f = e("./embed"),
                h = e("./timeline"),
                m = e("./modules/info"),
                g = e("./modules/share"),
                v = e("./modules/downloads"),
                b = e("./modules/chapter"),
                y = e("./modules/savetime"),
                w = e("./controls"),
                E = e("./player"),
                T = e("./modules/progressbar"),
                C = e("./logging");
            e("../../bower_components/mediaelement/build/mediaelement.js");
            var S = C.getLogger("Webplayer");
            $.fn.podlovewebplayer = function(e) {
                if (e.deferred) {
                    var t = this[0],
                        n = d(t);
                    return f.waitForMetadata(n), f.postToOpener({
                        action: "waiting"
                    }), this
                }
                var i = $.extend({}, E.defaults, e);
                return this.each(function(e, t) {
                    E.create(t, i, l)
                })
            }, c = {
                players: E.players
            }, f.init($, E.players), window.pwp = c
        }).call(this, e("b55mWE"), "undefined" != typeof self ? self : "undefined" != typeof window ? window : {}, e("buffer").Buffer, arguments[3], arguments[4], arguments[5], arguments[6], "/fake_1f10679c.js", "/")
    }, {
        "../../bower_components/mediaelement/build/mediaelement.js": 1,
        "./controls": 7,
        "./embed": 8,
        "./logging": 10,
        "./modules/chapter": 11,
        "./modules/downloads": 12,
        "./modules/info": 13,
        "./modules/progressbar": 14,
        "./modules/savetime": 15,
        "./modules/share": 16,
        "./player": 17,
        "./tabregistry": 22,
        "./timeline": 24,
        "./url": 25,
        b55mWE: 4,
        buffer: 3
    }],
    10: [function(e, t) {
        (function() {
            {
                var n = e("loglevel");
                n.methodFactory
            }
            n.setLevel(n.levels.INFO), t.exports = n
        }).call(this, e("b55mWE"), "undefined" != typeof self ? self : "undefined" != typeof window ? window : {}, e("buffer").Buffer, arguments[3], arguments[4], arguments[5], arguments[6], "/logging.js", "/")
    }, {
        b55mWE: 4,
        buffer: 3,
        loglevel: 6
    }],
    11: [function(e, t) {
        (function() {
            "use strict";

            function n(e) {
                e.preventDefault();
                var t = e.data.module;
                return h.debug("clickHandler", "setCurrentChapter to", e.data.index), t.setCurrentChapter(e.data.index), t.playCurrentChapter(), t.timeline.player.play(), !1
            }

            function i(e) {
                return e.code = e.title, "string" == typeof e.start && (e.start = p.getStartTimeCode(e.start)), e
            }

            function r(e) {
                return function(t, n, i) {
                    var r = i[n + 1];
                    return t.end = r ? r.start : e, t
                }
            }

            function a(e) {
                return $(e)
            }

            function o() {
                return a('<table class="podlovewebplayer_chapters"><caption>Chapter</caption><thead><tr><th scope="col">Chapter number</th><th scope="col">Start time</th><th scope="col">Title</th><th scope="col">Dauer</th></tr></thead><tbody></tbody></table>')
            }

            function s(e, t) {
                return a('<tr class="chapter"><td class="chapter-number"><span class="badge">' + (t + 1) + '</span></td><td class="chapter-name"><span>' + e.code + '</span></td><td class="chapter-duration"><span>' + e.duration + "</span></td></tr>")
            }

            function u(e) {
                function t(e) {
                    return e.start
                }
                return Math.max.apply(Math, $.map(e, t))
            }

            function l(e, t) {
                return e ? t > e.start - m && t <= e.end : !1
            }

            function d(e) {
                function t(e, t) {
                    var n = l(e, i);
                    n && this.setCurrentChapter(t)
                }
                var n = this.getActiveChapter(),
                    i = e.getTime();
                return h.debug("update", this, n, i), l(n, i) ? (h.debug("update", "already set", this.currentChapter), void 0) : (this.chapters.forEach(t, this), void 0)
            }

            function c(e, t) {
                return e && e.hasChapters ? (0 === e.duration && h.warn("constructor", "Zero length media?", e), this.timeline = e, this.duration = e.duration, this.chapterlinks = !!e.chapterlinks, this.currentChapter = 0, this.chapters = this.parseSimpleChapter(t), this.data = this.chapters, this.tab = new f({
                    icon: "pwp-chapters",
                    title: "Show / hide chapter",
                    headline: "Chapters",
                    name: "chapters"
                }), this.tab.createMainContent("").append(this.generateTable()), this.update = d.bind(this), void 0) : null
            }
            var p = e("../timecode"),
                f = e("../tab"),
                h = e("../logging").getLogger("Chapters"),
                m = .1;
            c.prototype.generateTable = function() {
                function e(e, t) {
                    var r = Math.round(e.end - e.start);
                    e.duration = p.generate([r], !1), e.startTime = p.generate([Math.round(e.start)], !0, a);
                    var o = s(e, t);
                    o.on("click", {
                        module: this,
                        index: t
                    }, n), o.appendTo(i), e.element = o
                }
                var t, i, r, a;
                return t = o(), i = t.children("tbody"), r = u(this.chapters), a = r >= 3600, this.chapters.forEach(e, this), t
            }, c.prototype.getActiveChapter = function() {
                var e = this.chapters[this.currentChapter];
                return h.debug("getActiveChapter", e), e
            }, c.prototype.setCurrentChapter = function(e) {
                e < this.chapters.length && e >= 0 && (this.currentChapter = e), this.markActiveChapter(), h.debug("setCurrentChapter", "to", this.currentChapter)
            }, c.prototype.markActiveChapter = function() {
                var e = this.getActiveChapter();
                $.each(this.chapters, function() {
                    this.element.removeClass("active")
                }), e.element.addClass("active")
            }, c.prototype.next = function() {
                var e = this.currentChapter,
                    t = this.setCurrentChapter(e + 1);
                return e === t ? (h.debug("next", "already in last chapter"), e) : (h.debug("next", "chapter", this.currentChapter), this.playCurrentChapter(), t)
            }, c.prototype.previous = function() {
                var e = this.currentChapter,
                    t = this.setCurrentChapter(e - 1);
                return e === t ? (h.debug("previous", "already in first chapter"), this.playCurrentChapter(), e) : (h.debug("previous", "chapter", this.currentChapter), this.playCurrentChapter(), t)
            }, c.prototype.playCurrentChapter = function() {
                var e = this.getActiveChapter().start;
                h.debug("playCurrentChapter", "start", e);
                var t = this.timeline.setTime(e);
                h.debug("playCurrentChapter", "currentTime", t)
            }, c.prototype.parseSimpleChapter = function(e) {
                var t = e.chapters;
                return t ? t.map(i).map(r(this.duration)).sort(function(e, t) {
                    return e.start - t.start
                }) : []
            }, t.exports = c
        }).call(this, e("b55mWE"), "undefined" != typeof self ? self : "undefined" != typeof window ? window : {}, e("buffer").Buffer, arguments[3], arguments[4], arguments[5], arguments[6], "/modules/chapter.js", "/modules")
    }, {
        "../logging": 10,
        "../tab": 21,
        "../timecode": 23,
        b55mWE: 4,
        buffer: 3
    }],
    12: [function(e, t) {
        (function() {
            "use strict";

            function n(e) {
                var t = 1048576,
                    n = parseInt(e, 10),
                    i = Math.round(n / 1024),
                    r = Math.round(n / 1024 / 1024);
                return e ? t > n ? i + " KB" : r + " MB" : " -- "
            }

            function i(e) {
                return l.debug("found asset", e.assetTitle), '<option value="' + e.downloadUrl + '">' + e.assetTitle + " &#8226; " + n(e.size) + "</option>"
            }

            function r(e) {
                return {
                    assetTitle: e.name,
                    downloadUrl: e.dlurl,
                    url: e.url,
                    size: e.size
                }
            }

            function a(e) {
                var t = "string" == typeof e ? e : e.src,
                    n = t.split(".");
                return {
                    assetTitle: n[n.length - 1],
                    downloadUrl: t,
                    url: t,
                    size: -1
                }
            }

            function o(e) {
                return e.downloads && e.downloads[0].assetTitle ? e.downloads : e.downloads ? e.downloads.map(r) : e.sources.map(a)
            }

            function s(e) {
                this.list = o(e), this.tab = this.createDownloadTab(e)
            }
            var u = e("../tab"),
                l = e("../logging").getLogger("Downloads");
            s.prototype.createDownloadTab = function(e) {
                function t() {
                    s.val(o.val())
                }
                if (!e.downloads && !e.sources || e.hidedownloadbutton === !0) return null;
                var n = new u({
                        icon: "pwp-download",
                        title: "Show / hide downloads",
                        name: "downloads",
                        headline: "Download"
                    }),
                    r = n.createMainContent('<div class="download"><form action="#"><select class="select" name="select-file">' + this.list.map(i) + '</select><button class="download button-submit icon pwp-download" name="download-file"><span class="download label">Download</span></button></form></div>');
                n.box.append(r);
                var a = r.find("button.pwp-download"),
                    o = r.find("select.select");
                a.on("click", function(e) {
                    e.preventDefault(), window.open(o.val(), "_self")
                });
                var s = $('<input name="download-link-url" type="url" readonly>');
                return t(), o.on("change", t), n.createFooter("<h3>Direct Link</h3>").append(s), n
            }, t.exports = s
        }).call(this, e("b55mWE"), "undefined" != typeof self ? self : "undefined" != typeof window ? window : {}, e("buffer").Buffer, arguments[3], arguments[4], arguments[5], arguments[6], "/modules/downloads.js", "/modules")
    }, {
        "../logging": 10,
        "../tab": 21,
        b55mWE: 4,
        buffer: 3
    }],
    13: [function(e, t) {
        (function() {
            "use strict";

            function n(e) {
                if (!e) return "";
                var t = new Date(e);
                return "<p>Veröffentlicht am: " + t.getDate() + "." + (t.getMonth() + 1) + "." + t.getFullYear() + "</p>"
            }

            function i(e) {
                return e && e.length > 0 ? "<p>" + e + "</p>" : ""
            }

            function r(e, t) {
                e.createMainContent("<h2>" + t.title + "</h2><h3>" + t.subtitle + "</h3>" + i(t.summary) + "<p>Dauer: " + h.fromTimeStamp(t.duration) + "</p>" + n(t.publicationDate) + '<p>Permalink:<br><a href="' + t.permalink + '" target="_blank" title="Permalink für die Episode">' + t.permalink + "</a></p>")
            }

            function a(e) {
                return e ? '<div class="poster-image"><img src="' + e + '" data-img="' + e + '" alt="Poster Image"></div>' : ""
            }

            function o(e) {
                return e.subscribeButton ? '<button class="button-submit"><span class="showtitle-label">' + e.show.title + '</span><span class="submit-label">' + e.subscribeButton + "</span></button>" : ""
            }

            function s(e, t) {
                e.createAside("<h2>" + t.show.title + "</h2><h3>" + t.show.subtitle + "</h3>" + a(t.show.poster) + o(t) + '<p>Link to the show:<br><a href="' + t.show.url + '" target="_blank" title="Link to the show">' + t.show.url + "</a></p>")
            }

            function u(e) {
                var t = m.get(e.serviceName),
                    n = $("<li></li>"),
                    i = t.getButton(e);
                n.append(i.element), this.append(n)
            }

            function l(e) {
                if (!e) return null;
                var t = $("<ul></ul>");
                e.forEach(u, t);
                var n = $('<div class="social-links"><h3>Stay connected</h3></div>');
                return n.append(t), n
            }

            function d(e, t) {
                var n, i, r = t.license && t.license.url && t.license.name && t.show.title;
                (r || t.profiles) && (i = "", r && (i = '<p></p>'), n = e.createFooter(i), n.prepend(l(t.profiles)))
            }

            function c(e) {
                var t = new f({
                    icon: "pwp-info",
                    title: "Show / hide info",
                    headline: "Info",
                    name: "info"
                });
                return r(t, e), s(t, e), d(t, e), t
            }

            function p(e) {
                this.tab = c(e)
            }
            var f = e("../tab"),
                h = e("../timecode"),
                m = e("../social-networks");
            t.exports = p
        }).call(this, e("b55mWE"), "undefined" != typeof self ? self : "undefined" != typeof window ? window : {}, e("buffer").Buffer, arguments[3], arguments[4], arguments[5], arguments[6], "/modules/info.js", "/modules")
    }, {
        "../social-networks": 20,
        "../tab": 21,
        "../timecode": 23,
        b55mWE: 4,
        buffer: 3
    }],
    14: [function(e, t) {
        (function() {
            "use strict";

            function n(e, t) {
                return $('<div class="time time-' + e + '">' + t + "</div>")
            }

            function i() {
                var e = $('<div class="chapter"></div>');
                if (!this.chapterModule) return e;
                var t = this.chapterModule.currentChapter,
                    n = this.chapterModule.chapters[t];
                return f.debug("Progressbar", "renderCurrentChapterElement", t, n), this.chapterBadge = $('<span class="badge">' + (t + 1) + "</span>"), this.chapterTitle = $('<span class="chapter-title">' + n.title + "</span>"), e.append(this.chapterBadge).append(this.chapterTitle), e
            }

            function r(e) {
                var t = $('<div class="progress-info"></div>');
                return t.append(e.currentTime).append(i.call(e)).append(e.durationTimeElement)
            }

            function a(e) {
                var t = e.timeline.getTime();
                if (e.currentTime.html(c.fromTimeStamp(t)), !e.showDuration) {
                    var n = Math.abs(t - e.duration);
                    e.durationTimeElement.text("-" + c.fromTimeStamp(n))
                }
            }

            function o(e) {
                var t = c.fromTimeStamp(e.duration),
                    i = n("duration", 0);
                return i.on("click", function() {
                    return e.showDuration = !e.showDuration, e.showDuration ? (i.text(t), void 0) : (a(e), void 0)
                }), i
            }

            function s(e) {
                var t = 100 * e / this.duration;
                return $('<div class="marker" style="left:' + t + '%;"></div>')
            }

            function u(e) {
                return s.call(this, e.start)
            }

            function l(e) {
                this.setProgress(e.getTime()), this.buffer.val(e.getBuffered()), this.setChapter()
            }

            function d(e) {
                return e ? (this.timeline = e, this.duration = e.duration, this.bar = null, this.currentTime = null, e.hasChapters && (this.chapterModule = this.timeline.modules[0], this.chapterBadge = null, this.chapterTitle = null), this.showDuration = !1, this.progress = null, this.buffer = null, this.update = l.bind(this), void 0) : (f.error("Timeline missing", arguments), void 0)
            }
            var c = e("../timecode"),
                p = e("../util").cap,
                f = e("../logging").getLogger("ProgressBar");
            d.prototype.setHandlePosition = function(e) {
                var t = e / this.duration * 100,
                    n = t + "%";
                f.debug("setHandlePosition", "time", e, "newLeftOffset", n), this.handle.css("left", n)
            }, d.prototype.setProgress = function(e) {
                this.progress.val(e), this.setHandlePosition(e), a(this)
            }, d.prototype.setChapter = function() {
                if (this.chapterModule) {
                    var e = this.chapterModule.currentChapter,
                        t = this.chapterModule.chapters[e];
                    this.chapterBadge.text(e + 1), this.chapterTitle.text(t.title)
                }
            }, d.prototype.render = function() {
                var e = c.fromTimeStamp(this.timeline.getTime());
                this.currentTime = n("current", e), this.durationTimeElement = o(this);
                var t = r(this);
                a(this);
                var i = $('<div class="progress"></div>'),
                    s = $('<progress class="current"></progress>').attr({
                        min: 0,
                        max: this.duration
                    }),
                    l = $('<progress class="buffer"></progress>').attr({
                        min: 0,
                        max: this.duration
                    }),
                    d = $('<div class="handle"><div class="inner-handle"></div></div>');
                if (i.append(s).append(l).append(d), this.progress = s, this.buffer = l, this.handle = d, this.setProgress(this.timeline.getTime()), this.chapterModule) {
                    var p = this.chapterModule.chapters.map(u, this);
                    p.shift(), i.append(p)
                }
                var f = $('<div class="progressbar"></div>');
                return f.append(t).append(i), this.bar = f, f
            }, d.prototype.addEvents = function() {
                function e(e) {
                    var t = o.outerWidth(!0),
                        n = o.offset(),
                        i = p(e - n.left, 0, t),
                        r = i / t;
                    return r * a.duration
                }

                function t(t) {
                    t.preventDefault(), t.stopPropagation();
                    var n = t.pageX;
                    if (t.originalEvent.changedTouches && (n = t.originalEvent.changedTouches[0].pageX), "number" == typeof a.duration && r) {
                        var i = e(n);
                        i !== a.getTime() && a.seek(i)
                    }
                }

                function n() {
                    r = !1, $(document).unbind("touchend.dur mouseup.dur touchmove.dur mousemove.dur")
                }

                function i(e) {
                    (0 === e.which || 1 === e.which) && (r = !0, t(e), $(document).bind("mousemove.dur touchmove.dur", t).bind("mouseup.dur touchend.dur", n))
                }
                var r = !1,
                    a = this.timeline,
                    o = this.progress;
                this.progress.bind("mousedown touchstart", i), this.handle.bind("touchstart mousedown", i)
            }, t.exports = d
        }).call(this, e("b55mWE"), "undefined" != typeof self ? self : "undefined" != typeof window ? window : {}, e("buffer").Buffer, arguments[3], arguments[4], arguments[5], arguments[6], "/modules/progressbar.js", "/modules")
    }, {
        "../logging": 10,
        "../timecode": 23,
        "../util": 26,
        b55mWE: 4,
        buffer: 3
    }],
    15: [function(e, t) {
        (function() {
            "use strict";

            function n() {
                return +localStorage[this.key]
            }

            function i() {
                return localStorage.removeItem(this.key)
            }

            function r() {
                return this.key in localStorage
            }

            function a() {
                return s.debug("update", this.timeline.getTime()), 0 === this.timeline.getTime() ? i.call(this) : (this.setItem(this.timeline.getTime()), void 0)
            }

            function o(e, t) {
                this.timeline = e, this.key = u + t.permalink, this.getItem = n.bind(this), this.removeItem = i.bind(this), this.hasItem = r.bind(this), this.update = a.bind(this), this.hasItem() && e.setTime(this.getItem())
            }
            var s = e("../logging").getLogger("SaveTime"),
                u = "podlove-web-player-playtime-";
            o.prototype.setItem = function(e) {
                localStorage[this.key] = e
            }, t.exports = o
        }).call(this, e("b55mWE"), "undefined" != typeof self ? self : "undefined" != typeof window ? window : {}, e("buffer").Buffer, arguments[3], arguments[4], arguments[5], arguments[6], "/modules/savetime.js", "/modules")
    }, {
        "../logging": 10,
        b55mWE: 4,
        buffer: 3
    }],
    16: [function(e, t) {
        (function() {
            "use strict";

            function n(e) {
                if ("show" === e) return v.show;
                var t = v.episode;
                return t
            }

            function i(e) {
                d.update(e), c.update(e)
            }

            function r(e, t) {
                var r = n(t),
                    a = e.find("[type=radio]");
                return function() {
                    l.removeClass("selected"), a.prop("checked", !0), e.addClass("selected"), l = e, h.debug("sharing options changed", e, t), i(r)
                }
            }

            function a(e) {
                if (e.disabled) return h.debug("createOption", "omit disabled option", e.name), null;
                var t = n(e.value);
                if (!t) return h.debug("createOption", "omit option without data", e.name), null;
                var a = $('<tr class="share-select-option"><td class="share-description">' + e.name + '</td><td class="share-radio"><input type="radio" id="share-option-' + e.name + '" name="r-group" value="' + e.title + '"></td><td class="share-label"><label for="share-option-' + e.name + '">' + e.title + "</label></td></tr>"),
                    o = a.find("[type=radio]");
                e.default && (l = a, a.addClass("selected"), o.prop("checked", !0), i(t));
                var s = r(a, e.value);
                return a.on("click", s), a
            }

            function o(e) {
                g[0].title = e.show.title, g[1].title = e.title;
                var t = $('<table class="share-button-wrapper" data-toggle="buttons"><caption>Podcast teilen</caption><tbody></tbody</table>');
                return t.append(g.map(a)), t
            }

            function s(e) {
                var t = $("<form><h3>What do you want to share?</h3></form>");
                return t.append(o(e)), t
            }

            function u(e) {
                if (!e.permalink || e.hidesharebutton === !0) return null;
                var t = new p({
                    icon: "pwp-share",
                    title: "Show / hide parts",
                    name: "share",
                    headline: "Show"
                });
                return d = new f(m, n("episode")), c = $('<h3>Direct Link</h3><input type="url" name="share-link-url" readonly>'), c.update = function(e) {
                    this.val(e.rawUrl)
                }, t.createMainContent("").append(s(e)).append("<h3>Share via ...</h3>").append(d.list), t.createFooter("").append(c), t
            }
            var l, d, c, p = e("../tab"),
                f = e("../social-button-list"),
                h = e("../logging").getLogger("Share"),
                m = ["twitter", "facebook", "gplus", "tumblr", "email"],
                g = [{
                    name: "Show",
                    value: "show"
                }, {
                    name: "Episode",
                    value: "episode",
                    "default": !0
                }, {
                    name: "Chapter",
                    value: "chapter",
                    disabled: !0
                }, {
                    name: "Exactly this part here",
                    value: "timed",
                    disabled: !0
                }],
                v = {};
            t.exports = function(e) {
                v.episode = {
                    poster: e.poster,
                    title: encodeURIComponent(e.title),
                    url: encodeURIComponent(e.permalink),
                    rawUrl: e.permalink,
                    text: encodeURIComponent(e.title + " " + e.permalink)
                }, v.chapters = e.chapters, e.show.url && (v.show = {
                    poster: e.show.poster,
                    title: encodeURIComponent(e.show.title),
                    url: encodeURIComponent(e.show.url),
                    rawUrl: e.show.url,
                    text: encodeURIComponent(e.show.title + " " + e.show.url)
                }), l = "episode", this.tab = u(e)
            }
        }).call(this, e("b55mWE"), "undefined" != typeof self ? self : "undefined" != typeof window ? window : {}, e("buffer").Buffer, arguments[3], arguments[4], arguments[5], arguments[6], "/modules/share.js", "/modules")
    }, {
        "../logging": 10,
        "../social-button-list": 18,
        "../tab": 21,
        b55mWE: 4,
        buffer: 3
    }],
    17: [function(e, t) {
        (function() {
            "use strict";

            function n(e) {
                return "auto" === e.toLowerCase() ? "100%" : e.replace("px", "")
            }

            function i(e) {
                return e.tagName.toLowerCase()
            }

            function r(e) {
                $.each(e.features, function(t) {
                    "playpause" === this && e.features.splice(t, 1)
                })
            }

            function a() {
                var e = $(this);
                if (e.attr("src")) return e.removeAttr("src"), void 0;
                var t = e.children("source");
                t.length && t.first().remove()
            }

            function o(e, t, o) {
                var c, p, f, h = i(e);
                c = $(e), f = $('<div class="container"></div>'), c.replaceWith(f), t.width = n(t.width), "audio" === h && (void 0 !== t.audioWidth && (t.width = t.audioWidth), d.audioWidth = t.width, $.each(d.features, function(e) {
                    "fullscreen" === this && d.features.splice(e, 1)
                }), r(d)), t.duration && t.duration !== parseInt(t.duration, 10) && (p = s(t.duration), t.duration = p[0]), $.each(d, function(e) {
                    e in t && (d[e] = t[e])
                }), t.width.toString().trim() === parseInt(t.width, 10).toString() && (t.width = parseInt(t.width, 10) + "px"), l.push(e), c.find("source").each(function() {
                    t.sources || (t.sources = []), t.sources.push($(this).attr("src"))
                }), t.type = h, d.success = function(e) {
                    c.on("error", a), o(e, t, f)
                };
                var m = new MediaElement(e, d);
                u.info("MediaElement", m)
            }
            var s = e("./timecode").parse,
                u = e("./logging").getLogger("Player"),
                l = [],
                d = {
                    defaultVideoWidth: 480,
                    defaultVideoHeight: 270,
                    videoWidth: -1,
                    videoHeight: -1,
                    audioWidth: -1,
                    audioHeight: 30,
                    startVolume: .8,
                    loop: !1,
                    enableAutosize: !0,
                    features: ["playpause", "current", "progress", "duration", "tracks", "fullscreen"],
                    alwaysShowControls: !1,
                    iPadUseNativeControls: !1,
                    iPhoneUseNativeControls: !1,
                    AndroidUseNativeControls: !1,
                    alwaysShowHours: !1,
                    showTimecodeFrameCount: !1,
                    framesPerSecond: 25,
                    enableKeyboard: !0,
                    pauseOtherPlayers: !0,
                    duration: !1,
                    plugins: ["flash", "silverlight"],
                    pluginPath: "./bin/",
                    flashName: "flashmediaelement.swf",
                    silverlightName: "silverlightmediaelement.xap"
                },
                c = {
                    chapterlinks: "all",
                    width: "100%",
                    duration: !1,
                    chaptersVisible: !1,
                    timecontrolsVisible: !1,
                    sharebuttonsVisible: !1,
                    downloadbuttonsVisible: !1,
                    summaryVisible: !1,
                    hidetimebutton: !1,
                    hidedownloadbutton: !1,
                    hidesharebutton: !1,
                    sharewholeepisode: !1,
                    sources: []
                };
            t.exports = {
                create: o,
                defaults: c,
                players: l
            }
        }).call(this, e("b55mWE"), "undefined" != typeof self ? self : "undefined" != typeof window ? window : {}, e("buffer").Buffer, arguments[3], arguments[4], arguments[5], arguments[6], "/player.js", "/")
    }, {
        "./logging": 10,
        "./timecode": 23,
        b55mWE: 4,
        buffer: 3
    }],
    18: [function(e, t) {
        (function() {
            "use strict";

            function n(e) {
                return function(t) {
                    var n = r.get(t);
                    return n.getButton(e)
                }
            }

            function i(e, t) {
                var i = n(t);
                this.buttons = e.map(i), this.list = $('<ul class="social-network-buttons"></ul>'), this.buttons.forEach(function(e) {
                    var t = $("<li></li>").append(e.element);
                    this.list.append(t)
                }, this)
            }
            var r = e("./social-networks");
            i.prototype.update = function(e) {
                this.buttons.forEach(function(t) {
                    t.updateUrl(e)
                })
            }, t.exports = i
        }).call(this, e("b55mWE"), "undefined" != typeof self ? self : "undefined" != typeof window ? window : {}, e("buffer").Buffer, arguments[3], arguments[4], arguments[5], arguments[6], "/social-button-list.js", "/")
    }, {
        "./social-networks": 20,
        b55mWE: 4,
        buffer: 3
    }],
    19: [function(e, t) {
        (function() {
            "use strict";

            function e(e) {
                return $('<a class="pwp-contrast-' + e.icon + '" target="_blank" href="' + e.url + '" title="' + e.title + '"><i class="icon pwp-' + e.icon + '"></i></a><span>' + e.title + "</span>")
            }

            function n(e) {
                this.icon = e.icon, this.title = e.title, this.url = e.profileUrl, this.shareUrl = e.shareUrl
            }
            n.prototype.getShareUrl = function(e) {
                var t = this.shareUrl.replace("$text$", e.text).replace("$title$", e.title).replace("$url$", e.url);
                return this.url + t
            }, n.prototype.getProfileUrl = function(e) {
                return this.url + e
            }, n.prototype.getProfileButton = function(t) {
                return t.profile ? {
                    element: e({
                        url: this.getProfileUrl(t.profile),
                        title: this.title,
                        icon: this.icon
                    })
                } : null
            }, n.prototype.getShareButton = function(t) {
                if (!this.shareUrl || !t.title || !t.url) return null;
                t.text || (t.text = t.title + "%20" + t.url);
                var n = e({
                        url: this.getShareUrl(t),
                        title: this.title,
                        icon: this.icon
                    }),
                    i = function(e) {
                        n.get(0).href = this.getShareUrl(e)
                    }.bind(this);
                return {
                    element: n,
                    updateUrl: i
                }
            }, n.prototype.getButton = function(e) {
                return e.profile ? this.getProfileButton(e) : this.shareUrl && e.title && e.url ? this.getShareButton(e) : null
            }, t.exports = n
        }).call(this, e("b55mWE"), "undefined" != typeof self ? self : "undefined" != typeof window ? window : {}, e("buffer").Buffer, arguments[3], arguments[4], arguments[5], arguments[6], "/social-network.js", "/")
    }, {
        b55mWE: 4,
        buffer: 3
    }],
    20: [function(e, t) {
        (function() {
            "use strict";

            function n(e) {
                var t = a[e];
                return t || r.error("Unknown service", e), t
            }
            var i = e("./social-network"),
                r = e("./logging").getLogger("SocialNetWorks"),
                a = {
                    twitter: new i({
                        icon: "twitter",
                        title: "Twitter",
                        profileUrl: "https://twitter.com/",
                        shareUrl: "share?text=$text$&url=$url$"
                    }),
                    flattr: new i({
                        icon: "flattr",
                        title: "Flattr",
                        profileUrl: "https://flattr.com/profile/",
                        shareUrl: "share?text=$text$&url=$url$"
                    }),
                    facebook: new i({
                        icon: "facebook",
                        title: "Facebook",
                        profileUrl: "https://facebook.com/",
                        shareUrl: "share.php?t=$text$&u=$url$"
                    }),
                    adn: new i({
                        icon: "adn",
                        title: "App.net",
                        profileUrl: "https://alpha.app.net/",
                        shareUrl: "intent/post?text=$text$"
                    }),
                    soundcloud: new i({
                        icon: "soundcloud",
                        title: "SoundCloud",
                        profileUrl: "https://soundcloud.com/",
                        shareUrl: "share?title=$title$&url=$url$"
                    }),
                    instagram: new i({
                        icon: "instagram",
                        title: "Instagram",
                        profileUrl: "http://instagram.com/",
                        shareUrl: "share?title=$title$&url=$url$"
                    }),
                    tumblr: new i({
                        icon: "tumblr",
                        title: "Tumblr",
                        profileUrl: "https://www.tumblr.com/",
                        shareUrl: "share?title=$title$&url=$url$"
                    }),
                    email: new i({
                        icon: "message",
                        title: "E-Mail",
                        profileUrl: "mailto:",
                        shareUrl: "?subject=$title$&body=$text$"
                    }),
                    gplus: new i({
                        icon: "google-plus",
                        title: "Google+",
                        profileUrl: "https://plus.google.com/",
                        shareUrl: "share?title=$title$&url=$url$"
                    })
                };
            t.exports = {
                get: n
            }
        }).call(this, e("b55mWE"), "undefined" != typeof self ? self : "undefined" != typeof window ? window : {}, e("buffer").Buffer, arguments[3], arguments[4], arguments[5], arguments[6], "/social-networks.js", "/")
    }, {
        "./logging": 10,
        "./social-network": 19,
        b55mWE: 4,
        buffer: 3
    }],
    21: [function(e, t) {
        (function() {
            "use strict";

            function e(e) {
                var t = e.currentTarget.scrollTop;
                e.data.header.toggleClass("scrolled", t >= 5)
            }

            function n(e) {
                var t = ["tab"];
                return t.push(e.name), e.active && t.push("active"), $('<section class="' + t.join(" ") + '"></section>')
            }

            function i(t) {
                this.icon = t.icon, this.title = t.title, this.headline = t.headline, this.name = t.name, this.box = n(t);
                var i = this.createHeader();
                this.box.on("scroll", {
                    header: i
                }, e), this.active = !1, this.toggle = null
            }
            i.prototype.open = function() {
                this.active = !0, this.box.addClass("active"), this.toggle.addClass("active")
            }, i.prototype.close = function() {
                this.active = !1, this.box.removeClass("active"), this.toggle.removeClass("active")
            }, i.prototype.createHeader = function() {
                var e = $('<header class="tab-header"><h2 class="tab-headline"><i class="icon ' + this.icon + '"></i>' + this.headline + "</h2></header>");
                return this.box.append(e), e
            }, i.prototype.createMainContent = function(e) {
                var t = $('<div class="main">' + e + "</div");
                return this.box.append(t), t
            }, i.prototype.createAside = function(e) {
                var t = $('<aside class="aside">' + e + "</aside>");
                return this.box.append(t), t
            }, i.prototype.createFooter = function(e) {
                var t;
                return e || (e = ""), t = $("<footer>" + e + "</footer>"), this.box.append(t), t
            }, t.exports = i
        }).call(this, e("b55mWE"), "undefined" != typeof self ? self : "undefined" != typeof window ? window : {}, e("buffer").Buffer, arguments[3], arguments[4], arguments[5], arguments[6], "/tab.js", "/")
    }, {
        b55mWE: 4,
        buffer: 3
    }],
    22: [function(e, t) {
        (function() {
            "use strict";

            function n(e) {
                return a.debug("activeTab", this.activeTab), this.activeTab && this.activeTab.close(), this.activeTab === e ? (this.activeTab = null, !1) : (this.activeTab = e, this.activeTab.open(), !1)
            }

            function i(e) {
                a.debug("player.currentTime", e.currentTime)
            }

            function r() {
                this.activeTab = null, this.togglebar = $('<div class="togglebar bar"></div>'), this.toggleList = $('<ul class="tablist"></ul>'), this.togglebar.append(this.toggleList), this.container = $('<div class="tabs"></div>'), this.listeners = [i], this.tabs = []
            }
            var a = e("./logging").getLogger("TabRegistry");
            r.prototype.createToggleFor = function(e) {
                var t = $('<li title="' + e.title + '"><a href="javascript:;" class="button button-toggle ' + e.icon + '"></a></li>');
                return t.on("click", n.bind(this, e)), this.toggleList.append(t), t
            }, r.prototype.add = function(e) {
                null !== e && (this.tabs.push(e), this.container.append(e.box), e.toggle = this.createToggleFor(e))
            }, r.prototype.openInitial = function(e) {
                if (e) {
                    var t = this.tabs.filter(function(t) {
                        return t.name === e
                    });
                    if (0 === t.length) return a.warn("openInitial", "Could not open tab", e), void 0;
                    var n = t.pop();
                    n.open(), this.activeTab = n
                }
            }, r.prototype.addModule = function(e) {
                e.tab && this.add(e.tab), e.update && this.listeners.push(e.update)
            }, r.prototype.update = function(e) {
                a.debug("update", e);
                var t = e.currentTarget;
                $.each(this.listeners, function(e, n) {
                    n(t)
                })
            }, t.exports = r
        }).call(this, e("b55mWE"), "undefined" != typeof self ? self : "undefined" != typeof window ? window : {}, e("buffer").Buffer, arguments[3], arguments[4], arguments[5], arguments[6], "/tabregistry.js", "/")
    }, {
        "./logging": 10,
        b55mWE: 4,
        buffer: 3
    }],
    23: [function(e, t) {
        (function() {
            "use strict";

            function n(e) {
                if (!e) return !1;
                var t = o.exec(e);
                if (!t) return a.warn("Could not extract time from", e), !1;
                var n = 0;
                return n += t[1] ? 60 * parseInt(t[1], 10) * 60 : 0, n += 60 * parseInt(t[2], 10), n += parseInt(t[3], 10), n += t[4] ? parseFloat(t[4]) : 0, n = Math.max(n, 0)
            }

            function i(e, t, n, i) {
                var a, o, s, u, l = "";
                return 0 === e ? n ? "00:00:00" : "00:00" : !e || 0 >= e ? n ? "--:--:--" : "--:--" : (a = Math.floor(e / 60 / 60), o = Math.floor(e / 60) % 60, s = Math.floor(e % 60) % 60, u = Math.floor(e % 1 * 1e3), i && u && (l = "." + r(u, 3)), l = ":" + r(s, 2) + l, 0 !== a || n || t ? (l = r(o, 2) + l, 0 !== a || n ? t ? r(a, 2) + ":" + l : a + ":" + l : l) : o.toString() + l)
            }
            var r = e("./util").zeroFill,
                a = e("./logging").getLogger("TimeCode"),
                o = /(?:(\d+):)?(\d{1,2}):(\d\d)(\.\d{1,3})?/;
            t.exports = {
                fromTimeStamp: function(e) {
                    return i(e, !0, !0)
                },
                generate: function(e, t, n) {
                    return e[1] > 0 && e[1] < 9999999 && e[0] < e[1] ? i(e[0], t, n) + "," + i(e[1], t, n) : i(e[0], t, n)
                },
                parse: function(e) {
                    if (!e) return [!1, !1];
                    var t = e.split("-");
                    if (!t.length) return a.warn("no timeparts:", e), [!1, !1];
                    var i = n(t.shift()),
                        r = n(t.shift());
                    return r > i ? [i, r] : [i, !1]
                },
                getStartTimeCode: function(e) {
                    return this.parse(e)[0]
                }
            }
        }).call(this, e("b55mWE"), "undefined" != typeof self ? self : "undefined" != typeof window ? window : {}, e("buffer").Buffer, arguments[3], arguments[4], arguments[5], arguments[6], "/timecode.js", "/")
    }, {
        "./logging": 10,
        "./util": 26,
        b55mWE: 4,
        buffer: 3
    }],
    24: [function(e, t) {
        (function() {
            "use strict";

            function n(e) {
                e(this)
            }

            function i(e) {
                return function(t) {
                    return t.type === e
                }
            }

            function r(e) {
                l.debug("currentTime", e.getTime())
            }

            function a(e) {
                return !!e.chapters && "object" == typeof e.chapters && e.chapters.length > 1
            }

            function o() {
                this.currentTime >= this.endTime && (l.info("ENDTIME REACHED"), this.player.stop(), delete this.endTime)
            }

            function s(e, t) {
                this.player = e, this.hasChapters = a(t), this.modules = [], this.listeners = [r], this.currentTime = -1, this.duration = t.duration, this.bufferedTime = 0, this.resume = e.paused, this.seeking = !1
            }
            var u = e("./util").cap,
                l = e("./logging").getLogger("Timeline");
            s.prototype.getData = function() {
                return this.data
            }, s.prototype.getDataByType = function(e) {
                return this.data.filter(i(e))
            }, s.prototype.addModule = function(e) {
                e.update && this.listeners.push(e.update), e.data && (this.data = e.data), this.modules.push(e)
            }, s.prototype.playRange = function(e) {
                if (!e || !e.length || !e.shift) throw new TypeError("Timeline.playRange called without a range");
                this.setTime(e.shift()), this.stopAt(e.shift())
            }, s.prototype.update = function(e) {
                l.debug("update", e), this.setBufferedTime(e), e && "timeupdate" === e.type && (this.currentTime = this.player.currentTime), this.listeners.forEach(n, this)
            }, s.prototype.emitEventsBetween = function(e, t) {
                var n = !1,
                    i = function(e) {
                        var t = new $.Event(e.type, e);
                        $(this).trigger(t)
                    }.bind(this);
                this.data.map(function(r) {
                    var a = r.start > e,
                        o = r.end < e,
                        s = r.end < t;
                    (a && o && !s || n) && (l.debug("Emit", r), i(r)), n = a
                })
            }, s.prototype.isValidTime = function(e) {
                return "number" == typeof e && !isNaN(e) && e >= 0 && e <= this.duration
            }, s.prototype.setTime = function(e) {
                return this.isValidTime(e) ? (l.debug("setTime", "time", e), this.currentTime = e, this.update(), l.debug("setTime", "player ready state", this.player.readyState), this.player.readyState === this.player.HAVE_ENOUGH_DATA ? (this.player.setCurrentTime(e), this.currentTime) : ($(this.player).one("canplay", function() {
                    l.debug("Player", "canplay", "buffered", e), this.setCurrentTime(e)
                }), this.currentTime)) : (l.warn("Timeline", "setTime", "time out of bounds", e), this.currentTime)
            }, s.prototype.seek = function(e) {
                l.debug("seek", e), this.currentTime = u(e, 0, this.duration), this.setTime(this.currentTime)
            }, s.prototype.stopAt = function(e) {
                if (!e || 0 >= e || e > this.duration) return l.warn("stopAt", "time out of bounds", e);
                var t = this;
                this.endTime = e, this.listeners.push(function() {
                    o.call(t)
                })
            }, s.prototype.getTime = function() {
                return this.currentTime
            }, s.prototype.getBuffered = function() {
                return isNaN(this.bufferedTime) ? (l.warn("getBuffered", "bufferedTime is not a number"), 0) : this.bufferedTime
            }, s.prototype.setBufferedTime = function(e) {
                var t = void 0 !== e ? e.target : this.player,
                    n = 0;
                t && t.buffered && t.buffered.length > 0 && t.buffered.end && t.duration ? n = t.buffered.end(t.buffered.length - 1) : t && void 0 !== t.bytesTotal && t.bytesTotal > 0 && void 0 !== t.bufferedBytes ? n = t.bufferedBytes / t.bytesTotal * t.duration : e && e.lengthComputable && 0 !== e.total && (n = e.loaded / e.total * t.duration);
                var i = u(n, 0, t.duration);
                l.debug("setBufferedTime", i), this.bufferedTime = i
            }, s.prototype.rewind = function() {
                this.setTime(0);
                var e = function(e, t) {
                    t(this)
                }.bind(this);
                $.each(this.listeners, e)
            }, t.exports = s
        }).call(this, e("b55mWE"), "undefined" != typeof self ? self : "undefined" != typeof window ? window : {}, e("buffer").Buffer, arguments[3], arguments[4], arguments[5], arguments[6], "/timeline.js", "/")
    }, {
        "./logging": 10,
        "./util": 26,
        b55mWE: 4,
        buffer: 3
    }],
    25: [function(e, t) {
        (function() {
            "use strict";

            function n(e) {
                var t = window.location.hash.substring(1),
                    n = t.split("&");
                if (-1 === t.indexOf(e)) return !1;
                for (var i = 0, r = n.length; r > i; i++) {
                    var a = n[i].split("=");
                    if (a[0] === e) return 1 === a.length ? !0 : decodeURIComponent(a[1])
                }
                return !1
            }
            var i = e("./timecode");
            t.exports = {
                getFragment: n,
                checkCurrent: function() {
                    var e = n("t");
                    return i.parse(e)
                }
            }
        }).call(this, e("b55mWE"), "undefined" != typeof self ? self : "undefined" != typeof window ? window : {}, e("buffer").Buffer, arguments[3], arguments[4], arguments[5], arguments[6], "/url.js", "/")
    }, {
        "./timecode": 23,
        b55mWE: 4,
        buffer: 3
    }],
    26: [function(e, t) {
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
        b55mWE: 4,
        buffer: 3
    }]
}, {}, [9]);