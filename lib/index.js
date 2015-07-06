// Dependencies
var Fs = require("fs")
  , Ul = require("ul")
  , ReadJson = require("r-json")
  , WriteJson = require("w-json")
  ;

// Constants
const DEFAULT_CONFIG = {
    birthdays: []
};

/*!
 * Birthday
 * Creates a new `Birthday` instance.
 *
 * @name Birthday
 * @function
 * @return {Birthday} The `Birthday` instance.
 */
function Birthday() {
    this.path = Ul.home() + "/.birthday.json";
}

/**
 * getData
 * Fetches birthday data.
 *
 * @name getData
 * @function
 * @param {Function} callback The callback function.
 * @return {Birthday} The `Birthday` instance.
 */
Birthday.prototype.getData = function (callback) {

    var self = this;

    if (typeof options === "function") {
        callback = options;
        options = {};
    }

    self.read(function (err, content) {
        if (err) { return callback(err); }
        content.birthdays.forEach(function (c) {
            c.date._ = new Date(c.date.y, c.date.m - 1, c.date.d);
        });
        callback(null, self.sort(content));
    });

    return this;
};

/**
 * read
 * Reads the JSON file.
 *
 * @name read
 * @function
 * @param {Function} callback The callback function.
 * @return {Birthday} The `Birthday` instance.
 */
Birthday.prototype.read = function (callback) {
    ReadJson(this.path, function (err, content) {
        if (err && err.code === "ENOENT") {
            err = null;
            content = {};
        }
        if (err) { return callback(err); }
        callback(null, Ul.deepMerge(content, DEFAULT_CONFIG));
    });
    return this;
};

/**
 * write
 * Writes the JSON information in the file.
 *
 * @name write
 * @function
 * @param {Object} content The content as object.
 * @param {Function} callback The callback function.
 * @return {Birthday} The `Birthday` instance.
 */
Birthday.prototype.write = function (content, callback) {
    WriteJson(this.path, content, function (err) {
        callback(err, content);
    });
    return this;
};

/**
 * insert
 * Inserts a new birthday.
 *
 * @name insert
 * @function
 * @param {Object} data An object which will be passed to the `Birthday.Event` constructor.
 * @param {Function} callback The callback function.
 * @return {Birthday} The `Birthday` instance.
 */
Birthday.prototype.insert = function (data, callback) {

    var self = this;

    callback = callback || function (err) {
        if (err) { throw err; }
    };

    data.date = new Date(data.y || 1970, data.m - 1, data.d);
    if (data.date.toString() === "Invalid Date") {
        return callback(new Error("Date is invalid."));
    }

    self.read(function (err, content) {
        if (err) { return callback(err); }
        content.birthdays.push({
            name: data.name
          , date: {
                _: data.y ? data.date : null
              , y: data.y
              , m: data.m
              , d: data.d
            }
        });
        self.write(content, callback);
    });

    return this;
};

/**
 * next
 * Find coming birthdays until the provided date.
 *
 * @name next
 * @function
 * @param {Date|String} d The date before you want to get the birthdays.
 * @param {Function} callback The callback function.
 */
Birthday.prototype.next = function (d, callback) {
    var self = this
      , n = []
      ;

    d = new Date(d);
    if (d.toString() === "Invalid Date") {
        return callback(new Error("Date is invalid."));
    }

    self.getData(function (err, content) {
        if (err) { return callback(err); }
        var now = new Date();
        content.birthdays.forEach(function (c) {
            var clone = new Date(new Date(c.date._).setYear(now.getFullYear()));
            if (now <= clone && clone <= d) {
                n.push(c);
            }
        });
        callback(null, self.sort({ birthdays: n }));
    });
};

/**
 * sort
 * Sort the birthday dates.
 *
 * @name sort
 * @function
 * @param {Object} obj An object containing the `birthdays` array.
 * @return {Array} The sorted birthdays.
 */
Birthday.prototype.sort = function (obj) {
    var now = new Date()
      , cYear = now.getFullYear()
      , afterNow = []
      , beforeNow = []
      ;

    obj.birthdays.forEach(function (c) {
        var d1 = new Date(cYear, c.date.m - 1, c.date.d);
        if (d1 >= now) {
            afterNow.push(c);
        } else {
            beforeNow.push(c);
        }
    });

    function sort(a, b) {
        var d1 = new Date(cYear, a.date.m - 1, a.date.d)
          , d2 = new Date(cYear, b.date.m - 1, b.date.d)
          ;

        return d1 < d2 ? 1 : -1;
    }

    afterNow.sort(sort);
    beforeNow.sort(sort);
    obj.birthdays = beforeNow.concat(afterNow);

    return obj;
};

module.exports = new Birthday();
