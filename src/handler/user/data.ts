import type { User } from '@/types'
import { IndexedDBRepository } from '@/libs/storage/repository'

const users: User[] = [
  {
    id: '1',
    name: 'Abya Admin',
    email: 'abya.admin@gmail.com',
    password: '1Password_',
    roles: [{ id: 1, name: 'admin' }],
    permissions: [
      { id: 1, key: 'user.read', name: 'Read User' },
      { id: 2, key: 'user.write', name: 'Write User' },
      { id: 3, key: 'user.update', name: 'Update User' },
      { id: 4, key: 'user.delete', name: 'Delete User' },

      { id: 5, key: 'cv.read', name: 'Read CV' },
      { id: 6, key: 'cv.write', name: 'Write CV' },
      { id: 7, key: 'cv.update', name: 'Update CV' },
      { id: 8, key: 'cv.delete', name: 'Delete CV' },

      { id: 9, key: 'candidate.read', name: 'Read Candidate' },
      { id: 10, key: 'candidate.write', name: 'Write Candidate' },
      { id: 11, key: 'candidate.update', name: 'Update Candidate' },
      { id: 12, key: 'candidate.delete', name: 'Delete Candidate' },

      { id: 13, key: 'job-post.read', name: 'Read Job Post' },
      { id: 14, key: 'job-post.write', name: 'Write Job Post' },
      { id: 15, key: 'job-post.update', name: 'Update Job Post' },
      { id: 16, key: 'job-post.delete', name: 'Delete Job Post' },
    ],
  },
  {
    id: '2',
    name: 'Abya Candidate',
    email: 'abya.candidate@gmail.com',
    password: '1Password_',
    roles: [{ id: 1, name: 'candidate' }],
    permissions: [
      { id: 1, key: 'me:cv.read', name: 'Read CV' },
      { id: 2, key: 'me:cv.delete', name: 'Delete CV' },
      { id: 3, key: 'me:cv.update', name: 'Update CV' },
      { id: 4, key: 'me:cv.create', name: 'Create CV' },
    ],
  },
]

class UserRepository extends IndexedDBRepository<User> {
  constructor () {
    super('users-db', 'users')
    this.init()
  }

  async init () {
    if (await this.isEmpty()) {
      this.create(users)
    }
  }
}

export const userRepository = new UserRepository()
