/**
 * @fileoverview
 * @author skyinlayer<lingyucoder@gmail.com>
 * @module anime
 **/
KISSY.add(function(S, Dom, Base) {
    var noop = function() {};
    var requestAnimationFrame = (function() {
        return window.requestAnimationFrame ||
            window.webkitRequestAnimationFrame ||
            window.mozRequestAnimationFrame ||
            function(callback) {
                window.setTimeout(callback, 1000 / 60);
            };
    })();
    /*============= 缓动函数 ==============*/
    var easingFunctions = {
        easeInQuad: function(pos) {
            return Math.pow(pos, 2);
        },

        easeOutQuad: function(pos) {
            return -(Math.pow((pos - 1), 2) - 1);
        },

        easeInOutQuad: function(pos) {
            if ((pos /= 0.5) < 1) return 0.5 * Math.pow(pos, 2);
            return -0.5 * ((pos -= 2) * pos - 2);
        },

        easeInCubic: function(pos) {
            return Math.pow(pos, 3);
        },

        easeOutCubic: function(pos) {
            return (Math.pow((pos - 1), 3) + 1);
        },

        easeInOutCubic: function(pos) {
            if ((pos /= 0.5) < 1) return 0.5 * Math.pow(pos, 3);
            return 0.5 * (Math.pow((pos - 2), 3) + 2);
        },

        easeInQuart: function(pos) {
            return Math.pow(pos, 4);
        },
        easeOutQuart: function(pos) {
            return -(Math.pow((pos - 1), 4) - 1);
        },

        easeInOutQuart: function(pos) {
            if ((pos /= 0.5) < 1) return 0.5 * Math.pow(pos, 4);
            return -0.5 * ((pos -= 2) * Math.pow(pos, 3) - 2);
        },

        easeInQuint: function(pos) {
            return Math.pow(pos, 5);
        },

        easeOutQuint: function(pos) {
            return (Math.pow((pos - 1), 5) + 1);
        },

        easeInOutQuint: function(pos) {
            if ((pos /= 0.5) < 1) return 0.5 * Math.pow(pos, 5);
            return 0.5 * (Math.pow((pos - 2), 5) + 2);
        },

        easeInSine: function(pos) {
            return -Math.cos(pos * (Math.PI / 2)) + 1;
        },

        easeOutSine: function(pos) {
            return Math.sin(pos * (Math.PI / 2));
        },

        easeInOutSine: function(pos) {
            return (-0.5 * (Math.cos(Math.PI * pos) - 1));
        },

        easeInExpo: function(pos) {
            return (pos === 0) ? 0 : Math.pow(2, 10 * (pos - 1));
        },

        easeOutExpo: function(pos) {
            return (pos === 1) ? 1 : -Math.pow(2, -10 * pos) + 1;
        },

        easeInOutExpo: function(pos) {
            if (pos === 0) return 0;
            if (pos === 1) return 1;
            if ((pos /= 0.5) < 1) return 0.5 * Math.pow(2, 10 * (pos - 1));
            return 0.5 * (-Math.pow(2, -10 * --pos) + 2);
        },

        easeInCirc: function(pos) {
            return -(Math.sqrt(1 - (pos * pos)) - 1);
        },

        easeOutCirc: function(pos) {
            return Math.sqrt(1 - Math.pow((pos - 1), 2));
        },

        easeInOutCirc: function(pos) {
            if ((pos /= 0.5) < 1) return -0.5 * (Math.sqrt(1 - pos * pos) - 1);
            return 0.5 * (Math.sqrt(1 - (pos -= 2) * pos) + 1);
        },

        easeOutBounce: function(pos) {
            if ((pos) < (1 / 2.75)) {
                return (7.5625 * pos * pos);
            } else if (pos < (2 / 2.75)) {
                return (7.5625 * (pos -= (1.5 / 2.75)) * pos + 0.75);
            } else if (pos < (2.5 / 2.75)) {
                return (7.5625 * (pos -= (2.25 / 2.75)) * pos + 0.9375);
            } else {
                return (7.5625 * (pos -= (2.625 / 2.75)) * pos + 0.984375);
            }
        },

        easeInBack: function(pos) {
            var s = 1.70158;
            return (pos) * pos * ((s + 1) * pos - s);
        },

        easeOutBack: function(pos) {
            var s = 1.70158;
            return (pos = pos - 1) * pos * ((s + 1) * pos + s) + 1;
        },

        easeInOutBack: function(pos) {
            var s = 1.70158;
            if ((pos /= 0.5) < 1) return 0.5 * (pos * pos * (((s *= (1.525)) + 1) * pos - s));
            return 0.5 * ((pos -= 2) * pos * (((s *= (1.525)) + 1) * pos + s) + 2);
        },

        elastic: function(pos) {
            return -1 * Math.pow(4, -8 * pos) * Math.sin((pos * 6 - 1) * (2 * Math.PI) / 2) + 1;
        },

        swingFromTo: function(pos) {
            var s = 1.70158;
            return ((pos /= 0.5) < 1) ? 0.5 * (pos * pos * (((s *= (1.525)) + 1) * pos - s)) :
                0.5 * ((pos -= 2) * pos * (((s *= (1.525)) + 1) * pos + s) + 2);
        },

        swingFrom: function(pos) {
            var s = 1.70158;
            return pos * pos * ((s + 1) * pos - s);
        },

        swingTo: function(pos) {
            var s = 1.70158;
            return (pos -= 1) * pos * ((s + 1) * pos + s) + 1;
        },

        bounce: function(pos) {
            if (pos < (1 / 2.75)) {
                return (7.5625 * pos * pos);
            } else if (pos < (2 / 2.75)) {
                return (7.5625 * (pos -= (1.5 / 2.75)) * pos + 0.75);
            } else if (pos < (2.5 / 2.75)) {
                return (7.5625 * (pos -= (2.25 / 2.75)) * pos + 0.9375);
            } else {
                return (7.5625 * (pos -= (2.625 / 2.75)) * pos + 0.984375);
            }
        },

        bouncePast: function(pos) {
            if (pos < (1 / 2.75)) {
                return (7.5625 * pos * pos);
            } else if (pos < (2 / 2.75)) {
                return 2 - (7.5625 * (pos -= (1.5 / 2.75)) * pos + 0.75);
            } else if (pos < (2.5 / 2.75)) {
                return 2 - (7.5625 * (pos -= (2.25 / 2.75)) * pos + 0.9375);
            } else {
                return 2 - (7.5625 * (pos -= (2.625 / 2.75)) * pos + 0.984375);
            }
        },

        easeFromTo: function(pos) {
            if ((pos /= 0.5) < 1) return 0.5 * Math.pow(pos, 4);
            return -0.5 * ((pos -= 2) * Math.pow(pos, 3) - 2);
        },

        easeFrom: function(pos) {
            return Math.pow(pos, 4);
        },

        easeTo: function(pos) {
            return Math.pow(pos, 0.25);
        },

        linear: function(pos) {
            return pos;
        },

        sinusoidal: function(pos) {
            return (-Math.cos(pos * Math.PI) / 2) + 0.5;
        },

        reverse: function(pos) {
            return 1 - pos;
        },

        mirror: function(pos, transition) {
            transition = transition || easingFunctions.sinusoidal;
            if (pos < 0.5)
                return transition(pos * 2);
            else
                return transition(1 - (pos - 0.5) * 2);
        },

        flicker: function(pos) {
            pos = pos + (Math.random() - 0.5) / 5;
            return easingFunctions.sinusoidal(pos < 0 ? 0 : pos > 1 ? 1 : pos);
        },

        wobble: function(pos) {
            return (-Math.cos(pos * Math.PI * (9 * pos)) / 2) + 0.5;
        },

        pulse: function(pos, pulses) {
            return (-Math.cos((pos * ((pulses || 5) - 0.5) * 2) * Math.PI) / 2) + 0.5;
        },

        blink: function(pos, blinks) {
            return Math.round(pos * (blinks || 5)) % 2;
        },

        spring: function(pos) {
            return 1 - (Math.cos(pos * 4.5 * Math.PI) * Math.exp(-pos * 6));
        },

        none: function(pos) {
            return 0;
        },

        full: function(pos) {
            return 1;
        }
    };
    /*============= GUID ================*/
    var guid = 0;

    function createId() {
        return ++guid;
    }

    /*============== 心跳函数 ================*/
    function pulse() {
        var deleteIndex = [],
            i,
            m,
            tmp;
        if (running) {
            S.each(animeQueue, function(anime, index) {
                if (anime.state === "running") {
                    anime.go();
                } else {
                    deleteIndex.push(index);
                }
            });
            for (i = deleteIndex.length; i--;) {
                animeQueue.splice(deleteIndex[i], 1);
            }
            dealing = false;
            checkRunning();
        }
    }

    function checkRunning() {
        if (animeQueue.length > 0) {
            running = true;
            if (!dealing) {
                dealing = true;
                requestAnimationFrame(pulse);
            }
        } else {
            running = false;
            dealing = false;
        }
    }

    /*============== 动画队列 ================*/
    var running = false;
    var dealing = false;
    var animeQueue = [];

    function addAnime(anime) {
        if (S.indexOf(anime, animeQueue) === -1) {
            animeQueue.push(anime);
            checkRunning();
        }
    }

    function deleteAnime(anime) {
        var index = S.indexOf(anime, animeQueue);
        if (index >= 0) {
            animeQueue.splice(index, 1);
            checkRunning();
        }
    }

    /*============== 默认属性 ================*/
    var hooks = (function() {
        var rValueChange = /^(-=)|(\+=)/;

        function defaultParse(val, from) {
            if (S.isNumber(val)) {
                return val;
            }
            var regRst;
            var change = 0;
            if (!S.isNull(regRst = val.match(rValueChange))) {
                if (regRst[0] === "-=") {
                    return from - parseFloat(val.replace("-=", ""));
                } else {
                    return from + parseFloat(val.replace("+=", ""));
                }
            } else {
                return parseFloat(val);
            }
        }

        function defaultAssign(elem, style, val) {
            Dom.css(elem, style, val);
        }

        function defaultCompute(from, to, pos) {
            return from + (to - from) * pos;
        }

        function defaultGet(elem, style) {
            return Dom.css(elem, style);
        }
        return {
            _default: {
                parse: defaultParse,
                compute: defaultCompute,
                assign: defaultAssign,
                get: defaultGet
            }
        };
    })();
    /*============== 滚动属性 ================*/
    S.each("scrollTop scrollLeft".split(" "), function(type) {
        var _default = hooks._default;
        hooks[type] = {
            assign: function(elem, style, val) {
                Dom[type](elem, val);
            },
            get: function(elem, style) {
                return Dom[type](elem);
            }
        };
    });
    /*============== 颜色属性 ================*/
    var rHexColor = /^#[0-9a-z]+/;
    var rRGB = /^rgb\((\d+),(\d+),(\d+)\)$/;
    var rRGBA = /^rgba\((\d+),(\d+),(\d+),(\d*\.\d+)\)$/;
    var rClearSpace = /\s+/g;
    var normalColors = {
        red: [255, 0, 0, 1],
        green: [0, 255, 0, 1],
        blue: [0, 0, 255, 1],
        white: [255, 255, 255, 1],
        black: [0, 0, 0, 1],
        transparent: [0, 0, 0, 0]
    };

    function parseColor(val) {
        val = val.replace(rClearSpace, "").toLowerCase();
        if (normalColors[val]) {
            return normalColors[val];
        }
        var color = [];
        var tmp;
        var i;
        if (rHexColor.test(val)) {
            tmp = [];
            if (val.length === 4) {
                for (i = 3; i--;) {
                    tmp[i] = val.charAt(i + 1);
                    tmp[i] += tmp[i];
                }
            } else if (val.length === 7) {
                for (i = 3; i--;) {
                    tmp[i] = val.substr(1 + i * 2, 2);
                }
            }
            for (i = 3; i--;) {
                color[i] = parseInt(tmp[i], 16);
            }
            color[3] = 1;
        } else if (!S.isNull(tmp = val.match(rRGB))) {
            for (i = 3; i--;) {
                color[i] = parseInt(tmp[i + 1], 10);
            }
            color[3] = 1;
        } else if (!S.isNull(tmp = val.match(rRGBA))) {
            for (i = 4; i--;) {
                color[i] = Number(tmp[i + 1]);
            }
        }
        return color;
    }

    function computeColor(from, to, pos) {
        var _default = hooks._default,
            result = [],
            i;
        for (i = 0; i <= 2; i++) {
            result.push(parseInt(_default.compute(from[i], to[i], pos), 10));
        }
        result.push(_default.compute(from[3], to[3], pos));
        return result;
    }

    function assignColor(elem, style, val) {
        if(KISSY.Features.isIELessThan(9)){
            Dom.css(elem, style, "rgb(" + val.slice(0, 3).join(",") + ")");
        } else {
            Dom.css(elem, style, "rgba(" + val.join(",") + ")");
        }
    }
    S.each("color backgroundColor borderColor borderTopColor borderLeftColor borderRightColor borderBottomColor outlineColor textDecorationColor columnRuleColor".split(" "), function(type) {
        hooks[type] = {
            parse: parseColor,
            compute: computeColor,
            assign: assignColor
        };
    });

    /*============== 变换属性 ================*/
    var rTransform = /^(\w+)\(([\w,]+)\)$/;

    function myParse(v) {
        return Math.round(parseFloat(v) * 1e5) / 1e5;
    }

    function decomposeMatrix(matrix) {
        var scaleX, scaleY, skew,
            A = matrix[0],
            B = matrix[1],
            C = matrix[2],
            D = matrix[3];

        // Make sure matrix is not singular
        if (A * D - B * C) {
            scaleX = Math.sqrt(A * A + B * B);
            skew = (A * C + B * D) / (A * D - C * B);
            scaleY = (A * D - B * C) / scaleX;
            // step (6)
            if (A * D < B * C) {
                skew = -skew;
                scaleX = -scaleX;
            }
            // matrix is singular and cannot be interpolated
        } else {
            // In this case the elem shouldn't be rendered, hence scale == 0
            scaleX = scaleY = skew = 0;
        }

        // The recomposition order is very important
        // see http://hg.mozilla.org/mozilla-central/file/7cb3e9795d04/layout/style/nsStyleAnimation.cpp#l971
        return {
            translateX: myParse(matrix[4]),
            translateY: myParse(matrix[5]),
            rotate: myParse(Math.atan2(B, A) * 180 / Math.PI),
            skewX: myParse(Math.atan(skew) * 180 / Math.PI),
            skewY: 0,
            scaleX: myParse(scaleX),
            scaleY: myParse(scaleY)
        };
    }

    function valueStringToArray(val) {
        var result = val.split(",");
        result = S.map(result, function(value) {
            return myParse(value);
        });
        return result;
    }

    function parseTransform(val) {
        var result = {
            translateX: 0,
            translateY: 0,
            rotate: 0,
            skewX: 0,
            skewY: 0,
            scaleX: 1,
            scaleY: 1
        };
        var value;
        var regResult;
        var i, j, m;
        var name;
        var strs;
        strs = val.replace(rClearSpace, "").split(")");
        for (i = 0, m = strs.length; i < m; i++) {
            if (!strs[i] || strs[i] === "none") continue;
            regResult = strs[i].split("(");
            name = regResult[0];
            value = valueStringToArray(regResult[1]);
            switch (name) {
                case "matrix":
                    result = decomposeMatrix(value);
                    break;
                case "translate":
                case "scale":
                case "skew":
                    result[name + "X"] = value[0] || 0;
                    result[name + "Y"] = value[1] || 0;
                    break;
                case "translateX":
                case "translateY":
                case "scaleX":
                case "scaleY":
                case "skewX":
                case "skewY":
                case "rotate":
                    result[name] = value[0] || 0;
                    break;
                default:
                    continue;
            }
        }
        return result;
    }

    function computeTransform(from, to, pos) {
        var _default = hooks._default;
        var result = {};
        S.each(to, function(value, key) {
            result[key] = _default.compute(from[key], to[key], pos);
        });
        return result;
    }

    function assignTransform(elem, style, val) {
        var valueArray = [];
        S.each(val, function(value, key) {
            if ((key.indexOf("scale") > -1 && value === 1) || (key.indexOf("scale") === -1 && value === 0)) {
                return;
            }
            if (key === "rotate" || key.indexOf("skew") > -1) {
                value += "deg";
            } else if (key.indexOf("translate") > -1) {
                value += "px";
            }
            valueArray.push(key + "(" + value + ")");
        });
        Dom.css(elem, style, valueArray.join(" "));
    }
    if(KISSY.Features.isTransformSupported()) {
        hooks["transform"] = {
            parse: parseTransform,
            compute: computeTransform,
            assign: assignTransform
        };
    }
    

    /*============== 样式处理函数，隐藏钩子 ================*/

    function parseCSS(val, style, from) {
        if (hooks[style] && hooks[style].parse) {
            return hooks[style].parse(val, from);
        }
        return hooks._default.parse(val, from);
    }

    function computeCSS(style, from, to, pos) {
        if (hooks[style] && hooks[style].compute) {
            return hooks[style].compute(from, to, pos);
        }
        return hooks._default.compute(from, to, pos);

    }

    function assignCSS(elem, style, val) {
        if (hooks[style] && hooks[style].assign) {
            return hooks[style].assign(elem, style, val);
        }
        return hooks._default.assign(elem, style, val);
    }

    function getCSS(elem, style) {
        var val;
        if (hooks[style] && hooks[style].get) {
            val = hooks[style].get(elem, style);
        } else {
            val = hooks._default.get(elem, style);
        }
        return parseCSS(val, style);
    }

    var error = function(msg) {
        throw new Error(msg);
    };

    /**
     *
     * @class Anime
     * @constructor
     * @extends Base
     * elems, styles , config
     * config : {
        duration: 1500,
        callback: function(){},
        reverse: false,
        easing: linear,
     }
     */
    var defaultConfig = {
        callback: noop,
        duration: 1500,
        reverse: false,
        easing: "linear",
        times: 1,
        spend: 0,
        state: "running"
    };

    function Anime(elems, styles, config) {
        var self = this;
        var fromTmp, toTmp;
        var tmp;
        var args = S.makeArray(arguments);
        var argLength = args.length;
        var easing;
        if (argLength < 2) {
            return void 0;
        }
        self.elems = S.makeArray(S.isString(elems) ? Dom.query(elems) : elems);
        self.styles = styles;
        config = config || {};
        S.mix(self, defaultConfig);
        S.mix(self, config);

        self.easing = (S.isString(self.easing) ? easingFunctions[self.easing] : self.easing) || easingFunctions["linear"];

        self.id = createId();

        self.from = [];
        self.to = [];
        if (S.isString(self.times) && self.times.toLowerCase() === "infinite") {
            self.times = 999999;
        }
        S.each(self.elems, function(elem) {
            fromTmp = {};
            toTmp = {};
            S.each(self.styles, function(val, style) {
                if (S.isUndefined(tmp = getCSS(elem, style))) {
                    return;
                }
                fromTmp[style] = tmp;
                if (S.isUndefined(tmp = parseCSS(val, style, tmp))) {
                    return;
                }
                toTmp[style] = tmp;
            });
            self.from.push(fromTmp);
            self.to.push(toTmp);
        });
    }

    function resumeElems() {
        var self = this;
        S.each(self.elems, function(elem, index) {
            from = self.from[index];
            S.each(from, function(val, style) {
                assignCSS(elem, style, val);
            });
        });
    }

    function hideAfterAnime(callback) {
        return function() {
            Dom.hide(this);
            callback.call(this);
        };
    }
    S.extend(Anime, Base, /** @lends Anime.prototype*/ {
        go: function() {
            var self = this,
                from,
                to,
                cur,
                pos,
                toVal,
                fromVal;
            self.spend += 1000 / 60;
            if (self.state === "running") {
                S.each(self.elems, function(elem, index) {
                    from = self.from[index];
                    to = self.to[index];

                    if (self.reverse) {
                        pos = self.easing(1 - self.spend / self.duration);
                    } else {
                        pos = self.easing(self.spend / self.duration);
                    }
                    if (self.spend >= self.duration) {
                        pos = self.reverse ? 0 : 1;
                    }
                    if (elem.nodeType && elem.nodeType === Dom.NodeType.ELEMENT_NODE) {
                        S.each(to, function(val, style) {
                            toVal = val;
                            fromVal = from[style];
                            cur = computeCSS(style, fromVal, toVal, pos);
                            assignCSS(elem, style, cur);
                        });
                    }
                });
            }
            if (self.spend > self.duration) {
                self.state = "ended";
                if (self.callback) {
                    self.callback.call(self, self.elems);
                }
                if (--self.times > 0) {
                    self.run();
                }
            }
            return self;
        },
        run: function() {
            var self = this;
            self.state = "running";
            self.spend = 0;
            addAnime(self);
            return self;
        },
        stop: function() {
            var self = this;
            self.state = "ended";
            deleteAnime(self);
            resumeElems.call(self);
            return self;
        },
        pause: function() {
            var self = this;
            if (self.state !== "running") {
                return;
            }
            self.state = "paused";
            deleteAnime(self);
            return self;
        },
        resume: function() {
            var self = this;
            if (self.state !== "paused") {
                return;
            }
            self.state = "running";
            addAnime(self);
            return self;
        },
        revoke: function() {
            resumeElems.call(this);
        },
        isPaused: function() {
            return self.state === "paused";
        },
        isRunning: function() {
            return self.state === "running";
        },
        state: function() {
            return self.state;
        }
    });
    return Anime;
}, {
    requires: ['dom', 'base']
});