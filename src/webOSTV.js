!(function () {
  "use strict";
  var e = {
      d: function (n, t) {
        for (var o in t)
          e.o(t, o) &&
            !e.o(n, o) &&
            Object.defineProperty(n, o, { enumerable: !0, get: t[o] });
      },
      o: function (e, n) {
        return Object.prototype.hasOwnProperty.call(e, n);
      },
      r: function (e) {
        ("undefined" != typeof Symbol &&
          Symbol.toStringTag &&
          Object.defineProperty(e, Symbol.toStringTag, { value: "Module" }),
          Object.defineProperty(e, "__esModule", { value: !0 }));
      },
    },
    n = {};
  (e.r(n),
    e.d(n, {
      fetchAppId: function () {
        return t;
      },
      fetchAppInfo: function () {
        return r;
      },
      fetchAppRootPath: function () {
        return i;
      },
      keyboard: function () {
        return I;
      },
      libVersion: function () {
        return H;
      },
      platform: function () {
        return T;
      },
      platformBack: function () {
        return s;
      },
      service: function () {
        return v;
      },
      systemInfo: function () {
        return E;
      },
    }));
  var t = function () {
      return window.PalmSystem && window.PalmSystem.identifier
        ? window.PalmSystem.identifier.split(" ")[0]
        : "";
    },
    o = {},
    r = function (e, n) {
      if (0 === Object.keys(o).length) {
        var r = function (n, r) {
            if (!n && r)
              try {
                ((o = JSON.parse(r)), e && e(o));
              } catch (n) {
                (console.error("Unable to parse appinfo.json file for", t()),
                  e && e());
              }
            else e && e();
          },
          i = new window.XMLHttpRequest();
        i.onreadystatechange = function () {
          4 === i.readyState &&
            ((i.status >= 200 && i.status < 300) || 0 === i.status
              ? r(null, i.responseText)
              : r({ status: 404 }));
        };
        try {
          (i.open("GET", n || "appinfo.json", !0), i.send(null));
        } catch (e) {
          r({ status: 404 });
        }
      } else e && e(o);
    },
    i = function () {
      var e = window.location.href;
      if ("baseURI" in window.document) e = window.document.baseURI;
      else {
        var n = window.document.getElementsByTagName("base");
        n.length > 0 && (e = n[0].href);
      }
      var t = e.match(/.*:\/\/[^#]*\//);
      return t ? t[0] : "";
    },
    s = function () {
      if (window.PalmSystem && window.PalmSystem.platformBack)
        return window.PalmSystem.platformBack();
    };
  function u(e) {
    return (
      (u =
        "function" == typeof Symbol && "symbol" == typeof Symbol.iterator
          ? function (e) {
              return typeof e;
            }
          : function (e) {
              return e &&
                "function" == typeof Symbol &&
                e.constructor === Symbol &&
                e !== Symbol.prototype
                ? "symbol"
                : typeof e;
            }),
      u(e)
    );
  }
  function a(e, n) {
    var t = Object.keys(e);
    if (Object.getOwnPropertySymbols) {
      var o = Object.getOwnPropertySymbols(e);
      (n &&
        (o = o.filter(function (n) {
          return Object.getOwnPropertyDescriptor(e, n).enumerable;
        })),
        t.push.apply(t, o));
    }
    return t;
  }
  function c(e) {
    for (var n = 1; n < arguments.length; n++) {
      var t = null != arguments[n] ? arguments[n] : {};
      n % 2
        ? a(Object(t), !0).forEach(function (n) {
            var o, r, i;
            ((o = e),
              (r = n),
              (i = t[n]),
              (r = d(r)) in o
                ? Object.defineProperty(o, r, {
                    value: i,
                    enumerable: !0,
                    configurable: !0,
                    writable: !0,
                  })
                : (o[r] = i));
          })
        : Object.getOwnPropertyDescriptors
          ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t))
          : a(Object(t)).forEach(function (n) {
              Object.defineProperty(
                e,
                n,
                Object.getOwnPropertyDescriptor(t, n),
              );
            });
    }
    return e;
  }
  function l(e, n) {
    for (var t = 0; t < n.length; t++) {
      var o = n[t];
      ((o.enumerable = o.enumerable || !1),
        (o.configurable = !0),
        "value" in o && (o.writable = !0),
        Object.defineProperty(e, d(o.key), o));
    }
  }
  function d(e) {
    var n = (function (e, n) {
      if ("object" != u(e) || !e) return e;
      var t = e[Symbol.toPrimitive];
      if (void 0 !== t) {
        var o = t.call(e, "string");
        if ("object" != u(o)) return o;
        throw new TypeError("@@toPrimitive must return a primitive value.");
      }
      return String(e);
    })(e);
    return "symbol" == u(n) ? n : n + "";
  }
  var f = {},
    m = (function () {
      return (
        (e = function e() {
          (!(function (e, n) {
            if (!(e instanceof n))
              throw new TypeError("Cannot call a class as a function");
          })(this, e),
            (this.bridge = null),
            (this.cancelled = !1),
            (this.subscribe = !1));
        }),
        (n = [
          {
            key: "send",
            value: function (e) {
              var n = e.service,
                t = void 0 === n ? "" : n,
                o = e.method,
                r = void 0 === o ? "" : o,
                i = e.parameters,
                s = void 0 === i ? {} : i,
                u = e.onSuccess,
                a = void 0 === u ? function () {} : u,
                l = e.onFailure,
                d = void 0 === l ? function () {} : l,
                m = e.onComplete,
                p = void 0 === m ? function () {} : m,
                v = e.subscribe,
                y = void 0 !== v && v;
              if (!window.PalmServiceBridge) {
                var g = {
                  errorCode: -1,
                  errorText: "PalmServiceBridge is not found.",
                  returnValue: !1,
                };
                return (
                  d(g),
                  p(g),
                  console.error("PalmServiceBridge is not found."),
                  this
                );
              }
              this.ts && f[this.ts] && delete f[this.ts];
              var w,
                b = c({}, s);
              return (
                (this.subscribe = y),
                this.subscribe && (b.subscribe = this.subscribe),
                b.subscribe && (this.subscribe = b.subscribe),
                (this.ts = Date.now()),
                (f[this.ts] = this),
                (this.bridge = new PalmServiceBridge()),
                (this.bridge.onservicecallback = this.callback.bind(
                  this,
                  a,
                  d,
                  p,
                )),
                this.bridge.call(
                  ("/" !== (w = t).slice(-1) && (w += "/"), w + r),
                  JSON.stringify(b),
                ),
                this
              );
            },
          },
          {
            key: "callback",
            value: function () {
              var e =
                  arguments.length > 0 && void 0 !== arguments[0]
                    ? arguments[0]
                    : function () {},
                n =
                  arguments.length > 1 && void 0 !== arguments[1]
                    ? arguments[1]
                    : function () {},
                t =
                  arguments.length > 2 && void 0 !== arguments[2]
                    ? arguments[2]
                    : function () {},
                o =
                  arguments.length > 3 && void 0 !== arguments[3]
                    ? arguments[3]
                    : "";
              if (!this.cancelled) {
                var r = {};
                try {
                  r = JSON.parse(o);
                } catch (e) {
                  r = { errorCode: -1, errorText: o, returnValue: !1 };
                }
                var i = r,
                  s = i.errorCode,
                  u = i.returnValue;
                (s || !1 === u
                  ? ((r.returnValue = !1), n(r))
                  : ((r.returnValue = !0), e(r)),
                  t(r),
                  this.subscribe || this.cancel());
              }
            },
          },
          {
            key: "cancel",
            value: function () {
              ((this.cancelled = !0),
                null !== this.bridge &&
                  (this.bridge.cancel(), (this.bridge = null)),
                this.ts && f[this.ts] && delete f[this.ts]);
            },
          },
        ]),
        n && l(e.prototype, n),
        Object.defineProperty(e, "prototype", { writable: !1 }),
        e
      );
      var e, n;
    })(),
    p = {
      request: function () {
        var e = c(
          {
            service:
              arguments.length > 0 && void 0 !== arguments[0]
                ? arguments[0]
                : "",
          },
          arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {},
        );
        return new m().send(e);
      },
    },
    v = p;
  function y(e) {
    return (
      (y =
        "function" == typeof Symbol && "symbol" == typeof Symbol.iterator
          ? function (e) {
              return typeof e;
            }
          : function (e) {
              return e &&
                "function" == typeof Symbol &&
                e.constructor === Symbol &&
                e !== Symbol.prototype
                ? "symbol"
                : typeof e;
            }),
      y(e)
    );
  }
  var g = {};
  if (
    "object" === ("undefined" == typeof window ? "undefined" : y(window)) &&
    window.PalmSystem
  ) {
    if (window.navigator.userAgent.indexOf("SmartWatch") > -1) g.watch = !0;
    else if (
      window.navigator.userAgent.indexOf("SmartTV") > -1 ||
      window.navigator.userAgent.indexOf("Large Screen") > -1
    )
      g.tv = !0;
    else {
      try {
        var w = JSON.parse(window.PalmSystem.deviceInfo || "{}");
        if (w.platformVersionMajor && w.platformVersionMinor) {
          var b = Number(w.platformVersionMajor),
            h = Number(w.platformVersionMinor);
          b < 3 || (3 === b && h <= 0) ? (g.legacy = !0) : (g.open = !0);
        }
      } catch (e) {
        g.open = !0;
      }
      ((window.Mojo = window.Mojo || { relaunch: function () {} }),
        window.PalmSystem.stageReady && window.PalmSystem.stageReady());
    }
    if (
      window.navigator.userAgent.indexOf("Chr0me") > -1 ||
      window.navigator.userAgent.indexOf("Chrome") > -1
    ) {
      var S =
          window.navigator.userAgent.indexOf("Chr0me") > -1
            ? window.navigator.userAgent.indexOf("Chr0me")
            : window.navigator.userAgent.indexOf("Chrome"),
        O = window.navigator.userAgent.slice(S).indexOf(" "),
        V = window.navigator.userAgent.slice(S + 7, S + O).split(".");
      g.chrome = Number(V[0]);
    } else g.chrome = 0;
  } else g.unknown = !0;
  var T = g,
    P = {},
    k = {},
    j = !1,
    A = !1,
    D = !1,
    C = [];
  function x(e) {
    A && D
      ? (C.length &&
          (C.forEach(function (n) {
            n !== e && n(P);
          }),
          (C = [])),
        e(P))
      : C.push(e);
  }
  function M(e) {
    k.soundOutput &&
    0 === k.soundOutput.indexOf("external_arc") &&
    "external_arc_sound_alive" !== k.soundOutput
      ? e(!0)
      : !k.soundOutput ||
          (0 !== k.soundOutput.indexOf("tv_") &&
            "external_arc_sound_alive" !== k.soundOutput)
        ? e(null)
        : e(!1);
  }
  function N(e) {
    "auto" === k.soundOutputDigital || "passThrough" === k.soundOutputDigital
      ? e(!0)
      : e(!1);
  }
  function _(e, n) {
    P.dolbyAtmos !== e && ((P.dolbyAtmos = e), (A = !0), x(n));
  }
  var z = function (e) {
      
    },
    I = {
      isShowing: function () {
        return PalmSystem && PalmSystem.isKeyboardVisible;
      },
    },
    E = function () {
      var e = {};
      if (window.PalmSystem) {
        if (window.PalmSystem.country) {
          var n = JSON.parse(window.PalmSystem.country);
          ((e.country = n.country),
            (e.smartServiceCountry = n.smartServiceCountry));
        }
        window.PalmSystem.timeZone && (e.timezone = window.PalmSystem.timeZone);
      }
      return e;
    },
    H = "1.2.12";
  window.webOS = n;
})();
