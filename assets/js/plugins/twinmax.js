/*!
 * VERSION: 1.15.0
 * DATE: 2014-12-03
 * UPDATES AND DOCS AT: http://www.greensock.com
 * 
 * Includes all of the following: TweenLite, TweenMax, TimelineLite, TimelineMax, EasePack, CSSPlugin, RoundPropsPlugin, BezierPlugin, AttrPlugin, DirectionalRotationPlugin
 *
 * @license Copyright (c) 2008-2014, GreenSock. All rights reserved.
 * This work is subject to the terms at http://www.greensock.com/terms_of_use.html or for
 * Club GreenSock members, the software agreement that was issued with your membership.
 * 
 * @author: Jack Doyle, jack@greensock.com
 **/
var _gsScope = "undefined" != typeof module && module.exports && "undefined" != typeof global ? global : this || window;
(_gsScope._gsQueue || (_gsScope._gsQueue = [])).push(function() {
    "use strict";
    _gsScope._gsDefine("TweenMax", ["core.Animation", "core.SimpleTimeline", "TweenLite"], function(t, e, i) {
        var s = function(t) {
            var e, i = [], s = t.length;
            for (e = 0; e !== s; i.push(t[e++]))
                ;
            return i
        }
          , r = function(t, e, s) {
            i.call(this, t, e, s),
            this._cycle = 0,
            this._yoyo = this.vars.yoyo === !0,
            this._repeat = this.vars.repeat || 0,
            this._repeatDelay = this.vars.repeatDelay || 0,
            this._dirty = !0,
            this.render = r.prototype.render
        }
          , n = 1e-10
          , a = i._internals
          , o = a.isSelector
          , h = a.isArray
          , l = r.prototype = i.to({}, .1, {})
          , _ = [];
        r.version = "1.15.0",
        l.constructor = r,
        l.kill()._gc = !1,
        r.killTweensOf = r.killDelayedCallsTo = i.killTweensOf,
        r.getTweensOf = i.getTweensOf,
        r.lagSmoothing = i.lagSmoothing,
        r.ticker = i.ticker,
        r.render = i.render,
        l.invalidate = function() {
            return this._yoyo = this.vars.yoyo === !0,
            this._repeat = this.vars.repeat || 0,
            this._repeatDelay = this.vars.repeatDelay || 0,
            this._uncache(!0),
            i.prototype.invalidate.call(this)
        }
        ,
        l.updateTo = function(t, e) {
            var s, r = this.ratio, n = this.vars.immediateRender || t.immediateRender;
            e && this._startTime < this._timeline._time && (this._startTime = this._timeline._time,
            this._uncache(!1),
            this._gc ? this._enabled(!0, !1) : this._timeline.insert(this, this._startTime - this._delay));
            for (s in t)
                this.vars[s] = t[s];
            if (this._initted || n)
                if (e)
                    this._initted = !1,
                    n && this.render(0, !0, !0);
                else if (this._gc && this._enabled(!0, !1),
                this._notifyPluginsOfEnabled && this._firstPT && i._onPluginEvent("_onDisable", this),
                this._time / this._duration > .998) {
                    var a = this._time;
                    this.render(0, !0, !1),
                    this._initted = !1,
                    this.render(a, !0, !1)
                } else if (this._time > 0 || n) {
                    this._initted = !1,
                    this._init();
                    for (var o, h = 1 / (1 - r), l = this._firstPT; l; )
                        o = l.s + l.c,
                        l.c *= h,
                        l.s = o - l.c,
                        l = l._next
                }
            return this
        }
        ,
        l.render = function(t, e, i) {
            this._initted || 0 === this._duration && this.vars.repeat && this.invalidate();
            var s, r, o, h, l, u, p, c, f = this._dirty ? this.totalDuration() : this._totalDuration, m = this._time, d = this._totalTime, g = this._cycle, v = this._duration, y = this._rawPrevTime;
            if (t >= f ? (this._totalTime = f,
            this._cycle = this._repeat,
            this._yoyo && 0 !== (1 & this._cycle) ? (this._time = 0,
            this.ratio = this._ease._calcEnd ? this._ease.getRatio(0) : 0) : (this._time = v,
            this.ratio = this._ease._calcEnd ? this._ease.getRatio(1) : 1),
            this._reversed || (s = !0,
            r = "onComplete"),
            0 === v && (this._initted || !this.vars.lazy || i) && (this._startTime === this._timeline._duration && (t = 0),
            (0 === t || 0 > y || y === n) && y !== t && (i = !0,
            y > n && (r = "onReverseComplete")),
            this._rawPrevTime = c = !e || t || y === t ? t : n)) : 1e-7 > t ? (this._totalTime = this._time = this._cycle = 0,
            this.ratio = this._ease._calcEnd ? this._ease.getRatio(0) : 0,
            (0 !== d || 0 === v && y > 0 && y !== n) && (r = "onReverseComplete",
            s = this._reversed),
            0 > t && (this._active = !1,
            0 === v && (this._initted || !this.vars.lazy || i) && (y >= 0 && (i = !0),
            this._rawPrevTime = c = !e || t || y === t ? t : n)),
            this._initted || (i = !0)) : (this._totalTime = this._time = t,
            0 !== this._repeat && (h = v + this._repeatDelay,
            this._cycle = this._totalTime / h >> 0,
            0 !== this._cycle && this._cycle === this._totalTime / h && this._cycle--,
            this._time = this._totalTime - this._cycle * h,
            this._yoyo && 0 !== (1 & this._cycle) && (this._time = v - this._time),
            this._time > v ? this._time = v : 0 > this._time && (this._time = 0)),
            this._easeType ? (l = this._time / v,
            u = this._easeType,
            p = this._easePower,
            (1 === u || 3 === u && l >= .5) && (l = 1 - l),
            3 === u && (l *= 2),
            1 === p ? l *= l : 2 === p ? l *= l * l : 3 === p ? l *= l * l * l : 4 === p && (l *= l * l * l * l),
            this.ratio = 1 === u ? 1 - l : 2 === u ? l : .5 > this._time / v ? l / 2 : 1 - l / 2) : this.ratio = this._ease.getRatio(this._time / v)),
            m === this._time && !i && g === this._cycle)
                return d !== this._totalTime && this._onUpdate && (e || this._onUpdate.apply(this.vars.onUpdateScope || this, this.vars.onUpdateParams || _)),
                void 0;
            if (!this._initted) {
                if (this._init(),
                !this._initted || this._gc)
                    return;
                if (!i && this._firstPT && (this.vars.lazy !== !1 && this._duration || this.vars.lazy && !this._duration))
                    return this._time = m,
                    this._totalTime = d,
                    this._rawPrevTime = y,
                    this._cycle = g,
                    a.lazyTweens.push(this),
                    this._lazy = [t, e],
                    void 0;
                this._time && !s ? this.ratio = this._ease.getRatio(this._time / v) : s && this._ease._calcEnd && (this.ratio = this._ease.getRatio(0 === this._time ? 0 : 1))
            }
            for (this._lazy !== !1 && (this._lazy = !1),
            this._active || !this._paused && this._time !== m && t >= 0 && (this._active = !0),
            0 === d && (2 === this._initted && t > 0 && this._init(),
            this._startAt && (t >= 0 ? this._startAt.render(t, e, i) : r || (r = "_dummyGS")),
            this.vars.onStart && (0 !== this._totalTime || 0 === v) && (e || this.vars.onStart.apply(this.vars.onStartScope || this, this.vars.onStartParams || _))),
            o = this._firstPT; o; )
                o.f ? o.t[o.p](o.c * this.ratio + o.s) : o.t[o.p] = o.c * this.ratio + o.s,
                o = o._next;
            this._onUpdate && (0 > t && this._startAt && this._startTime && this._startAt.render(t, e, i),
            e || (this._totalTime !== d || s) && this._onUpdate.apply(this.vars.onUpdateScope || this, this.vars.onUpdateParams || _)),
            this._cycle !== g && (e || this._gc || this.vars.onRepeat && this.vars.onRepeat.apply(this.vars.onRepeatScope || this, this.vars.onRepeatParams || _)),
            r && (!this._gc || i) && (0 > t && this._startAt && !this._onUpdate && this._startTime && this._startAt.render(t, e, i),
            s && (this._timeline.autoRemoveChildren && this._enabled(!1, !1),
            this._active = !1),
            !e && this.vars[r] && this.vars[r].apply(this.vars[r + "Scope"] || this, this.vars[r + "Params"] || _),
            0 === v && this._rawPrevTime === n && c !== n && (this._rawPrevTime = 0))
        }
        ,
        r.to = function(t, e, i) {
            return new r(t,e,i)
        }
        ,
        r.from = function(t, e, i) {
            return i.runBackwards = !0,
            i.immediateRender = 0 != i.immediateRender,
            new r(t,e,i)
        }
        ,
        r.fromTo = function(t, e, i, s) {
            return s.startAt = i,
            s.immediateRender = 0 != s.immediateRender && 0 != i.immediateRender,
            new r(t,e,s)
        }
        ,
        r.staggerTo = r.allTo = function(t, e, n, a, l, u, p) {
            a = a || 0;
            var c, f, m, d, g = n.delay || 0, v = [], y = function() {
                n.onComplete && n.onComplete.apply(n.onCompleteScope || this, arguments),
                l.apply(p || this, u || _)
            };
            for (h(t) || ("string" == typeof t && (t = i.selector(t) || t),
            o(t) && (t = s(t))),
            t = t || [],
            0 > a && (t = s(t),
            t.reverse(),
            a *= -1),
            c = t.length - 1,
            m = 0; c >= m; m++) {
                f = {};
                for (d in n)
                    f[d] = n[d];
                f.delay = g,
                m === c && l && (f.onComplete = y),
                v[m] = new r(t[m],e,f),
                g += a
            }
            return v
        }
        ,
        r.staggerFrom = r.allFrom = function(t, e, i, s, n, a, o) {
            return i.runBackwards = !0,
            i.immediateRender = 0 != i.immediateRender,
            r.staggerTo(t, e, i, s, n, a, o)
        }
        ,
        r.staggerFromTo = r.allFromTo = function(t, e, i, s, n, a, o, h) {
            return s.startAt = i,
            s.immediateRender = 0 != s.immediateRender && 0 != i.immediateRender,
            r.staggerTo(t, e, s, n, a, o, h)
        }
        ,
        r.delayedCall = function(t, e, i, s, n) {
            return new r(e,0,{
                delay: t,
                onComplete: e,
                onCompleteParams: i,
                onCompleteScope: s,
                onReverseComplete: e,
                onReverseCompleteParams: i,
                onReverseCompleteScope: s,
                immediateRender: !1,
                useFrames: n,
                overwrite: 0
            })
        }
        ,
        r.set = function(t, e) {
            return new r(t,0,e)
        }
        ,
        r.isTweening = function(t) {
            return i.getTweensOf(t, !0).length > 0
        }
        ;
        var u = function(t, e) {
            for (var s = [], r = 0, n = t._first; n; )
                n instanceof i ? s[r++] = n : (e && (s[r++] = n),
                s = s.concat(u(n, e)),
                r = s.length),
                n = n._next;
            return s
        }
          , p = r.getAllTweens = function(e) {
            return u(t._rootTimeline, e).concat(u(t._rootFramesTimeline, e))
        }
        ;
        r.killAll = function(t, i, s, r) {
            null == i && (i = !0),
            null == s && (s = !0);
            var n, a, o, h = p(0 != r), l = h.length, _ = i && s && r;
            for (o = 0; l > o; o++)
                a = h[o],
                (_ || a instanceof e || (n = a.target === a.vars.onComplete) && s || i && !n) && (t ? a.totalTime(a._reversed ? 0 : a.totalDuration()) : a._enabled(!1, !1))
        }
        ,
        r.killChildTweensOf = function(t, e) {
            if (null != t) {
                var n, l, _, u, p, c = a.tweenLookup;
                if ("string" == typeof t && (t = i.selector(t) || t),
                o(t) && (t = s(t)),
                h(t))
                    for (u = t.length; --u > -1; )
                        r.killChildTweensOf(t[u], e);
                else {
                    n = [];
                    for (_ in c)
                        for (l = c[_].target.parentNode; l; )
                            l === t && (n = n.concat(c[_].tweens)),
                            l = l.parentNode;
                    for (p = n.length,
                    u = 0; p > u; u++)
                        e && n[u].totalTime(n[u].totalDuration()),
                        n[u]._enabled(!1, !1)
                }
            }
        }
        ;
        var c = function(t, i, s, r) {
            i = i !== !1,
            s = s !== !1,
            r = r !== !1;
            for (var n, a, o = p(r), h = i && s && r, l = o.length; --l > -1; )
                a = o[l],
                (h || a instanceof e || (n = a.target === a.vars.onComplete) && s || i && !n) && a.paused(t)
        };
        return r.pauseAll = function(t, e, i) {
            c(!0, t, e, i)
        }
        ,
        r.resumeAll = function(t, e, i) {
            c(!1, t, e, i)
        }
        ,
        r.globalTimeScale = function(e) {
            var s = t._rootTimeline
              , r = i.ticker.time;
            return arguments.length ? (e = e || n,
            s._startTime = r - (r - s._startTime) * s._timeScale / e,
            s = t._rootFramesTimeline,
            r = i.ticker.frame,
            s._startTime = r - (r - s._startTime) * s._timeScale / e,
            s._timeScale = t._rootTimeline._timeScale = e,
            e) : s._timeScale
        }
        ,
        l.progress = function(t) {
            return arguments.length ? this.totalTime(this.duration() * (this._yoyo && 0 !== (1 & this._cycle) ? 1 - t : t) + this._cycle * (this._duration + this._repeatDelay), !1) : this._time / this.duration()
        }
        ,
        l.totalProgress = function(t) {
            return arguments.length ? this.totalTime(this.totalDuration() * t, !1) : this._totalTime / this.totalDuration()
        }
        ,
        l.time = function(t, e) {
            return arguments.length ? (this._dirty && this.totalDuration(),
            t > this._duration && (t = this._duration),
            this._yoyo && 0 !== (1 & this._cycle) ? t = this._duration - t + this._cycle * (this._duration + this._repeatDelay) : 0 !== this._repeat && (t += this._cycle * (this._duration + this._repeatDelay)),
            this.totalTime(t, e)) : this._time
        }
        ,
        l.duration = function(e) {
            return arguments.length ? t.prototype.duration.call(this, e) : this._duration
        }
        ,
        l.totalDuration = function(t) {
            return arguments.length ? -1 === this._repeat ? this : this.duration((t - this._repeat * this._repeatDelay) / (this._repeat + 1)) : (this._dirty && (this._totalDuration = -1 === this._repeat ? 999999999999 : this._duration * (this._repeat + 1) + this._repeatDelay * this._repeat,
            this._dirty = !1),
            this._totalDuration)
        }
        ,
        l.repeat = function(t) {
            return arguments.length ? (this._repeat = t,
            this._uncache(!0)) : this._repeat
        }
        ,
        l.repeatDelay = function(t) {
            return arguments.length ? (this._repeatDelay = t,
            this._uncache(!0)) : this._repeatDelay
        }
        ,
        l.yoyo = function(t) {
            return arguments.length ? (this._yoyo = t,
            this) : this._yoyo
        }
        ,
        r
    }, !0),
    _gsScope._gsDefine("TimelineLite", ["core.Animation", "core.SimpleTimeline", "TweenLite"], function(t, e, i) {
        var s = function(t) {
            e.call(this, t),
            this._labels = {},
            this.autoRemoveChildren = this.vars.autoRemoveChildren === !0,
            this.smoothChildTiming = this.vars.smoothChildTiming === !0,
            this._sortChildren = !0,
            this._onUpdate = this.vars.onUpdate;
            var i, s, r = this.vars;
            for (s in r)
                i = r[s],
                o(i) && -1 !== i.join("").indexOf("{self}") && (r[s] = this._swapSelfInParams(i));
            o(r.tweens) && this.add(r.tweens, 0, r.align, r.stagger)
        }
          , r = 1e-10
          , n = i._internals
          , a = n.isSelector
          , o = n.isArray
          , h = n.lazyTweens
          , l = n.lazyRender
          , _ = []
          , u = _gsScope._gsDefine.globals
          , p = function(t) {
            var e, i = {};
            for (e in t)
                i[e] = t[e];
            return i
        }
          , c = function(t, e, i, s) {
            var r = t._timeline
              , n = r._totalTime;
            !e && this._forcingPlayhead || r._rawPrevTime === t._startTime || (r.pause(t._startTime),
            e && e.apply(s || r, i || _),
            this._forcingPlayhead && r.seek(n))
        }
          , f = function(t) {
            var e, i = [], s = t.length;
            for (e = 0; e !== s; i.push(t[e++]))
                ;
            return i
        }
          , m = s.prototype = new e;
        return s.version = "1.15.0",
        m.constructor = s,
        m.kill()._gc = m._forcingPlayhead = !1,
        m.to = function(t, e, s, r) {
            var n = s.repeat && u.TweenMax || i;
            return e ? this.add(new n(t,e,s), r) : this.set(t, s, r)
        }
        ,
        m.from = function(t, e, s, r) {
            return this.add((s.repeat && u.TweenMax || i).from(t, e, s), r)
        }
        ,
        m.fromTo = function(t, e, s, r, n) {
            var a = r.repeat && u.TweenMax || i;
            return e ? this.add(a.fromTo(t, e, s, r), n) : this.set(t, r, n)
        }
        ,
        m.staggerTo = function(t, e, r, n, o, h, l, _) {
            var u, c = new s({
                onComplete: h,
                onCompleteParams: l,
                onCompleteScope: _,
                smoothChildTiming: this.smoothChildTiming
            });
            for ("string" == typeof t && (t = i.selector(t) || t),
            t = t || [],
            a(t) && (t = f(t)),
            n = n || 0,
            0 > n && (t = f(t),
            t.reverse(),
            n *= -1),
            u = 0; t.length > u; u++)
                r.startAt && (r.startAt = p(r.startAt)),
                c.to(t[u], e, p(r), u * n);
            return this.add(c, o)
        }
        ,
        m.staggerFrom = function(t, e, i, s, r, n, a, o) {
            return i.immediateRender = 0 != i.immediateRender,
            i.runBackwards = !0,
            this.staggerTo(t, e, i, s, r, n, a, o)
        }
        ,
        m.staggerFromTo = function(t, e, i, s, r, n, a, o, h) {
            return s.startAt = i,
            s.immediateRender = 0 != s.immediateRender && 0 != i.immediateRender,
            this.staggerTo(t, e, s, r, n, a, o, h)
        }
        ,
        m.call = function(t, e, s, r) {
            return this.add(i.delayedCall(0, t, e, s), r)
        }
        ,
        m.set = function(t, e, s) {
            return s = this._parseTimeOrLabel(s, 0, !0),
            null == e.immediateRender && (e.immediateRender = s === this._time && !this._paused),
            this.add(new i(t,0,e), s)
        }
        ,
        s.exportRoot = function(t, e) {
            t = t || {},
            null == t.smoothChildTiming && (t.smoothChildTiming = !0);
            var r, n, a = new s(t), o = a._timeline;
            for (null == e && (e = !0),
            o._remove(a, !0),
            a._startTime = 0,
            a._rawPrevTime = a._time = a._totalTime = o._time,
            r = o._first; r; )
                n = r._next,
                e && r instanceof i && r.target === r.vars.onComplete || a.add(r, r._startTime - r._delay),
                r = n;
            return o.add(a, 0),
            a
        }
        ,
        m.add = function(r, n, a, h) {
            var l, _, u, p, c, f;
            if ("number" != typeof n && (n = this._parseTimeOrLabel(n, 0, !0, r)),
            !(r instanceof t)) {
                if (r instanceof Array || r && r.push && o(r)) {
                    for (a = a || "normal",
                    h = h || 0,
                    l = n,
                    _ = r.length,
                    u = 0; _ > u; u++)
                        o(p = r[u]) && (p = new s({
                            tweens: p
                        })),
                        this.add(p, l),
                        "string" != typeof p && "function" != typeof p && ("sequence" === a ? l = p._startTime + p.totalDuration() / p._timeScale : "start" === a && (p._startTime -= p.delay())),
                        l += h;
                    return this._uncache(!0)
                }
                if ("string" == typeof r)
                    return this.addLabel(r, n);
                if ("function" != typeof r)
                    throw "Cannot add " + r + " into the timeline; it is not a tween, timeline, function, or string.";
                r = i.delayedCall(0, r)
            }
            if (e.prototype.add.call(this, r, n),
            (this._gc || this._time === this._duration) && !this._paused && this._duration < this.duration())
                for (c = this,
                f = c.rawTime() > r._startTime; c._timeline; )
                    f && c._timeline.smoothChildTiming ? c.totalTime(c._totalTime, !0) : c._gc && c._enabled(!0, !1),
                    c = c._timeline;
            return this
        }
        ,
        m.remove = function(e) {
            if (e instanceof t)
                return this._remove(e, !1);
            if (e instanceof Array || e && e.push && o(e)) {
                for (var i = e.length; --i > -1; )
                    this.remove(e[i]);
                return this
            }
            return "string" == typeof e ? this.removeLabel(e) : this.kill(null, e)
        }
        ,
        m._remove = function(t, i) {
            e.prototype._remove.call(this, t, i);
            var s = this._last;
            return s ? this._time > s._startTime + s._totalDuration / s._timeScale && (this._time = this.duration(),
            this._totalTime = this._totalDuration) : this._time = this._totalTime = this._duration = this._totalDuration = 0,
            this
        }
        ,
        m.append = function(t, e) {
            return this.add(t, this._parseTimeOrLabel(null, e, !0, t))
        }
        ,
        m.insert = m.insertMultiple = function(t, e, i, s) {
            return this.add(t, e || 0, i, s)
        }
        ,
        m.appendMultiple = function(t, e, i, s) {
            return this.add(t, this._parseTimeOrLabel(null, e, !0, t), i, s)
        }
        ,
        m.addLabel = function(t, e) {
            return this._labels[t] = this._parseTimeOrLabel(e),
            this
        }
        ,
        m.addPause = function(t, e, s, r) {
            var n = i.delayedCall(0, c, ["{self}", e, s, r], this);
            return n.data = "isPause",
            this.add(n, t)
        }
        ,
        m.removeLabel = function(t) {
            return delete this._labels[t],
            this
        }
        ,
        m.getLabelTime = function(t) {
            return null != this._labels[t] ? this._labels[t] : -1
        }
        ,
        m._parseTimeOrLabel = function(e, i, s, r) {
            var n;
            if (r instanceof t && r.timeline === this)
                this.remove(r);
            else if (r && (r instanceof Array || r.push && o(r)))
                for (n = r.length; --n > -1; )
                    r[n]instanceof t && r[n].timeline === this && this.remove(r[n]);
            if ("string" == typeof i)
                return this._parseTimeOrLabel(i, s && "number" == typeof e && null == this._labels[i] ? e - this.duration() : 0, s);
            if (i = i || 0,
            "string" != typeof e || !isNaN(e) && null == this._labels[e])
                null == e && (e = this.duration());
            else {
                if (n = e.indexOf("="),
                -1 === n)
                    return null == this._labels[e] ? s ? this._labels[e] = this.duration() + i : i : this._labels[e] + i;
                i = parseInt(e.charAt(n - 1) + "1", 10) * Number(e.substr(n + 1)),
                e = n > 1 ? this._parseTimeOrLabel(e.substr(0, n - 1), 0, s) : this.duration()
            }
            return Number(e) + i
        }
        ,
        m.seek = function(t, e) {
            return this.totalTime("number" == typeof t ? t : this._parseTimeOrLabel(t), e !== !1)
        }
        ,
        m.stop = function() {
            return this.paused(!0)
        }
        ,
        m.gotoAndPlay = function(t, e) {
            return this.play(t, e)
        }
        ,
        m.gotoAndStop = function(t, e) {
            return this.pause(t, e)
        }
        ,
        m.render = function(t, e, i) {
            this._gc && this._enabled(!0, !1);
            var s, n, a, o, u, p = this._dirty ? this.totalDuration() : this._totalDuration, c = this._time, f = this._startTime, m = this._timeScale, d = this._paused;
            if (t >= p ? (this._totalTime = this._time = p,
            this._reversed || this._hasPausedChild() || (n = !0,
            o = "onComplete",
            0 === this._duration && (0 === t || 0 > this._rawPrevTime || this._rawPrevTime === r) && this._rawPrevTime !== t && this._first && (u = !0,
            this._rawPrevTime > r && (o = "onReverseComplete"))),
            this._rawPrevTime = this._duration || !e || t || this._rawPrevTime === t ? t : r,
            t = p + 1e-4) : 1e-7 > t ? (this._totalTime = this._time = 0,
            (0 !== c || 0 === this._duration && this._rawPrevTime !== r && (this._rawPrevTime > 0 || 0 > t && this._rawPrevTime >= 0)) && (o = "onReverseComplete",
            n = this._reversed),
            0 > t ? (this._active = !1,
            this._rawPrevTime >= 0 && this._first && (u = !0),
            this._rawPrevTime = t) : (this._rawPrevTime = this._duration || !e || t || this._rawPrevTime === t ? t : r,
            t = 0,
            this._initted || (u = !0))) : this._totalTime = this._time = this._rawPrevTime = t,
            this._time !== c && this._first || i || u) {
                if (this._initted || (this._initted = !0),
                this._active || !this._paused && this._time !== c && t > 0 && (this._active = !0),
                0 === c && this.vars.onStart && 0 !== this._time && (e || this.vars.onStart.apply(this.vars.onStartScope || this, this.vars.onStartParams || _)),
                this._time >= c)
                    for (s = this._first; s && (a = s._next,
                    !this._paused || d); )
                        (s._active || s._startTime <= this._time && !s._paused && !s._gc) && (s._reversed ? s.render((s._dirty ? s.totalDuration() : s._totalDuration) - (t - s._startTime) * s._timeScale, e, i) : s.render((t - s._startTime) * s._timeScale, e, i)),
                        s = a;
                else
                    for (s = this._last; s && (a = s._prev,
                    !this._paused || d); )
                        (s._active || c >= s._startTime && !s._paused && !s._gc) && (s._reversed ? s.render((s._dirty ? s.totalDuration() : s._totalDuration) - (t - s._startTime) * s._timeScale, e, i) : s.render((t - s._startTime) * s._timeScale, e, i)),
                        s = a;
                this._onUpdate && (e || (h.length && l(),
                this._onUpdate.apply(this.vars.onUpdateScope || this, this.vars.onUpdateParams || _))),
                o && (this._gc || (f === this._startTime || m !== this._timeScale) && (0 === this._time || p >= this.totalDuration()) && (n && (h.length && l(),
                this._timeline.autoRemoveChildren && this._enabled(!1, !1),
                this._active = !1),
                !e && this.vars[o] && this.vars[o].apply(this.vars[o + "Scope"] || this, this.vars[o + "Params"] || _)))
            }
        }
        ,
        m._hasPausedChild = function() {
            for (var t = this._first; t; ) {
                if (t._paused || t instanceof s && t._hasPausedChild())
                    return !0;
                t = t._next
            }
            return !1
        }
        ,
        m.getChildren = function(t, e, s, r) {
            r = r || -9999999999;
            for (var n = [], a = this._first, o = 0; a; )
                r > a._startTime || (a instanceof i ? e !== !1 && (n[o++] = a) : (s !== !1 && (n[o++] = a),
                t !== !1 && (n = n.concat(a.getChildren(!0, e, s)),
                o = n.length))),
                a = a._next;
            return n
        }
        ,
        m.getTweensOf = function(t, e) {
            var s, r, n = this._gc, a = [], o = 0;
            for (n && this._enabled(!0, !0),
            s = i.getTweensOf(t),
            r = s.length; --r > -1; )
                (s[r].timeline === this || e && this._contains(s[r])) && (a[o++] = s[r]);
            return n && this._enabled(!1, !0),
            a
        }
        ,
        m.recent = function() {
            return this._recent
        }
        ,
        m._contains = function(t) {
            for (var e = t.timeline; e; ) {
                if (e === this)
                    return !0;
                e = e.timeline
            }
            return !1
        }
        ,
        m.shiftChildren = function(t, e, i) {
            i = i || 0;
            for (var s, r = this._first, n = this._labels; r; )
                r._startTime >= i && (r._startTime += t),
                r = r._next;
            if (e)
                for (s in n)
                    n[s] >= i && (n[s] += t);
            return this._uncache(!0)
        }
        ,
        m._kill = function(t, e) {
            if (!t && !e)
                return this._enabled(!1, !1);
            for (var i = e ? this.getTweensOf(e) : this.getChildren(!0, !0, !1), s = i.length, r = !1; --s > -1; )
                i[s]._kill(t, e) && (r = !0);
            return r
        }
        ,
        m.clear = function(t) {
            var e = this.getChildren(!1, !0, !0)
              , i = e.length;
            for (this._time = this._totalTime = 0; --i > -1; )
                e[i]._enabled(!1, !1);
            return t !== !1 && (this._labels = {}),
            this._uncache(!0)
        }
        ,
        m.invalidate = function() {
            for (var e = this._first; e; )
                e.invalidate(),
                e = e._next;
            return t.prototype.invalidate.call(this)
        }
        ,
        m._enabled = function(t, i) {
            if (t === this._gc)
                for (var s = this._first; s; )
                    s._enabled(t, !0),
                    s = s._next;
            return e.prototype._enabled.call(this, t, i)
        }
        ,
        m.totalTime = function() {
            this._forcingPlayhead = !0;
            var e = t.prototype.totalTime.apply(this, arguments);
            return this._forcingPlayhead = !1,
            e
        }
        ,
        m.duration = function(t) {
            return arguments.length ? (0 !== this.duration() && 0 !== t && this.timeScale(this._duration / t),
            this) : (this._dirty && this.totalDuration(),
            this._duration)
        }
        ,
        m.totalDuration = function(t) {
            if (!arguments.length) {
                if (this._dirty) {
                    for (var e, i, s = 0, r = this._last, n = 999999999999; r; )
                        e = r._prev,
                        r._dirty && r.totalDuration(),
                        r._startTime > n && this._sortChildren && !r._paused ? this.add(r, r._startTime - r._delay) : n = r._startTime,
                        0 > r._startTime && !r._paused && (s -= r._startTime,
                        this._timeline.smoothChildTiming && (this._startTime += r._startTime / this._timeScale),
                        this.shiftChildren(-r._startTime, !1, -9999999999),
                        n = 0),
                        i = r._startTime + r._totalDuration / r._timeScale,
                        i > s && (s = i),
                        r = e;
                    this._duration = this._totalDuration = s,
                    this._dirty = !1
                }
                return this._totalDuration
            }
            return 0 !== this.totalDuration() && 0 !== t && this.timeScale(this._totalDuration / t),
            this
        }
        ,
        m.usesFrames = function() {
            for (var e = this._timeline; e._timeline; )
                e = e._timeline;
            return e === t._rootFramesTimeline
        }
        ,
        m.rawTime = function() {
            return this._paused ? this._totalTime : (this._timeline.rawTime() - this._startTime) * this._timeScale
        }
        ,
        s
    }, !0),
    _gsScope._gsDefine("TimelineMax", ["TimelineLite", "TweenLite", "easing.Ease"], function(t, e, i) {
        var s = function(e) {
            t.call(this, e),
            this._repeat = this.vars.repeat || 0,
            this._repeatDelay = this.vars.repeatDelay || 0,
            this._cycle = 0,
            this._yoyo = this.vars.yoyo === !0,
            this._dirty = !0
        }
          , r = 1e-10
          , n = []
          , a = e._internals
          , o = a.lazyTweens
          , h = a.lazyRender
          , l = new i(null,null,1,0)
          , _ = s.prototype = new t;
        return _.constructor = s,
        _.kill()._gc = !1,
        s.version = "1.15.0",
        _.invalidate = function() {
            return this._yoyo = this.vars.yoyo === !0,
            this._repeat = this.vars.repeat || 0,
            this._repeatDelay = this.vars.repeatDelay || 0,
            this._uncache(!0),
            t.prototype.invalidate.call(this)
        }
        ,
        _.addCallback = function(t, i, s, r) {
            return this.add(e.delayedCall(0, t, s, r), i)
        }
        ,
        _.removeCallback = function(t, e) {
            if (t)
                if (null == e)
                    this._kill(null, t);
                else
                    for (var i = this.getTweensOf(t, !1), s = i.length, r = this._parseTimeOrLabel(e); --s > -1; )
                        i[s]._startTime === r && i[s]._enabled(!1, !1);
            return this
        }
        ,
        _.tweenTo = function(t, i) {
            i = i || {};
            var s, r, a, o = {
                ease: l,
                overwrite: i.delay ? 2 : 1,
                useFrames: this.usesFrames(),
                immediateRender: !1
            };
            for (r in i)
                o[r] = i[r];
            return o.time = this._parseTimeOrLabel(t),
            s = Math.abs(Number(o.time) - this._time) / this._timeScale || .001,
            a = new e(this,s,o),
            o.onStart = function() {
                a.target.paused(!0),
                a.vars.time !== a.target.time() && s === a.duration() && a.duration(Math.abs(a.vars.time - a.target.time()) / a.target._timeScale),
                i.onStart && i.onStart.apply(i.onStartScope || a, i.onStartParams || n)
            }
            ,
            a
        }
        ,
        _.tweenFromTo = function(t, e, i) {
            i = i || {},
            t = this._parseTimeOrLabel(t),
            i.startAt = {
                onComplete: this.seek,
                onCompleteParams: [t],
                onCompleteScope: this
            },
            i.immediateRender = i.immediateRender !== !1;
            var s = this.tweenTo(e, i);
            return s.duration(Math.abs(s.vars.time - t) / this._timeScale || .001)
        }
        ,
        _.render = function(t, e, i) {
            this._gc && this._enabled(!0, !1);
            var s, a, l, _, u, p, c = this._dirty ? this.totalDuration() : this._totalDuration, f = this._duration, m = this._time, d = this._totalTime, g = this._startTime, v = this._timeScale, y = this._rawPrevTime, T = this._paused, w = this._cycle;
            if (t >= c ? (this._locked || (this._totalTime = c,
            this._cycle = this._repeat),
            this._reversed || this._hasPausedChild() || (a = !0,
            _ = "onComplete",
            0 === this._duration && (0 === t || 0 > y || y === r) && y !== t && this._first && (u = !0,
            y > r && (_ = "onReverseComplete"))),
            this._rawPrevTime = this._duration || !e || t || this._rawPrevTime === t ? t : r,
            this._yoyo && 0 !== (1 & this._cycle) ? this._time = t = 0 : (this._time = f,
            t = f + 1e-4)) : 1e-7 > t ? (this._locked || (this._totalTime = this._cycle = 0),
            this._time = 0,
            (0 !== m || 0 === f && y !== r && (y > 0 || 0 > t && y >= 0) && !this._locked) && (_ = "onReverseComplete",
            a = this._reversed),
            0 > t ? (this._active = !1,
            y >= 0 && this._first && (u = !0),
            this._rawPrevTime = t) : (this._rawPrevTime = f || !e || t || this._rawPrevTime === t ? t : r,
            t = 0,
            this._initted || (u = !0))) : (0 === f && 0 > y && (u = !0),
            this._time = this._rawPrevTime = t,
            this._locked || (this._totalTime = t,
            0 !== this._repeat && (p = f + this._repeatDelay,
            this._cycle = this._totalTime / p >> 0,
            0 !== this._cycle && this._cycle === this._totalTime / p && this._cycle--,
            this._time = this._totalTime - this._cycle * p,
            this._yoyo && 0 !== (1 & this._cycle) && (this._time = f - this._time),
            this._time > f ? (this._time = f,
            t = f + 1e-4) : 0 > this._time ? this._time = t = 0 : t = this._time))),
            this._cycle !== w && !this._locked) {
                var x = this._yoyo && 0 !== (1 & w)
                  , b = x === (this._yoyo && 0 !== (1 & this._cycle))
                  , P = this._totalTime
                  , S = this._cycle
                  , k = this._rawPrevTime
                  , R = this._time;
                if (this._totalTime = w * f,
                w > this._cycle ? x = !x : this._totalTime += f,
                this._time = m,
                this._rawPrevTime = 0 === f ? y - 1e-4 : y,
                this._cycle = w,
                this._locked = !0,
                m = x ? 0 : f,
                this.render(m, e, 0 === f),
                e || this._gc || this.vars.onRepeat && this.vars.onRepeat.apply(this.vars.onRepeatScope || this, this.vars.onRepeatParams || n),
                b && (m = x ? f + 1e-4 : -1e-4,
                this.render(m, !0, !1)),
                this._locked = !1,
                this._paused && !T)
                    return;
                this._time = R,
                this._totalTime = P,
                this._cycle = S,
                this._rawPrevTime = k
            }
            if (!(this._time !== m && this._first || i || u))
                return d !== this._totalTime && this._onUpdate && (e || this._onUpdate.apply(this.vars.onUpdateScope || this, this.vars.onUpdateParams || n)),
                void 0;
            if (this._initted || (this._initted = !0),
            this._active || !this._paused && this._totalTime !== d && t > 0 && (this._active = !0),
            0 === d && this.vars.onStart && 0 !== this._totalTime && (e || this.vars.onStart.apply(this.vars.onStartScope || this, this.vars.onStartParams || n)),
            this._time >= m)
                for (s = this._first; s && (l = s._next,
                !this._paused || T); )
                    (s._active || s._startTime <= this._time && !s._paused && !s._gc) && (s._reversed ? s.render((s._dirty ? s.totalDuration() : s._totalDuration) - (t - s._startTime) * s._timeScale, e, i) : s.render((t - s._startTime) * s._timeScale, e, i)),
                    s = l;
            else
                for (s = this._last; s && (l = s._prev,
                !this._paused || T); )
                    (s._active || m >= s._startTime && !s._paused && !s._gc) && (s._reversed ? s.render((s._dirty ? s.totalDuration() : s._totalDuration) - (t - s._startTime) * s._timeScale, e, i) : s.render((t - s._startTime) * s._timeScale, e, i)),
                    s = l;
            this._onUpdate && (e || (o.length && h(),
            this._onUpdate.apply(this.vars.onUpdateScope || this, this.vars.onUpdateParams || n))),
            _ && (this._locked || this._gc || (g === this._startTime || v !== this._timeScale) && (0 === this._time || c >= this.totalDuration()) && (a && (o.length && h(),
            this._timeline.autoRemoveChildren && this._enabled(!1, !1),
            this._active = !1),
            !e && this.vars[_] && this.vars[_].apply(this.vars[_ + "Scope"] || this, this.vars[_ + "Params"] || n)))
        }
        ,
        _.getActive = function(t, e, i) {
            null == t && (t = !0),
            null == e && (e = !0),
            null == i && (i = !1);
            var s, r, n = [], a = this.getChildren(t, e, i), o = 0, h = a.length;
            for (s = 0; h > s; s++)
                r = a[s],
                r.isActive() && (n[o++] = r);
            return n
        }
        ,
        _.getLabelAfter = function(t) {
            t || 0 !== t && (t = this._time);
            var e, i = this.getLabelsArray(), s = i.length;
            for (e = 0; s > e; e++)
                if (i[e].time > t)
                    return i[e].name;
            return null
        }
        ,
        _.getLabelBefore = function(t) {
            null == t && (t = this._time);
            for (var e = this.getLabelsArray(), i = e.length; --i > -1; )
                if (t > e[i].time)
                    return e[i].name;
            return null
        }
        ,
        _.getLabelsArray = function() {
            var t, e = [], i = 0;
            for (t in this._labels)
                e[i++] = {
                    time: this._labels[t],
                    name: t
                };
            return e.sort(function(t, e) {
                return t.time - e.time
            }),
            e
        }
        ,
        _.progress = function(t, e) {
            return arguments.length ? this.totalTime(this.duration() * (this._yoyo && 0 !== (1 & this._cycle) ? 1 - t : t) + this._cycle * (this._duration + this._repeatDelay), e) : this._time / this.duration()
        }
        ,
        _.totalProgress = function(t, e) {
            return arguments.length ? this.totalTime(this.totalDuration() * t, e) : this._totalTime / this.totalDuration()
        }
        ,
        _.totalDuration = function(e) {
            return arguments.length ? -1 === this._repeat ? this : this.duration((e - this._repeat * this._repeatDelay) / (this._repeat + 1)) : (this._dirty && (t.prototype.totalDuration.call(this),
            this._totalDuration = -1 === this._repeat ? 999999999999 : this._duration * (this._repeat + 1) + this._repeatDelay * this._repeat),
            this._totalDuration)
        }
        ,
        _.time = function(t, e) {
            return arguments.length ? (this._dirty && this.totalDuration(),
            t > this._duration && (t = this._duration),
            this._yoyo && 0 !== (1 & this._cycle) ? t = this._duration - t + this._cycle * (this._duration + this._repeatDelay) : 0 !== this._repeat && (t += this._cycle * (this._duration + this._repeatDelay)),
            this.totalTime(t, e)) : this._time
        }
        ,
        _.repeat = function(t) {
            return arguments.length ? (this._repeat = t,
            this._uncache(!0)) : this._repeat
        }
        ,
        _.repeatDelay = function(t) {
            return arguments.length ? (this._repeatDelay = t,
            this._uncache(!0)) : this._repeatDelay
        }
        ,
        _.yoyo = function(t) {
            return arguments.length ? (this._yoyo = t,
            this) : this._yoyo
        }
        ,
        _.currentLabel = function(t) {
            return arguments.length ? this.seek(t, !0) : this.getLabelBefore(this._time + 1e-8)
        }
        ,
        s
    }, !0),
    function() {
        var t = 180 / Math.PI
          , e = []
          , i = []
          , s = []
          , r = {}
          , n = _gsScope._gsDefine.globals
          , a = function(t, e, i, s) {
            this.a = t,
            this.b = e,
            this.c = i,
            this.d = s,
            this.da = s - t,
            this.ca = i - t,
            this.ba = e - t
        }
          , o = ",x,y,z,left,top,right,bottom,marginTop,marginLeft,marginRight,marginBottom,paddingLeft,paddingTop,paddingRight,paddingBottom,backgroundPosition,backgroundPosition_y,"
          , h = function(t, e, i, s) {
            var r = {
                a: t
            }
              , n = {}
              , a = {}
              , o = {
                c: s
            }
              , h = (t + e) / 2
              , l = (e + i) / 2
              , _ = (i + s) / 2
              , u = (h + l) / 2
              , p = (l + _) / 2
              , c = (p - u) / 8;
            return r.b = h + (t - h) / 4,
            n.b = u + c,
            r.c = n.a = (r.b + n.b) / 2,
            n.c = a.a = (u + p) / 2,
            a.b = p - c,
            o.b = _ + (s - _) / 4,
            a.c = o.a = (a.b + o.b) / 2,
            [r, n, a, o]
        }
          , l = function(t, r, n, a, o) {
            var l, _, u, p, c, f, m, d, g, v, y, T, w, x = t.length - 1, b = 0, P = t[0].a;
            for (l = 0; x > l; l++)
                c = t[b],
                _ = c.a,
                u = c.d,
                p = t[b + 1].d,
                o ? (y = e[l],
                T = i[l],
                w = .25 * (T + y) * r / (a ? .5 : s[l] || .5),
                f = u - (u - _) * (a ? .5 * r : 0 !== y ? w / y : 0),
                m = u + (p - u) * (a ? .5 * r : 0 !== T ? w / T : 0),
                d = u - (f + ((m - f) * (3 * y / (y + T) + .5) / 4 || 0))) : (f = u - .5 * (u - _) * r,
                m = u + .5 * (p - u) * r,
                d = u - (f + m) / 2),
                f += d,
                m += d,
                c.c = g = f,
                c.b = 0 !== l ? P : P = c.a + .6 * (c.c - c.a),
                c.da = u - _,
                c.ca = g - _,
                c.ba = P - _,
                n ? (v = h(_, P, g, u),
                t.splice(b, 1, v[0], v[1], v[2], v[3]),
                b += 4) : b++,
                P = m;
            c = t[b],
            c.b = P,
            c.c = P + .4 * (c.d - P),
            c.da = c.d - c.a,
            c.ca = c.c - c.a,
            c.ba = P - c.a,
            n && (v = h(c.a, P, c.c, c.d),
            t.splice(b, 1, v[0], v[1], v[2], v[3]))
        }
          , _ = function(t, s, r, n) {
            var o, h, l, _, u, p, c = [];
            if (n)
                for (t = [n].concat(t),
                h = t.length; --h > -1; )
                    "string" == typeof (p = t[h][s]) && "=" === p.charAt(1) && (t[h][s] = n[s] + Number(p.charAt(0) + p.substr(2)));
            if (o = t.length - 2,
            0 > o)
                return c[0] = new a(t[0][s],0,0,t[-1 > o ? 0 : 1][s]),
                c;
            for (h = 0; o > h; h++)
                l = t[h][s],
                _ = t[h + 1][s],
                c[h] = new a(l,0,0,_),
                r && (u = t[h + 2][s],
                e[h] = (e[h] || 0) + (_ - l) * (_ - l),
                i[h] = (i[h] || 0) + (u - _) * (u - _));
            return c[h] = new a(t[h][s],0,0,t[h + 1][s]),
            c
        }
          , u = function(t, n, a, h, u, p) {
            var c, f, m, d, g, v, y, T, w = {}, x = [], b = p || t[0];
            u = "string" == typeof u ? "," + u + "," : o,
            null == n && (n = 1);
            for (f in t[0])
                x.push(f);
            if (t.length > 1) {
                for (T = t[t.length - 1],
                y = !0,
                c = x.length; --c > -1; )
                    if (f = x[c],
                    Math.abs(b[f] - T[f]) > .05) {
                        y = !1;
                        break
                    }
                y && (t = t.concat(),
                p && t.unshift(p),
                t.push(t[1]),
                p = t[t.length - 3])
            }
            for (e.length = i.length = s.length = 0,
            c = x.length; --c > -1; )
                f = x[c],
                r[f] = -1 !== u.indexOf("," + f + ","),
                w[f] = _(t, f, r[f], p);
            for (c = e.length; --c > -1; )
                e[c] = Math.sqrt(e[c]),
                i[c] = Math.sqrt(i[c]);
            if (!h) {
                for (c = x.length; --c > -1; )
                    if (r[f])
                        for (m = w[x[c]],
                        v = m.length - 1,
                        d = 0; v > d; d++)
                            g = m[d + 1].da / i[d] + m[d].da / e[d],
                            s[d] = (s[d] || 0) + g * g;
                for (c = s.length; --c > -1; )
                    s[c] = Math.sqrt(s[c])
            }
            for (c = x.length,
            d = a ? 4 : 1; --c > -1; )
                f = x[c],
                m = w[f],
                l(m, n, a, h, r[f]),
                y && (m.splice(0, d),
                m.splice(m.length - d, d));
            return w
        }
          , p = function(t, e, i) {
            e = e || "soft";
            var s, r, n, o, h, l, _, u, p, c, f, m = {}, d = "cubic" === e ? 3 : 2, g = "soft" === e, v = [];
            if (g && i && (t = [i].concat(t)),
            null == t || d + 1 > t.length)
                throw "invalid Bezier data";
            for (p in t[0])
                v.push(p);
            for (l = v.length; --l > -1; ) {
                for (p = v[l],
                m[p] = h = [],
                c = 0,
                u = t.length,
                _ = 0; u > _; _++)
                    s = null == i ? t[_][p] : "string" == typeof (f = t[_][p]) && "=" === f.charAt(1) ? i[p] + Number(f.charAt(0) + f.substr(2)) : Number(f),
                    g && _ > 1 && u - 1 > _ && (h[c++] = (s + h[c - 2]) / 2),
                    h[c++] = s;
                for (u = c - d + 1,
                c = 0,
                _ = 0; u > _; _ += d)
                    s = h[_],
                    r = h[_ + 1],
                    n = h[_ + 2],
                    o = 2 === d ? 0 : h[_ + 3],
                    h[c++] = f = 3 === d ? new a(s,r,n,o) : new a(s,(2 * r + s) / 3,(2 * r + n) / 3,n);
                h.length = c
            }
            return m
        }
          , c = function(t, e, i) {
            for (var s, r, n, a, o, h, l, _, u, p, c, f = 1 / i, m = t.length; --m > -1; )
                for (p = t[m],
                n = p.a,
                a = p.d - n,
                o = p.c - n,
                h = p.b - n,
                s = r = 0,
                _ = 1; i >= _; _++)
                    l = f * _,
                    u = 1 - l,
                    s = r - (r = (l * l * a + 3 * u * (l * o + u * h)) * l),
                    c = m * i + _ - 1,
                    e[c] = (e[c] || 0) + s * s
        }
          , f = function(t, e) {
            e = e >> 0 || 6;
            var i, s, r, n, a = [], o = [], h = 0, l = 0, _ = e - 1, u = [], p = [];
            for (i in t)
                c(t[i], a, e);
            for (r = a.length,
            s = 0; r > s; s++)
                h += Math.sqrt(a[s]),
                n = s % e,
                p[n] = h,
                n === _ && (l += h,
                n = s / e >> 0,
                u[n] = p,
                o[n] = l,
                h = 0,
                p = []);
            return {
                length: l,
                lengths: o,
                segments: u
            }
        }
          , m = _gsScope._gsDefine.plugin({
            propName: "bezier",
            priority: -1,
            version: "1.3.4",
            API: 2,
            global: !0,
            init: function(t, e, i) {
                this._target = t,
                e instanceof Array && (e = {
                    values: e
                }),
                this._func = {},
                this._round = {},
                this._props = [],
                this._timeRes = null == e.timeResolution ? 6 : parseInt(e.timeResolution, 10);
                var s, r, n, a, o, h = e.values || [], l = {}, _ = h[0], c = e.autoRotate || i.vars.orientToBezier;
                this._autoRotate = c ? c instanceof Array ? c : [["x", "y", "rotation", c === !0 ? 0 : Number(c) || 0]] : null;
                for (s in _)
                    this._props.push(s);
                for (n = this._props.length; --n > -1; )
                    s = this._props[n],
                    this._overwriteProps.push(s),
                    r = this._func[s] = "function" == typeof t[s],
                    l[s] = r ? t[s.indexOf("set") || "function" != typeof t["get" + s.substr(3)] ? s : "get" + s.substr(3)]() : parseFloat(t[s]),
                    o || l[s] !== h[0][s] && (o = l);
                if (this._beziers = "cubic" !== e.type && "quadratic" !== e.type && "soft" !== e.type ? u(h, isNaN(e.curviness) ? 1 : e.curviness, !1, "thruBasic" === e.type, e.correlate, o) : p(h, e.type, l),
                this._segCount = this._beziers[s].length,
                this._timeRes) {
                    var m = f(this._beziers, this._timeRes);
                    this._length = m.length,
                    this._lengths = m.lengths,
                    this._segments = m.segments,
                    this._l1 = this._li = this._s1 = this._si = 0,
                    this._l2 = this._lengths[0],
                    this._curSeg = this._segments[0],
                    this._s2 = this._curSeg[0],
                    this._prec = 1 / this._curSeg.length
                }
                if (c = this._autoRotate)
                    for (this._initialRotations = [],
                    c[0]instanceof Array || (this._autoRotate = c = [c]),
                    n = c.length; --n > -1; ) {
                        for (a = 0; 3 > a; a++)
                            s = c[n][a],
                            this._func[s] = "function" == typeof t[s] ? t[s.indexOf("set") || "function" != typeof t["get" + s.substr(3)] ? s : "get" + s.substr(3)] : !1;
                        s = c[n][2],
                        this._initialRotations[n] = this._func[s] ? this._func[s].call(this._target) : this._target[s]
                    }
                return this._startRatio = i.vars.runBackwards ? 1 : 0,
                !0
            },
            set: function(e) {
                var i, s, r, n, a, o, h, l, _, u, p = this._segCount, c = this._func, f = this._target, m = e !== this._startRatio;
                if (this._timeRes) {
                    if (_ = this._lengths,
                    u = this._curSeg,
                    e *= this._length,
                    r = this._li,
                    e > this._l2 && p - 1 > r) {
                        for (l = p - 1; l > r && e >= (this._l2 = _[++r]); )
                            ;
                        this._l1 = _[r - 1],
                        this._li = r,
                        this._curSeg = u = this._segments[r],
                        this._s2 = u[this._s1 = this._si = 0]
                    } else if (this._l1 > e && r > 0) {
                        for (; r > 0 && (this._l1 = _[--r]) >= e; )
                            ;
                        0 === r && this._l1 > e ? this._l1 = 0 : r++,
                        this._l2 = _[r],
                        this._li = r,
                        this._curSeg = u = this._segments[r],
                        this._s1 = u[(this._si = u.length - 1) - 1] || 0,
                        this._s2 = u[this._si]
                    }
                    if (i = r,
                    e -= this._l1,
                    r = this._si,
                    e > this._s2 && u.length - 1 > r) {
                        for (l = u.length - 1; l > r && e >= (this._s2 = u[++r]); )
                            ;
                        this._s1 = u[r - 1],
                        this._si = r
                    } else if (this._s1 > e && r > 0) {
                        for (; r > 0 && (this._s1 = u[--r]) >= e; )
                            ;
                        0 === r && this._s1 > e ? this._s1 = 0 : r++,
                        this._s2 = u[r],
                        this._si = r
                    }
                    o = (r + (e - this._s1) / (this._s2 - this._s1)) * this._prec
                } else
                    i = 0 > e ? 0 : e >= 1 ? p - 1 : p * e >> 0,
                    o = (e - i * (1 / p)) * p;
                for (s = 1 - o,
                r = this._props.length; --r > -1; )
                    n = this._props[r],
                    a = this._beziers[n][i],
                    h = (o * o * a.da + 3 * s * (o * a.ca + s * a.ba)) * o + a.a,
                    this._round[n] && (h = Math.round(h)),
                    c[n] ? f[n](h) : f[n] = h;
                if (this._autoRotate) {
                    var d, g, v, y, T, w, x, b = this._autoRotate;
                    for (r = b.length; --r > -1; )
                        n = b[r][2],
                        w = b[r][3] || 0,
                        x = b[r][4] === !0 ? 1 : t,
                        a = this._beziers[b[r][0]],
                        d = this._beziers[b[r][1]],
                        a && d && (a = a[i],
                        d = d[i],
                        g = a.a + (a.b - a.a) * o,
                        y = a.b + (a.c - a.b) * o,
                        g += (y - g) * o,
                        y += (a.c + (a.d - a.c) * o - y) * o,
                        v = d.a + (d.b - d.a) * o,
                        T = d.b + (d.c - d.b) * o,
                        v += (T - v) * o,
                        T += (d.c + (d.d - d.c) * o - T) * o,
                        h = m ? Math.atan2(T - v, y - g) * x + w : this._initialRotations[r],
                        c[n] ? f[n](h) : f[n] = h)
                }
            }
        })
          , d = m.prototype;
        m.bezierThrough = u,
        m.cubicToQuadratic = h,
        m._autoCSS = !0,
        m.quadraticToCubic = function(t, e, i) {
            return new a(t,(2 * e + t) / 3,(2 * e + i) / 3,i)
        }
        ,
        m._cssRegister = function() {
            var t = n.CSSPlugin;
            if (t) {
                var e = t._internals
                  , i = e._parseToProxy
                  , s = e._setPluginRatio
                  , r = e.CSSPropTween;
                e._registerComplexSpecialProp("bezier", {
                    parser: function(t, e, n, a, o, h) {
                        e instanceof Array && (e = {
                            values: e
                        }),
                        h = new m;
                        var l, _, u, p = e.values, c = p.length - 1, f = [], d = {};
                        if (0 > c)
                            return o;
                        for (l = 0; c >= l; l++)
                            u = i(t, p[l], a, o, h, c !== l),
                            f[l] = u.end;
                        for (_ in e)
                            d[_] = e[_];
                        return d.values = f,
                        o = new r(t,"bezier",0,0,u.pt,2),
                        o.data = u,
                        o.plugin = h,
                        o.setRatio = s,
                        0 === d.autoRotate && (d.autoRotate = !0),
                        !d.autoRotate || d.autoRotate instanceof Array || (l = d.autoRotate === !0 ? 0 : Number(d.autoRotate),
                        d.autoRotate = null != u.end.left ? [["left", "top", "rotation", l, !1]] : null != u.end.x ? [["x", "y", "rotation", l, !1]] : !1),
                        d.autoRotate && (a._transform || a._enableTransforms(!1),
                        u.autoRotate = a._target._gsTransform),
                        h._onInitTween(u.proxy, d, a._tween),
                        o
                    }
                })
            }
        }
        ,
        d._roundProps = function(t, e) {
            for (var i = this._overwriteProps, s = i.length; --s > -1; )
                (t[i[s]] || t.bezier || t.bezierThrough) && (this._round[i[s]] = e)
        }
        ,
        d._kill = function(t) {
            var e, i, s = this._props;
            for (e in this._beziers)
                if (e in t)
                    for (delete this._beziers[e],
                    delete this._func[e],
                    i = s.length; --i > -1; )
                        s[i] === e && s.splice(i, 1);
            return this._super._kill.call(this, t)
        }
    }(),
    _gsScope._gsDefine("plugins.CSSPlugin", ["plugins.TweenPlugin", "TweenLite"], function(t, e) {
        var i, s, r, n, a = function() {
            t.call(this, "css"),
            this._overwriteProps.length = 0,
            this.setRatio = a.prototype.setRatio
        }, o = _gsScope._gsDefine.globals, h = {}, l = a.prototype = new t("css");
        l.constructor = a,
        a.version = "1.15.0",
        a.API = 2,
        a.defaultTransformPerspective = 0,
        a.defaultSkewType = "compensated",
        l = "px",
        a.suffixMap = {
            top: l,
            right: l,
            bottom: l,
            left: l,
            width: l,
            height: l,
            fontSize: l,
            padding: l,
            margin: l,
            perspective: l,
            lineHeight: ""
        };
        var _, u, p, c, f, m, d = /(?:\d|\-\d|\.\d|\-\.\d)+/g, g = /(?:\d|\-\d|\.\d|\-\.\d|\+=\d|\-=\d|\+=.\d|\-=\.\d)+/g, v = /(?:\+=|\-=|\-|\b)[\d\-\.]+[a-zA-Z0-9]*(?:%|\b)/gi, y = /(?![+-]?\d*\.?\d+|[+-]|e[+-]\d+)[^0-9]/g, T = /(?:\d|\-|\+|=|#|\.)*/g, w = /opacity *= *([^)]*)/i, x = /opacity:([^;]*)/i, b = /alpha\(opacity *=.+?\)/i, P = /^(rgb|hsl)/, S = /([A-Z])/g, k = /-([a-z])/gi, R = /(^(?:url\(\"|url\())|(?:(\"\))$|\)$)/gi, A = function(t, e) {
            return e.toUpperCase()
        }, C = /(?:Left|Right|Width)/i, O = /(M11|M12|M21|M22)=[\d\-\.e]+/gi, D = /progid\:DXImageTransform\.Microsoft\.Matrix\(.+?\)/i, M = /,(?=[^\)]*(?:\(|$))/gi, z = Math.PI / 180, I = 180 / Math.PI, E = {}, F = document, N = function(t) {
            return F.createElementNS ? F.createElementNS("http://www.w3.org/1999/xhtml", t) : F.createElement(t)
        }, L = N("div"), X = N("img"), U = a._internals = {
            _specialProps: h
        }, Y = navigator.userAgent, B = function() {
            var t = Y.indexOf("Android")
              , e = N("a");
            return p = -1 !== Y.indexOf("Safari") && -1 === Y.indexOf("Chrome") && (-1 === t || Number(Y.substr(t + 8, 1)) > 3),
            f = p && 6 > Number(Y.substr(Y.indexOf("Version/index.html") + 8, 1)),
            c = -1 !== Y.indexOf("Firefox"),
            (/MSIE ([0-9]{1,}[\.0-9]{0,})/.exec(Y) || /Trident\/.*rv:([0-9]{1,}[\.0-9]{0,})/.exec(Y)) && (m = parseFloat(RegExp.$1)),
            e ? (e.style.cssText = "top:1px;opacity:.55;",
            /^0.55/.test(e.style.opacity)) : !1
        }(), j = function(t) {
            return w.test("string" == typeof t ? t : (t.currentStyle ? t.currentStyle.filter : t.style.filter) || "") ? parseFloat(RegExp.$1) / 100 : 1
        }, q = function(t) {
            window.console && console.log(t)
        }, V = "", G = "", W = function(t, e) {
            e = e || L;
            var i, s, r = e.style;
            if (void 0 !== r[t])
                return t;
            for (t = t.charAt(0).toUpperCase() + t.substr(1),
            i = ["O", "Moz", "ms", "Ms", "Webkit"],
            s = 5; --s > -1 && void 0 === r[i[s] + t]; )
                ;
            return s >= 0 ? (G = 3 === s ? "ms" : i[s],
            V = "-" + G.toLowerCase() + "-",
            G + t) : null
        }, Z = F.defaultView ? F.defaultView.getComputedStyle : function() {}
        , Q = a.getStyle = function(t, e, i, s, r) {
            var n;
            return B || "opacity" !== e ? (!s && t.style[e] ? n = t.style[e] : (i = i || Z(t)) ? n = i[e] || i.getPropertyValue(e) || i.getPropertyValue(e.replace(S, "-$1").toLowerCase()) : t.currentStyle && (n = t.currentStyle[e]),
            null == r || n && "none" !== n && "auto" !== n && "auto auto" !== n ? n : r) : j(t)
        }
        , $ = U.convertToPixels = function(t, i, s, r, n) {
            if ("px" === r || !r)
                return s;
            if ("auto" === r || !s)
                return 0;
            var o, h, l, _ = C.test(i), u = t, p = L.style, c = 0 > s;
            if (c && (s = -s),
            "%" === r && -1 !== i.indexOf("border"))
                o = s / 100 * (_ ? t.clientWidth : t.clientHeight);
            else {
                if (p.cssText = "border:0 solid red;position:" + Q(t, "position") + ";line-height:0;",
                "%" !== r && u.appendChild)
                    p[_ ? "borderLeftWidth" : "borderTopWidth"] = s + r;
                else {
                    if (u = t.parentNode || F.body,
                    h = u._gsCache,
                    l = e.ticker.frame,
                    h && _ && h.time === l)
                        return h.width * s / 100;
                    p[_ ? "width" : "height"] = s + r
                }
                u.appendChild(L),
                o = parseFloat(L[_ ? "offsetWidth" : "offsetHeight"]),
                u.removeChild(L),
                _ && "%" === r && a.cacheWidths !== !1 && (h = u._gsCache = u._gsCache || {},
                h.time = l,
                h.width = 100 * (o / s)),
                0 !== o || n || (o = $(t, i, s, r, !0))
            }
            return c ? -o : o
        }
        , H = U.calculateOffset = function(t, e, i) {
            if ("absolute" !== Q(t, "position", i))
                return 0;
            var s = "left" === e ? "Left" : "Top"
              , r = Q(t, "margin" + s, i);
            return t["offset" + s] - ($(t, e, parseFloat(r), r.replace(T, "")) || 0)
        }
        , K = function(t, e) {
            var i, s, r = {};
            if (e = e || Z(t, null))
                if (i = e.length)
                    for (; --i > -1; )
                        r[e[i].replace(k, A)] = e.getPropertyValue(e[i]);
                else
                    for (i in e)
                        r[i] = e[i];
            else if (e = t.currentStyle || t.style)
                for (i in e)
                    "string" == typeof i && void 0 === r[i] && (r[i.replace(k, A)] = e[i]);
            return B || (r.opacity = j(t)),
            s = Me(t, e, !1),
            r.rotation = s.rotation,
            r.skewX = s.skewX,
            r.scaleX = s.scaleX,
            r.scaleY = s.scaleY,
            r.x = s.x,
            r.y = s.y,
            Se && (r.z = s.z,
            r.rotationX = s.rotationX,
            r.rotationY = s.rotationY,
            r.scaleZ = s.scaleZ),
            r.filters && delete r.filters,
            r
        }, J = function(t, e, i, s, r) {
            var n, a, o, h = {}, l = t.style;
            for (a in i)
                "cssText" !== a && "length" !== a && isNaN(a) && (e[a] !== (n = i[a]) || r && r[a]) && -1 === a.indexOf("Origin") && ("number" == typeof n || "string" == typeof n) && (h[a] = "auto" !== n || "left" !== a && "top" !== a ? "" !== n && "auto" !== n && "none" !== n || "string" != typeof e[a] || "" === e[a].replace(y, "") ? n : 0 : H(t, a),
                void 0 !== l[a] && (o = new ce(l,a,l[a],o)));
            if (s)
                for (a in s)
                    "className" !== a && (h[a] = s[a]);
            return {
                difs: h,
                firstMPT: o
            }
        }, te = {
            width: ["Left", "Right"],
            height: ["Top", "Bottom"]
        }, ee = ["marginLeft", "marginRight", "marginTop", "marginBottom"], ie = function(t, e, i) {
            var s = parseFloat("width" === e ? t.offsetWidth : t.offsetHeight)
              , r = te[e]
              , n = r.length;
            for (i = i || Z(t, null); --n > -1; )
                s -= parseFloat(Q(t, "padding" + r[n], i, !0)) || 0,
                s -= parseFloat(Q(t, "border" + r[n] + "Width", i, !0)) || 0;
            return s
        }, se = function(t, e) {
            (null == t || "" === t || "auto" === t || "auto auto" === t) && (t = "0 0");
            var i = t.split(" ")
              , s = -1 !== t.indexOf("left") ? "0%" : -1 !== t.indexOf("right") ? "100%" : i[0]
              , r = -1 !== t.indexOf("top") ? "0%" : -1 !== t.indexOf("bottom") ? "100%" : i[1];
            return null == r ? r = "0" : "center" === r && (r = "50%"),
            ("center" === s || isNaN(parseFloat(s)) && -1 === (s + "").indexOf("=")) && (s = "50%"),
            e && (e.oxp = -1 !== s.indexOf("%"),
            e.oyp = -1 !== r.indexOf("%"),
            e.oxr = "=" === s.charAt(1),
            e.oyr = "=" === r.charAt(1),
            e.ox = parseFloat(s.replace(y, "")),
            e.oy = parseFloat(r.replace(y, ""))),
            s + " " + r + (i.length > 2 ? " " + i[2] : "")
        }, re = function(t, e) {
            return "string" == typeof t && "=" === t.charAt(1) ? parseInt(t.charAt(0) + "1", 10) * parseFloat(t.substr(2)) : parseFloat(t) - parseFloat(e)
        }, ne = function(t, e) {
            return null == t ? e : "string" == typeof t && "=" === t.charAt(1) ? parseInt(t.charAt(0) + "1", 10) * parseFloat(t.substr(2)) + e : parseFloat(t)
        }, ae = function(t, e, i, s) {
            var r, n, a, o, h = 1e-6;
            return null == t ? o = e : "number" == typeof t ? o = t : (r = 360,
            n = t.split("_"),
            a = Number(n[0].replace(y, "")) * (-1 === t.indexOf("rad") ? 1 : I) - ("=" === t.charAt(1) ? 0 : e),
            n.length && (s && (s[i] = e + a),
            -1 !== t.indexOf("short") && (a %= r,
            a !== a % (r / 2) && (a = 0 > a ? a + r : a - r)),
            -1 !== t.indexOf("_cw") && 0 > a ? a = (a + 9999999999 * r) % r - (0 | a / r) * r : -1 !== t.indexOf("ccw") && a > 0 && (a = (a - 9999999999 * r) % r - (0 | a / r) * r)),
            o = e + a),
            h > o && o > -h && (o = 0),
            o
        }, oe = {
            aqua: [0, 255, 255],
            lime: [0, 255, 0],
            silver: [192, 192, 192],
            black: [0, 0, 0],
            maroon: [128, 0, 0],
            teal: [0, 128, 128],
            blue: [0, 0, 255],
            navy: [0, 0, 128],
            white: [255, 255, 255],
            fuchsia: [255, 0, 255],
            olive: [128, 128, 0],
            yellow: [255, 255, 0],
            orange: [255, 165, 0],
            gray: [128, 128, 128],
            purple: [128, 0, 128],
            green: [0, 128, 0],
            red: [255, 0, 0],
            pink: [255, 192, 203],
            cyan: [0, 255, 255],
            transparent: [255, 255, 255, 0]
        }, he = function(t, e, i) {
            return t = 0 > t ? t + 1 : t > 1 ? t - 1 : t,
            0 | 255 * (1 > 6 * t ? e + 6 * (i - e) * t : .5 > t ? i : 2 > 3 * t ? e + 6 * (i - e) * (2 / 3 - t) : e) + .5
        }, le = a.parseColor = function(t) {
            var e, i, s, r, n, a;
            return t && "" !== t ? "number" == typeof t ? [t >> 16, 255 & t >> 8, 255 & t] : ("," === t.charAt(t.length - 1) && (t = t.substr(0, t.length - 1)),
            oe[t] ? oe[t] : "#" === t.charAt(0) ? (4 === t.length && (e = t.charAt(1),
            i = t.charAt(2),
            s = t.charAt(3),
            t = "#" + e + e + i + i + s + s),
            t = parseInt(t.substr(1), 16),
            [t >> 16, 255 & t >> 8, 255 & t]) : "hsl" === t.substr(0, 3) ? (t = t.match(d),
            r = Number(t[0]) % 360 / 360,
            n = Number(t[1]) / 100,
            a = Number(t[2]) / 100,
            i = .5 >= a ? a * (n + 1) : a + n - a * n,
            e = 2 * a - i,
            t.length > 3 && (t[3] = Number(t[3])),
            t[0] = he(r + 1 / 3, e, i),
            t[1] = he(r, e, i),
            t[2] = he(r - 1 / 3, e, i),
            t) : (t = t.match(d) || oe.transparent,
            t[0] = Number(t[0]),
            t[1] = Number(t[1]),
            t[2] = Number(t[2]),
            t.length > 3 && (t[3] = Number(t[3])),
            t)) : oe.black
        }
        , _e = "(?:\\b(?:(?:rgb|rgba|hsl|hsla)\\(.+?\\))|\\B#.+?\\b";
        for (l in oe)
            _e += "|" + l + "\\b";
        _e = RegExp(_e + ")", "gi");
        var ue = function(t, e, i, s) {
            if (null == t)
                return function(t) {
                    return t
                }
                ;
            var r, n = e ? (t.match(_e) || [""])[0] : "", a = t.split(n).join("").match(v) || [], o = t.substr(0, t.indexOf(a[0])), h = ")" === t.charAt(t.length - 1) ? ")" : "", l = -1 !== t.indexOf(" ") ? " " : ",", _ = a.length, u = _ > 0 ? a[0].replace(d, "") : "";
            return _ ? r = e ? function(t) {
                var e, p, c, f;
                if ("number" == typeof t)
                    t += u;
                else if (s && M.test(t)) {
                    for (f = t.replace(M, "|").split("|"),
                    c = 0; f.length > c; c++)
                        f[c] = r(f[c]);
                    return f.join(",")
                }
                if (e = (t.match(_e) || [n])[0],
                p = t.split(e).join("").match(v) || [],
                c = p.length,
                _ > c--)
                    for (; _ > ++c; )
                        p[c] = i ? p[0 | (c - 1) / 2] : a[c];
                return o + p.join(l) + l + e + h + (-1 !== t.indexOf("inset") ? " inset" : "")
            }
            : function(t) {
                var e, n, p;
                if ("number" == typeof t)
                    t += u;
                else if (s && M.test(t)) {
                    for (n = t.replace(M, "|").split("|"),
                    p = 0; n.length > p; p++)
                        n[p] = r(n[p]);
                    return n.join(",")
                }
                if (e = t.match(v) || [],
                p = e.length,
                _ > p--)
                    for (; _ > ++p; )
                        e[p] = i ? e[0 | (p - 1) / 2] : a[p];
                return o + e.join(l) + h
            }
            : function(t) {
                return t
            }
        }
          , pe = function(t) {
            return t = t.split(","),
            function(e, i, s, r, n, a, o) {
                var h, l = (i + "").split(" ");
                for (o = {},
                h = 0; 4 > h; h++)
                    o[t[h]] = l[h] = l[h] || l[(h - 1) / 2 >> 0];
                return r.parse(e, o, n, a)
            }
        }
          , ce = (U._setPluginRatio = function(t) {
            this.plugin.setRatio(t);
            for (var e, i, s, r, n = this.data, a = n.proxy, o = n.firstMPT, h = 1e-6; o; )
                e = a[o.v],
                o.r ? e = Math.round(e) : h > e && e > -h && (e = 0),
                o.t[o.p] = e,
                o = o._next;
            if (n.autoRotate && (n.autoRotate.rotation = a.rotation),
            1 === t)
                for (o = n.firstMPT; o; ) {
                    if (i = o.t,
                    i.type) {
                        if (1 === i.type) {
                            for (r = i.xs0 + i.s + i.xs1,
                            s = 1; i.l > s; s++)
                                r += i["xn" + s] + i["xs" + (s + 1)];
                            i.e = r
                        }
                    } else
                        i.e = i.s + i.xs0;
                    o = o._next
                }
        }
        ,
        function(t, e, i, s, r) {
            this.t = t,
            this.p = e,
            this.v = i,
            this.r = r,
            s && (s._prev = this,
            this._next = s)
        }
        )
          , fe = (U._parseToProxy = function(t, e, i, s, r, n) {
            var a, o, h, l, _, u = s, p = {}, c = {}, f = i._transform, m = E;
            for (i._transform = null,
            E = e,
            s = _ = i.parse(t, e, s, r),
            E = m,
            n && (i._transform = f,
            u && (u._prev = null,
            u._prev && (u._prev._next = null))); s && s !== u; ) {
                if (1 >= s.type && (o = s.p,
                c[o] = s.s + s.c,
                p[o] = s.s,
                n || (l = new ce(s,"s",o,l,s.r),
                s.c = 0),
                1 === s.type))
                    for (a = s.l; --a > 0; )
                        h = "xn" + a,
                        o = s.p + "_" + h,
                        c[o] = s.data[h],
                        p[o] = s[h],
                        n || (l = new ce(s,h,o,l,s.rxp[h]));
                s = s._next
            }
            return {
                proxy: p,
                end: c,
                firstMPT: l,
                pt: _
            }
        }
        ,
        U.CSSPropTween = function(t, e, s, r, a, o, h, l, _, u, p) {
            this.t = t,
            this.p = e,
            this.s = s,
            this.c = r,
            this.n = h || e,
            t instanceof fe || n.push(this.n),
            this.r = l,
            this.type = o || 0,
            _ && (this.pr = _,
            i = !0),
            this.b = void 0 === u ? s : u,
            this.e = void 0 === p ? s + r : p,
            a && (this._next = a,
            a._prev = this)
        }
        )
          , me = a.parseComplex = function(t, e, i, s, r, n, a, o, h, l) {
            i = i || n || "",
            a = new fe(t,e,0,0,a,l ? 2 : 1,null,!1,o,i,s),
            s += "";
            var u, p, c, f, m, v, y, T, w, x, b, S, k = i.split(", ").join(",").split(" "), R = s.split(", ").join(",").split(" "), A = k.length, C = _ !== !1;
            for ((-1 !== s.indexOf(",") || -1 !== i.indexOf(",")) && (k = k.join(" ").replace(M, ", ").split(" "),
            R = R.join(" ").replace(M, ", ").split(" "),
            A = k.length),
            A !== R.length && (k = (n || "").split(" "),
            A = k.length),
            a.plugin = h,
            a.setRatio = l,
            u = 0; A > u; u++)
                if (f = k[u],
                m = R[u],
                T = parseFloat(f),
                T || 0 === T)
                    a.appendXtra("", T, re(m, T), m.replace(g, ""), C && -1 !== m.indexOf("px"), !0);
                else if (r && ("#" === f.charAt(0) || oe[f] || P.test(f)))
                    S = "," === m.charAt(m.length - 1) ? ")," : ")",
                    f = le(f),
                    m = le(m),
                    w = f.length + m.length > 6,
                    w && !B && 0 === m[3] ? (a["xs" + a.l] += a.l ? " transparent" : "transparent",
                    a.e = a.e.split(R[u]).join("transparent")) : (B || (w = !1),
                    a.appendXtra(w ? "rgba(" : "rgb(", f[0], m[0] - f[0], ",", !0, !0).appendXtra("", f[1], m[1] - f[1], ",", !0).appendXtra("", f[2], m[2] - f[2], w ? "," : S, !0),
                    w && (f = 4 > f.length ? 1 : f[3],
                    a.appendXtra("", f, (4 > m.length ? 1 : m[3]) - f, S, !1)));
                else if (v = f.match(d)) {
                    if (y = m.match(g),
                    !y || y.length !== v.length)
                        return a;
                    for (c = 0,
                    p = 0; v.length > p; p++)
                        b = v[p],
                        x = f.indexOf(b, c),
                        a.appendXtra(f.substr(c, x - c), Number(b), re(y[p], b), "", C && "px" === f.substr(x + b.length, 2), 0 === p),
                        c = x + b.length;
                    a["xs" + a.l] += f.substr(c)
                } else
                    a["xs" + a.l] += a.l ? " " + f : f;
            if (-1 !== s.indexOf("=") && a.data) {
                for (S = a.xs0 + a.data.s,
                u = 1; a.l > u; u++)
                    S += a["xs" + u] + a.data["xn" + u];
                a.e = S + a["xs" + u]
            }
            return a.l || (a.type = -1,
            a.xs0 = a.e),
            a.xfirst || a
        }
          , de = 9;
        for (l = fe.prototype,
        l.l = l.pr = 0; --de > 0; )
            l["xn" + de] = 0,
            l["xs" + de] = "";
        l.xs0 = "",
        l._next = l._prev = l.xfirst = l.data = l.plugin = l.setRatio = l.rxp = null,
        l.appendXtra = function(t, e, i, s, r, n) {
            var a = this
              , o = a.l;
            return a["xs" + o] += n && o ? " " + t : t || "",
            i || 0 === o || a.plugin ? (a.l++,
            a.type = a.setRatio ? 2 : 1,
            a["xs" + a.l] = s || "",
            o > 0 ? (a.data["xn" + o] = e + i,
            a.rxp["xn" + o] = r,
            a["xn" + o] = e,
            a.plugin || (a.xfirst = new fe(a,"xn" + o,e,i,a.xfirst || a,0,a.n,r,a.pr),
            a.xfirst.xs0 = 0),
            a) : (a.data = {
                s: e + i
            },
            a.rxp = {},
            a.s = e,
            a.c = i,
            a.r = r,
            a)) : (a["xs" + o] += e + (s || ""),
            a)
        }
        ;
        var ge = function(t, e) {
            e = e || {},
            this.p = e.prefix ? W(t) || t : t,
            h[t] = h[this.p] = this,
            this.format = e.formatter || ue(e.defaultValue, e.color, e.collapsible, e.multi),
            e.parser && (this.parse = e.parser),
            this.clrs = e.color,
            this.multi = e.multi,
            this.keyword = e.keyword,
            this.dflt = e.defaultValue,
            this.pr = e.priority || 0
        }
          , ve = U._registerComplexSpecialProp = function(t, e, i) {
            "object" != typeof e && (e = {
                parser: i
            });
            var s, r, n = t.split(","), a = e.defaultValue;
            for (i = i || [a],
            s = 0; n.length > s; s++)
                e.prefix = 0 === s && e.prefix,
                e.defaultValue = i[s] || a,
                r = new ge(n[s],e)
        }
          , ye = function(t) {
            if (!h[t]) {
                var e = t.charAt(0).toUpperCase() + t.substr(1) + "Plugin";
                ve(t, {
                    parser: function(t, i, s, r, n, a, l) {
                        var _ = o.com.greensock.plugins[e];
                        return _ ? (_._cssRegister(),
                        h[s].parse(t, i, s, r, n, a, l)) : (q("Error: " + e + " js file not loaded."),
                        n)
                    }
                })
            }
        };
        l = ge.prototype,
        l.parseComplex = function(t, e, i, s, r, n) {
            var a, o, h, l, _, u, p = this.keyword;
            if (this.multi && (M.test(i) || M.test(e) ? (o = e.replace(M, "|").split("|"),
            h = i.replace(M, "|").split("|")) : p && (o = [e],
            h = [i])),
            h) {
                for (l = h.length > o.length ? h.length : o.length,
                a = 0; l > a; a++)
                    e = o[a] = o[a] || this.dflt,
                    i = h[a] = h[a] || this.dflt,
                    p && (_ = e.indexOf(p),
                    u = i.indexOf(p),
                    _ !== u && (i = -1 === u ? h : o,
                    i[a] += " " + p));
                e = o.join(", "),
                i = h.join(", ")
            }
            return me(t, this.p, e, i, this.clrs, this.dflt, s, this.pr, r, n)
        }
        ,
        l.parse = function(t, e, i, s, n, a) {
            return this.parseComplex(t.style, this.format(Q(t, this.p, r, !1, this.dflt)), this.format(e), n, a)
        }
        ,
        a.registerSpecialProp = function(t, e, i) {
            ve(t, {
                parser: function(t, s, r, n, a, o) {
                    var h = new fe(t,r,0,0,a,2,r,!1,i);
                    return h.plugin = o,
                    h.setRatio = e(t, s, n._tween, r),
                    h
                },
                priority: i
            })
        }
        ;
        var Te, we = "scaleX,scaleY,scaleZ,x,y,z,skewX,skewY,rotation,rotationX,rotationY,perspective,xPercent,yPercent".split(","), xe = W("transform"), be = V + "transform", Pe = W("transformOrigin"), Se = null !== W("perspective"), ke = U.Transform = function() {
            this.perspective = parseFloat(a.defaultTransformPerspective) || 0,
            this.force3D = a.defaultForce3D !== !1 && Se ? a.defaultForce3D || "auto" : !1
        }
        , Re = window.SVGElement, Ae = function(t, e, i) {
            var s, r = F.createElementNS("http://www.w3.org/2000/svg", t), n = /([a-z])([A-Z])/g;
            for (s in i)
                r.setAttributeNS(null, s.replace(n, "$1-$2").toLowerCase(), i[s]);
            return e.appendChild(r),
            r
        }, Ce = document.documentElement, Oe = function() {
            var t, e, i, s = m || /Android/i.test(Y) && !window.chrome;
            return F.createElementNS && !s && (t = Ae("svg", Ce),
            e = Ae("rect", t, {
                width: 100,
                height: 50,
                x: 100
            }),
            i = e.getBoundingClientRect().width,
            e.style[Pe] = "50% 50%",
            e.style[xe] = "scaleX(0.5)",
            s = i === e.getBoundingClientRect().width,
            Ce.removeChild(t)),
            s
        }(), De = function(t, e, i) {
            var s = t.getBBox();
            e = se(e).split(" "),
            i.xOrigin = (-1 !== e[0].indexOf("%") ? parseFloat(e[0]) / 100 * s.width : parseFloat(e[0])) + s.x,
            i.yOrigin = (-1 !== e[1].indexOf("%") ? parseFloat(e[1]) / 100 * s.height : parseFloat(e[1])) + s.y
        }, Me = U.getTransform = function(t, e, i, s) {
            if (t._gsTransform && i && !s)
                return t._gsTransform;
            var n, o, h, l, _, u, p, c, f, m, d = i ? t._gsTransform || new ke : new ke, g = 0 > d.scaleX, v = 2e-5, y = 1e5, T = Se ? parseFloat(Q(t, Pe, e, !1, "0 0 0").split(" ")[2]) || d.zOrigin || 0 : 0, w = parseFloat(a.defaultTransformPerspective) || 0;
            if (xe ? o = Q(t, be, e, !0) : t.currentStyle && (o = t.currentStyle.filter.match(O),
            o = o && 4 === o.length ? [o[0].substr(4), Number(o[2].substr(4)), Number(o[1].substr(4)), o[3].substr(4), d.x || 0, d.y || 0].join(",") : ""),
            n = !o || "none" === o || "matrix(1, 0, 0, 1, 0, 0)" === o,
            d.svg = !!(Re && "function" == typeof t.getBBox && t.getCTM && (!t.parentNode || t.parentNode.getBBox && t.parentNode.getCTM)),
            d.svg && (De(t, Q(t, Pe, r, !1, "50% 50%") + "", d),
            Te = a.useSVGTransformAttr || Oe,
            h = t.getAttribute("transform"),
            n && h && -1 !== h.indexOf("matrix") && (o = h,
            n = 0)),
            !n) {
                for (h = (o || "").match(/(?:\-|\b)[\d\-\.e]+\b/gi) || [],
                l = h.length; --l > -1; )
                    _ = Number(h[l]),
                    h[l] = (u = _ - (_ |= 0)) ? (0 | u * y + (0 > u ? -.5 : .5)) / y + _ : _;
                if (16 === h.length) {
                    var x = h[8]
                      , b = h[9]
                      , P = h[10]
                      , S = h[12]
                      , k = h[13]
                      , R = h[14];
                    d.zOrigin && (R = -d.zOrigin,
                    S = x * R - h[12],
                    k = b * R - h[13],
                    R = P * R + d.zOrigin - h[14]);
                    var A, C, D, M, z, E = h[0], F = h[1], N = h[2], L = h[3], X = h[4], U = h[5], Y = h[6], B = h[7], j = h[11], q = Math.atan2(F, U);
                    d.rotation = q * I,
                    q && (M = Math.cos(-q),
                    z = Math.sin(-q),
                    E = E * M + X * z,
                    C = F * M + U * z,
                    U = F * -z + U * M,
                    Y = N * -z + Y * M,
                    F = C),
                    q = Math.atan2(x, E),
                    d.rotationY = q * I,
                    q && (M = Math.cos(-q),
                    z = Math.sin(-q),
                    A = E * M - x * z,
                    C = F * M - b * z,
                    D = N * M - P * z,
                    b = F * z + b * M,
                    P = N * z + P * M,
                    j = L * z + j * M,
                    E = A,
                    F = C,
                    N = D),
                    q = Math.atan2(Y, P),
                    d.rotationX = q * I,
                    q && (M = Math.cos(-q),
                    z = Math.sin(-q),
                    A = X * M + x * z,
                    C = U * M + b * z,
                    D = Y * M + P * z,
                    x = X * -z + x * M,
                    b = U * -z + b * M,
                    P = Y * -z + P * M,
                    j = B * -z + j * M,
                    X = A,
                    U = C,
                    Y = D),
                    d.scaleX = (0 | Math.sqrt(E * E + F * F) * y + .5) / y,
                    d.scaleY = (0 | Math.sqrt(U * U + b * b) * y + .5) / y,
                    d.scaleZ = (0 | Math.sqrt(Y * Y + P * P) * y + .5) / y,
                    d.skewX = 0,
                    d.perspective = j ? 1 / (0 > j ? -j : j) : 0,
                    d.x = S,
                    d.y = k,
                    d.z = R
                } else if (!(Se && !s && h.length && d.x === h[4] && d.y === h[5] && (d.rotationX || d.rotationY) || void 0 !== d.x && "none" === Q(t, "display", e))) {
                    var V = h.length >= 6
                      , G = V ? h[0] : 1
                      , W = h[1] || 0
                      , Z = h[2] || 0
                      , $ = V ? h[3] : 1;
                    d.x = h[4] || 0,
                    d.y = h[5] || 0,
                    p = Math.sqrt(G * G + W * W),
                    c = Math.sqrt($ * $ + Z * Z),
                    f = G || W ? Math.atan2(W, G) * I : d.rotation || 0,
                    m = Z || $ ? Math.atan2(Z, $) * I + f : d.skewX || 0,
                    Math.abs(m) > 90 && 270 > Math.abs(m) && (g ? (p *= -1,
                    m += 0 >= f ? 180 : -180,
                    f += 0 >= f ? 180 : -180) : (c *= -1,
                    m += 0 >= m ? 180 : -180)),
                    d.scaleX = p,
                    d.scaleY = c,
                    d.rotation = f,
                    d.skewX = m,
                    Se && (d.rotationX = d.rotationY = d.z = 0,
                    d.perspective = w,
                    d.scaleZ = 1)
                }
                d.zOrigin = T;
                for (l in d)
                    v > d[l] && d[l] > -v && (d[l] = 0)
            }
            return i && (t._gsTransform = d),
            d
        }
        , ze = function(t) {
            var e, i, s = this.data, r = -s.rotation * z, n = r + s.skewX * z, a = 1e5, o = (0 | Math.cos(r) * s.scaleX * a) / a, h = (0 | Math.sin(r) * s.scaleX * a) / a, l = (0 | Math.sin(n) * -s.scaleY * a) / a, _ = (0 | Math.cos(n) * s.scaleY * a) / a, u = this.t.style, p = this.t.currentStyle;
            if (p) {
                i = h,
                h = -l,
                l = -i,
                e = p.filter,
                u.filter = "";
                var c, f, d = this.t.offsetWidth, g = this.t.offsetHeight, v = "absolute" !== p.position, y = "progid:DXImageTransform.Microsoft.Matrix(M11=" + o + ", M12=" + h + ", M21=" + l + ", M22=" + _, x = s.x + d * s.xPercent / 100, b = s.y + g * s.yPercent / 100;
                if (null != s.ox && (c = (s.oxp ? .01 * d * s.ox : s.ox) - d / 2,
                f = (s.oyp ? .01 * g * s.oy : s.oy) - g / 2,
                x += c - (c * o + f * h),
                b += f - (c * l + f * _)),
                v ? (c = d / 2,
                f = g / 2,
                y += ", Dx=" + (c - (c * o + f * h) + x) + ", Dy=" + (f - (c * l + f * _) + b) + ")") : y += ", sizingMethod='auto expand')",
                u.filter = -1 !== e.indexOf("DXImageTransform.Microsoft.Matrix(") ? e.replace(D, y) : y + " " + e,
                (0 === t || 1 === t) && 1 === o && 0 === h && 0 === l && 1 === _ && (v && -1 === y.indexOf("Dx=0, Dy=0") || w.test(e) && 100 !== parseFloat(RegExp.$1) || -1 === e.indexOf("gradient(" && e.indexOf("Alpha")) && u.removeAttribute("filter")),
                !v) {
                    var P, S, k, R = 8 > m ? 1 : -1;
                    for (c = s.ieOffsetX || 0,
                    f = s.ieOffsetY || 0,
                    s.ieOffsetX = Math.round((d - ((0 > o ? -o : o) * d + (0 > h ? -h : h) * g)) / 2 + x),
                    s.ieOffsetY = Math.round((g - ((0 > _ ? -_ : _) * g + (0 > l ? -l : l) * d)) / 2 + b),
                    de = 0; 4 > de; de++)
                        S = ee[de],
                        P = p[S],
                        i = -1 !== P.indexOf("px") ? parseFloat(P) : $(this.t, S, parseFloat(P), P.replace(T, "")) || 0,
                        k = i !== s[S] ? 2 > de ? -s.ieOffsetX : -s.ieOffsetY : 2 > de ? c - s.ieOffsetX : f - s.ieOffsetY,
                        u[S] = (s[S] = Math.round(i - k * (0 === de || 2 === de ? 1 : R))) + "px"
                }
            }
        }, Ie = U.set3DTransformRatio = function(t) {
            var e, i, s, r, n, a, o, h, l, _, u, p, f, m, d, g, v, y, T, w, x, b, P, S, k, R = this.data, A = this.t.style, C = R.rotation * z, O = R.scaleX, D = R.scaleY, M = R.scaleZ, I = R.x, E = R.y, F = R.z, N = R.perspective;
            if (!(1 !== t && 0 !== t || "auto" !== R.force3D || R.rotationY || R.rotationX || 1 !== M || N || F))
                return Ee.call(this, t),
                void 0;
            if (c) {
                var L = 1e-4;
                L > O && O > -L && (O = M = 2e-5),
                L > D && D > -L && (D = M = 2e-5),
                !N || R.z || R.rotationX || R.rotationY || (N = 0)
            }
            if (C || R.skewX)
                y = Math.cos(C),
                T = Math.sin(C),
                e = y,
                n = T,
                R.skewX && (C -= R.skewX * z,
                y = Math.cos(C),
                T = Math.sin(C),
                "simple" === R.skewType && (w = Math.tan(R.skewX * z),
                w = Math.sqrt(1 + w * w),
                y *= w,
                T *= w)),
                i = -T,
                a = y;
            else {
                if (!(R.rotationY || R.rotationX || 1 !== M || N || R.svg))
                    return A[xe] = (R.xPercent || R.yPercent ? "translate(" + R.xPercent + "%," + R.yPercent + "%) translate3d(" : "translate3d(") + I + "px," + E + "px," + F + "px)" + (1 !== O || 1 !== D ? " scale(" + O + "," + D + ")" : ""),
                    void 0;
                e = a = 1,
                i = n = 0
            }
            u = 1,
            s = r = o = h = l = _ = p = f = m = 0,
            d = N ? -1 / N : 0,
            g = R.zOrigin,
            v = 1e5,
            k = ",",
            C = R.rotationY * z,
            C && (y = Math.cos(C),
            T = Math.sin(C),
            l = u * -T,
            f = d * -T,
            s = e * T,
            o = n * T,
            u *= y,
            d *= y,
            e *= y,
            n *= y),
            C = R.rotationX * z,
            C && (y = Math.cos(C),
            T = Math.sin(C),
            w = i * y + s * T,
            x = a * y + o * T,
            b = _ * y + u * T,
            P = m * y + d * T,
            s = i * -T + s * y,
            o = a * -T + o * y,
            u = _ * -T + u * y,
            d = m * -T + d * y,
            i = w,
            a = x,
            _ = b,
            m = P),
            1 !== M && (s *= M,
            o *= M,
            u *= M,
            d *= M),
            1 !== D && (i *= D,
            a *= D,
            _ *= D,
            m *= D),
            1 !== O && (e *= O,
            n *= O,
            l *= O,
            f *= O),
            g && (p -= g,
            r = s * p,
            h = o * p,
            p = u * p + g),
            R.svg && (r += R.xOrigin - (R.xOrigin * e + R.yOrigin * i),
            h += R.yOrigin - (R.xOrigin * n + R.yOrigin * a)),
            r = (w = (r += I) - (r |= 0)) ? (0 | w * v + (0 > w ? -.5 : .5)) / v + r : r,
            h = (w = (h += E) - (h |= 0)) ? (0 | w * v + (0 > w ? -.5 : .5)) / v + h : h,
            p = (w = (p += F) - (p |= 0)) ? (0 | w * v + (0 > w ? -.5 : .5)) / v + p : p,
            S = R.xPercent || R.yPercent ? "translate(" + R.xPercent + "%," + R.yPercent + "%) matrix3d(" : "matrix3d(",
            S += (0 | e * v) / v + k + (0 | n * v) / v + k + (0 | l * v) / v,
            S += k + (0 | f * v) / v + k + (0 | i * v) / v + k + (0 | a * v) / v,
            S += k + (0 | _ * v) / v + k + (0 | m * v) / v + k + (0 | s * v) / v,
            S += k + (0 | o * v) / v + k + (0 | u * v) / v + k + (0 | d * v) / v,
            S += k + r + k + h + k + p + k + (N ? 1 + -p / N : 1) + ")",
            A[xe] = S
        }
        , Ee = U.set2DTransformRatio = function(t) {
            var e, i, s, r, n, a, o, h, l, _, u, p = this.data, c = this.t, f = c.style, m = p.x, d = p.y;
            return !(p.rotationX || p.rotationY || p.z || p.force3D === !0 || "auto" === p.force3D && 1 !== t && 0 !== t) || p.svg && Te || !Se ? (r = p.scaleX,
            n = p.scaleY,
            p.rotation || p.skewX || p.svg ? (e = p.rotation * z,
            i = e - p.skewX * z,
            s = 1e5,
            a = Math.cos(e) * r,
            o = Math.sin(e) * r,
            h = Math.sin(i) * -n,
            l = Math.cos(i) * n,
            p.svg && (m += p.xOrigin - (p.xOrigin * a + p.yOrigin * h),
            d += p.yOrigin - (p.xOrigin * o + p.yOrigin * l),
            u = 1e-6,
            u > m && m > -u && (m = 0),
            u > d && d > -u && (d = 0)),
            _ = (0 | a * s) / s + "," + (0 | o * s) / s + "," + (0 | h * s) / s + "," + (0 | l * s) / s + "," + m + "," + d + ")",
            p.svg && Te ? c.setAttribute("transform", "matrix(" + _) : f[xe] = (p.xPercent || p.yPercent ? "translate(" + p.xPercent + "%," + p.yPercent + "%) matrix(" : "matrix(") + _) : f[xe] = (p.xPercent || p.yPercent ? "translate(" + p.xPercent + "%," + p.yPercent + "%) matrix(" : "matrix(") + r + ",0,0," + n + "," + m + "," + d + ")",
            void 0) : (this.setRatio = Ie,
            Ie.call(this, t),
            void 0)
        }
        ;
        l = ke.prototype,
        l.x = l.y = l.z = l.skewX = l.skewY = l.rotation = l.rotationX = l.rotationY = l.zOrigin = l.xPercent = l.yPercent = 0,
        l.scaleX = l.scaleY = l.scaleZ = 1,
        ve("transform,scale,scaleX,scaleY,scaleZ,x,y,z,rotation,rotationX,rotationY,rotationZ,skewX,skewY,shortRotation,shortRotationX,shortRotationY,shortRotationZ,transformOrigin,transformPerspective,directionalRotation,parseTransform,force3D,skewType,xPercent,yPercent", {
            parser: function(t, e, i, s, n, o, h) {
                if (s._lastParsedTransform === h)
                    return n;
                s._lastParsedTransform = h;
                var l, _, u, p, c, f, m, d = s._transform = Me(t, r, !0, h.parseTransform), g = t.style, v = 1e-6, y = we.length, T = h, w = {};
                if ("string" == typeof T.transform && xe)
                    u = L.style,
                    u[xe] = T.transform,
                    u.display = "block",
                    u.position = "absolute",
                    F.body.appendChild(L),
                    l = Me(L, null, !1),
                    F.body.removeChild(L);
                else if ("object" == typeof T) {
                    if (l = {
                        scaleX: ne(null != T.scaleX ? T.scaleX : T.scale, d.scaleX),
                        scaleY: ne(null != T.scaleY ? T.scaleY : T.scale, d.scaleY),
                        scaleZ: ne(T.scaleZ, d.scaleZ),
                        x: ne(T.x, d.x),
                        y: ne(T.y, d.y),
                        z: ne(T.z, d.z),
                        xPercent: ne(T.xPercent, d.xPercent),
                        yPercent: ne(T.yPercent, d.yPercent),
                        perspective: ne(T.transformPerspective, d.perspective)
                    },
                    m = T.directionalRotation,
                    null != m)
                        if ("object" == typeof m)
                            for (u in m)
                                T[u] = m[u];
                        else
                            T.rotation = m;
                    "string" == typeof T.x && -1 !== T.x.indexOf("%") && (l.x = 0,
                    l.xPercent = ne(T.x, d.xPercent)),
                    "string" == typeof T.y && -1 !== T.y.indexOf("%") && (l.y = 0,
                    l.yPercent = ne(T.y, d.yPercent)),
                    l.rotation = ae("rotation"in T ? T.rotation : "shortRotation"in T ? T.shortRotation + "_short" : "rotationZ"in T ? T.rotationZ : d.rotation, d.rotation, "rotation", w),
                    Se && (l.rotationX = ae("rotationX"in T ? T.rotationX : "shortRotationX"in T ? T.shortRotationX + "_short" : d.rotationX || 0, d.rotationX, "rotationX", w),
                    l.rotationY = ae("rotationY"in T ? T.rotationY : "shortRotationY"in T ? T.shortRotationY + "_short" : d.rotationY || 0, d.rotationY, "rotationY", w)),
                    l.skewX = null == T.skewX ? d.skewX : ae(T.skewX, d.skewX),
                    l.skewY = null == T.skewY ? d.skewY : ae(T.skewY, d.skewY),
                    (_ = l.skewY - d.skewY) && (l.skewX += _,
                    l.rotation += _)
                }
                for (Se && null != T.force3D && (d.force3D = T.force3D,
                f = !0),
                d.skewType = T.skewType || d.skewType || a.defaultSkewType,
                c = d.force3D || d.z || d.rotationX || d.rotationY || l.z || l.rotationX || l.rotationY || l.perspective,
                c || null == T.scale || (l.scaleZ = 1); --y > -1; )
                    i = we[y],
                    p = l[i] - d[i],
                    (p > v || -v > p || null != T[i] || null != E[i]) && (f = !0,
                    n = new fe(d,i,d[i],p,n),
                    i in w && (n.e = w[i]),
                    n.xs0 = 0,
                    n.plugin = o,
                    s._overwriteProps.push(n.n));
                return p = T.transformOrigin,
                p && d.svg && (De(t, p, l),
                n = new fe(d,"xOrigin",d.xOrigin,l.xOrigin - d.xOrigin,n,-1,"transformOrigin"),
                n.b = d.xOrigin,
                n.e = n.xs0 = l.xOrigin,
                n = new fe(d,"yOrigin",d.yOrigin,l.yOrigin - d.yOrigin,n,-1,"transformOrigin"),
                n.b = d.yOrigin,
                n.e = n.xs0 = l.yOrigin,
                p = "0px 0px"),
                (p || Se && c && d.zOrigin) && (xe ? (f = !0,
                i = Pe,
                p = (p || Q(t, i, r, !1, "50% 50%")) + "",
                n = new fe(g,i,0,0,n,-1,"transformOrigin"),
                n.b = g[i],
                n.plugin = o,
                Se ? (u = d.zOrigin,
                p = p.split(" "),
                d.zOrigin = (p.length > 2 && (0 === u || "0px" !== p[2]) ? parseFloat(p[2]) : u) || 0,
                n.xs0 = n.e = p[0] + " " + (p[1] || "50%") + " 0px",
                n = new fe(d,"zOrigin",0,0,n,-1,n.n),
                n.b = u,
                n.xs0 = n.e = d.zOrigin) : n.xs0 = n.e = p) : se(p + "", d)),
                f && (s._transformType = d.svg && Te || !c && 3 !== this._transformType ? 2 : 3),
                n
            },
            prefix: !0
        }),
        ve("boxShadow", {
            defaultValue: "0px 0px 0px 0px #999",
            prefix: !0,
            color: !0,
            multi: !0,
            keyword: "inset"
        }),
        ve("borderRadius", {
            defaultValue: "0px",
            parser: function(t, e, i, n, a) {
                e = this.format(e);
                var o, h, l, _, u, p, c, f, m, d, g, v, y, T, w, x, b = ["borderTopLeftRadius", "borderTopRightRadius", "borderBottomRightRadius", "borderBottomLeftRadius"], P = t.style;
                for (m = parseFloat(t.offsetWidth),
                d = parseFloat(t.offsetHeight),
                o = e.split(" "),
                h = 0; b.length > h; h++)
                    this.p.indexOf("border") && (b[h] = W(b[h])),
                    u = _ = Q(t, b[h], r, !1, "0px"),
                    -1 !== u.indexOf(" ") && (_ = u.split(" "),
                    u = _[0],
                    _ = _[1]),
                    p = l = o[h],
                    c = parseFloat(u),
                    v = u.substr((c + "").length),
                    y = "=" === p.charAt(1),
                    y ? (f = parseInt(p.charAt(0) + "1", 10),
                    p = p.substr(2),
                    f *= parseFloat(p),
                    g = p.substr((f + "").length - (0 > f ? 1 : 0)) || "") : (f = parseFloat(p),
                    g = p.substr((f + "").length)),
                    "" === g && (g = s[i] || v),
                    g !== v && (T = $(t, "borderLeft", c, v),
                    w = $(t, "borderTop", c, v),
                    "%" === g ? (u = 100 * (T / m) + "%",
                    _ = 100 * (w / d) + "%") : "em" === g ? (x = $(t, "borderLeft", 1, "em"),
                    u = T / x + "em",
                    _ = w / x + "em") : (u = T + "px",
                    _ = w + "px"),
                    y && (p = parseFloat(u) + f + g,
                    l = parseFloat(_) + f + g)),
                    a = me(P, b[h], u + " " + _, p + " " + l, !1, "0px", a);
                return a
            },
            prefix: !0,
            formatter: ue("0px 0px 0px 0px", !1, !0)
        }),
        ve("backgroundPosition", {
            defaultValue: "0 0",
            parser: function(t, e, i, s, n, a) {
                var o, h, l, _, u, p, c = "background-position", f = r || Z(t, null), d = this.format((f ? m ? f.getPropertyValue(c + "-x") + " " + f.getPropertyValue(c + "-y") : f.getPropertyValue(c) : t.currentStyle.backgroundPositionX + " " + t.currentStyle.backgroundPositionY) || "0 0"), g = this.format(e);
                if (-1 !== d.indexOf("%") != (-1 !== g.indexOf("%")) && (p = Q(t, "backgroundImage").replace(R, ""),
                p && "none" !== p)) {
                    for (o = d.split(" "),
                    h = g.split(" "),
                    X.setAttribute("src", p),
                    l = 2; --l > -1; )
                        d = o[l],
                        _ = -1 !== d.indexOf("%"),
                        _ !== (-1 !== h[l].indexOf("%")) && (u = 0 === l ? t.offsetWidth - X.width : t.offsetHeight - X.height,
                        o[l] = _ ? parseFloat(d) / 100 * u + "px" : 100 * (parseFloat(d) / u) + "%");
                    d = o.join(" ")
                }
                return this.parseComplex(t.style, d, g, n, a)
            },
            formatter: se
        }),
        ve("backgroundSize", {
            defaultValue: "0 0",
            formatter: se
        }),
        ve("perspective", {
            defaultValue: "0px",
            prefix: !0
        }),
        ve("perspectiveOrigin", {
            defaultValue: "50% 50%",
            prefix: !0
        }),
        ve("transformStyle", {
            prefix: !0
        }),
        ve("backfaceVisibility", {
            prefix: !0
        }),
        ve("userSelect", {
            prefix: !0
        }),
        ve("margin", {
            parser: pe("marginTop,marginRight,marginBottom,marginLeft")
        }),
        ve("padding", {
            parser: pe("paddingTop,paddingRight,paddingBottom,paddingLeft")
        }),
        ve("clip", {
            defaultValue: "rect(0px,0px,0px,0px)",
            parser: function(t, e, i, s, n, a) {
                var o, h, l;
                return 9 > m ? (h = t.currentStyle,
                l = 8 > m ? " " : ",",
                o = "rect(" + h.clipTop + l + h.clipRight + l + h.clipBottom + l + h.clipLeft + ")",
                e = this.format(e).split(",").join(l)) : (o = this.format(Q(t, this.p, r, !1, this.dflt)),
                e = this.format(e)),
                this.parseComplex(t.style, o, e, n, a)
            }
        }),
        ve("textShadow", {
            defaultValue: "0px 0px 0px #999",
            color: !0,
            multi: !0
        }),
        ve("autoRound,strictUnits", {
            parser: function(t, e, i, s, r) {
                return r
            }
        }),
        ve("border", {
            defaultValue: "0px solid #000",
            parser: function(t, e, i, s, n, a) {
                return this.parseComplex(t.style, this.format(Q(t, "borderTopWidth", r, !1, "0px") + " " + Q(t, "borderTopStyle", r, !1, "solid") + " " + Q(t, "borderTopColor", r, !1, "#000")), this.format(e), n, a)
            },
            color: !0,
            formatter: function(t) {
                var e = t.split(" ");
                return e[0] + " " + (e[1] || "solid") + " " + (t.match(_e) || ["#000"])[0]
            }
        }),
        ve("borderWidth", {
            parser: pe("borderTopWidth,borderRightWidth,borderBottomWidth,borderLeftWidth")
        }),
        ve("float,cssFloat,styleFloat", {
            parser: function(t, e, i, s, r) {
                var n = t.style
                  , a = "cssFloat"in n ? "cssFloat" : "styleFloat";
                return new fe(n,a,0,0,r,-1,i,!1,0,n[a],e)
            }
        });
        var Fe = function(t) {
            var e, i = this.t, s = i.filter || Q(this.data, "filter") || "", r = 0 | this.s + this.c * t;
            100 === r && (-1 === s.indexOf("atrix(") && -1 === s.indexOf("radient(") && -1 === s.indexOf("oader(") ? (i.removeAttribute("filter"),
            e = !Q(this.data, "filter")) : (i.filter = s.replace(b, ""),
            e = !0)),
            e || (this.xn1 && (i.filter = s = s || "alpha(opacity=" + r + ")"),
            -1 === s.indexOf("pacity") ? 0 === r && this.xn1 || (i.filter = s + " alpha(opacity=" + r + ")") : i.filter = s.replace(w, "opacity=" + r))
        };
        ve("opacity,alpha,autoAlpha", {
            defaultValue: "1",
            parser: function(t, e, i, s, n, a) {
                var o = parseFloat(Q(t, "opacity", r, !1, "1"))
                  , h = t.style
                  , l = "autoAlpha" === i;
                return "string" == typeof e && "=" === e.charAt(1) && (e = ("-" === e.charAt(0) ? -1 : 1) * parseFloat(e.substr(2)) + o),
                l && 1 === o && "hidden" === Q(t, "visibility", r) && 0 !== e && (o = 0),
                B ? n = new fe(h,"opacity",o,e - o,n) : (n = new fe(h,"opacity",100 * o,100 * (e - o),n),
                n.xn1 = l ? 1 : 0,
                h.zoom = 1,
                n.type = 2,
                n.b = "alpha(opacity=" + n.s + ")",
                n.e = "alpha(opacity=" + (n.s + n.c) + ")",
                n.data = t,
                n.plugin = a,
                n.setRatio = Fe),
                l && (n = new fe(h,"visibility",0,0,n,-1,null,!1,0,0 !== o ? "inherit" : "hidden",0 === e ? "hidden" : "inherit"),
                n.xs0 = "inherit",
                s._overwriteProps.push(n.n),
                s._overwriteProps.push(i)),
                n
            }
        });
        var Ne = function(t, e) {
            e && (t.removeProperty ? ("ms" === e.substr(0, 2) && (e = "M" + e.substr(1)),
            t.removeProperty(e.replace(S, "-$1").toLowerCase())) : t.removeAttribute(e))
        }
          , Le = function(t) {
            if (this.t._gsClassPT = this,
            1 === t || 0 === t) {
                this.t.setAttribute("class", 0 === t ? this.b : this.e);
                for (var e = this.data, i = this.t.style; e; )
                    e.v ? i[e.p] = e.v : Ne(i, e.p),
                    e = e._next;
                1 === t && this.t._gsClassPT === this && (this.t._gsClassPT = null)
            } else
                this.t.getAttribute("class") !== this.e && this.t.setAttribute("class", this.e)
        };
        ve("className", {
            parser: function(t, e, s, n, a, o, h) {
                var l, _, u, p, c, f = t.getAttribute("class") || "", m = t.style.cssText;
                if (a = n._classNamePT = new fe(t,s,0,0,a,2),
                a.setRatio = Le,
                a.pr = -11,
                i = !0,
                a.b = f,
                _ = K(t, r),
                u = t._gsClassPT) {
                    for (p = {},
                    c = u.data; c; )
                        p[c.p] = 1,
                        c = c._next;
                    u.setRatio(1)
                }
                return t._gsClassPT = a,
                a.e = "=" !== e.charAt(1) ? e : f.replace(RegExp("\\s*\\b" + e.substr(2) + "\\b"), "") + ("+" === e.charAt(0) ? " " + e.substr(2) : ""),
                n._tween._duration && (t.setAttribute("class", a.e),
                l = J(t, _, K(t), h, p),
                t.setAttribute("class", f),
                a.data = l.firstMPT,
                t.style.cssText = m,
                a = a.xfirst = n.parse(t, l.difs, a, o)),
                a
            }
        });
        var Xe = function(t) {
            if ((1 === t || 0 === t) && this.data._totalTime === this.data._totalDuration && "isFromStart" !== this.data.data) {
                var e, i, s, r, n = this.t.style, a = h.transform.parse;
                if ("all" === this.e)
                    n.cssText = "",
                    r = !0;
                else
                    for (e = this.e.split(" ").join("").split(","),
                    s = e.length; --s > -1; )
                        i = e[s],
                        h[i] && (h[i].parse === a ? r = !0 : i = "transformOrigin" === i ? Pe : h[i].p),
                        Ne(n, i);
                r && (Ne(n, xe),
                this.t._gsTransform && delete this.t._gsTransform)
            }
        };
        for (ve("clearProps", {
            parser: function(t, e, s, r, n) {
                return n = new fe(t,s,0,0,n,2),
                n.setRatio = Xe,
                n.e = e,
                n.pr = -10,
                n.data = r._tween,
                i = !0,
                n
            }
        }),
        l = "bezier,throwProps,physicsProps,physics2D".split(","),
        de = l.length; de--; )
            ye(l[de]);
        l = a.prototype,
        l._firstPT = l._lastParsedTransform = l._transform = null,
        l._onInitTween = function(t, e, o) {
            if (!t.nodeType)
                return !1;
            this._target = t,
            this._tween = o,
            this._vars = e,
            _ = e.autoRound,
            i = !1,
            s = e.suffixMap || a.suffixMap,
            r = Z(t, ""),
            n = this._overwriteProps;
            var h, l, c, m, d, g, v, y, T, w = t.style;
            if (u && "" === w.zIndex && (h = Q(t, "zIndex", r),
            ("auto" === h || "" === h) && this._addLazySet(w, "zIndex", 0)),
            "string" == typeof e && (m = w.cssText,
            h = K(t, r),
            w.cssText = m + ";" + e,
            h = J(t, h, K(t)).difs,
            !B && x.test(e) && (h.opacity = parseFloat(RegExp.$1)),
            e = h,
            w.cssText = m),
            this._firstPT = l = this.parse(t, e, null),
            this._transformType) {
                for (T = 3 === this._transformType,
                xe ? p && (u = !0,
                "" === w.zIndex && (v = Q(t, "zIndex", r),
                ("auto" === v || "" === v) && this._addLazySet(w, "zIndex", 0)),
                f && this._addLazySet(w, "WebkitBackfaceVisibility", this._vars.WebkitBackfaceVisibility || (T ? "visible" : "hidden"))) : w.zoom = 1,
                c = l; c && c._next; )
                    c = c._next;
                y = new fe(t,"transform",0,0,null,2),
                this._linkCSSP(y, null, c),
                y.setRatio = T && Se ? Ie : xe ? Ee : ze,
                y.data = this._transform || Me(t, r, !0),
                n.pop()
            }
            if (i) {
                for (; l; ) {
                    for (g = l._next,
                    c = m; c && c.pr > l.pr; )
                        c = c._next;
                    (l._prev = c ? c._prev : d) ? l._prev._next = l : m = l,
                    (l._next = c) ? c._prev = l : d = l,
                    l = g
                }
                this._firstPT = m
            }
            return !0
        }
        ,
        l.parse = function(t, e, i, n) {
            var a, o, l, u, p, c, f, m, d, g, v = t.style;
            for (a in e)
                c = e[a],
                o = h[a],
                o ? i = o.parse(t, c, a, this, i, n, e) : (p = Q(t, a, r) + "",
                d = "string" == typeof c,
                "color" === a || "fill" === a || "stroke" === a || -1 !== a.indexOf("Color") || d && P.test(c) ? (d || (c = le(c),
                c = (c.length > 3 ? "rgba(" : "rgb(") + c.join(",") + ")"),
                i = me(v, a, p, c, !0, "transparent", i, 0, n)) : !d || -1 === c.indexOf(" ") && -1 === c.indexOf(",") ? (l = parseFloat(p),
                f = l || 0 === l ? p.substr((l + "").length) : "",
                ("" === p || "auto" === p) && ("width" === a || "height" === a ? (l = ie(t, a, r),
                f = "px") : "left" === a || "top" === a ? (l = H(t, a, r),
                f = "px") : (l = "opacity" !== a ? 0 : 1,
                f = "")),
                g = d && "=" === c.charAt(1),
                g ? (u = parseInt(c.charAt(0) + "1", 10),
                c = c.substr(2),
                u *= parseFloat(c),
                m = c.replace(T, "")) : (u = parseFloat(c),
                m = d ? c.substr((u + "").length) || "" : ""),
                "" === m && (m = a in s ? s[a] : f),
                c = u || 0 === u ? (g ? u + l : u) + m : e[a],
                f !== m && "" !== m && (u || 0 === u) && l && (l = $(t, a, l, f),
                "%" === m ? (l /= $(t, a, 100, "%") / 100,
                e.strictUnits !== !0 && (p = l + "%")) : "em" === m ? l /= $(t, a, 1, "em") : "px" !== m && (u = $(t, a, u, m),
                m = "px"),
                g && (u || 0 === u) && (c = u + l + m)),
                g && (u += l),
                !l && 0 !== l || !u && 0 !== u ? void 0 !== v[a] && (c || "NaN" != c + "" && null != c) ? (i = new fe(v,a,u || l || 0,0,i,-1,a,!1,0,p,c),
                i.xs0 = "none" !== c || "display" !== a && -1 === a.indexOf("Style") ? c : p) : q("invalid " + a + " tween value: " + e[a]) : (i = new fe(v,a,l,u - l,i,0,a,_ !== !1 && ("px" === m || "zIndex" === a),0,p,c),
                i.xs0 = m)) : i = me(v, a, p, c, !0, null, i, 0, n)),
                n && i && !i.plugin && (i.plugin = n);
            return i
        }
        ,
        l.setRatio = function(t) {
            var e, i, s, r = this._firstPT, n = 1e-6;
            if (1 !== t || this._tween._time !== this._tween._duration && 0 !== this._tween._time)
                if (t || this._tween._time !== this._tween._duration && 0 !== this._tween._time || this._tween._rawPrevTime === -1e-6)
                    for (; r; ) {
                        if (e = r.c * t + r.s,
                        r.r ? e = Math.round(e) : n > e && e > -n && (e = 0),
                        r.type)
                            if (1 === r.type)
                                if (s = r.l,
                                2 === s)
                                    r.t[r.p] = r.xs0 + e + r.xs1 + r.xn1 + r.xs2;
                                else if (3 === s)
                                    r.t[r.p] = r.xs0 + e + r.xs1 + r.xn1 + r.xs2 + r.xn2 + r.xs3;
                                else if (4 === s)
                                    r.t[r.p] = r.xs0 + e + r.xs1 + r.xn1 + r.xs2 + r.xn2 + r.xs3 + r.xn3 + r.xs4;
                                else if (5 === s)
                                    r.t[r.p] = r.xs0 + e + r.xs1 + r.xn1 + r.xs2 + r.xn2 + r.xs3 + r.xn3 + r.xs4 + r.xn4 + r.xs5;
                                else {
                                    for (i = r.xs0 + e + r.xs1,
                                    s = 1; r.l > s; s++)
                                        i += r["xn" + s] + r["xs" + (s + 1)];
                                    r.t[r.p] = i
                                }
                            else
                                -1 === r.type ? r.t[r.p] = r.xs0 : r.setRatio && r.setRatio(t);
                        else
                            r.t[r.p] = e + r.xs0;
                        r = r._next
                    }
                else
                    for (; r; )
                        2 !== r.type ? r.t[r.p] = r.b : r.setRatio(t),
                        r = r._next;
            else
                for (; r; )
                    2 !== r.type ? r.t[r.p] = r.e : r.setRatio(t),
                    r = r._next
        }
        ,
        l._enableTransforms = function(t) {
            this._transform = this._transform || Me(this._target, r, !0),
            this._transformType = this._transform.svg && Te || !t && 3 !== this._transformType ? 2 : 3
        }
        ;
        var Ue = function() {
            this.t[this.p] = this.e,
            this.data._linkCSSP(this, this._next, null, !0)
        };
        l._addLazySet = function(t, e, i) {
            var s = this._firstPT = new fe(t,e,0,0,this._firstPT,2);
            s.e = i,
            s.setRatio = Ue,
            s.data = this
        }
        ,
        l._linkCSSP = function(t, e, i, s) {
            return t && (e && (e._prev = t),
            t._next && (t._next._prev = t._prev),
            t._prev ? t._prev._next = t._next : this._firstPT === t && (this._firstPT = t._next,
            s = !0),
            i ? i._next = t : s || null !== this._firstPT || (this._firstPT = t),
            t._next = e,
            t._prev = i),
            t
        }
        ,
        l._kill = function(e) {
            var i, s, r, n = e;
            if (e.autoAlpha || e.alpha) {
                n = {};
                for (s in e)
                    n[s] = e[s];
                n.opacity = 1,
                n.autoAlpha && (n.visibility = 1)
            }
            return e.className && (i = this._classNamePT) && (r = i.xfirst,
            r && r._prev ? this._linkCSSP(r._prev, i._next, r._prev._prev) : r === this._firstPT && (this._firstPT = i._next),
            i._next && this._linkCSSP(i._next, i._next._next, r._prev),
            this._classNamePT = null),
            t.prototype._kill.call(this, n)
        }
        ;
        var Ye = function(t, e, i) {
            var s, r, n, a;
            if (t.slice)
                for (r = t.length; --r > -1; )
                    Ye(t[r], e, i);
            else
                for (s = t.childNodes,
                r = s.length; --r > -1; )
                    n = s[r],
                    a = n.type,
                    n.style && (e.push(K(n)),
                    i && i.push(n)),
                    1 !== a && 9 !== a && 11 !== a || !n.childNodes.length || Ye(n, e, i)
        };
        return a.cascadeTo = function(t, i, s) {
            var r, n, a, o = e.to(t, i, s), h = [o], l = [], _ = [], u = [], p = e._internals.reservedProps;
            for (t = o._targets || o.target,
            Ye(t, l, u),
            o.render(i, !0),
            Ye(t, _),
            o.render(0, !0),
            o._enabled(!0),
            r = u.length; --r > -1; )
                if (n = J(u[r], l[r], _[r]),
                n.firstMPT) {
                    n = n.difs;
                    for (a in s)
                        p[a] && (n[a] = s[a]);
                    h.push(e.to(u[r], i, n))
                }
            return h
        }
        ,
        t.activate([a]),
        a
    }, !0),
    function() {
        var t = _gsScope._gsDefine.plugin({
            propName: "roundProps",
            priority: -1,
            API: 2,
            init: function(t, e, i) {
                return this._tween = i,
                !0
            }
        })
          , e = t.prototype;
        e._onInitAllProps = function() {
            for (var t, e, i, s = this._tween, r = s.vars.roundProps instanceof Array ? s.vars.roundProps : s.vars.roundProps.split(","), n = r.length, a = {}, o = s._propLookup.roundProps; --n > -1; )
                a[r[n]] = 1;
            for (n = r.length; --n > -1; )
                for (t = r[n],
                e = s._firstPT; e; )
                    i = e._next,
                    e.pg ? e.t._roundProps(a, !0) : e.n === t && (this._add(e.t, t, e.s, e.c),
                    i && (i._prev = e._prev),
                    e._prev ? e._prev._next = i : s._firstPT === e && (s._firstPT = i),
                    e._next = e._prev = null,
                    s._propLookup[t] = o),
                    e = i;
            return !1
        }
        ,
        e._add = function(t, e, i, s) {
            this._addTween(t, e, i, i + s, e, !0),
            this._overwriteProps.push(e)
        }
    }(),
    _gsScope._gsDefine.plugin({
        propName: "attr",
        API: 2,
        version: "0.3.3",
        init: function(t, e) {
            var i, s, r;
            if ("function" != typeof t.setAttribute)
                return !1;
            this._target = t,
            this._proxy = {},
            this._start = {},
            this._end = {};
            for (i in e)
                this._start[i] = this._proxy[i] = s = t.getAttribute(i),
                r = this._addTween(this._proxy, i, parseFloat(s), e[i], i),
                this._end[i] = r ? r.s + r.c : e[i],
                this._overwriteProps.push(i);
            return !0
        },
        set: function(t) {
            this._super.setRatio.call(this, t);
            for (var e, i = this._overwriteProps, s = i.length, r = 1 === t ? this._end : t ? this._proxy : this._start; --s > -1; )
                e = i[s],
                this._target.setAttribute(e, r[e] + "")
        }
    }),
    _gsScope._gsDefine.plugin({
        propName: "directionalRotation",
        version: "0.2.1",
        API: 2,
        init: function(t, e) {
            "object" != typeof e && (e = {
                rotation: e
            }),
            this.finals = {};
            var i, s, r, n, a, o, h = e.useRadians === !0 ? 2 * Math.PI : 360, l = 1e-6;
            for (i in e)
                "useRadians" !== i && (o = (e[i] + "").split("_"),
                s = o[0],
                r = parseFloat("function" != typeof t[i] ? t[i] : t[i.indexOf("set") || "function" != typeof t["get" + i.substr(3)] ? i : "get" + i.substr(3)]()),
                n = this.finals[i] = "string" == typeof s && "=" === s.charAt(1) ? r + parseInt(s.charAt(0) + "1", 10) * Number(s.substr(2)) : Number(s) || 0,
                a = n - r,
                o.length && (s = o.join("_"),
                -1 !== s.indexOf("short") && (a %= h,
                a !== a % (h / 2) && (a = 0 > a ? a + h : a - h)),
                -1 !== s.indexOf("_cw") && 0 > a ? a = (a + 9999999999 * h) % h - (0 | a / h) * h : -1 !== s.indexOf("ccw") && a > 0 && (a = (a - 9999999999 * h) % h - (0 | a / h) * h)),
                (a > l || -l > a) && (this._addTween(t, i, r, r + a, i),
                this._overwriteProps.push(i)));
            return !0
        },
        set: function(t) {
            var e;
            if (1 !== t)
                this._super.setRatio.call(this, t);
            else
                for (e = this._firstPT; e; )
                    e.f ? e.t[e.p](this.finals[e.p]) : e.t[e.p] = this.finals[e.p],
                    e = e._next
        }
    })._autoCSS = !0,
    _gsScope._gsDefine("easing.Back", ["easing.Ease"], function(t) {
        var e, i, s, r = _gsScope.GreenSockGlobals || _gsScope, n = r.com.greensock, a = 2 * Math.PI, o = Math.PI / 2, h = n._class, l = function(e, i) {
            var s = h("easing." + e, function() {}, !0)
              , r = s.prototype = new t;
            return r.constructor = s,
            r.getRatio = i,
            s
        }, _ = t.register || function() {}
        , u = function(t, e, i, s) {
            var r = h("easing." + t, {
                easeOut: new e,
                easeIn: new i,
                easeInOut: new s
            }, !0);
            return _(r, t),
            r
        }, p = function(t, e, i) {
            this.t = t,
            this.v = e,
            i && (this.next = i,
            i.prev = this,
            this.c = i.v - e,
            this.gap = i.t - t)
        }, c = function(e, i) {
            var s = h("easing." + e, function(t) {
                this._p1 = t || 0 === t ? t : 1.70158,
                this._p2 = 1.525 * this._p1
            }, !0)
              , r = s.prototype = new t;
            return r.constructor = s,
            r.getRatio = i,
            r.config = function(t) {
                return new s(t)
            }
            ,
            s
        }, f = u("Back", c("BackOut", function(t) {
            return (t -= 1) * t * ((this._p1 + 1) * t + this._p1) + 1
        }), c("BackIn", function(t) {
            return t * t * ((this._p1 + 1) * t - this._p1)
        }), c("BackInOut", function(t) {
            return 1 > (t *= 2) ? .5 * t * t * ((this._p2 + 1) * t - this._p2) : .5 * ((t -= 2) * t * ((this._p2 + 1) * t + this._p2) + 2)
        })), m = h("easing.SlowMo", function(t, e, i) {
            e = e || 0 === e ? e : .7,
            null == t ? t = .7 : t > 1 && (t = 1),
            this._p = 1 !== t ? e : 0,
            this._p1 = (1 - t) / 2,
            this._p2 = t,
            this._p3 = this._p1 + this._p2,
            this._calcEnd = i === !0
        }, !0), d = m.prototype = new t;
        return d.constructor = m,
        d.getRatio = function(t) {
            var e = t + (.5 - t) * this._p;
            return this._p1 > t ? this._calcEnd ? 1 - (t = 1 - t / this._p1) * t : e - (t = 1 - t / this._p1) * t * t * t * e : t > this._p3 ? this._calcEnd ? 1 - (t = (t - this._p3) / this._p1) * t : e + (t - e) * (t = (t - this._p3) / this._p1) * t * t * t : this._calcEnd ? 1 : e
        }
        ,
        m.ease = new m(.7,.7),
        d.config = m.config = function(t, e, i) {
            return new m(t,e,i)
        }
        ,
        e = h("easing.SteppedEase", function(t) {
            t = t || 1,
            this._p1 = 1 / t,
            this._p2 = t + 1
        }, !0),
        d = e.prototype = new t,
        d.constructor = e,
        d.getRatio = function(t) {
            return 0 > t ? t = 0 : t >= 1 && (t = .999999999),
            (this._p2 * t >> 0) * this._p1
        }
        ,
        d.config = e.config = function(t) {
            return new e(t)
        }
        ,
        i = h("easing.RoughEase", function(e) {
            e = e || {};
            for (var i, s, r, n, a, o, h = e.taper || "none", l = [], _ = 0, u = 0 | (e.points || 20), c = u, f = e.randomize !== !1, m = e.clamp === !0, d = e.template instanceof t ? e.template : null, g = "number" == typeof e.strength ? .4 * e.strength : .4; --c > -1; )
                i = f ? Math.random() : 1 / u * c,
                s = d ? d.getRatio(i) : i,
                "none" === h ? r = g : "out" === h ? (n = 1 - i,
                r = n * n * g) : "in" === h ? r = i * i * g : .5 > i ? (n = 2 * i,
                r = .5 * n * n * g) : (n = 2 * (1 - i),
                r = .5 * n * n * g),
                f ? s += Math.random() * r - .5 * r : c % 2 ? s += .5 * r : s -= .5 * r,
                m && (s > 1 ? s = 1 : 0 > s && (s = 0)),
                l[_++] = {
                    x: i,
                    y: s
                };
            for (l.sort(function(t, e) {
                return t.x - e.x
            }),
            o = new p(1,1,null),
            c = u; --c > -1; )
                a = l[c],
                o = new p(a.x,a.y,o);
            this._prev = new p(0,0,0 !== o.t ? o : o.next)
        }, !0),
        d = i.prototype = new t,
        d.constructor = i,
        d.getRatio = function(t) {
            var e = this._prev;
            if (t > e.t) {
                for (; e.next && t >= e.t; )
                    e = e.next;
                e = e.prev
            } else
                for (; e.prev && e.t >= t; )
                    e = e.prev;
            return this._prev = e,
            e.v + (t - e.t) / e.gap * e.c
        }
        ,
        d.config = function(t) {
            return new i(t)
        }
        ,
        i.ease = new i,
        u("Bounce", l("BounceOut", function(t) {
            return 1 / 2.75 > t ? 7.5625 * t * t : 2 / 2.75 > t ? 7.5625 * (t -= 1.5 / 2.75) * t + .75 : 2.5 / 2.75 > t ? 7.5625 * (t -= 2.25 / 2.75) * t + .9375 : 7.5625 * (t -= 2.625 / 2.75) * t + .984375
        }), l("BounceIn", function(t) {
            return 1 / 2.75 > (t = 1 - t) ? 1 - 7.5625 * t * t : 2 / 2.75 > t ? 1 - (7.5625 * (t -= 1.5 / 2.75) * t + .75) : 2.5 / 2.75 > t ? 1 - (7.5625 * (t -= 2.25 / 2.75) * t + .9375) : 1 - (7.5625 * (t -= 2.625 / 2.75) * t + .984375)
        }), l("BounceInOut", function(t) {
            var e = .5 > t;
            return t = e ? 1 - 2 * t : 2 * t - 1,
            t = 1 / 2.75 > t ? 7.5625 * t * t : 2 / 2.75 > t ? 7.5625 * (t -= 1.5 / 2.75) * t + .75 : 2.5 / 2.75 > t ? 7.5625 * (t -= 2.25 / 2.75) * t + .9375 : 7.5625 * (t -= 2.625 / 2.75) * t + .984375,
            e ? .5 * (1 - t) : .5 * t + .5
        })),
        u("Circ", l("CircOut", function(t) {
            return Math.sqrt(1 - (t -= 1) * t)
        }), l("CircIn", function(t) {
            return -(Math.sqrt(1 - t * t) - 1)
        }), l("CircInOut", function(t) {
            return 1 > (t *= 2) ? -.5 * (Math.sqrt(1 - t * t) - 1) : .5 * (Math.sqrt(1 - (t -= 2) * t) + 1)
        })),
        s = function(e, i, s) {
            var r = h("easing." + e, function(t, e) {
                this._p1 = t || 1,
                this._p2 = e || s,
                this._p3 = this._p2 / a * (Math.asin(1 / this._p1) || 0)
            }, !0)
              , n = r.prototype = new t;
            return n.constructor = r,
            n.getRatio = i,
            n.config = function(t, e) {
                return new r(t,e)
            }
            ,
            r
        }
        ,
        u("Elastic", s("ElasticOut", function(t) {
            return this._p1 * Math.pow(2, -10 * t) * Math.sin((t - this._p3) * a / this._p2) + 1
        }, .3), s("ElasticIn", function(t) {
            return -(this._p1 * Math.pow(2, 10 * (t -= 1)) * Math.sin((t - this._p3) * a / this._p2))
        }, .3), s("ElasticInOut", function(t) {
            return 1 > (t *= 2) ? -.5 * this._p1 * Math.pow(2, 10 * (t -= 1)) * Math.sin((t - this._p3) * a / this._p2) : .5 * this._p1 * Math.pow(2, -10 * (t -= 1)) * Math.sin((t - this._p3) * a / this._p2) + 1
        }, .45)),
        u("Expo", l("ExpoOut", function(t) {
            return 1 - Math.pow(2, -10 * t)
        }), l("ExpoIn", function(t) {
            return Math.pow(2, 10 * (t - 1)) - .001
        }), l("ExpoInOut", function(t) {
            return 1 > (t *= 2) ? .5 * Math.pow(2, 10 * (t - 1)) : .5 * (2 - Math.pow(2, -10 * (t - 1)))
        })),
        u("Sine", l("SineOut", function(t) {
            return Math.sin(t * o)
        }), l("SineIn", function(t) {
            return -Math.cos(t * o) + 1
        }), l("SineInOut", function(t) {
            return -.5 * (Math.cos(Math.PI * t) - 1)
        })),
        h("easing.EaseLookup", {
            find: function(e) {
                return t.map[e]
            }
        }, !0),
        _(r.SlowMo, "SlowMo", "ease,"),
        _(i, "RoughEase", "ease,"),
        _(e, "SteppedEase", "ease,"),
        f
    }, !0)
}),
_gsScope._gsDefine && _gsScope._gsQueue.pop()(),
function(t, e) {
    "use strict";
    var i = t.GreenSockGlobals = t.GreenSockGlobals || t;
    if (!i.TweenLite) {
        var s, r, n, a, o, h = function(t) {
            var e, s = t.split("."), r = i;
            for (e = 0; s.length > e; e++)
                r[s[e]] = r = r[s[e]] || {};
            return r
        }, l = h("com.greensock"), _ = 1e-10, u = function(t) {
            var e, i = [], s = t.length;
            for (e = 0; e !== s; i.push(t[e++]))
                ;
            return i
        }, p = function() {}, c = function() {
            var t = Object.prototype.toString
              , e = t.call([]);
            return function(i) {
                return null != i && (i instanceof Array || "object" == typeof i && !!i.push && t.call(i) === e)
            }
        }(), f = {}, m = function(s, r, n, a) {
            this.sc = f[s] ? f[s].sc : [],
            f[s] = this,
            this.gsClass = null,
            this.func = n;
            var o = [];
            this.check = function(l) {
                for (var _, u, p, c, d = r.length, g = d; --d > -1; )
                    (_ = f[r[d]] || new m(r[d],[])).gsClass ? (o[d] = _.gsClass,
                    g--) : l && _.sc.push(this);
                if (0 === g && n)
                    for (u = ("com.greensock." + s).split("."),
                    p = u.pop(),
                    c = h(u.join("."))[p] = this.gsClass = n.apply(n, o),
                    a && (i[p] = c,
                    "function" == typeof define && define.amd ? define((t.GreenSockAMDPath ? t.GreenSockAMDPath + "/" : "") + s.split(".").pop(), [], function() {
                        return c
                    }) : s === e && "undefined" != typeof module && module.exports && (module.exports = c)),
                    d = 0; this.sc.length > d; d++)
                        this.sc[d].check()
            }
            ,
            this.check(!0)
        }, d = t._gsDefine = function(t, e, i, s) {
            return new m(t,e,i,s)
        }
        , g = l._class = function(t, e, i) {
            return e = e || function() {}
            ,
            d(t, [], function() {
                return e
            }, i),
            e
        }
        ;
        d.globals = i;
        var v = [0, 0, 1, 1]
          , y = []
          , T = g("easing.Ease", function(t, e, i, s) {
            this._func = t,
            this._type = i || 0,
            this._power = s || 0,
            this._params = e ? v.concat(e) : v
        }, !0)
          , w = T.map = {}
          , x = T.register = function(t, e, i, s) {
            for (var r, n, a, o, h = e.split(","), _ = h.length, u = (i || "easeIn,easeOut,easeInOut").split(","); --_ > -1; )
                for (n = h[_],
                r = s ? g("easing." + n, null, !0) : l.easing[n] || {},
                a = u.length; --a > -1; )
                    o = u[a],
                    w[n + "." + o] = w[o + n] = r[o] = t.getRatio ? t : t[o] || new t
        }
        ;
        for (n = T.prototype,
        n._calcEnd = !1,
        n.getRatio = function(t) {
            if (this._func)
                return this._params[0] = t,
                this._func.apply(null, this._params);
            var e = this._type
              , i = this._power
              , s = 1 === e ? 1 - t : 2 === e ? t : .5 > t ? 2 * t : 2 * (1 - t);
            return 1 === i ? s *= s : 2 === i ? s *= s * s : 3 === i ? s *= s * s * s : 4 === i && (s *= s * s * s * s),
            1 === e ? 1 - s : 2 === e ? s : .5 > t ? s / 2 : 1 - s / 2
        }
        ,
        s = ["Linear", "Quad", "Cubic", "Quart", "Quint,Strong"],
        r = s.length; --r > -1; )
            n = s[r] + ",Power" + r,
            x(new T(null,null,1,r), n, "easeOut", !0),
            x(new T(null,null,2,r), n, "easeIn" + (0 === r ? ",easeNone" : "")),
            x(new T(null,null,3,r), n, "easeInOut");
        w.linear = l.easing.Linear.easeIn,
        w.swing = l.easing.Quad.easeInOut;
        var b = g("events.EventDispatcher", function(t) {
            this._listeners = {},
            this._eventTarget = t || this
        });
        n = b.prototype,
        n.addEventListener = function(t, e, i, s, r) {
            r = r || 0;
            var n, h, l = this._listeners[t], _ = 0;
            for (null == l && (this._listeners[t] = l = []),
            h = l.length; --h > -1; )
                n = l[h],
                n.c === e && n.s === i ? l.splice(h, 1) : 0 === _ && r > n.pr && (_ = h + 1);
            l.splice(_, 0, {
                c: e,
                s: i,
                up: s,
                pr: r
            }),
            this !== a || o || a.wake()
        }
        ,
        n.removeEventListener = function(t, e) {
            var i, s = this._listeners[t];
            if (s)
                for (i = s.length; --i > -1; )
                    if (s[i].c === e)
                        return s.splice(i, 1),
                        void 0
        }
        ,
        n.dispatchEvent = function(t) {
            var e, i, s, r = this._listeners[t];
            if (r)
                for (e = r.length,
                i = this._eventTarget; --e > -1; )
                    s = r[e],
                    s && (s.up ? s.c.call(s.s || i, {
                        type: t,
                        target: i
                    }) : s.c.call(s.s || i))
        }
        ;
        var P = t.requestAnimationFrame
          , S = t.cancelAnimationFrame
          , k = Date.now || function() {
            return (new Date).getTime()
        }
          , R = k();
        for (s = ["ms", "moz", "webkit", "o"],
        r = s.length; --r > -1 && !P; )
            P = t[s[r] + "RequestAnimationFrame"],
            S = t[s[r] + "CancelAnimationFrame"] || t[s[r] + "CancelRequestAnimationFrame"];
        g("Ticker", function(t, e) {
            var i, s, r, n, h, l = this, u = k(), c = e !== !1 && P, f = 500, m = 33, d = "tick", g = function(t) {
                var e, a, o = k() - R;
                o > f && (u += o - m),
                R += o,
                l.time = (R - u) / 1e3,
                e = l.time - h,
                (!i || e > 0 || t === !0) && (l.frame++,
                h += e + (e >= n ? .004 : n - e),
                a = !0),
                t !== !0 && (r = s(g)),
                a && l.dispatchEvent(d)
            };
            b.call(l),
            l.time = l.frame = 0,
            l.tick = function() {
                g(!0)
            }
            ,
            l.lagSmoothing = function(t, e) {
                f = t || 1 / _,
                m = Math.min(e, f, 0)
            }
            ,
            l.sleep = function() {
                null != r && (c && S ? S(r) : clearTimeout(r),
                s = p,
                r = null,
                l === a && (o = !1))
            }
            ,
            l.wake = function() {
                null !== r ? l.sleep() : l.frame > 10 && (R = k() - f + 5),
                s = 0 === i ? p : c && P ? P : function(t) {
                    return setTimeout(t, 0 | 1e3 * (h - l.time) + 1)
                }
                ,
                l === a && (o = !0),
                g(2)
            }
            ,
            l.fps = function(t) {
                return arguments.length ? (i = t,
                n = 1 / (i || 60),
                h = this.time + n,
                l.wake(),
                void 0) : i
            }
            ,
            l.useRAF = function(t) {
                return arguments.length ? (l.sleep(),
                c = t,
                l.fps(i),
                void 0) : c
            }
            ,
            l.fps(t),
            setTimeout(function() {
                c && (!r || 5 > l.frame) && l.useRAF(!1)
            }, 1500)
        }),
        n = l.Ticker.prototype = new l.events.EventDispatcher,
        n.constructor = l.Ticker;
        var A = g("core.Animation", function(t, e) {
            if (this.vars = e = e || {},
            this._duration = this._totalDuration = t || 0,
            this._delay = Number(e.delay) || 0,
            this._timeScale = 1,
            this._active = e.immediateRender === !0,
            this.data = e.data,
            this._reversed = e.reversed === !0,
            j) {
                o || a.wake();
                var i = this.vars.useFrames ? B : j;
                i.add(this, i._time),
                this.vars.paused && this.paused(!0)
            }
        });
        a = A.ticker = new l.Ticker,
        n = A.prototype,
        n._dirty = n._gc = n._initted = n._paused = !1,
        n._totalTime = n._time = 0,
        n._rawPrevTime = -1,
        n._next = n._last = n._onUpdate = n._timeline = n.timeline = null,
        n._paused = !1;
        var C = function() {
            o && k() - R > 2e3 && a.wake(),
            setTimeout(C, 2e3)
        };
        C(),
        n.play = function(t, e) {
            return null != t && this.seek(t, e),
            this.reversed(!1).paused(!1)
        }
        ,
        n.pause = function(t, e) {
            return null != t && this.seek(t, e),
            this.paused(!0)
        }
        ,
        n.resume = function(t, e) {
            return null != t && this.seek(t, e),
            this.paused(!1)
        }
        ,
        n.seek = function(t, e) {
            return this.totalTime(Number(t), e !== !1)
        }
        ,
        n.restart = function(t, e) {
            return this.reversed(!1).paused(!1).totalTime(t ? -this._delay : 0, e !== !1, !0)
        }
        ,
        n.reverse = function(t, e) {
            return null != t && this.seek(t || this.totalDuration(), e),
            this.reversed(!0).paused(!1)
        }
        ,
        n.render = function() {}
        ,
        n.invalidate = function() {
            return this._time = this._totalTime = 0,
            this._initted = this._gc = !1,
            this._rawPrevTime = -1,
            (this._gc || !this.timeline) && this._enabled(!0),
            this
        }
        ,
        n.isActive = function() {
            var t, e = this._timeline, i = this._startTime;
            return !e || !this._gc && !this._paused && e.isActive() && (t = e.rawTime()) >= i && i + this.totalDuration() / this._timeScale > t
        }
        ,
        n._enabled = function(t, e) {
            return o || a.wake(),
            this._gc = !t,
            this._active = this.isActive(),
            e !== !0 && (t && !this.timeline ? this._timeline.add(this, this._startTime - this._delay) : !t && this.timeline && this._timeline._remove(this, !0)),
            !1
        }
        ,
        n._kill = function() {
            return this._enabled(!1, !1)
        }
        ,
        n.kill = function(t, e) {
            return this._kill(t, e),
            this
        }
        ,
        n._uncache = function(t) {
            for (var e = t ? this : this.timeline; e; )
                e._dirty = !0,
                e = e.timeline;
            return this
        }
        ,
        n._swapSelfInParams = function(t) {
            for (var e = t.length, i = t.concat(); --e > -1; )
                "{self}" === t[e] && (i[e] = this);
            return i
        }
        ,
        n.eventCallback = function(t, e, i, s) {
            if ("on" === (t || "").substr(0, 2)) {
                var r = this.vars;
                if (1 === arguments.length)
                    return r[t];
                null == e ? delete r[t] : (r[t] = e,
                r[t + "Params"] = c(i) && -1 !== i.join("").indexOf("{self}") ? this._swapSelfInParams(i) : i,
                r[t + "Scope"] = s),
                "onUpdate" === t && (this._onUpdate = e)
            }
            return this
        }
        ,
        n.delay = function(t) {
            return arguments.length ? (this._timeline.smoothChildTiming && this.startTime(this._startTime + t - this._delay),
            this._delay = t,
            this) : this._delay
        }
        ,
        n.duration = function(t) {
            return arguments.length ? (this._duration = this._totalDuration = t,
            this._uncache(!0),
            this._timeline.smoothChildTiming && this._time > 0 && this._time < this._duration && 0 !== t && this.totalTime(this._totalTime * (t / this._duration), !0),
            this) : (this._dirty = !1,
            this._duration)
        }
        ,
        n.totalDuration = function(t) {
            return this._dirty = !1,
            arguments.length ? this.duration(t) : this._totalDuration
        }
        ,
        n.time = function(t, e) {
            return arguments.length ? (this._dirty && this.totalDuration(),
            this.totalTime(t > this._duration ? this._duration : t, e)) : this._time
        }
        ,
        n.totalTime = function(t, e, i) {
            if (o || a.wake(),
            !arguments.length)
                return this._totalTime;
            if (this._timeline) {
                if (0 > t && !i && (t += this.totalDuration()),
                this._timeline.smoothChildTiming) {
                    this._dirty && this.totalDuration();
                    var s = this._totalDuration
                      , r = this._timeline;
                    if (t > s && !i && (t = s),
                    this._startTime = (this._paused ? this._pauseTime : r._time) - (this._reversed ? s - t : t) / this._timeScale,
                    r._dirty || this._uncache(!1),
                    r._timeline)
                        for (; r._timeline; )
                            r._timeline._time !== (r._startTime + r._totalTime) / r._timeScale && r.totalTime(r._totalTime, !0),
                            r = r._timeline
                }
                this._gc && this._enabled(!0, !1),
                (this._totalTime !== t || 0 === this._duration) && (this.render(t, e, !1),
                I.length && q())
            }
            return this
        }
        ,
        n.progress = n.totalProgress = function(t, e) {
            return arguments.length ? this.totalTime(this.duration() * t, e) : this._time / this.duration()
        }
        ,
        n.startTime = function(t) {
            return arguments.length ? (t !== this._startTime && (this._startTime = t,
            this.timeline && this.timeline._sortChildren && this.timeline.add(this, t - this._delay)),
            this) : this._startTime
        }
        ,
        n.endTime = function(t) {
            return this._startTime + (0 != t ? this.totalDuration() : this.duration()) / this._timeScale
        }
        ,
        n.timeScale = function(t) {
            if (!arguments.length)
                return this._timeScale;
            if (t = t || _,
            this._timeline && this._timeline.smoothChildTiming) {
                var e = this._pauseTime
                  , i = e || 0 === e ? e : this._timeline.totalTime();
                this._startTime = i - (i - this._startTime) * this._timeScale / t
            }
            return this._timeScale = t,
            this._uncache(!1)
        }
        ,
        n.reversed = function(t) {
            return arguments.length ? (t != this._reversed && (this._reversed = t,
            this.totalTime(this._timeline && !this._timeline.smoothChildTiming ? this.totalDuration() - this._totalTime : this._totalTime, !0)),
            this) : this._reversed
        }
        ,
        n.paused = function(t) {
            if (!arguments.length)
                return this._paused;
            if (t != this._paused && this._timeline) {
                o || t || a.wake();
                var e = this._timeline
                  , i = e.rawTime()
                  , s = i - this._pauseTime;
                !t && e.smoothChildTiming && (this._startTime += s,
                this._uncache(!1)),
                this._pauseTime = t ? i : null,
                this._paused = t,
                this._active = this.isActive(),
                !t && 0 !== s && this._initted && this.duration() && this.render(e.smoothChildTiming ? this._totalTime : (i - this._startTime) / this._timeScale, !0, !0)
            }
            return this._gc && !t && this._enabled(!0, !1),
            this
        }
        ;
        var O = g("core.SimpleTimeline", function(t) {
            A.call(this, 0, t),
            this.autoRemoveChildren = this.smoothChildTiming = !0
        });
        n = O.prototype = new A,
        n.constructor = O,
        n.kill()._gc = !1,
        n._first = n._last = n._recent = null,
        n._sortChildren = !1,
        n.add = n.insert = function(t, e) {
            var i, s;
            if (t._startTime = Number(e || 0) + t._delay,
            t._paused && this !== t._timeline && (t._pauseTime = t._startTime + (this.rawTime() - t._startTime) / t._timeScale),
            t.timeline && t.timeline._remove(t, !0),
            t.timeline = t._timeline = this,
            t._gc && t._enabled(!0, !0),
            i = this._last,
            this._sortChildren)
                for (s = t._startTime; i && i._startTime > s; )
                    i = i._prev;
            return i ? (t._next = i._next,
            i._next = t) : (t._next = this._first,
            this._first = t),
            t._next ? t._next._prev = t : this._last = t,
            t._prev = i,
            this._recent = t,
            this._timeline && this._uncache(!0),
            this
        }
        ,
        n._remove = function(t, e) {
            return t.timeline === this && (e || t._enabled(!1, !0),
            t._prev ? t._prev._next = t._next : this._first === t && (this._first = t._next),
            t._next ? t._next._prev = t._prev : this._last === t && (this._last = t._prev),
            t._next = t._prev = t.timeline = null,
            t === this._recent && (this._recent = this._last),
            this._timeline && this._uncache(!0)),
            this
        }
        ,
        n.render = function(t, e, i) {
            var s, r = this._first;
            for (this._totalTime = this._time = this._rawPrevTime = t; r; )
                s = r._next,
                (r._active || t >= r._startTime && !r._paused) && (r._reversed ? r.render((r._dirty ? r.totalDuration() : r._totalDuration) - (t - r._startTime) * r._timeScale, e, i) : r.render((t - r._startTime) * r._timeScale, e, i)),
                r = s
        }
        ,
        n.rawTime = function() {
            return o || a.wake(),
            this._totalTime
        }
        ;
        var D = g("TweenLite", function(e, i, s) {
            if (A.call(this, i, s),
            this.render = D.prototype.render,
            null == e)
                throw "Cannot tween a null target.";
            this.target = e = "string" != typeof e ? e : D.selector(e) || e;
            var r, n, a, o = e.jquery || e.length && e !== t && e[0] && (e[0] === t || e[0].nodeType && e[0].style && !e.nodeType), h = this.vars.overwrite;
            if (this._overwrite = h = null == h ? Y[D.defaultOverwrite] : "number" == typeof h ? h >> 0 : Y[h],
            (o || e instanceof Array || e.push && c(e)) && "number" != typeof e[0])
                for (this._targets = a = u(e),
                this._propLookup = [],
                this._siblings = [],
                r = 0; a.length > r; r++)
                    n = a[r],
                    n ? "string" != typeof n ? n.length && n !== t && n[0] && (n[0] === t || n[0].nodeType && n[0].style && !n.nodeType) ? (a.splice(r--, 1),
                    this._targets = a = a.concat(u(n))) : (this._siblings[r] = V(n, this, !1),
                    1 === h && this._siblings[r].length > 1 && W(n, this, null, 1, this._siblings[r])) : (n = a[r--] = D.selector(n),
                    "string" == typeof n && a.splice(r + 1, 1)) : a.splice(r--, 1);
            else
                this._propLookup = {},
                this._siblings = V(e, this, !1),
                1 === h && this._siblings.length > 1 && W(e, this, null, 1, this._siblings);
            (this.vars.immediateRender || 0 === i && 0 === this._delay && this.vars.immediateRender !== !1) && (this._time = -_,
            this.render(-this._delay))
        }, !0)
          , M = function(e) {
            return e && e.length && e !== t && e[0] && (e[0] === t || e[0].nodeType && e[0].style && !e.nodeType)
        }
          , z = function(t, e) {
            var i, s = {};
            for (i in t)
                U[i] || i in e && "transform" !== i && "x" !== i && "y" !== i && "width" !== i && "height" !== i && "className" !== i && "border" !== i || !(!N[i] || N[i] && N[i]._autoCSS) || (s[i] = t[i],
                delete t[i]);
            t.css = s
        };
        n = D.prototype = new A,
        n.constructor = D,
        n.kill()._gc = !1,
        n.ratio = 0,
        n._firstPT = n._targets = n._overwrittenProps = n._startAt = null,
        n._notifyPluginsOfEnabled = n._lazy = !1,
        D.version = "1.15.0",
        D.defaultEase = n._ease = new T(null,null,1,1),
        D.defaultOverwrite = "auto",
        D.ticker = a,
        D.autoSleep = !0,
        D.lagSmoothing = function(t, e) {
            a.lagSmoothing(t, e)
        }
        ,
        D.selector = t.$ || t.jQuery || function(e) {
            var i = t.$ || t.jQuery;
            return i ? (D.selector = i,
            i(e)) : "undefined" == typeof document ? e : document.querySelectorAll ? document.querySelectorAll(e) : document.getElementById("#" === e.charAt(0) ? e.substr(1) : e)
        }
        ;
        var I = []
          , E = {}
          , F = D._internals = {
            isArray: c,
            isSelector: M,
            lazyTweens: I
        }
          , N = D._plugins = {}
          , L = F.tweenLookup = {}
          , X = 0
          , U = F.reservedProps = {
            ease: 1,
            delay: 1,
            overwrite: 1,
            onComplete: 1,
            onCompleteParams: 1,
            onCompleteScope: 1,
            useFrames: 1,
            runBackwards: 1,
            startAt: 1,
            onUpdate: 1,
            onUpdateParams: 1,
            onUpdateScope: 1,
            onStart: 1,
            onStartParams: 1,
            onStartScope: 1,
            onReverseComplete: 1,
            onReverseCompleteParams: 1,
            onReverseCompleteScope: 1,
            onRepeat: 1,
            onRepeatParams: 1,
            onRepeatScope: 1,
            easeParams: 1,
            yoyo: 1,
            immediateRender: 1,
            repeat: 1,
            repeatDelay: 1,
            data: 1,
            paused: 1,
            reversed: 1,
            autoCSS: 1,
            lazy: 1,
            onOverwrite: 1
        }
          , Y = {
            none: 0,
            all: 1,
            auto: 2,
            concurrent: 3,
            allOnStart: 4,
            preexisting: 5,
            "true": 1,
            "false": 0
        }
          , B = A._rootFramesTimeline = new O
          , j = A._rootTimeline = new O
          , q = F.lazyRender = function() {
            var t, e = I.length;
            for (E = {}; --e > -1; )
                t = I[e],
                t && t._lazy !== !1 && (t.render(t._lazy[0], t._lazy[1], !0),
                t._lazy = !1);
            I.length = 0
        }
        ;
        j._startTime = a.time,
        B._startTime = a.frame,
        j._active = B._active = !0,
        setTimeout(q, 1),
        A._updateRoot = D.render = function() {
            var t, e, i;
            if (I.length && q(),
            j.render((a.time - j._startTime) * j._timeScale, !1, !1),
            B.render((a.frame - B._startTime) * B._timeScale, !1, !1),
            I.length && q(),
            !(a.frame % 120)) {
                for (i in L) {
                    for (e = L[i].tweens,
                    t = e.length; --t > -1; )
                        e[t]._gc && e.splice(t, 1);
                    0 === e.length && delete L[i]
                }
                if (i = j._first,
                (!i || i._paused) && D.autoSleep && !B._first && 1 === a._listeners.tick.length) {
                    for (; i && i._paused; )
                        i = i._next;
                    i || a.sleep()
                }
            }
        }
        ,
        a.addEventListener("tick", A._updateRoot);
        var V = function(t, e, i) {
            var s, r, n = t._gsTweenID;
            if (L[n || (t._gsTweenID = n = "t" + X++)] || (L[n] = {
                target: t,
                tweens: []
            }),
            e && (s = L[n].tweens,
            s[r = s.length] = e,
            i))
                for (; --r > -1; )
                    s[r] === e && s.splice(r, 1);
            return L[n].tweens
        }
          , G = function(t, e, i, s) {
            var r, n, a = t.vars.onOverwrite;
            return a && (r = a(t, e, i, s)),
            a = D.onOverwrite,
            a && (n = a(t, e, i, s)),
            r !== !1 && n !== !1
        }
          , W = function(t, e, i, s, r) {
            var n, a, o, h;
            if (1 === s || s >= 4) {
                for (h = r.length,
                n = 0; h > n; n++)
                    if ((o = r[n]) !== e)
                        o._gc || G(o, e) && o._enabled(!1, !1) && (a = !0);
                    else if (5 === s)
                        break;
                return a
            }
            var l, u = e._startTime + _, p = [], c = 0, f = 0 === e._duration;
            for (n = r.length; --n > -1; )
                (o = r[n]) === e || o._gc || o._paused || (o._timeline !== e._timeline ? (l = l || Z(e, 0, f),
                0 === Z(o, l, f) && (p[c++] = o)) : u >= o._startTime && o._startTime + o.totalDuration() / o._timeScale > u && ((f || !o._initted) && 2e-10 >= u - o._startTime || (p[c++] = o)));
            for (n = c; --n > -1; )
                if (o = p[n],
                2 === s && o._kill(i, t, e) && (a = !0),
                2 !== s || !o._firstPT && o._initted) {
                    if (2 !== s && !G(o, e))
                        continue;
                    o._enabled(!1, !1) && (a = !0)
                }
            return a
        }
          , Z = function(t, e, i) {
            for (var s = t._timeline, r = s._timeScale, n = t._startTime; s._timeline; ) {
                if (n += s._startTime,
                r *= s._timeScale,
                s._paused)
                    return -100;
                s = s._timeline
            }
            return n /= r,
            n > e ? n - e : i && n === e || !t._initted && 2 * _ > n - e ? _ : (n += t.totalDuration() / t._timeScale / r) > e + _ ? 0 : n - e - _
        };
        n._init = function() {
            var t, e, i, s, r, n = this.vars, a = this._overwrittenProps, o = this._duration, h = !!n.immediateRender, l = n.ease;
            if (n.startAt) {
                this._startAt && (this._startAt.render(-1, !0),
                this._startAt.kill()),
                r = {};
                for (s in n.startAt)
                    r[s] = n.startAt[s];
                if (r.overwrite = !1,
                r.immediateRender = !0,
                r.lazy = h && n.lazy !== !1,
                r.startAt = r.delay = null,
                this._startAt = D.to(this.target, 0, r),
                h)
                    if (this._time > 0)
                        this._startAt = null;
                    else if (0 !== o)
                        return
            } else if (n.runBackwards && 0 !== o)
                if (this._startAt)
                    this._startAt.render(-1, !0),
                    this._startAt.kill(),
                    this._startAt = null;
                else {
                    0 !== this._time && (h = !1),
                    i = {};
                    for (s in n)
                        U[s] && "autoCSS" !== s || (i[s] = n[s]);
                    if (i.overwrite = 0,
                    i.data = "isFromStart",
                    i.lazy = h && n.lazy !== !1,
                    i.immediateRender = h,
                    this._startAt = D.to(this.target, 0, i),
                    h) {
                        if (0 === this._time)
                            return
                    } else
                        this._startAt._init(),
                        this._startAt._enabled(!1),
                        this.vars.immediateRender && (this._startAt = null)
                }
            if (this._ease = l = l ? l instanceof T ? l : "function" == typeof l ? new T(l,n.easeParams) : w[l] || D.defaultEase : D.defaultEase,
            n.easeParams instanceof Array && l.config && (this._ease = l.config.apply(l, n.easeParams)),
            this._easeType = this._ease._type,
            this._easePower = this._ease._power,
            this._firstPT = null,
            this._targets)
                for (t = this._targets.length; --t > -1; )
                    this._initProps(this._targets[t], this._propLookup[t] = {}, this._siblings[t], a ? a[t] : null) && (e = !0);
            else
                e = this._initProps(this.target, this._propLookup, this._siblings, a);
            if (e && D._onPluginEvent("_onInitAllProps", this),
            a && (this._firstPT || "function" != typeof this.target && this._enabled(!1, !1)),
            n.runBackwards)
                for (i = this._firstPT; i; )
                    i.s += i.c,
                    i.c = -i.c,
                    i = i._next;
            this._onUpdate = n.onUpdate,
            this._initted = !0
        }
        ,
        n._initProps = function(e, i, s, r) {
            var n, a, o, h, l, _;
            if (null == e)
                return !1;
            E[e._gsTweenID] && q(),
            this.vars.css || e.style && e !== t && e.nodeType && N.css && this.vars.autoCSS !== !1 && z(this.vars, e);
            for (n in this.vars) {
                if (_ = this.vars[n],
                U[n])
                    _ && (_ instanceof Array || _.push && c(_)) && -1 !== _.join("").indexOf("{self}") && (this.vars[n] = _ = this._swapSelfInParams(_, this));
                else if (N[n] && (h = new N[n])._onInitTween(e, this.vars[n], this)) {
                    for (this._firstPT = l = {
                        _next: this._firstPT,
                        t: h,
                        p: "setRatio",
                        s: 0,
                        c: 1,
                        f: !0,
                        n: n,
                        pg: !0,
                        pr: h._priority
                    },
                    a = h._overwriteProps.length; --a > -1; )
                        i[h._overwriteProps[a]] = this._firstPT;
                    (h._priority || h._onInitAllProps) && (o = !0),
                    (h._onDisable || h._onEnable) && (this._notifyPluginsOfEnabled = !0)
                } else
                    this._firstPT = i[n] = l = {
                        _next: this._firstPT,
                        t: e,
                        p: n,
                        f: "function" == typeof e[n],
                        n: n,
                        pg: !1,
                        pr: 0
                    },
                    l.s = l.f ? e[n.indexOf("set") || "function" != typeof e["get" + n.substr(3)] ? n : "get" + n.substr(3)]() : parseFloat(e[n]),
                    l.c = "string" == typeof _ && "=" === _.charAt(1) ? parseInt(_.charAt(0) + "1", 10) * Number(_.substr(2)) : Number(_) - l.s || 0;
                l && l._next && (l._next._prev = l)
            }
            return r && this._kill(r, e) ? this._initProps(e, i, s, r) : this._overwrite > 1 && this._firstPT && s.length > 1 && W(e, this, i, this._overwrite, s) ? (this._kill(i, e),
            this._initProps(e, i, s, r)) : (this._firstPT && (this.vars.lazy !== !1 && this._duration || this.vars.lazy && !this._duration) && (E[e._gsTweenID] = !0),
            o)
        }
        ,
        n.render = function(t, e, i) {
            var s, r, n, a, o = this._time, h = this._duration, l = this._rawPrevTime;
            if (t >= h)
                this._totalTime = this._time = h,
                this.ratio = this._ease._calcEnd ? this._ease.getRatio(1) : 1,
                this._reversed || (s = !0,
                r = "onComplete"),
                0 === h && (this._initted || !this.vars.lazy || i) && (this._startTime === this._timeline._duration && (t = 0),
                (0 === t || 0 > l || l === _ && "isPause" !== this.data) && l !== t && (i = !0,
                l > _ && (r = "onReverseComplete")),
                this._rawPrevTime = a = !e || t || l === t ? t : _);
            else if (1e-7 > t)
                this._totalTime = this._time = 0,
                this.ratio = this._ease._calcEnd ? this._ease.getRatio(0) : 0,
                (0 !== o || 0 === h && l > 0 && l !== _) && (r = "onReverseComplete",
                s = this._reversed),
                0 > t && (this._active = !1,
                0 === h && (this._initted || !this.vars.lazy || i) && (l >= 0 && (l !== _ || "isPause" !== this.data) && (i = !0),
                this._rawPrevTime = a = !e || t || l === t ? t : _)),
                this._initted || (i = !0);
            else if (this._totalTime = this._time = t,
            this._easeType) {
                var u = t / h
                  , p = this._easeType
                  , c = this._easePower;
                (1 === p || 3 === p && u >= .5) && (u = 1 - u),
                3 === p && (u *= 2),
                1 === c ? u *= u : 2 === c ? u *= u * u : 3 === c ? u *= u * u * u : 4 === c && (u *= u * u * u * u),
                this.ratio = 1 === p ? 1 - u : 2 === p ? u : .5 > t / h ? u / 2 : 1 - u / 2
            } else
                this.ratio = this._ease.getRatio(t / h);
            if (this._time !== o || i) {
                if (!this._initted) {
                    if (this._init(),
                    !this._initted || this._gc)
                        return;
                    if (!i && this._firstPT && (this.vars.lazy !== !1 && this._duration || this.vars.lazy && !this._duration))
                        return this._time = this._totalTime = o,
                        this._rawPrevTime = l,
                        I.push(this),
                        this._lazy = [t, e],
                        void 0;
                    this._time && !s ? this.ratio = this._ease.getRatio(this._time / h) : s && this._ease._calcEnd && (this.ratio = this._ease.getRatio(0 === this._time ? 0 : 1))
                }
                for (this._lazy !== !1 && (this._lazy = !1),
                this._active || !this._paused && this._time !== o && t >= 0 && (this._active = !0),
                0 === o && (this._startAt && (t >= 0 ? this._startAt.render(t, e, i) : r || (r = "_dummyGS")),
                this.vars.onStart && (0 !== this._time || 0 === h) && (e || this.vars.onStart.apply(this.vars.onStartScope || this, this.vars.onStartParams || y))),
                n = this._firstPT; n; )
                    n.f ? n.t[n.p](n.c * this.ratio + n.s) : n.t[n.p] = n.c * this.ratio + n.s,
                    n = n._next;
                this._onUpdate && (0 > t && this._startAt && t !== -1e-4 && this._startAt.render(t, e, i),
                e || (this._time !== o || s) && this._onUpdate.apply(this.vars.onUpdateScope || this, this.vars.onUpdateParams || y)),
                r && (!this._gc || i) && (0 > t && this._startAt && !this._onUpdate && t !== -1e-4 && this._startAt.render(t, e, i),
                s && (this._timeline.autoRemoveChildren && this._enabled(!1, !1),
                this._active = !1),
                !e && this.vars[r] && this.vars[r].apply(this.vars[r + "Scope"] || this, this.vars[r + "Params"] || y),
                0 === h && this._rawPrevTime === _ && a !== _ && (this._rawPrevTime = 0))
            }
        }
        ,
        n._kill = function(t, e, i) {
            if ("all" === t && (t = null),
            null == t && (null == e || e === this.target))
                return this._lazy = !1,
                this._enabled(!1, !1);
            e = "string" != typeof e ? e || this._targets || this.target : D.selector(e) || e;
            var s, r, n, a, o, h, l, _, u;
            if ((c(e) || M(e)) && "number" != typeof e[0])
                for (s = e.length; --s > -1; )
                    this._kill(t, e[s]) && (h = !0);
            else {
                if (this._targets) {
                    for (s = this._targets.length; --s > -1; )
                        if (e === this._targets[s]) {
                            o = this._propLookup[s] || {},
                            this._overwrittenProps = this._overwrittenProps || [],
                            r = this._overwrittenProps[s] = t ? this._overwrittenProps[s] || {} : "all";
                            break
                        }
                } else {
                    if (e !== this.target)
                        return !1;
                    o = this._propLookup,
                    r = this._overwrittenProps = t ? this._overwrittenProps || {} : "all"
                }
                if (o) {
                    if (l = t || o,
                    _ = t !== r && "all" !== r && t !== o && ("object" != typeof t || !t._tempKill),
                    i && (D.onOverwrite || this.vars.onOverwrite)) {
                        for (n in l)
                            o[n] && (u || (u = []),
                            u.push(n));
                        if (!G(this, i, e, u))
                            return !1
                    }
                    for (n in l)
                        (a = o[n]) && (a.pg && a.t._kill(l) && (h = !0),
                        a.pg && 0 !== a.t._overwriteProps.length || (a._prev ? a._prev._next = a._next : a === this._firstPT && (this._firstPT = a._next),
                        a._next && (a._next._prev = a._prev),
                        a._next = a._prev = null),
                        delete o[n]),
                        _ && (r[n] = 1);
                    !this._firstPT && this._initted && this._enabled(!1, !1)
                }
            }
            return h
        }
        ,
        n.invalidate = function() {
            return this._notifyPluginsOfEnabled && D._onPluginEvent("_onDisable", this),
            this._firstPT = this._overwrittenProps = this._startAt = this._onUpdate = null,
            this._notifyPluginsOfEnabled = this._active = this._lazy = !1,
            this._propLookup = this._targets ? {} : [],
            A.prototype.invalidate.call(this),
            this.vars.immediateRender && (this._time = -_,
            this.render(-this._delay)),
            this
        }
        ,
        n._enabled = function(t, e) {
            if (o || a.wake(),
            t && this._gc) {
                var i, s = this._targets;
                if (s)
                    for (i = s.length; --i > -1; )
                        this._siblings[i] = V(s[i], this, !0);
                else
                    this._siblings = V(this.target, this, !0)
            }
            return A.prototype._enabled.call(this, t, e),
            this._notifyPluginsOfEnabled && this._firstPT ? D._onPluginEvent(t ? "_onEnable" : "_onDisable", this) : !1
        }
        ,
        D.to = function(t, e, i) {
            return new D(t,e,i)
        }
        ,
        D.from = function(t, e, i) {
            return i.runBackwards = !0,
            i.immediateRender = 0 != i.immediateRender,
            new D(t,e,i)
        }
        ,
        D.fromTo = function(t, e, i, s) {
            return s.startAt = i,
            s.immediateRender = 0 != s.immediateRender && 0 != i.immediateRender,
            new D(t,e,s)
        }
        ,
        D.delayedCall = function(t, e, i, s, r) {
            return new D(e,0,{
                delay: t,
                onComplete: e,
                onCompleteParams: i,
                onCompleteScope: s,
                onReverseComplete: e,
                onReverseCompleteParams: i,
                onReverseCompleteScope: s,
                immediateRender: !1,
                lazy: !1,
                useFrames: r,
                overwrite: 0
            })
        }
        ,
        D.set = function(t, e) {
            return new D(t,0,e)
        }
        ,
        D.getTweensOf = function(t, e) {
            if (null == t)
                return [];
            t = "string" != typeof t ? t : D.selector(t) || t;
            var i, s, r, n;
            if ((c(t) || M(t)) && "number" != typeof t[0]) {
                for (i = t.length,
                s = []; --i > -1; )
                    s = s.concat(D.getTweensOf(t[i], e));
                for (i = s.length; --i > -1; )
                    for (n = s[i],
                    r = i; --r > -1; )
                        n === s[r] && s.splice(i, 1)
            } else
                for (s = V(t).concat(),
                i = s.length; --i > -1; )
                    (s[i]._gc || e && !s[i].isActive()) && s.splice(i, 1);
            return s
        }
        ,
        D.killTweensOf = D.killDelayedCallsTo = function(t, e, i) {
            "object" == typeof e && (i = e,
            e = !1);
            for (var s = D.getTweensOf(t, e), r = s.length; --r > -1; )
                s[r]._kill(i, t)
        }
        ;
        var Q = g("plugins.TweenPlugin", function(t, e) {
            this._overwriteProps = (t || "").split(","),
            this._propName = this._overwriteProps[0],
            this._priority = e || 0,
            this._super = Q.prototype
        }, !0);
        if (n = Q.prototype,
        Q.version = "1.10.1",
        Q.API = 2,
        n._firstPT = null,
        n._addTween = function(t, e, i, s, r, n) {
            var a, o;
            return null != s && (a = "number" == typeof s || "=" !== s.charAt(1) ? Number(s) - i : parseInt(s.charAt(0) + "1", 10) * Number(s.substr(2))) ? (this._firstPT = o = {
                _next: this._firstPT,
                t: t,
                p: e,
                s: i,
                c: a,
                f: "function" == typeof t[e],
                n: r || e,
                r: n
            },
            o._next && (o._next._prev = o),
            o) : void 0
        }
        ,
        n.setRatio = function(t) {
            for (var e, i = this._firstPT, s = 1e-6; i; )
                e = i.c * t + i.s,
                i.r ? e = Math.round(e) : s > e && e > -s && (e = 0),
                i.f ? i.t[i.p](e) : i.t[i.p] = e,
                i = i._next
        }
        ,
        n._kill = function(t) {
            var e, i = this._overwriteProps, s = this._firstPT;
            if (null != t[this._propName])
                this._overwriteProps = [];
            else
                for (e = i.length; --e > -1; )
                    null != t[i[e]] && i.splice(e, 1);
            for (; s; )
                null != t[s.n] && (s._next && (s._next._prev = s._prev),
                s._prev ? (s._prev._next = s._next,
                s._prev = null) : this._firstPT === s && (this._firstPT = s._next)),
                s = s._next;
            return !1
        }
        ,
        n._roundProps = function(t, e) {
            for (var i = this._firstPT; i; )
                (t[this._propName] || null != i.n && t[i.n.split(this._propName + "_").join("")]) && (i.r = e),
                i = i._next
        }
        ,
        D._onPluginEvent = function(t, e) {
            var i, s, r, n, a, o = e._firstPT;
            if ("_onInitAllProps" === t) {
                for (; o; ) {
                    for (a = o._next,
                    s = r; s && s.pr > o.pr; )
                        s = s._next;
                    (o._prev = s ? s._prev : n) ? o._prev._next = o : r = o,
                    (o._next = s) ? s._prev = o : n = o,
                    o = a
                }
                o = e._firstPT = r
            }
            for (; o; )
                o.pg && "function" == typeof o.t[t] && o.t[t]() && (i = !0),
                o = o._next;
            return i
        }
        ,
        Q.activate = function(t) {
            for (var e = t.length; --e > -1; )
                t[e].API === Q.API && (N[(new t[e])._propName] = t[e]);
            return !0
        }
        ,
        d.plugin = function(t) {
            if (!(t && t.propName && t.init && t.API))
                throw "illegal plugin definition.";
            var e, i = t.propName, s = t.priority || 0, r = t.overwriteProps, n = {
                init: "_onInitTween",
                set: "setRatio",
                kill: "_kill",
                round: "_roundProps",
                initAll: "_onInitAllProps"
            }, a = g("plugins." + i.charAt(0).toUpperCase() + i.substr(1) + "Plugin", function() {
                Q.call(this, i, s),
                this._overwriteProps = r || []
            }, t.global === !0), o = a.prototype = new Q(i);
            o.constructor = a,
            a.API = t.API;
            for (e in n)
                "function" == typeof t[e] && (o[n[e]] = t[e]);
            return a.version = t.version,
            Q.activate([a]),
            a
        }
        ,
        s = t._gsQueue) {
            for (r = 0; s.length > r; r++)
                s[r]();
            for (n in f)
                f[n].func || t.console.log("GSAP encountered missing dependency: com.greensock." + n)
        }
        o = !1
    }
}("undefined" != typeof module && module.exports && "undefined" != typeof global ? global : this || window, "TweenMax");
