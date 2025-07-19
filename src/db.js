import './webOSTV'
export default class DB {
  constructor(id) {
    const owner = webOS.fetchAppId()
    this.id = `${owner}:${id}`
    this.createdDB = new Promise((resolve, reject) => {
      webOS.service.request('luna://com.palm.db', {
        method: 'putKind',
        parameters: {
          id: this.id,
          owner,
          private: true
        },
        onSuccess: (evt) => resolve(evt),
        onFailure: (evt) => reject(evt)
      })
    }).catch((e) => {
      throw e
    })
  }
  getSimpleData() {
    const flagName = 'isSimpleRow'
    return this.find().then(({ results }) => {
      results = results.filter((i) => !isNaN(i[flagName]))
      if (!results.length) {
        return this.put([{ [flagName]: true }]).then(({ results: putResults }) => {
          return this.get(putResults.map((i) => i.id)).then(({ results }) => results[0])
        })
      }
      return results[0]
    })
  }
  simpleRead(key) {
    return this.getSimpleData().then((res) => res[key])
  }
  simpleWrite(key, val) {
    return this.getSimpleData().then((res) => {
      res[key] = val
      delete res._kind
      delete res._rev
      return this.merge([res])
    })
  }
  get(ids) {
    return new Promise((resolve, reject) => {
      this.createdDB.then(() => {
        webOS.service.request('luna://com.palm.db', {
          method: 'get',
          parameters: {
            ids
          },
          onSuccess: (evt) => resolve(evt),
          onFailure: (evt) => reject(evt)
        })
      })
    })
  }
  put(ary) {
    return new Promise((resolve, reject) => {
      this.createdDB.then(() => {
        webOS.service.request('luna://com.palm.db', {
          method: 'put',
          parameters: {
            objects: ary.map((i) => Object.assign({}, i, { _kind: this.id }))
          },
          onSuccess: (evt) => resolve(evt),
          onFailure: (evt) => reject(evt)
        })
      })
    })
  }
  merge(arg0, arg1) {
    // merge(objects) or merge(props,query)
    const parameters = {}
    if (arg1) {
      parameters.props = arg0
      parameters.query = arg1
    } else {
      parameters.objects = arg0
    }
    return new Promise((resolve, reject) => {
      this.createdDB.then(() => {
        webOS.service.request('luna://com.palm.db', {
          method: 'merge',
          parameters,
          onSuccess: (evt) => resolve(evt),
          onFailure: (evt) => reject(evt)
        })
      })
    })
  }
  find(query) {
    return new Promise((resolve, reject) => {
      this.createdDB.then(() => {
        webOS.service.request('luna://com.palm.db', {
          method: 'find',
          parameters: {
            query: Object.assign({}, query, { from: this.id })
          },
          onSuccess: (evt) => resolve(evt),
          onFailure: (evt) => reject(evt)
        })
      })
    })
  }
}
