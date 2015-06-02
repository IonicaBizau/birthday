// Dependencies
var Fs = require("fs")
  , Ul = require("ul")
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
    this.path = Ul.USER_DIR + "/.birthday.json";
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

    if (typeof options === "function") {
        callback = options;
        options = {};
    }

    this.read(function (err, content) {
        if (err) { return callback(err); }
        content.birthdays.forEach(function (c) {
            c._ = new Date(c._);
        });
        callback(null, content);
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
    Fs.readFile(this.path, "utf-8", function (err, content) {
        if (err && err.code === "ENOENT") {
            err = null;
            content = "{}";
        }
        content = content || "{}";
        if (err) { return callback(err); }
        try {
            content = JSON.parse(content);
        } catch (e) {
            return callback(e);
        }
        callback(null, Ul.merge(content, DEFAULT_CONFIG));
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
    Fs.writeFile(this.path, JSON.stringify(content, null, 2), function (err) {
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
            var clone = new Date(c._).setYear(now.getFullYear());
            if (now <= clone && clone <= d) {
                n.push(c);
            }
        });
        callback(null, { birthdays: n });
    });
};

module.exports = new Birthday();
