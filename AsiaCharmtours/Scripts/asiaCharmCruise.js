if (function(t, e) {
    "object" == typeof module && "object" == typeof module.exports ? module.exports = t.document ? e(t, !0) : function(t) {
        if (!t.document) throw new Error("jQuery requires a window with a document");
        return e(t)
    } : e(t)
}("undefined" != typeof window ? window : this, function(C, t) {
    var d = [],
        h = C.document,
        c = d.slice,
        g = d.concat,
        a = d.push,
        o = d.indexOf,
        n = {},
        e = n.toString,
        m = n.hasOwnProperty,
        v = {},
        i = "1.12.4",
        E = function(t, e) {
            return new E.fn.init(t, e)
        },
        r = /^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g,
        s = /^-ms-/,
        l = /-([\da-z])/gi,
        u = function(t, e) {
            return e.toUpperCase()
        };

    function p(t) {
        var e = !!t && "length" in t && t.length,
            n = E.type(t);
        return "function" !== n && !E.isWindow(t) && ("array" === n || 0 === e || "number" == typeof e && 0 < e && e - 1 in t)
    }
    E.fn = E.prototype = {
        jquery: i,
        constructor: E,
        selector: "",
        length: 0,
        toArray: function() {
            return c.call(this)
        },
        get: function(t) {
            return null != t ? t < 0 ? this[t + this.length] : this[t] : c.call(this)
        },
        pushStack: function(t) {
            var e = E.merge(this.constructor(), t);
            return e.prevObject = this, e.context = this.context, e
        },
        each: function(t) {
            return E.each(this, t)
        },
        map: function(n) {
            return this.pushStack(E.map(this, function(t, e) {
                return n.call(t, e, t)
            }))
        },
        slice: function() {
            return this.pushStack(c.apply(this, arguments))
        },
        first: function() {
            return this.eq(0)
        },
        last: function() {
            return this.eq(-1)
        },
        eq: function(t) {
            var e = this.length,
                n = +t + (t < 0 ? e : 0);
            return this.pushStack(0 <= n && n < e ? [this[n]] : [])
        },
        end: function() {
            return this.prevObject || this.constructor()
        },
        push: a,
        sort: d.sort,
        splice: d.splice
    }, E.extend = E.fn.extend = function() {
        var t, e, n, i, o, r, s = arguments[0] || {},
            a = 1,
            l = arguments.length,
            u = !1;
        for ("boolean" == typeof s && (u = s, s = arguments[a] || {}, a++), "object" == typeof s || E.isFunction(s) || (s = {}), a === l && (s = this, a--); a < l; a++)
            if (null != (o = arguments[a]))
                for (i in o) t = s[i], s !== (n = o[i]) && (u && n && (E.isPlainObject(n) || (e = E.isArray(n))) ? (e ? (e = !1, r = t && E.isArray(t) ? t : []) : r = t && E.isPlainObject(t) ? t : {}, s[i] = E.extend(u, r, n)) : void 0 !== n && (s[i] = n));
        return s
    }, E.extend({
        expando: "jQuery" + (i + Math.random()).replace(/\D/g, ""),
        isReady: !0,
        error: function(t) {
            throw new Error(t)
        },
        noop: function() {},
        isFunction: function(t) {
            return "function" === E.type(t)
        },
        isArray: Array.isArray || function(t) {
            return "array" === E.type(t)
        },
        isWindow: function(t) {
            return null != t && t == t.window
        },
        isNumeric: function(t) {
            var e = t && t.toString();
            return !E.isArray(t) && 0 <= e - parseFloat(e) + 1
        },
        isEmptyObject: function(t) {
            var e;
            for (e in t) return !1;
            return !0
        },
        isPlainObject: function(t) {
            var e;
            if (!t || "object" !== E.type(t) || t.nodeType || E.isWindow(t)) return !1;
            try {
                if (t.constructor && !m.call(t, "constructor") && !m.call(t.constructor.prototype, "isPrototypeOf")) return !1
            } catch (t) {
                return !1
            }
            if (!v.ownFirst)
                for (e in t) return m.call(t, e);
            for (e in t);
            return void 0 === e || m.call(t, e)
        },
        type: function(t) {
            return null == t ? t + "" : "object" == typeof t || "function" == typeof t ? n[e.call(t)] || "object" : typeof t
        },
        globalEval: function(t) {
            t && E.trim(t) && (C.execScript || function(t) {
                C.eval.call(C, t)
            })(t)
        },
        camelCase: function(t) {
            return t.replace(s, "ms-").replace(l, u)
        },
        nodeName: function(t, e) {
            return t.nodeName && t.nodeName.toLowerCase() === e.toLowerCase()
        },
        each: function(t, e) {
            var n, i = 0;
            if (p(t))
                for (n = t.length; i < n && !1 !== e.call(t[i], i, t[i]); i++);
            else
                for (i in t)
                    if (!1 === e.call(t[i], i, t[i])) break; return t
        },
        trim: function(t) {
            return null == t ? "" : (t + "").replace(r, "")
        },
        makeArray: function(t, e) {
            var n = e || [];
            return null != t && (p(Object(t)) ? E.merge(n, "string" == typeof t ? [t] : t) : a.call(n, t)), n
        },
        inArray: function(t, e, n) {
            var i;
            if (e) {
                if (o) return o.call(e, t, n);
                for (i = e.length, n = n ? n < 0 ? Math.max(0, i + n) : n : 0; n < i; n++)
                    if (n in e && e[n] === t) return n
            }
            return -1
        },
        merge: function(t, e) {
            for (var n = +e.length, i = 0, o = t.length; i < n;) t[o++] = e[i++];
            if (n != n)
                for (; void 0 !== e[i];) t[o++] = e[i++];
            return t.length = o, t
        },
        grep: function(t, e, n) {
            for (var i = [], o = 0, r = t.length, s = !n; o < r; o++) !e(t[o], o) !== s && i.push(t[o]);
            return i
        },
        map: function(t, e, n) {
            var i, o, r = 0,
                s = [];
            if (p(t))
                for (i = t.length; r < i; r++) null != (o = e(t[r], r, n)) && s.push(o);
            else
                for (r in t) null != (o = e(t[r], r, n)) && s.push(o);
            return g.apply([], s)
        },
        guid: 1,
        proxy: function(t, e) {
            var n, i, o;
            return "string" == typeof e && (o = t[e], e = t, t = o), E.isFunction(t) ? (n = c.call(arguments, 2), (i = function() {
                return t.apply(e || this, n.concat(c.call(arguments)))
            }).guid = t.guid = t.guid || E.guid++, i) : void 0
        },
        now: function() {
            return +new Date
        },
        support: v
    }), "function" == typeof Symbol && (E.fn[Symbol.iterator] = d[Symbol.iterator]), E.each("Boolean Number String Function Array Date RegExp Object Error Symbol".split(" "), function(t, e) {
        n["[object " + e + "]"] = e.toLowerCase()
    });
    var f = function(n) {
        var t, h, x, r, o, g, d, m, w, l, u, T, C, s, E, v, a, c, y, S = "sizzle" + 1 * new Date,
            b = n.document,
            k = 0,
            i = 0,
            p = rt(),
            f = rt(),
            N = rt(),
            $ = function(t, e) {
                return t === e && (u = !0), 0
            },
            A = 1 << 31,
            D = {}.hasOwnProperty,
            e = [],
            j = e.pop,
            L = e.push,
            O = e.push,
            I = e.slice,
            H = function(t, e) {
                for (var n = 0, i = t.length; n < i; n++)
                    if (t[n] === e) return n;
                return -1
            },
            R = "checked|selected|async|autofocus|autoplay|controls|defer|disabled|hidden|ismap|loop|multiple|open|readonly|required|scoped",
            q = "[\\x20\\t\\r\\n\\f]",
            _ = "(?:\\\\.|[\\w-]|[^\\x00-\\xa0])+",
            P = "\\[" + q + "*(" + _ + ")(?:" + q + "*([*^$|!~]?=)" + q + "*(?:'((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\"|(" + _ + "))|)" + q + "*\\]",
            F = ":(" + _ + ")(?:\\((('((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\")|((?:\\\\.|[^\\\\()[\\]]|" + P + ")*)|.*)\\)|)",
            M = new RegExp(q + "+", "g"),
            B = new RegExp("^" + q + "+|((?:^|[^\\\\])(?:\\\\.)*)" + q + "+$", "g"),
            W = new RegExp("^" + q + "*," + q + "*"),
            U = new RegExp("^" + q + "*([>+~]|" + q + ")" + q + "*"),
            z = new RegExp("=" + q + "*([^\\]'\"]*?)" + q + "*\\]", "g"),
            X = new RegExp(F),
            V = new RegExp("^" + _ + "$"),
            Q = {
                ID: new RegExp("^#(" + _ + ")"),
                CLASS: new RegExp("^\\.(" + _ + ")"),
                TAG: new RegExp("^(" + _ + "|[*])"),
                ATTR: new RegExp("^" + P),
                PSEUDO: new RegExp("^" + F),
                CHILD: new RegExp("^:(only|first|last|nth|nth-last)-(child|of-type)(?:\\(" + q + "*(even|odd|(([+-]|)(\\d*)n|)" + q + "*(?:([+-]|)" + q + "*(\\d+)|))" + q + "*\\)|)", "i"),
                bool: new RegExp("^(?:" + R + ")$", "i"),
                needsContext: new RegExp("^" + q + "*[>+~]|:(even|odd|eq|gt|lt|nth|first|last)(?:\\(" + q + "*((?:-\\d)?\\d*)" + q + "*\\)|)(?=[^-]|$)", "i")
            },
            J = /^(?:input|select|textarea|button)$/i,
            Y = /^h\d$/i,
            G = /^[^{]+\{\s*\[native \w/,
            K = /^(?:#([\w-]+)|(\w+)|\.([\w-]+))$/,
            Z = /[+~]/,
            tt = /'|\\/g,
            et = new RegExp("\\\\([\\da-f]{1,6}" + q + "?|(" + q + ")|.)", "ig"),
            nt = function(t, e, n) {
                var i = "0x" + e - 65536;
                return i != i || n ? e : i < 0 ? String.fromCharCode(i + 65536) : String.fromCharCode(i >> 10 | 55296, 1023 & i | 56320)
            },
            it = function() {
                T()
            };
        try {
            O.apply(e = I.call(b.childNodes), b.childNodes), e[b.childNodes.length].nodeType
        } catch (t) {
            O = {
                apply: e.length ? function(t, e) {
                    L.apply(t, I.call(e))
                } : function(t, e) {
                    for (var n = t.length, i = 0; t[n++] = e[i++];);
                    t.length = n - 1
                }
            }
        }

        function ot(t, e, n, i) {
            var o, r, s, a, l, u, c, d, p = e && e.ownerDocument,
                f = e ? e.nodeType : 9;
            if (n = n || [], "string" != typeof t || !t || 1 !== f && 9 !== f && 11 !== f) return n;
            if (!i && ((e ? e.ownerDocument || e : b) !== C && T(e), e = e || C, E)) {
                if (11 !== f && (u = K.exec(t)))
                    if (o = u[1]) {
                        if (9 === f) {
                            if (!(s = e.getElementById(o))) return n;
                            if (s.id === o) return n.push(s), n
                        } else if (p && (s = p.getElementById(o)) && y(e, s) && s.id === o) return n.push(s), n
                    } else {
                        if (u[2]) return O.apply(n, e.getElementsByTagName(t)), n;
                        if ((o = u[3]) && h.getElementsByClassName && e.getElementsByClassName) return O.apply(n, e.getElementsByClassName(o)), n
                    }
                if (h.qsa && !N[t + " "] && (!v || !v.test(t))) {
                    if (1 !== f) p = e, d = t;
                    else if ("object" !== e.nodeName.toLowerCase()) {
                        for ((a = e.getAttribute("id")) ? a = a.replace(tt, "\\$&") : e.setAttribute("id", a = S), r = (c = g(t)).length, l = V.test(a) ? "#" + a : "[id='" + a + "']"; r--;) c[r] = l + " " + gt(c[r]);
                        d = c.join(","), p = Z.test(t) && ft(e.parentNode) || e
                    }
                    if (d) try {
                        return O.apply(n, p.querySelectorAll(d)), n
                    } catch (t) {} finally {
                        a === S && e.removeAttribute("id")
                    }
                }
            }
            return m(t.replace(B, "$1"), e, n, i)
        }

        function rt() {
            var i = [];
            return function t(e, n) {
                return i.push(e + " ") > x.cacheLength && delete t[i.shift()], t[e + " "] = n
            }
        }

        function st(t) {
            return t[S] = !0, t
        }

        function at(t) {
            var e = C.createElement("div");
            try {
                return !!t(e)
            } catch (t) {
                return !1
            } finally {
                e.parentNode && e.parentNode.removeChild(e), e = null
            }
        }

        function lt(t, e) {
            for (var n = t.split("|"), i = n.length; i--;) x.attrHandle[n[i]] = e
        }

        function ut(t, e) {
            var n = e && t,
                i = n && 1 === t.nodeType && 1 === e.nodeType && (~e.sourceIndex || A) - (~t.sourceIndex || A);
            if (i) return i;
            if (n)
                for (; n = n.nextSibling;)
                    if (n === e) return -1;
            return t ? 1 : -1
        }

        function ct(e) {
            return function(t) {
                return "input" === t.nodeName.toLowerCase() && t.type === e
            }
        }

        function dt(n) {
            return function(t) {
                var e = t.nodeName.toLowerCase();
                return ("input" === e || "button" === e) && t.type === n
            }
        }

        function pt(s) {
            return st(function(r) {
                return r = +r, st(function(t, e) {
                    for (var n, i = s([], t.length, r), o = i.length; o--;) t[n = i[o]] && (t[n] = !(e[n] = t[n]))
                })
            })
        }

        function ft(t) {
            return t && void 0 !== t.getElementsByTagName && t
        }
        for (t in h = ot.support = {}, o = ot.isXML = function(t) {
                var e = t && (t.ownerDocument || t).documentElement;
                return !!e && "HTML" !== e.nodeName
            }, T = ot.setDocument = function(t) {
                var e, n, i = t ? t.ownerDocument || t : b;
                return i !== C && 9 === i.nodeType && i.documentElement && (s = (C = i).documentElement, E = !o(C), (n = C.defaultView) && n.top !== n && (n.addEventListener ? n.addEventListener("unload", it, !1) : n.attachEvent && n.attachEvent("onunload", it)), h.attributes = at(function(t) {
                    return t.className = "i", !t.getAttribute("className")
                }), h.getElementsByTagName = at(function(t) {
                    return t.appendChild(C.createComment("")), !t.getElementsByTagName("*").length
                }), h.getElementsByClassName = G.test(C.getElementsByClassName), h.getById = at(function(t) {
                    return s.appendChild(t).id = S, !C.getElementsByName || !C.getElementsByName(S).length
                }), h.getById ? (x.find.ID = function(t, e) {
                    if (void 0 !== e.getElementById && E) {
                        var n = e.getElementById(t);
                        return n ? [n] : []
                    }
                }, x.filter.ID = function(t) {
                    var e = t.replace(et, nt);
                    return function(t) {
                        return t.getAttribute("id") === e
                    }
                }) : (delete x.find.ID, x.filter.ID = function(t) {
                    var n = t.replace(et, nt);
                    return function(t) {
                        var e = void 0 !== t.getAttributeNode && t.getAttributeNode("id");
                        return e && e.value === n
                    }
                }), x.find.TAG = h.getElementsByTagName ? function(t, e) {
                    return void 0 !== e.getElementsByTagName ? e.getElementsByTagName(t) : h.qsa ? e.querySelectorAll(t) : void 0
                } : function(t, e) {
                    var n, i = [],
                        o = 0,
                        r = e.getElementsByTagName(t);
                    if ("*" === t) {
                        for (; n = r[o++];) 1 === n.nodeType && i.push(n);
                        return i
                    }
                    return r
                }, x.find.CLASS = h.getElementsByClassName && function(t, e) {
                    return void 0 !== e.getElementsByClassName && E ? e.getElementsByClassName(t) : void 0
                }, a = [], v = [], (h.qsa = G.test(C.querySelectorAll)) && (at(function(t) {
                    s.appendChild(t).innerHTML = "<a id='" + S + "'></a><select id='" + S + "-\r\\' msallowcapture=''><option selected=''></option></select>", t.querySelectorAll("[msallowcapture^='']").length && v.push("[*^$]=" + q + "*(?:''|\"\")"), t.querySelectorAll("[selected]").length || v.push("\\[" + q + "*(?:value|" + R + ")"), t.querySelectorAll("[id~=" + S + "-]").length || v.push("~="), t.querySelectorAll(":checked").length || v.push(":checked"), t.querySelectorAll("a#" + S + "+*").length || v.push(".#.+[+~]")
                }), at(function(t) {
                    var e = C.createElement("input");
                    e.setAttribute("type", "hidden"), t.appendChild(e).setAttribute("name", "D"), t.querySelectorAll("[name=d]").length && v.push("name" + q + "*[*^$|!~]?="), t.querySelectorAll(":enabled").length || v.push(":enabled", ":disabled"), t.querySelectorAll("*,:x"), v.push(",.*:")
                })), (h.matchesSelector = G.test(c = s.matches || s.webkitMatchesSelector || s.mozMatchesSelector || s.oMatchesSelector || s.msMatchesSelector)) && at(function(t) {
                    h.disconnectedMatch = c.call(t, "div"), c.call(t, "[s!='']:x"), a.push("!=", F)
                }), v = v.length && new RegExp(v.join("|")), a = a.length && new RegExp(a.join("|")), e = G.test(s.compareDocumentPosition), y = e || G.test(s.contains) ? function(t, e) {
                    var n = 9 === t.nodeType ? t.documentElement : t,
                        i = e && e.parentNode;
                    return t === i || !(!i || 1 !== i.nodeType || !(n.contains ? n.contains(i) : t.compareDocumentPosition && 16 & t.compareDocumentPosition(i)))
                } : function(t, e) {
                    if (e)
                        for (; e = e.parentNode;)
                            if (e === t) return !0;
                    return !1
                }, $ = e ? function(t, e) {
                    if (t === e) return u = !0, 0;
                    var n = !t.compareDocumentPosition - !e.compareDocumentPosition;
                    return n || (1 & (n = (t.ownerDocument || t) === (e.ownerDocument || e) ? t.compareDocumentPosition(e) : 1) || !h.sortDetached && e.compareDocumentPosition(t) === n ? t === C || t.ownerDocument === b && y(b, t) ? -1 : e === C || e.ownerDocument === b && y(b, e) ? 1 : l ? H(l, t) - H(l, e) : 0 : 4 & n ? -1 : 1)
                } : function(t, e) {
                    if (t === e) return u = !0, 0;
                    var n, i = 0,
                        o = t.parentNode,
                        r = e.parentNode,
                        s = [t],
                        a = [e];
                    if (!o || !r) return t === C ? -1 : e === C ? 1 : o ? -1 : r ? 1 : l ? H(l, t) - H(l, e) : 0;
                    if (o === r) return ut(t, e);
                    for (n = t; n = n.parentNode;) s.unshift(n);
                    for (n = e; n = n.parentNode;) a.unshift(n);
                    for (; s[i] === a[i];) i++;
                    return i ? ut(s[i], a[i]) : s[i] === b ? -1 : a[i] === b ? 1 : 0
                }), C
            }, ot.matches = function(t, e) {
                return ot(t, null, null, e)
            }, ot.matchesSelector = function(t, e) {
                if ((t.ownerDocument || t) !== C && T(t), e = e.replace(z, "='$1']"), h.matchesSelector && E && !N[e + " "] && (!a || !a.test(e)) && (!v || !v.test(e))) try {
                    var n = c.call(t, e);
                    if (n || h.disconnectedMatch || t.document && 11 !== t.document.nodeType) return n
                } catch (t) {}
                return 0 < ot(e, C, null, [t]).length
            }, ot.contains = function(t, e) {
                return (t.ownerDocument || t) !== C && T(t), y(t, e)
            }, ot.attr = function(t, e) {
                (t.ownerDocument || t) !== C && T(t);
                var n = x.attrHandle[e.toLowerCase()],
                    i = n && D.call(x.attrHandle, e.toLowerCase()) ? n(t, e, !E) : void 0;
                return void 0 !== i ? i : h.attributes || !E ? t.getAttribute(e) : (i = t.getAttributeNode(e)) && i.specified ? i.value : null
            }, ot.error = function(t) {
                throw new Error("Syntax error, unrecognized expression: " + t)
            }, ot.uniqueSort = function(t) {
                var e, n = [],
                    i = 0,
                    o = 0;
                if (u = !h.detectDuplicates, l = !h.sortStable && t.slice(0), t.sort($), u) {
                    for (; e = t[o++];) e === t[o] && (i = n.push(o));
                    for (; i--;) t.splice(n[i], 1)
                }
                return l = null, t
            }, r = ot.getText = function(t) {
                var e, n = "",
                    i = 0,
                    o = t.nodeType;
                if (o) {
                    if (1 === o || 9 === o || 11 === o) {
                        if ("string" == typeof t.textContent) return t.textContent;
                        for (t = t.firstChild; t; t = t.nextSibling) n += r(t)
                    } else if (3 === o || 4 === o) return t.nodeValue
                } else
                    for (; e = t[i++];) n += r(e);
                return n
            }, (x = ot.selectors = {
                cacheLength: 50,
                createPseudo: st,
                match: Q,
                attrHandle: {},
                find: {},
                relative: {
                    ">": {
                        dir: "parentNode",
                        first: !0
                    },
                    " ": {
                        dir: "parentNode"
                    },
                    "+": {
                        dir: "previousSibling",
                        first: !0
                    },
                    "~": {
                        dir: "previousSibling"
                    }
                },
                preFilter: {
                    ATTR: function(t) {
                        return t[1] = t[1].replace(et, nt), t[3] = (t[3] || t[4] || t[5] || "").replace(et, nt), "~=" === t[2] && (t[3] = " " + t[3] + " "), t.slice(0, 4)
                    },
                    CHILD: function(t) {
                        return t[1] = t[1].toLowerCase(), "nth" === t[1].slice(0, 3) ? (t[3] || ot.error(t[0]), t[4] = +(t[4] ? t[5] + (t[6] || 1) : 2 * ("even" === t[3] || "odd" === t[3])), t[5] = +(t[7] + t[8] || "odd" === t[3])) : t[3] && ot.error(t[0]), t
                    },
                    PSEUDO: function(t) {
                        var e, n = !t[6] && t[2];
                        return Q.CHILD.test(t[0]) ? null : (t[3] ? t[2] = t[4] || t[5] || "" : n && X.test(n) && (e = g(n, !0)) && (e = n.indexOf(")", n.length - e) - n.length) && (t[0] = t[0].slice(0, e), t[2] = n.slice(0, e)), t.slice(0, 3))
                    }
                },
                filter: {
                    TAG: function(t) {
                        var e = t.replace(et, nt).toLowerCase();
                        return "*" === t ? function() {
                            return !0
                        } : function(t) {
                            return t.nodeName && t.nodeName.toLowerCase() === e
                        }
                    },
                    CLASS: function(t) {
                        var e = p[t + " "];
                        return e || (e = new RegExp("(^|" + q + ")" + t + "(" + q + "|$)")) && p(t, function(t) {
                            return e.test("string" == typeof t.className && t.className || void 0 !== t.getAttribute && t.getAttribute("class") || "")
                        })
                    },
                    ATTR: function(n, i, o) {
                        return function(t) {
                            var e = ot.attr(t, n);
                            return null == e ? "!=" === i : !i || (e += "", "=" === i ? e === o : "!=" === i ? e !== o : "^=" === i ? o && 0 === e.indexOf(o) : "*=" === i ? o && -1 < e.indexOf(o) : "$=" === i ? o && e.slice(-o.length) === o : "~=" === i ? -1 < (" " + e.replace(M, " ") + " ").indexOf(o) : "|=" === i && (e === o || e.slice(0, o.length + 1) === o + "-"))
                        }
                    },
                    CHILD: function(h, t, e, g, m) {
                        var v = "nth" !== h.slice(0, 3),
                            y = "last" !== h.slice(-4),
                            b = "of-type" === t;
                        return 1 === g && 0 === m ? function(t) {
                            return !!t.parentNode
                        } : function(t, e, n) {
                            var i, o, r, s, a, l, u = v !== y ? "nextSibling" : "previousSibling",
                                c = t.parentNode,
                                d = b && t.nodeName.toLowerCase(),
                                p = !n && !b,
                                f = !1;
                            if (c) {
                                if (v) {
                                    for (; u;) {
                                        for (s = t; s = s[u];)
                                            if (b ? s.nodeName.toLowerCase() === d : 1 === s.nodeType) return !1;
                                        l = u = "only" === h && !l && "nextSibling"
                                    }
                                    return !0
                                }
                                if (l = [y ? c.firstChild : c.lastChild], y && p) {
                                    for (f = (a = (i = (o = (r = (s = c)[S] || (s[S] = {}))[s.uniqueID] || (r[s.uniqueID] = {}))[h] || [])[0] === k && i[1]) && i[2], s = a && c.childNodes[a]; s = ++a && s && s[u] || (f = a = 0) || l.pop();)
                                        if (1 === s.nodeType && ++f && s === t) {
                                            o[h] = [k, a, f];
                                            break
                                        }
                                } else if (p && (f = a = (i = (o = (r = (s = t)[S] || (s[S] = {}))[s.uniqueID] || (r[s.uniqueID] = {}))[h] || [])[0] === k && i[1]), !1 === f)
                                    for (;
                                        (s = ++a && s && s[u] || (f = a = 0) || l.pop()) && ((b ? s.nodeName.toLowerCase() !== d : 1 !== s.nodeType) || !++f || (p && ((o = (r = s[S] || (s[S] = {}))[s.uniqueID] || (r[s.uniqueID] = {}))[h] = [k, f]), s !== t)););
                                return (f -= m) === g || f % g == 0 && 0 <= f / g
                            }
                        }
                    },
                    PSEUDO: function(t, r) {
                        var e, s = x.pseudos[t] || x.setFilters[t.toLowerCase()] || ot.error("unsupported pseudo: " + t);
                        return s[S] ? s(r) : 1 < s.length ? (e = [t, t, "", r], x.setFilters.hasOwnProperty(t.toLowerCase()) ? st(function(t, e) {
                            for (var n, i = s(t, r), o = i.length; o--;) t[n = H(t, i[o])] = !(e[n] = i[o])
                        }) : function(t) {
                            return s(t, 0, e)
                        }) : s
                    }
                },
                pseudos: {
                    not: st(function(t) {
                        var i = [],
                            o = [],
                            a = d(t.replace(B, "$1"));
                        return a[S] ? st(function(t, e, n, i) {
                            for (var o, r = a(t, null, i, []), s = t.length; s--;)(o = r[s]) && (t[s] = !(e[s] = o))
                        }) : function(t, e, n) {
                            return i[0] = t, a(i, null, n, o), i[0] = null, !o.pop()
                        }
                    }),
                    has: st(function(e) {
                        return function(t) {
                            return 0 < ot(e, t).length
                        }
                    }),
                    contains: st(function(e) {
                        return e = e.replace(et, nt),
                            function(t) {
                                return -1 < (t.textContent || t.innerText || r(t)).indexOf(e)
                            }
                    }),
                    lang: st(function(n) {
                        return V.test(n || "") || ot.error("unsupported lang: " + n), n = n.replace(et, nt).toLowerCase(),
                            function(t) {
                                var e;
                                do {
                                    if (e = E ? t.lang : t.getAttribute("xml:lang") || t.getAttribute("lang")) return (e = e.toLowerCase()) === n || 0 === e.indexOf(n + "-")
                                } while ((t = t.parentNode) && 1 === t.nodeType);
                                return !1
                            }
                    }),
                    target: function(t) {
                        var e = n.location && n.location.hash;
                        return e && e.slice(1) === t.id
                    },
                    root: function(t) {
                        return t === s
                    },
                    focus: function(t) {
                        return t === C.activeElement && (!C.hasFocus || C.hasFocus()) && !!(t.type || t.href || ~t.tabIndex)
                    },
                    enabled: function(t) {
                        return !1 === t.disabled
                    },
                    disabled: function(t) {
                        return !0 === t.disabled
                    },
                    checked: function(t) {
                        var e = t.nodeName.toLowerCase();
                        return "input" === e && !!t.checked || "option" === e && !!t.selected
                    },
                    selected: function(t) {
                        return t.parentNode && t.parentNode.selectedIndex, !0 === t.selected
                    },
                    empty: function(t) {
                        for (t = t.firstChild; t; t = t.nextSibling)
                            if (t.nodeType < 6) return !1;
                        return !0
                    },
                    parent: function(t) {
                        return !x.pseudos.empty(t)
                    },
                    header: function(t) {
                        return Y.test(t.nodeName)
                    },
                    input: function(t) {
                        return J.test(t.nodeName)
                    },
                    button: function(t) {
                        var e = t.nodeName.toLowerCase();
                        return "input" === e && "button" === t.type || "button" === e
                    },
                    text: function(t) {
                        var e;
                        return "input" === t.nodeName.toLowerCase() && "text" === t.type && (null == (e = t.getAttribute("type")) || "text" === e.toLowerCase())
                    },
                    first: pt(function() {
                        return [0]
                    }),
                    last: pt(function(t, e) {
                        return [e - 1]
                    }),
                    eq: pt(function(t, e, n) {
                        return [n < 0 ? n + e : n]
                    }),
                    even: pt(function(t, e) {
                        for (var n = 0; n < e; n += 2) t.push(n);
                        return t
                    }),
                    odd: pt(function(t, e) {
                        for (var n = 1; n < e; n += 2) t.push(n);
                        return t
                    }),
                    lt: pt(function(t, e, n) {
                        for (var i = n < 0 ? n + e : n; 0 <= --i;) t.push(i);
                        return t
                    }),
                    gt: pt(function(t, e, n) {
                        for (var i = n < 0 ? n + e : n; ++i < e;) t.push(i);
                        return t
                    })
                }
            }).pseudos.nth = x.pseudos.eq, {
                radio: !0,
                checkbox: !0,
                file: !0,
                password: !0,
                image: !0
            }) x.pseudos[t] = ct(t);
        for (t in {
                submit: !0,
                reset: !0
            }) x.pseudos[t] = dt(t);

        function ht() {}

        function gt(t) {
            for (var e = 0, n = t.length, i = ""; e < n; e++) i += t[e].value;
            return i
        }

        function mt(a, t, e) {
            var l = t.dir,
                u = e && "parentNode" === l,
                c = i++;
            return t.first ? function(t, e, n) {
                for (; t = t[l];)
                    if (1 === t.nodeType || u) return a(t, e, n)
            } : function(t, e, n) {
                var i, o, r, s = [k, c];
                if (n) {
                    for (; t = t[l];)
                        if ((1 === t.nodeType || u) && a(t, e, n)) return !0
                } else
                    for (; t = t[l];)
                        if (1 === t.nodeType || u) {
                            if ((i = (o = (r = t[S] || (t[S] = {}))[t.uniqueID] || (r[t.uniqueID] = {}))[l]) && i[0] === k && i[1] === c) return s[2] = i[2];
                            if ((o[l] = s)[2] = a(t, e, n)) return !0
                        }
            }
        }

        function vt(o) {
            return 1 < o.length ? function(t, e, n) {
                for (var i = o.length; i--;)
                    if (!o[i](t, e, n)) return !1;
                return !0
            } : o[0]
        }

        function yt(t, e, n, i, o) {
            for (var r, s = [], a = 0, l = t.length, u = null != e; a < l; a++)(r = t[a]) && (n && !n(r, i, o) || (s.push(r), u && e.push(a)));
            return s
        }

        function bt(f, h, g, m, v, t) {
            return m && !m[S] && (m = bt(m)), v && !v[S] && (v = bt(v, t)), st(function(t, e, n, i) {
                var o, r, s, a = [],
                    l = [],
                    u = e.length,
                    c = t || function(t, e, n) {
                        for (var i = 0, o = e.length; i < o; i++) ot(t, e[i], n);
                        return n
                    }(h || "*", n.nodeType ? [n] : n, []),
                    d = !f || !t && h ? c : yt(c, a, f, n, i),
                    p = g ? v || (t ? f : u || m) ? [] : e : d;
                if (g && g(d, p, n, i), m)
                    for (o = yt(p, l), m(o, [], n, i), r = o.length; r--;)(s = o[r]) && (p[l[r]] = !(d[l[r]] = s));
                if (t) {
                    if (v || f) {
                        if (v) {
                            for (o = [], r = p.length; r--;)(s = p[r]) && o.push(d[r] = s);
                            v(null, p = [], o, i)
                        }
                        for (r = p.length; r--;)(s = p[r]) && -1 < (o = v ? H(t, s) : a[r]) && (t[o] = !(e[o] = s))
                    }
                } else p = yt(p === e ? p.splice(u, p.length) : p), v ? v(null, e, p, i) : O.apply(e, p)
            })
        }

        function xt(t) {
            for (var o, e, n, i = t.length, r = x.relative[t[0].type], s = r || x.relative[" "], a = r ? 1 : 0, l = mt(function(t) {
                    return t === o
                }, s, !0), u = mt(function(t) {
                    return -1 < H(o, t)
                }, s, !0), c = [function(t, e, n) {
                    var i = !r && (n || e !== w) || ((o = e).nodeType ? l(t, e, n) : u(t, e, n));
                    return o = null, i
                }]; a < i; a++)
                if (e = x.relative[t[a].type]) c = [mt(vt(c), e)];
                else {
                    if ((e = x.filter[t[a].type].apply(null, t[a].matches))[S]) {
                        for (n = ++a; n < i && !x.relative[t[n].type]; n++);
                        return bt(1 < a && vt(c), 1 < a && gt(t.slice(0, a - 1).concat({
                            value: " " === t[a - 2].type ? "*" : ""
                        })).replace(B, "$1"), e, a < n && xt(t.slice(a, n)), n < i && xt(t = t.slice(n)), n < i && gt(t))
                    }
                    c.push(e)
                }
            return vt(c)
        }
        return ht.prototype = x.filters = x.pseudos, x.setFilters = new ht, g = ot.tokenize = function(t, e) {
            var n, i, o, r, s, a, l, u = f[t + " "];
            if (u) return e ? 0 : u.slice(0);
            for (s = t, a = [], l = x.preFilter; s;) {
                for (r in n && !(i = W.exec(s)) || (i && (s = s.slice(i[0].length) || s), a.push(o = [])), n = !1, (i = U.exec(s)) && (n = i.shift(), o.push({
                        value: n,
                        type: i[0].replace(B, " ")
                    }), s = s.slice(n.length)), x.filter) !(i = Q[r].exec(s)) || l[r] && !(i = l[r](i)) || (n = i.shift(), o.push({
                    value: n,
                    type: r,
                    matches: i
                }), s = s.slice(n.length));
                if (!n) break
            }
            return e ? s.length : s ? ot.error(t) : f(t, a).slice(0)
        }, d = ot.compile = function(t, e) {
            var n, m, v, y, b, i, o = [],
                r = [],
                s = N[t + " "];
            if (!s) {
                for (e || (e = g(t)), n = e.length; n--;)(s = xt(e[n]))[S] ? o.push(s) : r.push(s);
                (s = N(t, (m = r, y = 0 < (v = o).length, b = 0 < m.length, i = function(t, e, n, i, o) {
                    var r, s, a, l = 0,
                        u = "0",
                        c = t && [],
                        d = [],
                        p = w,
                        f = t || b && x.find.TAG("*", o),
                        h = k += null == p ? 1 : Math.random() || .1,
                        g = f.length;
                    for (o && (w = e === C || e || o); u !== g && null != (r = f[u]); u++) {
                        if (b && r) {
                            for (s = 0, e || r.ownerDocument === C || (T(r), n = !E); a = m[s++];)
                                if (a(r, e || C, n)) {
                                    i.push(r);
                                    break
                                }
                            o && (k = h)
                        }
                        y && ((r = !a && r) && l--, t && c.push(r))
                    }
                    if (l += u, y && u !== l) {
                        for (s = 0; a = v[s++];) a(c, d, e, n);
                        if (t) {
                            if (0 < l)
                                for (; u--;) c[u] || d[u] || (d[u] = j.call(i));
                            d = yt(d)
                        }
                        O.apply(i, d), o && !t && 0 < d.length && 1 < l + v.length && ot.uniqueSort(i)
                    }
                    return o && (k = h, w = p), c
                }, y ? st(i) : i))).selector = t
            }
            return s
        }, m = ot.select = function(t, e, n, i) {
            var o, r, s, a, l, u = "function" == typeof t && t,
                c = !i && g(t = u.selector || t);
            if (n = n || [], 1 === c.length) {
                if (2 < (r = c[0] = c[0].slice(0)).length && "ID" === (s = r[0]).type && h.getById && 9 === e.nodeType && E && x.relative[r[1].type]) {
                    if (!(e = (x.find.ID(s.matches[0].replace(et, nt), e) || [])[0])) return n;
                    u && (e = e.parentNode), t = t.slice(r.shift().value.length)
                }
                for (o = Q.needsContext.test(t) ? 0 : r.length; o-- && (s = r[o], !x.relative[a = s.type]);)
                    if ((l = x.find[a]) && (i = l(s.matches[0].replace(et, nt), Z.test(r[0].type) && ft(e.parentNode) || e))) {
                        if (r.splice(o, 1), !(t = i.length && gt(r))) return O.apply(n, i), n;
                        break
                    }
            }
            return (u || d(t, c))(i, e, !E, n, !e || Z.test(t) && ft(e.parentNode) || e), n
        }, h.sortStable = S.split("").sort($).join("") === S, h.detectDuplicates = !!u, T(), h.sortDetached = at(function(t) {
            return 1 & t.compareDocumentPosition(C.createElement("div"))
        }), at(function(t) {
            return t.innerHTML = "<a href='#'></a>", "#" === t.firstChild.getAttribute("href")
        }) || lt("type|href|height|width", function(t, e, n) {
            return n ? void 0 : t.getAttribute(e, "type" === e.toLowerCase() ? 1 : 2)
        }), h.attributes && at(function(t) {
            return t.innerHTML = "<input/>", t.firstChild.setAttribute("value", ""), "" === t.firstChild.getAttribute("value")
        }) || lt("value", function(t, e, n) {
            return n || "input" !== t.nodeName.toLowerCase() ? void 0 : t.defaultValue
        }), at(function(t) {
            return null == t.getAttribute("disabled")
        }) || lt(R, function(t, e, n) {
            var i;
            return n ? void 0 : !0 === t[e] ? e.toLowerCase() : (i = t.getAttributeNode(e)) && i.specified ? i.value : null
        }), ot
    }(C);
    E.find = f, E.expr = f.selectors, E.expr[":"] = E.expr.pseudos, E.uniqueSort = E.unique = f.uniqueSort, E.text = f.getText, E.isXMLDoc = f.isXML, E.contains = f.contains;
    var y = function(t, e, n) {
            for (var i = [], o = void 0 !== n;
                (t = t[e]) && 9 !== t.nodeType;)
                if (1 === t.nodeType) {
                    if (o && E(t).is(n)) break;
                    i.push(t)
                }
            return i
        },
        b = function(t, e) {
            for (var n = []; t; t = t.nextSibling) 1 === t.nodeType && t !== e && n.push(t);
            return n
        },
        x = E.expr.match.needsContext,
        w = /^<([\w-]+)\s*\/?>(?:<\/\1>|)$/,
        T = /^.[^:#\[\.,]*$/;

    function S(t, n, i) {
        if (E.isFunction(n)) return E.grep(t, function(t, e) {
            return !!n.call(t, e, t) !== i
        });
        if (n.nodeType) return E.grep(t, function(t) {
            return t === n !== i
        });
        if ("string" == typeof n) {
            if (T.test(n)) return E.filter(n, t, i);
            n = E.filter(n, t)
        }
        return E.grep(t, function(t) {
            return -1 < E.inArray(t, n) !== i
        })
    }
    E.filter = function(t, e, n) {
        var i = e[0];
        return n && (t = ":not(" + t + ")"), 1 === e.length && 1 === i.nodeType ? E.find.matchesSelector(i, t) ? [i] : [] : E.find.matches(t, E.grep(e, function(t) {
            return 1 === t.nodeType
        }))
    }, E.fn.extend({
        find: function(t) {
            var e, n = [],
                i = this,
                o = i.length;
            if ("string" != typeof t) return this.pushStack(E(t).filter(function() {
                for (e = 0; e < o; e++)
                    if (E.contains(i[e], this)) return !0
            }));
            for (e = 0; e < o; e++) E.find(t, i[e], n);
            return (n = this.pushStack(1 < o ? E.unique(n) : n)).selector = this.selector ? this.selector + " " + t : t, n
        },
        filter: function(t) {
            return this.pushStack(S(this, t || [], !1))
        },
        not: function(t) {
            return this.pushStack(S(this, t || [], !0))
        },
        is: function(t) {
            return !!S(this, "string" == typeof t && x.test(t) ? E(t) : t || [], !1).length
        }
    });
    var k, N = /^(?:\s*(<[\w\W]+>)[^>]*|#([\w-]*))$/;
    (E.fn.init = function(t, e, n) {
        var i, o;
        if (!t) return this;
        if (n = n || k, "string" == typeof t) {
            if (!(i = "<" === t.charAt(0) && ">" === t.charAt(t.length - 1) && 3 <= t.length ? [null, t, null] : N.exec(t)) || !i[1] && e) return !e || e.jquery ? (e || n).find(t) : this.constructor(e).find(t);
            if (i[1]) {
                if (e = e instanceof E ? e[0] : e, E.merge(this, E.parseHTML(i[1], e && e.nodeType ? e.ownerDocument || e : h, !0)), w.test(i[1]) && E.isPlainObject(e))
                    for (i in e) E.isFunction(this[i]) ? this[i](e[i]) : this.attr(i, e[i]);
                return this
            }
            if ((o = h.getElementById(i[2])) && o.parentNode) {
                if (o.id !== i[2]) return k.find(t);
                this.length = 1, this[0] = o
            }
            return this.context = h, this.selector = t, this
        }
        return t.nodeType ? (this.context = this[0] = t, this.length = 1, this) : E.isFunction(t) ? void 0 !== n.ready ? n.ready(t) : t(E) : (void 0 !== t.selector && (this.selector = t.selector, this.context = t.context), E.makeArray(t, this))
    }).prototype = E.fn, k = E(h);
    var $ = /^(?:parents|prev(?:Until|All))/,
        A = {
            children: !0,
            contents: !0,
            next: !0,
            prev: !0
        };

    function D(t, e) {
        for (;
            (t = t[e]) && 1 !== t.nodeType;);
        return t
    }
    E.fn.extend({
        has: function(t) {
            var e, n = E(t, this),
                i = n.length;
            return this.filter(function() {
                for (e = 0; e < i; e++)
                    if (E.contains(this, n[e])) return !0
            })
        },
        closest: function(t, e) {
            for (var n, i = 0, o = this.length, r = [], s = x.test(t) || "string" != typeof t ? E(t, e || this.context) : 0; i < o; i++)
                for (n = this[i]; n && n !== e; n = n.parentNode)
                    if (n.nodeType < 11 && (s ? -1 < s.index(n) : 1 === n.nodeType && E.find.matchesSelector(n, t))) {
                        r.push(n);
                        break
                    }
            return this.pushStack(1 < r.length ? E.uniqueSort(r) : r)
        },
        index: function(t) {
            return t ? "string" == typeof t ? E.inArray(this[0], E(t)) : E.inArray(t.jquery ? t[0] : t, this) : this[0] && this[0].parentNode ? this.first().prevAll().length : -1
        },
        add: function(t, e) {
            return this.pushStack(E.uniqueSort(E.merge(this.get(), E(t, e))))
        },
        addBack: function(t) {
            return this.add(null == t ? this.prevObject : this.prevObject.filter(t))
        }
    }), E.each({
        parent: function(t) {
            var e = t.parentNode;
            return e && 11 !== e.nodeType ? e : null
        },
        parents: function(t) {
            return y(t, "parentNode")
        },
        parentsUntil: function(t, e, n) {
            return y(t, "parentNode", n)
        },
        next: function(t) {
            return D(t, "nextSibling")
        },
        prev: function(t) {
            return D(t, "previousSibling")
        },
        nextAll: function(t) {
            return y(t, "nextSibling")
        },
        prevAll: function(t) {
            return y(t, "previousSibling")
        },
        nextUntil: function(t, e, n) {
            return y(t, "nextSibling", n)
        },
        prevUntil: function(t, e, n) {
            return y(t, "previousSibling", n)
        },
        siblings: function(t) {
            return b((t.parentNode || {}).firstChild, t)
        },
        children: function(t) {
            return b(t.firstChild)
        },
        contents: function(t) {
            return E.nodeName(t, "iframe") ? t.contentDocument || t.contentWindow.document : E.merge([], t.childNodes)
        }
    }, function(i, o) {
        E.fn[i] = function(t, e) {
            var n = E.map(this, o, t);
            return "Until" !== i.slice(-5) && (e = t), e && "string" == typeof e && (n = E.filter(e, n)), 1 < this.length && (A[i] || (n = E.uniqueSort(n)), $.test(i) && (n = n.reverse())), this.pushStack(n)
        }
    });
    var j, L, O = /\S+/g;

    function I() {
        h.addEventListener ? (h.removeEventListener("DOMContentLoaded", H), C.removeEventListener("load", H)) : (h.detachEvent("onreadystatechange", H), C.detachEvent("onload", H))
    }

    function H() {
        (h.addEventListener || "load" === C.event.type || "complete" === h.readyState) && (I(), E.ready())
    }
    for (L in E.Callbacks = function(i) {
            var t, n;
            i = "string" == typeof i ? (t = i, n = {}, E.each(t.match(O) || [], function(t, e) {
                n[e] = !0
            }), n) : E.extend({}, i);
            var o, e, r, s, a = [],
                l = [],
                u = -1,
                c = function() {
                    for (s = i.once, r = o = !0; l.length; u = -1)
                        for (e = l.shift(); ++u < a.length;) !1 === a[u].apply(e[0], e[1]) && i.stopOnFalse && (u = a.length, e = !1);
                    i.memory || (e = !1), o = !1, s && (a = e ? [] : "")
                },
                d = {
                    add: function() {
                        return a && (e && !o && (u = a.length - 1, l.push(e)), function n(t) {
                            E.each(t, function(t, e) {
                                E.isFunction(e) ? i.unique && d.has(e) || a.push(e) : e && e.length && "string" !== E.type(e) && n(e)
                            })
                        }(arguments), e && !o && c()), this
                    },
                    remove: function() {
                        return E.each(arguments, function(t, e) {
                            for (var n; - 1 < (n = E.inArray(e, a, n));) a.splice(n, 1), n <= u && u--
                        }), this
                    },
                    has: function(t) {
                        return t ? -1 < E.inArray(t, a) : 0 < a.length
                    },
                    empty: function() {
                        return a && (a = []), this
                    },
                    disable: function() {
                        return s = l = [], a = e = "", this
                    },
                    disabled: function() {
                        return !a
                    },
                    lock: function() {
                        return s = !0, e || d.disable(), this
                    },
                    locked: function() {
                        return !!s
                    },
                    fireWith: function(t, e) {
                        return s || (e = [t, (e = e || []).slice ? e.slice() : e], l.push(e), o || c()), this
                    },
                    fire: function() {
                        return d.fireWith(this, arguments), this
                    },
                    fired: function() {
                        return !!r
                    }
                };
            return d
        }, E.extend({
            Deferred: function(t) {
                var r = [
                        ["resolve", "done", E.Callbacks("once memory"), "resolved"],
                        ["reject", "fail", E.Callbacks("once memory"), "rejected"],
                        ["notify", "progress", E.Callbacks("memory")]
                    ],
                    o = "pending",
                    s = {
                        state: function() {
                            return o
                        },
                        always: function() {
                            return a.done(arguments).fail(arguments), this
                        },
                        then: function() {
                            var o = arguments;
                            return E.Deferred(function(i) {
                                E.each(r, function(t, e) {
                                    var n = E.isFunction(o[t]) && o[t];
                                    a[e[1]](function() {
                                        var t = n && n.apply(this, arguments);
                                        t && E.isFunction(t.promise) ? t.promise().progress(i.notify).done(i.resolve).fail(i.reject) : i[e[0] + "With"](this === s ? i.promise() : this, n ? [t] : arguments)
                                    })
                                }), o = null
                            }).promise()
                        },
                        promise: function(t) {
                            return null != t ? E.extend(t, s) : s
                        }
                    },
                    a = {};
                return s.pipe = s.then, E.each(r, function(t, e) {
                    var n = e[2],
                        i = e[3];
                    s[e[1]] = n.add, i && n.add(function() {
                        o = i
                    }, r[1 ^ t][2].disable, r[2][2].lock), a[e[0]] = function() {
                        return a[e[0] + "With"](this === a ? s : this, arguments), this
                    }, a[e[0] + "With"] = n.fireWith
                }), s.promise(a), t && t.call(a, a), a
            },
            when: function(t) {
                var o, e, n, i = 0,
                    r = c.call(arguments),
                    s = r.length,
                    a = 1 !== s || t && E.isFunction(t.promise) ? s : 0,
                    l = 1 === a ? t : E.Deferred(),
                    u = function(e, n, i) {
                        return function(t) {
                            n[e] = this, i[e] = 1 < arguments.length ? c.call(arguments) : t, i === o ? l.notifyWith(n, i) : --a || l.resolveWith(n, i)
                        }
                    };
                if (1 < s)
                    for (o = new Array(s), e = new Array(s), n = new Array(s); i < s; i++) r[i] && E.isFunction(r[i].promise) ? r[i].promise().progress(u(i, e, o)).done(u(i, n, r)).fail(l.reject) : --a;
                return a || l.resolveWith(n, r), l.promise()
            }
        }), E.fn.ready = function(t) {
            return E.ready.promise().done(t), this
        }, E.extend({
            isReady: !1,
            readyWait: 1,
            holdReady: function(t) {
                t ? E.readyWait++ : E.ready(!0)
            },
            ready: function(t) {
                (!0 === t ? --E.readyWait : E.isReady) || ((E.isReady = !0) !== t && 0 < --E.readyWait || (j.resolveWith(h, [E]), E.fn.triggerHandler && (E(h).triggerHandler("ready"), E(h).off("ready"))))
            }
        }), E.ready.promise = function(t) {
            if (!j)
                if (j = E.Deferred(), "complete" === h.readyState || "loading" !== h.readyState && !h.documentElement.doScroll) C.setTimeout(E.ready);
                else if (h.addEventListener) h.addEventListener("DOMContentLoaded", H), C.addEventListener("load", H);
            else {
                h.attachEvent("onreadystatechange", H), C.attachEvent("onload", H);
                var n = !1;
                try {
                    n = null == C.frameElement && h.documentElement
                } catch (t) {}
                n && n.doScroll && function e() {
                    if (!E.isReady) {
                        try {
                            n.doScroll("left")
                        } catch (t) {
                            return C.setTimeout(e, 50)
                        }
                        I(), E.ready()
                    }
                }()
            }
            return j.promise(t)
        }, E.ready.promise(), E(v)) break;
    v.ownFirst = "0" === L, v.inlineBlockNeedsLayout = !1, E(function() {
            var t, e, n, i;
            (n = h.getElementsByTagName("body")[0]) && n.style && (e = h.createElement("div"), (i = h.createElement("div")).style.cssText = "position:absolute;border:0;width:0;height:0;top:0;left:-9999px", n.appendChild(i).appendChild(e), void 0 !== e.style.zoom && (e.style.cssText = "display:inline;margin:0;border:0;padding:1px;width:1px;zoom:1", v.inlineBlockNeedsLayout = t = 3 === e.offsetWidth, t && (n.style.zoom = 1)), n.removeChild(i))
        }),
        function() {
            var t = h.createElement("div");
            v.deleteExpando = !0;
            try {
                delete t.test
            } catch (t) {
                v.deleteExpando = !1
            }
            t = null
        }();
    var R, q = function(t) {
            var e = E.noData[(t.nodeName + " ").toLowerCase()],
                n = +t.nodeType || 1;
            return (1 === n || 9 === n) && (!e || !0 !== e && t.getAttribute("classid") === e)
        },
        _ = /^(?:\{[\w\W]*\}|\[[\w\W]*\])$/,
        P = /([A-Z])/g;

    function F(t, e, n) {
        if (void 0 === n && 1 === t.nodeType) {
            var i = "data-" + e.replace(P, "-$1").toLowerCase();
            if ("string" == typeof(n = t.getAttribute(i))) {
                try {
                    n = "true" === n || "false" !== n && ("null" === n ? null : +n + "" === n ? +n : _.test(n) ? E.parseJSON(n) : n)
                } catch (t) {}
                E.data(t, e, n)
            } else n = void 0
        }
        return n
    }

    function M(t) {
        var e;
        for (e in t)
            if (("data" !== e || !E.isEmptyObject(t[e])) && "toJSON" !== e) return !1;
        return !0
    }

    function B(t, e, n, i) {
        if (q(t)) {
            var o, r, s = E.expando,
                a = t.nodeType,
                l = a ? E.cache : t,
                u = a ? t[s] : t[s] && s;
            if (u && l[u] && (i || l[u].data) || void 0 !== n || "string" != typeof e) return u || (u = a ? t[s] = d.pop() || E.guid++ : s), l[u] || (l[u] = a ? {} : {
                toJSON: E.noop
            }), "object" != typeof e && "function" != typeof e || (i ? l[u] = E.extend(l[u], e) : l[u].data = E.extend(l[u].data, e)), r = l[u], i || (r.data || (r.data = {}), r = r.data), void 0 !== n && (r[E.camelCase(e)] = n), "string" == typeof e ? null == (o = r[e]) && (o = r[E.camelCase(e)]) : o = r, o
        }
    }

    function W(t, e, n) {
        if (q(t)) {
            var i, o, r = t.nodeType,
                s = r ? E.cache : t,
                a = r ? t[E.expando] : E.expando;
            if (s[a]) {
                if (e && (i = n ? s[a] : s[a].data)) {
                    E.isArray(e) ? e = e.concat(E.map(e, E.camelCase)) : e in i ? e = [e] : e = (e = E.camelCase(e)) in i ? [e] : e.split(" "), o = e.length;
                    for (; o--;) delete i[e[o]];
                    if (n ? !M(i) : !E.isEmptyObject(i)) return
                }(n || (delete s[a].data, M(s[a]))) && (r ? E.cleanData([t], !0) : v.deleteExpando || s != s.window ? delete s[a] : s[a] = void 0)
            }
        }
    }
    E.extend({
        cache: {},
        noData: {
            "applet ": !0,
            "embed ": !0,
            "object ": "clsid:D27CDB6E-AE6D-11cf-96B8-444553540000"
        },
        hasData: function(t) {
            return !!(t = t.nodeType ? E.cache[t[E.expando]] : t[E.expando]) && !M(t)
        },
        data: function(t, e, n) {
            return B(t, e, n)
        },
        removeData: function(t, e) {
            return W(t, e)
        },
        _data: function(t, e, n) {
            return B(t, e, n, !0)
        },
        _removeData: function(t, e) {
            return W(t, e, !0)
        }
    }), E.fn.extend({
        data: function(t, e) {
            var n, i, o, r = this[0],
                s = r && r.attributes;
            if (void 0 === t) {
                if (this.length && (o = E.data(r), 1 === r.nodeType && !E._data(r, "parsedAttrs"))) {
                    for (n = s.length; n--;) s[n] && (0 === (i = s[n].name).indexOf("data-") && F(r, i = E.camelCase(i.slice(5)), o[i]));
                    E._data(r, "parsedAttrs", !0)
                }
                return o
            }
            return "object" == typeof t ? this.each(function() {
                E.data(this, t)
            }) : 1 < arguments.length ? this.each(function() {
                E.data(this, t, e)
            }) : r ? F(r, t, E.data(r, t)) : void 0
        },
        removeData: function(t) {
            return this.each(function() {
                E.removeData(this, t)
            })
        }
    }), E.extend({
        queue: function(t, e, n) {
            var i;
            return t ? (e = (e || "fx") + "queue", i = E._data(t, e), n && (!i || E.isArray(n) ? i = E._data(t, e, E.makeArray(n)) : i.push(n)), i || []) : void 0
        },
        dequeue: function(t, e) {
            e = e || "fx";
            var n = E.queue(t, e),
                i = n.length,
                o = n.shift(),
                r = E._queueHooks(t, e);
            "inprogress" === o && (o = n.shift(), i--), o && ("fx" === e && n.unshift("inprogress"), delete r.stop, o.call(t, function() {
                E.dequeue(t, e)
            }, r)), !i && r && r.empty.fire()
        },
        _queueHooks: function(t, e) {
            var n = e + "queueHooks";
            return E._data(t, n) || E._data(t, n, {
                empty: E.Callbacks("once memory").add(function() {
                    E._removeData(t, e + "queue"), E._removeData(t, n)
                })
            })
        }
    }), E.fn.extend({
        queue: function(e, n) {
            var t = 2;
            return "string" != typeof e && (n = e, e = "fx", t--), arguments.length < t ? E.queue(this[0], e) : void 0 === n ? this : this.each(function() {
                var t = E.queue(this, e, n);
                E._queueHooks(this, e), "fx" === e && "inprogress" !== t[0] && E.dequeue(this, e)
            })
        },
        dequeue: function(t) {
            return this.each(function() {
                E.dequeue(this, t)
            })
        },
        clearQueue: function(t) {
            return this.queue(t || "fx", [])
        },
        promise: function(t, e) {
            var n, i = 1,
                o = E.Deferred(),
                r = this,
                s = this.length,
                a = function() {
                    --i || o.resolveWith(r, [r])
                };
            for ("string" != typeof t && (e = t, t = void 0), t = t || "fx"; s--;)(n = E._data(r[s], t + "queueHooks")) && n.empty && (i++, n.empty.add(a));
            return a(), o.promise(e)
        }
    }), v.shrinkWrapBlocks = function() {
        return null != R ? R : (R = !1, (e = h.getElementsByTagName("body")[0]) && e.style ? (t = h.createElement("div"), (n = h.createElement("div")).style.cssText = "position:absolute;border:0;width:0;height:0;top:0;left:-9999px", e.appendChild(n).appendChild(t), void 0 !== t.style.zoom && (t.style.cssText = "-webkit-box-sizing:content-box;-moz-box-sizing:content-box;box-sizing:content-box;display:block;margin:0;border:0;padding:1px;width:1px;zoom:1", t.appendChild(h.createElement("div")).style.width = "5px", R = 3 !== t.offsetWidth), e.removeChild(n), R) : void 0);
        var t, e, n
    };
    var U = /[+-]?(?:\d*\.|)\d+(?:[eE][+-]?\d+|)/.source,
        z = new RegExp("^(?:([+-])=|)(" + U + ")([a-z%]*)$", "i"),
        X = ["Top", "Right", "Bottom", "Left"],
        V = function(t, e) {
            return t = e || t, "none" === E.css(t, "display") || !E.contains(t.ownerDocument, t)
        };

    function Q(t, e, n, i) {
        var o, r = 1,
            s = 20,
            a = i ? function() {
                return i.cur()
            } : function() {
                return E.css(t, e, "")
            },
            l = a(),
            u = n && n[3] || (E.cssNumber[e] ? "" : "px"),
            c = (E.cssNumber[e] || "px" !== u && +l) && z.exec(E.css(t, e));
        if (c && c[3] !== u)
            for (u = u || c[3], n = n || [], c = +l || 1; c /= r = r || ".5", E.style(t, e, c + u), r !== (r = a() / l) && 1 !== r && --s;);
        return n && (c = +c || +l || 0, o = n[1] ? c + (n[1] + 1) * n[2] : +n[2], i && (i.unit = u, i.start = c, i.end = o)), o
    }
    var J, Y, G, K = function(t, e, n, i, o, r, s) {
            var a = 0,
                l = t.length,
                u = null == n;
            if ("object" === E.type(n))
                for (a in o = !0, n) K(t, e, a, n[a], !0, r, s);
            else if (void 0 !== i && (o = !0, E.isFunction(i) || (s = !0), u && (s ? (e.call(t, i), e = null) : (u = e, e = function(t, e, n) {
                    return u.call(E(t), n)
                })), e))
                for (; a < l; a++) e(t[a], n, s ? i : i.call(t[a], a, e(t[a], n)));
            return o ? t : u ? e.call(t) : l ? e(t[0], n) : r
        },
        Z = /^(?:checkbox|radio)$/i,
        tt = /<([\w:-]+)/,
        et = /^$|\/(?:java|ecma)script/i,
        nt = /^\s+/,
        it = "abbr|article|aside|audio|bdi|canvas|data|datalist|details|dialog|figcaption|figure|footer|header|hgroup|main|mark|meter|nav|output|picture|progress|section|summary|template|time|video";

    function ot(t) {
        var e = it.split("|"),
            n = t.createDocumentFragment();
        if (n.createElement)
            for (; e.length;) n.createElement(e.pop());
        return n
    }
    J = h.createElement("div"), Y = h.createDocumentFragment(), G = h.createElement("input"), J.innerHTML = "  <link/><table></table><a href='/a'>a</a><input type='checkbox'/>", v.leadingWhitespace = 3 === J.firstChild.nodeType, v.tbody = !J.getElementsByTagName("tbody").length, v.htmlSerialize = !!J.getElementsByTagName("link").length, v.html5Clone = "<:nav></:nav>" !== h.createElement("nav").cloneNode(!0).outerHTML, G.type = "checkbox", G.checked = !0, Y.appendChild(G), v.appendChecked = G.checked, J.innerHTML = "<textarea>x</textarea>", v.noCloneChecked = !!J.cloneNode(!0).lastChild.defaultValue, Y.appendChild(J), (G = h.createElement("input")).setAttribute("type", "radio"), G.setAttribute("checked", "checked"), G.setAttribute("name", "t"), J.appendChild(G), v.checkClone = J.cloneNode(!0).cloneNode(!0).lastChild.checked, v.noCloneEvent = !!J.addEventListener, J[E.expando] = 1, v.attributes = !J.getAttribute(E.expando);
    var rt = {
        option: [1, "<select multiple='multiple'>", "</select>"],
        legend: [1, "<fieldset>", "</fieldset>"],
        area: [1, "<map>", "</map>"],
        param: [1, "<object>", "</object>"],
        thead: [1, "<table>", "</table>"],
        tr: [2, "<table><tbody>", "</tbody></table>"],
        col: [2, "<table><tbody></tbody><colgroup>", "</colgroup></table>"],
        td: [3, "<table><tbody><tr>", "</tr></tbody></table>"],
        _default: v.htmlSerialize ? [0, "", ""] : [1, "X<div>", "</div>"]
    };

    function st(t, e) {
        var n, i, o = 0,
            r = void 0 !== t.getElementsByTagName ? t.getElementsByTagName(e || "*") : void 0 !== t.querySelectorAll ? t.querySelectorAll(e || "*") : void 0;
        if (!r)
            for (r = [], n = t.childNodes || t; null != (i = n[o]); o++) !e || E.nodeName(i, e) ? r.push(i) : E.merge(r, st(i, e));
        return void 0 === e || e && E.nodeName(t, e) ? E.merge([t], r) : r
    }

    function at(t, e) {
        for (var n, i = 0; null != (n = t[i]); i++) E._data(n, "globalEval", !e || E._data(e[i], "globalEval"))
    }
    rt.optgroup = rt.option, rt.tbody = rt.tfoot = rt.colgroup = rt.caption = rt.thead, rt.th = rt.td;
    var lt = /<|&#?\w+;/,
        ut = /<tbody/i;

    function ct(t) {
        Z.test(t.type) && (t.defaultChecked = t.checked)
    }

    function dt(t, e, n, i, o) {
        for (var r, s, a, l, u, c, d, p = t.length, f = ot(e), h = [], g = 0; g < p; g++)
            if ((s = t[g]) || 0 === s)
                if ("object" === E.type(s)) E.merge(h, s.nodeType ? [s] : s);
                else if (lt.test(s)) {
            for (l = l || f.appendChild(e.createElement("div")), u = (tt.exec(s) || ["", ""])[1].toLowerCase(), d = rt[u] || rt._default, l.innerHTML = d[1] + E.htmlPrefilter(s) + d[2], r = d[0]; r--;) l = l.lastChild;
            if (!v.leadingWhitespace && nt.test(s) && h.push(e.createTextNode(nt.exec(s)[0])), !v.tbody)
                for (r = (s = "table" !== u || ut.test(s) ? "<table>" !== d[1] || ut.test(s) ? 0 : l : l.firstChild) && s.childNodes.length; r--;) E.nodeName(c = s.childNodes[r], "tbody") && !c.childNodes.length && s.removeChild(c);
            for (E.merge(h, l.childNodes), l.textContent = ""; l.firstChild;) l.removeChild(l.firstChild);
            l = f.lastChild
        } else h.push(e.createTextNode(s));
        for (l && f.removeChild(l), v.appendChecked || E.grep(st(h, "input"), ct), g = 0; s = h[g++];)
            if (i && -1 < E.inArray(s, i)) o && o.push(s);
            else if (a = E.contains(s.ownerDocument, s), l = st(f.appendChild(s), "script"), a && at(l), n)
            for (r = 0; s = l[r++];) et.test(s.type || "") && n.push(s);
        return l = null, f
    }! function() {
        var t, e, n = h.createElement("div");
        for (t in {
                submit: !0,
                change: !0,
                focusin: !0
            }) e = "on" + t, (v[t] = e in C) || (n.setAttribute(e, "t"), v[t] = !1 === n.attributes[e].expando);
        n = null
    }();
    var pt = /^(?:input|select|textarea)$/i,
        ft = /^key/,
        ht = /^(?:mouse|pointer|contextmenu|drag|drop)|click/,
        gt = /^(?:focusinfocus|focusoutblur)$/,
        mt = /^([^.]*)(?:\.(.+)|)/;

    function vt() {
        return !0
    }

    function yt() {
        return !1
    }

    function bt() {
        try {
            return h.activeElement
        } catch (t) {}
    }

    function xt(t, e, n, i, o, r) {
        var s, a;
        if ("object" == typeof e) {
            for (a in "string" != typeof n && (i = i || n, n = void 0), e) xt(t, a, n, i, e[a], r);
            return t
        }
        if (null == i && null == o ? (o = n, i = n = void 0) : null == o && ("string" == typeof n ? (o = i, i = void 0) : (o = i, i = n, n = void 0)), !1 === o) o = yt;
        else if (!o) return t;
        return 1 === r && (s = o, (o = function(t) {
            return E().off(t), s.apply(this, arguments)
        }).guid = s.guid || (s.guid = E.guid++)), t.each(function() {
            E.event.add(this, e, o, i, n)
        })
    }
    E.event = {
        global: {},
        add: function(t, e, n, i, o) {
            var r, s, a, l, u, c, d, p, f, h, g, m = E._data(t);
            if (m) {
                for (n.handler && (n = (l = n).handler, o = l.selector), n.guid || (n.guid = E.guid++), (s = m.events) || (s = m.events = {}), (c = m.handle) || ((c = m.handle = function(t) {
                        return void 0 === E || t && E.event.triggered === t.type ? void 0 : E.event.dispatch.apply(c.elem, arguments)
                    }).elem = t), a = (e = (e || "").match(O) || [""]).length; a--;) f = g = (r = mt.exec(e[a]) || [])[1], h = (r[2] || "").split(".").sort(), f && (u = E.event.special[f] || {}, f = (o ? u.delegateType : u.bindType) || f, u = E.event.special[f] || {}, d = E.extend({
                    type: f,
                    origType: g,
                    data: i,
                    handler: n,
                    guid: n.guid,
                    selector: o,
                    needsContext: o && E.expr.match.needsContext.test(o),
                    namespace: h.join(".")
                }, l), (p = s[f]) || ((p = s[f] = []).delegateCount = 0, u.setup && !1 !== u.setup.call(t, i, h, c) || (t.addEventListener ? t.addEventListener(f, c, !1) : t.attachEvent && t.attachEvent("on" + f, c))), u.add && (u.add.call(t, d), d.handler.guid || (d.handler.guid = n.guid)), o ? p.splice(p.delegateCount++, 0, d) : p.push(d), E.event.global[f] = !0);
                t = null
            }
        },
        remove: function(t, e, n, i, o) {
            var r, s, a, l, u, c, d, p, f, h, g, m = E.hasData(t) && E._data(t);
            if (m && (c = m.events)) {
                for (u = (e = (e || "").match(O) || [""]).length; u--;)
                    if (f = g = (a = mt.exec(e[u]) || [])[1], h = (a[2] || "").split(".").sort(), f) {
                        for (d = E.event.special[f] || {}, p = c[f = (i ? d.delegateType : d.bindType) || f] || [], a = a[2] && new RegExp("(^|\\.)" + h.join("\\.(?:.*\\.|)") + "(\\.|$)"), l = r = p.length; r--;) s = p[r], !o && g !== s.origType || n && n.guid !== s.guid || a && !a.test(s.namespace) || i && i !== s.selector && ("**" !== i || !s.selector) || (p.splice(r, 1), s.selector && p.delegateCount--, d.remove && d.remove.call(t, s));
                        l && !p.length && (d.teardown && !1 !== d.teardown.call(t, h, m.handle) || E.removeEvent(t, f, m.handle), delete c[f])
                    } else
                        for (f in c) E.event.remove(t, f + e[u], n, i, !0);
                E.isEmptyObject(c) && (delete m.handle, E._removeData(t, "events"))
            }
        },
        trigger: function(t, e, n, i) {
            var o, r, s, a, l, u, c, d = [n || h],
                p = m.call(t, "type") ? t.type : t,
                f = m.call(t, "namespace") ? t.namespace.split(".") : [];
            if (s = u = n = n || h, 3 !== n.nodeType && 8 !== n.nodeType && !gt.test(p + E.event.triggered) && (-1 < p.indexOf(".") && (p = (f = p.split(".")).shift(), f.sort()), r = p.indexOf(":") < 0 && "on" + p, (t = t[E.expando] ? t : new E.Event(p, "object" == typeof t && t)).isTrigger = i ? 2 : 3, t.namespace = f.join("."), t.rnamespace = t.namespace ? new RegExp("(^|\\.)" + f.join("\\.(?:.*\\.|)") + "(\\.|$)") : null, t.result = void 0, t.target || (t.target = n), e = null == e ? [t] : E.makeArray(e, [t]), l = E.event.special[p] || {}, i || !l.trigger || !1 !== l.trigger.apply(n, e))) {
                if (!i && !l.noBubble && !E.isWindow(n)) {
                    for (a = l.delegateType || p, gt.test(a + p) || (s = s.parentNode); s; s = s.parentNode) d.push(s), u = s;
                    u === (n.ownerDocument || h) && d.push(u.defaultView || u.parentWindow || C)
                }
                for (c = 0;
                    (s = d[c++]) && !t.isPropagationStopped();) t.type = 1 < c ? a : l.bindType || p, (o = (E._data(s, "events") || {})[t.type] && E._data(s, "handle")) && o.apply(s, e), (o = r && s[r]) && o.apply && q(s) && (t.result = o.apply(s, e), !1 === t.result && t.preventDefault());
                if (t.type = p, !i && !t.isDefaultPrevented() && (!l._default || !1 === l._default.apply(d.pop(), e)) && q(n) && r && n[p] && !E.isWindow(n)) {
                    (u = n[r]) && (n[r] = null), E.event.triggered = p;
                    try {
                        n[p]()
                    } catch (t) {}
                    E.event.triggered = void 0, u && (n[r] = u)
                }
                return t.result
            }
        },
        dispatch: function(t) {
            t = E.event.fix(t);
            var e, n, i, o, r, s = [],
                a = c.call(arguments),
                l = (E._data(this, "events") || {})[t.type] || [],
                u = E.event.special[t.type] || {};
            if ((a[0] = t).delegateTarget = this, !u.preDispatch || !1 !== u.preDispatch.call(this, t)) {
                for (s = E.event.handlers.call(this, t, l), e = 0;
                    (o = s[e++]) && !t.isPropagationStopped();)
                    for (t.currentTarget = o.elem, n = 0;
                        (r = o.handlers[n++]) && !t.isImmediatePropagationStopped();) t.rnamespace && !t.rnamespace.test(r.namespace) || (t.handleObj = r, t.data = r.data, void 0 !== (i = ((E.event.special[r.origType] || {}).handle || r.handler).apply(o.elem, a)) && !1 === (t.result = i) && (t.preventDefault(), t.stopPropagation()));
                return u.postDispatch && u.postDispatch.call(this, t), t.result
            }
        },
        handlers: function(t, e) {
            var n, i, o, r, s = [],
                a = e.delegateCount,
                l = t.target;
            if (a && l.nodeType && ("click" !== t.type || isNaN(t.button) || t.button < 1))
                for (; l != this; l = l.parentNode || this)
                    if (1 === l.nodeType && (!0 !== l.disabled || "click" !== t.type)) {
                        for (i = [], n = 0; n < a; n++) void 0 === i[o = (r = e[n]).selector + " "] && (i[o] = r.needsContext ? -1 < E(o, this).index(l) : E.find(o, this, null, [l]).length), i[o] && i.push(r);
                        i.length && s.push({
                            elem: l,
                            handlers: i
                        })
                    }
            return a < e.length && s.push({
                elem: this,
                handlers: e.slice(a)
            }), s
        },
        fix: function(t) {
            if (t[E.expando]) return t;
            var e, n, i, o = t.type,
                r = t,
                s = this.fixHooks[o];
            for (s || (this.fixHooks[o] = s = ht.test(o) ? this.mouseHooks : ft.test(o) ? this.keyHooks : {}), i = s.props ? this.props.concat(s.props) : this.props, t = new E.Event(r), e = i.length; e--;) t[n = i[e]] = r[n];
            return t.target || (t.target = r.srcElement || h), 3 === t.target.nodeType && (t.target = t.target.parentNode), t.metaKey = !!t.metaKey, s.filter ? s.filter(t, r) : t
        },
        props: "altKey bubbles cancelable ctrlKey currentTarget detail eventPhase metaKey relatedTarget shiftKey target timeStamp view which".split(" "),
        fixHooks: {},
        keyHooks: {
            props: "char charCode key keyCode".split(" "),
            filter: function(t, e) {
                return null == t.which && (t.which = null != e.charCode ? e.charCode : e.keyCode), t
            }
        },
        mouseHooks: {
            props: "button buttons clientX clientY fromElement offsetX offsetY pageX pageY screenX screenY toElement".split(" "),
            filter: function(t, e) {
                var n, i, o, r = e.button,
                    s = e.fromElement;
                return null == t.pageX && null != e.clientX && (o = (i = t.target.ownerDocument || h).documentElement, n = i.body, t.pageX = e.clientX + (o && o.scrollLeft || n && n.scrollLeft || 0) - (o && o.clientLeft || n && n.clientLeft || 0), t.pageY = e.clientY + (o && o.scrollTop || n && n.scrollTop || 0) - (o && o.clientTop || n && n.clientTop || 0)), !t.relatedTarget && s && (t.relatedTarget = s === t.target ? e.toElement : s), t.which || void 0 === r || (t.which = 1 & r ? 1 : 2 & r ? 3 : 4 & r ? 2 : 0), t
            }
        },
        special: {
            load: {
                noBubble: !0
            },
            focus: {
                trigger: function() {
                    if (this !== bt() && this.focus) try {
                        return this.focus(), !1
                    } catch (t) {}
                },
                delegateType: "focusin"
            },
            blur: {
                trigger: function() {
                    return this === bt() && this.blur ? (this.blur(), !1) : void 0
                },
                delegateType: "focusout"
            },
            click: {
                trigger: function() {
                    return E.nodeName(this, "input") && "checkbox" === this.type && this.click ? (this.click(), !1) : void 0
                },
                _default: function(t) {
                    return E.nodeName(t.target, "a")
                }
            },
            beforeunload: {
                postDispatch: function(t) {
                    void 0 !== t.result && t.originalEvent && (t.originalEvent.returnValue = t.result)
                }
            }
        },
        simulate: function(t, e, n) {
            var i = E.extend(new E.Event, n, {
                type: t,
                isSimulated: !0
            });
            E.event.trigger(i, null, e), i.isDefaultPrevented() && n.preventDefault()
        }
    }, E.removeEvent = h.removeEventListener ? function(t, e, n) {
        t.removeEventListener && t.removeEventListener(e, n)
    } : function(t, e, n) {
        var i = "on" + e;
        t.detachEvent && (void 0 === t[i] && (t[i] = null), t.detachEvent(i, n))
    }, E.Event = function(t, e) {
        return this instanceof E.Event ? (t && t.type ? (this.originalEvent = t, this.type = t.type, this.isDefaultPrevented = t.defaultPrevented || void 0 === t.defaultPrevented && !1 === t.returnValue ? vt : yt) : this.type = t, e && E.extend(this, e), this.timeStamp = t && t.timeStamp || E.now(), void(this[E.expando] = !0)) : new E.Event(t, e)
    }, E.Event.prototype = {
        constructor: E.Event,
        isDefaultPrevented: yt,
        isPropagationStopped: yt,
        isImmediatePropagationStopped: yt,
        preventDefault: function() {
            var t = this.originalEvent;
            this.isDefaultPrevented = vt, t && (t.preventDefault ? t.preventDefault() : t.returnValue = !1)
        },
        stopPropagation: function() {
            var t = this.originalEvent;
            this.isPropagationStopped = vt, t && !this.isSimulated && (t.stopPropagation && t.stopPropagation(), t.cancelBubble = !0)
        },
        stopImmediatePropagation: function() {
            var t = this.originalEvent;
            this.isImmediatePropagationStopped = vt, t && t.stopImmediatePropagation && t.stopImmediatePropagation(), this.stopPropagation()
        }
    }, E.each({
        mouseenter: "mouseover",
        mouseleave: "mouseout",
        pointerenter: "pointerover",
        pointerleave: "pointerout"
    }, function(t, o) {
        E.event.special[t] = {
            delegateType: o,
            bindType: o,
            handle: function(t) {
                var e, n = t.relatedTarget,
                    i = t.handleObj;
                return n && (n === this || E.contains(this, n)) || (t.type = i.origType, e = i.handler.apply(this, arguments), t.type = o), e
            }
        }
    }), v.submit || (E.event.special.submit = {
        setup: function() {
            return !E.nodeName(this, "form") && void E.event.add(this, "click._submit keypress._submit", function(t) {
                var e = t.target,
                    n = E.nodeName(e, "input") || E.nodeName(e, "button") ? E.prop(e, "form") : void 0;
                n && !E._data(n, "submit") && (E.event.add(n, "submit._submit", function(t) {
                    t._submitBubble = !0
                }), E._data(n, "submit", !0))
            })
        },
        postDispatch: function(t) {
            t._submitBubble && (delete t._submitBubble, this.parentNode && !t.isTrigger && E.event.simulate("submit", this.parentNode, t))
        },
        teardown: function() {
            return !E.nodeName(this, "form") && void E.event.remove(this, "._submit")
        }
    }), v.change || (E.event.special.change = {
        setup: function() {
            return pt.test(this.nodeName) ? ("checkbox" !== this.type && "radio" !== this.type || (E.event.add(this, "propertychange._change", function(t) {
                "checked" === t.originalEvent.propertyName && (this._justChanged = !0)
            }), E.event.add(this, "click._change", function(t) {
                this._justChanged && !t.isTrigger && (this._justChanged = !1), E.event.simulate("change", this, t)
            })), !1) : void E.event.add(this, "beforeactivate._change", function(t) {
                var e = t.target;
                pt.test(e.nodeName) && !E._data(e, "change") && (E.event.add(e, "change._change", function(t) {
                    !this.parentNode || t.isSimulated || t.isTrigger || E.event.simulate("change", this.parentNode, t)
                }), E._data(e, "change", !0))
            })
        },
        handle: function(t) {
            var e = t.target;
            return this !== e || t.isSimulated || t.isTrigger || "radio" !== e.type && "checkbox" !== e.type ? t.handleObj.handler.apply(this, arguments) : void 0
        },
        teardown: function() {
            return E.event.remove(this, "._change"), !pt.test(this.nodeName)
        }
    }), v.focusin || E.each({
        focus: "focusin",
        blur: "focusout"
    }, function(n, i) {
        var o = function(t) {
            E.event.simulate(i, t.target, E.event.fix(t))
        };
        E.event.special[i] = {
            setup: function() {
                var t = this.ownerDocument || this,
                    e = E._data(t, i);
                e || t.addEventListener(n, o, !0), E._data(t, i, (e || 0) + 1)
            },
            teardown: function() {
                var t = this.ownerDocument || this,
                    e = E._data(t, i) - 1;
                e ? E._data(t, i, e) : (t.removeEventListener(n, o, !0), E._removeData(t, i))
            }
        }
    }), E.fn.extend({
        on: function(t, e, n, i) {
            return xt(this, t, e, n, i)
        },
        one: function(t, e, n, i) {
            return xt(this, t, e, n, i, 1)
        },
        off: function(t, e, n) {
            var i, o;
            if (t && t.preventDefault && t.handleObj) return i = t.handleObj, E(t.delegateTarget).off(i.namespace ? i.origType + "." + i.namespace : i.origType, i.selector, i.handler), this;
            if ("object" == typeof t) {
                for (o in t) this.off(o, e, t[o]);
                return this
            }
            return !1 !== e && "function" != typeof e || (n = e, e = void 0), !1 === n && (n = yt), this.each(function() {
                E.event.remove(this, t, n, e)
            })
        },
        trigger: function(t, e) {
            return this.each(function() {
                E.event.trigger(t, e, this)
            })
        },
        triggerHandler: function(t, e) {
            var n = this[0];
            return n ? E.event.trigger(t, e, n, !0) : void 0
        }
    });
    var wt = / jQuery\d+="(?:null|\d+)"/g,
        Tt = new RegExp("<(?:" + it + ")[\\s/>]", "i"),
        Ct = /<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:-]+)[^>]*)\/>/gi,
        Et = /<script|<style|<link/i,
        St = /checked\s*(?:[^=]|=\s*.checked.)/i,
        kt = /^true\/(.*)/,
        Nt = /^\s*<!(?:\[CDATA\[|--)|(?:\]\]|--)>\s*$/g,
        $t = ot(h).appendChild(h.createElement("div"));

    function At(t, e) {
        return E.nodeName(t, "table") && E.nodeName(11 !== e.nodeType ? e : e.firstChild, "tr") ? t.getElementsByTagName("tbody")[0] || t.appendChild(t.ownerDocument.createElement("tbody")) : t
    }

    function Dt(t) {
        return t.type = (null !== E.find.attr(t, "type")) + "/" + t.type, t
    }

    function jt(t) {
        var e = kt.exec(t.type);
        return e ? t.type = e[1] : t.removeAttribute("type"), t
    }

    function Lt(t, e) {
        if (1 === e.nodeType && E.hasData(t)) {
            var n, i, o, r = E._data(t),
                s = E._data(e, r),
                a = r.events;
            if (a)
                for (n in delete s.handle, s.events = {}, a)
                    for (i = 0, o = a[n].length; i < o; i++) E.event.add(e, n, a[n][i]);
            s.data && (s.data = E.extend({}, s.data))
        }
    }

    function Ot(t, e) {
        var n, i, o;
        if (1 === e.nodeType) {
            if (n = e.nodeName.toLowerCase(), !v.noCloneEvent && e[E.expando]) {
                for (i in (o = E._data(e)).events) E.removeEvent(e, i, o.handle);
                e.removeAttribute(E.expando)
            }
            "script" === n && e.text !== t.text ? (Dt(e).text = t.text, jt(e)) : "object" === n ? (e.parentNode && (e.outerHTML = t.outerHTML), v.html5Clone && t.innerHTML && !E.trim(e.innerHTML) && (e.innerHTML = t.innerHTML)) : "input" === n && Z.test(t.type) ? (e.defaultChecked = e.checked = t.checked, e.value !== t.value && (e.value = t.value)) : "option" === n ? e.defaultSelected = e.selected = t.defaultSelected : "input" !== n && "textarea" !== n || (e.defaultValue = t.defaultValue)
        }
    }

    function It(n, i, o, r) {
        i = g.apply([], i);
        var t, e, s, a, l, u, c = 0,
            d = n.length,
            p = d - 1,
            f = i[0],
            h = E.isFunction(f);
        if (h || 1 < d && "string" == typeof f && !v.checkClone && St.test(f)) return n.each(function(t) {
            var e = n.eq(t);
            h && (i[0] = f.call(this, t, e.html())), It(e, i, o, r)
        });
        if (d && (t = (u = dt(i, n[0].ownerDocument, !1, n, r)).firstChild, 1 === u.childNodes.length && (u = t), t || r)) {
            for (s = (a = E.map(st(u, "script"), Dt)).length; c < d; c++) e = u, c !== p && (e = E.clone(e, !0, !0), s && E.merge(a, st(e, "script"))), o.call(n[c], e, c);
            if (s)
                for (l = a[a.length - 1].ownerDocument, E.map(a, jt), c = 0; c < s; c++) e = a[c], et.test(e.type || "") && !E._data(e, "globalEval") && E.contains(l, e) && (e.src ? E._evalUrl && E._evalUrl(e.src) : E.globalEval((e.text || e.textContent || e.innerHTML || "").replace(Nt, "")));
            u = t = null
        }
        return n
    }

    function Ht(t, e, n) {
        for (var i, o = e ? E.filter(e, t) : t, r = 0; null != (i = o[r]); r++) n || 1 !== i.nodeType || E.cleanData(st(i)), i.parentNode && (n && E.contains(i.ownerDocument, i) && at(st(i, "script")), i.parentNode.removeChild(i));
        return t
    }
    E.extend({
        htmlPrefilter: function(t) {
            return t.replace(Ct, "<$1></$2>")
        },
        clone: function(t, e, n) {
            var i, o, r, s, a, l = E.contains(t.ownerDocument, t);
            if (v.html5Clone || E.isXMLDoc(t) || !Tt.test("<" + t.nodeName + ">") ? r = t.cloneNode(!0) : ($t.innerHTML = t.outerHTML, $t.removeChild(r = $t.firstChild)), !(v.noCloneEvent && v.noCloneChecked || 1 !== t.nodeType && 11 !== t.nodeType || E.isXMLDoc(t)))
                for (i = st(r), a = st(t), s = 0; null != (o = a[s]); ++s) i[s] && Ot(o, i[s]);
            if (e)
                if (n)
                    for (a = a || st(t), i = i || st(r), s = 0; null != (o = a[s]); s++) Lt(o, i[s]);
                else Lt(t, r);
            return 0 < (i = st(r, "script")).length && at(i, !l && st(t, "script")), i = a = o = null, r
        },
        cleanData: function(t, e) {
            for (var n, i, o, r, s = 0, a = E.expando, l = E.cache, u = v.attributes, c = E.event.special; null != (n = t[s]); s++)
                if ((e || q(n)) && (r = (o = n[a]) && l[o])) {
                    if (r.events)
                        for (i in r.events) c[i] ? E.event.remove(n, i) : E.removeEvent(n, i, r.handle);
                    l[o] && (delete l[o], u || void 0 === n.removeAttribute ? n[a] = void 0 : n.removeAttribute(a), d.push(o))
                }
        }
    }), E.fn.extend({
        domManip: It,
        detach: function(t) {
            return Ht(this, t, !0)
        },
        remove: function(t) {
            return Ht(this, t)
        },
        text: function(t) {
            return K(this, function(t) {
                return void 0 === t ? E.text(this) : this.empty().append((this[0] && this[0].ownerDocument || h).createTextNode(t))
            }, null, t, arguments.length)
        },
        append: function() {
            return It(this, arguments, function(t) {
                1 !== this.nodeType && 11 !== this.nodeType && 9 !== this.nodeType || At(this, t).appendChild(t)
            })
        },
        prepend: function() {
            return It(this, arguments, function(t) {
                if (1 === this.nodeType || 11 === this.nodeType || 9 === this.nodeType) {
                    var e = At(this, t);
                    e.insertBefore(t, e.firstChild)
                }
            })
        },
        before: function() {
            return It(this, arguments, function(t) {
                this.parentNode && this.parentNode.insertBefore(t, this)
            })
        },
        after: function() {
            return It(this, arguments, function(t) {
                this.parentNode && this.parentNode.insertBefore(t, this.nextSibling)
            })
        },
        empty: function() {
            for (var t, e = 0; null != (t = this[e]); e++) {
                for (1 === t.nodeType && E.cleanData(st(t, !1)); t.firstChild;) t.removeChild(t.firstChild);
                t.options && E.nodeName(t, "select") && (t.options.length = 0)
            }
            return this
        },
        clone: function(t, e) {
            return t = null != t && t, e = null == e ? t : e, this.map(function() {
                return E.clone(this, t, e)
            })
        },
        html: function(t) {
            return K(this, function(t) {
                var e = this[0] || {},
                    n = 0,
                    i = this.length;
                if (void 0 === t) return 1 === e.nodeType ? e.innerHTML.replace(wt, "") : void 0;
                if ("string" == typeof t && !Et.test(t) && (v.htmlSerialize || !Tt.test(t)) && (v.leadingWhitespace || !nt.test(t)) && !rt[(tt.exec(t) || ["", ""])[1].toLowerCase()]) {
                    t = E.htmlPrefilter(t);
                    try {
                        for (; n < i; n++) 1 === (e = this[n] || {}).nodeType && (E.cleanData(st(e, !1)), e.innerHTML = t);
                        e = 0
                    } catch (t) {}
                }
                e && this.empty().append(t)
            }, null, t, arguments.length)
        },
        replaceWith: function() {
            var n = [];
            return It(this, arguments, function(t) {
                var e = this.parentNode;
                E.inArray(this, n) < 0 && (E.cleanData(st(this)), e && e.replaceChild(t, this))
            }, n)
        }
    }), E.each({
        appendTo: "append",
        prependTo: "prepend",
        insertBefore: "before",
        insertAfter: "after",
        replaceAll: "replaceWith"
    }, function(t, s) {
        E.fn[t] = function(t) {
            for (var e, n = 0, i = [], o = E(t), r = o.length - 1; n <= r; n++) e = n === r ? this : this.clone(!0), E(o[n])[s](e), a.apply(i, e.get());
            return this.pushStack(i)
        }
    });
    var Rt, qt = {
        HTML: "block",
        BODY: "block"
    };

    function _t(t, e) {
        var n = E(e.createElement(t)).appendTo(e.body),
            i = E.css(n[0], "display");
        return n.detach(), i
    }

    function Pt(t) {
        var e = h,
            n = qt[t];
        return n || ("none" !== (n = _t(t, e)) && n || ((e = ((Rt = (Rt || E("<iframe frameborder='0' width='0' height='0'/>")).appendTo(e.documentElement))[0].contentWindow || Rt[0].contentDocument).document).write(), e.close(), n = _t(t, e), Rt.detach()), qt[t] = n), n
    }
    var Ft = /^margin/,
        Mt = new RegExp("^(" + U + ")(?!px)[a-z%]+$", "i"),
        Bt = function(t, e, n, i) {
            var o, r, s = {};
            for (r in e) s[r] = t.style[r], t.style[r] = e[r];
            for (r in o = n.apply(t, i || []), e) t.style[r] = s[r];
            return o
        },
        Wt = h.documentElement;
    ! function() {
        var i, o, r, s, a, l, u = h.createElement("div"),
            c = h.createElement("div");
        if (c.style) {
            function t() {
                var t, e, n = h.documentElement;
                n.appendChild(u), c.style.cssText = "-webkit-box-sizing:border-box;box-sizing:border-box;position:relative;display:block;margin:auto;border:1px;padding:1px;top:1%;width:50%", i = r = l = !1, o = a = !0, C.getComputedStyle && (e = C.getComputedStyle(c), i = "1%" !== (e || {}).top, l = "2px" === (e || {}).marginLeft, r = "4px" === (e || {
                    width: "4px"
                }).width, c.style.marginRight = "50%", o = "4px" === (e || {
                    marginRight: "4px"
                }).marginRight, (t = c.appendChild(h.createElement("div"))).style.cssText = c.style.cssText = "-webkit-box-sizing:content-box;-moz-box-sizing:content-box;box-sizing:content-box;display:block;margin:0;border:0;padding:0", t.style.marginRight = t.style.width = "0", c.style.width = "1px", a = !parseFloat((C.getComputedStyle(t) || {}).marginRight), c.removeChild(t)), c.style.display = "none", (s = 0 === c.getClientRects().length) && (c.style.display = "", c.innerHTML = "<table><tr><td></td><td>t</td></tr></table>", c.childNodes[0].style.borderCollapse = "separate", (t = c.getElementsByTagName("td"))[0].style.cssText = "margin:0;border:0;padding:0;display:none", (s = 0 === t[0].offsetHeight) && (t[0].style.display = "", t[1].style.display = "none", s = 0 === t[0].offsetHeight)), n.removeChild(u)
            }
            c.style.cssText = "float:left;opacity:.5", v.opacity = "0.5" === c.style.opacity, v.cssFloat = !!c.style.cssFloat, c.style.backgroundClip = "content-box", c.cloneNode(!0).style.backgroundClip = "", v.clearCloneStyle = "content-box" === c.style.backgroundClip, (u = h.createElement("div")).style.cssText = "border:0;width:8px;height:0;top:0;left:-9999px;padding:0;margin-top:1px;position:absolute", c.innerHTML = "", u.appendChild(c), v.boxSizing = "" === c.style.boxSizing || "" === c.style.MozBoxSizing || "" === c.style.WebkitBoxSizing, E.extend(v, {
                reliableHiddenOffsets: function() {
                    return null == i && t(), s
                },
                boxSizingReliable: function() {
                    return null == i && t(), r
                },
                pixelMarginRight: function() {
                    return null == i && t(), o
                },
                pixelPosition: function() {
                    return null == i && t(), i
                },
                reliableMarginRight: function() {
                    return null == i && t(), a
                },
                reliableMarginLeft: function() {
                    return null == i && t(), l
                }
            })
        }
    }();
    var Ut, zt, Xt = /^(top|right|bottom|left)$/;

    function Vt(t, e) {
        return {
            get: function() {
                return t() ? void delete this.get : (this.get = e).apply(this, arguments)
            }
        }
    }
    C.getComputedStyle ? (Ut = function(t) {
        var e = t.ownerDocument.defaultView;
        return e && e.opener || (e = C), e.getComputedStyle(t)
    }, zt = function(t, e, n) {
        var i, o, r, s, a = t.style;
        return "" !== (s = (n = n || Ut(t)) ? n.getPropertyValue(e) || n[e] : void 0) && void 0 !== s || E.contains(t.ownerDocument, t) || (s = E.style(t, e)), n && !v.pixelMarginRight() && Mt.test(s) && Ft.test(e) && (i = a.width, o = a.minWidth, r = a.maxWidth, a.minWidth = a.maxWidth = a.width = s, s = n.width, a.width = i, a.minWidth = o, a.maxWidth = r), void 0 === s ? s : s + ""
    }) : Wt.currentStyle && (Ut = function(t) {
        return t.currentStyle
    }, zt = function(t, e, n) {
        var i, o, r, s, a = t.style;
        return null == (s = (n = n || Ut(t)) ? n[e] : void 0) && a && a[e] && (s = a[e]), Mt.test(s) && !Xt.test(e) && (i = a.left, (r = (o = t.runtimeStyle) && o.left) && (o.left = t.currentStyle.left), a.left = "fontSize" === e ? "1em" : s, s = a.pixelLeft + "px", a.left = i, r && (o.left = r)), void 0 === s ? s : s + "" || "auto"
    });
    var Qt = /alpha\([^)]*\)/i,
        Jt = /opacity\s*=\s*([^)]*)/i,
        Yt = /^(none|table(?!-c[ea]).+)/,
        Gt = new RegExp("^(" + U + ")(.*)$", "i"),
        Kt = {
            position: "absolute",
            visibility: "hidden",
            display: "block"
        },
        Zt = {
            letterSpacing: "0",
            fontWeight: "400"
        },
        te = ["Webkit", "O", "Moz", "ms"],
        ee = h.createElement("div").style;

    function ne(t) {
        if (t in ee) return t;
        for (var e = t.charAt(0).toUpperCase() + t.slice(1), n = te.length; n--;)
            if ((t = te[n] + e) in ee) return t
    }

    function ie(t, e) {
        for (var n, i, o, r = [], s = 0, a = t.length; s < a; s++)(i = t[s]).style && (r[s] = E._data(i, "olddisplay"), n = i.style.display, e ? (r[s] || "none" !== n || (i.style.display = ""), "" === i.style.display && V(i) && (r[s] = E._data(i, "olddisplay", Pt(i.nodeName)))) : (o = V(i), (n && "none" !== n || !o) && E._data(i, "olddisplay", o ? n : E.css(i, "display"))));
        for (s = 0; s < a; s++)(i = t[s]).style && (e && "none" !== i.style.display && "" !== i.style.display || (i.style.display = e ? r[s] || "" : "none"));
        return t
    }

    function oe(t, e, n) {
        var i = Gt.exec(e);
        return i ? Math.max(0, i[1] - (n || 0)) + (i[2] || "px") : e
    }

    function re(t, e, n, i, o) {
        for (var r = n === (i ? "border" : "content") ? 4 : "width" === e ? 1 : 0, s = 0; r < 4; r += 2) "margin" === n && (s += E.css(t, n + X[r], !0, o)), i ? ("content" === n && (s -= E.css(t, "padding" + X[r], !0, o)), "margin" !== n && (s -= E.css(t, "border" + X[r] + "Width", !0, o))) : (s += E.css(t, "padding" + X[r], !0, o), "padding" !== n && (s += E.css(t, "border" + X[r] + "Width", !0, o)));
        return s
    }

    function se(t, e, n) {
        var i = !0,
            o = "width" === e ? t.offsetWidth : t.offsetHeight,
            r = Ut(t),
            s = v.boxSizing && "border-box" === E.css(t, "boxSizing", !1, r);
        if (o <= 0 || null == o) {
            if (((o = zt(t, e, r)) < 0 || null == o) && (o = t.style[e]), Mt.test(o)) return o;
            i = s && (v.boxSizingReliable() || o === t.style[e]), o = parseFloat(o) || 0
        }
        return o + re(t, e, n || (s ? "border" : "content"), i, r) + "px"
    }

    function ae(t, e, n, i, o) {
        return new ae.prototype.init(t, e, n, i, o)
    }
    E.extend({
        cssHooks: {
            opacity: {
                get: function(t, e) {
                    if (e) {
                        var n = zt(t, "opacity");
                        return "" === n ? "1" : n
                    }
                }
            }
        },
        cssNumber: {
            animationIterationCount: !0,
            columnCount: !0,
            fillOpacity: !0,
            flexGrow: !0,
            flexShrink: !0,
            fontWeight: !0,
            lineHeight: !0,
            opacity: !0,
            order: !0,
            orphans: !0,
            widows: !0,
            zIndex: !0,
            zoom: !0
        },
        cssProps: {
            float: v.cssFloat ? "cssFloat" : "styleFloat"
        },
        style: function(t, e, n, i) {
            if (t && 3 !== t.nodeType && 8 !== t.nodeType && t.style) {
                var o, r, s, a = E.camelCase(e),
                    l = t.style;
                if (e = E.cssProps[a] || (E.cssProps[a] = ne(a) || a), s = E.cssHooks[e] || E.cssHooks[a], void 0 === n) return s && "get" in s && void 0 !== (o = s.get(t, !1, i)) ? o : l[e];
                if ("string" === (r = typeof n) && (o = z.exec(n)) && o[1] && (n = Q(t, e, o), r = "number"), null != n && n == n && ("number" === r && (n += o && o[3] || (E.cssNumber[a] ? "" : "px")), v.clearCloneStyle || "" !== n || 0 !== e.indexOf("background") || (l[e] = "inherit"), !(s && "set" in s && void 0 === (n = s.set(t, n, i))))) try {
                    l[e] = n
                } catch (t) {}
            }
        },
        css: function(t, e, n, i) {
            var o, r, s, a = E.camelCase(e);
            return e = E.cssProps[a] || (E.cssProps[a] = ne(a) || a), (s = E.cssHooks[e] || E.cssHooks[a]) && "get" in s && (r = s.get(t, !0, n)), void 0 === r && (r = zt(t, e, i)), "normal" === r && e in Zt && (r = Zt[e]), "" === n || n ? (o = parseFloat(r), !0 === n || isFinite(o) ? o || 0 : r) : r
        }
    }), E.each(["height", "width"], function(t, o) {
        E.cssHooks[o] = {
            get: function(t, e, n) {
                return e ? Yt.test(E.css(t, "display")) && 0 === t.offsetWidth ? Bt(t, Kt, function() {
                    return se(t, o, n)
                }) : se(t, o, n) : void 0
            },
            set: function(t, e, n) {
                var i = n && Ut(t);
                return oe(0, e, n ? re(t, o, n, v.boxSizing && "border-box" === E.css(t, "boxSizing", !1, i), i) : 0)
            }
        }
    }), v.opacity || (E.cssHooks.opacity = {
        get: function(t, e) {
            return Jt.test((e && t.currentStyle ? t.currentStyle.filter : t.style.filter) || "") ? .01 * parseFloat(RegExp.$1) + "" : e ? "1" : ""
        },
        set: function(t, e) {
            var n = t.style,
                i = t.currentStyle,
                o = E.isNumeric(e) ? "alpha(opacity=" + 100 * e + ")" : "",
                r = i && i.filter || n.filter || "";
            ((n.zoom = 1) <= e || "" === e) && "" === E.trim(r.replace(Qt, "")) && n.removeAttribute && (n.removeAttribute("filter"), "" === e || i && !i.filter) || (n.filter = Qt.test(r) ? r.replace(Qt, o) : r + " " + o)
        }
    }), E.cssHooks.marginRight = Vt(v.reliableMarginRight, function(t, e) {
        return e ? Bt(t, {
            display: "inline-block"
        }, zt, [t, "marginRight"]) : void 0
    }), E.cssHooks.marginLeft = Vt(v.reliableMarginLeft, function(t, e) {
        return e ? (parseFloat(zt(t, "marginLeft")) || (E.contains(t.ownerDocument, t) ? t.getBoundingClientRect().left - Bt(t, {
            marginLeft: 0
        }, function() {
            return t.getBoundingClientRect().left
        }) : 0)) + "px" : void 0
    }), E.each({
        margin: "",
        padding: "",
        border: "Width"
    }, function(o, r) {
        E.cssHooks[o + r] = {
            expand: function(t) {
                for (var e = 0, n = {}, i = "string" == typeof t ? t.split(" ") : [t]; e < 4; e++) n[o + X[e] + r] = i[e] || i[e - 2] || i[0];
                return n
            }
        }, Ft.test(o) || (E.cssHooks[o + r].set = oe)
    }), E.fn.extend({
        css: function(t, e) {
            return K(this, function(t, e, n) {
                var i, o, r = {},
                    s = 0;
                if (E.isArray(e)) {
                    for (i = Ut(t), o = e.length; s < o; s++) r[e[s]] = E.css(t, e[s], !1, i);
                    return r
                }
                return void 0 !== n ? E.style(t, e, n) : E.css(t, e)
            }, t, e, 1 < arguments.length)
        },
        show: function() {
            return ie(this, !0)
        },
        hide: function() {
            return ie(this)
        },
        toggle: function(t) {
            return "boolean" == typeof t ? t ? this.show() : this.hide() : this.each(function() {
                V(this) ? E(this).show() : E(this).hide()
            })
        }
    }), ((E.Tween = ae).prototype = {
        constructor: ae,
        init: function(t, e, n, i, o, r) {
            this.elem = t, this.prop = n, this.easing = o || E.easing._default, this.options = e, this.start = this.now = this.cur(), this.end = i, this.unit = r || (E.cssNumber[n] ? "" : "px")
        },
        cur: function() {
            var t = ae.propHooks[this.prop];
            return t && t.get ? t.get(this) : ae.propHooks._default.get(this)
        },
        run: function(t) {
            var e, n = ae.propHooks[this.prop];
            return this.options.duration ? this.pos = e = E.easing[this.easing](t, this.options.duration * t, 0, 1, this.options.duration) : this.pos = e = t, this.now = (this.end - this.start) * e + this.start, this.options.step && this.options.step.call(this.elem, this.now, this), n && n.set ? n.set(this) : ae.propHooks._default.set(this), this
        }
    }).init.prototype = ae.prototype, (ae.propHooks = {
        _default: {
            get: function(t) {
                var e;
                return 1 !== t.elem.nodeType || null != t.elem[t.prop] && null == t.elem.style[t.prop] ? t.elem[t.prop] : (e = E.css(t.elem, t.prop, "")) && "auto" !== e ? e : 0
            },
            set: function(t) {
                E.fx.step[t.prop] ? E.fx.step[t.prop](t) : 1 !== t.elem.nodeType || null == t.elem.style[E.cssProps[t.prop]] && !E.cssHooks[t.prop] ? t.elem[t.prop] = t.now : E.style(t.elem, t.prop, t.now + t.unit)
            }
        }
    }).scrollTop = ae.propHooks.scrollLeft = {
        set: function(t) {
            t.elem.nodeType && t.elem.parentNode && (t.elem[t.prop] = t.now)
        }
    }, E.easing = {
        linear: function(t) {
            return t
        },
        swing: function(t) {
            return .5 - Math.cos(t * Math.PI) / 2
        },
        _default: "swing"
    }, E.fx = ae.prototype.init, E.fx.step = {};
    var le, ue, ce, de, pe, fe, he, ge = /^(?:toggle|show|hide)$/,
        me = /queueHooks$/;

    function ve() {
        return C.setTimeout(function() {
            le = void 0
        }), le = E.now()
    }

    function ye(t, e) {
        var n, i = {
                height: t
            },
            o = 0;
        for (e = e ? 1 : 0; o < 4; o += 2 - e) i["margin" + (n = X[o])] = i["padding" + n] = t;
        return e && (i.opacity = i.width = t), i
    }

    function be(t, e, n) {
        for (var i, o = (xe.tweeners[e] || []).concat(xe.tweeners["*"]), r = 0, s = o.length; r < s; r++)
            if (i = o[r].call(n, e, t)) return i
    }

    function xe(r, t, e) {
        var n, s, i = 0,
            o = xe.prefilters.length,
            a = E.Deferred().always(function() {
                delete l.elem
            }),
            l = function() {
                if (s) return !1;
                for (var t = le || ve(), e = Math.max(0, u.startTime + u.duration - t), n = 1 - (e / u.duration || 0), i = 0, o = u.tweens.length; i < o; i++) u.tweens[i].run(n);
                return a.notifyWith(r, [u, n, e]), n < 1 && o ? e : (a.resolveWith(r, [u]), !1)
            },
            u = a.promise({
                elem: r,
                props: E.extend({}, t),
                opts: E.extend(!0, {
                    specialEasing: {},
                    easing: E.easing._default
                }, e),
                originalProperties: t,
                originalOptions: e,
                startTime: le || ve(),
                duration: e.duration,
                tweens: [],
                createTween: function(t, e) {
                    var n = E.Tween(r, u.opts, t, e, u.opts.specialEasing[t] || u.opts.easing);
                    return u.tweens.push(n), n
                },
                stop: function(t) {
                    var e = 0,
                        n = t ? u.tweens.length : 0;
                    if (s) return this;
                    for (s = !0; e < n; e++) u.tweens[e].run(1);
                    return t ? (a.notifyWith(r, [u, 1, 0]), a.resolveWith(r, [u, t])) : a.rejectWith(r, [u, t]), this
                }
            }),
            c = u.props;
        for (function(t, e) {
                var n, i, o, r, s;
                for (n in t)
                    if (o = e[i = E.camelCase(n)], r = t[n], E.isArray(r) && (o = r[1], r = t[n] = r[0]), n !== i && (t[i] = r, delete t[n]), (s = E.cssHooks[i]) && "expand" in s)
                        for (n in r = s.expand(r), delete t[i], r) n in t || (t[n] = r[n], e[n] = o);
                    else e[i] = o
            }(c, u.opts.specialEasing); i < o; i++)
            if (n = xe.prefilters[i].call(u, r, c, u.opts)) return E.isFunction(n.stop) && (E._queueHooks(u.elem, u.opts.queue).stop = E.proxy(n.stop, n)), n;
        return E.map(c, be, u), E.isFunction(u.opts.start) && u.opts.start.call(r, u), E.fx.timer(E.extend(l, {
            elem: r,
            anim: u,
            queue: u.opts.queue
        })), u.progress(u.opts.progress).done(u.opts.done, u.opts.complete).fail(u.opts.fail).always(u.opts.always)
    }
    E.Animation = E.extend(xe, {
        tweeners: {
            "*": [function(t, e) {
                var n = this.createTween(t, e);
                return Q(n.elem, t, z.exec(e), n), n
            }]
        },
        tweener: function(t, e) {
            E.isFunction(t) ? (e = t, t = ["*"]) : t = t.match(O);
            for (var n, i = 0, o = t.length; i < o; i++) n = t[i], xe.tweeners[n] = xe.tweeners[n] || [], xe.tweeners[n].unshift(e)
        },
        prefilters: [function(e, t, n) {
            var i, o, r, s, a, l, u, c = this,
                d = {},
                p = e.style,
                f = e.nodeType && V(e),
                h = E._data(e, "fxshow");
            for (i in n.queue || (null == (a = E._queueHooks(e, "fx")).unqueued && (a.unqueued = 0, l = a.empty.fire, a.empty.fire = function() {
                    a.unqueued || l()
                }), a.unqueued++, c.always(function() {
                    c.always(function() {
                        a.unqueued--, E.queue(e, "fx").length || a.empty.fire()
                    })
                })), 1 === e.nodeType && ("height" in t || "width" in t) && (n.overflow = [p.overflow, p.overflowX, p.overflowY], "inline" === ("none" === (u = E.css(e, "display")) ? E._data(e, "olddisplay") || Pt(e.nodeName) : u) && "none" === E.css(e, "float") && (v.inlineBlockNeedsLayout && "inline" !== Pt(e.nodeName) ? p.zoom = 1 : p.display = "inline-block")), n.overflow && (p.overflow = "hidden", v.shrinkWrapBlocks() || c.always(function() {
                    p.overflow = n.overflow[0], p.overflowX = n.overflow[1], p.overflowY = n.overflow[2]
                })), t)
                if (o = t[i], ge.exec(o)) {
                    if (delete t[i], r = r || "toggle" === o, o === (f ? "hide" : "show")) {
                        if ("show" !== o || !h || void 0 === h[i]) continue;
                        f = !0
                    }
                    d[i] = h && h[i] || E.style(e, i)
                } else u = void 0;
            if (E.isEmptyObject(d)) "inline" === ("none" === u ? Pt(e.nodeName) : u) && (p.display = u);
            else
                for (i in h ? "hidden" in h && (f = h.hidden) : h = E._data(e, "fxshow", {}), r && (h.hidden = !f), f ? E(e).show() : c.done(function() {
                        E(e).hide()
                    }), c.done(function() {
                        var t;
                        for (t in E._removeData(e, "fxshow"), d) E.style(e, t, d[t])
                    }), d) s = be(f ? h[i] : 0, i, c), i in h || (h[i] = s.start, f && (s.end = s.start, s.start = "width" === i || "height" === i ? 1 : 0))
        }],
        prefilter: function(t, e) {
            e ? xe.prefilters.unshift(t) : xe.prefilters.push(t)
        }
    }), E.speed = function(t, e, n) {
        var i = t && "object" == typeof t ? E.extend({}, t) : {
            complete: n || !n && e || E.isFunction(t) && t,
            duration: t,
            easing: n && e || e && !E.isFunction(e) && e
        };
        return i.duration = E.fx.off ? 0 : "number" == typeof i.duration ? i.duration : i.duration in E.fx.speeds ? E.fx.speeds[i.duration] : E.fx.speeds._default, null != i.queue && !0 !== i.queue || (i.queue = "fx"), i.old = i.complete, i.complete = function() {
            E.isFunction(i.old) && i.old.call(this), i.queue && E.dequeue(this, i.queue)
        }, i
    }, E.fn.extend({
        fadeTo: function(t, e, n, i) {
            return this.filter(V).css("opacity", 0).show().end().animate({
                opacity: e
            }, t, n, i)
        },
        animate: function(e, t, n, i) {
            var o = E.isEmptyObject(e),
                r = E.speed(t, n, i),
                s = function() {
                    var t = xe(this, E.extend({}, e), r);
                    (o || E._data(this, "finish")) && t.stop(!0)
                };
            return s.finish = s, o || !1 === r.queue ? this.each(s) : this.queue(r.queue, s)
        },
        stop: function(o, t, r) {
            var s = function(t) {
                var e = t.stop;
                delete t.stop, e(r)
            };
            return "string" != typeof o && (r = t, t = o, o = void 0), t && !1 !== o && this.queue(o || "fx", []), this.each(function() {
                var t = !0,
                    e = null != o && o + "queueHooks",
                    n = E.timers,
                    i = E._data(this);
                if (e) i[e] && i[e].stop && s(i[e]);
                else
                    for (e in i) i[e] && i[e].stop && me.test(e) && s(i[e]);
                for (e = n.length; e--;) n[e].elem !== this || null != o && n[e].queue !== o || (n[e].anim.stop(r), t = !1, n.splice(e, 1));
                !t && r || E.dequeue(this, o)
            })
        },
        finish: function(s) {
            return !1 !== s && (s = s || "fx"), this.each(function() {
                var t, e = E._data(this),
                    n = e[s + "queue"],
                    i = e[s + "queueHooks"],
                    o = E.timers,
                    r = n ? n.length : 0;
                for (e.finish = !0, E.queue(this, s, []), i && i.stop && i.stop.call(this, !0), t = o.length; t--;) o[t].elem === this && o[t].queue === s && (o[t].anim.stop(!0), o.splice(t, 1));
                for (t = 0; t < r; t++) n[t] && n[t].finish && n[t].finish.call(this);
                delete e.finish
            })
        }
    }), E.each(["toggle", "show", "hide"], function(t, i) {
        var o = E.fn[i];
        E.fn[i] = function(t, e, n) {
            return null == t || "boolean" == typeof t ? o.apply(this, arguments) : this.animate(ye(i, !0), t, e, n)
        }
    }), E.each({
        slideDown: ye("show"),
        slideUp: ye("hide"),
        slideToggle: ye("toggle"),
        fadeIn: {
            opacity: "show"
        },
        fadeOut: {
            opacity: "hide"
        },
        fadeToggle: {
            opacity: "toggle"
        }
    }, function(t, i) {
        E.fn[t] = function(t, e, n) {
            return this.animate(i, t, e, n)
        }
    }), E.timers = [], E.fx.tick = function() {
        var t, e = E.timers,
            n = 0;
        for (le = E.now(); n < e.length; n++)(t = e[n])() || e[n] !== t || e.splice(n--, 1);
        e.length || E.fx.stop(), le = void 0
    }, E.fx.timer = function(t) {
        E.timers.push(t), t() ? E.fx.start() : E.timers.pop()
    }, E.fx.interval = 13, E.fx.start = function() {
        ue || (ue = C.setInterval(E.fx.tick, E.fx.interval))
    }, E.fx.stop = function() {
        C.clearInterval(ue), ue = null
    }, E.fx.speeds = {
        slow: 600,
        fast: 200,
        _default: 400
    }, E.fn.delay = function(i, t) {
        return i = E.fx && E.fx.speeds[i] || i, t = t || "fx", this.queue(t, function(t, e) {
            var n = C.setTimeout(t, i);
            e.stop = function() {
                C.clearTimeout(n)
            }
        })
    }, de = h.createElement("input"), pe = h.createElement("div"), fe = h.createElement("select"), he = fe.appendChild(h.createElement("option")), (pe = h.createElement("div")).setAttribute("className", "t"), pe.innerHTML = "  <link/><table></table><a href='/a'>a</a><input type='checkbox'/>", ce = pe.getElementsByTagName("a")[0], de.setAttribute("type", "checkbox"), pe.appendChild(de), (ce = pe.getElementsByTagName("a")[0]).style.cssText = "top:1px", v.getSetAttribute = "t" !== pe.className, v.style = /top/.test(ce.getAttribute("style")), v.hrefNormalized = "/a" === ce.getAttribute("href"), v.checkOn = !!de.value, v.optSelected = he.selected, v.enctype = !!h.createElement("form").enctype, fe.disabled = !0, v.optDisabled = !he.disabled, (de = h.createElement("input")).setAttribute("value", ""), v.input = "" === de.getAttribute("value"), de.value = "t", de.setAttribute("type", "radio"), v.radioValue = "t" === de.value;
    var we = /\r/g,
        Te = /[\x20\t\r\n\f]+/g;
    E.fn.extend({
        val: function(n) {
            var i, t, o, e = this[0];
            return arguments.length ? (o = E.isFunction(n), this.each(function(t) {
                var e;
                1 === this.nodeType && (null == (e = o ? n.call(this, t, E(this).val()) : n) ? e = "" : "number" == typeof e ? e += "" : E.isArray(e) && (e = E.map(e, function(t) {
                    return null == t ? "" : t + ""
                })), (i = E.valHooks[this.type] || E.valHooks[this.nodeName.toLowerCase()]) && "set" in i && void 0 !== i.set(this, e, "value") || (this.value = e))
            })) : e ? (i = E.valHooks[e.type] || E.valHooks[e.nodeName.toLowerCase()]) && "get" in i && void 0 !== (t = i.get(e, "value")) ? t : "string" == typeof(t = e.value) ? t.replace(we, "") : null == t ? "" : t : void 0
        }
    }), E.extend({
        valHooks: {
            option: {
                get: function(t) {
                    var e = E.find.attr(t, "value");
                    return null != e ? e : E.trim(E.text(t)).replace(Te, " ")
                }
            },
            select: {
                get: function(t) {
                    for (var e, n, i = t.options, o = t.selectedIndex, r = "select-one" === t.type || o < 0, s = r ? null : [], a = r ? o + 1 : i.length, l = o < 0 ? a : r ? o : 0; l < a; l++)
                        if (((n = i[l]).selected || l === o) && (v.optDisabled ? !n.disabled : null === n.getAttribute("disabled")) && (!n.parentNode.disabled || !E.nodeName(n.parentNode, "optgroup"))) {
                            if (e = E(n).val(), r) return e;
                            s.push(e)
                        }
                    return s
                },
                set: function(t, e) {
                    for (var n, i, o = t.options, r = E.makeArray(e), s = o.length; s--;)
                        if (i = o[s], -1 < E.inArray(E.valHooks.option.get(i), r)) try {
                            i.selected = n = !0
                        } catch (t) {
                            i.scrollHeight
                        } else i.selected = !1;
                    return n || (t.selectedIndex = -1), o
                }
            }
        }
    }), E.each(["radio", "checkbox"], function() {
        E.valHooks[this] = {
            set: function(t, e) {
                return E.isArray(e) ? t.checked = -1 < E.inArray(E(t).val(), e) : void 0
            }
        }, v.checkOn || (E.valHooks[this].get = function(t) {
            return null === t.getAttribute("value") ? "on" : t.value
        })
    });
    var Ce, Ee, Se = E.expr.attrHandle,
        ke = /^(?:checked|selected)$/i,
        Ne = v.getSetAttribute,
        $e = v.input;
    E.fn.extend({
        attr: function(t, e) {
            return K(this, E.attr, t, e, 1 < arguments.length)
        },
        removeAttr: function(t) {
            return this.each(function() {
                E.removeAttr(this, t)
            })
        }
    }), E.extend({
        attr: function(t, e, n) {
            var i, o, r = t.nodeType;
            if (3 !== r && 8 !== r && 2 !== r) return void 0 === t.getAttribute ? E.prop(t, e, n) : (1 === r && E.isXMLDoc(t) || (e = e.toLowerCase(), o = E.attrHooks[e] || (E.expr.match.bool.test(e) ? Ee : Ce)), void 0 !== n ? null === n ? void E.removeAttr(t, e) : o && "set" in o && void 0 !== (i = o.set(t, n, e)) ? i : (t.setAttribute(e, n + ""), n) : o && "get" in o && null !== (i = o.get(t, e)) ? i : null == (i = E.find.attr(t, e)) ? void 0 : i)
        },
        attrHooks: {
            type: {
                set: function(t, e) {
                    if (!v.radioValue && "radio" === e && E.nodeName(t, "input")) {
                        var n = t.value;
                        return t.setAttribute("type", e), n && (t.value = n), e
                    }
                }
            }
        },
        removeAttr: function(t, e) {
            var n, i, o = 0,
                r = e && e.match(O);
            if (r && 1 === t.nodeType)
                for (; n = r[o++];) i = E.propFix[n] || n, E.expr.match.bool.test(n) ? $e && Ne || !ke.test(n) ? t[i] = !1 : t[E.camelCase("default-" + n)] = t[i] = !1 : E.attr(t, n, ""), t.removeAttribute(Ne ? n : i)
        }
    }), Ee = {
        set: function(t, e, n) {
            return !1 === e ? E.removeAttr(t, n) : $e && Ne || !ke.test(n) ? t.setAttribute(!Ne && E.propFix[n] || n, n) : t[E.camelCase("default-" + n)] = t[n] = !0, n
        }
    }, E.each(E.expr.match.bool.source.match(/\w+/g), function(t, e) {
        var r = Se[e] || E.find.attr;
        $e && Ne || !ke.test(e) ? Se[e] = function(t, e, n) {
            var i, o;
            return n || (o = Se[e], Se[e] = i, i = null != r(t, e, n) ? e.toLowerCase() : null, Se[e] = o), i
        } : Se[e] = function(t, e, n) {
            return n ? void 0 : t[E.camelCase("default-" + e)] ? e.toLowerCase() : null
        }
    }), $e && Ne || (E.attrHooks.value = {
        set: function(t, e, n) {
            return E.nodeName(t, "input") ? void(t.defaultValue = e) : Ce && Ce.set(t, e, n)
        }
    }), Ne || (Ce = {
        set: function(t, e, n) {
            var i = t.getAttributeNode(n);
            return i || t.setAttributeNode(i = t.ownerDocument.createAttribute(n)), i.value = e += "", "value" === n || e === t.getAttribute(n) ? e : void 0
        }
    }, Se.id = Se.name = Se.coords = function(t, e, n) {
        var i;
        return n ? void 0 : (i = t.getAttributeNode(e)) && "" !== i.value ? i.value : null
    }, E.valHooks.button = {
        get: function(t, e) {
            var n = t.getAttributeNode(e);
            return n && n.specified ? n.value : void 0
        },
        set: Ce.set
    }, E.attrHooks.contenteditable = {
        set: function(t, e, n) {
            Ce.set(t, "" !== e && e, n)
        }
    }, E.each(["width", "height"], function(t, n) {
        E.attrHooks[n] = {
            set: function(t, e) {
                return "" === e ? (t.setAttribute(n, "auto"), e) : void 0
            }
        }
    })), v.style || (E.attrHooks.style = {
        get: function(t) {
            return t.style.cssText || void 0
        },
        set: function(t, e) {
            return t.style.cssText = e + ""
        }
    });
    var Ae = /^(?:input|select|textarea|button|object)$/i,
        De = /^(?:a|area)$/i;
    E.fn.extend({
        prop: function(t, e) {
            return K(this, E.prop, t, e, 1 < arguments.length)
        },
        removeProp: function(t) {
            return t = E.propFix[t] || t, this.each(function() {
                try {
                    this[t] = void 0, delete this[t]
                } catch (t) {}
            })
        }
    }), E.extend({
        prop: function(t, e, n) {
            var i, o, r = t.nodeType;
            if (3 !== r && 8 !== r && 2 !== r) return 1 === r && E.isXMLDoc(t) || (e = E.propFix[e] || e, o = E.propHooks[e]), void 0 !== n ? o && "set" in o && void 0 !== (i = o.set(t, n, e)) ? i : t[e] = n : o && "get" in o && null !== (i = o.get(t, e)) ? i : t[e]
        },
        propHooks: {
            tabIndex: {
                get: function(t) {
                    var e = E.find.attr(t, "tabindex");
                    return e ? parseInt(e, 10) : Ae.test(t.nodeName) || De.test(t.nodeName) && t.href ? 0 : -1
                }
            }
        },
        propFix: {
            for: "htmlFor",
            class: "className"
        }
    }), v.hrefNormalized || E.each(["href", "src"], function(t, e) {
        E.propHooks[e] = {
            get: function(t) {
                return t.getAttribute(e, 4)
            }
        }
    }), v.optSelected || (E.propHooks.selected = {
        get: function(t) {
            var e = t.parentNode;
            return e && (e.selectedIndex, e.parentNode && e.parentNode.selectedIndex), null
        },
        set: function(t) {
            var e = t.parentNode;
            e && (e.selectedIndex, e.parentNode && e.parentNode.selectedIndex)
        }
    }), E.each(["tabIndex", "readOnly", "maxLength", "cellSpacing", "cellPadding", "rowSpan", "colSpan", "useMap", "frameBorder", "contentEditable"], function() {
        E.propFix[this.toLowerCase()] = this
    }), v.enctype || (E.propFix.enctype = "encoding");
    var je = /[\t\r\n\f]/g;

    function Le(t) {
        return E.attr(t, "class") || ""
    }
    E.fn.extend({
        addClass: function(e) {
            var t, n, i, o, r, s, a, l = 0;
            if (E.isFunction(e)) return this.each(function(t) {
                E(this).addClass(e.call(this, t, Le(this)))
            });
            if ("string" == typeof e && e)
                for (t = e.match(O) || []; n = this[l++];)
                    if (o = Le(n), i = 1 === n.nodeType && (" " + o + " ").replace(je, " ")) {
                        for (s = 0; r = t[s++];) i.indexOf(" " + r + " ") < 0 && (i += r + " ");
                        o !== (a = E.trim(i)) && E.attr(n, "class", a)
                    }
            return this
        },
        removeClass: function(e) {
            var t, n, i, o, r, s, a, l = 0;
            if (E.isFunction(e)) return this.each(function(t) {
                E(this).removeClass(e.call(this, t, Le(this)))
            });
            if (!arguments.length) return this.attr("class", "");
            if ("string" == typeof e && e)
                for (t = e.match(O) || []; n = this[l++];)
                    if (o = Le(n), i = 1 === n.nodeType && (" " + o + " ").replace(je, " ")) {
                        for (s = 0; r = t[s++];)
                            for (; - 1 < i.indexOf(" " + r + " ");) i = i.replace(" " + r + " ", " ");
                        o !== (a = E.trim(i)) && E.attr(n, "class", a)
                    }
            return this
        },
        toggleClass: function(o, e) {
            var r = typeof o;
            return "boolean" == typeof e && "string" === r ? e ? this.addClass(o) : this.removeClass(o) : E.isFunction(o) ? this.each(function(t) {
                E(this).toggleClass(o.call(this, t, Le(this), e), e)
            }) : this.each(function() {
                var t, e, n, i;
                if ("string" === r)
                    for (e = 0, n = E(this), i = o.match(O) || []; t = i[e++];) n.hasClass(t) ? n.removeClass(t) : n.addClass(t);
                else void 0 !== o && "boolean" !== r || ((t = Le(this)) && E._data(this, "__className__", t), E.attr(this, "class", t || !1 === o ? "" : E._data(this, "__className__") || ""))
            })
        },
        hasClass: function(t) {
            var e, n, i = 0;
            for (e = " " + t + " "; n = this[i++];)
                if (1 === n.nodeType && -1 < (" " + Le(n) + " ").replace(je, " ").indexOf(e)) return !0;
            return !1
        }
    }), E.each("blur focus focusin focusout load resize scroll unload click dblclick mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave change select submit keydown keypress keyup error contextmenu".split(" "), function(t, n) {
        E.fn[n] = function(t, e) {
            return 0 < arguments.length ? this.on(n, null, t, e) : this.trigger(n)
        }
    }), E.fn.extend({
        hover: function(t, e) {
            return this.mouseenter(t).mouseleave(e || t)
        }
    });
    var Oe = C.location,
        Ie = E.now(),
        He = /\?/,
        Re = /(,)|(\[|{)|(}|])|"(?:[^"\\\r\n]|\\["\\\/bfnrt]|\\u[\da-fA-F]{4})*"\s*:?|true|false|null|-?(?!0\d)\d+(?:\.\d+|)(?:[eE][+-]?\d+|)/g;
    E.parseJSON = function(t) {
        if (C.JSON && C.JSON.parse) return C.JSON.parse(t + "");
        var o, r = null,
            e = E.trim(t + "");
        return e && !E.trim(e.replace(Re, function(t, e, n, i) {
            return o && e && (r = 0), 0 === r ? t : (o = n || e, r += !i - !n, "")
        })) ? Function("return " + e)() : E.error("Invalid JSON: " + t)
    }, E.parseXML = function(t) {
        var e;
        if (!t || "string" != typeof t) return null;
        try {
            C.DOMParser ? e = (new C.DOMParser).parseFromString(t, "text/xml") : ((e = new C.ActiveXObject("Microsoft.XMLDOM")).async = "false", e.loadXML(t))
        } catch (t) {
            e = void 0
        }
        return e && e.documentElement && !e.getElementsByTagName("parsererror").length || E.error("Invalid XML: " + t), e
    };
    var qe = /#.*$/,
        _e = /([?&])_=[^&]*/,
        Pe = /^(.*?):[ \t]*([^\r\n]*)\r?$/gm,
        Fe = /^(?:GET|HEAD)$/,
        Me = /^\/\//,
        Be = /^([\w.+-]+:)(?:\/\/(?:[^\/?#]*@|)([^\/?#:]*)(?::(\d+)|)|)/,
        We = {},
        Ue = {},
        ze = "*/".concat("*"),
        Xe = Oe.href,
        Ve = Be.exec(Xe.toLowerCase()) || [];

    function Qe(r) {
        return function(t, e) {
            "string" != typeof t && (e = t, t = "*");
            var n, i = 0,
                o = t.toLowerCase().match(O) || [];
            if (E.isFunction(e))
                for (; n = o[i++];) "+" === n.charAt(0) ? (n = n.slice(1) || "*", (r[n] = r[n] || []).unshift(e)) : (r[n] = r[n] || []).push(e)
        }
    }

    function Je(e, o, r, s) {
        var a = {},
            l = e === Ue;

        function u(t) {
            var i;
            return a[t] = !0, E.each(e[t] || [], function(t, e) {
                var n = e(o, r, s);
                return "string" != typeof n || l || a[n] ? l ? !(i = n) : void 0 : (o.dataTypes.unshift(n), u(n), !1)
            }), i
        }
        return u(o.dataTypes[0]) || !a["*"] && u("*")
    }

    function Ye(t, e) {
        var n, i, o = E.ajaxSettings.flatOptions || {};
        for (i in e) void 0 !== e[i] && ((o[i] ? t : n || (n = {}))[i] = e[i]);
        return n && E.extend(!0, t, n), t
    }
    E.extend({
        active: 0,
        lastModified: {},
        etag: {},
        ajaxSettings: {
            url: Xe,
            type: "GET",
            isLocal: /^(?:about|app|app-storage|.+-extension|file|res|widget):$/.test(Ve[1]),
            global: !0,
            processData: !0,
            async: !0,
            contentType: "application/x-www-form-urlencoded; charset=UTF-8",
            accepts: {
                "*": ze,
                text: "text/plain",
                html: "text/html",
                xml: "application/xml, text/xml",
                json: "application/json, text/javascript"
            },
            contents: {
                xml: /\bxml\b/,
                html: /\bhtml/,
                json: /\bjson\b/
            },
            responseFields: {
                xml: "responseXML",
                text: "responseText",
                json: "responseJSON"
            },
            converters: {
                "* text": String,
                "text html": !0,
                "text json": E.parseJSON,
                "text xml": E.parseXML
            },
            flatOptions: {
                url: !0,
                context: !0
            }
        },
        ajaxSetup: function(t, e) {
            return e ? Ye(Ye(t, E.ajaxSettings), e) : Ye(E.ajaxSettings, t)
        },
        ajaxPrefilter: Qe(We),
        ajaxTransport: Qe(Ue),
        ajax: function(t, e) {
            "object" == typeof t && (e = t, t = void 0), e = e || {};
            var n, i, c, d, p, f, h, o, g = E.ajaxSetup({}, e),
                m = g.context || g,
                v = g.context && (m.nodeType || m.jquery) ? E(m) : E.event,
                y = E.Deferred(),
                b = E.Callbacks("once memory"),
                x = g.statusCode || {},
                r = {},
                s = {},
                w = 0,
                a = "canceled",
                T = {
                    readyState: 0,
                    getResponseHeader: function(t) {
                        var e;
                        if (2 === w) {
                            if (!o)
                                for (o = {}; e = Pe.exec(d);) o[e[1].toLowerCase()] = e[2];
                            e = o[t.toLowerCase()]
                        }
                        return null == e ? null : e
                    },
                    getAllResponseHeaders: function() {
                        return 2 === w ? d : null
                    },
                    setRequestHeader: function(t, e) {
                        var n = t.toLowerCase();
                        return w || (t = s[n] = s[n] || t, r[t] = e), this
                    },
                    overrideMimeType: function(t) {
                        return w || (g.mimeType = t), this
                    },
                    statusCode: function(t) {
                        var e;
                        if (t)
                            if (w < 2)
                                for (e in t) x[e] = [x[e], t[e]];
                            else T.always(t[T.status]);
                        return this
                    },
                    abort: function(t) {
                        var e = t || a;
                        return h && h.abort(e), l(0, e), this
                    }
                };
            if (y.promise(T).complete = b.add, T.success = T.done, T.error = T.fail, g.url = ((t || g.url || Xe) + "").replace(qe, "").replace(Me, Ve[1] + "//"), g.type = e.method || e.type || g.method || g.type, g.dataTypes = E.trim(g.dataType || "*").toLowerCase().match(O) || [""], null == g.crossDomain && (n = Be.exec(g.url.toLowerCase()), g.crossDomain = !(!n || n[1] === Ve[1] && n[2] === Ve[2] && (n[3] || ("http:" === n[1] ? "80" : "443")) === (Ve[3] || ("http:" === Ve[1] ? "80" : "443")))), g.data && g.processData && "string" != typeof g.data && (g.data = E.param(g.data, g.traditional)), Je(We, g, e, T), 2 === w) return T;
            for (i in (f = E.event && g.global) && 0 == E.active++ && E.event.trigger("ajaxStart"), g.type = g.type.toUpperCase(), g.hasContent = !Fe.test(g.type), c = g.url, g.hasContent || (g.data && (c = g.url += (He.test(c) ? "&" : "?") + g.data, delete g.data), !1 === g.cache && (g.url = _e.test(c) ? c.replace(_e, "$1_=" + Ie++) : c + (He.test(c) ? "&" : "?") + "_=" + Ie++)), g.ifModified && (E.lastModified[c] && T.setRequestHeader("If-Modified-Since", E.lastModified[c]), E.etag[c] && T.setRequestHeader("If-None-Match", E.etag[c])), (g.data && g.hasContent && !1 !== g.contentType || e.contentType) && T.setRequestHeader("Content-Type", g.contentType), T.setRequestHeader("Accept", g.dataTypes[0] && g.accepts[g.dataTypes[0]] ? g.accepts[g.dataTypes[0]] + ("*" !== g.dataTypes[0] ? ", " + ze + "; q=0.01" : "") : g.accepts["*"]), g.headers) T.setRequestHeader(i, g.headers[i]);
            if (g.beforeSend && (!1 === g.beforeSend.call(m, T, g) || 2 === w)) return T.abort();
            for (i in a = "abort", {
                    success: 1,
                    error: 1,
                    complete: 1
                }) T[i](g[i]);
            if (h = Je(Ue, g, e, T)) {
                if (T.readyState = 1, f && v.trigger("ajaxSend", [T, g]), 2 === w) return T;
                g.async && 0 < g.timeout && (p = C.setTimeout(function() {
                    T.abort("timeout")
                }, g.timeout));
                try {
                    w = 1, h.send(r, l)
                } catch (t) {
                    if (!(w < 2)) throw t;
                    l(-1, t)
                }
            } else l(-1, "No Transport");

            function l(t, e, n, i) {
                var o, r, s, a, l, u = e;
                2 !== w && (w = 2, p && C.clearTimeout(p), h = void 0, d = i || "", T.readyState = 0 < t ? 4 : 0, o = 200 <= t && t < 300 || 304 === t, n && (a = function(t, e, n) {
                    for (var i, o, r, s, a = t.contents, l = t.dataTypes;
                        "*" === l[0];) l.shift(), void 0 === o && (o = t.mimeType || e.getResponseHeader("Content-Type"));
                    if (o)
                        for (s in a)
                            if (a[s] && a[s].test(o)) {
                                l.unshift(s);
                                break
                            }
                    if (l[0] in n) r = l[0];
                    else {
                        for (s in n) {
                            if (!l[0] || t.converters[s + " " + l[0]]) {
                                r = s;
                                break
                            }
                            i || (i = s)
                        }
                        r = r || i
                    }
                    return r ? (r !== l[0] && l.unshift(r), n[r]) : void 0
                }(g, T, n)), a = function(t, e, n, i) {
                    var o, r, s, a, l, u = {},
                        c = t.dataTypes.slice();
                    if (c[1])
                        for (s in t.converters) u[s.toLowerCase()] = t.converters[s];
                    for (r = c.shift(); r;)
                        if (t.responseFields[r] && (n[t.responseFields[r]] = e), !l && i && t.dataFilter && (e = t.dataFilter(e, t.dataType)), l = r, r = c.shift())
                            if ("*" === r) r = l;
                            else if ("*" !== l && l !== r) {
                        if (!(s = u[l + " " + r] || u["* " + r]))
                            for (o in u)
                                if ((a = o.split(" "))[1] === r && (s = u[l + " " + a[0]] || u["* " + a[0]])) {
                                    !0 === s ? s = u[o] : !0 !== u[o] && (r = a[0], c.unshift(a[1]));
                                    break
                                }
                        if (!0 !== s)
                            if (s && t.throws) e = s(e);
                            else try {
                                e = s(e)
                            } catch (t) {
                                return {
                                    state: "parsererror",
                                    error: s ? t : "No conversion from " + l + " to " + r
                                }
                            }
                    }
                    return {
                        state: "success",
                        data: e
                    }
                }(g, a, T, o), o ? (g.ifModified && ((l = T.getResponseHeader("Last-Modified")) && (E.lastModified[c] = l), (l = T.getResponseHeader("etag")) && (E.etag[c] = l)), 204 === t || "HEAD" === g.type ? u = "nocontent" : 304 === t ? u = "notmodified" : (u = a.state, r = a.data, o = !(s = a.error))) : (s = u, !t && u || (u = "error", t < 0 && (t = 0))), T.status = t, T.statusText = (e || u) + "", o ? y.resolveWith(m, [r, u, T]) : y.rejectWith(m, [T, u, s]), T.statusCode(x), x = void 0, f && v.trigger(o ? "ajaxSuccess" : "ajaxError", [T, g, o ? r : s]), b.fireWith(m, [T, u]), f && (v.trigger("ajaxComplete", [T, g]), --E.active || E.event.trigger("ajaxStop")))
            }
            return T
        },
        getJSON: function(t, e, n) {
            return E.get(t, e, n, "json")
        },
        getScript: function(t, e) {
            return E.get(t, void 0, e, "script")
        }
    }), E.each(["get", "post"], function(t, o) {
        E[o] = function(t, e, n, i) {
            return E.isFunction(e) && (i = i || n, n = e, e = void 0), E.ajax(E.extend({
                url: t,
                type: o,
                dataType: i,
                data: e,
                success: n
            }, E.isPlainObject(t) && t))
        }
    }), E._evalUrl = function(t) {
        return E.ajax({
            url: t,
            type: "GET",
            dataType: "script",
            cache: !0,
            async: !1,
            global: !1,
            throws: !0
        })
    }, E.fn.extend({
        wrapAll: function(e) {
            if (E.isFunction(e)) return this.each(function(t) {
                E(this).wrapAll(e.call(this, t))
            });
            if (this[0]) {
                var t = E(e, this[0].ownerDocument).eq(0).clone(!0);
                this[0].parentNode && t.insertBefore(this[0]), t.map(function() {
                    for (var t = this; t.firstChild && 1 === t.firstChild.nodeType;) t = t.firstChild;
                    return t
                }).append(this)
            }
            return this
        },
        wrapInner: function(n) {
            return E.isFunction(n) ? this.each(function(t) {
                E(this).wrapInner(n.call(this, t))
            }) : this.each(function() {
                var t = E(this),
                    e = t.contents();
                e.length ? e.wrapAll(n) : t.append(n)
            })
        },
        wrap: function(e) {
            var n = E.isFunction(e);
            return this.each(function(t) {
                E(this).wrapAll(n ? e.call(this, t) : e)
            })
        },
        unwrap: function() {
            return this.parent().each(function() {
                E.nodeName(this, "body") || E(this).replaceWith(this.childNodes)
            }).end()
        }
    }), E.expr.filters.hidden = function(t) {
        return v.reliableHiddenOffsets() ? t.offsetWidth <= 0 && t.offsetHeight <= 0 && !t.getClientRects().length : function(t) {
            if (!E.contains(t.ownerDocument || h, t)) return !0;
            for (; t && 1 === t.nodeType;) {
                if ("none" === ((e = t).style && e.style.display || E.css(e, "display")) || "hidden" === t.type) return !0;
                t = t.parentNode
            }
            var e;
            return !1
        }(t)
    }, E.expr.filters.visible = function(t) {
        return !E.expr.filters.hidden(t)
    };
    var Ge = /%20/g,
        Ke = /\[\]$/,
        Ze = /\r?\n/g,
        tn = /^(?:submit|button|image|reset|file)$/i,
        en = /^(?:input|select|textarea|keygen)/i;

    function nn(n, t, i, o) {
        var e;
        if (E.isArray(t)) E.each(t, function(t, e) {
            i || Ke.test(n) ? o(n, e) : nn(n + "[" + ("object" == typeof e && null != e ? t : "") + "]", e, i, o)
        });
        else if (i || "object" !== E.type(t)) o(n, t);
        else
            for (e in t) nn(n + "[" + e + "]", t[e], i, o)
    }
    E.param = function(t, e) {
        var n, i = [],
            o = function(t, e) {
                e = E.isFunction(e) ? e() : null == e ? "" : e, i[i.length] = encodeURIComponent(t) + "=" + encodeURIComponent(e)
            };
        if (void 0 === e && (e = E.ajaxSettings && E.ajaxSettings.traditional), E.isArray(t) || t.jquery && !E.isPlainObject(t)) E.each(t, function() {
            o(this.name, this.value)
        });
        else
            for (n in t) nn(n, t[n], e, o);
        return i.join("&").replace(Ge, "+")
    }, E.fn.extend({
        serialize: function() {
            return E.param(this.serializeArray())
        },
        serializeArray: function() {
            return this.map(function() {
                var t = E.prop(this, "elements");
                return t ? E.makeArray(t) : this
            }).filter(function() {
                var t = this.type;
                return this.name && !E(this).is(":disabled") && en.test(this.nodeName) && !tn.test(t) && (this.checked || !Z.test(t))
            }).map(function(t, e) {
                var n = E(this).val();
                return null == n ? null : E.isArray(n) ? E.map(n, function(t) {
                    return {
                        name: e.name,
                        value: t.replace(Ze, "\r\n")
                    }
                }) : {
                    name: e.name,
                    value: n.replace(Ze, "\r\n")
                }
            }).get()
        }
    }), E.ajaxSettings.xhr = void 0 !== C.ActiveXObject ? function() {
        return this.isLocal ? ln() : 8 < h.documentMode ? an() : /^(get|post|head|put|delete|options)$/i.test(this.type) && an() || ln()
    } : an;
    var on = 0,
        rn = {},
        sn = E.ajaxSettings.xhr();

    function an() {
        try {
            return new C.XMLHttpRequest
        } catch (t) {}
    }

    function ln() {
        try {
            return new C.ActiveXObject("Microsoft.XMLHTTP")
        } catch (t) {}
    }
    C.attachEvent && C.attachEvent("onunload", function() {
        for (var t in rn) rn[t](void 0, !0)
    }), v.cors = !!sn && "withCredentials" in sn, (sn = v.ajax = !!sn) && E.ajaxTransport(function(l) {
        var u;
        if (!l.crossDomain || v.cors) return {
            send: function(t, r) {
                var e, s = l.xhr(),
                    a = ++on;
                if (s.open(l.type, l.url, l.async, l.username, l.password), l.xhrFields)
                    for (e in l.xhrFields) s[e] = l.xhrFields[e];
                for (e in l.mimeType && s.overrideMimeType && s.overrideMimeType(l.mimeType), l.crossDomain || t["X-Requested-With"] || (t["X-Requested-With"] = "XMLHttpRequest"), t) void 0 !== t[e] && s.setRequestHeader(e, t[e] + "");
                s.send(l.hasContent && l.data || null), u = function(t, e) {
                    var n, i, o;
                    if (u && (e || 4 === s.readyState))
                        if (delete rn[a], u = void 0, s.onreadystatechange = E.noop, e) 4 !== s.readyState && s.abort();
                        else {
                            o = {}, n = s.status, "string" == typeof s.responseText && (o.text = s.responseText);
                            try {
                                i = s.statusText
                            } catch (t) {
                                i = ""
                            }
                            n || !l.isLocal || l.crossDomain ? 1223 === n && (n = 204) : n = o.text ? 200 : 404
                        }
                    o && r(n, i, o, s.getAllResponseHeaders())
                }, l.async ? 4 === s.readyState ? C.setTimeout(u) : s.onreadystatechange = rn[a] = u : u()
            },
            abort: function() {
                u && u(void 0, !0)
            }
        }
    }), E.ajaxSetup({
        accepts: {
            script: "text/javascript, application/javascript, application/ecmascript, application/x-ecmascript"
        },
        contents: {
            script: /\b(?:java|ecma)script\b/
        },
        converters: {
            "text script": function(t) {
                return E.globalEval(t), t
            }
        }
    }), E.ajaxPrefilter("script", function(t) {
        void 0 === t.cache && (t.cache = !1), t.crossDomain && (t.type = "GET", t.global = !1)
    }), E.ajaxTransport("script", function(e) {
        if (e.crossDomain) {
            var i, o = h.head || E("head")[0] || h.documentElement;
            return {
                send: function(t, n) {
                    (i = h.createElement("script")).async = !0, e.scriptCharset && (i.charset = e.scriptCharset), i.src = e.url, i.onload = i.onreadystatechange = function(t, e) {
                        (e || !i.readyState || /loaded|complete/.test(i.readyState)) && (i.onload = i.onreadystatechange = null, i.parentNode && i.parentNode.removeChild(i), i = null, e || n(200, "success"))
                    }, o.insertBefore(i, o.firstChild)
                },
                abort: function() {
                    i && i.onload(void 0, !0)
                }
            }
        }
    });
    var un = [],
        cn = /(=)\?(?=&|$)|\?\?/;
    E.ajaxSetup({
        jsonp: "callback",
        jsonpCallback: function() {
            var t = un.pop() || E.expando + "_" + Ie++;
            return this[t] = !0, t
        }
    }), E.ajaxPrefilter("json jsonp", function(t, e, n) {
        var i, o, r, s = !1 !== t.jsonp && (cn.test(t.url) ? "url" : "string" == typeof t.data && 0 === (t.contentType || "").indexOf("application/x-www-form-urlencoded") && cn.test(t.data) && "data");
        return s || "jsonp" === t.dataTypes[0] ? (i = t.jsonpCallback = E.isFunction(t.jsonpCallback) ? t.jsonpCallback() : t.jsonpCallback, s ? t[s] = t[s].replace(cn, "$1" + i) : !1 !== t.jsonp && (t.url += (He.test(t.url) ? "&" : "?") + t.jsonp + "=" + i), t.converters["script json"] = function() {
            return r || E.error(i + " was not called"), r[0]
        }, t.dataTypes[0] = "json", o = C[i], C[i] = function() {
            r = arguments
        }, n.always(function() {
            void 0 === o ? E(C).removeProp(i) : C[i] = o, t[i] && (t.jsonpCallback = e.jsonpCallback, un.push(i)), r && E.isFunction(o) && o(r[0]), r = o = void 0
        }), "script") : void 0
    }), E.parseHTML = function(t, e, n) {
        if (!t || "string" != typeof t) return null;
        "boolean" == typeof e && (n = e, e = !1), e = e || h;
        var i = w.exec(t),
            o = !n && [];
        return i ? [e.createElement(i[1])] : (i = dt([t], e, o), o && o.length && E(o).remove(), E.merge([], i.childNodes))
    };
    var dn = E.fn.load;

    function pn(t) {
        return E.isWindow(t) ? t : 9 === t.nodeType && (t.defaultView || t.parentWindow)
    }
    E.fn.load = function(t, e, n) {
        if ("string" != typeof t && dn) return dn.apply(this, arguments);
        var i, o, r, s = this,
            a = t.indexOf(" ");
        return -1 < a && (i = E.trim(t.slice(a, t.length)), t = t.slice(0, a)), E.isFunction(e) ? (n = e, e = void 0) : e && "object" == typeof e && (o = "POST"), 0 < s.length && E.ajax({
            url: t,
            type: o || "GET",
            dataType: "html",
            data: e
        }).done(function(t) {
            r = arguments, s.html(i ? E("<div>").append(E.parseHTML(t)).find(i) : t)
        }).always(n && function(t, e) {
            s.each(function() {
                n.apply(this, r || [t.responseText, e, t])
            })
        }), this
    }, E.each(["ajaxStart", "ajaxStop", "ajaxComplete", "ajaxError", "ajaxSuccess", "ajaxSend"], function(t, e) {
        E.fn[e] = function(t) {
            return this.on(e, t)
        }
    }), E.expr.filters.animated = function(e) {
        return E.grep(E.timers, function(t) {
            return e === t.elem
        }).length
    }, E.offset = {
        setOffset: function(t, e, n) {
            var i, o, r, s, a, l, u = E.css(t, "position"),
                c = E(t),
                d = {};
            "static" === u && (t.style.position = "relative"), a = c.offset(), r = E.css(t, "top"), l = E.css(t, "left"), ("absolute" === u || "fixed" === u) && -1 < E.inArray("auto", [r, l]) ? (s = (i = c.position()).top, o = i.left) : (s = parseFloat(r) || 0, o = parseFloat(l) || 0), E.isFunction(e) && (e = e.call(t, n, E.extend({}, a))), null != e.top && (d.top = e.top - a.top + s), null != e.left && (d.left = e.left - a.left + o), "using" in e ? e.using.call(t, d) : c.css(d)
        }
    }, E.fn.extend({
        offset: function(e) {
            if (arguments.length) return void 0 === e ? this : this.each(function(t) {
                E.offset.setOffset(this, e, t)
            });
            var t, n, i = {
                    top: 0,
                    left: 0
                },
                o = this[0],
                r = o && o.ownerDocument;
            return r ? (t = r.documentElement, E.contains(t, o) ? (void 0 !== o.getBoundingClientRect && (i = o.getBoundingClientRect()), n = pn(r), {
                top: i.top + (n.pageYOffset || t.scrollTop) - (t.clientTop || 0),
                left: i.left + (n.pageXOffset || t.scrollLeft) - (t.clientLeft || 0)
            }) : i) : void 0
        },
        position: function() {
            if (this[0]) {
                var t, e, n = {
                        top: 0,
                        left: 0
                    },
                    i = this[0];
                return "fixed" === E.css(i, "position") ? e = i.getBoundingClientRect() : (t = this.offsetParent(), e = this.offset(), E.nodeName(t[0], "html") || (n = t.offset()), n.top += E.css(t[0], "borderTopWidth", !0), n.left += E.css(t[0], "borderLeftWidth", !0)), {
                    top: e.top - n.top - E.css(i, "marginTop", !0),
                    left: e.left - n.left - E.css(i, "marginLeft", !0)
                }
            }
        },
        offsetParent: function() {
            return this.map(function() {
                for (var t = this.offsetParent; t && !E.nodeName(t, "html") && "static" === E.css(t, "position");) t = t.offsetParent;
                return t || Wt
            })
        }
    }), E.each({
        scrollLeft: "pageXOffset",
        scrollTop: "pageYOffset"
    }, function(e, o) {
        var r = /Y/.test(o);
        E.fn[e] = function(t) {
            return K(this, function(t, e, n) {
                var i = pn(t);
                return void 0 === n ? i ? o in i ? i[o] : i.document.documentElement[e] : t[e] : void(i ? i.scrollTo(r ? E(i).scrollLeft() : n, r ? n : E(i).scrollTop()) : t[e] = n)
            }, e, t, arguments.length, null)
        }
    }), E.each(["top", "left"], function(t, n) {
        E.cssHooks[n] = Vt(v.pixelPosition, function(t, e) {
            return e ? (e = zt(t, n), Mt.test(e) ? E(t).position()[n] + "px" : e) : void 0
        })
    }), E.each({
        Height: "height",
        Width: "width"
    }, function(r, s) {
        E.each({
            padding: "inner" + r,
            content: s,
            "": "outer" + r
        }, function(i, t) {
            E.fn[t] = function(t, e) {
                var n = arguments.length && (i || "boolean" != typeof t),
                    o = i || (!0 === t || !0 === e ? "margin" : "border");
                return K(this, function(t, e, n) {
                    var i;
                    return E.isWindow(t) ? t.document.documentElement["client" + r] : 9 === t.nodeType ? (i = t.documentElement, Math.max(t.body["scroll" + r], i["scroll" + r], t.body["offset" + r], i["offset" + r], i["client" + r])) : void 0 === n ? E.css(t, e, o) : E.style(t, e, n, o)
                }, s, n ? t : void 0, n, null)
            }
        })
    }), E.fn.extend({
        bind: function(t, e, n) {
            return this.on(t, null, e, n)
        },
        unbind: function(t, e) {
            return this.off(t, null, e)
        },
        delegate: function(t, e, n, i) {
            return this.on(e, t, n, i)
        },
        undelegate: function(t, e, n) {
            return 1 === arguments.length ? this.off(t, "**") : this.off(e, t || "**", n)
        }
    }), E.fn.size = function() {
        return this.length
    }, E.fn.andSelf = E.fn.addBack, "function" == typeof define && define.amd && define("jquery", [], function() {
        return E
    });
    var fn = C.jQuery,
        hn = C.$;
    return E.noConflict = function(t) {
        return C.$ === E && (C.$ = hn), t && C.jQuery === E && (C.jQuery = fn), E
    }, t || (C.jQuery = C.$ = E), E
}), "undefined" == typeof jQuery) throw new Error("Bootstrap's JavaScript requires jQuery");
! function(t) {
"use strict";
var e = jQuery.fn.jquery.split(" ")[0].split(".");
if (e[0] < 2 && e[1] < 9 || 1 == e[0] && 9 == e[1] && e[2] < 1 || 3 < e[0]) throw new Error("Bootstrap's JavaScript requires jQuery version 1.9.1 or higher, but lower than version 4")
}(),
function(i) {
"use strict";
i.fn.emulateTransitionEnd = function(t) {
    var e = !1,
        n = this;
    i(this).one("bsTransitionEnd", function() {
        e = !0
    });
    return setTimeout(function() {
        e || i(n).trigger(i.support.transition.end)
    }, t), this
}, i(function() {
    i.support.transition = function() {
        var t = document.createElement("bootstrap"),
            e = {
                WebkitTransition: "webkitTransitionEnd",
                MozTransition: "transitionend",
                OTransition: "oTransitionEnd otransitionend",
                transition: "transitionend"
            };
        for (var n in e)
            if (void 0 !== t.style[n]) return {
                end: e[n]
            };
        return !1
    }(), i.support.transition && (i.event.special.bsTransitionEnd = {
        bindType: i.support.transition.end,
        delegateType: i.support.transition.end,
        handle: function(t) {
            if (i(t.target).is(this)) return t.handleObj.handler.apply(this, arguments)
        }
    })
})
}(jQuery),
function(r) {
"use strict";
var e = '[data-dismiss="alert"]',
    s = function(t) {
        r(t).on("click", e, this.close)
    };
s.VERSION = "3.3.7", s.TRANSITION_DURATION = 150, s.prototype.close = function(t) {
    function e() {
        o.detach().trigger("closed.bs.alert").remove()
    }
    var n = r(this),
        i = n.attr("data-target");
    i || (i = (i = n.attr("href")) && i.replace(/.*(?=#[^\s]*$)/, ""));
    var o = r("#" === i ? [] : i);
    t && t.preventDefault(), o.length || (o = n.closest(".alert")), o.trigger(t = r.Event("close.bs.alert")), t.isDefaultPrevented() || (o.removeClass("in"), r.support.transition && o.hasClass("fade") ? o.one("bsTransitionEnd", e).emulateTransitionEnd(s.TRANSITION_DURATION) : e())
};
var t = r.fn.alert;
r.fn.alert = function(n) {
    return this.each(function() {
        var t = r(this),
            e = t.data("bs.alert");
        e || t.data("bs.alert", e = new s(this)), "string" == typeof n && e[n].call(t)
    })
}, r.fn.alert.Constructor = s, r.fn.alert.noConflict = function() {
    return r.fn.alert = t, this
}, r(document).on("click.bs.alert.data-api", e, s.prototype.close)
}(jQuery),
function(r) {
"use strict";

function n(i) {
    return this.each(function() {
        var t = r(this),
            e = t.data("bs.button"),
            n = "object" == typeof i && i;
        e || t.data("bs.button", e = new o(this, n)), "toggle" == i ? e.toggle() : i && e.setState(i)
    })
}
var o = function(t, e) {
    this.$element = r(t), this.options = r.extend({}, o.DEFAULTS, e), this.isLoading = !1
};
o.VERSION = "3.3.7", o.DEFAULTS = {
    loadingText: "loading..."
}, o.prototype.setState = function(t) {
    var e = "disabled",
        n = this.$element,
        i = n.is("input") ? "val" : "html",
        o = n.data();
    t += "Text", null == o.resetText && n.data("resetText", n[i]()), setTimeout(r.proxy(function() {
        n[i](null == o[t] ? this.options[t] : o[t]), "loadingText" == t ? (this.isLoading = !0, n.addClass(e).attr(e, e).prop(e, !0)) : this.isLoading && (this.isLoading = !1, n.removeClass(e).removeAttr(e).prop(e, !1))
    }, this), 0)
}, o.prototype.toggle = function() {
    var t = !0,
        e = this.$element.closest('[data-toggle="buttons"]');
    if (e.length) {
        var n = this.$element.find("input");
        "radio" == n.prop("type") ? (n.prop("checked") && (t = !1), e.find(".active").removeClass("active"), this.$element.addClass("active")) : "checkbox" == n.prop("type") && (n.prop("checked") !== this.$element.hasClass("active") && (t = !1), this.$element.toggleClass("active")), n.prop("checked", this.$element.hasClass("active")), t && n.trigger("change")
    } else this.$element.attr("aria-pressed", !this.$element.hasClass("active")), this.$element.toggleClass("active")
};
var t = r.fn.button;
r.fn.button = n, r.fn.button.Constructor = o, r.fn.button.noConflict = function() {
    return r.fn.button = t, this
}, r(document).on("click.bs.button.data-api", '[data-toggle^="button"]', function(t) {
    var e = r(t.target).closest(".btn");
    n.call(e, "toggle"), r(t.target).is('input[type="radio"], input[type="checkbox"]') || (t.preventDefault(), e.is("input,button") ? e.trigger("focus") : e.find("input:visible,button:visible").first().trigger("focus"))
}).on("focus.bs.button.data-api blur.bs.button.data-api", '[data-toggle^="button"]', function(t) {
    r(t.target).closest(".btn").toggleClass("focus", /^focus(in)?$/.test(t.type))
})
}(jQuery),
function(d) {
"use strict";

function s(o) {
    return this.each(function() {
        var t = d(this),
            e = t.data("bs.carousel"),
            n = d.extend({}, p.DEFAULTS, t.data(), "object" == typeof o && o),
            i = "string" == typeof o ? o : n.slide;
        e || t.data("bs.carousel", e = new p(this, n)), "number" == typeof o ? e.to(o) : i ? e[i]() : n.interval && e.pause().cycle()
    })
}
var p = function(t, e) {
    this.$element = d(t), this.$indicators = this.$element.find(".carousel-indicators"), this.options = e, this.paused = null, this.sliding = null, this.interval = null, this.$active = null, this.$items = null, this.options.keyboard && this.$element.on("keydown.bs.carousel", d.proxy(this.keydown, this)), "hover" == this.options.pause && !("ontouchstart" in document.documentElement) && this.$element.on("mouseenter.bs.carousel", d.proxy(this.pause, this)).on("mouseleave.bs.carousel", d.proxy(this.cycle, this))
};
p.VERSION = "3.3.7", p.TRANSITION_DURATION = 600, p.DEFAULTS = {
    interval: 5e3,
    pause: "hover",
    wrap: !0,
    keyboard: !0
}, p.prototype.keydown = function(t) {
    if (!/input|textarea/i.test(t.target.tagName)) {
        switch (t.which) {
            case 37:
                this.prev();
                break;
            case 39:
                this.next();
                break;
            default:
                return
        }
        t.preventDefault()
    }
}, p.prototype.cycle = function(t) {
    return t || (this.paused = !1), this.interval && clearInterval(this.interval), this.options.interval && !this.paused && (this.interval = setInterval(d.proxy(this.next, this), this.options.interval)), this
}, p.prototype.getItemIndex = function(t) {
    return this.$items = t.parent().children(".item"), this.$items.index(t || this.$active)
}, p.prototype.getItemForDirection = function(t, e) {
    var n = this.getItemIndex(e);
    if (("prev" == t && 0 === n || "next" == t && n == this.$items.length - 1) && !this.options.wrap) return e;
    var i = (n + ("prev" == t ? -1 : 1)) % this.$items.length;
    return this.$items.eq(i)
}, p.prototype.to = function(t) {
    var e = this,
        n = this.getItemIndex(this.$active = this.$element.find(".item.active"));
    if (!(t > this.$items.length - 1 || t < 0)) return this.sliding ? this.$element.one("slid.bs.carousel", function() {
        e.to(t)
    }) : n == t ? this.pause().cycle() : this.slide(n < t ? "next" : "prev", this.$items.eq(t))
}, p.prototype.pause = function(t) {
    return t || (this.paused = !0), this.$element.find(".next, .prev").length && d.support.transition && (this.$element.trigger(d.support.transition.end), this.cycle(!0)), this.interval = clearInterval(this.interval), this
}, p.prototype.next = function() {
    if (!this.sliding) return this.slide("next")
}, p.prototype.prev = function() {
    if (!this.sliding) return this.slide("prev")
}, p.prototype.slide = function(t, e) {
    var n = this.$element.find(".item.active"),
        i = e || this.getItemForDirection(t, n),
        o = this.interval,
        r = "next" == t ? "left" : "right",
        s = this;
    if (i.hasClass("active")) return this.sliding = !1;
    var a = i[0],
        l = d.Event("slide.bs.carousel", {
            relatedTarget: a,
            direction: r
        });
    if (this.$element.trigger(l), !l.isDefaultPrevented()) {
        if (this.sliding = !0, o && this.pause(), this.$indicators.length) {
            this.$indicators.find(".active").removeClass("active");
            var u = d(this.$indicators.children()[this.getItemIndex(i)]);
            u && u.addClass("active")
        }
        var c = d.Event("slid.bs.carousel", {
            relatedTarget: a,
            direction: r
        });
        return d.support.transition && this.$element.hasClass("slide") ? (i.addClass(t), i[0].offsetWidth, n.addClass(r), i.addClass(r), n.one("bsTransitionEnd", function() {
            i.removeClass([t, r].join(" ")).addClass("active"), n.removeClass(["active", r].join(" ")), s.sliding = !1, setTimeout(function() {
                s.$element.trigger(c)
            }, 0)
        }).emulateTransitionEnd(p.TRANSITION_DURATION)) : (n.removeClass("active"), i.addClass("active"), this.sliding = !1, this.$element.trigger(c)), o && this.cycle(), this
    }
};
var t = d.fn.carousel;
d.fn.carousel = s, d.fn.carousel.Constructor = p, d.fn.carousel.noConflict = function() {
    return d.fn.carousel = t, this
};
var e = function(t) {
    var e, n = d(this),
        i = d(n.attr("data-target") || (e = n.attr("href")) && e.replace(/.*(?=#[^\s]+$)/, ""));
    if (i.hasClass("carousel")) {
        var o = d.extend({}, i.data(), n.data()),
            r = n.attr("data-slide-to");
        r && (o.interval = !1), s.call(i, o), r && i.data("bs.carousel").to(r), t.preventDefault()
    }
};
d(document).on("click.bs.carousel.data-api", "[data-slide]", e).on("click.bs.carousel.data-api", "[data-slide-to]", e), d(window).on("load", function() {
    d('[data-ride="carousel"]').each(function() {
        var t = d(this);
        s.call(t, t.data())
    })
})
}(jQuery),
function(s) {
"use strict";

function o(t) {
    var e, n = t.attr("data-target") || (e = t.attr("href")) && e.replace(/.*(?=#[^\s]+$)/, "");
    return s(n)
}

function a(i) {
    return this.each(function() {
        var t = s(this),
            e = t.data("bs.collapse"),
            n = s.extend({}, l.DEFAULTS, t.data(), "object" == typeof i && i);
        !e && n.toggle && /show|hide/.test(i) && (n.toggle = !1), e || t.data("bs.collapse", e = new l(this, n)), "string" == typeof i && e[i]()
    })
}
var l = function(t, e) {
    this.$element = s(t), this.options = s.extend({}, l.DEFAULTS, e), this.$trigger = s('[data-toggle="collapse"][href="#' + t.id + '"],[data-toggle="collapse"][data-target="#' + t.id + '"]'), this.transitioning = null, this.options.parent ? this.$parent = this.getParent() : this.addAriaAndCollapsedClass(this.$element, this.$trigger), this.options.toggle && this.toggle()
};
l.VERSION = "3.3.7", l.TRANSITION_DURATION = 350, l.DEFAULTS = {
    toggle: !0
}, l.prototype.dimension = function() {
    return this.$element.hasClass("width") ? "width" : "height"
}, l.prototype.show = function() {
    if (!this.transitioning && !this.$element.hasClass("in")) {
        var t, e = this.$parent && this.$parent.children(".panel").children(".in, .collapsing");
        if (!(e && e.length && ((t = e.data("bs.collapse")) && t.transitioning))) {
            var n = s.Event("show.bs.collapse");
            if (this.$element.trigger(n), !n.isDefaultPrevented()) {
                e && e.length && (a.call(e, "hide"), t || e.data("bs.collapse", null));
                var i = this.dimension();
                this.$element.removeClass("collapse").addClass("collapsing")[i](0).attr("aria-expanded", !0), this.$trigger.removeClass("collapsed").attr("aria-expanded", !0), this.transitioning = 1;
                var o = function() {
                    this.$element.removeClass("collapsing").addClass("collapse in")[i](""), this.transitioning = 0, this.$element.trigger("shown.bs.collapse")
                };
                if (!s.support.transition) return o.call(this);
                var r = s.camelCase(["scroll", i].join("-"));
                this.$element.one("bsTransitionEnd", s.proxy(o, this)).emulateTransitionEnd(l.TRANSITION_DURATION)[i](this.$element[0][r])
            }
        }
    }
}, l.prototype.hide = function() {
    if (!this.transitioning && this.$element.hasClass("in")) {
        var t = s.Event("hide.bs.collapse");
        if (this.$element.trigger(t), !t.isDefaultPrevented()) {
            var e = this.dimension();
            this.$element[e](this.$element[e]())[0].offsetHeight, this.$element.addClass("collapsing").removeClass("collapse in").attr("aria-expanded", !1), this.$trigger.addClass("collapsed").attr("aria-expanded", !1), this.transitioning = 1;
            var n = function() {
                this.transitioning = 0, this.$element.removeClass("collapsing").addClass("collapse").trigger("hidden.bs.collapse")
            };
            return s.support.transition ? void this.$element[e](0).one("bsTransitionEnd", s.proxy(n, this)).emulateTransitionEnd(l.TRANSITION_DURATION) : n.call(this)
        }
    }
}, l.prototype.toggle = function() {
    this[this.$element.hasClass("in") ? "hide" : "show"]()
}, l.prototype.getParent = function() {
    return s(this.options.parent).find('[data-toggle="collapse"][data-parent="' + this.options.parent + '"]').each(s.proxy(function(t, e) {
        var n = s(e);
        this.addAriaAndCollapsedClass(o(n), n)
    }, this)).end()
}, l.prototype.addAriaAndCollapsedClass = function(t, e) {
    var n = t.hasClass("in");
    t.attr("aria-expanded", n), e.toggleClass("collapsed", !n).attr("aria-expanded", n)
};
var t = s.fn.collapse;
s.fn.collapse = a, s.fn.collapse.Constructor = l, s.fn.collapse.noConflict = function() {
    return s.fn.collapse = t, this
}, s(document).on("click.bs.collapse.data-api", '[data-toggle="collapse"]', function(t) {
    var e = s(this);
    e.attr("data-target") || t.preventDefault();
    var n = o(e),
        i = n.data("bs.collapse") ? "toggle" : e.data();
    a.call(n, i)
})
}(jQuery),
function(s) {
"use strict";

function a(t) {
    var e = t.attr("data-target");
    e || (e = (e = t.attr("href")) && /#[A-Za-z]/.test(e) && e.replace(/.*(?=#[^\s]*$)/, ""));
    var n = e && s(e);
    return n && n.length ? n : t.parent()
}

function r(i) {
    i && 3 === i.which || (s(t).remove(), s(l).each(function() {
        var t = s(this),
            e = a(t),
            n = {
                relatedTarget: this
            };
        e.hasClass("open") && (i && "click" == i.type && /input|textarea/i.test(i.target.tagName) && s.contains(e[0], i.target) || (e.trigger(i = s.Event("hide.bs.dropdown", n)), i.isDefaultPrevented() || (t.attr("aria-expanded", "false"), e.removeClass("open").trigger(s.Event("hidden.bs.dropdown", n)))))
    }))
}
var t = ".dropdown-backdrop",
    l = '[data-toggle="dropdown"]',
    i = function(t) {
        s(t).on("click.bs.dropdown", this.toggle)
    };
i.VERSION = "3.3.7", i.prototype.toggle = function(t) {
    var e = s(this);
    if (!e.is(".disabled, :disabled")) {
        var n = a(e),
            i = n.hasClass("open");
        if (r(), !i) {
            "ontouchstart" in document.documentElement && !n.closest(".navbar-nav").length && s(document.createElement("div")).addClass("dropdown-backdrop").insertAfter(s(this)).on("click", r);
            var o = {
                relatedTarget: this
            };
            if (n.trigger(t = s.Event("show.bs.dropdown", o)), t.isDefaultPrevented()) return;
            e.trigger("focus").attr("aria-expanded", "true"), n.toggleClass("open").trigger(s.Event("shown.bs.dropdown", o))
        }
        return !1
    }
}, i.prototype.keydown = function(t) {
    if (/(38|40|27|32)/.test(t.which) && !/input|textarea/i.test(t.target.tagName)) {
        var e = s(this);
        if (t.preventDefault(), t.stopPropagation(), !e.is(".disabled, :disabled")) {
            var n = a(e),
                i = n.hasClass("open");
            if (!i && 27 != t.which || i && 27 == t.which) return 27 == t.which && n.find(l).trigger("focus"), e.trigger("click");
            var o = n.find(".dropdown-menu li:not(.disabled):visible a");
            if (o.length) {
                var r = o.index(t.target);
                38 == t.which && 0 < r && r--, 40 == t.which && r < o.length - 1 && r++, ~r || (r = 0), o.eq(r).trigger("focus")
            }
        }
    }
};
var e = s.fn.dropdown;
s.fn.dropdown = function(n) {
    return this.each(function() {
        var t = s(this),
            e = t.data("bs.dropdown");
        e || t.data("bs.dropdown", e = new i(this)), "string" == typeof n && e[n].call(t)
    })
}, s.fn.dropdown.Constructor = i, s.fn.dropdown.noConflict = function() {
    return s.fn.dropdown = e, this
}, s(document).on("click.bs.dropdown.data-api", r).on("click.bs.dropdown.data-api", ".dropdown form", function(t) {
    t.stopPropagation()
}).on("click.bs.dropdown.data-api", l, i.prototype.toggle).on("keydown.bs.dropdown.data-api", l, i.prototype.keydown).on("keydown.bs.dropdown.data-api", ".dropdown-menu", i.prototype.keydown)
}(jQuery),
function(r) {
"use strict";

function s(i, o) {
    return this.each(function() {
        var t = r(this),
            e = t.data("bs.modal"),
            n = r.extend({}, a.DEFAULTS, t.data(), "object" == typeof i && i);
        e || t.data("bs.modal", e = new a(this, n)), "string" == typeof i ? e[i](o) : n.show && e.show(o)
    })
}
var a = function(t, e) {
    this.options = e, this.$body = r(document.body), this.$element = r(t), this.$dialog = this.$element.find(".modal-dialog"), this.$backdrop = null, this.isShown = null, this.originalBodyPad = null, this.scrollbarWidth = 0, this.ignoreBackdropClick = !1, this.options.remote && this.$element.find(".modal-content").load(this.options.remote, r.proxy(function() {
        this.$element.trigger("loaded.bs.modal")
    }, this))
};
a.VERSION = "3.3.7", a.TRANSITION_DURATION = 300, a.BACKDROP_TRANSITION_DURATION = 150, a.DEFAULTS = {
    backdrop: !0,
    keyboard: !0,
    show: !0
}, a.prototype.toggle = function(t) {
    return this.isShown ? this.hide() : this.show(t)
}, a.prototype.show = function(n) {
    var i = this,
        t = r.Event("show.bs.modal", {
            relatedTarget: n
        });
    this.$element.trigger(t), this.isShown || t.isDefaultPrevented() || (this.isShown = !0, this.checkScrollbar(), this.setScrollbar(), this.$body.addClass("modal-open"), this.escape(), this.resize(), this.$element.on("click.dismiss.bs.modal", '[data-dismiss="modal"]', r.proxy(this.hide, this)), this.$dialog.on("mousedown.dismiss.bs.modal", function() {
        i.$element.one("mouseup.dismiss.bs.modal", function(t) {
            r(t.target).is(i.$element) && (i.ignoreBackdropClick = !0)
        })
    }), this.backdrop(function() {
        var t = r.support.transition && i.$element.hasClass("fade");
        i.$element.parent().length || i.$element.appendTo(i.$body), i.$element.show().scrollTop(0), i.adjustDialog(), t && i.$element[0].offsetWidth, i.$element.addClass("in"), i.enforceFocus();
        var e = r.Event("shown.bs.modal", {
            relatedTarget: n
        });
        t ? i.$dialog.one("bsTransitionEnd", function() {
            i.$element.trigger("focus").trigger(e)
        }).emulateTransitionEnd(a.TRANSITION_DURATION) : i.$element.trigger("focus").trigger(e)
    }))
}, a.prototype.hide = function(t) {
    t && t.preventDefault(), t = r.Event("hide.bs.modal"), this.$element.trigger(t), this.isShown && !t.isDefaultPrevented() && (this.isShown = !1, this.escape(), this.resize(), r(document).off("focusin.bs.modal"), this.$element.removeClass("in").off("click.dismiss.bs.modal").off("mouseup.dismiss.bs.modal"), this.$dialog.off("mousedown.dismiss.bs.modal"), r.support.transition && this.$element.hasClass("fade") ? this.$element.one("bsTransitionEnd", r.proxy(this.hideModal, this)).emulateTransitionEnd(a.TRANSITION_DURATION) : this.hideModal())
}, a.prototype.enforceFocus = function() {
    r(document).off("focusin.bs.modal").on("focusin.bs.modal", r.proxy(function(t) {
        document === t.target || this.$element[0] === t.target || this.$element.has(t.target).length || this.$element.trigger("focus")
    }, this))
}, a.prototype.escape = function() {
    this.isShown && this.options.keyboard ? this.$element.on("keydown.dismiss.bs.modal", r.proxy(function(t) {
        27 == t.which && this.hide()
    }, this)) : this.isShown || this.$element.off("keydown.dismiss.bs.modal")
}, a.prototype.resize = function() {
    this.isShown ? r(window).on("resize.bs.modal", r.proxy(this.handleUpdate, this)) : r(window).off("resize.bs.modal")
}, a.prototype.hideModal = function() {
    var t = this;
    this.$element.hide(), this.backdrop(function() {
        t.$body.removeClass("modal-open"), t.resetAdjustments(), t.resetScrollbar(), t.$element.trigger("hidden.bs.modal")
    })
}, a.prototype.removeBackdrop = function() {
    this.$backdrop && this.$backdrop.remove(), this.$backdrop = null
}, a.prototype.backdrop = function(t) {
    var e = this,
        n = this.$element.hasClass("fade") ? "fade" : "";
    if (this.isShown && this.options.backdrop) {
        var i = r.support.transition && n;
        if (this.$backdrop = r(document.createElement("div")).addClass("modal-backdrop " + n).appendTo(this.$body), this.$element.on("click.dismiss.bs.modal", r.proxy(function(t) {
                return this.ignoreBackdropClick ? void(this.ignoreBackdropClick = !1) : void(t.target === t.currentTarget && ("static" == this.options.backdrop ? this.$element[0].focus() : this.hide()))
            }, this)), i && this.$backdrop[0].offsetWidth, this.$backdrop.addClass("in"), !t) return;
        i ? this.$backdrop.one("bsTransitionEnd", t).emulateTransitionEnd(a.BACKDROP_TRANSITION_DURATION) : t()
    } else if (!this.isShown && this.$backdrop) {
        this.$backdrop.removeClass("in");
        var o = function() {
            e.removeBackdrop(), t && t()
        };
        r.support.transition && this.$element.hasClass("fade") ? this.$backdrop.one("bsTransitionEnd", o).emulateTransitionEnd(a.BACKDROP_TRANSITION_DURATION) : o()
    } else t && t()
}, a.prototype.handleUpdate = function() {
    this.adjustDialog()
}, a.prototype.adjustDialog = function() {
    var t = this.$element[0].scrollHeight > document.documentElement.clientHeight;
    this.$element.css({
        paddingLeft: !this.bodyIsOverflowing && t ? this.scrollbarWidth : "",
        paddingRight: this.bodyIsOverflowing && !t ? this.scrollbarWidth : ""
    })
}, a.prototype.resetAdjustments = function() {
    this.$element.css({
        paddingLeft: "",
        paddingRight: ""
    })
}, a.prototype.checkScrollbar = function() {
    var t = window.innerWidth;
    if (!t) {
        var e = document.documentElement.getBoundingClientRect();
        t = e.right - Math.abs(e.left)
    }
    this.bodyIsOverflowing = document.body.clientWidth < t, this.scrollbarWidth = this.measureScrollbar()
}, a.prototype.setScrollbar = function() {
    var t = parseInt(this.$body.css("padding-right") || 0, 10);
    this.originalBodyPad = document.body.style.paddingRight || "", this.bodyIsOverflowing && this.$body.css("padding-right", t + this.scrollbarWidth)
}, a.prototype.resetScrollbar = function() {
    this.$body.css("padding-right", this.originalBodyPad)
}, a.prototype.measureScrollbar = function() {
    var t = document.createElement("div");
    t.className = "modal-scrollbar-measure", this.$body.append(t);
    var e = t.offsetWidth - t.clientWidth;
    return this.$body[0].removeChild(t), e
};
var t = r.fn.modal;
r.fn.modal = s, r.fn.modal.Constructor = a, r.fn.modal.noConflict = function() {
    return r.fn.modal = t, this
}, r(document).on("click.bs.modal.data-api", '[data-toggle="modal"]', function(t) {
    var e = r(this),
        n = e.attr("href"),
        i = r(e.attr("data-target") || n && n.replace(/.*(?=#[^\s]+$)/, "")),
        o = i.data("bs.modal") ? "toggle" : r.extend({
            remote: !/#/.test(n) && n
        }, i.data(), e.data());
    e.is("a") && t.preventDefault(), i.one("show.bs.modal", function(t) {
        t.isDefaultPrevented() || i.one("hidden.bs.modal", function() {
            e.is(":visible") && e.trigger("focus")
        })
    }), s.call(i, o, this)
})
}(jQuery),
function(g) {
"use strict";
var m = function(t, e) {
    this.type = null, this.options = null, this.enabled = null, this.timeout = null, this.hoverState = null, this.$element = null, this.inState = null, this.init("tooltip", t, e)
};
m.VERSION = "3.3.7", m.TRANSITION_DURATION = 150, m.DEFAULTS = {
    animation: !0,
    placement: "top",
    selector: !1,
    template: '<div class="tooltip" role="tooltip"><div class="tooltip-arrow"></div><div class="tooltip-inner"></div></div>',
    trigger: "hover focus",
    title: "",
    delay: 0,
    html: !1,
    container: !1,
    viewport: {
        selector: "body",
        padding: 0
    }
}, m.prototype.init = function(t, e, n) {
    if (this.enabled = !0, this.type = t, this.$element = g(e), this.options = this.getOptions(n), this.$viewport = this.options.viewport && g(g.isFunction(this.options.viewport) ? this.options.viewport.call(this, this.$element) : this.options.viewport.selector || this.options.viewport), this.inState = {
            click: !1,
            hover: !1,
            focus: !1
        }, this.$element[0] instanceof document.constructor && !this.options.selector) throw new Error("`selector` option must be specified when initializing " + this.type + " on the window.document object!");
    for (var i = this.options.trigger.split(" "), o = i.length; o--;) {
        var r = i[o];
        if ("click" == r) this.$element.on("click." + this.type, this.options.selector, g.proxy(this.toggle, this));
        else if ("manual" != r) {
            var s = "hover" == r ? "mouseenter" : "focusin",
                a = "hover" == r ? "mouseleave" : "focusout";
            this.$element.on(s + "." + this.type, this.options.selector, g.proxy(this.enter, this)), this.$element.on(a + "." + this.type, this.options.selector, g.proxy(this.leave, this))
        }
    }
    this.options.selector ? this._options = g.extend({}, this.options, {
        trigger: "manual",
        selector: ""
    }) : this.fixTitle()
}, m.prototype.getDefaults = function() {
    return m.DEFAULTS
}, m.prototype.getOptions = function(t) {
    return (t = g.extend({}, this.getDefaults(), this.$element.data(), t)).delay && "number" == typeof t.delay && (t.delay = {
        show: t.delay,
        hide: t.delay
    }), t
}, m.prototype.getDelegateOptions = function() {
    var n = {},
        i = this.getDefaults();
    return this._options && g.each(this._options, function(t, e) {
        i[t] != e && (n[t] = e)
    }), n
}, m.prototype.enter = function(t) {
    var e = t instanceof this.constructor ? t : g(t.currentTarget).data("bs." + this.type);
    return e || (e = new this.constructor(t.currentTarget, this.getDelegateOptions()), g(t.currentTarget).data("bs." + this.type, e)), t instanceof g.Event && (e.inState["focusin" == t.type ? "focus" : "hover"] = !0), e.tip().hasClass("in") || "in" == e.hoverState ? void(e.hoverState = "in") : (clearTimeout(e.timeout), e.hoverState = "in", e.options.delay && e.options.delay.show ? void(e.timeout = setTimeout(function() {
        "in" == e.hoverState && e.show()
    }, e.options.delay.show)) : e.show())
}, m.prototype.isInStateTrue = function() {
    for (var t in this.inState)
        if (this.inState[t]) return !0;
    return !1
}, m.prototype.leave = function(t) {
    var e = t instanceof this.constructor ? t : g(t.currentTarget).data("bs." + this.type);
    if (e || (e = new this.constructor(t.currentTarget, this.getDelegateOptions()), g(t.currentTarget).data("bs." + this.type, e)), t instanceof g.Event && (e.inState["focusout" == t.type ? "focus" : "hover"] = !1), !e.isInStateTrue()) return clearTimeout(e.timeout), e.hoverState = "out", e.options.delay && e.options.delay.hide ? void(e.timeout = setTimeout(function() {
        "out" == e.hoverState && e.hide()
    }, e.options.delay.hide)) : e.hide()
}, m.prototype.show = function() {
    var t = g.Event("show.bs." + this.type);
    if (this.hasContent() && this.enabled) {
        this.$element.trigger(t);
        var e = g.contains(this.$element[0].ownerDocument.documentElement, this.$element[0]);
        if (t.isDefaultPrevented() || !e) return;
        var n = this,
            i = this.tip(),
            o = this.getUID(this.type);
        this.setContent(), i.attr("id", o), this.$element.attr("aria-describedby", o), this.options.animation && i.addClass("fade");
        var r = "function" == typeof this.options.placement ? this.options.placement.call(this, i[0], this.$element[0]) : this.options.placement,
            s = /\s?auto?\s?/i,
            a = s.test(r);
        a && (r = r.replace(s, "") || "top"), i.detach().css({
            top: 0,
            left: 0,
            display: "block"
        }).addClass(r).data("bs." + this.type, this), this.options.container ? i.appendTo(this.options.container) : i.insertAfter(this.$element), this.$element.trigger("inserted.bs." + this.type);
        var l = this.getPosition(),
            u = i[0].offsetWidth,
            c = i[0].offsetHeight;
        if (a) {
            var d = r,
                p = this.getPosition(this.$viewport);
            r = "bottom" == r && l.bottom + c > p.bottom ? "top" : "top" == r && l.top - c < p.top ? "bottom" : "right" == r && l.right + u > p.width ? "left" : "left" == r && l.left - u < p.left ? "right" : r, i.removeClass(d).addClass(r)
        }
        var f = this.getCalculatedOffset(r, l, u, c);
        this.applyPlacement(f, r);
        var h = function() {
            var t = n.hoverState;
            n.$element.trigger("shown.bs." + n.type), n.hoverState = null, "out" == t && n.leave(n)
        };
        g.support.transition && this.$tip.hasClass("fade") ? i.one("bsTransitionEnd", h).emulateTransitionEnd(m.TRANSITION_DURATION) : h()
    }
}, m.prototype.applyPlacement = function(t, e) {
    var n = this.tip(),
        i = n[0].offsetWidth,
        o = n[0].offsetHeight,
        r = parseInt(n.css("margin-top"), 10),
        s = parseInt(n.css("margin-left"), 10);
    isNaN(r) && (r = 0), isNaN(s) && (s = 0), t.top += r, t.left += s, g.offset.setOffset(n[0], g.extend({
        using: function(t) {
            n.css({
                top: Math.round(t.top),
                left: Math.round(t.left)
            })
        }
    }, t), 0), n.addClass("in");
    var a = n[0].offsetWidth,
        l = n[0].offsetHeight;
    "top" == e && l != o && (t.top = t.top + o - l);
    var u = this.getViewportAdjustedDelta(e, t, a, l);
    u.left ? t.left += u.left : t.top += u.top;
    var c = /top|bottom/.test(e),
        d = c ? 2 * u.left - i + a : 2 * u.top - o + l,
        p = c ? "offsetWidth" : "offsetHeight";
    n.offset(t), this.replaceArrow(d, n[0][p], c)
}, m.prototype.replaceArrow = function(t, e, n) {
    this.arrow().css(n ? "left" : "top", 50 * (1 - t / e) + "%").css(n ? "top" : "left", "")
}, m.prototype.setContent = function() {
    var t = this.tip(),
        e = this.getTitle();
    t.find(".tooltip-inner")[this.options.html ? "html" : "text"](e), t.removeClass("fade in top bottom left right")
}, m.prototype.hide = function(t) {
    function e() {
        "in" != n.hoverState && i.detach(), n.$element && n.$element.removeAttr("aria-describedby").trigger("hidden.bs." + n.type), t && t()
    }
    var n = this,
        i = g(this.$tip),
        o = g.Event("hide.bs." + this.type);
    if (this.$element.trigger(o), !o.isDefaultPrevented()) return i.removeClass("in"), g.support.transition && i.hasClass("fade") ? i.one("bsTransitionEnd", e).emulateTransitionEnd(m.TRANSITION_DURATION) : e(), this.hoverState = null, this
}, m.prototype.fixTitle = function() {
    var t = this.$element;
    (t.attr("title") || "string" != typeof t.attr("data-original-title")) && t.attr("data-original-title", t.attr("title") || "").attr("title", "")
}, m.prototype.hasContent = function() {
    return this.getTitle()
}, m.prototype.getPosition = function(t) {
    var e = (t = t || this.$element)[0],
        n = "BODY" == e.tagName,
        i = e.getBoundingClientRect();
    null == i.width && (i = g.extend({}, i, {
        width: i.right - i.left,
        height: i.bottom - i.top
    }));
    var o = window.SVGElement && e instanceof window.SVGElement,
        r = n ? {
            top: 0,
            left: 0
        } : o ? null : t.offset(),
        s = {
            scroll: n ? document.documentElement.scrollTop || document.body.scrollTop : t.scrollTop()
        },
        a = n ? {
            width: g(window).width(),
            height: g(window).height()
        } : null;
    return g.extend({}, i, s, a, r)
}, m.prototype.getCalculatedOffset = function(t, e, n, i) {
    return "bottom" == t ? {
        top: e.top + e.height,
        left: e.left + e.width / 2 - n / 2
    } : "top" == t ? {
        top: e.top - i,
        left: e.left + e.width / 2 - n / 2
    } : "left" == t ? {
        top: e.top + e.height / 2 - i / 2,
        left: e.left - n
    } : {
        top: e.top + e.height / 2 - i / 2,
        left: e.left + e.width
    }
}, m.prototype.getViewportAdjustedDelta = function(t, e, n, i) {
    var o = {
        top: 0,
        left: 0
    };
    if (!this.$viewport) return o;
    var r = this.options.viewport && this.options.viewport.padding || 0,
        s = this.getPosition(this.$viewport);
    if (/right|left/.test(t)) {
        var a = e.top - r - s.scroll,
            l = e.top + r - s.scroll + i;
        a < s.top ? o.top = s.top - a : l > s.top + s.height && (o.top = s.top + s.height - l)
    } else {
        var u = e.left - r,
            c = e.left + r + n;
        u < s.left ? o.left = s.left - u : c > s.right && (o.left = s.left + s.width - c)
    }
    return o
}, m.prototype.getTitle = function() {
    var t = this.$element,
        e = this.options;
    return t.attr("data-original-title") || ("function" == typeof e.title ? e.title.call(t[0]) : e.title)
}, m.prototype.getUID = function(t) {
    for (; t += ~~(1e6 * Math.random()), document.getElementById(t););
    return t
}, m.prototype.tip = function() {
    if (!this.$tip && (this.$tip = g(this.options.template), 1 != this.$tip.length)) throw new Error(this.type + " `template` option must consist of exactly 1 top-level element!");
    return this.$tip
}, m.prototype.arrow = function() {
    return this.$arrow = this.$arrow || this.tip().find(".tooltip-arrow")
}, m.prototype.enable = function() {
    this.enabled = !0
}, m.prototype.disable = function() {
    this.enabled = !1
}, m.prototype.toggleEnabled = function() {
    this.enabled = !this.enabled
}, m.prototype.toggle = function(t) {
    var e = this;
    t && ((e = g(t.currentTarget).data("bs." + this.type)) || (e = new this.constructor(t.currentTarget, this.getDelegateOptions()), g(t.currentTarget).data("bs." + this.type, e))), t ? (e.inState.click = !e.inState.click, e.isInStateTrue() ? e.enter(e) : e.leave(e)) : e.tip().hasClass("in") ? e.leave(e) : e.enter(e)
}, m.prototype.destroy = function() {
    var t = this;
    clearTimeout(this.timeout), this.hide(function() {
        t.$element.off("." + t.type).removeData("bs." + t.type), t.$tip && t.$tip.detach(), t.$tip = null, t.$arrow = null, t.$viewport = null, t.$element = null
    })
};
var t = g.fn.tooltip;
g.fn.tooltip = function(i) {
    return this.each(function() {
        var t = g(this),
            e = t.data("bs.tooltip"),
            n = "object" == typeof i && i;
        !e && /destroy|hide/.test(i) || (e || t.data("bs.tooltip", e = new m(this, n)), "string" == typeof i && e[i]())
    })
}, g.fn.tooltip.Constructor = m, g.fn.tooltip.noConflict = function() {
    return g.fn.tooltip = t, this
}
}(jQuery),
function(o) {
"use strict";
var r = function(t, e) {
    this.init("popover", t, e)
};
if (!o.fn.tooltip) throw new Error("Popover requires tooltip.js");
r.VERSION = "3.3.7", r.DEFAULTS = o.extend({}, o.fn.tooltip.Constructor.DEFAULTS, {
    placement: "right",
    trigger: "click",
    content: "",
    template: '<div class="popover" role="tooltip"><div class="arrow"></div><h3 class="popover-title"></h3><div class="popover-content"></div></div>'
}), r.prototype = o.extend({}, o.fn.tooltip.Constructor.prototype), (r.prototype.constructor = r).prototype.getDefaults = function() {
    return r.DEFAULTS
}, r.prototype.setContent = function() {
    var t = this.tip(),
        e = this.getTitle(),
        n = this.getContent();
    t.find(".popover-title")[this.options.html ? "html" : "text"](e), t.find(".popover-content").children().detach().end()[this.options.html ? "string" == typeof n ? "html" : "append" : "text"](n), t.removeClass("fade top bottom left right in"), t.find(".popover-title").html() || t.find(".popover-title").hide()
}, r.prototype.hasContent = function() {
    return this.getTitle() || this.getContent()
}, r.prototype.getContent = function() {
    var t = this.$element,
        e = this.options;
    return t.attr("data-content") || ("function" == typeof e.content ? e.content.call(t[0]) : e.content)
}, r.prototype.arrow = function() {
    return this.$arrow = this.$arrow || this.tip().find(".arrow")
};
var t = o.fn.popover;
o.fn.popover = function(i) {
    return this.each(function() {
        var t = o(this),
            e = t.data("bs.popover"),
            n = "object" == typeof i && i;
        !e && /destroy|hide/.test(i) || (e || t.data("bs.popover", e = new r(this, n)), "string" == typeof i && e[i]())
    })
}, o.fn.popover.Constructor = r, o.fn.popover.noConflict = function() {
    return o.fn.popover = t, this
}
}(jQuery),
function(r) {
"use strict";

function o(t, e) {
    this.$body = r(document.body), this.$scrollElement = r(r(t).is(document.body) ? window : t), this.options = r.extend({}, o.DEFAULTS, e), this.selector = (this.options.target || "") + " .nav li > a", this.offsets = [], this.targets = [], this.activeTarget = null, this.scrollHeight = 0, this.$scrollElement.on("scroll.bs.scrollspy", r.proxy(this.process, this)), this.refresh(), this.process()
}

function e(i) {
    return this.each(function() {
        var t = r(this),
            e = t.data("bs.scrollspy"),
            n = "object" == typeof i && i;
        e || t.data("bs.scrollspy", e = new o(this, n)), "string" == typeof i && e[i]()
    })
}
o.VERSION = "3.3.7", o.DEFAULTS = {
    offset: 10
}, o.prototype.getScrollHeight = function() {
    return this.$scrollElement[0].scrollHeight || Math.max(this.$body[0].scrollHeight, document.documentElement.scrollHeight)
}, o.prototype.refresh = function() {
    var t = this,
        i = "offset",
        o = 0;
    this.offsets = [], this.targets = [], this.scrollHeight = this.getScrollHeight(), r.isWindow(this.$scrollElement[0]) || (i = "position", o = this.$scrollElement.scrollTop()), this.$body.find(this.selector).map(function() {
        var t = r(this),
            e = t.data("target") || t.attr("href"),
            n = /^#./.test(e) && r(e);
        return n && n.length && n.is(":visible") && [
            [n[i]().top + o, e]
        ] || null
    }).sort(function(t, e) {
        return t[0] - e[0]
    }).each(function() {
        t.offsets.push(this[0]), t.targets.push(this[1])
    })
}, o.prototype.process = function() {
    var t, e = this.$scrollElement.scrollTop() + this.options.offset,
        n = this.getScrollHeight(),
        i = this.options.offset + n - this.$scrollElement.height(),
        o = this.offsets,
        r = this.targets,
        s = this.activeTarget;
    if (this.scrollHeight != n && this.refresh(), i <= e) return s != (t = r[r.length - 1]) && this.activate(t);
    if (s && e < o[0]) return this.activeTarget = null, this.clear();
    for (t = o.length; t--;) s != r[t] && e >= o[t] && (void 0 === o[t + 1] || e < o[t + 1]) && this.activate(r[t])
}, o.prototype.activate = function(t) {
    this.activeTarget = t, this.clear();
    var e = this.selector + '[data-target="' + t + '"],' + this.selector + '[href="' + t + '"]',
        n = r(e).parents("li").addClass("active");
    n.parent(".dropdown-menu").length && (n = n.closest("li.dropdown").addClass("active")), n.trigger("activate.bs.scrollspy")
}, o.prototype.clear = function() {
    r(this.selector).parentsUntil(this.options.target, ".active").removeClass("active")
};
var t = r.fn.scrollspy;
r.fn.scrollspy = e, r.fn.scrollspy.Constructor = o, r.fn.scrollspy.noConflict = function() {
    return r.fn.scrollspy = t, this
}, r(window).on("load.bs.scrollspy.data-api", function() {
    r('[data-spy="scroll"]').each(function() {
        var t = r(this);
        e.call(t, t.data())
    })
})
}(jQuery),
function(a) {
"use strict";

function e(n) {
    return this.each(function() {
        var t = a(this),
            e = t.data("bs.tab");
        e || t.data("bs.tab", e = new s(this)), "string" == typeof n && e[n]()
    })
}
var s = function(t) {
    this.element = a(t)
};
s.VERSION = "3.3.7", s.TRANSITION_DURATION = 150, s.prototype.show = function() {
    var t = this.element,
        e = t.closest("ul:not(.dropdown-menu)"),
        n = t.data("target");
    if (n || (n = (n = t.attr("href")) && n.replace(/.*(?=#[^\s]*$)/, "")), !t.parent("li").hasClass("active")) {
        var i = e.find(".active:last a"),
            o = a.Event("hide.bs.tab", {
                relatedTarget: t[0]
            }),
            r = a.Event("show.bs.tab", {
                relatedTarget: i[0]
            });
        if (i.trigger(o), t.trigger(r), !r.isDefaultPrevented() && !o.isDefaultPrevented()) {
            var s = a(n);
            this.activate(t.closest("li"), e), this.activate(s, s.parent(), function() {
                i.trigger({
                    type: "hidden.bs.tab",
                    relatedTarget: t[0]
                }), t.trigger({
                    type: "shown.bs.tab",
                    relatedTarget: i[0]
                })
            })
        }
    }
}, s.prototype.activate = function(t, e, n) {
    function i() {
        o.removeClass("active").find("> .dropdown-menu > .active").removeClass("active").end().find('[data-toggle="tab"]').attr("aria-expanded", !1), t.addClass("active").find('[data-toggle="tab"]').attr("aria-expanded", !0), r ? (t[0].offsetWidth, t.addClass("in")) : t.removeClass("fade"), t.parent(".dropdown-menu").length && t.closest("li.dropdown").addClass("active").end().find('[data-toggle="tab"]').attr("aria-expanded", !0), n && n()
    }
    var o = e.find("> .active"),
        r = n && a.support.transition && (o.length && o.hasClass("fade") || !!e.find("> .fade").length);
    o.length && r ? o.one("bsTransitionEnd", i).emulateTransitionEnd(s.TRANSITION_DURATION) : i(), o.removeClass("in")
};
var t = a.fn.tab;
a.fn.tab = e, a.fn.tab.Constructor = s, a.fn.tab.noConflict = function() {
    return a.fn.tab = t, this
};
var n = function(t) {
    t.preventDefault(), e.call(a(this), "show")
};
a(document).on("click.bs.tab.data-api", '[data-toggle="tab"]', n).on("click.bs.tab.data-api", '[data-toggle="pill"]', n)
}(jQuery),
function(l) {
"use strict";

function n(i) {
    return this.each(function() {
        var t = l(this),
            e = t.data("bs.affix"),
            n = "object" == typeof i && i;
        e || t.data("bs.affix", e = new u(this, n)), "string" == typeof i && e[i]()
    })
}
var u = function(t, e) {
    this.options = l.extend({}, u.DEFAULTS, e), this.$target = l(this.options.target).on("scroll.bs.affix.data-api", l.proxy(this.checkPosition, this)).on("click.bs.affix.data-api", l.proxy(this.checkPositionWithEventLoop, this)), this.$element = l(t), this.affixed = null, this.unpin = null, this.pinnedOffset = null, this.checkPosition()
};
u.VERSION = "3.3.7", u.RESET = "affix affix-top affix-bottom", u.DEFAULTS = {
    offset: 0,
    target: window
}, u.prototype.getState = function(t, e, n, i) {
    var o = this.$target.scrollTop(),
        r = this.$element.offset(),
        s = this.$target.height();
    if (null != n && "top" == this.affixed) return o < n && "top";
    if ("bottom" == this.affixed) return null != n ? !(o + this.unpin <= r.top) && "bottom" : !(o + s <= t - i) && "bottom";
    var a = null == this.affixed,
        l = a ? o : r.top;
    return null != n && o <= n ? "top" : null != i && t - i <= l + (a ? s : e) && "bottom"
}, u.prototype.getPinnedOffset = function() {
    if (this.pinnedOffset) return this.pinnedOffset;
    this.$element.removeClass(u.RESET).addClass("affix");
    var t = this.$target.scrollTop(),
        e = this.$element.offset();
    return this.pinnedOffset = e.top - t
}, u.prototype.checkPositionWithEventLoop = function() {
    setTimeout(l.proxy(this.checkPosition, this), 1)
}, u.prototype.checkPosition = function() {
    if (this.$element.is(":visible")) {
        var t = this.$element.height(),
            e = this.options.offset,
            n = e.top,
            i = e.bottom,
            o = Math.max(l(document).height(), l(document.body).height());
        "object" != typeof e && (i = n = e), "function" == typeof n && (n = e.top(this.$element)), "function" == typeof i && (i = e.bottom(this.$element));
        var r = this.getState(o, t, n, i);
        if (this.affixed != r) {
            null != this.unpin && this.$element.css("top", "");
            var s = "affix" + (r ? "-" + r : ""),
                a = l.Event(s + ".bs.affix");
            if (this.$element.trigger(a), a.isDefaultPrevented()) return;
            this.affixed = r, this.unpin = "bottom" == r ? this.getPinnedOffset() : null, this.$element.removeClass(u.RESET).addClass(s).trigger(s.replace("affix", "affixed") + ".bs.affix")
        }
        "bottom" == r && this.$element.offset({
            top: o - t - i
        })
    }
};
var t = l.fn.affix;
l.fn.affix = n, l.fn.affix.Constructor = u, l.fn.affix.noConflict = function() {
    return l.fn.affix = t, this
}, l(window).on("load", function() {
    l('[data-spy="affix"]').each(function() {
        var t = l(this),
            e = t.data();
        e.offset = e.offset || {}, null != e.offsetBottom && (e.offset.bottom = e.offsetBottom), null != e.offsetTop && (e.offset.top = e.offsetTop), n.call(t, e)
    })
})
}(jQuery);
! function(a, b, c, d) {
function e(b, c) {
    this.settings = null, this.options = a.extend({}, e.Defaults, c), this.$element = a(b), this._handlers = {}, this._plugins = {}, this._supress = {}, this._current = null, this._speed = null, this._coordinates = [], this._breakpoint = null, this._width = null, this._items = [], this._clones = [], this._mergers = [], this._widths = [], this._invalidated = {}, this._pipe = [], this._drag = {
        time: null,
        target: null,
        pointer: null,
        stage: {
            start: null,
            current: null
        },
        direction: null
    }, this._states = {
        current: {},
        tags: {
            initializing: ["busy"],
            animating: ["busy"],
            dragging: ["interacting"]
        }
    }, a.each(["onResize", "onThrottledResize"], a.proxy(function(b, c) {
        this._handlers[c] = a.proxy(this[c], this)
    }, this)), a.each(e.Plugins, a.proxy(function(a, b) {
        this._plugins[a.charAt(0).toLowerCase() + a.slice(1)] = new b(this)
    }, this)), a.each(e.Workers, a.proxy(function(b, c) {
        this._pipe.push({
            filter: c.filter,
            run: a.proxy(c.run, this)
        })
    }, this)), this.setup(), this.initialize()
}
e.Defaults = {
    items: 3,
    loop: !1,
    center: !1,
    rewind: !1,
    mouseDrag: !0,
    touchDrag: !0,
    pullDrag: !0,
    freeDrag: !1,
    margin: 0,
    stagePadding: 0,
    merge: !1,
    mergeFit: !0,
    autoWidth: !1,
    startPosition: 0,
    rtl: !1,
    smartSpeed: 250,
    fluidSpeed: !1,
    dragEndSpeed: !1,
    responsive: {},
    responsiveRefreshRate: 200,
    responsiveBaseElement: b,
    fallbackEasing: "swing",
    info: !1,
    nestedItemSelector: !1,
    itemElement: "div",
    stageElement: "div",
    refreshClass: "owl-refresh",
    loadedClass: "owl-loaded",
    loadingClass: "owl-loading",
    rtlClass: "owl-rtl",
    responsiveClass: "owl-responsive",
    dragClass: "owl-drag",
    itemClass: "owl-item",
    stageClass: "owl-stage",
    stageOuterClass: "owl-stage-outer",
    grabClass: "owl-grab"
}, e.Width = {
    Default: "default",
    Inner: "inner",
    Outer: "outer"
}, e.Type = {
    Event: "event",
    State: "state"
}, e.Plugins = {}, e.Workers = [{
    filter: ["width", "settings"],
    run: function() {
        this._width = this.$element.width()
    }
}, {
    filter: ["width", "items", "settings"],
    run: function(a) {
        a.current = this._items && this._items[this.relative(this._current)]
    }
}, {
    filter: ["items", "settings"],
    run: function() {
        this.$stage.children(".cloned").remove()
    }
}, {
    filter: ["width", "items", "settings"],
    run: function(a) {
        var b = this.settings.margin || "",
            c = !this.settings.autoWidth,
            d = this.settings.rtl,
            e = {
                width: "auto",
                "margin-left": d ? b : "",
                "margin-right": d ? "" : b
            };
        !c && this.$stage.children().css(e), a.css = e
    }
}, {
    filter: ["width", "items", "settings"],
    run: function(a) {
        var b = (this.width() / this.settings.items).toFixed(3) - this.settings.margin,
            c = null,
            d = this._items.length,
            e = !this.settings.autoWidth,
            f = [];
        for (a.items = {
                merge: !1,
                width: b
            }; d--;) c = this._mergers[d], c = this.settings.mergeFit && Math.min(c, this.settings.items) || c, a.items.merge = c > 1 || a.items.merge, f[d] = e ? b * c : this._items[d].width();
        this._widths = f
    }
}, {
    filter: ["items", "settings"],
    run: function() {
        var b = [],
            c = this._items,
            d = this.settings,
            e = Math.max(2 * d.items, 4),
            f = 2 * Math.ceil(c.length / 2),
            g = d.loop && c.length ? d.rewind ? e : Math.max(e, f) : 0,
            h = "",
            i = "";
        for (g /= 2; g--;) b.push(this.normalize(b.length / 2, !0)), h += c[b[b.length - 1]][0].outerHTML, b.push(this.normalize(c.length - 1 - (b.length - 1) / 2, !0)), i = c[b[b.length - 1]][0].outerHTML + i;
        this._clones = b, a(h).addClass("cloned").appendTo(this.$stage), a(i).addClass("cloned").prependTo(this.$stage)
    }
}, {
    filter: ["width", "items", "settings"],
    run: function() {
        for (var a = this.settings.rtl ? 1 : -1, b = this._clones.length + this._items.length, c = -1, d = 0, e = 0, f = []; ++c < b;) d = f[c - 1] || 0, e = this._widths[this.relative(c)] + this.settings.margin, f.push(d + e * a);
        this._coordinates = f
    }
}, {
    filter: ["width", "items", "settings"],
    run: function() {
        var a = this.settings.stagePadding,
            b = this._coordinates,
            c = {
                width: Math.ceil(Math.abs(b[b.length - 1])) + 2 * a,
                "padding-left": a || "",
                "padding-right": a || ""
            };
        this.$stage.css(c)
    }
}, {
    filter: ["width", "items", "settings"],
    run: function(a) {
        var b = this._coordinates.length,
            c = !this.settings.autoWidth,
            d = this.$stage.children();
        if (c && a.items.merge)
            for (; b--;) a.css.width = this._widths[this.relative(b)], d.eq(b).css(a.css);
        else c && (a.css.width = a.items.width, d.css(a.css))
    }
}, {
    filter: ["items"],
    run: function() {
        this._coordinates.length < 1 && this.$stage.removeAttr("style")
    }
}, {
    filter: ["width", "items", "settings"],
    run: function(a) {
        a.current = a.current ? this.$stage.children().index(a.current) : 0, a.current = Math.max(this.minimum(), Math.min(this.maximum(), a.current)), this.reset(a.current)
    }
}, {
    filter: ["position"],
    run: function() {
        this.animate(this.coordinates(this._current))
    }
}, {
    filter: ["width", "position", "items", "settings"],
    run: function() {
        var a, b, c, d, e = this.settings.rtl ? 1 : -1,
            f = 2 * this.settings.stagePadding,
            g = this.coordinates(this.current()) + f,
            h = g + this.width() * e,
            i = [];
        for (c = 0, d = this._coordinates.length; c < d; c++) a = this._coordinates[c - 1] || 0, b = Math.abs(this._coordinates[c]) + f * e, (this.op(a, "<=", g) && this.op(a, ">", h) || this.op(b, "<", g) && this.op(b, ">", h)) && i.push(c);
        this.$stage.children(".active").removeClass("active"), this.$stage.children(":eq(" + i.join("), :eq(") + ")").addClass("active"), this.settings.center && (this.$stage.children(".center").removeClass("center"), this.$stage.children().eq(this.current()).addClass("center"))
    }
}], e.prototype.initialize = function() {
    if (this.enter("initializing"), this.trigger("initialize"), this.$element.toggleClass(this.settings.rtlClass, this.settings.rtl), this.settings.autoWidth && !this.is("pre-loading")) {
        var b, c, e;
        b = this.$element.find("img"), c = this.settings.nestedItemSelector ? "." + this.settings.nestedItemSelector : d, e = this.$element.children(c).width(), b.length && e <= 0 && this.preloadAutoWidthImages(b)
    }
    this.$element.addClass(this.options.loadingClass), this.$stage = a("<" + this.settings.stageElement + ' class="' + this.settings.stageClass + '"/>').wrap('<div class="' + this.settings.stageOuterClass + '"/>'), this.$element.append(this.$stage.parent()), this.replace(this.$element.children().not(this.$stage.parent())), this.$element.is(":visible") ? this.refresh() : this.invalidate("width"), this.$element.removeClass(this.options.loadingClass).addClass(this.options.loadedClass), this.registerEventHandlers(), this.leave("initializing"), this.trigger("initialized")
}, e.prototype.setup = function() {
    var b = this.viewport(),
        c = this.options.responsive,
        d = -1,
        e = null;
    c ? (a.each(c, function(a) {
        a <= b && a > d && (d = Number(a))
    }), e = a.extend({}, this.options, c[d]), "function" == typeof e.stagePadding && (e.stagePadding = e.stagePadding()), delete e.responsive, e.responsiveClass && this.$element.attr("class", this.$element.attr("class").replace(new RegExp("(" + this.options.responsiveClass + "-)\\S+\\s", "g"), "$1" + d))) : e = a.extend({}, this.options), this.trigger("change", {
        property: {
            name: "settings",
            value: e
        }
    }), this._breakpoint = d, this.settings = e, this.invalidate("settings"), this.trigger("changed", {
        property: {
            name: "settings",
            value: this.settings
        }
    })
}, e.prototype.optionsLogic = function() {
    this.settings.autoWidth && (this.settings.stagePadding = !1, this.settings.merge = !1)
}, e.prototype.prepare = function(b) {
    var c = this.trigger("prepare", {
        content: b
    });
    return c.data || (c.data = a("<" + this.settings.itemElement + "/>").addClass(this.options.itemClass).append(b)), this.trigger("prepared", {
        content: c.data
    }), c.data
}, e.prototype.update = function() {
    for (var b = 0, c = this._pipe.length, d = a.proxy(function(a) {
            return this[a]
        }, this._invalidated), e = {}; b < c;)(this._invalidated.all || a.grep(this._pipe[b].filter, d).length > 0) && this._pipe[b].run(e), b++;
    this._invalidated = {}, !this.is("valid") && this.enter("valid")
}, e.prototype.width = function(a) {
    switch (a = a || e.Width.Default) {
        case e.Width.Inner:
        case e.Width.Outer:
            return this._width;
        default:
            return this._width - 2 * this.settings.stagePadding + this.settings.margin
    }
}, e.prototype.refresh = function() {
    this.enter("refreshing"), this.trigger("refresh"), this.setup(), this.optionsLogic(), this.$element.addClass(this.options.refreshClass), this.update(), this.$element.removeClass(this.options.refreshClass), this.leave("refreshing"), this.trigger("refreshed")
}, e.prototype.onThrottledResize = function() {
    b.clearTimeout(this.resizeTimer), this.resizeTimer = b.setTimeout(this._handlers.onResize, this.settings.responsiveRefreshRate)
}, e.prototype.onResize = function() {
    return !!this._items.length && (this._width !== this.$element.width() && (!!this.$element.is(":visible") && (this.enter("resizing"), this.trigger("resize").isDefaultPrevented() ? (this.leave("resizing"), !1) : (this.invalidate("width"), this.refresh(), this.leave("resizing"), void this.trigger("resized")))))
}, e.prototype.registerEventHandlers = function() {
    a.support.transition && this.$stage.on(a.support.transition.end + ".owl.core", a.proxy(this.onTransitionEnd, this)), this.settings.responsive !== !1 && this.on(b, "resize", this._handlers.onThrottledResize), this.settings.mouseDrag && (this.$element.addClass(this.options.dragClass), this.$stage.on("mousedown.owl.core", a.proxy(this.onDragStart, this)), this.$stage.on("dragstart.owl.core selectstart.owl.core", function() {
        return !1
    })), this.settings.touchDrag && (this.$stage.on("touchstart.owl.core", a.proxy(this.onDragStart, this)), this.$stage.on("touchcancel.owl.core", a.proxy(this.onDragEnd, this)))
}, e.prototype.onDragStart = function(b) {
    var d = null;
    3 !== b.which && (a.support.transform ? (d = this.$stage.css("transform").replace(/.*\(|\)| /g, "").split(","), d = {
        x: d[16 === d.length ? 12 : 4],
        y: d[16 === d.length ? 13 : 5]
    }) : (d = this.$stage.position(), d = {
        x: this.settings.rtl ? d.left + this.$stage.width() - this.width() + this.settings.margin : d.left,
        y: d.top
    }), this.is("animating") && (a.support.transform ? this.animate(d.x) : this.$stage.stop(), this.invalidate("position")), this.$element.toggleClass(this.options.grabClass, "mousedown" === b.type), this.speed(0), this._drag.time = (new Date).getTime(), this._drag.target = a(b.target), this._drag.stage.start = d, this._drag.stage.current = d, this._drag.pointer = this.pointer(b), a(c).on("mouseup.owl.core touchend.owl.core", a.proxy(this.onDragEnd, this)), a(c).one("mousemove.owl.core touchmove.owl.core", a.proxy(function(b) {
        var d = this.difference(this._drag.pointer, this.pointer(b));
        a(c).on("mousemove.owl.core touchmove.owl.core", a.proxy(this.onDragMove, this)), Math.abs(d.x) < Math.abs(d.y) && this.is("valid") || (b.preventDefault(), this.enter("dragging"), this.trigger("drag"))
    }, this)))
}, e.prototype.onDragMove = function(a) {
    var b = null,
        c = null,
        d = null,
        e = this.difference(this._drag.pointer, this.pointer(a)),
        f = this.difference(this._drag.stage.start, e);
    this.is("dragging") && (a.preventDefault(), this.settings.loop ? (b = this.coordinates(this.minimum()), c = this.coordinates(this.maximum() + 1) - b, f.x = ((f.x - b) % c + c) % c + b) : (b = this.settings.rtl ? this.coordinates(this.maximum()) : this.coordinates(this.minimum()), c = this.settings.rtl ? this.coordinates(this.minimum()) : this.coordinates(this.maximum()), d = this.settings.pullDrag ? -1 * e.x / 5 : 0, f.x = Math.max(Math.min(f.x, b + d), c + d)), this._drag.stage.current = f, this.animate(f.x))
}, e.prototype.onDragEnd = function(b) {
    var d = this.difference(this._drag.pointer, this.pointer(b)),
        e = this._drag.stage.current,
        f = d.x > 0 ^ this.settings.rtl ? "left" : "right";
    a(c).off(".owl.core"), this.$element.removeClass(this.options.grabClass), (0 !== d.x && this.is("dragging") || !this.is("valid")) && (this.speed(this.settings.dragEndSpeed || this.settings.smartSpeed), this.current(this.closest(e.x, 0 !== d.x ? f : this._drag.direction)), this.invalidate("position"), this.update(), this._drag.direction = f, (Math.abs(d.x) > 3 || (new Date).getTime() - this._drag.time > 300) && this._drag.target.one("click.owl.core", function() {
        return !1
    })), this.is("dragging") && (this.leave("dragging"), this.trigger("dragged"))
}, e.prototype.closest = function(b, c) {
    var d = -1,
        e = 30,
        f = this.width(),
        g = this.coordinates();
    return this.settings.freeDrag || a.each(g, a.proxy(function(a, h) {
        return "left" === c && b > h - e && b < h + e ? d = a : "right" === c && b > h - f - e && b < h - f + e ? d = a + 1 : this.op(b, "<", h) && this.op(b, ">", g[a + 1] || h - f) && (d = "left" === c ? a + 1 : a), d === -1
    }, this)), this.settings.loop || (this.op(b, ">", g[this.minimum()]) ? d = b = this.minimum() : this.op(b, "<", g[this.maximum()]) && (d = b = this.maximum())), d
}, e.prototype.animate = function(b) {
    var c = this.speed() > 0;
    this.is("animating") && this.onTransitionEnd(), c && (this.enter("animating"), this.trigger("translate")), a.support.transform3d && a.support.transition ? this.$stage.css({
        transform: "translate3d(" + b + "px,0px,0px)",
        transition: this.speed() / 1e3 + "s"
    }) : c ? this.$stage.animate({
        left: b + "px"
    }, this.speed(), this.settings.fallbackEasing, a.proxy(this.onTransitionEnd, this)) : this.$stage.css({
        left: b + "px"
    })
}, e.prototype.is = function(a) {
    return this._states.current[a] && this._states.current[a] > 0
}, e.prototype.current = function(a) {
    if (a === d) return this._current;
    if (0 === this._items.length) return d;
    if (a = this.normalize(a), this._current !== a) {
        var b = this.trigger("change", {
            property: {
                name: "position",
                value: a
            }
        });
        b.data !== d && (a = this.normalize(b.data)), this._current = a, this.invalidate("position"), this.trigger("changed", {
            property: {
                name: "position",
                value: this._current
            }
        })
    }
    return this._current
}, e.prototype.invalidate = function(b) {
    return "string" === a.type(b) && (this._invalidated[b] = !0, this.is("valid") && this.leave("valid")), a.map(this._invalidated, function(a, b) {
        return b
    })
}, e.prototype.reset = function(a) {
    a = this.normalize(a), a !== d && (this._speed = 0, this._current = a, this.suppress(["translate", "translated"]), this.animate(this.coordinates(a)), this.release(["translate", "translated"]))
}, e.prototype.normalize = function(a, b) {
    var c = this._items.length,
        e = b ? 0 : this._clones.length;
    return !this.isNumeric(a) || c < 1 ? a = d : (a < 0 || a >= c + e) && (a = ((a - e / 2) % c + c) % c + e / 2), a
}, e.prototype.relative = function(a) {
    return a -= this._clones.length / 2, this.normalize(a, !0)
}, e.prototype.maximum = function(a) {
    var b, c, d, e = this.settings,
        f = this._coordinates.length;
    if (e.loop) f = this._clones.length / 2 + this._items.length - 1;
    else if (e.autoWidth || e.merge) {
        for (b = this._items.length, c = this._items[--b].width(), d = this.$element.width(); b-- && (c += this._items[b].width() + this.settings.margin, !(c > d)););
        f = b + 1
    } else f = e.center ? this._items.length - 1 : this._items.length - e.items;
    return a && (f -= this._clones.length / 2), Math.max(f, 0)
}, e.prototype.minimum = function(a) {
    return a ? 0 : this._clones.length / 2
}, e.prototype.items = function(a) {
    return a === d ? this._items.slice() : (a = this.normalize(a, !0), this._items[a])
}, e.prototype.mergers = function(a) {
    return a === d ? this._mergers.slice() : (a = this.normalize(a, !0), this._mergers[a])
}, e.prototype.clones = function(b) {
    var c = this._clones.length / 2,
        e = c + this._items.length,
        f = function(a) {
            return a % 2 === 0 ? e + a / 2 : c - (a + 1) / 2
        };
    return b === d ? a.map(this._clones, function(a, b) {
        return f(b)
    }) : a.map(this._clones, function(a, c) {
        return a === b ? f(c) : null
    })
}, e.prototype.speed = function(a) {
    return a !== d && (this._speed = a), this._speed
}, e.prototype.coordinates = function(b) {
    var c, e = 1,
        f = b - 1;
    return b === d ? a.map(this._coordinates, a.proxy(function(a, b) {
        return this.coordinates(b)
    }, this)) : (this.settings.center ? (this.settings.rtl && (e = -1, f = b + 1), c = this._coordinates[b], c += (this.width() - c + (this._coordinates[f] || 0)) / 2 * e) : c = this._coordinates[f] || 0, c = Math.ceil(c))
}, e.prototype.duration = function(a, b, c) {
    return 0 === c ? 0 : Math.min(Math.max(Math.abs(b - a), 1), 6) * Math.abs(c || this.settings.smartSpeed)
}, e.prototype.to = function(a, b) {
    var c = this.current(),
        d = null,
        e = a - this.relative(c),
        f = (e > 0) - (e < 0),
        g = this._items.length,
        h = this.minimum(),
        i = this.maximum();
    this.settings.loop ? (!this.settings.rewind && Math.abs(e) > g / 2 && (e += f * -1 * g), a = c + e, d = ((a - h) % g + g) % g + h, d !== a && d - e <= i && d - e > 0 && (c = d - e, a = d, this.reset(c))) : this.settings.rewind ? (i += 1, a = (a % i + i) % i) : a = Math.max(h, Math.min(i, a)), this.speed(this.duration(c, a, b)), this.current(a), this.$element.is(":visible") && this.update()
}, e.prototype.next = function(a) {
    a = a || !1, this.to(this.relative(this.current()) + 1, a)
}, e.prototype.prev = function(a) {
    a = a || !1, this.to(this.relative(this.current()) - 1, a)
}, e.prototype.onTransitionEnd = function(a) {
    if (a !== d && (a.stopPropagation(), (a.target || a.srcElement || a.originalTarget) !== this.$stage.get(0))) return !1;
    this.leave("animating"), this.trigger("translated")
}, e.prototype.viewport = function() {
    var d;
    return this.options.responsiveBaseElement !== b ? d = a(this.options.responsiveBaseElement).width() : b.innerWidth ? d = b.innerWidth : c.documentElement && c.documentElement.clientWidth ? d = c.documentElement.clientWidth : console.warn("Can not detect viewport width."), d
}, e.prototype.replace = function(b) {
    this.$stage.empty(), this._items = [], b && (b = b instanceof jQuery ? b : a(b)), this.settings.nestedItemSelector && (b = b.find("." + this.settings.nestedItemSelector)), b.filter(function() {
        return 1 === this.nodeType
    }).each(a.proxy(function(a, b) {
        b = this.prepare(b), this.$stage.append(b), this._items.push(b), this._mergers.push(1 * b.find("[data-merge]").addBack("[data-merge]").attr("data-merge") || 1)
    }, this)), this.reset(this.isNumeric(this.settings.startPosition) ? this.settings.startPosition : 0), this.invalidate("items")
}, e.prototype.add = function(b, c) {
    var e = this.relative(this._current);
    c = c === d ? this._items.length : this.normalize(c, !0), b = b instanceof jQuery ? b : a(b), this.trigger("add", {
        content: b,
        position: c
    }), b = this.prepare(b), 0 === this._items.length || c === this._items.length ? (0 === this._items.length && this.$stage.append(b), 0 !== this._items.length && this._items[c - 1].after(b), this._items.push(b), this._mergers.push(1 * b.find("[data-merge]").addBack("[data-merge]").attr("data-merge") || 1)) : (this._items[c].before(b), this._items.splice(c, 0, b), this._mergers.splice(c, 0, 1 * b.find("[data-merge]").addBack("[data-merge]").attr("data-merge") || 1)), this._items[e] && this.reset(this._items[e].index()), this.invalidate("items"), this.trigger("added", {
        content: b,
        position: c
    })
}, e.prototype.remove = function(a) {
    a = this.normalize(a, !0), a !== d && (this.trigger("remove", {
        content: this._items[a],
        position: a
    }), this._items[a].remove(), this._items.splice(a, 1), this._mergers.splice(a, 1), this.invalidate("items"), this.trigger("removed", {
        content: null,
        position: a
    }))
}, e.prototype.preloadAutoWidthImages = function(b) {
    b.each(a.proxy(function(b, c) {
        this.enter("pre-loading"), c = a(c), a(new Image).one("load", a.proxy(function(a) {
            c.attr("src", a.target.src), c.css("opacity", 1), this.leave("pre-loading"), !this.is("pre-loading") && !this.is("initializing") && this.refresh()
        }, this)).attr("src", c.attr("src") || c.attr("data-src") || c.attr("data-src-retina"))
    }, this))
}, e.prototype.destroy = function() {
    this.$element.off(".owl.core"), this.$stage.off(".owl.core"), a(c).off(".owl.core"), this.settings.responsive !== !1 && (b.clearTimeout(this.resizeTimer), this.off(b, "resize", this._handlers.onThrottledResize));
    for (var d in this._plugins) this._plugins[d].destroy();
    this.$stage.children(".cloned").remove(), this.$stage.unwrap(), this.$stage.children().contents().unwrap(), this.$stage.children().unwrap(), this.$element.removeClass(this.options.refreshClass).removeClass(this.options.loadingClass).removeClass(this.options.loadedClass).removeClass(this.options.rtlClass).removeClass(this.options.dragClass).removeClass(this.options.grabClass).attr("class", this.$element.attr("class").replace(new RegExp(this.options.responsiveClass + "-\\S+\\s", "g"), "")).removeData("owl.carousel")
}, e.prototype.op = function(a, b, c) {
    var d = this.settings.rtl;
    switch (b) {
        case "<":
            return d ? a > c : a < c;
        case ">":
            return d ? a < c : a > c;
        case ">=":
            return d ? a <= c : a >= c;
        case "<=":
            return d ? a >= c : a <= c
    }
}, e.prototype.on = function(a, b, c, d) {
    a.addEventListener ? a.addEventListener(b, c, d) : a.attachEvent && a.attachEvent("on" + b, c)
}, e.prototype.off = function(a, b, c, d) {
    a.removeEventListener ? a.removeEventListener(b, c, d) : a.detachEvent && a.detachEvent("on" + b, c)
}, e.prototype.trigger = function(b, c, d, f, g) {
    var h = {
            item: {
                count: this._items.length,
                index: this.current()
            }
        },
        i = a.camelCase(a.grep(["on", b, d], function(a) {
            return a
        }).join("-").toLowerCase()),
        j = a.Event([b, "owl", d || "carousel"].join(".").toLowerCase(), a.extend({
            relatedTarget: this
        }, h, c));
    return this._supress[b] || (a.each(this._plugins, function(a, b) {
        b.onTrigger && b.onTrigger(j)
    }), this.register({
        type: e.Type.Event,
        name: b
    }), this.$element.trigger(j), this.settings && "function" == typeof this.settings[i] && this.settings[i].call(this, j)), j
}, e.prototype.enter = function(b) {
    a.each([b].concat(this._states.tags[b] || []), a.proxy(function(a, b) {
        this._states.current[b] === d && (this._states.current[b] = 0), this._states.current[b]++
    }, this))
}, e.prototype.leave = function(b) {
    a.each([b].concat(this._states.tags[b] || []), a.proxy(function(a, b) {
        this._states.current[b]--
    }, this))
}, e.prototype.register = function(b) {
    if (b.type === e.Type.Event) {
        if (a.event.special[b.name] || (a.event.special[b.name] = {}), !a.event.special[b.name].owl) {
            var c = a.event.special[b.name]._default;
            a.event.special[b.name]._default = function(a) {
                return !c || !c.apply || a.namespace && a.namespace.indexOf("owl") !== -1 ? a.namespace && a.namespace.indexOf("owl") > -1 : c.apply(this, arguments)
            }, a.event.special[b.name].owl = !0
        }
    } else b.type === e.Type.State && (this._states.tags[b.name] ? this._states.tags[b.name] = this._states.tags[b.name].concat(b.tags) : this._states.tags[b.name] = b.tags, this._states.tags[b.name] = a.grep(this._states.tags[b.name], a.proxy(function(c, d) {
        return a.inArray(c, this._states.tags[b.name]) === d
    }, this)))
}, e.prototype.suppress = function(b) {
    a.each(b, a.proxy(function(a, b) {
        this._supress[b] = !0
    }, this))
}, e.prototype.release = function(b) {
    a.each(b, a.proxy(function(a, b) {
        delete this._supress[b]
    }, this))
}, e.prototype.pointer = function(a) {
    var c = {
        x: null,
        y: null
    };
    return a = a.originalEvent || a || b.event, a = a.touches && a.touches.length ? a.touches[0] : a.changedTouches && a.changedTouches.length ? a.changedTouches[0] : a, a.pageX ? (c.x = a.pageX, c.y = a.pageY) : (c.x = a.clientX, c.y = a.clientY), c
}, e.prototype.isNumeric = function(a) {
    return !isNaN(parseFloat(a))
}, e.prototype.difference = function(a, b) {
    return {
        x: a.x - b.x,
        y: a.y - b.y
    }
}, a.fn.owlCarousel = function(b) {
    var c = Array.prototype.slice.call(arguments, 1);
    return this.each(function() {
        var d = a(this),
            f = d.data("owl.carousel");
        f || (f = new e(this, "object" == typeof b && b), d.data("owl.carousel", f), a.each(["next", "prev", "to", "destroy", "refresh", "replace", "add", "remove"], function(b, c) {
            f.register({
                type: e.Type.Event,
                name: c
            }), f.$element.on(c + ".owl.carousel.core", a.proxy(function(a) {
                a.namespace && a.relatedTarget !== this && (this.suppress([c]), f[c].apply(this, [].slice.call(arguments, 1)), this.release([c]))
            }, f))
        })), "string" == typeof b && "_" !== b.charAt(0) && f[b].apply(f, c)
    })
}, a.fn.owlCarousel.Constructor = e
}(window.Zepto || window.jQuery, window, document),
function(a, b, c, d) {
var e = function(b) {
    this._core = b, this._interval = null, this._visible = null, this._handlers = {
        "initialized.owl.carousel": a.proxy(function(a) {
            a.namespace && this._core.settings.autoRefresh && this.watch()
        }, this)
    }, this._core.options = a.extend({}, e.Defaults, this._core.options), this._core.$element.on(this._handlers)
};
e.Defaults = {
    autoRefresh: !0,
    autoRefreshInterval: 500
}, e.prototype.watch = function() {
    this._interval || (this._visible = this._core.$element.is(":visible"), this._interval = b.setInterval(a.proxy(this.refresh, this), this._core.settings.autoRefreshInterval))
}, e.prototype.refresh = function() {
    this._core.$element.is(":visible") !== this._visible && (this._visible = !this._visible, this._core.$element.toggleClass("owl-hidden", !this._visible), this._visible && this._core.invalidate("width") && this._core.refresh())
}, e.prototype.destroy = function() {
    var a, c;
    b.clearInterval(this._interval);
    for (a in this._handlers) this._core.$element.off(a, this._handlers[a]);
    for (c in Object.getOwnPropertyNames(this)) "function" != typeof this[c] && (this[c] = null)
}, a.fn.owlCarousel.Constructor.Plugins.AutoRefresh = e
}(window.Zepto || window.jQuery, window, document),
function(a, b, c, d) {
var e = function(b) {
    this._core = b, this._loaded = [], this._handlers = {
        "initialized.owl.carousel change.owl.carousel resized.owl.carousel": a.proxy(function(b) {
            if (b.namespace && this._core.settings && this._core.settings.lazyLoad && (b.property && "position" == b.property.name || "initialized" == b.type))
                for (var c = this._core.settings, e = c.center && Math.ceil(c.items / 2) || c.items, f = c.center && e * -1 || 0, g = (b.property && b.property.value !== d ? b.property.value : this._core.current()) + f, h = this._core.clones().length, i = a.proxy(function(a, b) {
                        this.load(b)
                    }, this); f++ < e;) this.load(h / 2 + this._core.relative(g)), h && a.each(this._core.clones(this._core.relative(g)), i), g++
        }, this)
    }, this._core.options = a.extend({}, e.Defaults, this._core.options), this._core.$element.on(this._handlers)
};
e.Defaults = {
    lazyLoad: !1
}, e.prototype.load = function(c) {
    var d = this._core.$stage.children().eq(c),
        e = d && d.find(".owl-lazy");
    !e || a.inArray(d.get(0), this._loaded) > -1 || (e.each(a.proxy(function(c, d) {
        var e, f = a(d),
            g = b.devicePixelRatio > 1 && f.attr("data-src-retina") || f.attr("data-src");
        this._core.trigger("load", {
            element: f,
            url: g
        }, "lazy"), f.is("img") ? f.one("load.owl.lazy", a.proxy(function() {
            f.css("opacity", 1), this._core.trigger("loaded", {
                element: f,
                url: g
            }, "lazy")
        }, this)).attr("src", g) : (e = new Image, e.onload = a.proxy(function() {
            f.css({
                "background-image": 'url("' + g + '")',
                opacity: "1"
            }), this._core.trigger("loaded", {
                element: f,
                url: g
            }, "lazy")
        }, this), e.src = g)
    }, this)), this._loaded.push(d.get(0)))
}, e.prototype.destroy = function() {
    var a, b;
    for (a in this.handlers) this._core.$element.off(a, this.handlers[a]);
    for (b in Object.getOwnPropertyNames(this)) "function" != typeof this[b] && (this[b] = null)
}, a.fn.owlCarousel.Constructor.Plugins.Lazy = e
}(window.Zepto || window.jQuery, window, document),
function(a, b, c, d) {
var e = function(b) {
    this._core = b, this._handlers = {
        "initialized.owl.carousel refreshed.owl.carousel": a.proxy(function(a) {
            a.namespace && this._core.settings.autoHeight && this.update()
        }, this),
        "changed.owl.carousel": a.proxy(function(a) {
            a.namespace && this._core.settings.autoHeight && "position" == a.property.name && this.update()
        }, this),
        "loaded.owl.lazy": a.proxy(function(a) {
            a.namespace && this._core.settings.autoHeight && a.element.closest("." + this._core.settings.itemClass).index() === this._core.current() && this.update()
        }, this)
    }, this._core.options = a.extend({}, e.Defaults, this._core.options), this._core.$element.on(this._handlers)
};
e.Defaults = {
    autoHeight: !1,
    autoHeightClass: "owl-height"
}, e.prototype.update = function() {
    var b = this._core._current,
        c = b + this._core.settings.items,
        d = this._core.$stage.children().toArray().slice(b, c),
        e = [],
        f = 0;
    a.each(d, function(b, c) {
        e.push(a(c).height())
    }), f = Math.max.apply(null, e), this._core.$stage.parent().height(f).addClass(this._core.settings.autoHeightClass)
}, e.prototype.destroy = function() {
    var a, b;
    for (a in this._handlers) this._core.$element.off(a, this._handlers[a]);
    for (b in Object.getOwnPropertyNames(this)) "function" != typeof this[b] && (this[b] = null)
}, a.fn.owlCarousel.Constructor.Plugins.AutoHeight = e
}(window.Zepto || window.jQuery, window, document),
function(a, b, c, d) {
var e = function(b) {
    this._core = b, this._videos = {}, this._playing = null, this._handlers = {
        "initialized.owl.carousel": a.proxy(function(a) {
            a.namespace && this._core.register({
                type: "state",
                name: "playing",
                tags: ["interacting"]
            })
        }, this),
        "resize.owl.carousel": a.proxy(function(a) {
            a.namespace && this._core.settings.video && this.isInFullScreen() && a.preventDefault()
        }, this),
        "refreshed.owl.carousel": a.proxy(function(a) {
            a.namespace && this._core.is("resizing") && this._core.$stage.find(".cloned .owl-video-frame").remove()
        }, this),
        "changed.owl.carousel": a.proxy(function(a) {
            a.namespace && "position" === a.property.name && this._playing && this.stop()
        }, this),
        "prepared.owl.carousel": a.proxy(function(b) {
            if (b.namespace) {
                var c = a(b.content).find(".owl-video");
                c.length && (c.css("display", "none"), this.fetch(c, a(b.content)))
            }
        }, this)
    }, this._core.options = a.extend({}, e.Defaults, this._core.options), this._core.$element.on(this._handlers), this._core.$element.on("click.owl.video", ".owl-video-play-icon", a.proxy(function(a) {
        this.play(a)
    }, this))
};
e.Defaults = {
    video: !1,
    videoHeight: !1,
    videoWidth: !1
}, e.prototype.fetch = function(a, b) {
    var c = function() {
            return a.attr("data-vimeo-id") ? "vimeo" : a.attr("data-vzaar-id") ? "vzaar" : "youtube"
        }(),
        d = a.attr("data-vimeo-id") || a.attr("data-youtube-id") || a.attr("data-vzaar-id"),
        e = a.attr("data-width") || this._core.settings.videoWidth,
        f = a.attr("data-height") || this._core.settings.videoHeight,
        g = a.attr("href");
    if (!g) throw new Error("Missing video URL.");
    if (d = g.match(/(http:|https:|)\/\/(player.|www.|app.)?(vimeo\.com|youtu(be\.com|\.be|be\.googleapis\.com)|vzaar\.com)\/(video\/|videos\/|embed\/|channels\/.+\/|groups\/.+\/|watch\?v=|v\/)?([A-Za-z0-9._%-]*)(\&\S+)?/), d[3].indexOf("youtu") > -1) c = "youtube";
    else if (d[3].indexOf("vimeo") > -1) c = "vimeo";
    else {
        if (!(d[3].indexOf("vzaar") > -1)) throw new Error("Video URL not supported.");
        c = "vzaar"
    }
    d = d[6], this._videos[g] = {
        type: c,
        id: d,
        width: e,
        height: f
    }, b.attr("data-video", g), this.thumbnail(a, this._videos[g])
}, e.prototype.thumbnail = function(b, c) {
    var d, e, f, g = c.width && c.height ? 'style="width:' + c.width + "px;height:" + c.height + 'px;"' : "",
        h = b.find("img"),
        i = "src",
        j = "",
        k = this._core.settings,
        l = function(a) {
            e = '<div class="owl-video-play-icon"></div>', d = k.lazyLoad ? '<div class="owl-video-tn ' + j + '" ' + i + '="' + a + '"></div>' : '<div class="owl-video-tn" style="opacity:1;background-image:url(' + a + ')"></div>', b.after(d), b.after(e)
        };
    if (b.wrap('<div class="owl-video-wrapper"' + g + "></div>"), this._core.settings.lazyLoad && (i = "data-src", j = "owl-lazy"), h.length) return l(h.attr(i)), h.remove(), !1;
    "youtube" === c.type ? (f = "//img.youtube.com/vi/" + c.id + "/hqdefault.jpg", l(f)) : "vimeo" === c.type ? a.ajax({
        type: "GET",
        url: "//vimeo.com/api/v2/video/" + c.id + ".json",
        jsonp: "callback",
        dataType: "jsonp",
        success: function(a) {
            f = a[0].thumbnail_large, l(f)
        }
    }) : "vzaar" === c.type && a.ajax({
        type: "GET",
        url: "//vzaar.com/api/videos/" + c.id + ".json",
        jsonp: "callback",
        dataType: "jsonp",
        success: function(a) {
            f = a.framegrab_url, l(f)
        }
    })
}, e.prototype.stop = function() {
    this._core.trigger("stop", null, "video"), this._playing.find(".owl-video-frame").remove(), this._playing.removeClass("owl-video-playing"), this._playing = null, this._core.leave("playing"), this._core.trigger("stopped", null, "video")
}, e.prototype.play = function(b) {
    var c, d = a(b.target),
        e = d.closest("." + this._core.settings.itemClass),
        f = this._videos[e.attr("data-video")],
        g = f.width || "100%",
        h = f.height || this._core.$stage.height();
    this._playing || (this._core.enter("playing"), this._core.trigger("play", null, "video"), e = this._core.items(this._core.relative(e.index())), this._core.reset(e.index()), "youtube" === f.type ? c = '<iframe width="' + g + '" height="' + h + '" src="//www.youtube.com/embed/' + f.id + "?autoplay=1&rel=0&v=" + f.id + '" frameborder="0" allowfullscreen></iframe>' : "vimeo" === f.type ? c = '<iframe src="//player.vimeo.com/video/' + f.id + '?autoplay=1" width="' + g + '" height="' + h + '" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe>' : "vzaar" === f.type && (c = '<iframe frameborder="0"height="' + h + '"width="' + g + '" allowfullscreen mozallowfullscreen webkitAllowFullScreen src="//view.vzaar.com/' + f.id + '/player?autoplay=true"></iframe>'), a('<div class="owl-video-frame">' + c + "</div>").insertAfter(e.find(".owl-video")), this._playing = e.addClass("owl-video-playing"))
}, e.prototype.isInFullScreen = function() {
    var b = c.fullscreenElement || c.mozFullScreenElement || c.webkitFullscreenElement;
    return b && a(b).parent().hasClass("owl-video-frame")
}, e.prototype.destroy = function() {
    var a, b;
    this._core.$element.off("click.owl.video");
    for (a in this._handlers) this._core.$element.off(a, this._handlers[a]);
    for (b in Object.getOwnPropertyNames(this)) "function" != typeof this[b] && (this[b] = null)
}, a.fn.owlCarousel.Constructor.Plugins.Video = e
}(window.Zepto || window.jQuery, window, document),
function(a, b, c, d) {
var e = function(b) {
    this.core = b, this.core.options = a.extend({}, e.Defaults, this.core.options), this.swapping = !0, this.previous = d, this.next = d, this.handlers = {
        "change.owl.carousel": a.proxy(function(a) {
            a.namespace && "position" == a.property.name && (this.previous = this.core.current(), this.next = a.property.value)
        }, this),
        "drag.owl.carousel dragged.owl.carousel translated.owl.carousel": a.proxy(function(a) {
            a.namespace && (this.swapping = "translated" == a.type)
        }, this),
        "translate.owl.carousel": a.proxy(function(a) {
            a.namespace && this.swapping && (this.core.options.animateOut || this.core.options.animateIn) && this.swap()
        }, this)
    }, this.core.$element.on(this.handlers)
};
e.Defaults = {
        animateOut: !1,
        animateIn: !1
    }, e.prototype.swap = function() {
        if (1 === this.core.settings.items && a.support.animation && a.support.transition) {
            this.core.speed(0);
            var b, c = a.proxy(this.clear, this),
                d = this.core.$stage.children().eq(this.previous),
                e = this.core.$stage.children().eq(this.next),
                f = this.core.settings.animateIn,
                g = this.core.settings.animateOut;
            this.core.current() !== this.previous && (g && (b = this.core.coordinates(this.previous) - this.core.coordinates(this.next), d.one(a.support.animation.end, c).css({
                left: b + "px"
            }).addClass("animated owl-animated-out").addClass(g)), f && e.one(a.support.animation.end, c).addClass("animated owl-animated-in").addClass(f))
        }
    }, e.prototype.clear = function(b) {
        a(b.target).css({
            left: ""
        }).removeClass("animated owl-animated-out owl-animated-in").removeClass(this.core.settings.animateIn).removeClass(this.core.settings.animateOut), this.core.onTransitionEnd()
    }, e.prototype.destroy = function() {
        var a, b;
        for (a in this.handlers) this.core.$element.off(a, this.handlers[a]);
        for (b in Object.getOwnPropertyNames(this)) "function" != typeof this[b] && (this[b] = null)
    },
    a.fn.owlCarousel.Constructor.Plugins.Animate = e
}(window.Zepto || window.jQuery, window, document),
function(a, b, c, d) {
var e = function(b) {
    this._core = b, this._timeout = null, this._paused = !1, this._handlers = {
        "changed.owl.carousel": a.proxy(function(a) {
            a.namespace && "settings" === a.property.name ? this._core.settings.autoplay ? this.play() : this.stop() : a.namespace && "position" === a.property.name && this._core.settings.autoplay && this._setAutoPlayInterval()
        }, this),
        "initialized.owl.carousel": a.proxy(function(a) {
            a.namespace && this._core.settings.autoplay && this.play()
        }, this),
        "play.owl.autoplay": a.proxy(function(a, b, c) {
            a.namespace && this.play(b, c)
        }, this),
        "stop.owl.autoplay": a.proxy(function(a) {
            a.namespace && this.stop()
        }, this),
        "mouseover.owl.autoplay": a.proxy(function() {
            this._core.settings.autoplayHoverPause && this._core.is("rotating") && this.pause()
        }, this),
        "mouseleave.owl.autoplay": a.proxy(function() {
            this._core.settings.autoplayHoverPause && this._core.is("rotating") && this.play()
        }, this),
        "touchstart.owl.core": a.proxy(function() {
            this._core.settings.autoplayHoverPause && this._core.is("rotating") && this.pause()
        }, this),
        "touchend.owl.core": a.proxy(function() {
            this._core.settings.autoplayHoverPause && this.play()
        }, this)
    }, this._core.$element.on(this._handlers), this._core.options = a.extend({}, e.Defaults, this._core.options)
};
e.Defaults = {
    autoplay: !1,
    autoplayTimeout: 5e3,
    autoplayHoverPause: !1,
    autoplaySpeed: !1
}, e.prototype.play = function(a, b) {
    this._paused = !1, this._core.is("rotating") || (this._core.enter("rotating"), this._setAutoPlayInterval())
}, e.prototype._getNextTimeout = function(d, e) {
    return this._timeout && b.clearTimeout(this._timeout), b.setTimeout(a.proxy(function() {
        this._paused || this._core.is("busy") || this._core.is("interacting") || c.hidden || this._core.next(e || this._core.settings.autoplaySpeed)
    }, this), d || this._core.settings.autoplayTimeout)
}, e.prototype._setAutoPlayInterval = function() {
    this._timeout = this._getNextTimeout()
}, e.prototype.stop = function() {
    this._core.is("rotating") && (b.clearTimeout(this._timeout), this._core.leave("rotating"))
}, e.prototype.pause = function() {
    this._core.is("rotating") && (this._paused = !0)
}, e.prototype.destroy = function() {
    var a, b;
    this.stop();
    for (a in this._handlers) this._core.$element.off(a, this._handlers[a]);
    for (b in Object.getOwnPropertyNames(this)) "function" != typeof this[b] && (this[b] = null)
}, a.fn.owlCarousel.Constructor.Plugins.autoplay = e
}(window.Zepto || window.jQuery, window, document),
function(a, b, c, d) {
"use strict";
var e = function(b) {
    this._core = b, this._initialized = !1, this._pages = [], this._controls = {}, this._templates = [], this.$element = this._core.$element, this._overrides = {
        next: this._core.next,
        prev: this._core.prev,
        to: this._core.to
    }, this._handlers = {
        "prepared.owl.carousel": a.proxy(function(b) {
            b.namespace && this._core.settings.dotsData && this._templates.push('<div class="' + this._core.settings.dotClass + '">' + a(b.content).find("[data-dot]").addBack("[data-dot]").attr("data-dot") + "</div>")
        }, this),
        "added.owl.carousel": a.proxy(function(a) {
            a.namespace && this._core.settings.dotsData && this._templates.splice(a.position, 0, this._templates.pop())
        }, this),
        "remove.owl.carousel": a.proxy(function(a) {
            a.namespace && this._core.settings.dotsData && this._templates.splice(a.position, 1)
        }, this),
        "changed.owl.carousel": a.proxy(function(a) {
            a.namespace && "position" == a.property.name && this.draw()
        }, this),
        "initialized.owl.carousel": a.proxy(function(a) {
            a.namespace && !this._initialized && (this._core.trigger("initialize", null, "navigation"), this.initialize(), this.update(), this.draw(), this._initialized = !0, this._core.trigger("initialized", null, "navigation"))
        }, this),
        "refreshed.owl.carousel": a.proxy(function(a) {
            a.namespace && this._initialized && (this._core.trigger("refresh", null, "navigation"), this.update(), this.draw(), this._core.trigger("refreshed", null, "navigation"))
        }, this)
    }, this._core.options = a.extend({}, e.Defaults, this._core.options), this.$element.on(this._handlers)
};
e.Defaults = {
    nav: !1,
    navText: ["prev", "next"],
    navSpeed: !1,
    navElement: "div",
    navContainer: !1,
    navContainerClass: "owl-nav",
    navClass: ["owl-prev", "owl-next"],
    slideBy: 1,
    dotClass: "owl-dot",
    dotsClass: "owl-dots",
    dots: !0,
    dotsEach: !1,
    dotsData: !1,
    dotsSpeed: !1,
    dotsContainer: !1
}, e.prototype.initialize = function() {
    var b, c = this._core.settings;
    this._controls.$relative = (c.navContainer ? a(c.navContainer) : a("<div>").addClass(c.navContainerClass).appendTo(this.$element)).addClass("disabled"), this._controls.$previous = a("<" + c.navElement + ">").addClass(c.navClass[0]).html(c.navText[0]).prependTo(this._controls.$relative).on("click", a.proxy(function(a) {
        this.prev(c.navSpeed)
    }, this)), this._controls.$next = a("<" + c.navElement + ">").addClass(c.navClass[1]).html(c.navText[1]).appendTo(this._controls.$relative).on("click", a.proxy(function(a) {
        this.next(c.navSpeed)
    }, this)), c.dotsData || (this._templates = [a("<div>").addClass(c.dotClass).append(a("<span>")).prop("outerHTML")]), this._controls.$absolute = (c.dotsContainer ? a(c.dotsContainer) : a("<div>").addClass(c.dotsClass).appendTo(this.$element)).addClass("disabled"), this._controls.$absolute.on("click", "div", a.proxy(function(b) {
        var d = a(b.target).parent().is(this._controls.$absolute) ? a(b.target).index() : a(b.target).parent().index();
        b.preventDefault(), this.to(d, c.dotsSpeed)
    }, this));
    for (b in this._overrides) this._core[b] = a.proxy(this[b], this)
}, e.prototype.destroy = function() {
    var a, b, c, d;
    for (a in this._handlers) this.$element.off(a, this._handlers[a]);
    for (b in this._controls) this._controls[b].remove();
    for (d in this.overides) this._core[d] = this._overrides[d];
    for (c in Object.getOwnPropertyNames(this)) "function" != typeof this[c] && (this[c] = null)
}, e.prototype.update = function() {
    var a, b, c, d = this._core.clones().length / 2,
        e = d + this._core.items().length,
        f = this._core.maximum(!0),
        g = this._core.settings,
        h = g.center || g.autoWidth || g.dotsData ? 1 : g.dotsEach || g.items;
    if ("page" !== g.slideBy && (g.slideBy = Math.min(g.slideBy, g.items)), g.dots || "page" == g.slideBy)
        for (this._pages = [], a = d, b = 0, c = 0; a < e; a++) {
            if (b >= h || 0 === b) {
                if (this._pages.push({
                        start: Math.min(f, a - d),
                        end: a - d + h - 1
                    }), Math.min(f, a - d) === f) break;
                b = 0, ++c
            }
            b += this._core.mergers(this._core.relative(a))
        }
}, e.prototype.draw = function() {
    var b, c = this._core.settings,
        d = this._core.items().length <= c.items,
        e = this._core.relative(this._core.current()),
        f = c.loop || c.rewind;
    this._controls.$relative.toggleClass("disabled", !c.nav || d), c.nav && (this._controls.$previous.toggleClass("disabled", !f && e <= this._core.minimum(!0)), this._controls.$next.toggleClass("disabled", !f && e >= this._core.maximum(!0))), this._controls.$absolute.toggleClass("disabled", !c.dots || d), c.dots && (b = this._pages.length - this._controls.$absolute.children().length, c.dotsData && 0 !== b ? this._controls.$absolute.html(this._templates.join("")) : b > 0 ? this._controls.$absolute.append(new Array(b + 1).join(this._templates[0])) : b < 0 && this._controls.$absolute.children().slice(b).remove(), this._controls.$absolute.find(".active").removeClass("active"), this._controls.$absolute.children().eq(a.inArray(this.current(), this._pages)).addClass("active"))
}, e.prototype.onTrigger = function(b) {
    var c = this._core.settings;
    b.page = {
        index: a.inArray(this.current(), this._pages),
        count: this._pages.length,
        size: c && (c.center || c.autoWidth || c.dotsData ? 1 : c.dotsEach || c.items)
    }
}, e.prototype.current = function() {
    var b = this._core.relative(this._core.current());
    return a.grep(this._pages, a.proxy(function(a, c) {
        return a.start <= b && a.end >= b
    }, this)).pop()
}, e.prototype.getPosition = function(b) {
    var c, d, e = this._core.settings;
    return "page" == e.slideBy ? (c = a.inArray(this.current(), this._pages), d = this._pages.length, b ? ++c : --c, c = this._pages[(c % d + d) % d].start) : (c = this._core.relative(this._core.current()), d = this._core.items().length, b ? c += e.slideBy : c -= e.slideBy), c
}, e.prototype.next = function(b) {
    a.proxy(this._overrides.to, this._core)(this.getPosition(!0), b)
}, e.prototype.prev = function(b) {
    a.proxy(this._overrides.to, this._core)(this.getPosition(!1), b)
}, e.prototype.to = function(b, c, d) {
    var e;
    !d && this._pages.length ? (e = this._pages.length, a.proxy(this._overrides.to, this._core)(this._pages[(b % e + e) % e].start, c)) : a.proxy(this._overrides.to, this._core)(b, c)
}, a.fn.owlCarousel.Constructor.Plugins.Navigation = e
}(window.Zepto || window.jQuery, window, document),
function(a, b, c, d) {
"use strict";
var e = function(c) {
    this._core = c, this._hashes = {}, this.$element = this._core.$element, this._handlers = {
        "initialized.owl.carousel": a.proxy(function(c) {
            c.namespace && "URLHash" === this._core.settings.startPosition && a(b).trigger("hashchange.owl.navigation")
        }, this),
        "prepared.owl.carousel": a.proxy(function(b) {
            if (b.namespace) {
                var c = a(b.content).find("[data-hash]").addBack("[data-hash]").attr("data-hash");
                if (!c) return;
                this._hashes[c] = b.content
            }
        }, this),
        "changed.owl.carousel": a.proxy(function(c) {
            if (c.namespace && "position" === c.property.name) {
                var d = this._core.items(this._core.relative(this._core.current())),
                    e = a.map(this._hashes, function(a, b) {
                        return a === d ? b : null
                    }).join();
                if (!e || b.location.hash.slice(1) === e) return;
                b.location.hash = e
            }
        }, this)
    }, this._core.options = a.extend({}, e.Defaults, this._core.options), this.$element.on(this._handlers), a(b).on("hashchange.owl.navigation", a.proxy(function(a) {
        var c = b.location.hash.substring(1),
            e = this._core.$stage.children(),
            f = this._hashes[c] && e.index(this._hashes[c]);
        f !== d && f !== this._core.current() && this._core.to(this._core.relative(f), !1, !0)
    }, this))
};
e.Defaults = {
    URLhashListener: !1
}, e.prototype.destroy = function() {
    var c, d;
    a(b).off("hashchange.owl.navigation");
    for (c in this._handlers) this._core.$element.off(c, this._handlers[c]);
    for (d in Object.getOwnPropertyNames(this)) "function" != typeof this[d] && (this[d] = null)
}, a.fn.owlCarousel.Constructor.Plugins.Hash = e
}(window.Zepto || window.jQuery, window, document),
function(a, b, c, d) {
function e(b, c) {
    var e = !1,
        f = b.charAt(0).toUpperCase() + b.slice(1);
    return a.each((b + " " + h.join(f + " ") + f).split(" "), function(a, b) {
        if (g[b] !== d) return e = !c || b, !1
    }), e
}

function f(a) {
    return e(a, !0)
}
var g = a("<support>").get(0).style,
    h = "Webkit Moz O ms".split(" "),
    i = {
        transition: {
            end: {
                WebkitTransition: "webkitTransitionEnd",
                MozTransition: "transitionend",
                OTransition: "oTransitionEnd",
                transition: "transitionend"
            }
        },
        animation: {
            end: {
                WebkitAnimation: "webkitAnimationEnd",
                MozAnimation: "animationend",
                OAnimation: "oAnimationEnd",
                animation: "animationend"
            }
        }
    },
    j = {
        csstransforms: function() {
            return !!e("transform")
        },
        csstransforms3d: function() {
            return !!e("perspective")
        },
        csstransitions: function() {
            return !!e("transition")
        },
        cssanimations: function() {
            return !!e("animation")
        }
    };
j.csstransitions() && (a.support.transition = new String(f("transition")), a.support.transition.end = i.transition.end[a.support.transition]), j.cssanimations() && (a.support.animation = new String(f("animation")), a.support.animation.end = i.animation.end[a.support.animation]), j.csstransforms() && (a.support.transform = new String(f("transform")), a.support.transform3d = j.csstransforms3d())
}(window.Zepto || window.jQuery, window, document);
! function(e, t) {
"object" == typeof exports && "undefined" != typeof module ? module.exports = t() : "function" == typeof define && define.amd ? define(t) : e.lazyframe = t()
}(this, function() {
"use strict";
var e = Object.assign || function(e) {
        for (var t = 1; t < arguments.length; t++) {
            var n = arguments[t];
            for (var i in n) Object.prototype.hasOwnProperty.call(n, i) && (e[i] = n[i])
        }
        return e
    },
    t = function() {
        function t(t) {
            if (d = e({}, m, arguments.length <= 1 ? void 0 : arguments[1]), "string" == typeof t)
                for (var i = document.querySelectorAll(t), r = 0; r < i.length; r++) n(i[r]);
            else if ("undefined" == typeof t.length) n(t);
            else if (t.length > 1)
                for (var o = 0; o < t.length; o++) n(t[o]);
            else n(t[0]);
            d.lazyload && u()
        }

        function n(e) {
            var t = this;
            if (e instanceof HTMLElement != !1 && !e.classList.contains("lazyframe--loaded")) {
                var n = {
                    el: e,
                    settings: i(e)
                };
                n.el.addEventListener("click", function() {
                    n.el.appendChild(n.iframe);
                    var i = e.querySelectorAll("iframe");
                    n.settings.onAppend.call(t, i[0])
                }), d.lazyload ? l(n) : a(n, !!n.settings.thumbnail)
            }
        }

        function i(t) {
            var n = Array.prototype.slice.apply(t.attributes).filter(function(e) {
                    return "" !== e.value
                }).reduce(function(e, t) {
                    var n = 0 === t.name.indexOf("data-") ? t.name.split("data-")[1] : t.name;
                    return e[n] = t.value, e
                }, {}),
                i = e({}, d, n, {
                    y: t.offsetTop,
                    parameters: r(n.src)
                });
            if (i.vendor) {
                var o = i.src.match(v.regex[i.vendor]);
                i.id = v.condition[i.vendor](o)
            }
            return i
        }

        function r(e) {
            var t = e.split("?");
            if (t[1]) {
                t = t[1];
                var n = t.indexOf("autoplay") !== -1;
                return n ? t : t + "&autoplay=1"
            }
            return "autoplay=1"
        }

        function o(e) {
            return !!e.vendor && ((!e.title || !e.thumbnail) && ("youtube" !== e.vendor || !!e.apikey))
        }

        function a(e) {
            var t = this;
            o(e.settings) ? s(e, function(n, i) {
                if (!n) {
                    var r = i[0],
                        o = i[1];
                    if (o.settings.title || (o.settings.title = v.response[o.settings.vendor].title(r)), !o.settings.thumbnail) {
                        var a = v.response[o.settings.vendor].thumbnail(r);
                        o.settings.thumbnail = a, e.settings.onThumbnailLoad.call(t, a)
                    }
                    l(o, !0)
                }
            }) : l(e, !0)
        }

        function s(e, t) {
            var n = v.endpoints[e.settings.vendor](e.settings),
                i = new XMLHttpRequest;
            i.open("GET", n, !0), i.onload = function() {
                if (i.status >= 200 && i.status < 400) {
                    var n = JSON.parse(i.responseText);
                    t(null, [n, e])
                } else t(!0)
            }, i.onerror = function() {
                t(!0)
            }, i.send()
        }

        function u() {
            function e(e, t, n) {
                var i = void 0;
                return function() {
                    var r = this,
                        o = arguments,
                        a = function() {
                            i = null, n || e.apply(r, o)
                        },
                        s = n && !i;
                    clearTimeout(i), i = setTimeout(a, t), s && e.apply(r, o)
                }
            }
            var t = this,
                n = window.innerHeight,
                i = f.length,
                r = function(e, n) {
                    e.settings.initialized = !0, e.el.classList.add("lazyframe--loaded"), i--, a(e), e.settings.initinview && e.el.click(), e.settings.onLoad.call(t, e)
                };
            f.filter(function(e) {
                return e.settings.y < n
            }).forEach(r);
            var o = e(function() {
                    u = s < window.scrollY, s = window.scrollY, u && f.filter(function(e) {
                        return e.settings.y < n + s && e.settings.initialized === !1
                    }).forEach(r), 0 === i && window.removeEventListener("scroll", o, !1)
                }, d.debounce),
                s = 0,
                u = !1;
            window.addEventListener("scroll", o, !1)
        }

        function l(e, t) {
            if (e.iframe = c(e.settings), e.settings.thumbnail && t && (e.el.style.backgroundImage = "url(" + e.settings.thumbnail + ")"), e.settings.title && 0 === e.el.children.length) {
                var n = document.createDocumentFragment(),
                    i = document.createElement("span");
                i.className = "lazyframe__title", i.innerHTML = e.settings.title, n.appendChild(i), e.el.appendChild(n)
            }
            d.lazyload || (e.el.classList.add("lazyframe--loaded"), e.settings.onLoad.call(this, e), f.push(e)), e.settings.initialized || f.push(e)
        }

        function c(e) {
            var t = document.createDocumentFragment(),
                n = document.createElement("iframe");
            if (e.vendor && (e.src = v.src[e.vendor](e)), n.setAttribute("id", "lazyframe-" + e.id), n.setAttribute("src", e.src), n.setAttribute("frameborder", 0), n.setAttribute("allowfullscreen", ""), "vine" === e.vendor) {
                var i = document.createElement("script");
                i.setAttribute("src", "https://platform.vine.co/static/scripts/embed.js"), t.appendChild(i)
            }
            return t.appendChild(n), t
        }
        var d = void 0,
            f = [],
            m = {
                vendor: void 0,
                id: void 0,
                src: void 0,
                thumbnail: void 0,
                title: void 0,
                apikey: void 0,
                initialized: !1,
                parameters: void 0,
                y: void 0,
                debounce: 250,
                lazyload: !0,
                initinview: !1,
                onLoad: function(e) {},
                onAppend: function(e) {},
                onThumbnailLoad: function(e) {}
            },
            v = {
                regex: {
                    youtube: /(?:youtube\.com\/\S*(?:(?:\/e(?:mbed))?\/|watch\?(?:\S*?&?v\=))|youtu\.be\/)([a-zA-Z0-9_-]{6,11})/,
                    vimeo: /vimeo\.com\/(?:video\/)?([0-9]*)(?:\?|)/,
                    vine: /vine.co\/v\/(.*)/
                },
                condition: {
                    youtube: function(e) {
                        return !(!e || 11 != e[1].length) && e[1]
                    },
                    vimeo: function(e) {
                        return !!(e && 9 === e[1].length || 8 === e[1].length) && e[1]
                    },
                    vine: function(e) {
                        return !(!e || 11 !== e[1].length) && e[1]
                    }
                },
                src: {
                    youtube: function(e) {
                        return "https://www.youtube.com/embed/" + e.id + "/?" + e.parameters
                    },
                    vimeo: function(e) {
                        return "https://player.vimeo.com/video/" + e.id + "/?" + e.parameters
                    },
                    vine: function(e) {
                        return "https://vine.co/v/" + e.id + "/embed/simple"
                    }
                },
                endpoints: {
                    youtube: function(e) {
                        return "https://www.googleapis.com/youtube/v3/videos?id=" + e.id + "&key=" + e.apikey + "&fields=items(snippet(title,thumbnails))&part=snippet"
                    },
                    vimeo: function(e) {
                        return "https://vimeo.com/api/oembed.json?url=https%3A//vimeo.com/" + e.id
                    },
                    vine: function(e) {
                        return "https://vine.co/oembed.json?url=https%3A%2F%2Fvine.co%2Fv%2F" + e.id
                    }
                },
                response: {
                    youtube: {
                        title: function(e) {
                            return e.items[0].snippet.title
                        },
                        thumbnail: function(e) {
                            var t = e.items[0].snippet.thumbnails,
                                n = t.maxres ? t.maxres.url : t.standard.url;
                            return n
                        }
                    },
                    vimeo: {
                        title: function(e) {
                            return e.title
                        },
                        thumbnail: function(e) {
                            return e.thumbnail_url
                        }
                    },
                    vine: {
                        title: function(e) {
                            return e.title
                        },
                        thumbnail: function(e) {
                            return e.thumbnail_url
                        }
                    }
                }
            };
        return t
    },
    n = t();
return n
});
var i18n = {
search_destination_required: "Your destinations you entered not found! Please select in drop-down list.",
flight_from_required: "Please complete 'Flying From' field",
flight_to_required: "Please complete 'Flying To' field",
flight_departure_required: "Your departure date is in the past.\nPlease select a new date.",
flight_pick_a_date: "Pick a date to check rates",
flight_searching: "Searching...",
flight_hide_details: "Hide Flight Details",
flight_show_details: "Show Flight Details",
flight_failed_load_details: "Fail to load flight detail. Use search form to get the flight data again!",
flight_hide_fare_rules: "Hide Fare Rules",
flight_show_fare_rules: "Show Fare Rules",
payment_term_condition_cfm: "You must agree to the terms and conditions before making payment!",
visa_required_fields: "Please select your nationality, number of visa, type of visa and processing time !!!",
visa_hide_options: "Hide Visa Options",
visa_change_options: "Change Visa Options",
visa_confirm_change: "Do you really want to change the number of visa?",
visa_please_fill_form: "Please fill the apply form",
visa_applicant: "applicant",
visa_applicants: "applicants",
visa_processing: "processing",
visa_calculating: "Calculating ...",
visa_skip_steps: "Do you really want skip this step and provide visa details later?",
visa_please_select_nationality: "Please select your nationality !!!",
visa_confirm_to_leave: "Are you sure you want to leave this page?",
cruise_upstream: "Upstream",
cruise_downstream: "Downstream",
help: "Help",
close: "Close",
today: "Today",
month_names: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
days_of_week: ["Sun", "Mon", "Tue", "Wed", "Thur", "Fri", "Sat"],
search_alert_date: "Please enter your travel dates in the search box to search for our best deals.",
free: "Free",
loading: "Loading data... Please wait!",
error_conect_flight: "Error connecting to airline. Please search again!",
loading_flight: "Loading flight data ...",
please_wait: "Please wait ...",
flight_depart: "Depart",
flight_return: "Return",
flight_select: "Select",
flight_selected: "Selected",
select_destination: "Select destination...",
visa_not_available: "not available",
input_destination: "Input destination...",
read_more: "Read more",
read_less: "Read less",
please_fill_inquiry_form: "Please fill the inquiry form",
show_more: "Show more",
show_less: "Show less",
label_adult: "Adult",
label_adults: "Adults",
label_child: "Child",
label_children: "Children",
label_infant: "Infant",
label_infants: "Infants",
passengers: "Passengers",
fly_from: "Fly from",
error_search_text: "Where do you want to go?"
};



function init_search_text() {
$(".btn-search-header").click(function() {
    $(".box-search-header").show(), $("#search_text").focus()
}), $(".box-search-header .btn-close").click(function() {
    $(".box-search-header").hide()
}), $(".box-search-header .glyphicon-search").click(function() {
    $("#frm_search_text").submit()
})
}

function validate_search_text() {
return 0 != $("#search_text").val().length || (alert(i18n.error_search_text), $("#search_text").focus(), !1)
}

function _load_header() {
$.ajax({
    url: "/get-header-data/",
    type: "GET",
    cache: !1,
    dataType: "json",
    success: function(i) {
        if (void 0 !== i.booking_numb && "" != i.booking_numb) {
            var t = '<span class="num-booking"> ' + i.booking_numb + "</span>";
            $(".my-booking-destop").html(t), $(".my-booking-destop").addClass("booking-desktop")
        }
        if (void 0 !== i.favourite_numb && "" != i.favourite_numb) {
            t = '<span class="num-favourite"> ' + i.favourite_numb + "</span>";
            $(".fav-destop-header").html(t), $(".fav-destop-header").addClass("favourite-destop"), $(".fav-mobile").html(t)
        }
        void 0 !== i.favourite && "" != i.favourite && $(".btn-favourite").each(function() {
            for (var t = $(this).attr("data-id"), e = 0; e < i.favourite.length; e++) {
                if (t == i.favourite[e]) {
                    $(".btn-favourite-" + t).attr("data-fav", 1);
                    var a = $(".btn-favourite-" + t).attr("data-text-del");
                    if ("" != a && null != a) {
                        $(".btn-favourite-" + t).hasClass("btn-add-favourite");
                        $(".btn-favourite-" + t).removeClass("btn-add-favourite"), $(".btn-favourite-" + t + " span").removeClass("icon-favourite-blue"), $(".btn-favourite-" + t).addClass("btn-del-favourite"), $(".btn-favourite-" + t + " span").addClass("icon-favourite-red"), $(".btn-favourite-" + t + " .text").text(a)
                    } else $(".btn-favourite-" + t).removeClass("icon-item-favorite"), $(".btn-favourite-" + t).addClass("icon-item-favorited")
                }
            }
        })
    }
})
}

function get_advertises() {
$(".div-ad-area").each(function() {
    var t = $(this).attr("data-ad-page"),
        e = $(this).attr("data-ad-area"),
        a = $(this).attr("data-des-id"),
        i = $(this).attr("data-ts-id"),
        n = $(this).attr("data-pn-id");
    $.ajax({
        url: "get-slide.html",
        type: "GET",
        data: {
            page: t,
            area: e,
            destination_id: a,
            travel_style_id: i,
            partner_id: n
        },
        success: function(t) {
            "" != t ? ($(".div-ad-area").html(t), $(".div-ad-area").show()) : $(".div-ad-area").hide()
        }
    })
})
}

function init_header_ui() {
$(".btn-side-menu").click(function() {
    $(":root").toggleClass("state-sidebar")
}), $(".bs-sidebar-overlay").click(function() {
    $(":root").toggleClass("state-sidebar")
}), $(".bs-sidebar").on("swipeleft", function(t) {
    $(":root").toggleClass("state-sidebar")
}), 0 < $("#btn-search-mobile").length && $("#btn-search-mobile").bpvToggle(), $("#destinations_link").click(function() {
    $("#list_destinations").is(":visible") ? $("#list_destinations").hide() : $("#list_destinations").show()
}), $(document).on("click", function(t) {
    var e = $(".list-destinations").is(":visible");
    is_mobile_screen() && (e = $("#m_list_destinations").is(":visible"));
    var a = $(t.target).attr("id"),
        i = $(t.target).hasClass("tab-content"),
        n = $(t.target).hasClass("a-item"),
        r = $(t.target).hasClass("bpt-des-links");
    !e || "destinations_link" == a || i || n || r || $(".list-destinations").hide()
}), $("#btnDestinations").click(function() {
    $("#m_list_destinations").is(":visible") ? $("#m_list_destinations").hide() : $("#m_list_destinations").show()
})
}

function init_footer_ui() {
$("#btn_more_address").bpvToggle(), init_icon_up_down(), $(".tailor_container img").unveil(200), $(".bpt-footer-contact img").unveil(200)
}

function init_widget_ui() {
var t = !0;
is_mobile_screen() && "/" == window.location.pathname && (t = !1), 0 < $("#TA_selfserveprop857").length && t && load_tripadvisor("TA_selfserveprop857", "en"), 0 < $(".travel-guide").length && init_travel_guide(), 0 < $(".indochina-countries").length && $(".indochina-countries img").unveil(200)
}

function init_search_form_ui() {
if (0 < $("#frm_tour_search").length) {
    if ((new Loader).require(["/assets/libs/typeahead-0.10.5/typeahead.handlebars.min.js"], function() {
            set_search_des_auto("tour")
        }), set_help(".glyphicon-info-sign"), set_help(".glyphicon-question-sign"), get_current_tour_search(), "" != $("#tour_destination").attr("data-id")) {
        var t = [];
        t.id = $("#tour_destination").attr("data-id"), t.destination_type = $("#tour_destination").attr("data-type"), get_search_data(t, !0)
    }
    var e = "#tour_destination";
    0 == $(e).parent().find(".search-choice-close").length && "" != $(e).val() && add_clear_search(e), $(e).blur(function() {
        "" != $.trim($(e).val()) && add_clear_search(e)
    })
}
if (0 < $("#frm_hotel_search").length) {
    var a = $("#hotel_date_id").val();
    $("#" + a).change(), (new Loader).require(["/assets/libs/typeahead-0.10.5/typeahead.bundle.min.js", "/assets/libs/typeahead-0.10.5/handlebars.min.010820151722.js"], function() {
        set_search_des_auto("hotel")
    }), set_help(".glyphicon-info-sign"), set_help(".glyphicon-question-sign"), get_current_hotel_search();
    e = "#hotel_destination";
    0 == $(e).parent().find(".search-choice-close").length && "" != $(e).val() && add_clear_search(e), $(e).blur(function() {
        "" != $.trim($(e).val()) && add_clear_search(e)
    })
}
0 < $("#frm_flight_search").length && init_flight_search_form(), init_datepicker_ui()
}

function init_flight_search_form() {
set_popover_flight(".flight-passenger"), $(".flight-passenger").on("shown.bs.popover", function() {
    var t = $(".flight-pass #adt").val();
    "" != t && "undefined" != t && $(".popover-content #flight_adults").val(t);
    var e = $(".flight-pass #chd").val();
    "" != e && "undefined" != e && $(".popover-content #flight_children").val(e);
    var a = $(".flight-pass #inf").val();
    "" != a && "undefined" != a && $(".popover-content #flight_infants").val(a)
}), $(".flight-passenger").on("hide.bs.popover", function() {
    update_flight_popover()
}), $("#flight_to").on("focus", function(t) {
    is_mobile_screen() && $(this).trigger("blur")
}), $("#flight_from").on("focus", function(t) {
    is_mobile_screen() && $(this).trigger("blur")
}), init_flight_airports(), show_return_date(), show_return_date("oneway"), init_popover_flight_passenger(), change_flight_depart_return_date("departure", "returning"), init_flight_search_destination(), click_out_form();
var t = $("#flight_from").attr("value");
t && update_flight_destination(t, "flight_from")
}

function update_flight_popover() {
$(".flight-pass #adt").val($(".popover-content #flight_adults").val()), $(".flight-pass #chd").val($(".popover-content #flight_children").val()), $(".flight-pass #inf").val($(".popover-content #flight_infants").val()), init_popover_flight_passenger()
}

function init_flight_airports() {
$(".li-tab-des").click(function() {
    $(".flight-form-des .bpv-sort-arow").hide(), $(this).find("span").show(), "flight_from" == $(this).attr("data-id") ? hide_tab_destinations("flight_to") : hide_tab_destinations("flight_from")
}), $(".select-des").click(function() {
    0 == $(this).find(".flight-form-des").is(":visible") ? $(":root").removeClass("state-sidebar-flight") : $(":root").addClass("state-sidebar-flight")
}), $(".des-input").focus(function() {
    0 == $(this).parent().find(".flight-form-des").is(":visible") ? $(":root").removeClass("state-sidebar-flight") : $(":root").addClass("state-sidebar-flight")
})
}

function init_popover_flight_passenger() {
var t = "",
    e = $(".flight-pass #adt").val();
"" != e && 0 < e && "undefined" != e && (t += 1 < e ? e + " " + i18n.label_adults : e + " " + i18n.label_adult);
var a = $(".flight-pass #chd").val();
"" != a && 0 < a && "undefined" != a && (t += 1 < a ? ", " + a + " " + i18n.label_children : ",  " + a + " " + i18n.label_child);
var i = $(".flight-pass #inf").val();
"" != i && 0 < i && "undefined" != i && (t += 1 < i ? ", " + i + " " + i18n.label_infants : ",  " + i + " " + i18n.label_infant);
0 < e && 0 < a && 0 < i && (t = parseInt(e) + parseInt(a) + parseInt(i) + " " + i18n.passengers);
"" != t && $(".flight-passenger").text(t)
}

function init_datepicker_ui() {
0 < $(".bpdatepicker").length && ($(".bpdatepicker").each(function() {
    var i = $(this).attr("data-available-dates"),
        n = "#" + $(this).attr("data-day-id"),
        r = "#" + $(this).attr("data-date-id"),
        o = "#" + $(this).attr("data-month-id"),
        t = $(this).attr("data-selected-date"),
        e = $(this).attr("data-loading-asyn"),
        a = $(this).attr("data-lang-code");
    if (null != i && "" != i && (i = JSON.parse(i)), $(o).change(function() {
            change_datepicker_month(n, o, r, i)
        }), "" == t && "" != $(r).val() && (t = $(r).val()), init_datepicker(n, o, r, i, t), 1 == e)(new Loader).require(["/assets/libs/jquery-ui-1.11.2.datepicker/jquery-datepicker-ui.min.css", "/assets/libs/jquery-ui-1.11.2.datepicker/jquery-ui.event.move." + a + ".min.04041124.js"], function() {
        if (setup_datepicker(r, i, function(t, e) {
                set_current_selected_date(n, o, r, i, t)
            }, a), "#returning_date_flight" == r) {
            var t = $("#departure_date_flight").val();
            jQuery().datepicker && $("#returning_date_flight").datepicker("option", "minDate", t)
        }
    });
    else if (setup_datepicker(r, i, function(t, e) {
            if (set_current_selected_date(n, o, r, i, t), "#returning_date_flight" == r) {
                var a = $("#departure_date_flight").val();
                $("#returning_date_flight").datepicker("option", "minDate", a)
            }
        }, a), "#returning_date_flight" == r) {
        var s = $("#departure_date_flight").val();
        $("#returning_date_flight").datepicker("option", "minDate", s)
    }
}), $(".icon-sf-calendar").click(function() {
    $(this).parent().find(".bpv-date-input").focus()
}), $(".btn_calendar").click(function() {
    var t = $(this).attr("data-id");
    t && $("#" + t).focus()
}))
}

function init_travel_guide() {
is_mobile_screen() && $("#btn_more_articles").bpvToggle(function() {
    var t = $(this).attr("data-target");
    $(t).is(":visible") ? $(this).html(i18n.show_less + ' <span class="glyphicon glyphicon-menu-up margin-left-10"></span>') : $(this).html(i18n.show_more + ' <span class="glyphicon glyphicon-menu-down margin-left-10"></span>')
}), $(".travel-guide img").unveil(200, function() {
    $(this).load(function() {
        this.style.opacity = 1
    })
})
}

function collapse_tab() {
$(".bpv-collapse").each(function() {
    if ($(this).is(":visible")) {
        var t = $(this).attr("data-target");
        $(t).hasClass("tab-pane") && $(t).removeClass("tab-pane").addClass("collapse"), $(t).hasClass("active") && $(t).removeClass("active").addClass("in")
    }
})
}

function init_icon_up_down() {
$("#btn_more_address").click(function() {
    $("#btn_more_address .icon").toggleClass("icon-menu-up")
}), $("#btn-core-value").click(function() {
    $("#btn-core-value .icon").toggleClass("icon-menu-up")
})
}

function init_photo_slider() {
$(".photo-slider").each(function() {
    var t = "#" + $(this).attr("data-id"),
        e = $(t + " .photo-slider");
    $(t + " .photo-slider").owlCarousel({
        lazyLoad: !0,
        video: !0,
        onInitialized: function() {
            reset_video_size(t)
        },
        onResized: function() {
            reset_video_size(t)
        },
        navText: ['<i class="glyphicon glyphicon-menu-left"></i>', '<i class="glyphicon glyphicon glyphicon-menu-right"></i>'],
        responsiveClass: !0,
        responsive: {
            0: {
                items: 1,
                nav: !0
            },
            768: {
                items: 1,
                nav: !0
            }
        },
        loop: !0
    }), $(t + " .btnNext").click(function() {
        e.trigger("next.owl.carousel", [300])
    }), $(t + " .btnPrev").click(function() {
        e.trigger("prev.owl.carousel", [300])
    })
})
}

function go_url(t) {
window.location.href = t
}

function go_top(t) {
null == t && (t = "fast"), $("html, body").animate({
    scrollTop: 0
}, t)
}

function go_bottom(t) {
null == t && (t = "slow"), $("html, body").animate({
    scrollTop: $(document).height() - $(window).height()
}, t)
}

function go_position(t, e) {
null == e && (e = "fast"), $("html, body").animate({
    scrollTop: $(t).offset().top
}, e)
}

function load_tripadvisor(t, e) {
url = "https://www.tripadvisor.com/WidgetEmbed-selfserveprop?border=true&popIdx=true&iswide=false&locationId=4869921&display_version=2&uniq=857&rating=true&lang=" + e + "&nreviews=1&writereviewlink=false", jQuery.ajax({
    type: "GET",
    url: url,
    success: function() {
        $("#" + t).removeClass("tripad-placeholder"), $(".widSSPBranding a").attr("rel", "nofollow")
    },
    error: function() {},
    dataType: "script",
    cache: !0
})
}

function equal_height(t, e) {
null == e && (e = 0);
var a = $.trim(t).split(",");
for (i = 0; i < a.length; i++) {
    var n = $.trim(a[i]);
    if ($(n).length) {
        var r = 0;
        $(n).each(function(t) {
            var e = $(this).outerHeight(!0);
            r = r < e ? e : r
        }), $(n).css("height", r + e)
    }
}
}

function is_height_overlapping(t) {
var a = 0,
    i = !1,
    n = "";
return $(t).length && $(t).each(function(t) {
    var e = $(this).outerHeight(!0);
    $(this).is(":visible") && "" != n && n != e && (i = !0), a = a < e ? e : a, n = e
}), i
}
init_ui = function() {
_load_header(), init_search_text(), init_header_ui(), init_widget_ui(),loadModal(), 0 < $(".popular-routes").length && init_popular_flights(), 0 < $(".free-flight-popup").length && set_modal(".free-flight-popup"), 0 < $(".flight-destinations").length && init_flight_destinations(), 0 < $(".quick-contact-modal").length && $(".item .modal-quick-contact").click(function(t) {
    t.stopPropagation();
    var e = $(this).attr("data-target");
    $(e).modal()
}), 0 < $("#btn-core-value").length && (is_mobile_screen() ? ($("#btn-core-value").bpvToggle(), set_popover(".core-value .policy-1"), set_popover(".core-value .policy-2"), set_popover(".core-value .policy-3")) : set_popover(".core-value .policy", "hover")), 0 < $(".book-width-confident").length && (is_mobile_screen() ? set_popover(".book-width-confident") : set_popover(".book-width-confident", "hover")), 0 < $(".flash-sale").length && init_flash_sale_time(), 0 < $(".div-ad-area").length && get_advertises(), init_footer_ui()
}, is_mobile_screen = function() {
return !!window.matchMedia("(max-width: 768px)").matches
};
var CURRENCIES = {
en: "$",
es: "€"
};

function currency(t) {
if ($("#currency_eur").length) {
    var e = $("#currency_eur").val();
    t = Math.round(parseFloat(t) * e)
}
return t
}

function get_currency_symbol() {
var t = "en";
return null != $(":root").attr("lang") && "es" == $(":root").attr("lang") && (t = $(":root").attr("lang")), CURRENCIES[t]
}

function get_cruise_price_from() {
var e = "",
    a = !0,
    r = get_currency_symbol();
$(".cruise-ids").each(function() {
    var t = $(this).attr("data-id");
    a || (e += "&"), e = e + "cruise_ids[]=" + t, a = !1
}), $.ajax({
    url: "/cruises-price-from/",
    type: "POST",
    dataType: "json",
    data: e,
    success: function(t) {
        for (var e = 0; e < t.length; e++) {
            var a = t[e],
                i = a.cruise_id;
            if (a.price_origin != a.price_from ? $(".c-origin-" + i).html(r + a.price_origin) : $(".c-price-origin-" + i).hide(), $(".cruise-ids-" + i).attr("data-price", a.price_from), $(".c-from-" + i).html(r + a.price_from), $(".c-from-" + i).show(), $(".c-unit-" + i).show(), $(".c-label-from-" + i).show(), $(".c-price-included-" + i).show(), $(".c-price-tag-" + i).show(), $(".c-currency-" + i).show(), $(".c-night-" + i).html(a.duration), $(".c-night-" + i).show(), $(".c-includes-" + i).html(a.service_includes), $(".c-excludes-" + i).html(a.service_excludes), 1 == t[e].is_hot_deals && a.price_origin != a.price_from && $("#c-pro-rate-" + i).length) {
                var n = Math.round(100 * (a.price_origin - a.price_from) / a.price_origin);
                $("#c-pro-rate-" + i).html("-" + n + "%"), $("#c-pro-rate-" + i).show(), $("#c-pro-rate-bg-" + i).show()
            }
            $(".non-price-form-" + i).hide()
        }
    }
})
}

function get_tour_price_from() {
var r = get_currency_symbol(),
    e = "",
    a = !0;
$(".tour-ids").each(function() {
    var t = $(this).attr("data-id");
    a || (e += "&"), e = e + "tour_ids[]=" + t, a = !1
}), $.ajax({
    url: "/tour-price-from/",
    type: "POST",
    dataType: "json",
    data: e,
    success: function(t) {
        for (var e = 0; e < t.length; e++) {
            var a = t[e],
                i = a.tour_id;
            if (0 < a.price_origin && a.price_origin != a.price_from ? $(".t-origin-" + i).html(r + a.price_origin) : $(".t-price-origin-" + i).hide(), isNaN(a.price_from) ? ($(".has-price-form-" + i).hide(), $(".non-price-form-" + i).show()) : ($(".has-price-form-" + i).show(), $(".non-price-form-" + i).hide(), $(".t-from-" + i).html(r + a.price_from), $(".t-from-" + i).show(), $(".t-unit-" + i).show(), $(".t-currency-" + i).show(), $(".t-label-from-" + i).show(), $(".t-price-included-" + i).show(), $(".t-price-tag-" + i).show()), 1 == t[e].is_hot_deals && a.price_origin != a.price_from) {
                var n = Math.round(100 * (a.price_origin - a.price_from) / a.price_origin);
                $(".t-offer-rate-" + i).html(n + "%"), $(".t-offer-rate-" + i).show()
            }
        }
    }
})
}

function get_tour_promotion_night_deal(t) {
$.ajax({
    url: "/tour-promotion-night-deal/",
    type: "POST",
    dataType: "json",
    data: t,
    success: function(t) {
        for (var e = 0; e < t.length; e++) {
            var a = t[e],
                i = a.promotion,
                n = a.tour_id;
            if ($(".see-deal-" + n).append(i), $(".see-deal-" + n).css("margin-top", "10px"), 0 < $(".see-deal-" + n).length) {
                var r = 0,
                    o = "",
                    s = "";
                $(".item-promotion-see").each(function(t) {
                    var e = $(".item-promotion-see").parent().attr("data-content");
                    if ("" == s || e != s) {
                        s = e, $("." + e + " .item-promotion-see").each(function(t) {
                            var e = $(this).outerHeight(!0);
                            "" != o && o != e && !0, r = r < e ? e : r, o = e
                        });
                        var a = $("." + e).outerHeight(!0);
                        $("." + e).css("height", parseInt(a) + parseInt(r) - 10)
                    }
                })
            }
        }
    }
})
}

function get_cruise_promotion_night_deal(t) {
$.ajax({
    url: "/cruise-promotion-night-deal/",
    type: "POST",
    dataType: "json",
    data: t,
    success: function(t) {
        for (var e = 0; e < t.length; e++) {
            var a = t[e],
                i = a.promotion,
                n = a.cruise_id;
            $(".see-deal-" + n).append(i);
            var r = $(".see-deal-" + n).parent().find("item-promotion").length,
                o = 0;
            if (o = r ? ($(".see-deal-" + n).css("margin-top", "10px"), 10) : ($(".see-deal-" + n).css("margin-top", "5px"), -5), 0 < $(".see-deal-" + n).length) {
                var s = 0,
                    l = "",
                    d = "";
                $(".item-promotion-see-deal").each(function(t) {
                    var e = $(".item-promotion-see-deal").parent().attr("data-content");
                    if ("" == d || e != d) {
                        d = e, $("." + e + " .item-promotion-see-deal").each(function(t) {
                            var e = $(this).outerHeight(!0);
                            "" != l && l != e && !0, s = s < e ? e : s, l = e
                        });
                        var a = $("." + e).outerHeight(!0);
                        $("." + e).css("height", parseInt(a) + parseInt(s) - parseInt(o))
                    }
                })
            }
        }
    }
})
}
var daysofweek = i18n.days_of_week,
FORMAT_DATE = "dd-mm-yy";

function date_to_str(t) {
pad = function(t, e) {
    for (t = String(t), e = e || 2; t.length < e;) t = "0" + t;
    return t
};
var e = t.getDate(),
    a = t.getMonth();
a++;
var i = t.getFullYear();
return pad(e) + "-" + pad(a) + "-" + i
}

function str_to_date(t) {
var e = t.split("-");
return new Date(parseInt(e[2], 10), [parseInt(e[1], 10) - 1], parseInt(e[0], 10), 0, 0, 0, 0)
}

function init_datepicker(t, e, a, i, n) {
null != n && "" != n || (n = date_to_str(n = new Date));
var r = new Date;
if (0 < i.length && -1 == i.indexOf(n))
    for (var o = 0; o < i.length; o++) {
        var s = str_to_date(i[o]);
        if (s != str_to_date(n) && r <= s) {
            n = i[o];
            break
        }
    }
set_current_selected_date(t, e, a, i, n)
}

function change_datepicker_day(t, e, a) {
var i = get_current_selected_date(t, e);
$(a).val(i), $(a).change()
}

function change_datepicker_month(t, e, a, i, n) {
if (init_datepicker_days(t, e, i), null == n && (n = !0), n) {
    var r = get_current_selected_date(t, e);
    $(a).val(r), $(a).change()
}
}

function init_datepicker_days(t, e, a) {
for (var i = $.trim($(t + " option:selected").val()), n = "", r = $(e + " option:selected").val().split("-"), o = days_in_month(r[0], r[1]), s = !1, l = 0; l < o.length; ++l) {
    var d = o[l].split("-"),
        c = d[1].toString();
    1 == c.length && (c = "0" + c), is_available_dates(c, e, a) && (n += '<option value="' + c + '">' + d[0] + ", " + d[1] + "</option>", i == d[1] && (s = !0))
}
$(t).html(n), s && $(t).val(i)
}

function days_in_month(t, e) {
t = parseInt(t, 10), e = parseInt(e, 10);
for (var a = new Array, i = 32 - new Date(e, t - 1, 32).getDate(), n = 1; n <= i; ++n) day = new Date(e, t - 1, n), a.push(daysofweek[day.getDay()] + "-" + n);
return a
}

function is_available_dates(t, e, a) {
if (0 == a.length) return !0;
for (var i = t + "-" + $(e + " option:selected").val(), n = 0; n < a.length; n++)
    if (i == a[n]) return !0;
return !1
}

function setup_datepicker(t, a, e, i, n) {
var r = 2;
n = !1, is_mobile_screen() && (n = !0, r = 1), null == e && "function" != typeof e && (e = null), n ? ($(t).datepicker({
    numberOfMonths: r,
    closeText: i18n.close,
    currentText: i18n.today,
    showButtonPanel: n,
    minDate: 0,
    dateFormat: FORMAT_DATE,
    beforeShowDay: function(t) {
        var e = date_to_str(t);
        return "" == a || 0 == a.length ? [!0] : [-1 != a.indexOf(e)]
    },
    onSelect: e
}), $(".ui-datepicker").on("swipeleft", function(t) {
    $(".ui-datepicker-next").hasClass("ui-state-disabled") || $(".ui-datepicker-next").trigger("click")
}), $(".ui-datepicker").on("swiperight", function(t) {
    $(".ui-datepicker-prev").hasClass("ui-state-disabled") || $(".ui-datepicker-prev").trigger("click")
}), $(t).on("focus", function(t) {
    $(this).trigger("blur")
})) : $(t).datepicker({
    numberOfMonths: r,
    showButtonPanel: n,
    minDate: 0,
    dateFormat: FORMAT_DATE,
    beforeShowDay: function(t) {
        var e = date_to_str(t);
        return "" == a || 0 == a.length ? [!0] : [-1 != a.indexOf(e)]
    },
    onSelect: e
})
}

function get_current_selected_date(t, e) {
return $(t + " option:selected").val() + "-" + $(e + " option:selected").val()
}

function set_current_selected_date(t, e, a, i, n) {
if ($(t).length && $(e).length) {
    var r = n.split("-"),
        o = r[0],
        s = r[1] + "-" + r[2];
    $(e + ' option[value="' + s + '"]').prop("selected", !0), change_datepicker_month(t, e, a, i, !1), $(t + ' option[value="' + o + '"]').prop("selected", !0)
}
$(a).val(n), $(a).change()
}

function change_datepicker_date(t, e, a) {
var i = $(t).val();
null != a && "" != a && 0 < $(a).length && (e = parseInt($(a).val())), e = parseInt(e), isNaN(e) && (e = 0), departure_date_obj = str_to_date(i), departure_date_obj.setDate(departure_date_obj.getDate() + e);
var n = i18n.month_names,
    r = i18n.days_of_week,
    o = n[departure_date_obj.getMonth()] + " " + departure_date_obj.getFullYear();
o = r[departure_date_obj.getDay()] + " " + departure_date_obj.getDate() + " " + o, -1 == (o += get_date_direction(t, i)).indexOf("NaN") && $(t + "_end").text(o);
var s = $("#dpk_is_load_departure_date_flight").val(),
    l = null == $("#dpk_is_mobile").val() || 0 == $("#dpk_is_mobile").val();
"#departure_date_flight" == t && $("#dpk_is_load_departure_date_flight").val("0"), "#departure_date_flight" == t && l && 0 == s && jQuery().datepicker && $("#returning_date_flight").datepicker("option", "minDate", $(t).val())
}

function get_date_direction(t, e) {
return direction = "", 0 < $("#is_cruise_tour").length && 0 == $("#is_cruise_tour").val() || (t = t.replace("#", ""), $("#upstream_dates_" + t).length && (upstream_dates = $("#upstream_dates_" + t).val().split(","), -1 != upstream_dates.indexOf(e) && (direction = " (" + i18n.cruise_upstream + ")")), $("#downstream_dates_" + t).length && (downstream_dates = $("#downstream_dates_" + t).val().split(","), -1 != downstream_dates.indexOf(e) && (direction = " (" + i18n.cruise_downstream + ")"))), direction
}

function children_birthday_form(t) {
null != t && "" != t || (t = 0);
var e = $("#children_" + t).val(),
    a = $("#infants_" + t).val();
if (0 < e || 0 < a ? $("#group_chdinf_" + t).show() : $("#group_chdinf_" + t).hide(), 0 < e) {
    $("#group_chd_" + t).show();
    for (var i = 1; i <= 5; i++) {
        if (i <= e) {
            if ($("#row_children_" + t + "_" + i).show(), "" != (r = $("#children_birthday_" + t + "_" + i).val())) {
                var n = r.split("-");
                $("select[id=children_day_" + t + "_" + i + "]").val(n[0]), $("select[id=children_month_" + t + "_" + i + "]").val(n[1]), $("select[id=children_year_" + t + "_" + i + "]").val(n[2])
            }
        } else $("#row_children_" + t + "_" + i).hide()
    }
} else $("#group_chd_" + t).hide();
if (0 < a) {
    $("#group_inf_" + t).show();
    for (i = 1; i <= 5; i++) {
        var r;
        if (i <= a) {
            if ($("#row_infants_" + t + "_" + i).show(), "" != (r = $("#infants_birthday_" + t + "_" + i).val())) {
                n = r.split("-");
                $("select[id=infants_day_" + t + "_" + i + "]").val(n[0]), $("select[id=infants_month_" + t + "_" + i + "]").val(n[1]), $("select[id=infants_year_" + t + "_" + i + "]").val(n[2])
            }
        } else $("#row_infants_" + t + "_" + i).hide()
    }
} else $("#group_inf_" + t).hide()
}

function validate_chd_inf_birthday(t) {
var e = "#group_chdinf_" + t;
$(e + " .age-warning").hide(), $(e + " select").removeClass("bpv-input-warning");
var a = !1;
null != t && "" != t || (t = 0);
var i = $("#children_" + t).val(),
    n = $("#infants_" + t).val(),
    r = $("#tour_date_" + t).val(),
    o = r.split("-"),
    s = parseInt(o[0]),
    l = parseInt(o[1]) - 1,
    d = parseInt(o[2]),
    c = parseInt($("#infant_age_util_" + t).val()),
    u = parseInt($("#children_age_to_" + t).val());
if (0 < i) {
    var _ = new Date(d - u, l, s, 0, 0, 0, 0),
        h = new Date(d - (c + 1), l, s, 0, 0, 0, 0);
    $(e + " .warn_cr_date_to").html(r), $(e + " .warn_chd_age_from").html(date_to_str(_)), $(e + " .warn_chd_age_to").html(date_to_str(h));
    for (var p = 1; p <= i; p++) is_chd_error = validate_chd_input(_, h, "children", t + "_" + p), is_chd_error && (a = !0, $("#chd_age_warning_" + t).show());
    if (a) return a
}
if (0 < n) {
    var f = new Date(d - c - 1, l, s, 0, 0, 0, 0),
        v = new Date(d, l, s, 0, 0, 0, 0);
    f.setTime(f.getTime() + 864e5), $(e + " .warn_cr_date_to").html(r), $(e + " .warn_inf_age_from").html(date_to_str(f)), $(e + " .warn_inf_age_to").html(date_to_str(v));
    for (p = 1; p <= n; p++) is_inf_error = validate_chd_input(f, v, "infants", t + "_" + p), is_inf_error && (a = !0, $("#inf_age_warning_" + t).show())
}
return a
}

function validate_chd_input(t, e, a, i) {
var n = !1,
    r = $("select[id=" + a + "_day_" + i + "]").val(),
    o = $("select[id=" + a + "_month_" + i + "]").val(),
    s = $("select[id=" + a + "_year_" + i + "]").val();
r = parseInt(r), o = parseInt(o) - 1, s = parseInt(s);
var l = new Date(s, o, r, 0, 0, 0, 0);
return isNaN(r) && ($("select[id=" + a + "_day_" + i + "]").addClass("bpv-input-warning"), n = !0), isNaN(o) && ($("select[id=" + a + "_month_" + i + "]").addClass("bpv-input-warning"), n = !0), isNaN(s) && ($("select[id=" + a + "_year_" + i + "]").addClass("bpv-input-warning"), n = !0), (e < l || l < t) && ($("select[id=" + a + "_day_" + i + "]").addClass("bpv-input-warning"), $("select[id=" + a + "_month_" + i + "]").addClass("bpv-input-warning"), $("select[id=" + a + "_year_" + i + "]").addClass("bpv-input-warning"), n = !0), n ? $("#" + a + "_birthday_" + i).removeAttr("name") : (o += 1, $("#" + a + "_birthday_" + i).val(r + "-" + o + "-" + s), $("#" + a + "_birthday_" + i).attr("name", a + "_birthday_" + i)), n
}
var Register = function() {
this.resources = [], this.loaders = []
};
Register.prototype = {
addResouce: function(t) {
    if (!this.isRegistered(t)) {
        var e = {
            src: t,
            loaded: !1
        };
        this.resources.push(e)
    }
},
addLoader: function(t) {
    this.loaders.push(t)
},
setLoaded: function(t) {
    for (var e = 0; e < this.resources.length; e++) t == this.resources[e].src && (this.resources[e].loaded = !0)
},
isLoaded: function(t) {
    for (var e = 0; e < this.resources.length; e++)
        if (t == this.resources[e].src && this.resources[e].loaded) return !0;
    return !1
},
isRegistered: function(t) {
    for (var e = 0; e < this.resources.length; e++)
        if (t == this.resources[e].src) return !0;
    return !1
},
fireLoaderCallback: function() {
    for (var t = 0; t < this.loaders.length; t++) this.loaders[t].fireCallback()
}
};
var register = new Register,
Loader = function() {
    this.isFiredCallback = !1, this.resources = [], this.callback = ""
};

function is_script_file(t) {
return -1 < t.indexOf(".js") || -1 < t.indexOf("googleapis")
}

function set_help(t) {
$(t).each(function() {
    $(this).css("cursor", "pointer");
    var t = $(this).attr("data-title");
    null != t && "" != t || (t = i18n.help);
    var e = $(this).attr("data-target"),
        a = $(e).html(),
        i = $(this).attr("data-placement");
    if (null != i && "" != i || (i = "auto"), "" != $.trim(a)) {
        var n = {
            container: "body",
            title: t,
            placement: i,
            html: !0,
            content: a,
            trigger: "hover"
        };
        $(this).popover(n)
    }
})
}

function set_popover(c, u, _) {
null == u && (u = "manual"), null == _ && (_ = !0), $(c).each(function() {
    var t = $(this).attr("data-pop");
    if ("" == t || null == t)
        if (is_mobile_screen()) set_modal(c, _);
        else {
            var e = this,
                a = $(this).attr("data-target");
            if (null == a) return !1;
            var i = a.substring(1, a.length),
                n = "";
            "hover" != u && 1 == _ && (n = '<div class="popover-footer text-right"><button type="button" class="btn btn-blue btn-sm ' + i + '">' + i18n.close + "</button></div>");
            var r = '<div class="popover" role="tooltip"><div class="arrow"></div><h3 class="popover-title"></h3><div class="popover-content"></div>' + n + "</div>";
            if ("hover" != u) {
                var o = $(this).attr("data-title");
                null != o && "" != o || (o = i18n.help), o = o + '<button type="button" class="close ' + i + '" aria-hidden="true" data-dismiss="popover"><span class="glyphicon glyphicon-remove"></span></button>'
            }
            var s = $(a).html(),
                l = $(this).attr("data-placement");
            if (null != l && "" != l || (l = "auto right"), "" != $.trim(s)) {
                var d = {
                    container: "body",
                    title: o,
                    placement: l,
                    html: !0,
                    content: s,
                    template: r,
                    trigger: u
                };
                $(e).popover(d), $(e).click(function() {
                    $(e).popover("toggle")
                }), $(e).on("shown.bs.popover", function() {
                    $("." + i).click(function() {
                        $(e).popover("hide")
                    })
                })
            }
            $(e).attr("data-pop", "1")
        }
})
}

function set_modal(t, e) {
null == e && (e = !0);
var a = $(t).attr("data-target"),
    i = $(t).attr("data-title");
null != i && "" != i || (i = i18n.help);
var n = $(a).html(),
    r = "<div " + (0 == e ? 'id="modal_filter"' : "") + ' class="modal fade custom-modal" tabindex="-1" role="dialog"><div class="modal-dialog modal-lg"><div class="modal-content" role="document"><div class="modal-header"><button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button><h4 class="modal-title" id="myModalLabel">Modal title</h4></div><div class="modal-body"></div>';
1 == e && i18n.close, $(t).click(function() {
    0 == $(".custom-modal").length && ($("body").append(r), $(".custom-modal .modal-title").html(i), $(".custom-modal .modal-body").html(n), $(".custom-modal .hide").show(), $(".custom-modal").modal(), $(".custom-modal").on("hidden.bs.modal", function() {
        $(".custom-modal").remove()
    }))
})
}



function my_favourite(t, e) {
1 == $(".btn-favourite").attr("data-fav") ? delete_my_favourite(t, e) : add_my_favourite(t, e)
}

function add_my_favourite(t, e) {
$.ajax({
    url: "/add-my-favourite/",
    type: "POST",
    cache: !1,
    data: {
        id: t,
        module: e
    },
    success: function(t) {
        $(".btn-favourite").attr("data-fav", 1), $(".fav-destop-header").hasClass("favourite-destop") || $(".fav-destop-header").addClass("favourite-destop"), $(".favourite-header").show();
        var e = $(".btn-favourite").attr("data-text-del");
        $(".fav-destop-header").html(t), $(".fav-mobile").html(t), $(".btn-favourite").removeClass("btn-add-favourite"), $(".btn-favourite span").removeClass("icon-favourite-blue"), $(".btn-favourite").addClass("btn-del-favourite"), $(".btn-favourite span").addClass("icon-favourite-red"), $(".btn-favourite .text").text(e)
    },
    error: function(t, e, a) {}
})
}

function delete_my_favourite(t, e) {
$.ajax({
    url: "/delete-my-favourite/",
    type: "POST",
    cache: !1,
    data: {
        id: t,
        module: e
    },
    success: function(t) {
        "" == t && ($(".fav-destop-header").removeClass("favourite-destop"), $(".favourite-header").hide()), $(".btn-favourite").attr("data-fav", 0);
        var e = $(".btn-favourite").attr("data-text-add");
        $(".fav-destop-header").html(t), $(".fav-mobile").html(t), $(".btn-favourite").removeClass("btn-del-favourite"), $(".btn-favourite").addClass("btn-add-favourite"), $(".btn-favourite span").removeClass("icon-favourite-red"), $(".btn-favourite span").addClass("icon-favourite-blue"), $(".btn-favourite .text").text(e)
    },
    error: function(t, e, a) {}
})
}

function get_cruise_properties_deckplans(t, e) {
$.ajax({
    url: "/get_cruise_properties/",
    type: "POST",
    cache: !0,
    data: {
        id: t
    },
    success: function(t) {
        $("#cruise_properties_deckplans").html(t), $("#lb_cruise_name").html(e)
    }
})
}

function set_search_des_auto(a) {
a = a;
var t = new Bloodhound({
    datumTokenizer: Bloodhound.tokenizers.obj.whitespace("name"),
    queryTokenizer: Bloodhound.tokenizers.whitespace,
    prefetch: "/" + a + "-des-auto-prefetch/" + a + "-des-auto.json",
    remote: "/" + a + "-des-auto-remote/%QUERY.json",
    limit: 20
});
t.initialize(), $("#" + a + "_destination").typeahead({
    minLength: 2,
    highlight: !0,
    hint: !0,
    autoselect: !0
}, {
    name: "destinations",
    displayKey: "name",
    source: t.ttAdapter(),
    templates: {
        suggestion: Handlebars.compile('<div class="clearfix"><span class="pull-left type-width" style="font-size:10px; background-color: {{color}};">{{destination_type}}</span>  <span class="pull-left arrow-seach" style=" border-color: transparent transparent transparent {{color}};"></span> <span class="pull-left margin-left-5">{{name}}</span> <span class="pull-right">{{parent_name}}</span></div>')
    }
}).on("typeahead:selected", function(t, e) {
    "hotel" == a ? null != e.is_hotel ? ($("#" + a + "_destination_id").val(""), $("#hotel_search_id").val(e.id)) : ($("#" + a + "_destination_id").val(e.id), $("#hotel_search_id").val("")) : $("#" + a + "_destination_id").val(e.id), "tour" == a && get_search_data(e)
}).on("typeahead:autocompleted", function(t, e) {
    $(".tt-dataset-destination .tt-suggestions .tt-suggestion").first().addClass("tt-cursor")
}).on("keyup", function(t) {
    13 != t.keyCode && ($("#" + a + "_destination").popover("destroy"), $("#" + a + "_destination").removeClass("input-error"), $("#" + a + "_destination_id").val(""), "hotel" == a && $("#hotel_search_id").val(""))
})
}

function get_search_data(t, e) {
"" != e && null != e || (e = !1);
var a = "";
e && (a = $("#duration").find(":selected").val());
var i = t.destination_type,
    n = $("#tour_duration_json").val();
"" != n && null != i && ($("#duration").find("option").not(":first").remove(), n = JSON.parse(n), jQuery.each(n, function(t, e) {
    -1 == t && ("" != a && a == e ? $("#duration").append($("<option>", {
        value: e,
        text: e,
        selected: !0
    })) : $("#duration").append($("<option>", {
        value: e,
        text: e
    })))
}), jQuery.each(n, function(t, e) {
    -1 != t && ("" != a && a == e ? $("#duration").append($("<option>", {
        value: e,
        text: e,
        selected: !0
    })) : $("#duration").append($("<option>", {
        value: e,
        text: e
    })))
})), "Country" == i || "3" == i ? $("#duration option").each(function(t) {
    0 < t && t < 5 && $(this).remove()
}) : "City" == i || "4" == i ? $("#duration option").each(function(t) {
    4 < t && $(this).remove()
}) : null != i && $("#duration option").each(function(t) {
    4 == t && $(this).remove(), 6 == t && $(this).remove()
});
var r = $("#tour_city_prices_json").val();
r = JSON.parse(r);
var o;
if (o = $("#tour_price").find(":selected").val(), "Country" == i || 3 == i ? ($("#tour_price").find("option").not('[value=""]').remove(), jQuery.each(r, function(t, e) {
        (1 == t || 4 < t) && ("" != o && o == t ? $("#tour_price").append($("<option>", {
            value: t,
            text: e,
            selected: !0
        })) : $("#tour_price").append($("<option>", {
            value: t,
            text: e
        })))
    })) : ($("#tour_price").find("option").not('[value=""]').remove(), jQuery.each(r, function(t, e) {
        (1 == t || 2 <= t && t <= 4) && ("" != o && o == t ? $("#tour_price").append($("<option>", {
            value: t,
            text: e,
            selected: !0
        })) : $("#tour_price").append($("<option>", {
            value: t,
            text: e
        })))
    })), !e) {
    var s = $("#tour_type option[value='']").text();
    $("#tour_type").find("option").remove(), $.ajax({
        url: "get-tour-types/",
        type: "POST",
        dataType: "json",
        data: {
            id: t.id,
            type: t.destination_type
        },
        success: function(e) {
            "" != e && ($("#tour_type").find("option").remove(), $("#tour_type").append('<option value="">' + s + "</option>"), $.each(e, function(t) {
                $("#tour_type").append('<option value="' + e[t].id + '">' + e[t].name + "</option>")
            }))
        }
    })
}
}

function add_clear_search(t) {
if (0 == $(t).parent().find(".search-choice-close").length) {
    var e = $('<span class="glyphicon glyphicon-remove-sign search-choice-close"></span>');
    $(t).parent().append(e), e.click(function() {
        clear_search(t)
    })
}
}

function clear_search(t) {
$(t).val(""), $(t).focus(), $(t).typeahead("val", ""), $(t).parent().parent().find(".search-choice-close").remove()
}

function validate_search(t, e, a) {
"" != a && null != a || (a = "tour");
var i = $(t + "_id").val(),
    n = $("#hotel_search_id").val(),
    r = !1;
return "tour" == a && (r = "" == i), "hotel" == a && (r = "" == i && "" == n), r ? ($(t).addClass("input-error"), set_popover(t, "manual"), $(t).popover("show"), $(t).focus(), !1) : (alert_travel_start_date(e), !0)
}

function alert_travel_start_date(t) {
var e = $(t).val();
e = str_to_date(e);
var a = new Date;
e <= (a = str_to_date(a = date_to_str(a))) && alert(i18n.search_alert_date)
}

function get_current_tour_search() {
$.getJSON("get_lasted_tour_search/", function(t) {
    if ("" == $("#tour_destination").val() || "" == $("#tour_destination_id").val()) {
        null != t.destination && $("#tour_destination").val(t.destination), null != t.destination_id && $("#tour_destination_id").val(t.destination_id);
        var e = null != t.travel_styles ? t.travel_styles : new Array;
        $(".-travel-styles").each(function() {
            var t = $(this).val(); - 1 != e.indexOf(t) && $(this).prop("checked", !0)
        });
        var a = [];
        a.id = t.destination_id, a.destination_type = t.destination_type, get_search_data(a, !0);
        var i = null != t.duration ? t.duration : "";
        $('#duration option[value="' + i + '"]').prop("selected", !0);
        var n = $("#tour_type option[value='']").text();
        $("#tour_type").find("option").remove();
        var r = a.id,
            o = a.destination_type;
        void 0 === r && (r = $("#tour_destination").attr("data-id"), o = $("#tour_destination").attr("data-type")), $.ajax({
            url: "get-tour-types/",
            type: "POST",
            dataType: "json",
            data: {
                id: r,
                type: o
            },
            success: function(e) {
                "" != e && ($("#tour_type").find("option").remove(), $("#tour_type").append('<option value="">' + n + "</option>"), $.each(e, function(t) {
                    $("#tour_type").append('<option value="' + e[t].id + '">' + e[t].name + "</option>")
                }))
            }
        });
        var s = null != t.group_type ? t.group_type : "";
        $('#group_type option[value="' + s + '"]').prop("selected", !0);
        var l = null != t.budgets ? t.budgets : new Array;
        $(".-budgets").each(function() {
            var t = $(this).val(); - 1 != l.indexOf(t) && $(this).prop("checked", !0)
        })
    }
    null != t.departure_date && set_current_selected_date("#departure_day", "#departure_month", "#departure_date", [], t.departure_date)
})
}

function get_current_hotel_search() {
$.getJSON("ajax/Hotel_Ajax/get_lasted_hotel_search/", function(e) {
    if ("" == $("#hotel_destination").val() || "" == $("#hotel_destination_id").val()) {
        null != e.destination && $("#hotel_destination").val(e.destination), null != e.destination_id && $("#hotel_destination_id").val(e.destination_id), null != e.start_date && set_current_selected_date("#departure_day", "#departure_month", "#departure_date", [], e.start_date), null != e.stars && e.stars.length && $(".hotel-stars").each(function() {
            var t = $(this).val(); - 1 != e.stars.indexOf(t) && $(this).prop("checked", !0)
        });
        var t = null != e.hotel_night_nr ? e.hotel_night_nr : "";
        $('#hotel_night_nr[value="' + t + '"]').prop("selected", !0)
    }
})
}

function show_loading_data(t, e, a) {
null == t && (t = !0), null != a && "" != a || (a = i18n.loading);
var i = '<div class="bpt-loading text-center"><img src="/assets/img/loading.gif"/><span>' + a + "</span></div>";
t ? null == e || "" == e ? $("body").append(i) : $(e).append(i) : $(".bpt-loading").remove()
}

function load_arrow_offer(t, a) {
$(t).each(function() {
    var t = this,
        e = 0;
    a ? ($(t).find(".item-offer").each(function() {
        $(this).height() > e && (e = parseInt($(this).height(), 10))
    }), $(t).find(".item-offer").css("height", e + 10 + "px")) : e = parseInt($(t).find(".item-offer").height(), 10), 0 < e && (e = (e + 10) / 2, $(t).find(".item-offer-arrow-before").css("border-width", e + "px 16px"), $(t).find(".item-offer-arrow-after").css("border-width", e + "px 15px"))
})
}

function getShowLinkText(t) {
return -1 < t.indexOf(i18n.read_more) ? i18n.read_less + ' <span class="glyphicon glyphicon-triangle-top"></span>' : i18n.read_more + ' <span class="glyphicon glyphicon-triangle-bottom"></span>'
}

function reset_video_size(t, e) {
$(".owl-item[data-video]").each(function() {
    var t = $(this).find(".owl-video").attr("data-bg");
    is_mobile_screen() && (t = $(this).find(".owl-video").attr("data-src-mobile")), $(this).find(".owl-video-tn").css("background-image", "url(" + t + ")")
})
}

function load_more_cruise_tour_items(r, o) {
$(o).click(function(t) {
    t.preventDefault();
    var e = $(o).attr("data-limit");
    5 != e && (e = 10);
    var a = $(this).attr("data-link"),
        i = $(o).attr("data-offset"),
        n = $(this).data();
    n.offset = i, show_loading_data(), $.ajax({
        url: a,
        type: "POST",
        data: {
            data: n
        },
        success: function(t) {
            show_loading_data(!1), "" != t ? ($(r + "_btn").length && $(r + "_btn").remove(), $(r).append(t), i = parseInt(i) + parseInt(e), $(o).attr("data-offset", i), set_popover(".what-included")) : $(o).remove()
        },
        error: function(t, e, a) {
            show_loading_data(!1)
        }
    })
})
}

function show_review_tab() {
if (is_mobile_screen()) $(".tab-customer-reviews").click(), go_position(".tab-customer-reviews");
else if (0 < $(".tab-customer-reviews").length) {
    var t = 0 < $("#h_customer_reviews").length ? 40 : 0;
    $("html, body").animate({
        scrollTop: $(".tab-customer-reviews").offset().top - 50 - t
    }, "fast")
} else $("html, body").animate({
    scrollTop: $("#tab_reviews").offset().top
}, "fast")
}

function show_itineraty_tab() {
$(".bpt-tab-tours a[href=#tour_itinerary]").tab("show"), $("html, body").animate({
    scrollTop: $("#tab_tours").offset().top
}, "medium")
}

function see_overview(t, e, a, i, n) {
var r = '<div class="modal fade" id="service_overview" tabindex="-1" role="dialog" aria-labelledby="see_more_deal_title" aria-hidden="true"><div class="modal-dialog modal-lg"><div class="modal-content"><div class="modal-header" id="service_overview_header"></div><div class="modal-body" id="service_overview_cnt"></div><div class="modal-footer"><button type="button" class="btn btn-blue btn-sm" data-dismiss="modal">' + i18n.close + "</button></div></div></div></div>";
0 < $("#service_overview").length || $("body").append(r);
var o = '<button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true"><span class="glyphicon glyphicon-remove"></span></span></button>';
"" != a && null != a && (o = o + '<h2 class="text-highlight margin-bottom-0">' + a + "</h2>"), $("#service_overview_header").html(o), $("#service_overview_cnt").html(""), $("#service_overview").modal();
var s = "";
"tour" == e && (s = "/ajax/Tour_Ajax/see_overview/"), "cruise" == e && (s = "/ajax/Cruise_Ajax/see_overview/"), "hotel" == e && (s = "/ajax/Hotel_Ajax/see_overview/"), "destination" == e && (s = "/ajax/Destination_Ajax/see_overview/"), "" != s && (show_loading_data(!0, "#service_overview_cnt"), $.ajax({
    url: s,
    type: "POST",
    cache: !0,
    dataType: "json",
    data: {
        url_title: t
    },
    success: function(t) {
        $("#service_overview_header h2").html(t.title), $("#service_overview_cnt").html(t.content), show_loading_data(!1)
    }
}))
}

function load_sale_support_image() {
$.ajax({
    url: "load_sale_support_image/",
    type: "POST",
    success: function(t) {
        "" != t && $("#img_support_home").attr("src", t)
    }
})
}

function get_cabin_arrangements(t) {
null == t && (t = !1);
var e = $("#arrange_tour_id").val();
if (0 < $("#cb_tours").length) var a = $("select[name=tour_id]").val(),
    i = 0;
else a = e, i = 1;
var n = $("#adults_" + e).val(),
    r = $("#children_" + e).val(),
    o = $("#infants_" + e).val(),
    s = $("#tour_date_" + e).val();
$.ajax({
    url: "get-cabin-arrangements.html",
    type: "GET",
    data: {
        id: e,
        tour_id: a,
        adults: n,
        children: r,
        infants: o,
        tour_date: s,
        is_change_cabin: t,
        is_tour: i
    },
    success: function(t) {
        $("#re_arrange_cabin_area_" + e).html(t)
    }
})
}

function send_email_check_price(t, e) {
var a = $("#quick_full_name_" + t).val(),
    i = $("#quick_itinerary_" + t).val(),
    n = $("#quick_email_address_" + t).val(),
    r = $("#quick_date_" + t).val(),
    o = $("#quick_group_size_" + t).val(),
    s = $("#quick_phone_number_" + t).val();
return "" == a ? ($("#quick_full_name_" + t).addClass("bpv-input-warning"), !1) : ($("#quick_full_name_" + t).removeClass("bpv-input-warning"), "" == i ? ($("#quick_itinerary_" + t).addClass("bpv-input-warning"), alert(""), !1) : ($("#quick_itinerary_" + t).removeClass("bpv-input-warning"), "" == n ? ($("#quick_email_address_" + t).addClass("bpv-input-warning"), !1) : ($("#quick_email_address_" + t).removeClass("bpv-input-warning"), "" == r ? ($("#quick_date_" + t).addClass("bpv-input-warning"), !1) : ($("#quick_date_" + t).removeClass("bpv-input-warning"), "" == s ? ($("#quick_phone_number_" + t).addClass("bpv-input-warning"), !1) : ($("#quick_phone_number_" + t).removeClass("bpv-input-warning"), "" == o || isNaN(o) ? ($("#quick_group_size_" + t).addClass("bpv-input-warning"), !1) : ($("#quick_group_size_" + t).removeClass("bpv-input-warning"), void $.ajax({
    url: "send-email-check-price.html",
    type: "GET",
    data: {
        full_name: a,
        itinerary: i,
        email: n,
        date: r,
        phone: s,
        group_size: o
    },
    success: function(t) {
        "" != t && $(".quick-contact-modal-" + e + " .close").click()
    }
})))))))
}

function init_flash_sale_time() {
$(".flash-sale").each(function() {
    var t = $(this).attr("data-id"),
        e = $(this).attr("data-time-current"),
        a = $(this).attr("data-time-to");
    "" != t && "" != a && "" != e && show_countdown_deals(t, e, a)
})
}

function show_countdown_deals(r, o, t) {
var s = new Date(t).getTime(),
    l = 0;
setInterval(function() {
    var t = new Date(o).getTime(),
        e = s - t - 1e3 * l,
        a = (Math.floor(e / 864e5), Math.floor(e % 864e5 / 36e5)),
        i = Math.floor(e % 36e5 / 6e4),
        n = Math.floor(e % 6e4 / 1e3);
    a = 0 <= a && a <= 9 ? "0" + a : a, i = 0 <= i && i <= 9 ? "0" + i : i, n = 0 <= n && n <= 9 ? "0" + n : n, 0 < e ? ($(".tour-hh-" + r).html(a), $(".tour-mm-" + r).html(i), $(".tour-ss-" + r).html(n), $(".flash-sale-" + r).show()) : $(".flash-sale-" + r).hide(), l += 1
}, 1e3)
}

function sort_list_cruise() {
var l = $("#filter_list").val();
setTimeout(function() {
    var e = new Array;
    $(".list-sort-cruises .item").each(function() {
        $(this).removeClass("item-more-m hide-mobile"), $(this).removeClass("item-more hide");
        var t = $(this);
        e.push(t)
    });
    for (var t = e.length - 1; 0 <= t; t--)
        for (var a = 1; a <= t; a++) {
            var i = 0,
                n = 0;
            if ("default" == l ? (i = $(e[a - 1]).attr("data-default"), n = $(e[a]).attr("data-default"), i = parseInt(i), n = parseInt(n)) : "review" == l ? (i = $(e[a - 1]).attr("data-review"), n = $(e[a]).attr("data-review"), i = parseFloat(i), n = parseFloat(n), i = 0 == i ? parseFloat(0) : i, n = 0 == n ? parseFloat(0) : n) : "price_low_hight" == l ? (i = 0 == (i = $(e[a - 1]).attr("data-price")) || "NaN" == i || "" == i ? 1e5 : i, n = 0 == (n = $(e[a]).attr("data-price")) || "NaN" == n || "" == n ? 1e5 : n, i = parseFloat(i), n = parseFloat(n)) : "price_hight_low" == l && (i = 0 == (i = $(e[a - 1]).attr("data-price")) || "NaN" == i || "" == i ? 0 : i, n = 0 == (n = $(e[a]).attr("data-price")) || "NaN" == n || "" == n ? 0 : n, i = parseFloat(i), n = parseFloat(n)), "price_low_hight" == l || "default" == l) {
                if (n < i) {
                    var r = e[a - 1];
                    e[a - 1] = e[a], e[a] = r
                }
            } else if (i < n) {
                r = e[a - 1];
                e[a - 1] = e[a], e[a] = r
            }
        }
    var o = "";
    for (t = 0; t < e.length; t++) {
        var s = $(e[t]).clone();
        $(s).wrap("<div>"), 2 < t && $(s).addClass("item-more-m hide-mobile"), 5 < t && $(s).addClass("item-more hide"), 0 == t ? o += '<div class="row top-deals">' : t % 3 == 0 && (o += '</div><div class="row top-deals">'), o += $(s).parent().html(), t == e.length - 1 && (o += "</div>")
    }
    $(".list-sort-cruises").html(o)
}, 50)
}

function send_question() {
var t = $("#quest_full_name").val(),
    e = $("#quest_email").val(),
    a = $("#quest_content").val(),
    i = $("#quest_des_id").val(),
    n = $("#quest_type_id").val(),
    r = $("#page_id").val();
return "" == t ? ($("#quest_full_name").addClass("bpv-input-warning"), !1) : ($("#quest_full_name").removeClass("bpv-input-warning"), "" == e ? ($("#quest_email").addClass("bpv-input-warning"), !1) : ($("#quest_email").removeClass("bpv-input-warning"), "" == a ? ($("#quest_content").addClass("bpv-input-warning"), !1) : ($("#quest_content").removeClass("bpv-input-warning"), void $.ajax({
    url: "/send-question/",
    type: "POST",
    data: {
        full_name: t,
        email: e,
        content: a,
        des_id: i,
        type_id: n,
        page: r
    },
    success: function(t) {
        "" != t && (alert(t), $("#quest_full_name").val(""), $("#quest_email").val(""), $("#quest_content").val("")), $("#questions_modal").modal("hide")
    }
}))))
}

function show_more_questions() {
var t = $("#quest_des_id").val(),
    e = $("#quest_type_id").val(),
    a = $("#page_id").val();
$.ajax({
    url: "/show-more-questions/",
    type: "POST",
    data: {
        des_id: t,
        type_id: e,
        page: a
    },
    success: function(t) {
        "" != t && ($(".lst").append(t), $("#btn_more_question").hide())
    }
})
}
Loader.prototype = {
    require: function(t, e) {
        register.addLoader(this), this.callback = e;
        for (var a = 0; a < t.length; a++) {
            is_script_file(t[a]) ? (this.resources.push(t[a]), this.writeScript(t[a])) : this.writeCSS(t[a])
        }
    },
    fireCallback: function() {
        if (!this.isFiredCallback) {
            for (var t = !0, e = 0; e < this.resources.length; e++) t = t && register.isLoaded(this.resources[e]);
            t && "function" == typeof this.callback && (this.callback.call(), this.isFiredCallback = !0)
        }
    },
    writeCSS: function(t) {
        for (var e = '<link rel="stylesheet" type="text/css" href="' + t + '"/>', a = $("head")[0], i = $(a).children(), n = !1, r = 0; r < i.length; r++) {
            var o = i[r];
            if ($(o).attr("href") == t) {
                n = !0;
                break
            }
        }
        n || $(a).append(e)
    },
    writeScript: function(e) {
        register.isRegistered(e) ? register.isLoaded(e) && register.fireLoaderCallback() : (register.addResouce(e), $.ajax({
            url: e,
            dataType: "script",
            cache: !0
        }).done(function(t) {
            register.setLoaded(e), register.fireLoaderCallback()
        }))
    }
}, jQuery.fn.bpvToggle = function(i) {
    $(this).click(function(t) {
        t.preventDefault();
        var e = $(this).attr("data-target");
        if (0 == $(e).length) return !1;
        var a = this;
        $(e).not(":animated").slideToggle("slow", "swing", function() {
            "function" == typeof i && i.call(a, {
                id: e
            })
        })
    })
},
function(l) {
    l.fn.unveil = function(t, e) {
        var a, r = l(window),
            o = t || 0,
            i = 1 < window.devicePixelRatio ? "data-src-retina" : "data-src",
            n = this;

        function s() {
            var t = n.filter(function() {
                var t = l(this);
                if (!t.is(":hidden")) {
                    var e = r.scrollTop(),
                        a = e + r.height(),
                        i = t.offset().top,
                        n = i + t.height();
                    return e - o <= n && i <= a + o
                }
            });
            a = t.trigger("unveil"), n = n.not(a)
        }
        return this.one("unveil", function() {
            var t = this.getAttribute(i);
            (t = t || this.getAttribute("data-src")) && (this.setAttribute("src", t), "function" == typeof e && e.call(this))
        }), r.on("scroll.unveil resize.unveil lookup.unveil", s), s(), this
    }
}(window.jQuery || window.Zepto), show_more = function() {
    $(".show-more a").each(function() {
        var t = $(this),
            e = t.parent().prev("div.text-content");
        e[0].clientHeight < e[0].scrollHeight - 1 ? t.show() : t.hide()
    }), $(".show-more a").on("click", function() {
        var t = $(this),
            e = t.parent().prev("div.text-content"),
            a = t.text();
        return e.toggleClass("full-text"), t.html(getShowLinkText(a)), !1
    }), $(".btn-show-more").on("click", function() {
        var t = $(this),
            e = t.parent().prev("div.text-content");
        t.text();
        return e.toggleClass("full-text"), $(this).hasClass("icon") && $(this).toggleClass("icon-menu-up"), !1
    })
}, init_carousel = function(t, e, a) {
    return "" != e && null != e || (e = 1), "" != a && null != a || 0 == a || (a = !0), $(t).owlCarousel({
        lazyLoad: !1,
        video: !0,
        onInitialized: function() {
            reset_video_size(t)
        },
        onResized: function() {
            reset_video_size(t)
        },
        navText: ['<i class="glyphicon glyphicon-menu-left"></i>', '<i class="glyphicon glyphicon glyphicon-menu-right"></i>'],
        responsiveClass: !0,
        responsive: {
            0: {
                items: 1,
                nav: !0
            },
            768: {
                items: e,
                nav: !0
            }
        },
        loop: a
    }), $(t)
}, init_carousel_stage_padding = function(t) {
    $(t).owlCarousel({
        stagePadding: 0,
        loop: !1,
        margin: 0,
        nav: !1,
        responsive: {
            0: {
                items: 1
            },
            600: {
                items: 3
            },
            1e3: {
                items: 5
            }
        }
    })
};



function init_video() {
$(".video-btn").click(function() {
    0 == $(".lazyframe").find("iframe").length ? lazyframe(".lazyframe") : $(".lazyframe").find("iframe").attr("src", $(".lazyframe").attr("data-src"))
}), $("#modalVideo").on("shown.bs.modal", function(e) {
    $(".lazyframe").trigger("click")
}), $("#modalVideo").on("hide.bs.modal", function(e) {
    $(".lazyframe").find("iframe").attr("src", "")
})
}

function loadModal(){
	$('.btn-filter').click(function() {
		var target = $(this).attr('data-target');
		if(target == '#bpv_filter_tour') {
			$('#filterModalBody').html($('#bpv_filter_tour').html());
			$('#bpv_filter_tour').html('');
		}

		if(target == '#bpv_sort_tour') {
			$('#filterModalBody').html($('#bpv_sort_tour').html());
		}
		
		$('#filterModal').attr('data-id', target);
		$('#filterModal').modal('show');
	});

	$('#filterModal').on('hidden.bs.modal', function (e) {
		if($(this).attr('data-id') == '#bpv_filter_tour') {
			var data = $("#frm_search_filters").serializeArray();
			$('#bpv_filter_tour').html($('#filterModalBody').html());
			$('#filterModalBody').html('');
			populate('#frm_search_filters', data);
		}
	});
}

function init_cruise_page() {
    get_cruise_price_from(), get_tour_price_from(), is_mobile_screen() ? ($("#btn-core-value").bpvToggle(), set_popover(".core-value .policy-1"), set_popover(".core-value .policy-2"), set_popover(".core-value .policy-3")) : set_popover(".core-value .policy", "hover"), $("#today-hot-deal .top-deals").length && (is_mobile_screen() || equal_height("#today-hot-deal .item-content", 20), $(".btn-more-top-cruise").click(function() {
        $("#today-hot-deal .item-more").toggleClass("hide"), $("#today-hot-deal .item-more-m").toggleClass("hide-mobile"), $("#today-hot-deal .item-more").hasClass("hide-mobile") || (equal_height("#today-hot-deal .item-content", 20), $(".more-top-cruise").hide(), $(".see-more-cruise").show())
    })), $(".list-packages").length && (is_mobile_screen() || equal_height(".list-packages .item-content"), $(".btn-more-top-cruise-package").click(function() {
        $(".list-packages .item-more").toggleClass("hide"), $(".list-packages .item-more-m").toggleClass("hide-mobile"), $(".list-packages .item-more").hasClass("hide-mobile") || ($(".more-top-cruise-package").hide(), $(".see-more-cruise-package").show())
    })), 0 < $(".pro-offer-note").length && (is_mobile_screen() ? set_popover(".pro-offer-note") : set_popover(".pro-offer-note", "hover")), 0 < $(".free-visa-popup").length && set_popover(".free-visa-popup"), 0 < $(".bpt-secret-deal").length && set_popover(".bpt-secret-deal"), 0 < $(".travel-styles").length && $(".travel-styles img").unveil(200), is_mobile_screen() && ($("#btn-core-value").bpvToggle(), init_carousel(".best-seller .owl-carousel", 3), $(".recommended-cruises .bpv-collapse-cruise").addClass("collapsed"), $(".recommended-cruises .tab-pane").removeClass("active"), $(".dots").click(function(e) {
        var t = $(this).attr("data-target");
        0 < $(t).length && ("60px" == $(t).css("height") ? ($(t).css("height", "auto"), $(this).html("<a>" + i18n.read_less + "</a>")) : ($(t).css("height", "60px"), $(this).html("... <a>" + i18n.read_more + "</a>")))
    }), 0 < $(".latest-reviews .owl-carousel").length && init_carousel_stage_padding(".latest-reviews .owl-carousel"), 0 < $(".travel-guide .owl-carousel").length && init_carousel_stage_padding(".travel-guide .owl-carousel")), $("#cruise_packages").bpvToggle(function() {
        var e = $(this).attr("data-target");
        $(e).is(":visible") ? $(this).removeClass("bpv-collapsed") : $(this).addClass("bpv-collapsed")
    }), $(window).resize(function() {
        is_mobile_screen() || ($owl = $(".best-seller .owl-carousel"), $owl.trigger("destroy.owl.carousel").removeClass("owl-carousel owl-loaded"), $owl.find(".owl-stage-outer").children().unwrap())
    }), $(".cruise-packages .owl-carousel").owlCarousel({
        lazyLoad: !0,
        navText: ['<i class="glyphicon glyphicon-chevron-left"></i>', '<i class="glyphicon glyphicon-chevron-right"></i>'],
        responsiveClass: !0,
        rewind: !1,
        responsive: {
            0: {
                items: 1,
                nav: !0
            },
            768: {
                items: 3,
                nav: !0
            }
        },
        navContainer: "#customNav",
        dotsContainer: "#customDots"
    }), $(window).load(function() {
        equal_height(".best-seller .item-content"), is_mobile_screen() || equal_height(".cruise-packages .item-content")
    }), init_video(), init_recommended_cruises()
    }

function init_recommended_cruises() {
collapse_tab(), $(window).resize(collapse_tab), $(".bpv-collapse-cruise").click(function(e) {
    var t = $(this).attr("data-target");
    $(t + " img").unveil(200, function() {
        $(this).load(function() {
            this.style.opacity = 1
        })
    })
}), $('.bpt-tab a[data-toggle="tab"]').on("shown.bs.tab", function(e) {
    var t = $(this).attr("href");
    "" != t && "#page_halongrecommendedcruises" != t && $.ajax({
        url: "/get-cruise-tab/",
        type: "POST",
        data: {
            page: $(this).attr("href")
        },
        success: function(e) {
            $(t).html(e), 0 < $(".pro-offer-note").length && (is_mobile_screen() ? set_popover(".pro-offer-note") : set_popover(".pro-offer-note", "hover")), get_cruise_price_from()
        }
    });
    var o = "dropdown-menu" == $(e.target).closest("ul").attr("class");
    (0 < $(e.target).closest("li").index() || o) && $($(e.target).attr("href") + " img").unveil(200, function() {
        $(this).load(function() {
            this.style.opacity = 1
        })
    })
}), $(window).load(function() {
    equal_height(".recommended-cruises .bpt-item")
})
}

init_cruise_page();