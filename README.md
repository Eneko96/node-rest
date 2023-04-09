# Enexpress

Own implementation of express for testing purposes

## Installation

```bash
npm install @eneko96/enexpress
```

## Usage

```javascript

const express = require('@eneko96/enexpress');

const app = express();

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.listen(3000, () => {
  console.log('Example app listening on port 3000!');
});

app.get('/users', (req, res) => {
  res.send('Hello World!');
});

app.get('/users/:id', (req, res) => {
  res.send('Hello World!');
});

app.post('/users', (req, res) => {
  res.send('Hello World!');
});

app.put('/users/:id', (req, res) => {
  res.send('Hello World!');
});

app.delete('/users/:id', (req, res) => {
  res.send('Hello World!');
});

```

### Routing

```javascript

const express = require('@eneko96/enexpress');

const router = express.Router();

router.get('/', (req, res) => {
  res.send('Hello World!');
});

router.get('/router', (req, res) => {
  res.send('Hello World!');
});

// in app.js
app.use('/router', router);

```


## License

[MIT](https://choosealicense.com/licenses/mit/)

## Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

Please make sure to update tests as appropriate.

## Authors

- [@eneko96](https://www.github.com/eneko96)
