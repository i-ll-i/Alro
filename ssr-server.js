const { createServer } = require('http');
const { parse } = require('url');
const next = require('next');

const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();

app.prepare().then(() => {
  createServer((req, res) => {

    const parsedUrl = parse(req.url, true);
    const { pathname, query } = parsedUrl;

    if (pathname === '/') {

      app.render(req, res, '/', query);

    } else if (pathname === '/admin') {

        app.render(req, res, '/components/admin panel/admin', query);

    } else {

        app.render(req, res, '/404');

    }
  }).listen(3000, (err) => {

    if (err) throw err;

    console.log('> Ready on http://localhost:3000');

  })
})