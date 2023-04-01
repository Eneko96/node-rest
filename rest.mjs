import http from 'http'
import EventEmitter from 'events'
import chalk from 'chalk'
import path from 'path'
import fs from 'fs'

export class Enexpress extends EventEmitter {
  constructor () {
    super()
    this._middlewares = []
    this._routes = []
    this.get = this.get.bind(this)
    this.post = this.post.bind(this)
    this.put = this.put.bind(this)
    this.delete = this.delete.bind(this)
    this.listen = this.listen.bind(this)
    this.use = this.use.bind(this)
    this.router = this.router.bind(this)
  }

  #constructReturnHeaders (res) {
    const responseMethods = {
      json: { contentType: 'application/json', bodySerializer: JSON.stringify },
      text: { contentType: 'text/plain', bodySerializer: (body) => body },
      html: { contentType: 'text/html', bodySerializer: (body) => body },
      redirect: { contentType: 'text/plain', bodySerializer: () => {} }
    }

    for (const [methodName, method] of Object.entries(responseMethods)) {
      res[methodName] = (body) => {
        const { contentType, bodySerializer } = method
        this.res.statusCode = body ? 200 : 204
        this.res.setHeader('Content-Type', contentType)
        this.res.end(bodySerializer(body))
      }
    }
  }

  get (...args) {
    const [path, ...restArgs] = args
    const handler = restArgs.pop()
    this._routes.push({ method: 'GET', middlewares: restArgs, path, handler })
  }

  post (path, handler) {
    const parseBody = (req) => {
      return new Promise((resolve, reject) => {
        let body = ''
        req.on('data', chunk => {
          body += chunk.toString()
        })
        req.on('end', () => {
          try {
            req.body = JSON.parse(body)
            resolve()
          } catch (err) {
            reject(err)
          }
        })
      })
    }

    const wrappedHandler = async (req, res) => {
      try {
        await parseBody(req)
        handler(req, res)
      } catch (err) {
        res.statusCode = 400
        res.end(`Error: ${err.message}`)
      }
    }

    this._routes.push({ method: 'POST', path, handler: wrappedHandler })
  }

  put (path, handler) {
    const parseBody = (req) => {
      return new Promise((resolve, reject) => {
        let body = ''
        req.on('data', chunk => {
          body += chunk.toString()
        })
        req.on('end', () => {
          try {
            req.body = JSON.parse(body)
            resolve()
          } catch (err) {
            reject(err)
          }
        })
      })
    }

    const wrappedHandler = async (req, res) => {
      try {
        await parseBody(req)
        handler(req, res)
      } catch (err) {
        res.statusCode = 400
        res.end(`Error: ${err.message}`)
      }
    }

    this._routes.push({ method: 'PUT', path, handler: wrappedHandler })
  }

  delete (path, handler) {
    this._routes.push({ method: 'DELETE', path, handler })
  }

  use (middleware) {
    this._middlewares.push(middleware)
  }

  handle404 (_req, res) {
    res.statusCode = 404
    res.end('404 Not Found')
  }

  listen (port, callback) {
    const server = http.createServer((req, res) => {
      const { method, url } = req
      if (method === 'GET' && url.startsWith('/static/')) {
        const filePath = path.join(__dirname, url)
        fs.readFile(filePath, (err, data) => {
          if (err) {
            console.error(`Error reading file ${filePath}:`, err)
            res.statusCode = 500
            res.end()
          } else {
            res.setHeader('Content-Type', 'text/html')
            res.end(data)
          }
        })
      } else {
        const route = this._routes.find(
          (r) => r.method === method && r.path === url
        )
        if (route) {
          console.log(chalk.green('Routing in:', route.method, route.path))
          this.res = res
          this.#constructReturnHeaders(res)
          // run middlewares
          for (const middleware of this._middlewares) {
            middleware(req, res)
          }
          route.handler(req, res)
        } else {
          res.statusCode = 404
          res.end()
        }
      }
    })
    process.stdout.write('\x1Bc')
    server.listen(port, callback)
  }
}
