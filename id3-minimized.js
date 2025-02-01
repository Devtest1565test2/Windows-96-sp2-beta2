(function(A) {
    if ("object" === typeof exports && "undefined" !== typeof module) {
        module.f = A();
    } else if ("function" === typeof define && define.M) {
        define([], A);
    } else {
        var g;
        if ("undefined" !== typeof window) {
            g = window;
        } else if ("undefined" !== typeof global) {
            g = global;
        } else if ("undefined" !== typeof self) {
            g = self;
        } else {
            g = this;
        }
        g.ID3 = A();
    }
})(function() {
    return function g(l, h, f) {
        function c(b, d) {
            if (!h[b]) {
                if (!l[b]) {
                    var e = "function" == typeof require && require;
                    if (!d && e) return e(b, !0);
                    if (a) return a(b, !0);
                    e = Error("Cannot find module '" + b + "'");
                    throw e.code = "MODULE_NOT_FOUND", e;
                }
                e = h[b] = { f: {} };
                l[b][0].call(e.f, function(a) {
                    var e = l[b][1][a];
                    return c(e ? e : a);
                }, e, e.f, g, l, h, f);
            }
            return h[b].f;
        }

        for (var a = "function" == typeof require && require, b = 0; b < f.length; b++) c(f[b]);
        return c;
    }({
        1: [function(g, l) {
            var h = g("./stringutils");
            if ("undefined" !== typeof document) {
                var f = document.createElement("script");
                f.type = "text/vbscript";
                f.textContent = `
                    Function IEBinary_getByteAt(strBinary, iOffset)
                        IEBinary_getByteAt = AscB(MidB(strBinary,iOffset+1,1))
                    End Function
                    Function IEBinary_getLength(strBinary)
                        IEBinary_getLength = LenB(strBinary)
                    End Function
                `;
                document.getElementsByTagName("head")[0].appendChild(f);
            } else {
                g("btoa");
                g("atob");
            }

            l.f = function(c, a, b) {
                var m = a || 0, d = 0;
                if ("string" == typeof c) {
                    d = b || c.length;
                    this.a = function(a) { return c.charCodeAt(a + m) & 255; };
                } else if ("unknown" == typeof c) {
                    d = b || IEBinary_getLength(c);
                    this.a = function(a) { return IEBinary_getByteAt(c, a + m); };
                }

                this.s = function(a, b) {
                    var d = Array(b), m = 0;
                    for (m; m < b; m++) d[m] = this.a(a + m);
                    return d;
                };

                this.l = function() { return d; };

                this.g = function(a, b) { return 0 !== (this.a(a) & 1 << b); };

                this.F = function(a) {
                    a = (this.a(a + 1) << 8) + this.a(a);
                    if (a < 0) a += 65536;
                    return a;
                };

                this.m = function(a) {
                    var b = this.a(a), d = this.a(a + 1), m = this.a(a + 2);
                    a = this.a(a + 3);
                    b = (((b << 8) + d << 8) + m << 8) + a;
                    if (b < 0) b += 4294967296;
                    return b;
                };

                this.w = function(a) {
                    var b = this.a(a), d = this.a(a + 1);
                    a = this.a(a + 2);
                    b = ((b << 8) + d << 8) + a;
                    if (b < 0) b += 16777216;
                    return b;
                };

                this.c = function(a, b) {
                    var d = [];
                    for (var m = a, c = 0; m < a + b; m++, c++) d[c] = String.fromCharCode(this.a(m));
                    return d.join("");
                };

                this.h = function(a, b, d) {
                    a = this.s(a, b);
                    switch (d.toLowerCase()) {
                        case "utf-16":
                        case "utf-16le":
                        case "utf-16be":
                            d = h.J(a, d);
                            break;
                        case "utf-8":
                            d = h.K(a);
                            break;
                        default:
                            d = h.I(a);
                    }
                    return d;
                };

                this.i = function(a, b) { b(); };
            };
        }, {}],
        // Additional modules are omitted for brevity.
    });
});
