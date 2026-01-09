// Permission keys (for route check)
export const PERMISSION = {
  ADMIN: {
    user_read: 'user.read',
    user_write: 'user.write',
    user_update: 'user.update',
    user_delete: 'user.delete',

    cv_read: 'cv.read',
    cv_write: 'cv.write',
    cv_update: 'cv.update',
    cv_delete: 'cv.delete',

    candidate_read: 'candidate.read',
    candidate_write: 'candidate.write',
    candidate_update: 'candidate.update',
    candidate_delete: 'candidate.delete',

    job_read: 'job-post.read',
    job_write: 'job-post.write',
    job_update: 'job-post.update',
    job_delete: 'job-post.delete',
  },
  CANDIDATE: {
    PLAYGROUND: 'playgorund',
  },
}
