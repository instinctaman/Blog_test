!function() {
    var e = function(t, i) {
        function s() {
            this.q = [],
            this.add = function(e) {
                this.q.push(e)
            }
            ;
            var e, t;
            this.call = function() {
                for (e = 0,
                t = this.q.length; e < t; e++)
                    this.q[e].call()
            }
        }
        function o(e, t) {
            return e.currentStyle ? e.currentStyle[t] : window.getComputedStyle ? window.getComputedStyle(e, null).getPropertyValue(t) : e.style[t]
        }
        function n(e, t) {
            if (e.resizedAttached) {
                if (e.resizedAttached)
                    return void e.resizedAttached.add(t)
            } else
                e.resizedAttached = new s,
                e.resizedAttached.add(t);
            e.resizeSensor = document.createElement("div"),
            e.resizeSensor.className = "resize-sensor";
            var i = "position: absolute; left: 0; top: 0; right: 0; bottom: 0; overflow: hidden; z-index: -1; visibility: hidden;"
              , n = "position: absolute; left: 0; top: 0; transition: 0s;";
            e.resizeSensor.style.cssText = i,
            e.resizeSensor.innerHTML = '<div class="resize-sensor-expand" style="' + i + '"><div style="' + n + '"></div></div><div class="resize-sensor-shrink" style="' + i + '"><div style="' + n + ' width: 200%; height: 200%"></div></div>',
            e.appendChild(e.resizeSensor),
            {
                fixed: 1,
                absolute: 1
            }[o(e, "position")] || (e.style.position = "relative");
            var d, r, l = e.resizeSensor.childNodes[0], c = l.childNodes[0], h = e.resizeSensor.childNodes[1], a = (h.childNodes[0],
            function() {
                c.style.width = l.offsetWidth + 10 + "px",
                c.style.height = l.offsetHeight + 10 + "px",
                l.scrollLeft = l.scrollWidth,
                l.scrollTop = l.scrollHeight,
                h.scrollLeft = h.scrollWidth,
                h.scrollTop = h.scrollHeight,
                d = e.offsetWidth,
                r = e.offsetHeight
            }
            );
            a();
            var f = function() {
                e.resizedAttached && e.resizedAttached.call()
            }
              , u = function(e, t, i) {
                e.attachEvent ? e.attachEvent("on" + t, i) : e.addEventListener(t, i)
            }
              , p = function() {
                e.offsetWidth == d && e.offsetHeight == r || f(),
                a()
            };
            u(l, "scroll", p),
            u(h, "scroll", p)
        }
        var d = Object.prototype.toString.call(t)
          , r = "[object Array]" === d || "[object NodeList]" === d || "[object HTMLCollection]" === d || "undefined" != typeof jQuery && t instanceof jQuery || "undefined" != typeof Elements && t instanceof Elements;
        if (r)
            for (var l = 0, c = t.length; l < c; l++)
                n(t[l], i);
        else
            n(t, i);
        this.detach = function() {
            if (r)
                for (var i = 0, s = t.length; i < s; i++)
                    e.detach(t[i]);
            else
                e.detach(t)
        }
    };
    e.detach = function(e) {
        e.resizeSensor && (e.removeChild(e.resizeSensor),
        delete e.resizeSensor,
        delete e.resizedAttached)
    }
    ,
    "undefined" != typeof module && "undefined" != typeof module.exports ? module.exports = e : window.ResizeSensor = e
}();
