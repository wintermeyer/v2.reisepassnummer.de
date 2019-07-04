function initSearch() {
    getParameterByName("q") && (q = decodeURIComponent(getParameterByName("q")), $searchInput.val(q), execSearch(q)), $(document).on("submit", $searchForm, function(a) {
        a.preventDefault(), q = $searchInput.val(), execSearch(q)
    })
}

function execSearch(a) {
    ("" != a || allowEmpty) && (showLoader && toggleLoadingClass(), getSearchResults(processData()))
}

function toggleLoadingClass() {
    $resultsPlaceholder.toggleClass(loadingClass), $foundContainer.toggleClass(loadingClass)
}

function getSearchResults(a) {
    $.get(BASE_URL + jsonFeedUrl, a, "json")
}

function processData() {
    return $results = [],
        function(a) {
            var b = 0,
                c = "";
            $.each(a, function(a, d) {
                if (d.excerpt.toLowerCase().indexOf(q.toLowerCase()) > -1 || d.title.toLowerCase().indexOf(q.toLowerCase()) > -1) {
                    var e = populateResultContent($resultTemplate.html(), d);
                    b++, c += e
                }
            }), showLoader && toggleLoadingClass(), populateResultsString(b), showSearchResults(c)
        }
}

function showSearchResults(a) {
    $resultsPlaceholder.html(a)
}

function populateResultContent(a, b) {
    return a = injectContent(a, b.title, "##Title##"), a = injectContent(a, b.link, "##Url##"), a = injectContent(a, b.excerpt, "##Excerpt##"), a = injectContent(a, b.date, "##Date##")
}

function populateResultsString(a) {
    $foundTerm.text(q), $foundCount.text(a), $foundContainer.show()
}

function getParameterByName(a) {
    var b = RegExp("[?&]" + a + "=([^&]*)").exec(window.location.search);
    return b && decodeURIComponent(b[1].replace(/\+/g, " "))
}

