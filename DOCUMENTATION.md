## Documentation

You can see below the API reference of this module.

### `getData(callback)`
Fetches birthday data.

#### Params
- **Function** `callback`: The callback function.

#### Return
- **Birthday** The `Birthday` instance.

### `read(callback)`
Reads the JSON file.

#### Params
- **Function** `callback`: The callback function.

#### Return
- **Birthday** The `Birthday` instance.

### `write(content, callback)`
Writes the JSON information in the file.

#### Params
- **Object** `content`: The content as object.
- **Function** `callback`: The callback function.

#### Return
- **Birthday** The `Birthday` instance.

### `insert(data, callback)`
Inserts a new birthday.

#### Params
- **Object** `data`: An object which will be passed to the `Birthday.Event` constructor.
- **Function** `callback`: The callback function.

#### Return
- **Birthday** The `Birthday` instance.

### `next(d, callback)`
Find coming birthdays until the provided date.

#### Params
- **Date|String** `d`: The date before you want to get the birthdays.
- **Function** `callback`: The callback function.

### `sort(obj)`
Sort the birthday dates.

#### Params
- **Object** `obj`: An object containing the `birthdays` array.

#### Return
- **Array** The sorted birthdays.

