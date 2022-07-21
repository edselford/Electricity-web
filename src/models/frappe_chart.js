export default (function () {
   "use strict";
   function t(t, e) {
      return "string" == typeof t ? (e || document).querySelector(t) : t || null;
   }
   function e(t) {
      var e = t.getBoundingClientRect();
      return {
         top: e.top + (document.documentElement.scrollTop || document.body.scrollTop),
         left: e.left + (document.documentElement.scrollLeft || document.body.scrollLeft),
      };
   }
   function i(t) {
      return null === t.offsetParent;
   }
   function n(t) {
      var e = t.getBoundingClientRect();
      return (
         e.top >= 0 &&
         e.left >= 0 &&
         e.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
         e.right <= (window.innerWidth || document.documentElement.clientWidth)
      );
   }
   function a(t) {
      var e = window.getComputedStyle(t),
         i = parseFloat(e.paddingLeft) + parseFloat(e.paddingRight);
      return t.clientWidth - i;
   }
   function s(t, e, i) {
      var n = document.createEvent("HTMLEvents");
      n.initEvent(e, !0, !0);
      for (var a in i) n[a] = i[a];
      return t.dispatchEvent(n);
   }
   function r(t) {
      return t.titleHeight + t.margins.top + t.paddings.top;
   }
   function o(t) {
      return t.margins.left + t.paddings.left;
   }
   function l(t) {
      return t.margins.top + t.margins.bottom + t.paddings.top + t.paddings.bottom + t.titleHeight + t.legendHeight;
   }
   function h(t) {
      return t.margins.left + t.margins.right + t.paddings.left + t.paddings.right;
   }
   function u(t) {
      return parseFloat(t.toFixed(2));
   }
   function c(t, e, i) {
      var n = arguments.length > 3 && void 0 !== arguments[3] && arguments[3];
      i || (i = n ? t[0] : t[t.length - 1]);
      var a = new Array(Math.abs(e)).fill(i);
      return (t = n ? a.concat(t) : t.concat(a));
   }
   function d(t, e) {
      return (t + "").length * e;
   }
   function p(t, e) {
      return { x: Math.sin(t * te) * e, y: Math.cos(t * te) * e };
   }
   function f(t) {
      var e = arguments.length > 1 && void 0 !== arguments[1] && arguments[1];
      return !Number.isNaN(t) && void 0 !== t && !!Number.isFinite(t) && !(e && t < 0);
   }
   function v(t) {
      return Number(Math.round(t + "e4") + "e-4");
   }
   function g(t) {
      var e = void 0,
         i = void 0,
         n = void 0;
      if (t instanceof Date) return new Date(t.getTime());
      if ("object" !== (void 0 === t ? "undefined" : Ft(t)) || null === t) return t;
      e = Array.isArray(t) ? [] : {};
      for (n in t) (i = t[n]), (e[n] = g(i));
      return e;
   }
   function y(t, e) {
      var i = void 0,
         n = void 0;
      return t <= e ? ((i = e - t), (n = t)) : ((i = t - e), (n = e)), [i, n];
   }
   function m(t, e) {
      var i = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : e.length - t.length;
      return i > 0 ? (t = c(t, i)) : (e = c(e, i)), [t, e];
   }
   function b(t, e) {
      if (t) return t.length > e ? t.slice(0, e - 3) + "..." : t;
   }
   function x(t) {
      var e = void 0;
      if ("number" == typeof t) e = t;
      else if ("string" == typeof t && ((e = Number(t)), Number.isNaN(e))) return t;
      var i = Math.floor(Math.log10(Math.abs(e)));
      if (i <= 2) return e;
      var n = Math.floor(i / 3),
         a = Math.pow(10, i - 3 * n) * +(e / Math.pow(10, i)).toFixed(1);
      return Math.round(100 * a) / 100 + " " + ["", "K", "M", "B", "T"][n];
   }
   function k(t, e) {
      for (var i = [], n = 0; n < t.length; n++) i.push([t[n], e[n]]);
      var a = function (t, e) {
            var i = e[0] - t[0],
               n = e[1] - t[1];
            return { length: Math.sqrt(Math.pow(i, 2) + Math.pow(n, 2)), angle: Math.atan2(n, i) };
         },
         s = function (t, e, i, n) {
            var s = a(e || t, i || t),
               r = s.angle + (n ? Math.PI : 0),
               o = 0.2 * s.length;
            return [t[0] + Math.cos(r) * o, t[1] + Math.sin(r) * o];
         };
      return (function (t, e) {
         return t.reduce(function (t, i, n, a) {
            return 0 === n ? i[0] + "," + i[1] : t + " " + e(i, n, a);
         }, "");
      })(i, function (t, e, i) {
         var n = s(i[e - 1], i[e - 2], t),
            a = s(t, i[e - 1], i[e + 1], !0);
         return "C " + n[0] + "," + n[1] + " " + a[0] + "," + a[1] + " " + t[0] + "," + t[1];
      });
   }
   function w(t) {
      return t > 255 ? 255 : t < 0 ? 0 : t;
   }
   function A(t, e) {
      var i = ne(t),
         n = !1;
      "#" == i[0] && ((i = i.slice(1)), (n = !0));
      var a = parseInt(i, 16),
         s = w((a >> 16) + e),
         r = w(((a >> 8) & 255) + e),
         o = w((255 & a) + e);
      return (n ? "#" : "") + (o | (r << 8) | (s << 16)).toString(16);
   }
   function P(t) {
      var e =
         /(^\s*)(rgb|hsl)(a?)[(]\s*([\d.]+\s*%?)\s*,\s*([\d.]+\s*%?)\s*,\s*([\d.]+\s*%?)\s*(?:,\s*([\d.]+)\s*)?[)]$/i;
      return /(^\s*)(#)((?:[A-Fa-f0-9]{3}){1,2})$/i.test(t) || e.test(t);
   }
   function M(t, e) {
      return "string" == typeof t ? (e || document).querySelector(t) : t || null;
   }
   function C(t, e) {
      var i = document.createElementNS("http://www.w3.org/2000/svg", t);
      for (var n in e) {
         var a = e[n];
         if ("inside" === n) M(a).appendChild(i);
         else if ("around" === n) {
            var s = M(a);
            s.parentNode.insertBefore(i, s), i.appendChild(s);
         } else
            "styles" === n
               ? "object" === (void 0 === a ? "undefined" : Ft(a)) &&
                 Object.keys(a).map(function (t) {
                    i.style[t] = a[t];
                 })
               : ("className" === n && (n = "class"), "innerHTML" === n ? (i.textContent = a) : i.setAttribute(n, a));
      }
      return i;
   }
   function D(t, e) {
      return C("linearGradient", { inside: t, id: e, x1: 0, x2: 0, y1: 0, y2: 1 });
   }
   function T(t, e, i, n) {
      return C("stop", { inside: t, style: "stop-color: " + i, offset: e, "stop-opacity": n });
   }
   function L(t, e, i, n) {
      return C("svg", { className: e, inside: t, width: i, height: n });
   }
   function O(t) {
      return C("defs", { inside: t });
   }
   function N(t) {
      var e = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : "",
         i = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : void 0,
         n = { className: t, transform: e };
      return i && (n.inside = i), C("g", n);
   }
   function S(t) {
      return C("path", {
         className: arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : "",
         d: t,
         styles: {
            stroke: arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : "none",
            fill: arguments.length > 3 && void 0 !== arguments[3] ? arguments[3] : "none",
            "stroke-width": arguments.length > 4 && void 0 !== arguments[4] ? arguments[4] : 2,
         },
      });
   }
   function E(t, e, i, n) {
      var a = arguments.length > 4 && void 0 !== arguments[4] ? arguments[4] : 1,
         s = arguments.length > 5 && void 0 !== arguments[5] ? arguments[5] : 0,
         r = i.x + t.x,
         o = i.y + t.y,
         l = i.x + e.x,
         h = i.y + e.y;
      return (
         "M" +
         i.x +
         " " +
         i.y +
         "\n\t\tL" +
         r +
         " " +
         o +
         "\n\t\tA " +
         n +
         " " +
         n +
         " 0 " +
         s +
         " " +
         (a ? 1 : 0) +
         "\n\t\t" +
         l +
         " " +
         h +
         " z"
      );
   }
   function _(t, e, i, n) {
      var a = arguments.length > 4 && void 0 !== arguments[4] ? arguments[4] : 1,
         s = arguments.length > 5 && void 0 !== arguments[5] ? arguments[5] : 0,
         r = i.x + t.x,
         o = i.y + t.y,
         l = i.x + e.x,
         h = 2 * i.y,
         u = i.y + e.y;
      return (
         "M" +
         i.x +
         " " +
         i.y +
         "\n\t\tL" +
         r +
         " " +
         o +
         "\n\t\tA " +
         n +
         " " +
         n +
         " 0 " +
         s +
         " " +
         (a ? 1 : 0) +
         "\n\t\t" +
         l +
         " " +
         h +
         " z\n\t\tL" +
         r +
         " " +
         h +
         "\n\t\tA " +
         n +
         " " +
         n +
         " 0 " +
         s +
         " " +
         (a ? 1 : 0) +
         "\n\t\t" +
         l +
         " " +
         u +
         " z"
      );
   }
   function z(t, e, i, n) {
      var a = arguments.length > 4 && void 0 !== arguments[4] ? arguments[4] : 1,
         s = arguments.length > 5 && void 0 !== arguments[5] ? arguments[5] : 0,
         r = i.x + t.x,
         o = i.y + t.y,
         l = i.x + e.x,
         h = i.y + e.y;
      return "M" + r + " " + o + "\n\t\tA " + n + " " + n + " 0 " + s + " " + (a ? 1 : 0) + "\n\t\t" + l + " " + h;
   }
   function I(t, e, i, n) {
      var a = arguments.length > 4 && void 0 !== arguments[4] ? arguments[4] : 1,
         s = arguments.length > 5 && void 0 !== arguments[5] ? arguments[5] : 0,
         r = i.x + t.x,
         o = i.y + t.y,
         l = i.x + e.x,
         h = 2 * n + o,
         u = i.y + t.y;
      return (
         "M" +
         r +
         " " +
         o +
         "\n\t\tA " +
         n +
         " " +
         n +
         " 0 " +
         s +
         " " +
         (a ? 1 : 0) +
         "\n\t\t" +
         l +
         " " +
         h +
         "\n\t\tM" +
         r +
         " " +
         h +
         "\n\t\tA " +
         n +
         " " +
         n +
         " 0 " +
         s +
         " " +
         (a ? 1 : 0) +
         "\n\t\t" +
         l +
         " " +
         u
      );
   }
   function H(t, e) {
      var i = arguments.length > 2 && void 0 !== arguments[2] && arguments[2],
         n = "path-fill-gradient-" + e + "-" + (i ? "lighter" : "default"),
         a = D(t, n),
         s = [1, 0.6, 0.2];
      return i && (s = [0.4, 0.2, 0]), T(a, "0%", e, s[0]), T(a, "50%", e, s[1]), T(a, "100%", e, s[2]), n;
   }
   function W(t, e, i, n) {
      var a = arguments.length > 4 && void 0 !== arguments[4] ? arguments[4] : Kt,
         s = arguments.length > 5 && void 0 !== arguments[5] ? arguments[5] : "none";
      return C("rect", {
         className: "percentage-bar",
         x: t,
         y: e,
         width: i,
         height: n,
         fill: s,
         styles: { stroke: A(s, -25), "stroke-dasharray": "0, " + (n + i) + ", " + i + ", " + n, "stroke-width": a },
      });
   }
   function F(t, e, i, n, a) {
      var s = arguments.length > 5 && void 0 !== arguments[5] ? arguments[5] : "none",
         r = arguments.length > 6 && void 0 !== arguments[6] ? arguments[6] : {},
         o = { className: t, x: e, y: i, width: n, height: n, rx: a, fill: s };
      return (
         Object.keys(r).map(function (t) {
            o[t] = r[t];
         }),
         C("rect", o)
      );
   }
   function j(t, e, i) {
      var n = arguments.length > 3 && void 0 !== arguments[3] ? arguments[3] : "none",
         a = arguments[4];
      a = arguments.length > 5 && void 0 !== arguments[5] && arguments[5] ? b(a, oe) : a;
      var s = { className: "legend-bar", x: 0, y: 0, width: i, height: "2px", fill: n },
         r = C("text", {
            className: "legend-dataset-text",
            x: 0,
            y: 0,
            dy: 2 * he + "px",
            "font-size": 1.2 * he + "px",
            "text-anchor": "start",
            fill: ce,
            innerHTML: a,
         }),
         o = C("g", { transform: "translate(" + t + ", " + e + ")" });
      return o.appendChild(C("rect", s)), o.appendChild(r), o;
   }
   function R(t, e, i) {
      var n = arguments.length > 3 && void 0 !== arguments[3] ? arguments[3] : "none",
         a = arguments[4];
      a = arguments.length > 5 && void 0 !== arguments[5] && arguments[5] ? b(a, oe) : a;
      var s = { className: "legend-dot", cx: 0, cy: 0, r: i, fill: n },
         r = C("text", {
            className: "legend-dataset-text",
            x: 0,
            y: 0,
            dx: he + "px",
            dy: he / 3 + "px",
            "font-size": 1.2 * he + "px",
            "text-anchor": "start",
            fill: ce,
            innerHTML: a,
         }),
         o = C("g", { transform: "translate(" + t + ", " + e + ")" });
      return o.appendChild(C("circle", s)), o.appendChild(r), o;
   }
   function Y(t, e, i, n) {
      var a = arguments.length > 4 && void 0 !== arguments[4] ? arguments[4] : {},
         s = a.fontSize || he;
      return C("text", {
         className: t,
         x: e,
         y: i,
         dy: (void 0 !== a.dy ? a.dy : s / 2) + "px",
         "font-size": s + "px",
         fill: a.fill || ce,
         "text-anchor": a.textAnchor || "start",
         innerHTML: n,
      });
   }
   function B(t, e, i, n) {
      var a = arguments.length > 4 && void 0 !== arguments[4] ? arguments[4] : {};
      a.stroke || (a.stroke = ue);
      var s = C("line", {
            className: "line-vertical " + a.className,
            x1: 0,
            x2: 0,
            y1: i,
            y2: n,
            styles: { stroke: a.stroke },
         }),
         r = C("text", {
            x: 0,
            y: i > n ? i + se : i - se - he,
            dy: he + "px",
            "font-size": he + "px",
            "text-anchor": "middle",
            innerHTML: e + "",
         }),
         o = C("g", { transform: "translate(" + t + ", 0)" });
      return o.appendChild(s), o.appendChild(r), o;
   }
   function V(t, e, i, n) {
      var a = arguments.length > 4 && void 0 !== arguments[4] ? arguments[4] : {};
      a.stroke || (a.stroke = ue),
         a.lineType || (a.lineType = ""),
         a.alignment || (a.alignment = "left"),
         a.shortenNumbers && (e = x(e));
      var s = "line-horizontal " + a.className + ("dashed" === a.lineType ? "dashed" : ""),
         r = "left" === a.alignment ? (a.title ? i - se + re : i - se) : a.title ? n + 4 * se - re : n + 4 * se,
         o = C("line", {
            className: s,
            x1: a.title ? i + re : i,
            x2: a.title ? n - re : n,
            y1: 0,
            y2: 0,
            styles: { stroke: a.stroke },
         }),
         l = C("text", {
            x: r,
            y: 0,
            dy: he / 2 - 2 + "px",
            "font-size": he + "px",
            "text-anchor": i < n ? "end" : "start",
            innerHTML: e + "",
         }),
         h = C("g", { transform: "translate(0, " + t + ")", "stroke-opacity": 1 });
      return (
         (0 !== l && "0" !== l) || (h.style.stroke = "rgba(27, 31, 35, 0.6)"), h.appendChild(o), h.appendChild(l), h
      );
   }
   function U(t) {
      if (t.title) {
         var e =
               "left" === t.position
                  ? (t.height - le) / 2 + d(t.title, 5) / 2
                  : (t.height - le) / 2 - d(t.title, 5) / 2,
            i = "left" === t.position ? 0 : t.width,
            n = "left" === t.position ? he - re : he + -1 * re,
            a = "right" === t.position ? "rotate(90)" : "rotate(270)",
            s = C("text", {
               className: "chart-label",
               x: 0,
               y: 0,
               dy: n + "px",
               "font-size": he + "px",
               "text-anchor": "start",
               innerHTML: t.title + " ",
            }),
            r = C("g", {
               x: 0,
               y: 0,
               transformBox: "fill-box",
               transform: "translate(" + i + ", " + e + ") " + a,
               className: "test-" + t.position,
            });
         return r.appendChild(s), r;
      }
   }
   function G(t, e, i) {
      var n = arguments.length > 3 && void 0 !== arguments[3] ? arguments[3] : {};
      f(t) || (t = 0),
         n.pos || (n.pos = "left"),
         n.offset || (n.offset = 0),
         n.mode || (n.mode = "span"),
         n.stroke || (n.stroke = ue),
         n.className || (n.className = "");
      var a = -1 * ae,
         s = "span" === n.mode ? i + ae : 0;
      "tick" === n.mode && "right" === n.pos && ((a = i + ae), (s = i));
      var r = "left" === n.pos ? -1 * n.offset : n.offset;
      return (
         (a += r),
         (s += r),
         V(t, e, a, s, {
            stroke: n.stroke,
            className: n.className,
            lineType: n.lineType,
            alignment: n.pos,
            title: n.title,
            shortenNumbers: n.shortenNumbers,
         })
      );
   }
   function q(t, e, i) {
      var n = arguments.length > 3 && void 0 !== arguments[3] ? arguments[3] : {};
      f(t) || (t = 0),
         n.pos || (n.pos = "bottom"),
         n.offset || (n.offset = 0),
         n.mode || (n.mode = "span"),
         n.stroke || (n.stroke = ue),
         n.className || (n.className = "");
      var a = i + ae,
         s = "span" === n.mode ? -1 * ae : i;
      return (
         "tick" === n.mode && "top" === n.pos && ((a = -1 * ae), (s = 0)),
         B(t, e, a, s, { stroke: n.stroke, className: n.className, lineType: n.lineType })
      );
   }
   function X(t, e, i) {
      var n = arguments.length > 3 && void 0 !== arguments[3] ? arguments[3] : {};
      n.labelPos || (n.labelPos = "right");
      var a = C("text", {
            className: "chart-label",
            x: "left" === n.labelPos ? se : i - d(e, 5) - se,
            y: 0,
            dy: he / -2 + "px",
            "font-size": he + "px",
            "text-anchor": "start",
            innerHTML: e + "",
         }),
         s = V(t, "", 0, i, { stroke: n.stroke || ue, className: n.className || "", lineType: n.lineType });
      return s.appendChild(a), s;
   }
   function J(t, e, i, n) {
      var a = arguments.length > 4 && void 0 !== arguments[4] ? arguments[4] : {},
         s = t - e,
         r = C("rect", {
            className: "bar mini",
            styles: { fill: "rgba(228, 234, 239, 0.49)", stroke: ue, "stroke-dasharray": i + ", " + s },
            x: 0,
            y: 0,
            width: i,
            height: s,
         });
      a.labelPos || (a.labelPos = "right");
      var o = C("text", {
            className: "chart-label",
            x: "left" === a.labelPos ? se : i - d(n + "", 4.5) - se,
            y: 0,
            dy: he / -2 + "px",
            "font-size": he + "px",
            "text-anchor": "start",
            innerHTML: n + "",
         }),
         l = C("g", { transform: "translate(0, " + e + ")" });
      return l.appendChild(r), l.appendChild(o), l;
   }
   function K(t, e, i, n) {
      var a = arguments.length > 4 && void 0 !== arguments[4] ? arguments[4] : "",
         s = arguments.length > 5 && void 0 !== arguments[5] ? arguments[5] : 0,
         r = arguments.length > 6 && void 0 !== arguments[6] ? arguments[6] : 0,
         o = arguments.length > 7 && void 0 !== arguments[7] ? arguments[7] : {},
         l = y(e, o.zeroLine),
         h = Ut(l, 2),
         u = h[0],
         c = h[1];
      (c -= r),
         0 === u && ((u = o.minHeight), (c -= o.minHeight)),
         f(t) || (t = 0),
         f(c) || (c = 0),
         f(u, !0) || (u = 0),
         f(i, !0) || (i = 0);
      var d = C("rect", {
         className: "bar mini",
         style: "fill: " + n,
         "data-point-index": s,
         x: t,
         y: c,
         width: i,
         height: u,
      });
      if ((a += "") || a.length) {
         d.setAttribute("y", 0), d.setAttribute("x", 0);
         var p = C("text", {
               className: "data-point-value",
               x: i / 2,
               y: 0,
               dy: (he / 2) * -1 + "px",
               "font-size": he + "px",
               "text-anchor": "middle",
               innerHTML: a,
            }),
            v = C("g", { "data-point-index": s, transform: "translate(" + t + ", " + c + ")" });
         return v.appendChild(d), v.appendChild(p), v;
      }
      return d;
   }
   function $(t, e, i, n) {
      var a = arguments.length > 4 && void 0 !== arguments[4] ? arguments[4] : "",
         s = arguments.length > 5 && void 0 !== arguments[5] ? arguments[5] : 0,
         r = C("circle", { style: "fill: " + n, "data-point-index": s, cx: t, cy: e, r: i });
      if ((a += "") || a.length) {
         r.setAttribute("cy", 0), r.setAttribute("cx", 0);
         var o = C("text", {
               className: "data-point-value",
               x: 0,
               y: 0,
               dy: (he / 2) * -1 - i + "px",
               "font-size": he + "px",
               "text-anchor": "middle",
               innerHTML: a,
            }),
            l = C("g", { "data-point-index": s, transform: "translate(" + t + ", " + e + ")" });
         return l.appendChild(r), l.appendChild(o), l;
      }
      return r;
   }
   function Q(t, e, i) {
      var n = arguments.length > 3 && void 0 !== arguments[3] ? arguments[3] : {},
         a = arguments.length > 4 && void 0 !== arguments[4] ? arguments[4] : {},
         s = e
            .map(function (e, i) {
               return t[i] + "," + e;
            })
            .join("L");
      n.spline && (s = k(t, e));
      var r = S("M" + s, "line-graph-path", i);
      if (n.heatline) {
         var o = H(a.svgDefs, i);
         r.style.stroke = "url(#" + o + ")";
      }
      var l = { path: r };
      if (n.regionFill) {
         var h = H(a.svgDefs, i, !0),
            u = "M" + t[0] + "," + a.zeroLine + "L" + s + "L" + t.slice(-1)[0] + "," + a.zeroLine;
         l.region = S(u, "region-fill", "none", "url(#" + h + ")");
      }
      return l;
   }
   function Z(t, e, i, n) {
      var a = "string" == typeof e ? e : e.join(", ");
      return [t, { transform: i.join(", ") }, n, me, "translate", { transform: a }];
   }
   function tt(t, e, i) {
      return Z(t, [i, 0], [e, 0], ge);
   }
   function et(t, e, i) {
      return Z(t, [0, i], [0, e], ge);
   }
   function it(t, e, i, n) {
      var a = e - i,
         s = t.childNodes[0];
      return [
         [s, { height: a, "stroke-dasharray": s.getAttribute("width") + ", " + a }, ge, me],
         Z(t, [0, n], [0, i], ge),
      ];
   }
   function nt(t, e, i, n) {
      var a = arguments.length > 4 && void 0 !== arguments[4] ? arguments[4] : 0,
         s = y(i, (arguments.length > 5 && void 0 !== arguments[5] ? arguments[5] : {}).zeroLine),
         r = Ut(s, 2),
         o = r[0],
         l = r[1];
      return (
         (l -= a),
         "rect" !== t.nodeName
            ? [
                 [t.childNodes[0], { width: n, height: o }, fe, me],
                 Z(t, t.getAttribute("transform").split("(")[1].slice(0, -1), [e, l], ge),
              ]
            : [[t, { width: n, height: o, x: e, y: l }, fe, me]]
      );
   }
   function at(t, e, i) {
      return "circle" !== t.nodeName
         ? [Z(t, t.getAttribute("transform").split("(")[1].slice(0, -1), [e, i], ge)]
         : [[t, { cx: e, cy: i }, fe, me]];
   }
   function st(t, e, i, n, a) {
      var s = [],
         r = i
            .map(function (t, i) {
               return e[i] + "," + t;
            })
            .join("L");
      a && (r = k(e, i));
      var o = [t.path, { d: "M" + r }, ve, me];
      if ((s.push(o), t.region)) {
         var l = e[0] + "," + n + "L",
            h = "L" + e.slice(-1)[0] + ", " + n,
            u = [t.region, { d: "M" + l + r + h }, ve, me];
         s.push(u);
      }
      return s;
   }
   function rt(t, e) {
      return [t, { d: e }, fe, me];
   }
   function ot(t, e, i) {
      var n = arguments.length > 3 && void 0 !== arguments[3] ? arguments[3] : "linear",
         a = arguments.length > 4 && void 0 !== arguments[4] ? arguments[4] : void 0,
         s = arguments.length > 5 && void 0 !== arguments[5] ? arguments[5] : {},
         r = t.cloneNode(!0),
         o = t.cloneNode(!0);
      for (var l in e) {
         var h = void 0;
         h =
            "transform" === l
               ? document.createElementNS("http://www.w3.org/2000/svg", "animateTransform")
               : document.createElementNS("http://www.w3.org/2000/svg", "animate");
         var u = s[l] || t.getAttribute(l),
            c = e[l],
            d = {
               attributeName: l,
               from: u,
               to: c,
               begin: "0s",
               dur: i / 1e3 + "s",
               values: u + ";" + c,
               keySplines: be[n],
               keyTimes: "0;1",
               calcMode: "spline",
               fill: "freeze",
            };
         a && (d.type = a);
         for (var p in d) h.setAttribute(p, d[p]);
         r.appendChild(h), a ? o.setAttribute(l, "translate(" + c + ")") : o.setAttribute(l, c);
      }
      return [r, o];
   }
   function lt(t, e) {
      (t.style.transform = e),
         (t.style.webkitTransform = e),
         (t.style.msTransform = e),
         (t.style.mozTransform = e),
         (t.style.oTransform = e);
   }
   function ht(t, e) {
      var i = [],
         n = [];
      e.map(function (t) {
         var e = t[0],
            a = e.parentNode,
            s = void 0,
            r = void 0;
         t[0] = e;
         var o = ot.apply(void 0, Gt(t)),
            l = Ut(o, 2);
         (s = l[0]), (r = l[1]), i.push(r), n.push([s, a]), a && a.replaceChild(s, e);
      });
      var a = t.cloneNode(!0);
      return (
         n.map(function (t, n) {
            t[1] && (t[1].replaceChild(i[n], t[0]), (e[n][0] = i[n]));
         }),
         a
      );
   }
   function ut(t, e, i) {
      if (0 !== i.length) {
         var n = ht(e, i);
         e.parentNode == t && (t.removeChild(e), t.appendChild(n)),
            setTimeout(function () {
               n.parentNode == t && (t.removeChild(n), t.appendChild(e));
            }, ye);
      }
   }
   function ct(t, e) {
      var i = document.createElement("a");
      i.style = "display: none";
      var n = new Blob(e, { type: "image/svg+xml; charset=utf-8" }),
         a = window.URL.createObjectURL(n);
      (i.href = a),
         (i.download = t),
         document.body.appendChild(i),
         i.click(),
         setTimeout(function () {
            document.body.removeChild(i), window.URL.revokeObjectURL(a);
         }, 300);
   }
   function dt(e) {
      var i = e.cloneNode(!0);
      i.classList.add("chart-container"),
         i.setAttribute("xmlns", "http://www.w3.org/2000/svg"),
         i.setAttribute("xmlns:xlink", "http://www.w3.org/1999/xlink");
      var n = t.create("style", { innerHTML: xe });
      i.insertBefore(n, i.firstChild);
      var a = t.create("div");
      return a.appendChild(i), a.innerHTML;
   }
   function pt(t) {
      var e = new Date(t);
      return e.setMinutes(e.getMinutes() - e.getTimezoneOffset()), e;
   }
   function ft(t) {
      var e = t.getDate(),
         i = t.getMonth() + 1;
      return [t.getFullYear(), (i > 9 ? "" : "0") + i, (e > 9 ? "" : "0") + e].join("-");
   }
   function vt(t) {
      return new Date(t.getTime());
   }
   function gt(t, e) {
      var i = kt(t);
      return Math.ceil(yt(i, e) / Ae);
   }
   function yt(t, e) {
      var i = Me * Pe;
      return (pt(e) - pt(t)) / i;
   }
   function mt(t, e) {
      return t.getMonth() === e.getMonth() && t.getFullYear() === e.getFullYear();
   }
   function bt(t) {
      var e = arguments.length > 1 && void 0 !== arguments[1] && arguments[1],
         i = Ce[t];
      return e ? i.slice(0, 3) : i;
   }
   function xt(t, e) {
      return new Date(e, t + 1, 0);
   }
   function kt(t) {
      var e = vt(t),
         i = e.getDay();
      return 0 !== i && wt(e, -1 * i), e;
   }
   function wt(t, e) {
      t.setDate(t.getDate() + e);
   }
   function At(t, e, i) {
      var n = Object.keys(Le).filter(function (e) {
            return t.includes(e);
         }),
         a = Le[n[0]];
      return Object.assign(a, { constants: e, getData: i }), new Te(a);
   }
   function Pt(t) {
      if (0 === t) return [0, 0];
      if (isNaN(t)) return { mantissa: -6755399441055744, exponent: 972 };
      var e = t > 0 ? 1 : -1;
      if (!isFinite(t)) return { mantissa: 4503599627370496 * e, exponent: 972 };
      t = Math.abs(t);
      var i = Math.floor(Math.log10(t));
      return [e * (t / Math.pow(10, i)), i];
   }
   function Mt(t) {
      var e = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : 0,
         i = Math.ceil(t),
         n = Math.floor(e),
         a = i - n,
         s = a,
         r = 1;
      a > 5 && (a % 2 != 0 && (a = ++i - n), (s = a / 2), (r = 2)),
         a <= 2 && (r = a / (s = 4)),
         0 === a && ((s = 5), (r = 1));
      for (var o = [], l = 0; l <= s; l++) o.push(n + r * l);
      return o;
   }
   function Ct(t) {
      var e = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : 0,
         i = Pt(t),
         n = Ut(i, 2),
         a = n[0],
         s = n[1],
         r = e ? e / Math.pow(10, s) : 0,
         o = Mt((a = a.toFixed(6)), r);
      return (o = o.map(function (t) {
         return s < 0 ? t / Math.pow(10, -s) : t * Math.pow(10, s);
      }));
   }
   function Dt(t) {
      function e(t, e) {
         for (var i = Ct(t), n = i[1] - i[0], a = 0, s = 1; a < e; s++) (a += n), i.unshift(-1 * a);
         return i;
      }
      var i = arguments.length > 1 && void 0 !== arguments[1] && arguments[1],
         n = Math.max.apply(Math, Gt(t)),
         a = Math.min.apply(Math, Gt(t)),
         s = [];
      if (n >= 0 && a >= 0) Pt(n)[1], (s = i ? Ct(n, a) : Ct(n));
      else if (n > 0 && a < 0) {
         var r = Math.abs(a);
         n >= r
            ? (Pt(n)[1], (s = e(n, r)))
            : (Pt(r)[1],
              (s = e(r, n)
                 .reverse()
                 .map(function (t) {
                    return -1 * t;
                 })));
      } else if (n <= 0 && a <= 0) {
         var o = Math.abs(a),
            l = Math.abs(n);
         Pt(o)[1],
            (s = (s = i ? Ct(o, l) : Ct(o)).reverse().map(function (t) {
               return -1 * t;
            }));
      }
      return s;
   }
   function Tt(t) {
      var e = Lt(t);
      return t.indexOf(0) >= 0
         ? t.indexOf(0)
         : t[0] > 0
         ? (-1 * t[0]) / e
         : (-1 * t[t.length - 1]) / e + (t.length - 1);
   }
   function Lt(t) {
      return t[1] - t[0];
   }
   function Ot(t) {
      return t[t.length - 1] - t[0];
   }
   function Nt(t, e) {
      return u(e.zeroLine - t * e.scaleMultiplier);
   }
   function St(t, e) {
      var i = arguments.length > 2 && void 0 !== arguments[2] && arguments[2],
         n = e.reduce(function (e, i) {
            return Math.abs(i - t) < Math.abs(e - t) ? i : e;
         }, []);
      return i ? e.indexOf(n) : n;
   }
   function Et(t, e) {
      for (var i = Math.max.apply(Math, Gt(t)), n = 1 / (e - 1), a = [], s = 0; s < e; s++) {
         var r = i * (n * s);
         a.push(r);
      }
      return a;
   }
   function _t(t, e) {
      return e.filter(function (e) {
         return e < t;
      }).length;
   }
   function zt(t, e) {
      t.labels = t.labels || [];
      var i = t.labels.length,
         n = t.datasets,
         a = new Array(i).fill(0);
      return (
         n || (n = [{ values: a }]),
         n.map(function (t) {
            if (t.values) {
               var n = t.values;
               (n =
                  (n = n.map(function (t) {
                     return isNaN(t) ? 0 : t;
                  })).length > i
                     ? n.slice(0, i)
                     : c(n, i - n.length, 0)),
                  (t.values = n);
            } else t.values = a;
            t.chartType || (Jt.includes(e), (t.chartType = e));
         }),
         t.yRegions &&
            t.yRegions.map(function (t) {
               if (t.end < t.start) {
                  var e = [t.end, t.start];
                  (t.start = e[0]), (t.end = e[1]);
               }
            }),
         t
      );
   }
   function It(t) {
      var e = t.labels.length,
         i = new Array(e).fill(0),
         n = {
            labels: t.labels.slice(0, -1),
            datasets: t.datasets.map(function (t) {
               return { axisID: t.axisID, name: "", values: i.slice(0, -1), chartType: t.chartType };
            }),
         };
      return (
         t.yMarkers && (n.yMarkers = [{ value: 0, label: "" }]),
         t.yRegions && (n.yRegions = [{ start: 0, end: 0, label: "" }]),
         n
      );
   }
   function Ht(t) {
      var e = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : [],
         i = !(arguments.length > 2 && void 0 !== arguments[2]) || arguments[2],
         n = t / e.length;
      n <= 0 && (n = 1);
      var a = n / $t,
         s = void 0;
      if (i) {
         var r = Math.max.apply(
            Math,
            Gt(
               e.map(function (t) {
                  return t.length;
               })
            )
         );
         s = Math.ceil(r / a);
      }
      return e.map(function (t, e) {
         return (
            (t += "").length > a &&
               (i ? e % s != 0 && (t = "") : (t = a - 3 > 0 ? t.slice(0, a - 3) + " ..." : t.slice(0, a) + "..")),
            t
         );
      });
   }
   function Wt() {
      var t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : "line",
         e = arguments[1],
         i = arguments[2];
      return "axis-mixed" === t
         ? ((i.type = "line"), new Ee(e, i))
         : ze[t]
         ? new ze[t](e, i)
         : void console.error("Undefined chart type: " + t);
   }
   !(function (t, e) {
      void 0 === e && (e = {});
      var i = e.insertAt;
      if (t && "undefined" != typeof document) {
         var n = document.head || document.getElementsByTagName("head")[0],
            a = document.createElement("style");
         (a.type = "text/css"),
            "top" === i && n.firstChild ? n.insertBefore(a, n.firstChild) : n.appendChild(a),
            a.styleSheet ? (a.styleSheet.cssText = t) : a.appendChild(document.createTextNode(t));
      }
   })(
      '.chart-container{position:relative;font-family:-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Oxygen,Ubuntu,Cantarell,Fira Sans,Droid Sans,Helvetica Neue,sans-serif}.chart-container .axis,.chart-container .chart-label{fill:#555b51}.chart-container .axis line,.chart-container .chart-label line{stroke:#dadada}.chart-container .dataset-units circle{stroke:#fff;stroke-width:2}.chart-container .dataset-units path{fill:none;stroke-opacity:1;stroke-width:2px}.chart-container .dataset-path{stroke-width:2px}.chart-container .path-group path{fill:none;stroke-opacity:1;stroke-width:2px}.chart-container line.dashed{stroke-dasharray:5,3}.chart-container .axis-line .specific-value{text-anchor:start}.chart-container .axis-line .y-line{text-anchor:end}.chart-container .axis-line .x-line{text-anchor:middle}.chart-container .legend-dataset-text{fill:#6c7680;font-weight:600}.graph-svg-tip{position:absolute;z-index:99999;padding:10px;font-size:12px;color:#959da5;text-align:center;background:rgba(0,0,0,.8);border-radius:3px}.graph-svg-tip ol,.graph-svg-tip ul{padding-left:0;display:-webkit-box;display:-ms-flexbox;display:flex}.graph-svg-tip ul.data-point-list li{min-width:90px;-webkit-box-flex:1;-ms-flex:1;flex:1;font-weight:600}.graph-svg-tip strong{color:#dfe2e5;font-weight:600}.graph-svg-tip .svg-pointer{position:absolute;height:5px;margin:0 0 0 -5px;content:" ";border:5px solid transparent;border-top-color:rgba(0,0,0,.8)}.graph-svg-tip.comparison{padding:0;text-align:left;pointer-events:none}.graph-svg-tip.comparison .title{display:block;padding:10px;margin:0;font-weight:600;line-height:1;pointer-events:none}.graph-svg-tip.comparison ul{margin:0;white-space:nowrap;list-style:none}.graph-svg-tip.comparison li{display:inline-block;padding:5px 10px}'
   );
   var Ft =
         "function" == typeof Symbol && "symbol" == typeof Symbol.iterator
            ? function (t) {
                 return typeof t;
              }
            : function (t) {
                 return t && "function" == typeof Symbol && t.constructor === Symbol && t !== Symbol.prototype
                    ? "symbol"
                    : typeof t;
              },
      jt =
         ((function () {
            function t(t) {
               this.value = t;
            }
            function e(e) {
               function i(t, e) {
                  return new Promise(function (i, a) {
                     var o = { key: t, arg: e, resolve: i, reject: a, next: null };
                     r ? (r = r.next = o) : ((s = r = o), n(t, e));
                  });
               }
               function n(i, s) {
                  try {
                     var r = e[i](s),
                        o = r.value;
                     o instanceof t
                        ? Promise.resolve(o.value).then(
                             function (t) {
                                n("next", t);
                             },
                             function (t) {
                                n("throw", t);
                             }
                          )
                        : a(r.done ? "return" : "normal", r.value);
                  } catch (t) {
                     a("throw", t);
                  }
               }
               function a(t, e) {
                  switch (t) {
                     case "return":
                        s.resolve({ value: e, done: !0 });
                        break;
                     case "throw":
                        s.reject(e);
                        break;
                     default:
                        s.resolve({ value: e, done: !1 });
                  }
                  (s = s.next) ? n(s.key, s.arg) : (r = null);
               }
               var s, r;
               (this._invoke = i), "function" != typeof e.return && (this.return = void 0);
            }
            "function" == typeof Symbol &&
               Symbol.asyncIterator &&
               (e.prototype[Symbol.asyncIterator] = function () {
                  return this;
               }),
               (e.prototype.next = function (t) {
                  return this._invoke("next", t);
               }),
               (e.prototype.throw = function (t) {
                  return this._invoke("throw", t);
               }),
               (e.prototype.return = function (t) {
                  return this._invoke("return", t);
               });
         })(),
         function (t, e) {
            if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function");
         }),
      Rt = (function () {
         function t(t, e) {
            for (var i = 0; i < e.length; i++) {
               var n = e[i];
               (n.enumerable = n.enumerable || !1),
                  (n.configurable = !0),
                  "value" in n && (n.writable = !0),
                  Object.defineProperty(t, n.key, n);
            }
         }
         return function (e, i, n) {
            return i && t(e.prototype, i), n && t(e, n), e;
         };
      })(),
      Yt = function t(e, i, n) {
         null === e && (e = Function.prototype);
         var a = Object.getOwnPropertyDescriptor(e, i);
         if (void 0 === a) {
            var s = Object.getPrototypeOf(e);
            return null === s ? void 0 : t(s, i, n);
         }
         if ("value" in a) return a.value;
         var r = a.get;
         if (void 0 !== r) return r.call(n);
      },
      Bt = function (t, e) {
         if ("function" != typeof e && null !== e)
            throw new TypeError("Super expression must either be null or a function, not " + typeof e);
         (t.prototype = Object.create(e && e.prototype, {
            constructor: { value: t, enumerable: !1, writable: !0, configurable: !0 },
         })),
            e && (Object.setPrototypeOf ? Object.setPrototypeOf(t, e) : (t.__proto__ = e));
      },
      Vt = function (t, e) {
         if (!t) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
         return !e || ("object" != typeof e && "function" != typeof e) ? t : e;
      },
      Ut = (function () {
         function t(t, e) {
            var i = [],
               n = !0,
               a = !1,
               s = void 0;
            try {
               for (
                  var r, o = t[Symbol.iterator]();
                  !(n = (r = o.next()).done) && (i.push(r.value), !e || i.length !== e);
                  n = !0
               );
            } catch (t) {
               (a = !0), (s = t);
            } finally {
               try {
                  !n && o.return && o.return();
               } finally {
                  if (a) throw s;
               }
            }
            return i;
         }
         return function (e, i) {
            if (Array.isArray(e)) return e;
            if (Symbol.iterator in Object(e)) return t(e, i);
            throw new TypeError("Invalid attempt to destructure non-iterable instance");
         };
      })(),
      Gt = function (t) {
         if (Array.isArray(t)) {
            for (var e = 0, i = Array(t.length); e < t.length; e++) i[e] = t[e];
            return i;
         }
         return Array.from(t);
      };
   t.create = function (e, i) {
      var n = document.createElement(e);
      for (var a in i) {
         var s = i[a];
         if ("inside" === a) t(s).appendChild(n);
         else if ("around" === a) {
            var r = t(s);
            r.parentNode.insertBefore(n, r), n.appendChild(r);
         } else
            "styles" === a
               ? "object" === (void 0 === s ? "undefined" : Ft(s)) &&
                 Object.keys(s).map(function (t) {
                    n.style[t] = s[t];
                 })
               : a in n
               ? (n[a] = s)
               : n.setAttribute(a, s);
      }
      return n;
   };
   var qt = {
         margins: { top: 10, bottom: 10, left: 20, right: 20 },
         paddings: { top: 20, bottom: 40, left: 30, right: 10 },
         baseHeight: 240,
         titleHeight: 20,
         legendHeight: 30,
         titleFontSize: 12,
      },
      Xt = 700,
      Jt = ["line", "bar"],
      Kt = 2,
      $t = 7,
      Qt = [
         "light-blue",
         "blue",
         "violet",
         "red",
         "orange",
         "yellow",
         "green",
         "light-green",
         "purple",
         "magenta",
         "light-grey",
         "dark-grey",
      ],
      Zt = {
         bar: Qt,
         line: Qt,
         pie: Qt,
         percentage: Qt,
         heatmap: ["#ebedf0", "#c6e48b", "#7bc96f", "#239a3b", "#196127"],
         donut: Qt,
      },
      te = Math.PI / 180,
      ee = (function () {
         function e(t) {
            var i = t.parent,
               n = void 0 === i ? null : i,
               a = t.colors,
               s = void 0 === a ? [] : a;
            jt(this, e),
               (this.parent = n),
               (this.colors = s),
               (this.titleName = ""),
               (this.titleValue = ""),
               (this.listValues = []),
               (this.titleValueFirst = 0),
               (this.x = 0),
               (this.y = 0),
               (this.top = 0),
               (this.left = 0),
               this.setup();
         }
         return (
            Rt(e, [
               {
                  key: "setup",
                  value: function () {
                     this.makeTooltip();
                  },
               },
               {
                  key: "refresh",
                  value: function () {
                     this.fill(), this.calcPosition();
                  },
               },
               {
                  key: "makeTooltip",
                  value: function () {
                     var e = this;
                     (this.container = t.create("div", {
                        inside: this.parent,
                        className: "graph-svg-tip comparison",
                        innerHTML:
                           '<span class="title"></span>\n\t\t\t\t<ul class="data-point-list"></ul>\n\t\t\t\t<div class="svg-pointer"></div>',
                     })),
                        this.hideTip(),
                        (this.title = this.container.querySelector(".title")),
                        (this.dataPointList = this.container.querySelector(".data-point-list")),
                        this.parent.addEventListener("mouseleave", function () {
                           e.hideTip();
                        });
                  },
               },
               {
                  key: "fill",
                  value: function () {
                     var e = this,
                        i = void 0;
                     this.index && this.container.setAttribute("data-point-index", this.index),
                        (i = this.titleValueFirst
                           ? "<strong>" + this.titleValue + "</strong>" + this.titleName
                           : this.titleName + "<strong>" + this.titleValue + "</strong>"),
                        (this.title.innerHTML = i),
                        (this.dataPointList.innerHTML = ""),
                        this.listValues.map(function (i, n) {
                           var a = e.colors[n] || "black",
                              s = 0 === i.formatted || i.formatted ? i.formatted : i.value,
                              r = t.create("li", {
                                 styles: { "border-top": "3px solid " + a },
                                 innerHTML:
                                    '<strong style="display: block;">' +
                                    (0 === s || s ? s : "") +
                                    "</strong>\n\t\t\t\t\t" +
                                    (i.title ? i.title : ""),
                              });
                           e.dataPointList.appendChild(r);
                        });
                  },
               },
               {
                  key: "calcPosition",
                  value: function () {
                     var t = this.container.offsetWidth;
                     (this.top = this.y - this.container.offsetHeight - 5), (this.left = this.x - t / 2);
                     var e = this.parent.offsetWidth - t,
                        i = this.container.querySelector(".svg-pointer");
                     if (this.left < 0) (i.style.left = "calc(50% - " + -1 * this.left + "px)"), (this.left = 0);
                     else if (this.left > e) {
                        var n = "calc(50% + " + (this.left - e) + "px)";
                        (i.style.left = n), (this.left = e);
                     } else i.style.left = "50%";
                  },
               },
               {
                  key: "setValues",
                  value: function (t, e) {
                     var i = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : {},
                        n = arguments.length > 3 && void 0 !== arguments[3] ? arguments[3] : [],
                        a = arguments.length > 4 && void 0 !== arguments[4] ? arguments[4] : -1;
                     (this.titleName = i.name),
                        (this.titleValue = i.value),
                        (this.listValues = n),
                        (this.x = t),
                        (this.y = e),
                        (this.titleValueFirst = i.valueFirst || 0),
                        (this.index = a),
                        this.refresh();
                  },
               },
               {
                  key: "hideTip",
                  value: function () {
                     (this.container.style.top = "0px"),
                        (this.container.style.left = "0px"),
                        (this.container.style.opacity = "0");
                  },
               },
               {
                  key: "showTip",
                  value: function () {
                     (this.container.style.top = this.top + "px"),
                        (this.container.style.left = this.left + "px"),
                        (this.container.style.opacity = "1");
                  },
               },
            ]),
            e
         );
      })(),
      ie = {
         "light-blue": "#7cd6fd",
         blue: "#5e64ff",
         violet: "#743ee2",
         red: "#ff5858",
         orange: "#ffa00a",
         yellow: "#feef72",
         green: "#28a745",
         "light-green": "#98d85b",
         purple: "#b554ff",
         magenta: "#ffa3ef",
         black: "#36114C",
         grey: "#bdd3e6",
         "light-grey": "#f0f4f7",
         "dark-grey": "#b8c2cc",
      },
      ne = function (t) {
         return /rgb[a]{0,1}\([\d, ]+\)/gim.test(t)
            ? /\D+(\d*)\D+(\d*)\D+(\d*)/gim
                 .exec(t)
                 .map(function (t, e) {
                    return 0 !== e ? Number(t).toString(16) : "#";
                 })
                 .reduce(function (t, e) {
                    return "" + t + e;
                 })
            : ie[t] || t;
      },
      ae = 6,
      se = 4,
      re = 25,
      oe = 15,
      le = 120,
      he = 10,
      ue = "#dadada",
      ce = "#555b51",
      de = {
         bar: function (t) {
            var e = void 0;
            "rect" !== t.nodeName && ((e = t.getAttribute("transform")), (t = t.childNodes[0]));
            var i = t.cloneNode();
            return (i.style.fill = "#000000"), (i.style.opacity = "0.4"), e && i.setAttribute("transform", e), i;
         },
         dot: function (t) {
            var e = void 0;
            "circle" !== t.nodeName && ((e = t.getAttribute("transform")), (t = t.childNodes[0]));
            var i = t.cloneNode(),
               n = t.getAttribute("r"),
               a = t.getAttribute("fill");
            return (
               i.setAttribute("r", parseInt(n) + 4),
               i.setAttribute("fill", a),
               (i.style.opacity = "0.6"),
               e && i.setAttribute("transform", e),
               i
            );
         },
         heat_square: function (t) {
            var e = void 0;
            "circle" !== t.nodeName && ((e = t.getAttribute("transform")), (t = t.childNodes[0]));
            var i = t.cloneNode(),
               n = t.getAttribute("r"),
               a = t.getAttribute("fill");
            return (
               i.setAttribute("r", parseInt(n) + 4),
               i.setAttribute("fill", a),
               (i.style.opacity = "0.6"),
               e && i.setAttribute("transform", e),
               i
            );
         },
      },
      pe = {
         bar: function (t, e) {
            var i = void 0;
            "rect" !== t.nodeName && ((i = t.getAttribute("transform")), (t = t.childNodes[0]));
            var n = ["x", "y", "width", "height"];
            Object.values(t.attributes)
               .filter(function (t) {
                  return n.includes(t.name) && t.specified;
               })
               .map(function (t) {
                  e.setAttribute(t.name, t.nodeValue);
               }),
               i && e.setAttribute("transform", i);
         },
         dot: function (t, e) {
            var i = void 0;
            "circle" !== t.nodeName && ((i = t.getAttribute("transform")), (t = t.childNodes[0]));
            var n = ["cx", "cy"];
            Object.values(t.attributes)
               .filter(function (t) {
                  return n.includes(t.name) && t.specified;
               })
               .map(function (t) {
                  e.setAttribute(t.name, t.nodeValue);
               }),
               i && e.setAttribute("transform", i);
         },
         heat_square: function (t, e) {
            var i = void 0;
            "circle" !== t.nodeName && ((i = t.getAttribute("transform")), (t = t.childNodes[0]));
            var n = ["cx", "cy"];
            Object.values(t.attributes)
               .filter(function (t) {
                  return n.includes(t.name) && t.specified;
               })
               .map(function (t) {
                  e.setAttribute(t.name, t.nodeValue);
               }),
               i && e.setAttribute("transform", i);
         },
      },
      fe = 350,
      ve = 350,
      ge = fe,
      ye = 250,
      me = "easein",
      be = {
         ease: "0.25 0.1 0.25 1",
         linear: "0 0 1 1",
         easein: "0.1 0.8 0.2 1",
         easeout: "0 0 0.58 1",
         easeinout: "0.42 0 0.58 1",
      },
      xe =
         ".chart-container{position:relative;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI','Roboto','Oxygen','Ubuntu','Cantarell','Fira Sans','Droid Sans','Helvetica Neue',sans-serif}.chart-container .axis,.chart-container .chart-label{fill:#555b51}.chart-container .axis line,.chart-container .chart-label line{stroke:#dadada}.chart-container .dataset-units circle{stroke:#fff;stroke-width:2}.chart-container .dataset-units path{fill:none;stroke-opacity:1;stroke-width:2px}.chart-container .dataset-path{stroke-width:2px}.chart-container .path-group path{fill:none;stroke-opacity:1;stroke-width:2px}.chart-container line.dashed{stroke-dasharray:5,3}.chart-container .axis-line .specific-value{text-anchor:start}.chart-container .axis-line .y-line{text-anchor:end}.chart-container .axis-line .x-line{text-anchor:middle}.chart-container .legend-dataset-text{fill:#6c7680;font-weight:600}.graph-svg-tip{position:absolute;z-index:99999;padding:10px;font-size:12px;color:#959da5;text-align:center;background:rgba(0,0,0,.8);border-radius:3px}.graph-svg-tip ul{padding-left:0;display:flex}.graph-svg-tip ol{padding-left:0;display:flex}.graph-svg-tip ul.data-point-list li{min-width:90px;flex:1;font-weight:600}.graph-svg-tip strong{color:#dfe2e5;font-weight:600}.graph-svg-tip .svg-pointer{position:absolute;height:5px;margin:0 0 0 -5px;content:' ';border:5px solid transparent;border-top-color:rgba(0,0,0,.8)}.graph-svg-tip.comparison{padding:0;text-align:left;pointer-events:none}.graph-svg-tip.comparison .title{display:block;padding:10px;margin:0;font-weight:600;line-height:1;pointer-events:none}.graph-svg-tip.comparison ul{margin:0;white-space:nowrap;list-style:none}.graph-svg-tip.comparison li{display:inline-block;padding:5px 10px}",
      ke = (function () {
         function e(t, i) {
            if (
               (jt(this, e),
               (i = g(i)),
               (this.parent = "string" == typeof t ? document.querySelector(t) : t),
               !(this.parent instanceof HTMLElement))
            )
               throw new Error("No `parent` element to render on was provided.");
            (this.rawChartArgs = i),
               (this.title = i.title || ""),
               (this.type = i.type || ""),
               (this.realData = this.prepareData(i.data)),
               (this.data = this.prepareFirstData(this.realData)),
               (this.colors = this.validateColors(i.colors, this.type)),
               (this.config = {
                  showTooltip: 1,
                  showLegend: 1,
                  isNavigable: i.isNavigable || 0,
                  animate: void 0 !== i.animate ? i.animate : 1,
                  truncateLegends: i.truncateLegends || 1,
               }),
               (this.measures = JSON.parse(JSON.stringify(qt)));
            var n = this.measures;
            this.setMeasures(i),
               this.title.length || (n.titleHeight = 0),
               this.config.showLegend || (n.legendHeight = 0),
               (this.argHeight = i.height || n.baseHeight),
               (this.state = {}),
               (this.options = {}),
               (this.initTimeout = Xt),
               this.config.isNavigable && (this.overlays = []),
               this.configure(i);
         }
         return (
            Rt(e, [
               {
                  key: "prepareData",
                  value: function (t) {
                     return t;
                  },
               },
               {
                  key: "prepareFirstData",
                  value: function (t) {
                     return t;
                  },
               },
               {
                  key: "validateColors",
                  value: function (t, e) {
                     var i = [];
                     return (
                        (t = (t || []).concat(Zt[e])).forEach(function (t) {
                           var e = ne(t);
                           P(e) ? i.push(e) : console.warn('"' + t + '" is not a valid color.');
                        }),
                        i
                     );
                  },
               },
               { key: "setMeasures", value: function () {} },
               {
                  key: "configure",
                  value: function () {
                     var t = this,
                        e = this.argHeight;
                     (this.baseHeight = e),
                        (this.height = e - l(this.measures)),
                        (this.boundDrawFn = function () {
                           return t.draw(!0);
                        }),
                        ResizeObserver &&
                           ((this.resizeObserver = new ResizeObserver(this.boundDrawFn)),
                           this.resizeObserver.observe(this.parent)),
                        window.addEventListener("resize", this.boundDrawFn),
                        window.addEventListener("orientationchange", this.boundDrawFn);
                  },
               },
               {
                  key: "destroy",
                  value: function () {
                     this.resizeObserver && this.resizeObserver.disconnect(),
                        window.removeEventListener("resize", this.boundDrawFn),
                        window.removeEventListener("orientationchange", this.boundDrawFn);
                  },
               },
               {
                  key: "setup",
                  value: function () {
                     this.makeContainer(), this.updateWidth(), this.makeTooltip(), this.draw(!1, !0);
                  },
               },
               {
                  key: "makeContainer",
                  value: function () {
                     this.parent.innerHTML = "";
                     var e = { inside: this.parent, className: "chart-container" };
                     this.independentWidth && (e.styles = { width: this.independentWidth + "px" }),
                        (this.container = t.create("div", e));
                  },
               },
               {
                  key: "makeTooltip",
                  value: function () {
                     (this.tip = new ee({ parent: this.container, colors: this.colors })), this.bindTooltip();
                  },
               },
               { key: "bindTooltip", value: function () {} },
               {
                  key: "draw",
                  value: function () {
                     var t = this,
                        e = arguments.length > 0 && void 0 !== arguments[0] && arguments[0],
                        n = arguments.length > 1 && void 0 !== arguments[1] && arguments[1];
                     (e && i(this.parent)) ||
                        (this.updateWidth(),
                        this.calc(e),
                        this.makeChartArea(),
                        this.setupComponents(),
                        this.components.forEach(function (e) {
                           return e.setup(t.drawArea);
                        }),
                        this.render(this.components, !1),
                        n &&
                           ((this.data = this.realData),
                           setTimeout(function () {
                              t.update(t.data);
                           }, this.initTimeout)),
                        this.renderLegend(),
                        this.setupNavigation(n));
                  },
               },
               { key: "calc", value: function () {} },
               {
                  key: "updateWidth",
                  value: function () {
                     (this.baseWidth = a(this.parent)), (this.width = this.baseWidth - h(this.measures));
                  },
               },
               {
                  key: "makeChartArea",
                  value: function () {
                     this.svg && this.container.removeChild(this.svg);
                     var t = this.measures;
                     (this.svg = L(this.container, "frappe-chart chart", this.baseWidth, this.baseHeight)),
                        (this.svgDefs = O(this.svg)),
                        this.title.length &&
                           (this.titleEL = Y("title", t.margins.left, t.margins.top, this.title, {
                              fontSize: t.titleFontSize,
                              fill: "#666666",
                              dy: t.titleFontSize,
                           }));
                     var e = r(t);
                     (this.drawArea = N(this.type + "-chart chart-draw-area", "translate(" + o(t) + ", " + e + ")")),
                        this.config.showLegend &&
                           ((e += this.height + t.paddings.bottom),
                           (this.legendArea = N("chart-legend", "translate(" + o(t) + ", " + e + ")"))),
                        this.title.length && this.svg.appendChild(this.titleEL),
                        this.svg.appendChild(this.drawArea),
                        this.config.showLegend && this.svg.appendChild(this.legendArea),
                        this.updateTipOffset(o(t), r(t));
                  },
               },
               {
                  key: "updateTipOffset",
                  value: function (t, e) {
                     this.tip.offset = { x: t, y: e };
                  },
               },
               {
                  key: "setupComponents",
                  value: function () {
                     this.components = new Map();
                  },
               },
               {
                  key: "update",
                  value: function (t) {
                     t || console.error("No data to update."),
                        (this.data = this.prepareData(t)),
                        this.calc(),
                        this.render(this.components, this.config.animate),
                        this.renderLegend();
                  },
               },
               {
                  key: "render",
                  value: function () {
                     var t = this,
                        e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : this.components,
                        i = !(arguments.length > 1 && void 0 !== arguments[1]) || arguments[1];
                     this.config.isNavigable &&
                        this.overlays.map(function (t) {
                           return t.parentNode.removeChild(t);
                        });
                     var n = [];
                     e.forEach(function (t) {
                        n = n.concat(t.update(i));
                     }),
                        n.length > 0
                           ? (ut(this.container, this.svg, n),
                             setTimeout(function () {
                                e.forEach(function (t) {
                                   return t.make();
                                }),
                                   t.updateNav();
                             }, 400))
                           : (e.forEach(function (t) {
                                return t.make();
                             }),
                             this.updateNav());
                  },
               },
               {
                  key: "updateNav",
                  value: function () {
                     this.config.isNavigable && (this.makeOverlay(), this.bindUnits());
                  },
               },
               { key: "renderLegend", value: function () {} },
               {
                  key: "setupNavigation",
                  value: function () {
                     var t = this,
                        e = arguments.length > 0 && void 0 !== arguments[0] && arguments[0];
                     this.config.isNavigable &&
                        e &&
                        (this.bindOverlay(),
                        (this.keyActions = {
                           13: this.onEnterKey.bind(this),
                           37: this.onLeftArrow.bind(this),
                           38: this.onUpArrow.bind(this),
                           39: this.onRightArrow.bind(this),
                           40: this.onDownArrow.bind(this),
                        }),
                        document.addEventListener("keydown", function (e) {
                           n(t.container) &&
                              ((e = e || window.event), t.keyActions[e.keyCode] && t.keyActions[e.keyCode]());
                        }));
                  },
               },
               { key: "makeOverlay", value: function () {} },
               { key: "updateOverlay", value: function () {} },
               { key: "bindOverlay", value: function () {} },
               { key: "bindUnits", value: function () {} },
               { key: "onLeftArrow", value: function () {} },
               { key: "onRightArrow", value: function () {} },
               { key: "onUpArrow", value: function () {} },
               { key: "onDownArrow", value: function () {} },
               { key: "onEnterKey", value: function () {} },
               { key: "addDataPoint", value: function () {} },
               { key: "removeDataPoint", value: function () {} },
               { key: "getDataPoint", value: function () {} },
               { key: "setCurrentDataPoint", value: function () {} },
               { key: "updateDataset", value: function () {} },
               {
                  key: "export",
                  value: function () {
                     var t = dt(this.svg);
                     ct(this.title || "Chart", [t]);
                  },
               },
            ]),
            e
         );
      })(),
      we = (function (t) {
         function e(t, i) {
            return jt(this, e), Vt(this, (e.__proto__ || Object.getPrototypeOf(e)).call(this, t, i));
         }
         return (
            Bt(e, t),
            Rt(e, [
               {
                  key: "configure",
                  value: function (t) {
                     Yt(e.prototype.__proto__ || Object.getPrototypeOf(e.prototype), "configure", this).call(this, t),
                        (this.config.formatTooltipY = (t.tooltipOptions || {}).formatTooltipY),
                        (this.config.maxSlices = t.maxSlices || 20),
                        (this.config.maxLegendPoints = t.maxLegendPoints || 20);
                  },
               },
               {
                  key: "calc",
                  value: function () {
                     var t = this,
                        e = this.state,
                        i = this.config.maxSlices;
                     e.sliceTotals = [];
                     var n = this.data.labels
                           .map(function (e, i) {
                              var n = 0;
                              return (
                                 t.data.datasets.map(function (t) {
                                    n += t.values[i];
                                 }),
                                 [n, e]
                              );
                           })
                           .filter(function (t) {
                              return t[0] >= 0;
                           }),
                        a = n;
                     if (n.length > i) {
                        n.sort(function (t, e) {
                           return e[0] - t[0];
                        }),
                           (a = n.slice(0, i - 1));
                        var s = 0;
                        n.slice(i - 1).map(function (t) {
                           s += t[0];
                        }),
                           a.push([s, "Rest"]),
                           (this.colors[i - 1] = "grey");
                     }
                     (e.labels = []),
                        a.map(function (t) {
                           e.sliceTotals.push(v(t[0])), e.labels.push(t[1]);
                        }),
                        (e.grandTotal = e.sliceTotals.reduce(function (t, e) {
                           return t + e;
                        }, 0)),
                        (this.center = { x: this.width / 2, y: this.height / 2 });
                  },
               },
               {
                  key: "renderLegend",
                  value: function () {
                     var t = this,
                        e = this.state;
                     (this.legendArea.textContent = ""),
                        (this.legendTotals = e.sliceTotals.slice(0, this.config.maxLegendPoints));
                     var i = 0,
                        n = 0;
                     this.legendTotals.map(function (a, s) {
                        var r = 150,
                           o = Math.floor((t.width - h(t.measures)) / r);
                        t.legendTotals.length < o && (r = t.width / t.legendTotals.length),
                           i > o && ((i = 0), (n += 20));
                        var l = r * i + 5,
                           u = t.config.truncateLegends ? b(e.labels[s], r / 10) : e.labels[s],
                           c = t.config.formatTooltipY ? t.config.formatTooltipY(a) : a,
                           d = R(l, n, 5, t.colors[s], u + ": " + c, !1);
                        t.legendArea.appendChild(d), i++;
                     });
                  },
               },
            ]),
            e
         );
      })(ke),
      Ae = 7,
      Pe = 1e3,
      Me = 86400,
      Ce = [
         "January",
         "February",
         "March",
         "April",
         "May",
         "June",
         "July",
         "August",
         "September",
         "October",
         "November",
         "December",
      ],
      De = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
      Te = (function () {
         function t(e) {
            var i = e.layerClass,
               n = void 0 === i ? "" : i,
               a = e.layerTransform,
               s = void 0 === a ? "" : a,
               r = e.constants,
               o = e.getData,
               l = e.makeElements,
               h = e.animateElements;
            jt(this, t),
               (this.layerTransform = s),
               (this.constants = r),
               (this.makeElements = l),
               (this.getData = o),
               (this.animateElements = h),
               (this.store = []),
               (this.labels = []),
               (this.layerClass = n),
               (this.layerClass = "function" == typeof this.layerClass ? this.layerClass() : this.layerClass),
               this.refresh();
         }
         return (
            Rt(t, [
               {
                  key: "refresh",
                  value: function (t) {
                     this.data = t || this.getData();
                  },
               },
               {
                  key: "setup",
                  value: function (t) {
                     this.layer = N(this.layerClass, this.layerTransform, t);
                  },
               },
               {
                  key: "make",
                  value: function () {
                     this.render(this.data), (this.oldData = this.data);
                  },
               },
               {
                  key: "render",
                  value: function (t) {
                     var e = this;
                     (this.store = this.makeElements(t)),
                        (this.layer.textContent = ""),
                        this.store.forEach(function (t) {
                           t.length
                              ? t.forEach(function (t) {
                                   e.layer.appendChild(t);
                                })
                              : e.layer.appendChild(t);
                        }),
                        this.labels.forEach(function (t) {
                           e.layer.appendChild(t);
                        });
                  },
               },
               {
                  key: "update",
                  value: function () {
                     var t = !(arguments.length > 0 && void 0 !== arguments[0]) || arguments[0];
                     this.refresh();
                     var e = [];
                     return t && (e = this.animateElements(this.data) || []), e;
                  },
               },
            ]),
            t
         );
      })(),
      Le = {
         donutSlices: {
            layerClass: "donut-slices",
            makeElements: function (t) {
               return t.sliceStrings.map(function (e, i) {
                  var n = S(e, "donut-path", t.colors[i], "none", t.strokeWidth);
                  return (n.style.transition = "transform .3s;"), n;
               });
            },
            animateElements: function (t) {
               return this.store.map(function (e, i) {
                  return rt(e, t.sliceStrings[i]);
               });
            },
         },
         pieSlices: {
            layerClass: "pie-slices",
            makeElements: function (t) {
               return t.sliceStrings.map(function (e, i) {
                  var n = S(e, "pie-path", "none", t.colors[i]);
                  return (n.style.transition = "transform .3s;"), n;
               });
            },
            animateElements: function (t) {
               return this.store.map(function (e, i) {
                  return rt(e, t.sliceStrings[i]);
               });
            },
         },
         percentageBars: {
            layerClass: "percentage-bars",
            makeElements: function (t) {
               var e = this;
               return t.xPositions.map(function (i, n) {
                  return W(i, 0, t.widths[n], e.constants.barHeight, e.constants.barDepth, t.colors[n]);
               });
            },
            animateElements: function (t) {
               if (t) return [];
            },
         },
         yAxis: {
            layerClass: "y axis",
            makeElements: function (t) {
               var e = this,
                  i = [];
               return t.length
                  ? (t.forEach(function (n, a) {
                       n.positions.map(function (t, a) {
                          i.push(
                             G(t, n.labels[a], e.constants.width, {
                                mode: e.constants.mode,
                                pos: n.pos || e.constants.pos,
                                shortenNumbers: e.constants.shortenNumbers,
                                title: n.title,
                             })
                          );
                       }),
                          n.title &&
                             i.push(
                                U({
                                   title: n.title,
                                   position: n.pos,
                                   height: e.constants.height || t.zeroLine,
                                   width: e.constants.width,
                                })
                             );
                    }),
                    i)
                  : (t.positions.forEach(function (n, a) {
                       i.push(
                          G(n, t.labels[a], e.constants.width, {
                             mode: e.constants.mode,
                             pos: t.pos || e.constants.pos,
                             shortenNumbers: e.constants.shortenNumbers,
                          })
                       );
                    }),
                    t.title &&
                       i.push(
                          U({
                             title: t.title,
                             position: t.pos,
                             height: this.constants.height || t.zeroLine,
                             width: this.constants.width,
                          })
                       ),
                    i);
            },
            animateElements: function (t) {
               var e = this,
                  i = function (t, i) {
                     var n = i.positions,
                        a = i.labels,
                        s = t.positions,
                        r = t.labels,
                        o = m(s, n),
                        l = Ut(o, 2);
                     (s = l[0]), (n = l[1]);
                     var h = m(r, a),
                        u = Ut(h, 2);
                     return (
                        (r = u[0]),
                        (a = u[1]),
                        e.render({ positions: s, labels: a }),
                        e.store.map(function (t, e) {
                           return et(t, n[e], s[e]);
                        })
                     );
                  };
               if (this.oldData instanceof Array)
                  return this.oldData.forEach(function (e, n) {
                     i(e, t[n]);
                  });
               var n = t.positions,
                  a = t.labels,
                  s = this.oldData.positions,
                  r = this.oldData.labels,
                  o = m(s, n),
                  l = Ut(o, 2);
               (s = l[0]), (n = l[1]);
               var h = m(r, a),
                  u = Ut(h, 2);
               return (
                  (r = u[0]),
                  (a = u[1]),
                  this.render({ positions: s, labels: a }),
                  this.store.map(function (t, e) {
                     return et(t, n[e], s[e]);
                  })
               );
            },
         },
         xAxis: {
            layerClass: "x axis",
            makeElements: function (t) {
               var e = this;
               return t.positions.map(function (i, n) {
                  return q(i, t.calcLabels[n], e.constants.height, { mode: e.constants.mode, pos: e.constants.pos });
               });
            },
            animateElements: function (t) {
               var e = t.positions,
                  i = t.calcLabels,
                  n = this.oldData.positions,
                  a = this.oldData.calcLabels,
                  s = m(n, e),
                  r = Ut(s, 2);
               (n = r[0]), (e = r[1]);
               var o = m(a, i),
                  l = Ut(o, 2);
               return (
                  (a = l[0]),
                  (i = l[1]),
                  this.render({ positions: n, calcLabels: i }),
                  this.store.map(function (t, i) {
                     return tt(t, e[i], n[i]);
                  })
               );
            },
         },
         yMarkers: {
            layerClass: "y-markers",
            makeElements: function (t) {
               var e = this;
               return t.map(function (t) {
                  return X(t.position, t.label, e.constants.width, {
                     labelPos: t.options.labelPos,
                     mode: "span",
                     lineType: "dashed",
                  });
               });
            },
            animateElements: function (t) {
               var e = m(this.oldData, t),
                  i = Ut(e, 2);
               this.oldData = i[0];
               var n = (t = i[1]).map(function (t) {
                     return t.position;
                  }),
                  a = t.map(function (t) {
                     return t.label;
                  }),
                  s = t.map(function (t) {
                     return t.options;
                  }),
                  r = this.oldData.map(function (t) {
                     return t.position;
                  });
               return (
                  this.render(
                     r.map(function (t, e) {
                        return { position: r[e], label: a[e], options: s[e] };
                     })
                  ),
                  this.store.map(function (t, e) {
                     return et(t, n[e], r[e]);
                  })
               );
            },
         },
         yRegions: {
            layerClass: "y-regions",
            makeElements: function (t) {
               var e = this;
               return t.map(function (t) {
                  return J(t.startPos, t.endPos, e.constants.width, t.label, { labelPos: t.options.labelPos });
               });
            },
            animateElements: function (t) {
               var e = m(this.oldData, t),
                  i = Ut(e, 2);
               this.oldData = i[0];
               var n = (t = i[1]).map(function (t) {
                     return t.endPos;
                  }),
                  a = t.map(function (t) {
                     return t.label;
                  }),
                  s = t.map(function (t) {
                     return t.startPos;
                  }),
                  r = t.map(function (t) {
                     return t.options;
                  }),
                  o = this.oldData.map(function (t) {
                     return t.endPos;
                  }),
                  l = this.oldData.map(function (t) {
                     return t.startPos;
                  });
               this.render(
                  o.map(function (t, e) {
                     return { startPos: l[e], endPos: o[e], label: a[e], options: r[e] };
                  })
               );
               var h = [];
               return (
                  this.store.map(function (t, e) {
                     h = h.concat(it(t, s[e], n[e], o[e]));
                  }),
                  h
               );
            },
         },
         heatDomain: {
            layerClass: function () {
               return "heat-domain domain-" + this.constants.index;
            },
            makeElements: function (t) {
               var e = this,
                  i = this.constants,
                  n = i.index,
                  a = i.colWidth,
                  s = i.rowHeight,
                  r = i.squareSize,
                  o = i.radius,
                  l = i.xTranslate,
                  h = 0;
               return (
                  (this.serializedSubDomains = []),
                  t.cols.map(function (t, i) {
                     1 === i && e.labels.push(Y("domain-name", l, -12, bt(n, !0).toUpperCase(), { fontSize: 9 })),
                        t.map(function (t, i) {
                           if (t.fill) {
                              var n = { "data-date": t.yyyyMmDd, "data-value": t.dataValue, "data-day": i },
                                 a = F("day", l, h, r, o, t.fill, n);
                              e.serializedSubDomains.push(a);
                           }
                           h += s;
                        }),
                        (h = 0),
                        (l += a);
                  }),
                  this.serializedSubDomains
               );
            },
            animateElements: function (t) {
               if (t) return [];
            },
         },
         barGraph: {
            layerClass: function () {
               return "dataset-units dataset-bars dataset-" + this.constants.index;
            },
            makeElements: function (t) {
               var e = this.constants;
               return (
                  (this.unitType = "bar"),
                  (this.units = t.yPositions.map(function (i, n) {
                     return K(t.xPositions[n], i, t.barWidth, e.color, t.labels[n], n, t.offsets[n], {
                        zeroLine: t.zeroLine,
                        barsWidth: t.barsWidth,
                        minHeight: e.minHeight,
                     });
                  })),
                  this.units
               );
            },
            animateElements: function (t) {
               var e = t.xPositions,
                  i = t.yPositions,
                  n = t.offsets,
                  a = t.labels,
                  s = this.oldData.xPositions,
                  r = this.oldData.yPositions,
                  o = this.oldData.offsets,
                  l = this.oldData.labels,
                  h = m(s, e),
                  u = Ut(h, 2);
               (s = u[0]), (e = u[1]);
               var c = m(r, i),
                  d = Ut(c, 2);
               (r = d[0]), (i = d[1]);
               var p = m(o, n),
                  f = Ut(p, 2);
               (o = f[0]), (n = f[1]);
               var v = m(l, a),
                  g = Ut(v, 2);
               (l = g[0]),
                  (a = g[1]),
                  this.render({
                     xPositions: s,
                     yPositions: r,
                     offsets: o,
                     labels: a,
                     zeroLine: this.oldData.zeroLine,
                     barsWidth: this.oldData.barsWidth,
                     barWidth: this.oldData.barWidth,
                  });
               var y = [];
               return (
                  this.store.map(function (a, s) {
                     y = y.concat(nt(a, e[s], i[s], t.barWidth, n[s], { zeroLine: t.zeroLine }));
                  }),
                  y
               );
            },
         },
         lineGraph: {
            layerClass: function () {
               return "dataset-units dataset-line dataset-" + this.constants.index;
            },
            makeElements: function (t) {
               var e = this.constants;
               return (
                  (this.unitType = "dot"),
                  (this.paths = {}),
                  e.hideLine ||
                     (this.paths = Q(
                        t.xPositions,
                        t.yPositions,
                        e.color,
                        { heatline: e.heatline, regionFill: e.regionFill, spline: e.spline },
                        { svgDefs: e.svgDefs, zeroLine: t.zeroLine }
                     )),
                  (this.units = []),
                  e.hideDots ||
                     (this.units = t.yPositions.map(function (i, n) {
                        return $(t.xPositions[n], i, t.radius, e.color, e.valuesOverPoints ? t.values[n] : "", n);
                     })),
                  Object.values(this.paths).concat(this.units)
               );
            },
            animateElements: function (t) {
               var e = t.xPositions,
                  i = t.yPositions,
                  n = t.values,
                  a = this.oldData.xPositions,
                  s = this.oldData.yPositions,
                  r = this.oldData.values,
                  o = m(a, e),
                  l = Ut(o, 2);
               (a = l[0]), (e = l[1]);
               var h = m(s, i),
                  u = Ut(h, 2);
               (s = u[0]), (i = u[1]);
               var c = m(r, n),
                  d = Ut(c, 2);
               (r = d[0]),
                  (n = d[1]),
                  this.render({
                     xPositions: a,
                     yPositions: s,
                     values: n,
                     zeroLine: this.oldData.zeroLine,
                     radius: this.oldData.radius,
                  });
               var p = [];
               return (
                  Object.keys(this.paths).length &&
                     (p = p.concat(st(this.paths, e, i, t.zeroLine, this.constants.spline))),
                  this.units.length &&
                     this.units.map(function (t, n) {
                        p = p.concat(at(t, e[n], i[n]));
                     }),
                  p
               );
            },
         },
      },
      Oe = (function (t) {
         function i(t, e) {
            jt(this, i);
            var n = Vt(this, (i.__proto__ || Object.getPrototypeOf(i)).call(this, t, e));
            return (n.type = "percentage"), n.setup(), n;
         }
         return (
            Bt(i, t),
            Rt(i, [
               {
                  key: "setMeasures",
                  value: function (t) {
                     var e = this.measures;
                     this.barOptions = t.barOptions || {};
                     var i = this.barOptions;
                     (i.height = i.height || 20),
                        (i.depth = i.depth || Kt),
                        (e.paddings.right = 30),
                        (e.legendHeight = 60),
                        (e.baseHeight = 8 * (i.height + 0.5 * i.depth));
                  },
               },
               {
                  key: "setupComponents",
                  value: function () {
                     var t = this.state,
                        e = [
                           [
                              "percentageBars",
                              { barHeight: this.barOptions.height, barDepth: this.barOptions.depth },
                              function () {
                                 return { xPositions: t.xPositions, widths: t.widths, colors: this.colors };
                              }.bind(this),
                           ],
                        ];
                     this.components = new Map(
                        e.map(function (t) {
                           var e = At.apply(void 0, Gt(t));
                           return [t[0], e];
                        })
                     );
                  },
               },
               {
                  key: "calc",
                  value: function () {
                     var t = this;
                     Yt(i.prototype.__proto__ || Object.getPrototypeOf(i.prototype), "calc", this).call(this);
                     var e = this.state;
                     (e.xPositions = []), (e.widths = []);
                     var n = 0;
                     e.sliceTotals.map(function (i) {
                        var a = (t.width * i) / e.grandTotal;
                        e.widths.push(a), e.xPositions.push(n), (n += a);
                     });
                  },
               },
               { key: "makeDataByIndex", value: function () {} },
               {
                  key: "bindTooltip",
                  value: function () {
                     var t = this,
                        i = this.state;
                     this.container.addEventListener("mousemove", function (n) {
                        var a = t.components.get("percentageBars").store,
                           s = n.target;
                        if (a.includes(s)) {
                           var r = a.indexOf(s),
                              o = e(t.container),
                              l = e(s),
                              h = l.left - o.left + parseInt(s.getAttribute("width")) / 2,
                              u = l.top - o.top,
                              c =
                                 (t.formattedLabels && t.formattedLabels.length > 0
                                    ? t.formattedLabels[r]
                                    : t.state.labels[r]) + ": ",
                              d = i.sliceTotals[r] / i.grandTotal;
                           t.tip.setValues(h, u, { name: c, value: (100 * d).toFixed(1) + "%" }), t.tip.showTip();
                        }
                     });
                  },
               },
            ]),
            i
         );
      })(we),
      Ne = (function (t) {
         function i(t, e) {
            jt(this, i);
            var n = Vt(this, (i.__proto__ || Object.getPrototypeOf(i)).call(this, t, e));
            return (n.type = "pie"), (n.initTimeout = 0), (n.init = 1), n.setup(), n;
         }
         return (
            Bt(i, t),
            Rt(i, [
               {
                  key: "configure",
                  value: function (t) {
                     Yt(i.prototype.__proto__ || Object.getPrototypeOf(i.prototype), "configure", this).call(this, t),
                        (this.mouseMove = this.mouseMove.bind(this)),
                        (this.mouseLeave = this.mouseLeave.bind(this)),
                        (this.hoverRadio = t.hoverRadio || 0.1),
                        (this.config.startAngle = t.startAngle || 0),
                        (this.clockWise = t.clockWise || !1);
                  },
               },
               {
                  key: "calc",
                  value: function () {
                     var t = this;
                     Yt(i.prototype.__proto__ || Object.getPrototypeOf(i.prototype), "calc", this).call(this);
                     var e = this.state;
                     this.radius = this.height > this.width ? this.center.x : this.center.y;
                     var n = this.radius,
                        a = this.clockWise,
                        s = e.slicesProperties || [];
                     (e.sliceStrings = []), (e.slicesProperties = []);
                     var r = 180 - this.config.startAngle;
                     e.sliceTotals.map(function (i, o) {
                        var l = r,
                           h = (i / e.grandTotal) * 360,
                           u = h > 180 ? 1 : 0,
                           c = a ? -h : h,
                           d = (r += c),
                           f = p(l, n),
                           v = p(d, n),
                           g = t.init && s[o],
                           y = void 0,
                           m = void 0;
                        t.init ? ((y = g ? g.startPosition : f), (m = g ? g.endPosition : f)) : ((y = f), (m = v));
                        var b = 360 === h ? _(y, m, t.center, t.radius, a, u) : E(y, m, t.center, t.radius, a, u);
                        e.sliceStrings.push(b),
                           e.slicesProperties.push({
                              startPosition: f,
                              endPosition: v,
                              value: i,
                              total: e.grandTotal,
                              startAngle: l,
                              endAngle: d,
                              angle: c,
                           });
                     }),
                        (this.init = 0);
                  },
               },
               {
                  key: "setupComponents",
                  value: function () {
                     var t = this.state,
                        e = [
                           [
                              "pieSlices",
                              {},
                              function () {
                                 return { sliceStrings: t.sliceStrings, colors: this.colors };
                              }.bind(this),
                           ],
                        ];
                     this.components = new Map(
                        e.map(function (t) {
                           var e = At.apply(void 0, Gt(t));
                           return [t[0], e];
                        })
                     );
                  },
               },
               {
                  key: "calTranslateByAngle",
                  value: function (t) {
                     var e = this.radius,
                        i = this.hoverRadio,
                        n = p(t.startAngle + t.angle / 2, e);
                     return "translate3d(" + n.x * i + "px," + n.y * i + "px,0)";
                  },
               },
               {
                  key: "hoverSlice",
                  value: function (t, i, n, a) {
                     if (t) {
                        var s = this.colors[i];
                        if (n) {
                           lt(t, this.calTranslateByAngle(this.state.slicesProperties[i])), (t.style.fill = A(s, 50));
                           var r = e(this.svg),
                              o = a.pageX - r.left + 10,
                              l = a.pageY - r.top - 10,
                              h =
                                 (this.formatted_labels && this.formatted_labels.length > 0
                                    ? this.formatted_labels[i]
                                    : this.state.labels[i]) + ": ",
                              u = ((100 * this.state.sliceTotals[i]) / this.state.grandTotal).toFixed(1);
                           this.tip.setValues(o, l, { name: h, value: u + "%" }), this.tip.showTip();
                        } else lt(t, "translate3d(0,0,0)"), this.tip.hideTip(), (t.style.fill = s);
                     }
                  },
               },
               {
                  key: "bindTooltip",
                  value: function () {
                     this.container.addEventListener("mousemove", this.mouseMove),
                        this.container.addEventListener("mouseleave", this.mouseLeave);
                  },
               },
               {
                  key: "mouseMove",
                  value: function (t) {
                     var e = t.target,
                        i = this.components.get("pieSlices").store,
                        n = this.curActiveSliceIndex,
                        a = this.curActiveSlice;
                     if (i.includes(e)) {
                        var s = i.indexOf(e);
                        this.hoverSlice(a, n, !1),
                           (this.curActiveSlice = e),
                           (this.curActiveSliceIndex = s),
                           this.hoverSlice(e, s, !0, t);
                     } else this.mouseLeave();
                  },
               },
               {
                  key: "mouseLeave",
                  value: function () {
                     this.hoverSlice(this.curActiveSlice, this.curActiveSliceIndex, !1);
                  },
               },
            ]),
            i
         );
      })(we),
      Se = (function (t) {
         function e(t, i) {
            jt(this, e);
            var n = Vt(this, (e.__proto__ || Object.getPrototypeOf(e)).call(this, t, i));
            (n.type = "heatmap"), (n.countLabel = i.countLabel || "");
            var a = ["Sunday", "Monday"],
               s = a.includes(i.startSubDomain) ? i.startSubDomain : "Sunday";
            return (n.startSubDomainIndex = a.indexOf(s)), n.setup(), n;
         }
         return (
            Bt(e, t),
            Rt(e, [
               {
                  key: "setMeasures",
                  value: function (t) {
                     var e = this.measures;
                     (this.discreteDomains = 0 === t.discreteDomains ? 0 : 1),
                        (e.paddings.top = 36),
                        (e.paddings.bottom = 0),
                        (e.legendHeight = 24),
                        (e.baseHeight = 12 * Ae + l(e));
                     var i = this.data,
                        n = this.discreteDomains ? 12 : 0;
                     this.independentWidth = 12 * (gt(i.start, i.end) + n) + h(e);
                  },
               },
               {
                  key: "updateWidth",
                  value: function () {
                     var t = this.discreteDomains ? 12 : 0,
                        e = this.state.noOfWeeks ? this.state.noOfWeeks : 52;
                     this.baseWidth = 12 * (e + t) + h(this.measures);
                  },
               },
               {
                  key: "prepareData",
                  value: function () {
                     var t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : this.data;
                     if (t.start && t.end && t.start > t.end)
                        throw new Error("Start date cannot be greater than end date.");
                     if (
                        (t.start || ((t.start = new Date()), t.start.setFullYear(t.start.getFullYear() - 1)),
                        t.end || (t.end = new Date()),
                        (t.dataPoints = t.dataPoints || {}),
                        parseInt(Object.keys(t.dataPoints)[0]) > 1e5)
                     ) {
                        var e = {};
                        Object.keys(t.dataPoints).forEach(function (i) {
                           var n = new Date(i * Pe);
                           e[ft(n)] = t.dataPoints[i];
                        }),
                           (t.dataPoints = e);
                     }
                     return t;
                  },
               },
               {
                  key: "calc",
                  value: function () {
                     var t = this.state;
                     (t.start = vt(this.data.start)),
                        (t.end = vt(this.data.end)),
                        (t.firstWeekStart = vt(t.start)),
                        (t.noOfWeeks = gt(t.start, t.end)),
                        (t.distribution = Et(Object.values(this.data.dataPoints), 5)),
                        (t.domainConfigs = this.getDomains());
                  },
               },
               {
                  key: "setupComponents",
                  value: function () {
                     var t = this,
                        e = this.state,
                        i = this.discreteDomains ? 0 : 1,
                        n = e.domainConfigs.map(function (n, a) {
                           return [
                              "heatDomain",
                              {
                                 index: n.index,
                                 colWidth: 12,
                                 rowHeight: 12,
                                 squareSize: 10,
                                 radius: t.rawChartArgs.radius || 0,
                                 xTranslate:
                                    12 *
                                    e.domainConfigs
                                       .filter(function (t, e) {
                                          return e < a;
                                       })
                                       .map(function (t) {
                                          return t.cols.length - i;
                                       })
                                       .reduce(function (t, e) {
                                          return t + e;
                                       }, 0),
                              },
                              function () {
                                 return e.domainConfigs[a];
                              }.bind(t),
                           ];
                        });
                     this.components = new Map(
                        n.map(function (t, e) {
                           var i = At.apply(void 0, Gt(t));
                           return [t[0] + "-" + e, i];
                        })
                     );
                     var a = 0;
                     De.forEach(function (e, i) {
                        if ([1, 3, 5].includes(i)) {
                           var n = Y("subdomain-name", -6, a, e, { fontSize: 10, dy: 8, textAnchor: "end" });
                           t.drawArea.appendChild(n);
                        }
                        a += 12;
                     });
                  },
               },
               {
                  key: "update",
                  value: function (t) {
                     t || console.error("No data to update."),
                        (this.data = this.prepareData(t)),
                        this.draw(),
                        this.bindTooltip();
                  },
               },
               {
                  key: "bindTooltip",
                  value: function () {
                     var t = this;
                     this.container.addEventListener("mousemove", function (e) {
                        t.components.forEach(function (i) {
                           var n = i.store,
                              a = e.target;
                           if (n.includes(a)) {
                              var s = a.getAttribute("data-value"),
                                 r = a.getAttribute("data-date").split("-"),
                                 o = bt(parseInt(r[1]) - 1, !0),
                                 l = t.container.getBoundingClientRect(),
                                 h = a.getBoundingClientRect(),
                                 u = parseInt(e.target.getAttribute("width")),
                                 c = h.left - l.left + u / 2,
                                 d = h.top - l.top,
                                 p = s + " " + t.countLabel,
                                 f = " on " + o + " " + r[0] + ", " + r[2];
                              t.tip.setValues(c, d, { name: f, value: p, valueFirst: 1 }, []), t.tip.showTip();
                           }
                        });
                     });
                  },
               },
               {
                  key: "renderLegend",
                  value: function () {
                     var t = this;
                     this.legendArea.textContent = "";
                     var e = 0,
                        i = this.rawChartArgs.radius || 0,
                        n = Y("subdomain-name", e, 12, "Less", { fontSize: 11, dy: 9 });
                     (e = 30),
                        this.legendArea.appendChild(n),
                        this.colors.slice(0, 5).map(function (n, a) {
                           var s = F("heatmap-legend-unit", e + 15 * a, 12, 10, i, n);
                           t.legendArea.appendChild(s);
                        });
                     var a = Y("subdomain-name", e + 75 + 3, 12, "More", { fontSize: 11, dy: 9 });
                     this.legendArea.appendChild(a);
                  },
               },
               {
                  key: "getDomains",
                  value: function () {
                     for (
                        var t = this.state,
                           e = [t.start.getMonth(), t.start.getFullYear()],
                           i = e[0],
                           n = e[1],
                           a = [t.end.getMonth(), t.end.getFullYear()],
                           s = a[0] - i + 1 + 12 * (a[1] - n),
                           r = [],
                           o = vt(t.start),
                           l = 0;
                        l < s;
                        l++
                     ) {
                        var h = t.end;
                        if (!mt(o, t.end)) {
                           var u = [o.getMonth(), o.getFullYear()];
                           h = xt(u[0], u[1]);
                        }
                        r.push(this.getDomainConfig(o, h)), wt(h, 1), (o = h);
                     }
                     return r;
                  },
               },
               {
                  key: "getDomainConfig",
                  value: function (t) {
                     var e = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : "",
                        i = [t.getMonth(), t.getFullYear()],
                        n = i[0],
                        a = i[1],
                        s = kt(t),
                        r = { index: n, cols: [] };
                     wt((e = vt(e) || xt(n, a)), 1);
                     for (var o = gt(s, e), l = [], h = void 0, u = 0; u < o; u++)
                        (h = this.getCol(s, n)), l.push(h), wt((s = new Date(h[Ae - 1].yyyyMmDd)), 1);
                     return (
                        void 0 !== h[Ae - 1].dataValue && (wt(s, 1), l.push(this.getCol(s, n, !0))), (r.cols = l), r
                     );
                  },
               },
               {
                  key: "getCol",
                  value: function (t, e) {
                     for (
                        var i = arguments.length > 2 && void 0 !== arguments[2] && arguments[2],
                           n = this.state,
                           a = vt(t),
                           s = [],
                           r = 0;
                        r < Ae;
                        r++, wt(a, 1)
                     ) {
                        var o = {},
                           l = a >= n.start && a <= n.end;
                        i || a.getMonth() !== e || !l ? (o.yyyyMmDd = ft(a)) : (o = this.getSubDomainConfig(a)),
                           s.push(o);
                     }
                     return s;
                  },
               },
               {
                  key: "getSubDomainConfig",
                  value: function (t) {
                     var e = ft(t),
                        i = this.data.dataPoints[e];
                     return { yyyyMmDd: e, dataValue: i || 0, fill: this.colors[_t(i, this.state.distribution)] };
                  },
               },
            ]),
            e
         );
      })(ke),
      Ee = (function (t) {
         function i(t, e) {
            jt(this, i);
            var n = Vt(this, (i.__proto__ || Object.getPrototypeOf(i)).call(this, t, e));
            return (
               (n.barOptions = e.barOptions || {}),
               (n.lineOptions = e.lineOptions || {}),
               (n.type = e.type || "line"),
               (n.init = 1),
               n.setup(),
               n
            );
         }
         return (
            Bt(i, t),
            Rt(i, [
               {
                  key: "setMeasures",
                  value: function () {
                     this.data.datasets.length <= 1 &&
                        ((this.config.showLegend = 0), (this.measures.paddings.bottom = 30));
                  },
               },
               {
                  key: "configure",
                  value: function (t) {
                     Yt(i.prototype.__proto__ || Object.getPrototypeOf(i.prototype), "configure", this).call(this, t);
                     var e = t.axisOptions,
                        n = void 0 === e ? {} : e,
                        a = n || {},
                        s = a.xAxis,
                        r = a.yAxis;
                     (t.tooltipOptions = t.tooltipOptions || {}),
                        (this.config.xAxisMode = s ? s.xAxisMode : n.xAxisMode || "span"),
                        r && r.length
                           ? (this.config.yAxisConfig = r.map(function (t) {
                                return { yAxisMode: t.yAxisMode, id: t.id, position: t.position, title: t.title };
                             }))
                           : ((this.config.yAxisMode = r ? r.yAxisMode : n.yAxisMode || "span"),
                             r && r.id && r.position && (this.config.yAxisConfig = [r])),
                        (this.config.xIsSeries = n.xIsSeries || 0),
                        (this.config.shortenYAxisNumbers = n.shortenYAxisNumbers || 0),
                        (this.config.formatTooltipX = t.tooltipOptions.formatTooltipX),
                        (this.config.formatTooltipY = t.tooltipOptions.formatTooltipY),
                        (this.config.valuesOverPoints = t.valuesOverPoints);
                  },
               },
               {
                  key: "prepareData",
                  value: function () {
                     return zt(arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : this.data, this.type);
                  },
               },
               {
                  key: "prepareFirstData",
                  value: function () {
                     return It(arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : this.data);
                  },
               },
               {
                  key: "calc",
                  value: function () {
                     var t = arguments.length > 0 && void 0 !== arguments[0] && arguments[0];
                     this.calcXPositions(),
                        t || this.calcYAxisParameters(this.getAllYValues(), "line" === this.type),
                        this.makeDataByIndex();
                  },
               },
               {
                  key: "calcXPositions",
                  value: function () {
                     var t = this.state,
                        e = this.data.labels;
                     (t.datasetLength = e.length),
                        (t.unitWidth = this.width / t.datasetLength),
                        (t.xOffset = t.unitWidth / 2),
                        (t.xAxis = {
                           labels: e,
                           positions: e.map(function (e, i) {
                              return u(t.xOffset + i * t.unitWidth);
                           }),
                        });
                  },
               },
               {
                  key: "calcYAxisParameters",
                  value: function (t) {
                     var e = this,
                        i = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : "false",
                        n = void 0,
                        a = void 0,
                        s = void 0,
                        r = void 0,
                        o = void 0,
                        l = void 0,
                        h = void 0,
                        u = void 0;
                     if (
                        ((u = []),
                        (l = this.config.yAxisMode || {}),
                        (h = l.position ? l.position : "left"),
                        t instanceof Array)
                     )
                        (n = Dt(t, i)),
                           (a = this.height / Ot(n)),
                           (s = Lt(n) * a),
                           (r = this.height - Tt(n) * s),
                           (this.state.yAxis = {
                              labels: n,
                              positions: n.map(function (t) {
                                 return r - t * a;
                              }),
                              title: l.title || null,
                              pos: h,
                              scaleMultiplier: a,
                              zeroLine: r,
                           });
                     else {
                        this.state.yAxis = [];
                        for (var c in t)
                           !(function (c) {
                              var d = t[c];
                              if (
                                 ((l =
                                    e.config.yAxisConfig.find(function (t) {
                                       return c === t.id;
                                    }) || []),
                                 (h = l.position ? l.position : "left"),
                                 (n = Dt(d, i)),
                                 (a = e.height / Ot(n)),
                                 (s = Lt(n) * a),
                                 (r = e.height - Tt(n) * s),
                                 (o = n.map(function (t) {
                                    return r - t * a;
                                 })),
                                 u.push(c),
                                 e.state.yAxis.length > 1)
                              ) {
                                 var p = [],
                                    f = e.state.yAxis[0];
                                 (a = e.height / Ot(n)),
                                    f.positions.forEach(function (t) {
                                       p.push(Math.ceil(t / a));
                                    }),
                                    (n = p.reverse()),
                                    (r = e.height - Tt(n) * s),
                                    (o = f.positions);
                              }
                              e.state.yAxis.push({
                                 axisID: c || "left-axis",
                                 labels: n,
                                 title: l.title,
                                 pos: h,
                                 scaleMultiplier: a,
                                 zeroLine: r,
                                 positions: o,
                              });
                           })(c);
                        if (
                           this.state.yAxis[1] &&
                           this.state.yAxis[0].labels.length !== this.state.yAxis[1].labels.length
                        ) {
                           var d = [],
                              p = this.state.yAxis.reduce(
                                 function (t, e) {
                                    return t.length > e.labels.length ? e : t;
                                 },
                                 { length: 1 / 0 }
                              ),
                              f = this.state.yAxis.reduce(
                                 function (t, e) {
                                    return t.length < e.labels.length ? t : e;
                                 },
                                 { length: 1 / 0 }
                              );
                           f.positions.forEach(function (t) {
                              d.push(Math.ceil(t / p.scaleMultiplier));
                           }),
                              (p.labels = d.reverse()),
                              (p.positions = f.positions);
                        }
                     }
                     this.calcDatasetPoints(), this.calcYExtremes(), this.calcYRegions();
                  },
               },
               {
                  key: "calcDatasetPoints",
                  value: function () {
                     var t = this.state,
                        e = function (e, i) {
                           return e.map(function (e) {
                              var n = t.yAxis;
                              return (
                                 n instanceof Array &&
                                    (n =
                                       n.length > 1
                                          ? n.find(function (t) {
                                               return i === t.axisID;
                                            })
                                          : t.yAxis[0]),
                                 Nt(e, n)
                              );
                           });
                        };
                     (t.barChartIndex = 1),
                        (t.datasets = this.data.datasets.map(function (i, n) {
                           var a = i.values,
                              s = i.cumulativeYs || [];
                           return {
                              name:
                                 i.name &&
                                 i.name.replace(/<|>|&/g, function (t) {
                                    return "&" == t ? "&amp;" : "<" == t ? "&lt;" : "&gt;";
                                 }),
                              index: n,
                              barIndex: "bar" === i.chartType ? t.barChartIndex++ : t.barChartIndex,
                              chartType: i.chartType,
                              values: a,
                              yPositions: e(a, i.axisID),
                              id: i.axisID,
                              cumulativeYs: s,
                              cumulativeYPos: e(s, i.axisID),
                           };
                        }));
                  },
               },
               {
                  key: "calcYExtremes",
                  value: function () {
                     var t = this.state;
                     if (this.barOptions.stacked)
                        return void (t.yExtremes = t.datasets[t.datasets.length - 1].cumulativeYPos);
                     (t.yExtremes = new Array(t.datasetLength).fill(9999)),
                        t.datasets.map(function (e) {
                           e.yPositions.map(function (e, i) {
                              e < t.yExtremes[i] && (t.yExtremes[i] = e);
                           });
                        });
                  },
               },
               {
                  key: "calcYRegions",
                  value: function () {
                     var t = this.state;
                     this.data.yMarkers &&
                        (this.state.yMarkers = this.data.yMarkers.map(function (e) {
                           return (e.position = Nt(e.value, t.yAxis)), e.options || (e.options = {}), e;
                        })),
                        this.data.yRegions &&
                           (this.state.yRegions = this.data.yRegions.map(function (e) {
                              return (
                                 (e.startPos = Nt(e.start, t.yAxis)),
                                 (e.endPos = Nt(e.end, t.yAxis)),
                                 e.options || (e.options = {}),
                                 e
                              );
                           }));
                  },
               },
               {
                  key: "getAllYValues",
                  value: function () {
                     var t,
                        e = this,
                        i = "values",
                        n = !!this.config.yAxisConfig,
                        a = n ? {} : [],
                        s = function (t) {
                           var n = new Array(e.state.datasetLength).fill(0);
                           t.forEach(function (e, a) {
                              var s = t[a].values;
                              e[i] = n = n.map(function (t, e) {
                                 return t + s[e];
                              });
                           });
                        };
                     if (this.barOptions.stacked)
                        if (((i = "cumulativeYs"), n)) {
                           var r = (function (t, e) {
                              return t.reduce(function (t, i) {
                                 return (t[i[e]] = [].concat(Gt(t[i[e]] || []), [i])), t;
                              }, {});
                           })(this.data.datasets, "axisID");
                           for (var o in r) s(r[o]);
                        } else s(this.data.datasets);
                     return (
                        n
                           ? this.data.datasets.forEach(function (t) {
                                var e;
                                a[t.axisID || i]
                                   ? (e = a[t.axisID || i]).push.apply(e, Gt(t[i]))
                                   : (a[t.axisID || i] = [].concat(Gt(t[i])));
                             })
                           : (a = this.data.datasets.map(function (t) {
                                return t[i];
                             })),
                        this.data.yMarkers &&
                           !n &&
                           a.push(
                              this.data.yMarkers.map(function (t) {
                                 return t.value;
                              })
                           ),
                        this.data.yRegions &&
                           !n &&
                           this.data.yRegions.map(function (t) {
                              a.push([t.end, t.start]);
                           }),
                        n ? a : (t = []).concat.apply(t, Gt(a))
                     );
                  },
               },
               {
                  key: "setupComponents",
                  value: function () {
                     var t = this,
                        e = [
                           [
                              "xAxis",
                              { mode: this.config.xAxisMode, height: this.height },
                              function () {
                                 var t = this.state;
                                 return (
                                    (t.xAxis.calcLabels = Ht(this.width, t.xAxis.labels, this.config.xIsSeries)),
                                    t.xAxis
                                 );
                              }.bind(this),
                           ],
                           [
                              "yRegions",
                              { width: this.width, pos: "right" },
                              function () {
                                 return this.state.yRegions;
                              }.bind(this),
                           ],
                        ];
                     this.config.yAxisConfig && this.config.yAxisConfig.length
                        ? this.config.yAxisConfig.forEach(function (i) {
                             e.push([
                                "yAxis",
                                {
                                   mode: i.yAxisMode || "span",
                                   width: t.width,
                                   height: t.baseHeight,
                                   shortenNumbers: t.config.shortenYAxisNumbers,
                                   pos: i.position || "left",
                                },
                                function () {
                                   return this.state.yAxis;
                                }.bind(t),
                             ]);
                          })
                        : e.push([
                             "yAxis",
                             {
                                mode: this.config.yAxisMode,
                                width: this.width,
                                height: this.baseHeight,
                                shortenNumbers: this.config.shortenYAxisNumbers,
                             },
                             function () {
                                return this.state.yAxis;
                             }.bind(this),
                          ]);
                     var i = this.state.datasets.filter(function (t) {
                           return "bar" === t.chartType;
                        }),
                        n = this.state.datasets.filter(function (t) {
                           return "line" === t.chartType;
                        }),
                        a = i.map(function (e) {
                           var n = e.index,
                              a = e.barIndex || n;
                           return [
                              "barGraph-" + e.index,
                              {
                                 index: n,
                                 color: t.colors[n],
                                 stacked: t.barOptions.stacked,
                                 valuesOverPoints: t.config.valuesOverPoints,
                                 minHeight: 0 * t.height,
                              },
                              function () {
                                 var t = this.state,
                                    e = t.yAxis,
                                    s = t.datasets[n],
                                    r = s.id,
                                    o = void 0 === r ? "left-axis" : r,
                                    l = this.barOptions.stacked,
                                    h = this.barOptions.spaceRatio || 0.5,
                                    u = t.unitWidth * (1 - h),
                                    c = u / (l ? 1 : i.length);
                                 e instanceof Array &&
                                    (e =
                                       e.length > 1
                                          ? e.find(function (t) {
                                               return o === t.axisID;
                                            })
                                          : t.yAxis[0]);
                                 var d = t.xAxis.positions.map(function (t) {
                                    return t - u / 2;
                                 });
                                 l ||
                                    (d = d.map(function (t) {
                                       return t + c * a - c;
                                    }));
                                 var p = new Array(t.datasetLength).fill("");
                                 this.config.valuesOverPoints &&
                                    (p = l && s.index === t.datasets.length - 1 ? s.cumulativeYs : s.values);
                                 var f = new Array(t.datasetLength).fill(0);
                                 return (
                                    l &&
                                       (f = s.yPositions.map(function (t, e) {
                                          return t - s.cumulativeYPos[e];
                                       })),
                                    {
                                       xPositions: d,
                                       yPositions: s.yPositions,
                                       offsets: f,
                                       labels: p,
                                       zeroLine: e.zeroLine,
                                       barsWidth: u,
                                       barWidth: c,
                                    }
                                 );
                              }.bind(t),
                           ];
                        }),
                        s = n.map(function (e) {
                           var i = e.index;
                           return [
                              "lineGraph-" + e.index,
                              {
                                 index: i,
                                 color: t.colors[i],
                                 svgDefs: t.svgDefs,
                                 heatline: t.lineOptions.heatline,
                                 regionFill: t.lineOptions.regionFill,
                                 spline: t.lineOptions.spline,
                                 hideDots: t.lineOptions.hideDots,
                                 hideLine: t.lineOptions.hideLine,
                                 valuesOverPoints: t.config.valuesOverPoints,
                              },
                              function () {
                                 var t = this.state,
                                    e = t.datasets[i],
                                    n = t.yAxis.length
                                       ? t.yAxis.find(function (t) {
                                            return e.id === t.axisID;
                                         }) || t.yAxis[0]
                                       : t.yAxis,
                                    a = n.positions[0] < n.zeroLine ? n.positions[0] : n.zeroLine;
                                 return {
                                    xPositions: t.xAxis.positions,
                                    yPositions: e.yPositions,
                                    values: e.values,
                                    zeroLine: a,
                                    radius: this.lineOptions.dotSize || 4,
                                 };
                              }.bind(t),
                           ];
                        }),
                        r = [
                           [
                              "yMarkers",
                              { width: this.width, pos: "right" },
                              function () {
                                 return this.state.yMarkers;
                              }.bind(this),
                           ],
                        ];
                     e = e.concat(a, s, r);
                     var o = ["yMarkers", "yRegions"];
                     (this.dataUnitComponents = []),
                        (this.components = new Map(
                           e
                              .filter(function (e) {
                                 return !o.includes(e[0]) || t.state[e[0]];
                              })
                              .map(function (e) {
                                 var i = At.apply(void 0, Gt(e));
                                 return (
                                    (e[0].includes("lineGraph") || e[0].includes("barGraph")) &&
                                       t.dataUnitComponents.push(i),
                                    [e[0], i]
                                 );
                              })
                        ));
                  },
               },
               {
                  key: "makeDataByIndex",
                  value: function () {
                     var t = this;
                     this.dataByIndex = {};
                     var e = this.state,
                        i = this.config.formatTooltipX,
                        n = this.config.formatTooltipY;
                     e.xAxis.labels.map(function (a, s) {
                        var r = t.state.datasets.map(function (e, i) {
                           var a = e.values[s];
                           return {
                              title: e.name,
                              value: a,
                              yPos: e.yPositions[s],
                              color: t.colors[i],
                              formatted: n ? n(a) : a,
                           };
                        });
                        t.dataByIndex[s] = {
                           label: a,
                           formattedLabel: i ? i(a) : a,
                           xPos: e.xAxis.positions[s],
                           values: r,
                           yExtreme: e.yExtremes[s],
                        };
                     });
                  },
               },
               {
                  key: "bindTooltip",
                  value: function () {
                     var t = this;
                     this.container.addEventListener("mousemove", function (i) {
                        var n = t.measures,
                           a = e(t.container),
                           s = i.pageX - a.left - o(n),
                           l = i.pageY - a.top;
                        l < t.height + r(n) && l > r(n) ? t.mapTooltipXPosition(s) : t.tip.hideTip();
                     });
                  },
               },
               {
                  key: "mapTooltipXPosition",
                  value: function (t) {
                     var e = this.state;
                     if (e.yExtremes) {
                        var i = St(t, e.xAxis.positions, !0);
                        if (i >= 0) {
                           var n = this.dataByIndex[i];
                           this.tip.setValues(
                              n.xPos + this.tip.offset.x,
                              n.yExtreme + this.tip.offset.y,
                              { name: n.formattedLabel, value: "" },
                              n.values,
                              i
                           ),
                              this.tip.showTip();
                        }
                     }
                  },
               },
               {
                  key: "renderLegend",
                  value: function () {
                     var t = this,
                        e = this.data;
                     e.datasets.length > 1 &&
                        ((this.legendArea.textContent = ""),
                        e.datasets.map(function (e, i) {
                           var n = j(100 * i, "0", 100, t.colors[i], e.name, t.config.truncateLegends);
                           t.legendArea.appendChild(n);
                        }));
                  },
               },
               {
                  key: "makeOverlay",
                  value: function () {
                     var t = this;
                     if (this.init) return void (this.init = 0);
                     this.overlayGuides &&
                        this.overlayGuides.forEach(function (t) {
                           var e = t.overlay;
                           e.parentNode.removeChild(e);
                        }),
                        (this.overlayGuides = this.dataUnitComponents.map(function (t) {
                           return { type: t.unitType, overlay: void 0, units: t.units };
                        })),
                        void 0 === this.state.currentIndex && (this.state.currentIndex = this.state.datasetLength - 1),
                        this.overlayGuides.map(function (e) {
                           var i = e.units[t.state.currentIndex];
                           (e.overlay = de[e.type](i)), t.drawArea.appendChild(e.overlay);
                        });
                  },
               },
               {
                  key: "updateOverlayGuides",
                  value: function () {
                     this.overlayGuides &&
                        this.overlayGuides.forEach(function (t) {
                           var e = t.overlay;
                           e.parentNode.removeChild(e);
                        });
                  },
               },
               {
                  key: "bindOverlay",
                  value: function () {
                     var t = this;
                     this.parent.addEventListener("data-select", function () {
                        t.updateOverlay();
                     });
                  },
               },
               {
                  key: "bindUnits",
                  value: function () {
                     var t = this;
                     this.dataUnitComponents.map(function (e) {
                        e.units.map(function (e) {
                           e.addEventListener("click", function () {
                              var i = e.getAttribute("data-point-index");
                              t.setCurrentDataPoint(i);
                           });
                        });
                     }),
                        this.tip.container.addEventListener("click", function () {
                           var e = t.tip.container.getAttribute("data-point-index");
                           t.setCurrentDataPoint(e);
                        });
                  },
               },
               {
                  key: "updateOverlay",
                  value: function () {
                     var t = this;
                     this.overlayGuides.map(function (e) {
                        var i = e.units[t.state.currentIndex];
                        pe[e.type](i, e.overlay);
                     });
                  },
               },
               {
                  key: "onLeftArrow",
                  value: function () {
                     this.setCurrentDataPoint(this.state.currentIndex - 1);
                  },
               },
               {
                  key: "onRightArrow",
                  value: function () {
                     this.setCurrentDataPoint(this.state.currentIndex + 1);
                  },
               },
               {
                  key: "getDataPoint",
                  value: function () {
                     var t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : this.state.currentIndex,
                        e = this.state;
                     return {
                        index: t,
                        label: e.xAxis.labels[t],
                        values: e.datasets.map(function (e) {
                           return e.values[t];
                        }),
                     };
                  },
               },
               {
                  key: "setCurrentDataPoint",
                  value: function (t) {
                     var e = this.state;
                     (t = parseInt(t)) < 0 && (t = 0),
                        t >= e.xAxis.labels.length && (t = e.xAxis.labels.length - 1),
                        t !== e.currentIndex &&
                           ((e.currentIndex = t), s(this.parent, "data-select", this.getDataPoint()));
                  },
               },
               {
                  key: "addDataPoint",
                  value: function (t, e) {
                     var n = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : this.state.datasetLength;
                     Yt(i.prototype.__proto__ || Object.getPrototypeOf(i.prototype), "addDataPoint", this).call(
                        this,
                        t,
                        e,
                        n
                     ),
                        this.data.labels.splice(n, 0, t),
                        this.data.datasets.map(function (t, i) {
                           t.values.splice(n, 0, e[i]);
                        }),
                        this.update(this.data);
                  },
               },
               {
                  key: "removeDataPoint",
                  value: function () {
                     var t =
                        arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : this.state.datasetLength - 1;
                     this.data.labels.length <= 1 ||
                        (Yt(i.prototype.__proto__ || Object.getPrototypeOf(i.prototype), "removeDataPoint", this).call(
                           this,
                           t
                        ),
                        this.data.labels.splice(t, 1),
                        this.data.datasets.map(function (e) {
                           e.values.splice(t, 1);
                        }),
                        this.update(this.data));
                  },
               },
               {
                  key: "updateDataset",
                  value: function (t) {
                     var e = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : 0;
                     (this.data.datasets[e].values = t), this.update(this.data);
                  },
               },
               {
                  key: "updateDatasets",
                  value: function (t) {
                     this.data.datasets.map(function (e, i) {
                        t[i] && (e.values = t[i]);
                     }),
                        this.update(this.data);
                  },
               },
            ]),
            i
         );
      })(ke),
      _e = (function (t) {
         function i(t, e) {
            jt(this, i);
            var n = Vt(this, (i.__proto__ || Object.getPrototypeOf(i)).call(this, t, e));
            return (n.type = "donut"), (n.initTimeout = 0), (n.init = 1), n.setup(), n;
         }
         return (
            Bt(i, t),
            Rt(i, [
               {
                  key: "configure",
                  value: function (t) {
                     Yt(i.prototype.__proto__ || Object.getPrototypeOf(i.prototype), "configure", this).call(this, t),
                        (this.mouseMove = this.mouseMove.bind(this)),
                        (this.mouseLeave = this.mouseLeave.bind(this)),
                        (this.hoverRadio = t.hoverRadio || 0.1),
                        (this.config.startAngle = t.startAngle || 0),
                        (this.clockWise = t.clockWise || !1),
                        (this.strokeWidth = t.strokeWidth || 30);
                  },
               },
               {
                  key: "calc",
                  value: function () {
                     var t = this;
                     Yt(i.prototype.__proto__ || Object.getPrototypeOf(i.prototype), "calc", this).call(this);
                     var e = this.state;
                     this.radius =
                        this.height > this.width
                           ? this.center.x - this.strokeWidth / 2
                           : this.center.y - this.strokeWidth / 2;
                     var n = this.radius,
                        a = this.clockWise,
                        s = e.slicesProperties || [];
                     (e.sliceStrings = []), (e.slicesProperties = []);
                     var r = 180 - this.config.startAngle;
                     e.sliceTotals.map(function (i, o) {
                        var l = r,
                           h = (i / e.grandTotal) * 360,
                           u = h > 180 ? 1 : 0,
                           c = a ? -h : h,
                           d = (r += c),
                           f = p(l, n),
                           v = p(d, n),
                           g = t.init && s[o],
                           y = void 0,
                           m = void 0;
                        t.init ? ((y = g ? g.startPosition : f), (m = g ? g.endPosition : f)) : ((y = f), (m = v));
                        var b =
                           360 === h
                              ? I(y, m, t.center, t.radius, t.clockWise, u)
                              : z(y, m, t.center, t.radius, t.clockWise, u);
                        e.sliceStrings.push(b),
                           e.slicesProperties.push({
                              startPosition: f,
                              endPosition: v,
                              value: i,
                              total: e.grandTotal,
                              startAngle: l,
                              endAngle: d,
                              angle: c,
                           });
                     }),
                        (this.init = 0);
                  },
               },
               {
                  key: "setupComponents",
                  value: function () {
                     var t = this.state,
                        e = [
                           [
                              "donutSlices",
                              {},
                              function () {
                                 return {
                                    sliceStrings: t.sliceStrings,
                                    colors: this.colors,
                                    strokeWidth: this.strokeWidth,
                                 };
                              }.bind(this),
                           ],
                        ];
                     this.components = new Map(
                        e.map(function (t) {
                           var e = At.apply(void 0, Gt(t));
                           return [t[0], e];
                        })
                     );
                  },
               },
               {
                  key: "calTranslateByAngle",
                  value: function (t) {
                     var e = this.radius,
                        i = this.hoverRadio,
                        n = p(t.startAngle + t.angle / 2, e);
                     return "translate3d(" + n.x * i + "px," + n.y * i + "px,0)";
                  },
               },
               {
                  key: "hoverSlice",
                  value: function (t, i, n, a) {
                     if (t) {
                        var s = this.colors[i];
                        if (n) {
                           lt(t, this.calTranslateByAngle(this.state.slicesProperties[i])), (t.style.stroke = A(s, 50));
                           var r = e(this.svg),
                              o = a.pageX - r.left + 10,
                              l = a.pageY - r.top - 10,
                              h =
                                 (this.formatted_labels && this.formatted_labels.length > 0
                                    ? this.formatted_labels[i]
                                    : this.state.labels[i]) + ": ",
                              u = ((100 * this.state.sliceTotals[i]) / this.state.grandTotal).toFixed(1);
                           this.tip.setValues(o, l, { name: h, value: u + "%" }), this.tip.showTip();
                        } else lt(t, "translate3d(0,0,0)"), this.tip.hideTip(), (t.style.stroke = s);
                     }
                  },
               },
               {
                  key: "bindTooltip",
                  value: function () {
                     this.container.addEventListener("mousemove", this.mouseMove),
                        this.container.addEventListener("mouseleave", this.mouseLeave);
                  },
               },
               {
                  key: "mouseMove",
                  value: function (t) {
                     var e = t.target,
                        i = this.components.get("donutSlices").store,
                        n = this.curActiveSliceIndex,
                        a = this.curActiveSlice;
                     if (i.includes(e)) {
                        var s = i.indexOf(e);
                        this.hoverSlice(a, n, !1),
                           (this.curActiveSlice = e),
                           (this.curActiveSliceIndex = s),
                           this.hoverSlice(e, s, !0, t);
                     } else this.mouseLeave();
                  },
               },
               {
                  key: "mouseLeave",
                  value: function () {
                     this.hoverSlice(this.curActiveSlice, this.curActiveSliceIndex, !1);
                  },
               },
            ]),
            i
         );
      })(we),
      ze = { bar: Ee, line: Ee, percentage: Oe, heatmap: Se, pie: Ne, donut: _e },
      Ie = function t(e, i) {
         return jt(this, t), Wt(i.type, e, i);
      },
      He = Object.freeze({ Chart: Ie, PercentageChart: Oe, PieChart: Ne, Heatmap: Se, AxisChart: Ee }),
      We = {};
   return (We.NAME = "Frappe Charts"), (We.VERSION = "1.6.2"), (We = Object.assign({}, We, He));
})();