function injectContent(a, b, c) {
    var d = new RegExp(c, "g");
    return a.replace(d, b)
}! function(a) {
    "use strict";
    a.fn.fitVids = function(b) {
        var c = {
            customSelector: null
        };
        if (!document.getElementById("fit-vids-style")) {
            var d = document.createElement("div"),
                e = document.getElementsByTagName("base")[0] || document.getElementsByTagName("script")[0],
                f = "&shy;<style>.fluid-width-video-wrapper{width:100%;position:relative;padding:0;}.fluid-width-video-wrapper iframe,.fluid-width-video-wrapper object,.fluid-width-video-wrapper embed {position:absolute;top:0;left:0;width:100%;height:100%;}</style>";
            d.className = "fit-vids-style", d.id = "fit-vids-style", d.style.display = "none", d.innerHTML = f, e.parentNode.insertBefore(d, e)
        }
        return b && a.extend(c, b), this.each(function() {
            var b = ["iframe[src*='player.vimeo.com']", "iframe[src*='youtube.com']", "iframe[src*='youtube-nocookie.com']", "iframe[src*='kickstarter.com'][src*='video.html']", "object", "embed"];
            c.customSelector && b.push(c.customSelector);
            var d = a(this).find(b.join(","));
            d = d.not("object object"), d.each(function() {
                var b = a(this);
                if (!("embed" === this.tagName.toLowerCase() && b.parent("object").length || b.parent(".fluid-width-video-wrapper").length)) {
                    var c = "object" === this.tagName.toLowerCase() || b.attr("height") && !isNaN(parseInt(b.attr("height"), 10)) ? parseInt(b.attr("height"), 10) : b.height(),
                        d = isNaN(parseInt(b.attr("width"), 10)) ? b.width() : parseInt(b.attr("width"), 10),
                        e = c / d;
                    if (!b.attr("id")) {
                        var f = "fitvid" + Math.floor(999999 * Math.random());
                        b.attr("id", f)
                    }
                    b.wrap('<div class="fluid-width-video-wrapper"></div>').parent(".fluid-width-video-wrapper").css("padding-top", 100 * e + "%"), b.removeAttr("height").removeAttr("width")
                }
            })
        })
    }
}(window.jQuery || window.Zepto),
function(a) {
    var b, c, d, e, f, g, h, i = "Close",
        j = "BeforeClose",
        k = "AfterClose",
        l = "BeforeAppend",
        m = "MarkupParse",
        n = "Open",
        o = "Change",
        p = "mfp",
        q = "." + p,
        r = "mfp-ready",
        s = "mfp-removing",
        t = "mfp-prevent-close",
        u = function() {},
        v = !!window.jQuery,
        w = a(window),
        x = function(a, c) {
            b.ev.on(p + a + q, c)
        },
        y = function(b, c, d, e) {
            var f = document.createElement("div");
            return f.className = "mfp-" + b, d && (f.innerHTML = d), e ? c && c.appendChild(f) : (f = a(f), c && f.appendTo(c)), f
        },
        z = function(c, d) {
            b.ev.triggerHandler(p + c, d), b.st.callbacks && (c = c.charAt(0).toLowerCase() + c.slice(1), b.st.callbacks[c] && b.st.callbacks[c].apply(b, a.isArray(d) ? d : [d]))
        },
        A = function(c) {
            return c === h && b.currTemplate.closeBtn || (b.currTemplate.closeBtn = a(b.st.closeMarkup.replace("%title%", b.st.tClose)), h = c), b.currTemplate.closeBtn
        },
        B = function() {
            a.magnificPopup.instance || (b = new u, b.init(), a.magnificPopup.instance = b)
        },
        C = function() {
            var a = document.createElement("p").style,
                b = ["ms", "O", "Moz", "Webkit"];
            if (void 0 !== a.transition) return !0;
            for (; b.length;)
                if (b.pop() + "Transition" in a) return !0;
            return !1
        };
    u.prototype = {
        constructor: u,
        init: function() {
            var c = navigator.appVersion;
            b.isIE7 = -1 !== c.indexOf("MSIE 7."), b.isIE8 = -1 !== c.indexOf("MSIE 8."), b.isLowIE = b.isIE7 || b.isIE8, b.isAndroid = /android/gi.test(c), b.isIOS = /iphone|ipad|ipod/gi.test(c), b.supportsTransition = C(), b.probablyMobile = b.isAndroid || b.isIOS || /(Opera Mini)|Kindle|webOS|BlackBerry|(Opera Mobi)|(Windows Phone)|IEMobile/i.test(navigator.userAgent), e = a(document), b.popupsCache = {}
        },
        open: function(c) {
            d || (d = a(document.body));
            var f;
            if (c.isObj === !1) {
                b.items = c.items.toArray(), b.index = 0;
                var h, i = c.items;
                for (f = 0; f < i.length; f++)
                    if (h = i[f], h.parsed && (h = h.el[0]), h === c.el[0]) {
                        b.index = f;
                        break
                    }
            } else b.items = a.isArray(c.items) ? c.items : [c.items], b.index = c.index || 0;
            if (b.isOpen) return b.updateItemHTML(), void 0;
            b.types = [], g = "", b.ev = c.mainEl && c.mainEl.length ? c.mainEl.eq(0) : e, c.key ? (b.popupsCache[c.key] || (b.popupsCache[c.key] = {}), b.currTemplate = b.popupsCache[c.key]) : b.currTemplate = {}, b.st = a.extend(!0, {}, a.magnificPopup.defaults, c), b.fixedContentPos = "auto" === b.st.fixedContentPos ? !b.probablyMobile : b.st.fixedContentPos, b.st.modal && (b.st.closeOnContentClick = !1, b.st.closeOnBgClick = !1, b.st.showCloseBtn = !1, b.st.enableEscapeKey = !1), b.bgOverlay || (b.bgOverlay = y("bg").on("click" + q, function() {
                b.close()
            }), b.wrap = y("wrap").attr("tabindex", -1).on("click" + q, function(a) {
                b._checkIfClose(a.target) && b.close()
            }), b.container = y("container", b.wrap)), b.contentContainer = y("content"), b.st.preloader && (b.preloader = y("preloader", b.container, b.st.tLoading));
            var j = a.magnificPopup.modules;
            for (f = 0; f < j.length; f++) {
                var k = j[f];
                k = k.charAt(0).toUpperCase() + k.slice(1), b["init" + k].call(b)
            }
            z("BeforeOpen"), b.st.showCloseBtn && (b.st.closeBtnInside ? (x(m, function(a, b, c, d) {
                c.close_replaceWith = A(d.type)
            }), g += " mfp-close-btn-in") : b.wrap.append(A())), b.st.alignTop && (g += " mfp-align-top"), b.fixedContentPos ? b.wrap.css({
                overflow: b.st.overflowY,
                overflowX: "hidden",
                overflowY: b.st.overflowY
            }) : b.wrap.css({
                top: w.scrollTop(),
                position: "absolute"
            }), (b.st.fixedBgPos === !1 || "auto" === b.st.fixedBgPos && !b.fixedContentPos) && b.bgOverlay.css({
                height: e.height(),
                position: "absolute"
            }), b.st.enableEscapeKey && e.on("keyup" + q, function(a) {
                27 === a.keyCode && b.close()
            }), w.on("resize" + q, function() {
                b.updateSize()
            }), b.st.closeOnContentClick || (g += " mfp-auto-cursor"), g && b.wrap.addClass(g);
            var l = b.wH = w.height(),
                o = {};
            if (b.fixedContentPos && b._hasScrollBar(l)) {
                var p = b._getScrollbarSize();
                p && (o.marginRight = p)
            }
            b.fixedContentPos && (b.isIE7 ? a("body, html").css("overflow", "hidden") : o.overflow = "hidden");
            var s = b.st.mainClass;
            return b.isIE7 && (s += " mfp-ie7"), s && b._addClassToMFP(s), b.updateItemHTML(), z("BuildControls"), a("html").css(o), b.bgOverlay.add(b.wrap).prependTo(b.st.prependTo || d), b._lastFocusedEl = document.activeElement, setTimeout(function() {
                b.content ? (b._addClassToMFP(r), b._setFocus()) : b.bgOverlay.addClass(r), e.on("focusin" + q, b._onFocusIn)
            }, 16), b.isOpen = !0, b.updateSize(l), z(n), c
        },
        close: function() {
            b.isOpen && (z(j), b.isOpen = !1, b.st.removalDelay && !b.isLowIE && b.supportsTransition ? (b._addClassToMFP(s), setTimeout(function() {
                b._close()
            }, b.st.removalDelay)) : b._close())
        },
        _close: function() {
            z(i);
            var c = s + " " + r + " ";
            if (b.bgOverlay.detach(), b.wrap.detach(), b.container.empty(), b.st.mainClass && (c += b.st.mainClass + " "), b._removeClassFromMFP(c), b.fixedContentPos) {
                var d = {
                    marginRight: ""
                };
                b.isIE7 ? a("body, html").css("overflow", "") : d.overflow = "", a("html").css(d)
            }
            e.off("keyup" + q + " focusin" + q), b.ev.off(q), b.wrap.attr("class", "mfp-wrap").removeAttr("style"), b.bgOverlay.attr("class", "mfp-bg"), b.container.attr("class", "mfp-container"), !b.st.showCloseBtn || b.st.closeBtnInside && b.currTemplate[b.currItem.type] !== !0 || b.currTemplate.closeBtn && b.currTemplate.closeBtn.detach(), b._lastFocusedEl && a(b._lastFocusedEl).focus(), b.currItem = null, b.content = null, b.currTemplate = null, b.prevHeight = 0, z(k)
        },
        updateSize: function(a) {
            if (b.isIOS) {
                var c = document.documentElement.clientWidth / window.innerWidth,
                    d = window.innerHeight * c;
                b.wrap.css("height", d), b.wH = d
            } else b.wH = a || w.height();
            b.fixedContentPos || b.wrap.css("height", b.wH), z("Resize")
        },
        updateItemHTML: function() {
            var c = b.items[b.index];
            b.contentContainer.detach(), b.content && b.content.detach(), c.parsed || (c = b.parseEl(b.index));
            var d = c.type;
            if (z("BeforeChange", [b.currItem ? b.currItem.type : "", d]), b.currItem = c, !b.currTemplate[d]) {
                var e = b.st[d] ? b.st[d].markup : !1;
                z("FirstMarkupParse", e), b.currTemplate[d] = e ? a(e) : !0
            }
            f && f !== c.type && b.container.removeClass("mfp-" + f + "-holder");
            var g = b["get" + d.charAt(0).toUpperCase() + d.slice(1)](c, b.currTemplate[d]);
            b.appendContent(g, d), c.preloaded = !0, z(o, c), f = c.type, b.container.prepend(b.contentContainer), z("AfterChange")
        },
        appendContent: function(a, c) {
            b.content = a, a ? b.st.showCloseBtn && b.st.closeBtnInside && b.currTemplate[c] === !0 ? b.content.find(".mfp-close").length || b.content.append(A()) : b.content = a : b.content = "", z(l), b.container.addClass("mfp-" + c + "-holder"), b.contentContainer.append(b.content)
        },
        parseEl: function(c) {
            var d, e = b.items[c];
            if (e.tagName ? e = {
                    el: a(e)
                } : (d = e.type, e = {
                    data: e,
                    src: e.src
                }), e.el) {
                for (var f = b.types, g = 0; g < f.length; g++)
                    if (e.el.hasClass("mfp-" + f[g])) {
                        d = f[g];
                        break
                    }
                e.src = e.el.attr("data-mfp-src"), e.src || (e.src = e.el.attr("href"))
            }
            return e.type = d || b.st.type || "inline", e.index = c, e.parsed = !0, b.items[c] = e, z("ElementParse", e), b.items[c]
        },
        addGroup: function(a, c) {
            var d = function(d) {
                d.mfpEl = this, b._openClick(d, a, c)
            };
            c || (c = {});
            var e = "click.magnificPopup";
            c.mainEl = a, c.items ? (c.isObj = !0, a.off(e).on(e, d)) : (c.isObj = !1, c.delegate ? a.off(e).on(e, c.delegate, d) : (c.items = a, a.off(e).on(e, d)))
        },
        _openClick: function(c, d, e) {
            var f = void 0 !== e.midClick ? e.midClick : a.magnificPopup.defaults.midClick;
            if (f || 2 !== c.which && !c.ctrlKey && !c.metaKey) {
                var g = void 0 !== e.disableOn ? e.disableOn : a.magnificPopup.defaults.disableOn;
                if (g)
                    if (a.isFunction(g)) {
                        if (!g.call(b)) return !0
                    } else if (w.width() < g) return !0;
                c.type && (c.preventDefault(), b.isOpen && c.stopPropagation()), e.el = a(c.mfpEl), e.delegate && (e.items = d.find(e.delegate)), b.open(e)
            }
        },
        updateStatus: function(a, d) {
            if (b.preloader) {
                c !== a && b.container.removeClass("mfp-s-" + c), d || "loading" !== a || (d = b.st.tLoading);
                var e = {
                    status: a,
                    text: d
                };
                z("UpdateStatus", e), a = e.status, d = e.text, b.preloader.html(d), b.preloader.find("a").on("click", function(a) {
                    a.stopImmediatePropagation()
                }), b.container.addClass("mfp-s-" + a), c = a
            }
        },
        _checkIfClose: function(c) {
            if (!a(c).hasClass(t)) {
                var d = b.st.closeOnContentClick,
                    e = b.st.closeOnBgClick;
                if (d && e) return !0;
                if (!b.content || a(c).hasClass("mfp-close") || b.preloader && c === b.preloader[0]) return !0;
                if (c === b.content[0] || a.contains(b.content[0], c)) {
                    if (d) return !0
                } else if (e && a.contains(document, c)) return !0;
                return !1
            }
        },
        _addClassToMFP: function(a) {
            b.bgOverlay.addClass(a), b.wrap.addClass(a)
        },
        _removeClassFromMFP: function(a) {
            this.bgOverlay.removeClass(a), b.wrap.removeClass(a)
        },
        _hasScrollBar: function(a) {
            return (b.isIE7 ? e.height() : document.body.scrollHeight) > (a || w.height())
        },
        _setFocus: function() {
            (b.st.focus ? b.content.find(b.st.focus).eq(0) : b.wrap).focus()
        },
        _onFocusIn: function(c) {
            return c.target === b.wrap[0] || a.contains(b.wrap[0], c.target) ? void 0 : (b._setFocus(), !1)
        },
        _parseMarkup: function(b, c, d) {
            var e;
            d.data && (c = a.extend(d.data, c)), z(m, [b, c, d]), a.each(c, function(a, c) {
                if (void 0 === c || c === !1) return !0;
                if (e = a.split("_"), e.length > 1) {
                    var d = b.find(q + "-" + e[0]);
                    if (d.length > 0) {
                        var f = e[1];
                        "replaceWith" === f ? d[0] !== c[0] && d.replaceWith(c) : "img" === f ? d.is("img") ? d.attr("src", c) : d.replaceWith('<img src="' + c + '" class="' + d.attr("class") + '" />') : d.attr(e[1], c)
                    }
                } else b.find(q + "-" + a).html(c)
            })
        },
        _getScrollbarSize: function() {
            if (void 0 === b.scrollbarSize) {
                var a = document.createElement("div");
                a.id = "mfp-sbm", a.style.cssText = "width: 99px; height: 99px; overflow: scroll; position: absolute; top: -9999px;", document.body.appendChild(a), b.scrollbarSize = a.offsetWidth - a.clientWidth, document.body.removeChild(a)
            }
            return b.scrollbarSize
        }
    }, a.magnificPopup = {
        instance: null,
        proto: u.prototype,
        modules: [],
        open: function(b, c) {
            return B(), b = b ? a.extend(!0, {}, b) : {}, b.isObj = !0, b.index = c || 0, this.instance.open(b)
        },
        close: function() {
            return a.magnificPopup.instance && a.magnificPopup.instance.close()
        },
        registerModule: function(b, c) {
            c.options && (a.magnificPopup.defaults[b] = c.options), a.extend(this.proto, c.proto), this.modules.push(b)
        },
        defaults: {
            disableOn: 0,
            key: null,
            midClick: !1,
            mainClass: "",
            preloader: !0,
            focus: "",
            closeOnContentClick: !1,
            closeOnBgClick: !0,
            closeBtnInside: !0,
            showCloseBtn: !0,
            enableEscapeKey: !0,
            modal: !1,
            alignTop: !1,
            removalDelay: 0,
            prependTo: null,
            fixedContentPos: "auto",
            fixedBgPos: "auto",
            overflowY: "auto",
            closeMarkup: '<button title="%title%" type="button" class="mfp-close">&times;</button>',
            tClose: "Close (Esc)",
            tLoading: "Loading..."
        }
    }, a.fn.magnificPopup = function(c) {
        B();
        var d = a(this);
        if ("string" == typeof c)
            if ("open" === c) {
                var e, f = v ? d.data("magnificPopup") : d[0].magnificPopup,
                    g = parseInt(arguments[1], 10) || 0;
                f.items ? e = f.items[g] : (e = d, f.delegate && (e = e.find(f.delegate)), e = e.eq(g)), b._openClick({
                    mfpEl: e
                }, d, f)
            } else b.isOpen && b[c].apply(b, Array.prototype.slice.call(arguments, 1));
        else c = a.extend(!0, {}, c), v ? d.data("magnificPopup", c) : d[0].magnificPopup = c, b.addGroup(d, c);
        return d
    };
    var D, E, F, G = "inline",
        H = function() {
            F && (E.after(F.addClass(D)).detach(), F = null)
        };
    a.magnificPopup.registerModule(G, {
        options: {
            hiddenClass: "hide",
            markup: "",
            tNotFound: "Content not found"
        },
        proto: {
            initInline: function() {
                b.types.push(G), x(i + "." + G, function() {
                    H()
                })
            },
            getInline: function(c, d) {
                if (H(), c.src) {
                    var e = b.st.inline,
                        f = a(c.src);
                    if (f.length) {
                        var g = f[0].parentNode;
                        g && g.tagName && (E || (D = e.hiddenClass, E = y(D), D = "mfp-" + D), F = f.after(E).detach().removeClass(D)), b.updateStatus("ready")
                    } else b.updateStatus("error", e.tNotFound), f = a("<div>");
                    return c.inlineElement = f, f
                }
                return b.updateStatus("ready"), b._parseMarkup(d, {}, c), d
            }
        }
    });
    var I, J = "ajax",
        K = function() {
            I && d.removeClass(I)
        },
        L = function() {
            K(), b.req && b.req.abort()
        };
    a.magnificPopup.registerModule(J, {
        options: {
            settings: null,
            cursor: "mfp-ajax-cur",
            tError: '<a href="%url%">The content</a> could not be loaded.'
        },
        proto: {
            initAjax: function() {
                b.types.push(J), I = b.st.ajax.cursor, x(i + "." + J, L), x("BeforeChange." + J, L)
            },
            getAjax: function(c) {
                I && d.addClass(I), b.updateStatus("loading");
                var e = a.extend({
                    url: c.src,
                    success: function(d, e, f) {
                        var g = {
                            data: d,
                            xhr: f
                        };
                        z("ParseAjax", g), b.appendContent(a(g.data), J), c.finished = !0, K(), b._setFocus(), setTimeout(function() {
                            b.wrap.addClass(r)
                        }, 16), b.updateStatus("ready"), z("AjaxContentAdded")
                    },
                    error: function() {
                        K(), c.finished = c.loadError = !0, b.updateStatus("error", b.st.ajax.tError.replace("%url%", c.src))
                    }
                }, b.st.ajax.settings);
                return b.req = a.ajax(e), ""
            }
        }
    });
    var M, N = function(c) {
        if (c.data && void 0 !== c.data.title) return c.data.title;
        var d = b.st.image.titleSrc;
        if (d) {
            if (a.isFunction(d)) return d.call(b, c);
            if (c.el) return c.el.attr(d) || ""
        }
        return ""
    };
    a.magnificPopup.registerModule("image", {
        options: {
            markup: '<div class="mfp-figure"><div class="mfp-close"></div><figure><div class="mfp-img"></div><figcaption><div class="mfp-bottom-bar"><div class="mfp-title"></div><div class="mfp-counter"></div></div></figcaption></figure></div>',
            cursor: "mfp-zoom-out-cur",
            titleSrc: "title",
            verticalFit: !0,
            tError: '<a href="%url%">The image</a> could not be loaded.'
        },
        proto: {
            initImage: function() {
                var a = b.st.image,
                    c = ".image";
                b.types.push("image"), x(n + c, function() {
                    "image" === b.currItem.type && a.cursor && d.addClass(a.cursor)
                }), x(i + c, function() {
                    a.cursor && d.removeClass(a.cursor), w.off("resize" + q)
                }), x("Resize" + c, b.resizeImage), b.isLowIE && x("AfterChange", b.resizeImage)
            },
            resizeImage: function() {
                var a = b.currItem;
                if (a && a.img && b.st.image.verticalFit) {
                    var c = 0;
                    b.isLowIE && (c = parseInt(a.img.css("padding-top"), 10) + parseInt(a.img.css("padding-bottom"), 10)), a.img.css("max-height", b.wH - c)
                }
            },
            _onImageHasSize: function(a) {
                a.img && (a.hasSize = !0, M && clearInterval(M), a.isCheckingImgSize = !1, z("ImageHasSize", a), a.imgHidden && (b.content && b.content.removeClass("mfp-loading"), a.imgHidden = !1))
            },
            findImageSize: function(a) {
                var c = 0,
                    d = a.img[0],
                    e = function(f) {
                        M && clearInterval(M), M = setInterval(function() {
                            return d.naturalWidth > 0 ? (b._onImageHasSize(a), void 0) : (c > 200 && clearInterval(M), c++, 3 === c ? e(10) : 40 === c ? e(50) : 100 === c && e(500), void 0)
                        }, f)
                    };
                e(1)
            },
            getImage: function(c, d) {
                var e = 0,
                    f = function() {
                        c && (c.img[0].complete ? (c.img.off(".mfploader"), c === b.currItem && (b._onImageHasSize(c), b.updateStatus("ready")), c.hasSize = !0, c.loaded = !0, z("ImageLoadComplete")) : (e++, 200 > e ? setTimeout(f, 100) : g()))
                    },
                    g = function() {
                        c && (c.img.off(".mfploader"), c === b.currItem && (b._onImageHasSize(c), b.updateStatus("error", h.tError.replace("%url%", c.src))), c.hasSize = !0, c.loaded = !0, c.loadError = !0)
                    },
                    h = b.st.image,
                    i = d.find(".mfp-img");
                if (i.length) {
                    var j = document.createElement("img");
                    j.className = "mfp-img", c.img = a(j).on("load.mfploader", f).on("error.mfploader", g), j.src = c.src, i.is("img") && (c.img = c.img.clone()), j = c.img[0], j.naturalWidth > 0 ? c.hasSize = !0 : j.width || (c.hasSize = !1)
                }
                return b._parseMarkup(d, {
                    title: N(c),
                    img_replaceWith: c.img
                }, c), b.resizeImage(), c.hasSize ? (M && clearInterval(M), c.loadError ? (d.addClass("mfp-loading"), b.updateStatus("error", h.tError.replace("%url%", c.src))) : (d.removeClass("mfp-loading"), b.updateStatus("ready")), d) : (b.updateStatus("loading"), c.loading = !0, c.hasSize || (c.imgHidden = !0, d.addClass("mfp-loading"), b.findImageSize(c)), d)
            }
        }
    });
    var O, P = function() {
        return void 0 === O && (O = void 0 !== document.createElement("p").style.MozTransform), O
    };
    a.magnificPopup.registerModule("zoom", {
        options: {
            enabled: !1,
            easing: "ease-in-out",
            duration: 300,
            opener: function(a) {
                return a.is("img") ? a : a.find("img")
            }
        },
        proto: {
            initZoom: function() {
                var a, c = b.st.zoom,
                    d = ".zoom";
                if (c.enabled && b.supportsTransition) {
                    var e, f, g = c.duration,
                        h = function(a) {
                            var b = a.clone().removeAttr("style").removeAttr("class").addClass("mfp-animated-image"),
                                d = "all " + c.duration / 1e3 + "s " + c.easing,
                                e = {
                                    position: "fixed",
                                    zIndex: 9999,
                                    left: 0,
                                    top: 0,
                                    "-webkit-backface-visibility": "hidden"
                                },
                                f = "transition";
                            return e["-webkit-" + f] = e["-moz-" + f] = e["-o-" + f] = e[f] = d, b.css(e), b
                        },
                        k = function() {
                            b.content.css("visibility", "visible")
                        };
                    x("BuildControls" + d, function() {
                        if (b._allowZoom()) {
                            if (clearTimeout(e), b.content.css("visibility", "hidden"), a = b._getItemToZoom(), !a) return k(), void 0;
                            f = h(a), f.css(b._getOffset()), b.wrap.append(f), e = setTimeout(function() {
                                f.css(b._getOffset(!0)), e = setTimeout(function() {
                                    k(), setTimeout(function() {
                                        f.remove(), a = f = null, z("ZoomAnimationEnded")
                                    }, 16)
                                }, g)
                            }, 16)
                        }
                    }), x(j + d, function() {
                        if (b._allowZoom()) {
                            if (clearTimeout(e), b.st.removalDelay = g, !a) {
                                if (a = b._getItemToZoom(), !a) return;
                                f = h(a)
                            }
                            f.css(b._getOffset(!0)), b.wrap.append(f), b.content.css("visibility", "hidden"), setTimeout(function() {
                                f.css(b._getOffset())
                            }, 16)
                        }
                    }), x(i + d, function() {
                        b._allowZoom() && (k(), f && f.remove(), a = null)
                    })
                }
            },
            _allowZoom: function() {
                return "image" === b.currItem.type
            },
            _getItemToZoom: function() {
                return b.currItem.hasSize ? b.currItem.img : !1
            },
            _getOffset: function(c) {
                var d;
                d = c ? b.currItem.img : b.st.zoom.opener(b.currItem.el || b.currItem);
                var e = d.offset(),
                    f = parseInt(d.css("padding-top"), 10),
                    g = parseInt(d.css("padding-bottom"), 10);
                e.top -= a(window).scrollTop() - f;
                var h = {
                    width: d.width(),
                    height: (v ? d.innerHeight() : d[0].offsetHeight) - g - f
                };
                return P() ? h["-moz-transform"] = h.transform = "translate(" + e.left + "px," + e.top + "px)" : (h.left = e.left, h.top = e.top), h
            }
        }
    });
    var Q = "iframe",
        R = "//about:blank",
        S = function(a) {
            if (b.currTemplate[Q]) {
                var c = b.currTemplate[Q].find("iframe");
                c.length && (a || (c[0].src = R), b.isIE8 && c.css("display", a ? "block" : "none"))
            }
        };
    a.magnificPopup.registerModule(Q, {
        options: {
            markup: '<div class="mfp-iframe-scaler"><div class="mfp-close"></div><iframe class="mfp-iframe" src="//about:blank" frameborder="0" allowfullscreen></iframe></div>',
            srcAction: "iframe_src",
            patterns: {
                youtube: {
                    index: "youtube.com",
                    id: "v=",
                    src: "//www.youtube.com/embed/%id%?autoplay=1"
                },
                vimeo: {
                    index: "vimeo.com/",
                    id: "/",
                    src: "//player.vimeo.com/video/%id%?autoplay=1"
                },
                gmaps: {
                    index: "//maps.google.",
                    src: "%id%&output=embed"
                }
            }
        },
        proto: {
            initIframe: function() {
                b.types.push(Q), x("BeforeChange", function(a, b, c) {
                    b !== c && (b === Q ? S() : c === Q && S(!0))
                }), x(i + "." + Q, function() {
                    S()
                })
            },
            getIframe: function(c, d) {
                var e = c.src,
                    f = b.st.iframe;
                a.each(f.patterns, function() {
                    return e.indexOf(this.index) > -1 ? (this.id && (e = "string" == typeof this.id ? e.substr(e.lastIndexOf(this.id) + this.id.length, e.length) : this.id.call(this, e)), e = this.src.replace("%id%", e), !1) : void 0
                });
                var g = {};
                return f.srcAction && (g[f.srcAction] = e), b._parseMarkup(d, g, c), b.updateStatus("ready"), d
            }
        }
    });
    var T = function(a) {
            var c = b.items.length;
            return a > c - 1 ? a - c : 0 > a ? c + a : a
        },
        U = function(a, b, c) {
            return a.replace(/%curr%/gi, b + 1).replace(/%total%/gi, c)
        };
    a.magnificPopup.registerModule("gallery", {
        options: {
            enabled: !1,
            arrowMarkup: '<button title="%title%" type="button" class="mfp-arrow mfp-arrow-%dir%"></button>',
            preload: [0, 2],
            navigateByImgClick: !0,
            arrows: !0,
            tPrev: "Previous (Left arrow key)",
            tNext: "Next (Right arrow key)",
            tCounter: "%curr% of %total%"
        },
        proto: {
            initGallery: function() {
                var c = b.st.gallery,
                    d = ".mfp-gallery",
                    f = Boolean(a.fn.mfpFastClick);
                return b.direction = !0, c && c.enabled ? (g += " mfp-gallery", x(n + d, function() {
                    c.navigateByImgClick && b.wrap.on("click" + d, ".mfp-img", function() {
                        return b.items.length > 1 ? (b.next(), !1) : void 0
                    }), e.on("keydown" + d, function(a) {
                        37 === a.keyCode ? b.prev() : 39 === a.keyCode && b.next()
                    })
                }), x("UpdateStatus" + d, function(a, c) {
                    c.text && (c.text = U(c.text, b.currItem.index, b.items.length))
                }), x(m + d, function(a, d, e, f) {
                    var g = b.items.length;
                    e.counter = g > 1 ? U(c.tCounter, f.index, g) : ""
                }), x("BuildControls" + d, function() {
                    if (b.items.length > 1 && c.arrows && !b.arrowLeft) {
                        var d = c.arrowMarkup,
                            e = b.arrowLeft = a(d.replace(/%title%/gi, c.tPrev).replace(/%dir%/gi, "left")).addClass(t),
                            g = b.arrowRight = a(d.replace(/%title%/gi, c.tNext).replace(/%dir%/gi, "right")).addClass(t),
                            h = f ? "mfpFastClick" : "click";
                        e[h](function() {
                            b.prev()
                        }), g[h](function() {
                            b.next()
                        }), b.isIE7 && (y("b", e[0], !1, !0), y("a", e[0], !1, !0), y("b", g[0], !1, !0), y("a", g[0], !1, !0)), b.container.append(e.add(g))
                    }
                }), x(o + d, function() {
                    b._preloadTimeout && clearTimeout(b._preloadTimeout), b._preloadTimeout = setTimeout(function() {
                        b.preloadNearbyImages(), b._preloadTimeout = null
                    }, 16)
                }), x(i + d, function() {
                    e.off(d), b.wrap.off("click" + d), b.arrowLeft && f && b.arrowLeft.add(b.arrowRight).destroyMfpFastClick(), b.arrowRight = b.arrowLeft = null
                }), void 0) : !1
            },
            next: function() {
                b.direction = !0, b.index = T(b.index + 1), b.updateItemHTML()
            },
            prev: function() {
                b.direction = !1, b.index = T(b.index - 1), b.updateItemHTML()
            },
            goTo: function(a) {
                b.direction = a >= b.index, b.index = a, b.updateItemHTML()
            },
            preloadNearbyImages: function() {
                var a, c = b.st.gallery.preload,
                    d = Math.min(c[0], b.items.length),
                    e = Math.min(c[1], b.items.length);
                for (a = 1; a <= (b.direction ? e : d); a++) b._preloadItem(b.index + a);
                for (a = 1; a <= (b.direction ? d : e); a++) b._preloadItem(b.index - a)
            },
            _preloadItem: function(c) {
                if (c = T(c), !b.items[c].preloaded) {
                    var d = b.items[c];
                    d.parsed || (d = b.parseEl(c)), z("LazyLoad", d), "image" === d.type && (d.img = a('<img class="mfp-img" />').on("load.mfploader", function() {
                        d.hasSize = !0
                    }).on("error.mfploader", function() {
                        d.hasSize = !0, d.loadError = !0, z("LazyLoadError", d)
                    }).attr("src", d.src)), d.preloaded = !0
                }
            }
        }
    });
    var V = "retina";
    a.magnificPopup.registerModule(V, {
            options: {
                replaceSrc: function(a) {
                    return a.src.replace(/\.\w+$/, function(a) {
                        return "@2x" + a
                    })
                },
                ratio: 1
            },
            proto: {
                initRetina: function() {
                    if (window.devicePixelRatio > 1) {
                        var a = b.st.retina,
                            c = a.ratio;
                        c = isNaN(c) ? c() : c, c > 1 && (x("ImageHasSize." + V, function(a, b) {
                            b.img.css({
                                "max-width": b.img[0].naturalWidth / c,
                                width: "100%"
                            })
                        }), x("ElementParse." + V, function(b, d) {
                            d.src = a.replaceSrc(d, c)
                        }))
                    }
                }
            }
        }),
        function() {
            var b = 1e3,
                c = "ontouchstart" in window,
                d = function() {
                    w.off("touchmove" + f + " touchend" + f)
                },
                e = "mfpFastClick",
                f = "." + e;
            a.fn.mfpFastClick = function(e) {
                return a(this).each(function() {
                    var g, h = a(this);
                    if (c) {
                        var i, j, k, l, m, n;
                        h.on("touchstart" + f, function(a) {
                            l = !1, n = 1, m = a.originalEvent ? a.originalEvent.touches[0] : a.touches[0], j = m.clientX, k = m.clientY, w.on("touchmove" + f, function(a) {
                                m = a.originalEvent ? a.originalEvent.touches : a.touches, n = m.length, m = m[0], (Math.abs(m.clientX - j) > 10 || Math.abs(m.clientY - k) > 10) && (l = !0, d())
                            }).on("touchend" + f, function(a) {
                                d(), l || n > 1 || (g = !0, a.preventDefault(), clearTimeout(i), i = setTimeout(function() {
                                    g = !1
                                }, b), e())
                            })
                        })
                    }
                    h.on("click" + f, function() {
                        g || e()
                    })
                })
            }, a.fn.destroyMfpFastClick = function() {
                a(this).off("touchstart" + f + " click" + f), c && w.off("touchmove" + f + " touchend" + f)
            }
        }(), B()
}(window.jQuery || window.Zepto), window.matchMedia = window.matchMedia || function(a) {
        "use strict";
        var b, c = a.documentElement,
            d = c.firstElementChild || c.firstChild,
            e = a.createElement("body"),
            f = a.createElement("div");
        return f.id = "mq-test-1", f.style.cssText = "position:absolute;top:-100em", e.style.background = "none", e.appendChild(f),
            function(a) {
                return f.innerHTML = '&shy;<style media="' + a + '"> #mq-test-1 { width: 42px; }</style>', c.insertBefore(e, d), b = 42 === f.offsetWidth, c.removeChild(e), {
                    matches: b,
                    media: a
                }
            }
    }(document),
    function(a) {
        "use strict";

        function b() {
            v(!0)
        }
        var c = {};
        if (a.respond = c, c.update = function() {}, c.mediaQueriesSupported = a.matchMedia && a.matchMedia("only all").matches, !c.mediaQueriesSupported) {
            var d, e, f, g = a.document,
                h = g.documentElement,
                i = [],
                j = [],
                k = [],
                l = {},
                m = 30,
                n = g.getElementsByTagName("head")[0] || h,
                o = g.getElementsByTagName("base")[0],
                p = n.getElementsByTagName("link"),
                q = [],
                r = function() {
                    for (var b = 0; b < p.length; b++) {
                        var c = p[b],
                            d = c.href,
                            e = c.media,
                            f = c.rel && "stylesheet" === c.rel.toLowerCase();
                        d && f && !l[d] && (c.styleSheet && c.styleSheet.rawCssText ? (t(c.styleSheet.rawCssText, d, e), l[d] = !0) : (!/^([a-zA-Z:]*\/\/)/.test(d) && !o || d.replace(RegExp.$1, "").split("/")[0] === a.location.host) && q.push({
                            href: d,
                            media: e
                        }))
                    }
                    s()
                },
                s = function() {
                    if (q.length) {
                        var b = q.shift();
                        w(b.href, function(c) {
                            t(c, b.href, b.media), l[b.href] = !0, a.setTimeout(function() {
                                s()
                            }, 0)
                        })
                    }
                },
                t = function(a, b, c) {
                    var d = a.match(/@media[^\{]+\{([^\{\}]*\{[^\}\{]*\})+/gi),
                        e = d && d.length || 0;
                    b = b.substring(0, b.lastIndexOf("/"));
                    var f = function(a) {
                            return a.replace(/(url\()['"]?([^\/\)'"][^:\)'"]+)['"]?(\))/g, "$1" + b + "$2$3")
                        },
                        g = !e && c;
                    b.length && (b += "/"), g && (e = 1);
                    for (var h = 0; e > h; h++) {
                        var k, l, m, n;
                        g ? (k = c, j.push(f(a))) : (k = d[h].match(/@media *([^\{]+)\{([\S\s]+?)$/) && RegExp.$1, j.push(RegExp.$2 && f(RegExp.$2))), m = k.split(","), n = m.length;
                        for (var o = 0; n > o; o++) l = m[o], i.push({
                            media: l.split("(")[0].match(/(only\s+)?([a-zA-Z]+)\s?/) && RegExp.$2 || "all",
                            rules: j.length - 1,
                            hasquery: l.indexOf("(") > -1,
                            minw: l.match(/\(\s*min\-width\s*:\s*(\s*[0-9\.]+)(px|em)\s*\)/) && parseFloat(RegExp.$1) + (RegExp.$2 || ""),
                            maxw: l.match(/\(\s*max\-width\s*:\s*(\s*[0-9\.]+)(px|em)\s*\)/) && parseFloat(RegExp.$1) + (RegExp.$2 || "")
                        })
                    }
                    v()
                },
                u = function() {
                    var a, b = g.createElement("div"),
                        c = g.body,
                        d = !1;
                    return b.style.cssText = "position:absolute;font-size:1em;width:1em", c || (c = d = g.createElement("body"), c.style.background = "none"), c.appendChild(b), h.insertBefore(c, h.firstChild), a = b.offsetWidth, d ? h.removeChild(c) : c.removeChild(b), a = f = parseFloat(a)
                },
                v = function(b) {
                    var c = "clientWidth",
                        l = h[c],
                        o = "CSS1Compat" === g.compatMode && l || g.body[c] || l,
                        q = {},
                        r = p[p.length - 1],
                        s = (new Date).getTime();
                    if (b && d && m > s - d) return a.clearTimeout(e), e = a.setTimeout(v, m), void 0;
                    d = s;
                    for (var t in i)
                        if (i.hasOwnProperty(t)) {
                            var w = i[t],
                                x = w.minw,
                                y = w.maxw,
                                z = null === x,
                                A = null === y,
                                B = "em";
                            x && (x = parseFloat(x) * (x.indexOf(B) > -1 ? f || u() : 1)), y && (y = parseFloat(y) * (y.indexOf(B) > -1 ? f || u() : 1)), w.hasquery && (z && A || !(z || o >= x) || !(A || y >= o)) || (q[w.media] || (q[w.media] = []), q[w.media].push(j[w.rules]))
                        }
                    for (var C in k) k.hasOwnProperty(C) && k[C] && k[C].parentNode === n && n.removeChild(k[C]);
                    for (var D in q)
                        if (q.hasOwnProperty(D)) {
                            var E = g.createElement("style"),
                                F = q[D].join("\n");
                            E.type = "text/css", E.media = D, n.insertBefore(E, r.nextSibling), E.styleSheet ? E.styleSheet.cssText = F : E.appendChild(g.createTextNode(F)), k.push(E)
                        }
                },
                w = function(a, b) {
                    var c = x();
                    c && (c.open("GET", a, !0), c.onreadystatechange = function() {
                        4 !== c.readyState || 200 !== c.status && 304 !== c.status || b(c.responseText)
                    }, 4 !== c.readyState && c.send(null))
                },
                x = function() {
                    var b = !1;
                    try {
                        b = new a.XMLHttpRequest
                    } catch (c) {
                        b = new a.ActiveXObject("Microsoft.XMLHTTP")
                    }
                    return function() {
                        return b
                    }
                }();
            r(), c.update = r, a.addEventListener ? a.addEventListener("resize", b, !1) : a.attachEvent && a.attachEvent("onresize", b)
        }
    }(this);
var responsiveNav = function(a, b) {
        function c(a, b) {
            return s || (s = new r(a, b)), s
        }
        var d = !!a.getComputedStyle;
        a.getComputedStyle || (a.getComputedStyle = function(a) {
            return this.el = a, this.getPropertyValue = function(b) {
                var c = /(\-([a-z]){1})/g;
                return "float" === b && (b = "styleFloat"), c.test(b) && (b = b.replace(c, function() {
                    return arguments[2].toUpperCase()
                })), a.currentStyle[b] ? a.currentStyle[b] : null
            }, this
        });
        var e, f, g, h = b.documentElement,
            i = b.getElementsByTagName("head")[0],
            j = b.createElement("style"),
            k = !1,
            l = function(a, b, c, d) {
                if ("addEventListener" in a) try {
                    a.addEventListener(b, c, d)
                } catch (e) {
                    if ("object" != typeof c || !c.handleEvent) throw e;
                    a.addEventListener(b, function(a) {
                        c.handleEvent.call(c, a)
                    }, d)
                } else "attachEvent" in a && ("object" == typeof c && c.handleEvent ? a.attachEvent("on" + b, function() {
                    c.handleEvent.call(c)
                }) : a.attachEvent("on" + b, c))
            },
            m = function(a, b, c, d) {
                if ("removeEventListener" in a) try {
                    a.removeEventListener(b, c, d)
                } catch (e) {
                    if ("object" != typeof c || !c.handleEvent) throw e;
                    a.removeEventListener(b, function(a) {
                        c.handleEvent.call(c, a)
                    }, d)
                } else "detachEvent" in a && ("object" == typeof c && c.handleEvent ? a.detachEvent("on" + b, function() {
                    c.handleEvent.call(c)
                }) : a.detachEvent("on" + b, c))
            },
            n = function(a) {
                for (var b = a.firstChild; null !== b && 1 !== b.nodeType;) b = b.nextSibling;
                return b
            },
            o = function(a, b) {
                for (var c in b) a.setAttribute(c, b[c])
            },
            p = function(a, b) {
                a.className += " " + b, a.className = a.className.replace(/(^\s*)|(\s*$)/g, "")
            },
            q = function(a, b) {
                var c = new RegExp("(\\s|^)" + b + "(\\s|$)");
                a.className = a.className.replace(c, " ").replace(/(^\s*)|(\s*$)/g, "")
            },
            r = function(a, c) {
                var d;
                this.options = {
                    animate: !0,
                    transition: 400,
                    label: "Menu",
                    insert: "after",
                    customToggle: "",
                    openPos: "relative",
                    jsClass: "js",
                    init: function() {},
                    open: function() {},
                    close: function() {}
                };
                for (d in c) this.options[d] = c[d];
                if (p(h, this.options.jsClass), this.wrapperEl = a.replace("#", ""), !b.getElementById(this.wrapperEl)) throw new Error("The nav element you are trying to select doesn't exist");
                this.wrapper = b.getElementById(this.wrapperEl), this.wrapper.inner = n(this.wrapper), f = this.options, e = this.wrapper, this._init(this)
            };
        r.prototype = {
            destroy: function() {
                this._removeStyles(), q(e, "closed"), q(e, "opened"), e.removeAttribute("style"), e.removeAttribute("aria-hidden"), e = null, s = null, m(a, "load", this, !1), m(a, "resize", this, !1), m(g, "mousedown", this, !1), m(g, "touchstart", this, !1), m(g, "touchend", this, !1), m(g, "keyup", this, !1), m(g, "click", this, !1), f.customToggle ? g.removeAttribute("aria-hidden") : g.parentNode.removeChild(g)
            },
            toggle: function() {
                k ? (q(e, "opened"), p(e, "closed"), o(e, {
                    "aria-hidden": "true"
                }), k = !1, f.close()) : (q(e, "closed"), p(e, "opened"), e.style.position = f.openPos, o(e, {
                    "aria-hidden": "false"
                }), k = !0, f.open())
            },
            handleEvent: function(b) {
                var c = b || a.event;
                switch (c.type) {
                    case "mousedown":
                        this._onmousedown(c);
                        break;
                    case "touchstart":
                        this._ontouchstart(c);
                        break;
                    case "touchend":
                        this._ontouchend(c);
                        break;
                    case "keyup":
                        this._onkeyup(c);
                        break;
                    case "click":
                        this._onclick(c);
                        break;
                    case "load":
                        this._transitions(c), this._resize(c);
                        break;
                    case "resize":
                        this._resize(c)
                }
            },
            _init: function() {
                p(e, "closed"), this._createToggle(), l(a, "load", this, !1), l(a, "resize", this, !1), l(g, "mousedown", this, !1), l(g, "touchstart", this, !1), l(g, "touchend", this, !1), l(g, "keyup", this, !1), l(g, "click", this, !1)
            },
            _createStyles: function() {
                j.parentNode || i.appendChild(j)
            },
            _removeStyles: function() {
                j.parentNode && j.parentNode.removeChild(j)
            },
            _createToggle: function() {
                if (f.customToggle) {
                    var a = f.customToggle.replace("#", "");
                    if (!b.getElementById(a)) throw new Error("The custom nav toggle you are trying to select doesn't exist");
                    g = b.getElementById(a)
                } else {
                    var c = b.createElement("a");
                    c.innerHTML = f.label, o(c, {
                        href: "#",
                        id: "nav-toggle"
                    }), "after" === f.insert ? e.parentNode.insertBefore(c, e.nextSibling) : e.parentNode.insertBefore(c, e), g = b.getElementById("nav-toggle")
                }
            },
            _preventDefault: function(a) {
                a.preventDefault ? (a.preventDefault(), a.stopPropagation()) : a.returnValue = !1
            },
            _onmousedown: function(b) {
                var c = b || a.event;
                3 !== c.which && 2 !== c.button && (this._preventDefault(b), this.toggle(b))
            },
            _ontouchstart: function(a) {
                g.onmousedown = null, this._preventDefault(a), this.toggle(a)
            },
            _ontouchend: function() {
                var a = this;
                e.addEventListener("click", a._preventDefault, !0), setTimeout(function() {
                    e.removeEventListener("click", a._preventDefault, !0)
                }, f.transition)
            },
            _onkeyup: function(b) {
                var c = b || a.event;
                13 === c.keyCode && this.toggle(b)
            },
            _onclick: function(a) {
                this._preventDefault(a)
            },
            _transitions: function() {
                if (f.animate) {
                    var a = e.style,
                        b = "max-height " + f.transition + "ms";
                    a.WebkitTransition = b, a.MozTransition = b, a.OTransition = b, a.transition = b
                }
            },
            _calcHeight: function() {
                var a = e.inner.offsetHeight,
                    b = "#" + this.wrapperEl + ".opened{max-height:" + a + "px}";
                d && (j.innerHTML = b, b = "")
            },
            _resize: function() {
                "none" !== a.getComputedStyle(g, null).getPropertyValue("display") ? (o(g, {
                    "aria-hidden": "false"
                }), e.className.match(/(^|\s)closed(\s|$)/) && (o(e, {
                    "aria-hidden": "true"
                }), e.style.position = "absolute"), this._createStyles(), this._calcHeight()) : (o(g, {
                    "aria-hidden": "true"
                }), o(e, {
                    "aria-hidden": "false"
                }), e.style.position = f.openPos, this._removeStyles()), f.init()
            }
        };
        var s;
        return c
    }(window, document),
    q, jsonFeedUrl = "/search.json",
    $searchForm = $("[data-search-form]"),
    $searchInput = $("[data-search-input]"),
    $resultTemplate = $("#search-result"),
    $resultsPlaceholder = $("[data-search-results]"),
    $foundContainer = $("[data-search-found]"),
    $foundTerm = $("[data-search-found-term]"),
    $foundCount = $("[data-search-found-count]"),
    allowEmpty = !0,
    showLoader = !0,
    loadingClass = "is--loading";
$(document).ready(function() {
    $foundContainer.hide(), initSearch()
});
var navigation = responsiveNav("#site-nav", {
    animate: !0,
    transition: 200,
    label: "<i class='fa fa-bars'></i> Menu",
    insert: "before",
    customToggle: "",
    openPos: "relative",
    jsClass: "js",
    init: function() {},
    open: function() {},
    close: function() {}
});
$("html").click(function() {
    $(navigation.wrapper).hasClass("opened") && navigation.toggle()
}), $("#site-nav").click(function(a) {
    a.stopPropagation()
}), $(function() {
    $("article").fitVids()
}), $("a[href$='.jpg'],a[href$='.jpeg'],a[href$='.JPG'],a[href$='.png'],a[href$='.gif']").addClass("image-popup"), $(document).ready(function() {
    $(".image-popup").magnificPopup({
        type: "image",
        tLoading: "Loading image #%curr%...",
        gallery: {
            enabled: !0,
            navigateByImgClick: !0,
            preload: [0, 1]
        },
        image: {
            tError: '<a href="%url%">Image #%curr%</a> could not be loaded.'
        },
        removalDelay: 300,
        mainClass: "mfp-fade"
    })
});