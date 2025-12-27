abstract class Repository<T extends { id: IDBValidKey }> {
  abstract getAll (): Promise<T[]>
  abstract getById (id: IDBValidKey): Promise<T | undefined>
  abstract create (data: T[]): Promise<void>
  abstract update (id: IDBValidKey, data: Partial<T>): Promise<T>
  abstract delete (id: IDBValidKey): Promise<void>
}

export function paginate<T> (
  items: T[],
  page = 1,
  perPage = 10,
) {
  const start = (page - 1) * perPage
  const end = start + perPage
  return items.slice(start, end)
}

function openDB (
  dbName: string,
  storeName: string,
  version = 1,
): Promise<IDBDatabase> {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(dbName, version)

    request.addEventListener('upgradeneeded', () => {
      const db = request.result
      if (!db.objectStoreNames.contains(storeName)) {
        db.createObjectStore(storeName, { keyPath: 'id', autoIncrement: true })
      }
    })

    request.addEventListener('success', () => {
      resolve(request.result)
    })

    request.addEventListener('error', () => {
      reject(request.error)
    })
  })
}

export abstract class IndexedDBRepository<T extends { id: IDBValidKey }>
  extends Repository<T> {
  protected dbPromise: Promise<IDBDatabase>
  protected storeName: string

  constructor (dbName: string, storeName: string) {
    super()
    this.storeName = storeName
    this.dbPromise = openDB(dbName, storeName)
  }

  async getAll (): Promise<T[]> {
    const store = await this.getStore('readonly')
    return new Promise((resolve, reject) => {
      const request = store.getAll()
      request.addEventListener('success', () => {
        resolve(request.result)
      })

      request.addEventListener('error', () => {
        reject(request.error)
      })
    })
  }

  async getById (id: IDBValidKey): Promise<T | undefined> {
    const store = await this.getStore('readonly')
    return new Promise((resolve, reject) => {
      const request = store.get(id)
      request.addEventListener('success', () => {
        resolve(request.result)
      })

      request.addEventListener('error', () => {
        reject(request.error)
      })
    })
  }

  async create (data: T | T[]): Promise<void> {
    const store = await this.getStore('readwrite')
    const items = Array.isArray(data) ? data : [data]

    return new Promise((resolve, reject) => {
      let remaining = items.length

      const checkDone = () => {
        remaining--
        if (remaining === 0) {
          resolve()
        }
      }

      for (const item of items) {
        const request = store.add(item as T)
        request.addEventListener('success', checkDone)
        request.addEventListener('error', () => reject(request.error))
      }
    })
  }

  async update (id: IDBValidKey, data: Partial<T>): Promise<T> {
    const store = await this.getStore('readwrite')

    console.log({ id, data })

    return new Promise((resolve, reject) => {
      const getRequest = store.get(id)

      getRequest.addEventListener('success', () => {
        const existing = getRequest.result
        if (!existing) {
          reject(new Error('Data not found'))
          return
        }

        const updated = { ...existing, ...data }
        const updateRequest = store.put(updated)
        updateRequest.addEventListener('success', () => {
          resolve(updated)
        })

        updateRequest.addEventListener('error', () => {
          reject(updateRequest.error)
        })
      })

      getRequest.addEventListener('error', () => {
        reject(getRequest.error)
      })
    })
  }

  async delete (id: IDBValidKey): Promise<void> {
    const store = await this.getStore('readwrite')
    return new Promise((resolve, reject) => {
      const request = store.delete(id)
      request.addEventListener('success', () => {
        resolve(request.result)
      })

      request.addEventListener('error', () => {
        reject(request.error)
      })
    })
  }

  /** Check if store is empty */
  async isEmpty (): Promise<boolean> {
    const store = await this.getStore('readonly')
    return new Promise((resolve, reject) => {
      const req = store.count()
      req.addEventListener('success', () => resolve(req.result === 0))
      req.addEventListener('error', () => reject(req.error))
    })
  }

  /** Delete all data in the store */
  async resetData (): Promise<void> {
    const store = await this.getStore('readwrite')
    return new Promise((resolve, reject) => {
      const req = store.clear()
      req.addEventListener('success', () => resolve())
      req.addEventListener('error', () => reject(req.error))
    })
  }

  protected async getStore (mode: IDBTransactionMode) {
    const db = await this.dbPromise
    return db.transaction(this.storeName, mode).objectStore(this.storeName)
  }
}
