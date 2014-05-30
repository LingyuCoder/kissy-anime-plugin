/*
combined files : 

gallery/anime/1.0/index

*/
/**
 * @fileoverview
 * @author skyinlayer<lingyucoder@gmail.com>
 * @module anime
 **/
KISSY.add('gallery/anime/1.0/index',function(S, Node, Dom) {
    var EMPTY = '';
    var $ = Node.all;
    var noop = function() {};
    var defaultConfig = {
        easing: "linear",
        completeCb: noop
    };
    var requestAnimationFrame = (function() {
        return window.requestAnimationFrame ||
            window.webkitRequestAnimationFrame ||
            window.mozRequestAnimationFrame ||
            function(callback) {
                window.setTimeout(callback, 1000 / 60);
            };
    })();

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



    /**
     *
     * @class Anime
     * @constructor
     * @extends Base
     */
    /*
     styles: {
        prop: {
            from: 0,
            to: 1
        }
     }
     */
    function Anime(elems, styles, duration, easing, completeCb) {
        var self = this;
        var config;

        config.elems = S.isPlainObject(elems) ? elems : Dom.get(config.elems);
        config.styles = styles;
        config.duration = duration;
        config.easing = easing ? (S.isFunction(easing) ? easing : (easingFunctions[easing] || easingFunctions["linear"])) : easingFunctions["linear"];
        config.completeCb = completeCb;

        config = S.merge(defaultConfig, config);

        /*//调用父类构造函数
        Anime.superclass.constructor.call(self, config);
        Promise.Defer(self);*/

        self.config = config;

        self.running = false;
        self.spend = 0;
    }

    S.extend(Anime, Promise, /** @lends Anime.prototype*/ {
        go: function() {
            var self = this;
            var config = self.config;
            self.spend += 1000 / 16;
            if (self.spend >= config.duration) {
                self.running = false;
                completeCb.call(elems);
                return;
            }
            if (self.running) {
                S.each(config.elems, function(node, index) {
                    if (node.nodeType && node.nodeType === Dom.NodeType.ELEMENT_NODE) {
                        S.each(config.styles, function(change, style) {
                            Dom.css(node, style, change.from + config.easing(self.spend / self.duration) * (change.to - change.from));
                        });
                    }
                });
                requestAnimationFrame(self.go);
            }
        },
        run: function() {
            var self = this;
            self.running = true;
            self.spend = 0;
            requestAnimationFrame(self.go);
        },
        pause: function() {
            var self = this;
            self.running = false;
        },
        resume: function() {
            var self = this;
            self.running = true;
            requestAnimationFrame(self.go);
        }
    });
    return Anime;
}, {
    requires: ['node', 'dom']
});
