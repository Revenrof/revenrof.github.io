(function() {
  /*

   Copyright The Closure Library Authors.
   SPDX-License-Identifier: Apache-2.0
  */
  var h, aa = function(a) {
      var b = 0;
      return function() {
        return b < a.length ? {
          done: !1,
          value: a[b++]
        } : {
          done: !0
        }
      }
    },
    ba = "function" == typeof Object.defineProperties ? Object.defineProperty : function(a, b, c) {
      if (a == Array.prototype || a == Object.prototype) return a;
      a[b] = c.value;
      return a
    },
    da = function(a) {
      a = ["object" == typeof globalThis && globalThis, a, "object" == typeof window && window, "object" == typeof self && self, "object" == typeof global && global];
      for (var b = 0; b < a.length; ++b) {
        var c = a[b];
        if (c && c.Math == Math) return c
      }
      throw Error("Cannot find global object");
    },
    ea = da(this),
    fa = function(a, b) {
      if (b) a: {
        var c = ea;a = a.split(".");
        for (var d = 0; d < a.length - 1; d++) {
          var e = a[d];
          if (!(e in c)) break a;
          c = c[e]
        }
        a = a[a.length - 1];d = c[a];b = b(d);b != d && null != b && ba(c, a, {
          configurable: !0,
          writable: !0,
          value: b
        })
      }
    };
  fa("Symbol", function(a) {
    if (a) return a;
    var b = function(f, g) {
      this.Hf = f;
      ba(this, "description", {
        configurable: !0,
        writable: !0,
        value: g
      })
    };
    b.prototype.toString = function() {
      return this.Hf
    };
    var c = "jscomp_symbol_" + (1E9 * Math.random() >>> 0) + "_",
      d = 0,
      e = function(f) {
        if (this instanceof e) throw new TypeError("Symbol is not a constructor");
        return new b(c + (f || "") + "_" + d++, f)
      };
    return e
  });
  fa("Symbol.iterator", function(a) {
    if (a) return a;
    a = Symbol("Symbol.iterator");
    for (var b = "Array Int8Array Uint8Array Uint8ClampedArray Int16Array Uint16Array Int32Array Uint32Array Float32Array Float64Array".split(" "), c = 0; c < b.length; c++) {
      var d = ea[b[c]];
      "function" === typeof d && "function" != typeof d.prototype[a] && ba(d.prototype, a, {
        configurable: !0,
        writable: !0,
        value: function() {
          return ha(aa(this))
        }
      })
    }
    return a
  });
  var ha = function(a) {
      a = {
        next: a
      };
      a[Symbol.iterator] = function() {
        return this
      };
      return a
    },
    n = function(a) {
      var b = "undefined" != typeof Symbol && Symbol.iterator && a[Symbol.iterator];
      return b ? b.call(a) : {
        next: aa(a)
      }
    },
    ia = function(a) {
      for (var b, c = []; !(b = a.next()).done;) c.push(b.value);
      return c
    },
    ja = "function" == typeof Object.create ? Object.create : function(a) {
      var b = function() {};
      b.prototype = a;
      return new b
    },
    ka;
  if ("function" == typeof Object.setPrototypeOf) ka = Object.setPrototypeOf;
  else {
    var la;
    a: {
      var ma = {
          a: !0
        },
        na = {};
      try {
        na.__proto__ = ma;
        la = na.a;
        break a
      } catch (a) {}
      la = !1
    }
    ka = la ? function(a, b) {
      a.__proto__ = b;
      if (a.__proto__ !== b) throw new TypeError(a + " is not extensible");
      return a
    } : null
  }
  var oa = ka,
    qa = function(a, b) {
      a.prototype = ja(b.prototype);
      a.prototype.constructor = a;
      if (oa) oa(a, b);
      else
        for (var c in b)
          if ("prototype" != c)
            if (Object.defineProperties) {
              var d = Object.getOwnPropertyDescriptor(b, c);
              d && Object.defineProperty(a, c, d)
            } else a[c] = b[c];
      a.v = b.prototype
    },
    ra = function() {
      for (var a = Number(this), b = [], c = a; c < arguments.length; c++) b[c - a] = arguments[c];
      return b
    },
    sa = function(a, b) {
      return Object.prototype.hasOwnProperty.call(a, b)
    };
  fa("WeakMap", function(a) {
    function b() {}

    function c(l) {
      var m = typeof l;
      return "object" === m && null !== l || "function" === m
    }

    function d(l) {
      if (!sa(l, f)) {
        var m = new b;
        ba(l, f, {
          value: m
        })
      }
    }

    function e(l) {
      var m = Object[l];
      m && (Object[l] = function(p) {
        if (p instanceof b) return p;
        Object.isExtensible(p) && d(p);
        return m(p)
      })
    }
    if (function() {
        if (!a || !Object.seal) return !1;
        try {
          var l = Object.seal({}),
            m = Object.seal({}),
            p = new a([
              [l, 2],
              [m, 3]
            ]);
          if (2 != p.get(l) || 3 != p.get(m)) return !1;
          p.delete(l);
          p.set(m, 4);
          return !p.has(l) && 4 == p.get(m)
        } catch (q) {
          return !1
        }
      }()) return a;
    var f = "$jscomp_hidden_" + Math.random();
    e("freeze");
    e("preventExtensions");
    e("seal");
    var g = 0,
      k = function(l) {
        this.Ka = (g += Math.random() + 1).toString();
        if (l) {
          l = n(l);
          for (var m; !(m = l.next()).done;) m = m.value, this.set(m[0], m[1])
        }
      };
    k.prototype.set = function(l, m) {
      if (!c(l)) throw Error("Invalid WeakMap key");
      d(l);
      if (!sa(l, f)) throw Error("WeakMap key fail: " + l);
      l[f][this.Ka] = m;
      return this
    };
    k.prototype.get = function(l) {
      return c(l) && sa(l, f) ? l[f][this.Ka] : void 0
    };
    k.prototype.has = function(l) {
      return c(l) && sa(l, f) && sa(l[f],
        this.Ka)
    };
    k.prototype.delete = function(l) {
      return c(l) && sa(l, f) && sa(l[f], this.Ka) ? delete l[f][this.Ka] : !1
    };
    return k
  });
  fa("Map", function(a) {
    if (function() {
        if (!a || "function" != typeof a || !a.prototype.entries || "function" != typeof Object.seal) return !1;
        try {
          var k = Object.seal({
              x: 4
            }),
            l = new a(n([
              [k, "s"]
            ]));
          if ("s" != l.get(k) || 1 != l.size || l.get({
              x: 4
            }) || l.set({
              x: 4
            }, "t") != l || 2 != l.size) return !1;
          var m = l.entries(),
            p = m.next();
          if (p.done || p.value[0] != k || "s" != p.value[1]) return !1;
          p = m.next();
          return p.done || 4 != p.value[0].x || "t" != p.value[1] || !m.next().done ? !1 : !0
        } catch (q) {
          return !1
        }
      }()) return a;
    var b = new WeakMap,
      c = function(k) {
        this.Ob = {};
        this.V =
          f();
        this.size = 0;
        if (k) {
          k = n(k);
          for (var l; !(l = k.next()).done;) l = l.value, this.set(l[0], l[1])
        }
      };
    c.prototype.set = function(k, l) {
      k = 0 === k ? 0 : k;
      var m = d(this, k);
      m.list || (m.list = this.Ob[m.id] = []);
      m.P ? m.P.value = l : (m.P = {
        next: this.V,
        Ba: this.V.Ba,
        head: this.V,
        key: k,
        value: l
      }, m.list.push(m.P), this.V.Ba.next = m.P, this.V.Ba = m.P, this.size++);
      return this
    };
    c.prototype.delete = function(k) {
      k = d(this, k);
      return k.P && k.list ? (k.list.splice(k.index, 1), k.list.length || delete this.Ob[k.id], k.P.Ba.next = k.P.next, k.P.next.Ba = k.P.Ba, k.P.head =
        null, this.size--, !0) : !1
    };
    c.prototype.clear = function() {
      this.Ob = {};
      this.V = this.V.Ba = f();
      this.size = 0
    };
    c.prototype.has = function(k) {
      return !!d(this, k).P
    };
    c.prototype.get = function(k) {
      return (k = d(this, k).P) && k.value
    };
    c.prototype.entries = function() {
      return e(this, function(k) {
        return [k.key, k.value]
      })
    };
    c.prototype.keys = function() {
      return e(this, function(k) {
        return k.key
      })
    };
    c.prototype.values = function() {
      return e(this, function(k) {
        return k.value
      })
    };
    c.prototype.forEach = function(k, l) {
      for (var m = this.entries(), p; !(p = m.next()).done;) p =
        p.value, k.call(l, p[1], p[0], this)
    };
    c.prototype[Symbol.iterator] = c.prototype.entries;
    var d = function(k, l) {
        var m = l && typeof l;
        "object" == m || "function" == m ? b.has(l) ? m = b.get(l) : (m = "" + ++g, b.set(l, m)) : m = "p_" + l;
        var p = k.Ob[m];
        if (p && sa(k.Ob, m))
          for (k = 0; k < p.length; k++) {
            var q = p[k];
            if (l !== l && q.key !== q.key || l === q.key) return {
              id: m,
              list: p,
              index: k,
              P: q
            }
          }
        return {
          id: m,
          list: p,
          index: -1,
          P: void 0
        }
      },
      e = function(k, l) {
        var m = k.V;
        return ha(function() {
          if (m) {
            for (; m.head != k.V;) m = m.Ba;
            for (; m.next != m.head;) return m = m.next, {
              done: !1,
              value: l(m)
            };
            m = null
          }
          return {
            done: !0,
            value: void 0
          }
        })
      },
      f = function() {
        var k = {};
        return k.Ba = k.next = k.head = k
      },
      g = 0;
    return c
  });
  fa("Array.prototype.find", function(a) {
    return a ? a : function(b, c) {
      a: {
        var d = this;d instanceof String && (d = String(d));
        for (var e = d.length, f = 0; f < e; f++) {
          var g = d[f];
          if (b.call(c, g, f, d)) {
            b = g;
            break a
          }
        }
        b = void 0
      }
      return b
    }
  });
  fa("String.prototype.startsWith", function(a) {
    return a ? a : function(b, c) {
      if (null == this) throw new TypeError("The 'this' value for String.prototype.startsWith must not be null or undefined");
      if (b instanceof RegExp) throw new TypeError("First argument to String.prototype.startsWith must not be a regular expression");
      var d = this + "";
      b += "";
      var e = d.length,
        f = b.length;
      c = Math.max(0, Math.min(c | 0, d.length));
      for (var g = 0; g < f && c < e;)
        if (d[c++] != b[g++]) return !1;
      return g >= f
    }
  });
  var ta = function(a, b) {
    a instanceof String && (a += "");
    var c = 0,
      d = !1,
      e = {
        next: function() {
          if (!d && c < a.length) {
            var f = c++;
            return {
              value: b(f, a[f]),
              done: !1
            }
          }
          d = !0;
          return {
            done: !0,
            value: void 0
          }
        }
      };
    e[Symbol.iterator] = function() {
      return e
    };
    return e
  };
  fa("Array.prototype.entries", function(a) {
    return a ? a : function() {
      return ta(this, function(b, c) {
        return [b, c]
      })
    }
  });
  fa("Array.prototype.keys", function(a) {
    return a ? a : function() {
      return ta(this, function(b) {
        return b
      })
    }
  });
  fa("Array.from", function(a) {
    return a ? a : function(b, c, d) {
      c = null != c ? c : function(k) {
        return k
      };
      var e = [],
        f = "undefined" != typeof Symbol && Symbol.iterator && b[Symbol.iterator];
      if ("function" == typeof f) {
        b = f.call(b);
        for (var g = 0; !(f = b.next()).done;) e.push(c.call(d, f.value, g++))
      } else
        for (f = b.length, g = 0; g < f; g++) e.push(c.call(d, b[g], g));
      return e
    }
  });
  fa("Object.entries", function(a) {
    return a ? a : function(b) {
      var c = [],
        d;
      for (d in b) sa(b, d) && c.push([d, b[d]]);
      return c
    }
  });
  var ua = ua || {},
    r = this || self,
    va = function(a) {
      var b = typeof a;
      return "object" != b ? b : a ? Array.isArray(a) ? "array" : b : "null"
    },
    wa = function(a) {
      var b = va(a);
      return "array" == b || "object" == b && "number" == typeof a.length
    },
    xa = function(a) {
      var b = typeof a;
      return "object" == b && null != a || "function" == b
    },
    Aa = function(a) {
      return Object.prototype.hasOwnProperty.call(a, ya) && a[ya] || (a[ya] = ++za)
    },
    ya = "closure_uid_" + (1E9 * Math.random() >>> 0),
    za = 0,
    Ba = function(a, b, c) {
      return a.call.apply(a.bind, arguments)
    },
    Ca = function(a, b, c) {
      if (!a) throw Error();
      if (2 < arguments.length) {
        var d = Array.prototype.slice.call(arguments, 2);
        return function() {
          var e = Array.prototype.slice.call(arguments);
          Array.prototype.unshift.apply(e, d);
          return a.apply(b, e)
        }
      }
      return function() {
        return a.apply(b, arguments)
      }
    },
    Da = function(a, b, c) {
      Da = Function.prototype.bind && -1 != Function.prototype.bind.toString().indexOf("native code") ? Ba : Ca;
      return Da.apply(null, arguments)
    },
    Ea = function(a, b) {
      var c = Array.prototype.slice.call(arguments, 1);
      return function() {
        var d = c.slice();
        d.push.apply(d, arguments);
        return a.apply(this, d)
      }
    },
    t = function(a, b) {
      function c() {}
      c.prototype = b.prototype;
      a.v = b.prototype;
      a.prototype = new c;
      a.prototype.constructor = a;
      a.lj = function(d, e, f) {
        for (var g = Array(arguments.length - 2), k = 2; k < arguments.length; k++) g[k - 2] = arguments[k];
        return b.prototype[e].apply(d, g)
      }
    },
    Fa = function(a) {
      return a
    };
  var Ga = function() {
    var a = void 0 === a ? window : a;
    this.Hg = 200;
    this.kg = 300;
    this.Xg = ".centered-bottom";
    this.Tg = a
  };
  var Ha = function() {
    this.Wf = new Ga
  };
  var Ia;

  function Ja(a, b) {
    if (Error.captureStackTrace) Error.captureStackTrace(this, Ja);
    else {
      var c = Error().stack;
      c && (this.stack = c)
    }
    a && (this.message = String(a));
    void 0 !== b && (this.cause = b)
  }
  t(Ja, Error);
  Ja.prototype.name = "CustomError";

  function Ka(a, b) {
    a = a.split("%s");
    for (var c = "", d = a.length - 1, e = 0; e < d; e++) c += a[e] + (e < b.length ? b[e] : "%s");
    Ja.call(this, c + a[d])
  }
  t(Ka, Ja);
  Ka.prototype.name = "AssertionError";

  function La(a, b, c, d) {
    var e = "Assertion failed";
    if (c) {
      e += ": " + c;
      var f = d
    } else a && (e += ": " + a, f = b);
    throw new Ka("" + e, f || []);
  }
  var u = function(a, b, c) {
      a || La("", null, b, Array.prototype.slice.call(arguments, 2));
      return a
    },
    Ma = function(a, b) {
      throw new Ka("Failure" + (a ? ": " + a : ""), Array.prototype.slice.call(arguments, 1));
    },
    Na = function(a, b, c) {
      "number" !== typeof a && La("Expected number but got %s: %s.", [va(a), a], b, Array.prototype.slice.call(arguments, 2));
      return a
    },
    Oa = function(a, b, c) {
      "string" !== typeof a && La("Expected string but got %s: %s.", [va(a), a], b, Array.prototype.slice.call(arguments, 2));
      return a
    },
    Pa = function(a, b, c) {
      "function" !== typeof a &&
        La("Expected function but got %s: %s.", [va(a), a], b, Array.prototype.slice.call(arguments, 2));
      return a
    },
    Qa = function(a, b, c) {
      xa(a) || La("Expected object but got %s: %s.", [va(a), a], b, Array.prototype.slice.call(arguments, 2))
    },
    Ra = function(a, b, c) {
      "boolean" !== typeof a && La("Expected boolean but got %s: %s.", [va(a), a], b, Array.prototype.slice.call(arguments, 2));
      return a
    };
  var Sa = Array.prototype.indexOf ? function(a, b) {
      u(null != a.length);
      return Array.prototype.indexOf.call(a, b, void 0)
    } : function(a, b) {
      if ("string" === typeof a) return "string" !== typeof b || 1 != b.length ? -1 : a.indexOf(b, 0);
      for (var c = 0; c < a.length; c++)
        if (c in a && a[c] === b) return c;
      return -1
    },
    Ta = Array.prototype.forEach ? function(a, b) {
      u(null != a.length);
      Array.prototype.forEach.call(a, b, void 0)
    } : function(a, b) {
      for (var c = a.length, d = "string" === typeof a ? a.split("") : a, e = 0; e < c; e++) e in d && b.call(void 0, d[e], e, a)
    },
    Ua = Array.prototype.map ?
    function(a, b) {
      u(null != a.length);
      return Array.prototype.map.call(a, b, void 0)
    } : function(a, b) {
      for (var c = a.length, d = Array(c), e = "string" === typeof a ? a.split("") : a, f = 0; f < c; f++) f in e && (d[f] = b.call(void 0, e[f], f, a));
      return d
    },
    Va = Array.prototype.some ? function(a, b) {
      u(null != a.length);
      return Array.prototype.some.call(a, b, void 0)
    } : function(a, b) {
      for (var c = a.length, d = "string" === typeof a ? a.split("") : a, e = 0; e < c; e++)
        if (e in d && b.call(void 0, d[e], e, a)) return !0;
      return !1
    };

  function Wa(a, b) {
    var c = 0;
    Ta(a, function(d, e, f) {
      b.call(void 0, d, e, f) && ++c
    });
    return c
  }

  function Xa(a, b) {
    for (var c = a.length, d = "string" === typeof a ? a.split("") : a, e = 0; e < c; e++)
      if (e in d && b.call(void 0, d[e], e, a)) return e;
    return -1
  }

  function Ya(a, b) {
    for (var c = "string" === typeof a ? a.split("") : a, d = a.length - 1; 0 <= d; d--)
      if (d in c && b.call(void 0, c[d], d, a)) return d;
    return -1
  }

  function Za(a, b) {
    return 0 <= Sa(a, b)
  }

  function $a(a, b) {
    b = Sa(a, b);
    var c;
    if (c = 0 <= b) u(null != a.length), Array.prototype.splice.call(a, b, 1);
    return c
  }

  function ab(a) {
    var b = a.length;
    if (0 < b) {
      for (var c = Array(b), d = 0; d < b; d++) c[d] = a[d];
      return c
    }
    return []
  }

  function bb(a, b, c) {
    u(null != a.length);
    return 2 >= arguments.length ? Array.prototype.slice.call(a, b) : Array.prototype.slice.call(a, b, c)
  };
  var cb = String.prototype.trim ? function(a) {
      return a.trim()
    } : function(a) {
      return /^[\s\xa0]*([\s\S]*?)[\s\xa0]*$/.exec(a)[1]
    },
    kb = function(a) {
      if (!db.test(a)) return a; - 1 != a.indexOf("&") && (a = a.replace(eb, "&amp;")); - 1 != a.indexOf("<") && (a = a.replace(fb, "&lt;")); - 1 != a.indexOf(">") && (a = a.replace(gb, "&gt;")); - 1 != a.indexOf('"') && (a = a.replace(hb, "&quot;")); - 1 != a.indexOf("'") && (a = a.replace(ib, "&#39;")); - 1 != a.indexOf("\x00") && (a = a.replace(jb, "&#0;"));
      return a
    },
    eb = /&/g,
    fb = /</g,
    gb = />/g,
    hb = /"/g,
    ib = /'/g,
    jb = /\x00/g,
    db =
    /[\x00&<>"']/,
    mb = function(a, b) {
      var c = 0;
      a = cb(String(a)).split(".");
      b = cb(String(b)).split(".");
      for (var d = Math.max(a.length, b.length), e = 0; 0 == c && e < d; e++) {
        var f = a[e] || "",
          g = b[e] || "";
        do {
          f = /(\d*)(\D*)(.*)/.exec(f) || ["", "", "", ""];
          g = /(\d*)(\D*)(.*)/.exec(g) || ["", "", "", ""];
          if (0 == f[0].length && 0 == g[0].length) break;
          c = lb(0 == f[1].length ? 0 : parseInt(f[1], 10), 0 == g[1].length ? 0 : parseInt(g[1], 10)) || lb(0 == f[2].length, 0 == g[2].length) || lb(f[2], g[2]);
          f = f[3];
          g = g[3]
        } while (0 == c)
      }
      return c
    },
    lb = function(a, b) {
      return a < b ? -1 : a > b ? 1 :
        0
    };

  function nb() {
    var a = r.navigator;
    return a && (a = a.userAgent) ? a : ""
  }

  function w(a) {
    return -1 != nb().indexOf(a)
  };

  function ob() {
    return w("Trident") || w("MSIE")
  }

  function pb() {
    return w("Firefox") || w("FxiOS")
  }

  function qb() {
    return w("Safari") && !(rb() || w("Coast") || w("Opera") || w("Edge") || w("Edg/") || w("OPR") || pb() || w("Silk") || w("Android"))
  }

  function rb() {
    return (w("Chrome") || w("CriOS")) && !w("Edge") || w("Silk")
  };

  function sb() {
    return w("iPhone") && !w("iPod") && !w("iPad")
  }

  function tb() {
    return sb() || w("iPad") || w("iPod")
  };
  var ub = function(a) {
    ub[" "](a);
    return a
  };
  ub[" "] = function() {};
  var vb = function(a, b) {
      try {
        return ub(a[b]), !0
      } catch (c) {}
      return !1
    },
    wb = function(a, b, c, d) {
      d = d ? d(b) : b;
      return Object.prototype.hasOwnProperty.call(a, d) ? a[d] : a[d] = c(b)
    };
  var xb = w("Opera"),
    x = ob(),
    yb = w("Edge"),
    zb = yb || x,
    A = w("Gecko") && !(-1 != nb().toLowerCase().indexOf("webkit") && !w("Edge")) && !(w("Trident") || w("MSIE")) && !w("Edge"),
    B = -1 != nb().toLowerCase().indexOf("webkit") && !w("Edge"),
    Ab = w("Macintosh"),
    Bb = w("Windows"),
    Cb = w("Android"),
    Db = sb(),
    Eb = w("iPad"),
    Fb = w("iPod"),
    Gb = tb(),
    Hb = function() {
      var a = r.document;
      return a ? a.documentMode : void 0
    },
    Ib;
  a: {
    var Jb = "",
      Kb = function() {
        var a = nb();
        if (A) return /rv:([^\);]+)(\)|;)/.exec(a);
        if (yb) return /Edge\/([\d\.]+)/.exec(a);
        if (x) return /\b(?:MSIE|rv)[: ]([^\);]+)(\)|;)/.exec(a);
        if (B) return /WebKit\/(\S+)/.exec(a);
        if (xb) return /(?:Version)[ \/]?(\S+)/.exec(a)
      }();Kb && (Jb = Kb ? Kb[1] : "");
    if (x) {
      var Lb = Hb();
      if (null != Lb && Lb > parseFloat(Jb)) {
        Ib = String(Lb);
        break a
      }
    }
    Ib = Jb
  }
  var Mb = Ib,
    Nb = {},
    Ob = function(a) {
      return wb(Nb, a, function() {
        return 0 <= mb(Mb, a)
      })
    },
    Pb;
  if (r.document && x) {
    var Qb = Hb();
    Pb = Qb ? Qb : parseInt(Mb, 10) || void 0
  } else Pb = void 0;
  var Rb = Pb;
  var Sb = function(a, b) {
    a: {
      try {
        var c = a && a.ownerDocument,
          d = c && (c.defaultView || c.parentWindow);
        d = d || r;
        if (d.Element && d.Location) {
          var e = d;
          break a
        }
      } catch (g) {}
      e = null
    }
    if (e && "undefined" != typeof e[b] && (!a || !(a instanceof e[b]) && (a instanceof e.Location || a instanceof e.Element))) {
      if (xa(a)) try {
        var f = a.constructor.displayName || a.constructor.name || Object.prototype.toString.call(a)
      } catch (g) {
        f = "<object could not be stringified>"
      } else f = void 0 === a ? "undefined" : null === a ? "null" : typeof a;
      Ma("Argument is not a %s (or a non-Element, non-Location mock); got: %s",
        b, f)
    }
  };
  var Tb = function() {},
    Ub = function(a) {
      var b = !1,
        c;
      return function() {
        b || (c = a(), b = !0);
        return c
      }
    },
    Vb = function(a, b, c) {
      var d = 0,
        e = !1,
        f = [],
        g = function() {
          d = 0;
          e && (e = !1, k())
        },
        k = function() {
          d = r.setTimeout(g, b);
          var l = f;
          f = [];
          a.apply(c, l)
        };
      return function(l) {
        f = arguments;
        d ? e = !0 : k()
      }
    };

  function Wb(a, b, c) {
    for (var d in a) b.call(c, a[d], d, a)
  }

  function Xb(a, b) {
    for (var c in a)
      if (b.call(void 0, a[c], c, a)) return !0;
    return !1
  }

  function Yb(a, b) {
    for (var c in a)
      if (a[c] == b) return !0;
    return !1
  }
  var Zb = "constructor hasOwnProperty isPrototypeOf propertyIsEnumerable toLocaleString toString valueOf".split(" ");

  function $b(a, b) {
    for (var c, d, e = 1; e < arguments.length; e++) {
      d = arguments[e];
      for (c in d) a[c] = d[c];
      for (var f = 0; f < Zb.length; f++) c = Zb[f], Object.prototype.hasOwnProperty.call(d, c) && (a[c] = d[c])
    }
  }

  function ac(a) {
    var b = arguments.length;
    if (1 == b && Array.isArray(arguments[0])) return ac.apply(null, arguments[0]);
    for (var c = {}, d = 0; d < b; d++) c[arguments[d]] = !0;
    return c
  };
  var bc, cc = function() {
    if (void 0 === bc) {
      var a = null,
        b = r.trustedTypes;
      if (b && b.createPolicy) try {
        a = b.createPolicy("goog#html", {
          createHTML: Fa,
          createScript: Fa,
          createScriptURL: Fa
        })
      } catch (c) {
        r.console && r.console.error(c.message)
      }
      bc = a
    }
    return bc
  };
  var fc = function(a, b) {
    this.be = a === dc && b || "";
    this.If = ec
  };
  fc.prototype.Va = !0;
  fc.prototype.Ua = function() {
    return this.be
  };
  fc.prototype.toString = function() {
    return "Const{" + this.be + "}"
  };
  var gc = function(a) {
      if (a instanceof fc && a.constructor === fc && a.If === ec) return a.be;
      Ma("expected object of type Const, got '" + a + "'");
      return "type_error:Const"
    },
    ec = {},
    dc = {};
  var ic = function(a, b) {
    this.Qd = b === hc ? a : ""
  };
  ic.prototype.toString = function() {
    return this.Qd + ""
  };
  ic.prototype.Va = !0;
  ic.prototype.Ua = function() {
    return this.Qd.toString()
  };
  var jc = function(a) {
      if (a instanceof ic && a.constructor === ic) return a.Qd;
      Ma("expected object of type TrustedResourceUrl, got '" + a + "' of type " + va(a));
      return "type_error:TrustedResourceUrl"
    },
    hc = {},
    kc = function(a) {
      var b = cc();
      a = b ? b.createScriptURL(a) : a;
      return new ic(a, hc)
    };
  var E = function(a, b) {
    this.Pd = b === lc ? a : ""
  };
  E.prototype.toString = function() {
    return this.Pd.toString()
  };
  E.prototype.Va = !0;
  E.prototype.Ua = function() {
    return this.Pd.toString()
  };
  var mc = function(a) {
      if (a instanceof E && a.constructor === E) return a.Pd;
      Ma("expected object of type SafeUrl, got '" + a + "' of type " + va(a));
      return "type_error:SafeUrl"
    },
    nc = /^data:(.*);base64,[a-z0-9+\/]+=*$/i,
    oc = /^(?:(?:https?|mailto|ftp):|[^:/?#]*(?:[/?#]|$))/i,
    pc = function(a) {
      if (a instanceof E) return a;
      a = "object" == typeof a && a.Va ? a.Ua() : String(a);
      u(oc.test(a), "%s does not match the safe URL pattern", a) || (a = "about:invalid#zClosurez");
      return new E(a, lc)
    },
    lc = {},
    qc = new E("about:invalid#zClosurez", lc);
  var rc = {},
    sc = function(a, b) {
      this.Od = b === rc ? a : "";
      this.Va = !0
    };
  sc.prototype.Ua = function() {
    return this.Od.toString()
  };
  sc.prototype.toString = function() {
    return this.Od.toString()
  };
  var tc = function(a) {
      if (a instanceof sc && a.constructor === sc) return a.Od;
      Ma("expected object of type SafeHtml, got '" + a + "' of type " + va(a));
      return "type_error:SafeHtml"
    },
    uc = function(a) {
      var b = cc();
      a = b ? b.createHTML(a) : a;
      return new sc(a, rc)
    },
    vc = new sc(r.trustedTypes && r.trustedTypes.emptyHTML || "", rc);
  var wc = {
      MATH: !0,
      SCRIPT: !0,
      STYLE: !0,
      SVG: !0,
      TEMPLATE: !0
    },
    xc = Ub(function() {
      if ("undefined" === typeof document) return !1;
      var a = document.createElement("div"),
        b = document.createElement("div");
      b.appendChild(document.createElement("div"));
      a.appendChild(b);
      if (!a.firstChild) return !1;
      b = a.firstChild.firstChild;
      a.innerHTML = tc(vc);
      return !b.parentElement
    }),
    yc = function(a, b) {
      if (a.tagName && wc[a.tagName.toUpperCase()]) throw Error("goog.dom.safe.setInnerHtml cannot be used to set content of " + a.tagName + ".");
      if (xc())
        for (; a.lastChild;) a.removeChild(a.lastChild);
      a.innerHTML = tc(b)
    },
    zc = function(a, b, c, d) {
      a = a instanceof E ? a : pc(a);
      b = b || r;
      c = c instanceof fc ? gc(c) : c || "";
      return void 0 !== d ? b.open(mc(a), c, d) : b.open(mc(a), c)
    };
  var F = function(a, b) {
    this.x = void 0 !== a ? a : 0;
    this.y = void 0 !== b ? b : 0
  };
  F.prototype.clone = function() {
    return new F(this.x, this.y)
  };
  F.prototype.toString = function() {
    return "(" + this.x + ", " + this.y + ")"
  };
  var Ac = function(a, b) {
    return new F(a.x - b.x, a.y - b.y)
  };
  h = F.prototype;
  h.ceil = function() {
    this.x = Math.ceil(this.x);
    this.y = Math.ceil(this.y);
    return this
  };
  h.floor = function() {
    this.x = Math.floor(this.x);
    this.y = Math.floor(this.y);
    return this
  };
  h.round = function() {
    this.x = Math.round(this.x);
    this.y = Math.round(this.y);
    return this
  };
  h.translate = function(a, b) {
    a instanceof F ? (this.x += a.x, this.y += a.y) : (this.x += Number(a), "number" === typeof b && (this.y += b));
    return this
  };
  h.scale = function(a, b) {
    this.x *= a;
    this.y *= "number" === typeof b ? b : a;
    return this
  };
  var Bc = function(a, b) {
    this.width = a;
    this.height = b
  };
  h = Bc.prototype;
  h.clone = function() {
    return new Bc(this.width, this.height)
  };
  h.toString = function() {
    return "(" + this.width + " x " + this.height + ")"
  };
  h.aspectRatio = function() {
    return this.width / this.height
  };
  h.ceil = function() {
    this.width = Math.ceil(this.width);
    this.height = Math.ceil(this.height);
    return this
  };
  h.floor = function() {
    this.width = Math.floor(this.width);
    this.height = Math.floor(this.height);
    return this
  };
  h.round = function() {
    this.width = Math.round(this.width);
    this.height = Math.round(this.height);
    return this
  };
  h.scale = function(a, b) {
    this.width *= a;
    this.height *= "number" === typeof b ? b : a;
    return this
  };
  var Cc = function(a) {
      return String(a).replace(/\-([a-z])/g, function(b, c) {
        return c.toUpperCase()
      })
    },
    Dc = function(a) {
      return a.replace(RegExp("(^|[\\s]+)([a-z])", "g"), function(b, c, d) {
        return c + d.toUpperCase()
      })
    };
  var Fc = function(a) {
      return a ? new Ec(G(a)) : Ia || (Ia = new Ec)
    },
    Hc = function(a, b) {
      var c = b || document;
      return c.querySelectorAll && c.querySelector ? c.querySelectorAll("." + a) : Gc(document, "*", a, b)
    },
    H = function(a, b) {
      var c = b || document;
      if (c.getElementsByClassName) a = c.getElementsByClassName(a)[0];
      else {
        c = document;
        var d = b || c;
        a = d.querySelectorAll && d.querySelector && a ? d.querySelector(a ? "." + a : "") : Gc(c, "*", a, b)[0] || null
      }
      return a || null
    },
    Gc = function(a, b, c, d) {
      a = d || a;
      b = b && "*" != b ? String(b).toUpperCase() : "";
      if (a.querySelectorAll &&
        a.querySelector && (b || c)) return a.querySelectorAll(b + (c ? "." + c : ""));
      if (c && a.getElementsByClassName) {
        a = a.getElementsByClassName(c);
        if (b) {
          d = {};
          for (var e = 0, f = 0, g; g = a[f]; f++) b == g.nodeName && (d[e++] = g);
          d.length = e;
          return d
        }
        return a
      }
      a = a.getElementsByTagName(b || "*");
      if (c) {
        d = {};
        for (f = e = 0; g = a[f]; f++) b = g.className, "function" == typeof b.split && Za(b.split(/\s+/), c) && (d[e++] = g);
        d.length = e;
        return d
      }
      return a
    },
    Jc = function(a, b) {
      Wb(b, function(c, d) {
        c && "object" == typeof c && c.Va && (c = c.Ua());
        "style" == d ? a.style.cssText = c : "class" ==
          d ? a.className = c : "for" == d ? a.htmlFor = c : Ic.hasOwnProperty(d) ? a.setAttribute(Ic[d], c) : 0 == d.lastIndexOf("aria-", 0) || 0 == d.lastIndexOf("data-", 0) ? a.setAttribute(d, c) : a[d] = c
      })
    },
    Ic = {
      cellpadding: "cellPadding",
      cellspacing: "cellSpacing",
      colspan: "colSpan",
      frameborder: "frameBorder",
      height: "height",
      maxlength: "maxLength",
      nonce: "nonce",
      role: "role",
      rowspan: "rowSpan",
      type: "type",
      usemap: "useMap",
      valign: "vAlign",
      width: "width"
    },
    Lc = function(a) {
      a = a.document;
      a = Kc(a) ? a.documentElement : a.body;
      return new Bc(a.clientWidth, a.clientHeight)
    },
    Nc = function(a) {
      var b = Mc(a);
      a = a.parentWindow || a.defaultView;
      return x && Ob("10") && a.pageYOffset != b.scrollTop ? new F(b.scrollLeft, b.scrollTop) : new F(a.pageXOffset || b.scrollLeft, a.pageYOffset || b.scrollTop)
    },
    Mc = function(a) {
      return a.scrollingElement ? a.scrollingElement : !B && Kc(a) ? a.documentElement : a.body || a.documentElement
    },
    Oc = function(a) {
      return a ? a.parentWindow || a.defaultView : window
    },
    Qc = function(a, b, c) {
      return Pc(document, arguments)
    },
    Pc = function(a, b) {
      var c = b[1],
        d = Rc(a, String(b[0]));
      c && ("string" === typeof c ?
        d.className = c : Array.isArray(c) ? d.className = c.join(" ") : Jc(d, c));
      2 < b.length && Sc(a, d, b, 2);
      return d
    },
    Sc = function(a, b, c, d) {
      function e(k) {
        k && b.appendChild("string" === typeof k ? a.createTextNode(k) : k)
      }
      for (; d < c.length; d++) {
        var f = c[d];
        if (!wa(f) || xa(f) && 0 < f.nodeType) e(f);
        else {
          a: {
            if (f && "number" == typeof f.length) {
              if (xa(f)) {
                var g = "function" == typeof f.item || "string" == typeof f.item;
                break a
              }
              if ("function" === typeof f) {
                g = "function" == typeof f.item;
                break a
              }
            }
            g = !1
          }
          Ta(g ? ab(f) : f, e)
        }
      }
    },
    Rc = function(a, b) {
      b = String(b);
      "application/xhtml+xml" ===
      a.contentType && (b = b.toLowerCase());
      return a.createElement(b)
    },
    Kc = function(a) {
      return "CSS1Compat" == a.compatMode
    },
    Tc = function(a, b) {
      u(null != a && null != b, "goog.dom.appendChild expects non-null arguments");
      a.appendChild(b)
    },
    Uc = function(a, b) {
      Sc(G(a), a, arguments, 1)
    },
    Vc = function(a) {
      for (var b; b = a.firstChild;) a.removeChild(b)
    },
    Wc = function(a, b) {
      u(null != a && null != b, "goog.dom.insertSiblingBefore expects non-null arguments");
      b.parentNode && b.parentNode.insertBefore(a, b)
    },
    Xc = function(a, b) {
      u(null != a && null != b, "goog.dom.insertSiblingAfter expects non-null arguments");
      b.parentNode && b.parentNode.insertBefore(a, b.nextSibling)
    },
    Yc = function(a) {
      return a && a.parentNode ? a.parentNode.removeChild(a) : null
    },
    Zc = function(a, b) {
      u(null != a && null != b, "goog.dom.copyContents expects non-null arguments");
      b = b.cloneNode(!0).childNodes;
      for (Vc(a); b.length;) a.appendChild(b[0])
    },
    $c = function(a, b) {
      if (!a || !b) return !1;
      if (a.contains && 1 == b.nodeType) return a == b || a.contains(b);
      if ("undefined" != typeof a.compareDocumentPosition) return a == b || !!(a.compareDocumentPosition(b) & 16);
      for (; b && a != b;) b = b.parentNode;
      return b == a
    },
    G = function(a) {
      u(a, "Node cannot be null or undefined.");
      return 9 == a.nodeType ? a : a.ownerDocument || a.document
    },
    bd = function(a, b) {
      return b ? ad(a, function(c) {
        return !b || "string" === typeof c.className && Za(c.className.split(/\s+/), b)
      }) : null
    },
    ad = function(a, b) {
      for (var c = 0; a;) {
        u("parentNode" != a.name);
        if (b(a)) return a;
        a = a.parentNode;
        c++
      }
      return null
    },
    Ec = function(a) {
      this.l = a || r.document || document
    };
  h = Ec.prototype;
  h.D = Fc;
  h.m = function() {};
  h.getElementsByTagName = function(a, b) {
    return (b || this.l).getElementsByTagName(String(a))
  };
  h.T = function(a, b, c) {
    return Pc(this.l, arguments)
  };
  h.createElement = function(a) {
    return Rc(this.l, a)
  };
  h.createTextNode = function(a) {
    return this.l.createTextNode(String(a))
  };
  var cd = function(a) {
    a = a.l;
    return a.parentWindow || a.defaultView
  };
  h = Ec.prototype;
  h.appendChild = Tc;
  h.append = Uc;
  h.canHaveChildren = function(a) {
    if (1 != a.nodeType) return !1;
    switch (a.tagName) {
      case "APPLET":
      case "AREA":
      case "BASE":
      case "BR":
      case "COL":
      case "COMMAND":
      case "EMBED":
      case "FRAME":
      case "HR":
      case "IMG":
      case "INPUT":
      case "IFRAME":
      case "ISINDEX":
      case "KEYGEN":
      case "LINK":
      case "NOFRAMES":
      case "NOSCRIPT":
      case "META":
      case "OBJECT":
      case "PARAM":
      case "SCRIPT":
      case "SOURCE":
      case "STYLE":
      case "TRACK":
      case "WBR":
        return !1
    }
    return !0
  };
  h.Ue = Wc;
  h.removeNode = Yc;
  var dd = function(a) {
    return void 0 != a.children ? a.children : Array.prototype.filter.call(a.childNodes, function(b) {
      return 1 == b.nodeType
    })
  };
  Ec.prototype.contains = $c;
  Ec.prototype.sf = function(a) {
    u(null != a, "goog.dom.setTextContent expects a non-null value for node");
    if ("textContent" in a) a.textContent = void 0;
    else if (3 == a.nodeType) a.data = "undefined";
    else if (a.firstChild && 3 == a.firstChild.nodeType) {
      for (; a.lastChild != a.firstChild;) a.removeChild(u(a.lastChild));
      a.firstChild.data = "undefined"
    } else {
      Vc(a);
      var b = G(a);
      a.appendChild(b.createTextNode("undefined"))
    }
  };
  var ed = function() {
    if (!r.addEventListener || !Object.defineProperty) return !1;
    var a = !1,
      b = Object.defineProperty({}, "passive", {
        get: function() {
          a = !0
        }
      });
    try {
      r.addEventListener("test", function() {}, b), r.removeEventListener("test", function() {}, b)
    } catch (c) {}
    return a
  }();
  var fd = function(a) {
    return B ? "webkit" + a : a.toLowerCase()
  };
  var gd = fd("AnimationEnd"),
    hd = fd("TransitionEnd");
  var id = function(a, b, c, d) {
    this.top = a;
    this.right = b;
    this.bottom = c;
    this.left = d
  };
  h = id.prototype;
  h.Fe = function() {
    return this.bottom - this.top
  };
  h.clone = function() {
    return new id(this.top, this.right, this.bottom, this.left)
  };
  h.toString = function() {
    return "(" + this.top + "t, " + this.right + "r, " + this.bottom + "b, " + this.left + "l)"
  };
  h.contains = function(a) {
    return this && a ? a instanceof id ? a.left >= this.left && a.right <= this.right && a.top >= this.top && a.bottom <= this.bottom : a.x >= this.left && a.x <= this.right && a.y >= this.top && a.y <= this.bottom : !1
  };
  h.expand = function(a, b, c, d) {
    xa(a) ? (this.top -= a.top, this.right += a.right, this.bottom += a.bottom, this.left -= a.left) : (this.top -= a, this.right += Number(b), this.bottom += Number(c), this.left -= Number(d));
    return this
  };
  h.ceil = function() {
    this.top = Math.ceil(this.top);
    this.right = Math.ceil(this.right);
    this.bottom = Math.ceil(this.bottom);
    this.left = Math.ceil(this.left);
    return this
  };
  h.floor = function() {
    this.top = Math.floor(this.top);
    this.right = Math.floor(this.right);
    this.bottom = Math.floor(this.bottom);
    this.left = Math.floor(this.left);
    return this
  };
  h.round = function() {
    this.top = Math.round(this.top);
    this.right = Math.round(this.right);
    this.bottom = Math.round(this.bottom);
    this.left = Math.round(this.left);
    return this
  };
  h.translate = function(a, b) {
    a instanceof F ? (this.left += a.x, this.right += a.x, this.top += a.y, this.bottom += a.y) : (Na(a), this.left += a, this.right += a, "number" === typeof b && (this.top += b, this.bottom += b));
    return this
  };
  h.scale = function(a, b) {
    b = "number" === typeof b ? b : a;
    this.left *= a;
    this.right *= a;
    this.top *= b;
    this.bottom *= b;
    return this
  };
  var jd = function(a, b, c, d) {
    this.left = a;
    this.top = b;
    this.width = c;
    this.height = d
  };
  h = jd.prototype;
  h.clone = function() {
    return new jd(this.left, this.top, this.width, this.height)
  };
  h.toString = function() {
    return "(" + this.left + ", " + this.top + " - " + this.width + "w x " + this.height + "h)"
  };
  h.contains = function(a) {
    return a instanceof F ? a.x >= this.left && a.x <= this.left + this.width && a.y >= this.top && a.y <= this.top + this.height : this.left <= a.left && this.left + this.width >= a.left + a.width && this.top <= a.top && this.top + this.height >= a.top + a.height
  };
  h.ceil = function() {
    this.left = Math.ceil(this.left);
    this.top = Math.ceil(this.top);
    this.width = Math.ceil(this.width);
    this.height = Math.ceil(this.height);
    return this
  };
  h.floor = function() {
    this.left = Math.floor(this.left);
    this.top = Math.floor(this.top);
    this.width = Math.floor(this.width);
    this.height = Math.floor(this.height);
    return this
  };
  h.round = function() {
    this.left = Math.round(this.left);
    this.top = Math.round(this.top);
    this.width = Math.round(this.width);
    this.height = Math.round(this.height);
    return this
  };
  h.translate = function(a, b) {
    a instanceof F ? (this.left += a.x, this.top += a.y) : (this.left += Na(a), "number" === typeof b && (this.top += b));
    return this
  };
  h.scale = function(a, b) {
    b = "number" === typeof b ? b : a;
    this.left *= a;
    this.width *= a;
    this.top *= b;
    this.height *= b;
    return this
  };
  var ld = function(a, b, c) {
      if ("string" === typeof b)(b = kd(a, b)) && (a.style[b] = c);
      else
        for (var d in b) {
          c = a;
          var e = b[d],
            f = kd(c, d);
          f && (c.style[f] = e)
        }
    },
    md = {},
    kd = function(a, b) {
      var c = md[b];
      if (!c) {
        var d = Cc(b);
        c = d;
        void 0 === a.style[d] && (d = (B ? "Webkit" : A ? "Moz" : x ? "ms" : null) + Dc(d), void 0 !== a.style[d] && (c = d));
        md[b] = c
      }
      return c
    },
    I = function(a, b) {
      var c = G(a);
      return c.defaultView && c.defaultView.getComputedStyle && (a = c.defaultView.getComputedStyle(a, null)) ? a[b] || a.getPropertyValue(b) || "" : ""
    },
    nd = function(a, b) {
      return I(a, b) || (a.currentStyle ?
        a.currentStyle[b] : null) || a.style && a.style[b]
    },
    od = function(a) {
      return nd(a, "position")
    },
    qd = function(a, b, c) {
      if (b instanceof F) {
        var d = b.x;
        b = b.y
      } else d = b, b = c;
      a.style.left = pd(d, !1);
      a.style.top = pd(b, !1)
    },
    rd = function(a) {
      try {
        return a.getBoundingClientRect()
      } catch (b) {
        return {
          left: 0,
          top: 0,
          right: 0,
          bottom: 0
        }
      }
    },
    sd = function(a) {
      if (x && !(8 <= Number(Rb))) return u(a && "offsetParent" in a), a.offsetParent;
      var b = G(a),
        c = nd(a, "position"),
        d = "fixed" == c || "absolute" == c;
      for (a = a.parentNode; a && a != b; a = a.parentNode)
        if (11 == a.nodeType &&
          a.host && (a = a.host), c = nd(a, "position"), d = d && "static" == c && a != b.documentElement && a != b.body, !d && (a.scrollWidth > a.clientWidth || a.scrollHeight > a.clientHeight || "fixed" == c || "absolute" == c || "relative" == c)) return a;
      return null
    },
    ud = function(a) {
      for (var b = new id(0, Infinity, Infinity, 0), c = Fc(a), d = c.l.body, e = c.l.documentElement, f = Mc(c.l); a = sd(a);)
        if (!(x && 0 == a.clientWidth || B && 0 == a.clientHeight && a == d) && a != d && a != e && "visible" != nd(a, "overflow")) {
          var g = td(a),
            k = new F(a.clientLeft, a.clientTop);
          g.x += k.x;
          g.y += k.y;
          b.top = Math.max(b.top,
            g.y);
          b.right = Math.min(b.right, g.x + a.clientWidth);
          b.bottom = Math.min(b.bottom, g.y + a.clientHeight);
          b.left = Math.max(b.left, g.x)
        } d = f.scrollLeft;
      f = f.scrollTop;
      b.left = Math.max(b.left, d);
      b.top = Math.max(b.top, f);
      c = Lc(cd(c) || window);
      b.right = Math.min(b.right, d + c.width);
      b.bottom = Math.min(b.bottom, f + c.height);
      return 0 <= b.top && 0 <= b.left && b.bottom > b.top && b.right > b.left ? b : null
    },
    td = function(a) {
      var b = G(a);
      Qa(a, "Parameter is required");
      var c = new F(0, 0);
      var d = b ? G(b) : document;
      d = !x || 9 <= Number(Rb) || Kc(Fc(d).l) ? d.documentElement :
        d.body;
      if (a == d) return c;
      a = rd(a);
      b = Nc(Fc(b).l);
      c.x = a.left + b.x;
      c.y = a.top + b.y;
      return c
    },
    wd = function(a, b, c) {
      if (b instanceof Bc) c = b.height, b = b.width;
      else if (void 0 == c) throw Error("missing height argument");
      a.style.width = pd(b, !0);
      vd(a, c)
    },
    pd = function(a, b) {
      "number" == typeof a && (a = (b ? Math.round(a) : a) + "px");
      return a
    },
    vd = function(a, b) {
      a.style.height = pd(b, !0)
    },
    yd = function(a) {
      var b = xd;
      if ("none" != nd(a, "display")) return b(a);
      var c = a.style,
        d = c.display,
        e = c.visibility,
        f = c.position;
      c.visibility = "hidden";
      c.position =
        "absolute";
      c.display = "inline";
      a = b(a);
      c.display = d;
      c.position = f;
      c.visibility = e;
      return a
    },
    xd = function(a) {
      var b = a.offsetWidth,
        c = a.offsetHeight,
        d = B && !b && !c;
      return (void 0 === b || d) && a.getBoundingClientRect ? (a = rd(a), new Bc(a.right - a.left, a.bottom - a.top)) : new Bc(b, c)
    },
    zd = function(a, b) {
      u(a);
      a = a.style;
      "opacity" in a ? a.opacity = b : "MozOpacity" in a ? a.MozOpacity = b : "filter" in a && (a.filter = "" === b ? "" : "alpha(opacity=" + 100 * Number(b) + ")")
    },
    K = function(a, b) {
      a.style.display = b ? "" : "none"
    },
    Ad = function(a) {
      return "rtl" == nd(a, "direction")
    },
    Bd = function(a, b) {
      if (/^\d+px?$/.test(b)) return parseInt(b, 10);
      var c = a.style.left,
        d = a.runtimeStyle.left;
      a.runtimeStyle.left = a.currentStyle.left;
      a.style.left = b;
      b = a.style.pixelLeft;
      a.style.left = c;
      a.runtimeStyle.left = d;
      return +b
    },
    Cd = function(a, b) {
      return (b = a.currentStyle ? a.currentStyle[b] : null) ? Bd(a, b) : 0
    },
    Dd = {
      thin: 2,
      medium: 4,
      thick: 6
    },
    Ed = function(a, b) {
      if ("none" == (a.currentStyle ? a.currentStyle[b + "Style"] : null)) return 0;
      b = a.currentStyle ? a.currentStyle[b + "Width"] : null;
      return b in Dd ? Dd[b] : Bd(a, b)
    },
    Fd = function(a) {
      if (x &&
        !(9 <= Number(Rb))) {
        var b = Ed(a, "borderLeft"),
          c = Ed(a, "borderRight"),
          d = Ed(a, "borderTop");
        a = Ed(a, "borderBottom");
        return new id(d, c, a, b)
      }
      b = I(a, "borderLeftWidth");
      c = I(a, "borderRightWidth");
      d = I(a, "borderTopWidth");
      a = I(a, "borderBottomWidth");
      return new id(parseFloat(d), parseFloat(c), parseFloat(a), parseFloat(b))
    };
  var Gd = !1,
    Hd = !1,
    Id = function(a) {
      var b = document.createElement("div");
      a = n(a);
      for (var c = a.next(); !c.done; c = a.next())
        if (null != b.style[c.value]) return !0;
      return !1
    },
    Jd = Id(["WebkitAnimation", "MozAnimation", "OAnimation", "animation"]) ? gd : null,
    L = Id(["WebkitTransition", "MozTransition", "OTransition", "transition"]) ? hd : null,
    Kd = function() {
      if (Hd) return Gd;
      var a = Rc(document, "DETAILS");
      if (!("open" in a)) return !1;
      Uc(a, Qc("SUMMARY", null, "a"), "b");
      ld(a, "display", "block");
      document.body.appendChild(a);
      var b = a.offsetHeight;
      a.setAttribute("open", !0);
      b = a.offsetHeight != b;
      Yc(a);
      Gd = b;
      Hd = !0;
      return b
    };
  var M = {
    ib: !1,
    Ee: function(a) {
      return "string" == typeof a.className ? a.className : a.getAttribute && a.getAttribute("class") || ""
    },
    get: function(a) {
      return M.ib || a.classList ? a.classList : M.Ee(a).match(/\S+/g) || []
    },
    set: function(a, b) {
      "string" == typeof a.className ? a.className = b : a.setAttribute && a.setAttribute("class", b)
    },
    contains: function(a, b) {
      return M.ib || a.classList ? a.classList.contains(b) : Za(M.get(a), b)
    },
    add: function(a, b) {
      if (M.ib || a.classList) a.classList.add(b);
      else if (!M.contains(a, b)) {
        var c = M.Ee(a);
        M.set(a, c + (0 <
          c.length ? " " + b : b))
      }
    },
    addAll: function(a, b) {
      if (M.ib || a.classList) Array.prototype.forEach.call(b, function(e) {
        M.add(a, e)
      });
      else {
        var c = {};
        Array.prototype.forEach.call(M.get(a), function(e) {
          c[e] = !0
        });
        Array.prototype.forEach.call(b, function(e) {
          c[e] = !0
        });
        b = "";
        for (var d in c) b += 0 < b.length ? " " + d : d;
        M.set(a, b)
      }
    },
    remove: function(a, b) {
      M.ib || a.classList ? a.classList.remove(b) : M.contains(a, b) && M.set(a, Array.prototype.filter.call(M.get(a), function(c) {
        return c != b
      }).join(" "))
    },
    ka: function(a, b) {
      M.ib || a.classList ? Array.prototype.forEach.call(b,
        function(c) {
          M.remove(a, c)
        }) : M.set(a, Array.prototype.filter.call(M.get(a), function(c) {
        return !Za(b, c)
      }).join(" "))
    },
    enable: function(a, b, c) {
      c ? M.add(a, b) : M.remove(a, b)
    },
    mj: function(a, b, c) {
      (c ? M.addAll : M.ka)(a, b)
    },
    rj: function(a, b, c) {
      return M.contains(a, b) ? (M.remove(a, b), M.add(a, c), !0) : !1
    },
    toggle: function(a, b) {
      var c = !M.contains(a, b);
      M.enable(a, b, c);
      return c
    },
    kj: function(a, b, c) {
      M.remove(a, b);
      M.add(a, c)
    }
  };
  var Ld = Object.freeze || function(a) {
    return a
  };

  function Md(a) {
    a && "function" == typeof a.wa && a.wa()
  };

  function Nd(a) {
    for (var b = 0, c = arguments.length; b < c; ++b) {
      var d = arguments[b];
      wa(d) ? Nd.apply(null, d) : Md(d)
    }
  };
  var Od = function() {
    this.Ra = this.Ra;
    this.Ya = this.Ya
  };
  Od.prototype.Ra = !1;
  Od.prototype.wa = function() {
    this.Ra || (this.Ra = !0, this.B())
  };
  Od.prototype.B = function() {
    if (this.Ya)
      for (; this.Ya.length;) this.Ya.shift()()
  };
  var N = function(a, b) {
    this.type = a;
    this.currentTarget = this.target = b;
    this.defaultPrevented = this.Xb = !1
  };
  N.prototype.stopPropagation = function() {
    this.Xb = !0
  };
  N.prototype.preventDefault = function() {
    this.defaultPrevented = !0
  };
  var Pd = function(a) {
    a.preventDefault()
  };
  var Qd = function(a, b) {
    N.call(this, a ? a.type : "");
    this.relatedTarget = this.currentTarget = this.target = null;
    this.button = this.screenY = this.screenX = this.clientY = this.clientX = this.offsetY = this.offsetX = 0;
    this.key = "";
    this.charCode = this.keyCode = 0;
    this.metaKey = this.shiftKey = this.altKey = this.ctrlKey = !1;
    this.state = null;
    this.pointerId = 0;
    this.pointerType = "";
    this.ha = null;
    a && this.ja(a, b)
  };
  t(Qd, N);
  var Rd = Ld({
    2: "touch",
    3: "pen",
    4: "mouse"
  });
  Qd.prototype.ja = function(a, b) {
    var c = this.type = a.type,
      d = a.changedTouches && a.changedTouches.length ? a.changedTouches[0] : null;
    this.target = a.target || a.srcElement;
    this.currentTarget = b;
    (b = a.relatedTarget) ? A && (vb(b, "nodeName") || (b = null)): "mouseover" == c ? b = a.fromElement : "mouseout" == c && (b = a.toElement);
    this.relatedTarget = b;
    d ? (this.clientX = void 0 !== d.clientX ? d.clientX : d.pageX, this.clientY = void 0 !== d.clientY ? d.clientY : d.pageY, this.screenX = d.screenX || 0, this.screenY = d.screenY || 0) : (this.offsetX = B || void 0 !== a.offsetX ?
      a.offsetX : a.layerX, this.offsetY = B || void 0 !== a.offsetY ? a.offsetY : a.layerY, this.clientX = void 0 !== a.clientX ? a.clientX : a.pageX, this.clientY = void 0 !== a.clientY ? a.clientY : a.pageY, this.screenX = a.screenX || 0, this.screenY = a.screenY || 0);
    this.button = a.button;
    this.keyCode = a.keyCode || 0;
    this.key = a.key || "";
    this.charCode = a.charCode || ("keypress" == c ? a.keyCode : 0);
    this.ctrlKey = a.ctrlKey;
    this.altKey = a.altKey;
    this.shiftKey = a.shiftKey;
    this.metaKey = a.metaKey;
    this.pointerId = a.pointerId || 0;
    this.pointerType = "string" === typeof a.pointerType ?
      a.pointerType : Rd[a.pointerType] || "";
    this.state = a.state;
    this.ha = a;
    a.defaultPrevented && Qd.v.preventDefault.call(this)
  };
  Qd.prototype.stopPropagation = function() {
    Qd.v.stopPropagation.call(this);
    this.ha.stopPropagation ? this.ha.stopPropagation() : this.ha.cancelBubble = !0
  };
  Qd.prototype.preventDefault = function() {
    Qd.v.preventDefault.call(this);
    var a = this.ha;
    a.preventDefault ? a.preventDefault() : a.returnValue = !1
  };
  var Sd = "closure_listenable_" + (1E6 * Math.random() | 0),
    Td = function(a) {
      return !(!a || !a[Sd])
    };
  var Ud = 0;
  var Vd = function(a, b, c, d, e) {
      this.listener = a;
      this.proxy = null;
      this.src = b;
      this.type = c;
      this.capture = !!d;
      this.Cc = e;
      this.key = ++Ud;
      this.Db = this.mc = !1
    },
    Wd = function(a) {
      a.Db = !0;
      a.listener = null;
      a.proxy = null;
      a.src = null;
      a.Cc = null
    };
  var Xd = function(a) {
    this.src = a;
    this.H = {};
    this.hc = 0
  };
  Xd.prototype.add = function(a, b, c, d, e) {
    var f = a.toString();
    a = this.H[f];
    a || (a = this.H[f] = [], this.hc++);
    var g = Yd(a, b, d, e); - 1 < g ? (b = a[g], c || (b.mc = !1)) : (b = new Vd(b, this.src, f, !!d, e), b.mc = c, a.push(b));
    return b
  };
  Xd.prototype.remove = function(a, b, c, d) {
    a = a.toString();
    if (!(a in this.H)) return !1;
    var e = this.H[a];
    b = Yd(e, b, c, d);
    return -1 < b ? (Wd(e[b]), u(null != e.length), Array.prototype.splice.call(e, b, 1), 0 == e.length && (delete this.H[a], this.hc--), !0) : !1
  };
  var Zd = function(a, b) {
    var c = b.type;
    if (!(c in a.H)) return !1;
    var d = $a(a.H[c], b);
    d && (Wd(b), 0 == a.H[c].length && (delete a.H[c], a.hc--));
    return d
  };
  Xd.prototype.ka = function(a) {
    a = a && a.toString();
    var b = 0,
      c;
    for (c in this.H)
      if (!a || c == a) {
        for (var d = this.H[c], e = 0; e < d.length; e++) ++b, Wd(d[e]);
        delete this.H[c];
        this.hc--
      } return b
  };
  Xd.prototype.Qb = function(a, b, c, d) {
    a = this.H[a.toString()];
    var e = -1;
    a && (e = Yd(a, b, c, d));
    return -1 < e ? a[e] : null
  };
  Xd.prototype.hasListener = function(a, b) {
    var c = void 0 !== a,
      d = c ? a.toString() : "",
      e = void 0 !== b;
    return Xb(this.H, function(f) {
      for (var g = 0; g < f.length; ++g)
        if (!(c && f[g].type != d || e && f[g].capture != b)) return !0;
      return !1
    })
  };
  var Yd = function(a, b, c, d) {
    for (var e = 0; e < a.length; ++e) {
      var f = a[e];
      if (!f.Db && f.listener == b && f.capture == !!c && f.Cc == d) return e
    }
    return -1
  };
  var $d = "closure_lm_" + (1E6 * Math.random() | 0),
    ae = {},
    be = 0,
    O = function(a, b, c, d, e) {
      if (d && d.once) return ce(a, b, c, d, e);
      if (Array.isArray(b)) {
        for (var f = 0; f < b.length; f++) O(a, b[f], c, d, e);
        return null
      }
      c = de(c);
      return Td(a) ? a.F(b, c, xa(d) ? !!d.capture : !!d, e) : ee(a, b, c, !1, d, e)
    },
    ee = function(a, b, c, d, e, f) {
      if (!b) throw Error("Invalid event type");
      var g = xa(e) ? !!e.capture : !!e,
        k = fe(a);
      k || (a[$d] = k = new Xd(a));
      c = k.add(b, c, d, g, f);
      if (c.proxy) return c;
      d = ge();
      c.proxy = d;
      d.src = a;
      d.listener = c;
      if (a.addEventListener) ed || (e = g), void 0 === e &&
        (e = !1), a.addEventListener(b.toString(), d, e);
      else if (a.attachEvent) a.attachEvent(he(b.toString()), d);
      else if (a.addListener && a.removeListener) u("change" === b, "MediaQueryList only has a change event"), a.addListener(d);
      else throw Error("addEventListener and attachEvent are unavailable.");
      be++;
      return c
    },
    ge = function() {
      var a = ie,
        b = function(c) {
          return a.call(b.src, b.listener, c)
        };
      return b
    },
    ce = function(a, b, c, d, e) {
      if (Array.isArray(b)) {
        for (var f = 0; f < b.length; f++) ce(a, b[f], c, d, e);
        return null
      }
      c = de(c);
      return Td(a) ?
        a.Id(b, c, xa(d) ? !!d.capture : !!d, e) : ee(a, b, c, !0, d, e)
    },
    P = function(a, b, c, d, e) {
      if (Array.isArray(b))
        for (var f = 0; f < b.length; f++) P(a, b[f], c, d, e);
      else d = xa(d) ? !!d.capture : !!d, c = de(c), Td(a) ? a.ic(b, c, d, e) : a && (a = fe(a)) && (b = a.Qb(b, c, d, e)) && Q(b)
    },
    Q = function(a) {
      if ("number" === typeof a || !a || a.Db) return !1;
      var b = a.src;
      if (Td(b)) return Zd(b.aa, a);
      var c = a.type,
        d = a.proxy;
      b.removeEventListener ? b.removeEventListener(c, d, a.capture) : b.detachEvent ? b.detachEvent(he(c), d) : b.addListener && b.removeListener && b.removeListener(d);
      be--;
      (c = fe(b)) ? (Zd(c, a), 0 == c.hc && (c.src = null, b[$d] = null)) : Wd(a);
      return !0
    },
    R = function(a, b) {
      if (a)
        if (Td(a)) a.aa && a.aa.ka(b);
        else if (a = fe(a)) {
        var c = 0;
        b = b && b.toString();
        for (var d in a.H)
          if (!b || d == b)
            for (var e = a.H[d].concat(), f = 0; f < e.length; ++f) Q(e[f]) && ++c
      }
    },
    he = function(a) {
      return a in ae ? ae[a] : ae[a] = "on" + a
    },
    le = function(a, b) {
      var c = window;
      if (Td(c)) je(c, a, !1, b);
      else if (c = fe(c))
        if (a = c.H[a.toString()])
          for (a = a.concat(), c = 0; c < a.length; c++) {
            var d = a[c];
            d && 0 == d.capture && !d.Db && ke(d, b)
          }
    },
    ke = function(a, b) {
      var c = a.listener,
        d = a.Cc || a.src;
      a.mc && Q(a);
      return c.call(d, b)
    },
    ie = function(a, b) {
      return a.Db ? !0 : ke(a, new Qd(b, this))
    },
    fe = function(a) {
      a = a[$d];
      return a instanceof Xd ? a : null
    },
    me = "__closure_events_fn_" + (1E9 * Math.random() >>> 0),
    de = function(a) {
      u(a, "Listener can not be null.");
      if ("function" === typeof a) return a;
      u(a.handleEvent, "An object listener must have handleEvent method.");
      a[me] || (a[me] = function(b) {
        return a.handleEvent(b)
      });
      return a[me]
    };
  var ne = function(a) {
    Od.call(this);
    this.U = a;
    this.yb = {}
  };
  t(ne, Od);
  var oe = [];
  ne.prototype.F = function(a, b, c, d) {
    Array.isArray(b) || (b && (oe[0] = b.toString()), b = oe);
    for (var e = 0; e < b.length; e++) {
      var f = O(a, b[e], c || this.handleEvent, d || !1, this.U || this);
      if (!f) break;
      this.yb[f.key] = f
    }
    return this
  };
  ne.prototype.Id = function(a, b, c, d) {
    return pe(this, a, b, c, d)
  };
  var pe = function(a, b, c, d, e, f) {
    if (Array.isArray(c))
      for (var g = 0; g < c.length; g++) pe(a, b, c[g], d, e, f);
    else {
      b = ce(b, c, d || a.handleEvent, e, f || a.U || a);
      if (!b) return a;
      a.yb[b.key] = b
    }
    return a
  };
  ne.prototype.ic = function(a, b, c, d, e) {
    if (Array.isArray(b))
      for (var f = 0; f < b.length; f++) this.ic(a, b[f], c, d, e);
    else c = c || this.handleEvent, d = xa(d) ? !!d.capture : !!d, e = e || this.U || this, c = de(c), d = !!d, b = Td(a) ? a.Qb(b, c, d, e) : a ? (a = fe(a)) ? a.Qb(b, c, d, e) : null : null, b && (Q(b), delete this.yb[b.key]);
    return this
  };
  ne.prototype.ka = function() {
    Wb(this.yb, function(a, b) {
      this.yb.hasOwnProperty(b) && Q(a)
    }, this);
    this.yb = {}
  };
  ne.prototype.B = function() {
    ne.v.B.call(this);
    this.ka()
  };
  ne.prototype.handleEvent = function() {
    throw Error("EventHandler.handleEvent not implemented");
  };
  var S = function() {
    Od.call(this);
    this.aa = new Xd(this);
    this.Lf = this;
    this.Qc = null
  };
  t(S, Od);
  S.prototype[Sd] = !0;
  h = S.prototype;
  h.Sd = function(a) {
    this.Qc = a
  };
  h.addEventListener = function(a, b, c, d) {
    O(this, a, b, c, d)
  };
  h.removeEventListener = function(a, b, c, d) {
    P(this, a, b, c, d)
  };
  h.dispatchEvent = function(a) {
    qe(this);
    var b = this.Qc;
    if (b) {
      var c = [];
      for (var d = 1; b; b = b.Qc) c.push(b), u(1E3 > ++d, "infinite loop")
    }
    b = this.Lf;
    d = a.type || a;
    if ("string" === typeof a) a = new N(a, b);
    else if (a instanceof N) a.target = a.target || b;
    else {
      var e = a;
      a = new N(d, b);
      $b(a, e)
    }
    e = !0;
    if (c)
      for (var f = c.length - 1; !a.Xb && 0 <= f; f--) {
        var g = a.currentTarget = c[f];
        e = je(g, d, !0, a) && e
      }
    a.Xb || (g = a.currentTarget = b, e = je(g, d, !0, a) && e, a.Xb || (e = je(g, d, !1, a) && e));
    if (c)
      for (f = 0; !a.Xb && f < c.length; f++) g = a.currentTarget = c[f], e = je(g, d, !1, a) && e;
    return e
  };
  h.B = function() {
    S.v.B.call(this);
    this.aa && this.aa.ka(void 0);
    this.Qc = null
  };
  h.F = function(a, b, c, d) {
    qe(this);
    return this.aa.add(String(a), b, !1, c, d)
  };
  h.Id = function(a, b, c, d) {
    return this.aa.add(String(a), b, !0, c, d)
  };
  h.ic = function(a, b, c, d) {
    return this.aa.remove(String(a), b, c, d)
  };
  var je = function(a, b, c, d) {
    b = a.aa.H[String(b)];
    if (!b) return !0;
    b = b.concat();
    for (var e = !0, f = 0; f < b.length; ++f) {
      var g = b[f];
      if (g && !g.Db && g.capture == c) {
        var k = g.listener,
          l = g.Cc || g.src;
        g.mc && Zd(a.aa, g);
        e = !1 !== k.call(l, d) && e
      }
    }
    return e && !d.defaultPrevented
  };
  S.prototype.Qb = function(a, b, c, d) {
    return this.aa.Qb(String(a), b, c, d)
  };
  S.prototype.hasListener = function(a, b) {
    return this.aa.hasListener(void 0 !== a ? String(a) : void 0, b)
  };
  var qe = function(a) {
    u(a.aa, "Event target is not initialized. Did you call the superclass (goog.events.EventTarget) constructor?")
  };
  var re = new WeakMap,
    se = function(a, b) {
      a = [a];
      for (var c = b.length - 1; 0 <= c; --c) a.push(typeof b[c], b[c]);
      return a.join("\v")
    };
  var te = function(a, b) {
    this.qg = 100;
    this.Zf = a;
    this.Rg = b;
    this.Mc = 0;
    this.V = null
  };
  te.prototype.get = function() {
    if (0 < this.Mc) {
      this.Mc--;
      var a = this.V;
      this.V = a.next;
      a.next = null
    } else a = this.Zf();
    return a
  };
  te.prototype.put = function(a) {
    this.Rg(a);
    this.Mc < this.qg && (this.Mc++, a.next = this.V, this.V = a)
  };
  var ue, ve = function() {
    var a = r.MessageChannel;
    "undefined" === typeof a && "undefined" !== typeof window && window.postMessage && window.addEventListener && !w("Presto") && (a = function() {
      var e = Rc(document, "IFRAME");
      e.style.display = "none";
      document.documentElement.appendChild(e);
      var f = e.contentWindow;
      e = f.document;
      e.open();
      e.close();
      var g = "callImmediate" + Math.random(),
        k = "file:" == f.location.protocol ? "*" : f.location.protocol + "//" + f.location.host;
      e = Da(function(l) {
          if (("*" == k || l.origin == k) && l.data == g) this.port1.onmessage()
        },
        this);
      f.addEventListener("message", e, !1);
      this.port1 = {};
      this.port2 = {
        postMessage: function() {
          f.postMessage(g, k)
        }
      }
    });
    if ("undefined" !== typeof a && !ob()) {
      var b = new a,
        c = {},
        d = c;
      b.port1.onmessage = function() {
        if (void 0 !== c.next) {
          c = c.next;
          var e = c.te;
          c.te = null;
          e()
        }
      };
      return function(e) {
        d.next = {
          te: e
        };
        d = d.next;
        b.port2.postMessage(0)
      }
    }
    return function(e) {
      r.setTimeout(e, 0)
    }
  };

  function we(a) {
    r.setTimeout(function() {
      throw a;
    }, 0)
  };
  var xe = function() {
    this.hd = this.hb = null
  };
  xe.prototype.add = function(a, b) {
    var c = ye.get();
    c.set(a, b);
    this.hd ? this.hd.next = c : (u(!this.hb), this.hb = c);
    this.hd = c
  };
  xe.prototype.remove = function() {
    var a = null;
    this.hb && (a = this.hb, this.hb = this.hb.next, this.hb || (this.hd = null), a.next = null);
    return a
  };
  var ye = new te(function() {
      return new ze
    }, function(a) {
      return a.reset()
    }),
    ze = function() {
      this.next = this.scope = this.ya = null
    };
  ze.prototype.set = function(a, b) {
    this.ya = a;
    this.scope = b;
    this.next = null
  };
  ze.prototype.reset = function() {
    this.next = this.scope = this.ya = null
  };
  var Ae, Be = !1,
    Ce = new xe,
    Ee = function(a, b) {
      Ae || De();
      Be || (Ae(), Be = !0);
      Ce.add(a, b)
    },
    De = function() {
      if (r.Promise && r.Promise.resolve) {
        var a = r.Promise.resolve(void 0);
        Ae = function() {
          a.then(Fe)
        }
      } else Ae = function() {
        var b = Fe;
        "function" !== typeof r.setImmediate || r.Window && r.Window.prototype && !w("Edge") && r.Window.prototype.setImmediate == r.setImmediate ? (ue || (ue = ve()), ue(b)) : r.setImmediate(b)
      }
    },
    Fe = function() {
      for (var a; a = Ce.remove();) {
        try {
          a.ya.call(a.scope)
        } catch (b) {
          we(b)
        }
        ye.put(a)
      }
      Be = !1
    };
  var T = function(a) {
      this.ea = 0;
      this.pf = void 0;
      this.mb = this.ua = this.R = null;
      this.Ac = this.xd = !1;
      if (a != Tb) try {
        var b = this;
        a.call(void 0, function(c) {
          Ge(b, 2, c)
        }, function(c) {
          if (!(c instanceof He)) try {
            if (c instanceof Error) throw c;
            throw Error("Promise rejected.");
          } catch (d) {}
          Ge(b, 3, c)
        })
      } catch (c) {
        Ge(this, 3, c)
      }
    },
    Ie = function() {
      this.next = this.context = this.Bb = this.Za = this.Pa = null;
      this.kc = !1
    };
  Ie.prototype.reset = function() {
    this.context = this.Bb = this.Za = this.Pa = null;
    this.kc = !1
  };
  var Je = new te(function() {
      return new Ie
    }, function(a) {
      a.reset()
    }),
    Ke = function(a, b, c) {
      var d = Je.get();
      d.Za = a;
      d.Bb = b;
      d.context = c;
      return d
    },
    Le = function(a) {
      if (a instanceof T) return a;
      var b = new T(Tb);
      Ge(b, 2, a);
      return b
    },
    Me = function(a) {
      return new T(function(b, c) {
        c(a)
      })
    },
    Oe = function(a, b, c) {
      Ne(a, b, c, null) || Ee(Ea(b, a))
    },
    Pe = function(a) {
      return new T(function(b, c) {
        var d = a.length,
          e = [];
        if (d)
          for (var f = function(m, p) {
              d--;
              e[m] = p;
              0 == d && b(e)
            }, g = function(m) {
              c(m)
            }, k = 0, l; k < a.length; k++) l = a[k], Oe(l, Ea(f, k), g);
        else b(e)
      })
    };
  T.prototype.then = function(a, b, c) {
    null != a && Pa(a, "opt_onFulfilled should be a function.");
    null != b && Pa(b, "opt_onRejected should be a function. Did you pass opt_context as the second argument instead of the third?");
    return Qe(this, "function" === typeof a ? a : null, "function" === typeof b ? b : null, c)
  };
  T.prototype.$goog_Thenable = !0;
  T.prototype.Zc = function(a, b) {
    return Qe(this, null, a, b)
  };
  T.prototype.catch = T.prototype.Zc;
  T.prototype.cancel = function(a) {
    if (0 == this.ea) {
      var b = new He(a);
      Ee(function() {
        Re(this, b)
      }, this)
    }
  };
  var Re = function(a, b) {
      if (0 == a.ea)
        if (a.R) {
          var c = a.R;
          if (c.ua) {
            for (var d = 0, e = null, f = null, g = c.ua; g && (g.kc || (d++, g.Pa == a && (e = g), !(e && 1 < d))); g = g.next) e || (f = g);
            e && (0 == c.ea && 1 == d ? Re(c, b) : (f ? (d = f, u(c.ua), u(null != d), d.next == c.mb && (c.mb = d), d.next = d.next.next) : Se(c), Te(c, e, 3, b)))
          }
          a.R = null
        } else Ge(a, 3, b)
    },
    Ve = function(a, b) {
      a.ua || 2 != a.ea && 3 != a.ea || Ue(a);
      u(null != b.Za);
      a.mb ? a.mb.next = b : a.ua = b;
      a.mb = b
    },
    Qe = function(a, b, c, d) {
      var e = Ke(null, null, null);
      e.Pa = new T(function(f, g) {
        e.Za = b ? function(k) {
            try {
              var l = b.call(d, k);
              f(l)
            } catch (m) {
              g(m)
            }
          } :
          f;
        e.Bb = c ? function(k) {
          try {
            var l = c.call(d, k);
            void 0 === l && k instanceof He ? g(k) : f(l)
          } catch (m) {
            g(m)
          }
        } : g
      });
      e.Pa.R = a;
      Ve(a, e);
      return e.Pa
    };
  T.prototype.hh = function(a) {
    u(1 == this.ea);
    this.ea = 0;
    Ge(this, 2, a)
  };
  T.prototype.ih = function(a) {
    u(1 == this.ea);
    this.ea = 0;
    Ge(this, 3, a)
  };
  var Ge = function(a, b, c) {
      0 == a.ea && (a === c && (b = 3, c = new TypeError("Promise cannot resolve to itself")), a.ea = 1, Ne(c, a.hh, a.ih, a) || (a.pf = c, a.ea = b, a.R = null, Ue(a), 3 != b || c instanceof He || We(a, c)))
    },
    Ne = function(a, b, c, d) {
      if (a instanceof T) return null != b && Pa(b, "opt_onFulfilled should be a function."), null != c && Pa(c, "opt_onRejected should be a function. Did you pass opt_context as the second argument instead of the third?"), Ve(a, Ke(b || Tb, c || null, d)), !0;
      if (a) try {
        var e = !!a.$goog_Thenable
      } catch (g) {
        e = !1
      } else e = !1;
      if (e) return a.then(b,
        c, d), !0;
      if (xa(a)) try {
        var f = a.then;
        if ("function" === typeof f) return Xe(a, f, b, c, d), !0
      } catch (g) {
        return c.call(d, g), !0
      }
      return !1
    },
    Xe = function(a, b, c, d, e) {
      var f = !1,
        g = function(l) {
          f || (f = !0, c.call(e, l))
        },
        k = function(l) {
          f || (f = !0, d.call(e, l))
        };
      try {
        b.call(a, g, k)
      } catch (l) {
        k(l)
      }
    },
    Ue = function(a) {
      a.xd || (a.xd = !0, Ee(a.cg, a))
    },
    Se = function(a) {
      var b = null;
      a.ua && (b = a.ua, a.ua = b.next, b.next = null);
      a.ua || (a.mb = null);
      null != b && u(null != b.Za);
      return b
    };
  T.prototype.cg = function() {
    for (var a; a = Se(this);) Te(this, a, this.ea, this.pf);
    this.xd = !1
  };
  var Te = function(a, b, c, d) {
      if (3 == c && b.Bb && !b.kc)
        for (; a && a.Ac; a = a.R) a.Ac = !1;
      if (b.Pa) b.Pa.R = null, Ye(b, c, d);
      else try {
        b.kc ? b.Za.call(b.context) : Ye(b, c, d)
      } catch (e) {
        Ze.call(null, e)
      }
      Je.put(b)
    },
    Ye = function(a, b, c) {
      2 == b ? a.Za.call(a.context, c) : a.Bb && a.Bb.call(a.context, c)
    },
    We = function(a, b) {
      a.Ac = !0;
      Ee(function() {
        a.Ac && Ze.call(null, b)
      })
    },
    Ze = we,
    He = function(a) {
      Ja.call(this, a)
    };
  t(He, Ja);
  He.prototype.name = "cancel";
  var $e = function(a, b, c) {
    if ("function" === typeof a) c && (a = Da(a, c));
    else if (a && "function" == typeof a.handleEvent) a = Da(a.handleEvent, a);
    else throw Error("Invalid listener argument");
    return 2147483647 < Number(b) ? -1 : r.setTimeout(a, b || 0)
  };
  var af = function(a, b) {
    b = void 0 === b ? se : b;
    var c = Aa(a),
      d = function(f) {
        f = n(f);
        f.next();
        f = ia(f);
        return b(c, f)
      },
      e = function(f) {
        var g = n(f);
        f = g.next().value;
        g = ia(g);
        return a.apply(f, g)
      };
    return function() {
      var f = ra.apply(0, arguments),
        g = this || r,
        k = re.get(g);
      k || (k = {}, re.set(g, k));
      return wb(k, [this].concat(f instanceof Array ? f : ia(n(f))), e, d)
    }
  }(function() {
    return x ? 8 <= Number(Rb) : "onhashchange" in r
  });
  var bf = function(a, b) {
    this.name = a;
    this.value = b
  };
  bf.prototype.toString = function() {
    return this.name
  };
  var cf = new bf("OFF", Infinity),
    df = new bf("SEVERE", 1E3),
    ef = new bf("WARNING", 900),
    ff = new bf("INFO", 800),
    gf = new bf("CONFIG", 700),
    hf = new bf("FINE", 500),
    jf = function() {
      this.oc = 0;
      this.clear()
    },
    kf;
  jf.prototype.clear = function() {
    this.qe = Array(this.oc);
    this.xe = -1;
    this.We = !1
  };
  var lf = function(a, b, c) {
    this.wc = void 0;
    this.reset(a || cf, b, c, void 0, void 0)
  };
  lf.prototype.reset = function(a, b, c, d) {
    this.Df = d || Date.now();
    this.Ze = a;
    this.wg = b;
    this.af = c;
    this.wc = void 0
  };
  var mf = function(a, b) {
      this.level = null;
      this.Me = [];
      this.parent = (void 0 === b ? null : b) || null;
      this.children = [];
      this.sa = {
        rb: function() {
          return a
        }
      }
    },
    nf = function(a) {
      if (a.level) return a.level;
      if (a.parent) return nf(a.parent);
      Ma("Root logger has no level set.");
      return cf
    },
    of = function(a, b) {
      for (; a;) a.Me.forEach(function(c) {
        c(b)
      }), a = a.parent
    },
    pf = function() {
      this.entries = {};
      var a = new mf("");
      a.level = gf;
      this.entries[""] = a
    },
    qf, rf = function(a, b) {
      var c = a.entries[b];
      if (c) return c;
      c = rf(a, b.slice(0, Math.max(b.lastIndexOf("."),
        0)));
      var d = new mf(b, c);
      a.entries[b] = d;
      c.children.push(d);
      return d
    },
    sf = function() {
      qf || (qf = new pf);
      return qf
    },
    U = function(a) {
      return rf(sf(), a).sa
    },
    tf = function(a, b, c, d) {
      var e;
      if (e = a)
        if (e = a && b) {
          e = b.value;
          var f = a ? nf(rf(sf(), a.rb())) : cf;
          e = e >= f.value
        } if (e) {
        b = b || cf;
        e = rf(sf(), a.rb());
        "function" === typeof c && (c = c());
        kf || (kf = new jf);
        f = kf;
        a = a.rb();
        if (0 < f.oc) {
          var g = (f.xe + 1) % f.oc;
          f.xe = g;
          f.We ? (f = f.qe[g], f.reset(b, c, a), a = f) : (f.We = g == f.oc - 1, a = f.qe[g] = new lf(b, c, a))
        } else a = new lf(b, c, a);
        a.wc = d;
        of(e, a)
      }
    },
    V = function(a,
      b, c) {
      a && tf(a, df, b, c)
    },
    uf = function(a, b) {
      a && tf(a, ef, b)
    },
    W = function(a, b) {
      a && tf(a, ff, b)
    },
    vf = function(a, b) {
      a && tf(a, hf, b)
    };
  var wf = pb(),
    xf = sb() || w("iPod"),
    yf = w("iPad"),
    zf = w("Android") && !(rb() || pb() || w("Opera") || w("Silk")),
    Af = rb(),
    Bf = qb() && !tb();
  var Cf = function(a) {
      return (a = a.exec(nb())) ? a[1] : ""
    },
    Df = function() {
      if (wf) return Cf(/Firefox\/([0-9.]+)/);
      if (x || yb || xb) return Mb;
      if (Af) {
        if (tb() || w("Macintosh")) {
          var a = Cf(/CriOS\/([0-9.]+)/);
          if (a) return a
        }
        return Cf(/Chrome\/([0-9.]+)/)
      }
      if (Bf && !tb()) return Cf(/Version\/([0-9.]+)/);
      if (xf || yf) {
        if (a = /Version\/(\S+).*Mobile\/(\S+)/.exec(nb())) return a[1] + "." + a[2]
      } else if (zf) return (a = Cf(/Android\s+([0-9.]+)/)) ? a : Cf(/Version\/([0-9.]+)/);
      return ""
    }();
  var Ef = Ub(function() {
      return !x || 0 <= mb(Df, 9)
    }),
    Ff = Ub(function() {
      return B || yb || A && 0 <= mb(Df, 10) || x && 0 <= mb(Df, 10)
    }),
    Hf = function(a, b) {
      Ef() && (b = Ff() ? "translate3d(0px," + b + "px,0px)" : "translate(0px," + b + "px)", ld(a, Gf(), b))
    },
    Gf = Ub(function() {
      return x && 9 == Rb ? "-ms-transform" : "transform"
    });
  var Jf = function(a) {
    this.g = U("blogger.templates.responsive.CollapsedHeader");
    W(this.g, "Initializing collapsed header.");
    try {
      if (this.sc = a || new Ga, this.ec = null, this.A = document.querySelector(".centered-top-container"))
        if (this.ga = document.querySelector(".centered-top-placeholder"))
          if (this.wf = document.querySelector(this.sc.Xg)) {
            var b = this.A.querySelector(".centered-top");
            if (b) {
              this.Uf = b.cloneNode(!0);
              this.Xd = this.Sb = !1;
              this.Gd = Nc(document).y;
              var c = Vb(this.tg, this.sc.Hg, this);
              this.ec = c;
              c();
              O(this.sc.Tg,
                "scroll", this.ec);
              If(this);
              W(this.g, "Finished initializing collapsed header.")
            } else V(this.g, "There was an error initializing the collapsed header. centered-top not found.")
          } else V(this.g, "There was an error initializing the collapsed header. centered-bottom not found.");
      else V(this.g, "There was an error initializing the collapsed header. centered-top-placeholder not found.");
      else V(this.g, "There was an error initializing the collapsed header. centered-top-container not found.")
    } catch (d) {
      V(this.g,
        "There was an error initializing the collapsed header. Uncaught exception.", d), this.h()
    }
  };
  
  /*
  Jf.prototype.tg = function() {
    var a = this,
      b = this.Gd;
    this.Gd = Nc(document).y;
    b = this.Gd < b;
    0 > this.wf.getBoundingClientRect().top && b ? this.Xd || (this.Sb && (L in this.A && R(this.A, L), this.Sb = !1), this.Xd = !0, M.add(document.body, "collapsed-header"), M.contains(this.ga, "cloned") || (M.add(this.ga, "cloned"), this.ga.appendChild(this.Uf)), M.add(this.A, "sticky"), M.remove(this.A, "animating"), Kf(this), setTimeout(function() {
        M.add(a.A, "animating");
        Hf(a.A, 0);
        a.A.style.opacity = "1";
        le("collapsed-header-show", new Lf("collapsed-header-show"))
      },
      0), document.body.appendChild(this.A)) : (this.Xd = !1, M.contains(this.ga, "cloned") && (Kf(this), L ? O(this.A, L, this.Re, !1, this) : setTimeout(function() {
      return a.Re()
    }, this.sc.kg), this.Sb = !0))
  };
  */
  
  var Kf = function(a) {
    var b = a.A.getBoundingClientRect().height;
    Hf(a.A, -b);
    a.A.style.opacity = "0"
  };
  
  /*
  Jf.prototype.Re = function() {
    this.Sb && (this.A.style.transform = "", this.A.style.opacity = "", L && R(this.A, L), this.Sb = !1, this.ga.parentNode.insertBefore(this.A, this.ga), M.remove(document.body, "collapsed-header"), M.contains(this.ga, "cloned") && (M.remove(this.ga, "cloned"), this.ga.removeChild(this.ga.lastChild)), M.remove(this.A, "sticky"), le("collapsed-header-hide", new Lf("collapsed-header-hide")))
  };
  */
  
  Jf.prototype.isVisible = function() {
    return M.contains(document.body, "collapsed-header")
  };
  Jf.prototype.Fe = function() {
    return this.isVisible() && this.A.offsetHeight || 0
  };
  var If = function(a) {
      Mf(a, !0);
      O(window, "hashchange", function() {
        return Mf(a)
      })
    },
    Mf = function(a, b) {
      var c = window.location.hash;
      b = void 0 === b ? !1 : b;
      var d = void 0 === d ? !1 : d;
      if (!/^#[^ ]+$/.test(c)) return !1;
      var e = document.getElementById(c.slice(1));
      if (e) {
        var f = ce(window, "collapsed-header-show", Nf(a, e));
        setTimeout(function() {
          Q(f)
        }, b ? 3E3 : 100);
        af && d && window.history.pushState({}, document.title, window.location.pathname + c)
      }
      return !!e
    },
    Nf = function(a, b) {
      return function() {
        if (!a.isVisible()) return !1;
        var c = a.Fe() + 20,
          d = b.getBoundingClientRect().top;
        return 0 <= d && d < c && window.pageYOffset > c ? (window.scrollTo(window.pageXOffset, window.pageYOffset - c), !0) : !1
      }
    };
  Jf.prototype.h = function() {
    this.ec && (P(window, "scroll", this.ec), this.ec = null)
  };
  var Lf = function(a, b) {
    N.call(this, a, b)
  };
  qa(Lf, N);
  var Of = function(a) {
    this.K = a
  };
  Of.prototype.show = function() {
    this.K && M.remove(this.K, "hidden")
  };
  Of.prototype.Rb = function() {
    this.K && M.add(this.K, "hidden")
  };
  Of.prototype.ba = function() {
    this.K && this.K.parentNode && (this.K.parentNode.removeChild(this.K), this.K = null)
  };
  var Pf = function(a, b, c) {
    var d = Rc(document, "div");
    M.add(d, "dim-overlay");
    M.add(d, "hidden");
    c && (d.id = c);
    a.appendChild(d);
    var e = new Of(d);
    O(d, "click", function(f) {
      b && b(f);
      e.Rb()
    });
    return e
  };
  var Sf = function(a, b, c, d, e, f) {
      if (Ab && e) return Qf(a);
      if (e && !d) return !1;
      if (!A) {
        "number" === typeof b && (b = Rf(b));
        var g = 17 == b || 18 == b || Ab && 91 == b;
        if ((!c || Ab) && g || Ab && 16 == b && (d || f)) return !1
      }
      if ((B || yb) && d && c) switch (a) {
        case 220:
        case 219:
        case 221:
        case 192:
        case 186:
        case 189:
        case 187:
        case 188:
        case 190:
        case 191:
        case 192:
        case 222:
          return !1
      }
      if (x && d && b == a) return !1;
      switch (a) {
        case 13:
          return A ? f || e ? !1 : !(c && d) : !0;
        case 27:
          return !(B || yb || A)
      }
      return A && (d || e || f) ? !1 : Qf(a)
    },
    Qf = function(a) {
      if (48 <= a && 57 >= a || 96 <= a && 106 >= a || 65 <= a &&
        90 >= a || (B || yb) && 0 == a) return !0;
      switch (a) {
        case 32:
        case 43:
        case 63:
        case 64:
        case 107:
        case 109:
        case 110:
        case 111:
        case 186:
        case 59:
        case 189:
        case 187:
        case 61:
        case 188:
        case 190:
        case 191:
        case 192:
        case 222:
        case 219:
        case 220:
        case 221:
        case 163:
        case 58:
          return !0;
        case 173:
          return A;
        default:
          return !1
      }
    },
    Rf = function(a) {
      if (A) a = Tf(a);
      else if (Ab && B) switch (a) {
        case 93:
          a = 91
      }
      return a
    },
    Tf = function(a) {
      switch (a) {
        case 61:
          return 187;
        case 59:
          return 186;
        case 173:
          return 189;
        case 224:
          return 91;
        case 0:
          return 224;
        default:
          return a
      }
    };
  var Uf = {
    8: "backspace",
    9: "tab",
    13: "enter",
    16: "shift",
    17: "ctrl",
    18: "alt",
    19: "pause",
    20: "caps-lock",
    27: "esc",
    32: "space",
    33: "pg-up",
    34: "pg-down",
    35: "end",
    36: "home",
    37: "left",
    38: "up",
    39: "right",
    40: "down",
    45: "insert",
    46: "delete",
    48: "0",
    49: "1",
    50: "2",
    51: "3",
    52: "4",
    53: "5",
    54: "6",
    55: "7",
    56: "8",
    57: "9",
    59: "semicolon",
    61: "equals",
    65: "a",
    66: "b",
    67: "c",
    68: "d",
    69: "e",
    70: "f",
    71: "g",
    72: "h",
    73: "i",
    74: "j",
    75: "k",
    76: "l",
    77: "m",
    78: "n",
    79: "o",
    80: "p",
    81: "q",
    82: "r",
    83: "s",
    84: "t",
    85: "u",
    86: "v",
    87: "w",
    88: "x",
    89: "y",
    90: "z",
    93: "context",
    96: "num-0",
    97: "num-1",
    98: "num-2",
    99: "num-3",
    100: "num-4",
    101: "num-5",
    102: "num-6",
    103: "num-7",
    104: "num-8",
    105: "num-9",
    106: "num-multiply",
    107: "num-plus",
    109: "num-minus",
    110: "num-period",
    111: "num-division",
    112: "f1",
    113: "f2",
    114: "f3",
    115: "f4",
    116: "f5",
    117: "f6",
    118: "f7",
    119: "f8",
    120: "f9",
    121: "f10",
    122: "f11",
    123: "f12",
    186: "semicolon",
    187: "equals",
    189: "dash",
    188: ",",
    190: ".",
    191: "/",
    192: "`",
    219: "open-square-bracket",
    220: "\\",
    221: "close-square-bracket",
    222: "single-quote",
    224: "win"
  };
  var Vf = function(a, b, c, d, e, f, g, k, l, m) {
    this.G = a;
    this.Jc = b;
    this.Vc = c;
    this.na = d;
    this.ob = e;
    this.Vb = f;
    this.dc = g;
    this.Tc = k;
    this.eb = l;
    this.Yc = m
  };
  Vf.prototype.getKey = function() {
    return this.Jc
  };
  var ag = function(a) {
      var b = a.ha;
      b = (b = b && "composed" in b && b && "composedPath" in b && b.composed && b.composedPath()) && 0 < b.length ? b[0] : a.target;
      return Wf(Xf(Yf(Zf((new $f).keyCode(a.keyCode || 0).key(a.key || "").shiftKey(!!a.shiftKey).altKey(!!a.altKey).ctrlKey(!!a.ctrlKey).metaKey(!!a.metaKey).target(a.target), b), function() {
        return a.preventDefault()
      }), function() {
        return a.stopPropagation()
      }))
    },
    $f = function() {
      this.G = null;
      this.Jc = "";
      this.Yc = this.eb = this.Tc = this.dc = this.Vb = this.ob = this.na = this.Vc = null
    };
  h = $f.prototype;
  h.keyCode = function(a) {
    this.G = a;
    return this
  };
  h.key = function(a) {
    this.Jc = a;
    return this
  };
  h.shiftKey = function(a) {
    this.Vc = a;
    return this
  };
  h.altKey = function(a) {
    this.na = a;
    return this
  };
  h.ctrlKey = function(a) {
    this.ob = a;
    return this
  };
  h.metaKey = function(a) {
    this.Vb = a;
    return this
  };
  h.target = function(a) {
    this.dc = a;
    return this
  };
  var Zf = function(a, b) {
      a.Tc = b;
      return a
    },
    Yf = function(a, b) {
      a.eb = b;
      return a
    },
    Xf = function(a, b) {
      a.Yc = b;
      return a
    },
    Wf = function(a) {
      return new Vf(Na(a.G), a.Jc, Ra(a.Vc), Ra(a.na), Ra(a.ob), Ra(a.Vb), u(a.dc), u(a.Tc), Pa(a.eb), Pa(a.Yc))
    };
  var bg = function(a, b, c) {
    N.call(this, a, c);
    this.identifier = b
  };
  t(bg, N);
  var eg = function(a) {
      S.call(this);
      this.Nb = this.bc = {};
      this.Kc = 0;
      this.gg = ac(cg);
      this.eh = ac(dg);
      this.Pf = !0;
      this.Nf = this.Qf = !1;
      this.vg = !0;
      this.Of = !1;
      this.md = null;
      this.ca = a;
      O(this.ca, "keydown", this.Ge, void 0, this);
      O(this.ca, "synthetic-keydown", this.Ie, void 0, this);
      Bb && (O(this.ca, "keypress", this.Ke, void 0, this), O(this.ca, "synthetic-keypress", this.Le, void 0, this));
      O(this.ca, "keyup", this.He, void 0, this);
      O(this.ca, "synthetic-keyup", this.Je, void 0, this)
    },
    fg;
  t(eg, S);
  var gg = function(a) {
      this.Vd = a || null;
      this.next = a ? null : {}
    },
    cg = [27, 112, 113, 114, 115, 116, 117, 118, 119, 120, 121, 122, 123, 19],
    dg = "color date datetime datetime-local email month number password search tel text time url week".split(" ");
  eg.prototype.Pg = function(a, b) {
    hg(this.bc, ig(arguments), a)
  };
  var ig = function(a) {
    if ("string" === typeof a[1]) a = jg(a[1]).map(function(d) {
      Na(d.keyCode, "A non-modifier key is needed in each stroke.");
      return kg(d.key || "", d.keyCode, d.modifiers)
    });
    else {
      var b = a,
        c = 1;
      Array.isArray(a[1]) && (b = a[1], c = 0);
      for (a = []; c < b.length; c += 2) a.push(kg("", b[c], b[c + 1]))
    }
    return a
  };
  eg.prototype.B = function() {
    eg.v.B.call(this);
    this.bc = {};
    P(this.ca, "keydown", this.Ge, !1, this);
    P(this.ca, "synthetic-keydown", this.Ie, !1, this);
    Bb && (P(this.ca, "keypress", this.Ke, !1, this), P(this.ca, "synthetic-keypress", this.Le, !1, this));
    P(this.ca, "keyup", this.He, !1, this);
    P(this.ca, "synthetic-keyup", this.Je, !1, this);
    this.ca = null
  };
  var jg = function(a) {
    a = a.replace(/[ +]*\+[ +]*/g, "+").replace(/[ ]+/g, " ").toLowerCase();
    a = a.split(" ");
    for (var b = [], c, d = 0; c = a[d]; d++) {
      var e = c.split("+"),
        f = null,
        g = null;
      c = 0;
      for (var k, l = 0; k = e[l]; l++) {
        switch (k) {
          case "shift":
            c |= 1;
            continue;
          case "ctrl":
            c |= 2;
            continue;
          case "alt":
            c |= 4;
            continue;
          case "meta":
            c |= 8;
            continue
        }
        null !== g && Ma("At most one non-modifier key can be in a stroke.");
        e = void 0;
        f = k;
        if (!fg) {
          g = {};
          for (e in Uf) g[Uf[e]] = Rf(parseInt(e, 10));
          fg = g
        }
        g = fg[f];
        Na(g, "Key name not found in goog.events.KeyNames: " +
          k);
        f = k;
        break
      }
      b.push({
        key: f,
        keyCode: g,
        modifiers: c
      })
    }
    return b
  };
  eg.prototype.He = function(a) {
    a = ag(a);
    A && lg(this, a);
    Bb && !this.Ec && mg(a) && this.sb(a, !0)
  };
  eg.prototype.Je = function(a) {
    a = a.getData();
    A && lg(this, a);
    Bb && !this.Ec && mg(a) && this.sb(a, !0)
  };
  var lg = function(a, b) {
      32 == a.md && 32 == b.G && (0, b.eb)();
      a.md = null
    },
    mg = function(a) {
      return Bb && a.ob && a.na
    };
  eg.prototype.Ke = function(a) {
    a = ag(a);
    32 < a.G && mg(a) && (this.Ec = !0)
  };
  eg.prototype.Le = function(a) {
    a = a.getData();
    32 < a.G && mg(a) && (this.Ec = !0)
  };
  var hg = function(a, b, c) {
      var d = b.shift();
      d.forEach(function(e) {
        if ((e = a[e]) && (0 == b.length || e.Vd)) throw Error("Keyboard shortcut conflicts with existing shortcut: " + e.Vd);
      });
      b.length ? d.forEach(function(e) {
        e = e.toString();
        var f = new gg;
        e = e in a ? a[e] : a[e] = f;
        f = b.slice(0);
        hg(u(e.next, "An internal node must have a next map"), f, c)
      }) : d.forEach(function(e) {
        a[e] = new gg(c)
      })
    },
    ng = function(a, b) {
      for (var c = 0; c < b.length; c++) {
        var d = a[b[c]];
        if (d) return d
      }
    },
    kg = function(a, b, c) {
      c = c || 0;
      b = ["c_" + b + "_" + c];
      "" != a && b.push("n_" + a +
        "_" + c);
      return b
    };
  eg.prototype.Ge = function(a) {
    this.sb(ag(a))
  };
  eg.prototype.Ie = function(a) {
    this.sb(a.getData())
  };
  eg.prototype.sb = function(a, b) {
    a: {
      var c = a.G;
      if ("" != a.getKey()) {
        var d = a.getKey();
        if ("Control" == d || "Shift" == d || "Meta" == d || "AltGraph" == d) {
          c = !1;
          break a
        }
      } else if (16 == c || 17 == c || 18 == c) {
        c = !1;
        break a
      }
      d = a.Tc;
      var e = "TEXTAREA" == d.tagName || "INPUT" == d.tagName || "BUTTON" == d.tagName || "SELECT" == d.tagName,
        f = !e && (d.isContentEditable || d.ownerDocument && "on" == d.ownerDocument.designMode);c = !e && !f || this.gg[c] || this.Nf ? !0 : f ? !1 : this.vg && (a.na || a.ob || a.Vb) ? !0 : "INPUT" == d.tagName && this.eh[d.type] ? 13 == c : "INPUT" == d.tagName || "BUTTON" ==
        d.tagName ? this.Of ? !0 : 32 != c : !1
    }
    if (c)
      if (!b && mg(a)) this.Ec = !1;
      else {
        b = Rf(a.G);
        c = a.getKey();
        c = kg(c, b, (a.Vc ? 1 : 0) | (a.ob ? 2 : 0) | (a.na ? 4 : 0) | (a.Vb ? 8 : 0));
        d = ng(this.Nb, c);
        if (!d || 1500 <= Date.now() - this.Kc) this.Nb = this.bc, this.Kc = Date.now();
        (d = ng(this.Nb, c)) && d.next && (this.Nb = d.next, this.Kc = Date.now());
        d && (d.next ? (0, a.eb)() : (this.Nb = this.bc, this.Kc = Date.now(), this.Pf && (0, a.eb)(), this.Qf && (0, a.Yc)(), c = Oa(d.Vd, "A terminal node must have a string shortcut identifier."), d = this.dispatchEvent(new bg("shortcut", c, a.dc)),
          (d &= this.dispatchEvent(new bg("shortcut_" + c, c, a.dc))) || (0, a.eb)(), A && (this.md = b)))
      }
  };
  var pg = function() {
      var a = this;
      var b = void 0 === b ? !0 : b;
      this.g = U("blogger.templates.responsive.Search");
      W(this.g, "Initializing Search.");
      try {
        if (this.Mb = document.querySelector(".centered-top-container")) {
          var c = this.Mb.querySelector(".search");
          if (c) {
            this.Ma = c;
            var d = this.Mb.querySelectorAll(".search-expand");
            (this.fb = d && Array.prototype.slice.call(d, 0)) && 0 != this.fb.length ? (this.ac = this.Mb.querySelector(".search-close"), this.K = b && Pf(this.Ma, function() {
                return a.fe()
              }) || null, (this.rd = this.Mb.querySelector(".centered-top")) ?
              (this.qf = this.Ma.querySelector(".search-action"), (this.gb = this.Ma.querySelector(".search-input input")) ? (this.Xe = new eg(document), og(this), W(this.g, "Finished initializing search section.")) : V(this.g, "There was an error initializing the search section. search input not found.")) : V(this.g, "There was an error initializing the search section. centered-top not found.")) : uf(this.g, "There was an error initializing the search section. No search buttons found.")
          } else V(this.g, "There was an error initializing the search section. search section not found.")
        } else V(this.g,
          "There was an error initializing the search section. container not found.")
      } catch (e) {
        V(this.g, "Error initializing section. Uncaught exception.", e), this.h()
      }
    },
    og = function(a) {
      if (a.fb)
        for (var b = n(a.fb), c = b.next(); !c.done; c = b.next()) O(c.value, "click", a.fe, !1, a);
      a.ac && O(a.ac, "click", a.fe, !1, a);
      b = function() {
        a.qf && (a.qf.disabled = "" == a.gb.value)
      };
      O(a.gb, "input", b);
      b();
      a.Xe.Pg("showSearch", 191, 0);
      O(a.Xe, "shortcut", a.De, !1, a)
    };
  pg.prototype.fe = function() {
    M.contains(this.Ma, "focused") ? M.contains(this.Ma, "focused") && (M.remove(this.Ma, "focused"), M.remove(this.rd, "search-focused"), this.K && this.K.Rb()) : this.De()
  };
  pg.prototype.De = function() {
    M.contains(this.Ma, "focused") || (M.add(this.rd, "search-focused"), M.add(this.Ma, "focused"), this.K && this.K.show());
    this.gb.focus()
  };
  pg.prototype.h = function() {
    this.K && (this.K.ba(), this.K = null);
    if (this.fb) {
      for (var a = n(this.fb), b = a.next(); !b.done; b = a.next()) R(b.value, "click");
      this.fb = null
    }
    this.ac && (R(this.ac, "click"), this.ac = null);
    this.gb && (R(this.gb, "input"), this.gb = null)
  };
  var qg = function() {};
  qg.prototype.O = function() {};
  var rg = function() {
    if (Bb) {
      var a = /Windows NT ([0-9.]+)/;
      return (a = a.exec(nb())) ? a[1] : "0"
    }
    return Ab ? (a = /1[0|1][_.][0-9_.]+/, (a = a.exec(nb())) ? a[0].replace(/_/g, ".") : "10") : Cb ? (a = /Android\s+([^\);]+)(\)|;)/, (a = a.exec(nb())) ? a[1] : "") : Db || Eb || Fb ? (a = /(?:iPhone|CPU)\s+OS\s+(\S+)/, (a = a.exec(nb())) ? a[1].replace(/_/g, ".") : "") : ""
  }();
  var ug = function(a, b, c, d, e, f, g, k, l) {
      u(c);
      var m;
      if (m = c.offsetParent) {
        var p = "HTML" == m.tagName || "BODY" == m.tagName;
        if (!p || "static" != od(m)) {
          var q = td(m);
          if (!p) {
            p = Ad(m);
            var z;
            if (z = p) {
              z = Bf && 0 <= mb(Df, 10);
              var y;
              if (y = Gb) y = 0 <= mb(rg, 10);
              var C = Af && 0 <= mb(Df, 85);
              z = A || z || y || C
            }
            p = z ? -m.scrollLeft : p && !zb && "visible" != nd(m, "overflowX") ? m.scrollWidth - m.clientWidth - m.scrollLeft : m.scrollLeft;
            q = Ac(q, new F(p, m.scrollTop))
          }
        }
      }
      m = q || new F;
      q = td(a);
      p = yd(a);
      q = new jd(q.x, q.y, p.width, p.height);
      if (p = ud(a)) C = new jd(p.left, p.top, p.right -
        p.left, p.bottom - p.top), p = Math.max(q.left, C.left), z = Math.min(q.left + q.width, C.left + C.width), p <= z && (y = Math.max(q.top, C.top), C = Math.min(q.top + q.height, C.top + C.height), y <= C && (q.left = p, q.top = y, q.width = z - p, q.height = C - y));
      p = Fc(a);
      y = Fc(c);
      if (p.l != y.l) {
        z = p.l.body;
        y = cd(y);
        C = new F(0, 0);
        var D = Oc(G(z));
        if (vb(D, "parent")) {
          var pa = z;
          do {
            if (D == y) var v = td(pa);
            else v = u(pa), v = rd(v), v = new F(v.left, v.top);
            C.x += v.x;
            C.y += v.y
          } while (D && D != y && D != D.parent && (pa = D.frameElement) && (D = D.parent))
        }
        z = Ac(C, td(z));
        !x || 9 <= Number(Rb) || Kc(p.l) ||
          (z = Ac(z, Nc(p.l)));
        q.left += z.x;
        q.top += z.y
      }
      a = sg(a, b);
      b = q.left;
      a & 4 ? b += q.width : a & 2 && (b += q.width / 2);
      b = new F(b, q.top + (a & 1 ? q.height : 0));
      b = Ac(b, m);
      e && (b.x += (a & 4 ? -1 : 1) * e.x, b.y += (a & 1 ? -1 : 1) * e.y);
      if (g)
        if (l) var J = l;
        else if (J = ud(c)) J.top -= m.y, J.right -= m.x, J.bottom -= m.y, J.left -= m.x;
      return tg(b, c, d, f, J, g, k)
    },
    tg = function(a, b, c, d, e, f, g) {
      a = a.clone();
      var k = sg(b, c);
      c = yd(b);
      g = g ? g.clone() : c.clone();
      a = a.clone();
      g = g.clone();
      var l = 0;
      if (d || 0 != k) k & 4 ? a.x -= g.width + (d ? d.right : 0) : k & 2 ? a.x -= g.width / 2 : d && (a.x += d.left), k & 1 ? a.y -= g.height +
        (d ? d.bottom : 0) : d && (a.y += d.top);
      f && (e ? (d = g, k = 0, 65 == (f & 65) && (a.x < e.left || a.x >= e.right) && (f &= -2), 132 == (f & 132) && (a.y < e.top || a.y >= e.bottom) && (f &= -5), a.x < e.left && f & 1 && (a.x = e.left, k |= 1), f & 16 && (l = a.x, a.x < e.left && (a.x = e.left, k |= 4), a.x + d.width > e.right && (d.width = Math.min(e.right - a.x, l + d.width - e.left), d.width = Math.max(d.width, 0), k |= 4)), a.x + d.width > e.right && f & 1 && (a.x = Math.max(e.right - d.width, e.left), k |= 1), f & 2 && (k |= (a.x < e.left ? 16 : 0) | (a.x + d.width > e.right ? 32 : 0)), a.y < e.top && f & 4 && (a.y = e.top, k |= 2), f & 32 && (l = a.y, a.y <
        e.top && (a.y = e.top, k |= 8), a.y + d.height > e.bottom && (d.height = Math.min(e.bottom - a.y, l + d.height - e.top), d.height = Math.max(d.height, 0), k |= 8)), a.y + d.height > e.bottom && f & 4 && (a.y = Math.max(e.bottom - d.height, e.top), k |= 2), f & 8 && (k |= (a.y < e.top ? 64 : 0) | (a.y + d.height > e.bottom ? 128 : 0)), e = k) : e = 256, l = e);
      f = new jd(0, 0, 0, 0);
      f.left = a.x;
      f.top = a.y;
      f.width = g.width;
      f.height = g.height;
      e = l;
      if (e & 496) return e;
      qd(b, new F(f.left, f.top));
      g = new Bc(f.width, f.height);
      c == g || c && g && c.width == g.width && c.height == g.height || (c = g, g = G(b), a = Kc(Fc(g).l),
        !x || Ob("10") || a ? (b = b.style, A ? b.MozBoxSizing = "border-box" : B ? b.WebkitBoxSizing = "border-box" : b.boxSizing = "border-box", b.width = Math.max(c.width, 0) + "px", b.height = Math.max(c.height, 0) + "px") : (g = b.style, a ? (x ? (a = Cd(b, "paddingLeft"), f = Cd(b, "paddingRight"), d = Cd(b, "paddingTop"), k = Cd(b, "paddingBottom"), a = new id(d, f, k, a)) : (a = I(b, "paddingLeft"), f = I(b, "paddingRight"), d = I(b, "paddingTop"), k = I(b, "paddingBottom"), a = new id(parseFloat(d), parseFloat(f), parseFloat(k), parseFloat(a))), b = Fd(b), g.pixelWidth = c.width - b.left - a.left -
          a.right - b.right, g.pixelHeight = c.height - b.top - a.top - a.bottom - b.bottom) : (g.pixelWidth = c.width, g.pixelHeight = c.height)));
      return e
    },
    sg = function(a, b) {
      return (b & 8 && Ad(a) ? b ^ 4 : b) & -9
    };
  var vg = function(a, b) {
    this.Xf = a instanceof F ? a : new F(a, b)
  };
  t(vg, qg);
  vg.prototype.O = function(a, b, c) {
    tg(this.Xf, a, b, c, null, null)
  };
  var wg = {
    nh: "activedescendant",
    sh: "atomic",
    th: "autocomplete",
    vh: "busy",
    yh: "checked",
    zh: "colindex",
    Eh: "controls",
    Fh: "current",
    Hh: "describedby",
    Kh: "disabled",
    Mh: "dropeffect",
    Nh: "expanded",
    Oh: "flowto",
    Qh: "grabbed",
    Uh: "haspopup",
    Wh: "hidden",
    Yh: "invalid",
    Zh: "label",
    ai: "labelledby",
    bi: "level",
    gi: "live",
    ri: "multiline",
    si: "multiselectable",
    wi: "orientation",
    xi: "owns",
    yi: "posinset",
    Ai: "pressed",
    Ei: "readonly",
    Gi: "relevant",
    Hi: "required",
    Li: "rowindex",
    Oi: "selected",
    Qi: "setsize",
    Si: "sort",
    gj: "valuemax",
    hj: "valuemin",
    ij: "valuenow",
    jj: "valuetext"
  };
  var xg;
  var yg = {
    oh: "alert",
    ph: "alertdialog",
    qh: "application",
    rh: "article",
    uh: "banner",
    wh: "button",
    xh: "checkbox",
    Ah: "columnheader",
    Bh: "combobox",
    Ch: "complementary",
    Dh: "contentinfo",
    Gh: "definition",
    Ih: "dialog",
    Jh: "directory",
    Lh: "document",
    Ph: "form",
    Rh: "grid",
    Sh: "gridcell",
    Th: "group",
    Vh: "heading",
    Xh: "img",
    ci: "link",
    di: "list",
    ei: "listbox",
    fi: "listitem",
    hi: "log",
    ii: "main",
    ji: "marquee",
    ki: "math",
    li: "menu",
    mi: "menubar",
    ni: "menuitem",
    oi: "menuitemcheckbox",
    pi: "menuitemradio",
    ti: "navigation",
    ui: "note",
    vi: "option",
    zi: "presentation",
    Bi: "progressbar",
    Ci: "radio",
    Di: "radiogroup",
    Fi: "region",
    Ii: "row",
    Ji: "rowgroup",
    Ki: "rowheader",
    Mi: "scrollbar",
    Ni: "search",
    Pi: "separator",
    Ri: "slider",
    Ti: "spinbutton",
    Ui: "status",
    Vi: "tab",
    Wi: "tablist",
    Xi: "tabpanel",
    Yi: "textbox",
    Zi: "textinfo",
    aj: "timer",
    bj: "toolbar",
    cj: "tooltip",
    dj: "tree",
    ej: "treegrid",
    fj: "treeitem"
  };
  var zg = function(a, b) {
      b ? (u(Yb(yg, b), "No such ARIA role " + b), a.setAttribute("role", b)) : a.removeAttribute("role")
    },
    X = function(a, b, c) {
      Array.isArray(c) && (c = c.join(" "));
      var d = Ag(b);
      "" === c || void 0 == c ? (xg || (c = {}, xg = (c.atomic = !1, c.autocomplete = "none", c.dropeffect = "none", c.haspopup = !1, c.live = "off", c.multiline = !1, c.multiselectable = !1, c.orientation = "vertical", c.readonly = !1, c.relevant = "additions text", c.required = !1, c.sort = "none", c.busy = !1, c.disabled = !1, c.hidden = !1, c.invalid = "false", c)), c = xg, b in c ? a.setAttribute(d,
        c[b]) : a.removeAttribute(d)) : a.setAttribute(d, c)
    },
    Cg = function(a, b) {
      var c = Bg(a, b);
      /^[\s\xa0]*$/.test(null == c ? "" : String(c)) || "true" == c || "false" == c ? X(a, b, "true" == c ? "false" : "true") : a.removeAttribute(Ag(b))
    },
    Bg = function(a, b) {
      a = a.getAttribute(Ag(b));
      return null == a || void 0 == a ? "" : String(a)
    },
    Ag = function(a) {
      u(a, "ARIA attribute cannot be empty.");
      u(Yb(wg, a), "No such ARIA attribute " + a);
      return "aria-" + a
    };
  var Dg = function(a, b) {
    if ("FORM" == a.tagName)
      for (var c = a.elements, d = 0; a = c.item(d); d++) Dg(a, b);
    else 1 == b && a.blur(), a.disabled = b
  };
  var Eg = function() {
      this.Kb = this.zg = ""
    },
    Fg = /"/g,
    Gg = /\\/g,
    Hg = RegExp("^[+a-zA-Z0-9_.!#$%&'*\\/=?^`{|}~-]+@([a-zA-Z0-9-]+\\.)+[a-zA-Z0-9]{2,63}$");
  Eg.prototype.rb = function() {
    return this.zg
  };
  Eg.prototype.toString = function() {
    var a = this.rb();
    a = a.replace(Fg, "");
    var b;
    a: {
      for (b = 0; 13 > b; b++)
        if (-1 != a.indexOf('()<>@:\\".[],;' [b])) {
          b = !0;
          break a
        } b = !1
    }
    b && (a = '"' + a.replace(Gg, "\\\\") + '"');
    return "" == a ? this.Kb : "" == this.Kb ? a : a + " <" + this.Kb + ">"
  };
  var Jg = function(a, b) {
    S.call(this);
    this.U = new ne(this);
    a = a || null;
    Ig(this);
    this.i = a;
    b && (this.Ib = b)
  };
  t(Jg, S);
  h = Jg.prototype;
  h.i = null;
  h.pe = !0;
  h.ne = null;
  h.oe = null;
  h.xb = !1;
  h.Wg = !1;
  h.Hd = -1;
  h.Oe = !1;
  h.ag = !0;
  h.Ib = "toggle_display";
  h.getType = function() {
    return this.Ib
  };
  h.m = function() {
    return this.i
  };
  var Kg = function(a) {
      Ig(a);
      a.pe = !0
    },
    Lg = function(a) {
      Ig(a);
      a.Oe = !0
    };
  Jg.prototype.tf = function(a, b) {
    this.Gb = a;
    this.vb = b
  };
  Jg.prototype.Ia = function() {
    return this.U
  };
  var Ig = function(a) {
    if (a.xb) throw Error("Can not change this state of the popup while showing.");
  };
  h = Jg.prototype;
  h.isVisible = function() {
    return this.xb
  };
  h.I = function(a) {
    this.Gb && this.Gb.stop();
    this.vb && this.vb.stop();
    a ? this.Wd() : this.wb()
  };
  h.O = function() {};
  h.Wd = function() {
    if (!this.xb && this.dispatchEvent("beforeshow")) {
      if (!this.i) throw Error("Caller must call setElement before trying to show the popup");
      this.O();
      var a = G(this.i);
      this.Oe && this.U.F(a, "keydown", this.Cg, !0);
      if (this.pe)
        if (this.U.F(a, "mousedown", this.df, !0), x) {
          try {
            var b = a.activeElement
          } catch (d) {}
          for (; b && "IFRAME" == b.nodeName;) {
            try {
              var c = b.contentDocument || b.contentWindow.document
            } catch (d) {
              break
            }
            a = c;
            b = a.activeElement
          }
          this.U.F(a, "mousedown", this.df, !0);
          this.U.F(a, "deactivate", this.cf)
        } else this.U.F(a,
          "blur", this.cf);
      "toggle_display" == this.Ib ? (this.i.style.visibility = "visible", K(this.i, !0)) : "move_offscreen" == this.Ib && this.O();
      this.xb = !0;
      this.Hd = Date.now();
      this.Gb ? (ce(this.Gb, "end", this.ab, !1, this), this.Gb.play()) : this.ab()
    }
  };
  h.wb = function(a) {
    if (!this.xb || !this.dispatchEvent({
        type: "beforehide",
        target: a
      })) return !1;
    this.U && this.U.ka();
    this.xb = !1;
    this.vb ? (ce(this.vb, "end", Ea(this.we, a), !1, this), this.vb.play()) : this.we(a);
    return !0
  };
  h.we = function(a) {
    "toggle_display" == this.Ib ? this.Wg ? $e(this.Pe, 0, this) : this.Pe() : "move_offscreen" == this.Ib && (this.i.style.top = "-10000px");
    this.Ab(a)
  };
  h.Pe = function() {
    this.i.style.visibility = "hidden";
    K(this.i, !1)
  };
  h.ab = function() {
    this.dispatchEvent("show")
  };
  h.Ab = function(a) {
    this.dispatchEvent({
      type: "hide",
      target: a
    })
  };
  h.df = function(a) {
    a = a.target;
    $c(this.i, a) || Mg(this, a) || this.oe && !$c(this.oe, a) || 150 > Date.now() - this.Hd || this.wb(a)
  };
  h.Cg = function(a) {
    27 == a.keyCode && this.wb(a.target) && (a.preventDefault(), a.stopPropagation())
  };
  h.cf = function(a) {
    if (this.ag) {
      var b = G(this.i);
      if ("undefined" != typeof document.activeElement) {
        if (a = b.activeElement, !a || $c(this.i, a) || "BODY" == a.tagName || Mg(this, a)) return
      } else if (a.target != b) return;
      150 > Date.now() - this.Hd || this.wb()
    }
  };
  var Mg = function(a, b) {
    return Va(a.ne || [], function(c) {
      return b === c || $c(c, b)
    })
  };
  Jg.prototype.B = function() {
    Jg.v.B.call(this);
    this.U.wa();
    Md(this.Gb);
    Md(this.vb);
    delete this.i;
    delete this.U;
    delete this.ne
  };
  var Ng = function(a, b) {
    this.Md = 8;
    this.Nd = b || void 0;
    Jg.call(this, a)
  };
  t(Ng, Jg);
  Ng.prototype.setPosition = function(a) {
    this.Nd = a || void 0;
    this.isVisible() && this.O()
  };
  Ng.prototype.O = function() {
    if (this.Nd) {
      var a = !this.isVisible() && "move_offscreen" != this.getType(),
        b = this.m();
      a && (b.style.visibility = "hidden", K(b, !0));
      this.Nd.O(b, this.Md, this.oj);
      a && K(b, !1)
    }
  };
  var Pg = function() {
    this.g = U("blogger.templates.responsive.Subscribe");
    W(this.g, "Initializing Subscribe.");
    try {
      if (this.Tf = void 0, this.s = document.body && Pf(document.body, null, "subscribe-dim-overlay"), this.A = document.querySelector(".centered-top-container"))
        if (this.M = this.A.querySelector(".subscribe-popup"))
          if (this.u = new Ng(this.M), this.ce = this.A.querySelector(".subscribe-popup-container"))
            if (this.cc = this.A.querySelector(".subscribe-button"))
              if (this.za = this.M.querySelector(".follow-by-email-address")) {
                if (this.qb =
                  this.M.querySelector(".follow-by-email-submit")) O(this.za, "input", this.Ff, !1, this), Og(this, !0), this.Ff(), this.Td(), W(this.g, "Finished initializing Subscribe.")
              } else V(this.g, 'There was an error initializing the subscribe section. ".follow-by-email-address" not found.');
      else V(this.g, 'There was an error initializing the subscribe section. ".subscribe-button" not found.');
      else V(this.g, 'There was an error initializing the subscribe section. ."subscribe-popup-container" not found.');
      else V(this.g, 'There was an error initializing the subscribe section. ".subscribe-popup" not found.');
      else V(this.g, 'There was an error initializing the subscribe section. ".centered-top-container" not found.')
    } catch (a) {
      V(this.g, "Error initializing Subscribe. Uncaught exception.", a), this.h()
    }
  };
  Pg.prototype.Ff = function() {
    var a = "function" == typeof document.createElement("input").checkValidity,
      b;
    if (b = "" != this.za.value)(a = a && this.za.validity.valid) || (a = new Eg, a.Kb = this.za.value.trim(), a = Hg.test(a.Kb)), b = a;
    Og(this, !b)
  };
  var Og = function(a, b) {
    a.qb && (Dg(a.qb, b), X(a.qb, "disabled", b))
  };
  Pg.prototype.Td = function() {
    var a = this;
    Lg(this.u);
    Kg(this.u);
    O(window, "resize", this.kf, !1, this);
    O(this.cc, "click", this.Fb, !1, this);
    O(this.u, "hide", this.ub, !1, this);
    O(this.qb, "click", function() {
      !a.qb.disabled && a.ub()
    }, !1, this)
  };
  Pg.prototype.ub = function() {
    this.za && this.za.blur();
    M.add(this.M, "hidden");
    document.body.removeChild(this.M);
    this.ce.appendChild(this.M);
    this.s.Rb();
    this.cc.focus()
  };
  Pg.prototype.kf = function() {
    this.u && this.u.isVisible() && (Qg(this), this.u.O())
  };
  var Qg = function(a) {
    a.M.style.visibility = "hidden";
    var b = M.contains(a.M, "hidden");
    M.remove(a.M, "hidden");
    var c = a.M.clientWidth;
    var d = a.M.clientHeight;
    b && M.add(a.M, "hidden");
    a.M.style.visibility = "visible";
    c = new Bc(c, d);
    b = c.width;
    c = c.height;
    d = a.Tf;
    var e = document.querySelector(void 0 === d ? ".centered" : d).getBoundingClientRect();
    d = e.left;
    e = e.width;
    var f = window.innerHeight;
    b = ("ltr" == document.documentElement.getAttribute("dir") ? -1 : 1) * b / 2;
    a.u.setPosition(new vg(d + e / 2 + b, f / 2 - c / 2))
  };
  Pg.prototype.Fb = function() {
    this.ce.removeChild(this.M);
    document.body.appendChild(this.M);
    this.u.I(!1);
    M.remove(this.M, "hidden");
    this.u.I(!0);
    Qg(this);
    this.s.show();
    (this.u.m().querySelector("input:not([type=hidden])") || this.u.m()).focus()
  };
  Pg.prototype.h = function() {
    this.s && (this.s.ba(), this.s = null);
    P(window, "resize", this.kf, !1, this);
    this.u && (this.u.wa(), this.u = null);
    this.za && R(this.za, "input");
    this.cc && R(this.cc, "click")
  };
  var Rg = function(a) {
    a = a || new Ha;
    this.ve = new Jf(a.Wf);
    this.Cf = new Pg;
    this.rf = new pg
  };
  Rg.prototype.h = function() {
    this.ve.h();
    this.Cf.h();
    this.rf.h();
    this.rf = this.Cf = this.ve = null
  };
  var Sg = function() {
    this.Kf = new Ha
  };
  var Tg = function() {};
  Tg.prototype.ja = function() {
    throw Error('Component "init" method must be implemented.');
  };
  Tg.prototype.h = function() {
    throw Error('Component "teardown" method must be implemented.');
  };
  var Ug = function(a, b, c, d) {
    d = void 0 === d ? [] : d;
    this.Lb = a;
    this.nb = b;
    this.jh = c;
    this.jb = d
  };
  var Vg = function(a) {
      this.g = U("blogger.templates.responsive.OverflowDetector");
      W(this.g, "Initializing overflow detector.");
      try {
        this.o = a;
        this.o.jb.push("load");
        this.o.jb.push("resize");
        for (var b = n(this.o.jb), c = b.next(); !c.done; c = b.next()) O(window, c.value, this.Uc, !1, this);
        this.Uc();
        W(this.g, "Finished initializing overflow detector.")
      } catch (d) {
        V(this.g, "Error initializing overflow detector. Uncaught exception.", d), this.h()
      }
    },
    Wg = function(a, b) {
      return (a = H(a.o.nb, b)) ? a.offsetHeight > b.offsetHeight : !1
    };
  Vg.prototype.Uc = function() {
    for (var a = n(Array.prototype.slice.call(document.querySelectorAll("." + this.o.Lb), 0)), b = a.next(); !b.done; b = a.next()) {
      b = b.value;
      var c = H(this.o.nb, b);
      c && this.o.jh(b, c.offsetHeight > b.offsetHeight)
    }
  };
  Vg.prototype.h = function() {
    P(window, "resize", this.Uc);
    P(window, "load", this.Uc)
  };
  var Xg = function() {
    this.Lb = "overflowable-container";
    this.nb = "overflowable-contents";
    this.Gc = "overflowable-item";
    this.re = "overflow-button";
    this.Yf = "overflow-count";
    this.Og = 50;
    this.jb = []
  };
  var Yg = function(a, b, c) {
    this.element = a;
    this.ud = b;
    this.Kg = c
  };
  t(Yg, qg);
  Yg.prototype.O = function(a, b, c) {
    ug(this.element, this.ud, a, b, void 0, c, this.Kg)
  };
  var Zg = function(a, b, c, d) {
    Yg.call(this, a, b);
    this.pg = c ? 5 : 0;
    this.Kd = d || void 0
  };
  t(Zg, Yg);
  Zg.prototype.O = function(a, b, c) {
    var d = ug(this.element, this.ud, a, b, null, c, 10, void 0, this.Kd);
    if (d & 496) {
      var e = $g(d, this.ud);
      b = $g(d, b);
      d = ug(this.element, e, a, b, null, c, 10, void 0, this.Kd);
      d & 496 && (e = $g(d, e), b = $g(d, b), ug(this.element, e, a, b, null, c, this.pg, void 0, this.Kd))
    }
  };
  var $g = function(a, b) {
    a & 48 && (b ^= 4);
    a & 192 && (b ^= 1);
    return b
  };
  var ah = function(a, b) {
    this.g = U("blogger.templates.responsive.Overflowable");
    this.o = b || new Xg;
    this.qa = a;
    this.s = this.lc = this.Sc = this.u = this.fa = this.Xa = this.Fa = this.pd = this.Qa = null;
    this.Sf = this.o.re + "-container";
    this.ta = null
  };
  qa(ah, Tg);
  ah.prototype.ja = function() {
    var a = this;
    W(this.g, "Initializing overflowable.");
    try {
      this.Qa = H(this.o.nb, this.qa);
      if (!this.Qa) return V(this.g, "There was an error initializing an overflowable. content element not found."), Me();
      this.Fa = H(this.o.re, this.qa);
      this.pd = bh(this);
      Xc(this.pd, this.Qa);
      M.contains(this.qa, "overflowable-no-popup") || (this.fa = Rc(document, "DIV"), M.add(this.fa, "overflow-popup"), K(this.fa, !1), Xc(this.fa, this.qa));
      this.Sc = O(window, "resize", this.Gg);
      this.Td();
      ch(this);
      var b = "overflowable-" +
        Aa(this);
      M.add(this.qa, b);
      this.ta = new Vg(new Ug(b, "overflowable-backup-content", Vb(function(c, d) {
        return a.Oc(c, d)
      }, this.o.Og, this), this.o.jb));
      this.Oc(this.qa, Wg(this.ta, this.qa));
      W(this.g, "Finished initializing overflowable.");
      return Le()
    } catch (c) {
      return V(this.g, "Error initializing overflowable. Uncaught exception.", c), Me(c)
    }
  };
  var bh = function(a) {
    var b = Rc(document, "DIV");
    M.add(b, "overflowable-backup");
    X(b, "hidden", !0);
    b.style.position = "absolute";
    b.style.visibility = "hidden";
    b.style.bottom = "0";
    b.style.left = "0";
    b.style.right = "0";
    b.style.top = "0";
    a = a.Qa.cloneNode(!0);
    M.add(a, "overflowable-backup-content");
    b.appendChild(a);
    return b
  };
  ah.prototype.Td = function() {
    var a = this;
    this.Fa && this.fa && (Zc(this.fa, this.Qa), this.u = new Ng(this.fa), Lg(this.u), Kg(this.u), this.lc = O(this.Fa, "click", function(b) {
      a.Fb();
      b.preventDefault()
    }), O(this.u, "hide", this.Eg, !1, this))
  };
  var ch = function(a) {
    var b = Hc(a.o.Gc, a.Qa);
    if (a.Fa && 0 < b.length) {
      b = b[b.length - 1];
      var c = Rc(document, b.tagName);
      M.add(c, a.Sf);
      K(c, !1);
      M.remove(a.Fa, "hidden");
      Tc(c, a.Fa);
      Wc(c, b);
      a.Xa = c
    }
  };
  h = ah.prototype;
  h.Oc = function(a, b) {
    var c = this;
    if (this.ta) {
      var d = Hc(this.o.Gc, this.Qa);
      this.Xa && (K(this.Xa, b), X(this.Xa, "hidden", !b));
      var e = 0;
      if (b) {
        var f = Hc(this.o.Gc, this.pd);
        b = this.fa ? Hc(this.o.Gc, this.fa) : [];
        var g = function(l) {
          return l.offsetTop >= a.offsetHeight
        };
        e = Wa(f, g);
        g = Xa(f, g);
        f = Ya(bb(f, 0, g + 1), function(l) {
          Wc(c.Xa, l);
          return 0 == c.Xa.offsetTop
        });
        Wc(this.Xa, d[f]);
        for (g = 0; g < d.length; g++) {
          var k = g >= f;
          g < b.length && (K(b[g], k), X(b[g], "hidden", !k));
          K(d[g], !k);
          X(d[g], "hidden", k)
        }
      } else Ta(d, function(l) {
        K(l, !0);
        X(l, "hidden",
          !1)
      });
      if (d = H(this.o.Yf, a)) d.innerText = e.toString()
    }
  };
  h.Fb = function() {
    this.u.I(!1);
    var a = this.u;
    a.Md = 4;
    a.isVisible() && a.O();
    this.Fa && this.u.setPosition(new Zg(this.Fa, 4));
    this.u.I(!0);
    this.s = Pf(this.qa, null, "overflowable-dim-overlay");
    this.s.show()
  };
  h.Gg = function() {
    this.u && this.u.isVisible() && this.u.O()
  };
  h.Eg = function() {
    this.fa && this.fa.style.left && (this.fa.style.left = "0");
    this.s && (this.s.ba(), this.s = null)
  };
  h.h = function() {
    this.s && (this.s.ba(), this.s = null);
    Md(this.u);
    this.u = null;
    this.Sc && (Q(this.Sc), this.Sc = null);
    this.lc && (Q(this.lc), this.lc = null);
    this.ta && (this.ta.h(), this.ta = null);
    return Le()
  };
  var dh = function(a) {
    return Ua(Hc(a.Lb), function(b) {
      return new ah(b, a)
    })
  };
  var eh = function() {
    var a = void 0 === a ? "ripple" : a;
    this.g = U("blogger.templates.responsive.Ripples");
    W(this.g, "Initializing ripple effects.");
    this.rc = a;
    try {
      this.bind(), W(this.g, "Finished initializing ripple effects.")
    } catch (b) {
      V(this.g, "Error initializing section. Uncaught exception.", b)
    }
  };
  eh.prototype.bind = function() {
    W(this.g, "Binding ripple effects for ." + this.rc);
    for (var a = document.querySelectorAll("." + this.rc), b = 0; b < a.length; b++) O(a[b], "mousedown", this.Sg.bind(this))
  };
  eh.prototype.Sg = function(a) {
    a = a || window.event;
    var b = a.currentTarget || a.srcElement;
    if (b = M.contains(b, this.rc) ? b : bd(b, this.rc)) {
      var c = H("splash", b);
      if (!c) {
        c = document.createElement("span");
        M.add(c, "splash");
        var d = document.createElement("div");
        M.add(d, "splash-wrapper");
        d.appendChild(c);
        b.insertBefore(d, b.firstChild);
        Jd && O(c, Jd, function() {
          return M.remove(c, "animate")
        }, !1, this)
      }
      M.remove(c, "animate");
      d = b.getBoundingClientRect();
      b = Math.max(d.width, d.height);
      if (0 === a.clientX && 0 === a.clientY) a = Math.round(d.width /
        2), d = Math.round(d.height / 2);
      else {
        var e = a.clientY ? a.clientY : a.touches[0].clientY;
        a = Math.round((a.clientX ? a.clientX : a.touches[0].clientX) - d.left);
        d = Math.round(e - d.top)
      }
      Jc(c, {
        style: "height: " + b + "px; width: " + b + "px; left: " + (a - b / 2) + "px; top: " + (d - b / 2) + "px;"
      });
      M.add(c, "animate")
    }
  };

  function fh(a, b, c, d) {
    b = void 0 === b ? 10 : b;
    c = void 0 === c ? 1E3 : c;
    d = void 0 === d ? null : d;
    var e = 0,
      f = function() {
        e++ < c ? a() || setTimeout(f, b) : d && d()
      };
    f()
  }
  var hh = function() {
    var a = gh();
    var b = void 0 === b ? 10 : b;
    var c = void 0 === c ? 1E3 : c;
    return new T(function(d, e) {
      var f = !1;
      fh(a, b, c, function() {
        f = !0;
        e()
      });
      f || d()
    })
  };
  var ih = null,
    kh = function() {
      return jh("blog").then(function(a) {
        return a.bloggerUrl
      })
    },
    lh = function(a) {
      return jh("features").then(function(b) {
        return b[a] && "TRUE" == b[a].toUpperCase()
      })
    };

  function jh(a) {
    return ih ? Le(ih[a]) : hh().then(function() {
      var b = _WidgetManager._GetAllData(),
        c = {},
        d;
      for (d in b) c[d] = b[d];
      ih = c;
      return ih[a]
    })
  }

  function gh() {
    return function() {
      return "undefined" !== typeof _WidgetManager && _WidgetManager ? !0 : !1
    }
  };
  var mh = function(a) {
    if ("undefined" !== typeof _WidgetManager && _WidgetManager) {
      var b = _WidgetManager._GetAllData();
      if (b && b.messages && b.messages[a]) return b.messages[a]
    }
    return null
  };
  var nh = function() {
    this.Ae = !0;
    this.Qe = this.yf = null;
    this.uf = "sharing-platform-button";
    this.Rf = !0
  };
  var oh = function(a) {
    this.g = U("blogger.templates.responsive.Collapsible");
    this.qa = a;
    this.he = this.de = this.Pb = this.Na = this.C = null
  };
  qa(oh, Tg);
  oh.prototype.ja = function() {
    W(this.g, "Initializing collapsible.");
    try {
      var a = (this.qa || document).getElementsByTagName("DETAILS");
      if (1 != a.length) return V(this.g, "Collapsible did not contain exactly one details element."), Le();
      this.C = a[0];
      var b = (this.C || document).getElementsByTagName("SUMMARY");
      if (1 != b.length) return V(this.g, "Collapsible did not contain exactly one summary element."), Le();
      this.Na = b[0];
      this.Pb = "b-details-" + Aa(this.C);
      Kd() || (this.C.id = this.Pb, zg(this.Na, "button"), X(this.Na, "controls", this.Pb),
        X(this.C, "expanded", !1), X(this.Na, "expanded", !1), ab(document.querySelectorAll("#" + this.Pb + " > :not(summary)")).forEach(function(c) {
          return X(c, "hidden", !0)
        }));
      this.de = O(this.Na, "click", this.cd, !1, this)
    } catch (c) {
      return V(this.g, "Error initializing collapsible. Uncaught exception.", c), this.h().then(function() {
        return Me()
      })
    }
    W(this.g, "Finished initializing collapsible.");
    return Le()
  };
  oh.prototype.cd = function(a) {
    var b = this;
    a.preventDefault();
    var c = I(this.Na, "height");
    if (this.C.hasAttribute("open")) L ? (R(this.C, L), vd(this.C, I(this.C, "height")), this.C.removeAttribute("open"), setTimeout(function() {
      vd(b.C, c)
    }, 0)) : this.C.removeAttribute("open");
    else if (vd(this.C, "auto"), this.C.setAttribute("open", "open"), L) {
      var d = I(this.C, "height");
      vd(this.C, c);
      setTimeout(function() {
        vd(b.C, d);
        b.he = O(b.C, L, function() {
          vd(b.C, "auto");
          R(b.C, L)
        })
      }, 0)
    }
    Kd() || (this.C && Cg(this.C, "expanded"), this.Na && Cg(this.Na,
      "expanded"), ab(document.querySelectorAll("#" + this.Pb + " > :not(summary)")).forEach(function(e) {
      return Cg(e, "hidden")
    }))
  };
  oh.prototype.h = function() {
    this.de && Q(this.de);
    this.he && Q(this.he);
    return Le()
  };
  var ph = function(a) {
    a = document.querySelectorAll(a);
    for (var b = [], c = 0; a && c < a.length; c++) b.push(new oh(a[c]));
    return b
  };
  var qh = function(a, b, c) {
    this.g = U("blogger.templates.responsive.Extendable");
    W(this.g, "Initializing extendable.");
    try {
      this.L = a, this.Wc = b, this.Eb = c ? c : null, O(b, "click", this.cd, !1, this), c && O(c, "click", this.cd, !1, this)
    } catch (d) {
      V(this.g, "Error initializing extendable. Uncaught exception.", d), this.h()
    }
    W(this.g, "Finished initializing extendable.")
  };
  qh.prototype.cd = function() {
    var a = this;
    if (M.contains(this.L, "expanded")) L && (R(this.L, L), vd(this.L, I(this.L, "height")), setTimeout(function() {
      vd(a.L, 0)
    }, 0)), M.remove(this.L, "expanded"), M.remove(this.Wc, "hidden"), this.Eb && M.add(this.Eb, "hidden");
    else {
      vd(this.L, "auto");
      if (L) {
        var b = I(this.L, "height");
        vd(this.L, 0);
        setTimeout(function() {
          vd(a.L, b);
          O(a.L, L, function() {
            vd(a.L, "auto");
            R(a.L, L)
          })
        }, 0)
      }
      M.add(this.L, "expanded");
      M.add(this.Wc, "hidden");
      this.Eb && M.remove(this.Eb, "hidden")
    }
  };
  qh.prototype.h = function() {
    this.Wc && R(this.Wc, "click");
    this.Eb && R(this.Eb, "click");
    this.L && (R(this.L, L), R(this.L, "click"))
  };
  var rh = function(a) {
    a = document.querySelectorAll(".widget." + a);
    for (var b = [], c = 0; a && c < a.length; c++) {
      var d = a[c],
        e = H("show-more", d),
        f = H("show-less", d);
      d = H("remaining-items", d);
      e && d && b.push(new qh(d, e, f))
    }
    return b
  };
  var sh = function() {
    this.g = U("blogger.templates.responsive.Archive");
    this.Ha = this.Z = null;
    W(this.g, "Initializing archive.")
  };
  qa(sh, Tg);
  sh.prototype.ja = function() {
    var a = this;
    this.Z = ph(".widget.BlogArchive");
    return Pe(this.Z.map(function(b) {
      return b.ja()
    })).then(function() {
      a.Ha = rh("BlogArchive");
      W(a.g, "Finished initializing archive.");
      return Le()
    }).Zc(function(b) {
      V(a.g, "Error initializing archive. Uncaught exception.", b instanceof Error ? b : null);
      return a.h().then(function() {
        return Me()
      })
    })
  };
  sh.prototype.h = function() {
    var a = this;
    return (this.Z && Pe(this.Z.map(function(b) {
      return b.h()
    })) || Le()).then(function() {
      a.Ha && a.Ha.forEach(function(b) {
        return b.h()
      });
      a.Z = null;
      a.Ha = null
    })
  };
  var th = function() {
    this.g = U("blogger.templates.responsive.AsyncCss");
    "loading" != document.readyState ? this.Dd() : O(window, "load", this.Dd)
  };
  th.prototype.Dd = function() {
    this.g && W(this.g, "Initializing async CSS.");
    for (var a = n(Array.prototype.slice.call(document.getElementsByTagName("link"), 0)), b = a.next(); !b.done; b = a.next()) b = b.value, "true" == b.getAttribute("data-async-css") && "none" == b.getAttribute("media") && b.setAttribute("media", "all");
    this.g && W(this.g, "Finished initializing async CSS.")
  };
  th.prototype.h = function() {
    P(window, "load", this.Dd)
  };
  var uh = function(a, b) {
    this.g = U("blogger.templates.responsive.AvatarReplacer");
    W(this.g, "Initializing avatar replacer.");
    this.vd = Fc();
    if (!a) {
      a = document.createElementNS("http://www.w3.org/2000/svg", "svg");
      M.add(a, "svg-icon-24");
      M.add(a, "avatar-icon");
      var c = document.createElementNS("http://www.w3.org/2000/svg", "use");
      c.setAttributeNS("http://www.w3.org/1999/xlink", "xlink:href", "/responsive/sprite_v1_6.css.svg#ic_person_black_24dp");
      a.appendChild(c)
    }
    this.Qg = a;
    this.kh = b || /(?:https?:)?\/\/img[12]\.blogblog\.com\/img\/blank\.gif/;
    W(this.g, "Finished initializing avatar replacer.")
  };
  uh.prototype.replace = function() {
    for (var a = document.querySelectorAll("#comments .comment .avatar-image-container"), b = 0; a && b < a.length; b++) {
      var c = Gc(this.vd.l, "img", null, a[b]);
      for (var d = 0; c && d < c.length; d++) c[d].src && this.kh.test(c[d].src) && (this.vd.removeNode(c[d]), this.vd.appendChild(a[b], this.Qg.cloneNode(!0)))
    }
  };
  var vh = function() {
    var a = Rc(document, "IMG");
    a.src = "https://www.blogger.com/img/blogger_logo_round_35.png";
    M.add(a, "blogger-icon");
    return new uh(a, /(?:https?:)?\/\/img[12]\.blogblog\.com\/img\/b16-rounded\.gif/)
  };
  var wh = function(a) {
    this.La = a
  };
  wh.prototype.show = function() {
    this.La && M.remove(this.La, "hidden")
  };
  wh.prototype.Rb = function() {
    this.La && M.add(this.La, "hidden")
  };
  wh.prototype.ba = function() {
    this.La && (this.La.parentNode.removeChild(this.La), this.La = null)
  };
  var xh = function(a, b, c) {
    c = Qc("DIV", ["loading-spinner-large", "mspin-" + c + "-large", "hidden"], Qc("DIV", "", Qc("DIV")));
    Tc(document.body, c);
    c.style.left = a - 24 + "px";
    c.style.top = b - 24 + "px";
    return new wh(c)
  };
  var yh = !x && !qb();
  var zh = /\.(blogger|google)\.com($|:)/,
    Bh = function() {
      var a = this;
      this.Bd = this.Ad = this.da = null;
      var b = document.getElementById("comment-editor"),
        c = document.querySelector(".page_body .centered-bottom");
      b && c && window.addEventListener && ((/-[a-z]/.test("resized") ? 0 : yh && b.dataset ? "resized" in b.dataset : b.hasAttribute ? b.hasAttribute("data-" + "resized".replace(/([A-Z])/g, "-$1").toLowerCase()) : b.getAttribute("data-" + "resized".replace(/([A-Z])/g, "-$1").toLowerCase())) || this.da || (this.da = Ah(), this.da.show()), this.Ad =
        O(b, "iframeMoved", function() {
          a.da && a.da.ba();
          a.da = Ah();
          a.da.show();
          for (var d = document.querySelectorAll(".comment-actions"), e = 0; e < d.length; e++) M.remove(d[e], "invisible");
          (d = (d = bd(b, "comment")) && d.querySelector(".comment-actions")) && M.add(d, "invisible")
        }), this.Bd = O(window, "message", function(d) {
          var e = d.ha.data;
          zh.test(d.ha.origin) && "string" === typeof e && 0 == e.indexOf("set-comment-editor-height") && a.da && (a.da.ba(), a.da = null)
        }))
    },
    Ah = function() {
      var a = document.getElementById("comment-editor"),
        b = document.querySelector(".page_body .centered-bottom");
      if (a && b) {
        b = a.getBoundingClientRect();
        a = b.left + window.pageXOffset + b.width / 2;
        b = b.top + window.pageYOffset + b.height / 2;
        var c = document.querySelector(".centered-bottom .sharing-button");
        c = "rgb(255,255,255)" == (c && window.getComputedStyle(c).getPropertyValue("fill")) ? "white" : "grey_54";
        var d = xh(a, b, c);
        setTimeout(function() {
          d && d.ba()
        }, 1E4);
        return d
      }
      return null
    };
  Bh.prototype.h = function() {
    this.da && (this.da.ba(), this.da = null);
    this.Ad && Q(this.Ad);
    this.Bd && Q(this.Bd)
  };
  var Ch = function() {
    this.g = U("blogger.templates.responsive.Labels");
    W(this.g, "Initializing labels.");
    try {
      this.Z = ph(".widget.Label"), this.Z.map(function(a) {
        return a.ja()
      }), this.Ha = rh("Label"), W(this.g, "Finished initializing labels.")
    } catch (a) {
      V(this.g, "Error initializing labels. Uncaught exception.", a), this.h()
    }
  };
  Ch.prototype.h = function() {
    this.Z && this.Z.forEach(function(a) {
      return a.h()
    });
    this.Ha && this.Ha.forEach(function(a) {
      return a.h()
    });
    this.Ha = this.Z = null
  };
  var Dh = function() {};
  Dh.prototype.se = null;
  var Fh = function(a) {
    var b;
    (b = a.se) || (b = {}, Eh(a) && (b[0] = !0, b[1] = !0), b = a.se = b);
    return b
  };
  var Gh, Hh = function() {};
  t(Hh, Dh);
  var Ih = function(a) {
      return (a = Eh(a)) ? new ActiveXObject(a) : new XMLHttpRequest
    },
    Eh = function(a) {
      if (!a.Te && "undefined" == typeof XMLHttpRequest && "undefined" != typeof ActiveXObject) {
        for (var b = ["MSXML2.XMLHTTP.6.0", "MSXML2.XMLHTTP.3.0", "MSXML2.XMLHTTP", "Microsoft.XMLHTTP"], c = 0; c < b.length; c++) {
          var d = b[c];
          try {
            return new ActiveXObject(d), a.Te = d
          } catch (e) {}
        }
        throw Error("Could not create ActiveXObject. ActiveX might be disabled, or MSXML might not be installed");
      }
      return a.Te
    };
  Gh = new Hh;
  var Jh = RegExp("^(?:([^:/?#.]+):)?(?://(?:([^\\\\/?#]*)@)?([^\\\\/?#]*?)(?::([0-9]+))?(?=[\\\\/?#]|$))?([^?#]+)?(?:\\?([^#]*))?(?:#([\\s\\S]*))?$");
  var Y = function(a) {
    S.call(this);
    this.headers = new Map;
    this.kd = a || null;
    this.Ea = !1;
    this.jd = this.j = null;
    this.Tb = this.Ye = this.Ub = "";
    this.Wa = this.Cd = this.Dc = this.wd = !1;
    this.fc = 0;
    this.ad = null;
    this.nf = "";
    this.ed = this.Mg = this.Gf = !1;
    this.ie = null
  };
  t(Y, S);
  Y.prototype.g = U("goog.net.XhrIo");
  var Kh = /^https?$/i,
    Lh = ["POST", "PUT"],
    Mh = [],
    Nh = function(a, b) {
      var c = new Y;
      Mh.push(c);
      b && c.F("complete", b);
      c.Id("ready", c.Vf);
      c.send(a, "HEAD", void 0, void 0)
    };
  Y.prototype.Vf = function() {
    this.wa();
    $a(Mh, this)
  };
  Y.prototype.setTrustToken = function(a) {
    this.ie = a
  };
  Y.prototype.send = function(a, b, c, d) {
    if (this.j) throw Error("[goog.net.XhrIo] Object is active with another request=" + this.Ub + "; newUri=" + a);
    b = b ? b.toUpperCase() : "GET";
    this.Ub = a;
    this.Tb = "";
    this.Ye = b;
    this.wd = !1;
    this.Ea = !0;
    this.j = this.kd ? Ih(this.kd) : Ih(Gh);
    this.jd = this.kd ? Fh(this.kd) : Fh(Gh);
    this.j.onreadystatechange = Da(this.ff, this);
    this.Mg && "onprogress" in this.j && (this.j.onprogress = Da(function(g) {
      this.ef(g, !0)
    }, this), this.j.upload && (this.j.upload.onprogress = Da(this.ef, this)));
    try {
      vf(this.g, Oh(this, "Opening Xhr")),
        this.Cd = !0, this.j.open(b, String(a), !0), this.Cd = !1
    } catch (g) {
      vf(this.g, Oh(this, "Error opening Xhr: " + g.message));
      Ph(this, g);
      return
    }
    a = c || "";
    c = new Map(this.headers);
    if (d)
      if (Object.getPrototypeOf(d) === Object.prototype)
        for (var e in d) c.set(e, d[e]);
      else if ("function" === typeof d.keys && "function" === typeof d.get) {
      e = n(d.keys());
      for (var f = e.next(); !f.done; f = e.next()) f = f.value, c.set(f, d.get(f))
    } else throw Error("Unknown input type for opt_headers: " + String(d));
    d = Array.from(c.keys()).find(function(g) {
      return "content-type" ==
        g.toLowerCase()
    });
    e = r.FormData && a instanceof r.FormData;
    !Za(Lh, b) || d || e || c.set("Content-Type", "application/x-www-form-urlencoded;charset=utf-8");
    b = n(c);
    for (d = b.next(); !d.done; d = b.next()) c = n(d.value), d = c.next().value, c = c.next().value, this.j.setRequestHeader(d, c);
    this.nf && (this.j.responseType = this.nf);
    "withCredentials" in this.j && this.j.withCredentials !== this.Gf && (this.j.withCredentials = this.Gf);
    if ("setTrustToken" in this.j && this.ie) try {
      this.j.setTrustToken(this.ie)
    } catch (g) {
      vf(this.g, Oh(this, "Error SetTrustToken: " +
        g.message))
    }
    try {
      Qh(this), 0 < this.fc && (this.ed = Rh(this.j), vf(this.g, Oh(this, "Will abort after " + this.fc + "ms if incomplete, xhr2 " + this.ed)), this.ed ? (this.j.timeout = this.fc, this.j.ontimeout = Da(this.Ef, this)) : this.ad = $e(this.Ef, this.fc, this)), vf(this.g, Oh(this, "Sending request")), this.Dc = !0, this.j.send(a), this.Dc = !1
    } catch (g) {
      vf(this.g, Oh(this, "Send error: " + g.message)), Ph(this, g)
    }
  };
  var Rh = function(a) {
    return x && Ob(9) && "number" === typeof a.timeout && void 0 !== a.ontimeout
  };
  Y.prototype.Ef = function() {
    "undefined" != typeof ua && this.j && (this.Tb = "Timed out after " + this.fc + "ms, aborting", vf(this.g, Oh(this, this.Tb)), this.dispatchEvent("timeout"), this.abort(8))
  };
  var Ph = function(a, b) {
      a.Ea = !1;
      a.j && (a.Wa = !0, a.j.abort(), a.Wa = !1);
      a.Tb = b;
      Sh(a);
      Th(a)
    },
    Sh = function(a) {
      a.wd || (a.wd = !0, a.dispatchEvent("complete"), a.dispatchEvent("error"))
    };
  Y.prototype.abort = function() {
    this.j && this.Ea && (vf(this.g, Oh(this, "Aborting")), this.Ea = !1, this.Wa = !0, this.j.abort(), this.Wa = !1, this.dispatchEvent("complete"), this.dispatchEvent("abort"), Th(this))
  };
  Y.prototype.B = function() {
    this.j && (this.Ea && (this.Ea = !1, this.Wa = !0, this.j.abort(), this.Wa = !1), Th(this, !0));
    Y.v.B.call(this)
  };
  Y.prototype.ff = function() {
    this.Ra || (this.Cd || this.Dc || this.Wa ? Uh(this) : this.Fg())
  };
  Y.prototype.Fg = function() {
    Uh(this)
  };
  var Uh = function(a) {
    if (a.Ea && "undefined" != typeof ua)
      if (a.jd[1] && 4 == Vh(a) && 2 == Wh(a)) vf(a.g, Oh(a, "Local request error detected and ignored"));
      else if (a.Dc && 4 == Vh(a)) $e(a.ff, 0, a);
    else if (a.dispatchEvent("readystatechange"), 4 == Vh(a)) {
      vf(a.g, Oh(a, "Request complete"));
      a.Ea = !1;
      try {
        if (Xh(a)) a.dispatchEvent("complete"), a.dispatchEvent("success");
        else {
          try {
            var b = 2 < Vh(a) ? a.j.statusText : ""
          } catch (c) {
            vf(a.g, "Can not get status: " + c.message), b = ""
          }
          a.Tb = b + " [" + Wh(a) + "]";
          Sh(a)
        }
      } finally {
        Th(a)
      }
    }
  };
  Y.prototype.ef = function(a, b) {
    u("progress" === a.type, "goog.net.EventType.PROGRESS is of the same type as raw XHR progress.");
    this.dispatchEvent(Yh(a, "progress"));
    this.dispatchEvent(Yh(a, b ? "downloadprogress" : "uploadprogress"))
  };
  var Yh = function(a, b) {
      return {
        type: b,
        lengthComputable: a.lengthComputable,
        loaded: a.loaded,
        total: a.total
      }
    },
    Th = function(a, b) {
      if (a.j) {
        Qh(a);
        var c = a.j,
          d = a.jd[0] ? function() {} : null;
        a.j = null;
        a.jd = null;
        b || a.dispatchEvent("ready");
        try {
          c.onreadystatechange = d
        } catch (e) {
          V(a.g, "Problem encountered resetting onreadystatechange: " + e.message)
        }
      }
    },
    Qh = function(a) {
      a.j && a.ed && (a.j.ontimeout = null);
      a.ad && (r.clearTimeout(a.ad), a.ad = null)
    };
  Y.prototype.isActive = function() {
    return !!this.j
  };
  var Xh = function(a) {
      var b = Wh(a);
      a: switch (b) {
        case 200:
        case 201:
        case 202:
        case 204:
        case 206:
        case 304:
        case 1223:
          var c = !0;
          break a;
        default:
          c = !1
      }
      if (!c) {
        if (b = 0 === b) a = String(a.Ub).match(Jh)[1] || null, !a && r.self && r.self.location && (a = r.self.location.protocol.slice(0, -1)), b = !Kh.test(a ? a.toLowerCase() : "");
        c = b
      }
      return c
    },
    Vh = function(a) {
      return a.j ? a.j.readyState : 0
    },
    Wh = function(a) {
      try {
        return 2 < Vh(a) ? a.j.status : -1
      } catch (b) {
        return -1
      }
    };
  Y.prototype.getResponseHeader = function(a) {
    if (this.j && 4 == Vh(this)) return a = this.j.getResponseHeader(a), null === a ? void 0 : a
  };
  Y.prototype.getAllResponseHeaders = function() {
    return this.j && 2 <= Vh(this) ? this.j.getAllResponseHeaders() || "" : ""
  };
  var Oh = function(a, b) {
    return b + " [" + a.Ye + " " + a.Ub + " " + Wh(a) + "]"
  };
  var Zh = function() {
      this.g = U("blogger.templates.responsive.SourcesetEnhancer")
    },
    ai = function() {
      var a = new Zh;
      W(a.g, "Initializing sourceset enhancer.");
      try {
        for (var b = n(document.querySelectorAll("img[data-ess]")), c = b.next(); !c.done; c = b.next()) {
          var d = c.value;
          if (d.srcset) {
            for (var e = /.*(\d+)w$/, f = 0, g = !1, k = n(d.srcset.trim().split(",")), l = k.next(); !l.done; l = k.next()) {
              var m = l.value;
              if (e.test(m)) {
                var p = parseInt(e.exec(m)[1], 10);
                f = Math.max(f, p)
              } else /\s+/.test(m) || (g = !0)
            }
            if (!g && f > d.clientWidth) {
              W(a.g, "Not fetching enchanced sourceset for image " +
                d.id + " which has a srcset width " + f + ", which is bigger than its size of " + d.clientWidth);
              return
            }
          }
          $h(a, d)
        }
        W(a.g, "Finished initializing sourceset enhancer.")
      } catch (q) {
        V(a.g, "Error enhancing sourcesets.", q)
      }
    },
    $h = function(a, b) {
      var c = b.getAttribute("data-ess");
      Nh(c, function(d) {
        d = d.target;
        if (Xh(d)) {
          d = String(d.Ub);
          var e = b.srcset || "";
          e.trim() && (e += ", ");
          b.setAttribute("srcset", e + d);
          W(a.g, "Successfully loaded image " + d + " for image " + b.id)
        }
      });
      W(a.g, "Fetching higher-res image " + c + " for image " + b.id)
    };
  var bi = function() {
    this.g = U("blogger.templates.responsive.Video")
  };
  qa(bi, Tg);
  bi.prototype.ja = function() {
    W(this.g, "Initializing video support.");
    window.addEventListener ? window.addEventListener("message", this.Nc, !1) : window.attachEvent("onmessage", this.Nc);
    return Le()
  };
  bi.prototype.Nc = function(a) {
    var b = a.data;
    b && "video_resize" === b.name && b.iframe_id && kh().then(function(c) {
      if (a.origin === c && (c = document.getElementById(b.iframe_id)))
        if (b.widescreen) {
          var d = c.width || 320,
            e = c.height || 266;
          c.setAttribute("data-original-width", d);
          c.setAttribute("data-original-height", e);
          var f = c.parentElement.offsetWidth;
          c.height = e * f / d;
          c.width = f
        } else c.width = c.getAttribute("data-original-width"), c.height = c.getAttribute("data-original-height")
    })
  };
  bi.prototype.h = function() {
    window.removeEventListener ? window.removeEventListener("message", this.Nc) : window.detachEvent("onmessage", this.Nc);
    return Le()
  };
  var ci = function() {
      this.jf = Date.now()
    },
    di = null;
  ci.prototype.set = function(a) {
    this.jf = a
  };
  ci.prototype.reset = function() {
    this.set(Date.now())
  };
  ci.prototype.get = function() {
    return this.jf
  };
  var ei = function(a) {
    this.Lg = a || "";
    di || (di = new ci);
    this.bh = di
  };
  h = ei.prototype;
  h.me = !0;
  h.vf = !0;
  h.Zg = !0;
  h.Yg = !0;
  h.xf = !1;
  h.ah = !1;
  var fi = function(a) {
      return 10 > a ? "0" + a : String(a)
    },
    gi = function(a) {
      ei.call(this, a)
    };
  t(gi, ei);
  var hi = function(a, b) {
    var c = [];
    c.push(a.Lg, " ");
    if (a.vf) {
      var d = new Date(b.Df);
      c.push("[", fi(d.getFullYear() - 2E3) + fi(d.getMonth() + 1) + fi(d.getDate()) + " " + fi(d.getHours()) + ":" + fi(d.getMinutes()) + ":" + fi(d.getSeconds()) + "." + fi(Math.floor(d.getMilliseconds() / 10)), "] ")
    }
    if (a.Zg) {
      d = c.push;
      var e = a.bh.get();
      e = (b.Df - e) / 1E3;
      var f = e.toFixed(3),
        g = 0;
      if (1 > e) g = 2;
      else
        for (; 100 > e;) g++, e *= 10;
      for (; 0 < g--;) f = " " + f;
      d.call(c, "[", f, "s] ")
    }
    a.Yg && c.push("[", b.af, "] ");
    a.ah && c.push("[", b.Ze.name, "] ");
    c.push(b.wg);
    a.xf && (b = b.wc,
      void 0 !== b && c.push("\n", b instanceof Error ? b.message : String(b)));
    a.me && c.push("\n");
    return c.join("")
  };
  var ii = function() {
      this.Ng = Da(this.Mf, this);
      this.xc = new gi;
      this.xc.vf = !1;
      this.xc.xf = !1;
      this.Ve = this.xc.me = !1;
      this.eg = {}
    },
    ki = function() {
      var a = ji;
      if (1 != a.Ve) {
        var b = rf(sf(), "").sa,
          c = a.Ng;
        b && rf(sf(), b.rb()).Me.push(c);
        a.Ve = !0
      }
    };
  ii.prototype.Mf = function(a) {
    function b(f) {
      if (f) {
        if (f.value >= df.value) return "error";
        if (f.value >= ef.value) return "warn";
        if (f.value >= gf.value) return "log"
      }
      return "debug"
    }
    if (!this.eg[a.af]) {
      var c = hi(this.xc, a),
        d = li;
      if (d) {
        var e = b(a.Ze);
        mi(d, e, c, a.wc)
      }
    }
  };
  var ji = null,
    li = r.console,
    mi = function(a, b, c, d) {
      if (a[b]) a[b](c, void 0 === d ? "" : d);
      else a.log(c, void 0 === d ? "" : d)
    };
  /*

   CC0 1.0 Universal License
   Public Domain Dedication

   The person(s) who associated a work with this deed has dedicated the work to
   the public domain by waiving all of his or her rights to the work worldwide
   under copyright law, including all related and neighboring rights, to the
   extent allowed by law.

   You can copy, modify, distribute and perform the work, even for commercial
   purposes, all without asking permission.

   In no way are the patent or trademark rights of any person affected by CC0,
   nor are the rights that other persons may have in the work or in how the work
   is used, such as publicity or privacy rights.

   Unless expressly stated otherwise, the person(s) who associated a work with
   this deed makes no warranties about the work, and disclaims liability for all
   uses of the work, to the fullest extent permitted by applicable law.

   When using or citing the work, you should not imply endorsement by the author
   or the affirmer.

   This is a human-readable summary of the Legal Code (read the full text).
   svg4everybody v2.1.8 | github.com/jonathantneal/svg4everybody */
  function ni(a, b, c) {
    if (c) {
      var d = document.createDocumentFragment(),
        e = !b.hasAttribute("viewBox") && c.getAttribute("viewBox");
      e && b.setAttribute("viewBox", e);
      for (b = c.cloneNode(!0); b.childNodes.length;) d.appendChild(b.firstChild);
      a.appendChild(d)
    }
  }

  function oi(a) {
    a.onreadystatechange = function() {
      if (4 === a.readyState) {
        var b = a.Jf;
        b || (b = a.Jf = document.implementation.createHTMLDocument(""), b.body.innerHTML = a.responseText, a.ke = {});
        a.le.splice(0).map(function(c) {
          var d = a.ke[c.id];
          d || (d = a.ke[c.id] = b.getElementById(c.id));
          ni(c.parent, c.dh, d)
        })
      }
    };
    a.onreadystatechange()
  }

  function pi() {
    return "undefined" != typeof LEGACY_SUPPORT && LEGACY_SUPPORT
  }
  var qi = function() {
    function a() {
      for (var C = 0; C < z.length;) {
        var D = z[C],
          pa = D.parentNode,
          v;
        for (v = pa;
          "svg" !== v.nodeName.toLowerCase() && (v = v.parentNode, v););
        if (v) {
          var J = D.getAttribute("xlink:href") || D.getAttribute("href");
          !J && b.attributeName && (J = D.getAttribute(b.attributeName));
          if (pi() && d) {
            var ca = document.createElement("img");
            ca.style.cssText = "display:inline-block;height:100%;width:100%";
            ca.setAttribute("width", v.getAttribute("width") || v.clientWidth);
            ca.setAttribute("height", v.getAttribute("height") || v.clientHeight);
            ca.src = c(J, v, D);
            pa.replaceChild(ca, D)
          } else p && (!b.validate || b.validate(J, v, D) ? (pa.removeChild(D), J = J.split("#"), D = J.shift(), J = J.join("#"), D.length ? (ca = q[D], ca || (ca = q[D] = new XMLHttpRequest, ca.open("GET", D), ca.send(), ca.le = []), ca.le.push({
            parent: pa,
            dh: v,
            id: J
          }), oi(ca)) : ni(pa, v, document.getElementById(J))) : (++C, ++y))
        } else ++C
      }
      if (!z.length || 0 < z.length - y) window.requestAnimationFrame ? window.requestAnimationFrame(a) : setTimeout(a, 67)
    }
    var b = Object(void 0);
    if (pi()) {
      var c = b.nj || function(C) {
        return C.replace(/\?[^#]+/,
          "").replace("#", ".").replace(/^\./, "") + ".png" + (/\?[^#]+/.exec(C) || [""])[0]
      };
      var d = "nosvg" in b ? b.pj : /\bMSIE [1-8]\b/.test(navigator.userAgent)
    }
    var e = /\bMSIE [1-8]\.0\b/,
      f = /\bTrident\/[567]\b|\bMSIE (?:9|10)\.0\b/,
      g = /\bAppleWebKit\/(\d+)\b/,
      k = /\bEdge\/12\.(\d+)\b/,
      l = /\bEdge\/.(\d+)\b/,
      m = window.top !== window.self;
    var p = "polyfill" in b ? b.qj : pi() ? e.test(navigator.userAgent) || f.test(navigator.userAgent) || 10547 > (navigator.userAgent.match(k) || [])[1] || 537 > (navigator.userAgent.match(g) || [])[1] || l.test(navigator.userAgent) &&
      m : f.test(navigator.userAgent) || 10547 > (navigator.userAgent.match(k) || [])[1] || 537 > (navigator.userAgent.match(g) || [])[1] || l.test(navigator.userAgent) && m;
    var q = {},
      z = document.getElementsByTagName("use"),
      y = 0;
    p && a()
  };
  var ti = function() {
      var a = this;
      r.console && (ji || (ji = new ii), r.location && -1 != r.location.href.indexOf("Debug=true") && ki());
      this.sa = U("blogger.templates.responsive.Template");
      try {
        W(this.sa, "Initializing responsive template."), this.sd = new Bh, this.archive = new sh, this.archive.ja().Zc(function(b) {
          return ri(a, b)
        }), this.Z = ph(".widget.collapsible"), this.labels = new Ch, ai(), (new uh).replace(), vh().replace(), qi(), this.nd = new th, si(), this.fd = new bi, this.fd.ja().Zc(function(b) {
          return ri(a, b)
        }), W(this.sa, "Finished initializing responsive template.")
      } catch (b) {
        ri(this,
          b), this.h()
      }
    },
    ri = function(a, b) {
      a.sa && V(a.sa, "Error initializing responsive template. Uncaught exception.", b)
    },
    si = function() {
      if (ob() && "rtl" == document.documentElement.getAttribute("dir"))
        for (var a = 0; a < document.styleSheets.length; a++) {
          var b = document.styleSheets[a];
          if (b.cssRules)
            for (var c = 0; c < b.cssRules.length; c++) {
              var d = b.cssRules[c];
              if (d.style && (d.style.font && -1 != d.style.font.indexOf("Montserrat") || d.style["font-family"] && -1 != d.style["font-family"].indexOf("Montserrat"))) {
                var e = d.style.cssText.replace("Montserrat",
                  "sans-serif");
                d.style.cssText = e
              }
            }
        }
    };
  ti.prototype.h = function() {
    var a = this;
    return (this.Z && Pe(this.Z.map(function(b) {
      return b.h()
    })) || Le()).then(function() {
      a.archive && a.archive.h();
      a.labels && a.labels.h();
      a.sd && a.sd.h();
      a.nd && a.nd.h();
      a.fd && a.fd.h();
      a.archive = null;
      a.labels = null;
      a.sd = null;
      a.nd = null;
      a.fd = null
    })
  };
  var ui = function() {
    a: {
      var a = M.get(document.body);a = n(Array.prototype.slice.call(a, 0));
      for (var b = a.next(); !b.done; b = a.next())
        if (b = b.value, b.startsWith("version-")) {
          a = b.substring(8);
          b = new RegExp("-".replace(/([-()\[\]{}+?*.$\^|,:#<!\\])/g, "\\$1").replace(/\x08/g, "\\x08"), "g");
          a = a.replace(b, ".".replace(/\$/g, "$$$$"));
          break a
        } a = null
    }
    a = a || "LATEST";
    return "1.2.0" == a ? 0 : "LATEST" == a ? "LATEST" == a ? 1 : -1 : mb(a, "1.2.0")
  };
  var vi = function(a) {
    return function() {
      M.toggle(a, "sidebar-invisible")
    }
  };

  function wi(a, b) {
    var c = function(d) {
      var e = 0;
      do e += d.offsetTop; while (d = d.offsetParent);
      return e
    };
    b = c(b);
    c = c(a);
    Math.abs(c - b) >= window.innerHeight ? M.remove(a, "invisible") : M.add(a, "invisible")
  };
  var xi = function(a, b, c, d) {
    Qd.call(this, d);
    this.type = "key";
    this.keyCode = a;
    this.charCode = b;
    this.repeat = c
  };
  t(xi, Qd);
  var yi = function(a, b) {
    S.call(this);
    a && (this.Ic && this.detach(), this.i = a, this.Hc = O(this.i, "keypress", this, b), this.Fd = O(this.i, "keydown", this.sb, b, this), this.Ic = O(this.i, "keyup", this.ig, b, this))
  };
  t(yi, S);
  h = yi.prototype;
  h.i = null;
  h.Hc = null;
  h.Fd = null;
  h.Ic = null;
  h.W = -1;
  h.G = -1;
  h.na = !1;
  var zi = {
      3: 13,
      12: 144,
      63232: 38,
      63233: 40,
      63234: 37,
      63235: 39,
      63236: 112,
      63237: 113,
      63238: 114,
      63239: 115,
      63240: 116,
      63241: 117,
      63242: 118,
      63243: 119,
      63244: 120,
      63245: 121,
      63246: 122,
      63247: 123,
      63248: 44,
      63272: 46,
      63273: 36,
      63275: 35,
      63276: 33,
      63277: 34,
      63289: 144,
      63302: 45
    },
    Ai = {
      Up: 38,
      Down: 40,
      Left: 37,
      Right: 39,
      Enter: 13,
      F1: 112,
      F2: 113,
      F3: 114,
      F4: 115,
      F5: 116,
      F6: 117,
      F7: 118,
      F8: 119,
      F9: 120,
      F10: 121,
      F11: 122,
      F12: 123,
      "U+007F": 46,
      Home: 36,
      End: 35,
      PageUp: 33,
      PageDown: 34,
      Insert: 45
    },
    Bi = Ab && A;
  h = yi.prototype;
  h.sb = function(a) {
    if (B || yb)
      if (17 == this.W && !a.ctrlKey || 18 == this.W && !a.altKey || Ab && 91 == this.W && !a.metaKey) this.G = this.W = -1; - 1 == this.W && (a.ctrlKey && 17 != a.keyCode ? this.W = 17 : a.altKey && 18 != a.keyCode ? this.W = 18 : a.metaKey && 91 != a.keyCode && (this.W = 91));
    Sf(a.keyCode, this.W, a.shiftKey, a.ctrlKey, a.altKey, a.metaKey) ? (this.G = Rf(a.keyCode), Bi && (this.na = a.altKey)) : this.handleEvent(a)
  };
  h.ig = function(a) {
    this.G = this.W = -1;
    this.na = a.altKey
  };
  h.handleEvent = function(a) {
    var b = a.ha,
      c = b.altKey;
    if (x && "keypress" == a.type) {
      var d = this.G;
      var e = 13 != d && 27 != d ? b.keyCode : 0
    } else(B || yb) && "keypress" == a.type ? (d = this.G, e = 0 <= b.charCode && 63232 > b.charCode && Qf(d) ? b.charCode : 0) : ("keypress" == a.type ? (Bi && (c = this.na), b.keyCode == b.charCode ? 32 > b.keyCode ? (d = b.keyCode, e = 0) : (d = this.G, e = b.charCode) : (d = b.keyCode || this.G, e = b.charCode || 0)) : (d = b.keyCode || this.G, e = b.charCode || 0), Ab && 63 == e && 224 == d && (d = 191));
    var f = d = Rf(d);
    d ? 63232 <= d && d in zi ? f = zi[d] : 25 == d && a.shiftKey && (f = 9) :
      b.keyIdentifier && b.keyIdentifier in Ai && (f = Ai[b.keyIdentifier]);
    if (!A || "keypress" != a.type || Sf(f, this.W, a.shiftKey, a.ctrlKey, c, a.metaKey)) a = f == this.W, this.W = f, b = new xi(f, e, a, b), b.altKey = c, this.dispatchEvent(b)
  };
  h.m = function() {
    return this.i
  };
  h.detach = function() {
    this.Hc && (Q(this.Hc), Q(this.Fd), Q(this.Ic), this.Ic = this.Fd = this.Hc = null);
    this.i = null;
    this.G = this.W = -1
  };
  h.B = function() {
    yi.v.B.call(this);
    this.detach()
  };
  var Di = function(a, b, c) {
    S.call(this);
    this.target = a;
    this.zd = b || a;
    this.Lc = c || new jd(NaN, NaN, NaN, NaN);
    this.l = G(a);
    this.ra = new ne(this);
    a = Ea(Md, this.ra);
    this.Ra ? a() : (this.Ya || (this.Ya = []), this.Ya.push(a));
    this.deltaY = this.deltaX = this.Bf = this.Af = this.screenY = this.screenX = this.clientY = this.clientX = 0;
    this.Be = !0;
    this.Sa = !1;
    this.hf = !0;
    this.Se = 0;
    this.je = this.ng = !1;
    O(this.zd, ["touchstart", "mousedown"], this.zf, !1, this);
    this.dd = Ci
  };
  t(Di, S);
  var Ci = r.document && r.document.documentElement && !!r.document.documentElement.setCapture && !!r.document.releaseCapture;
  Di.prototype.Ia = function() {
    return this.ra
  };
  Di.prototype.B = function() {
    Di.v.B.call(this);
    P(this.zd, ["touchstart", "mousedown"], this.zf, !1, this);
    this.ra.ka();
    this.dd && this.l.releaseCapture();
    this.zd = this.target = null
  };
  var Ei = function(a) {
    void 0 === a.Rd && (a.Rd = Ad(a.target));
    return a.Rd
  };
  Di.prototype.zf = function(a) {
    var b = "mousedown" == a.type;
    if (!this.Be || this.Sa || b && (0 != a.ha.button || Ab && a.ctrlKey)) this.dispatchEvent("earlycancel");
    else {
      if (0 == this.Se)
        if (this.dispatchEvent(new Fi("start", this, a.clientX, a.clientY, a))) this.Sa = !0, this.hf && b && a.preventDefault();
        else return;
      else this.hf && b && a.preventDefault();
      b = this.l;
      var c = b.documentElement,
        d = !this.dd;
      this.ra.F(b, ["touchmove", "mousemove"], this.jg, {
        capture: d,
        passive: !1
      });
      this.ra.F(b, ["touchend", "mouseup"], this.vc, d);
      this.dd ? (c.setCapture(!1),
        this.ra.F(c, "losecapture", this.vc)) : this.ra.F(Oc(b), "blur", this.vc);
      x && this.ng && this.ra.F(b, "dragstart", Pd);
      this.Ug && this.ra.F(this.Ug, "scroll", this.Ig, d);
      this.clientX = this.Af = a.clientX;
      this.clientY = this.Bf = a.clientY;
      this.screenX = a.screenX;
      this.screenY = a.screenY;
      this.je ? (a = this.target, b = a.offsetLeft, c = a.offsetParent, c || "fixed" != od(a) || (c = G(a).documentElement), c ? (A && !Ob(58) ? (d = Fd(c), b += d.left) : 8 <= Number(Rb) && !(9 <= Number(Rb)) && (d = Fd(c), b -= d.left), a = Ad(c) ? c.clientWidth - (b + a.offsetWidth) : b) : a = b) : a = this.target.offsetLeft;
      this.deltaX = a;
      this.deltaY = this.target.offsetTop;
      this.Ld = Nc(Fc(this.l).l)
    }
  };
  Di.prototype.vc = function(a, b) {
    this.ra.ka();
    this.dd && this.l.releaseCapture();
    this.Sa ? (this.Sa = !1, this.dispatchEvent(new Fi("end", this, a.clientX, a.clientY, a, Gi(this, this.deltaX), Hi(this, this.deltaY), b || "touchcancel" == a.type))) : this.dispatchEvent("earlycancel")
  };
  Di.prototype.jg = function(a) {
    if (this.Be) {
      var b = (this.je && Ei(this) ? -1 : 1) * (a.clientX - this.clientX),
        c = a.clientY - this.clientY;
      this.clientX = a.clientX;
      this.clientY = a.clientY;
      this.screenX = a.screenX;
      this.screenY = a.screenY;
      if (!this.Sa) {
        var d = this.Af - this.clientX,
          e = this.Bf - this.clientY;
        if (d * d + e * e > this.Se)
          if (this.dispatchEvent(new Fi("start", this, a.clientX, a.clientY, a))) this.Sa = !0;
          else {
            this.Ra || this.vc(a);
            return
          }
      }
      c = Ii(this, b, c);
      b = c.x;
      c = c.y;
      this.Sa && this.dispatchEvent(new Fi("beforedrag", this, a.clientX, a.clientY,
        a, b, c)) && (Ji(this, a, b, c), a.preventDefault())
    }
  };
  var Ii = function(a, b, c) {
    var d = Nc(Fc(a.l).l);
    b += d.x - a.Ld.x;
    c += d.y - a.Ld.y;
    a.Ld = d;
    a.deltaX += b;
    a.deltaY += c;
    return new F(Gi(a, a.deltaX), Hi(a, a.deltaY))
  };
  Di.prototype.Ig = function(a) {
    var b = Ii(this, 0, 0);
    a.clientX = this.clientX;
    a.clientY = this.clientY;
    Ji(this, a, b.x, b.y)
  };
  var Ji = function(a, b, c, d) {
      a.je && Ei(a) ? a.target.style.right = c + "px" : a.target.style.left = c + "px";
      a.target.style.top = d + "px";
      a.dispatchEvent(new Fi("drag", a, b.clientX, b.clientY, b, c, d))
    },
    Gi = function(a, b) {
      var c = a.Lc;
      a = isNaN(c.left) ? null : c.left;
      c = isNaN(c.width) ? 0 : c.width;
      return Math.min(null != a ? a + c : Infinity, Math.max(null != a ? a : -Infinity, b))
    },
    Hi = function(a, b) {
      var c = a.Lc;
      a = isNaN(c.top) ? null : c.top;
      c = isNaN(c.height) ? 0 : c.height;
      return Math.min(null != a ? a + c : Infinity, Math.max(null != a ? a : -Infinity, b))
    },
    Fi = function(a,
      b, c, d, e, f, g) {
      N.call(this, a);
      this.clientX = c;
      this.clientY = d;
      this.left = void 0 !== f ? f : b.deltaX;
      this.top = void 0 !== g ? g : b.deltaY
    };
  t(Fi, N);
  var Ki = function(a) {
    this.Aa = new Map;
    var b = arguments.length;
    if (1 < b) {
      if (b % 2) throw Error("Uneven number of arguments");
      for (var c = 0; c < b; c += 2) this.set(arguments[c], arguments[c + 1])
    } else a && this.addAll(a)
  };
  h = Ki.prototype;
  h.clear = function() {
    this.Aa.clear()
  };
  h.remove = function(a) {
    return this.Aa.delete(a)
  };
  h.get = function(a, b) {
    return this.Aa.has(a) ? this.Aa.get(a) : b
  };
  h.set = function(a, b) {
    this.Aa.set(a, b);
    return this
  };
  h.addAll = function(a) {
    if (a instanceof Ki) {
      a = n(a.Aa);
      for (var b = a.next(); !b.done; b = a.next()) {
        var c = n(b.value);
        b = c.next().value;
        c = c.next().value;
        this.Aa.set(b, c)
      }
    } else if (a)
      for (a = n(Object.entries(a)), b = a.next(); !b.done; b = a.next()) c = n(b.value), b = c.next().value, c = c.next().value, this.Aa.set(b, c)
  };
  h.forEach = function(a, b) {
    var c = this;
    b = void 0 === b ? this : b;
    this.Aa.forEach(function(d, e) {
      return a.call(b, d, e, c)
    })
  };
  h.clone = function() {
    return new Ki(this)
  };
  (function() {
    for (var a = ["ms", "moz", "webkit", "o"], b, c = 0; b = a[c] && !r.requestAnimationFrame; ++c) r.requestAnimationFrame = r[b + "RequestAnimationFrame"], r.cancelAnimationFrame = r[b + "CancelAnimationFrame"] || r[b + "CancelRequestAnimationFrame"];
    if (!r.requestAnimationFrame) {
      var d = 0;
      r.requestAnimationFrame = function(e) {
        var f = (new Date).getTime(),
          g = Math.max(0, 16 - (f - d));
        d = f + g;
        return r.setTimeout(function() {
          e(f + g)
        }, g)
      };
      r.cancelAnimationFrame || (r.cancelAnimationFrame = function(e) {
        clearTimeout(e)
      })
    }
  })();
  var Li = [
      [],
      []
    ],
    Mi = 0,
    Ni = !1,
    Oi = 0,
    Qi = function(a, b) {
      var c = Oi++,
        d = {
          ug: {
            id: c,
            ya: a.measure,
            context: b
          },
          yg: {
            id: c,
            ya: a.xg,
            context: b
          },
          state: {},
          Y: void 0,
          Fc: !1
        };
      return function() {
        0 < arguments.length ? (d.Y || (d.Y = []), d.Y.length = 0, d.Y.push.apply(d.Y, arguments), d.Y.push(d.state)) : d.Y && 0 != d.Y.length ? (d.Y[0] = d.state, d.Y.length = 1) : d.Y = [d.state];
        d.Fc || (d.Fc = !0, Li[Mi].push(d));
        Ni || (Ni = !0, window.requestAnimationFrame(Pi))
      }
    },
    Pi = function() {
      Ni = !1;
      var a = Li[Mi],
        b = a.length;
      Mi = (Mi + 1) % 2;
      for (var c, d = 0; d < b; ++d) {
        c = a[d];
        var e = c.ug;
        c.Fc = !1;
        e.ya && e.ya.apply(e.context, c.Y)
      }
      for (d = 0; d < b; ++d) c = a[d], e = c.yg, c.Fc = !1, e.ya && e.ya.apply(e.context, c.Y), c.state = {};
      a.length = 0
    };
  var Ri = x ? kc(gc(new fc(dc, 'javascript:""'))) : kc(gc(new fc(dc, "about:blank")));
  jc(Ri);
  var Si = x ? kc(gc(new fc(dc, 'javascript:""'))) : kc(gc(new fc(dc, "javascript:undefined")));
  jc(Si);
  var Ti = function(a) {
    S.call(this);
    this.i = a;
    a = x ? "focusout" : "blur";
    this.rg = O(this.i, x ? "focusin" : "focus", this, !x);
    this.sg = O(this.i, a, this, !x)
  };
  t(Ti, S);
  Ti.prototype.handleEvent = function(a) {
    var b = new Qd(a.ha);
    b.type = "focusin" == a.type || "focus" == a.type ? "focusin" : "focusout";
    this.dispatchEvent(b)
  };
  Ti.prototype.B = function() {
    Ti.v.B.call(this);
    Q(this.rg);
    Q(this.sg);
    delete this.i
  };
  var Ui = function() {};
  Ui.Ed = void 0;
  Ui.fg = function() {
    return Ui.Ed ? Ui.Ed : Ui.Ed = new Ui
  };
  Ui.prototype.Ag = 0;
  Ui.prototype.mg = "";
  var Wi = function(a) {
    S.call(this);
    this.Ga = a || Fc();
    this.Rd = Vi;
    this.Ka = null;
    this.ia = !1;
    this.i = null;
    this.Ja = void 0;
    this.pc = this.qc = this.R = null;
    this.mh = !1
  };
  t(Wi, S);
  Wi.prototype.lg = Ui.fg();
  var Vi = null,
    Xi = function(a) {
      var b;
      (b = a.Ka) || (b = a.lg, b = b.mg + ":" + (b.Ag++).toString(36), b = a.Ka = b);
      return b
    };
  Wi.prototype.m = function() {
    return this.i
  };
  var Yi = function(a) {
    a = a.i;
    u(a, "Can not call getElementStrict before rendering/decorating.");
    return a
  };
  h = Wi.prototype;
  h.Ia = function() {
    this.Ja || (this.Ja = new ne(this));
    return u(this.Ja)
  };
  h.getParent = function() {
    return this.R
  };
  h.Sd = function(a) {
    if (this.R && this.R != a) throw Error("Method not supported");
    Wi.v.Sd.call(this, a)
  };
  h.D = function() {
    return this.Ga
  };
  h.T = function() {
    this.i = this.Ga.createElement("DIV")
  };
  h.Yb = function() {
    if (this.ia) throw Error("Component already rendered");
    this.i || this.T();
    this.Ga.l.body.appendChild(this.i);
    this.R && !this.R.ia || this.pb()
  };
  h.pb = function() {
    this.ia = !0;
    Zi(this, function(a) {
      !a.ia && a.m() && a.pb()
    })
  };
  h.Ta = function() {
    Zi(this, function(a) {
      a.ia && a.Ta()
    });
    this.Ja && this.Ja.ka();
    this.ia = !1
  };
  h.B = function() {
    this.ia && this.Ta();
    this.Ja && (this.Ja.wa(), delete this.Ja);
    Zi(this, function(a) {
      a.wa()
    });
    !this.mh && this.i && Yc(this.i);
    this.R = this.i = this.pc = this.qc = null;
    Wi.v.B.call(this)
  };
  var Zi = function(a, b) {
    a.qc && a.qc.forEach(b, void 0)
  };
  Wi.prototype.removeChild = function(a, b) {
    if (a) {
      var c = "string" === typeof a ? a : Xi(a);
      this.pc && c ? (a = this.pc, a = (null !== a && c in a ? a[c] : void 0) || null) : a = null;
      if (c && a) {
        var d = this.pc;
        c in d && delete d[c];
        $a(this.qc, a);
        b && (a.Ta(), a.i && Yc(a.i));
        b = a;
        if (null == b) throw Error("Unable to set parent component");
        b.R = null;
        Wi.v.Sd.call(b, null)
      }
    }
    if (!a) throw Error("Child is not in parent component");
    return a
  };
  var $i = function(a, b) {
    this.i = a;
    this.Ga = b
  };
  var aj = function(a, b) {
    Wi.call(this, b);
    this.lh = !!a;
    this.zb = null;
    this.mf = Qi({
      xg: this.Rc
    }, this)
  };
  t(aj, Wi);
  h = aj.prototype;
  h.yd = null;
  h.gd = !1;
  h.S = null;
  h.N = null;
  h.la = null;
  h.qd = !1;
  h.zc = function() {
    return "goog-modalpopup"
  };
  h.yc = function() {
    return this.S
  };
  h.T = function() {
    aj.v.T.call(this);
    var a = this.m();
    u(a);
    M.addAll(a, cb(this.zc()).split(" "));
    a.tabIndex = 0;
    K(a, !1);
    this.lh && !this.N && (a = this.D().T("IFRAME", {
      frameborder: 0,
      style: "border:0;vertical-align:bottom;"
    }), Sb(a, "HTMLIFrameElement"), a.src = jc(Ri).toString(), this.N = a, this.N.className = this.zc() + "-bg", K(this.N, !1), zd(this.N, 0));
    this.S || (this.S = this.D().T("DIV", this.zc() + "-bg"), K(this.S, !1));
    this.la || (this.la = this.D().createElement("SPAN"), K(this.la, !1), this.la.tabIndex = 0, this.la.style.position = "absolute")
  };
  h.lf = function() {
    this.qd = !1
  };
  h.pb = function() {
    u(!!this.S, "Background element must not be null.");
    this.N && Wc(this.N, this.m());
    Wc(this.S, this.m());
    aj.v.pb.call(this);
    Xc(this.la, this.m());
    this.yd = new Ti(this.D().l);
    this.Ia().F(this.yd, "focusin", this.Dg);
    bj(this, !1)
  };
  h.Ta = function() {
    this.isVisible() && this.I(!1);
    Md(this.yd);
    aj.v.Ta.call(this);
    Yc(this.N);
    Yc(this.S);
    Yc(this.la)
  };
  h.I = function(a) {
    u(this.ia, "ModalPopup must be rendered first.");
    a != this.gd && (this.cb && this.cb.stop(), this.lb && this.lb.stop(), this.bb && this.bb.stop(), this.kb && this.kb.stop(), this.ia && bj(this, a), a ? this.Wd() : this.wb())
  };
  var bj = function(a, b) {
    a.bf || (a.bf = new $i(Yi(a), a.Ga));
    a = a.bf;
    if (b) {
      a.tb || (a.tb = []);
      b = dd(a.Ga.l.body);
      for (var c = 0; c < b.length; c++) {
        var d = b[c];
        d == a.i || Bg(d, "hidden") || (X(d, "hidden", !0), a.tb.push(d))
      }
    } else if (a.tb) {
      for (c = 0; c < a.tb.length; c++) a.tb[c].removeAttribute(Ag("hidden"));
      a.tb = null
    }
  };
  aj.prototype.tf = function(a, b) {
    this.cb = a;
    this.bb = b;
    this.kb = this.lb = void 0
  };
  aj.prototype.Wd = function() {
    if (this.dispatchEvent("beforeshow")) {
      try {
        this.zb = this.D().l.activeElement
      } catch (a) {}
      this.Rc();
      this.O();
      this.Ia().F(cd(this.D()), "resize", this.Rc).F(cd(this.D()), "orientationchange", this.mf);
      cj(this, !0);
      this.focus();
      this.gd = !0;
      this.cb && this.lb ? (ce(this.cb, "end", this.ab, !1, this), this.lb.play(), this.cb.play()) : this.ab()
    }
  };
  aj.prototype.wb = function() {
    if (this.dispatchEvent("beforehide")) {
      this.Ia().ic(cd(this.D()), "resize", this.Rc).ic(cd(this.D()), "orientationchange", this.mf);
      this.gd = !1;
      this.bb && this.kb ? (ce(this.bb, "end", this.Ab, !1, this), this.kb.play(), this.bb.play()) : this.Ab();
      a: {
        try {
          var a = this.D(),
            b = a.l.body,
            c = a.l.activeElement || b;
          if (!this.zb || this.zb == b) {
            this.zb = null;
            break a
          }(c == b || a.contains(this.m(), c)) && this.zb.focus()
        } catch (d) {}
        this.zb = null
      }
    }
  };
  var cj = function(a, b) {
    a.N && K(a.N, b);
    a.S && K(a.S, b);
    K(a.m(), b);
    K(a.la, b)
  };
  h = aj.prototype;
  h.ab = function() {
    this.dispatchEvent("show")
  };
  h.Ab = function() {
    cj(this, !1);
    this.dispatchEvent("hide")
  };
  h.isVisible = function() {
    return this.gd
  };
  h.focus = function() {
    this.Ce()
  };
  h.Rc = function() {
    this.N && K(this.N, !1);
    this.S && K(this.S, !1);
    var a = this.D().l,
      b = Lc(Oc(a) || window || window),
      c = Math.max(b.width, Math.max(a.body.scrollWidth, a.documentElement.scrollWidth));
    a = Math.max(b.height, Math.max(a.body.scrollHeight, a.documentElement.scrollHeight));
    this.N && (K(this.N, !0), wd(this.N, c, a));
    this.S && (K(this.S, !0), wd(this.S, c, a))
  };
  h.O = function() {
    var a = this.D().l,
      b = Oc(a) || window;
    if ("fixed" == od(this.m())) var c = a = 0;
    else c = Nc(this.D().l), a = c.x, c = c.y;
    var d = yd(this.m());
    b = Lc(b || window);
    a = Math.max(a + b.width / 2 - d.width / 2, 0);
    c = Math.max(c + b.height / 2 - d.height / 2, 0);
    qd(this.m(), a, c);
    qd(this.la, a, c)
  };
  h.Dg = function(a) {
    this.qd ? this.lf() : a.target == this.la && $e(this.Ce, 0, this)
  };
  h.Ce = function() {
    try {
      x && this.D().l.body.focus(), this.m().focus()
    } catch (a) {}
  };
  h.B = function() {
    Md(this.cb);
    this.cb = null;
    Md(this.bb);
    this.bb = null;
    Md(this.lb);
    this.lb = null;
    Md(this.kb);
    this.kb = null;
    aj.v.B.call(this)
  };
  var Z = function(a, b, c) {
    aj.call(this, b, c);
    this.va = a || "modal-dialog";
    this.pa = dj(dj(new ej, fj, !0), gj, !1, !0)
  };
  t(Z, aj);
  h = Z.prototype;
  h.bg = !0;
  h.Ne = !0;
  h.Jd = !0;
  h.ze = !0;
  h.gh = !1;
  h.od = .5;
  h.fh = "";
  h.td = null;
  h.xa = null;
  h.ye = !1;
  h.Hb = null;
  h.bd = null;
  h.ee = null;
  h.Ca = null;
  h.tc = null;
  h.oa = null;
  h.gf = "dialog";
  h.og = !1;
  h.zc = function() {
    return this.va
  };
  h.sf = function(a) {
    a instanceof sc || (a = a instanceof sc ? a : uc(kb("object" == typeof a && a.Va ? a.Ua() : String(a))), a = uc(tc(a).toString().replace(/(\r\n|\r|\n)/g, "<br>")));
    this.td = a;
    this.tc && yc(this.tc, a)
  };
  h.yc = function() {
    this.m() || this.Yb();
    return Z.v.yc.call(this)
  };
  var hj = function(a, b) {
    a.Jd = b;
    if (a.ia) {
      var c = a.D(),
        d = a.yc(),
        e = a.N;
      b ? (e && c.Ue(e, a.m()), c.Ue(d, a.m())) : (c.removeNode(e), c.removeNode(d))
    }
    a.isVisible() && bj(a, b)
  };
  Z.prototype.hg = function() {
    ij(this)
  };
  var ij = function(a) {
      if (a.gh && (a.D(), a.m())) {
        var b = Yi(a);
        yd(b);
        "fixed" != od(b) && a.D()
      }
    },
    jj = function(a, b) {
      var c = cb(a.va + "-title-draggable").split(" ");
      a.m() && (b ? M.addAll(u(a.Hb), c) : M.ka(u(a.Hb), c));
      b && !a.xa ? (b = new Di(a.m(), a.Hb), a.xa = b, M.addAll(u(a.Hb), c), O(a.xa, "start", a.Vg, !1, a), O(a.xa, "drag", a.hg, !1, a)) : !b && a.xa && (a.xa.wa(), a.xa = null)
    };
  h = Z.prototype;
  h.T = function() {
    Z.v.T.call(this);
    var a = this.m();
    u(a, "getElement() returns null");
    var b = this.D();
    this.ee = Xi(this);
    var c = Xi(this) + ".contentEl";
    this.Hb = b.T("DIV", this.va + "-title", this.bd = b.T("SPAN", {
      className: this.va + "-title-text",
      id: this.ee
    }, this.fh), this.Ca = b.T("SPAN", this.va + "-title-close"));
    Uc(a, this.Hb, this.tc = b.T("DIV", {
      className: this.va + "-content",
      id: c
    }), this.oa = b.T("DIV", this.va + "-buttons"));
    zg(this.bd, "heading");
    zg(this.Ca, "button");
    this.Ca.tabIndex = 0;
    X(this.Ca, "label", "Close");
    zg(a, this.gf);
    X(a, "labelledby", this.ee || "");
    this.td && (yc(this.tc, this.td), this.og && c && X(a, "describedby", c));
    K(this.Ca, this.Ne);
    this.pa && kj(this.pa, this.oa);
    K(this.oa, !!this.pa);
    this.od = this.od;
    this.m() && (a = this.yc()) && zd(a, this.od)
  };
  h.pb = function() {
    Z.v.pb.call(this);
    this.Ia().F(this.m(), "keydown", this.Wb).F(this.m(), "keypress", this.Wb);
    this.Ia().F(this.oa, "click", this.Bg);
    jj(this, this.ze);
    this.Ia().F(this.Ca, "click", this.Jg);
    var a = this.m();
    u(a, "The DOM element for dialog cannot be null");
    zg(a, this.gf);
    "" !== this.bd.id && X(a, "labelledby", this.bd.id);
    this.Jd || hj(this, !1)
  };
  h.Ta = function() {
    this.isVisible() && this.I(!1);
    jj(this, !1);
    Z.v.Ta.call(this)
  };
  h.I = function(a) {
    a != this.isVisible() && (this.ia || this.Yb(), Z.v.I.call(this, a))
  };
  h.ab = function() {
    Z.v.ab.call(this);
    ij(this);
    this.dispatchEvent("aftershow")
  };
  h.Ab = function() {
    Z.v.Ab.call(this);
    this.dispatchEvent("afterhide");
    this.ye && this.wa()
  };
  h.Vg = function() {
    var a = this.D().l,
      b = Lc(Oc(a) || window || window),
      c = Math.max(a.body.scrollWidth, b.width);
    a = Math.max(a.body.scrollHeight, b.height);
    var d = yd(this.m());
    "fixed" == od(this.m()) ? this.xa.Lc = new jd(0, 0, Math.max(0, b.width - d.width), Math.max(0, b.height - d.height)) : this.xa.Lc = new jd(0, 0, c - d.width, a - d.height)
  };
  h.Jg = function() {
    lj(this)
  };
  var lj = function(a) {
    if (a.Ne) {
      var b = a.pa,
        c = b && b.nc;
      c ? (b = b.get(c), a.dispatchEvent(new mj(c, b)) && a.I(!1)) : a.I(!1)
    }
  };
  Z.prototype.B = function() {
    this.oa = this.Ca = null;
    Z.v.B.call(this)
  };
  Z.prototype.Bg = function(a) {
    a: {
      for (a = a.target; null != a && a != this.oa;) {
        if ("BUTTON" == a.tagName) break a;
        a = a.parentNode
      }
      a = null
    }
    if (a && !a.disabled) {
      a = a.name;
      var b = this.pa.get(a);
      this.dispatchEvent(new mj(a, b)) && this.I(!1)
    }
  };
  Z.prototype.Wb = function(a) {
    var b = !1,
      c = !1,
      d = this.pa,
      e = a.target;
    if ("keydown" == a.type)
      if (this.bg && 27 == a.keyCode) {
        var f = d && d.nc;
        e = "SELECT" == e.tagName && !e.disabled;
        f && !e ? (c = !0, b = d.get(f), b = this.dispatchEvent(new mj(f, b))) : e || (b = !0)
      } else {
        if (9 == a.keyCode && a.shiftKey && e == this.m()) {
          this.qd = !0;
          try {
            this.la.focus()
          } catch (l) {}
          $e(this.lf, 0, this)
        }
      }
    else if (13 == a.keyCode) {
      if ("BUTTON" == e.tagName && !e.disabled) f = e.name;
      else if (e == this.Ca) lj(this);
      else if (d) {
        var g = d.uc,
          k = g && nj(d, g);
        e = ("TEXTAREA" == e.tagName || "SELECT" ==
          e.tagName || "A" == e.tagName) && !e.disabled;
        !k || k.disabled || e || (f = g)
      }
      f && d && (c = !0, b = this.dispatchEvent(new mj(f, String(d.get(f)))))
    } else e != this.Ca || 32 != a.keyCode && " " != a.key || lj(this);
    if (b || c) a.stopPropagation(), a.preventDefault();
    b && this.I(!1)
  };
  var mj = function(a, b) {
    this.type = "dialogselect";
    this.key = a;
    this.caption = b
  };
  t(mj, N);
  var ej = function(a) {
    Ki.call(this);
    this.Ga = a || Fc();
    this.va = "goog-buttonset";
    this.nc = this.i = this.uc = null
  };
  t(ej, Ki);
  ej.prototype.clear = function() {
    Ki.prototype.clear.call(this);
    this.uc = this.nc = null
  };
  ej.prototype.set = function(a, b, c, d) {
    Ki.prototype.set.call(this, a, b);
    c && (this.uc = a);
    d && (this.nc = a);
    return this
  };
  var dj = function(a, b, c, d) {
      return a.set(b.key, b.caption, c, d)
    },
    kj = function(a, b) {
      a.i = b;
      a.Yb()
    };
  ej.prototype.Yb = function() {
    if (this.i) {
      yc(this.i, vc);
      var a = Fc(this.i);
      this.forEach(function(b, c) {
        b = a.T("BUTTON", {
          name: c
        }, b);
        c == this.uc && (b.className = this.va + "-default");
        this.i.appendChild(b)
      }, this)
    }
  };
  ej.prototype.m = function() {
    return this.i
  };
  ej.prototype.D = function() {
    return this.Ga
  };
  var nj = function(a, b) {
      a = (u(a.i) || document).getElementsByTagName("BUTTON");
      for (var c = 0, d; d = a[c]; c++)
        if (d.name == b || d.id == b) return d;
      return null
    },
    fj = {
      key: "ok",
      caption: "OK"
    },
    gj = {
      key: "cancel",
      caption: "Cancel"
    },
    oj = {
      key: "yes",
      caption: "Yes"
    },
    pj = {
      key: "no",
      caption: "No"
    },
    qj = {
      key: "save",
      caption: "Save"
    },
    rj = {
      key: "continue",
      caption: "Continue"
    };
  "undefined" != typeof document && (dj(new ej, fj, !0, !0), dj(dj(new ej, fj, !0), gj, !1, !0), dj(dj(new ej, oj, !0), pj, !1, !0), dj(dj(dj(new ej, oj), pj, !0), gj, !1, !0), dj(dj(dj(new ej, rj), qj), gj, !0, !0));
  var tj = function() {
      this.g = U("blogger.templates.responsive.Sharing");
      W(this.g, "Initializing Sharing.");
      try {
        this.o = new nh;
        this.Cb = [];
        this.s = null;
        this.Zb = [];
        sj(this);
        if (this.o.Rf) {
          var a = document.querySelector(".post-share-buttons-top"),
            b = document.querySelector(".post-share-buttons-bottom");
          a && b && wi(b, a)
        }
        W(this.g, "Finished initializing sharing.")
      } catch (c) {
        V(this.g, "Error initializing sharing. Uncaught exception.", c), this.h()
      }
    },
    sj = function(a) {
      lh("sharing_native").then(function(b) {
        for (var c = {}, d = n(Array.prototype.slice.call(document.querySelectorAll(".sharing"),
            0)), e = d.next(); !e.done; c = {
            J: c.J,
            Oa: c.Oa,
            ma: c.ma,
            Da: c.Da,
            X: c.X,
            Jb: c.Jb
          }, e = d.next())
          if (c.Oa = e.value, c.X = H("sharing-button", c.Oa), c.Da = H("share-buttons-container", c.Oa), c.ma = H("share-buttons", c.Oa), c.Da && c.ma && c.X) {
            c.J = new Ng(c.ma);
            e = function(l) {
              return function() {
                l.J && l.J.isVisible() && l.J.O()
              }
            }(c);
            var f = function(l) {
              return function() {
                var m = l.J,
                  p = l.ma,
                  q = l.Da,
                  z = l.X;
                m && !m.isVisible() ? a.Fb(m, p, q, z) : a.ub(m, p, q, z)
              }
            }(c);
            Lg(c.J);
            Kg(c.J);
            var g = a.o.yf && a.o.yf(c.J.m()),
              k = a.o.Qe && a.o.Qe(c.J.m());
            c.J.tf(g, k);
            O(window,
              "resize", e);
            O(c.X, "click", f);
            O(c.J, "hide", function(l) {
              return function() {
                return a.ub(l.J, l.ma, l.Da, l.X)
              }
            }(c));
            f = new yi(c.X);
            O(f, "key", function(l) {
              return function(m) {
                return a.Wb(l.J, l.ma, l.Da, l.X, m)
              }
            }(c));
            f = new yi(c.ma);
            O(f, "key", function(l) {
              return function(m) {
                return a.Wb(l.J, l.ma, l.Da, l.X, m)
              }
            }(c));
            zg(c.X, "button");
            X(c.X, "expanded", !1);
            X(c.X, "haspopup", !0);
            b && void 0 !== navigator.share && (c.Jb = H("sharing-element-other", c.Oa), f = c.Jb.parentElement, M.remove(f, "hidden"), f.removeAttribute("aria-hidden"), O(c.Jb,
              "click",
              function(l) {
                return function() {
                  var m = l.Oa.getAttribute("data-title"),
                    p = l.Jb.getAttribute("data-url");
                  null != m && p && (navigator.share({
                    title: m,
                    url: p
                  }), a.ub(l.J, l.ma, l.Da, l.X))
                }
              }(c)));
            a.Cb.push(c.J);
            a.Zb.push(e)
          }
      })
    };
  tj.prototype.ue = function() {
    if (this.Cb)
      for (var a = n(this.Cb), b = a.next(); !b.done; b = a.next())(b = b.value) && b.I(!1)
  };
  tj.prototype.Fb = function(a, b, c, d) {
    b && c && (c.removeChild(b), document.body.appendChild(b), a.I(!1), M.add(d, "sharing-open"), M.remove(b, "hidden"), X(b, "expanded", !0), X(b, "hidden", !1), c = "ltr" == r.document.documentElement.getAttribute("dir") ? 4 : 0, a.Md = c, a.isVisible() && a.O(), d && (X(d, "expanded", !0), a.setPosition(new Zg(d, c))), a.I(!0), this.o.Ae && (this.s = Pf(document.body, null, "sharing-dim-overlay"), this.s.show()), uj(this, b))
  };
  tj.prototype.ub = function(a, b, c, d) {
    b && c && (M.remove(d, "sharing-open"), M.add(b, "hidden"), X(b, "expanded", !1), X(b, "hidden", !0), document.body.removeChild(b), c.appendChild(b), d && X(d, "expanded", !1), this.o.Ae && (this.s.ba(), this.s = null))
  };
  tj.prototype.Wb = function(a, b, c, d, e) {
    b && c && (38 == e.keyCode || 40 == e.keyCode) && (a.isVisible() || this.Fb(a, b, c, d), a = Array.prototype.slice.call(b.querySelectorAll("." + this.o.uf)), b = a.indexOf(document.activeElement), b += 40 == e.keyCode ? 1 : -1, b = (b + a.length) % a.length, a[b].focus(), e.preventDefault())
  };
  var uj = function(a, b) {
      if (!M.contains(b, "btns-init")) {
        for (var c = b.querySelectorAll("." + a.o.uf), d = Da(a.ue, a), e = {}, f = 0; f < c.length; e = {
            jc: e.jc
          }, f++) e.jc = c[f],
          function(g) {
            return function(k) {
              var l = new yi(k);
              if (M.contains(k, "sharing-element-link")) vj(a, k), O(l, "key", function(p) {
                if (32 == p.keyCode || 13 == p.keyCode) k.click(), p.preventDefault()
              });
              else {
                var m = function() {
                  var p = g.jc;
                  if ("undefined" !== typeof ga) {
                    var q = p.querySelector(".platform-sharing-text");
                    q = q ? q.innerText : "Unknown";
                    p = p.getAttribute("data-url");
                    ga("blogger.send", {
                      hitType: "social",
                      socialNetwork: q,
                      socialAction: "Share",
                      socialTarget: p,
                      transport: "beacon"
                    })
                  }
                  var z = k.getAttribute("data-href");
                  q = {
                    target: "_blank",
                    height: 430,
                    width: 640
                  };
                  p = window;
                  if (z instanceof E) var y = z;
                  else y = "undefined" != typeof z.href ? z.href : String(z), y instanceof E || (y = "object" == typeof y && y.Va ? y.Ua() : String(y), oc.test(y) ? y = new E(y, lc) : (y = String(y).replace(/(%0A|%0D)/g, ""), y = y.match(nc) ? new E(y, lc) : null)), y = y || qc;
                  var C = void 0 !== self.crossOriginIsolated,
                    D = "strict-origin-when-cross-origin";
                  window.Request &&
                    (D = (new Request("/")).referrerPolicy);
                  var pa = "unsafe-url" === D;
                  D = q.noreferrer;
                  if (C && D) {
                    if (pa) throw Error("Cannot use the noreferrer option on a page that sets a referrer-policy of `unsafe-url` in modern browsers!");
                    D = !1
                  }
                  z = q.target || z.target;
                  C = [];
                  for (var v in q) switch (v) {
                    case "width":
                    case "height":
                    case "top":
                    case "left":
                      C.push(v + "=" + q[v]);
                      break;
                    case "target":
                    case "noopener":
                    case "noreferrer":
                      break;
                    default:
                      C.push(v + "=" + (q[v] ? 1 : 0))
                  }
                  v = C.join(",");
                  tb() && p.navigator && p.navigator.standalone && z && "_self" !=
                    z ? (v = Rc(document, "A"), Sb(v, "HTMLAnchorElement"), q = y instanceof E ? y : pc(y), v.href = mc(q), v.target = z, D && (v.rel = "noreferrer"), q = document.createEvent("MouseEvent"), q.initMouseEvent("click", !0, !0, p, 1), v.dispatchEvent(q)) : D ? (p = zc("", p, z, v), q = mc(y), p && (zb && -1 != q.indexOf(";") && (q = "'" + q.replace(/'/g, "%27") + "'"), p.opener = null, "" === q && (q = "javascript:''"), v = new fc(dc, "b/12014412, meta tag with sanitized URL"), q = '<meta name="referrer" content="no-referrer"><meta http-equiv="refresh" content="0; url=' + kb(q) + '">',
                      Oa(gc(v), "must provide justification"), u(!/^[\s\xa0]*$/.test(gc(v)), "must provide non-empty justification"), v = uc(q), (p = p.document) && p.write && (p.write(tc(v)), p.close()))) : ((p = zc(y, p, z, v)) && q.noopener && (p.opener = null), p && q.noreferrer && (p.opener = null));
                  d();
                  return !1
                };
                O(l, "key", function(p) {
                  if (32 == p.keyCode || 13 == p.keyCode) m(), p.preventDefault()
                });
                O(k, "click", m)
              }
            }
          }(e)(e.jc);
        M.add(b, "btns-init")
      }
    },
    vj = function(a, b) {
      if (b && "undefined" !== typeof ClipboardJS && ClipboardJS) {
        b = new ClipboardJS(b, {
          text: function(e) {
            return e.getAttribute("data-url")
          }
        });
        var c = Da(a.ue, a),
          d = mh("postUrl") || "Post Link";
        b.on("error", function(e) {
          window.prompt(d, e.trigger.getAttribute("data-url"));
          c();
          return !1
        });
        b.on("success", function() {
          var e = mh("linkCopiedToClipboard") || "Link copied to clipboard.";
          lh("sharing_get_link_dialog").then(function(f) {
            if (f && 0 <= ui()) {
              f = mh("ok") || "Ok";
              var g = new Z,
                k = Pf(document.body, function() {
                  g.I(!1)
                }, "getlink-dim-overlay");
              k.show();
              var l = (new ej).set(f, f, !0, !0);
              g.pa = l;
              g.oa && (g.pa ? kj(g.pa, g.oa) : yc(g.oa, vc), K(g.oa, !!g.pa));
              g.sf(e);
              g.ze = !1;
              jj(g,
                !1);
              g.ye = !0;
              1 != g.Jd && hj(g, !0);
              g.Yb();
              M.add(nj(l, f), "flat-button");
              M.add(g.m(), "dialog");
              M.add(g.m(), "link-copied-dialog");
              g.I(!0);
              O(g, "hide", function() {
                k.ba()
              })
            } else window.alert(e);
            c()
          });
          return !1
        })
      } else uf(a.g, "ClipboardJS not initialized.")
    };
  tj.prototype.h = function() {
    this.s && (this.s.ba(), this.s = null);
    this.Cb && Nd(this.Cb);
    this.Cb = null;
    if (this.Zb)
      for (var a = 0; a < this.Zb.length; a++) P(window, "resize", this.Zb[a]);
    this.Zb = null;
    a = document.querySelectorAll(".sharing .share-buttons .sharing-platform-button");
    for (var b = 0; b < a.length; b++) R(a[b], "click");
    a = document.querySelectorAll(".sharing");
    for (b = 0; b < a.length; b++) {
      var c = H("sharing-button", a[b]);
      R(c, "click")
    }
  };
  var wj = function() {
    var a = this;
    this.g = U("blogger.templates.responsive.SidebarToggle");
    W(this.g, "Initializing SidebarToggle.");
    try {
      var b = document.querySelector(".sidebar-container");
      if (b) {
        this.Zd = b;
        var c = this.Zd.parentElement;
        this.s = c && Pf(c, function() {
          return a.ge()
        });
        (this.Xc = document.querySelector(".sidebar-back")) && O(this.Xc, "click", this.ge, !1, this);
        (this.Bc = document.querySelector(".centered-top-container .hamburger-menu")) && O(this.Bc, "click", this.ge, !1, this);
        W(this.g, "Finished initializing sidebar toggle.")
      } else V(this.g,
        "There was an error initializing the sidebar toggle section. sidebar not found.")
    } catch (d) {
      V(this.g, "Error initializing sidebar toggle. Uncaught exception.", d), this.h()
    }
  };
  wj.prototype.ge = function() {
    vi(this.Zd)();
    M.contains(this.Zd, "sidebar-invisible") ? (this.s && this.s.Rb(), M.remove(document.body, "sidebar-visible")) : (this.s && this.s.show(), M.add(document.body, "sidebar-visible"))
  };
  wj.prototype.h = function() {
    this.Bc && R(this.Bc, "click");
    this.Xc && R(this.Xc, "click");
    this.s && (this.s.ba(), this.s = null)
  };
  var xj = function() {
    this.Lb = "r-snippet-container";
    this.nb = "r-snippetized";
    this.dg = "r-snippet-fade"
  };
  var yj = function() {
    var a = this;
    this.g = U("blogger.templates.responsive.Snippets");
    W(this.g, "Initializing Snippets.");
    try {
      this.o = new xj, this.ta = new Vg(new Ug(this.o.Lb, this.o.nb, function(b, c) {
        return a.Oc(b, c)
      })), W(this.g, "Finished initializing Snippets.")
    } catch (b) {
      V(this.g, "Error initializing Snippets. Uncaught exception.", b), this.h()
    }
  };
  yj.prototype.Oc = function(a, b) {
    (a = H(this.o.dg, a)) && M.enable(a, "hidden", !b)
  };
  yj.prototype.h = function() {
    this.ta && (this.ta.h(), this.ta = null)
  };
  var zj = function(a) {
    ti.call(this);
    a = a || new Sg;
    W(this.sa, "Initializing indie template.");
    try {
      this.ld = new Rg(a.Kf);
      this.Yd = new wj;
      this.Ud = new tj;
      this.ae = new yj;
      new eh;
      var b = new Xg;
      b.jb = ["collapsed-header-show", "collapsed-header-hide"];
      this.Pc = dh(b);
      this.Pc.forEach(function(c) {
        return c.ja()
      });
      W(this.sa, "Finished initializing indie template.")
    } catch (c) {
      V(this.sa, "Error initializing indie template. Uncaught exception.", c), this.h()
    }
  };
  qa(zj, ti);
  zj.prototype.h = function() {
    var a = this;
    return ti.prototype.h.call(this).then(function() {
      a.ld && a.ld.h();
      a.Yd && a.Yd.h();
      a.Ud && a.Ud.h();
      a.ae && a.ae.h();
      a.Pc && a.Pc.forEach(function(b) {
        return b.h()
      });
      a.ld = null;
      a.Yd = null;
      a.Ud = null;
      a.ae = null;
      a.Pc = null
    })
  };
  (function(a) {
    var b = function() {
      document.body.setAttribute("data-js-state", "loading");
      a();
      document.body.setAttribute("data-js-state", "loaded")
    };
    "loading" != document.readyState ? b() : O(window, "DOMContentLoaded", b)
  })(function() {
    return new zj
  });
}).call(this);