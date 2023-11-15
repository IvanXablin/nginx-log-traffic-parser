# About

This package is intended for parsing the log file that creates this [nginx-module](https://github.com/Lax/traffic-accounting-nginx-module)

# Installing

```
$ npm i nginx-log-traffic-parser
```

Once the package is installed, you can import the library using import

```
import parser from 'nginx-log-traffic-parser'
```

# Example

```
import parser from 'nginx-log-traffic-parser'

const result = await parser('../http-traffic-example.log') // the path in the file is passed as an argument

console.log(result)
