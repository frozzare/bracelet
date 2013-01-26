# Bracelet

Simple JSON test server that returns a JSON object defined by a REST-style url or data you posted. It will try to parse array and objects that are defined in the url. Support JSONP callback via `?callback=`.

## Usage

```
npm install -g bracelet
bracelet
```

A request to `http://localhost:3000/hello/[1,2,3]` will return the following JSON.

```javascript
{
  "hello": [1, 2, 3]
}
```

A request to `http://localhost:3000/hello/{"a":1}` will return the following JSON.

```javascript
{
  "hello": {
    "a": 1
  }
}
```

A post with JSON to `http://localhost:3000/` (or any other url) will return the JSON you posted.

```javascript
{
  "hello": "world"
}
``` 

## Options

* `-p` - Change port. Default is 3000.