#!/usr/bin/env node
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __commonJS = (cb, mod) => function __require() {
  return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
};
var __export = (target, all6) => {
  for (var name in all6)
    __defProp(target, name, { get: all6[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// node_modules/numeral/numeral.js
var require_numeral = __commonJS({
  "node_modules/numeral/numeral.js"(exports2, module2) {
    (function(global, factory) {
      if (typeof define === "function" && define.amd) {
        define(factory);
      } else if (typeof module2 === "object" && module2.exports) {
        module2.exports = factory();
      } else {
        global.numeral = factory();
      }
    })(exports2, function() {
      var numeral2, _, VERSION = "2.0.6", formats = {}, locales = {}, defaults = {
        currentLocale: "en",
        zeroFormat: null,
        nullFormat: null,
        defaultFormat: "0,0",
        scalePercentBy100: true
      }, options = {
        currentLocale: defaults.currentLocale,
        zeroFormat: defaults.zeroFormat,
        nullFormat: defaults.nullFormat,
        defaultFormat: defaults.defaultFormat,
        scalePercentBy100: defaults.scalePercentBy100
      };
      function Numeral(input, number) {
        this._input = input;
        this._value = number;
      }
      numeral2 = function(input) {
        var value, kind, unformatFunction, regexp;
        if (numeral2.isNumeral(input)) {
          value = input.value();
        } else if (input === 0 || typeof input === "undefined") {
          value = 0;
        } else if (input === null || _.isNaN(input)) {
          value = null;
        } else if (typeof input === "string") {
          if (options.zeroFormat && input === options.zeroFormat) {
            value = 0;
          } else if (options.nullFormat && input === options.nullFormat || !input.replace(/[^0-9]+/g, "").length) {
            value = null;
          } else {
            for (kind in formats) {
              regexp = typeof formats[kind].regexps.unformat === "function" ? formats[kind].regexps.unformat() : formats[kind].regexps.unformat;
              if (regexp && input.match(regexp)) {
                unformatFunction = formats[kind].unformat;
                break;
              }
            }
            unformatFunction = unformatFunction || numeral2._.stringToNumber;
            value = unformatFunction(input);
          }
        } else {
          value = Number(input) || null;
        }
        return new Numeral(input, value);
      };
      numeral2.version = VERSION;
      numeral2.isNumeral = function(obj) {
        return obj instanceof Numeral;
      };
      numeral2._ = _ = {
        // formats numbers separators, decimals places, signs, abbreviations
        numberToFormat: function(value, format, roundingFunction) {
          var locale = locales[numeral2.options.currentLocale], negP = false, optDec = false, leadingCount = 0, abbr = "", trillion = 1e12, billion = 1e9, million = 1e6, thousand = 1e3, decimal = "", neg = false, abbrForce, abs, min2, max2, power, int, precision, signed, thousands, output;
          value = value || 0;
          abs = Math.abs(value);
          if (numeral2._.includes(format, "(")) {
            negP = true;
            format = format.replace(/[\(|\)]/g, "");
          } else if (numeral2._.includes(format, "+") || numeral2._.includes(format, "-")) {
            signed = numeral2._.includes(format, "+") ? format.indexOf("+") : value < 0 ? format.indexOf("-") : -1;
            format = format.replace(/[\+|\-]/g, "");
          }
          if (numeral2._.includes(format, "a")) {
            abbrForce = format.match(/a(k|m|b|t)?/);
            abbrForce = abbrForce ? abbrForce[1] : false;
            if (numeral2._.includes(format, " a")) {
              abbr = " ";
            }
            format = format.replace(new RegExp(abbr + "a[kmbt]?"), "");
            if (abs >= trillion && !abbrForce || abbrForce === "t") {
              abbr += locale.abbreviations.trillion;
              value = value / trillion;
            } else if (abs < trillion && abs >= billion && !abbrForce || abbrForce === "b") {
              abbr += locale.abbreviations.billion;
              value = value / billion;
            } else if (abs < billion && abs >= million && !abbrForce || abbrForce === "m") {
              abbr += locale.abbreviations.million;
              value = value / million;
            } else if (abs < million && abs >= thousand && !abbrForce || abbrForce === "k") {
              abbr += locale.abbreviations.thousand;
              value = value / thousand;
            }
          }
          if (numeral2._.includes(format, "[.]")) {
            optDec = true;
            format = format.replace("[.]", ".");
          }
          int = value.toString().split(".")[0];
          precision = format.split(".")[1];
          thousands = format.indexOf(",");
          leadingCount = (format.split(".")[0].split(",")[0].match(/0/g) || []).length;
          if (precision) {
            if (numeral2._.includes(precision, "[")) {
              precision = precision.replace("]", "");
              precision = precision.split("[");
              decimal = numeral2._.toFixed(value, precision[0].length + precision[1].length, roundingFunction, precision[1].length);
            } else {
              decimal = numeral2._.toFixed(value, precision.length, roundingFunction);
            }
            int = decimal.split(".")[0];
            if (numeral2._.includes(decimal, ".")) {
              decimal = locale.delimiters.decimal + decimal.split(".")[1];
            } else {
              decimal = "";
            }
            if (optDec && Number(decimal.slice(1)) === 0) {
              decimal = "";
            }
          } else {
            int = numeral2._.toFixed(value, 0, roundingFunction);
          }
          if (abbr && !abbrForce && Number(int) >= 1e3 && abbr !== locale.abbreviations.trillion) {
            int = String(Number(int) / 1e3);
            switch (abbr) {
              case locale.abbreviations.thousand:
                abbr = locale.abbreviations.million;
                break;
              case locale.abbreviations.million:
                abbr = locale.abbreviations.billion;
                break;
              case locale.abbreviations.billion:
                abbr = locale.abbreviations.trillion;
                break;
            }
          }
          if (numeral2._.includes(int, "-")) {
            int = int.slice(1);
            neg = true;
          }
          if (int.length < leadingCount) {
            for (var i = leadingCount - int.length; i > 0; i--) {
              int = "0" + int;
            }
          }
          if (thousands > -1) {
            int = int.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1" + locale.delimiters.thousands);
          }
          if (format.indexOf(".") === 0) {
            int = "";
          }
          output = int + decimal + (abbr ? abbr : "");
          if (negP) {
            output = (negP && neg ? "(" : "") + output + (negP && neg ? ")" : "");
          } else {
            if (signed >= 0) {
              output = signed === 0 ? (neg ? "-" : "+") + output : output + (neg ? "-" : "+");
            } else if (neg) {
              output = "-" + output;
            }
          }
          return output;
        },
        // unformats numbers separators, decimals places, signs, abbreviations
        stringToNumber: function(string) {
          var locale = locales[options.currentLocale], stringOriginal = string, abbreviations = {
            thousand: 3,
            million: 6,
            billion: 9,
            trillion: 12
          }, abbreviation, value, i, regexp;
          if (options.zeroFormat && string === options.zeroFormat) {
            value = 0;
          } else if (options.nullFormat && string === options.nullFormat || !string.replace(/[^0-9]+/g, "").length) {
            value = null;
          } else {
            value = 1;
            if (locale.delimiters.decimal !== ".") {
              string = string.replace(/\./g, "").replace(locale.delimiters.decimal, ".");
            }
            for (abbreviation in abbreviations) {
              regexp = new RegExp("[^a-zA-Z]" + locale.abbreviations[abbreviation] + "(?:\\)|(\\" + locale.currency.symbol + ")?(?:\\))?)?$");
              if (stringOriginal.match(regexp)) {
                value *= Math.pow(10, abbreviations[abbreviation]);
                break;
              }
            }
            value *= (string.split("-").length + Math.min(string.split("(").length - 1, string.split(")").length - 1)) % 2 ? 1 : -1;
            string = string.replace(/[^0-9\.]+/g, "");
            value *= Number(string);
          }
          return value;
        },
        isNaN: function(value) {
          return typeof value === "number" && isNaN(value);
        },
        includes: function(string, search) {
          return string.indexOf(search) !== -1;
        },
        insert: function(string, subString, start) {
          return string.slice(0, start) + subString + string.slice(start);
        },
        reduce: function(array, callback) {
          if (this === null) {
            throw new TypeError("Array.prototype.reduce called on null or undefined");
          }
          if (typeof callback !== "function") {
            throw new TypeError(callback + " is not a function");
          }
          var t = Object(array), len = t.length >>> 0, k = 0, value;
          if (arguments.length === 3) {
            value = arguments[2];
          } else {
            while (k < len && !(k in t)) {
              k++;
            }
            if (k >= len) {
              throw new TypeError("Reduce of empty array with no initial value");
            }
            value = t[k++];
          }
          for (; k < len; k++) {
            if (k in t) {
              value = callback(value, t[k], k, t);
            }
          }
          return value;
        },
        /**
         * Computes the multiplier necessary to make x >= 1,
         * effectively eliminating miscalculations caused by
         * finite precision.
         */
        multiplier: function(x) {
          var parts = x.toString().split(".");
          return parts.length < 2 ? 1 : Math.pow(10, parts[1].length);
        },
        /**
         * Given a variable number of arguments, returns the maximum
         * multiplier that must be used to normalize an operation involving
         * all of them.
         */
        correctionFactor: function() {
          var args = Array.prototype.slice.call(arguments);
          return args.reduce(function(accum, next) {
            var mn = _.multiplier(next);
            return accum > mn ? accum : mn;
          }, 1);
        },
        /**
         * Implementation of toFixed() that treats floats more like decimals
         *
         * Fixes binary rounding issues (eg. (0.615).toFixed(2) === '0.61') that present
         * problems for accounting- and finance-related software.
         */
        toFixed: function(value, maxDecimals, roundingFunction, optionals) {
          var splitValue = value.toString().split("."), minDecimals = maxDecimals - (optionals || 0), boundedPrecision, optionalsRegExp, power, output;
          if (splitValue.length === 2) {
            boundedPrecision = Math.min(Math.max(splitValue[1].length, minDecimals), maxDecimals);
          } else {
            boundedPrecision = minDecimals;
          }
          power = Math.pow(10, boundedPrecision);
          output = (roundingFunction(value + "e+" + boundedPrecision) / power).toFixed(boundedPrecision);
          if (optionals > maxDecimals - boundedPrecision) {
            optionalsRegExp = new RegExp("\\.?0{1," + (optionals - (maxDecimals - boundedPrecision)) + "}$");
            output = output.replace(optionalsRegExp, "");
          }
          return output;
        }
      };
      numeral2.options = options;
      numeral2.formats = formats;
      numeral2.locales = locales;
      numeral2.locale = function(key) {
        if (key) {
          options.currentLocale = key.toLowerCase();
        }
        return options.currentLocale;
      };
      numeral2.localeData = function(key) {
        if (!key) {
          return locales[options.currentLocale];
        }
        key = key.toLowerCase();
        if (!locales[key]) {
          throw new Error("Unknown locale : " + key);
        }
        return locales[key];
      };
      numeral2.reset = function() {
        for (var property in defaults) {
          options[property] = defaults[property];
        }
      };
      numeral2.zeroFormat = function(format) {
        options.zeroFormat = typeof format === "string" ? format : null;
      };
      numeral2.nullFormat = function(format) {
        options.nullFormat = typeof format === "string" ? format : null;
      };
      numeral2.defaultFormat = function(format) {
        options.defaultFormat = typeof format === "string" ? format : "0.0";
      };
      numeral2.register = function(type, name, format) {
        name = name.toLowerCase();
        if (this[type + "s"][name]) {
          throw new TypeError(name + " " + type + " already registered.");
        }
        this[type + "s"][name] = format;
        return format;
      };
      numeral2.validate = function(val, culture) {
        var _decimalSep, _thousandSep, _currSymbol, _valArray, _abbrObj, _thousandRegEx, localeData, temp;
        if (typeof val !== "string") {
          val += "";
          if (console.warn) {
            console.warn("Numeral.js: Value is not string. It has been co-erced to: ", val);
          }
        }
        val = val.trim();
        if (!!val.match(/^\d+$/)) {
          return true;
        }
        if (val === "") {
          return false;
        }
        try {
          localeData = numeral2.localeData(culture);
        } catch (e) {
          localeData = numeral2.localeData(numeral2.locale());
        }
        _currSymbol = localeData.currency.symbol;
        _abbrObj = localeData.abbreviations;
        _decimalSep = localeData.delimiters.decimal;
        if (localeData.delimiters.thousands === ".") {
          _thousandSep = "\\.";
        } else {
          _thousandSep = localeData.delimiters.thousands;
        }
        temp = val.match(/^[^\d]+/);
        if (temp !== null) {
          val = val.substr(1);
          if (temp[0] !== _currSymbol) {
            return false;
          }
        }
        temp = val.match(/[^\d]+$/);
        if (temp !== null) {
          val = val.slice(0, -1);
          if (temp[0] !== _abbrObj.thousand && temp[0] !== _abbrObj.million && temp[0] !== _abbrObj.billion && temp[0] !== _abbrObj.trillion) {
            return false;
          }
        }
        _thousandRegEx = new RegExp(_thousandSep + "{2}");
        if (!val.match(/[^\d.,]/g)) {
          _valArray = val.split(_decimalSep);
          if (_valArray.length > 2) {
            return false;
          } else {
            if (_valArray.length < 2) {
              return !!_valArray[0].match(/^\d+.*\d$/) && !_valArray[0].match(_thousandRegEx);
            } else {
              if (_valArray[0].length === 1) {
                return !!_valArray[0].match(/^\d+$/) && !_valArray[0].match(_thousandRegEx) && !!_valArray[1].match(/^\d+$/);
              } else {
                return !!_valArray[0].match(/^\d+.*\d$/) && !_valArray[0].match(_thousandRegEx) && !!_valArray[1].match(/^\d+$/);
              }
            }
          }
        }
        return false;
      };
      numeral2.fn = Numeral.prototype = {
        clone: function() {
          return numeral2(this);
        },
        format: function(inputString, roundingFunction) {
          var value = this._value, format = inputString || options.defaultFormat, kind, output, formatFunction;
          roundingFunction = roundingFunction || Math.round;
          if (value === 0 && options.zeroFormat !== null) {
            output = options.zeroFormat;
          } else if (value === null && options.nullFormat !== null) {
            output = options.nullFormat;
          } else {
            for (kind in formats) {
              if (format.match(formats[kind].regexps.format)) {
                formatFunction = formats[kind].format;
                break;
              }
            }
            formatFunction = formatFunction || numeral2._.numberToFormat;
            output = formatFunction(value, format, roundingFunction);
          }
          return output;
        },
        value: function() {
          return this._value;
        },
        input: function() {
          return this._input;
        },
        set: function(value) {
          this._value = Number(value);
          return this;
        },
        add: function(value) {
          var corrFactor = _.correctionFactor.call(null, this._value, value);
          function cback(accum, curr, currI, O) {
            return accum + Math.round(corrFactor * curr);
          }
          this._value = _.reduce([this._value, value], cback, 0) / corrFactor;
          return this;
        },
        subtract: function(value) {
          var corrFactor = _.correctionFactor.call(null, this._value, value);
          function cback(accum, curr, currI, O) {
            return accum - Math.round(corrFactor * curr);
          }
          this._value = _.reduce([value], cback, Math.round(this._value * corrFactor)) / corrFactor;
          return this;
        },
        multiply: function(value) {
          function cback(accum, curr, currI, O) {
            var corrFactor = _.correctionFactor(accum, curr);
            return Math.round(accum * corrFactor) * Math.round(curr * corrFactor) / Math.round(corrFactor * corrFactor);
          }
          this._value = _.reduce([this._value, value], cback, 1);
          return this;
        },
        divide: function(value) {
          function cback(accum, curr, currI, O) {
            var corrFactor = _.correctionFactor(accum, curr);
            return Math.round(accum * corrFactor) / Math.round(curr * corrFactor);
          }
          this._value = _.reduce([this._value, value], cback);
          return this;
        },
        difference: function(value) {
          return Math.abs(numeral2(this._value).subtract(value).value());
        }
      };
      numeral2.register("locale", "en", {
        delimiters: {
          thousands: ",",
          decimal: "."
        },
        abbreviations: {
          thousand: "k",
          million: "m",
          billion: "b",
          trillion: "t"
        },
        ordinal: function(number) {
          var b = number % 10;
          return ~~(number % 100 / 10) === 1 ? "th" : b === 1 ? "st" : b === 2 ? "nd" : b === 3 ? "rd" : "th";
        },
        currency: {
          symbol: "$"
        }
      });
      (function() {
        numeral2.register("format", "bps", {
          regexps: {
            format: /(BPS)/,
            unformat: /(BPS)/
          },
          format: function(value, format, roundingFunction) {
            var space = numeral2._.includes(format, " BPS") ? " " : "", output;
            value = value * 1e4;
            format = format.replace(/\s?BPS/, "");
            output = numeral2._.numberToFormat(value, format, roundingFunction);
            if (numeral2._.includes(output, ")")) {
              output = output.split("");
              output.splice(-1, 0, space + "BPS");
              output = output.join("");
            } else {
              output = output + space + "BPS";
            }
            return output;
          },
          unformat: function(string) {
            return +(numeral2._.stringToNumber(string) * 1e-4).toFixed(15);
          }
        });
      })();
      (function() {
        var decimal = {
          base: 1e3,
          suffixes: ["B", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"]
        }, binary = {
          base: 1024,
          suffixes: ["B", "KiB", "MiB", "GiB", "TiB", "PiB", "EiB", "ZiB", "YiB"]
        };
        var allSuffixes = decimal.suffixes.concat(binary.suffixes.filter(function(item) {
          return decimal.suffixes.indexOf(item) < 0;
        }));
        var unformatRegex = allSuffixes.join("|");
        unformatRegex = "(" + unformatRegex.replace("B", "B(?!PS)") + ")";
        numeral2.register("format", "bytes", {
          regexps: {
            format: /([0\s]i?b)/,
            unformat: new RegExp(unformatRegex)
          },
          format: function(value, format, roundingFunction) {
            var output, bytes = numeral2._.includes(format, "ib") ? binary : decimal, suffix = numeral2._.includes(format, " b") || numeral2._.includes(format, " ib") ? " " : "", power, min2, max2;
            format = format.replace(/\s?i?b/, "");
            for (power = 0; power <= bytes.suffixes.length; power++) {
              min2 = Math.pow(bytes.base, power);
              max2 = Math.pow(bytes.base, power + 1);
              if (value === null || value === 0 || value >= min2 && value < max2) {
                suffix += bytes.suffixes[power];
                if (min2 > 0) {
                  value = value / min2;
                }
                break;
              }
            }
            output = numeral2._.numberToFormat(value, format, roundingFunction);
            return output + suffix;
          },
          unformat: function(string) {
            var value = numeral2._.stringToNumber(string), power, bytesMultiplier;
            if (value) {
              for (power = decimal.suffixes.length - 1; power >= 0; power--) {
                if (numeral2._.includes(string, decimal.suffixes[power])) {
                  bytesMultiplier = Math.pow(decimal.base, power);
                  break;
                }
                if (numeral2._.includes(string, binary.suffixes[power])) {
                  bytesMultiplier = Math.pow(binary.base, power);
                  break;
                }
              }
              value *= bytesMultiplier || 1;
            }
            return value;
          }
        });
      })();
      (function() {
        numeral2.register("format", "currency", {
          regexps: {
            format: /(\$)/
          },
          format: function(value, format, roundingFunction) {
            var locale = numeral2.locales[numeral2.options.currentLocale], symbols = {
              before: format.match(/^([\+|\-|\(|\s|\$]*)/)[0],
              after: format.match(/([\+|\-|\)|\s|\$]*)$/)[0]
            }, output, symbol, i;
            format = format.replace(/\s?\$\s?/, "");
            output = numeral2._.numberToFormat(value, format, roundingFunction);
            if (value >= 0) {
              symbols.before = symbols.before.replace(/[\-\(]/, "");
              symbols.after = symbols.after.replace(/[\-\)]/, "");
            } else if (value < 0 && (!numeral2._.includes(symbols.before, "-") && !numeral2._.includes(symbols.before, "("))) {
              symbols.before = "-" + symbols.before;
            }
            for (i = 0; i < symbols.before.length; i++) {
              symbol = symbols.before[i];
              switch (symbol) {
                case "$":
                  output = numeral2._.insert(output, locale.currency.symbol, i);
                  break;
                case " ":
                  output = numeral2._.insert(output, " ", i + locale.currency.symbol.length - 1);
                  break;
              }
            }
            for (i = symbols.after.length - 1; i >= 0; i--) {
              symbol = symbols.after[i];
              switch (symbol) {
                case "$":
                  output = i === symbols.after.length - 1 ? output + locale.currency.symbol : numeral2._.insert(output, locale.currency.symbol, -(symbols.after.length - (1 + i)));
                  break;
                case " ":
                  output = i === symbols.after.length - 1 ? output + " " : numeral2._.insert(output, " ", -(symbols.after.length - (1 + i) + locale.currency.symbol.length - 1));
                  break;
              }
            }
            return output;
          }
        });
      })();
      (function() {
        numeral2.register("format", "exponential", {
          regexps: {
            format: /(e\+|e-)/,
            unformat: /(e\+|e-)/
          },
          format: function(value, format, roundingFunction) {
            var output, exponential = typeof value === "number" && !numeral2._.isNaN(value) ? value.toExponential() : "0e+0", parts = exponential.split("e");
            format = format.replace(/e[\+|\-]{1}0/, "");
            output = numeral2._.numberToFormat(Number(parts[0]), format, roundingFunction);
            return output + "e" + parts[1];
          },
          unformat: function(string) {
            var parts = numeral2._.includes(string, "e+") ? string.split("e+") : string.split("e-"), value = Number(parts[0]), power = Number(parts[1]);
            power = numeral2._.includes(string, "e-") ? power *= -1 : power;
            function cback(accum, curr, currI, O) {
              var corrFactor = numeral2._.correctionFactor(accum, curr), num = accum * corrFactor * (curr * corrFactor) / (corrFactor * corrFactor);
              return num;
            }
            return numeral2._.reduce([value, Math.pow(10, power)], cback, 1);
          }
        });
      })();
      (function() {
        numeral2.register("format", "ordinal", {
          regexps: {
            format: /(o)/
          },
          format: function(value, format, roundingFunction) {
            var locale = numeral2.locales[numeral2.options.currentLocale], output, ordinal = numeral2._.includes(format, " o") ? " " : "";
            format = format.replace(/\s?o/, "");
            ordinal += locale.ordinal(value);
            output = numeral2._.numberToFormat(value, format, roundingFunction);
            return output + ordinal;
          }
        });
      })();
      (function() {
        numeral2.register("format", "percentage", {
          regexps: {
            format: /(%)/,
            unformat: /(%)/
          },
          format: function(value, format, roundingFunction) {
            var space = numeral2._.includes(format, " %") ? " " : "", output;
            if (numeral2.options.scalePercentBy100) {
              value = value * 100;
            }
            format = format.replace(/\s?\%/, "");
            output = numeral2._.numberToFormat(value, format, roundingFunction);
            if (numeral2._.includes(output, ")")) {
              output = output.split("");
              output.splice(-1, 0, space + "%");
              output = output.join("");
            } else {
              output = output + space + "%";
            }
            return output;
          },
          unformat: function(string) {
            var number = numeral2._.stringToNumber(string);
            if (numeral2.options.scalePercentBy100) {
              return number * 0.01;
            }
            return number;
          }
        });
      })();
      (function() {
        numeral2.register("format", "time", {
          regexps: {
            format: /(:)/,
            unformat: /(:)/
          },
          format: function(value, format, roundingFunction) {
            var hours = Math.floor(value / 60 / 60), minutes = Math.floor((value - hours * 60 * 60) / 60), seconds = Math.round(value - hours * 60 * 60 - minutes * 60);
            return hours + ":" + (minutes < 10 ? "0" + minutes : minutes) + ":" + (seconds < 10 ? "0" + seconds : seconds);
          },
          unformat: function(string) {
            var timeArray = string.split(":"), seconds = 0;
            if (timeArray.length === 3) {
              seconds = seconds + Number(timeArray[0]) * 60 * 60;
              seconds = seconds + Number(timeArray[1]) * 60;
              seconds = seconds + Number(timeArray[2]);
            } else if (timeArray.length === 2) {
              seconds = seconds + Number(timeArray[0]) * 60;
              seconds = seconds + Number(timeArray[1]);
            }
            return Number(seconds);
          }
        });
      })();
      return numeral2;
    });
  }
});

// src/Doc.bs.js
var Doc_bs_exports = {};
__export(Doc_bs_exports, {
  Doc: () => Doc,
  Item: () => Item,
  Json: () => Json$1,
  Kind: () => Kind,
  Md: () => Md,
  Source: () => Source,
  decodeDocstrings: () => decodeDocstrings,
  decodeField: () => decodeField,
  parseExn: () => parseExn2
});
module.exports = __toCommonJS(Doc_bs_exports);
var Fs = __toESM(require("fs"), 1);

// node_modules/rescript/lib/es6/caml_option.js
function some(x) {
  if (x === void 0) {
    return {
      BS_PRIVATE_NESTED_SOME_NONE: 0
    };
  } else if (x !== null && x.BS_PRIVATE_NESTED_SOME_NONE !== void 0) {
    return {
      BS_PRIVATE_NESTED_SOME_NONE: x.BS_PRIVATE_NESTED_SOME_NONE + 1 | 0
    };
  } else {
    return x;
  }
}
function valFromOption(x) {
  if (!(x !== null && x.BS_PRIVATE_NESTED_SOME_NONE !== void 0)) {
    return x;
  }
  var depth = x.BS_PRIVATE_NESTED_SOME_NONE;
  if (depth === 0) {
    return;
  } else {
    return {
      BS_PRIVATE_NESTED_SOME_NONE: depth - 1 | 0
    };
  }
}

// node_modules/rescript/lib/es6/js_dict.js
function get(dict, k) {
  if (k in dict) {
    return some(dict[k]);
  }
}

// node_modules/@nobleai/rescript-prelude/src/Dict.bs.js
var get2 = get;

// node_modules/rescript/lib/es6/caml_array.js
function sub(x, offset, len) {
  var result = new Array(len);
  var j = 0;
  var i = offset;
  while (j < len) {
    result[j] = x[i];
    j = j + 1 | 0;
    i = i + 1 | 0;
  }
  ;
  return result;
}

// node_modules/rescript/lib/es6/curry.js
function app(_f, _args) {
  while (true) {
    var args = _args;
    var f = _f;
    var init_arity = f.length;
    var arity = init_arity === 0 ? 1 : init_arity;
    var len = args.length;
    var d = arity - len | 0;
    if (d === 0) {
      return f.apply(null, args);
    }
    if (d >= 0) {
      return /* @__PURE__ */ function(f2, args2) {
        return function(x) {
          return app(f2, args2.concat([x]));
        };
      }(f, args);
    }
    _args = sub(args, arity, -d | 0);
    _f = f.apply(null, sub(args, 0, arity));
    continue;
  }
  ;
}
function _1(o, a0) {
  var arity = o.length;
  if (arity === 1) {
    return o(a0);
  } else {
    switch (arity) {
      case 1:
        return o(a0);
      case 2:
        return function(param) {
          return o(a0, param);
        };
      case 3:
        return function(param, param$1) {
          return o(a0, param, param$1);
        };
      case 4:
        return function(param, param$1, param$2) {
          return o(a0, param, param$1, param$2);
        };
      case 5:
        return function(param, param$1, param$2, param$3) {
          return o(a0, param, param$1, param$2, param$3);
        };
      case 6:
        return function(param, param$1, param$2, param$3, param$4) {
          return o(a0, param, param$1, param$2, param$3, param$4);
        };
      case 7:
        return function(param, param$1, param$2, param$3, param$4, param$5) {
          return o(a0, param, param$1, param$2, param$3, param$4, param$5);
        };
      default:
        return app(o, [a0]);
    }
  }
}
function __1(o) {
  var arity = o.length;
  if (arity === 1) {
    return o;
  } else {
    return function(a0) {
      return _1(o, a0);
    };
  }
}
function _2(o, a0, a1) {
  var arity = o.length;
  if (arity === 2) {
    return o(a0, a1);
  } else {
    switch (arity) {
      case 1:
        return app(o(a0), [a1]);
      case 2:
        return o(a0, a1);
      case 3:
        return function(param) {
          return o(a0, a1, param);
        };
      case 4:
        return function(param, param$1) {
          return o(a0, a1, param, param$1);
        };
      case 5:
        return function(param, param$1, param$2) {
          return o(a0, a1, param, param$1, param$2);
        };
      case 6:
        return function(param, param$1, param$2, param$3) {
          return o(a0, a1, param, param$1, param$2, param$3);
        };
      case 7:
        return function(param, param$1, param$2, param$3, param$4) {
          return o(a0, a1, param, param$1, param$2, param$3, param$4);
        };
      default:
        return app(o, [
          a0,
          a1
        ]);
    }
  }
}

// node_modules/rescript/lib/es6/belt_Option.js
function flatMapU(opt, f) {
  if (opt !== void 0) {
    return f(valFromOption(opt));
  }
}
function flatMap(opt, f) {
  return flatMapU(opt, __1(f));
}

// node_modules/@nobleai/rescript-prelude/src/Option.bs.js
var bind = flatMap;
function predicate(v, b) {
  if (_1(b, v)) {
    return some(v);
  }
}

// node_modules/@nobleai/rescript-prelude/src/Float.js
var import_numeral = __toESM(require_numeral());

// node_modules/@nobleai/rescript-prelude/src/Float.bs.js
var positiveInfinity = Number.POSITIVE_INFINITY;
var negativeInfinity = Number.NEGATIVE_INFINITY;
function round(x) {
  return Math.round(x);
}

// node_modules/@nobleai/rescript-prelude/src/Int.bs.js
function fromFloat(f) {
  return predicate(f, function(x) {
    return round(f) === x;
  });
}

// node_modules/@nobleai/rescript-prelude/src/Array.bs.js
function keepMap(arr, fn) {
  var v = [];
  arr.forEach(function(x) {
    var y = _1(fn, x);
    if (y !== void 0) {
      v.push(valFromOption(y));
      return;
    }
  });
  return v;
}
function catOptions(__x) {
  return keepMap(__x, function(prim) {
    return prim;
  });
}
var concat = (a, b) => [...a, ...b];

// node_modules/rescript/lib/es6/belt_Result.js
function flatMapU2(opt, f) {
  if (opt.TAG === /* Ok */
  0) {
    return f(opt._0);
  } else {
    return {
      TAG: (
        /* Error */
        1
      ),
      _0: opt._0
    };
  }
}
function flatMap2(opt, f) {
  return flatMapU2(opt, __1(f));
}

// node_modules/@nobleai/rescript-prelude/src/Result.bs.js
function fromOption(a, b) {
  if (a !== void 0) {
    return {
      TAG: (
        /* Ok */
        0
      ),
      _0: valFromOption(a)
    };
  } else {
    return {
      TAG: (
        /* Error */
        1
      ),
      _0: b
    };
  }
}
function toOption(a) {
  if (a.TAG === /* Ok */
  0) {
    return some(a._0);
  }
}
function resolve(a, ok, err) {
  if (a.TAG === /* Ok */
  0) {
    return _1(ok, a._0);
  } else {
    return _1(err, a._0);
  }
}
function map3(result, fn) {
  if (result.TAG === /* Ok */
  0) {
    return {
      TAG: (
        /* Ok */
        0
      ),
      _0: _1(fn, result._0)
    };
  } else {
    return {
      TAG: (
        /* Error */
        1
      ),
      _0: result._0
    };
  }
}
function all2(a, b) {
  if (a.TAG === /* Ok */
  0) {
    if (b.TAG === /* Ok */
    0) {
      return {
        TAG: (
          /* Ok */
          0
        ),
        _0: [
          a._0,
          b._0
        ]
      };
    } else {
      return {
        TAG: (
          /* Error */
          1
        ),
        _0: b._0
      };
    }
  } else {
    return {
      TAG: (
        /* Error */
        1
      ),
      _0: a._0
    };
  }
}
function all3(a, b, c) {
  if (a.TAG === /* Ok */
  0) {
    if (b.TAG === /* Ok */
    0) {
      if (c.TAG === /* Ok */
      0) {
        return {
          TAG: (
            /* Ok */
            0
          ),
          _0: [
            a._0,
            b._0,
            c._0
          ]
        };
      } else {
        return {
          TAG: (
            /* Error */
            1
          ),
          _0: c._0
        };
      }
    } else {
      return {
        TAG: (
          /* Error */
          1
        ),
        _0: b._0
      };
    }
  } else {
    return {
      TAG: (
        /* Error */
        1
      ),
      _0: a._0
    };
  }
}
function all4(a, b, c, d) {
  if (a.TAG === /* Ok */
  0) {
    if (b.TAG === /* Ok */
    0) {
      if (c.TAG === /* Ok */
      0) {
        if (d.TAG === /* Ok */
        0) {
          return {
            TAG: (
              /* Ok */
              0
            ),
            _0: [
              a._0,
              b._0,
              c._0,
              d._0
            ]
          };
        } else {
          return {
            TAG: (
              /* Error */
              1
            ),
            _0: d._0
          };
        }
      } else {
        return {
          TAG: (
            /* Error */
            1
          ),
          _0: c._0
        };
      }
    } else {
      return {
        TAG: (
          /* Error */
          1
        ),
        _0: b._0
      };
    }
  } else {
    return {
      TAG: (
        /* Error */
        1
      ),
      _0: a._0
    };
  }
}
function all5(a, b, c, d, e) {
  if (a.TAG === /* Ok */
  0) {
    if (b.TAG === /* Ok */
    0) {
      if (c.TAG === /* Ok */
      0) {
        if (d.TAG === /* Ok */
        0) {
          if (e.TAG === /* Ok */
          0) {
            return {
              TAG: (
                /* Ok */
                0
              ),
              _0: [
                a._0,
                b._0,
                c._0,
                d._0,
                e._0
              ]
            };
          } else {
            return {
              TAG: (
                /* Error */
                1
              ),
              _0: e._0
            };
          }
        } else {
          return {
            TAG: (
              /* Error */
              1
            ),
            _0: d._0
          };
        }
      } else {
        return {
          TAG: (
            /* Error */
            1
          ),
          _0: c._0
        };
      }
    } else {
      return {
        TAG: (
          /* Error */
          1
        ),
        _0: b._0
      };
    }
  } else {
    return {
      TAG: (
        /* Error */
        1
      ),
      _0: a._0
    };
  }
}
function all(arr) {
  return arr.reduce(function(b, opt) {
    var err = all2(b, opt);
    if (err.TAG !== /* Ok */
    0) {
      return {
        TAG: (
          /* Error */
          1
        ),
        _0: err._0
      };
    }
    var match = err._0;
    return {
      TAG: (
        /* Ok */
        0
      ),
      _0: concat(match[0], [match[1]])
    };
  }, {
    TAG: (
      /* Ok */
      0
    ),
    _0: []
  });
}
var bind2 = flatMap2;

// node_modules/rescript/lib/es6/js_json.js
function decodeString(json) {
  if (typeof json === "string") {
    return json;
  }
}
function decodeNumber(json) {
  if (typeof json === "number") {
    return json;
  }
}
function decodeObject(json) {
  if (typeof json === "object" && !Array.isArray(json) && json !== null) {
    return some(json);
  }
}
function decodeArray(json) {
  if (Array.isArray(json)) {
    return json;
  }
}
function decodeBoolean(json) {
  if (typeof json === "boolean") {
    return json;
  }
}
function decodeNull(json) {
  if (json === null) {
    return null;
  }
}

// node_modules/@nobleai/rescript-prelude/src/Json.bs.js
function parseExn(prim) {
  return JSON.parse(prim);
}
function decodeObject2(json, err) {
  return fromOption(decodeObject(json), err);
}
function decodeArray2(json, err) {
  return fromOption(decodeArray(json), err);
}
function decodeString2(json, err) {
  return fromOption(decodeString(json), err);
}
function decodeNumber2(json, err) {
  return fromOption(decodeNumber(json), err);
}
function decodeInt$1(json, err) {
  return fromOption(bind(decodeNumber(json), fromFloat), err);
}
function decodeBoolean2(json, err) {
  return fromOption(decodeBoolean(json), err);
}
function decodeNull2(json, err) {
  return fromOption(decodeNull(json), err);
}
var Result$1 = {
  decodeObject: decodeObject2,
  decodeArray: decodeArray2,
  decodeString: decodeString2,
  decodeNumber: decodeNumber2,
  decodeInt: decodeInt$1,
  decodeBoolean: decodeBoolean2,
  decodeNull: decodeNull2
};

// src/Doc.bs.js
var Process = __toESM(require("process"), 1);
function h1(s) {
  return "# " + s + "\n";
}
function h2(s) {
  return "## " + s + "\n";
}
function h3(s) {
  return "### " + s + "\n";
}
function list(items) {
  return items.map(function(x) {
    return "- " + x;
  }).join("\n");
}
var Md = {
  h1,
  h2,
  h3,
  list
};
function parse(str) {
  switch (str) {
    case "module":
      return {
        TAG: (
          /* Ok */
          0
        ),
        _0: "module"
      };
    case "type":
      return {
        TAG: (
          /* Ok */
          0
        ),
        _0: "type"
      };
    case "value":
      return {
        TAG: (
          /* Ok */
          0
        ),
        _0: "value"
      };
    default:
      return {
        TAG: (
          /* Error */
          1
        ),
        _0: "invalid kind"
      };
  }
}
var Kind = {
  parse
};
function decodeField(obj, field, decode) {
  return bind2(fromOption(get2(obj, field), field), function(__x) {
    return _2(decode, __x, "" + field + " value");
  });
}
function decodeDocstrings(json, str) {
  return bind2(Result$1.decodeArray(json, "" + str + " array"), function(x) {
    return all(x.map(function(__x) {
      return Result$1.decodeString(__x, "docstring");
    }));
  });
}
function parse$1(json, str) {
  return bind2(Result$1.decodeObject(json, "" + str + " object"), function(obj) {
    var filepath = decodeField(obj, "filepath", Result$1.decodeString);
    var line = decodeField(obj, "line", Result$1.decodeInt);
    var col = decodeField(obj, "col", Result$1.decodeInt);
    return map3(all3(filepath, line, col), function(param) {
      return {
        filepath: param[0],
        line: param[1],
        col: param[2]
      };
    });
  });
}
var Source = {
  parse: parse$1
};
function parse$2(json) {
  return bind2(Result$1.decodeObject(json, "item object"), function(obj) {
    var id = decodeField(obj, "id", Result$1.decodeString);
    var kind = bind2(decodeField(obj, "kind", Result$1.decodeString), parse);
    var name = decodeField(obj, "name", Result$1.decodeString);
    var signature = bind(get2(obj, "signature"), function(x) {
      return toOption(Result$1.decodeString(x, "signature"));
    });
    var docstrings = decodeField(obj, "docstrings", decodeDocstrings);
    var source = decodeField(obj, "source", parse$1);
    var deprecated = decodeField(obj, "deprecated", Result$1.decodeString);
    return map3(all5(id, kind, name, docstrings, source), function(param) {
      return {
        id: param[0],
        kind: param[1],
        name: param[2],
        signature,
        docstrings: param[3],
        source: param[4],
        deprecated: toOption(deprecated)
      };
    });
  });
}
function print(item) {
  return catOptions([
    h3(item.name),
    item.signature,
    item.deprecated,
    item.docstrings.join("\n")
  ]).join("\n");
}
var Item = {
  parse: parse$2,
  print
};
function parse$3(json) {
  return bind2(Result$1.decodeObject(json, "doc object"), function(obj) {
    var name = decodeField(obj, "name", Result$1.decodeString);
    var docstrings = decodeField(obj, "docstrings", decodeDocstrings);
    var source = decodeField(obj, "source", parse$1);
    var items = bind2(bind2(fromOption(get2(obj, "items"), "items"), function(__x) {
      return Result$1.decodeArray(__x, "items");
    }), function(x) {
      return all(x.map(parse$2));
    });
    return map3(all4(name, docstrings, source, items), function(param) {
      return {
        name: param[0],
        docstrings: param[1],
        source: param[2],
        items: param[3]
      };
    });
  });
}
function print$1(doc) {
  return [
    h1(doc.name),
    doc.docstrings.join("\n"),
    doc.items.map(print).join("\n")
  ].join("\n");
}
var Doc = {
  parse: parse$3,
  print: print$1
};
Process.argv.slice(2).forEach(function(file) {
  console.log("file", file);
  console.log(resolve(parse$3(parseExn(Fs.readFileSync(file, "utf8"))), print$1, function(x) {
    return x;
  }));
});
var parseExn2 = parseExn;
var Json$1;
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  Doc,
  Item,
  Json,
  Kind,
  Md,
  Source,
  decodeDocstrings,
  decodeField,
  parseExn
});
/*! Bundled license information:

numeral/numeral.js:
  (*! @preserve
   * numeral.js
   * version : 2.0.6
   * author : Adam Draper
   * license : MIT
   * http://adamwdraper.github.com/Numeral-js/
   *)
*/
