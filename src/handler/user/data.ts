import type { User } from '@/types'
import { IndexedDBRepository } from '@/libs/storage/repository'

const users: User[] = [
  {
    id: '1',
    name: 'Abya Admin',
    email: 'abya.admin@gmail.com',
    password: '1Password_',
    role: 'admin',
    permissions: [
      { id: 1, key: 'admin.user.read', name: 'Read User' },
      { id: 2, key: 'admin.user.write', name: 'Write User' },
      { id: 3, key: 'admin.user.update', name: 'Update User' },
      { id: 4, key: 'admin.user.delete', name: 'Delete User' },

      { id: 5, key: 'admin.cv.read', name: 'Read CV' },
      { id: 6, key: 'admin.cv.write', name: 'Write CV' },
      { id: 7, key: 'admin.cv.update', name: 'Update CV' },
      { id: 8, key: 'admin.cv.delete', name: 'Delete CV' },

      { id: 9, key: 'admin.candidate.read', name: 'Read Candidate' },
      { id: 10, key: 'admin.candidate.write', name: 'Write Candidate' },
      { id: 11, key: 'admin.candidate.update', name: 'Update Candidate' },
      { id: 12, key: 'admin.candidate.delete', name: 'Delete Candidate' },

      { id: 13, key: 'admin.job-post.read', name: 'Read Job Post' },
      { id: 14, key: 'admin.job-post.write', name: 'Write Job Post' },
      { id: 15, key: 'admin.job-post.update', name: 'Update Job Post' },
      { id: 16, key: 'admin.job-post.delete', name: 'Delete Job Post' },
    ],
  },
  {
    id: '2',
    name: 'Abya Candidate',
    email: 'abya.candidate@gmail.com',
    password: '1Password_',
    role: 'candidate',
    permissions: [
      { id: 1, key: 'candidate.cv.read', name: 'Read CV' },
      { id: 2, key: 'candidate.cv.delete', name: 'Delete CV' },
      { id: 3, key: 'candidate.cv.update', name: 'Update CV' },
      { id: 4, key: 'candidate.cv.create', name: 'Create CV' },
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
