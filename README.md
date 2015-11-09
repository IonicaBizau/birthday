[![birthday](http://i.imgur.com/8jr9txD.png)](#)

# `$ birthday` [![Support this project][donate-now]][paypal-donations]

Know when a friend's birthday is coming.

[![birthday](http://i.imgur.com/giMbOtY.png)](#)

## Installation

You can install the package globally and use it as command line tool:

```sh
$ npm i -g birthday
```

Then, run `birthday --help` and see what the CLI tool can do.

```sh
$ birthday --help
Usage: birthday [options]

Options:
  -n, --name <name>           The person name.                             
  -d, --date <date>           The person birthday or born date.            
  -c, --coming <date>         Comming birthdays. Pass a date in the future.
  -b, --birthday-path <path>  Use a different birthday json file path.     
  -h, --help                  Displays this help.                          
  -v, --version               Displays version information.                

Examples:
  birthday -n 'Ionică Bizău' -d '14/09/1995'
  birthday -n 'Ionică Bizău' -d '14/09'
  birthday -c '2015-10-10'
  birthday # displays all birthdays

Documentation can be found at https://github.com/IonicaBizau/birthday
```

## Example

Here is an example how to use this package as library. To install it locally, as library, you can do that using `npm`:

```sh
$ npm i birthday
```

```js
// Dependencies
var Birthday = require("birthday");

// Insert a new birthday
Birthday.insert({
    name: "Ionică Bizău"
  , born: new Date(1995, 9, 14)
});
```

## Documentation

For full API reference, see the [DOCUMENTATION.md][docs] file.

## How to contribute
Have an idea? Found a bug? See [how to contribute][contributing].

## Where is this library used?
If you are using this library in one of your projects, add it in this list. :sparkles:

## License

[KINDLY][license] © [Ionică Bizău][website]

[license]: http://ionicabizau.github.io/kindly-license/?author=Ionic%C4%83%20Biz%C4%83u%20%3Cbizauionica@gmail.com%3E&year=2015

[website]: http://ionicabizau.net
[paypal-donations]: https://www.paypal.com/cgi-bin/webscr?cmd=_s-xclick&hosted_button_id=RVXDDLKKLQRJW
[donate-now]: http://i.imgur.com/6cMbHOC.png

[contributing]: /CONTRIBUTING.md
[docs]: /DOCUMENTATION.md