// Permission keys (for route check)
export const PERMISSION = {
  ADMIN: {
    user_read: 'admin.user.read',
    user_write: 'admin.user.write',
    user_update: 'admin.user.update',
    user_delete: 'admin.user.delete',
    cv_read: 'admin.cv.read',
    cv_write: 'admin.cv.write',
    cv_update: 'admin.cv.update',
    cv_delete: 'admin.cv.delete',
    candidate_read: 'admin.candidate.read',
    candidate_write: 'admin.candidate.write',
    candidate_update: 'admin.candidate.update',
    candidate_delete: 'admin.candidate.delete',
    job_read: 'admin.job-post.read',
    job_write: 'admin.job-post.write',
    job_update: 'admin.job-post.update',
    job_delete: 'admin.job-post.delete',
  },
  CANDIDATE: {
    PLAYGROUND: 'candidate.playgorund',
    cv_read: 'candidate.cv.read',
  },
}

// Permission names (for UI/component check)
export const PERMISSION_NAMES = {
  ADMIN: {
    user_read: 'Read User',
    user_write: 'Write User',
    user_update: 'Update User',
    user_delete: 'Delete User',
    cv_read: 'Read CV',
    cv_write: 'Write CV',
    cv_update: 'Update CV',
    cv_delete: 'Delete CV',
    candidate_read: 'Read Candidate',
    candidate_write: 'Write Candidate',
    candidate_update: 'Update Candidate',
    candidate_delete: 'Delete Candidate',
    job_read: 'Read Job Post',
    job_write: 'Write Job Post',
    job_update: 'Update Job Post',
    job_delete: 'Delete Job Post',
  },
  CANDIDATE: {
    PLAYGROUND: 'Candidate Page',
    cv_read: 'Read CV',
  },
}
