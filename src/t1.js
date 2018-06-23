const fetch = require('node-fetch')
const { URLSearchParams } = require('url')

function makeBody(options) {
  return Object.keys(options).reduce((state, key) => {
    state.append(key, options[key])
    return state
  }, new URLSearchParams())
}

function getToken({ username, password, host, proto = 'http', port = '80' }) {
  const body = makeBody({ username, password })
  return fetch(`${proto}://${host}:${port}/api/auth`, {
    method: 'POST',
    body,
  }).then(res => res.json())
}

function T1Fetch({ username, password, host, proto = 'http', port = '80' }) {
  return async function t1fetch(url, options = {}) {
    const originalHeaders = options.headers || {}
    const newHeaders = {
      Authorization: `Bearer ${
        (await getToken({ username, password, host, proto, port })).jwt
      }`,
      ...originalHeaders,
    }
    return fetch(url, { ...options, headers: { ...newHeaders } })
  }
}

class T1 {
  constructor({ username, password, host, proto = 'http', port = '80' }) {
    this.host = host
    this.proto = proto
    this.port = port
    this.fetch = T1Fetch({ username, password, host, proto, port })

    // Dynamically create getters
    this.api = new Proxy(
      {},
      {
        get: (target, name) =>
          this.fetch(`${this.proto}://${this.host}:${port}/api/${name}`).then(
            res => res.json(),
          ),
        set: (target, name, value) =>
          this.fetch(`${this.proto}://${this.host}:${port}/api/${name}`, {
            method: 'POST',
            body: makeBody(value),
          }).then(res => res.json()),
      },
    )
  }
}

module.exports = { getToken, T1Fetch, T1 }
