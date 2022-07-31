// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  var error;
  for (var i = 0; i < entry.length; i++) {
    try {
      newRequire(entry[i]);
    } catch (e) {
      // Save first error but execute all entries
      if (!error) {
        error = e;
      }
    }
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  parcelRequire = newRequire;

  if (error) {
    // throw error from earlier, _after updating parcelRequire_
    throw error;
  }

  return newRequire;
})({"node_modules/gsap-trial/gsap-core.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.wrapYoyo = exports.wrap = exports.unitize = exports.toArray = exports.splitColor = exports.snap = exports.shuffle = exports.selector = exports.random = exports.pipe = exports.normalize = exports.mapRange = exports.interpolate = exports.gsap = exports.getUnit = exports.distribute = exports.default = exports.clamp = exports._ticker = exports._sortPropTweensByPriority = exports._setDefaults = exports._roundModifier = exports._round = exports._replaceRandom = exports._renderComplexString = exports._removeLinkedListItem = exports._relExp = exports._plugins = exports._parseRelative = exports._numWithUnitExp = exports._numExp = exports._missingPlugin = exports._isUndefined = exports._isString = exports._getSetter = exports._getProperty = exports._getCache = exports._forEachName = exports._config = exports._colorStringFilter = exports._colorExp = exports._checkPlugin = exports.TweenMax = exports.TweenLite = exports.Tween = exports.TimelineMax = exports.TimelineLite = exports.Timeline = exports.Strong = exports.SteppedEase = exports.Sine = exports.Quint = exports.Quart = exports.Quad = exports.PropTween = exports.Power4 = exports.Power3 = exports.Power2 = exports.Power1 = exports.Power0 = exports.Linear = exports.GSCache = exports.Expo = exports.Elastic = exports.Cubic = exports.Circ = exports.Bounce = exports.Back = exports.Animation = void 0;

function _assertThisInitialized(self) {
  if (self === void 0) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }

  return self;
}

function _inheritsLoose(subClass, superClass) {
  subClass.prototype = Object.create(superClass.prototype);
  subClass.prototype.constructor = subClass;
  subClass.__proto__ = superClass;
}
/*!
 * GSAP 3.10.4
 * https://greensock.com
 *
 * @license Copyright 2008-2022, GreenSock. All rights reserved.
 * Subject to the terms at https://greensock.com/standard-license or for
 * Club GreenSock members, the agreement issued with that membership.
 * @author: Jack Doyle, jack@greensock.com
*/

/* eslint-disable */


var _config = {
  autoSleep: 120,
  force3D: "auto",
  nullTargetWarn: 1,
  units: {
    lineHeight: ""
  }
},
    _defaults = {
  duration: .5,
  overwrite: false,
  delay: 0
},
    _suppressOverwrites,
    _bigNum = 1e8,
    _tinyNum = 1 / _bigNum,
    _2PI = Math.PI * 2,
    _HALF_PI = _2PI / 4,
    _gsID = 0,
    _sqrt = Math.sqrt,
    _cos = Math.cos,
    _sin = Math.sin,
    _isString = function _isString(value) {
  return typeof value === "string";
},
    _isFunction = function _isFunction(value) {
  return typeof value === "function";
},
    _isNumber = function _isNumber(value) {
  return typeof value === "number";
},
    _isUndefined = function _isUndefined(value) {
  return typeof value === "undefined";
},
    _isObject = function _isObject(value) {
  return typeof value === "object";
},
    _isNotFalse = function _isNotFalse(value) {
  return value !== false;
},
    _windowExists = function _windowExists() {
  return typeof window !== "undefined";
},
    _isFuncOrString = function _isFuncOrString(value) {
  return _isFunction(value) || _isString(value);
},
    _isTypedArray = typeof ArrayBuffer === "function" && ArrayBuffer.isView || function () {},
    // note: IE10 has ArrayBuffer, but NOT ArrayBuffer.isView().
_isArray = Array.isArray,
    _strictNumExp = /(?:-?\.?\d|\.)+/gi,
    //only numbers (including negatives and decimals) but NOT relative values.
_numExp = /[-+=.]*\d+[.e\-+]*\d*[e\-+]*\d*/g,
    //finds any numbers, including ones that start with += or -=, negative numbers, and ones in scientific notation like 1e-8.
_numWithUnitExp = /[-+=.]*\d+[.e-]*\d*[a-z%]*/g,
    _complexStringNumExp = /[-+=.]*\d+\.?\d*(?:e-|e\+)?\d*/gi,
    //duplicate so that while we're looping through matches from exec(), it doesn't contaminate the lastIndex of _numExp which we use to search for colors too.
_relExp = /[+-]=-?[.\d]+/,
    _delimitedValueExp = /[^,'"\[\]\s]+/gi,
    // previously /[#\-+.]*\b[a-z\d\-=+%.]+/gi but didn't catch special characters.
_unitExp = /^[+\-=e\s\d]*\d+[.\d]*([a-z]*|%)\s*$/i,
    _globalTimeline,
    _win,
    _coreInitted,
    _doc,
    _globals = {},
    _installScope = {},
    _coreReady,
    _install = function _install(scope) {
  return (_installScope = _merge(scope, _globals)) && gsap;
},
    _missingPlugin = function _missingPlugin(property, value) {
  return console.warn("Invalid property", property, "set to", value, "Missing plugin? gsap.registerPlugin()");
},
    _warn = function _warn(message, suppress) {
  return !suppress && console.warn(message);
},
    _addGlobal = function _addGlobal(name, obj) {
  return name && (_globals[name] = obj) && _installScope && (_installScope[name] = obj) || _globals;
},
    _emptyFunc = function _emptyFunc() {
  return 0;
},
    _reservedProps = {},
    _lazyTweens = [],
    _lazyLookup = {},
    _lastRenderedFrame,
    _plugins = {},
    _effects = {},
    _nextGCFrame = 30,
    _harnessPlugins = [],
    _callbackNames = "",
    _harness = function _harness(targets) {
  var target = targets[0],
      harnessPlugin,
      i;
  _isObject(target) || _isFunction(target) || (targets = [targets]);

  if (!(harnessPlugin = (target._gsap || {}).harness)) {
    // find the first target with a harness. We assume targets passed into an animation will be of similar type, meaning the same kind of harness can be used for them all (performance optimization)
    i = _harnessPlugins.length;

    while (i-- && !_harnessPlugins[i].targetTest(target)) {}

    harnessPlugin = _harnessPlugins[i];
  }

  i = targets.length;

  while (i--) {
    targets[i] && (targets[i]._gsap || (targets[i]._gsap = new GSCache(targets[i], harnessPlugin))) || targets.splice(i, 1);
  }

  return targets;
},
    _getCache = function _getCache(target) {
  return target._gsap || _harness(toArray(target))[0]._gsap;
},
    _getProperty = function _getProperty(target, property, v) {
  return (v = target[property]) && _isFunction(v) ? target[property]() : _isUndefined(v) && target.getAttribute && target.getAttribute(property) || v;
},
    _forEachName = function _forEachName(names, func) {
  return (names = names.split(",")).forEach(func) || names;
},
    //split a comma-delimited list of names into an array, then run a forEach() function and return the split array (this is just a way to consolidate/shorten some code).
_round = function _round(value) {
  return Math.round(value * 100000) / 100000 || 0;
},
    _roundPrecise = function _roundPrecise(value) {
  return Math.round(value * 10000000) / 10000000 || 0;
},
    // increased precision mostly for timing values.
_parseRelative = function _parseRelative(start, value) {
  var operator = value.charAt(0),
      end = parseFloat(value.substr(2));
  start = parseFloat(start);
  return operator === "+" ? start + end : operator === "-" ? start - end : operator === "*" ? start * end : start / end;
},
    _arrayContainsAny = function _arrayContainsAny(toSearch, toFind) {
  //searches one array to find matches for any of the items in the toFind array. As soon as one is found, it returns true. It does NOT return all the matches; it's simply a boolean search.
  var l = toFind.length,
      i = 0;

  for (; toSearch.indexOf(toFind[i]) < 0 && ++i < l;) {}

  return i < l;
},
    _lazyRender = function _lazyRender() {
  var l = _lazyTweens.length,
      a = _lazyTweens.slice(0),
      i,
      tween;

  _lazyLookup = {};
  _lazyTweens.length = 0;

  for (i = 0; i < l; i++) {
    tween = a[i];
    tween && tween._lazy && (tween.render(tween._lazy[0], tween._lazy[1], true)._lazy = 0);
  }
},
    _lazySafeRender = function _lazySafeRender(animation, time, suppressEvents, force) {
  _lazyTweens.length && _lazyRender();
  animation.render(time, suppressEvents, force);
  _lazyTweens.length && _lazyRender(); //in case rendering caused any tweens to lazy-init, we should render them because typically when someone calls seek() or time() or progress(), they expect an immediate render.
},
    _numericIfPossible = function _numericIfPossible(value) {
  var n = parseFloat(value);
  return (n || n === 0) && (value + "").match(_delimitedValueExp).length < 2 ? n : _isString(value) ? value.trim() : value;
},
    _passThrough = function _passThrough(p) {
  return p;
},
    _setDefaults = function _setDefaults(obj, defaults) {
  for (var p in defaults) {
    p in obj || (obj[p] = defaults[p]);
  }

  return obj;
},
    _setKeyframeDefaults = function _setKeyframeDefaults(excludeDuration) {
  return function (obj, defaults) {
    for (var p in defaults) {
      p in obj || p === "duration" && excludeDuration || p === "ease" || (obj[p] = defaults[p]);
    }
  };
},
    _merge = function _merge(base, toMerge) {
  for (var p in toMerge) {
    base[p] = toMerge[p];
  }

  return base;
},
    _mergeDeep = function _mergeDeep(base, toMerge) {
  for (var p in toMerge) {
    p !== "__proto__" && p !== "constructor" && p !== "prototype" && (base[p] = _isObject(toMerge[p]) ? _mergeDeep(base[p] || (base[p] = {}), toMerge[p]) : toMerge[p]);
  }

  return base;
},
    _copyExcluding = function _copyExcluding(obj, excluding) {
  var copy = {},
      p;

  for (p in obj) {
    p in excluding || (copy[p] = obj[p]);
  }

  return copy;
},
    _inheritDefaults = function _inheritDefaults(vars) {
  var parent = vars.parent || _globalTimeline,
      func = vars.keyframes ? _setKeyframeDefaults(_isArray(vars.keyframes)) : _setDefaults;

  if (_isNotFalse(vars.inherit)) {
    while (parent) {
      func(vars, parent.vars.defaults);
      parent = parent.parent || parent._dp;
    }
  }

  return vars;
},
    _arraysMatch = function _arraysMatch(a1, a2) {
  var i = a1.length,
      match = i === a2.length;

  while (match && i-- && a1[i] === a2[i]) {}

  return i < 0;
},
    _addLinkedListItem = function _addLinkedListItem(parent, child, firstProp, lastProp, sortBy) {
  if (firstProp === void 0) {
    firstProp = "_first";
  }

  if (lastProp === void 0) {
    lastProp = "_last";
  }

  var prev = parent[lastProp],
      t;

  if (sortBy) {
    t = child[sortBy];

    while (prev && prev[sortBy] > t) {
      prev = prev._prev;
    }
  }

  if (prev) {
    child._next = prev._next;
    prev._next = child;
  } else {
    child._next = parent[firstProp];
    parent[firstProp] = child;
  }

  if (child._next) {
    child._next._prev = child;
  } else {
    parent[lastProp] = child;
  }

  child._prev = prev;
  child.parent = child._dp = parent;
  return child;
},
    _removeLinkedListItem = function _removeLinkedListItem(parent, child, firstProp, lastProp) {
  if (firstProp === void 0) {
    firstProp = "_first";
  }

  if (lastProp === void 0) {
    lastProp = "_last";
  }

  var prev = child._prev,
      next = child._next;

  if (prev) {
    prev._next = next;
  } else if (parent[firstProp] === child) {
    parent[firstProp] = next;
  }

  if (next) {
    next._prev = prev;
  } else if (parent[lastProp] === child) {
    parent[lastProp] = prev;
  }

  child._next = child._prev = child.parent = null; // don't delete the _dp just so we can revert if necessary. But parent should be null to indicate the item isn't in a linked list.
},
    _removeFromParent = function _removeFromParent(child, onlyIfParentHasAutoRemove) {
  child.parent && (!onlyIfParentHasAutoRemove || child.parent.autoRemoveChildren) && child.parent.remove(child);
  child._act = 0;
},
    _uncache = function _uncache(animation, child) {
  if (animation && (!child || child._end > animation._dur || child._start < 0)) {
    // performance optimization: if a child animation is passed in we should only uncache if that child EXTENDS the animation (its end time is beyond the end)
    var a = animation;

    while (a) {
      a._dirty = 1;
      a = a.parent;
    }
  }

  return animation;
},
    _recacheAncestors = function _recacheAncestors(animation) {
  var parent = animation.parent;

  while (parent && parent.parent) {
    //sometimes we must force a re-sort of all children and update the duration/totalDuration of all ancestor timelines immediately in case, for example, in the middle of a render loop, one tween alters another tween's timeScale which shoves its startTime before 0, forcing the parent timeline to shift around and shiftChildren() which could affect that next tween's render (startTime). Doesn't matter for the root timeline though.
    parent._dirty = 1;
    parent.totalDuration();
    parent = parent.parent;
  }

  return animation;
},
    _hasNoPausedAncestors = function _hasNoPausedAncestors(animation) {
  return !animation || animation._ts && _hasNoPausedAncestors(animation.parent);
},
    _elapsedCycleDuration = function _elapsedCycleDuration(animation) {
  return animation._repeat ? _animationCycle(animation._tTime, animation = animation.duration() + animation._rDelay) * animation : 0;
},
    // feed in the totalTime and cycleDuration and it'll return the cycle (iteration minus 1) and if the playhead is exactly at the very END, it will NOT bump up to the next cycle.
_animationCycle = function _animationCycle(tTime, cycleDuration) {
  var whole = Math.floor(tTime /= cycleDuration);
  return tTime && whole === tTime ? whole - 1 : whole;
},
    _parentToChildTotalTime = function _parentToChildTotalTime(parentTime, child) {
  return (parentTime - child._start) * child._ts + (child._ts >= 0 ? 0 : child._dirty ? child.totalDuration() : child._tDur);
},
    _setEnd = function _setEnd(animation) {
  return animation._end = _roundPrecise(animation._start + (animation._tDur / Math.abs(animation._ts || animation._rts || _tinyNum) || 0));
},
    _alignPlayhead = function _alignPlayhead(animation, totalTime) {
  // adjusts the animation's _start and _end according to the provided totalTime (only if the parent's smoothChildTiming is true and the animation isn't paused). It doesn't do any rendering or forcing things back into parent timelines, etc. - that's what totalTime() is for.
  var parent = animation._dp;

  if (parent && parent.smoothChildTiming && animation._ts) {
    animation._start = _roundPrecise(parent._time - (animation._ts > 0 ? totalTime / animation._ts : ((animation._dirty ? animation.totalDuration() : animation._tDur) - totalTime) / -animation._ts));

    _setEnd(animation);

    parent._dirty || _uncache(parent, animation); //for performance improvement. If the parent's cache is already dirty, it already took care of marking the ancestors as dirty too, so skip the function call here.
  }

  return animation;
},

/*
_totalTimeToTime = (clampedTotalTime, duration, repeat, repeatDelay, yoyo) => {
	let cycleDuration = duration + repeatDelay,
		time = _round(clampedTotalTime % cycleDuration);
	if (time > duration) {
		time = duration;
	}
	return (yoyo && (~~(clampedTotalTime / cycleDuration) & 1)) ? duration - time : time;
},
*/
_postAddChecks = function _postAddChecks(timeline, child) {
  var t;

  if (child._time || child._initted && !child._dur) {
    //in case, for example, the _start is moved on a tween that has already rendered. Imagine it's at its end state, then the startTime is moved WAY later (after the end of this timeline), it should render at its beginning.
    t = _parentToChildTotalTime(timeline.rawTime(), child);

    if (!child._dur || _clamp(0, child.totalDuration(), t) - child._tTime > _tinyNum) {
      child.render(t, true);
    }
  } //if the timeline has already ended but the inserted tween/timeline extends the duration, we should enable this timeline again so that it renders properly. We should also align the playhead with the parent timeline's when appropriate.


  if (_uncache(timeline, child)._dp && timeline._initted && timeline._time >= timeline._dur && timeline._ts) {
    //in case any of the ancestors had completed but should now be enabled...
    if (timeline._dur < timeline.duration()) {
      t = timeline;

      while (t._dp) {
        t.rawTime() >= 0 && t.totalTime(t._tTime); //moves the timeline (shifts its startTime) if necessary, and also enables it. If it's currently zero, though, it may not be scheduled to render until later so there's no need to force it to align with the current playhead position. Only move to catch up with the playhead.

        t = t._dp;
      }
    }

    timeline._zTime = -_tinyNum; // helps ensure that the next render() will be forced (crossingStart = true in render()), even if the duration hasn't changed (we're adding a child which would need to get rendered). Definitely an edge case. Note: we MUST do this AFTER the loop above where the totalTime() might trigger a render() because this _addToTimeline() method gets called from the Animation constructor, BEFORE tweens even record their targets, etc. so we wouldn't want things to get triggered in the wrong order.
  }
},
    _addToTimeline = function _addToTimeline(timeline, child, position, skipChecks) {
  child.parent && _removeFromParent(child);
  child._start = _roundPrecise((_isNumber(position) ? position : position || timeline !== _globalTimeline ? _parsePosition(timeline, position, child) : timeline._time) + child._delay);
  child._end = _roundPrecise(child._start + (child.totalDuration() / Math.abs(child.timeScale()) || 0));

  _addLinkedListItem(timeline, child, "_first", "_last", timeline._sort ? "_start" : 0);

  _isFromOrFromStart(child) || (timeline._recent = child);
  skipChecks || _postAddChecks(timeline, child);
  return timeline;
},
    _scrollTrigger = function _scrollTrigger(animation, trigger) {
  return (_globals.ScrollTrigger || _missingPlugin("scrollTrigger", trigger)) && _globals.ScrollTrigger.create(trigger, animation);
},
    _attemptInitTween = function _attemptInitTween(tween, totalTime, force, suppressEvents) {
  _initTween(tween, totalTime);

  if (!tween._initted) {
    return 1;
  }

  if (!force && tween._pt && (tween._dur && tween.vars.lazy !== false || !tween._dur && tween.vars.lazy) && _lastRenderedFrame !== _ticker.frame) {
    _lazyTweens.push(tween);

    tween._lazy = [totalTime, suppressEvents];
    return 1;
  }
},
    _parentPlayheadIsBeforeStart = function _parentPlayheadIsBeforeStart(_ref) {
  var parent = _ref.parent;
  return parent && parent._ts && parent._initted && !parent._lock && (parent.rawTime() < 0 || _parentPlayheadIsBeforeStart(parent));
},
    // check parent's _lock because when a timeline repeats/yoyos and does its artificial wrapping, we shouldn't force the ratio back to 0
_isFromOrFromStart = function _isFromOrFromStart(_ref2) {
  var data = _ref2.data;
  return data === "isFromStart" || data === "isStart";
},
    _renderZeroDurationTween = function _renderZeroDurationTween(tween, totalTime, suppressEvents, force) {
  var prevRatio = tween.ratio,
      ratio = totalTime < 0 || !totalTime && (!tween._start && _parentPlayheadIsBeforeStart(tween) && !(!tween._initted && _isFromOrFromStart(tween)) || (tween._ts < 0 || tween._dp._ts < 0) && !_isFromOrFromStart(tween)) ? 0 : 1,
      // if the tween or its parent is reversed and the totalTime is 0, we should go to a ratio of 0. Edge case: if a from() or fromTo() stagger tween is placed later in a timeline, the "startAt" zero-duration tween could initially render at a time when the parent timeline's playhead is technically BEFORE where this tween is, so make sure that any "from" and "fromTo" startAt tweens are rendered the first time at a ratio of 1.
  repeatDelay = tween._rDelay,
      tTime = 0,
      pt,
      iteration,
      prevIteration;

  if (repeatDelay && tween._repeat) {
    // in case there's a zero-duration tween that has a repeat with a repeatDelay
    tTime = _clamp(0, tween._tDur, totalTime);
    iteration = _animationCycle(tTime, repeatDelay);
    tween._yoyo && iteration & 1 && (ratio = 1 - ratio);

    if (iteration !== _animationCycle(tween._tTime, repeatDelay)) {
      // if iteration changed
      prevRatio = 1 - ratio;
      tween.vars.repeatRefresh && tween._initted && tween.invalidate();
    }
  }

  if (ratio !== prevRatio || force || tween._zTime === _tinyNum || !totalTime && tween._zTime) {
    if (!tween._initted && _attemptInitTween(tween, totalTime, force, suppressEvents)) {
      // if we render the very beginning (time == 0) of a fromTo(), we must force the render (normal tweens wouldn't need to render at a time of 0 when the prevTime was also 0). This is also mandatory to make sure overwriting kicks in immediately.
      return;
    }

    prevIteration = tween._zTime;
    tween._zTime = totalTime || (suppressEvents ? _tinyNum : 0); // when the playhead arrives at EXACTLY time 0 (right on top) of a zero-duration tween, we need to discern if events are suppressed so that when the playhead moves again (next time), it'll trigger the callback. If events are NOT suppressed, obviously the callback would be triggered in this render. Basically, the callback should fire either when the playhead ARRIVES or LEAVES this exact spot, not both. Imagine doing a timeline.seek(0) and there's a callback that sits at 0. Since events are suppressed on that seek() by default, nothing will fire, but when the playhead moves off of that position, the callback should fire. This behavior is what people intuitively expect.

    suppressEvents || (suppressEvents = totalTime && !prevIteration); // if it was rendered previously at exactly 0 (_zTime) and now the playhead is moving away, DON'T fire callbacks otherwise they'll seem like duplicates.

    tween.ratio = ratio;
    tween._from && (ratio = 1 - ratio);
    tween._time = 0;
    tween._tTime = tTime;
    pt = tween._pt;

    while (pt) {
      pt.r(ratio, pt.d);
      pt = pt._next;
    }

    tween._startAt && totalTime < 0 && tween._startAt.render(totalTime, true, true);
    tween._onUpdate && !suppressEvents && _callback(tween, "onUpdate");
    tTime && tween._repeat && !suppressEvents && tween.parent && _callback(tween, "onRepeat");

    if ((totalTime >= tween._tDur || totalTime < 0) && tween.ratio === ratio) {
      ratio && _removeFromParent(tween, 1);

      if (!suppressEvents) {
        _callback(tween, ratio ? "onComplete" : "onReverseComplete", true);

        tween._prom && tween._prom();
      }
    }
  } else if (!tween._zTime) {
    tween._zTime = totalTime;
  }
},
    _findNextPauseTween = function _findNextPauseTween(animation, prevTime, time) {
  var child;

  if (time > prevTime) {
    child = animation._first;

    while (child && child._start <= time) {
      if (child.data === "isPause" && child._start > prevTime) {
        return child;
      }

      child = child._next;
    }
  } else {
    child = animation._last;

    while (child && child._start >= time) {
      if (child.data === "isPause" && child._start < prevTime) {
        return child;
      }

      child = child._prev;
    }
  }
},
    _setDuration = function _setDuration(animation, duration, skipUncache, leavePlayhead) {
  var repeat = animation._repeat,
      dur = _roundPrecise(duration) || 0,
      totalProgress = animation._tTime / animation._tDur;
  totalProgress && !leavePlayhead && (animation._time *= dur / animation._dur);
  animation._dur = dur;
  animation._tDur = !repeat ? dur : repeat < 0 ? 1e10 : _roundPrecise(dur * (repeat + 1) + animation._rDelay * repeat);
  totalProgress > 0 && !leavePlayhead ? _alignPlayhead(animation, animation._tTime = animation._tDur * totalProgress) : animation.parent && _setEnd(animation);
  skipUncache || _uncache(animation.parent, animation);
  return animation;
},
    _onUpdateTotalDuration = function _onUpdateTotalDuration(animation) {
  return animation instanceof Timeline ? _uncache(animation) : _setDuration(animation, animation._dur);
},
    _zeroPosition = {
  _start: 0,
  endTime: _emptyFunc,
  totalDuration: _emptyFunc
},
    _parsePosition = function _parsePosition(animation, position, percentAnimation) {
  var labels = animation.labels,
      recent = animation._recent || _zeroPosition,
      clippedDuration = animation.duration() >= _bigNum ? recent.endTime(false) : animation._dur,
      //in case there's a child that infinitely repeats, users almost never intend for the insertion point of a new child to be based on a SUPER long value like that so we clip it and assume the most recently-added child's endTime should be used instead.
  i,
      offset,
      isPercent;

  if (_isString(position) && (isNaN(position) || position in labels)) {
    //if the string is a number like "1", check to see if there's a label with that name, otherwise interpret it as a number (absolute value).
    offset = position.charAt(0);
    isPercent = position.substr(-1) === "%";
    i = position.indexOf("=");

    if (offset === "<" || offset === ">") {
      i >= 0 && (position = position.replace(/=/, ""));
      return (offset === "<" ? recent._start : recent.endTime(recent._repeat >= 0)) + (parseFloat(position.substr(1)) || 0) * (isPercent ? (i < 0 ? recent : percentAnimation).totalDuration() / 100 : 1);
    }

    if (i < 0) {
      position in labels || (labels[position] = clippedDuration);
      return labels[position];
    }

    offset = parseFloat(position.charAt(i - 1) + position.substr(i + 1));

    if (isPercent && percentAnimation) {
      offset = offset / 100 * (_isArray(percentAnimation) ? percentAnimation[0] : percentAnimation).totalDuration();
    }

    return i > 1 ? _parsePosition(animation, position.substr(0, i - 1), percentAnimation) + offset : clippedDuration + offset;
  }

  return position == null ? clippedDuration : +position;
},
    _createTweenType = function _createTweenType(type, params, timeline) {
  var isLegacy = _isNumber(params[1]),
      varsIndex = (isLegacy ? 2 : 1) + (type < 2 ? 0 : 1),
      vars = params[varsIndex],
      irVars,
      parent;

  isLegacy && (vars.duration = params[1]);
  vars.parent = timeline;

  if (type) {
    irVars = vars;
    parent = timeline;

    while (parent && !("immediateRender" in irVars)) {
      // inheritance hasn't happened yet, but someone may have set a default in an ancestor timeline. We could do vars.immediateRender = _isNotFalse(_inheritDefaults(vars).immediateRender) but that'd exact a slight performance penalty because _inheritDefaults() also runs in the Tween constructor. We're paying a small kb price here to gain speed.
      irVars = parent.vars.defaults || {};
      parent = _isNotFalse(parent.vars.inherit) && parent.parent;
    }

    vars.immediateRender = _isNotFalse(irVars.immediateRender);
    type < 2 ? vars.runBackwards = 1 : vars.startAt = params[varsIndex - 1]; // "from" vars
  }

  return new Tween(params[0], vars, params[varsIndex + 1]);
},
    _conditionalReturn = function _conditionalReturn(value, func) {
  return value || value === 0 ? func(value) : func;
},
    _clamp = function _clamp(min, max, value) {
  return value < min ? min : value > max ? max : value;
},
    getUnit = function getUnit(value, v) {
  return !_isString(value) || !(v = _unitExp.exec(value)) ? "" : v[1];
},
    // note: protect against padded numbers as strings, like "100.100". That shouldn't return "00" as the unit. If it's numeric, return no unit.
clamp = function clamp(min, max, value) {
  return _conditionalReturn(value, function (v) {
    return _clamp(min, max, v);
  });
},
    _slice = [].slice,
    _isArrayLike = function _isArrayLike(value, nonEmpty) {
  return value && _isObject(value) && "length" in value && (!nonEmpty && !value.length || value.length - 1 in value && _isObject(value[0])) && !value.nodeType && value !== _win;
},
    _flatten = function _flatten(ar, leaveStrings, accumulator) {
  if (accumulator === void 0) {
    accumulator = [];
  }

  return ar.forEach(function (value) {
    var _accumulator;

    return _isString(value) && !leaveStrings || _isArrayLike(value, 1) ? (_accumulator = accumulator).push.apply(_accumulator, toArray(value)) : accumulator.push(value);
  }) || accumulator;
},
    //takes any value and returns an array. If it's a string (and leaveStrings isn't true), it'll use document.querySelectorAll() and convert that to an array. It'll also accept iterables like jQuery objects.
toArray = function toArray(value, scope, leaveStrings) {
  return _isString(value) && !leaveStrings && (_coreInitted || !_wake()) ? _slice.call((scope || _doc).querySelectorAll(value), 0) : _isArray(value) ? _flatten(value, leaveStrings) : _isArrayLike(value) ? _slice.call(value, 0) : value ? [value] : [];
},
    selector = function selector(value) {
  value = toArray(value)[0] || _warn("Invalid scope") || {};
  return function (v) {
    var el = value.current || value.nativeElement || value;
    return toArray(v, el.querySelectorAll ? el : el === value ? _warn("Invalid scope") || _doc.createElement("div") : value);
  };
},
    shuffle = function shuffle(a) {
  return a.sort(function () {
    return .5 - Math.random();
  });
},
    // alternative that's a bit faster and more reliably diverse but bigger:   for (let j, v, i = a.length; i; j = Math.floor(Math.random() * i), v = a[--i], a[i] = a[j], a[j] = v); return a;
//for distributing values across an array. Can accept a number, a function or (most commonly) a function which can contain the following properties: {base, amount, from, ease, grid, axis, length, each}. Returns a function that expects the following parameters: index, target, array. Recognizes the following
distribute = function distribute(v) {
  if (_isFunction(v)) {
    return v;
  }

  var vars = _isObject(v) ? v : {
    each: v
  },
      //n:1 is just to indicate v was a number; we leverage that later to set v according to the length we get. If a number is passed in, we treat it like the old stagger value where 0.1, for example, would mean that things would be distributed with 0.1 between each element in the array rather than a total "amount" that's chunked out among them all.
  ease = _parseEase(vars.ease),
      from = vars.from || 0,
      base = parseFloat(vars.base) || 0,
      cache = {},
      isDecimal = from > 0 && from < 1,
      ratios = isNaN(from) || isDecimal,
      axis = vars.axis,
      ratioX = from,
      ratioY = from;

  if (_isString(from)) {
    ratioX = ratioY = {
      center: .5,
      edges: .5,
      end: 1
    }[from] || 0;
  } else if (!isDecimal && ratios) {
    ratioX = from[0];
    ratioY = from[1];
  }

  return function (i, target, a) {
    var l = (a || vars).length,
        distances = cache[l],
        originX,
        originY,
        x,
        y,
        d,
        j,
        max,
        min,
        wrapAt;

    if (!distances) {
      wrapAt = vars.grid === "auto" ? 0 : (vars.grid || [1, _bigNum])[1];

      if (!wrapAt) {
        max = -_bigNum;

        while (max < (max = a[wrapAt++].getBoundingClientRect().left) && wrapAt < l) {}

        wrapAt--;
      }

      distances = cache[l] = [];
      originX = ratios ? Math.min(wrapAt, l) * ratioX - .5 : from % wrapAt;
      originY = wrapAt === _bigNum ? 0 : ratios ? l * ratioY / wrapAt - .5 : from / wrapAt | 0;
      max = 0;
      min = _bigNum;

      for (j = 0; j < l; j++) {
        x = j % wrapAt - originX;
        y = originY - (j / wrapAt | 0);
        distances[j] = d = !axis ? _sqrt(x * x + y * y) : Math.abs(axis === "y" ? y : x);
        d > max && (max = d);
        d < min && (min = d);
      }

      from === "random" && shuffle(distances);
      distances.max = max - min;
      distances.min = min;
      distances.v = l = (parseFloat(vars.amount) || parseFloat(vars.each) * (wrapAt > l ? l - 1 : !axis ? Math.max(wrapAt, l / wrapAt) : axis === "y" ? l / wrapAt : wrapAt) || 0) * (from === "edges" ? -1 : 1);
      distances.b = l < 0 ? base - l : base;
      distances.u = getUnit(vars.amount || vars.each) || 0; //unit

      ease = ease && l < 0 ? _invertEase(ease) : ease;
    }

    l = (distances[i] - distances.min) / distances.max || 0;
    return _roundPrecise(distances.b + (ease ? ease(l) : l) * distances.v) + distances.u; //round in order to work around floating point errors
  };
},
    _roundModifier = function _roundModifier(v) {
  //pass in 0.1 get a function that'll round to the nearest tenth, or 5 to round to the closest 5, or 0.001 to the closest 1000th, etc.
  var p = Math.pow(10, ((v + "").split(".")[1] || "").length); //to avoid floating point math errors (like 24 * 0.1 == 2.4000000000000004), we chop off at a specific number of decimal places (much faster than toFixed())

  return function (raw) {
    var n = Math.round(parseFloat(raw) / v) * v * p;
    return (n - n % 1) / p + (_isNumber(raw) ? 0 : getUnit(raw)); // n - n % 1 replaces Math.floor() in order to handle negative values properly. For example, Math.floor(-150.00000000000003) is 151!
  };
},
    snap = function snap(snapTo, value) {
  var isArray = _isArray(snapTo),
      radius,
      is2D;

  if (!isArray && _isObject(snapTo)) {
    radius = isArray = snapTo.radius || _bigNum;

    if (snapTo.values) {
      snapTo = toArray(snapTo.values);

      if (is2D = !_isNumber(snapTo[0])) {
        radius *= radius; //performance optimization so we don't have to Math.sqrt() in the loop.
      }
    } else {
      snapTo = _roundModifier(snapTo.increment);
    }
  }

  return _conditionalReturn(value, !isArray ? _roundModifier(snapTo) : _isFunction(snapTo) ? function (raw) {
    is2D = snapTo(raw);
    return Math.abs(is2D - raw) <= radius ? is2D : raw;
  } : function (raw) {
    var x = parseFloat(is2D ? raw.x : raw),
        y = parseFloat(is2D ? raw.y : 0),
        min = _bigNum,
        closest = 0,
        i = snapTo.length,
        dx,
        dy;

    while (i--) {
      if (is2D) {
        dx = snapTo[i].x - x;
        dy = snapTo[i].y - y;
        dx = dx * dx + dy * dy;
      } else {
        dx = Math.abs(snapTo[i] - x);
      }

      if (dx < min) {
        min = dx;
        closest = i;
      }
    }

    closest = !radius || min <= radius ? snapTo[closest] : raw;
    return is2D || closest === raw || _isNumber(raw) ? closest : closest + getUnit(raw);
  });
},
    random = function random(min, max, roundingIncrement, returnFunction) {
  return _conditionalReturn(_isArray(min) ? !max : roundingIncrement === true ? !!(roundingIncrement = 0) : !returnFunction, function () {
    return _isArray(min) ? min[~~(Math.random() * min.length)] : (roundingIncrement = roundingIncrement || 1e-5) && (returnFunction = roundingIncrement < 1 ? Math.pow(10, (roundingIncrement + "").length - 2) : 1) && Math.floor(Math.round((min - roundingIncrement / 2 + Math.random() * (max - min + roundingIncrement * .99)) / roundingIncrement) * roundingIncrement * returnFunction) / returnFunction;
  });
},
    pipe = function pipe() {
  for (var _len = arguments.length, functions = new Array(_len), _key = 0; _key < _len; _key++) {
    functions[_key] = arguments[_key];
  }

  return function (value) {
    return functions.reduce(function (v, f) {
      return f(v);
    }, value);
  };
},
    unitize = function unitize(func, unit) {
  return function (value) {
    return func(parseFloat(value)) + (unit || getUnit(value));
  };
},
    normalize = function normalize(min, max, value) {
  return mapRange(min, max, 0, 1, value);
},
    _wrapArray = function _wrapArray(a, wrapper, value) {
  return _conditionalReturn(value, function (index) {
    return a[~~wrapper(index)];
  });
},
    wrap = function wrap(min, max, value) {
  // NOTE: wrap() CANNOT be an arrow function! A very odd compiling bug causes problems (unrelated to GSAP).
  var range = max - min;
  return _isArray(min) ? _wrapArray(min, wrap(0, min.length), max) : _conditionalReturn(value, function (value) {
    return (range + (value - min) % range) % range + min;
  });
},
    wrapYoyo = function wrapYoyo(min, max, value) {
  var range = max - min,
      total = range * 2;
  return _isArray(min) ? _wrapArray(min, wrapYoyo(0, min.length - 1), max) : _conditionalReturn(value, function (value) {
    value = (total + (value - min) % total) % total || 0;
    return min + (value > range ? total - value : value);
  });
},
    _replaceRandom = function _replaceRandom(value) {
  //replaces all occurrences of random(...) in a string with the calculated random value. can be a range like random(-100, 100, 5) or an array like random([0, 100, 500])
  var prev = 0,
      s = "",
      i,
      nums,
      end,
      isArray;

  while (~(i = value.indexOf("random(", prev))) {
    end = value.indexOf(")", i);
    isArray = value.charAt(i + 7) === "[";
    nums = value.substr(i + 7, end - i - 7).match(isArray ? _delimitedValueExp : _strictNumExp);
    s += value.substr(prev, i - prev) + random(isArray ? nums : +nums[0], isArray ? 0 : +nums[1], +nums[2] || 1e-5);
    prev = end + 1;
  }

  return s + value.substr(prev, value.length - prev);
},
    mapRange = function mapRange(inMin, inMax, outMin, outMax, value) {
  var inRange = inMax - inMin,
      outRange = outMax - outMin;
  return _conditionalReturn(value, function (value) {
    return outMin + ((value - inMin) / inRange * outRange || 0);
  });
},
    interpolate = function interpolate(start, end, progress, mutate) {
  var func = isNaN(start + end) ? 0 : function (p) {
    return (1 - p) * start + p * end;
  };

  if (!func) {
    var isString = _isString(start),
        master = {},
        p,
        i,
        interpolators,
        l,
        il;

    progress === true && (mutate = 1) && (progress = null);

    if (isString) {
      start = {
        p: start
      };
      end = {
        p: end
      };
    } else if (_isArray(start) && !_isArray(end)) {
      interpolators = [];
      l = start.length;
      il = l - 2;

      for (i = 1; i < l; i++) {
        interpolators.push(interpolate(start[i - 1], start[i])); //build the interpolators up front as a performance optimization so that when the function is called many times, it can just reuse them.
      }

      l--;

      func = function func(p) {
        p *= l;
        var i = Math.min(il, ~~p);
        return interpolators[i](p - i);
      };

      progress = end;
    } else if (!mutate) {
      start = _merge(_isArray(start) ? [] : {}, start);
    }

    if (!interpolators) {
      for (p in end) {
        _addPropTween.call(master, start, p, "get", end[p]);
      }

      func = function func(p) {
        return _renderPropTweens(p, master) || (isString ? start.p : start);
      };
    }
  }

  return _conditionalReturn(progress, func);
},
    _getLabelInDirection = function _getLabelInDirection(timeline, fromTime, backward) {
  //used for nextLabel() and previousLabel()
  var labels = timeline.labels,
      min = _bigNum,
      p,
      distance,
      label;

  for (p in labels) {
    distance = labels[p] - fromTime;

    if (distance < 0 === !!backward && distance && min > (distance = Math.abs(distance))) {
      label = p;
      min = distance;
    }
  }

  return label;
},
    _callback = function _callback(animation, type, executeLazyFirst) {
  var v = animation.vars,
      callback = v[type],
      params,
      scope;

  if (!callback) {
    return;
  }

  params = v[type + "Params"];
  scope = v.callbackScope || animation;
  executeLazyFirst && _lazyTweens.length && _lazyRender(); //in case rendering caused any tweens to lazy-init, we should render them because typically when a timeline finishes, users expect things to have rendered fully. Imagine an onUpdate on a timeline that reports/checks tweened values.

  return params ? callback.apply(scope, params) : callback.call(scope);
},
    _interrupt = function _interrupt(animation) {
  _removeFromParent(animation);

  animation.scrollTrigger && animation.scrollTrigger.kill(false);
  animation.progress() < 1 && _callback(animation, "onInterrupt");
  return animation;
},
    _quickTween,
    _createPlugin = function _createPlugin(config) {
  config = !config.name && config["default"] || config; //UMD packaging wraps things oddly, so for example MotionPathHelper becomes {MotionPathHelper:MotionPathHelper, default:MotionPathHelper}.

  var name = config.name,
      isFunc = _isFunction(config),
      Plugin = name && !isFunc && config.init ? function () {
    this._props = [];
  } : config,
      //in case someone passes in an object that's not a plugin, like CustomEase
  instanceDefaults = {
    init: _emptyFunc,
    render: _renderPropTweens,
    add: _addPropTween,
    kill: _killPropTweensOf,
    modifier: _addPluginModifier,
    rawVars: 0
  },
      statics = {
    targetTest: 0,
    get: 0,
    getSetter: _getSetter,
    aliases: {},
    register: 0
  };

  _wake();

  if (config !== Plugin) {
    if (_plugins[name]) {
      return;
    }

    _setDefaults(Plugin, _setDefaults(_copyExcluding(config, instanceDefaults), statics)); //static methods


    _merge(Plugin.prototype, _merge(instanceDefaults, _copyExcluding(config, statics))); //instance methods


    _plugins[Plugin.prop = name] = Plugin;

    if (config.targetTest) {
      _harnessPlugins.push(Plugin);

      _reservedProps[name] = 1;
    }

    name = (name === "css" ? "CSS" : name.charAt(0).toUpperCase() + name.substr(1)) + "Plugin"; //for the global name. "motionPath" should become MotionPathPlugin
  }

  _addGlobal(name, Plugin);

  config.register && config.register(gsap, Plugin, PropTween);
},

/*
 * --------------------------------------------------------------------------------------
 * COLORS
 * --------------------------------------------------------------------------------------
 */
_255 = 255,
    _colorLookup = {
  aqua: [0, _255, _255],
  lime: [0, _255, 0],
  silver: [192, 192, 192],
  black: [0, 0, 0],
  maroon: [128, 0, 0],
  teal: [0, 128, 128],
  blue: [0, 0, _255],
  navy: [0, 0, 128],
  white: [_255, _255, _255],
  olive: [128, 128, 0],
  yellow: [_255, _255, 0],
  orange: [_255, 165, 0],
  gray: [128, 128, 128],
  purple: [128, 0, 128],
  green: [0, 128, 0],
  red: [_255, 0, 0],
  pink: [_255, 192, 203],
  cyan: [0, _255, _255],
  transparent: [_255, _255, _255, 0]
},
    // possible future idea to replace the hard-coded color name values - put this in the ticker.wake() where we set the _doc:
// let ctx = _doc.createElement("canvas").getContext("2d");
// _forEachName("aqua,lime,silver,black,maroon,teal,blue,navy,white,olive,yellow,orange,gray,purple,green,red,pink,cyan", color => {ctx.fillStyle = color; _colorLookup[color] = splitColor(ctx.fillStyle)});
_hue = function _hue(h, m1, m2) {
  h += h < 0 ? 1 : h > 1 ? -1 : 0;
  return (h * 6 < 1 ? m1 + (m2 - m1) * h * 6 : h < .5 ? m2 : h * 3 < 2 ? m1 + (m2 - m1) * (2 / 3 - h) * 6 : m1) * _255 + .5 | 0;
},
    splitColor = function splitColor(v, toHSL, forceAlpha) {
  var a = !v ? _colorLookup.black : _isNumber(v) ? [v >> 16, v >> 8 & _255, v & _255] : 0,
      r,
      g,
      b,
      h,
      s,
      l,
      max,
      min,
      d,
      wasHSL;

  if (!a) {
    if (v.substr(-1) === ",") {
      //sometimes a trailing comma is included and we should chop it off (typically from a comma-delimited list of values like a textShadow:"2px 2px 2px blue, 5px 5px 5px rgb(255,0,0)" - in this example "blue," has a trailing comma. We could strip it out inside parseComplex() but we'd need to do it to the beginning and ending values plus it wouldn't provide protection from other potential scenarios like if the user passes in a similar value.
      v = v.substr(0, v.length - 1);
    }

    if (_colorLookup[v]) {
      a = _colorLookup[v];
    } else if (v.charAt(0) === "#") {
      if (v.length < 6) {
        //for shorthand like #9F0 or #9F0F (could have alpha)
        r = v.charAt(1);
        g = v.charAt(2);
        b = v.charAt(3);
        v = "#" + r + r + g + g + b + b + (v.length === 5 ? v.charAt(4) + v.charAt(4) : "");
      }

      if (v.length === 9) {
        // hex with alpha, like #fd5e53ff
        a = parseInt(v.substr(1, 6), 16);
        return [a >> 16, a >> 8 & _255, a & _255, parseInt(v.substr(7), 16) / 255];
      }

      v = parseInt(v.substr(1), 16);
      a = [v >> 16, v >> 8 & _255, v & _255];
    } else if (v.substr(0, 3) === "hsl") {
      a = wasHSL = v.match(_strictNumExp);

      if (!toHSL) {
        h = +a[0] % 360 / 360;
        s = +a[1] / 100;
        l = +a[2] / 100;
        g = l <= .5 ? l * (s + 1) : l + s - l * s;
        r = l * 2 - g;
        a.length > 3 && (a[3] *= 1); //cast as number

        a[0] = _hue(h + 1 / 3, r, g);
        a[1] = _hue(h, r, g);
        a[2] = _hue(h - 1 / 3, r, g);
      } else if (~v.indexOf("=")) {
        //if relative values are found, just return the raw strings with the relative prefixes in place.
        a = v.match(_numExp);
        forceAlpha && a.length < 4 && (a[3] = 1);
        return a;
      }
    } else {
      a = v.match(_strictNumExp) || _colorLookup.transparent;
    }

    a = a.map(Number);
  }

  if (toHSL && !wasHSL) {
    r = a[0] / _255;
    g = a[1] / _255;
    b = a[2] / _255;
    max = Math.max(r, g, b);
    min = Math.min(r, g, b);
    l = (max + min) / 2;

    if (max === min) {
      h = s = 0;
    } else {
      d = max - min;
      s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
      h = max === r ? (g - b) / d + (g < b ? 6 : 0) : max === g ? (b - r) / d + 2 : (r - g) / d + 4;
      h *= 60;
    }

    a[0] = ~~(h + .5);
    a[1] = ~~(s * 100 + .5);
    a[2] = ~~(l * 100 + .5);
  }

  forceAlpha && a.length < 4 && (a[3] = 1);
  return a;
},
    _colorOrderData = function _colorOrderData(v) {
  // strips out the colors from the string, finds all the numeric slots (with units) and returns an array of those. The Array also has a "c" property which is an Array of the index values where the colors belong. This is to help work around issues where there's a mis-matched order of color/numeric data like drop-shadow(#f00 0px 1px 2px) and drop-shadow(0x 1px 2px #f00). This is basically a helper function used in _formatColors()
  var values = [],
      c = [],
      i = -1;
  v.split(_colorExp).forEach(function (v) {
    var a = v.match(_numWithUnitExp) || [];
    values.push.apply(values, a);
    c.push(i += a.length + 1);
  });
  values.c = c;
  return values;
},
    _formatColors = function _formatColors(s, toHSL, orderMatchData) {
  var result = "",
      colors = (s + result).match(_colorExp),
      type = toHSL ? "hsla(" : "rgba(",
      i = 0,
      c,
      shell,
      d,
      l;

  if (!colors) {
    return s;
  }

  colors = colors.map(function (color) {
    return (color = splitColor(color, toHSL, 1)) && type + (toHSL ? color[0] + "," + color[1] + "%," + color[2] + "%," + color[3] : color.join(",")) + ")";
  });

  if (orderMatchData) {
    d = _colorOrderData(s);
    c = orderMatchData.c;

    if (c.join(result) !== d.c.join(result)) {
      shell = s.replace(_colorExp, "1").split(_numWithUnitExp);
      l = shell.length - 1;

      for (; i < l; i++) {
        result += shell[i] + (~c.indexOf(i) ? colors.shift() || type + "0,0,0,0)" : (d.length ? d : colors.length ? colors : orderMatchData).shift());
      }
    }
  }

  if (!shell) {
    shell = s.split(_colorExp);
    l = shell.length - 1;

    for (; i < l; i++) {
      result += shell[i] + colors[i];
    }
  }

  return result + shell[l];
},
    _colorExp = function () {
  var s = "(?:\\b(?:(?:rgb|rgba|hsl|hsla)\\(.+?\\))|\\B#(?:[0-9a-f]{3,4}){1,2}\\b",
      //we'll dynamically build this Regular Expression to conserve file size. After building it, it will be able to find rgb(), rgba(), # (hexadecimal), and named color values like red, blue, purple, etc.,
  p;

  for (p in _colorLookup) {
    s += "|" + p + "\\b";
  }

  return new RegExp(s + ")", "gi");
}(),
    _hslExp = /hsl[a]?\(/,
    _colorStringFilter = function _colorStringFilter(a) {
  var combined = a.join(" "),
      toHSL;
  _colorExp.lastIndex = 0;

  if (_colorExp.test(combined)) {
    toHSL = _hslExp.test(combined);
    a[1] = _formatColors(a[1], toHSL);
    a[0] = _formatColors(a[0], toHSL, _colorOrderData(a[1])); // make sure the order of numbers/colors match with the END value.

    return true;
  }
},

/*
 * --------------------------------------------------------------------------------------
 * TICKER
 * --------------------------------------------------------------------------------------
 */
_tickerActive,
    _ticker = function () {
  var _getTime = Date.now,
      _lagThreshold = 500,
      _adjustedLag = 33,
      _startTime = _getTime(),
      _lastUpdate = _startTime,
      _gap = 1000 / 240,
      _nextTime = _gap,
      _listeners = [],
      _id,
      _req,
      _raf,
      _self,
      _delta,
      _i,
      _tick = function _tick(v) {
    var elapsed = _getTime() - _lastUpdate,
        manual = v === true,
        overlap,
        dispatch,
        time,
        frame;

    elapsed > _lagThreshold && (_startTime += elapsed - _adjustedLag);
    _lastUpdate += elapsed;
    time = _lastUpdate - _startTime;
    overlap = time - _nextTime;

    if (overlap > 0 || manual) {
      frame = ++_self.frame;
      _delta = time - _self.time * 1000;
      _self.time = time = time / 1000;
      _nextTime += overlap + (overlap >= _gap ? 4 : _gap - overlap);
      dispatch = 1;
    }

    manual || (_id = _req(_tick)); //make sure the request is made before we dispatch the "tick" event so that timing is maintained. Otherwise, if processing the "tick" requires a bunch of time (like 15ms) and we're using a setTimeout() that's based on 16.7ms, it'd technically take 31.7ms between frames otherwise.

    if (dispatch) {
      for (_i = 0; _i < _listeners.length; _i++) {
        // use _i and check _listeners.length instead of a variable because a listener could get removed during the loop, and if that happens to an element less than the current index, it'd throw things off in the loop.
        _listeners[_i](time, _delta, frame, v);
      }
    }
  };

  _self = {
    time: 0,
    frame: 0,
    tick: function tick() {
      _tick(true);
    },
    deltaRatio: function deltaRatio(fps) {
      return _delta / (1000 / (fps || 60));
    },
    wake: function wake() {
      if (_coreReady) {
        if (!_coreInitted && _windowExists()) {
          _win = _coreInitted = window;
          _doc = _win.document || {};
          _globals.gsap = gsap;
          (_win.gsapVersions || (_win.gsapVersions = [])).push(gsap.version);

          _install(_installScope || _win.GreenSockGlobals || !_win.gsap && _win || {});

          _raf = _win.requestAnimationFrame;
        }

        _id && _self.sleep();

        _req = _raf || function (f) {
          return setTimeout(f, _nextTime - _self.time * 1000 + 1 | 0);
        };

        _tickerActive = 1;

        _tick(2);
      }
    },
    sleep: function sleep() {
      (_raf ? _win.cancelAnimationFrame : clearTimeout)(_id);
      _tickerActive = 0;
      _req = _emptyFunc;
    },
    lagSmoothing: function lagSmoothing(threshold, adjustedLag) {
      _lagThreshold = threshold || 1 / _tinyNum; //zero should be interpreted as basically unlimited

      _adjustedLag = Math.min(adjustedLag, _lagThreshold, 0);
    },
    fps: function fps(_fps) {
      _gap = 1000 / (_fps || 240);
      _nextTime = _self.time * 1000 + _gap;
    },
    add: function add(callback, once, prioritize) {
      var func = once ? function (t, d, f, v) {
        callback(t, d, f, v);

        _self.remove(func);
      } : callback;

      _self.remove(callback);

      _listeners[prioritize ? "unshift" : "push"](func);

      _wake();

      return func;
    },
    remove: function remove(callback, i) {
      ~(i = _listeners.indexOf(callback)) && _listeners.splice(i, 1) && _i >= i && _i--;
    },
    _listeners: _listeners
  };
  return _self;
}(),
    _wake = function _wake() {
  return !_tickerActive && _ticker.wake();
},
    //also ensures the core classes are initialized.

/*
* -------------------------------------------------
* EASING
* -------------------------------------------------
*/
_easeMap = {},
    _customEaseExp = /^[\d.\-M][\d.\-,\s]/,
    _quotesExp = /["']/g,
    _parseObjectInString = function _parseObjectInString(value) {
  //takes a string like "{wiggles:10, type:anticipate})" and turns it into a real object. Notice it ends in ")" and includes the {} wrappers. This is because we only use this function for parsing ease configs and prioritized optimization rather than reusability.
  var obj = {},
      split = value.substr(1, value.length - 3).split(":"),
      key = split[0],
      i = 1,
      l = split.length,
      index,
      val,
      parsedVal;

  for (; i < l; i++) {
    val = split[i];
    index = i !== l - 1 ? val.lastIndexOf(",") : val.length;
    parsedVal = val.substr(0, index);
    obj[key] = isNaN(parsedVal) ? parsedVal.replace(_quotesExp, "").trim() : +parsedVal;
    key = val.substr(index + 1).trim();
  }

  return obj;
},
    _valueInParentheses = function _valueInParentheses(value) {
  var open = value.indexOf("(") + 1,
      close = value.indexOf(")"),
      nested = value.indexOf("(", open);
  return value.substring(open, ~nested && nested < close ? value.indexOf(")", close + 1) : close);
},
    _configEaseFromString = function _configEaseFromString(name) {
  //name can be a string like "elastic.out(1,0.5)", and pass in _easeMap as obj and it'll parse it out and call the actual function like _easeMap.Elastic.easeOut.config(1,0.5). It will also parse custom ease strings as long as CustomEase is loaded and registered (internally as _easeMap._CE).
  var split = (name + "").split("("),
      ease = _easeMap[split[0]];
  return ease && split.length > 1 && ease.config ? ease.config.apply(null, ~name.indexOf("{") ? [_parseObjectInString(split[1])] : _valueInParentheses(name).split(",").map(_numericIfPossible)) : _easeMap._CE && _customEaseExp.test(name) ? _easeMap._CE("", name) : ease;
},
    _invertEase = function _invertEase(ease) {
  return function (p) {
    return 1 - ease(1 - p);
  };
},
    // allow yoyoEase to be set in children and have those affected when the parent/ancestor timeline yoyos.
_propagateYoyoEase = function _propagateYoyoEase(timeline, isYoyo) {
  var child = timeline._first,
      ease;

  while (child) {
    if (child instanceof Timeline) {
      _propagateYoyoEase(child, isYoyo);
    } else if (child.vars.yoyoEase && (!child._yoyo || !child._repeat) && child._yoyo !== isYoyo) {
      if (child.timeline) {
        _propagateYoyoEase(child.timeline, isYoyo);
      } else {
        ease = child._ease;
        child._ease = child._yEase;
        child._yEase = ease;
        child._yoyo = isYoyo;
      }
    }

    child = child._next;
  }
},
    _parseEase = function _parseEase(ease, defaultEase) {
  return !ease ? defaultEase : (_isFunction(ease) ? ease : _easeMap[ease] || _configEaseFromString(ease)) || defaultEase;
},
    _insertEase = function _insertEase(names, easeIn, easeOut, easeInOut) {
  if (easeOut === void 0) {
    easeOut = function easeOut(p) {
      return 1 - easeIn(1 - p);
    };
  }

  if (easeInOut === void 0) {
    easeInOut = function easeInOut(p) {
      return p < .5 ? easeIn(p * 2) / 2 : 1 - easeIn((1 - p) * 2) / 2;
    };
  }

  var ease = {
    easeIn: easeIn,
    easeOut: easeOut,
    easeInOut: easeInOut
  },
      lowercaseName;

  _forEachName(names, function (name) {
    _easeMap[name] = _globals[name] = ease;
    _easeMap[lowercaseName = name.toLowerCase()] = easeOut;

    for (var p in ease) {
      _easeMap[lowercaseName + (p === "easeIn" ? ".in" : p === "easeOut" ? ".out" : ".inOut")] = _easeMap[name + "." + p] = ease[p];
    }
  });

  return ease;
},
    _easeInOutFromOut = function _easeInOutFromOut(easeOut) {
  return function (p) {
    return p < .5 ? (1 - easeOut(1 - p * 2)) / 2 : .5 + easeOut((p - .5) * 2) / 2;
  };
},
    _configElastic = function _configElastic(type, amplitude, period) {
  var p1 = amplitude >= 1 ? amplitude : 1,
      //note: if amplitude is < 1, we simply adjust the period for a more natural feel. Otherwise the math doesn't work right and the curve starts at 1.
  p2 = (period || (type ? .3 : .45)) / (amplitude < 1 ? amplitude : 1),
      p3 = p2 / _2PI * (Math.asin(1 / p1) || 0),
      easeOut = function easeOut(p) {
    return p === 1 ? 1 : p1 * Math.pow(2, -10 * p) * _sin((p - p3) * p2) + 1;
  },
      ease = type === "out" ? easeOut : type === "in" ? function (p) {
    return 1 - easeOut(1 - p);
  } : _easeInOutFromOut(easeOut);

  p2 = _2PI / p2; //precalculate to optimize

  ease.config = function (amplitude, period) {
    return _configElastic(type, amplitude, period);
  };

  return ease;
},
    _configBack = function _configBack(type, overshoot) {
  if (overshoot === void 0) {
    overshoot = 1.70158;
  }

  var easeOut = function easeOut(p) {
    return p ? --p * p * ((overshoot + 1) * p + overshoot) + 1 : 0;
  },
      ease = type === "out" ? easeOut : type === "in" ? function (p) {
    return 1 - easeOut(1 - p);
  } : _easeInOutFromOut(easeOut);

  ease.config = function (overshoot) {
    return _configBack(type, overshoot);
  };

  return ease;
}; // a cheaper (kb and cpu) but more mild way to get a parameterized weighted ease by feeding in a value between -1 (easeIn) and 1 (easeOut) where 0 is linear.
// _weightedEase = ratio => {
// 	let y = 0.5 + ratio / 2;
// 	return p => (2 * (1 - p) * p * y + p * p);
// },
// a stronger (but more expensive kb/cpu) parameterized weighted ease that lets you feed in a value between -1 (easeIn) and 1 (easeOut) where 0 is linear.
// _weightedEaseStrong = ratio => {
// 	ratio = .5 + ratio / 2;
// 	let o = 1 / 3 * (ratio < .5 ? ratio : 1 - ratio),
// 		b = ratio - o,
// 		c = ratio + o;
// 	return p => p === 1 ? p : 3 * b * (1 - p) * (1 - p) * p + 3 * c * (1 - p) * p * p + p * p * p;
// };


exports._ticker = _ticker;
exports._colorStringFilter = _colorStringFilter;
exports._colorExp = _colorExp;
exports.splitColor = splitColor;
exports.interpolate = interpolate;
exports.mapRange = mapRange;
exports._replaceRandom = _replaceRandom;
exports.wrapYoyo = wrapYoyo;
exports.wrap = wrap;
exports.normalize = normalize;
exports.unitize = unitize;
exports.pipe = pipe;
exports.random = random;
exports.snap = snap;
exports._roundModifier = _roundModifier;
exports.distribute = distribute;
exports.shuffle = shuffle;
exports.selector = selector;
exports.toArray = toArray;
exports.clamp = clamp;
exports.getUnit = getUnit;
exports._removeLinkedListItem = _removeLinkedListItem;
exports._setDefaults = _setDefaults;
exports._parseRelative = _parseRelative;
exports._round = _round;
exports._forEachName = _forEachName;
exports._getProperty = _getProperty;
exports._getCache = _getCache;
exports._plugins = _plugins;
exports._missingPlugin = _missingPlugin;
exports._relExp = _relExp;
exports._numWithUnitExp = _numWithUnitExp;
exports._numExp = _numExp;
exports._isUndefined = _isUndefined;
exports._isString = _isString;
exports._config = _config;

_forEachName("Linear,Quad,Cubic,Quart,Quint,Strong", function (name, i) {
  var power = i < 5 ? i + 1 : i;

  _insertEase(name + ",Power" + (power - 1), i ? function (p) {
    return Math.pow(p, power);
  } : function (p) {
    return p;
  }, function (p) {
    return 1 - Math.pow(1 - p, power);
  }, function (p) {
    return p < .5 ? Math.pow(p * 2, power) / 2 : 1 - Math.pow((1 - p) * 2, power) / 2;
  });
});

_easeMap.Linear.easeNone = _easeMap.none = _easeMap.Linear.easeIn;

_insertEase("Elastic", _configElastic("in"), _configElastic("out"), _configElastic());

(function (n, c) {
  var n1 = 1 / c,
      n2 = 2 * n1,
      n3 = 2.5 * n1,
      easeOut = function easeOut(p) {
    return p < n1 ? n * p * p : p < n2 ? n * Math.pow(p - 1.5 / c, 2) + .75 : p < n3 ? n * (p -= 2.25 / c) * p + .9375 : n * Math.pow(p - 2.625 / c, 2) + .984375;
  };

  _insertEase("Bounce", function (p) {
    return 1 - easeOut(1 - p);
  }, easeOut);
})(7.5625, 2.75);

_insertEase("Expo", function (p) {
  return p ? Math.pow(2, 10 * (p - 1)) : 0;
});

_insertEase("Circ", function (p) {
  return -(_sqrt(1 - p * p) - 1);
});

_insertEase("Sine", function (p) {
  return p === 1 ? 1 : -_cos(p * _HALF_PI) + 1;
});

_insertEase("Back", _configBack("in"), _configBack("out"), _configBack());

_easeMap.SteppedEase = _easeMap.steps = _globals.SteppedEase = {
  config: function config(steps, immediateStart) {
    if (steps === void 0) {
      steps = 1;
    }

    var p1 = 1 / steps,
        p2 = steps + (immediateStart ? 0 : 1),
        p3 = immediateStart ? 1 : 0,
        max = 1 - _tinyNum;
    return function (p) {
      return ((p2 * _clamp(0, max, p) | 0) + p3) * p1;
    };
  }
};
_defaults.ease = _easeMap["quad.out"];

_forEachName("onComplete,onUpdate,onStart,onRepeat,onReverseComplete,onInterrupt", function (name) {
  return _callbackNames += name + "," + name + "Params,";
});
/*
 * --------------------------------------------------------------------------------------
 * CACHE
 * --------------------------------------------------------------------------------------
 */


var GSCache = function GSCache(target, harness) {
  this.id = _gsID++;
  target._gsap = this;
  this.target = target;
  this.harness = harness;
  this.get = harness ? harness.get : _getProperty;
  this.set = harness ? harness.getSetter : _getSetter;
};
/*
 * --------------------------------------------------------------------------------------
 * ANIMATION
 * --------------------------------------------------------------------------------------
 */


exports.GSCache = GSCache;

var Animation = /*#__PURE__*/function () {
  function Animation(vars) {
    this.vars = vars;
    this._delay = +vars.delay || 0;

    if (this._repeat = vars.repeat === Infinity ? -2 : vars.repeat || 0) {
      // TODO: repeat: Infinity on a timeline's children must flag that timeline internally and affect its totalDuration, otherwise it'll stop in the negative direction when reaching the start.
      this._rDelay = vars.repeatDelay || 0;
      this._yoyo = !!vars.yoyo || !!vars.yoyoEase;
    }

    this._ts = 1;

    _setDuration(this, +vars.duration, 1, 1);

    this.data = vars.data;
    _tickerActive || _ticker.wake();
  }

  var _proto = Animation.prototype;

  _proto.delay = function delay(value) {
    if (value || value === 0) {
      this.parent && this.parent.smoothChildTiming && this.startTime(this._start + value - this._delay);
      this._delay = value;
      return this;
    }

    return this._delay;
  };

  _proto.duration = function duration(value) {
    return arguments.length ? this.totalDuration(this._repeat > 0 ? value + (value + this._rDelay) * this._repeat : value) : this.totalDuration() && this._dur;
  };

  _proto.totalDuration = function totalDuration(value) {
    if (!arguments.length) {
      return this._tDur;
    }

    this._dirty = 0;
    return _setDuration(this, this._repeat < 0 ? value : (value - this._repeat * this._rDelay) / (this._repeat + 1));
  };

  _proto.totalTime = function totalTime(_totalTime, suppressEvents) {
    _wake();

    if (!arguments.length) {
      return this._tTime;
    }

    var parent = this._dp;

    if (parent && parent.smoothChildTiming && this._ts) {
      _alignPlayhead(this, _totalTime);

      !parent._dp || parent.parent || _postAddChecks(parent, this); // edge case: if this is a child of a timeline that already completed, for example, we must re-activate the parent.
      //in case any of the ancestor timelines had completed but should now be enabled, we should reset their totalTime() which will also ensure that they're lined up properly and enabled. Skip for animations that are on the root (wasteful). Example: a TimelineLite.exportRoot() is performed when there's a paused tween on the root, the export will not complete until that tween is unpaused, but imagine a child gets restarted later, after all [unpaused] tweens have completed. The start of that child would get pushed out, but one of the ancestors may have completed.

      while (parent && parent.parent) {
        if (parent.parent._time !== parent._start + (parent._ts >= 0 ? parent._tTime / parent._ts : (parent.totalDuration() - parent._tTime) / -parent._ts)) {
          parent.totalTime(parent._tTime, true);
        }

        parent = parent.parent;
      }

      if (!this.parent && this._dp.autoRemoveChildren && (this._ts > 0 && _totalTime < this._tDur || this._ts < 0 && _totalTime > 0 || !this._tDur && !_totalTime)) {
        //if the animation doesn't have a parent, put it back into its last parent (recorded as _dp for exactly cases like this). Limit to parents with autoRemoveChildren (like globalTimeline) so that if the user manually removes an animation from a timeline and then alters its playhead, it doesn't get added back in.
        _addToTimeline(this._dp, this, this._start - this._delay);
      }
    }

    if (this._tTime !== _totalTime || !this._dur && !suppressEvents || this._initted && Math.abs(this._zTime) === _tinyNum || !_totalTime && !this._initted && (this.add || this._ptLookup)) {
      // check for _ptLookup on a Tween instance to ensure it has actually finished being instantiated, otherwise if this.reverse() gets called in the Animation constructor, it could trigger a render() here even though the _targets weren't populated, thus when _init() is called there won't be any PropTweens (it'll act like the tween is non-functional)
      this._ts || (this._pTime = _totalTime); // otherwise, if an animation is paused, then the playhead is moved back to zero, then resumed, it'd revert back to the original time at the pause
      //if (!this._lock) { // avoid endless recursion (not sure we need this yet or if it's worth the performance hit)
      //   this._lock = 1;

      _lazySafeRender(this, _totalTime, suppressEvents); //   this._lock = 0;
      //}

    }

    return this;
  };

  _proto.time = function time(value, suppressEvents) {
    return arguments.length ? this.totalTime(Math.min(this.totalDuration(), value + _elapsedCycleDuration(this)) % (this._dur + this._rDelay) || (value ? this._dur : 0), suppressEvents) : this._time; // note: if the modulus results in 0, the playhead could be exactly at the end or the beginning, and we always defer to the END with a non-zero value, otherwise if you set the time() to the very end (duration()), it would render at the START!
  };

  _proto.totalProgress = function totalProgress(value, suppressEvents) {
    return arguments.length ? this.totalTime(this.totalDuration() * value, suppressEvents) : this.totalDuration() ? Math.min(1, this._tTime / this._tDur) : this.ratio;
  };

  _proto.progress = function progress(value, suppressEvents) {
    return arguments.length ? this.totalTime(this.duration() * (this._yoyo && !(this.iteration() & 1) ? 1 - value : value) + _elapsedCycleDuration(this), suppressEvents) : this.duration() ? Math.min(1, this._time / this._dur) : this.ratio;
  };

  _proto.iteration = function iteration(value, suppressEvents) {
    var cycleDuration = this.duration() + this._rDelay;

    return arguments.length ? this.totalTime(this._time + (value - 1) * cycleDuration, suppressEvents) : this._repeat ? _animationCycle(this._tTime, cycleDuration) + 1 : 1;
  } // potential future addition:
  // isPlayingBackwards() {
  // 	let animation = this,
  // 		orientation = 1; // 1 = forward, -1 = backward
  // 	while (animation) {
  // 		orientation *= animation.reversed() || (animation.repeat() && !(animation.iteration() & 1)) ? -1 : 1;
  // 		animation = animation.parent;
  // 	}
  // 	return orientation < 0;
  // }
  ;

  _proto.timeScale = function timeScale(value) {
    if (!arguments.length) {
      return this._rts === -_tinyNum ? 0 : this._rts; // recorded timeScale. Special case: if someone calls reverse() on an animation with timeScale of 0, we assign it -_tinyNum to remember it's reversed.
    }

    if (this._rts === value) {
      return this;
    }

    var tTime = this.parent && this._ts ? _parentToChildTotalTime(this.parent._time, this) : this._tTime; // make sure to do the parentToChildTotalTime() BEFORE setting the new _ts because the old one must be used in that calculation.
    // future addition? Up side: fast and minimal file size. Down side: only works on this animation; if a timeline is reversed, for example, its childrens' onReverse wouldn't get called.
    //(+value < 0 && this._rts >= 0) && _callback(this, "onReverse", true);
    // prioritize rendering where the parent's playhead lines up instead of this._tTime because there could be a tween that's animating another tween's timeScale in the same rendering loop (same parent), thus if the timeScale tween renders first, it would alter _start BEFORE _tTime was set on that tick (in the rendering loop), effectively freezing it until the timeScale tween finishes.

    this._rts = +value || 0;
    this._ts = this._ps || value === -_tinyNum ? 0 : this._rts; // _ts is the functional timeScale which would be 0 if the animation is paused.

    this.totalTime(_clamp(-this._delay, this._tDur, tTime), true);

    _setEnd(this); // if parent.smoothChildTiming was false, the end time didn't get updated in the _alignPlayhead() method, so do it here.


    return _recacheAncestors(this);
  };

  _proto.paused = function paused(value) {
    if (!arguments.length) {
      return this._ps;
    }

    if (this._ps !== value) {
      this._ps = value;

      if (value) {
        this._pTime = this._tTime || Math.max(-this._delay, this.rawTime()); // if the pause occurs during the delay phase, make sure that's factored in when resuming.

        this._ts = this._act = 0; // _ts is the functional timeScale, so a paused tween would effectively have a timeScale of 0. We record the "real" timeScale as _rts (recorded time scale)
      } else {
        _wake();

        this._ts = this._rts; //only defer to _pTime (pauseTime) if tTime is zero. Remember, someone could pause() an animation, then scrub the playhead and resume(). If the parent doesn't have smoothChildTiming, we render at the rawTime() because the startTime won't get updated.

        this.totalTime(this.parent && !this.parent.smoothChildTiming ? this.rawTime() : this._tTime || this._pTime, this.progress() === 1 && Math.abs(this._zTime) !== _tinyNum && (this._tTime -= _tinyNum)); // edge case: animation.progress(1).pause().play() wouldn't render again because the playhead is already at the end, but the call to totalTime() below will add it back to its parent...and not remove it again (since removing only happens upon rendering at a new time). Offsetting the _tTime slightly is done simply to cause the final render in totalTime() that'll pop it off its timeline (if autoRemoveChildren is true, of course). Check to make sure _zTime isn't -_tinyNum to avoid an edge case where the playhead is pushed to the end but INSIDE a tween/callback, the timeline itself is paused thus halting rendering and leaving a few unrendered. When resuming, it wouldn't render those otherwise.
      }
    }

    return this;
  };

  _proto.startTime = function startTime(value) {
    if (arguments.length) {
      this._start = value;
      var parent = this.parent || this._dp;
      parent && (parent._sort || !this.parent) && _addToTimeline(parent, this, value - this._delay);
      return this;
    }

    return this._start;
  };

  _proto.endTime = function endTime(includeRepeats) {
    return this._start + (_isNotFalse(includeRepeats) ? this.totalDuration() : this.duration()) / Math.abs(this._ts || 1);
  };

  _proto.rawTime = function rawTime(wrapRepeats) {
    var parent = this.parent || this._dp; // _dp = detached parent

    return !parent ? this._tTime : wrapRepeats && (!this._ts || this._repeat && this._time && this.totalProgress() < 1) ? this._tTime % (this._dur + this._rDelay) : !this._ts ? this._tTime : _parentToChildTotalTime(parent.rawTime(wrapRepeats), this);
  };

  _proto.globalTime = function globalTime(rawTime) {
    var animation = this,
        time = arguments.length ? rawTime : animation.rawTime();

    while (animation) {
      time = animation._start + time / (animation._ts || 1);
      animation = animation._dp;
    }

    return time;
  };

  _proto.repeat = function repeat(value) {
    if (arguments.length) {
      this._repeat = value === Infinity ? -2 : value;
      return _onUpdateTotalDuration(this);
    }

    return this._repeat === -2 ? Infinity : this._repeat;
  };

  _proto.repeatDelay = function repeatDelay(value) {
    if (arguments.length) {
      var time = this._time;
      this._rDelay = value;

      _onUpdateTotalDuration(this);

      return time ? this.time(time) : this;
    }

    return this._rDelay;
  };

  _proto.yoyo = function yoyo(value) {
    if (arguments.length) {
      this._yoyo = value;
      return this;
    }

    return this._yoyo;
  };

  _proto.seek = function seek(position, suppressEvents) {
    return this.totalTime(_parsePosition(this, position), _isNotFalse(suppressEvents));
  };

  _proto.restart = function restart(includeDelay, suppressEvents) {
    return this.play().totalTime(includeDelay ? -this._delay : 0, _isNotFalse(suppressEvents));
  };

  _proto.play = function play(from, suppressEvents) {
    from != null && this.seek(from, suppressEvents);
    return this.reversed(false).paused(false);
  };

  _proto.reverse = function reverse(from, suppressEvents) {
    from != null && this.seek(from || this.totalDuration(), suppressEvents);
    return this.reversed(true).paused(false);
  };

  _proto.pause = function pause(atTime, suppressEvents) {
    atTime != null && this.seek(atTime, suppressEvents);
    return this.paused(true);
  };

  _proto.resume = function resume() {
    return this.paused(false);
  };

  _proto.reversed = function reversed(value) {
    if (arguments.length) {
      !!value !== this.reversed() && this.timeScale(-this._rts || (value ? -_tinyNum : 0)); // in case timeScale is zero, reversing would have no effect so we use _tinyNum.

      return this;
    }

    return this._rts < 0;
  };

  _proto.invalidate = function invalidate() {
    this._initted = this._act = 0;
    this._zTime = -_tinyNum;
    return this;
  };

  _proto.isActive = function isActive() {
    var parent = this.parent || this._dp,
        start = this._start,
        rawTime;
    return !!(!parent || this._ts && this._initted && parent.isActive() && (rawTime = parent.rawTime(true)) >= start && rawTime < this.endTime(true) - _tinyNum);
  };

  _proto.eventCallback = function eventCallback(type, callback, params) {
    var vars = this.vars;

    if (arguments.length > 1) {
      if (!callback) {
        delete vars[type];
      } else {
        vars[type] = callback;
        params && (vars[type + "Params"] = params);
        type === "onUpdate" && (this._onUpdate = callback);
      }

      return this;
    }

    return vars[type];
  };

  _proto.then = function then(onFulfilled) {
    var self = this;
    return new Promise(function (resolve) {
      var f = _isFunction(onFulfilled) ? onFulfilled : _passThrough,
          _resolve = function _resolve() {
        var _then = self.then;
        self.then = null; // temporarily null the then() method to avoid an infinite loop (see https://github.com/greensock/GSAP/issues/322)

        _isFunction(f) && (f = f(self)) && (f.then || f === self) && (self.then = _then);
        resolve(f);
        self.then = _then;
      };

      if (self._initted && self.totalProgress() === 1 && self._ts >= 0 || !self._tTime && self._ts < 0) {
        _resolve();
      } else {
        self._prom = _resolve;
      }
    });
  };

  _proto.kill = function kill() {
    _interrupt(this);
  };

  return Animation;
}();

exports.Animation = Animation;

_setDefaults(Animation.prototype, {
  _time: 0,
  _start: 0,
  _end: 0,
  _tTime: 0,
  _tDur: 0,
  _dirty: 0,
  _repeat: 0,
  _yoyo: false,
  parent: null,
  _initted: false,
  _rDelay: 0,
  _ts: 1,
  _dp: 0,
  ratio: 0,
  _zTime: -_tinyNum,
  _prom: 0,
  _ps: false,
  _rts: 1
});
/*
 * -------------------------------------------------
 * TIMELINE
 * -------------------------------------------------
 */


var Timeline = /*#__PURE__*/function (_Animation) {
  _inheritsLoose(Timeline, _Animation);

  function Timeline(vars, position) {
    var _this;

    if (vars === void 0) {
      vars = {};
    }

    _this = _Animation.call(this, vars) || this;
    _this.labels = {};
    _this.smoothChildTiming = !!vars.smoothChildTiming;
    _this.autoRemoveChildren = !!vars.autoRemoveChildren;
    _this._sort = _isNotFalse(vars.sortChildren);
    _globalTimeline && _addToTimeline(vars.parent || _globalTimeline, _assertThisInitialized(_this), position);
    vars.reversed && _this.reverse();
    vars.paused && _this.paused(true);
    vars.scrollTrigger && _scrollTrigger(_assertThisInitialized(_this), vars.scrollTrigger);
    return _this;
  }

  var _proto2 = Timeline.prototype;

  _proto2.to = function to(targets, vars, position) {
    _createTweenType(0, arguments, this);

    return this;
  };

  _proto2.from = function from(targets, vars, position) {
    _createTweenType(1, arguments, this);

    return this;
  };

  _proto2.fromTo = function fromTo(targets, fromVars, toVars, position) {
    _createTweenType(2, arguments, this);

    return this;
  };

  _proto2.set = function set(targets, vars, position) {
    vars.duration = 0;
    vars.parent = this;
    _inheritDefaults(vars).repeatDelay || (vars.repeat = 0);
    vars.immediateRender = !!vars.immediateRender;
    new Tween(targets, vars, _parsePosition(this, position), 1);
    return this;
  };

  _proto2.call = function call(callback, params, position) {
    return _addToTimeline(this, Tween.delayedCall(0, callback, params), position);
  } //ONLY for backward compatibility! Maybe delete?
  ;

  _proto2.staggerTo = function staggerTo(targets, duration, vars, stagger, position, onCompleteAll, onCompleteAllParams) {
    vars.duration = duration;
    vars.stagger = vars.stagger || stagger;
    vars.onComplete = onCompleteAll;
    vars.onCompleteParams = onCompleteAllParams;
    vars.parent = this;
    new Tween(targets, vars, _parsePosition(this, position));
    return this;
  };

  _proto2.staggerFrom = function staggerFrom(targets, duration, vars, stagger, position, onCompleteAll, onCompleteAllParams) {
    vars.runBackwards = 1;
    _inheritDefaults(vars).immediateRender = _isNotFalse(vars.immediateRender);
    return this.staggerTo(targets, duration, vars, stagger, position, onCompleteAll, onCompleteAllParams);
  };

  _proto2.staggerFromTo = function staggerFromTo(targets, duration, fromVars, toVars, stagger, position, onCompleteAll, onCompleteAllParams) {
    toVars.startAt = fromVars;
    _inheritDefaults(toVars).immediateRender = _isNotFalse(toVars.immediateRender);
    return this.staggerTo(targets, duration, toVars, stagger, position, onCompleteAll, onCompleteAllParams);
  };

  _proto2.render = function render(totalTime, suppressEvents, force) {
    var prevTime = this._time,
        tDur = this._dirty ? this.totalDuration() : this._tDur,
        dur = this._dur,
        tTime = totalTime <= 0 ? 0 : _roundPrecise(totalTime),
        // if a paused timeline is resumed (or its _start is updated for another reason...which rounds it), that could result in the playhead shifting a **tiny** amount and a zero-duration child at that spot may get rendered at a different ratio, like its totalTime in render() may be 1e-17 instead of 0, for example.
    crossingStart = this._zTime < 0 !== totalTime < 0 && (this._initted || !dur),
        time,
        child,
        next,
        iteration,
        cycleDuration,
        prevPaused,
        pauseTween,
        timeScale,
        prevStart,
        prevIteration,
        yoyo,
        isYoyo;
    this !== _globalTimeline && tTime > tDur && totalTime >= 0 && (tTime = tDur);

    if (tTime !== this._tTime || force || crossingStart) {
      if (prevTime !== this._time && dur) {
        //if totalDuration() finds a child with a negative startTime and smoothChildTiming is true, things get shifted around internally so we need to adjust the time accordingly. For example, if a tween starts at -30 we must shift EVERYTHING forward 30 seconds and move this timeline's startTime backward by 30 seconds so that things align with the playhead (no jump).
        tTime += this._time - prevTime;
        totalTime += this._time - prevTime;
      }

      time = tTime;
      prevStart = this._start;
      timeScale = this._ts;
      prevPaused = !timeScale;

      if (crossingStart) {
        dur || (prevTime = this._zTime); //when the playhead arrives at EXACTLY time 0 (right on top) of a zero-duration timeline, we need to discern if events are suppressed so that when the playhead moves again (next time), it'll trigger the callback. If events are NOT suppressed, obviously the callback would be triggered in this render. Basically, the callback should fire either when the playhead ARRIVES or LEAVES this exact spot, not both. Imagine doing a timeline.seek(0) and there's a callback that sits at 0. Since events are suppressed on that seek() by default, nothing will fire, but when the playhead moves off of that position, the callback should fire. This behavior is what people intuitively expect.

        (totalTime || !suppressEvents) && (this._zTime = totalTime);
      }

      if (this._repeat) {
        //adjust the time for repeats and yoyos
        yoyo = this._yoyo;
        cycleDuration = dur + this._rDelay;

        if (this._repeat < -1 && totalTime < 0) {
          return this.totalTime(cycleDuration * 100 + totalTime, suppressEvents, force);
        }

        time = _roundPrecise(tTime % cycleDuration); //round to avoid floating point errors. (4 % 0.8 should be 0 but some browsers report it as 0.79999999!)

        if (tTime === tDur) {
          // the tDur === tTime is for edge cases where there's a lengthy decimal on the duration and it may reach the very end but the time is rendered as not-quite-there (remember, tDur is rounded to 4 decimals whereas dur isn't)
          iteration = this._repeat;
          time = dur;
        } else {
          iteration = ~~(tTime / cycleDuration);

          if (iteration && iteration === tTime / cycleDuration) {
            time = dur;
            iteration--;
          }

          time > dur && (time = dur);
        }

        prevIteration = _animationCycle(this._tTime, cycleDuration);
        !prevTime && this._tTime && prevIteration !== iteration && (prevIteration = iteration); // edge case - if someone does addPause() at the very beginning of a repeating timeline, that pause is technically at the same spot as the end which causes this._time to get set to 0 when the totalTime would normally place the playhead at the end. See https://greensock.com/forums/topic/23823-closing-nav-animation-not-working-on-ie-and-iphone-6-maybe-other-older-browser/?tab=comments#comment-113005

        if (yoyo && iteration & 1) {
          time = dur - time;
          isYoyo = 1;
        }
        /*
        make sure children at the end/beginning of the timeline are rendered properly. If, for example,
        a 3-second long timeline rendered at 2.9 seconds previously, and now renders at 3.2 seconds (which
        would get translated to 2.8 seconds if the timeline yoyos or 0.2 seconds if it just repeats), there
        could be a callback or a short tween that's at 2.95 or 3 seconds in which wouldn't render. So
        we need to push the timeline to the end (and/or beginning depending on its yoyo value). Also we must
        ensure that zero-duration tweens at the very beginning or end of the Timeline work.
        */


        if (iteration !== prevIteration && !this._lock) {
          var rewinding = yoyo && prevIteration & 1,
              doesWrap = rewinding === (yoyo && iteration & 1);
          iteration < prevIteration && (rewinding = !rewinding);
          prevTime = rewinding ? 0 : dur;
          this._lock = 1;
          this.render(prevTime || (isYoyo ? 0 : _roundPrecise(iteration * cycleDuration)), suppressEvents, !dur)._lock = 0;
          this._tTime = tTime; // if a user gets the iteration() inside the onRepeat, for example, it should be accurate.

          !suppressEvents && this.parent && _callback(this, "onRepeat");
          this.vars.repeatRefresh && !isYoyo && (this.invalidate()._lock = 1);

          if (prevTime && prevTime !== this._time || prevPaused !== !this._ts || this.vars.onRepeat && !this.parent && !this._act) {
            // if prevTime is 0 and we render at the very end, _time will be the end, thus won't match. So in this edge case, prevTime won't match _time but that's okay. If it gets killed in the onRepeat, eject as well.
            return this;
          }

          dur = this._dur; // in case the duration changed in the onRepeat

          tDur = this._tDur;

          if (doesWrap) {
            this._lock = 2;
            prevTime = rewinding ? dur : -0.0001;
            this.render(prevTime, true);
            this.vars.repeatRefresh && !isYoyo && this.invalidate();
          }

          this._lock = 0;

          if (!this._ts && !prevPaused) {
            return this;
          } //in order for yoyoEase to work properly when there's a stagger, we must swap out the ease in each sub-tween.


          _propagateYoyoEase(this, isYoyo);
        }
      }

      if (this._hasPause && !this._forcing && this._lock < 2) {
        pauseTween = _findNextPauseTween(this, _roundPrecise(prevTime), _roundPrecise(time));

        if (pauseTween) {
          tTime -= time - (time = pauseTween._start);
        }
      }

      this._tTime = tTime;
      this._time = time;
      this._act = !timeScale; //as long as it's not paused, force it to be active so that if the user renders independent of the parent timeline, it'll be forced to re-render on the next tick.

      if (!this._initted) {
        this._onUpdate = this.vars.onUpdate;
        this._initted = 1;
        this._zTime = totalTime;
        prevTime = 0; // upon init, the playhead should always go forward; someone could invalidate() a completed timeline and then if they restart(), that would make child tweens render in reverse order which could lock in the wrong starting values if they build on each other, like tl.to(obj, {x: 100}).to(obj, {x: 0}).
      }

      if (!prevTime && time && !suppressEvents) {
        _callback(this, "onStart");

        if (this._tTime !== tTime) {
          // in case the onStart triggered a render at a different spot, eject. Like if someone did animation.pause(0.5) or something inside the onStart.
          return this;
        }
      }

      if (time >= prevTime && totalTime >= 0) {
        child = this._first;

        while (child) {
          next = child._next;

          if ((child._act || time >= child._start) && child._ts && pauseTween !== child) {
            if (child.parent !== this) {
              // an extreme edge case - the child's render could do something like kill() the "next" one in the linked list, or reparent it. In that case we must re-initiate the whole render to be safe.
              return this.render(totalTime, suppressEvents, force);
            }

            child.render(child._ts > 0 ? (time - child._start) * child._ts : (child._dirty ? child.totalDuration() : child._tDur) + (time - child._start) * child._ts, suppressEvents, force);

            if (time !== this._time || !this._ts && !prevPaused) {
              //in case a tween pauses or seeks the timeline when rendering, like inside of an onUpdate/onComplete
              pauseTween = 0;
              next && (tTime += this._zTime = -_tinyNum); // it didn't finish rendering, so flag zTime as negative so that so that the next time render() is called it'll be forced (to render any remaining children)

              break;
            }
          }

          child = next;
        }
      } else {
        child = this._last;
        var adjustedTime = totalTime < 0 ? totalTime : time; //when the playhead goes backward beyond the start of this timeline, we must pass that information down to the child animations so that zero-duration tweens know whether to render their starting or ending values.

        while (child) {
          next = child._prev;

          if ((child._act || adjustedTime <= child._end) && child._ts && pauseTween !== child) {
            if (child.parent !== this) {
              // an extreme edge case - the child's render could do something like kill() the "next" one in the linked list, or reparent it. In that case we must re-initiate the whole render to be safe.
              return this.render(totalTime, suppressEvents, force);
            }

            child.render(child._ts > 0 ? (adjustedTime - child._start) * child._ts : (child._dirty ? child.totalDuration() : child._tDur) + (adjustedTime - child._start) * child._ts, suppressEvents, force);

            if (time !== this._time || !this._ts && !prevPaused) {
              //in case a tween pauses or seeks the timeline when rendering, like inside of an onUpdate/onComplete
              pauseTween = 0;
              next && (tTime += this._zTime = adjustedTime ? -_tinyNum : _tinyNum); // it didn't finish rendering, so adjust zTime so that so that the next time render() is called it'll be forced (to render any remaining children)

              break;
            }
          }

          child = next;
        }
      }

      if (pauseTween && !suppressEvents) {
        this.pause();
        pauseTween.render(time >= prevTime ? 0 : -_tinyNum)._zTime = time >= prevTime ? 1 : -1;

        if (this._ts) {
          //the callback resumed playback! So since we may have held back the playhead due to where the pause is positioned, go ahead and jump to where it's SUPPOSED to be (if no pause happened).
          this._start = prevStart; //if the pause was at an earlier time and the user resumed in the callback, it could reposition the timeline (changing its startTime), throwing things off slightly, so we make sure the _start doesn't shift.

          _setEnd(this);

          return this.render(totalTime, suppressEvents, force);
        }
      }

      this._onUpdate && !suppressEvents && _callback(this, "onUpdate", true);
      if (tTime === tDur && this._tTime >= this.totalDuration() || !tTime && prevTime) if (prevStart === this._start || Math.abs(timeScale) !== Math.abs(this._ts)) if (!this._lock) {
        // remember, a child's callback may alter this timeline's playhead or timeScale which is why we need to add some of these checks.
        (totalTime || !dur) && (tTime === tDur && this._ts > 0 || !tTime && this._ts < 0) && _removeFromParent(this, 1); // don't remove if the timeline is reversed and the playhead isn't at 0, otherwise tl.progress(1).reverse() won't work. Only remove if the playhead is at the end and timeScale is positive, or if the playhead is at 0 and the timeScale is negative.

        if (!suppressEvents && !(totalTime < 0 && !prevTime) && (tTime || prevTime || !tDur)) {
          _callback(this, tTime === tDur && totalTime >= 0 ? "onComplete" : "onReverseComplete", true);

          this._prom && !(tTime < tDur && this.timeScale() > 0) && this._prom();
        }
      }
    }

    return this;
  };

  _proto2.add = function add(child, position) {
    var _this2 = this;

    _isNumber(position) || (position = _parsePosition(this, position, child));

    if (!(child instanceof Animation)) {
      if (_isArray(child)) {
        child.forEach(function (obj) {
          return _this2.add(obj, position);
        });
        return this;
      }

      if (_isString(child)) {
        return this.addLabel(child, position);
      }

      if (_isFunction(child)) {
        child = Tween.delayedCall(0, child);
      } else {
        return this;
      }
    }

    return this !== child ? _addToTimeline(this, child, position) : this; //don't allow a timeline to be added to itself as a child!
  };

  _proto2.getChildren = function getChildren(nested, tweens, timelines, ignoreBeforeTime) {
    if (nested === void 0) {
      nested = true;
    }

    if (tweens === void 0) {
      tweens = true;
    }

    if (timelines === void 0) {
      timelines = true;
    }

    if (ignoreBeforeTime === void 0) {
      ignoreBeforeTime = -_bigNum;
    }

    var a = [],
        child = this._first;

    while (child) {
      if (child._start >= ignoreBeforeTime) {
        if (child instanceof Tween) {
          tweens && a.push(child);
        } else {
          timelines && a.push(child);
          nested && a.push.apply(a, child.getChildren(true, tweens, timelines));
        }
      }

      child = child._next;
    }

    return a;
  };

  _proto2.getById = function getById(id) {
    var animations = this.getChildren(1, 1, 1),
        i = animations.length;

    while (i--) {
      if (animations[i].vars.id === id) {
        return animations[i];
      }
    }
  };

  _proto2.remove = function remove(child) {
    if (_isString(child)) {
      return this.removeLabel(child);
    }

    if (_isFunction(child)) {
      return this.killTweensOf(child);
    }

    _removeLinkedListItem(this, child);

    if (child === this._recent) {
      this._recent = this._last;
    }

    return _uncache(this);
  };

  _proto2.totalTime = function totalTime(_totalTime2, suppressEvents) {
    if (!arguments.length) {
      return this._tTime;
    }

    this._forcing = 1;

    if (!this._dp && this._ts) {
      //special case for the global timeline (or any other that has no parent or detached parent).
      this._start = _roundPrecise(_ticker.time - (this._ts > 0 ? _totalTime2 / this._ts : (this.totalDuration() - _totalTime2) / -this._ts));
    }

    _Animation.prototype.totalTime.call(this, _totalTime2, suppressEvents);

    this._forcing = 0;
    return this;
  };

  _proto2.addLabel = function addLabel(label, position) {
    this.labels[label] = _parsePosition(this, position);
    return this;
  };

  _proto2.removeLabel = function removeLabel(label) {
    delete this.labels[label];
    return this;
  };

  _proto2.addPause = function addPause(position, callback, params) {
    var t = Tween.delayedCall(0, callback || _emptyFunc, params);
    t.data = "isPause";
    this._hasPause = 1;
    return _addToTimeline(this, t, _parsePosition(this, position));
  };

  _proto2.removePause = function removePause(position) {
    var child = this._first;
    position = _parsePosition(this, position);

    while (child) {
      if (child._start === position && child.data === "isPause") {
        _removeFromParent(child);
      }

      child = child._next;
    }
  };

  _proto2.killTweensOf = function killTweensOf(targets, props, onlyActive) {
    var tweens = this.getTweensOf(targets, onlyActive),
        i = tweens.length;

    while (i--) {
      _overwritingTween !== tweens[i] && tweens[i].kill(targets, props);
    }

    return this;
  };

  _proto2.getTweensOf = function getTweensOf(targets, onlyActive) {
    var a = [],
        parsedTargets = toArray(targets),
        child = this._first,
        isGlobalTime = _isNumber(onlyActive),
        // a number is interpreted as a global time. If the animation spans
    children;

    while (child) {
      if (child instanceof Tween) {
        if (_arrayContainsAny(child._targets, parsedTargets) && (isGlobalTime ? (!_overwritingTween || child._initted && child._ts) && child.globalTime(0) <= onlyActive && child.globalTime(child.totalDuration()) > onlyActive : !onlyActive || child.isActive())) {
          // note: if this is for overwriting, it should only be for tweens that aren't paused and are initted.
          a.push(child);
        }
      } else if ((children = child.getTweensOf(parsedTargets, onlyActive)).length) {
        a.push.apply(a, children);
      }

      child = child._next;
    }

    return a;
  } // potential future feature - targets() on timelines
  // targets() {
  // 	let result = [];
  // 	this.getChildren(true, true, false).forEach(t => result.push(...t.targets()));
  // 	return result.filter((v, i) => result.indexOf(v) === i);
  // }
  ;

  _proto2.tweenTo = function tweenTo(position, vars) {
    vars = vars || {};

    var tl = this,
        endTime = _parsePosition(tl, position),
        _vars = vars,
        startAt = _vars.startAt,
        _onStart = _vars.onStart,
        onStartParams = _vars.onStartParams,
        immediateRender = _vars.immediateRender,
        initted,
        tween = Tween.to(tl, _setDefaults({
      ease: vars.ease || "none",
      lazy: false,
      immediateRender: false,
      time: endTime,
      overwrite: "auto",
      duration: vars.duration || Math.abs((endTime - (startAt && "time" in startAt ? startAt.time : tl._time)) / tl.timeScale()) || _tinyNum,
      onStart: function onStart() {
        tl.pause();

        if (!initted) {
          var duration = vars.duration || Math.abs((endTime - (startAt && "time" in startAt ? startAt.time : tl._time)) / tl.timeScale());
          tween._dur !== duration && _setDuration(tween, duration, 0, 1).render(tween._time, true, true);
          initted = 1;
        }

        _onStart && _onStart.apply(tween, onStartParams || []); //in case the user had an onStart in the vars - we don't want to overwrite it.
      }
    }, vars));

    return immediateRender ? tween.render(0) : tween;
  };

  _proto2.tweenFromTo = function tweenFromTo(fromPosition, toPosition, vars) {
    return this.tweenTo(toPosition, _setDefaults({
      startAt: {
        time: _parsePosition(this, fromPosition)
      }
    }, vars));
  };

  _proto2.recent = function recent() {
    return this._recent;
  };

  _proto2.nextLabel = function nextLabel(afterTime) {
    if (afterTime === void 0) {
      afterTime = this._time;
    }

    return _getLabelInDirection(this, _parsePosition(this, afterTime));
  };

  _proto2.previousLabel = function previousLabel(beforeTime) {
    if (beforeTime === void 0) {
      beforeTime = this._time;
    }

    return _getLabelInDirection(this, _parsePosition(this, beforeTime), 1);
  };

  _proto2.currentLabel = function currentLabel(value) {
    return arguments.length ? this.seek(value, true) : this.previousLabel(this._time + _tinyNum);
  };

  _proto2.shiftChildren = function shiftChildren(amount, adjustLabels, ignoreBeforeTime) {
    if (ignoreBeforeTime === void 0) {
      ignoreBeforeTime = 0;
    }

    var child = this._first,
        labels = this.labels,
        p;

    while (child) {
      if (child._start >= ignoreBeforeTime) {
        child._start += amount;
        child._end += amount;
      }

      child = child._next;
    }

    if (adjustLabels) {
      for (p in labels) {
        if (labels[p] >= ignoreBeforeTime) {
          labels[p] += amount;
        }
      }
    }

    return _uncache(this);
  };

  _proto2.invalidate = function invalidate() {
    var child = this._first;
    this._lock = 0;

    while (child) {
      child.invalidate();
      child = child._next;
    }

    return _Animation.prototype.invalidate.call(this);
  };

  _proto2.clear = function clear(includeLabels) {
    if (includeLabels === void 0) {
      includeLabels = true;
    }

    var child = this._first,
        next;

    while (child) {
      next = child._next;
      this.remove(child);
      child = next;
    }

    this._dp && (this._time = this._tTime = this._pTime = 0);
    includeLabels && (this.labels = {});
    return _uncache(this);
  };

  _proto2.totalDuration = function totalDuration(value) {
    var max = 0,
        self = this,
        child = self._last,
        prevStart = _bigNum,
        prev,
        start,
        parent;

    if (arguments.length) {
      return self.timeScale((self._repeat < 0 ? self.duration() : self.totalDuration()) / (self.reversed() ? -value : value));
    }

    if (self._dirty) {
      parent = self.parent;

      while (child) {
        prev = child._prev; //record it here in case the tween changes position in the sequence...

        child._dirty && child.totalDuration(); //could change the tween._startTime, so make sure the animation's cache is clean before analyzing it.

        start = child._start;

        if (start > prevStart && self._sort && child._ts && !self._lock) {
          //in case one of the tweens shifted out of order, it needs to be re-inserted into the correct position in the sequence
          self._lock = 1; //prevent endless recursive calls - there are methods that get triggered that check duration/totalDuration when we add().

          _addToTimeline(self, child, start - child._delay, 1)._lock = 0;
        } else {
          prevStart = start;
        }

        if (start < 0 && child._ts) {
          //children aren't allowed to have negative startTimes unless smoothChildTiming is true, so adjust here if one is found.
          max -= start;

          if (!parent && !self._dp || parent && parent.smoothChildTiming) {
            self._start += start / self._ts;
            self._time -= start;
            self._tTime -= start;
          }

          self.shiftChildren(-start, false, -1e999);
          prevStart = 0;
        }

        child._end > max && child._ts && (max = child._end);
        child = prev;
      }

      _setDuration(self, self === _globalTimeline && self._time > max ? self._time : max, 1, 1);

      self._dirty = 0;
    }

    return self._tDur;
  };

  Timeline.updateRoot = function updateRoot(time) {
    if (_globalTimeline._ts) {
      _lazySafeRender(_globalTimeline, _parentToChildTotalTime(time, _globalTimeline));

      _lastRenderedFrame = _ticker.frame;
    }

    if (_ticker.frame >= _nextGCFrame) {
      _nextGCFrame += _config.autoSleep || 120;
      var child = _globalTimeline._first;
      if (!child || !child._ts) if (_config.autoSleep && _ticker._listeners.length < 2) {
        while (child && !child._ts) {
          child = child._next;
        }

        child || _ticker.sleep();
      }
    }
  };

  return Timeline;
}(Animation);

exports.TimelineLite = exports.TimelineMax = exports.Timeline = Timeline;

_setDefaults(Timeline.prototype, {
  _lock: 0,
  _hasPause: 0,
  _forcing: 0
});

var _addComplexStringPropTween = function _addComplexStringPropTween(target, prop, start, end, setter, stringFilter, funcParam) {
  //note: we call _addComplexStringPropTween.call(tweenInstance...) to ensure that it's scoped properly. We may call it from within a plugin too, thus "this" would refer to the plugin.
  var pt = new PropTween(this._pt, target, prop, 0, 1, _renderComplexString, null, setter),
      index = 0,
      matchIndex = 0,
      result,
      startNums,
      color,
      endNum,
      chunk,
      startNum,
      hasRandom,
      a;
  pt.b = start;
  pt.e = end;
  start += ""; //ensure values are strings

  end += "";

  if (hasRandom = ~end.indexOf("random(")) {
    end = _replaceRandom(end);
  }

  if (stringFilter) {
    a = [start, end];
    stringFilter(a, target, prop); //pass an array with the starting and ending values and let the filter do whatever it needs to the values.

    start = a[0];
    end = a[1];
  }

  startNums = start.match(_complexStringNumExp) || [];

  while (result = _complexStringNumExp.exec(end)) {
    endNum = result[0];
    chunk = end.substring(index, result.index);

    if (color) {
      color = (color + 1) % 5;
    } else if (chunk.substr(-5) === "rgba(") {
      color = 1;
    }

    if (endNum !== startNums[matchIndex++]) {
      startNum = parseFloat(startNums[matchIndex - 1]) || 0; //these nested PropTweens are handled in a special way - we'll never actually call a render or setter method on them. We'll just loop through them in the parent complex string PropTween's render method.

      pt._pt = {
        _next: pt._pt,
        p: chunk || matchIndex === 1 ? chunk : ",",
        //note: SVG spec allows omission of comma/space when a negative sign is wedged between two numbers, like 2.5-5.3 instead of 2.5,-5.3 but when tweening, the negative value may switch to positive, so we insert the comma just in case.
        s: startNum,
        c: endNum.charAt(1) === "=" ? _parseRelative(startNum, endNum) - startNum : parseFloat(endNum) - startNum,
        m: color && color < 4 ? Math.round : 0
      };
      index = _complexStringNumExp.lastIndex;
    }
  }

  pt.c = index < end.length ? end.substring(index, end.length) : ""; //we use the "c" of the PropTween to store the final part of the string (after the last number)

  pt.fp = funcParam;

  if (_relExp.test(end) || hasRandom) {
    pt.e = 0; //if the end string contains relative values or dynamic random(...) values, delete the end it so that on the final render we don't actually set it to the string with += or -= characters (forces it to use the calculated value).
  }

  this._pt = pt; //start the linked list with this new PropTween. Remember, we call _addComplexStringPropTween.call(tweenInstance...) to ensure that it's scoped properly. We may call it from within a plugin too, thus "this" would refer to the plugin.

  return pt;
},
    _addPropTween = function _addPropTween(target, prop, start, end, index, targets, modifier, stringFilter, funcParam) {
  _isFunction(end) && (end = end(index || 0, target, targets));
  var currentValue = target[prop],
      parsedStart = start !== "get" ? start : !_isFunction(currentValue) ? currentValue : funcParam ? target[prop.indexOf("set") || !_isFunction(target["get" + prop.substr(3)]) ? prop : "get" + prop.substr(3)](funcParam) : target[prop](),
      setter = !_isFunction(currentValue) ? _setterPlain : funcParam ? _setterFuncWithParam : _setterFunc,
      pt;

  if (_isString(end)) {
    if (~end.indexOf("random(")) {
      end = _replaceRandom(end);
    }

    if (end.charAt(1) === "=") {
      pt = _parseRelative(parsedStart, end) + (getUnit(parsedStart) || 0);

      if (pt || pt === 0) {
        // to avoid isNaN, like if someone passes in a value like "!= whatever"
        end = pt;
      }
    }
  }

  if (parsedStart !== end || _forceAllPropTweens) {
    if (!isNaN(parsedStart * end) && end !== "") {
      // fun fact: any number multiplied by "" is evaluated as the number 0!
      pt = new PropTween(this._pt, target, prop, +parsedStart || 0, end - (parsedStart || 0), typeof currentValue === "boolean" ? _renderBoolean : _renderPlain, 0, setter);
      funcParam && (pt.fp = funcParam);
      modifier && pt.modifier(modifier, this, target);
      return this._pt = pt;
    }

    !currentValue && !(prop in target) && _missingPlugin(prop, end);
    return _addComplexStringPropTween.call(this, target, prop, parsedStart, end, setter, stringFilter || _config.stringFilter, funcParam);
  }
},
    //creates a copy of the vars object and processes any function-based values (putting the resulting values directly into the copy) as well as strings with "random()" in them. It does NOT process relative values.
_processVars = function _processVars(vars, index, target, targets, tween) {
  _isFunction(vars) && (vars = _parseFuncOrString(vars, tween, index, target, targets));

  if (!_isObject(vars) || vars.style && vars.nodeType || _isArray(vars) || _isTypedArray(vars)) {
    return _isString(vars) ? _parseFuncOrString(vars, tween, index, target, targets) : vars;
  }

  var copy = {},
      p;

  for (p in vars) {
    copy[p] = _parseFuncOrString(vars[p], tween, index, target, targets);
  }

  return copy;
},
    _checkPlugin = function _checkPlugin(property, vars, tween, index, target, targets) {
  var plugin, pt, ptLookup, i;

  if (_plugins[property] && (plugin = new _plugins[property]()).init(target, plugin.rawVars ? vars[property] : _processVars(vars[property], index, target, targets, tween), tween, index, targets) !== false) {
    tween._pt = pt = new PropTween(tween._pt, target, property, 0, 1, plugin.render, plugin, 0, plugin.priority);

    if (tween !== _quickTween) {
      ptLookup = tween._ptLookup[tween._targets.indexOf(target)]; //note: we can't use tween._ptLookup[index] because for staggered tweens, the index from the fullTargets array won't match what it is in each individual tween that spawns from the stagger.

      i = plugin._props.length;

      while (i--) {
        ptLookup[plugin._props[i]] = pt;
      }
    }
  }

  return plugin;
},
    _overwritingTween,
    //store a reference temporarily so we can avoid overwriting itself.
_forceAllPropTweens,
    _initTween = function _initTween(tween, time) {
  var vars = tween.vars,
      ease = vars.ease,
      startAt = vars.startAt,
      immediateRender = vars.immediateRender,
      lazy = vars.lazy,
      onUpdate = vars.onUpdate,
      onUpdateParams = vars.onUpdateParams,
      callbackScope = vars.callbackScope,
      runBackwards = vars.runBackwards,
      yoyoEase = vars.yoyoEase,
      keyframes = vars.keyframes,
      autoRevert = vars.autoRevert,
      dur = tween._dur,
      prevStartAt = tween._startAt,
      targets = tween._targets,
      parent = tween.parent,
      fullTargets = parent && parent.data === "nested" ? parent.parent._targets : targets,
      autoOverwrite = tween._overwrite === "auto" && !_suppressOverwrites,
      tl = tween.timeline,
      cleanVars,
      i,
      p,
      pt,
      target,
      hasPriority,
      gsData,
      harness,
      plugin,
      ptLookup,
      index,
      harnessVars,
      overwritten;
  tl && (!keyframes || !ease) && (ease = "none");
  tween._ease = _parseEase(ease, _defaults.ease);
  tween._yEase = yoyoEase ? _invertEase(_parseEase(yoyoEase === true ? ease : yoyoEase, _defaults.ease)) : 0;

  if (yoyoEase && tween._yoyo && !tween._repeat) {
    //there must have been a parent timeline with yoyo:true that is currently in its yoyo phase, so flip the eases.
    yoyoEase = tween._yEase;
    tween._yEase = tween._ease;
    tween._ease = yoyoEase;
  }

  tween._from = !tl && !!vars.runBackwards; //nested timelines should never run backwards - the backwards-ness is in the child tweens.

  if (!tl || keyframes && !vars.stagger) {
    //if there's an internal timeline, skip all the parsing because we passed that task down the chain.
    harness = targets[0] ? _getCache(targets[0]).harness : 0;
    harnessVars = harness && vars[harness.prop]; //someone may need to specify CSS-specific values AND non-CSS values, like if the element has an "x" property plus it's a standard DOM element. We allow people to distinguish by wrapping plugin-specific stuff in a css:{} object for example.

    cleanVars = _copyExcluding(vars, _reservedProps);

    if (prevStartAt) {
      _removeFromParent(prevStartAt.render(-1, true));

      prevStartAt._lazy = 0;
    }

    if (startAt) {
      _removeFromParent(tween._startAt = Tween.set(targets, _setDefaults({
        data: "isStart",
        overwrite: false,
        parent: parent,
        immediateRender: true,
        lazy: _isNotFalse(lazy),
        startAt: null,
        delay: 0,
        onUpdate: onUpdate,
        onUpdateParams: onUpdateParams,
        callbackScope: callbackScope,
        stagger: 0
      }, startAt))); //copy the properties/values into a new object to avoid collisions, like var to = {x:0}, from = {x:500}; timeline.fromTo(e, from, to).fromTo(e, to, from);


      time < 0 && !immediateRender && !autoRevert && tween._startAt.render(-1, true); // rare edge case, like if a render is forced in the negative direction of a non-initted tween.

      if (immediateRender) {
        time > 0 && !autoRevert && (tween._startAt = 0); //tweens that render immediately (like most from() and fromTo() tweens) shouldn't revert when their parent timeline's playhead goes backward past the startTime because the initial render could have happened anytime and it shouldn't be directly correlated to this tween's startTime. Imagine setting up a complex animation where the beginning states of various objects are rendered immediately but the tween doesn't happen for quite some time - if we revert to the starting values as soon as the playhead goes backward past the tween's startTime, it will throw things off visually. Reversion should only happen in Timeline instances where immediateRender was false or when autoRevert is explicitly set to true.

        if (dur && time <= 0) {
          time && (tween._zTime = time);
          return; //we skip initialization here so that overwriting doesn't occur until the tween actually begins. Otherwise, if you create several immediateRender:true tweens of the same target/properties to drop into a Timeline, the last one created would overwrite the first ones because they didn't get placed into the timeline yet before the first render occurs and kicks in overwriting.
        } // if (time > 0) {
        // 	autoRevert || (tween._startAt = 0); //tweens that render immediately (like most from() and fromTo() tweens) shouldn't revert when their parent timeline's playhead goes backward past the startTime because the initial render could have happened anytime and it shouldn't be directly correlated to this tween's startTime. Imagine setting up a complex animation where the beginning states of various objects are rendered immediately but the tween doesn't happen for quite some time - if we revert to the starting values as soon as the playhead goes backward past the tween's startTime, it will throw things off visually. Reversion should only happen in Timeline instances where immediateRender was false or when autoRevert is explicitly set to true.
        // } else if (dur && !(time < 0 && prevStartAt)) {
        // 	time && (tween._zTime = time);
        // 	return; //we skip initialization here so that overwriting doesn't occur until the tween actually begins. Otherwise, if you create several immediateRender:true tweens of the same target/properties to drop into a Timeline, the last one created would overwrite the first ones because they didn't get placed into the timeline yet before the first render occurs and kicks in overwriting.
        // }

      } else if (autoRevert === false) {
        tween._startAt = 0;
      }
    } else if (runBackwards && dur) {
      //from() tweens must be handled uniquely: their beginning values must be rendered but we don't want overwriting to occur yet (when time is still 0). Wait until the tween actually begins before doing all the routines like overwriting. At that time, we should render at the END of the tween to ensure that things initialize correctly (remember, from() tweens go backwards)
      if (prevStartAt) {
        !autoRevert && (tween._startAt = 0);
      } else {
        time && (immediateRender = false); //in rare cases (like if a from() tween runs and then is invalidate()-ed), immediateRender could be true but the initial forced-render gets skipped, so there's no need to force the render in this context when the _time is greater than 0

        p = _setDefaults({
          overwrite: false,
          data: "isFromStart",
          //we tag the tween with as "isFromStart" so that if [inside a plugin] we need to only do something at the very END of a tween, we have a way of identifying this tween as merely the one that's setting the beginning values for a "from()" tween. For example, clearProps in CSSPlugin should only get applied at the very END of a tween and without this tag, from(...{height:100, clearProps:"height", delay:1}) would wipe the height at the beginning of the tween and after 1 second, it'd kick back in.
          lazy: immediateRender && _isNotFalse(lazy),
          immediateRender: immediateRender,
          //zero-duration tweens render immediately by default, but if we're not specifically instructed to render this tween immediately, we should skip this and merely _init() to record the starting values (rendering them immediately would push them to completion which is wasteful in that case - we'd have to render(-1) immediately after)
          stagger: 0,
          parent: parent //ensures that nested tweens that had a stagger are handled properly, like gsap.from(".class", {y:gsap.utils.wrap([-100,100])})

        }, cleanVars);
        harnessVars && (p[harness.prop] = harnessVars); // in case someone does something like .from(..., {css:{}})

        _removeFromParent(tween._startAt = Tween.set(targets, p));

        time < 0 && tween._startAt.render(-1, true); // rare edge case, like if a render is forced in the negative direction of a non-initted from() tween.

        tween._zTime = time;

        if (!immediateRender) {
          _initTween(tween._startAt, _tinyNum); //ensures that the initial values are recorded

        } else if (!time) {
          return;
        }
      }
    }

    tween._pt = tween._ptCache = 0;
    lazy = dur && _isNotFalse(lazy) || lazy && !dur;

    for (i = 0; i < targets.length; i++) {
      target = targets[i];
      gsData = target._gsap || _harness(targets)[i]._gsap;
      tween._ptLookup[i] = ptLookup = {};
      _lazyLookup[gsData.id] && _lazyTweens.length && _lazyRender(); //if other tweens of the same target have recently initted but haven't rendered yet, we've got to force the render so that the starting values are correct (imagine populating a timeline with a bunch of sequential tweens and then jumping to the end)

      index = fullTargets === targets ? i : fullTargets.indexOf(target);

      if (harness && (plugin = new harness()).init(target, harnessVars || cleanVars, tween, index, fullTargets) !== false) {
        tween._pt = pt = new PropTween(tween._pt, target, plugin.name, 0, 1, plugin.render, plugin, 0, plugin.priority);

        plugin._props.forEach(function (name) {
          ptLookup[name] = pt;
        });

        plugin.priority && (hasPriority = 1);
      }

      if (!harness || harnessVars) {
        for (p in cleanVars) {
          if (_plugins[p] && (plugin = _checkPlugin(p, cleanVars, tween, index, target, fullTargets))) {
            plugin.priority && (hasPriority = 1);
          } else {
            ptLookup[p] = pt = _addPropTween.call(tween, target, p, "get", cleanVars[p], index, fullTargets, 0, vars.stringFilter);
          }
        }
      }

      tween._op && tween._op[i] && tween.kill(target, tween._op[i]);

      if (autoOverwrite && tween._pt) {
        _overwritingTween = tween;

        _globalTimeline.killTweensOf(target, ptLookup, tween.globalTime(time)); // make sure the overwriting doesn't overwrite THIS tween!!!


        overwritten = !tween.parent;
        _overwritingTween = 0;
      }

      tween._pt && lazy && (_lazyLookup[gsData.id] = 1);
    }

    hasPriority && _sortPropTweensByPriority(tween);
    tween._onInit && tween._onInit(tween); //plugins like RoundProps must wait until ALL of the PropTweens are instantiated. In the plugin's init() function, it sets the _onInit on the tween instance. May not be pretty/intuitive, but it's fast and keeps file size down.
  }

  tween._onUpdate = onUpdate;
  tween._initted = (!tween._op || tween._pt) && !overwritten; // if overwrittenProps resulted in the entire tween being killed, do NOT flag it as initted or else it may render for one tick.

  keyframes && time <= 0 && tl.render(_bigNum, true, true); // if there's a 0% keyframe, it'll render in the "before" state for any staggered/delayed animations thus when the following tween initializes, it'll use the "before" state instead of the "after" state as the initial values.
},
    _updatePropTweens = function _updatePropTweens(tween, property, value, start, startIsRelative, ratio, time) {
  var ptCache = (tween._pt && tween._ptCache || (tween._ptCache = {}))[property],
      pt,
      lookup,
      i;

  if (!ptCache) {
    ptCache = tween._ptCache[property] = [];
    lookup = tween._ptLookup;
    i = tween._targets.length;

    while (i--) {
      pt = lookup[i][property];

      if (pt && pt.d && pt.d._pt) {
        // it's a plugin, so find the nested PropTween
        pt = pt.d._pt;

        while (pt && pt.p !== property) {
          pt = pt._next;
        }
      }

      if (!pt) {
        // there is no PropTween associated with that property, so we must FORCE one to be created and ditch out of this
        // if the tween has other properties that already rendered at new positions, we'd normally have to rewind to put them back like tween.render(0, true) before forcing an _initTween(), but that can create another edge case like tweening a timeline's progress would trigger onUpdates to fire which could move other things around. It's better to just inform users that .resetTo() should ONLY be used for tweens that already have that property. For example, you can't gsap.to(...{ y: 0 }) and then tween.restTo("x", 200) for example.
        _forceAllPropTweens = 1; // otherwise, when we _addPropTween() and it finds no change between the start and end values, it skips creating a PropTween (for efficiency...why tween when there's no difference?) but in this case we NEED that PropTween created so we can edit it.

        tween.vars[property] = "+=0";

        _initTween(tween, time);

        _forceAllPropTweens = 0;
        return 1;
      }

      ptCache.push(pt);
    }
  }

  i = ptCache.length;

  while (i--) {
    pt = ptCache[i];
    pt.s = (start || start === 0) && !startIsRelative ? start : pt.s + (start || 0) + ratio * pt.c;
    pt.c = value - pt.s;
    pt.e && (pt.e = _round(value) + getUnit(pt.e)); // mainly for CSSPlugin (end value)

    pt.b && (pt.b = pt.s + getUnit(pt.b)); // (beginning value)
  }
},
    _addAliasesToVars = function _addAliasesToVars(targets, vars) {
  var harness = targets[0] ? _getCache(targets[0]).harness : 0,
      propertyAliases = harness && harness.aliases,
      copy,
      p,
      i,
      aliases;

  if (!propertyAliases) {
    return vars;
  }

  copy = _merge({}, vars);

  for (p in propertyAliases) {
    if (p in copy) {
      aliases = propertyAliases[p].split(",");
      i = aliases.length;

      while (i--) {
        copy[aliases[i]] = copy[p];
      }
    }
  }

  return copy;
},
    // parses multiple formats, like {"0%": {x: 100}, {"50%": {x: -20}} and { x: {"0%": 100, "50%": -20} }, and an "ease" can be set on any object. We populate an "allProps" object with an Array for each property, like {x: [{}, {}], y:[{}, {}]} with data for each property tween. The objects have a "t" (time), "v", (value), and "e" (ease) property. This allows us to piece together a timeline later.
_parseKeyframe = function _parseKeyframe(prop, obj, allProps, easeEach) {
  var ease = obj.ease || easeEach || "power1.inOut",
      p,
      a;

  if (_isArray(obj)) {
    a = allProps[prop] || (allProps[prop] = []); // t = time (out of 100), v = value, e = ease

    obj.forEach(function (value, i) {
      return a.push({
        t: i / (obj.length - 1) * 100,
        v: value,
        e: ease
      });
    });
  } else {
    for (p in obj) {
      a = allProps[p] || (allProps[p] = []);
      p === "ease" || a.push({
        t: parseFloat(prop),
        v: obj[p],
        e: ease
      });
    }
  }
},
    _parseFuncOrString = function _parseFuncOrString(value, tween, i, target, targets) {
  return _isFunction(value) ? value.call(tween, i, target, targets) : _isString(value) && ~value.indexOf("random(") ? _replaceRandom(value) : value;
},
    _staggerTweenProps = _callbackNames + "repeat,repeatDelay,yoyo,repeatRefresh,yoyoEase,autoRevert",
    _staggerPropsToSkip = {};

exports._checkPlugin = _checkPlugin;

_forEachName(_staggerTweenProps + ",id,stagger,delay,duration,paused,scrollTrigger", function (name) {
  return _staggerPropsToSkip[name] = 1;
});
/*
 * --------------------------------------------------------------------------------------
 * TWEEN
 * --------------------------------------------------------------------------------------
 */


var Tween = /*#__PURE__*/function (_Animation2) {
  _inheritsLoose(Tween, _Animation2);

  function Tween(targets, vars, position, skipInherit) {
    var _this3;

    if (typeof vars === "number") {
      position.duration = vars;
      vars = position;
      position = null;
    }

    _this3 = _Animation2.call(this, skipInherit ? vars : _inheritDefaults(vars)) || this;
    var _this3$vars = _this3.vars,
        duration = _this3$vars.duration,
        delay = _this3$vars.delay,
        immediateRender = _this3$vars.immediateRender,
        stagger = _this3$vars.stagger,
        overwrite = _this3$vars.overwrite,
        keyframes = _this3$vars.keyframes,
        defaults = _this3$vars.defaults,
        scrollTrigger = _this3$vars.scrollTrigger,
        yoyoEase = _this3$vars.yoyoEase,
        parent = vars.parent || _globalTimeline,
        parsedTargets = (_isArray(targets) || _isTypedArray(targets) ? _isNumber(targets[0]) : "length" in vars) ? [targets] : toArray(targets),
        tl,
        i,
        copy,
        l,
        p,
        curTarget,
        staggerFunc,
        staggerVarsToMerge;
    _this3._targets = parsedTargets.length ? _harness(parsedTargets) : _warn("GSAP target " + targets + " not found. https://greensock.com", !_config.nullTargetWarn) || [];
    _this3._ptLookup = []; //PropTween lookup. An array containing an object for each target, having keys for each tweening property

    _this3._overwrite = overwrite;

    if (keyframes || stagger || _isFuncOrString(duration) || _isFuncOrString(delay)) {
      vars = _this3.vars;
      tl = _this3.timeline = new Timeline({
        data: "nested",
        defaults: defaults || {}
      });
      tl.kill();
      tl.parent = tl._dp = _assertThisInitialized(_this3);
      tl._start = 0;

      if (stagger || _isFuncOrString(duration) || _isFuncOrString(delay)) {
        l = parsedTargets.length;
        staggerFunc = stagger && distribute(stagger);

        if (_isObject(stagger)) {
          //users can pass in callbacks like onStart/onComplete in the stagger object. These should fire with each individual tween.
          for (p in stagger) {
            if (~_staggerTweenProps.indexOf(p)) {
              staggerVarsToMerge || (staggerVarsToMerge = {});
              staggerVarsToMerge[p] = stagger[p];
            }
          }
        }

        for (i = 0; i < l; i++) {
          copy = _copyExcluding(vars, _staggerPropsToSkip);
          copy.stagger = 0;
          yoyoEase && (copy.yoyoEase = yoyoEase);
          staggerVarsToMerge && _merge(copy, staggerVarsToMerge);
          curTarget = parsedTargets[i]; //don't just copy duration or delay because if they're a string or function, we'd end up in an infinite loop because _isFuncOrString() would evaluate as true in the child tweens, entering this loop, etc. So we parse the value straight from vars and default to 0.

          copy.duration = +_parseFuncOrString(duration, _assertThisInitialized(_this3), i, curTarget, parsedTargets);
          copy.delay = (+_parseFuncOrString(delay, _assertThisInitialized(_this3), i, curTarget, parsedTargets) || 0) - _this3._delay;

          if (!stagger && l === 1 && copy.delay) {
            // if someone does delay:"random(1, 5)", repeat:-1, for example, the delay shouldn't be inside the repeat.
            _this3._delay = delay = copy.delay;
            _this3._start += delay;
            copy.delay = 0;
          }

          tl.to(curTarget, copy, staggerFunc ? staggerFunc(i, curTarget, parsedTargets) : 0);
          tl._ease = _easeMap.none;
        }

        tl.duration() ? duration = delay = 0 : _this3.timeline = 0; // if the timeline's duration is 0, we don't need a timeline internally!
      } else if (keyframes) {
        _inheritDefaults(_setDefaults(tl.vars.defaults, {
          ease: "none"
        }));

        tl._ease = _parseEase(keyframes.ease || vars.ease || "none");
        var time = 0,
            a,
            kf,
            v;

        if (_isArray(keyframes)) {
          keyframes.forEach(function (frame) {
            return tl.to(parsedTargets, frame, ">");
          });
        } else {
          copy = {};

          for (p in keyframes) {
            p === "ease" || p === "easeEach" || _parseKeyframe(p, keyframes[p], copy, keyframes.easeEach);
          }

          for (p in copy) {
            a = copy[p].sort(function (a, b) {
              return a.t - b.t;
            });
            time = 0;

            for (i = 0; i < a.length; i++) {
              kf = a[i];
              v = {
                ease: kf.e,
                duration: (kf.t - (i ? a[i - 1].t : 0)) / 100 * duration
              };
              v[p] = kf.v;
              tl.to(parsedTargets, v, time);
              time += v.duration;
            }
          }

          tl.duration() < duration && tl.to({}, {
            duration: duration - tl.duration()
          }); // in case keyframes didn't go to 100%
        }
      }

      duration || _this3.duration(duration = tl.duration());
    } else {
      _this3.timeline = 0; //speed optimization, faster lookups (no going up the prototype chain)
    }

    if (overwrite === true && !_suppressOverwrites) {
      _overwritingTween = _assertThisInitialized(_this3);

      _globalTimeline.killTweensOf(parsedTargets);

      _overwritingTween = 0;
    }

    _addToTimeline(parent, _assertThisInitialized(_this3), position);

    vars.reversed && _this3.reverse();
    vars.paused && _this3.paused(true);

    if (immediateRender || !duration && !keyframes && _this3._start === _roundPrecise(parent._time) && _isNotFalse(immediateRender) && _hasNoPausedAncestors(_assertThisInitialized(_this3)) && parent.data !== "nested") {
      _this3._tTime = -_tinyNum; //forces a render without having to set the render() "force" parameter to true because we want to allow lazying by default (using the "force" parameter always forces an immediate full render)

      _this3.render(Math.max(0, -delay)); //in case delay is negative

    }

    scrollTrigger && _scrollTrigger(_assertThisInitialized(_this3), scrollTrigger);
    return _this3;
  }

  var _proto3 = Tween.prototype;

  _proto3.render = function render(totalTime, suppressEvents, force) {
    var prevTime = this._time,
        tDur = this._tDur,
        dur = this._dur,
        tTime = totalTime > tDur - _tinyNum && totalTime >= 0 ? tDur : totalTime < _tinyNum ? 0 : totalTime,
        time,
        pt,
        iteration,
        cycleDuration,
        prevIteration,
        isYoyo,
        ratio,
        timeline,
        yoyoEase;

    if (!dur) {
      _renderZeroDurationTween(this, totalTime, suppressEvents, force);
    } else if (tTime !== this._tTime || !totalTime || force || !this._initted && this._tTime || this._startAt && this._zTime < 0 !== totalTime < 0) {
      //this senses if we're crossing over the start time, in which case we must record _zTime and force the render, but we do it in this lengthy conditional way for performance reasons (usually we can skip the calculations): this._initted && (this._zTime < 0) !== (totalTime < 0)
      time = tTime;
      timeline = this.timeline;

      if (this._repeat) {
        //adjust the time for repeats and yoyos
        cycleDuration = dur + this._rDelay;

        if (this._repeat < -1 && totalTime < 0) {
          return this.totalTime(cycleDuration * 100 + totalTime, suppressEvents, force);
        }

        time = _roundPrecise(tTime % cycleDuration); //round to avoid floating point errors. (4 % 0.8 should be 0 but some browsers report it as 0.79999999!)

        if (tTime === tDur) {
          // the tDur === tTime is for edge cases where there's a lengthy decimal on the duration and it may reach the very end but the time is rendered as not-quite-there (remember, tDur is rounded to 4 decimals whereas dur isn't)
          iteration = this._repeat;
          time = dur;
        } else {
          iteration = ~~(tTime / cycleDuration);

          if (iteration && iteration === tTime / cycleDuration) {
            time = dur;
            iteration--;
          }

          time > dur && (time = dur);
        }

        isYoyo = this._yoyo && iteration & 1;

        if (isYoyo) {
          yoyoEase = this._yEase;
          time = dur - time;
        }

        prevIteration = _animationCycle(this._tTime, cycleDuration);

        if (time === prevTime && !force && this._initted) {
          //could be during the repeatDelay part. No need to render and fire callbacks.
          this._tTime = tTime;
          return this;
        }

        if (iteration !== prevIteration) {
          timeline && this._yEase && _propagateYoyoEase(timeline, isYoyo); //repeatRefresh functionality

          if (this.vars.repeatRefresh && !isYoyo && !this._lock) {
            this._lock = force = 1; //force, otherwise if lazy is true, the _attemptInitTween() will return and we'll jump out and get caught bouncing on each tick.

            this.render(_roundPrecise(cycleDuration * iteration), true).invalidate()._lock = 0;
          }
        }
      }

      if (!this._initted) {
        if (_attemptInitTween(this, totalTime < 0 ? totalTime : time, force, suppressEvents)) {
          this._tTime = 0; // in constructor if immediateRender is true, we set _tTime to -_tinyNum to have the playhead cross the starting point but we can't leave _tTime as a negative number.

          return this;
        }

        if (prevTime !== this._time) {
          // rare edge case - during initialization, an onUpdate in the _startAt (.fromTo()) might force this tween to render at a different spot in which case we should ditch this render() call so that it doesn't revert the values.
          return this;
        }

        if (dur !== this._dur) {
          // while initting, a plugin like InertiaPlugin might alter the duration, so rerun from the start to ensure everything renders as it should.
          return this.render(totalTime, suppressEvents, force);
        }
      }

      this._tTime = tTime;
      this._time = time;

      if (!this._act && this._ts) {
        this._act = 1; //as long as it's not paused, force it to be active so that if the user renders independent of the parent timeline, it'll be forced to re-render on the next tick.

        this._lazy = 0;
      }

      this.ratio = ratio = (yoyoEase || this._ease)(time / dur);

      if (this._from) {
        this.ratio = ratio = 1 - ratio;
      }

      if (time && !prevTime && !suppressEvents) {
        _callback(this, "onStart");

        if (this._tTime !== tTime) {
          // in case the onStart triggered a render at a different spot, eject. Like if someone did animation.pause(0.5) or something inside the onStart.
          return this;
        }
      }

      pt = this._pt;

      while (pt) {
        pt.r(ratio, pt.d);
        pt = pt._next;
      }

      timeline && timeline.render(totalTime < 0 ? totalTime : !time && isYoyo ? -_tinyNum : timeline._dur * timeline._ease(time / this._dur), suppressEvents, force) || this._startAt && (this._zTime = totalTime);

      if (this._onUpdate && !suppressEvents) {
        totalTime < 0 && this._startAt && this._startAt.render(totalTime, true, force); //note: for performance reasons, we tuck this conditional logic inside less traveled areas (most tweens don't have an onUpdate). We'd just have it at the end before the onComplete, but the values should be updated before any onUpdate is called, so we ALSO put it here and then if it's not called, we do so later near the onComplete.

        _callback(this, "onUpdate");
      }

      this._repeat && iteration !== prevIteration && this.vars.onRepeat && !suppressEvents && this.parent && _callback(this, "onRepeat");

      if ((tTime === this._tDur || !tTime) && this._tTime === tTime) {
        totalTime < 0 && this._startAt && !this._onUpdate && this._startAt.render(totalTime, true, true);
        (totalTime || !dur) && (tTime === this._tDur && this._ts > 0 || !tTime && this._ts < 0) && _removeFromParent(this, 1); // don't remove if we're rendering at exactly a time of 0, as there could be autoRevert values that should get set on the next tick (if the playhead goes backward beyond the startTime, negative totalTime). Don't remove if the timeline is reversed and the playhead isn't at 0, otherwise tl.progress(1).reverse() won't work. Only remove if the playhead is at the end and timeScale is positive, or if the playhead is at 0 and the timeScale is negative.

        if (!suppressEvents && !(totalTime < 0 && !prevTime) && (tTime || prevTime)) {
          // if prevTime and tTime are zero, we shouldn't fire the onReverseComplete. This could happen if you gsap.to(... {paused:true}).play();
          _callback(this, tTime === tDur ? "onComplete" : "onReverseComplete", true);

          this._prom && !(tTime < tDur && this.timeScale() > 0) && this._prom();
        }
      }
    }

    return this;
  };

  _proto3.targets = function targets() {
    return this._targets;
  };

  _proto3.invalidate = function invalidate() {
    this._pt = this._op = this._startAt = this._onUpdate = this._lazy = this.ratio = 0;
    this._ptLookup = [];
    this.timeline && this.timeline.invalidate();
    return _Animation2.prototype.invalidate.call(this);
  };

  _proto3.resetTo = function resetTo(property, value, start, startIsRelative) {
    _tickerActive || _ticker.wake();
    this._ts || this.play();
    var time = Math.min(this._dur, (this._dp._time - this._start) * this._ts),
        ratio;
    this._initted || _initTween(this, time);
    ratio = this._ease(time / this._dur); // don't just get tween.ratio because it may not have rendered yet.
    // possible future addition to allow an object with multiple values to update, like tween.resetTo({x: 100, y: 200}); At this point, it doesn't seem worth the added kb given the fact that most users will likely opt for the convenient gsap.quickTo() way of interacting with this method.
    // if (_isObject(property)) { // performance optimization
    // 	for (p in property) {
    // 		if (_updatePropTweens(this, p, property[p], value ? value[p] : null, start, ratio, time)) {
    // 			return this.resetTo(property, value, start, startIsRelative); // if a PropTween wasn't found for the property, it'll get forced with a re-initialization so we need to jump out and start over again.
    // 		}
    // 	}
    // } else {

    if (_updatePropTweens(this, property, value, start, startIsRelative, ratio, time)) {
      return this.resetTo(property, value, start, startIsRelative); // if a PropTween wasn't found for the property, it'll get forced with a re-initialization so we need to jump out and start over again.
    } //}


    _alignPlayhead(this, 0);

    this.parent || _addLinkedListItem(this._dp, this, "_first", "_last", this._dp._sort ? "_start" : 0);
    return this.render(0);
  };

  _proto3.kill = function kill(targets, vars) {
    if (vars === void 0) {
      vars = "all";
    }

    if (!targets && (!vars || vars === "all")) {
      this._lazy = this._pt = 0;
      return this.parent ? _interrupt(this) : this;
    }

    if (this.timeline) {
      var tDur = this.timeline.totalDuration();
      this.timeline.killTweensOf(targets, vars, _overwritingTween && _overwritingTween.vars.overwrite !== true)._first || _interrupt(this); // if nothing is left tweening, interrupt.

      this.parent && tDur !== this.timeline.totalDuration() && _setDuration(this, this._dur * this.timeline._tDur / tDur, 0, 1); // if a nested tween is killed that changes the duration, it should affect this tween's duration. We must use the ratio, though, because sometimes the internal timeline is stretched like for keyframes where they don't all add up to whatever the parent tween's duration was set to.

      return this;
    }

    var parsedTargets = this._targets,
        killingTargets = targets ? toArray(targets) : parsedTargets,
        propTweenLookup = this._ptLookup,
        firstPT = this._pt,
        overwrittenProps,
        curLookup,
        curOverwriteProps,
        props,
        p,
        pt,
        i;

    if ((!vars || vars === "all") && _arraysMatch(parsedTargets, killingTargets)) {
      vars === "all" && (this._pt = 0);
      return _interrupt(this);
    }

    overwrittenProps = this._op = this._op || [];

    if (vars !== "all") {
      //so people can pass in a comma-delimited list of property names
      if (_isString(vars)) {
        p = {};

        _forEachName(vars, function (name) {
          return p[name] = 1;
        });

        vars = p;
      }

      vars = _addAliasesToVars(parsedTargets, vars);
    }

    i = parsedTargets.length;

    while (i--) {
      if (~killingTargets.indexOf(parsedTargets[i])) {
        curLookup = propTweenLookup[i];

        if (vars === "all") {
          overwrittenProps[i] = vars;
          props = curLookup;
          curOverwriteProps = {};
        } else {
          curOverwriteProps = overwrittenProps[i] = overwrittenProps[i] || {};
          props = vars;
        }

        for (p in props) {
          pt = curLookup && curLookup[p];

          if (pt) {
            if (!("kill" in pt.d) || pt.d.kill(p) === true) {
              _removeLinkedListItem(this, pt, "_pt");
            }

            delete curLookup[p];
          }

          if (curOverwriteProps !== "all") {
            curOverwriteProps[p] = 1;
          }
        }
      }
    }

    this._initted && !this._pt && firstPT && _interrupt(this); //if all tweening properties are killed, kill the tween. Without this line, if there's a tween with multiple targets and then you killTweensOf() each target individually, the tween would technically still remain active and fire its onComplete even though there aren't any more properties tweening.

    return this;
  };

  Tween.to = function to(targets, vars) {
    return new Tween(targets, vars, arguments[2]);
  };

  Tween.from = function from(targets, vars) {
    return _createTweenType(1, arguments);
  };

  Tween.delayedCall = function delayedCall(delay, callback, params, scope) {
    return new Tween(callback, 0, {
      immediateRender: false,
      lazy: false,
      overwrite: false,
      delay: delay,
      onComplete: callback,
      onReverseComplete: callback,
      onCompleteParams: params,
      onReverseCompleteParams: params,
      callbackScope: scope
    });
  };

  Tween.fromTo = function fromTo(targets, fromVars, toVars) {
    return _createTweenType(2, arguments);
  };

  Tween.set = function set(targets, vars) {
    vars.duration = 0;
    vars.repeatDelay || (vars.repeat = 0);
    return new Tween(targets, vars);
  };

  Tween.killTweensOf = function killTweensOf(targets, props, onlyActive) {
    return _globalTimeline.killTweensOf(targets, props, onlyActive);
  };

  return Tween;
}(Animation);

exports.TweenLite = exports.TweenMax = exports.Tween = Tween;

_setDefaults(Tween.prototype, {
  _targets: [],
  _lazy: 0,
  _startAt: 0,
  _op: 0,
  _onInit: 0
}); //add the pertinent timeline methods to Tween instances so that users can chain conveniently and create a timeline automatically. (removed due to concerns that it'd ultimately add to more confusion especially for beginners)
// _forEachName("to,from,fromTo,set,call,add,addLabel,addPause", name => {
// 	Tween.prototype[name] = function() {
// 		let tl = new Timeline();
// 		return _addToTimeline(tl, this)[name].apply(tl, toArray(arguments));
// 	}
// });
//for backward compatibility. Leverage the timeline calls.


_forEachName("staggerTo,staggerFrom,staggerFromTo", function (name) {
  Tween[name] = function () {
    var tl = new Timeline(),
        params = _slice.call(arguments, 0);

    params.splice(name === "staggerFromTo" ? 5 : 4, 0, 0);
    return tl[name].apply(tl, params);
  };
});
/*
 * --------------------------------------------------------------------------------------
 * PROPTWEEN
 * --------------------------------------------------------------------------------------
 */


var _setterPlain = function _setterPlain(target, property, value) {
  return target[property] = value;
},
    _setterFunc = function _setterFunc(target, property, value) {
  return target[property](value);
},
    _setterFuncWithParam = function _setterFuncWithParam(target, property, value, data) {
  return target[property](data.fp, value);
},
    _setterAttribute = function _setterAttribute(target, property, value) {
  return target.setAttribute(property, value);
},
    _getSetter = function _getSetter(target, property) {
  return _isFunction(target[property]) ? _setterFunc : _isUndefined(target[property]) && target.setAttribute ? _setterAttribute : _setterPlain;
},
    _renderPlain = function _renderPlain(ratio, data) {
  return data.set(data.t, data.p, Math.round((data.s + data.c * ratio) * 1000000) / 1000000, data);
},
    _renderBoolean = function _renderBoolean(ratio, data) {
  return data.set(data.t, data.p, !!(data.s + data.c * ratio), data);
},
    _renderComplexString = function _renderComplexString(ratio, data) {
  var pt = data._pt,
      s = "";

  if (!ratio && data.b) {
    //b = beginning string
    s = data.b;
  } else if (ratio === 1 && data.e) {
    //e = ending string
    s = data.e;
  } else {
    while (pt) {
      s = pt.p + (pt.m ? pt.m(pt.s + pt.c * ratio) : Math.round((pt.s + pt.c * ratio) * 10000) / 10000) + s; //we use the "p" property for the text inbetween (like a suffix). And in the context of a complex string, the modifier (m) is typically just Math.round(), like for RGB colors.

      pt = pt._next;
    }

    s += data.c; //we use the "c" of the PropTween to store the final chunk of non-numeric text.
  }

  data.set(data.t, data.p, s, data);
},
    _renderPropTweens = function _renderPropTweens(ratio, data) {
  var pt = data._pt;

  while (pt) {
    pt.r(ratio, pt.d);
    pt = pt._next;
  }
},
    _addPluginModifier = function _addPluginModifier(modifier, tween, target, property) {
  var pt = this._pt,
      next;

  while (pt) {
    next = pt._next;
    pt.p === property && pt.modifier(modifier, tween, target);
    pt = next;
  }
},
    _killPropTweensOf = function _killPropTweensOf(property) {
  var pt = this._pt,
      hasNonDependentRemaining,
      next;

  while (pt) {
    next = pt._next;

    if (pt.p === property && !pt.op || pt.op === property) {
      _removeLinkedListItem(this, pt, "_pt");
    } else if (!pt.dep) {
      hasNonDependentRemaining = 1;
    }

    pt = next;
  }

  return !hasNonDependentRemaining;
},
    _setterWithModifier = function _setterWithModifier(target, property, value, data) {
  data.mSet(target, property, data.m.call(data.tween, value, data.mt), data);
},
    _sortPropTweensByPriority = function _sortPropTweensByPriority(parent) {
  var pt = parent._pt,
      next,
      pt2,
      first,
      last; //sorts the PropTween linked list in order of priority because some plugins need to do their work after ALL of the PropTweens were created (like RoundPropsPlugin and ModifiersPlugin)

  while (pt) {
    next = pt._next;
    pt2 = first;

    while (pt2 && pt2.pr > pt.pr) {
      pt2 = pt2._next;
    }

    if (pt._prev = pt2 ? pt2._prev : last) {
      pt._prev._next = pt;
    } else {
      first = pt;
    }

    if (pt._next = pt2) {
      pt2._prev = pt;
    } else {
      last = pt;
    }

    pt = next;
  }

  parent._pt = first;
}; //PropTween key: t = target, p = prop, r = renderer, d = data, s = start, c = change, op = overwriteProperty (ONLY populated when it's different than p), pr = priority, _next/_prev for the linked list siblings, set = setter, m = modifier, mSet = modifierSetter (the original setter, before a modifier was added)


exports._sortPropTweensByPriority = _sortPropTweensByPriority;
exports._renderComplexString = _renderComplexString;
exports._getSetter = _getSetter;

var PropTween = /*#__PURE__*/function () {
  function PropTween(next, target, prop, start, change, renderer, data, setter, priority) {
    this.t = target;
    this.s = start;
    this.c = change;
    this.p = prop;
    this.r = renderer || _renderPlain;
    this.d = data || this;
    this.set = setter || _setterPlain;
    this.pr = priority || 0;
    this._next = next;

    if (next) {
      next._prev = this;
    }
  }

  var _proto4 = PropTween.prototype;

  _proto4.modifier = function modifier(func, tween, target) {
    this.mSet = this.mSet || this.set; //in case it was already set (a PropTween can only have one modifier)

    this.set = _setterWithModifier;
    this.m = func;
    this.mt = target; //modifier target

    this.tween = tween;
  };

  return PropTween;
}(); //Initialization tasks


exports.PropTween = PropTween;

_forEachName(_callbackNames + "parent,duration,ease,delay,overwrite,runBackwards,startAt,yoyo,immediateRender,repeat,repeatDelay,data,paused,reversed,lazy,callbackScope,stringFilter,id,yoyoEase,stagger,inherit,repeatRefresh,keyframes,autoRevert,scrollTrigger", function (name) {
  return _reservedProps[name] = 1;
});

_globals.TweenMax = _globals.TweenLite = Tween;
_globals.TimelineLite = _globals.TimelineMax = Timeline;
_globalTimeline = new Timeline({
  sortChildren: false,
  defaults: _defaults,
  autoRemoveChildren: true,
  id: "root",
  smoothChildTiming: true
});
_config.stringFilter = _colorStringFilter;
/*
 * --------------------------------------------------------------------------------------
 * GSAP
 * --------------------------------------------------------------------------------------
 */

var _gsap = {
  registerPlugin: function registerPlugin() {
    for (var _len2 = arguments.length, args = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
      args[_key2] = arguments[_key2];
    }

    args.forEach(function (config) {
      return _createPlugin(config);
    });
  },
  timeline: function timeline(vars) {
    return new Timeline(vars);
  },
  getTweensOf: function getTweensOf(targets, onlyActive) {
    return _globalTimeline.getTweensOf(targets, onlyActive);
  },
  getProperty: function getProperty(target, property, unit, uncache) {
    _isString(target) && (target = toArray(target)[0]); //in case selector text or an array is passed in

    var getter = _getCache(target || {}).get,
        format = unit ? _passThrough : _numericIfPossible;

    unit === "native" && (unit = "");
    return !target ? target : !property ? function (property, unit, uncache) {
      return format((_plugins[property] && _plugins[property].get || getter)(target, property, unit, uncache));
    } : format((_plugins[property] && _plugins[property].get || getter)(target, property, unit, uncache));
  },
  quickSetter: function quickSetter(target, property, unit) {
    target = toArray(target);

    if (target.length > 1) {
      var setters = target.map(function (t) {
        return gsap.quickSetter(t, property, unit);
      }),
          l = setters.length;
      return function (value) {
        var i = l;

        while (i--) {
          setters[i](value);
        }
      };
    }

    target = target[0] || {};

    var Plugin = _plugins[property],
        cache = _getCache(target),
        p = cache.harness && (cache.harness.aliases || {})[property] || property,
        // in case it's an alias, like "rotate" for "rotation".
    setter = Plugin ? function (value) {
      var p = new Plugin();
      _quickTween._pt = 0;
      p.init(target, unit ? value + unit : value, _quickTween, 0, [target]);
      p.render(1, p);
      _quickTween._pt && _renderPropTweens(1, _quickTween);
    } : cache.set(target, p);

    return Plugin ? setter : function (value) {
      return setter(target, p, unit ? value + unit : value, cache, 1);
    };
  },
  quickTo: function quickTo(target, property, vars) {
    var _merge2;

    var tween = gsap.to(target, _merge((_merge2 = {}, _merge2[property] = "+=0.1", _merge2.paused = true, _merge2), vars || {})),
        func = function func(value, start, startIsRelative) {
      return tween.resetTo(property, value, start, startIsRelative);
    };

    func.tween = tween;
    return func;
  },
  isTweening: function isTweening(targets) {
    return _globalTimeline.getTweensOf(targets, true).length > 0;
  },
  defaults: function defaults(value) {
    value && value.ease && (value.ease = _parseEase(value.ease, _defaults.ease));
    return _mergeDeep(_defaults, value || {});
  },
  config: function config(value) {
    return _mergeDeep(_config, value || {});
  },
  registerEffect: function registerEffect(_ref3) {
    var name = _ref3.name,
        effect = _ref3.effect,
        plugins = _ref3.plugins,
        defaults = _ref3.defaults,
        extendTimeline = _ref3.extendTimeline;
    (plugins || "").split(",").forEach(function (pluginName) {
      return pluginName && !_plugins[pluginName] && !_globals[pluginName] && _warn(name + " effect requires " + pluginName + " plugin.");
    });

    _effects[name] = function (targets, vars, tl) {
      return effect(toArray(targets), _setDefaults(vars || {}, defaults), tl);
    };

    if (extendTimeline) {
      Timeline.prototype[name] = function (targets, vars, position) {
        return this.add(_effects[name](targets, _isObject(vars) ? vars : (position = vars) && {}, this), position);
      };
    }
  },
  registerEase: function registerEase(name, ease) {
    _easeMap[name] = _parseEase(ease);
  },
  parseEase: function parseEase(ease, defaultEase) {
    return arguments.length ? _parseEase(ease, defaultEase) : _easeMap;
  },
  getById: function getById(id) {
    return _globalTimeline.getById(id);
  },
  exportRoot: function exportRoot(vars, includeDelayedCalls) {
    if (vars === void 0) {
      vars = {};
    }

    var tl = new Timeline(vars),
        child,
        next;
    tl.smoothChildTiming = _isNotFalse(vars.smoothChildTiming);

    _globalTimeline.remove(tl);

    tl._dp = 0; //otherwise it'll get re-activated when adding children and be re-introduced into _globalTimeline's linked list (then added to itself).

    tl._time = tl._tTime = _globalTimeline._time;
    child = _globalTimeline._first;

    while (child) {
      next = child._next;

      if (includeDelayedCalls || !(!child._dur && child instanceof Tween && child.vars.onComplete === child._targets[0])) {
        _addToTimeline(tl, child, child._start - child._delay);
      }

      child = next;
    }

    _addToTimeline(_globalTimeline, tl, 0);

    return tl;
  },
  utils: {
    wrap: wrap,
    wrapYoyo: wrapYoyo,
    distribute: distribute,
    random: random,
    snap: snap,
    normalize: normalize,
    getUnit: getUnit,
    clamp: clamp,
    splitColor: splitColor,
    toArray: toArray,
    selector: selector,
    mapRange: mapRange,
    pipe: pipe,
    unitize: unitize,
    interpolate: interpolate,
    shuffle: shuffle
  },
  install: _install,
  effects: _effects,
  ticker: _ticker,
  updateRoot: Timeline.updateRoot,
  plugins: _plugins,
  globalTimeline: _globalTimeline,
  core: {
    PropTween: PropTween,
    globals: _addGlobal,
    Tween: Tween,
    Timeline: Timeline,
    Animation: Animation,
    getCache: _getCache,
    _removeLinkedListItem: _removeLinkedListItem,
    suppressOverwrites: function suppressOverwrites(value) {
      return _suppressOverwrites = value;
    }
  }
};

_forEachName("to,from,fromTo,delayedCall,set,killTweensOf", function (name) {
  return _gsap[name] = Tween[name];
});

_ticker.add(Timeline.updateRoot);

_quickTween = _gsap.to({}, {
  duration: 0
}); // ---- EXTRA PLUGINS --------------------------------------------------------

var _getPluginPropTween = function _getPluginPropTween(plugin, prop) {
  var pt = plugin._pt;

  while (pt && pt.p !== prop && pt.op !== prop && pt.fp !== prop) {
    pt = pt._next;
  }

  return pt;
},
    _addModifiers = function _addModifiers(tween, modifiers) {
  var targets = tween._targets,
      p,
      i,
      pt;

  for (p in modifiers) {
    i = targets.length;

    while (i--) {
      pt = tween._ptLookup[i][p];

      if (pt && (pt = pt.d)) {
        if (pt._pt) {
          // is a plugin
          pt = _getPluginPropTween(pt, p);
        }

        pt && pt.modifier && pt.modifier(modifiers[p], tween, targets[i], p);
      }
    }
  }
},
    _buildModifierPlugin = function _buildModifierPlugin(name, modifier) {
  return {
    name: name,
    rawVars: 1,
    //don't pre-process function-based values or "random()" strings.
    init: function init(target, vars, tween) {
      tween._onInit = function (tween) {
        var temp, p;

        if (_isString(vars)) {
          temp = {};

          _forEachName(vars, function (name) {
            return temp[name] = 1;
          }); //if the user passes in a comma-delimited list of property names to roundProps, like "x,y", we round to whole numbers.


          vars = temp;
        }

        if (modifier) {
          temp = {};

          for (p in vars) {
            temp[p] = modifier(vars[p]);
          }

          vars = temp;
        }

        _addModifiers(tween, vars);
      };
    }
  };
}; //register core plugins


var gsap = _gsap.registerPlugin({
  name: "attr",
  init: function init(target, vars, tween, index, targets) {
    var p, pt;

    for (p in vars) {
      pt = this.add(target, "setAttribute", (target.getAttribute(p) || 0) + "", vars[p], index, targets, 0, 0, p);
      pt && (pt.op = p);

      this._props.push(p);
    }
  }
}, {
  name: "endArray",
  init: function init(target, value) {
    var i = value.length;

    while (i--) {
      this.add(target, i, target[i] || 0, value[i]);
    }
  }
}, _buildModifierPlugin("roundProps", _roundModifier), _buildModifierPlugin("modifiers"), _buildModifierPlugin("snap", snap)) || _gsap; //to prevent the core plugins from being dropped via aggressive tree shaking, we must include them in the variable declaration in this way.


exports.default = exports.gsap = gsap;
Tween.version = Timeline.version = gsap.version = "3.10.4";
_coreReady = 1;
_windowExists() && _wake();
var Power0 = _easeMap.Power0,
    Power1 = _easeMap.Power1,
    Power2 = _easeMap.Power2,
    Power3 = _easeMap.Power3,
    Power4 = _easeMap.Power4,
    Linear = _easeMap.Linear,
    Quad = _easeMap.Quad,
    Cubic = _easeMap.Cubic,
    Quart = _easeMap.Quart,
    Quint = _easeMap.Quint,
    Strong = _easeMap.Strong,
    Elastic = _easeMap.Elastic,
    Back = _easeMap.Back,
    SteppedEase = _easeMap.SteppedEase,
    Bounce = _easeMap.Bounce,
    Sine = _easeMap.Sine,
    Expo = _easeMap.Expo,
    Circ = _easeMap.Circ;
exports.Circ = Circ;
exports.Expo = Expo;
exports.Sine = Sine;
exports.Bounce = Bounce;
exports.SteppedEase = SteppedEase;
exports.Back = Back;
exports.Elastic = Elastic;
exports.Strong = Strong;
exports.Quint = Quint;
exports.Quart = Quart;
exports.Cubic = Cubic;
exports.Quad = Quad;
exports.Linear = Linear;
exports.Power4 = Power4;
exports.Power3 = Power3;
exports.Power2 = Power2;
exports.Power1 = Power1;
exports.Power0 = Power0;
},{}],"node_modules/gsap-trial/CSSPlugin.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.checkPrefix = exports._getBBox = exports._createElement = exports.CSSPlugin = void 0;

var _gsapCore = require("./gsap-core.js");

/*!
 * CSSPlugin 3.10.4
 * https://greensock.com
 *
 * Copyright 2008-2022, GreenSock. All rights reserved.
 * Subject to the terms at https://greensock.com/standard-license or for
 * Club GreenSock members, the agreement issued with that membership.
 * @author: Jack Doyle, jack@greensock.com
*/

/* eslint-disable */
var _win,
    _doc,
    _docElement,
    _pluginInitted,
    _tempDiv,
    _tempDivStyler,
    _recentSetterPlugin,
    _windowExists = function _windowExists() {
  return typeof window !== "undefined";
},
    _transformProps = {},
    _RAD2DEG = 180 / Math.PI,
    _DEG2RAD = Math.PI / 180,
    _atan2 = Math.atan2,
    _bigNum = 1e8,
    _capsExp = /([A-Z])/g,
    _horizontalExp = /(left|right|width|margin|padding|x)/i,
    _complexExp = /[\s,\(]\S/,
    _propertyAliases = {
  autoAlpha: "opacity,visibility",
  scale: "scaleX,scaleY",
  alpha: "opacity"
},
    _renderCSSProp = function _renderCSSProp(ratio, data) {
  return data.set(data.t, data.p, Math.round((data.s + data.c * ratio) * 10000) / 10000 + data.u, data);
},
    _renderPropWithEnd = function _renderPropWithEnd(ratio, data) {
  return data.set(data.t, data.p, ratio === 1 ? data.e : Math.round((data.s + data.c * ratio) * 10000) / 10000 + data.u, data);
},
    _renderCSSPropWithBeginning = function _renderCSSPropWithBeginning(ratio, data) {
  return data.set(data.t, data.p, ratio ? Math.round((data.s + data.c * ratio) * 10000) / 10000 + data.u : data.b, data);
},
    //if units change, we need a way to render the original unit/value when the tween goes all the way back to the beginning (ratio:0)
_renderRoundedCSSProp = function _renderRoundedCSSProp(ratio, data) {
  var value = data.s + data.c * ratio;
  data.set(data.t, data.p, ~~(value + (value < 0 ? -.5 : .5)) + data.u, data);
},
    _renderNonTweeningValue = function _renderNonTweeningValue(ratio, data) {
  return data.set(data.t, data.p, ratio ? data.e : data.b, data);
},
    _renderNonTweeningValueOnlyAtEnd = function _renderNonTweeningValueOnlyAtEnd(ratio, data) {
  return data.set(data.t, data.p, ratio !== 1 ? data.b : data.e, data);
},
    _setterCSSStyle = function _setterCSSStyle(target, property, value) {
  return target.style[property] = value;
},
    _setterCSSProp = function _setterCSSProp(target, property, value) {
  return target.style.setProperty(property, value);
},
    _setterTransform = function _setterTransform(target, property, value) {
  return target._gsap[property] = value;
},
    _setterScale = function _setterScale(target, property, value) {
  return target._gsap.scaleX = target._gsap.scaleY = value;
},
    _setterScaleWithRender = function _setterScaleWithRender(target, property, value, data, ratio) {
  var cache = target._gsap;
  cache.scaleX = cache.scaleY = value;
  cache.renderTransform(ratio, cache);
},
    _setterTransformWithRender = function _setterTransformWithRender(target, property, value, data, ratio) {
  var cache = target._gsap;
  cache[property] = value;
  cache.renderTransform(ratio, cache);
},
    _transformProp = "transform",
    _transformOriginProp = _transformProp + "Origin",
    _supports3D,
    _createElement = function _createElement(type, ns) {
  var e = _doc.createElementNS ? _doc.createElementNS((ns || "http://www.w3.org/1999/xhtml").replace(/^https/, "http"), type) : _doc.createElement(type); //some servers swap in https for http in the namespace which can break things, making "style" inaccessible.

  return e.style ? e : _doc.createElement(type); //some environments won't allow access to the element's style when created with a namespace in which case we default to the standard createElement() to work around the issue. Also note that when GSAP is embedded directly inside an SVG file, createElement() won't allow access to the style object in Firefox (see https://greensock.com/forums/topic/20215-problem-using-tweenmax-in-standalone-self-containing-svg-file-err-cannot-set-property-csstext-of-undefined/).
},
    _getComputedProperty = function _getComputedProperty(target, property, skipPrefixFallback) {
  var cs = getComputedStyle(target);
  return cs[property] || cs.getPropertyValue(property.replace(_capsExp, "-$1").toLowerCase()) || cs.getPropertyValue(property) || !skipPrefixFallback && _getComputedProperty(target, _checkPropPrefix(property) || property, 1) || ""; //css variables may not need caps swapped out for dashes and lowercase.
},
    _prefixes = "O,Moz,ms,Ms,Webkit".split(","),
    _checkPropPrefix = function _checkPropPrefix(property, element, preferPrefix) {
  var e = element || _tempDiv,
      s = e.style,
      i = 5;

  if (property in s && !preferPrefix) {
    return property;
  }

  property = property.charAt(0).toUpperCase() + property.substr(1);

  while (i-- && !(_prefixes[i] + property in s)) {}

  return i < 0 ? null : (i === 3 ? "ms" : i >= 0 ? _prefixes[i] : "") + property;
},
    _initCore = function _initCore() {
  if (_windowExists() && window.document) {
    _win = window;
    _doc = _win.document;
    _docElement = _doc.documentElement;
    _tempDiv = _createElement("div") || {
      style: {}
    };
    _tempDivStyler = _createElement("div");
    _transformProp = _checkPropPrefix(_transformProp);
    _transformOriginProp = _transformProp + "Origin";
    _tempDiv.style.cssText = "border-width:0;line-height:0;position:absolute;padding:0"; //make sure to override certain properties that may contaminate measurements, in case the user has overreaching style sheets.

    _supports3D = !!_checkPropPrefix("perspective");
    _pluginInitted = 1;
  }
},
    _getBBoxHack = function _getBBoxHack(swapIfPossible) {
  //works around issues in some browsers (like Firefox) that don't correctly report getBBox() on SVG elements inside a <defs> element and/or <mask>. We try creating an SVG, adding it to the documentElement and toss the element in there so that it's definitely part of the rendering tree, then grab the bbox and if it works, we actually swap out the original getBBox() method for our own that does these extra steps whenever getBBox is needed. This helps ensure that performance is optimal (only do all these extra steps when absolutely necessary...most elements don't need it).
  var svg = _createElement("svg", this.ownerSVGElement && this.ownerSVGElement.getAttribute("xmlns") || "http://www.w3.org/2000/svg"),
      oldParent = this.parentNode,
      oldSibling = this.nextSibling,
      oldCSS = this.style.cssText,
      bbox;

  _docElement.appendChild(svg);

  svg.appendChild(this);
  this.style.display = "block";

  if (swapIfPossible) {
    try {
      bbox = this.getBBox();
      this._gsapBBox = this.getBBox; //store the original

      this.getBBox = _getBBoxHack;
    } catch (e) {}
  } else if (this._gsapBBox) {
    bbox = this._gsapBBox();
  }

  if (oldParent) {
    if (oldSibling) {
      oldParent.insertBefore(this, oldSibling);
    } else {
      oldParent.appendChild(this);
    }
  }

  _docElement.removeChild(svg);

  this.style.cssText = oldCSS;
  return bbox;
},
    _getAttributeFallbacks = function _getAttributeFallbacks(target, attributesArray) {
  var i = attributesArray.length;

  while (i--) {
    if (target.hasAttribute(attributesArray[i])) {
      return target.getAttribute(attributesArray[i]);
    }
  }
},
    _getBBox = function _getBBox(target) {
  var bounds;

  try {
    bounds = target.getBBox(); //Firefox throws errors if you try calling getBBox() on an SVG element that's not rendered (like in a <symbol> or <defs>). https://bugzilla.mozilla.org/show_bug.cgi?id=612118
  } catch (error) {
    bounds = _getBBoxHack.call(target, true);
  }

  bounds && (bounds.width || bounds.height) || target.getBBox === _getBBoxHack || (bounds = _getBBoxHack.call(target, true)); //some browsers (like Firefox) misreport the bounds if the element has zero width and height (it just assumes it's at x:0, y:0), thus we need to manually grab the position in that case.

  return bounds && !bounds.width && !bounds.x && !bounds.y ? {
    x: +_getAttributeFallbacks(target, ["x", "cx", "x1"]) || 0,
    y: +_getAttributeFallbacks(target, ["y", "cy", "y1"]) || 0,
    width: 0,
    height: 0
  } : bounds;
},
    _isSVG = function _isSVG(e) {
  return !!(e.getCTM && (!e.parentNode || e.ownerSVGElement) && _getBBox(e));
},
    //reports if the element is an SVG on which getBBox() actually works
_removeProperty = function _removeProperty(target, property) {
  if (property) {
    var style = target.style;

    if (property in _transformProps && property !== _transformOriginProp) {
      property = _transformProp;
    }

    if (style.removeProperty) {
      if (property.substr(0, 2) === "ms" || property.substr(0, 6) === "webkit") {
        //Microsoft and some Webkit browsers don't conform to the standard of capitalizing the first prefix character, so we adjust so that when we prefix the caps with a dash, it's correct (otherwise it'd be "ms-transform" instead of "-ms-transform" for IE9, for example)
        property = "-" + property;
      }

      style.removeProperty(property.replace(_capsExp, "-$1").toLowerCase());
    } else {
      //note: old versions of IE use "removeAttribute()" instead of "removeProperty()"
      style.removeAttribute(property);
    }
  }
},
    _addNonTweeningPT = function _addNonTweeningPT(plugin, target, property, beginning, end, onlySetAtEnd) {
  var pt = new _gsapCore.PropTween(plugin._pt, target, property, 0, 1, onlySetAtEnd ? _renderNonTweeningValueOnlyAtEnd : _renderNonTweeningValue);
  plugin._pt = pt;
  pt.b = beginning;
  pt.e = end;

  plugin._props.push(property);

  return pt;
},
    _nonConvertibleUnits = {
  deg: 1,
  rad: 1,
  turn: 1
},
    //takes a single value like 20px and converts it to the unit specified, like "%", returning only the numeric amount.
_convertToUnit = function _convertToUnit(target, property, value, unit) {
  var curValue = parseFloat(value) || 0,
      curUnit = (value + "").trim().substr((curValue + "").length) || "px",
      // some browsers leave extra whitespace at the beginning of CSS variables, hence the need to trim()
  style = _tempDiv.style,
      horizontal = _horizontalExp.test(property),
      isRootSVG = target.tagName.toLowerCase() === "svg",
      measureProperty = (isRootSVG ? "client" : "offset") + (horizontal ? "Width" : "Height"),
      amount = 100,
      toPixels = unit === "px",
      toPercent = unit === "%",
      px,
      parent,
      cache,
      isSVG;

  if (unit === curUnit || !curValue || _nonConvertibleUnits[unit] || _nonConvertibleUnits[curUnit]) {
    return curValue;
  }

  curUnit !== "px" && !toPixels && (curValue = _convertToUnit(target, property, value, "px"));
  isSVG = target.getCTM && _isSVG(target);

  if ((toPercent || curUnit === "%") && (_transformProps[property] || ~property.indexOf("adius"))) {
    px = isSVG ? target.getBBox()[horizontal ? "width" : "height"] : target[measureProperty];
    return (0, _gsapCore._round)(toPercent ? curValue / px * amount : curValue / 100 * px);
  }

  style[horizontal ? "width" : "height"] = amount + (toPixels ? curUnit : unit);
  parent = ~property.indexOf("adius") || unit === "em" && target.appendChild && !isRootSVG ? target : target.parentNode;

  if (isSVG) {
    parent = (target.ownerSVGElement || {}).parentNode;
  }

  if (!parent || parent === _doc || !parent.appendChild) {
    parent = _doc.body;
  }

  cache = parent._gsap;

  if (cache && toPercent && cache.width && horizontal && cache.time === _gsapCore._ticker.time) {
    return (0, _gsapCore._round)(curValue / cache.width * amount);
  } else {
    (toPercent || curUnit === "%") && (style.position = _getComputedProperty(target, "position"));
    parent === target && (style.position = "static"); // like for borderRadius, if it's a % we must have it relative to the target itself but that may not have position: relative or position: absolute in which case it'd go up the chain until it finds its offsetParent (bad). position: static protects against that.

    parent.appendChild(_tempDiv);
    px = _tempDiv[measureProperty];
    parent.removeChild(_tempDiv);
    style.position = "absolute";

    if (horizontal && toPercent) {
      cache = (0, _gsapCore._getCache)(parent);
      cache.time = _gsapCore._ticker.time;
      cache.width = parent[measureProperty];
    }
  }

  return (0, _gsapCore._round)(toPixels ? px * curValue / amount : px && curValue ? amount / px * curValue : 0);
},
    _get = function _get(target, property, unit, uncache) {
  var value;
  _pluginInitted || _initCore();

  if (property in _propertyAliases && property !== "transform") {
    property = _propertyAliases[property];

    if (~property.indexOf(",")) {
      property = property.split(",")[0];
    }
  }

  if (_transformProps[property] && property !== "transform") {
    value = _parseTransform(target, uncache);
    value = property !== "transformOrigin" ? value[property] : value.svg ? value.origin : _firstTwoOnly(_getComputedProperty(target, _transformOriginProp)) + " " + value.zOrigin + "px";
  } else {
    value = target.style[property];

    if (!value || value === "auto" || uncache || ~(value + "").indexOf("calc(")) {
      value = _specialProps[property] && _specialProps[property](target, property, unit) || _getComputedProperty(target, property) || (0, _gsapCore._getProperty)(target, property) || (property === "opacity" ? 1 : 0); // note: some browsers, like Firefox, don't report borderRadius correctly! Instead, it only reports every corner like  borderTopLeftRadius
    }
  }

  return unit && !~(value + "").trim().indexOf(" ") ? _convertToUnit(target, property, value, unit) + unit : value;
},
    _tweenComplexCSSString = function _tweenComplexCSSString(target, prop, start, end) {
  // note: we call _tweenComplexCSSString.call(pluginInstance...) to ensure that it's scoped properly. We may call it from within a plugin too, thus "this" would refer to the plugin.
  if (!start || start === "none") {
    // some browsers like Safari actually PREFER the prefixed property and mis-report the unprefixed value like clipPath (BUG). In other words, even though clipPath exists in the style ("clipPath" in target.style) and it's set in the CSS properly (along with -webkit-clip-path), Safari reports clipPath as "none" whereas WebkitClipPath reports accurately like "ellipse(100% 0% at 50% 0%)", so in this case we must SWITCH to using the prefixed property instead. See https://greensock.com/forums/topic/18310-clippath-doesnt-work-on-ios/
    var p = _checkPropPrefix(prop, target, 1),
        s = p && _getComputedProperty(target, p, 1);

    if (s && s !== start) {
      prop = p;
      start = s;
    } else if (prop === "borderColor") {
      start = _getComputedProperty(target, "borderTopColor"); // Firefox bug: always reports "borderColor" as "", so we must fall back to borderTopColor. See https://greensock.com/forums/topic/24583-how-to-return-colors-that-i-had-after-reverse/
    }
  }

  var pt = new _gsapCore.PropTween(this._pt, target.style, prop, 0, 1, _gsapCore._renderComplexString),
      index = 0,
      matchIndex = 0,
      a,
      result,
      startValues,
      startNum,
      color,
      startValue,
      endValue,
      endNum,
      chunk,
      endUnit,
      startUnit,
      endValues;
  pt.b = start;
  pt.e = end;
  start += ""; // ensure values are strings

  end += "";

  if (end === "auto") {
    target.style[prop] = end;
    end = _getComputedProperty(target, prop) || end;
    target.style[prop] = start;
  }

  a = [start, end];
  (0, _gsapCore._colorStringFilter)(a); // pass an array with the starting and ending values and let the filter do whatever it needs to the values. If colors are found, it returns true and then we must match where the color shows up order-wise because for things like boxShadow, sometimes the browser provides the computed values with the color FIRST, but the user provides it with the color LAST, so flip them if necessary. Same for drop-shadow().

  start = a[0];
  end = a[1];
  startValues = start.match(_gsapCore._numWithUnitExp) || [];
  endValues = end.match(_gsapCore._numWithUnitExp) || [];

  if (endValues.length) {
    while (result = _gsapCore._numWithUnitExp.exec(end)) {
      endValue = result[0];
      chunk = end.substring(index, result.index);

      if (color) {
        color = (color + 1) % 5;
      } else if (chunk.substr(-5) === "rgba(" || chunk.substr(-5) === "hsla(") {
        color = 1;
      }

      if (endValue !== (startValue = startValues[matchIndex++] || "")) {
        startNum = parseFloat(startValue) || 0;
        startUnit = startValue.substr((startNum + "").length);
        endValue.charAt(1) === "=" && (endValue = (0, _gsapCore._parseRelative)(startNum, endValue) + startUnit);
        endNum = parseFloat(endValue);
        endUnit = endValue.substr((endNum + "").length);
        index = _gsapCore._numWithUnitExp.lastIndex - endUnit.length;

        if (!endUnit) {
          //if something like "perspective:300" is passed in and we must add a unit to the end
          endUnit = endUnit || _gsapCore._config.units[prop] || startUnit;

          if (index === end.length) {
            end += endUnit;
            pt.e += endUnit;
          }
        }

        if (startUnit !== endUnit) {
          startNum = _convertToUnit(target, prop, startValue, endUnit) || 0;
        } // these nested PropTweens are handled in a special way - we'll never actually call a render or setter method on them. We'll just loop through them in the parent complex string PropTween's render method.


        pt._pt = {
          _next: pt._pt,
          p: chunk || matchIndex === 1 ? chunk : ",",
          //note: SVG spec allows omission of comma/space when a negative sign is wedged between two numbers, like 2.5-5.3 instead of 2.5,-5.3 but when tweening, the negative value may switch to positive, so we insert the comma just in case.
          s: startNum,
          c: endNum - startNum,
          m: color && color < 4 || prop === "zIndex" ? Math.round : 0
        };
      }
    }

    pt.c = index < end.length ? end.substring(index, end.length) : ""; //we use the "c" of the PropTween to store the final part of the string (after the last number)
  } else {
    pt.r = prop === "display" && end === "none" ? _renderNonTweeningValueOnlyAtEnd : _renderNonTweeningValue;
  }

  _gsapCore._relExp.test(end) && (pt.e = 0); //if the end string contains relative values or dynamic random(...) values, delete the end it so that on the final render we don't actually set it to the string with += or -= characters (forces it to use the calculated value).

  this._pt = pt; //start the linked list with this new PropTween. Remember, we call _tweenComplexCSSString.call(pluginInstance...) to ensure that it's scoped properly. We may call it from within another plugin too, thus "this" would refer to the plugin.

  return pt;
},
    _keywordToPercent = {
  top: "0%",
  bottom: "100%",
  left: "0%",
  right: "100%",
  center: "50%"
},
    _convertKeywordsToPercentages = function _convertKeywordsToPercentages(value) {
  var split = value.split(" "),
      x = split[0],
      y = split[1] || "50%";

  if (x === "top" || x === "bottom" || y === "left" || y === "right") {
    //the user provided them in the wrong order, so flip them
    value = x;
    x = y;
    y = value;
  }

  split[0] = _keywordToPercent[x] || x;
  split[1] = _keywordToPercent[y] || y;
  return split.join(" ");
},
    _renderClearProps = function _renderClearProps(ratio, data) {
  if (data.tween && data.tween._time === data.tween._dur) {
    var target = data.t,
        style = target.style,
        props = data.u,
        cache = target._gsap,
        prop,
        clearTransforms,
        i;

    if (props === "all" || props === true) {
      style.cssText = "";
      clearTransforms = 1;
    } else {
      props = props.split(",");
      i = props.length;

      while (--i > -1) {
        prop = props[i];

        if (_transformProps[prop]) {
          clearTransforms = 1;
          prop = prop === "transformOrigin" ? _transformOriginProp : _transformProp;
        }

        _removeProperty(target, prop);
      }
    }

    if (clearTransforms) {
      _removeProperty(target, _transformProp);

      if (cache) {
        cache.svg && target.removeAttribute("transform");

        _parseTransform(target, 1); // force all the cached values back to "normal"/identity, otherwise if there's another tween that's already set to render transforms on this element, it could display the wrong values.


        cache.uncache = 1;
      }
    }
  }
},
    // note: specialProps should return 1 if (and only if) they have a non-zero priority. It indicates we need to sort the linked list.
_specialProps = {
  clearProps: function clearProps(plugin, target, property, endValue, tween) {
    if (tween.data !== "isFromStart") {
      var pt = plugin._pt = new _gsapCore.PropTween(plugin._pt, target, property, 0, 0, _renderClearProps);
      pt.u = endValue;
      pt.pr = -10;
      pt.tween = tween;

      plugin._props.push(property);

      return 1;
    }
  }
  /* className feature (about 0.4kb gzipped).
  , className(plugin, target, property, endValue, tween) {
  	let _renderClassName = (ratio, data) => {
  			data.css.render(ratio, data.css);
  			if (!ratio || ratio === 1) {
  				let inline = data.rmv,
  					target = data.t,
  					p;
  				target.setAttribute("class", ratio ? data.e : data.b);
  				for (p in inline) {
  					_removeProperty(target, p);
  				}
  			}
  		},
  		_getAllStyles = (target) => {
  			let styles = {},
  				computed = getComputedStyle(target),
  				p;
  			for (p in computed) {
  				if (isNaN(p) && p !== "cssText" && p !== "length") {
  					styles[p] = computed[p];
  				}
  			}
  			_setDefaults(styles, _parseTransform(target, 1));
  			return styles;
  		},
  		startClassList = target.getAttribute("class"),
  		style = target.style,
  		cssText = style.cssText,
  		cache = target._gsap,
  		classPT = cache.classPT,
  		inlineToRemoveAtEnd = {},
  		data = {t:target, plugin:plugin, rmv:inlineToRemoveAtEnd, b:startClassList, e:(endValue.charAt(1) !== "=") ? endValue : startClassList.replace(new RegExp("(?:\\s|^)" + endValue.substr(2) + "(?![\\w-])"), "") + ((endValue.charAt(0) === "+") ? " " + endValue.substr(2) : "")},
  		changingVars = {},
  		startVars = _getAllStyles(target),
  		transformRelated = /(transform|perspective)/i,
  		endVars, p;
  	if (classPT) {
  		classPT.r(1, classPT.d);
  		_removeLinkedListItem(classPT.d.plugin, classPT, "_pt");
  	}
  	target.setAttribute("class", data.e);
  	endVars = _getAllStyles(target, true);
  	target.setAttribute("class", startClassList);
  	for (p in endVars) {
  		if (endVars[p] !== startVars[p] && !transformRelated.test(p)) {
  			changingVars[p] = endVars[p];
  			if (!style[p] && style[p] !== "0") {
  				inlineToRemoveAtEnd[p] = 1;
  			}
  		}
  	}
  	cache.classPT = plugin._pt = new PropTween(plugin._pt, target, "className", 0, 0, _renderClassName, data, 0, -11);
  	if (style.cssText !== cssText) { //only apply if things change. Otherwise, in cases like a background-image that's pulled dynamically, it could cause a refresh. See https://greensock.com/forums/topic/20368-possible-gsap-bug-switching-classnames-in-chrome/.
  		style.cssText = cssText; //we recorded cssText before we swapped classes and ran _getAllStyles() because in cases when a className tween is overwritten, we remove all the related tweening properties from that class change (otherwise class-specific stuff can't override properties we've directly set on the target's style object due to specificity).
  	}
  	_parseTransform(target, true); //to clear the caching of transforms
  	data.css = new gsap.plugins.css();
  	data.css.init(target, changingVars, tween);
  	plugin._props.push(...data.css._props);
  	return 1;
  }
  */

},

/*
 * --------------------------------------------------------------------------------------
 * TRANSFORMS
 * --------------------------------------------------------------------------------------
 */
_identity2DMatrix = [1, 0, 0, 1, 0, 0],
    _rotationalProperties = {},
    _isNullTransform = function _isNullTransform(value) {
  return value === "matrix(1, 0, 0, 1, 0, 0)" || value === "none" || !value;
},
    _getComputedTransformMatrixAsArray = function _getComputedTransformMatrixAsArray(target) {
  var matrixString = _getComputedProperty(target, _transformProp);

  return _isNullTransform(matrixString) ? _identity2DMatrix : matrixString.substr(7).match(_gsapCore._numExp).map(_gsapCore._round);
},
    _getMatrix = function _getMatrix(target, force2D) {
  var cache = target._gsap || (0, _gsapCore._getCache)(target),
      style = target.style,
      matrix = _getComputedTransformMatrixAsArray(target),
      parent,
      nextSibling,
      temp,
      addedToDOM;

  if (cache.svg && target.getAttribute("transform")) {
    temp = target.transform.baseVal.consolidate().matrix; //ensures that even complex values like "translate(50,60) rotate(135,0,0)" are parsed because it mashes it into a matrix.

    matrix = [temp.a, temp.b, temp.c, temp.d, temp.e, temp.f];
    return matrix.join(",") === "1,0,0,1,0,0" ? _identity2DMatrix : matrix;
  } else if (matrix === _identity2DMatrix && !target.offsetParent && target !== _docElement && !cache.svg) {
    //note: if offsetParent is null, that means the element isn't in the normal document flow, like if it has display:none or one of its ancestors has display:none). Firefox returns null for getComputedStyle() if the element is in an iframe that has display:none. https://bugzilla.mozilla.org/show_bug.cgi?id=548397
    //browsers don't report transforms accurately unless the element is in the DOM and has a display value that's not "none". Firefox and Microsoft browsers have a partial bug where they'll report transforms even if display:none BUT not any percentage-based values like translate(-50%, 8px) will be reported as if it's translate(0, 8px).
    temp = style.display;
    style.display = "block";
    parent = target.parentNode;

    if (!parent || !target.offsetParent) {
      // note: in 3.3.0 we switched target.offsetParent to _doc.body.contains(target) to avoid [sometimes unnecessary] MutationObserver calls but that wasn't adequate because there are edge cases where nested position: fixed elements need to get reparented to accurately sense transforms. See https://github.com/greensock/GSAP/issues/388 and https://github.com/greensock/GSAP/issues/375
      addedToDOM = 1; //flag

      nextSibling = target.nextSibling;

      _docElement.appendChild(target); //we must add it to the DOM in order to get values properly

    }

    matrix = _getComputedTransformMatrixAsArray(target);
    temp ? style.display = temp : _removeProperty(target, "display");

    if (addedToDOM) {
      nextSibling ? parent.insertBefore(target, nextSibling) : parent ? parent.appendChild(target) : _docElement.removeChild(target);
    }
  }

  return force2D && matrix.length > 6 ? [matrix[0], matrix[1], matrix[4], matrix[5], matrix[12], matrix[13]] : matrix;
},
    _applySVGOrigin = function _applySVGOrigin(target, origin, originIsAbsolute, smooth, matrixArray, pluginToAddPropTweensTo) {
  var cache = target._gsap,
      matrix = matrixArray || _getMatrix(target, true),
      xOriginOld = cache.xOrigin || 0,
      yOriginOld = cache.yOrigin || 0,
      xOffsetOld = cache.xOffset || 0,
      yOffsetOld = cache.yOffset || 0,
      a = matrix[0],
      b = matrix[1],
      c = matrix[2],
      d = matrix[3],
      tx = matrix[4],
      ty = matrix[5],
      originSplit = origin.split(" "),
      xOrigin = parseFloat(originSplit[0]) || 0,
      yOrigin = parseFloat(originSplit[1]) || 0,
      bounds,
      determinant,
      x,
      y;

  if (!originIsAbsolute) {
    bounds = _getBBox(target);
    xOrigin = bounds.x + (~originSplit[0].indexOf("%") ? xOrigin / 100 * bounds.width : xOrigin);
    yOrigin = bounds.y + (~(originSplit[1] || originSplit[0]).indexOf("%") ? yOrigin / 100 * bounds.height : yOrigin);
  } else if (matrix !== _identity2DMatrix && (determinant = a * d - b * c)) {
    //if it's zero (like if scaleX and scaleY are zero), skip it to avoid errors with dividing by zero.
    x = xOrigin * (d / determinant) + yOrigin * (-c / determinant) + (c * ty - d * tx) / determinant;
    y = xOrigin * (-b / determinant) + yOrigin * (a / determinant) - (a * ty - b * tx) / determinant;
    xOrigin = x;
    yOrigin = y;
  }

  if (smooth || smooth !== false && cache.smooth) {
    tx = xOrigin - xOriginOld;
    ty = yOrigin - yOriginOld;
    cache.xOffset = xOffsetOld + (tx * a + ty * c) - tx;
    cache.yOffset = yOffsetOld + (tx * b + ty * d) - ty;
  } else {
    cache.xOffset = cache.yOffset = 0;
  }

  cache.xOrigin = xOrigin;
  cache.yOrigin = yOrigin;
  cache.smooth = !!smooth;
  cache.origin = origin;
  cache.originIsAbsolute = !!originIsAbsolute;
  target.style[_transformOriginProp] = "0px 0px"; //otherwise, if someone sets  an origin via CSS, it will likely interfere with the SVG transform attribute ones (because remember, we're baking the origin into the matrix() value).

  if (pluginToAddPropTweensTo) {
    _addNonTweeningPT(pluginToAddPropTweensTo, cache, "xOrigin", xOriginOld, xOrigin);

    _addNonTweeningPT(pluginToAddPropTweensTo, cache, "yOrigin", yOriginOld, yOrigin);

    _addNonTweeningPT(pluginToAddPropTweensTo, cache, "xOffset", xOffsetOld, cache.xOffset);

    _addNonTweeningPT(pluginToAddPropTweensTo, cache, "yOffset", yOffsetOld, cache.yOffset);
  }

  target.setAttribute("data-svg-origin", xOrigin + " " + yOrigin);
},
    _parseTransform = function _parseTransform(target, uncache) {
  var cache = target._gsap || new _gsapCore.GSCache(target);

  if ("x" in cache && !uncache && !cache.uncache) {
    return cache;
  }

  var style = target.style,
      invertedScaleX = cache.scaleX < 0,
      px = "px",
      deg = "deg",
      origin = _getComputedProperty(target, _transformOriginProp) || "0",
      x,
      y,
      z,
      scaleX,
      scaleY,
      rotation,
      rotationX,
      rotationY,
      skewX,
      skewY,
      perspective,
      xOrigin,
      yOrigin,
      matrix,
      angle,
      cos,
      sin,
      a,
      b,
      c,
      d,
      a12,
      a22,
      t1,
      t2,
      t3,
      a13,
      a23,
      a33,
      a42,
      a43,
      a32;
  x = y = z = rotation = rotationX = rotationY = skewX = skewY = perspective = 0;
  scaleX = scaleY = 1;
  cache.svg = !!(target.getCTM && _isSVG(target));
  matrix = _getMatrix(target, cache.svg);

  if (cache.svg) {
    t1 = (!cache.uncache || origin === "0px 0px") && !uncache && target.getAttribute("data-svg-origin"); // if origin is 0,0 and cache.uncache is true, let the recorded data-svg-origin stay. Otherwise, whenever we set cache.uncache to true, we'd need to set element.style.transformOrigin = (cache.xOrigin - bbox.x) + "px " + (cache.yOrigin - bbox.y) + "px". Remember, to work around browser inconsistencies we always force SVG elements' transformOrigin to 0,0 and offset the translation accordingly.

    _applySVGOrigin(target, t1 || origin, !!t1 || cache.originIsAbsolute, cache.smooth !== false, matrix);
  }

  xOrigin = cache.xOrigin || 0;
  yOrigin = cache.yOrigin || 0;

  if (matrix !== _identity2DMatrix) {
    a = matrix[0]; //a11

    b = matrix[1]; //a21

    c = matrix[2]; //a31

    d = matrix[3]; //a41

    x = a12 = matrix[4];
    y = a22 = matrix[5]; //2D matrix

    if (matrix.length === 6) {
      scaleX = Math.sqrt(a * a + b * b);
      scaleY = Math.sqrt(d * d + c * c);
      rotation = a || b ? _atan2(b, a) * _RAD2DEG : 0; //note: if scaleX is 0, we cannot accurately measure rotation. Same for skewX with a scaleY of 0. Therefore, we default to the previously recorded value (or zero if that doesn't exist).

      skewX = c || d ? _atan2(c, d) * _RAD2DEG + rotation : 0;
      skewX && (scaleY *= Math.abs(Math.cos(skewX * _DEG2RAD)));

      if (cache.svg) {
        x -= xOrigin - (xOrigin * a + yOrigin * c);
        y -= yOrigin - (xOrigin * b + yOrigin * d);
      } //3D matrix

    } else {
      a32 = matrix[6];
      a42 = matrix[7];
      a13 = matrix[8];
      a23 = matrix[9];
      a33 = matrix[10];
      a43 = matrix[11];
      x = matrix[12];
      y = matrix[13];
      z = matrix[14];
      angle = _atan2(a32, a33);
      rotationX = angle * _RAD2DEG; //rotationX

      if (angle) {
        cos = Math.cos(-angle);
        sin = Math.sin(-angle);
        t1 = a12 * cos + a13 * sin;
        t2 = a22 * cos + a23 * sin;
        t3 = a32 * cos + a33 * sin;
        a13 = a12 * -sin + a13 * cos;
        a23 = a22 * -sin + a23 * cos;
        a33 = a32 * -sin + a33 * cos;
        a43 = a42 * -sin + a43 * cos;
        a12 = t1;
        a22 = t2;
        a32 = t3;
      } //rotationY


      angle = _atan2(-c, a33);
      rotationY = angle * _RAD2DEG;

      if (angle) {
        cos = Math.cos(-angle);
        sin = Math.sin(-angle);
        t1 = a * cos - a13 * sin;
        t2 = b * cos - a23 * sin;
        t3 = c * cos - a33 * sin;
        a43 = d * sin + a43 * cos;
        a = t1;
        b = t2;
        c = t3;
      } //rotationZ


      angle = _atan2(b, a);
      rotation = angle * _RAD2DEG;

      if (angle) {
        cos = Math.cos(angle);
        sin = Math.sin(angle);
        t1 = a * cos + b * sin;
        t2 = a12 * cos + a22 * sin;
        b = b * cos - a * sin;
        a22 = a22 * cos - a12 * sin;
        a = t1;
        a12 = t2;
      }

      if (rotationX && Math.abs(rotationX) + Math.abs(rotation) > 359.9) {
        //when rotationY is set, it will often be parsed as 180 degrees different than it should be, and rotationX and rotation both being 180 (it looks the same), so we adjust for that here.
        rotationX = rotation = 0;
        rotationY = 180 - rotationY;
      }

      scaleX = (0, _gsapCore._round)(Math.sqrt(a * a + b * b + c * c));
      scaleY = (0, _gsapCore._round)(Math.sqrt(a22 * a22 + a32 * a32));
      angle = _atan2(a12, a22);
      skewX = Math.abs(angle) > 0.0002 ? angle * _RAD2DEG : 0;
      perspective = a43 ? 1 / (a43 < 0 ? -a43 : a43) : 0;
    }

    if (cache.svg) {
      //sense if there are CSS transforms applied on an SVG element in which case we must overwrite them when rendering. The transform attribute is more reliable cross-browser, but we can't just remove the CSS ones because they may be applied in a CSS rule somewhere (not just inline).
      t1 = target.getAttribute("transform");
      cache.forceCSS = target.setAttribute("transform", "") || !_isNullTransform(_getComputedProperty(target, _transformProp));
      t1 && target.setAttribute("transform", t1);
    }
  }

  if (Math.abs(skewX) > 90 && Math.abs(skewX) < 270) {
    if (invertedScaleX) {
      scaleX *= -1;
      skewX += rotation <= 0 ? 180 : -180;
      rotation += rotation <= 0 ? 180 : -180;
    } else {
      scaleY *= -1;
      skewX += skewX <= 0 ? 180 : -180;
    }
  }

  uncache = uncache || cache.uncache;
  cache.x = x - ((cache.xPercent = x && (!uncache && cache.xPercent || (Math.round(target.offsetWidth / 2) === Math.round(-x) ? -50 : 0))) ? target.offsetWidth * cache.xPercent / 100 : 0) + px;
  cache.y = y - ((cache.yPercent = y && (!uncache && cache.yPercent || (Math.round(target.offsetHeight / 2) === Math.round(-y) ? -50 : 0))) ? target.offsetHeight * cache.yPercent / 100 : 0) + px;
  cache.z = z + px;
  cache.scaleX = (0, _gsapCore._round)(scaleX);
  cache.scaleY = (0, _gsapCore._round)(scaleY);
  cache.rotation = (0, _gsapCore._round)(rotation) + deg;
  cache.rotationX = (0, _gsapCore._round)(rotationX) + deg;
  cache.rotationY = (0, _gsapCore._round)(rotationY) + deg;
  cache.skewX = skewX + deg;
  cache.skewY = skewY + deg;
  cache.transformPerspective = perspective + px;

  if (cache.zOrigin = parseFloat(origin.split(" ")[2]) || 0) {
    style[_transformOriginProp] = _firstTwoOnly(origin);
  }

  cache.xOffset = cache.yOffset = 0;
  cache.force3D = _gsapCore._config.force3D;
  cache.renderTransform = cache.svg ? _renderSVGTransforms : _supports3D ? _renderCSSTransforms : _renderNon3DTransforms;
  cache.uncache = 0;
  return cache;
},
    _firstTwoOnly = function _firstTwoOnly(value) {
  return (value = value.split(" "))[0] + " " + value[1];
},
    //for handling transformOrigin values, stripping out the 3rd dimension
_addPxTranslate = function _addPxTranslate(target, start, value) {
  var unit = (0, _gsapCore.getUnit)(start);
  return (0, _gsapCore._round)(parseFloat(start) + parseFloat(_convertToUnit(target, "x", value + "px", unit))) + unit;
},
    _renderNon3DTransforms = function _renderNon3DTransforms(ratio, cache) {
  cache.z = "0px";
  cache.rotationY = cache.rotationX = "0deg";
  cache.force3D = 0;

  _renderCSSTransforms(ratio, cache);
},
    _zeroDeg = "0deg",
    _zeroPx = "0px",
    _endParenthesis = ") ",
    _renderCSSTransforms = function _renderCSSTransforms(ratio, cache) {
  var _ref = cache || this,
      xPercent = _ref.xPercent,
      yPercent = _ref.yPercent,
      x = _ref.x,
      y = _ref.y,
      z = _ref.z,
      rotation = _ref.rotation,
      rotationY = _ref.rotationY,
      rotationX = _ref.rotationX,
      skewX = _ref.skewX,
      skewY = _ref.skewY,
      scaleX = _ref.scaleX,
      scaleY = _ref.scaleY,
      transformPerspective = _ref.transformPerspective,
      force3D = _ref.force3D,
      target = _ref.target,
      zOrigin = _ref.zOrigin,
      transforms = "",
      use3D = force3D === "auto" && ratio && ratio !== 1 || force3D === true; // Safari has a bug that causes it not to render 3D transform-origin values properly, so we force the z origin to 0, record it in the cache, and then do the math here to offset the translate values accordingly (basically do the 3D transform-origin part manually)


  if (zOrigin && (rotationX !== _zeroDeg || rotationY !== _zeroDeg)) {
    var angle = parseFloat(rotationY) * _DEG2RAD,
        a13 = Math.sin(angle),
        a33 = Math.cos(angle),
        cos;

    angle = parseFloat(rotationX) * _DEG2RAD;
    cos = Math.cos(angle);
    x = _addPxTranslate(target, x, a13 * cos * -zOrigin);
    y = _addPxTranslate(target, y, -Math.sin(angle) * -zOrigin);
    z = _addPxTranslate(target, z, a33 * cos * -zOrigin + zOrigin);
  }

  if (transformPerspective !== _zeroPx) {
    transforms += "perspective(" + transformPerspective + _endParenthesis;
  }

  if (xPercent || yPercent) {
    transforms += "translate(" + xPercent + "%, " + yPercent + "%) ";
  }

  if (use3D || x !== _zeroPx || y !== _zeroPx || z !== _zeroPx) {
    transforms += z !== _zeroPx || use3D ? "translate3d(" + x + ", " + y + ", " + z + ") " : "translate(" + x + ", " + y + _endParenthesis;
  }

  if (rotation !== _zeroDeg) {
    transforms += "rotate(" + rotation + _endParenthesis;
  }

  if (rotationY !== _zeroDeg) {
    transforms += "rotateY(" + rotationY + _endParenthesis;
  }

  if (rotationX !== _zeroDeg) {
    transforms += "rotateX(" + rotationX + _endParenthesis;
  }

  if (skewX !== _zeroDeg || skewY !== _zeroDeg) {
    transforms += "skew(" + skewX + ", " + skewY + _endParenthesis;
  }

  if (scaleX !== 1 || scaleY !== 1) {
    transforms += "scale(" + scaleX + ", " + scaleY + _endParenthesis;
  }

  target.style[_transformProp] = transforms || "translate(0, 0)";
},
    _renderSVGTransforms = function _renderSVGTransforms(ratio, cache) {
  var _ref2 = cache || this,
      xPercent = _ref2.xPercent,
      yPercent = _ref2.yPercent,
      x = _ref2.x,
      y = _ref2.y,
      rotation = _ref2.rotation,
      skewX = _ref2.skewX,
      skewY = _ref2.skewY,
      scaleX = _ref2.scaleX,
      scaleY = _ref2.scaleY,
      target = _ref2.target,
      xOrigin = _ref2.xOrigin,
      yOrigin = _ref2.yOrigin,
      xOffset = _ref2.xOffset,
      yOffset = _ref2.yOffset,
      forceCSS = _ref2.forceCSS,
      tx = parseFloat(x),
      ty = parseFloat(y),
      a11,
      a21,
      a12,
      a22,
      temp;

  rotation = parseFloat(rotation);
  skewX = parseFloat(skewX);
  skewY = parseFloat(skewY);

  if (skewY) {
    //for performance reasons, we combine all skewing into the skewX and rotation values. Remember, a skewY of 10 degrees looks the same as a rotation of 10 degrees plus a skewX of 10 degrees.
    skewY = parseFloat(skewY);
    skewX += skewY;
    rotation += skewY;
  }

  if (rotation || skewX) {
    rotation *= _DEG2RAD;
    skewX *= _DEG2RAD;
    a11 = Math.cos(rotation) * scaleX;
    a21 = Math.sin(rotation) * scaleX;
    a12 = Math.sin(rotation - skewX) * -scaleY;
    a22 = Math.cos(rotation - skewX) * scaleY;

    if (skewX) {
      skewY *= _DEG2RAD;
      temp = Math.tan(skewX - skewY);
      temp = Math.sqrt(1 + temp * temp);
      a12 *= temp;
      a22 *= temp;

      if (skewY) {
        temp = Math.tan(skewY);
        temp = Math.sqrt(1 + temp * temp);
        a11 *= temp;
        a21 *= temp;
      }
    }

    a11 = (0, _gsapCore._round)(a11);
    a21 = (0, _gsapCore._round)(a21);
    a12 = (0, _gsapCore._round)(a12);
    a22 = (0, _gsapCore._round)(a22);
  } else {
    a11 = scaleX;
    a22 = scaleY;
    a21 = a12 = 0;
  }

  if (tx && !~(x + "").indexOf("px") || ty && !~(y + "").indexOf("px")) {
    tx = _convertToUnit(target, "x", x, "px");
    ty = _convertToUnit(target, "y", y, "px");
  }

  if (xOrigin || yOrigin || xOffset || yOffset) {
    tx = (0, _gsapCore._round)(tx + xOrigin - (xOrigin * a11 + yOrigin * a12) + xOffset);
    ty = (0, _gsapCore._round)(ty + yOrigin - (xOrigin * a21 + yOrigin * a22) + yOffset);
  }

  if (xPercent || yPercent) {
    //The SVG spec doesn't support percentage-based translation in the "transform" attribute, so we merge it into the translation to simulate it.
    temp = target.getBBox();
    tx = (0, _gsapCore._round)(tx + xPercent / 100 * temp.width);
    ty = (0, _gsapCore._round)(ty + yPercent / 100 * temp.height);
  }

  temp = "matrix(" + a11 + "," + a21 + "," + a12 + "," + a22 + "," + tx + "," + ty + ")";
  target.setAttribute("transform", temp);
  forceCSS && (target.style[_transformProp] = temp); //some browsers prioritize CSS transforms over the transform attribute. When we sense that the user has CSS transforms applied, we must overwrite them this way (otherwise some browser simply won't render the  transform attribute changes!)
},
    _addRotationalPropTween = function _addRotationalPropTween(plugin, target, property, startNum, endValue) {
  var cap = 360,
      isString = (0, _gsapCore._isString)(endValue),
      endNum = parseFloat(endValue) * (isString && ~endValue.indexOf("rad") ? _RAD2DEG : 1),
      change = endNum - startNum,
      finalValue = startNum + change + "deg",
      direction,
      pt;

  if (isString) {
    direction = endValue.split("_")[1];

    if (direction === "short") {
      change %= cap;

      if (change !== change % (cap / 2)) {
        change += change < 0 ? cap : -cap;
      }
    }

    if (direction === "cw" && change < 0) {
      change = (change + cap * _bigNum) % cap - ~~(change / cap) * cap;
    } else if (direction === "ccw" && change > 0) {
      change = (change - cap * _bigNum) % cap - ~~(change / cap) * cap;
    }
  }

  plugin._pt = pt = new _gsapCore.PropTween(plugin._pt, target, property, startNum, change, _renderPropWithEnd);
  pt.e = finalValue;
  pt.u = "deg";

  plugin._props.push(property);

  return pt;
},
    _assign = function _assign(target, source) {
  // Internet Explorer doesn't have Object.assign(), so we recreate it here.
  for (var p in source) {
    target[p] = source[p];
  }

  return target;
},
    _addRawTransformPTs = function _addRawTransformPTs(plugin, transforms, target) {
  //for handling cases where someone passes in a whole transform string, like transform: "scale(2, 3) rotate(20deg) translateY(30em)"
  var startCache = _assign({}, target._gsap),
      exclude = "perspective,force3D,transformOrigin,svgOrigin",
      style = target.style,
      endCache,
      p,
      startValue,
      endValue,
      startNum,
      endNum,
      startUnit,
      endUnit;

  if (startCache.svg) {
    startValue = target.getAttribute("transform");
    target.setAttribute("transform", "");
    style[_transformProp] = transforms;
    endCache = _parseTransform(target, 1);

    _removeProperty(target, _transformProp);

    target.setAttribute("transform", startValue);
  } else {
    startValue = getComputedStyle(target)[_transformProp];
    style[_transformProp] = transforms;
    endCache = _parseTransform(target, 1);
    style[_transformProp] = startValue;
  }

  for (p in _transformProps) {
    startValue = startCache[p];
    endValue = endCache[p];

    if (startValue !== endValue && exclude.indexOf(p) < 0) {
      //tweening to no perspective gives very unintuitive results - just keep the same perspective in that case.
      startUnit = (0, _gsapCore.getUnit)(startValue);
      endUnit = (0, _gsapCore.getUnit)(endValue);
      startNum = startUnit !== endUnit ? _convertToUnit(target, p, startValue, endUnit) : parseFloat(startValue);
      endNum = parseFloat(endValue);
      plugin._pt = new _gsapCore.PropTween(plugin._pt, endCache, p, startNum, endNum - startNum, _renderCSSProp);
      plugin._pt.u = endUnit || 0;

      plugin._props.push(p);
    }
  }

  _assign(endCache, startCache);
}; // handle splitting apart padding, margin, borderWidth, and borderRadius into their 4 components. Firefox, for example, won't report borderRadius correctly - it will only do borderTopLeftRadius and the other corners. We also want to handle paddingTop, marginLeft, borderRightWidth, etc.


exports._getBBox = _getBBox;
exports.checkPrefix = _checkPropPrefix;
exports._createElement = _createElement;
(0, _gsapCore._forEachName)("padding,margin,Width,Radius", function (name, index) {
  var t = "Top",
      r = "Right",
      b = "Bottom",
      l = "Left",
      props = (index < 3 ? [t, r, b, l] : [t + l, t + r, b + r, b + l]).map(function (side) {
    return index < 2 ? name + side : "border" + side + name;
  });

  _specialProps[index > 1 ? "border" + name : name] = function (plugin, target, property, endValue, tween) {
    var a, vars;

    if (arguments.length < 4) {
      // getter, passed target, property, and unit (from _get())
      a = props.map(function (prop) {
        return _get(plugin, prop, property);
      });
      vars = a.join(" ");
      return vars.split(a[0]).length === 5 ? a[0] : vars;
    }

    a = (endValue + "").split(" ");
    vars = {};
    props.forEach(function (prop, i) {
      return vars[prop] = a[i] = a[i] || a[(i - 1) / 2 | 0];
    });
    plugin.init(target, vars, tween);
  };
});
var CSSPlugin = {
  name: "css",
  register: _initCore,
  targetTest: function targetTest(target) {
    return target.style && target.nodeType;
  },
  init: function init(target, vars, tween, index, targets) {
    var props = this._props,
        style = target.style,
        startAt = tween.vars.startAt,
        startValue,
        endValue,
        endNum,
        startNum,
        type,
        specialProp,
        p,
        startUnit,
        endUnit,
        relative,
        isTransformRelated,
        transformPropTween,
        cache,
        smooth,
        hasPriority;
    _pluginInitted || _initCore();

    for (p in vars) {
      if (p === "autoRound") {
        continue;
      }

      endValue = vars[p];

      if (_gsapCore._plugins[p] && (0, _gsapCore._checkPlugin)(p, vars, tween, index, target, targets)) {
        // plugins
        continue;
      }

      type = typeof endValue;
      specialProp = _specialProps[p];

      if (type === "function") {
        endValue = endValue.call(tween, index, target, targets);
        type = typeof endValue;
      }

      if (type === "string" && ~endValue.indexOf("random(")) {
        endValue = (0, _gsapCore._replaceRandom)(endValue);
      }

      if (specialProp) {
        specialProp(this, target, p, endValue, tween) && (hasPriority = 1);
      } else if (p.substr(0, 2) === "--") {
        //CSS variable
        startValue = (getComputedStyle(target).getPropertyValue(p) + "").trim();
        endValue += "";
        _gsapCore._colorExp.lastIndex = 0;

        if (!_gsapCore._colorExp.test(startValue)) {
          // colors don't have units
          startUnit = (0, _gsapCore.getUnit)(startValue);
          endUnit = (0, _gsapCore.getUnit)(endValue);
        }

        endUnit ? startUnit !== endUnit && (startValue = _convertToUnit(target, p, startValue, endUnit) + endUnit) : startUnit && (endValue += startUnit);
        this.add(style, "setProperty", startValue, endValue, index, targets, 0, 0, p);
        props.push(p);
      } else if (type !== "undefined") {
        if (startAt && p in startAt) {
          // in case someone hard-codes a complex value as the start, like top: "calc(2vh / 2)". Without this, it'd use the computed value (always in px)
          startValue = typeof startAt[p] === "function" ? startAt[p].call(tween, index, target, targets) : startAt[p];
          (0, _gsapCore._isString)(startValue) && ~startValue.indexOf("random(") && (startValue = (0, _gsapCore._replaceRandom)(startValue));
          (0, _gsapCore.getUnit)(startValue + "") || (startValue += _gsapCore._config.units[p] || (0, _gsapCore.getUnit)(_get(target, p)) || ""); // for cases when someone passes in a unitless value like {x: 100}; if we try setting translate(100, 0px) it won't work.

          (startValue + "").charAt(1) === "=" && (startValue = _get(target, p)); // can't work with relative values
        } else {
          startValue = _get(target, p);
        }

        startNum = parseFloat(startValue);
        relative = type === "string" && endValue.charAt(1) === "=" && endValue.substr(0, 2);
        relative && (endValue = endValue.substr(2));
        endNum = parseFloat(endValue);

        if (p in _propertyAliases) {
          if (p === "autoAlpha") {
            //special case where we control the visibility along with opacity. We still allow the opacity value to pass through and get tweened.
            if (startNum === 1 && _get(target, "visibility") === "hidden" && endNum) {
              //if visibility is initially set to "hidden", we should interpret that as intent to make opacity 0 (a convenience)
              startNum = 0;
            }

            _addNonTweeningPT(this, style, "visibility", startNum ? "inherit" : "hidden", endNum ? "inherit" : "hidden", !endNum);
          }

          if (p !== "scale" && p !== "transform") {
            p = _propertyAliases[p];
            ~p.indexOf(",") && (p = p.split(",")[0]);
          }
        }

        isTransformRelated = p in _transformProps; //--- TRANSFORM-RELATED ---

        if (isTransformRelated) {
          if (!transformPropTween) {
            cache = target._gsap;
            cache.renderTransform && !vars.parseTransform || _parseTransform(target, vars.parseTransform); // if, for example, gsap.set(... {transform:"translateX(50vw)"}), the _get() call doesn't parse the transform, thus cache.renderTransform won't be set yet so force the parsing of the transform here.

            smooth = vars.smoothOrigin !== false && cache.smooth;
            transformPropTween = this._pt = new _gsapCore.PropTween(this._pt, style, _transformProp, 0, 1, cache.renderTransform, cache, 0, -1); //the first time through, create the rendering PropTween so that it runs LAST (in the linked list, we keep adding to the beginning)

            transformPropTween.dep = 1; //flag it as dependent so that if things get killed/overwritten and this is the only PropTween left, we can safely kill the whole tween.
          }

          if (p === "scale") {
            this._pt = new _gsapCore.PropTween(this._pt, cache, "scaleY", cache.scaleY, (relative ? (0, _gsapCore._parseRelative)(cache.scaleY, relative + endNum) : endNum) - cache.scaleY || 0);
            props.push("scaleY", p);
            p += "X";
          } else if (p === "transformOrigin") {
            endValue = _convertKeywordsToPercentages(endValue); //in case something like "left top" or "bottom right" is passed in. Convert to percentages.

            if (cache.svg) {
              _applySVGOrigin(target, endValue, 0, smooth, 0, this);
            } else {
              endUnit = parseFloat(endValue.split(" ")[2]) || 0; //handle the zOrigin separately!

              endUnit !== cache.zOrigin && _addNonTweeningPT(this, cache, "zOrigin", cache.zOrigin, endUnit);

              _addNonTweeningPT(this, style, p, _firstTwoOnly(startValue), _firstTwoOnly(endValue));
            }

            continue;
          } else if (p === "svgOrigin") {
            _applySVGOrigin(target, endValue, 1, smooth, 0, this);

            continue;
          } else if (p in _rotationalProperties) {
            _addRotationalPropTween(this, cache, p, startNum, relative ? (0, _gsapCore._parseRelative)(startNum, relative + endValue) : endValue);

            continue;
          } else if (p === "smoothOrigin") {
            _addNonTweeningPT(this, cache, "smooth", cache.smooth, endValue);

            continue;
          } else if (p === "force3D") {
            cache[p] = endValue;
            continue;
          } else if (p === "transform") {
            _addRawTransformPTs(this, endValue, target);

            continue;
          }
        } else if (!(p in style)) {
          p = _checkPropPrefix(p) || p;
        }

        if (isTransformRelated || (endNum || endNum === 0) && (startNum || startNum === 0) && !_complexExp.test(endValue) && p in style) {
          startUnit = (startValue + "").substr((startNum + "").length);
          endNum || (endNum = 0); // protect against NaN

          endUnit = (0, _gsapCore.getUnit)(endValue) || (p in _gsapCore._config.units ? _gsapCore._config.units[p] : startUnit);
          startUnit !== endUnit && (startNum = _convertToUnit(target, p, startValue, endUnit));
          this._pt = new _gsapCore.PropTween(this._pt, isTransformRelated ? cache : style, p, startNum, (relative ? (0, _gsapCore._parseRelative)(startNum, relative + endNum) : endNum) - startNum, !isTransformRelated && (endUnit === "px" || p === "zIndex") && vars.autoRound !== false ? _renderRoundedCSSProp : _renderCSSProp);
          this._pt.u = endUnit || 0;

          if (startUnit !== endUnit && endUnit !== "%") {
            //when the tween goes all the way back to the beginning, we need to revert it to the OLD/ORIGINAL value (with those units). We record that as a "b" (beginning) property and point to a render method that handles that. (performance optimization)
            this._pt.b = startValue;
            this._pt.r = _renderCSSPropWithBeginning;
          }
        } else if (!(p in style)) {
          if (p in target) {
            //maybe it's not a style - it could be a property added directly to an element in which case we'll try to animate that.
            this.add(target, p, startValue || target[p], relative ? relative + endValue : endValue, index, targets);
          } else {
            (0, _gsapCore._missingPlugin)(p, endValue);
            continue;
          }
        } else {
          _tweenComplexCSSString.call(this, target, p, startValue, relative ? relative + endValue : endValue);
        }

        props.push(p);
      }
    }

    hasPriority && (0, _gsapCore._sortPropTweensByPriority)(this);
  },
  get: _get,
  aliases: _propertyAliases,
  getSetter: function getSetter(target, property, plugin) {
    //returns a setter function that accepts target, property, value and applies it accordingly. Remember, properties like "x" aren't as simple as target.style.property = value because they've got to be applied to a proxy object and then merged into a transform string in a renderer.
    var p = _propertyAliases[property];
    p && p.indexOf(",") < 0 && (property = p);
    return property in _transformProps && property !== _transformOriginProp && (target._gsap.x || _get(target, "x")) ? plugin && _recentSetterPlugin === plugin ? property === "scale" ? _setterScale : _setterTransform : (_recentSetterPlugin = plugin || {}) && (property === "scale" ? _setterScaleWithRender : _setterTransformWithRender) : target.style && !(0, _gsapCore._isUndefined)(target.style[property]) ? _setterCSSStyle : ~property.indexOf("-") ? _setterCSSProp : (0, _gsapCore._getSetter)(target, property);
  },
  core: {
    _removeProperty: _removeProperty,
    _getMatrix: _getMatrix
  }
};
exports.default = exports.CSSPlugin = CSSPlugin;
_gsapCore.gsap.utils.checkPrefix = _checkPropPrefix;

(function (positionAndScale, rotation, others, aliases) {
  var all = (0, _gsapCore._forEachName)(positionAndScale + "," + rotation + "," + others, function (name) {
    _transformProps[name] = 1;
  });
  (0, _gsapCore._forEachName)(rotation, function (name) {
    _gsapCore._config.units[name] = "deg";
    _rotationalProperties[name] = 1;
  });
  _propertyAliases[all[13]] = positionAndScale + "," + rotation;
  (0, _gsapCore._forEachName)(aliases, function (name) {
    var split = name.split(":");
    _propertyAliases[split[1]] = all[split[0]];
  });
})("x,y,z,scale,scaleX,scaleY,xPercent,yPercent", "rotation,rotationX,rotationY,skewX,skewY", "transform,transformOrigin,svgOrigin,force3D,smoothOrigin,transformPerspective", "0:translateX,1:translateY,2:translateZ,8:rotate,8:rotationZ,8:rotateZ,9:rotateX,10:rotateY");

(0, _gsapCore._forEachName)("x,y,z,top,right,bottom,left,width,height,fontSize,padding,margin,perspective", function (name) {
  _gsapCore._config.units[name] = "px";
});

_gsapCore.gsap.registerPlugin(CSSPlugin);
},{"./gsap-core.js":"node_modules/gsap-trial/gsap-core.js"}],"node_modules/gsap-trial/index.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
Object.defineProperty(exports, "Back", {
  enumerable: true,
  get: function () {
    return _gsapCore.Back;
  }
});
Object.defineProperty(exports, "Bounce", {
  enumerable: true,
  get: function () {
    return _gsapCore.Bounce;
  }
});
Object.defineProperty(exports, "CSSPlugin", {
  enumerable: true,
  get: function () {
    return _CSSPlugin.CSSPlugin;
  }
});
Object.defineProperty(exports, "Circ", {
  enumerable: true,
  get: function () {
    return _gsapCore.Circ;
  }
});
Object.defineProperty(exports, "Cubic", {
  enumerable: true,
  get: function () {
    return _gsapCore.Cubic;
  }
});
Object.defineProperty(exports, "Elastic", {
  enumerable: true,
  get: function () {
    return _gsapCore.Elastic;
  }
});
Object.defineProperty(exports, "Expo", {
  enumerable: true,
  get: function () {
    return _gsapCore.Expo;
  }
});
Object.defineProperty(exports, "Linear", {
  enumerable: true,
  get: function () {
    return _gsapCore.Linear;
  }
});
Object.defineProperty(exports, "Power0", {
  enumerable: true,
  get: function () {
    return _gsapCore.Power0;
  }
});
Object.defineProperty(exports, "Power1", {
  enumerable: true,
  get: function () {
    return _gsapCore.Power1;
  }
});
Object.defineProperty(exports, "Power2", {
  enumerable: true,
  get: function () {
    return _gsapCore.Power2;
  }
});
Object.defineProperty(exports, "Power3", {
  enumerable: true,
  get: function () {
    return _gsapCore.Power3;
  }
});
Object.defineProperty(exports, "Power4", {
  enumerable: true,
  get: function () {
    return _gsapCore.Power4;
  }
});
Object.defineProperty(exports, "Quad", {
  enumerable: true,
  get: function () {
    return _gsapCore.Quad;
  }
});
Object.defineProperty(exports, "Quart", {
  enumerable: true,
  get: function () {
    return _gsapCore.Quart;
  }
});
Object.defineProperty(exports, "Quint", {
  enumerable: true,
  get: function () {
    return _gsapCore.Quint;
  }
});
Object.defineProperty(exports, "Sine", {
  enumerable: true,
  get: function () {
    return _gsapCore.Sine;
  }
});
Object.defineProperty(exports, "SteppedEase", {
  enumerable: true,
  get: function () {
    return _gsapCore.SteppedEase;
  }
});
Object.defineProperty(exports, "Strong", {
  enumerable: true,
  get: function () {
    return _gsapCore.Strong;
  }
});
Object.defineProperty(exports, "TimelineLite", {
  enumerable: true,
  get: function () {
    return _gsapCore.TimelineLite;
  }
});
Object.defineProperty(exports, "TimelineMax", {
  enumerable: true,
  get: function () {
    return _gsapCore.TimelineMax;
  }
});
Object.defineProperty(exports, "TweenLite", {
  enumerable: true,
  get: function () {
    return _gsapCore.TweenLite;
  }
});
exports.gsap = exports.default = exports.TweenMax = void 0;

var _gsapCore = require("./gsap-core.js");

var _CSSPlugin = require("./CSSPlugin.js");

var gsapWithCSS = _gsapCore.gsap.registerPlugin(_CSSPlugin.CSSPlugin) || _gsapCore.gsap,
    // to protect from tree shaking
TweenMaxWithCSS = gsapWithCSS.core.Tween;

exports.TweenMax = TweenMaxWithCSS;
exports.default = exports.gsap = gsapWithCSS;
},{"./gsap-core.js":"node_modules/gsap-trial/gsap-core.js","./CSSPlugin.js":"node_modules/gsap-trial/CSSPlugin.js"}],"node_modules/gsap-trial/ScrollTrigger.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.ScrollTrigger = void 0;

/*!
 * ScrollTrigger 3.10.4
 * https://greensock.com
 * 
 * @license Copyright 2022, GreenSock. All rights reserved.
 * Subject to the terms at https://greensock.com/standard-license or for Club GreenSock members, the agreement issued with that membership.
 * @author: Jack Doyle, jack@greensock.com
 */
let e,
    t,
    r,
    i,
    n,
    s,
    o,
    l,
    a,
    c,
    d,
    p,
    h,
    g = () => e || "undefined" != typeof window && (e = window.gsap) && e.registerPlugin && e,
    u = 1,
    f = [],
    m = [],
    v = [],
    y = Date.now,
    x = (e, t) => t,
    b = (e, t) => ~v.indexOf(e) && v[v.indexOf(e) + 1][t],
    w = e => !!~d.indexOf(e),
    T = (e, t, r, i, n) => e.addEventListener(t, r, {
  passive: !i,
  capture: !!n
}),
    S = (e, t, r, i) => e.removeEventListener(t, r, !!i),
    _ = () => p && p.isPressed || m.cache++,
    k = (e, t) => {
  let r = n => {
    if (n || 0 === n) {
      u && (i.history.scrollRestoration = "manual");
      let t = p && p.isPressed;
      n = r.v = Math.round(n) || (p && p.iOS ? 1 : 0), e(n), r.cacheID = m.cache, t && x("ss", n);
    } else (t || m.cache !== r.cacheID || x("ref")) && (r.cacheID = m.cache, r.v = e());

    return r.v + r.offset;
  };

  return r.offset = 0, e && r;
},
    E = {
  s: "scrollLeft",
  p: "left",
  p2: "Left",
  os: "right",
  os2: "Right",
  d: "width",
  d2: "Width",
  a: "x",
  sc: k(function (e) {
    return arguments.length ? i.scrollTo(e, M.sc()) : i.pageXOffset || n.scrollLeft || s.scrollLeft || o.scrollLeft || 0;
  })
},
    M = {
  s: "scrollTop",
  p: "top",
  p2: "Top",
  os: "bottom",
  os2: "Bottom",
  d: "height",
  d2: "Height",
  a: "y",
  op: E,
  sc: k(function (e) {
    return arguments.length ? i.scrollTo(E.sc(), e) : i.pageYOffset || n.scrollTop || s.scrollTop || o.scrollTop || 0;
  })
},
    C = t => e.utils.toArray(t)[0] || ("string" == typeof t && !1 !== e.config().nullTargetWarn ? console.warn("Element not found:", t) : null),
    P = (e, {
  s: t,
  sc: r
}) => {
  let i = m.indexOf(e),
      n = r === M.sc ? 1 : 2;
  return !~i && (i = m.push(e) - 1), m[i + n] || (m[i + n] = k(b(e, t), !0) || (w(e) ? r : k(function (r) {
    return arguments.length ? e[t] = r : e[t];
  })));
},
    O = (e, t, r) => {
  let i = e,
      n = e,
      s = y(),
      o = s,
      l = t || 50,
      a = Math.max(500, 3 * l),
      c = (e, t) => {
    let a = y();
    t || a - s > l ? (n = i, i = e, o = s, s = a) : r ? i += e : i = n + (e - n) / (a - o) * (s - o);
  };

  return {
    update: c,
    reset: () => {
      n = i = r ? 0 : i, o = s = 0;
    },
    getVelocity: e => {
      let t = o,
          l = n,
          d = y();
      return (e || 0 === e) && e !== i && c(e), s === o || d - o > a ? 0 : (i + (r ? l : -l)) / ((r ? d : s) - t) * 1e3;
    }
  };
},
    A = (e, t) => (t && !e._gsapAllow && e.preventDefault(), e.changedTouches ? e.changedTouches[0] : e),
    D = e => {
  let t = Math.max(...e),
      r = Math.min(...e);
  return Math.abs(t) >= Math.abs(r) ? t : r;
},
    R = () => {
  c = e.core.globals().ScrollTrigger, c && c.core && (() => {
    let e = c.core,
        t = e.bridge || {},
        r = e._scrollers,
        i = e._proxies;
    r.push(...m), i.push(...v), m = r, v = i, x = (e, r) => t[e](r);
  })();
},
    Y = c => (e = c || g(), e && "undefined" != typeof document && document.body && (i = window, n = document, s = n.documentElement, o = n.body, d = [i, n, s, o], r = e.utils.clamp, a = "onpointerenter" in o ? "pointer" : "mouse", l = X.isTouch = i.matchMedia && i.matchMedia("(hover: none), (pointer: coarse)").matches ? 1 : "ontouchstart" in i || navigator.maxTouchPoints > 0 || navigator.msMaxTouchPoints > 0 ? 2 : 0, h = X.eventTypes = ("ontouchstart" in s ? "touchstart,touchmove,touchcancel,touchend" : "onpointerdown" in s ? "pointerdown,pointermove,pointercancel,pointerup" : "mousedown,mousemove,mouseup,mouseup").split(","), setTimeout(() => u = 0, 500), R(), t = 1), t);

E.op = M, m.cache = 0;

class X {
  constructor(e) {
    this.init(e);
  }

  init(r) {
    t || Y(e) || console.warn("Please gsap.registerPlugin(Observer)"), c || R();
    let {
      tolerance: d,
      dragMinimum: g,
      type: u,
      target: m,
      lineHeight: v,
      debounce: x,
      preventDefault: b,
      onStop: k,
      onStopDelay: X,
      ignore: L,
      wheelSpeed: z,
      event: I,
      onDragStart: B,
      onDragEnd: W,
      onDrag: H,
      onPress: N,
      onRelease: F,
      onRight: V,
      onLeft: q,
      onUp: G,
      onDown: U,
      onChangeX: j,
      onChangeY: K,
      onChange: Z,
      onToggleX: $,
      onToggleY: J,
      onHover: Q,
      onHoverEnd: ee,
      onMove: te,
      ignoreCheck: re,
      isNormalizer: ie,
      onGestureStart: ne,
      onGestureEnd: se,
      onWheel: oe,
      onEnable: le,
      onDisable: ae,
      onClick: ce,
      scrollSpeed: de,
      capture: pe,
      allowClicks: he,
      lockAxis: ge,
      onLockAxis: ue
    } = r;
    this.target = m = C(m) || s, this.vars = r, L && (L = e.utils.toArray(L)), d = d || 0, g = g || 0, z = z || 1, de = de || 1, u = u || "wheel,touch,pointer", x = !1 !== x, v || (v = parseFloat(i.getComputedStyle(o).lineHeight) || 22);

    let fe,
        me,
        ve,
        ye,
        xe,
        be,
        we,
        Te = this,
        Se = 0,
        _e = 0,
        ke = P(m, E),
        Ee = P(m, M),
        Me = ke(),
        Ce = Ee(),
        Pe = ~u.indexOf("touch") && !~u.indexOf("pointer") && "pointerdown" === h[0],
        Oe = w(m),
        Ae = m.ownerDocument || n,
        De = [0, 0, 0],
        Re = [0, 0, 0],
        Ye = 0,
        Xe = () => Ye = y(),
        Le = (e, t) => (Te.event = e) && L && ~L.indexOf(e.target) || t && Pe && "touch" !== e.pointerType || re && re(e, t),
        ze = () => {
      let e = Te.deltaX = D(De),
          t = Te.deltaY = D(Re),
          r = Math.abs(e) >= d,
          i = Math.abs(t) >= d;
      Z && (r || i) && Z(Te, e, t, De, Re), r && (V && Te.deltaX > 0 && V(Te), q && Te.deltaX < 0 && q(Te), j && j(Te), $ && Te.deltaX < 0 != Se < 0 && $(Te), Se = Te.deltaX, De[0] = De[1] = De[2] = 0), i && (U && Te.deltaY > 0 && U(Te), G && Te.deltaY < 0 && G(Te), K && K(Te), J && Te.deltaY < 0 != _e < 0 && J(Te), _e = Te.deltaY, Re[0] = Re[1] = Re[2] = 0), (ye || ve) && (te && te(Te), ue && be && ue(Te), ve && (H(Te), ve = !1), ye = be = !1), xe && (oe(Te), xe = !1), fe = 0;
    },
        Ie = (e, t, r) => {
      De[r] += e, Re[r] += t, Te._vx.update(e), Te._vy.update(t), x ? fe || (fe = requestAnimationFrame(ze)) : ze();
    },
        Be = (e, t) => {
      "y" !== we && (De[2] += e, Te._vx.update(e, !0)), "x" !== we && (Re[2] += t, Te._vy.update(t, !0)), ge && !we && (Te.axis = we = Math.abs(e) > Math.abs(t) ? "x" : "y", be = !0), x ? fe || (fe = requestAnimationFrame(ze)) : ze();
    },
        We = e => {
      if (Le(e, 1)) return;
      let t = (e = A(e, b)).clientX,
          r = e.clientY,
          i = t - Te.x,
          n = r - Te.y,
          s = Te.isDragging;
      Te.x = t, Te.y = r, (s || Math.abs(Te.startX - t) >= g || Math.abs(Te.startY - r) >= g) && (H && (ve = !0), s || (Te.isDragging = !0), Be(i, n), s || B && B(Te));
    },
        He = Te.onPress = e => {
      Le(e, 1) || (Te.axis = we = null, me.pause(), Te.isPressed = !0, e = A(e), Se = _e = 0, Te.startX = Te.x = e.clientX, Te.startY = Te.y = e.clientY, Te._vx.reset(), Te._vy.reset(), T(ie ? m : Ae, h[1], We, b, !0), Te.deltaX = Te.deltaY = 0, N && N(Te));
    },
        Ne = t => {
      if (Le(t, 1)) return;
      S(ie ? m : Ae, h[1], We, !0);
      let r = Te.isDragging && (Math.abs(Te.x - Te.startX) > 3 || Math.abs(Te.y - Te.startY) > 3),
          n = A(t);
      r || (Te._vx.reset(), Te._vy.reset(), b && he && e.delayedCall(.08, () => {
        if (y() - Ye > 300 && !t.defaultPrevented) if (t.target.click) t.target.click();else if (Ae.createEvent) {
          let e = Ae.createEvent("MouseEvents");
          e.initMouseEvent("click", !0, !0, i, 1, n.screenX, n.screenY, n.clientX, n.clientY, !1, !1, !1, !1, 0, null), t.target.dispatchEvent(e);
        }
      })), Te.isDragging = Te.isGesturing = Te.isPressed = !1, k && !ie && me.restart(!0), W && r && W(Te), F && F(Te, r);
    },
        Fe = e => e.touches && e.touches.length > 1 && (Te.isGesturing = !0) && ne(e, Te.isDragging),
        Ve = () => (Te.isGesturing = !1) || se(Te),
        qe = e => {
      if (Le(e)) return;
      let t = ke(),
          r = Ee();
      Ie((t - Me) * de, (r - Ce) * de, 1), Me = t, Ce = r, k && me.restart(!0);
    },
        Ge = e => {
      if (Le(e)) return;
      e = A(e, b), oe && (xe = !0);
      let t = (1 === e.deltaMode ? v : 2 === e.deltaMode ? i.innerHeight : 1) * z;
      Ie(e.deltaX * t, e.deltaY * t, 0), k && !ie && me.restart(!0);
    },
        Ue = e => {
      if (Le(e)) return;
      let t = e.clientX,
          r = e.clientY,
          i = t - Te.x,
          n = r - Te.y;
      Te.x = t, Te.y = r, ye = !0, (i || n) && Be(i, n);
    },
        je = e => {
      Te.event = e, Q(Te);
    },
        Ke = e => {
      Te.event = e, ee(Te);
    },
        Ze = e => Le(e) || A(e, b) && ce(Te);

    me = Te._dc = e.delayedCall(X || .25, () => {
      Te._vx.reset(), Te._vy.reset(), me.pause(), k && k(Te);
    }).pause(), Te.deltaX = Te.deltaY = 0, Te._vx = O(0, 50, !0), Te._vy = O(0, 50, !0), Te.scrollX = ke, Te.scrollY = Ee, Te.isDragging = Te.isGesturing = Te.isPressed = !1, Te.enable = e => (Te.isEnabled || (T(Oe ? Ae : m, "scroll", _), u.indexOf("scroll") >= 0 && T(Oe ? Ae : m, "scroll", qe, b, pe), u.indexOf("wheel") >= 0 && T(m, "wheel", Ge, b, pe), (u.indexOf("touch") >= 0 && l || u.indexOf("pointer") >= 0) && (T(m, h[0], He, b, pe), T(Ae, h[2], Ne), T(Ae, h[3], Ne), he && T(m, "click", Xe, !1, !0), ce && T(m, "click", Ze), ne && T(Ae, "gesturestart", Fe), se && T(Ae, "gestureend", Ve), Q && T(m, a + "enter", je), ee && T(m, a + "leave", Ke), te && T(m, a + "move", Ue)), Te.isEnabled = !0, e && e.type && He(e), le && le(Te)), Te), Te.disable = () => {
      Te.isEnabled && (f.filter(e => e !== Te && w(e.target)).length || S(Oe ? Ae : m, "scroll", _), Te.isPressed && (Te._vx.reset(), Te._vy.reset(), S(ie ? m : Ae, h[1], We, !0)), S(Oe ? Ae : m, "scroll", qe, pe), S(m, "wheel", Ge, pe), S(m, h[0], He, pe), S(Ae, h[2], Ne), S(Ae, h[3], Ne), S(m, "click", Xe, !0), S(m, "click", Ze), S(Ae, "gesturestart", Fe), S(Ae, "gestureend", Ve), S(m, a + "enter", je), S(m, a + "leave", Ke), S(m, a + "move", Ue), Te.isEnabled = Te.isPressed = Te.isDragging = !1, ae && ae(Te));
    }, Te.kill = () => {
      Te.disable();
      let e = f.indexOf(Te);
      e >= 0 && f.splice(e, 1), p === Te && (p = 0);
    }, f.push(Te), ie && w(m) && (p = Te), Te.enable(I);
  }

  get velocityX() {
    return this._vx.getVelocity();
  }

  get velocityY() {
    return this._vy.getVelocity();
  }

}

X.version = "3.10.4", X.create = e => new X(e), X.register = Y, X.getAll = () => f.slice(), X.getById = e => f.filter(t => t.vars.id === e)[0], g() && e.registerPlugin(X);

let L,
    z,
    I,
    B,
    W,
    H,
    N,
    F,
    V,
    q,
    G,
    U,
    j,
    K,
    Z,
    $,
    J,
    Q,
    ee,
    te,
    re,
    ie,
    ne,
    se,
    oe,
    le,
    ae,
    ce,
    de,
    pe,
    he,
    ge,
    ue,
    fe = 1,
    me = Date.now,
    ve = me(),
    ye = 0,
    xe = 0,
    be = () => K = 1,
    we = () => K = 0,
    Te = e => e,
    Se = e => Math.round(1e5 * e) / 1e5 || 0,
    _e = () => "undefined" != typeof window,
    ke = () => L || _e() && (L = window.gsap) && L.registerPlugin && L,
    Ee = e => !!~N.indexOf(e),
    Me = e => b(e, "getBoundingClientRect") || (Ee(e) ? () => (Ot.width = I.innerWidth, Ot.height = I.innerHeight, Ot) : () => Fe(e)),
    Ce = (e, {
  s: t,
  d2: r,
  d: i,
  a: n
}) => (t = "scroll" + r) && (n = b(e, t)) ? n() - Me(e)()[i] : Ee(e) ? (W[t] || H[t]) - (I["inner" + r] || W["client" + r] || H["client" + r]) : e[t] - e["offset" + r],
    Pe = (e, t) => {
  for (let r = 0; r < ee.length; r += 3) (!t || ~t.indexOf(ee[r + 1])) && e(ee[r], ee[r + 1], ee[r + 2]);
},
    Oe = e => "string" == typeof e,
    Ae = e => "function" == typeof e,
    De = e => "number" == typeof e,
    Re = e => "object" == typeof e,
    Ye = e => Ae(e) && e(),
    Xe = (e, t) => () => {
  let r = Ye(e),
      i = Ye(t);
  return () => {
    Ye(r), Ye(i);
  };
},
    Le = (e, t, r) => e && e.progress(t ? 0 : 1) && r && e.pause(),
    ze = (e, t) => {
  if (e.enabled) {
    let r = t(e);
    r && r.totalTime && (e.callbackAnimation = r);
  }
},
    Ie = Math.abs,
    Be = "padding",
    We = "px",
    He = e => I.getComputedStyle(e),
    Ne = (e, t) => {
  for (let r in t) r in e || (e[r] = t[r]);

  return e;
},
    Fe = (e, t) => {
  let r = t && "matrix(1, 0, 0, 1, 0, 0)" !== He(e)[Z] && L.to(e, {
    x: 0,
    y: 0,
    xPercent: 0,
    yPercent: 0,
    rotation: 0,
    rotationX: 0,
    rotationY: 0,
    scale: 1,
    skewX: 0,
    skewY: 0
  }).progress(1),
      i = e.getBoundingClientRect();
  return r && r.progress(0).kill(), i;
},
    Ve = (e, {
  d2: t
}) => e["offset" + t] || e["client" + t] || 0,
    qe = e => {
  let t,
      r = [],
      i = e.labels,
      n = e.duration();

  for (t in i) r.push(i[t] / n);

  return r;
},
    Ge = e => {
  let t = L.utils.snap(e),
      r = Array.isArray(e) && e.slice(0).sort((e, t) => e - t);
  return r ? (e, i, n = .001) => {
    let s;
    if (!i) return t(e);

    if (i > 0) {
      for (e -= n, s = 0; s < r.length; s++) if (r[s] >= e) return r[s];

      return r[s - 1];
    }

    for (s = r.length, e += n; s--;) if (r[s] <= e) return r[s];

    return r[0];
  } : (r, i, n = .001) => {
    let s = t(r);
    return !i || Math.abs(s - r) < n || s - r < 0 == i < 0 ? s : t(i < 0 ? r - e : r + e);
  };
},
    Ue = (e, t, r, i) => r.split(",").forEach(r => e(t, r, i)),
    je = (e, t, r, i, n) => e.addEventListener(t, r, {
  passive: !i,
  capture: !!n
}),
    Ke = (e, t, r, i) => e.removeEventListener(t, r, !!i),
    Ze = (e, t, r) => r && r.wheelHandler && e(t, "wheel", r),
    $e = {
  startColor: "green",
  endColor: "red",
  indent: 0,
  fontSize: "16px",
  fontWeight: "normal"
},
    Je = {
  toggleActions: "play",
  anticipatePin: 0
},
    Qe = {
  top: 0,
  left: 0,
  center: .5,
  bottom: 1,
  right: 1
},
    et = (e, t) => {
  if (Oe(e)) {
    let r = e.indexOf("="),
        i = ~r ? +(e.charAt(r - 1) + 1) * parseFloat(e.substr(r + 1)) : 0;
    ~r && (e.indexOf("%") > r && (i *= t / 100), e = e.substr(0, r - 1)), e = i + (e in Qe ? Qe[e] * t : ~e.indexOf("%") ? parseFloat(e) * t / 100 : parseFloat(e) || 0);
  }

  return e;
},
    tt = (e, t, r, i, {
  startColor: n,
  endColor: s,
  fontSize: o,
  indent: l,
  fontWeight: a
}, c, d, p) => {
  let h = B.createElement("div"),
      g = Ee(r) || "fixed" === b(r, "pinType"),
      u = -1 !== e.indexOf("scroller"),
      f = g ? H : r,
      m = -1 !== e.indexOf("start"),
      v = m ? n : s,
      y = "border-color:" + v + ";font-size:" + o + ";color:" + v + ";font-weight:" + a + ";pointer-events:none;white-space:nowrap;font-family:sans-serif,Arial;z-index:1000;padding:4px 8px;border-width:0;border-style:solid;";
  return y += "position:" + ((u || p) && g ? "fixed;" : "absolute;"), (u || p || !g) && (y += (i === M ? "right" : "bottom") + ":" + (c + parseFloat(l)) + "px;"), d && (y += "box-sizing:border-box;text-align:left;width:" + d.offsetWidth + "px;"), h._isStart = m, h.setAttribute("class", "gsap-marker-" + e + (t ? " marker-" + t : "")), h.style.cssText = y, h.innerText = t || 0 === t ? e + "-" + t : e, f.children[0] ? f.insertBefore(h, f.children[0]) : f.appendChild(h), h._offset = h["offset" + i.op.d2], rt(h, 0, i, m), h;
},
    rt = (e, t, r, i) => {
  let n = {
    display: "block"
  },
      s = r[i ? "os2" : "p2"],
      o = r[i ? "p2" : "os2"];
  e._isFlipped = i, n[r.a + "Percent"] = i ? -100 : 0, n[r.a] = i ? "1px" : 0, n["border" + s + "Width"] = 1, n["border" + o + "Width"] = 0, n[r.p] = t + "px", L.set(e, n);
},
    it = [],
    nt = {},
    st = () => me() - ye > 34 && St(),
    ot = () => {
  (!ne || !ne.isPressed || ne.startX > H.clientWidth) && (m.cache++, de || (de = requestAnimationFrame(St)), ye || ut("scrollStart"), ye = me());
},
    lt = () => {
  le = I.innerWidth, oe = I.innerHeight;
},
    at = () => {
  m.cache++, !j && !ie && !B.fullscreenElement && !B.webkitFullscreenElement && (!se || le !== I.innerWidth || Math.abs(I.innerHeight - oe) > .25 * I.innerHeight) && F.restart(!0);
},
    ct = {},
    dt = [],
    pt = [],
    ht = e => {
  let t,
      r = L.ticker.frame,
      i = [],
      n = 0;

  if (he !== r || fe) {
    for (vt(); n < pt.length; n += 4) t = I.matchMedia(pt[n]).matches, t !== pt[n + 3] && (pt[n + 3] = t, t ? i.push(n) : vt(1, pt[n]) || Ae(pt[n + 2]) && pt[n + 2]());

    for (mt(), n = 0; n < i.length; n++) t = i[n], pe = pt[t], pt[t + 2] = pt[t + 1](e);

    pe = 0, z && bt(0, 1), he = r, ut("matchMedia");
  }
},
    gt = () => Ke(Xt, "scrollEnd", gt) || bt(!0),
    ut = e => ct[e] && ct[e].map(e => e()) || dt,
    ft = [],
    mt = e => {
  for (let t = 0; t < ft.length; t += 5) e && ft[t + 4] !== e || (ft[t].style.cssText = ft[t + 1], ft[t].getBBox && ft[t].setAttribute("transform", ft[t + 2] || ""), ft[t + 3].uncache = 1);
},
    vt = (e, t) => {
  let r;

  for ($ = 0; $ < it.length; $++) r = it[$], t && r.media !== t || (e ? r.kill(1) : r.revert());

  t && mt(t), t || ut("revert");
},
    yt = () => m.cache++ && m.forEach(e => "function" == typeof e && (e.rec = 0)),
    xt = 0,
    bt = (e, t) => {
  if (ye && !e) return void je(Xt, "scrollEnd", gt);
  ge = !0;
  let r = ut("refreshInit");
  te && Xt.sort(), t || vt(), it.slice(0).forEach(e => e.refresh()), it.forEach(e => "max" === e.vars.end && e.setPositions(e.start, Ce(e.scroller, e._dir))), r.forEach(e => e && e.render && e.render(-1)), yt(), F.pause(), xt++, ge = !1, ut("refresh");
},
    wt = 0,
    Tt = 1,
    St = () => {
  if (!ge) {
    Xt.isUpdating = !0, ue && ue.update(0);
    let e = it.length,
        t = me(),
        r = t - ve >= 50,
        i = e && it[0].scroll();

    if (Tt = wt > i ? -1 : 1, wt = i, r && (ye && !K && t - ye > 200 && (ye = 0, ut("scrollEnd")), G = ve, ve = t), Tt < 0) {
      for ($ = e; $-- > 0;) it[$] && it[$].update(0, r);

      Tt = 1;
    } else for ($ = 0; $ < e; $++) it[$] && it[$].update(0, r);

    Xt.isUpdating = !1;
  }

  de = 0;
},
    _t = ["left", "top", "bottom", "right", "marginBottom", "marginRight", "marginTop", "marginLeft", "display", "flexShrink", "float", "zIndex", "gridColumnStart", "gridColumnEnd", "gridRowStart", "gridRowEnd", "gridArea", "justifySelf", "alignSelf", "placeSelf", "order"],
    kt = _t.concat(["width", "height", "boxSizing", "maxWidth", "maxHeight", "position", "margin", Be, "paddingTop", "paddingRight", "paddingBottom", "paddingLeft"]),
    Et = (e, t, r, i) => {
  if (e.parentNode !== t) {
    let n,
        s = _t.length,
        o = t.style,
        l = e.style;

    for (; s--;) n = _t[s], o[n] = r[n];

    o.position = "absolute" === r.position ? "absolute" : "relative", "inline" === r.display && (o.display = "inline-block"), l.bottom = l.right = o.flexBasis = "auto", o.overflow = "visible", o.boxSizing = "border-box", o.width = Ve(e, E) + We, o.height = Ve(e, M) + We, o.padding = l.margin = l.top = l.left = "0", Ct(i), l.width = l.maxWidth = r.width, l.height = l.maxHeight = r.height, l.padding = r.padding, e.parentNode.insertBefore(t, e), t.appendChild(e);
  }
},
    Mt = /([A-Z])/g,
    Ct = e => {
  if (e) {
    let t,
        r,
        i = e.t.style,
        n = e.length,
        s = 0;

    for ((e.t._gsap || L.core.getCache(e.t)).uncache = 1; s < n; s += 2) r = e[s + 1], t = e[s], r ? i[t] = r : i[t] && i.removeProperty(t.replace(Mt, "-$1").toLowerCase());
  }
},
    Pt = e => {
  let t = kt.length,
      r = e.style,
      i = [],
      n = 0;

  for (; n < t; n++) i.push(kt[n], r[kt[n]]);

  return i.t = e, i;
},
    Ot = {
  left: 0,
  top: 0
},
    At = (e, t, r, i, n, s, o, l, a, c, d, p, h) => {
  Ae(e) && (e = e(l)), Oe(e) && "max" === e.substr(0, 3) && (e = p + ("=" === e.charAt(4) ? et("0" + e.substr(3), r) : 0));
  let g,
      u,
      f,
      m = h ? h.time() : 0;
  if (h && h.seek(0), De(e)) o && rt(o, r, i, !0);else {
    Ae(t) && (t = t(l));
    let s,
        d,
        p,
        h,
        g = e.split(" ");
    f = C(t) || H, s = Fe(f) || {}, s && (s.left || s.top) || "none" !== He(f).display || (h = f.style.display, f.style.display = "block", s = Fe(f), h ? f.style.display = h : f.style.removeProperty("display")), d = et(g[0], s[i.d]), p = et(g[1] || "0", r), e = s[i.p] - a[i.p] - c + d + n - p, o && rt(o, p, i, r - p < 20 || o._isStart && p > 20), r -= r - p;
  }

  if (s) {
    let t = e + r,
        n = s._isStart;
    g = "scroll" + i.d2, rt(s, t, i, n && t > 20 || !n && (d ? Math.max(H[g], W[g]) : s.parentNode[g]) <= t + 1), d && (a = Fe(o), d && (s.style[i.op.p] = a[i.op.p] - i.op.m - s._offset + We));
  }

  return h && f && (g = Fe(f), h.seek(p), u = Fe(f), h._caScrollDist = g[i.p] - u[i.p], e = e / h._caScrollDist * p), h && h.seek(m), h ? e : Math.round(e);
},
    Dt = /(webkit|moz|length|cssText|inset)/i,
    Rt = (e, t, r, i) => {
  if (e.parentNode !== t) {
    let n,
        s,
        o = e.style;

    if (t === H) {
      for (n in e._stOrig = o.cssText, s = He(e), s) +n || Dt.test(n) || !s[n] || "string" != typeof o[n] || "0" === n || (o[n] = s[n]);

      o.top = r, o.left = i;
    } else o.cssText = e._stOrig;

    L.core.getCache(e).uncache = 1, t.appendChild(e);
  }
},
    Yt = (e, t) => {
  let r,
      i,
      n = P(e, t),
      s = "_scroll" + t.p2,
      o = (t, l, a, c, d) => {
    let p = o.tween,
        h = l.onComplete,
        g = {};
    return a = a || n(), d = c && d || 0, c = c || t - a, p && p.kill(), r = Math.round(a), l[s] = t, l.modifiers = g, g[s] = e => ((e = Se(n())) !== r && e !== i && Math.abs(e - r) > 2 && Math.abs(e - i) > 2 ? (p.kill(), o.tween = 0) : e = a + c * p.ratio + d * p.ratio * p.ratio, i = r, r = Se(e)), l.onComplete = () => {
      o.tween = 0, h && h.call(p);
    }, p = o.tween = L.to(e, l), p;
  };

  return e[s] = n, n.wheelHandler = () => o.tween && o.tween.kill() && (o.tween = 0), je(e, "wheel", n.wheelHandler), o;
};

class Xt {
  constructor(e, t) {
    z || Xt.register(L) || console.warn("Please gsap.registerPlugin(ScrollTrigger)"), this.init(e, t);
  }

  init(e, t) {
    if (this.progress = this.start = 0, this.vars && this.kill(!0, !0), !xe) return void (this.update = this.refresh = this.kill = Te);
    e = Ne(Oe(e) || De(e) || e.nodeType ? {
      trigger: e
    } : e, Je);

    let r,
        i,
        n,
        s,
        o,
        l,
        a,
        c,
        d,
        p,
        h,
        g,
        u,
        f,
        m,
        y,
        x,
        w,
        T,
        S,
        _,
        k,
        O,
        A,
        D,
        R,
        Y,
        X,
        z,
        N,
        F,
        U,
        Z,
        J,
        Q,
        ee,
        ie,
        ne,
        {
      onUpdate: se,
      toggleClass: oe,
      id: le,
      onToggle: ae,
      onRefresh: de,
      scrub: he,
      trigger: ve,
      pin: be,
      pinSpacing: we,
      invalidateOnRefresh: _e,
      anticipatePin: ke,
      onScrubComplete: Pe,
      onSnapComplete: Ye,
      once: Xe,
      snap: Ue,
      pinReparent: Ze,
      pinSpacer: Qe,
      containerAnimation: rt,
      fastScrollEnd: st,
      preventOverlaps: lt
    } = e,
        ct = e.horizontal || e.containerAnimation && !1 !== e.horizontal ? E : M,
        dt = !he && 0 !== he,
        pt = C(e.scroller || I),
        ht = L.core.getCache(pt),
        ut = Ee(pt),
        ft = "fixed" === ("pinType" in e ? e.pinType : b(pt, "pinType") || ut && "fixed"),
        mt = [e.onEnter, e.onLeave, e.onEnterBack, e.onLeaveBack],
        vt = dt && e.toggleActions.split(" "),
        yt = "markers" in e ? e.markers : Je.markers,
        xt = ut ? 0 : parseFloat(He(pt)["border" + ct.p2 + "Width"]) || 0,
        bt = this,
        wt = e.onRefreshInit && (() => e.onRefreshInit(bt)),
        St = ((e, t, {
      d: r,
      d2: i,
      a: n
    }) => (n = b(e, "getBoundingClientRect")) ? () => n()[r] : () => (t ? I["inner" + i] : e["client" + i]) || 0)(pt, ut, ct),
        _t = ((e, t) => !t || ~v.indexOf(e) ? Me(e) : () => Ot)(pt, ut),
        kt = 0,
        Mt = 0,
        Dt = P(pt, ct);

    var Lt;

    if (bt.media = pe, bt._dir = ct, ke *= 45, bt.scroller = pt, bt.scroll = rt ? rt.time.bind(rt) : Dt, s = Dt(), bt.vars = e, t = t || e.animation, "refreshPriority" in e && (te = 1, -9999 === e.refreshPriority && (ue = bt)), ht.tweenScroll = ht.tweenScroll || {
      top: Yt(pt, M),
      left: Yt(pt, E)
    }, bt.tweenTo = r = ht.tweenScroll[ct.p], bt.scrubDuration = e => {
      F = De(e) && e, F ? N ? N.duration(e) : N = L.to(t, {
        ease: "expo",
        totalProgress: "+=0.001",
        duration: F,
        paused: !0,
        onComplete: () => Pe && Pe(bt)
      }) : (N && N.progress(1).kill(), N = 0);
    }, t && (t.vars.lazy = !1, t._initted || !1 !== t.vars.immediateRender && !1 !== e.immediateRender && t.render(0, !0, !0), bt.animation = t.pause(), t.scrollTrigger = bt, bt.scrubDuration(he), X = 0, le || (le = t.vars.id)), it.push(bt), Ue && (Re(Ue) && !Ue.push || (Ue = {
      snapTo: Ue
    }), "scrollBehavior" in H.style && L.set(ut ? [H, W] : pt, {
      scrollBehavior: "auto"
    }), n = Ae(Ue.snapTo) ? Ue.snapTo : "labels" === Ue.snapTo ? (e => t => L.utils.snap(qe(e), t))(t) : "labelsDirectional" === Ue.snapTo ? (Lt = t, (e, t) => Ge(qe(Lt))(e, t.direction)) : !1 !== Ue.directional ? (e, t) => Ge(Ue.snapTo)(e, me() - Mt < 500 ? 0 : t.direction) : L.utils.snap(Ue.snapTo), U = Ue.duration || {
      min: .1,
      max: 2
    }, U = Re(U) ? q(U.min, U.max) : q(U, U), Z = L.delayedCall(Ue.delay || F / 2 || .1, () => {
      let e = Dt(),
          i = me() - Mt < 500,
          s = r.tween;
      if (!(i || Math.abs(bt.getVelocity()) < 10) || s || K || kt === e) bt.isActive && kt !== e && Z.restart(!0);else {
        let o = (e - l) / u,
            c = t && !dt ? t.totalProgress() : o,
            d = i ? 0 : (c - z) / (me() - G) * 1e3 || 0,
            p = L.utils.clamp(-o, 1 - o, Ie(d / 2) * d / .185),
            h = o + (!1 === Ue.inertia ? 0 : p),
            g = q(0, 1, n(h, bt)),
            f = Math.round(l + g * u),
            {
          onStart: m,
          onInterrupt: v,
          onComplete: y
        } = Ue;

        if (e <= a && e >= l && f !== e) {
          if (s && !s._initted && s.data <= Ie(f - e)) return;
          !1 === Ue.inertia && (p = g - o), r(f, {
            duration: U(Ie(.185 * Math.max(Ie(h - c), Ie(g - c)) / d / .05 || 0)),
            ease: Ue.ease || "power3",
            data: Ie(f - e),
            onInterrupt: () => Z.restart(!0) && v && v(bt),
            onComplete: () => {
              bt.update(), kt = Dt(), X = z = t && !dt ? t.totalProgress() : bt.progress, Ye && Ye(bt), y && y(bt);
            }
          }, e, p * u, f - e - p * u), m && m(bt, r.tween);
        }
      }
    }).pause()), le && (nt[le] = bt), ve = bt.trigger = C(ve || be), ne = ve && ve._gsap && ve._gsap.stRevert, ne && (ne = ne(bt)), be = !0 === be ? ve : C(be), Oe(oe) && (oe = {
      targets: ve,
      className: oe
    }), be && (!1 === we || "margin" === we || (we = !(!we && "flex" === He(be.parentNode).display) && Be), bt.pin = be, !1 !== e.force3D && L.set(be, {
      force3D: !0
    }), i = L.core.getCache(be), i.spacer ? f = i.pinState : (Qe && (Qe = C(Qe), Qe && !Qe.nodeType && (Qe = Qe.current || Qe.nativeElement), i.spacerIsNative = !!Qe, Qe && (i.spacerState = Pt(Qe))), i.spacer = x = Qe || B.createElement("div"), x.classList.add("pin-spacer"), le && x.classList.add("pin-spacer-" + le), i.pinState = f = Pt(be)), bt.spacer = x = i.spacer, Y = He(be), O = Y[we + ct.os2], T = L.getProperty(be), S = L.quickSetter(be, ct.a, We), Et(be, x, Y), y = Pt(be)), yt) {
      g = Re(yt) ? Ne(yt, $e) : $e, p = tt("scroller-start", le, pt, ct, g, 0), h = tt("scroller-end", le, pt, ct, g, 0, p), w = p["offset" + ct.op.d2];
      let e = C(b(pt, "content") || pt);
      c = this.markerStart = tt("start", le, e, ct, g, w, 0, rt), d = this.markerEnd = tt("end", le, e, ct, g, w, 0, rt), rt && (ie = L.quickSetter([c, d], ct.a, We)), ft || v.length && !0 === b(pt, "fixedMarkers") || ((e => {
        let t = He(e).position;
        e.style.position = "absolute" === t || "fixed" === t ? t : "relative";
      })(ut ? H : pt), L.set([p, h], {
        force3D: !0
      }), D = L.quickSetter(p, ct.a, We), R = L.quickSetter(h, ct.a, We));
    }

    if (rt) {
      let e = rt.vars.onUpdate,
          t = rt.vars.onUpdateParams;
      rt.eventCallback("onUpdate", () => {
        bt.update(0, 0, 1), e && e.apply(t || []);
      });
    }

    bt.previous = () => it[it.indexOf(bt) - 1], bt.next = () => it[it.indexOf(bt) + 1], bt.revert = e => {
      let r = !1 !== e || !bt.enabled,
          i = j;
      r !== bt.isReverted && (r && (bt.scroll.rec || !j || !ge || (bt.scroll.rec = Dt()), Q = Math.max(Dt(), bt.scroll.rec || 0), J = bt.progress, ee = t && t.progress()), c && [c, d, p, h].forEach(e => e.style.display = r ? "none" : "block"), r && (j = 1), bt.update(r), j = i, be && (r ? ((e, t, r) => {
        Ct(r);
        let i = e._gsap;
        if (i.spacerIsNative) Ct(i.spacerState);else if (e.parentNode === t) {
          let r = t.parentNode;
          r && (r.insertBefore(e, t), r.removeChild(t));
        }
      })(be, x, f) : (!Ze || !bt.isActive) && Et(be, x, He(be), A)), bt.isReverted = r);
    }, bt.refresh = (i, n) => {
      if ((j || !bt.enabled) && !n) return;
      if (be && i && ye) return void je(Xt, "scrollEnd", gt);
      !ge && wt && wt(bt), j = 1, Mt = me(), r.tween && (r.tween.kill(), r.tween = 0), N && N.pause(), _e && t && t.time(-.01, !0).invalidate(), bt.isReverted || bt.revert();

      let g,
          v,
          b,
          w,
          S,
          O,
          D,
          R,
          Y,
          X,
          z = St(),
          I = _t(),
          B = rt ? rt.duration() : Ce(pt, ct),
          W = 0,
          F = 0,
          V = e.end,
          q = e.endTrigger || ve,
          G = e.start || (0 !== e.start && ve ? be ? "0 0" : "0 100%" : 0),
          U = bt.pinnedContainer = e.pinnedContainer && C(e.pinnedContainer),
          K = ve && Math.max(0, it.indexOf(bt)) || 0,
          $ = K;

      for (; $--;) O = it[$], O.end || O.refresh(0, 1) || (j = 1), D = O.pin, !D || D !== ve && D !== be || O.isReverted || (X || (X = []), X.unshift(O), O.revert()), O !== it[$] && (K--, $--);

      for (Ae(G) && (G = G(bt)), l = At(G, ve, z, ct, Dt(), c, p, bt, I, xt, ft, B, rt) || (be ? -.001 : 0), Ae(V) && (V = V(bt)), Oe(V) && !V.indexOf("+=") && (~V.indexOf(" ") ? V = (Oe(G) ? G.split(" ")[0] : "") + V : (W = et(V.substr(2), z), V = Oe(G) ? G : l + W, q = ve)), a = Math.max(l, At(V || (q ? "100% 0" : B), q, z, ct, Dt() + W, d, h, bt, I, xt, ft, B, rt)) || -.001, u = a - l || (l -= .01) && .001, W = 0, $ = K; $--;) O = it[$], D = O.pin, D && O.start - O._pinPush < l && !rt && O.end > 0 && (g = O.end - O.start, D !== ve && D !== U || De(G) || (W += g * (1 - O.progress)), D === be && (F += g));

      if (l += W, a += W, bt._pinPush = F, c && W && (g = {}, g[ct.a] = "+=" + W, U && (g[ct.p] = "-=" + Dt()), L.set([c, d], g)), be) g = He(be), w = ct === M, b = Dt(), _ = parseFloat(T(ct.a)) + F, !B && a > 1 && ((ut ? H : pt).style["overflow-" + ct.a] = "scroll"), Et(be, x, g), y = Pt(be), v = Fe(be, !0), R = ft && P(pt, w ? E : M)(), we && (A = [we + ct.os2, u + F + We], A.t = x, $ = we === Be ? Ve(be, ct) + u + F : 0, $ && A.push(ct.d, $ + We), Ct(A), ft && Dt(Q)), ft && (S = {
        top: v.top + (w ? b - l : R) + We,
        left: v.left + (w ? R : b - l) + We,
        boxSizing: "border-box",
        position: "fixed"
      }, S.width = S.maxWidth = Math.ceil(v.width) + We, S.height = S.maxHeight = Math.ceil(v.height) + We, S.margin = S.marginTop = S.marginRight = S.marginBottom = S.marginLeft = "0", S.padding = g.padding, S.paddingTop = g.paddingTop, S.paddingRight = g.paddingRight, S.paddingBottom = g.paddingBottom, S.paddingLeft = g.paddingLeft, m = ((e, t, r) => {
        let i,
            n = [],
            s = e.length,
            o = r ? 8 : 0;

        for (; o < s; o += 2) i = e[o], n.push(i, i in t ? t[i] : e[o + 1]);

        return n.t = e.t, n;
      })(f, S, Ze)), t ? (Y = t._initted, re(1), t.render(t.duration(), !0, !0), k = T(ct.a) - _ + u + F, u !== k && ft && m.splice(m.length - 2, 2), t.render(0, !0, !0), Y || t.invalidate(), re(0)) : k = u;else if (ve && Dt() && !rt) for (v = ve.parentNode; v && v !== H;) v._pinOffset && (l -= v._pinOffset, a -= v._pinOffset), v = v.parentNode;
      X && X.forEach(e => e.revert(!1)), bt.start = l, bt.end = a, s = o = Dt(), rt || (s < Q && Dt(Q), bt.scroll.rec = 0), bt.revert(!1), Z && (kt = -1, bt.isActive && Dt(l + u * J), Z.restart(!0)), j = 0, t && dt && (t._initted || ee) && t.progress() !== ee && t.progress(ee, !0).render(t.time(), !0, !0), (J !== bt.progress || rt) && (t && !dt && t.totalProgress(J, !0), bt.progress = J, bt.update(0, 0, 1)), be && we && (x._pinOffset = Math.round(bt.progress * k)), de && de(bt);
    }, bt.getVelocity = () => (Dt() - o) / (me() - G) * 1e3 || 0, bt.endAnimation = () => {
      Le(bt.callbackAnimation), t && (N ? N.progress(1) : t.paused() ? dt || Le(t, bt.direction < 0, 1) : Le(t, t.reversed()));
    }, bt.labelToScroll = e => t && t.labels && (l || bt.refresh() || l) + t.labels[e] / t.duration() * u || 0, bt.getTrailing = e => {
      let t = it.indexOf(bt),
          r = bt.direction > 0 ? it.slice(0, t).reverse() : it.slice(t + 1);
      return (Oe(e) ? r.filter(t => t.vars.preventOverlaps === e) : r).filter(e => bt.direction > 0 ? e.end <= l : e.start >= a);
    }, bt.update = (e, i, n) => {
      if (rt && !n && !e) return;
      let c,
          d,
          h,
          g,
          f,
          v,
          b,
          w,
          T = bt.scroll(),
          E = e ? 0 : (T - l) / u,
          C = E < 0 ? 0 : E > 1 ? 1 : E || 0,
          P = bt.progress;

      if (i && (o = s, s = rt ? Dt() : T, Ue && (z = X, X = t && !dt ? t.totalProgress() : C)), ke && !C && be && !j && !fe && ye && l < T + (T - o) / (me() - G) * ke && (C = 1e-4), C !== P && bt.enabled) {
        if (c = bt.isActive = !!C && C < 1, d = !!P && P < 1, v = c !== d, f = v || !!C != !!P, bt.direction = C > P ? 1 : -1, bt.progress = C, f && !j && (h = C && !P ? 0 : 1 === C ? 1 : 1 === P ? 2 : 3, dt && (g = !v && "none" !== vt[h + 1] && vt[h + 1] || vt[h], w = t && ("complete" === g || "reset" === g || g in t))), lt && (v || w) && (w || he || !t) && (Ae(lt) ? lt(bt) : bt.getTrailing(lt).forEach(e => e.endAnimation())), dt || (!N || j || fe ? t && t.totalProgress(C, !!j) : ((rt || ue && ue !== bt) && N.render(N._dp._time - N._start), N.resetTo ? N.resetTo("totalProgress", C, t._tTime / t._tDur) : (N.vars.totalProgress = C, N.invalidate().restart()))), be) if (e && we && (x.style[we + ct.os2] = O), ft) {
          if (f) {
            if (b = !e && C > P && a + 1 > T && T + 1 >= Ce(pt, ct), Ze) if (e || !c && !b) Rt(be, x);else {
              let e = Fe(be, !0),
                  t = T - l;
              Rt(be, H, e.top + (ct === M ? t : 0) + We, e.left + (ct === M ? 0 : t) + We);
            }
            Ct(c || b ? m : y), k !== u && C < 1 && c || S(_ + (1 !== C || b ? 0 : k));
          }
        } else S(Se(_ + k * C));
        Ue && !r.tween && !j && !fe && Z.restart(!0), oe && (v || Xe && C && (C < 1 || !ce)) && V(oe.targets).forEach(e => e.classList[c || Xe ? "add" : "remove"](oe.className)), se && !dt && !e && se(bt), f && !j ? (dt && (w && ("complete" === g ? t.pause().totalProgress(1) : "reset" === g ? t.restart(!0).pause() : "restart" === g ? t.restart(!0) : t[g]()), se && se(bt)), !v && ce || (ae && v && ze(bt, ae), mt[h] && ze(bt, mt[h]), Xe && (1 === C ? bt.kill(!1, 1) : mt[h] = 0), v || (h = 1 === C ? 1 : 3, mt[h] && ze(bt, mt[h]))), st && !c && Math.abs(bt.getVelocity()) > (De(st) ? st : 2500) && (Le(bt.callbackAnimation), N ? N.progress(1) : Le(t, !C, 1))) : dt && se && !j && se(bt);
      }

      if (R) {
        let e = rt ? T / rt.duration() * (rt._caScrollDist || 0) : T;
        D(e + (p._isFlipped ? 1 : 0)), R(e);
      }

      ie && ie(-T / rt.duration() * (rt._caScrollDist || 0));
    }, bt.enable = (e, t) => {
      bt.enabled || (bt.enabled = !0, je(pt, "resize", at), je(ut ? B : pt, "scroll", ot), wt && je(Xt, "refreshInit", wt), !1 !== e && (bt.progress = J = 0, s = o = kt = Dt()), !1 !== t && bt.refresh());
    }, bt.getTween = e => e && r ? r.tween : N, bt.setPositions = (e, t) => {
      be && (_ += e - l, k += t - e - u), bt.start = l = e, bt.end = a = t, u = t - e, bt.update();
    }, bt.disable = (e, t) => {
      if (bt.enabled && (!1 !== e && bt.revert(), bt.enabled = bt.isActive = !1, t || N && N.pause(), Q = 0, i && (i.uncache = 1), wt && Ke(Xt, "refreshInit", wt), Z && (Z.pause(), r.tween && r.tween.kill() && (r.tween = 0)), !ut)) {
        let e = it.length;

        for (; e--;) if (it[e].scroller === pt && it[e] !== bt) return;

        Ke(pt, "resize", at), Ke(pt, "scroll", ot);
      }
    }, bt.kill = (r, n) => {
      bt.disable(r, n), N && !n && N.kill(), le && delete nt[le];
      let s = it.indexOf(bt);
      s >= 0 && it.splice(s, 1), s === $ && Tt > 0 && $--, s = 0, it.forEach(e => e.scroller === bt.scroller && (s = 1)), s || (bt.scroll.rec = 0), t && (t.scrollTrigger = null, r && t.render(-1), n || t.kill()), c && [c, d, p, h].forEach(e => e.parentNode && e.parentNode.removeChild(e)), ue === bt && (ue = 0), be && (i && (i.uncache = 1), s = 0, it.forEach(e => e.pin === be && s++), s || (i.spacer = 0)), e.onKill && e.onKill(bt);
    }, bt.enable(!1, !1), ne && ne(bt), t && t.add && !u ? L.delayedCall(.01, () => l || a || bt.refresh()) && (u = .01) && (l = a = 0) : bt.refresh();
  }

  static register(e) {
    return z || (L = e || ke(), _e() && window.document && Xt.enable(), z = xe), z;
  }

  static defaults(e) {
    if (e) for (let t in e) Je[t] = e[t];
    return Je;
  }

  static disable(e, t) {
    xe = 0, it.forEach(r => r[t ? "kill" : "disable"](e)), Ke(I, "wheel", ot), Ke(B, "scroll", ot), clearInterval(U), Ke(B, "touchcancel", Te), Ke(H, "touchstart", Te), Ue(Ke, B, "pointerdown,touchstart,mousedown", be), Ue(Ke, B, "pointerup,touchend,mouseup", we), F.kill(), Pe(Ke);

    for (let e = 0; e < m.length; e += 3) Ze(Ke, m[e], m[e + 1]), Ze(Ke, m[e], m[e + 2]);
  }

  static enable() {
    if (I = window, B = document, W = B.documentElement, H = B.body, L && (V = L.utils.toArray, q = L.utils.clamp, re = L.core.suppressOverwrites || Te, L.core.globals("ScrollTrigger", Xt), H)) {
      xe = 1, X.register(L), Xt.isTouch = X.isTouch, ae = X.isTouch && /(iPad|iPhone|iPod|Mac)/g.test(navigator.userAgent), je(I, "wheel", ot), N = [I, B, W, H], Xt.matchMedia({
        "(orientation: portrait)": () => (lt(), lt)
      }), je(B, "scroll", ot);
      let e,
          t,
          r = H.style,
          i = r.borderTopStyle;

      for (r.borderTopStyle = "solid", e = Fe(H), M.m = Math.round(e.top + M.sc()) || 0, E.m = Math.round(e.left + E.sc()) || 0, i ? r.borderTopStyle = i : r.removeProperty("border-top-style"), U = setInterval(st, 250), L.delayedCall(.5, () => fe = 0), je(B, "touchcancel", Te), je(H, "touchstart", Te), Ue(je, B, "pointerdown,touchstart,mousedown", be), Ue(je, B, "pointerup,touchend,mouseup", we), Z = L.utils.checkPrefix("transform"), kt.push(Z), z = me(), F = L.delayedCall(.2, bt).pause(), ee = [B, "visibilitychange", () => {
        let e = I.innerWidth,
            t = I.innerHeight;
        B.hidden ? (J = e, Q = t) : J === e && Q === t || at();
      }, B, "DOMContentLoaded", bt, I, "load", bt, I, "resize", at], Pe(je), it.forEach(e => e.enable(0, 1)), t = 0; t < m.length; t += 3) Ze(Ke, m[t], m[t + 1]), Ze(Ke, m[t], m[t + 2]);
    }
  }

  static config(e) {
    "limitCallbacks" in e && (ce = !!e.limitCallbacks);
    let t = e.syncInterval;
    t && clearInterval(U) || (U = t) && setInterval(st, t), "ignoreMobileResize" in e && (se = 1 === Xt.isTouch && e.ignoreMobileResize), "autoRefreshEvents" in e && (Pe(Ke) || Pe(je, e.autoRefreshEvents || "none"), ie = -1 === (e.autoRefreshEvents + "").indexOf("resize"));
  }

  static scrollerProxy(e, t) {
    let r = C(e),
        i = m.indexOf(r),
        n = Ee(r);
    ~i && m.splice(i, n ? 6 : 2), t && (n ? v.unshift(I, t, H, t, W, t) : v.unshift(r, t));
  }

  static matchMedia(e) {
    let t, r, i, n, s;

    for (r in e) i = pt.indexOf(r), n = e[r], pe = r, "all" === r ? n() : (t = I.matchMedia(r), t && (t.matches && (s = n()), ~i ? (pt[i + 1] = Xe(pt[i + 1], n), pt[i + 2] = Xe(pt[i + 2], s)) : (i = pt.length, pt.push(r, n, s), t.addListener ? t.addListener(ht) : t.addEventListener("change", ht)), pt[i + 3] = t.matches)), pe = 0;

    return pt;
  }

  static clearMatchMedia(e) {
    e || (pt.length = 0), (e = pt.indexOf(e)) >= 0 && pt.splice(e, 4);
  }

  static isInViewport(e, t, r) {
    let i = (Oe(e) ? C(e) : e).getBoundingClientRect(),
        n = i[r ? "width" : "height"] * t || 0;
    return r ? i.right - n > 0 && i.left + n < I.innerWidth : i.bottom - n > 0 && i.top + n < I.innerHeight;
  }

  static positionInViewport(e, t, r) {
    Oe(e) && (e = C(e));
    let i = e.getBoundingClientRect(),
        n = i[r ? "width" : "height"],
        s = null == t ? n / 2 : t in Qe ? Qe[t] * n : ~t.indexOf("%") ? parseFloat(t) * n / 100 : parseFloat(t) || 0;
    return r ? (i.left + s) / I.innerWidth : (i.top + s) / I.innerHeight;
  }

}

exports.ScrollTrigger = Xt;
Xt.version = "3.10.4", Xt.saveStyles = e => e ? V(e).forEach(e => {
  if (e && e.style) {
    let t = ft.indexOf(e);
    t >= 0 && ft.splice(t, 5), ft.push(e, e.style.cssText, e.getBBox && e.getAttribute("transform"), L.core.getCache(e), pe);
  }
}) : ft, Xt.revert = (e, t) => vt(!e, t), Xt.create = (e, t) => new Xt(e, t), Xt.refresh = e => e ? at() : (z || Xt.register()) && bt(!0), Xt.update = St, Xt.clearScrollMemory = yt, Xt.maxScroll = (e, t) => Ce(e, t ? E : M), Xt.getScrollFunc = (e, t) => P(C(e), t ? E : M), Xt.getById = e => nt[e], Xt.getAll = () => it.filter(e => "ScrollSmoother" !== e.vars.id), Xt.isScrolling = () => !!ye, Xt.snapDirectional = Ge, Xt.addEventListener = (e, t) => {
  let r = ct[e] || (ct[e] = []);
  ~r.indexOf(t) || r.push(t);
}, Xt.removeEventListener = (e, t) => {
  let r = ct[e],
      i = r && r.indexOf(t);
  i >= 0 && r.splice(i, 1);
}, Xt.batch = (e, t) => {
  let r,
      i = [],
      n = {},
      s = t.interval || .016,
      o = t.batchMax || 1e9,
      l = (e, t) => {
    let r = [],
        i = [],
        n = L.delayedCall(s, () => {
      t(r, i), r = [], i = [];
    }).pause();
    return e => {
      r.length || n.restart(!0), r.push(e.trigger), i.push(e), o <= r.length && n.progress(1);
    };
  };

  for (r in t) n[r] = "on" === r.substr(0, 2) && Ae(t[r]) && "onRefreshInit" !== r ? l(0, t[r]) : t[r];

  return Ae(o) && (o = o(), je(Xt, "refresh", () => o = t.batchMax())), V(e).forEach(e => {
    let t = {};

    for (r in n) t[r] = n[r];

    t.trigger = e, i.push(Xt.create(t));
  }), i;
};

let Lt,
    zt = (e, t, r, i) => (t > i ? e(i) : t < 0 && e(0), r > i ? (i - t) / (r - t) : r < 0 ? t / (t - r) : 1),
    It = (e, t) => {
  !0 === t ? e.style.removeProperty("touch-action") : e.style.touchAction = !0 === t ? "auto" : t ? "pan-" + t + (X.isTouch ? " pinch-zoom" : "") : "none", e === W && It(H, t);
},
    Bt = {
  auto: 1,
  scroll: 1
},
    Wt = ({
  event: e,
  target: t,
  axis: r
}) => {
  let i,
      n = (e.changedTouches ? e.changedTouches[0] : e).target,
      s = n._gsap || L.core.getCache(n),
      o = me();

  if (!s._isScrollT || o - s._isScrollT > 2e3) {
    for (; n && n.scrollHeight <= n.clientHeight;) n = n.parentNode;

    s._isScroll = n && !Ee(n) && n !== t && (Bt[(i = He(n)).overflowY] || Bt[i.overflowX]), s._isScrollT = o;
  }

  (s._isScroll || "x" === r) && (e._gsapAllow = !0);
},
    Ht = (e, t, r, i) => X.create({
  target: e,
  capture: !0,
  debounce: !1,
  lockAxis: !0,
  type: t,
  onWheel: i = i && Wt,
  onPress: i,
  onDrag: i,
  onScroll: i,
  onEnable: () => r && je(B, X.eventTypes[0], Ft, !1, !0),
  onDisable: () => Ke(B, X.eventTypes[0], Ft, !0)
}),
    Nt = /(input|label|select|textarea)/i,
    Ft = e => {
  let t = Nt.test(e.target.tagName);
  (t || Lt) && (e._gsapAllow = !0, Lt = t);
},
    Vt = e => {
  Re(e) || (e = {}), e.preventDefault = e.isNormalizer = e.allowClicks = !0, e.type || (e.type = "wheel,touch"), e.debounce = !!e.debounce, e.id = e.id || "normalizer";

  let t,
      r,
      i,
      n,
      s,
      o,
      l,
      a,
      {
    normalizeScrollX: c,
    momentum: d,
    allowNestedScroll: p
  } = e,
      h = C(e.target) || W,
      g = L.core.globals().ScrollSmoother,
      u = ae && (e.content && C(e.content) || g && g.get() && g.get().content()),
      f = P(h, M),
      v = P(h, E),
      y = 1,
      x = (X.isTouch && I.visualViewport ? I.visualViewport.scale * I.visualViewport.width : I.outerWidth) / I.innerWidth,
      b = 0,
      w = Ae(d) ? () => d(t) : () => d || 2.8,
      T = Ht(h, e.type, !0, p),
      S = () => i = !1,
      _ = Te,
      k = Te,
      O = () => {
    r = Ce(h, M), k = q(ae ? 1 : 0, r), c && (_ = q(0, Ce(h, E))), n = xt;
  },
      A = () => {
    O(), s.isActive() && s.vars.scrollY > r && (f() > r ? s.progress(1) && f(r) : s.resetTo("scrollY", r));
  };

  return e.ignoreCheck = e => ae && "touchmove" === e.type && (() => {
    if (i) {
      requestAnimationFrame(S);
      let e = Se(t.deltaY / 2),
          r = k(f.v - e);
      return u && r !== f.v + f.offset && (f.offset = r - f.v, u.style.transform = "translateY(" + -f.offset + "px)", u._gsap && (u._gsap.y = -f.offset + "px"), f.cacheID = m.cache, St()), !0;
    }

    u && (u.style.transform = "translateY(0px)", f.offset = f.cacheID = 0, u._gsap && (u._gsap.y = "0px")), i = !0;
  })() || y > 1.05 && "touchstart" !== e.type || t.isGesturing || e.touches && e.touches.length > 1, e.onPress = () => {
    let e = y;
    y = Se((I.visualViewport && I.visualViewport.scale || 1) / x), s.pause(), e !== y && It(h, y > 1.01 || !c && "x"), i = !1, o = v(), l = f(), O(), n = xt;
  }, e.onRelease = e.onGestureStart = (e, t) => {
    if (u && (u.style.transform = "translateY(0px)", f.offset = f.cacheID = 0, u._gsap && (u._gsap.y = "0px")), t) {
      m.cache++;
      let t,
          i,
          n = w();
      c && (t = v(), i = t + .05 * n * -e.velocityX / .227, n *= zt(v, t, i, Ce(h, E)), s.vars.scrollX = _(i)), t = f(), i = t + .05 * n * -e.velocityY / .227, n *= zt(f, t, i, Ce(h, M)), s.vars.scrollY = k(i), s.invalidate().duration(n).play(.01), (ae && s.vars.scrollY >= r || t >= r - 1) && L.to({}, {
        onUpdate: A,
        duration: n
      });
    } else a.restart(!0);
  }, e.onWheel = () => {
    s._ts && s.pause(), me() - b > 1e3 && (n = 0, b = me());
  }, e.onChange = (e, t, r, i, s) => {
    xt !== n && O(), t && c && v(_(i[2] === t ? o + (e.startX - e.x) : v() + t - i[1])), r && f(k(s[2] === r ? l + (e.startY - e.y) : f() + r - s[1])), St();
  }, e.onEnable = () => {
    It(h, !c && "x"), je(I, "resize", A), T.enable();
  }, e.onDisable = () => {
    It(h, !0), Ke(I, "resize", A), T.kill();
  }, t = new X(e), t.iOS = ae, ae && !f() && f(1), a = t._dc, s = L.to(t, {
    ease: "power4",
    paused: !0,
    scrollX: c ? "+=0.1" : "+=0",
    scrollY: "+=0.1",
    onComplete: a.vars.onComplete
  }), t;
};

Xt.sort = e => it.sort(e || ((e, t) => -1e6 * (e.vars.refreshPriority || 0) + e.start - (t.start + -1e6 * (t.vars.refreshPriority || 0)))), Xt.observe = e => new X(e), Xt.normalizeScroll = e => {
  if (void 0 === e) return ne;
  if (!0 === e && ne) return ne.enable();
  if (!1 === e) return ne && ne.kill();
  let t = e instanceof X ? e : Vt(e);
  return ne && ne.target === t.target && ne.kill(), Ee(t.target) && (ne = t), t;
}, Xt.core = {
  _getVelocityProp: O,
  _inputObserver: Ht,
  _scrollers: m,
  _proxies: v,
  bridge: {
    ss: () => {
      ye || ut("scrollStart"), ye = me();
    },
    ref: () => j
  }
}, ke() && L.registerPlugin(Xt);
var _default = Xt;
exports.default = _default;
},{}],"node_modules/gsap-trial/DrawSVGPlugin.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.DrawSVGPlugin = void 0;

/*!
 * DrawSVGPlugin 3.10.4
 * https://greensock.com
 * 
 * @license Copyright 2022, GreenSock. All rights reserved.
 * *** DO NOT DEPLOY THIS FILE ***
 * This is a trial version that only works locally and on domains like codepen.io and codesandbox.io.
 * Loading it on an unauthorized domain violates the license and will cause a redirect.
 * Get the unrestricted file by joining Club GreenSock at https://greensock.com/club
 * @author: Jack Doyle, jack@greensock.com
 */
let e,
    t,
    n,
    i,
    r,
    s,
    o = () => "undefined" != typeof window,
    a = () => e || o() && (e = window.gsap) && e.registerPlugin && e,
    d = /[-+=\.]*\d+[\.e\-\+]*\d*[e\-\+]*\d*/gi,
    l = {
  rect: ["width", "height"],
  circle: ["r", "r"],
  ellipse: ["rx", "ry"],
  line: ["x2", "y2"]
},
    h = e => Math.round(1e4 * e) / 1e4,
    f = e => parseFloat(e) || 0,
    g = (e, t) => {
  let n = f(e);
  return ~e.indexOf("%") ? n / 100 * t : n;
},
    u = (e, t) => f(e.getAttribute(t)),
    c = Math.sqrt,
    p = (e, t, n, i, r, s) => c(((f(n) - f(e)) * r) ** 2 + ((f(i) - f(t)) * s) ** 2),
    w = e => console.warn(e),
    _ = e => "non-scaling-stroke" === e.getAttribute("vector-effect"),
    y = function () {
  return String.fromCharCode.apply(null, arguments);
},
    x = y(103, 114, 101, 101, 110, 115, 111, 99, 107, 46, 99, 111, 109),
    m = function (e) {
  var t = "undefined" != typeof window,
      n = 0 === (t ? window.location.href : "").indexOf(y(102, 105, 108, 101, 58, 47, 47)) || -1 !== e.indexOf(y(108, 111, 99, 97, 108, 104, 111, 115, 116)) || -1 !== e.indexOf(y(49, 50, 55, 46, 48, 32, 48, 46, 49)),
      i = [x, y(99, 111, 100, 101, 112, 101, 110, 46, 105, 111), y(99, 111, 100, 101, 112, 101, 110, 46, 112, 108, 117, 109, 98, 105, 110, 103), y(99, 111, 100, 101, 112, 101, 110, 46, 100, 101, 118), y(99, 111, 100, 101, 112, 101, 110, 46, 97, 112, 112), y(99, 111, 100, 101, 112, 101, 110, 46, 119, 101, 98, 115, 105, 116, 101), y(112, 101, 110, 115, 46, 99, 108, 111, 117, 100), y(99, 115, 115, 45, 116, 114, 105, 99, 107, 115, 46, 99, 111, 109), y(99, 100, 112, 110, 46, 105, 111), y(112, 101, 110, 115, 46, 105, 111), y(103, 97, 110, 110, 111, 110, 46, 116, 118), y(99, 111, 100, 101, 99, 97, 110, 121, 111, 110, 46, 110, 101, 116), y(116, 104, 101, 109, 101, 102, 111, 114, 101, 115, 116, 46, 110, 101, 116), y(99, 101, 114, 101, 98, 114, 97, 120, 46, 99, 111, 46, 117, 107), y(116, 121, 109, 112, 97, 110, 117, 115, 46, 110, 101, 116), y(116, 119, 101, 101, 110, 109, 97, 120, 46, 99, 111, 109), y(116, 119, 101, 101, 110, 108, 105, 116, 101, 46, 99, 111, 109), y(112, 108, 110, 107, 114, 46, 99, 111), y(104, 111, 116, 106, 97, 114, 46, 99, 111, 109), y(119, 101, 98, 112, 97, 99, 107, 98, 105, 110, 46, 99, 111, 109), y(97, 114, 99, 104, 105, 118, 101, 46, 111, 114, 103), y(99, 111, 100, 101, 115, 97, 110, 100, 98, 111, 120, 46, 105, 111), y(99, 115, 98, 46, 97, 112, 112), y(115, 116, 97, 99, 107, 98, 108, 105, 116, 122, 46, 99, 111, 109), y(115, 116, 97, 99, 107, 98, 108, 105, 116, 122, 46, 105, 111), y(99, 111, 100, 105, 101, 114, 46, 105, 111), y(109, 111, 116, 105, 111, 110, 116, 114, 105, 99, 107, 115, 46, 99, 111, 109), y(115, 116, 97, 99, 107, 111, 118, 101, 114, 102, 108, 111, 119, 46, 99, 111, 109), y(115, 116, 97, 99, 107, 101, 120, 99, 104, 97, 110, 103, 101, 46, 99, 111, 109), y(106, 115, 102, 105, 100, 100, 108, 101, 46, 110, 101, 116)],
      r = function () {
    t && ("loading" === document.readyState || "interactive" === document.readyState ? document.addEventListener("readystatechange", r) : (document.removeEventListener("readystatechange", r), t && window.console && !window._gsapWarned && "object" == typeof window.gsap && !1 !== window.gsap.config().trialWarn && (console.log(y(37, 99, 87, 97, 114, 110, 105, 110, 103), y(102, 111, 110, 116, 45, 115, 105, 122, 101, 58, 51, 48, 112, 120, 59, 99, 111, 108, 111, 114, 58, 114, 101, 100, 59)), console.log(y(65, 32, 116, 114, 105, 97, 108, 32, 118, 101, 114, 115, 105, 111, 110, 32, 111, 102, 32) + "DrawSVGPlugin" + y(32, 105, 115, 32, 108, 111, 97, 100, 101, 100, 32, 116, 104, 97, 116, 32, 111, 110, 108, 121, 32, 119, 111, 114, 107, 115, 32, 108, 111, 99, 97, 108, 108, 121, 32, 97, 110, 100, 32, 111, 110, 32, 100, 111, 109, 97, 105, 110, 115, 32, 108, 105, 107, 101, 32, 99, 111, 100, 101, 112, 101, 110, 46, 105, 111, 32, 97, 110, 100, 32, 99, 111, 100, 101, 115, 97, 110, 100, 98, 111, 120, 46, 105, 111, 46, 32, 42, 42, 42, 32, 68, 79, 32, 78, 79, 84, 32, 68, 69, 80, 76, 79, 89, 32, 84, 72, 73, 83, 32, 70, 73, 76, 69, 32, 42, 42, 42, 32, 76, 111, 97, 100, 105, 110, 103, 32, 105, 116, 32, 111, 110, 32, 97, 110, 32, 117, 110, 97, 117, 116, 104, 111, 114, 105, 122, 101, 100, 32, 115, 105, 116, 101, 32, 118, 105, 111, 108, 97, 116, 101, 115, 32, 116, 104, 101, 32, 108, 105, 99, 101, 110, 115, 101, 32, 97, 110, 100, 32, 119, 105, 108, 108, 32, 99, 97, 117, 115, 101, 32, 97, 32, 114, 101, 100, 105, 114, 101, 99, 116, 46, 32, 80, 108, 101, 97, 115, 101, 32, 106, 111, 105, 110, 32, 67, 108, 117, 98, 32, 71, 114, 101, 101, 110, 83, 111, 99, 107, 32, 116, 111, 32, 103, 101, 116, 32, 102, 117, 108, 108, 32, 97, 99, 99, 101, 115, 115, 32, 116, 111, 32, 116, 104, 101, 32, 98, 111, 110, 117, 115, 32, 112, 108, 117, 103, 105, 110, 115, 32, 116, 104, 97, 116, 32, 98, 111, 111, 115, 116, 32, 121, 111, 117, 114, 32, 97, 110, 105, 109, 97, 116, 105, 111, 110, 32, 115, 117, 112, 101, 114, 112, 111, 119, 101, 114, 115, 46, 32, 68, 105, 115, 97, 98, 108, 101, 32, 116, 104, 105, 115, 32, 119, 97, 114, 110, 105, 110, 103, 32, 119, 105, 116, 104, 32, 103, 115, 97, 112, 46, 99, 111, 110, 102, 105, 103, 40, 123, 116, 114, 105, 97, 108, 87, 97, 114, 110, 58, 32, 102, 97, 108, 115, 101, 125, 41, 59)), console.log(y(37, 99, 71, 101, 116, 32, 117, 110, 114, 101, 115, 116, 114, 105, 99, 116, 101, 100, 32, 102, 105, 108, 101, 115, 32, 97, 116, 32, 104, 116, 116, 112, 115, 58, 47, 47, 103, 114, 101, 101, 110, 115, 111, 99, 107, 46, 99, 111, 109, 47, 99, 108, 117, 98), y(102, 111, 110, 116, 45, 115, 105, 122, 101, 58, 49, 54, 112, 120, 59, 99, 111, 108, 111, 114, 58, 35, 52, 101, 57, 56, 49, 53)), window._gsapWarned = 1)));
  },
      s = i.length;

  for (setTimeout(r, 50); --s > -1;) if (-1 !== e.indexOf(i[s])) return !0;

  return n || !setTimeout(function () {
    t && (window.location.href = y(104, 116, 116, 112, 115, 58, 47, 47) + x + y(47, 114, 101, 113, 117, 105, 114, 101, 115, 45, 109, 101, 109, 98, 101, 114, 115, 104, 105, 112, 47) + "?plugin=DrawSVGPlugin&source=trial");
  }, 3e3);
}("undefined" != typeof window ? window.location.host : ""),
    b = e => {
  if (!(e = t(e)[0])) return 0;
  let n,
      i,
      r,
      o,
      a,
      f,
      g,
      y = e.tagName.toLowerCase(),
      x = e.style,
      m = 1,
      b = 1;
  _(e) && (b = e.getScreenCTM(), m = c(b.a * b.a + b.b * b.b), b = c(b.d * b.d + b.c * b.c));

  try {
    i = e.getBBox();
  } catch (e) {
    w("Some browsers won't measure invisible elements (like display:none or masks inside defs).");
  }

  let {
    x: k,
    y: v,
    width: P,
    height: O
  } = i || {
    x: 0,
    y: 0,
    width: 0,
    height: 0
  };
  if (i && (P || O) || !l[y] || (P = u(e, l[y][0]), O = u(e, l[y][1]), "rect" !== y && "line" !== y && (P *= 2, O *= 2), "line" === y && (k = u(e, "x1"), v = u(e, "y1"), P = Math.abs(P - k), O = Math.abs(O - v))), "path" === y) o = x.strokeDasharray, x.strokeDasharray = "none", n = e.getTotalLength() || 0, h(m) !== h(b) && !s && (s = 1) && w("Warning: <path> length cannot be measured when vector-effect is non-scaling-stroke and the element isn't proportionally scaled."), n *= (m + b) / 2, x.strokeDasharray = o;else if ("rect" === y) n = 2 * P * m + 2 * O * b;else if ("line" === y) n = p(k, v, k + P, v + O, m, b);else if ("polyline" === y || "polygon" === y) for (r = e.getAttribute("points").match(d) || [], "polygon" === y && r.push(r[0], r[1]), n = 0, a = 2; a < r.length; a += 2) n += p(r[a - 2], r[a - 1], r[a], r[a + 1], m, b) || 0;else "circle" !== y && "ellipse" !== y || (f = P / 2 * m, g = O / 2 * b, n = Math.PI * (3 * (f + g) - c((3 * f + g) * (f + 3 * g))));
  return n || 0;
},
    k = (e, i) => {
  if (!(e = t(e)[0])) return [0, 0];
  i || (i = b(e) + 1);
  let r = n.getComputedStyle(e),
      s = r.strokeDasharray || "",
      o = f(r.strokeDashoffset),
      a = s.indexOf(",");
  return a < 0 && (a = s.indexOf(" ")), s = a < 0 ? i : f(s.substr(0, a)), s > i && (s = i), [-o || 0, s - o || 0];
},
    v = () => {
  o() && (n = window, r = e = a(), t = e.utils.toArray, i = -1 !== ((n.navigator || {}).userAgent || "").indexOf("Edge"));
};

const P = {
  version: "3.10.4",
  name: "drawSVG",

  register(t) {
    e = t, v();
  },

  init(e, t, s, o, a) {
    if (!e.getBBox) return !1;
    r || v();
    let d,
        l,
        u,
        c = b(e);
    return this._style = e.style, this._target = e, t + "" == "true" ? t = "0 100%" : t ? -1 === (t + "").indexOf(" ") && (t = "0 " + t) : t = "0 0", d = k(e, c), l = ((e, t, n) => {
      let i,
          r,
          s = e.indexOf(" ");
      return s < 0 ? (i = void 0 !== n ? n + "" : e, r = e) : (i = e.substr(0, s), r = e.substr(s + 1)), i = g(i, t), r = g(r, t), i > r ? [r, i] : [i, r];
    })(t, c, d[0]), this._length = h(c), this._dash = h(d[1] - d[0]), this._offset = h(-d[0]), this._dashPT = this.add(this, "_dash", this._dash, h(l[1] - l[0])), this._offsetPT = this.add(this, "_offset", this._offset, h(-l[0])), i && (u = n.getComputedStyle(e), u.strokeLinecap !== u.strokeLinejoin && (l = f(u.strokeMiterlimit), this.add(e.style, "strokeMiterlimit", l, l + .01))), this._live = _(e) || ~(t + "").indexOf("live"), this._nowrap = ~(t + "").indexOf("nowrap"), this._props.push("drawSVG"), m;
  },

  render(e, t) {
    let n,
        i,
        r,
        s,
        o = t._pt,
        a = t._style;

    if (o) {
      for (t._live && (n = b(t._target), n !== t._length && (i = n / t._length, t._length = n, t._offsetPT && (t._offsetPT.s *= i, t._offsetPT.c *= i), t._dashPT ? (t._dashPT.s *= i, t._dashPT.c *= i) : t._dash *= i)); o;) o.r(e, o.d), o = o._next;

      r = t._dash || (e && 1 !== e ? 1e-4 : 0), n = t._length - r + .1, s = t._offset, r && s && r + Math.abs(s % t._length) > t._length - .2 && (s += s < 0 ? .1 : -.1) && (n += .1), a.strokeDashoffset = r ? s : s + .001, a.strokeDasharray = n < .2 ? "none" : r ? r + "px," + (t._nowrap ? 999999 : n) + "px" : "0px, 999999px";
    }
  },

  getLength: b,
  getPosition: k
};
exports.DrawSVGPlugin = P;
a() && e.registerPlugin(P);
var _default = P;
exports.default = _default;
},{}],"node_modules/gsap-trial/MotionPathPlugin.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.MotionPathPlugin = void 0;

/*!
 * MotionPathPlugin 3.10.4
 * https://greensock.com
 * 
 * @license Copyright 2022, GreenSock. All rights reserved.
 * Subject to the terms at https://greensock.com/standard-license or for Club GreenSock members, the agreement issued with that membership.
 * @author: Jack Doyle, jack@greensock.com
 */
let t = /[achlmqstvz]|(-?\d*\.?\d*(?:e[\-+]?\d+)?)[0-9]/gi,
    e = /(?:(-)?\d*\.?\d*(?:e[\-+]?\d+)?)[0-9]/gi,
    n = /[\+\-]?\d*\.?\d+e[\+\-]?\d+/gi,
    r = /(^[#\.][a-z]|[a-y][a-z])/i,
    l = Math.PI / 180,
    o = 180 / Math.PI,
    s = Math.sin,
    i = Math.cos,
    a = Math.abs,
    h = Math.sqrt,
    g = Math.atan2,
    p = t => "string" == typeof t,
    f = t => "number" == typeof t,
    u = {},
    c = {},
    d = t => Math.round((t + 1e8) % 1 * 1e5) / 1e5 || (t < 0 ? 0 : 1),
    m = t => Math.round(1e5 * t) / 1e5 || 0,
    y = t => Math.round(1e10 * t) / 1e10 || 0,
    x = (t, e, n, r) => {
  let l = t[e],
      o = 1 === r ? 6 : S(l, n, r);
  if (o && o + n + 2 < l.length) return t.splice(e, 0, l.slice(0, n + o + 2)), l.splice(0, n + o), 1;
},
    w = (t, e, n) => {
  let r = t.length,
      l = ~~(n * r);

  if (t[l] > e) {
    for (; --l && t[l] > e;);

    l < 0 && (l = 0);
  } else for (; t[++l] < e && l < r;);

  return l < r ? l : r - 1;
},
    b = (t, e) => (e.totalLength = t.totalLength, t.samples ? (e.samples = t.samples.slice(0), e.lookup = t.lookup.slice(0), e.minLength = t.minLength, e.resolution = t.resolution) : t.totalPoints && (e.totalPoints = t.totalPoints), e),
    L = (t, e) => {
  let n = t.length,
      r = t[n - 1] || [],
      l = r.length;
  n && e[0] === r[l - 2] && e[1] === r[l - 1] && (e = r.concat(e.slice(2)), n--), t[n] = e;
};

function P(t) {
  let e,
      n = (t = p(t) && r.test(t) && document.querySelector(t) || t).getAttribute ? t : 0;
  return n && (t = t.getAttribute("d")) ? (n._gsPath || (n._gsPath = {}), e = n._gsPath[t], e && !e._dirty ? e : n._gsPath[t] = I(t)) : t ? p(t) ? I(t) : f(t[0]) ? [t] : t : console.warn("Expecting a <path> element or an SVG path data string");
}

function v(t) {
  let e,
      n = 0;

  for (t.reverse(); n < t.length; n += 2) e = t[n], t[n] = t[n + 1], t[n + 1] = e;

  t.reversed = !t.reversed;
}

let N = {
  rect: "rx,ry,x,y,width,height",
  circle: "r,cx,cy",
  ellipse: "rx,ry,cx,cy",
  line: "x1,x2,y1,y2"
};

function M(t, n) {
  let r,
      l,
      o,
      s,
      i,
      a,
      h,
      g,
      p,
      f,
      u,
      c,
      d,
      m,
      y,
      x,
      w,
      b,
      L,
      P,
      v,
      M,
      C = t.tagName.toLowerCase(),
      T = .552284749831;
  return "path" !== C && t.getBBox ? (a = ((t, e) => {
    let n,
        r = document.createElementNS("http://www.w3.org/2000/svg", "path"),
        l = [].slice.call(t.attributes),
        o = l.length;

    for (e = "," + e + ","; --o > -1;) n = l[o].nodeName.toLowerCase(), e.indexOf("," + n + ",") < 0 && r.setAttributeNS(null, n, l[o].nodeValue);

    return r;
  })(t, "x,y,width,height,cx,cy,rx,ry,r,x1,x2,y1,y2,points"), M = ((t, e) => {
    let n = e ? e.split(",") : [],
        r = {},
        l = n.length;

    for (; --l > -1;) r[n[l]] = +t.getAttribute(n[l]) || 0;

    return r;
  })(t, N[C]), "rect" === C ? (s = M.rx, i = M.ry || s, l = M.x, o = M.y, f = M.width - 2 * s, u = M.height - 2 * i, s || i ? (c = l + s * (1 - T), d = l + s, m = d + f, y = m + s * T, x = m + s, w = o + i * (1 - T), b = o + i, L = b + u, P = L + i * T, v = L + i, r = "M" + x + "," + b + " V" + L + " C" + [x, P, y, v, m, v, m - (m - d) / 3, v, d + (m - d) / 3, v, d, v, c, v, l, P, l, L, l, L - (L - b) / 3, l, b + (L - b) / 3, l, b, l, w, c, o, d, o, d + (m - d) / 3, o, m - (m - d) / 3, o, m, o, y, o, x, w, x, b].join(",") + "z") : r = "M" + (l + f) + "," + o + " v" + u + " h" + -f + " v" + -u + " h" + f + "z") : "circle" === C || "ellipse" === C ? ("circle" === C ? (s = i = M.r, g = s * T) : (s = M.rx, i = M.ry, g = i * T), l = M.cx, o = M.cy, h = s * T, r = "M" + (l + s) + "," + o + " C" + [l + s, o + g, l + h, o + i, l, o + i, l - h, o + i, l - s, o + g, l - s, o, l - s, o - g, l - h, o - i, l, o - i, l + h, o - i, l + s, o - g, l + s, o].join(",") + "z") : "line" === C ? r = "M" + M.x1 + "," + M.y1 + " L" + M.x2 + "," + M.y2 : "polyline" !== C && "polygon" !== C || (p = (t.getAttribute("points") + "").match(e) || [], l = p.shift(), o = p.shift(), r = "M" + l + "," + o + " L" + p.join(","), "polygon" === C && (r += "," + l + "," + o + "z")), a.setAttribute("d", z(a._gsRawPath = I(r))), n && t.parentNode && (t.parentNode.insertBefore(a, t), t.parentNode.removeChild(t)), a) : t;
}

function C(t, e, n) {
  let r,
      l = t[e],
      s = t[e + 2],
      i = t[e + 4];
  return l += (s - l) * n, s += (i - s) * n, l += (s - l) * n, r = s + (i + (t[e + 6] - i) * n - s) * n - l, l = t[e + 1], s = t[e + 3], i = t[e + 5], l += (s - l) * n, s += (i - s) * n, l += (s - l) * n, m(g(s + (i + (t[e + 7] - i) * n - s) * n - l, r) * o);
}

function T(t, e, n) {
  n = void 0 === n ? 1 : y(n) || 0, e = y(e) || 0;

  let r = Math.max(0, ~~(a(n - e) - 1e-8)),
      l = function (t) {
    let e = [],
        n = 0;

    for (; n < t.length; n++) e[n] = b(t[n], t[n].slice(0));

    return b(t, e);
  }(t);

  if (e > n && (e = 1 - e, n = 1 - n, ((t, e) => {
    let n = t.length;

    for (e || t.reverse(); n--;) t[n].reversed || v(t[n]);
  })(l), l.totalLength = 0), e < 0 || n < 0) {
    let t = Math.abs(~~Math.min(e, n)) + 1;
    e += t, n += t;
  }

  l.totalLength || B(l);
  let o,
      s,
      i,
      h,
      g,
      p,
      f,
      d,
      m = n > 1,
      w = O(l, e, u, !0),
      P = O(l, n, c),
      N = P.segment,
      M = w.segment,
      T = P.segIndex,
      A = w.segIndex,
      _ = P.i,
      R = w.i,
      E = A === T,
      I = _ === R && E;

  if (m || r) {
    for (o = T < A || E && _ < R || I && P.t < w.t, x(l, A, R, w.t) && (A++, o || (T++, I ? (P.t = (P.t - w.t) / (1 - w.t), _ = 0) : E && (_ -= R))), Math.abs(1 - (n - e)) < 1e-5 ? T = A - 1 : !P.t && T ? T-- : x(l, T, _, P.t) && o && A++, 1 === w.t && (A = (A + 1) % l.length), g = [], p = l.length, f = 1 + p * r, d = A, f += (p - A + T) % p, h = 0; h < f; h++) L(g, l[d++ % p]);

    l = g;
  } else if (i = 1 === P.t ? 6 : S(N, _, P.t), e !== n) for (s = S(M, R, I ? w.t / P.t : w.t), E && (i += s), N.splice(_ + i + 2), (s || R) && M.splice(0, R + s), h = l.length; h--;) (h < A || h > T) && l.splice(h, 1);else N.angle = C(N, _ + i, 0), _ += i, w = N[_], P = N[_ + 1], N.length = N.totalLength = 0, N.totalPoints = l.totalPoints = 8, N.push(w, P, w, P, w, P, w, P);

  return l.totalLength = 0, l;
}

function A(t, e, n) {
  e = e || 0, t.samples || (t.samples = [], t.lookup = []);

  let r,
      l,
      o,
      s,
      i,
      g,
      p,
      f,
      u,
      c,
      d,
      m,
      y,
      x,
      w,
      b,
      L,
      P = ~~t.resolution || 12,
      v = 1 / P,
      N = n ? e + 6 * n + 1 : t.length,
      M = t[e],
      C = t[e + 1],
      T = e ? e / 6 * P : 0,
      A = t.samples,
      B = t.lookup,
      S = (e ? t.minLength : 1e8) || 1e8,
      O = A[T + n * P - 1],
      _ = e ? A[T - 1] : 0;

  for (A.length = B.length = 0, l = e + 2; l < N; l += 6) {
    if (o = t[l + 4] - M, s = t[l + 2] - M, i = t[l] - M, f = t[l + 5] - C, u = t[l + 3] - C, c = t[l + 1] - C, g = p = d = m = 0, a(o) < .01 && a(f) < .01 && a(i) + a(c) < .01) t.length > 8 && (t.splice(l, 6), l -= 6, N -= 6);else for (r = 1; r <= P; r++) x = v * r, y = 1 - x, g = p - (p = (x * x * o + 3 * y * (x * s + y * i)) * x), d = m - (m = (x * x * f + 3 * y * (x * u + y * c)) * x), b = h(d * d + g * g), b < S && (S = b), _ += b, A[T++] = _;
    M += o, C += f;
  }

  if (O) for (O -= _; T < A.length; T++) A[T] += O;

  if (A.length && S) {
    if (t.totalLength = L = A[A.length - 1] || 0, t.minLength = S, L / S < 9999) for (b = w = 0, r = 0; r < L; r += S) B[b++] = A[w] < r ? ++w : w;
  } else t.totalLength = A[0] = 0;

  return e ? _ - A[e / 2 - 1] : _;
}

function B(t, e) {
  let n, r, l;

  for (l = n = r = 0; l < t.length; l++) t[l].resolution = ~~e || 12, r += t[l].length, n += A(t[l]);

  return t.totalPoints = r, t.totalLength = n, t;
}

function S(t, e, n) {
  if (n <= 0 || n >= 1) return 0;
  let r = t[e],
      l = t[e + 1],
      o = t[e + 2],
      s = t[e + 3],
      i = t[e + 4],
      a = t[e + 5],
      h = r + (o - r) * n,
      g = o + (i - o) * n,
      p = l + (s - l) * n,
      f = s + (a - s) * n,
      u = h + (g - h) * n,
      c = p + (f - p) * n,
      d = i + (t[e + 6] - i) * n,
      y = a + (t[e + 7] - a) * n;
  return g += (d - g) * n, f += (y - f) * n, t.splice(e + 2, 4, m(h), m(p), m(u), m(c), m(u + (g - u) * n), m(c + (f - c) * n), m(g), m(f), m(d), m(y)), t.samples && t.samples.splice(e / 6 * t.resolution | 0, 0, 0, 0, 0, 0, 0, 0), 6;
}

function O(t, e, n, r) {
  n = n || {}, t.totalLength || B(t), (e < 0 || e > 1) && (e = d(e));
  let l,
      o,
      s,
      i,
      a,
      h,
      g,
      p = 0,
      f = t[0];
  if (e) {
    if (1 === e) g = 1, p = t.length - 1, f = t[p], h = f.length - 8;else {
      if (t.length > 1) {
        for (s = t.totalLength * e, a = h = 0; (a += t[h++].totalLength) < s;) p = h;

        f = t[p], i = a - f.totalLength, e = (s - i) / (a - i) || 0;
      }

      l = f.samples, o = f.resolution, s = f.totalLength * e, h = f.lookup.length ? f.lookup[~~(s / f.minLength)] || 0 : w(l, s, e), i = h ? l[h - 1] : 0, a = l[h], a < s && (i = a, a = l[++h]), g = 1 / o * ((s - i) / (a - i) + h % o), h = 6 * ~~(h / o), r && 1 === g && (h + 6 < f.length ? (h += 6, g = 0) : p + 1 < t.length && (h = g = 0, f = t[++p]));
    }
  } else g = h = p = 0, f = t[0];
  return n.t = g, n.i = h, n.path = t, n.segment = f, n.segIndex = p, n;
}

function _(t, e, n, r) {
  let l,
      o,
      s,
      i,
      a,
      h,
      g,
      p,
      f,
      u = t[0],
      c = r || {};

  if ((e < 0 || e > 1) && (e = d(e)), t.length > 1) {
    for (s = t.totalLength * e, a = h = 0; (a += t[h++].totalLength) < s;) u = t[h];

    i = a - u.totalLength, e = (s - i) / (a - i) || 0;
  }

  return l = u.samples, o = u.resolution, s = u.totalLength * e, h = u.lookup.length ? u.lookup[e < 1 ? ~~(s / u.minLength) : u.lookup.length - 1] || 0 : w(l, s, e), i = h ? l[h - 1] : 0, a = l[h], a < s && (i = a, a = l[++h]), g = 1 / o * ((s - i) / (a - i) + h % o) || 0, f = 1 - g, h = 6 * ~~(h / o), p = u[h], c.x = m((g * g * (u[h + 6] - p) + 3 * f * (g * (u[h + 4] - p) + f * (u[h + 2] - p))) * g + p), c.y = m((g * g * (u[h + 7] - (p = u[h + 1])) + 3 * f * (g * (u[h + 5] - p) + f * (u[h + 3] - p))) * g + p), n && (c.angle = u.totalLength ? C(u, h, g >= 1 ? 1 - 1e-9 : g || 1e-9) : u.angle || 0), c;
}

function R(t, e, n, r, l, o, s) {
  let i,
      a,
      h,
      g,
      p,
      f = t.length;

  for (; --f > -1;) for (i = t[f], a = i.length, h = 0; h < a; h += 2) g = i[h], p = i[h + 1], i[h] = g * e + p * r + o, i[h + 1] = g * n + p * l + s;

  return t._dirty = 1, t;
}

function E(t, e, n, r, o, g, p, f, u) {
  if (t === f && e === u) return;
  n = a(n), r = a(r);
  let c = o % 360 * l,
      d = i(c),
      m = s(c),
      y = Math.PI,
      x = 2 * y,
      w = (t - f) / 2,
      b = (e - u) / 2,
      L = d * w + m * b,
      P = -m * w + d * b,
      v = L * L,
      N = P * P,
      M = v / (n * n) + N / (r * r);
  M > 1 && (n = h(M) * n, r = h(M) * r);
  let C = n * n,
      T = r * r,
      A = (C * T - C * N - T * v) / (C * N + T * v);
  A < 0 && (A = 0);

  let B = (g === p ? -1 : 1) * h(A),
      S = B * (n * P / r),
      O = B * (-r * L / n),
      _ = (t + f) / 2 + (d * S - m * O),
      R = (e + u) / 2 + (m * S + d * O),
      E = (L - S) / n,
      I = (P - O) / r,
      k = (-L - S) / n,
      V = (-P - O) / r,
      z = E * E + I * I,
      X = (I < 0 ? -1 : 1) * Math.acos(E / h(z)),
      Y = (E * V - I * k < 0 ? -1 : 1) * Math.acos((E * k + I * V) / h(z * (k * k + V * V)));

  isNaN(Y) && (Y = y), !p && Y > 0 ? Y -= x : p && Y < 0 && (Y += x), X %= x, Y %= x;
  let G,
      j = Math.ceil(a(Y) / (x / 4)),
      q = [],
      F = Y / j,
      Z = 4 / 3 * s(F / 2) / (1 + i(F / 2)),
      H = d * n,
      U = m * n,
      D = m * -r,
      Q = d * r;

  for (G = 0; G < j; G++) L = i(o = X + G * F), P = s(o), E = i(o += F), I = s(o), q.push(L - Z * P, P + Z * L, E + Z * I, I - Z * E, E, I);

  for (G = 0; G < q.length; G += 2) L = q[G], P = q[G + 1], q[G] = L * H + P * D + _, q[G + 1] = L * U + P * Q + R;

  return q[G - 2] = f, q[G - 1] = u, q;
}

function I(e) {
  let r,
      l,
      o,
      s,
      i,
      h,
      g,
      p,
      f,
      u,
      c,
      d,
      m,
      y,
      x,
      w = (e + "").replace(n, t => {
    let e = +t;
    return e < 1e-4 && e > -1e-4 ? 0 : e;
  }).match(t) || [],
      b = [],
      L = 0,
      P = 0,
      v = w.length,
      N = 0,
      M = "ERROR: malformed path: " + e,
      C = function (t, e, n, r) {
    u = (n - t) / 3, c = (r - e) / 3, g.push(t + u, e + c, n - u, r - c, n, r);
  };

  if (!e || !isNaN(w[0]) || isNaN(w[1])) return console.log(M), b;

  for (r = 0; r < v; r++) if (m = i, isNaN(w[r]) ? (i = w[r].toUpperCase(), h = i !== w[r]) : r--, o = +w[r + 1], s = +w[r + 2], h && (o += L, s += P), r || (p = o, f = s), "M" === i) g && (g.length < 8 ? b.length -= 1 : N += g.length), L = p = o, P = f = s, g = [o, s], b.push(g), r += 2, i = "L";else if ("C" === i) g || (g = [0, 0]), h || (L = P = 0), g.push(o, s, L + 1 * w[r + 3], P + 1 * w[r + 4], L += 1 * w[r + 5], P += 1 * w[r + 6]), r += 6;else if ("S" === i) u = L, c = P, "C" !== m && "S" !== m || (u += L - g[g.length - 4], c += P - g[g.length - 3]), h || (L = P = 0), g.push(u, c, o, s, L += 1 * w[r + 3], P += 1 * w[r + 4]), r += 4;else if ("Q" === i) u = L + 2 / 3 * (o - L), c = P + 2 / 3 * (s - P), h || (L = P = 0), L += 1 * w[r + 3], P += 1 * w[r + 4], g.push(u, c, L + 2 / 3 * (o - L), P + 2 / 3 * (s - P), L, P), r += 4;else if ("T" === i) u = L - g[g.length - 4], c = P - g[g.length - 3], g.push(L + u, P + c, o + 2 / 3 * (L + 1.5 * u - o), s + 2 / 3 * (P + 1.5 * c - s), L = o, P = s), r += 2;else if ("H" === i) C(L, P, L = o, P), r += 1;else if ("V" === i) C(L, P, L, P = o + (h ? P - L : 0)), r += 1;else if ("L" === i || "Z" === i) "Z" === i && (o = p, s = f, g.closed = !0), ("L" === i || a(L - o) > .5 || a(P - s) > .5) && (C(L, P, o, s), "L" === i && (r += 2)), L = o, P = s;else if ("A" === i) {
    if (y = w[r + 4], x = w[r + 5], u = w[r + 6], c = w[r + 7], l = 7, y.length > 1 && (y.length < 3 ? (c = u, u = x, l--) : (c = x, u = y.substr(2), l -= 2), x = y.charAt(1), y = y.charAt(0)), d = E(L, P, +w[r + 1], +w[r + 2], +w[r + 3], +y, +x, (h ? L : 0) + 1 * u, (h ? P : 0) + 1 * c), r += l, d) for (l = 0; l < d.length; l++) g.push(d[l]);
    L = g[g.length - 2], P = g[g.length - 1];
  } else console.log(M);

  return r = g.length, r < 6 ? (b.pop(), r = 0) : g[0] === g[r - 2] && g[1] === g[r - 1] && (g.closed = !0), b.totalPoints = N + r, b;
}

function k(t, e = 1) {
  let n = t[0],
      r = 0,
      l = [n, r],
      o = 2;

  for (; o < t.length; o += 2) l.push(n, r, t[o], r = (t[o] - n) * e / 2, n = t[o], -r);

  return l;
}

function V(t, e) {
  a(t[0] - t[2]) < 1e-4 && a(t[1] - t[3]) < 1e-4 && (t = t.slice(2));
  let n,
      r,
      l,
      o,
      s,
      i,
      g,
      p,
      f,
      u,
      c,
      d,
      y,
      x,
      w,
      b = t.length - 2,
      L = +t[0],
      P = +t[1],
      v = +t[2],
      N = +t[3],
      M = [L, P, L, P],
      C = v - L,
      T = N - P,
      A = Math.abs(t[b] - L) < .001 && Math.abs(t[b + 1] - P) < .001;

  for (A && (t.push(v, N), v = L, N = P, L = t[b - 2], P = t[b - 1], t.unshift(L, P), b += 4), e = e || 0 === e ? +e : 1, l = 2; l < b; l += 2) n = L, r = P, L = v, P = N, v = +t[l + 2], N = +t[l + 3], L === v && P === N || (o = C, s = T, C = v - L, T = N - P, i = h(o * o + s * s), g = h(C * C + T * T), p = h((C / g + o / i) ** 2 + (T / g + s / i) ** 2), f = (i + g) * e * .25 / p, u = L - (L - n) * (i ? f / i : 0), c = L + (v - L) * (g ? f / g : 0), d = L - (u + ((c - u) * (3 * i / (i + g) + .5) / 4 || 0)), y = P - (P - r) * (i ? f / i : 0), x = P + (N - P) * (g ? f / g : 0), w = P - (y + ((x - y) * (3 * i / (i + g) + .5) / 4 || 0)), L === n && P === r || M.push(m(u + d), m(y + w), m(L), m(P), m(c + d), m(x + w)));

  return L !== v || P !== N || M.length < 4 ? M.push(m(v), m(N), m(v), m(N)) : M.length -= 2, 2 === M.length ? M.push(L, P, L, P, L, P) : A && (M.splice(0, 6), M.length = M.length - 6), M;
}

function z(t) {
  f(t[0]) && (t = [t]);
  let e,
      n,
      r,
      l,
      o = "",
      s = t.length;

  for (n = 0; n < s; n++) {
    for (l = t[n], o += "M" + m(l[0]) + "," + m(l[1]) + " C", e = l.length, r = 2; r < e; r++) o += m(l[r++]) + "," + m(l[r++]) + " " + m(l[r++]) + "," + m(l[r++]) + " " + m(l[r++]) + "," + m(l[r]) + " ";

    l.closed && (o += "z");
  }

  return o;
}

let X,
    Y,
    G,
    j,
    q,
    F,
    Z,
    H,
    U,
    D = "transform",
    Q = D + "Origin",
    W = t => {
  let e = t.ownerDocument || t;
  !(D in t.style) && "msTransform" in t.style && (D = "msTransform", Q = D + "Origin");

  for (; e.parentNode && (e = e.parentNode););

  if (Y = window, Z = new lt(), e) {
    X = e, G = e.documentElement, j = e.body, H = X.createElementNS("http://www.w3.org/2000/svg", "g"), H.style.transform = "none";
    let t = e.createElement("div"),
        n = e.createElement("div");
    j.appendChild(t), t.appendChild(n), t.style.position = "static", t.style[D] = "translate3d(0,0,1px)", U = n.offsetParent !== t, j.removeChild(t);
  }

  return e;
},
    $ = [],
    J = [],
    K = t => t.ownerSVGElement || ("svg" === (t.tagName + "").toLowerCase() ? t : null),
    tt = t => "fixed" === Y.getComputedStyle(t).position || ((t = t.parentNode) && 1 === t.nodeType ? tt(t) : void 0),
    et = (t, e) => {
  if (t.parentNode && (X || W(t))) {
    let n = K(t),
        r = n ? n.getAttribute("xmlns") || "http://www.w3.org/2000/svg" : "http://www.w3.org/1999/xhtml",
        l = n ? e ? "rect" : "g" : "div",
        o = 2 !== e ? 0 : 100,
        s = 3 === e ? 100 : 0,
        i = "position:absolute;display:block;pointer-events:none;margin:0;padding:0;",
        a = X.createElementNS ? X.createElementNS(r.replace(/^https/, "http"), l) : X.createElement(l);
    return e && (n ? (F || (F = et(t)), a.setAttribute("width", .01), a.setAttribute("height", .01), a.setAttribute("transform", "translate(" + o + "," + s + ")"), F.appendChild(a)) : (q || (q = et(t), q.style.cssText = i), a.style.cssText = i + "width:0.1px;height:0.1px;top:" + s + "px;left:" + o + "px", q.appendChild(a))), a;
  }

  throw "Need document and parent.";
},
    nt = (t, e) => {
  let n,
      r,
      l,
      o,
      s,
      i,
      a = K(t),
      h = t === a,
      g = a ? $ : J,
      p = t.parentNode;
  if (t === Y) return t;
  if (g.length || g.push(et(t, 1), et(t, 2), et(t, 3)), n = a ? F : q, a) h ? (l = (t => {
    let e,
        n = t.getCTM();
    return n || (e = t.style[D], t.style[D] = "none", t.appendChild(H), n = H.getCTM(), t.removeChild(H), e ? t.style[D] = e : t.style.removeProperty(D.replace(/([A-Z])/g, "-$1").toLowerCase())), n || Z.clone();
  })(t), o = -l.e / l.a, s = -l.f / l.d, r = Z) : t.getBBox ? (l = t.getBBox(), r = t.transform ? t.transform.baseVal : {}, r = r.numberOfItems ? r.numberOfItems > 1 ? (t => {
    let e = new lt(),
        n = 0;

    for (; n < t.numberOfItems; n++) e.multiply(t.getItem(n).matrix);

    return e;
  })(r) : r.getItem(0).matrix : Z, o = r.a * l.x + r.c * l.y, s = r.b * l.x + r.d * l.y) : (r = new lt(), o = s = 0), e && "g" === t.tagName.toLowerCase() && (o = s = 0), (h ? a : p).appendChild(n), n.setAttribute("transform", "matrix(" + r.a + "," + r.b + "," + r.c + "," + r.d + "," + (r.e + o) + "," + (r.f + s) + ")");else {
    if (o = s = 0, U) for (r = t.offsetParent, l = t; l && (l = l.parentNode) && l !== r && l.parentNode;) (Y.getComputedStyle(l)[D] + "").length > 4 && (o = l.offsetLeft, s = l.offsetTop, l = 0);
    if (i = Y.getComputedStyle(t), "absolute" !== i.position && "fixed" !== i.position) for (r = t.offsetParent; p && p !== r;) o += p.scrollLeft || 0, s += p.scrollTop || 0, p = p.parentNode;
    l = n.style, l.top = t.offsetTop - s + "px", l.left = t.offsetLeft - o + "px", l[D] = i[D], l[Q] = i[Q], l.position = "fixed" === i.position ? "fixed" : "absolute", t.parentNode.appendChild(n);
  }
  return n;
},
    rt = (t, e, n, r, l, o, s) => (t.a = e, t.b = n, t.c = r, t.d = l, t.e = o, t.f = s, t);

class lt {
  constructor(t = 1, e = 0, n = 0, r = 1, l = 0, o = 0) {
    rt(this, t, e, n, r, l, o);
  }

  inverse() {
    let {
      a: t,
      b: e,
      c: n,
      d: r,
      e: l,
      f: o
    } = this,
        s = t * r - e * n || 1e-10;
    return rt(this, r / s, -e / s, -n / s, t / s, (n * o - r * l) / s, -(t * o - e * l) / s);
  }

  multiply(t) {
    let {
      a: e,
      b: n,
      c: r,
      d: l,
      e: o,
      f: s
    } = this,
        i = t.a,
        a = t.c,
        h = t.b,
        g = t.d,
        p = t.e,
        f = t.f;
    return rt(this, i * e + h * r, i * n + h * l, a * e + g * r, a * n + g * l, o + p * e + f * r, s + p * n + f * l);
  }

  clone() {
    return new lt(this.a, this.b, this.c, this.d, this.e, this.f);
  }

  equals(t) {
    let {
      a: e,
      b: n,
      c: r,
      d: l,
      e: o,
      f: s
    } = this;
    return e === t.a && n === t.b && r === t.c && l === t.d && o === t.e && s === t.f;
  }

  apply(t, e = {}) {
    let {
      x: n,
      y: r
    } = t,
        {
      a: l,
      b: o,
      c: s,
      d: i,
      e: a,
      f: h
    } = this;
    return e.x = n * l + r * s + a || 0, e.y = n * o + r * i + h || 0, e;
  }

}

function ot(t, e, n, r) {
  if (!t || !t.parentNode || (X || W(t)).documentElement === t) return new lt();

  let l = (t => {
    let e, n;

    for (; t && t !== j;) n = t._gsap, n && n.uncache && n.get(t, "x"), n && !n.scaleX && !n.scaleY && n.renderTransform && (n.scaleX = n.scaleY = 1e-4, n.renderTransform(1, n), e ? e.push(n) : e = [n]), t = t.parentNode;

    return e;
  })(t),
      o = K(t) ? $ : J,
      s = nt(t, n),
      i = o[0].getBoundingClientRect(),
      a = o[1].getBoundingClientRect(),
      h = o[2].getBoundingClientRect(),
      g = s.parentNode,
      p = !r && tt(t),
      f = new lt((a.left - i.left) / 100, (a.top - i.top) / 100, (h.left - i.left) / 100, (h.top - i.top) / 100, i.left + (p ? 0 : Y.pageXOffset || X.scrollLeft || G.scrollLeft || j.scrollLeft || 0), i.top + (p ? 0 : Y.pageYOffset || X.scrollTop || G.scrollTop || j.scrollTop || 0));

  if (g.removeChild(s), l) for (i = l.length; i--;) a = l[i], a.scaleX = a.scaleY = 0, a.renderTransform(1, a);
  return e ? f.inverse() : f;
}

let st,
    it,
    at,
    ht,
    gt = "x,translateX,left,marginLeft,xPercent".split(","),
    pt = "y,translateY,top,marginTop,yPercent".split(","),
    ft = Math.PI / 180,
    ut = (t, e, n, r) => {
  let l,
      o = e.length,
      s = 2 === r ? 0 : r,
      i = 0;

  for (; i < o; i++) t[s] = l = parseFloat(e[i][n]), 2 === r && (t[s + 1] = 0), s += 2;

  return t;
},
    ct = (t, e, n) => parseFloat(t._gsap.get(t, e, n || "px")) || 0,
    dt = t => {
  let e,
      n = t[0],
      r = t[1];

  for (e = 2; e < t.length; e += 2) n = t[e] += n, r = t[e + 1] += r;
},
    mt = (t, e, n, r, l, o, s, i, a) => {
  if ("cubic" === s.type) e = [e];else {
    !1 !== s.fromCurrent && e.unshift(ct(n, r, i), l ? ct(n, l, a) : 0), s.relative && dt(e), e = [(l ? V : k)(e, s.curviness)];
  }
  return e = o(Lt(e, n, s)), Pt(t, n, r, e, "x", i), l && Pt(t, n, l, e, "y", a), B(e, s.resolution || (0 === s.curviness ? 20 : 12));
},
    yt = t => t,
    xt = /[-+\.]*\d+\.?(?:e-|e\+)?\d*/g,
    wt = (t, e, n) => {
  let r,
      l = ot(t),
      o = 0,
      s = 0;
  return "svg" === (t.tagName + "").toLowerCase() ? (r = t.viewBox.baseVal, r.width || (r = {
    width: +t.getAttribute("width"),
    height: +t.getAttribute("height")
  })) : r = e && t.getBBox && t.getBBox(), e && "auto" !== e && (o = e.push ? e[0] * (r ? r.width : t.offsetWidth || 0) : e.x, s = e.push ? e[1] * (r ? r.height : t.offsetHeight || 0) : e.y), n.apply(o || s ? l.apply({
    x: o,
    y: s
  }) : {
    x: l.e,
    y: l.f
  });
},
    bt = (t, e, n, r) => {
  let l,
      o = ot(t.parentNode, !0, !0),
      s = o.clone().multiply(ot(e)),
      i = wt(t, n, o),
      {
    x: a,
    y: h
  } = wt(e, r, o);
  return s.e = s.f = 0, "auto" === r && e.getTotalLength && "path" === e.tagName.toLowerCase() && (l = e.getAttribute("d").match(xt) || [], l = s.apply({
    x: +l[0],
    y: +l[1]
  }), a += l.x, h += l.y), (l || e.getBBox && t.getBBox && e.ownerSVGElement === t.ownerSVGElement) && (l = s.apply(e.getBBox()), a -= l.x, h -= l.y), s.e = a - i.x, s.f = h - i.y, s;
},
    Lt = (t, e, {
  align: n,
  matrix: r,
  offsetX: l,
  offsetY: o,
  alignOrigin: s
}) => {
  let i,
      a,
      h,
      g = t[0][0],
      p = t[0][1],
      f = ct(e, "x"),
      u = ct(e, "y");
  return t && t.length ? (n && ("self" === n || (i = ht(n)[0] || e) === e ? R(t, 1, 0, 0, 1, f - g, u - p) : (s && !1 !== s[2] ? st.set(e, {
    transformOrigin: 100 * s[0] + "% " + 100 * s[1] + "%"
  }) : s = [ct(e, "xPercent") / -100, ct(e, "yPercent") / -100], a = bt(e, i, s, "auto"), h = a.apply({
    x: g,
    y: p
  }), R(t, a.a, a.b, a.c, a.d, f + a.e - (h.x - a.e), u + a.f - (h.y - a.f)))), r ? R(t, r.a, r.b, r.c, r.d, r.e, r.f) : (l || o) && R(t, 1, 0, 0, 1, l || 0, o || 0), t) : P("M0,0L0,0");
},
    Pt = (t, e, n, r, l, o) => {
  let s = e._gsap,
      i = s.harness,
      a = i && i.aliases && i.aliases[n],
      h = a && a.indexOf(",") < 0 ? a : n,
      g = t._pt = new it(t._pt, e, h, 0, 0, yt, 0, s.set(e, h, t));
  g.u = at(s.get(e, h, o)) || 0, g.path = r, g.pp = l, t._props.push(h);
};

const vt = {
  version: "3.10.4",
  name: "motionPath",

  register(t, e, n) {
    st = t, at = st.utils.getUnit, ht = st.utils.toArray, it = n;
  },

  init(t, e) {
    if (!st) return console.warn("Please gsap.registerPlugin(MotionPathPlugin)"), !1;
    "object" == typeof e && !e.style && e.path || (e = {
      path: e
    });
    let n,
        r,
        l = [],
        {
      path: o,
      autoRotate: s,
      unitX: i,
      unitY: a,
      x: h,
      y: g
    } = e,
        p = o[0],
        f = (u = e.start, c = "end" in e ? e.end : 1, t => u || 1 !== c ? T(t, u, c) : t);
    var u, c;

    if (this.rawPaths = l, this.target = t, (this.rotate = s || 0 === s) && (this.rOffset = parseFloat(s) || 0, this.radians = !!e.useRadians, this.rProp = e.rotation || "rotation", this.rSet = t._gsap.set(t, this.rProp, this), this.ru = at(t._gsap.get(t, this.rProp)) || 0), Array.isArray(o) && !("closed" in o) && "number" != typeof p) {
      for (r in p) !h && ~gt.indexOf(r) ? h = r : !g && ~pt.indexOf(r) && (g = r);

      for (r in h && g ? l.push(mt(this, ut(ut([], o, h, 0), o, g, 1), t, h, g, f, e, i || at(o[0][h]), a || at(o[0][g]))) : h = g = 0, p) r !== h && r !== g && l.push(mt(this, ut([], o, r, 2), t, r, 0, f, e, at(o[0][r])));
    } else n = f(Lt(P(e.path), t, e)), B(n, e.resolution), l.push(n), Pt(this, t, e.x || "x", n, "x", e.unitX || "px"), Pt(this, t, e.y || "y", n, "y", e.unitY || "px");
  },

  render(t, e) {
    let n = e.rawPaths,
        r = n.length,
        l = e._pt;

    for (t > 1 ? t = 1 : t < 0 && (t = 0); r--;) _(n[r], t, !r && e.rotate, n[r]);

    for (; l;) l.set(l.t, l.p, l.path[l.pp] + l.u, l.d, t), l = l._next;

    e.rotate && e.rSet(e.target, e.rProp, n[0].angle * (e.radians ? ft : 1) + e.rOffset + e.ru, e, t);
  },

  getLength: t => B(P(t)).totalLength,
  sliceRawPath: T,
  getRawPath: P,
  pointsToSegment: V,
  stringToRawPath: I,
  rawPathToString: z,
  transformRawPath: R,
  getGlobalMatrix: ot,
  getPositionOnPath: _,
  cacheRawPathMeasurements: B,
  convertToPath: (t, e) => ht(t).map(t => M(t, !1 !== e)),

  convertCoordinates(t, e, n) {
    let r = ot(e, !0, !0).multiply(ot(t));
    return n ? r.apply(n) : r;
  },

  getAlignMatrix: bt,

  getRelativePosition(t, e, n, r) {
    let l = bt(t, e, n, r);
    return {
      x: l.e,
      y: l.f
    };
  },

  arrayToRawPath(t, e) {
    let n = ut(ut([], t, (e = e || {}).x || "x", 0), t, e.y || "y", 1);
    return e.relative && dt(n), ["cubic" === e.type ? n : V(n, e.curviness)];
  }

};
exports.MotionPathPlugin = vt;
(st || "undefined" != typeof window && (st = window.gsap) && st.registerPlugin && st) && st.registerPlugin(vt);
var _default = vt;
exports.default = _default;
},{}],"node_modules/gsap-trial/GSDevTools.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.GSDevTools = void 0;

/*!
 * GSDevTools 3.10.4
 * https://greensock.com
 * 
 * @license Copyright 2022, GreenSock. All rights reserved.
 * *** DO NOT DEPLOY THIS FILE ***
 * This is a trial version that only works locally and on domains like codepen.io and codesandbox.io.
 * Loading it on an unauthorized domain violates the license and will cause a redirect.
 * Get the unrestricted file by joining Club GreenSock at https://greensock.com/club
 * @author: Jack Doyle, jack@greensock.com
 */
let e,
    t,
    o,
    i,
    n,
    l,
    s,
    r,
    a,
    d = "transform",
    c = d + "Origin",
    p = n => {
  let l = n.ownerDocument || n;
  !(d in n.style) && "msTransform" in n.style && (d = "msTransform", c = d + "Origin");

  for (; l.parentNode && (l = l.parentNode););

  if (t = window, s = new y(), l) {
    e = l, o = l.documentElement, i = l.body, r = e.createElementNS("http://www.w3.org/2000/svg", "g"), r.style.transform = "none";
    let t = l.createElement("div"),
        n = l.createElement("div");
    i.appendChild(t), t.appendChild(n), t.style.position = "static", t.style[d] = "translate3d(0,0,1px)", a = n.offsetParent !== t, i.removeChild(t);
  }

  return l;
},
    g = [],
    h = [],
    u = e => e.ownerSVGElement || ("svg" === (e.tagName + "").toLowerCase() ? e : null),
    m = e => "fixed" === t.getComputedStyle(e).position || ((e = e.parentNode) && 1 === e.nodeType ? m(e) : void 0),
    f = (t, o) => {
  if (t.parentNode && (e || p(t))) {
    let i = u(t),
        s = i ? i.getAttribute("xmlns") || "http://www.w3.org/2000/svg" : "http://www.w3.org/1999/xhtml",
        r = i ? o ? "rect" : "g" : "div",
        a = 2 !== o ? 0 : 100,
        d = 3 === o ? 100 : 0,
        c = "position:absolute;display:block;pointer-events:none;margin:0;padding:0;",
        p = e.createElementNS ? e.createElementNS(s.replace(/^https/, "http"), r) : e.createElement(r);
    return o && (i ? (l || (l = f(t)), p.setAttribute("width", .01), p.setAttribute("height", .01), p.setAttribute("transform", "translate(" + a + "," + d + ")"), l.appendChild(p)) : (n || (n = f(t), n.style.cssText = c), p.style.cssText = c + "width:0.1px;height:0.1px;top:" + d + "px;left:" + a + "px", n.appendChild(p))), p;
  }

  throw "Need document and parent.";
},
    x = (e, o) => {
  let i,
      p,
      m,
      x,
      v,
      w,
      b = u(e),
      T = e === b,
      k = b ? g : h,
      _ = e.parentNode;
  if (e === t) return e;
  if (k.length || k.push(f(e, 1), f(e, 2), f(e, 3)), i = b ? l : n, b) T ? (m = (e => {
    let t,
        o = e.getCTM();
    return o || (t = e.style[d], e.style[d] = "none", e.appendChild(r), o = r.getCTM(), e.removeChild(r), t ? e.style[d] = t : e.style.removeProperty(d.replace(/([A-Z])/g, "-$1").toLowerCase())), o || s.clone();
  })(e), x = -m.e / m.a, v = -m.f / m.d, p = s) : e.getBBox ? (m = e.getBBox(), p = e.transform ? e.transform.baseVal : {}, p = p.numberOfItems ? p.numberOfItems > 1 ? (e => {
    let t = new y(),
        o = 0;

    for (; o < e.numberOfItems; o++) t.multiply(e.getItem(o).matrix);

    return t;
  })(p) : p.getItem(0).matrix : s, x = p.a * m.x + p.c * m.y, v = p.b * m.x + p.d * m.y) : (p = new y(), x = v = 0), o && "g" === e.tagName.toLowerCase() && (x = v = 0), (T ? b : _).appendChild(i), i.setAttribute("transform", "matrix(" + p.a + "," + p.b + "," + p.c + "," + p.d + "," + (p.e + x) + "," + (p.f + v) + ")");else {
    if (x = v = 0, a) for (p = e.offsetParent, m = e; m && (m = m.parentNode) && m !== p && m.parentNode;) (t.getComputedStyle(m)[d] + "").length > 4 && (x = m.offsetLeft, v = m.offsetTop, m = 0);
    if (w = t.getComputedStyle(e), "absolute" !== w.position && "fixed" !== w.position) for (p = e.offsetParent; _ && _ !== p;) x += _.scrollLeft || 0, v += _.scrollTop || 0, _ = _.parentNode;
    m = i.style, m.top = e.offsetTop - v + "px", m.left = e.offsetLeft - x + "px", m[d] = w[d], m[c] = w[c], m.position = "fixed" === w.position ? "fixed" : "absolute", e.parentNode.appendChild(i);
  }
  return i;
},
    v = (e, t, o, i, n, l, s) => (e.a = t, e.b = o, e.c = i, e.d = n, e.e = l, e.f = s, e);

class y {
  constructor(e = 1, t = 0, o = 0, i = 1, n = 0, l = 0) {
    v(this, e, t, o, i, n, l);
  }

  inverse() {
    let {
      a: e,
      b: t,
      c: o,
      d: i,
      e: n,
      f: l
    } = this,
        s = e * i - t * o || 1e-10;
    return v(this, i / s, -t / s, -o / s, e / s, (o * l - i * n) / s, -(e * l - t * n) / s);
  }

  multiply(e) {
    let {
      a: t,
      b: o,
      c: i,
      d: n,
      e: l,
      f: s
    } = this,
        r = e.a,
        a = e.c,
        d = e.b,
        c = e.d,
        p = e.e,
        g = e.f;
    return v(this, r * t + d * i, r * o + d * n, a * t + c * i, a * o + c * n, l + p * t + g * i, s + p * o + g * n);
  }

  clone() {
    return new y(this.a, this.b, this.c, this.d, this.e, this.f);
  }

  equals(e) {
    let {
      a: t,
      b: o,
      c: i,
      d: n,
      e: l,
      f: s
    } = this;
    return t === e.a && o === e.b && i === e.c && n === e.d && l === e.e && s === e.f;
  }

  apply(e, t = {}) {
    let {
      x: o,
      y: i
    } = e,
        {
      a: n,
      b: l,
      c: s,
      d: r,
      e: a,
      f: d
    } = this;
    return t.x = o * n + i * s + a || 0, t.y = o * l + i * r + d || 0, t;
  }

}

function w(n, l, s, r) {
  if (!n || !n.parentNode || (e || p(n)).documentElement === n) return new y();

  let a = (e => {
    let t, o;

    for (; e && e !== i;) o = e._gsap, o && o.uncache && o.get(e, "x"), o && !o.scaleX && !o.scaleY && o.renderTransform && (o.scaleX = o.scaleY = 1e-4, o.renderTransform(1, o), t ? t.push(o) : t = [o]), e = e.parentNode;

    return t;
  })(n),
      d = u(n) ? g : h,
      c = x(n, s),
      f = d[0].getBoundingClientRect(),
      v = d[1].getBoundingClientRect(),
      w = d[2].getBoundingClientRect(),
      b = c.parentNode,
      T = !r && m(n),
      k = new y((v.left - f.left) / 100, (v.top - f.top) / 100, (w.left - f.left) / 100, (w.top - f.top) / 100, f.left + (T ? 0 : t.pageXOffset || e.scrollLeft || o.scrollLeft || i.scrollLeft || 0), f.top + (T ? 0 : t.pageYOffset || e.scrollTop || o.scrollTop || i.scrollTop || 0));

  if (b.removeChild(c), a) for (f = a.length; f--;) v = a[f], v.scaleX = v.scaleY = 0, v.renderTransform(1, v);
  return l ? k.inverse() : k;
}

let b,
    T,
    k,
    _,
    M,
    S,
    D,
    C,
    E,
    L,
    P,
    X,
    N,
    Y,
    H,
    z,
    B,
    R,
    I,
    O,
    A,
    F = () => "undefined" != typeof window,
    W = () => b || F() && (b = window.gsap) && b.registerPlugin && b,
    V = e => "function" == typeof e,
    G = e => "object" == typeof e,
    q = e => void 0 === e,
    K = () => !1,
    Z = "transform",
    j = "transformOrigin",
    U = e => Math.round(1e4 * e) / 1e4,
    $ = Array.isArray,
    J = (e, t) => {
  let o = k.createElementNS ? k.createElementNS((t || "http://www.w3.org/1999/xhtml").replace(/^https/, "http"), e) : k.createElement(e);
  return o.style ? o : k.createElement(e);
},
    Q = 180 / Math.PI,
    ee = 1e20,
    te = new y(),
    oe = Date.now || (() => new Date().getTime()),
    ie = [],
    ne = {},
    le = 0,
    se = /^(?:a|input|textarea|button|select)$/i,
    re = 0,
    ae = {},
    de = {},
    ce = (e, t) => {
  let o,
      i = {};

  for (o in e) i[o] = t ? e[o] * t : e[o];

  return i;
},
    pe = (e, t) => {
  let o,
      i = e.length;

  for (; i--;) t ? e[i].style.touchAction = t : e[i].style.removeProperty("touch-action"), o = e[i].children, o && o.length && pe(o, t);
},
    ge = () => ie.forEach(e => e()),
    he = () => !ie.length && b.ticker.remove(ge),
    ue = e => {
  let t = ie.length;

  for (; t--;) ie[t] === e && ie.splice(t, 1);

  b.to(he, {
    overwrite: !0,
    delay: 15,
    duration: 0,
    onComplete: he,
    data: "_draggable"
  });
},
    me = (e, t, o, i) => {
  if (e.addEventListener) {
    let n = N[t];
    i = i || (P ? {
      passive: !1
    } : null), e.addEventListener(n || t, o, i), n && t !== n && e.addEventListener(t, o, i);
  }
},
    fe = (e, t, o) => {
  if (e.removeEventListener) {
    let i = N[t];
    e.removeEventListener(i || t, o), i && t !== i && e.removeEventListener(t, o);
  }
},
    xe = e => {
  e.preventDefault && e.preventDefault(), e.preventManipulation && e.preventManipulation();
},
    ve = e => {
  H = e.touches && Y < e.touches.length, fe(e.target, "touchend", ve);
},
    ye = e => {
  H = e.touches && Y < e.touches.length, me(e.target, "touchend", ve);
},
    we = e => T.pageYOffset || e.scrollTop || e.documentElement.scrollTop || e.body.scrollTop || 0,
    be = e => T.pageXOffset || e.scrollLeft || e.documentElement.scrollLeft || e.body.scrollLeft || 0,
    Te = (e, t) => {
  me(e, "scroll", t), _e(e.parentNode) || Te(e.parentNode, t);
},
    ke = (e, t) => {
  fe(e, "scroll", t), _e(e.parentNode) || ke(e.parentNode, t);
},
    _e = e => !(e && e !== _ && 9 !== e.nodeType && e !== k.body && e !== T && e.nodeType && e.parentNode),
    Me = (e, t) => {
  let o = "x" === t ? "Width" : "Height",
      i = "scroll" + o,
      n = "client" + o;
  return Math.max(0, _e(e) ? Math.max(_[i], M[i]) - (T["inner" + o] || _[n] || M[n]) : e[i] - e[n]);
},
    Se = (e, t) => {
  let o = Me(e, "x"),
      i = Me(e, "y");
  _e(e) ? e = de : Se(e.parentNode, t), e._gsMaxScrollX = o, e._gsMaxScrollY = i, t || (e._gsScrollX = e.scrollLeft || 0, e._gsScrollY = e.scrollTop || 0);
},
    De = (e, t, o) => {
  let i = e.style;
  i && (q(i[t]) && (t = E(t, e) || t), null == o ? i.removeProperty && i.removeProperty(t.replace(/([A-Z])/g, "-$1").toLowerCase()) : i[t] = o);
},
    Ce = e => T.getComputedStyle(e instanceof Element ? e : e.host || (e.parentNode || {}).host || e),
    Ee = {},
    Le = e => {
  if (e === T) return Ee.left = Ee.top = 0, Ee.width = Ee.right = _.clientWidth || e.innerWidth || M.clientWidth || 0, Ee.height = Ee.bottom = (e.innerHeight || 0) - 20 < _.clientHeight ? _.clientHeight : e.innerHeight || M.clientHeight || 0, Ee;
  let t = e.ownerDocument || k,
      o = q(e.pageX) ? e.nodeType || q(e.left) || q(e.top) ? L(e)[0].getBoundingClientRect() : e : {
    left: e.pageX - be(t),
    top: e.pageY - we(t),
    right: e.pageX - be(t) + 1,
    bottom: e.pageY - we(t) + 1
  };
  return q(o.right) && !q(o.width) ? (o.right = o.left + o.width, o.bottom = o.top + o.height) : q(o.width) && (o = {
    width: o.right - o.left,
    height: o.bottom - o.top,
    right: o.right,
    left: o.left,
    bottom: o.bottom,
    top: o.top
  }), o;
},
    Pe = (e, t, o) => {
  let i,
      n = e.vars,
      l = n[o],
      s = e._listeners[t];
  return V(l) && (i = l.apply(n.callbackScope || e, n[o + "Params"] || [e.pointerEvent])), s && !1 === e.dispatchEvent(t) && (i = !1), i;
},
    Xe = (e, t) => {
  let o,
      i,
      n,
      l = L(e)[0];
  return l.nodeType || l === T ? Ye(l, t) : q(e.left) ? (i = e.min || e.minX || e.minRotation || 0, o = e.min || e.minY || 0, {
    left: i,
    top: o,
    width: (e.max || e.maxX || e.maxRotation || 0) - i,
    height: (e.max || e.maxY || 0) - o
  }) : (n = {
    x: 0,
    y: 0
  }, {
    left: e.left - n.x,
    top: e.top - n.y,
    width: e.width,
    height: e.height
  });
},
    Ne = {},
    Ye = (e, t) => {
  t = L(t)[0];
  let o,
      i,
      n,
      l,
      s,
      r,
      a,
      d,
      c,
      p,
      g,
      h,
      u,
      m,
      f = e.getBBox && e.ownerSVGElement,
      x = e.ownerDocument || k;
  if (e === T) n = we(x), o = be(x), i = o + (x.documentElement.clientWidth || e.innerWidth || x.body.clientWidth || 0), l = n + ((e.innerHeight || 0) - 20 < x.documentElement.clientHeight ? x.documentElement.clientHeight : e.innerHeight || x.body.clientHeight || 0);else {
    if (t === T || q(t)) return e.getBoundingClientRect();
    o = n = 0, f ? (p = e.getBBox(), g = p.width, h = p.height) : (e.viewBox && (p = e.viewBox.baseVal) && (o = p.x || 0, n = p.y || 0, g = p.width, h = p.height), g || (u = Ce(e), p = "border-box" === u.boxSizing, g = (parseFloat(u.width) || e.clientWidth || 0) + (p ? 0 : parseFloat(u.borderLeftWidth) + parseFloat(u.borderRightWidth)), h = (parseFloat(u.height) || e.clientHeight || 0) + (p ? 0 : parseFloat(u.borderTopWidth) + parseFloat(u.borderBottomWidth)))), i = g, l = h;
  }
  return e === t ? {
    left: o,
    top: n,
    width: i - o,
    height: l - n
  } : (s = w(t, !0).multiply(w(e)), r = s.apply({
    x: o,
    y: n
  }), a = s.apply({
    x: i,
    y: n
  }), d = s.apply({
    x: i,
    y: l
  }), c = s.apply({
    x: o,
    y: l
  }), o = Math.min(r.x, a.x, d.x, c.x), n = Math.min(r.y, a.y, d.y, c.y), m = t.parentNode || {}, {
    left: o + (m.scrollLeft || 0),
    top: n + (m.scrollTop || 0),
    width: Math.max(r.x, a.x, d.x, c.x) - o,
    height: Math.max(r.y, a.y, d.y, c.y) - n
  });
},
    He = (e, t, o, i, n, l) => {
  let s,
      r,
      a,
      d = {};
  if (t) if (1 !== n && t instanceof Array) {
    if (d.end = s = [], a = t.length, G(t[0])) for (r = 0; r < a; r++) s[r] = ce(t[r], n);else for (r = 0; r < a; r++) s[r] = t[r] * n;
    o += 1.1, i -= 1.1;
  } else V(t) ? d.end = o => {
    let i,
        l,
        s = t.call(e, o);
    if (1 !== n) if (G(s)) {
      for (l in i = {}, s) i[l] = s[l] * n;

      s = i;
    } else s *= n;
    return s;
  } : d.end = t;
  return (o || 0 === o) && (d.max = o), (i || 0 === i) && (d.min = i), l && (d.velocity = 0), d;
},
    ze = e => {
  let t;
  return !(!e || !e.getAttribute || e === M) && (!("true" !== (t = e.getAttribute("data-clickable")) && ("false" === t || !e.onclick && !se.test(e.nodeName + "") && "true" !== e.getAttribute("contentEditable"))) || ze(e.parentNode));
},
    Be = (e, t) => {
  let o,
      i = e.length;

  for (; i--;) o = e[i], o.ondragstart = o.onselectstart = t ? null : K, b.set(o, {
    lazy: !0,
    userSelect: t ? "text" : "none"
  });
},
    Re = e => "fixed" === Ce(e).position || ((e = e.parentNode) && 1 === e.nodeType ? Re(e) : void 0),
    Ie = function (e, t) {
  e = b.utils.toArray(e)[0], t = t || {};
  let o,
      i,
      n,
      l,
      s,
      r,
      a = document.createElement("div"),
      d = a.style,
      c = e.firstChild,
      p = 0,
      g = 0,
      h = e.scrollTop,
      u = e.scrollLeft,
      m = e.scrollWidth,
      f = e.scrollHeight,
      x = 0,
      v = 0,
      y = 0;
  O && !1 !== t.force3D ? (s = "translate3d(", r = "px,0px)") : Z && (s = "translate(", r = "px)"), this.scrollTop = function (e, t) {
    if (!arguments.length) return -this.top();
    this.top(-e, t);
  }, this.scrollLeft = function (e, t) {
    if (!arguments.length) return -this.left();
    this.left(-e, t);
  }, this.left = function (o, i) {
    if (!arguments.length) return -(e.scrollLeft + g);
    let n = e.scrollLeft - u,
        l = g;
    if ((n > 2 || n < -2) && !i) return u = e.scrollLeft, b.killTweensOf(this, {
      left: 1,
      scrollLeft: 1
    }), this.left(-u), void (t.onKill && t.onKill());
    (o = -o) < 0 ? (g = o - .5 | 0, o = 0) : o > v ? (g = o - v | 0, o = v) : g = 0, (g || l) && (this._skip || (d[Z] = s + -g + "px," + -p + r), g + x >= 0 && (d.paddingRight = g + x + "px")), e.scrollLeft = 0 | o, u = e.scrollLeft;
  }, this.top = function (o, i) {
    if (!arguments.length) return -(e.scrollTop + p);
    let n = e.scrollTop - h,
        l = p;
    if ((n > 2 || n < -2) && !i) return h = e.scrollTop, b.killTweensOf(this, {
      top: 1,
      scrollTop: 1
    }), this.top(-h), void (t.onKill && t.onKill());
    (o = -o) < 0 ? (p = o - .5 | 0, o = 0) : o > y ? (p = o - y | 0, o = y) : p = 0, (p || l) && (this._skip || (d[Z] = s + -g + "px," + -p + r)), e.scrollTop = 0 | o, h = e.scrollTop;
  }, this.maxScrollTop = () => y, this.maxScrollLeft = () => v, this.disable = function () {
    for (c = a.firstChild; c;) l = c.nextSibling, e.appendChild(c), c = l;

    e === a.parentNode && e.removeChild(a);
  }, this.enable = function () {
    if (c = e.firstChild, c !== a) {
      for (; c;) l = c.nextSibling, a.appendChild(c), c = l;

      e.appendChild(a), this.calibrate();
    }
  }, this.calibrate = function (t) {
    let l,
        s,
        r,
        c = e.clientWidth === o;
    h = e.scrollTop, u = e.scrollLeft, c && e.clientHeight === i && a.offsetHeight === n && m === e.scrollWidth && f === e.scrollHeight && !t || ((p || g) && (s = this.left(), r = this.top(), this.left(-e.scrollLeft), this.top(-e.scrollTop)), l = Ce(e), c && !t || (d.display = "block", d.width = "auto", d.paddingRight = "0px", x = Math.max(0, e.scrollWidth - e.clientWidth), x && (x += parseFloat(l.paddingLeft) + (A ? parseFloat(l.paddingRight) : 0))), d.display = "inline-block", d.position = "relative", d.overflow = "visible", d.verticalAlign = "top", d.boxSizing = "content-box", d.width = "100%", d.paddingRight = x + "px", A && (d.paddingBottom = l.paddingBottom), o = e.clientWidth, i = e.clientHeight, m = e.scrollWidth, f = e.scrollHeight, v = e.scrollWidth - o, y = e.scrollHeight - i, n = a.offsetHeight, d.display = "block", (s || r) && (this.left(s), this.top(r)));
  }, this.content = a, this.element = e, this._skip = !1, this.enable();
},
    Oe = e => {
  if (F() && document.body) {
    let e = window && window.navigator;
    T = window, k = document, _ = k.documentElement, M = k.body, S = J("div"), I = !!window.PointerEvent, D = J("div"), D.style.cssText = "visibility:hidden;height:1px;top:-1px;pointer-events:none;position:relative;clear:both;cursor:grab", R = "grab" === D.style.cursor ? "grab" : "move", z = e && -1 !== e.userAgent.toLowerCase().indexOf("android"), X = "ontouchstart" in _ && "orientation" in T || e && (e.MaxTouchPoints > 0 || e.msMaxTouchPoints > 0), A = function () {
      let e,
          t = J("div"),
          o = J("div"),
          i = o.style,
          n = M;
      return i.display = "inline-block", i.position = "relative", t.style.cssText = o.innerHTML = "width:90px;height:40px;padding:10px;overflow:auto;visibility:hidden", t.appendChild(o), n.appendChild(t), e = o.offsetHeight + 18 > t.scrollHeight, n.removeChild(t), e;
    }(), N = function (e) {
      let t = e.split(","),
          o = ("onpointerdown" in S ? "pointerdown,pointermove,pointerup,pointercancel" : "onmspointerdown" in S ? "MSPointerDown,MSPointerMove,MSPointerUp,MSPointerCancel" : e).split(","),
          i = {},
          n = 4;

      for (; --n > -1;) i[t[n]] = o[n], i[o[n]] = t[n];

      try {
        _.addEventListener("test", null, Object.defineProperty({}, "passive", {
          get: function () {
            P = 1;
          }
        }));
      } catch (e) {}

      return i;
    }("touchstart,touchmove,touchend,touchcancel"), me(k, "touchcancel", K), me(T, "touchmove", K), M && M.addEventListener("touchstart", K), me(k, "contextmenu", function () {
      for (let e in ne) ne[e].isPressed && ne[e].endDrag();
    }), b = C = W();
  }

  b ? (B = b.plugins.inertia, E = b.utils.checkPrefix, Z = E(Z), j = E(j), L = b.utils.toArray, O = !!E("perspective")) : e && console.warn("Please gsap.registerPlugin(Draggable)");
};

class Ae extends class {
  constructor(e) {
    this._listeners = {}, this.target = e || this;
  }

  addEventListener(e, t) {
    let o = this._listeners[e] || (this._listeners[e] = []);
    ~o.indexOf(t) || o.push(t);
  }

  removeEventListener(e, t) {
    let o = this._listeners[e],
        i = o && o.indexOf(t) || -1;
    i > -1 && o.splice(i, 1);
  }

  dispatchEvent(e) {
    let t;
    return (this._listeners[e] || []).forEach(o => !1 === o.call(this, {
      type: e,
      target: this.target
    }) && (t = !1)), t;
  }

} {
  constructor(e, t) {
    super(), C || Oe(1), e = L(e)[0], B || (B = b.plugins.inertia), this.vars = t = ce(t || {}), this.target = e, this.x = this.y = this.rotation = 0, this.dragResistance = parseFloat(t.dragResistance) || 0, this.edgeResistance = isNaN(t.edgeResistance) ? 1 : parseFloat(t.edgeResistance) || 0, this.lockAxis = t.lockAxis, this.autoScroll = t.autoScroll || 0, this.lockedAxis = null, this.allowEventDefault = !!t.allowEventDefault, b.getProperty(e, "x");

    let o,
        i,
        n,
        l,
        s,
        r,
        a,
        d,
        c,
        p,
        g,
        h,
        u,
        m,
        f,
        x,
        v,
        M,
        S,
        E,
        P,
        O,
        A,
        F,
        W,
        K,
        Z,
        J,
        se,
        he,
        ve,
        Me,
        Ee = (t.type || "x,y").toLowerCase(),
        Ye = ~Ee.indexOf("x") || ~Ee.indexOf("y"),
        Fe = -1 !== Ee.indexOf("rotation"),
        We = Fe ? "rotation" : Ye ? "x" : "left",
        Ve = Ye ? "y" : "top",
        Ge = !(!~Ee.indexOf("x") && !~Ee.indexOf("left") && "scroll" !== Ee),
        qe = !(!~Ee.indexOf("y") && !~Ee.indexOf("top") && "scroll" !== Ee),
        Ke = t.minimumMovement || 2,
        Ze = this,
        je = L(t.trigger || t.handle || e),
        Ue = {},
        $e = 0,
        Je = !1,
        Qe = t.autoScrollMarginTop || 40,
        et = t.autoScrollMarginRight || 40,
        tt = t.autoScrollMarginBottom || 40,
        ot = t.autoScrollMarginLeft || 40,
        it = t.clickableTest || ze,
        nt = 0,
        lt = e._gsap || b.core.getCache(e),
        st = Re(e),
        rt = (t, o) => parseFloat(lt.get(e, t, o)),
        at = e.ownerDocument || k,
        dt = e => (xe(e), e.stopImmediatePropagation && e.stopImmediatePropagation(), !1),
        ct = t => {
      if (Ze.autoScroll && Ze.isDragging && (Je || v)) {
        let t,
            o,
            i,
            n,
            l,
            s,
            r,
            a,
            d = e,
            c = 15 * Ze.autoScroll;

        for (Je = !1, de.scrollTop = null != T.pageYOffset ? T.pageYOffset : null != at.documentElement.scrollTop ? at.documentElement.scrollTop : at.body.scrollTop, de.scrollLeft = null != T.pageXOffset ? T.pageXOffset : null != at.documentElement.scrollLeft ? at.documentElement.scrollLeft : at.body.scrollLeft, n = Ze.pointerX - de.scrollLeft, l = Ze.pointerY - de.scrollTop; d && !o;) o = _e(d.parentNode), t = o ? de : d.parentNode, i = o ? {
          bottom: Math.max(_.clientHeight, T.innerHeight || 0),
          right: Math.max(_.clientWidth, T.innerWidth || 0),
          left: 0,
          top: 0
        } : t.getBoundingClientRect(), s = r = 0, qe && (a = t._gsMaxScrollY - t.scrollTop, a < 0 ? r = a : l > i.bottom - tt && a ? (Je = !0, r = Math.min(a, c * (1 - Math.max(0, i.bottom - l) / tt) | 0)) : l < i.top + Qe && t.scrollTop && (Je = !0, r = -Math.min(t.scrollTop, c * (1 - Math.max(0, l - i.top) / Qe) | 0)), r && (t.scrollTop += r)), Ge && (a = t._gsMaxScrollX - t.scrollLeft, a < 0 ? s = a : n > i.right - et && a ? (Je = !0, s = Math.min(a, c * (1 - Math.max(0, i.right - n) / et) | 0)) : n < i.left + ot && t.scrollLeft && (Je = !0, s = -Math.min(t.scrollLeft, c * (1 - Math.max(0, n - i.left) / ot) | 0)), s && (t.scrollLeft += s)), o && (s || r) && (T.scrollTo(t.scrollLeft, t.scrollTop), kt(Ze.pointerX + s, Ze.pointerY + r)), d = t;
      }

      if (v) {
        let {
          x: o,
          y: n
        } = Ze;
        Fe ? (Ze.deltaX = o - parseFloat(lt.rotation), Ze.rotation = o, lt.rotation = o + "deg", lt.renderTransform(1, lt)) : i ? (qe && (Ze.deltaY = n - i.top(), i.top(n)), Ge && (Ze.deltaX = o - i.left(), i.left(o))) : Ye ? (qe && (Ze.deltaY = n - parseFloat(lt.y), lt.y = n + "px"), Ge && (Ze.deltaX = o - parseFloat(lt.x), lt.x = o + "px"), lt.renderTransform(1, lt)) : (qe && (Ze.deltaY = n - parseFloat(e.style.top || 0), e.style.top = n + "px"), Ge && (Ze.deltaX = o - parseFloat(e.style.left || 0), e.style.left = o + "px")), !d || t || J || (J = !0, !1 === Pe(Ze, "drag", "onDrag") && (Ge && (Ze.x -= Ze.deltaX), qe && (Ze.y -= Ze.deltaY), ct(!0)), J = !1);
      }

      v = !1;
    },
        pt = (t, o) => {
      let n,
          l,
          {
        x: s,
        y: r
      } = Ze;
      e._gsap || (lt = b.core.getCache(e)), lt.uncache && b.getProperty(e, "x"), Ye ? (Ze.x = parseFloat(lt.x), Ze.y = parseFloat(lt.y)) : Fe ? Ze.x = Ze.rotation = parseFloat(lt.rotation) : i ? (Ze.y = i.top(), Ze.x = i.left()) : (Ze.y = parseFloat(e.style.top || (l = Ce(e)) && l.top) || 0, Ze.x = parseFloat(e.style.left || (l || {}).left) || 0), (S || E || P) && !o && (Ze.isDragging || Ze.isThrowing) && (P && (ae.x = Ze.x, ae.y = Ze.y, n = P(ae), n.x !== Ze.x && (Ze.x = n.x, v = !0), n.y !== Ze.y && (Ze.y = n.y, v = !0)), S && (n = S(Ze.x), n !== Ze.x && (Ze.x = n, Fe && (Ze.rotation = n), v = !0)), E && (n = E(Ze.y), n !== Ze.y && (Ze.y = n), v = !0)), v && ct(!0), t || (Ze.deltaX = Ze.x - s, Ze.deltaY = Ze.y - r, Pe(Ze, "throwupdate", "onThrowUpdate"));
    },
        gt = (e, t, o, i) => (null == t && (t = -ee), null == o && (o = ee), V(e) ? n => {
      let l = Ze.isPressed ? 1 - Ze.edgeResistance : 1;
      return e.call(Ze, n > o ? o + (n - o) * l : n < t ? t + (n - t) * l : n) * i;
    } : $(e) ? i => {
      let n,
          l,
          s = e.length,
          r = 0,
          a = ee;

      for (; --s > -1;) n = e[s], l = n - i, l < 0 && (l = -l), l < a && n >= t && n <= o && (r = s, a = l);

      return e[r];
    } : isNaN(e) ? e => e : () => e * i),
        ht = () => {
      let o, n, l, s;
      a = !1, i ? (i.calibrate(), Ze.minX = g = -i.maxScrollLeft(), Ze.minY = u = -i.maxScrollTop(), Ze.maxX = p = Ze.maxY = h = 0, a = !0) : t.bounds && (o = Xe(t.bounds, e.parentNode), Fe ? (Ze.minX = g = o.left, Ze.maxX = p = o.left + o.width, Ze.minY = u = Ze.maxY = h = 0) : q(t.bounds.maxX) && q(t.bounds.maxY) ? (n = Xe(e, e.parentNode), Ze.minX = g = Math.round(rt(We, "px") + o.left - n.left), Ze.minY = u = Math.round(rt(Ve, "px") + o.top - n.top), Ze.maxX = p = Math.round(g + (o.width - n.width)), Ze.maxY = h = Math.round(u + (o.height - n.height))) : (o = t.bounds, Ze.minX = g = o.minX, Ze.minY = u = o.minY, Ze.maxX = p = o.maxX, Ze.maxY = h = o.maxY), g > p && (Ze.minX = p, Ze.maxX = p = g, g = Ze.minX), u > h && (Ze.minY = h, Ze.maxY = h = u, u = Ze.minY), Fe && (Ze.minRotation = g, Ze.maxRotation = p), a = !0), t.liveSnap && (l = !0 === t.liveSnap ? t.snap || {} : t.liveSnap, s = $(l) || V(l), Fe ? (S = gt(s ? l : l.rotation, g, p, 1), E = null) : l.points ? P = ((e, t, o, i, n, l, s) => (l = l && l < ee ? l * l : ee, V(e) ? r => {
        let a,
            d,
            c,
            p = Ze.isPressed ? 1 - Ze.edgeResistance : 1,
            g = r.x,
            h = r.y;
        return r.x = g = g > o ? o + (g - o) * p : g < t ? t + (g - t) * p : g, r.y = h = h > n ? n + (h - n) * p : h < i ? i + (h - i) * p : h, a = e.call(Ze, r), a !== r && (r.x = a.x, r.y = a.y), 1 !== s && (r.x *= s, r.y *= s), l < ee && (d = r.x - g, c = r.y - h, d * d + c * c > l && (r.x = g, r.y = h)), r;
      } : $(e) ? t => {
        let o,
            i,
            n,
            s,
            r = e.length,
            a = 0,
            d = ee;

        for (; --r > -1;) n = e[r], o = n.x - t.x, i = n.y - t.y, s = o * o + i * i, s < d && (a = r, d = s);

        return d <= l ? e[a] : t;
      } : e => e))(s ? l : l.points, g, p, u, h, l.radius, i ? -1 : 1) : (Ge && (S = gt(s ? l : l.x || l.left || l.scrollLeft, g, p, i ? -1 : 1)), qe && (E = gt(s ? l : l.y || l.top || l.scrollTop, u, h, i ? -1 : 1))));
    },
        ut = () => {
      Ze.isThrowing = !1, Pe(Ze, "throwcomplete", "onThrowComplete");
    },
        mt = () => {
      Ze.isThrowing = !1;
    },
        ft = (o, n) => {
      let l, s, r, d;
      o && B ? (!0 === o && (l = t.snap || t.liveSnap || {}, s = $(l) || V(l), o = {
        resistance: (t.throwResistance || t.resistance || 1e3) / (Fe ? 10 : 1)
      }, Fe ? o.rotation = He(Ze, s ? l : l.rotation, p, g, 1, n) : (Ge && (o[We] = He(Ze, s ? l : l.points || l.x || l.left, p, g, i ? -1 : 1, n || "x" === Ze.lockedAxis)), qe && (o[Ve] = He(Ze, s ? l : l.points || l.y || l.top, h, u, i ? -1 : 1, n || "y" === Ze.lockedAxis)), (l.points || $(l) && G(l[0])) && (o.linkedProps = We + "," + Ve, o.radius = l.radius))), Ze.isThrowing = !0, d = isNaN(t.overshootTolerance) ? 1 === t.edgeResistance ? 0 : 1 - Ze.edgeResistance + .2 : t.overshootTolerance, o.duration || (o.duration = {
        max: Math.max(t.minDuration || 0, "maxDuration" in t ? t.maxDuration : 2),
        min: isNaN(t.minDuration) ? 0 === d || G(o) && o.resistance > 1e3 ? 0 : .5 : t.minDuration,
        overshoot: d
      }), Ze.tween = r = b.to(i || e, {
        inertia: o,
        data: "_draggable",
        onComplete: ut,
        onInterrupt: mt,
        onUpdate: t.fastMode ? Pe : pt,
        onUpdateParams: t.fastMode ? [Ze, "onthrowupdate", "onThrowUpdate"] : l && l.radius ? [!1, !0] : []
      }), t.fastMode || (i && (i._skip = !0), r.render(1e9, !0, !0), pt(!0, !0), Ze.endX = Ze.x, Ze.endY = Ze.y, Fe && (Ze.endRotation = Ze.x), r.play(0), pt(!0, !0), i && (i._skip = !1))) : a && Ze.applyBounds();
    },
        xt = t => {
      let o,
          i = F;
      F = w(e.parentNode, !0), t && Ze.isPressed && !F.equals(i || new y()) && (o = i.inverse().apply({
        x: n,
        y: l
      }), F.apply(o, o), n = o.x, l = o.y), F.equals(te) && (F = null);
    },
        vt = () => {
      let t,
          o,
          d,
          c = 1 - Ze.edgeResistance,
          m = st ? be(at) : 0,
          f = st ? we(at) : 0;
      xt(!1), Ne.x = Ze.pointerX - m, Ne.y = Ze.pointerY - f, F && F.apply(Ne, Ne), n = Ne.x, l = Ne.y, v && (kt(Ze.pointerX, Ze.pointerY), ct(!0)), Me = w(e), i ? (ht(), r = i.top(), s = i.left()) : (yt() ? (pt(!0, !0), ht()) : Ze.applyBounds(), Fe ? (t = e.ownerSVGElement ? [lt.xOrigin - e.getBBox().x, lt.yOrigin - e.getBBox().y] : (Ce(e)[j] || "0 0").split(" "), x = Ze.rotationOrigin = w(e).apply({
        x: parseFloat(t[0]) || 0,
        y: parseFloat(t[1]) || 0
      }), pt(!0, !0), o = Ze.pointerX - x.x - m, d = x.y - Ze.pointerY + f, s = Ze.x, r = Ze.y = Math.atan2(d, o) * Q) : (r = rt(Ve, "px"), s = rt(We, "px"))), a && c && (s > p ? s = p + (s - p) / c : s < g && (s = g - (g - s) / c), Fe || (r > h ? r = h + (r - h) / c : r < u && (r = u - (u - r) / c))), Ze.startX = s = U(s), Ze.startY = r = U(r);
    },
        yt = () => Ze.tween && Ze.tween.isActive(),
        wt = () => {
      !D.parentNode || yt() || Ze.isDragging || D.parentNode.removeChild(D);
    },
        bt = (s, r) => {
      let a;
      if (!o || Ze.isPressed || !s || !("mousedown" !== s.type && "pointerdown" !== s.type || r) && oe() - nt < 30 && N[Ze.pointerEvent.type]) ve && s && o && xe(s);else {
        if (W = yt(), Ze.pointerEvent = s, N[s.type] ? (A = ~s.type.indexOf("touch") ? s.currentTarget || s.target : at, me(A, "touchend", _t), me(A, "touchmove", Tt), me(A, "touchcancel", _t), me(at, "touchstart", ye)) : (A = null, me(at, "mousemove", Tt)), Z = null, I && A || (me(at, "mouseup", _t), s && s.target && me(s.target, "mouseup", _t)), O = it.call(Ze, s.target) && !1 === t.dragClickables && !r, O) return me(s.target, "change", _t), Pe(Ze, "pressInit", "onPressInit"), Pe(Ze, "press", "onPress"), Be(je, !0), void (ve = !1);
        var p;
        if (K = !(!A || Ge === qe || !1 === Ze.vars.allowNativeTouchScrolling || Ze.vars.allowContextMenu && s && (s.ctrlKey || s.which > 2)) && (Ge ? "y" : "x"), ve = !K && !Ze.allowEventDefault, ve && (xe(s), me(T, "touchforcechange", xe)), s.changedTouches ? (s = m = s.changedTouches[0], f = s.identifier) : s.pointerId ? f = s.pointerId : m = f = null, Y++, p = ct, ie.push(p), 1 === ie.length && b.ticker.add(ge), l = Ze.pointerY = s.pageY, n = Ze.pointerX = s.pageX, Pe(Ze, "pressInit", "onPressInit"), (K || Ze.autoScroll) && Se(e.parentNode), !e.parentNode || !Ze.autoScroll || i || Fe || !e.parentNode._gsMaxScrollX || D.parentNode || e.getBBox || (D.style.width = e.parentNode.scrollWidth + "px", e.parentNode.appendChild(D)), vt(), Ze.tween && Ze.tween.kill(), Ze.isThrowing = !1, b.killTweensOf(i || e, Ue, !0), i && b.killTweensOf(e, {
          scrollTo: 1
        }, !0), Ze.tween = Ze.lockedAxis = null, (t.zIndexBoost || !Fe && !i && !1 !== t.zIndexBoost) && (e.style.zIndex = Ae.zIndex++), Ze.isPressed = !0, d = !(!t.onDrag && !Ze._listeners.drag), c = !(!t.onMove && !Ze._listeners.move), !1 !== t.cursor || t.activeCursor) for (a = je.length; --a > -1;) b.set(je[a], {
          cursor: t.activeCursor || t.cursor || ("grab" === R ? "grabbing" : R)
        });
        Pe(Ze, "press", "onPress");
      }
    },
        Tt = t => {
      let i,
          s,
          r,
          a,
          d,
          p,
          g = t;

      if (o && !H && Ze.isPressed && t) {
        if (Ze.pointerEvent = t, i = t.changedTouches, i) {
          if ((t = i[0]) !== m && t.identifier !== f) {
            for (a = i.length; --a > -1 && (t = i[a]).identifier !== f && t.target !== e;);

            if (a < 0) return;
          }
        } else if (t.pointerId && f && t.pointerId !== f) return;

        A && K && !Z && (Ne.x = t.pageX - (st ? be(at) : 0), Ne.y = t.pageY - (st ? we(at) : 0), F && F.apply(Ne, Ne), s = Ne.x, r = Ne.y, d = Math.abs(s - n), p = Math.abs(r - l), (d !== p && (d > Ke || p > Ke) || z && K === Z) && (Z = d > p && Ge ? "x" : "y", K && Z !== K && me(T, "touchforcechange", xe), !1 !== Ze.vars.lockAxisOnTouchScroll && Ge && qe && (Ze.lockedAxis = "x" === Z ? "y" : "x", V(Ze.vars.onLockAxis) && Ze.vars.onLockAxis.call(Ze, g)), z && K === Z)) ? _t(g) : (Ze.allowEventDefault || K && (!Z || K === Z) || !1 === g.cancelable ? ve && (ve = !1) : (xe(g), ve = !0), Ze.autoScroll && (Je = !0), kt(t.pageX, t.pageY, c));
      } else ve && t && o && xe(t);
    },
        kt = (e, t, o) => {
      let i,
          d,
          c,
          m,
          f,
          y,
          w = 1 - Ze.dragResistance,
          b = 1 - Ze.edgeResistance,
          T = Ze.pointerX,
          k = Ze.pointerY,
          _ = r,
          M = Ze.x,
          D = Ze.y,
          C = Ze.endX,
          L = Ze.endY,
          X = Ze.endRotation,
          N = v;
      Ze.pointerX = e, Ze.pointerY = t, st && (e -= be(at), t -= we(at)), Fe ? (m = Math.atan2(x.y - t, e - x.x) * Q, f = Ze.y - m, f > 180 ? (r -= 360, Ze.y = m) : f < -180 && (r += 360, Ze.y = m), Ze.x !== s || Math.abs(r - m) > Ke ? (Ze.y = m, c = s + (r - m) * w) : c = s) : (F && (y = e * F.a + t * F.c + F.e, t = e * F.b + t * F.d + F.f, e = y), d = t - l, i = e - n, d < Ke && d > -Ke && (d = 0), i < Ke && i > -Ke && (i = 0), (Ze.lockAxis || Ze.lockedAxis) && (i || d) && (y = Ze.lockedAxis, y || (Ze.lockedAxis = y = Ge && Math.abs(i) > Math.abs(d) ? "y" : qe ? "x" : null, y && V(Ze.vars.onLockAxis) && Ze.vars.onLockAxis.call(Ze, Ze.pointerEvent)), "y" === y ? d = 0 : "x" === y && (i = 0)), c = U(s + i * w), m = U(r + d * w)), (S || E || P) && (Ze.x !== c || Ze.y !== m && !Fe) && (P && (ae.x = c, ae.y = m, y = P(ae), c = U(y.x), m = U(y.y)), S && (c = U(S(c))), E && (m = U(E(m)))), a && (c > p ? c = p + Math.round((c - p) * b) : c < g && (c = g + Math.round((c - g) * b)), Fe || (m > h ? m = Math.round(h + (m - h) * b) : m < u && (m = Math.round(u + (m - u) * b)))), (Ze.x !== c || Ze.y !== m && !Fe) && (Fe ? (Ze.endRotation = Ze.x = Ze.endX = c, v = !0) : (qe && (Ze.y = Ze.endY = m, v = !0), Ge && (Ze.x = Ze.endX = c, v = !0)), o && !1 === Pe(Ze, "move", "onMove") ? (Ze.pointerX = T, Ze.pointerY = k, r = _, Ze.x = M, Ze.y = D, Ze.endX = C, Ze.endY = L, Ze.endRotation = X, v = N) : !Ze.isDragging && Ze.isPressed && (Ze.isDragging = !0, Pe(Ze, "dragstart", "onDragStart")));
    },
        _t = (i, n) => {
      if (!o || !Ze.isPressed || i && null != f && !n && (i.pointerId && i.pointerId !== f && i.target !== e || i.changedTouches && !((e, t) => {
        let o = e.length;

        for (; o--;) if (e[o].identifier === t) return !0;
      })(i.changedTouches, f))) return void (ve && i && o && xe(i));
      Ze.isPressed = !1;
      let l,
          s,
          r,
          a,
          d,
          c = i,
          p = Ze.isDragging,
          g = Ze.vars.allowContextMenu && i && (i.ctrlKey || i.which > 2),
          h = b.delayedCall(.001, wt);
      if (A ? (fe(A, "touchend", _t), fe(A, "touchmove", Tt), fe(A, "touchcancel", _t), fe(at, "touchstart", ye)) : fe(at, "mousemove", Tt), fe(T, "touchforcechange", xe), I && A || (fe(at, "mouseup", _t), i && i.target && fe(i.target, "mouseup", _t)), v = !1, p && ($e = re = oe(), Ze.isDragging = !1), O && !g) return i && (fe(i.target, "change", _t), Ze.pointerEvent = c), Be(je, !1), Pe(Ze, "release", "onRelease"), Pe(Ze, "click", "onClick"), void (O = !1);

      for (ue(ct), s = je.length; --s > -1;) De(je[s], "cursor", t.cursor || (!1 !== t.cursor ? R : null));

      if (Y--, i) {
        if (l = i.changedTouches, l && (i = l[0]) !== m && i.identifier !== f) {
          for (s = l.length; --s > -1 && (i = l[s]).identifier !== f && i.target !== e;);

          if (s < 0) return;
        }

        Ze.pointerEvent = c, Ze.pointerX = i.pageX, Ze.pointerY = i.pageY;
      }

      return g && c ? (xe(c), ve = !0, Pe(Ze, "release", "onRelease")) : c && !p ? (ve = !1, W && (t.snap || t.bounds) && ft(t.inertia || t.throwProps), Pe(Ze, "release", "onRelease"), z && "touchmove" === c.type || -1 !== c.type.indexOf("cancel") || (Pe(Ze, "click", "onClick"), oe() - nt < 300 && Pe(Ze, "doubleclick", "onDoubleClick"), a = c.target || e, nt = oe(), d = () => {
        nt === se || !Ze.enabled() || Ze.isPressed || c.defaultPrevented || (a.click ? a.click() : at.createEvent && (r = at.createEvent("MouseEvents"), r.initMouseEvent("click", !0, !0, T, 1, Ze.pointerEvent.screenX, Ze.pointerEvent.screenY, Ze.pointerX, Ze.pointerY, !1, !1, !1, !1, 0, null), a.dispatchEvent(r)));
      }, z || c.defaultPrevented || b.delayedCall(.05, d))) : (ft(t.inertia || t.throwProps), Ze.allowEventDefault || !c || !1 === t.dragClickables && it.call(Ze, c.target) || !p || K && (!Z || K !== Z) || !1 === c.cancelable ? ve = !1 : (ve = !0, xe(c)), Pe(Ze, "release", "onRelease")), yt() && h.duration(Ze.tween.duration()), p && Pe(Ze, "dragend", "onDragEnd"), !0;
    },
        Mt = t => {
      if (t && Ze.isDragging && !i) {
        let o = t.target || e.parentNode,
            i = o.scrollLeft - o._gsScrollX,
            s = o.scrollTop - o._gsScrollY;
        (i || s) && (F ? (n -= i * F.a + s * F.c, l -= s * F.d + i * F.b) : (n -= i, l -= s), o._gsScrollX += i, o._gsScrollY += s, kt(Ze.pointerX, Ze.pointerY));
      }
    },
        St = e => {
      let t = oe(),
          o = t - nt < 100,
          i = t - $e < 50,
          n = o && se === nt,
          l = Ze.pointerEvent && Ze.pointerEvent.defaultPrevented,
          s = o && he === nt,
          r = e.isTrusted || null == e.isTrusted && o && n;
      if ((n || i && !1 !== Ze.vars.suppressClickOnDrag) && e.stopImmediatePropagation && e.stopImmediatePropagation(), o && (!Ze.pointerEvent || !Ze.pointerEvent.defaultPrevented) && (!n || r && !s)) return r && n && (he = nt), void (se = nt);
      (Ze.isPressed || i || o) && (r && e.detail && o && !l || xe(e)), o || i || (e && e.target && (Ze.pointerEvent = e), Pe(Ze, "click", "onClick"));
    },
        Dt = e => F ? {
      x: e.x * F.a + e.y * F.c + F.e,
      y: e.x * F.b + e.y * F.d + F.f
    } : {
      x: e.x,
      y: e.y
    };

    M = Ae.get(e), M && M.kill(), this.startDrag = (t, o) => {
      let i, s, r, a;
      bt(t || Ze.pointerEvent, !0), o && !Ze.hitTest(t || Ze.pointerEvent) && (i = Le(t || Ze.pointerEvent), s = Le(e), r = Dt({
        x: i.left + i.width / 2,
        y: i.top + i.height / 2
      }), a = Dt({
        x: s.left + s.width / 2,
        y: s.top + s.height / 2
      }), n -= r.x - a.x, l -= r.y - a.y), Ze.isDragging || (Ze.isDragging = !0, Pe(Ze, "dragstart", "onDragStart"));
    }, this.drag = Tt, this.endDrag = e => _t(e || Ze.pointerEvent, !0), this.timeSinceDrag = () => Ze.isDragging ? 0 : (oe() - $e) / 1e3, this.timeSinceClick = () => (oe() - nt) / 1e3, this.hitTest = (e, t) => Ae.hitTest(Ze.target, e, t), this.getDirection = (t, o) => {
      let i,
          n,
          l,
          a,
          d,
          c,
          p = "velocity" === t && B ? t : G(t) && !Fe ? "element" : "start";
      return "element" === p && (d = Le(Ze.target), c = Le(t)), i = "start" === p ? Ze.x - s : "velocity" === p ? B.getVelocity(e, We) : d.left + d.width / 2 - (c.left + c.width / 2), Fe ? i < 0 ? "counter-clockwise" : "clockwise" : (o = o || 2, n = "start" === p ? Ze.y - r : "velocity" === p ? B.getVelocity(e, Ve) : d.top + d.height / 2 - (c.top + c.height / 2), l = Math.abs(i / n), a = l < 1 / o ? "" : i < 0 ? "left" : "right", l < o && ("" !== a && (a += "-"), a += n < 0 ? "up" : "down"), a);
    }, this.applyBounds = (o, i) => {
      let n, l, s, r, d, c;
      if (o && t.bounds !== o) return t.bounds = o, Ze.update(!0, i);

      if (pt(!0), ht(), a && !yt()) {
        if (n = Ze.x, l = Ze.y, n > p ? n = p : n < g && (n = g), l > h ? l = h : l < u && (l = u), (Ze.x !== n || Ze.y !== l) && (s = !0, Ze.x = Ze.endX = n, Fe ? Ze.endRotation = n : Ze.y = Ze.endY = l, v = !0, ct(!0), Ze.autoScroll && !Ze.isDragging)) for (Se(e.parentNode), r = e, de.scrollTop = null != T.pageYOffset ? T.pageYOffset : null != at.documentElement.scrollTop ? at.documentElement.scrollTop : at.body.scrollTop, de.scrollLeft = null != T.pageXOffset ? T.pageXOffset : null != at.documentElement.scrollLeft ? at.documentElement.scrollLeft : at.body.scrollLeft; r && !c;) c = _e(r.parentNode), d = c ? de : r.parentNode, qe && d.scrollTop > d._gsMaxScrollY && (d.scrollTop = d._gsMaxScrollY), Ge && d.scrollLeft > d._gsMaxScrollX && (d.scrollLeft = d._gsMaxScrollX), r = d;
        Ze.isThrowing && (s || Ze.endX > p || Ze.endX < g || Ze.endY > h || Ze.endY < u) && ft(t.inertia || t.throwProps, s);
      }

      return Ze;
    }, this.update = (t, o, i) => {
      if (o && Ze.isPressed) {
        let t = w(e),
            o = Me.apply({
          x: Ze.x - s,
          y: Ze.y - r
        }),
            i = w(e.parentNode, !0);
        i.apply({
          x: t.e - o.x,
          y: t.f - o.y
        }, o), Ze.x -= o.x - i.e, Ze.y -= o.y - i.f, ct(!0), vt();
      }

      let {
        x: n,
        y: l
      } = Ze;
      return xt(!o), t ? Ze.applyBounds() : (v && i && ct(!0), pt(!0)), o && (kt(Ze.pointerX, Ze.pointerY), v && ct(!0)), Ze.isPressed && !o && (Ge && Math.abs(n - Ze.x) > .01 || qe && Math.abs(l - Ze.y) > .01 && !Fe) && vt(), Ze.autoScroll && (Se(e.parentNode, Ze.isDragging), Je = Ze.isDragging, ct(!0), ke(e, Mt), Te(e, Mt)), Ze;
    }, this.enable = n => {
      let l,
          s,
          r,
          a = {
        lazy: !0
      };

      if (!1 !== t.cursor && (a.cursor = t.cursor || R), b.utils.checkPrefix("touchCallout") && (a.touchCallout = "none"), "soft" !== n) {
        for (pe(je, Ge === qe ? "none" : t.allowNativeTouchScrolling && e.scrollHeight === e.clientHeight == (e.scrollWidth === e.clientHeight) || t.allowEventDefault ? "manipulation" : Ge ? "pan-y" : "pan-x"), s = je.length; --s > -1;) r = je[s], I || me(r, "mousedown", bt), me(r, "touchstart", bt), me(r, "click", St, !0), b.set(r, a), r.getBBox && r.ownerSVGElement && b.set(r.ownerSVGElement, {
          touchAction: Ge === qe ? "none" : t.allowNativeTouchScrolling || t.allowEventDefault ? "manipulation" : Ge ? "pan-y" : "pan-x"
        }), t.allowContextMenu || me(r, "contextmenu", dt);

        Be(je, !1);
      }

      return Te(e, Mt), o = !0, B && "soft" !== n && B.track(i || e, Ye ? "x,y" : Fe ? "rotation" : "top,left"), e._gsDragID = l = "d" + le++, ne[l] = Ze, i && (i.enable(), i.element._gsDragID = l), (t.bounds || Fe) && vt(), t.bounds && Ze.applyBounds(), Ze;
    }, this.disable = t => {
      let n,
          l = Ze.isDragging,
          s = je.length;

      for (; --s > -1;) De(je[s], "cursor", null);

      if ("soft" !== t) {
        for (pe(je, null), s = je.length; --s > -1;) n = je[s], De(n, "touchCallout", null), fe(n, "mousedown", bt), fe(n, "touchstart", bt), fe(n, "click", St), fe(n, "contextmenu", dt);

        Be(je, !0), A && (fe(A, "touchcancel", _t), fe(A, "touchend", _t), fe(A, "touchmove", Tt)), fe(at, "mouseup", _t), fe(at, "mousemove", Tt);
      }

      return ke(e, Mt), o = !1, B && "soft" !== t && B.untrack(i || e, Ye ? "x,y" : Fe ? "rotation" : "top,left"), i && i.disable(), ue(ct), Ze.isDragging = Ze.isPressed = O = !1, l && Pe(Ze, "dragend", "onDragEnd"), Ze;
    }, this.enabled = function (e, t) {
      return arguments.length ? e ? Ze.enable(t) : Ze.disable(t) : o;
    }, this.kill = function () {
      return Ze.isThrowing = !1, Ze.tween && Ze.tween.kill(), Ze.disable(), b.set(je, {
        clearProps: "userSelect"
      }), delete ne[e._gsDragID], Ze;
    }, ~Ee.indexOf("scroll") && (i = this.scrollProxy = new Ie(e, ((e, t) => {
      for (let o in t) o in e || (e[o] = t[o]);

      return e;
    })({
      onKill: function () {
        Ze.isPressed && _t(null);
      }
    }, t)), e.style.overflowY = qe && !X ? "auto" : "hidden", e.style.overflowX = Ge && !X ? "auto" : "hidden", e = i.content), Fe ? Ue.rotation = 1 : (Ge && (Ue[We] = 1), qe && (Ue[Ve] = 1)), lt.force3D = !("force3D" in t) || t.force3D, this.enable();
  }

  static register(e) {
    b = e, Oe();
  }

  static create(e, t) {
    return C || Oe(!0), L(e).map(e => new Ae(e, t));
  }

  static get(e) {
    return ne[(L(e)[0] || {})._gsDragID];
  }

  static timeSinceDrag() {
    return (oe() - re) / 1e3;
  }

  static hitTest(e, t, o) {
    if (e === t) return !1;
    let i,
        n,
        l,
        s = Le(e),
        r = Le(t),
        {
      top: a,
      left: d,
      right: c,
      bottom: p,
      width: g,
      height: h
    } = s,
        u = r.left > c || r.right < d || r.top > p || r.bottom < a;
    return u || !o ? !u : (l = -1 !== (o + "").indexOf("%"), o = parseFloat(o) || 0, i = {
      left: Math.max(d, r.left),
      top: Math.max(a, r.top)
    }, i.width = Math.min(c, r.right) - i.left, i.height = Math.min(p, r.bottom) - i.top, !(i.width < 0 || i.height < 0) && (l ? (o *= .01, n = i.width * i.height, n >= g * h * o || n >= r.width * r.height * o) : i.width > o && i.height > o));
  }

}

((e, t) => {
  for (let o in t) o in e || (e[o] = t[o]);
})(Ae.prototype, {
  pointerX: 0,
  pointerY: 0,
  startX: 0,
  startY: 0,
  deltaX: 0,
  deltaY: 0,
  isDragging: !1,
  isPressed: !1
}), Ae.zIndex = 1e3, Ae.version = "3.10.4", W() && b.registerPlugin(Ae);

let Fe,
    We,
    Ve,
    Ge,
    qe,
    Ke,
    Ze,
    je,
    Ue,
    $e,
    Je,
    Qe,
    et,
    tt,
    ot = !0,
    it = 0,
    nt = () => "undefined" != typeof window,
    lt = () => Fe || nt() && (Fe = window.gsap) && Fe.registerPlugin && Fe,
    st = e => "string" == typeof e,
    rt = e => void 0 === e,
    at = function () {
  return String.fromCharCode.apply(null, arguments);
},
    dt = at(103, 114, 101, 101, 110, 115, 111, 99, 107, 46, 99, 111, 109),
    ct = (function (e) {
  var t = "undefined" != typeof window,
      o = 0 === (t ? window.location.href : "").indexOf(at(102, 105, 108, 101, 58, 47, 47)) || -1 !== e.indexOf(at(108, 111, 99, 97, 108, 104, 111, 115, 116)) || -1 !== e.indexOf(at(49, 50, 55, 46, 48, 32, 48, 46, 49)),
      i = [dt, at(99, 111, 100, 101, 112, 101, 110, 46, 105, 111), at(99, 111, 100, 101, 112, 101, 110, 46, 112, 108, 117, 109, 98, 105, 110, 103), at(99, 111, 100, 101, 112, 101, 110, 46, 100, 101, 118), at(99, 111, 100, 101, 112, 101, 110, 46, 97, 112, 112), at(99, 111, 100, 101, 112, 101, 110, 46, 119, 101, 98, 115, 105, 116, 101), at(112, 101, 110, 115, 46, 99, 108, 111, 117, 100), at(99, 115, 115, 45, 116, 114, 105, 99, 107, 115, 46, 99, 111, 109), at(99, 100, 112, 110, 46, 105, 111), at(112, 101, 110, 115, 46, 105, 111), at(103, 97, 110, 110, 111, 110, 46, 116, 118), at(99, 111, 100, 101, 99, 97, 110, 121, 111, 110, 46, 110, 101, 116), at(116, 104, 101, 109, 101, 102, 111, 114, 101, 115, 116, 46, 110, 101, 116), at(99, 101, 114, 101, 98, 114, 97, 120, 46, 99, 111, 46, 117, 107), at(116, 121, 109, 112, 97, 110, 117, 115, 46, 110, 101, 116), at(116, 119, 101, 101, 110, 109, 97, 120, 46, 99, 111, 109), at(116, 119, 101, 101, 110, 108, 105, 116, 101, 46, 99, 111, 109), at(112, 108, 110, 107, 114, 46, 99, 111), at(104, 111, 116, 106, 97, 114, 46, 99, 111, 109), at(119, 101, 98, 112, 97, 99, 107, 98, 105, 110, 46, 99, 111, 109), at(97, 114, 99, 104, 105, 118, 101, 46, 111, 114, 103), at(99, 111, 100, 101, 115, 97, 110, 100, 98, 111, 120, 46, 105, 111), at(99, 115, 98, 46, 97, 112, 112), at(115, 116, 97, 99, 107, 98, 108, 105, 116, 122, 46, 99, 111, 109), at(115, 116, 97, 99, 107, 98, 108, 105, 116, 122, 46, 105, 111), at(99, 111, 100, 105, 101, 114, 46, 105, 111), at(109, 111, 116, 105, 111, 110, 116, 114, 105, 99, 107, 115, 46, 99, 111, 109), at(115, 116, 97, 99, 107, 111, 118, 101, 114, 102, 108, 111, 119, 46, 99, 111, 109), at(115, 116, 97, 99, 107, 101, 120, 99, 104, 97, 110, 103, 101, 46, 99, 111, 109), at(106, 115, 102, 105, 100, 100, 108, 101, 46, 110, 101, 116)],
      n = function () {
    t && ("loading" === document.readyState || "interactive" === document.readyState ? document.addEventListener("readystatechange", n) : (document.removeEventListener("readystatechange", n), t && window.console && !window._gsapWarned && "object" == typeof window.gsap && !1 !== window.gsap.config().trialWarn && (console.log(at(37, 99, 87, 97, 114, 110, 105, 110, 103), at(102, 111, 110, 116, 45, 115, 105, 122, 101, 58, 51, 48, 112, 120, 59, 99, 111, 108, 111, 114, 58, 114, 101, 100, 59)), console.log(at(65, 32, 116, 114, 105, 97, 108, 32, 118, 101, 114, 115, 105, 111, 110, 32, 111, 102, 32) + "GSDevTools" + at(32, 105, 115, 32, 108, 111, 97, 100, 101, 100, 32, 116, 104, 97, 116, 32, 111, 110, 108, 121, 32, 119, 111, 114, 107, 115, 32, 108, 111, 99, 97, 108, 108, 121, 32, 97, 110, 100, 32, 111, 110, 32, 100, 111, 109, 97, 105, 110, 115, 32, 108, 105, 107, 101, 32, 99, 111, 100, 101, 112, 101, 110, 46, 105, 111, 32, 97, 110, 100, 32, 99, 111, 100, 101, 115, 97, 110, 100, 98, 111, 120, 46, 105, 111, 46, 32, 42, 42, 42, 32, 68, 79, 32, 78, 79, 84, 32, 68, 69, 80, 76, 79, 89, 32, 84, 72, 73, 83, 32, 70, 73, 76, 69, 32, 42, 42, 42, 32, 76, 111, 97, 100, 105, 110, 103, 32, 105, 116, 32, 111, 110, 32, 97, 110, 32, 117, 110, 97, 117, 116, 104, 111, 114, 105, 122, 101, 100, 32, 115, 105, 116, 101, 32, 118, 105, 111, 108, 97, 116, 101, 115, 32, 116, 104, 101, 32, 108, 105, 99, 101, 110, 115, 101, 32, 97, 110, 100, 32, 119, 105, 108, 108, 32, 99, 97, 117, 115, 101, 32, 97, 32, 114, 101, 100, 105, 114, 101, 99, 116, 46, 32, 80, 108, 101, 97, 115, 101, 32, 106, 111, 105, 110, 32, 67, 108, 117, 98, 32, 71, 114, 101, 101, 110, 83, 111, 99, 107, 32, 116, 111, 32, 103, 101, 116, 32, 102, 117, 108, 108, 32, 97, 99, 99, 101, 115, 115, 32, 116, 111, 32, 116, 104, 101, 32, 98, 111, 110, 117, 115, 32, 112, 108, 117, 103, 105, 110, 115, 32, 116, 104, 97, 116, 32, 98, 111, 111, 115, 116, 32, 121, 111, 117, 114, 32, 97, 110, 105, 109, 97, 116, 105, 111, 110, 32, 115, 117, 112, 101, 114, 112, 111, 119, 101, 114, 115, 46, 32, 68, 105, 115, 97, 98, 108, 101, 32, 116, 104, 105, 115, 32, 119, 97, 114, 110, 105, 110, 103, 32, 119, 105, 116, 104, 32, 103, 115, 97, 112, 46, 99, 111, 110, 102, 105, 103, 40, 123, 116, 114, 105, 97, 108, 87, 97, 114, 110, 58, 32, 102, 97, 108, 115, 101, 125, 41, 59)), console.log(at(37, 99, 71, 101, 116, 32, 117, 110, 114, 101, 115, 116, 114, 105, 99, 116, 101, 100, 32, 102, 105, 108, 101, 115, 32, 97, 116, 32, 104, 116, 116, 112, 115, 58, 47, 47, 103, 114, 101, 101, 110, 115, 111, 99, 107, 46, 99, 111, 109, 47, 99, 108, 117, 98), at(102, 111, 110, 116, 45, 115, 105, 122, 101, 58, 49, 54, 112, 120, 59, 99, 111, 108, 111, 114, 58, 35, 52, 101, 57, 56, 49, 53)), window._gsapWarned = 1)));
  },
      l = i.length;

  for (setTimeout(n, 50); --l > -1;) if (-1 !== e.indexOf(i[l])) return !0;

  o || setTimeout(function () {
    t && (window.location.href = at(104, 116, 116, 112, 115, 58, 47, 47) + dt + at(47, 114, 101, 113, 117, 105, 114, 101, 115, 45, 109, 101, 109, 98, 101, 114, 115, 104, 105, 112, 47) + "?plugin=GSDevTools&source=trial");
  }, 3e3);
}("undefined" != typeof window ? window.location.host : ""), "http://www.w3.org/2000/svg"),
    pt = "http://www.w3.org/1999/xhtml",
    gt = 0,
    ht = {},
    ut = function () {
  try {
    return sessionStorage.setItem("gsTest", "1"), sessionStorage.removeItem("gsTest"), !0;
  } catch (e) {
    return !1;
  }
}(),
    mt = (e, t, o) => {
  let i = Ve.createElementNS ? Ve.createElementNS("svg" === e ? ct : pt, e) : Ve.createElement(e);
  return t && (st(t) && (t = Ve.querySelector(t)), t.appendChild(i)), "svg" === e && (i.setAttribute("xmlns", ct), i.setAttribute("xmlns:xlink", pt)), o && (i.style.cssText = o), i;
},
    ft = () => {
  Ve.selection ? Ve.selection.empty() : qe.getSelection && qe.getSelection().removeAllRanges();
},
    xt = (e, t) => {
  let o = [],
      i = 0,
      n = Fe.core.Tween,
      l = e._first;

  for (; l;) l instanceof n ? l.vars.id && (o[i++] = l) : (t && l.vars.id && (o[i++] = l), o = o.concat(xt(l, t)), i = o.length), l = l._next;

  return o;
},
    vt = (e, t) => {
  let o = 0,
      i = Math.max(0, e._repeat),
      n = e._first;

  for (n || (o = e.duration()); n;) o = Math.max(o, n.totalDuration() > 999 ? n.endTime(!1) : n._start + n._tDur / n._ts), n = n._next;

  return !t && i ? o * (i + 1) + e._rDelay * i : o;
},
    yt = (e, t, o, i) => {
  let n, l, s;
  return st(e) && ("=" === e.charAt(1) ? (n = parseInt(e.charAt(0) + "1", 10) * parseFloat(e.substr(2)), n < 0 && 0 === i && (i = 100), e = i / 100 * t.duration() + n) : isNaN(e) && t.labels && -1 !== t.labels[e] ? e = t.labels[e] : t === Ke && (l = e.indexOf("="), l > 0 ? (n = parseInt(e.charAt(l - 1) + "1", 10) * parseFloat(e.substr(l + 1)), e = e.substr(0, l - 1)) : n = 0, s = Fe.getById(e), s && (e = function (e, t) {
    let o = e,
        i = arguments.length > 1 ? +t : o.rawTime();

    for (; o;) i = o._start + i / (o._ts || 1), o = o.parent;

    return i;
  }(s, o / 100 * s.duration()) + n))), e = isNaN(e) ? o : parseFloat(e), Math.min(100, Math.max(0, e / t.duration() * 100));
},
    wt = !0,
    bt = (e, t, o, i) => {
  let n, l;
  if ("mousedown" !== t && "mouseup" !== t || (e.style.cursor = "pointer"), "mousedown" === t && (l = rt(e.onpointerdown) ? rt(e.ontouchstart) ? null : "touchstart" : "pointerdown", l)) return n = t => {
    "select" !== t.target.nodeName.toLowerCase() && t.type === l ? (t.stopPropagation(), wt && (t.preventDefault(), o.call(e, t))) : t.type !== l && o.call(e, t), wt = !0;
  }, e.addEventListener(l, n, i), void ("pointerdown" !== l && e.addEventListener(t, n, i));
  e.addEventListener(t, o, i);
},
    Tt = (e, t, o) => {
  e.removeEventListener(t, o), (t = "mousedown" !== t ? null : rt(e.onpointerdown) ? rt(e.ontouchstart) ? null : "touchstart" : "pointerdown") && e.removeEventListener(t, o);
},
    kt = (e, t, o, i) => {
  let n,
      l = e.options,
      s = l.length;

  for (t += ""; --s > -1;) if (l[s].innerHTML === t || l[s].value === t) return e.selectedIndex = s, o.innerHTML = l[s].innerHTML, l[s];

  i && (n = mt("option", e), n.setAttribute("value", t), n.innerHTML = o.innerHTML = st(i) ? i : t, e.selectedIndex = l.length - 1);
},
    _t = (e, t, o) => {
  let i = e.options,
      n = Math.min(i.length - 1, Math.max(0, e.selectedIndex + t));
  return e.selectedIndex = n, o && (o.innerHTML = i[n].innerHTML), i[n].value;
},
    Mt = () => {
  let e,
      t,
      o,
      i = Je._first;

  if (Ue) {
    for (e = Ke._dur; i;) t = i._next, o = i._targets && i._targets[0], "function" == typeof o && o === i.vars.onComplete && !i._dur || o && o._gsIgnore || Ke.add(i, i._start - i._delay), i = t;

    return e !== Ke.duration();
  }
},
    St = e => Fe.getById(e) || Qe.getById(e) || e === Ke.vars.id && Ke,
    Dt = e => {
  Fe = e || lt(), We || Fe && nt() && (Ve = document, Ge = Ve.documentElement, qe = window, Fe.registerPlugin(Ae), Je = Fe.globalTimeline, Je._sort = !0, Je.autoRemoveChildren = !1, Ze = Fe.core.Animation, Qe = Fe.timeline({
    data: "indy",
    autoRemoveChildren: !0,
    smoothChildTiming: !0
  }), Qe.kill(), Qe._dp = 0, Qe.to({}, {
    duration: 1e12
  }), Ke = Fe.timeline({
    data: "root",
    id: "Global Timeline",
    autoRemoveChildren: !1,
    smoothChildTiming: !0,
    parent: Qe
  }, 0), je = Fe.to(Ke, {
    duration: 1,
    time: 1,
    ease: "none",
    data: "root",
    id: "_rootTween",
    paused: !0,
    immediateRender: !1,
    parent: Qe
  }, 0), Je.killTweensOf = function (e, t, o) {
    Ke.killTweensOf(e, t, o), Ke.killTweensOf.call(Je, e, t, o);
  }, Qe._start = Fe.ticker.time, Fe.ticker.add(e => Qe.render(e - Qe._start)), Je._start += Je._time, Ke._start = Je._time = Je._tTime = 0, et = (e, t, o, i) => Fe.to(t, {
    delay: e,
    duration: 0,
    onComplete: t,
    onReverseComplete: t,
    onCompleteParams: o,
    onReverseCompleteParams: o,
    callbackScope: i,
    parent: Qe
  }, Qe._time), et(.01, () => Ue ? Ue.update() : Mt()), et(2, () => {
    let e, t, o;
    if (!Ue) for (Mt(), e = Ke._first, o = Ke._start; e;) t = e._next, e._tDur !== e._tTime || !e._dur && 1 !== e.progress() ? Je.add(e, e._start - e._delay + o) : e.kill(), e = t;
    Et.globalRecordingTime > 2 ? et(Et.globalRecordingTime - 2, () => {
      Ue && Ue.update(), Je.autoRemoveChildren = !0;
    }) : Je.autoRemoveChildren = !0, ot = !1;
  }), We = 1);
},
    Ct = (e, t) => {
  t.globalSync || e.parent === Je || Je.add(e, Je.time());
},
    Et = function (e) {
  We || (Dt(), Fe || console.warn("Please gsap.registerPlugin(GSDevTools)")), this.vars = e = e || {}, e.animation && (Et.getByAnimation(e.animation) || {
    kill: () => 0
  }).kill(), e.id = e.id || (st(e.animation) ? e.animation : gt++), ht[e.id + ""] = this, "globalSync" in e || (e.globalSync = !e.animation);

  let t,
      o,
      i,
      n,
      l,
      s,
      r,
      a,
      d,
      c,
      p,
      g,
      h,
      u = this,
      m = ((e, t, o) => {
    tt || (mt("style", Ge).innerHTML = ".gs-dev-tools{height:51px;bottom:0;left:0;right:0;display:block;position:fixed;overflow:visible;padding:0}.gs-dev-tools *{box-sizing:content-box;visibility:visible}.gs-dev-tools .gs-top{position:relative;z-index:499}.gs-dev-tools .gs-bottom{display:flex;align-items:center;justify-content:space-between;background-color:rgba(0,0,0,.6);height:42px;border-top:1px solid #999;position:relative}.gs-dev-tools .timeline{position:relative;height:8px;margin-left:15px;margin-right:15px;overflow:visible}.gs-dev-tools .progress-bar,.gs-dev-tools .timeline-track{height:8px;width:100%;position:absolute;top:0;left:0}.gs-dev-tools .timeline-track{background-color:#999;opacity:.6}.gs-dev-tools .progress-bar{background-color:#91e600;height:8px;top:0;width:0;pointer-events:none}.gs-dev-tools .seek-bar{width:100%;position:absolute;height:24px;top:-12px;left:0;background-color:transparent}.gs-dev-tools .in-point,.gs-dev-tools .out-point{width:15px;height:26px;position:absolute;top:-18px}.gs-dev-tools .in-point-shape{fill:#6d9900;stroke:rgba(0,0,0,.5);stroke-width:1}.gs-dev-tools .out-point-shape{fill:#994242;stroke:rgba(0,0,0,.5);stroke-width:1}.gs-dev-tools .in-point{transform:translateX(-100%)}.gs-dev-tools .out-point{left:100%}.gs-dev-tools .grab{stroke:rgba(255,255,255,.3);stroke-width:1}.gs-dev-tools .playhead{position:absolute;top:-5px;transform:translate(-50%,0);left:0;border-radius:50%;width:16px;height:16px;border:1px solid #6d9900;background-color:#91e600}.gs-dev-tools .gs-btn-white{fill:#fff}.gs-dev-tools .pause{opacity:0}.gs-dev-tools .select-animation{vertical-align:middle;position:relative;padding:6px 10px}.gs-dev-tools .select-animation-container{flex-grow:4;width:40%}.gs-dev-tools .select-arrow{display:inline-block;width:12px;height:7px;margin:0 7px;transform:translate(0,-2px)}.gs-dev-tools .select-arrow-shape{stroke:rgba(255,255,255,.6);stroke-width:2px;fill:none}.gs-dev-tools .rewind{height:16px;width:19px;padding:10px 4px;min-width:24px}.gs-dev-tools .rewind-path{opacity:.6}.gs-dev-tools .play-pause{width:24px;height:24px;padding:6px 10px;min-width:24px}.gs-dev-tools .ease{width:30px;height:30px;padding:10px;min-width:30px;display:none}.gs-dev-tools .ease-path{fill:none;stroke:rgba(255,255,255,.6);stroke-width:2px}.gs-dev-tools .ease-border{fill:rgba(255,255,255,.25)}.gs-dev-tools .time-scale{font-family:monospace;font-size:18px;text-align:center;color:rgba(255,255,255,.6);padding:4px 4px 4px 0;min-width:30px;margin-left:7px}.gs-dev-tools .loop{width:20px;padding:5px;min-width:20px}.gs-dev-tools .loop-path{fill:rgba(255,255,255,.6)}.gs-dev-tools label span{color:#fff;font-family:monospace;text-decoration:none;font-size:16px;line-height:18px}.gs-dev-tools .time-scale span{color:rgba(255,255,255,.6)}.gs-dev-tools button:focus,.gs-dev-tools select:focus{outline:0}.gs-dev-tools label{position:relative;cursor:pointer}.gs-dev-tools label.locked{text-decoration:none;cursor:auto}.gs-dev-tools label input,.gs-dev-tools label select{position:absolute;left:0;top:0;z-index:1;font:inherit;font-size:inherit;line-height:inherit;height:100%;width:100%;color:#000!important;opacity:0;background:0 0;border:none;padding:0;margin:0;-webkit-appearance:none;-moz-appearance:none;appearance:none;cursor:pointer}.gs-dev-tools label input+.display{position:relative;z-index:2}.gs-dev-tools .gs-bottom-right{vertical-align:middle;display:flex;align-items:center;flex-grow:4;width:40%;justify-content:flex-end}.gs-dev-tools .time-container{font-size:18px;font-family:monospace;color:rgba(255,255,255,.6);margin:0 5px}.gs-dev-tools .logo{width:32px;height:32px;position:relative;top:2px;margin:0 12px}.gs-dev-tools .gs-hit-area{background-color:transparent;width:100%;height:100%;top:0;position:absolute}.gs-dev-tools.minimal{height:auto;display:flex;align-items:stretch}.gs-dev-tools.minimal .gs-top{order:2;flex-grow:4;background-color:rgba(0,0,0,1)}.gs-dev-tools.minimal .gs-bottom{background-color:rgba(0,0,0,1);border-top:none}.gs-dev-tools.minimal .timeline{top:50%;transform:translate(0,-50%)}.gs-dev-tools.minimal .in-point,.gs-dev-tools.minimal .out-point{display:none}.gs-dev-tools.minimal .select-animation-container{display:none}.gs-dev-tools.minimal .rewind{display:none}.gs-dev-tools.minimal .play-pause{width:20px;height:20px;padding:4px 6px;margin-left:14px}.gs-dev-tools.minimal .time-scale{min-width:26px}.gs-dev-tools.minimal .loop{width:18px;min-width:18px;display:none}.gs-dev-tools.minimal .gs-bottom-right{display:none}@media only screen and (max-width:600px){.gs-dev-tools{height:auto;display:flex;align-items:stretch}.gs-dev-tools .gs-top{order:2;flex-grow:4;background-color:rgba(0,0,0,1);height:42px}.gs-dev-tools .gs-bottom{background-color:rgba(0,0,0,1);border-top:none}.gs-dev-tools .timeline{top:50%;transform:translate(0,-50%)}.gs-dev-tools .in-point,.gs-dev-tools .out-point{display:none}.gs-dev-tools .select-animation-container{display:none}.gs-dev-tools .rewind{display:none}.gs-dev-tools .play-pause{width:20px;height:20px;padding:4px 6px;margin-left:14px}.gs-dev-tools .time-scale{min-width:26px}.gs-dev-tools .loop{width:18px;min-width:18px;display:none}.gs-dev-tools .gs-bottom-right{display:none}}", tt = !0), st(e) && (e = Ve.querySelector(e));
    let i = mt("div", e || Ge.getElementsByTagName("body")[0] || Ge);
    return i.setAttribute("class", "gs-dev-tools" + (t ? " minimal" : "")), i.innerHTML = '<div class=gs-hit-area></div><div class=gs-top><div class=timeline><div class=timeline-track></div><div class=progress-bar></div><div class=seek-bar></div><svg class=in-point viewBox="0 0 15 26" xmlns=http://www.w3.org/2000/svg><polygon class=in-point-shape points=".5 .5 14.5 .5 14.5 25.5 .5 17.5"/><polyline class=grab points="5.5 4 5.5 15"/><polyline class=grab points="9.5 4 9.5 17"/></svg><svg class=out-point viewBox="0 0 15 26" xmlns=http://www.w3.org/2000/svg><polygon class=out-point-shape points=".5 .5 14.5 .5 14.5 17.5 .5 25.5"/><polyline class=grab points="5.5 4 5.5 17"/><polyline class=grab points="9.5 4 9.5 15"/></svg><div class=playhead></div></div></div><div class=gs-bottom><div class=select-animation-container><label class=select-animation><select class=animation-list><option>Global Timeline<option>myTimeline</select><nobr><span class="display animation-label">Global Timeline</span><svg class=select-arrow viewBox="0 0 12.05 6.73" xmlns=http://www.w3.org/2000/svg><polyline class=select-arrow-shape points="0.35 0.35 6.03 6.03 11.7 0.35"/></svg></nobr></label></div><svg class=rewind viewBox="0 0 12 15.38" xmlns=http://www.w3.org/2000/svg><path d=M0,.38H2v15H0Zm2,7,10,7.36V0Z class="gs-btn-white rewind-path"/></svg><svg class=play-pause viewBox="0 0 20.97 25.67" xmlns=http://www.w3.org/2000/svg><g class=play><path d="M8,4.88 C8,10.18 8,15.48 8,20.79 5.33,22.41 2.66,24.04 0,25.67 0,17.11 0,8.55 0,0 2.66,1.62 5.33,3.25 8,4.88" class="gs-btn-white play-1" style=stroke:#fff;stroke-width:.6px /><path d="M14.485,8.855 C16.64,10.18 18.8,11.5 20.97,12.83 16.64,15.48 12.32,18.13 8,20.79 8,15.48 8,10.18 8,4.88 10.16,6.2 12.32,7.53 14.48,8.85" class="gs-btn-white play-2" style=stroke:#fff;stroke-width:.6px /></g></svg> <svg class=loop viewBox="0 0 29 25.38" xmlns=http://www.w3.org/2000/svg><path d=M27.44,5.44,20.19,0V3.06H9.06A9.31,9.31,0,0,0,0,12.41,9.74,9.74,0,0,0,.69,16l3.06-2.23a6,6,0,0,1-.12-1.22,5.49,5.49,0,0,1,5.43-5.5H20.19v3.81Z class=loop-path /><path d=M25.25,11.54a5.18,5.18,0,0,1,.12,1.12,5.41,5.41,0,0,1-5.43,5.41H9.19V14.5L1.94,19.94l7.25,5.44V22.06H19.94A9.2,9.2,0,0,0,29,12.84a9.42,9.42,0,0,0-.68-3.53Z class=loop-path /></svg> <svg class=ease viewBox="0 0 25.67 25.67" xmlns=http://www.w3.org/2000/svg><path d=M.48,25.12c1.74-3.57,4.28-12.6,8.8-10.7s4.75,1.43,6.5-1.11S19.89,1.19,25.2.55 class=ease-path /><path d=M24.67,1V24.67H1V1H24.67m1-1H0V25.67H25.67V0Z class=ease-border /></svg><label class=time-scale><select><option value=10>10x<option value=5>5x<option value=2>2x<option value=1 selected>1x<option value=0.5>0.5x<option value=0.25>0.25x<option value=0.1>0.1x</select><span class="display time-scale-label">1x</span></label><div class=gs-bottom-right><div class=time-container><span class=time>0.00</span> / <span class=duration>0.00</span></div><a href="https://greensock.com/docs/v3/Plugins/GSDevTools?source=GSDevTools" target=_blank title=Docs><svg class=logo viewBox="0 0 100 100" xmlns=http://www.w3.org/2000/svg><path d="M60 15.4c-.3-.4-.5-.6-.5-.7.1-.6.2-1 .2-1.7v-.4c.6.6 1.3 1.3 1.8 1.7.2.2.5.3.8.3.2 0 .3 0 .5.1h1.6c.8 0 1.6.1 2 0 .1 0 .2 0 .3-.1.6-.3 1.4-1 2.1-1.6 0 .6.1 1.2.1 1.7v1.5c0 .3 0 .5.1.7-.1.1-.2.1-.4.2-.7.4-1.7 1-2.3.9-.5-.1-1.5-.3-2.6-.7-1.2-.3-2.4-.8-3.2-1.2 0 0-.1 0-.1-.1s-.2-.4-.4-.6zm24.6 21.9c-.5-1.7-1.9-2-4.2-.7.9-1.5 2.1-1.5 2.3-2.1.9-2.5-.6-4.6-1.2-5.3.7-1.8 1.4-4.5-1-6.8-1-1-2.4-1.2-3.6-1.1 1.8 1.7 3.4 4.4 2.5 7.2-.1.3-.9.7-1.7 1 0 0 .4 2-.3 3.5-.3.6-.8 1.5-1.3 2.6 1 .9 1.6 1 3 1.3-.9.1-1.2.4-1.2.5-.7 3 1 3.4 1.4 4.8 0 .1 0 .2.1.3v.4c-.3.3-1.4.5-2.5.5s-1.8 1-1.8 1c-.2.1-.3.3-.4.4v1c0 .1 0 .4.1.6.1.5.3 1.3.4 1.8.9.6 1.4.9 2.2 1.1.5.1 1 .2 1.5.1.3-.1.7-.3 1-.7 1.5-1.7 1.9-3.2 2.2-4.1 0-.1 0-.2.1-.2 0 .1.1.1.1.2 0 0 .1-.1.1-.2l.1-.1c1.3-1.6 2.9-4.5 2.1-7zM74.3 49.9c-.1-.3-.1-.7-.2-1.1v-.2c-.1-.2-.1-.4-.2-.6 0-.1-.1-.3-.1-.5s-.1-.5-.1-.7v-.1c0-.2-.1-.5-.1-.7-.1-.3-.1-.7-.2-1.1v-.1c0-.2 0-.3-.1-.5v-.9c0-.1 0-.2.1-.3V43h-.3c-1.1.1-3.8.4-6.7.2-1.2-.1-2.4-.3-3.6-.6-1-.3-1.8-.5-2.3-.7-1.2-.4-1.6-.6-1.8-.7 0 .2-.1.4-.1.7 0 .3-.1.5-.1.8-.1.2-.1.4-.2.6l.1.1c.5.5 1.5 1.3 1.5 2.1v.2c-.1.4-.4.5-.8.9-.1.1-.6.7-1.1 1.1l-.6.6c-.1 0-.1.1-.2.1-.1.1-.3.2-.4.3-.2.1-.7.5-.8.6-.1.1-.2.1-.3.1-2.8 8.8-2.2 13.5-1.5 16.1.1.5.3 1 .4 1.3-.4.5-.8 1-1.2 1.4-1.2 1.5-2 2.6-2.6 4.2 0 .1 0 .1-.1.2 0 .1 0 .2-.1.2-.2.5-.3 1-.4 1.5-.6 2.3-.8 4.5-.9 6.6-.1 2.4-.2 4.6-.5 6.9.7.3 3.1.9 4.7.6.2-.1 0-3.9.6-5.7l.6-1.5c.4-.9.9-1.9 1.3-3.1.3-.7.5-1.5.7-2.4.1-.5.2-1 .3-1.6V74v-.1c.1-.6.1-1.3.1-2 0-.2-.7.3-1.1.9.3-1.8 1.3-2.1 2-3.2.3-.5.6-1.1.6-2 2.5-1.7 4-3.7 5-5.7.2-.4.4-.9.6-1.4.3-.8.5-1.6.7-2.4.3-1.4.8-3.2 1.2-4.8v-.1c.4-1.2.8-2.2 1.2-2.6-.2.9-.4 1.7-.6 2.5v.2c-.6 3.5-.7 6.2-2 9.2 1 2.6 1.9 3.9 2 7.6-2 0-3.2 1.6-3.7 3.2 1.2.3 3.9.7 8.3.1h.3c.1-.5.3-1.1.5-1.5.3-.8.5-1.5.6-2.2.2-1.3.1-2.4 0-3.2 3.9-3.7 2.6-11 1.6-16.6zm.3-15.1c.1-.3.2-.6.4-.8.2-.3.3-.7.5-1 .1-.3.3-.6.4-.9.5-1.5.4-2.8.3-3.5-.1 0-.1-.1-.2-.1-.5-.2-.9-.4-1.4-.6-.1 0-.2-.1-.3-.1-3.8-1.2-7.9-.9-11.9.1-1 .2-1.9.5-2.9.1-2.3-.8-3.9-1.9-4.6-2.8l-.2-.2c-.1.2-.2.4-.4.6.2 2.3-.5 3.9-1.4 5.1.9 1.2 2.6 2.8 3.6 3.4 1.1.6 1.7.7 3.4.4-.6.7-1.1 1-1.9 1.4.1.7.2 2 .5 3.4.3.3 1.2.8 2.3 1.3.5.3 1.1.5 1.7.7.8.3 1.7.6 2.4.8.1 0 .2.1.3.1.5.1 1.1.2 1.8.2h.9c2.1 0 4.5-.2 5.4-.3h.1c-.1-2.7.2-4.6.7-6.2.2-.3.4-.7.5-1.1zm-23.2 9.3v.2c-.3 1.7.5 2.4 1.9 3.4.6.5 0 .5.5.8.3.2.7.3 1 .3.3 0 .5 0 .8-.1.2-.1.4-.3.6-.5.1-.1.3-.2.5-.4.3-.2.6-.5.7-.6.1-.1.2-.1.3-.2.2-.2.5-.5.6-.7.2-.2.4-.5.5-.7 0-.1.1-.1.1-.1v-.1c.1-.4-.3-.8-.8-1.3-.2-.2-.4-.3-.5-.5-.3-.3-.6-.5-1-.7-.9-.5-1.9-.7-3-.7l-.3-.3c-2.2-2.5-3.2-4.8-3.9-6.5-.9-2.1-1.9-3.3-3.9-4.9 1 .4 1.8.8 2.3 1.1.5.4 1.3.4 1.9.2.2-.1.5-.2.7-.3.2-.1.4-.2.6-.4 1.6-1.3 2.5-3.8 2.6-5.6v-.1c.2-.3.6-1.1.8-1.4l.1.1c.1.1.3.2.6.5.1 0 .1.1.2.1.1.1.2.1.2.2.8.6 1.9 1.3 2.6 1.7 1.4.7 2.3.7 5.3-.1 2.2-.6 4.8-.8 6.8-.8 1.4 0 2.7.3 4 .7.2.1.4.1.5.2.3.1.6.2.9.4 0 0 .1 0 .1.1.8.4 2.1 1.2 2.5-.3.1-2-.6-3.9-1.6-5.3 0 0-.1 0-.1-.1-.1-.1-.2-.2-.4-.3-.1-.1-.2-.1-.3-.2-.1-.1-.2-.2-.4-.2-.6-.4-1.2-.8-1.6-.9-.1-.1-.3-.1-.4-.2h-.1-.1c-.1 0-.3-.1-.4-.1-.1 0-.1 0-.2-.1h-.1l-.2-.4c-.2-.1-.4-.2-.5-.2h-.6c-.3 0-.5.1-.7.1-.7.1-1.2.3-1.7.4-.2 0-.3.1-.5.1-.5.1-1 .2-1.6.2-.4 0-.9-.1-1.5-.2-.4-.1-.8-.2-1.1-.3-.2-.1-.4-.1-.6-.2-.6-.2-1.1-.3-1.7-.4h-.2-1.8c-.3 0-.6.1-1 .1H57.9c-.8 0-1.5 0-2.3-.1-.2 0-.5-.1-.7-.1-.5-.1-.9-.2-1.3-.4-.2-.1-.3-.1-.4-.2-.1 0-.2 0-.2-.1-.3-.1-.6-.1-.9-.1H51h-.1c-.4 0-.9.1-1.4.2-1.1.2-2.1.6-3 1.3-.3.2-.6.5-.8.8-.1.1-.2.2-.2.3-.4.6-.8 1.2-.9 2 0 .2-.1.4-.1.6 0 .2 1.7.7 2.3 2.8-.8-1.2-2.3-2.5-4.1-1.4-1.5 1-1.1 3.1-2.4 5.4-.3.5-.6.9-1 1.4-.8 1-.7 2.1.2 4.4 1.4 3.4 7.6 5.3 11.5 8.3l.4.4zm8.7-36.3c0 .6.1 1 .2 1.6v.1c0 .3.1.6.1.9.1 1.2.4 2 1 2.9 0 .1.1.1.1.2.3.2.5.3.8.4 1.1.2 3.1.3 4.2 0 .2-.1.5-.3.7-.5.4-.4.7-1.1.9-1.7.1-.7.3-1.3.4-1.8 0-.2.1-.4.1-.5v-.1c0-.2 0-.3.1-.5.2-.7.2-2.4.3-2.8.1-.7 0-1.8-.1-2.5 0-.2-.1-.4-.1-.5v-.1c-.2-.5-1.4-1.4-4.3-1.4-3.1 0-4 1-4.1 1.5v.1c0 .1 0 .3-.1.5-.1.4-.2 1.4-.2 1.9v2.3zm-6 88.6c0-.1-.1-.2-.1-.3-.7-1.5-1.1-3.5-1.3-4.6.4.1.7.6.8.3.2-.5-.4-1.5-.5-2.2v-.1c-.5-.5-4-.5-3.7-.3-.4.8-1 .6-1.3 2.1-.1.7.8.1 1.7.1-1.4.9-3 2.1-3.4 3.2-.1.1-.1.2-.1.3 0 .2-.1.4-.1.5-.1 1.2.5 1.6 2 2.4H48.4c1.4.3 3 .3 4.3.3 1.2-.2 1.6-.7 1.6-1.4-.2-.1-.2-.2-.2-.3z" style=fill:#efefef /><path d="M56.1 36.5c.3 1.4.5 2.4.8 4.2h-.2c-.1.5-.1.9-.1 1.3-1-.4-2.2-.5-2.6-.5-3.7-4.4-2.9-6.1-4.4-8.3.4-.2 1-.4 1.5-.8 1.6 1.9 3.3 3 5 4.1zm-1.7 13.2s-1.4 0-2.3-1c0 0-.1-.5.1-.7 0 0-1.2-1-1.5-1.7-.2-.5-.3-1.1-.2-1.6-4.4-3.7-10.9-4.2-12.9-9.1-.5-1.2-1.3-2.9-.9-3.9-.3.1-.5.2-.8.3-2.9.9-11.7 5.3-17.9 8.8 1.6 1.7 2.6 4.3 3.2 7.2l.3 1.5c.1.5.1 1 .2 1.5.1 1.4.4 2.7.8 3.9.2.8.6 1.5.9 2.2.6 1 1.2 1.9 2.1 2.6.6.5 1.2.9 1.9 1.3 2.1 1.1 5 1.6 8.6 1.5H37.9c.5 0 1 .1 1.5.1h.1c.4.1.9.1 1.3.2h.2c.4.1.9.2 1.3.4h.1c.4.1.8.3 1.1.5h.1c.4.2.7.4 1.1.6h.1c.7.4 1.3.9 1.9 1.5l.1.1c.6.5 1.1 1.1 1.5 1.8 0 .1.1.1.1.2s.1.1.1.2c.4.6 1.2 1.1 1.9 1.3.7-.9 1.5-1.8 2.2-2.8-1.6-6 0-11.7 1.8-16.9zm-26-15.9c5-2.4 9-4.1 9.9-4.5.3-.6.6-1.4.9-2.6.1-.3.2-.5.3-.8 1-2.7 2.7-2.8 3.5-3v-.2c.1-1.1.5-2 1-2.8-8.8 2.5-18 5.5-28 11.7-.1.1-.2.2-.4.2C11.3 34.5 3 40.3 1.3 51c2.4-2.7 6-5.6 10.5-8.5.1-.1.3-.2.5-.3.2-.1.5-.3.7-.4 1.2-.7 2.4-1.4 3.6-2.2 2.2-1.2 4.5-2.4 6.7-3.5 1.8-.8 3.5-1.6 5.1-2.3zm54.9 61.3l-.3-.3c-.8-.6-4.1-1.2-5.5-2.3-.4-.3-1.1-.7-1.7-1.1-1.6-.9-3.5-1.8-3.5-2.1v-.1c-.2-1.7-.2-7 .1-8.8.3-1.8.7-4.4.8-5.1.1-.6.5-1.2.1-1.2h-.4c-.2 0-.4.1-.8.1-1.5.3-4.3.6-6.6.4-.9-.1-1.6-.2-2-.3-.5-.1-.7-.2-.9-.3H62.3c-.4.5 0 2.7.6 4.8.3 1.1.8 2 1.2 3 .3.8.6 1.8.8 3.1 0 .2.1.4.1.7.2 2.8.3 3.6-.2 4.9-.1.3-.3.6-.4 1-.4.9-.7 1.7-.6 2.3 0 .2.1.4.1.5.2.4.6.7 1.2.8.2 0 .3.1.5.1.3 0 .6.1.9.1 3.4 0 5.2 0 8.6.4 2.5.4 3.9.6 5.1.5.4 0 .9-.1 1.4-.1 1.2-.2 1.8-.5 1.9-.9-.1.2-.1.1-.2-.1zM60.2 16.4zm-.5 1.7zm3.8.5c.1 0 .3.1.5.1.4.1.7.2 1.2.3.3.1.6.1.9.1h1.3c.3-.1.7-.1 1-.2.7-.2 1.5-.4 2.7-.6h.3c.3 0 .6.1.9.3.1.1.2.1.4.2.3.2.8.2 1.2.4h.1c.1 0 .1.1.2.1.6.3 1.3.7 1.9 1.1l.3.3c.9-.1 1.6-.2 2.1-.2h.1c-.2-.4-.3-1.3-1.8-.6-.6-.7-.8-1.3-2.1-.9-.1-.2-.2-.3-.3-.4l-.1-.1c-.1-.1-.2-.3-.3-.4 0-.1-.1-.1-.1-.2-.2-.3-.5-.5-.9-.7-.7-.4-1.5-.6-2.3-.5-.2 0-.4.1-.6.2-.1 0-.2.1-.2.1-.1 0-.2.1-.3.2-.5.3-1.3.8-2.1 1-.1 0-.1 0-.2.1-.2 0-.4.1-.5.1H66.5h-.1c-.4-.1-1.1-.2-2-.5-.1 0-.2-.1-.3-.1-.9-.2-1.8-.5-2.7-.8-.3-.1-.7-.2-1-.3-.1 0-.1 0-.2-.1h-.1s-.1 0-.1-.1c-.3-.3-.7-.6-1.3-.8-.5-.2-1.2-.4-2.1-.5-.2 0-.5 0-.7.1-.4.2-.8.6-1.2.9.1.1.3.3.4.5.1.2.2.4.3.7l-.6-.6c-.5-.4-1.1-.8-1.7-.9-.8-.2-1.4.4-2.3.9 1 0 1.8.1 2.5.4.1 0 .1 0 .2.1h.1c.1 0 .2.1.3.1.9.4 1.8.6 2.7.6h1.3c.5 0 .8-.1 1.1-.1.1 0 .4 0 .7-.1h2.2c.4.4.9.6 1.6.8z" style=fill:#88ce02 /><path d="M100 51.8c0-19.5-12.5-36.1-30-42.1.1-1.2.2-2.4.3-3.1.1-1.5.2-3.9-.5-4.9-1.6-2.3-9.1-2.1-10.5-.1-.4.6-.7 3.6-.6 5.9-1.1-.1-2.2-.1-3.3-.1-16.5 0-30.9 9-38.6 22.3-2.4 1.4-4.7 2.8-6.1 4C5.4 38 2.2 43.2 1 47c-1.6 4.7-1.1 7.6.4 5.8 1.2-1.5 6.6-5.9 10.1-8.2-.4 2.3-.6 4.8-.6 7.2 0 21 14.5 38.5 34 43.3-.1 1.1.1 2 .7 2.6.9.8 3.2 2 6.4 1.6 2.9-.3 3.5-.5 3.2-2.9h.2c2.7 0 5.3-.2 7.8-.7.1.1.2.2.4.3 1.5 1 7.1.8 9.6.7s6.2.9 8.6.5c2.9-.5 3.4-2.3 1.6-3.2-1.5-.8-3.8-1.3-6.7-3.1C90.6 83.4 100 68.7 100 51.8zM60.1 5.5c0-.5.1-1.5.2-2.1 0-.2 0-.4.1-.5v-.1c.1-.5 1-1.5 4.1-1.5 2.9 0 4.2.9 4.3 1.4v.1c0 .1 0 .3.1.5.1.8.2 1.9.1 2.7 0 .5-.1 2.1-.2 2.9 0 .1 0 .3-.1.5v.1c0 .2-.1.3-.1.5-.1.5-.2 1.1-.4 1.8-.1.6-.5 1.2-.9 1.7-.2.3-.5.5-.7.5-1.1.3-3.1.3-4.2 0-.3-.1-.5-.2-.8-.4 0-.1-.1-.1-.1-.2-.6-.9-.9-1.7-1-2.9 0-.4-.1-.6-.1-.9v-.1c-.1-.6-.2-1-.2-1.6v-.3c-.1-1.3-.1-2.1-.1-2.1zm-.4 7.5v-.4c.6.6 1.3 1.3 1.8 1.7.2.2.5.3.8.3.2 0 .3 0 .5.1h1.6c.8 0 1.6.1 2 0 .1 0 .2 0 .3-.1.6-.3 1.4-1 2.1-1.6 0 .6.1 1.2.1 1.7v1.5c0 .3 0 .5.1.7-.1.1-.2.1-.4.2-.7.4-1.7 1-2.3.9-.5-.1-1.5-.3-2.6-.7-1.2-.3-2.4-.8-3.2-1.2 0 0-.1 0-.1-.1-.2-.3-.4-.5-.6-.7-.3-.4-.5-.6-.5-.7.3-.4.4-.9.4-1.6zm.5 3.4zm-7.3-.3c.6.1 1.2.5 1.7.9.2.2.5.4.6.6-.1-.2-.2-.5-.3-.7-.1-.2-.3-.4-.4-.5.4-.3.8-.7 1.2-.9.2-.1.4-.1.7-.1.9.1 1.6.2 2.1.5.6.2 1 .5 1.3.8 0 0 .1 0 .1.1h.1c.1 0 .1 0 .2.1.3.1.6.2 1 .3.9.3 1.9.6 2.7.8.1 0 .2.1.3.1.9.2 1.6.4 2 .5h.4c.2 0 .4 0 .5-.1.1 0 .1 0 .2-.1.7-.2 1.5-.7 2.1-1 .1-.1.2-.1.3-.2.1 0 .2-.1.2-.1.2-.1.4-.2.6-.2.8-.2 1.7.1 2.3.5.3.2.6.4.9.7 0 .1.1.1.1.2.1.2.2.3.3.4l.1.1c.1.1.2.2.3.4 1.3-.4 1.5.2 2.1.9 1.6-.7 1.7.2 1.8.6h-.1c-.5 0-1.2 0-2.1.2l-.3-.3c-.5-.4-1.2-.8-1.9-1.1-.1 0-.1-.1-.2-.1h-.1c-.4-.2-.8-.2-1.2-.4-.1-.1-.2-.1-.4-.2-.3-.1-.6-.3-.9-.3h-.3c-1.2.1-2 .4-2.7.6-.3.1-.7.2-1 .2-.4.1-.8.1-1.3 0-.3 0-.6-.1-.9-.1-.5-.1-.8-.2-1.2-.3-.2 0-.3-.1-.5-.1h-.1c-.6-.2-1.2-.3-1.8-.4h-.1-2.1c-.4.1-.6.1-.7.1-.3 0-.7.1-1.1.1h-1.3c-.9 0-1.9-.2-2.7-.6-.1 0-.2-.1-.3-.1H53c-.1 0-.1 0-.2-.1-.7-.3-1.6-.4-2.5-.4 1.2-.8 1.8-1.4 2.6-1.3zm6.8 2zm-15.2 4.1c.1-.7.4-1.4.9-2 .1-.1.2-.2.2-.3l.8-.8c.9-.6 1.9-1.1 3-1.3.5-.1 1-.2 1.4-.2H52c.3 0 .6.1.9.1.1 0 .2 0 .2.1.1.1.2.1.4.2.4.2.8.3 1.3.4.2 0 .5.1.7.1.7.1 1.5.1 2.3.1H58.7c.4 0 .7-.1 1-.1H61.7c.6.1 1.1.2 1.7.4.2 0 .4.1.6.2.3.1.7.2 1.1.3.6.1 1.1.2 1.5.2.6 0 1.1-.1 1.6-.2.2 0 .3-.1.5-.1.5-.1 1-.3 1.7-.4.2 0 .5-.1.7-.1h.6c.2 0 .4.1.5.2l.1.1h.1c.1 0 .1 0 .2.1.2.1.3.1.4.1h.2c.1.1.3.1.4.2.4.2 1 .6 1.6.9.1.1.2.2.4.2.1.1.2.1.3.2.2.1.3.3.4.3l.1.1c1.1 1.4 1.8 3.3 1.6 5.3-.3 1.5-1.6.7-2.5.3 0 0-.1 0-.1-.1-.3-.1-.6-.2-.9-.4-.2-.1-.4-.1-.5-.2-1.2-.4-2.5-.7-4-.7-2 0-4.6.1-6.8.8-3 .8-4 .8-5.3.1-.8-.4-1.8-1.1-2.6-1.7-.1-.1-.2-.1-.2-.2-.1-.1-.1-.1-.2-.1-.3-.2-.6-.4-.6-.5l-.1-.1c-.2.3-.6 1-.8 1.4v.1c-.1 1.7-1 4.2-2.6 5.6-.2.1-.4.3-.6.4-.2.1-.5.2-.7.3-.7.2-1.4.2-1.9-.2-.5-.3-1.3-.7-2.3-1.1 2 1.6 3 2.8 3.9 4.9.7 1.7 1.7 4 3.9 6.5l.3.3c1.1 0 2.1.2 3 .7.4.2.7.4 1 .7.2.2.4.3.5.5.5.4.9.8.8 1.3v.1s0 .1-.1.1c-.1.2-.3.5-.5.7-.1.1-.4.4-.6.7-.1.1-.2.2-.3.2-.1.1-.4.3-.7.6-.2.2-.4.3-.5.4-.2.1-.4.4-.6.5-.3.1-.5.2-.8.1-.3 0-.7-.2-1-.3-.5-.3.1-.3-.5-.8-1.4-1-2.2-1.7-1.9-3.4v-.2c-.2-.1-.3-.3-.5-.4-3.9-3-10.1-4.9-11.5-8.3-.9-2.3-1-3.4-.2-4.4.4-.5.8-1 1-1.4 1.3-2.3.9-4.4 2.4-5.4 1.8-1.2 3.3.2 4.1 1.4-.5-2.1-2.3-2.6-2.3-2.8.3.1.3-.1.3-.3zm29 20s-.1 0 0 0c-.1 0-.1 0 0 0-.9.1-3.3.3-5.4.3h-.9c-.7 0-1.3-.1-1.8-.2-.1 0-.2 0-.3-.1-.7-.2-1.6-.5-2.4-.8-.6-.2-1.2-.5-1.7-.7-1.1-.5-2.1-1.1-2.3-1.3-.5-1.4-.7-2.7-.7-3.4.8-.4 1.3-.7 1.9-1.4-1.7.3-2.4.2-3.4-.4-1-.5-2.6-2.2-3.6-3.4 1-1.2 1.7-2.9 1.4-5.1.1-.2.3-.4.4-.6 0 .1.1.1.2.2.7.9 2.4 2 4.6 2.8 1.1.4 2 .1 2.9-.1 4-1 8.1-1.3 11.9-.1.1 0 .2.1.3.1.5.2.9.4 1.4.6.1 0 .1.1.2.1.1.7.2 2-.3 3.5-.1.3-.2.6-.4.9-.2.3-.3.6-.5 1-.1.3-.2.5-.4.8-.2.4-.3.8-.5 1.3-.4 1.4-.7 3.4-.6 6zm-23.9-9c.4-.2 1-.4 1.5-.8 1.6 1.8 3.3 3 5 4.1.3 1.4.5 2.4.8 4.2h-.2c-.1.5-.1.9-.1 1.3-1-.4-2.2-.5-2.6-.5-3.7-4.3-3-6-4.4-8.3zm-32.9 6.5c-1.3.7-2.5 1.4-3.6 2.2-.2.1-.5.3-.7.4-.1.1-.3.2-.5.3-4.5 2.9-8.1 5.8-10.5 8.5 1.7-10.8 10-16.5 14.3-19.2.1-.1.2-.2.4-.2 10-6.2 19.2-9.2 28-11.7-.5.8-.9 1.7-1 2.8v.2c-.8.1-2.5.2-3.5 3-.1.2-.2.5-.3.8-.3 1.2-.6 2-.9 2.6-.9.4-5 2.2-9.9 4.5-1.6.8-3.3 1.6-5 2.4-2.3 1-4.6 2.2-6.8 3.4zm28 24.8s0-.1 0 0c-.4-.3-.8-.5-1.2-.7h-.1c-.4-.2-.7-.3-1.1-.5h-.1c-.4-.1-.8-.3-1.3-.4h-.2c-.4-.1-.8-.2-1.3-.2h-.1c-.5-.1-1-.1-1.5-.1H35.9c-3.7.1-6.5-.4-8.6-1.5-.7-.4-1.4-.8-1.9-1.3-.9-.7-1.5-1.6-2.1-2.6-.4-.7-.7-1.4-.9-2.2-.4-1.2-.6-2.5-.8-3.9 0-.5-.1-1-.2-1.5l-.3-1.5c-.6-2.9-1.6-5.5-3.2-7.2 6.3-3.5 15-7.9 17.8-8.8.3-.1.6-.2.8-.3-.3 1.1.4 2.7.9 3.9 2.1 4.9 8.6 5.4 12.9 9.1 0 .5 0 1.1.2 1.6.5.6 1.7 1.6 1.7 1.6-.2.2-.1.7-.1.7.9 1 2.3 1 2.3 1-1.8 5.2-3.4 10.9-1.9 16.9-.7 1-1.5 1.8-2.2 2.8-.7-.2-1.4-.6-1.9-1.3 0-.1-.1-.1-.1-.2s-.1-.1-.1-.2l-1.5-1.8-.1-.1c-.5-.4-1.2-.9-1.9-1.3zm7.9 33.6c-1.3.1-2.9 0-4.3-.3h-.2-.1c-1.5-.8-2.1-1.2-2-2.4 0-.2 0-.3.1-.5 0-.1.1-.2.1-.3.5-1.1 2.1-2.2 3.4-3.2-.8 0-1.8.7-1.7-.1.2-1.5.9-1.3 1.3-2.1-.2-.3 3.3-.2 3.8.3v.1c0 .7.7 1.7.5 2.2-.1.3-.4-.2-.8-.3.2 1.1.6 3.1 1.3 4.6.1.1.1.2.1.3 0 .1.1.2.1.3 0 .7-.4 1.2-1.6 1.4zM59 67.7c0 .9-.3 1.6-.6 2-.7 1.1-1.7 1.4-2 3.2.4-.6 1.1-1.1 1.1-.9 0 .8-.1 1.4-.1 2v.2c-.1.6-.2 1.1-.3 1.6-.2.9-.5 1.7-.7 2.4-.4 1.2-.9 2.1-1.3 3.1l-.6 1.5c-.6 1.7-.4 5.6-.6 5.7-1.6.3-4.1-.3-4.7-.6.3-2.2.4-4.5.5-6.9.1-2.1.3-4.3.9-6.6.1-.5.3-1 .4-1.5 0-.1 0-.2.1-.2 0-.1 0-.1.1-.2.5-1.6 1.4-2.7 2.6-4.2.4-.4.7-.9 1.2-1.4-.1-.4-.2-.8-.4-1.3-.7-2.6-1.3-7.3 1.5-16.1.1 0 .2-.1.3-.1.2-.1.7-.5.8-.6.1-.1.3-.2.4-.3.1 0 .1-.1.2-.1l.6-.6 1.1-1.1c.4-.4.7-.5.8-.9v-.2c0-.8-1.1-1.5-1.5-2.1l-.1-.1c.1-.2.1-.4.2-.6 0-.2.1-.5.1-.8 0-.2.1-.5.1-.7.1.1.6.4 1.8.7.6.2 1.3.4 2.3.7 1.1.3 2.4.5 3.6.6 2.9.2 5.6 0 6.7-.2h.3v.1c0 .1 0 .2-.1.3v.9c0 .2 0 .3.1.5v.1c0 .4.1.7.2 1.1 0 .3.1.5.1.7v.1c0 .3.1.5.1.7 0 .2.1.3.1.5.1.2.1.4.2.6v.2c.1.4.2.8.2 1.1 1 5.7 2.3 12.9-1.1 16.7.2.8.3 1.9 0 3.2-.1.7-.3 1.4-.6 2.2-.2.5-.3 1-.5 1.5h-.3c-4.5.6-7.1.2-8.3-.1.5-1.6 1.7-3.3 3.7-3.2-.1-3.7-1.1-5-2-7.6 1.3-3 1.3-5.7 2-9.2v-.2c.2-.8.3-1.6.6-2.5-.4.5-.8 1.5-1.2 2.6v.1c-.5 1.5-.9 3.4-1.2 4.8-.2.8-.4 1.6-.7 2.4-.2.5-.4.9-.6 1.4-1.5 1.9-3 3.9-5.5 5.6zm18.5 24.9c1.5 1.1 4.7 1.8 5.5 2.3l.3.3c.1.1.1.2.1.3-.1.4-.7.7-1.9.9-.5.1-.9.1-1.4.1-1.3 0-2.6-.2-5.1-.5-3.4-.5-5.2-.4-8.6-.4-.3 0-.6 0-.9-.1-.2 0-.4-.1-.5-.1-.6-.2-1-.5-1.2-.8-.1-.2-.1-.3-.1-.5-.1-.7.2-1.5.6-2.3.2-.4.3-.7.4-1 .5-1.3.4-2.1.2-4.9 0-.2-.1-.4-.1-.7-.2-1.3-.5-2.3-.8-3.1-.4-1.1-.9-1.9-1.2-3-.6-2.1-1-4.3-.6-4.8H62.5c.2.1.5.2.9.3.5.1 1.1.2 2 .3 2.2.2 5.1-.2 6.6-.4.3-.1.6-.1.8-.1h.4c.4 0 .1.6-.1 1.2-.1.7-.5 3.3-.8 5.1-.3 1.8-.2 7.1-.1 8.8v.1c0 .3 1.9 1.2 3.5 2.1.7.2 1.4.5 1.8.9zm4.8-48.2c0 .1 0 .1 0 0-.1.1-.2.2-.2.3 0-.1-.1-.1-.1-.2 0 .1 0 .2-.1.2-.2.9-.6 2.4-2.2 4.1-.4.4-.7.6-1 .7-.5.1-.9 0-1.5-.1-.9-.2-1.3-.6-2.2-1.1-.1-.6-.3-1.3-.4-1.8 0-.3-.1-.5-.1-.6v-1l.4-.4s.7-1 1.8-1 2.2-.2 2.5-.5v-.1-.3c0-.1 0-.2-.1-.3-.4-1.4-2.1-1.8-1.4-4.8 0-.2.3-.5 1.2-.5-1.4-.3-2-.4-3-1.3.5-1.1 1-1.9 1.3-2.6.8-1.5.3-3.5.3-3.5.8-.3 1.6-.7 1.7-1 .9-2.8-.7-5.5-2.5-7.2 1.2-.1 2.6.1 3.6 1.1 2.4 2.4 1.8 5 1 6.8.6.7 2.1 2.9 1.2 5.3-.2.6-1.4.6-2.3 2.1 2.3-1.3 3.7-1 4.2.7 1 2.4-.6 5.3-2.1 7z"/><path d="M22 53.4v-.2c0-.2-.1-.5-.2-.9s-.1-.8-.2-1.3c-.5-4.7-1.9-9.4-4.9-11.3 3.7-2 16.8-8.5 21.9-10.5 2.9-1.2.8-.4-.2 1.4-.8 1.4-.3 2.9-.5 3.2-.6.8-12.6 10.5-15.9 19.6zm32.2-2.3c-3.4 3.8-12 11-18.2 11.4 8.7-.2 12.2 4.1 14.7 9.7 2.6-5.2 2.7-10.3 2.6-16.1 0-2.6 1.8-6 .9-5zm5.3-23L54.3 24s-1.1 3.1-1 4.6c.1 1.6-1.8 2.7-.9 3.6.9.9 3.2 2.5 4 3.4.7.9 1.1 7.1 1.1 7.1l2.2 2.7s1-1.8 1.1-6.3c.2-5.4-2.9-7.1-3.3-8.6-.4-1.4.6-2.9 2-2.4zm3.1 45.6l3.9.3s1.2-2.2 2.1-3.5c.9-1.4.4-1.6 0-4.6-.4-3-1.4-9.3-1.2-13.6l-3.1 10.2s1.8 5.6 1.6 6.4c-.1.8-3.3 4.8-3.3 4.8zm5 18.8c-1.1 0-2.5-.4-3.5-.8l-1 .3.2 4s5.2.7 4.6-.4c-.6-1.2-.3-3.1-.3-3.1zm12 .6c-1 0-.3.2.4 1.2.8 1 .1 2-.8 2.3l3.2.5 1.9-1.7c.1 0-3.7-2.3-4.7-2.3zM73 76c-1.6.5-4.2.8-5.9.8-1.7.1-3.7-.1-5-.5v1.4s1.2.5 5.4.5c3.5.1 5.7-.8 5.7-.8l.9-.8c-.1.1.5-1.1-1.1-.6zm-.2 3.1c-1.6.6-3.9.6-5.6.7-1.7.1-3.7-.1-5-.5l.1 1.4s.7.3 4.9.4c3.5.1 5.7-.7 5.7-.7l.3-.5c-.1-.1.3-1-.4-.8zm5.9-42.7c-.9-.8-1.4-2.4-1.5-3.3l-1.9 2.5.7 1.2s2.5.1 2.8.1c.4 0 .3-.1-.1-.5zM69 14.7c.6-.7.2-2.7.2-2.7L66 14.6l-4.4-.8-.5-1.3-1.3-.1c.8 1.8 1.8 2.5 3.3 3.1.9.4 4.5.9 5.9-.8z" style=opacity:.4;fill-rule:evenodd;clip-rule:evenodd /></svg></a></div></div>', e && (i.style.position = "absolute", i.style.top = t ? "calc(100% - 42px)" : "calc(100% - 51px)"), o && (st(o) ? i.style.cssText = o : "object" == typeof o && (o.data = "root", Fe.set(i, o).kill()), i.style.top && (i.style.bottom = "auto"), i.style.width && Fe.set(i, {
      xPercent: -50,
      left: "50%",
      right: "auto",
      data: "root"
    }).kill()), !t && i.offsetWidth < 600 && (i.setAttribute("class", "gs-dev-tools minimal"), e && (i.style.top = "calc(100% - 42px)")), i;
  })(e.container, e.minimal, e.css),
      f = e => m.querySelector(e),
      x = (t, o) => (!1 !== e.persist && ut && sessionStorage.setItem("gs-dev-" + t + e.id, o), o),
      v = t => {
    let o;
    if (!1 !== e.persist && ut) return o = sessionStorage.getItem("gs-dev-" + t + e.id), "animation" === t ? o : "loop" === t ? "true" === o : parseFloat(o);
  },
      y = f(".playhead"),
      w = f(".timeline-track"),
      b = f(".progress-bar"),
      T = f(".time"),
      k = f(".duration"),
      _ = 0,
      M = f(".in-point"),
      S = f(".out-point"),
      D = 0,
      C = 100,
      E = f(".animation-list"),
      L = f(".animation-label"),
      P = f(".play-pause"),
      X = (e => {
    let t = Fe.timeline({
      data: "root",
      parent: Qe,
      onComplete: () => t.kill()
    }, Qe._time);
    return t.to(e.querySelector(".play-1"), {
      duration: .4,
      attr: {
        d: "M5.75,3.13 C5.75,9.79 5.75,16.46 5.75,23.13 4.08,23.13 2.41,23.13 0.75,23.13 0.75,16.46 0.75,9.79 0.75,3.12 2.41,3.12 4.08,3.12 5.75,3.12"
      },
      ease: "power2.inOut",
      rotation: 360,
      transformOrigin: "50% 50%"
    }).to(e.querySelector(".play-2"), {
      duration: .4,
      attr: {
        d: "M16.38,3.13 C16.38,9.79 16.38,16.46 16.38,23.13 14.71,23.13 13.04,23.13 11.38,23.13 11.38,16.46 11.38,9.79 11.38,3.12 13.04,3.12 14.71,3.12 16.38,3.12"
      },
      ease: "power2.inOut",
      rotation: 360,
      transformOrigin: "50% 50%"
    }, .05), t;
  })(P),
      N = !1,
      Y = f(".loop"),
      H = (e => {
    let t = Fe.timeline({
      data: "root",
      id: "loop",
      parent: Qe,
      paused: !0,
      onComplete: () => t.kill()
    }, Qe._time);
    return t.to(e, {
      duration: .5,
      rotation: 360,
      ease: "power3.inOut",
      transformOrigin: "50% 50%"
    }).to(e.querySelectorAll(".loop-path"), {
      duration: .5,
      fill: "#91e600",
      ease: "none"
    }, 0), t;
  })(Y),
      z = f(".time-scale select"),
      B = f(".time-scale-label"),
      R = (e, s, a) => function (d) {
    let c,
        p = w.getBoundingClientRect(),
        g = e.getBoundingClientRect(),
        h = g.width * s,
        u = Fe.getProperty(e, "x"),
        m = p.left - g.left - h + u,
        f = p.right - g.right + (g.width - h) + u,
        x = m;
    a && (e !== M && (c = M.getBoundingClientRect(), c.left && (m += c.left + c.width - p.left)), e !== S && (c = S.getBoundingClientRect(), c.left && (f -= p.left + p.width - c.left))), l = N, this.applyBounds({
      minX: m,
      maxX: f
    }), t = r.duration() / p.width, o = -x * t, n ? r.pause() : r.pause(o + t * this.x), this.target === y && (this.activated && (this.allowEventDefault = !1), this.activated = !0), i = !0;
  },
      I = Ae.create(y, {
    type: "x",
    cursor: "ew-resize",
    allowNativeTouchScrolling: !1,
    allowEventDefault: !0,
    onPress: R(y, .5, !0),
    onDrag: function () {
      let e = o + t * this.x;
      e < 0 ? e = 0 : e > r._dur && (e = r._dur), n || r.time(e), b.style.width = Math.min(C - D, Math.max(0, e / r._dur * 100 - D)) + "%", T.innerHTML = e.toFixed(2);
    },
    onRelease: function () {
      N || r.resume();
    }
  })[0],
      O = () => {
    D = 0, C = 100, M.style.left = "0%", S.style.left = "100%", x("in", D), x("out", C), W(!0);
  },
      A = Ae.create(M, {
    type: "x",
    cursor: "ew-resize",
    zIndexBoost: !1,
    allowNativeTouchScrolling: !1,
    allowEventDefault: !0,
    onPress: R(M, 1, !0),
    onDoubleClick: O,
    onDrag: function () {
      D = (o + t * this.x) / r.duration() * 100, r.progress(D / 100), W(!0);
    },
    onRelease: function () {
      D < 0 && (D = 0), ft(), M.style.left = D + "%", x("in", D), Fe.set(M, {
        x: 0,
        data: "root",
        display: "block"
      }), N || r.resume();
    }
  })[0],
      F = Ae.create(S, {
    type: "x",
    cursor: "ew-resize",
    allowNativeTouchScrolling: !1,
    allowEventDefault: !0,
    zIndexBoost: !1,
    onPress: R(S, 0, !0),
    onDoubleClick: O,
    onDrag: function () {
      C = (o + t * this.x) / r.duration() * 100, r.progress(C / 100), W(!0);
    },
    onRelease: function () {
      C > 100 && (C = 100), ft(), S.style.left = C + "%", x("out", C), Fe.set(S, {
        x: 0,
        data: "root",
        display: "block"
      }), l || (G(), r.resume());
    }
  })[0],
      W = function (e) {
    if (I.isPressed && !0 !== e) return;
    let t,
        o = h || -1 !== s._repeat ? 100 * r.progress() || 0 : s.totalTime() / s.duration() * 100,
        n = s._repeat && s._rDelay && s.totalTime() % (s.duration() + s._rDelay) > s.duration();
    o > 100 && (o = 100), o >= C ? !h || r.paused() || I.isDragging ? (o === C && -1 !== s._repeat || (o = C, r.progress(o / 100)), !N && (C < 100 || 1 === s.totalProgress() || -1 === s._repeat) && q()) : n || (o = D, t = r._targets && r._targets[0], t === s && t.seek(d + (c - d) * D / 100), s._repeat > 0 && !D && 100 === C ? 1 === s.totalProgress() && r.totalProgress(0, !0).resume() : r.progress(o / 100, !0).resume()) : o < D && (o = D, r.progress(o / 100, !0)), o === _ && !0 !== e || (b.style.left = D + "%", b.style.width = Math.max(0, o - D) + "%", y.style.left = o + "%", T.innerHTML = r._time.toFixed(2), k.innerHTML = r._dur.toFixed(2), i && (y.style.transform = "translate(-50%,0)", y._gsap.x = "0px", y._gsap.xPercent = -50, i = !1), _ = o), r.paused() !== N && K();
  },
      V = function (e) {
    if (I.isPressed) return;
    let t = e.target.getBoundingClientRect(),
        o = ((e.changedTouches ? e.changedTouches[0] : e).clientX - t.left) / t.width * 100;
    return o < D ? (D = o = Math.max(0, o), M.style.left = D + "%", void A.startDrag(e)) : o > C ? (C = o = Math.min(100, o), S.style.left = C + "%", void F.startDrag(e)) : (r.progress(o / 100).pause(), W(!0), void I.startDrag(e));
  },
      G = () => {
    if (r.progress() >= C / 100) {
      Ct(r, e);
      let t = r._targets && r._targets[0];
      t === s && t.seek(d + (c - d) * D / 100), r._repeat && !D ? r.totalProgress(0, !0) : r.reversed() || r.progress(D / 100, !0);
    }

    X.play(), r.resume(), N && u.update(), N = !1;
  },
      q = () => {
    X.reverse(), r && r.pause(), N = !0;
  },
      K = () => {
    N ? G() : q();
  },
      Z = t => {
    if (I.isPressed) return;
    Ct(r, e);
    let o = r._targets && r._targets[0];
    o === s && o.seek(d + (c - d) * D / 100), r.progress(D / 100, !0), N || r.resume();
  },
      j = e => {
    if (h = e, x("loop", h), h) {
      if (H.play(), r.progress() >= C / 100) {
        let e = r._targets && r._targets[0];
        e === s && e.seek(d + (c - d) * D / 100), s._repeat && !D && 100 === C ? r.totalProgress(0, !0) : r.progress(D / 100, !0), G();
      }
    } else H.reverse();
  },
      U = () => j(!h),
      $ = () => {
    let t,
        o,
        i = xt(a && !e.globalSync ? a : Ke, !0),
        n = E.children,
        l = 0;

    for (a && !e.globalSync ? i.unshift(a) : e.hideGlobalTimeline || i.unshift(Ke), o = 0; o < i.length; o++) t = n[o] || mt("option", E), t.animation = i[o], l = o && i[o].vars.id === i[o - 1].vars.id ? l + 1 : 0, t.setAttribute("value", t.innerHTML = i[o].vars.id + (l ? " [" + l + "]" : i[o + 1] && i[o + 1].vars.id === i[o].vars.id ? " [0]" : ""));

    for (; o < n.length; o++) E.removeChild(n[o]);
  },
      J = function (t) {
    let o,
        i,
        n = parseFloat(z.options[z.selectedIndex].value) || 1;
    if (!arguments.length) return s;

    if (st(t) && (t = St(t)), t instanceof Ze || console.warn("GSDevTools error: invalid animation."), t !== s) {
      if (s && (s._inProgress = D, s._outProgress = C), s = t, r && (n = r.timeScale(), r._targets && r._targets[0] === a && (a.resume(), r.kill())), D = s._inProgress || 0, C = s._outProgress || 100, M.style.left = D + "%", S.style.left = C + "%", p && (x("animation", s.vars.id), x("in", D), x("out", C)), d = 0, i = e.maxDuration || Math.min(1e3, vt(s)), s === Ke || e.globalSync) {
        if (Mt(), r = je, Ue && Ue !== u && console.warn("Error: GSDevTools can only have one instance that's globally synchronized."), Ue = u, s !== Ke) for (o = s, c = o.totalDuration(), c > 99999999 && (c = o.duration()); o.parent;) d = d / o._ts + o._start, c = c / o._ts + o._start, o = o.parent;else c = Ke.duration();
        c - d > i && (c = d + i), Ke.pause(d), je.vars.time = c, je.invalidate(), je.duration(c - d).timeScale(n), N ? je.progress(1, !0).pause(0, !0) : et(.01, () => {
          je.resume().progress(D / 100), N && G();
        });
      } else {
        if (Ue === u && (Ue = null), d = Math.min(D * s.duration(), s.time()), s !== a && a) {
          for (o = s, c = o.totalDuration(), c > 99999999 && (c = o.duration()); o.parent.parent && o !== a;) d = d / (o._ts || o._pauseTS) + o._start, c = c / (o._ts || o._pauseTS) + o._start, o = o.parent;

          c - d > i && (c = d + i), a.pause(d), r = Fe.to(a, {
            duration: c - d,
            time: c,
            ease: "none",
            data: "root",
            parent: Qe
          }, Qe._time);
        } else r = s, !h && r._repeat && j(!0);

        r.timeScale(n), je.pause(), Ke.resume(), r.seek(0);
      }

      k.innerHTML = r.duration().toFixed(2), kt(E, s.vars.id, L);
    }
  },
      Q = e => {
    J(E.options[E.selectedIndex].animation), e.target && e.target.blur && e.target.blur(), N && G();
  },
      ee = e => {
    let t,
        o = parseFloat(z.options[z.selectedIndex].value) || 1;
    r.timeScale(o), x("timeScale", o), N || (r.progress() >= C / 100 ? (t = r._targets && r._targets[0], t === s && t.seek(d + (c - d) * D / 100), r.progress(D / 100, !0).pause()) : r.pause(), et(.01, () => r.resume())), B.innerHTML = o + "x", z.blur && z.blur();
  },
      te = Fe.to([f(".gs-bottom"), f(".gs-top")], {
    duration: .3,
    autoAlpha: 0,
    y: 50,
    ease: "power2.in",
    data: "root",
    paused: !0,
    parent: Qe
  }, Qe._time),
      oe = !1,
      ie = e => {
    Ae.hitTest(e, m) || I.isDragging || A.isDragging || F.isDragging || se.restart(!0);
  },
      ne = () => {
    oe || (te.play(), se.pause(), oe = !0);
  },
      le = () => {
    se.pause(), oe && (te.reverse(), oe = !1);
  },
      se = et(1.3, ne).pause(),
      re = t => {
    var o;
    ot && !it && (it = Ke._start), p = !t, o = e.animation, a = o instanceof Ze ? o : o ? Fe.getById(o) : null, a && !a.vars.id && (a.vars.id = "[no id]"), Mt(), $();
    let i = St(v("animation"));
    i && (i._inProgress = v("in") || 0, i._outProgress = v("out") || 100), e.paused && q(), s = null, J(a || i || Ke);
    let n = e.timeScale || v("timeScale"),
        l = i === s;
    n && (kt(z, n, B, n + "x"), r.timeScale(n)), D = ("inTime" in e ? yt(e.inTime, s, 0, 0) : l ? i._inProgress : 0) || 0, 100 === D && !e.animation && i && (J(Ke), D = yt(e.inTime, s, 0, 0) || 0), D && (M.style.left = D + "%", M.style.display = S.style.display = "block"), C = ("outTime" in e ? yt(e.outTime, s, 100, D) : l ? i._outProgress : 0) || 100, C < D && (C = 100), 100 !== C && (S.style.left = C + "%", M.style.display = S.style.display = "block"), h = "loop" in e ? e.loop : v("loop"), h && j(!0), e.paused && r.progress(D / 100, !0).pause(), ot && s === Ke && it && e.globalSync && !N && r.time(-it, !0), W(!0);
  };

  bt(E, "change", Q), bt(E, "mousedown", $), bt(P, "mousedown", K), bt(f(".seek-bar"), "mousedown", V), bt(f(".rewind"), "mousedown", Z), bt(Y, "mousedown", U), bt(z, "change", ee), "auto" === e.visibility ? (bt(m, "mouseout", ie), bt(m, "mouseover", le)) : "hidden" === e.visibility && (oe = !0, te.progress(1)), !1 !== e.keyboard && ($e && e.keyboard ? console.warn("[GSDevTools warning] only one instance can be affected by keyboard shortcuts. There is already one active.") : ($e = u, g = e => {
    let t,
        o = e.keyCode ? e.keyCode : e.which;
    32 === o ? K() : 38 === o ? (t = parseFloat(_t(z, -1, B)), r.timeScale(t), x("timeScale", t)) : 40 === o ? (t = parseFloat(_t(z, 1, B)), r.timeScale(t), x("timeScale", t)) : 37 === o ? Z() : 39 === o ? r.progress(C / 100) : 76 === o ? U() : 72 === o ? oe ? le() : ne() : 73 === o ? (D = 100 * r.progress(), x("in", D), M.style.left = D + "%", W(!0)) : 79 === o && (C = 100 * r.progress(), x("out", C), S.style.left = C + "%", W(!0));
  }, bt(Ge, "keydown", g))), Fe.set(y, {
    xPercent: -50,
    x: 0,
    data: "root"
  }), Fe.set(M, {
    xPercent: -100,
    x: 0,
    data: "root"
  }), M._gsIgnore = S._gsIgnore = y._gsIgnore = P._gsIgnore = Y._gsIgnore = !0, Fe.killTweensOf([M, S, y]), re(ot), ot && et(1e-4, re, [!1], this), Fe.ticker.add(W), this.update = e => {
    Ue === u && (je.paused() && !e || Mt(), (() => {
      let e, t, o;
      s === Ke && (e = Ke._time, Ke.progress(1, !0).time(e, !0), e = (je._dp._time - je._start) * je._ts, o = Math.min(1e3, Ke.duration()), 1e3 === o && (o = Math.min(1e3, vt(Ke))), t = je.duration() / o, 1 !== t && o && (D *= t, C < 100 && (C *= t), je.seek(0), je.vars.time = o, je.invalidate(), je.duration(o), je.time(e), k.innerHTML = o.toFixed(2), M.style.left = D + "%", S.style.left = C + "%", W(!0)));
    })());
  }, this.kill = () => {
    Tt(E, "change", Q), Tt(E, "mousedown", $), Tt(P, "mousedown", K), Tt(f(".seek-bar"), "mousedown", V), Tt(f(".rewind"), "mousedown", Z), Tt(Y, "mousedown", U), Tt(z, "change", ee), I.disable(), A.disable(), F.disable(), Fe.ticker.remove(W), Tt(m, "mouseout", ie), Tt(m, "mouseover", le), m.parentNode.removeChild(m), Ue === u && (Ue = null), $e === u && ($e = null, Tt(Ge, "keydown", g)), delete ht[e.id + ""];
  }, this.minimal = function (t) {
    let o,
        i = m.classList.contains("minimal");
    if (!arguments.length || i === t) return i;
    t ? m.classList.add("minimal") : m.classList.remove("minimal"), e.container && (m.style.top = t ? "calc(100% - 42px)" : "calc(100% - 51px)"), I.isPressed && (n = !0, I.endDrag(I.pointerEvent), n = !1, o = 100 * r.progress(), b.style.width = Math.max(0, o - D) + "%", y.style.left = o + "%", y.style.transform = "translate(-50%,0)", y._gsap.x = "0px", y._gsap.xPercent = -50, I.startDrag(I.pointerEvent, !0));
  }, this.animation = J, this.updateList = $;
};

exports.GSDevTools = Et;
Et.version = "3.10.4", Et.globalRecordingTime = 2, Et.getById = e => e ? ht[e] : Ue, Et.getByAnimation = e => {
  st(e) && (e = Fe.getById(e));

  for (let t in ht) if (ht[t].animation() === e) return ht[t];
}, Et.create = e => new Et(e), Et.register = Dt, lt() && Fe.registerPlugin(Et);
var _default = Et;
exports.default = _default;
},{}],"src/index.js":[function(require,module,exports) {
"use strict";

var _gsapTrial = _interopRequireDefault(require("gsap-trial"));

var _ScrollTrigger = require("gsap-trial/ScrollTrigger");

var _DrawSVGPlugin = require("gsap-trial/DrawSVGPlugin");

var _MotionPathPlugin = require("gsap-trial/MotionPathPlugin");

var _GSDevTools = require("gsap-trial/GSDevTools");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// import { ScrollSmoother } from "gsap-trial/ScrollSmoother";
console.log("yolo");

_gsapTrial.default.registerPlugin(_ScrollTrigger.ScrollTrigger, _DrawSVGPlugin.DrawSVGPlugin, _MotionPathPlugin.MotionPathPlugin, _GSDevTools.GSDevTools // ScrollSmoother
);

_gsapTrial.default.to(".main-title", {
  yPercent: -200,
  ease: "none",
  scrollTrigger: {
    trigger: ".title",
    // start: "top bottom", // the default values
    // end: "bottom top",
    scrub: true
  }
});

_gsapTrial.default.to(".sub-title", {
  yPercent: 50,
  ease: "none",
  scrollTrigger: {
    trigger: ".title",
    // start: "top bottom", // the default values
    // end: "bottom top",
    scrub: true
  }
});

_gsapTrial.default.defaults({
  ease: "none"
});

var pulses = _gsapTrial.default.timeline({
  defaults: {
    scale: 2,
    autoAlpha: 1,
    transformOrigin: "center",
    ease: "elastic(2.5,1)"
  }
}) // These are the GSAP Timeline timings of when to pulse the text & circles
.to(".storyText01, .ball01", {}, 7.05).to(".storyText02, .ball02", {}, 20.44).to(".storyText03, .ball03", {}, 25.4).to(".storyText04, .ball04", {}, 49.4).to(".storyText05, .ball05", {}, 60.26).to(".storyText06, .ball06", {}, 65.65).to(".storyText07, .ball07", {}, 75).to(".storyText08, .ball08", {}, 81.72).to(".storyText09, .ball09", {}, 82.41);

var main = _gsapTrial.default.timeline({
  scrollTrigger: {
    trigger: "#svg",
    scrub: true,
    start: "top top",
    end: "bottom 70%" // markers: true

  }
}).from(".theLine", {
  drawSVG: 0,
  duration: 100
}).to(".waka", {
  motionPath: {
    path: ".theLine",
    align: ".theLine",
    alignOrigin: [0.5, 1.2],
    autoRotate: 90
  },
  duration: 100
}, 0)
/* ==============
    Ui TeRangi Ora
   ============== */
.to(".UiTeRangi", {
  scrollTrigger: {
    trigger: ".UiTeRangi",
    start: "center 40%",
    // end: "+=450",
    // pin: "#svg",
    // markers: true,
    toggleClass: {
      targets: ".storyUiTeRangiHidden",
      className: "storyUiTeRangiShow"
    }
  },
  duration: 100
}, 0).add(pulses, 0)
/* ==============
     Maui
 ============== */
.to(".Maui", {
  scrollTrigger: {
    trigger: ".Maui",
    start: "center 40%",
    // end: "+=350",
    // pin: "#svg",
    // markers: true,
    toggleClass: {
      targets: ".storyMauiHidden",
      className: "storyMauiShow"
    }
  },
  duration: 100
}, 0).add(pulses, 0); // GSDevTools.create({ animation: main });
// Lightboxes


document.getElementById("uiterangi-playbutton").addEventListener("click", triggerUiTerangiLightbox, false);
document.getElementById("maui-playbutton").addEventListener("click", triggerMauiLightbox, false);
document.getElementById("disclaimer-infobutton").addEventListener("click", triggerInfoLightbox, false);
console.log(document.getElementById("disclaimer-infobutton")); // info button

function triggerInfoLightbox() {
  console.log("info clicked"); // add noscroll class to body

  document.getElementsByTagName("body")[0].classList.add("noscroll"); // display: flex to lightbox info

  document.getElementById("info-lightbox").classList.add("active");
} // maui lightbox


function triggerUiTerangiLightbox() {
  // add noscroll class to body
  document.getElementsByTagName("body")[0].classList.add("noscroll"); // display: flex to lightbox maui

  document.getElementById("uiterangi-lightbox").classList.add("active");
} // te uirangi ora lightbox


function triggerMauiLightbox() {
  // add noscroll class to body
  document.getElementsByTagName("body")[0].classList.add("noscroll"); // display: flex to lightbox maui

  document.getElementById("maui-lightbox").classList.add("active");
} // close x's


var closeXs = document.querySelectorAll('.close-button');
console.log("closeXs", closeXs);
closeXs.forEach(function (X) {
  X.addEventListener('click', function handleClick(event) {
    // remove noscroll class from body
    document.getElementsByTagName("body")[0].classList.remove("noscroll"); // remove active class from all lightboxes

    document.querySelectorAll(".lightbox").forEach(function (obj) {
      return obj.classList.remove("active");
    }); // stop videos

    var videos = document.querySelectorAll('iframe');
    videos.forEach(function (i) {
      var source = i.src;
      i.src = '';
      i.src = source;
    });
  });
});
},{"gsap-trial":"node_modules/gsap-trial/index.js","gsap-trial/ScrollTrigger":"node_modules/gsap-trial/ScrollTrigger.js","gsap-trial/DrawSVGPlugin":"node_modules/gsap-trial/DrawSVGPlugin.js","gsap-trial/MotionPathPlugin":"node_modules/gsap-trial/MotionPathPlugin.js","gsap-trial/GSDevTools":"node_modules/gsap-trial/GSDevTools.js"}],"node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
var global = arguments[3];
var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;

function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    data: module.bundle.hotData,
    _acceptCallbacks: [],
    _disposeCallbacks: [],
    accept: function (fn) {
      this._acceptCallbacks.push(fn || function () {});
    },
    dispose: function (fn) {
      this._disposeCallbacks.push(fn);
    }
  };
  module.bundle.hotData = null;
}

module.bundle.Module = Module;
var checkedAssets, assetsToAccept;
var parent = module.bundle.parent;

if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = "" || location.hostname;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "59144" + '/');

  ws.onmessage = function (event) {
    checkedAssets = {};
    assetsToAccept = [];
    var data = JSON.parse(event.data);

    if (data.type === 'update') {
      var handled = false;
      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          var didAccept = hmrAcceptCheck(global.parcelRequire, asset.id);

          if (didAccept) {
            handled = true;
          }
        }
      }); // Enable HMR for CSS by default.

      handled = handled || data.assets.every(function (asset) {
        return asset.type === 'css' && asset.generated.js;
      });

      if (handled) {
        console.clear();
        data.assets.forEach(function (asset) {
          hmrApply(global.parcelRequire, asset);
        });
        assetsToAccept.forEach(function (v) {
          hmrAcceptRun(v[0], v[1]);
        });
      } else if (location.reload) {
        // `location` global exists in a web worker context but lacks `.reload()` function.
        location.reload();
      }
    }

    if (data.type === 'reload') {
      ws.close();

      ws.onclose = function () {
        location.reload();
      };
    }

    if (data.type === 'error-resolved') {
      console.log('[parcel] ✨ Error resolved');
      removeErrorOverlay();
    }

    if (data.type === 'error') {
      console.error('[parcel] 🚨  ' + data.error.message + '\n' + data.error.stack);
      removeErrorOverlay();
      var overlay = createErrorOverlay(data);
      document.body.appendChild(overlay);
    }
  };
}

function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);

  if (overlay) {
    overlay.remove();
  }
}

function createErrorOverlay(data) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID; // html encode message and stack trace

  var message = document.createElement('div');
  var stackTrace = document.createElement('pre');
  message.innerText = data.error.message;
  stackTrace.innerText = data.error.stack;
  overlay.innerHTML = '<div style="background: black; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; opacity: 0.85; font-family: Menlo, Consolas, monospace; z-index: 9999;">' + '<span style="background: red; padding: 2px 4px; border-radius: 2px;">ERROR</span>' + '<span style="top: 2px; margin-left: 5px; position: relative;">🚨</span>' + '<div style="font-size: 18px; font-weight: bold; margin-top: 20px;">' + message.innerHTML + '</div>' + '<pre>' + stackTrace.innerHTML + '</pre>' + '</div>';
  return overlay;
}

function getParents(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return [];
  }

  var parents = [];
  var k, d, dep;

  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];

      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push(k);
      }
    }
  }

  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }

  return parents;
}

function hmrApply(bundle, asset) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (modules[asset.id] || !bundle.parent) {
    var fn = new Function('require', 'module', 'exports', asset.generated.js);
    asset.isNew = !modules[asset.id];
    modules[asset.id] = [fn, asset.deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}

function hmrAcceptCheck(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (!modules[id] && bundle.parent) {
    return hmrAcceptCheck(bundle.parent, id);
  }

  if (checkedAssets[id]) {
    return;
  }

  checkedAssets[id] = true;
  var cached = bundle.cache[id];
  assetsToAccept.push([bundle, id]);

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    return true;
  }

  return getParents(global.parcelRequire, id).some(function (id) {
    return hmrAcceptCheck(global.parcelRequire, id);
  });
}

function hmrAcceptRun(bundle, id) {
  var cached = bundle.cache[id];
  bundle.hotData = {};

  if (cached) {
    cached.hot.data = bundle.hotData;
  }

  if (cached && cached.hot && cached.hot._disposeCallbacks.length) {
    cached.hot._disposeCallbacks.forEach(function (cb) {
      cb(bundle.hotData);
    });
  }

  delete bundle.cache[id];
  bundle(id);
  cached = bundle.cache[id];

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    cached.hot._acceptCallbacks.forEach(function (cb) {
      cb();
    });

    return true;
  }
}
},{}]},{},["node_modules/parcel-bundler/src/builtins/hmr-runtime.js","src/index.js"], null)
//# sourceMappingURL=/src.a2b27638.js.map