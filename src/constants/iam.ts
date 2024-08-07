export const IAM_GROUP = Object.freeze({
  COMMUNITY_ADMIN: 'COMMUNITY_ADMIN',
  CHAPTER_ADMIN: 'CHAPTER_ADMIN',
  CHAPTER_MEMBER: 'CHAPTER_MEMBER',
  ORGANIZATION_OWNER: 'ORGANIZATION_OWNER',
  ORGANIZATION_ADMIN: 'ORGANIZATION_ADMIN',
  ORGANIZATION_MEMBER: 'ORGANIZATION_MEMBER',
});

export const IAM_PERMISSION = Object.freeze({
  CREATE_CHAPTER: 'CREATE_CHAPTER',
  UPDATE_CHAPTER: 'UPDATE_CHAPTER',
  DELETE_CHAPTER: 'DELETE_CHAPTER',
  BULK_CHAPTER: 'BULK_CHAPTER',

  INVITE_CHAPTER_ORGANIZATION: 'INVITE_CHAPTER_ORGANIZATION',
  INVITE_CHAPTER_USER: 'INVITE_CHAPTER_USER',

  CREATE_ORGANIZATION: 'CREATE_ORGANIZATION',
  UPDATE_ORGANIZATION: 'UPDATE_ORGANIZATION',
  DELETE_ORGANIZATION: 'DELETE_ORGANIZATION',

  INVITE_ORGANIATION_USER: 'INVITE_ORGANIATION_USER',
});

export const IAM_GROUP_PERMISSION = Object.freeze({
  [IAM_GROUP.COMMUNITY_ADMIN]: [
    IAM_PERMISSION.CREATE_CHAPTER,
    IAM_PERMISSION.UPDATE_CHAPTER,
    IAM_PERMISSION.DELETE_CHAPTER,

    IAM_PERMISSION.INVITE_CHAPTER_ORGANIZATION,
    IAM_PERMISSION.INVITE_CHAPTER_USER,

    IAM_PERMISSION.CREATE_ORGANIZATION,
    IAM_PERMISSION.UPDATE_ORGANIZATION,
    IAM_PERMISSION.DELETE_ORGANIZATION,

    IAM_PERMISSION.INVITE_ORGANIATION_USER,
  ],
  [IAM_GROUP.CHAPTER_ADMIN]: [
    IAM_PERMISSION.UPDATE_CHAPTER,
    IAM_PERMISSION.INVITE_CHAPTER_ORGANIZATION,
    IAM_PERMISSION.INVITE_CHAPTER_USER,
  ],
  [IAM_GROUP.ORGANIZATION_OWNER]: [
    IAM_PERMISSION.CREATE_ORGANIZATION,
    IAM_PERMISSION.UPDATE_ORGANIZATION,
    IAM_PERMISSION.INVITE_ORGANIATION_USER,
    IAM_PERMISSION.DELETE_ORGANIZATION,
  ],
  [IAM_GROUP.ORGANIZATION_ADMIN]: [
    IAM_PERMISSION.CREATE_ORGANIZATION,
    IAM_PERMISSION.UPDATE_ORGANIZATION,
    IAM_PERMISSION.INVITE_ORGANIATION_USER,
  ],
  [IAM_GROUP.ORGANIZATION_MEMBER]: [],
});
export const IAM_GROUP_LEVEL = Object.freeze({
  [IAM_GROUP.ORGANIZATION_OWNER]: 2,
  [IAM_GROUP.ORGANIZATION_ADMIN]: 1,
  [IAM_GROUP.ORGANIZATION_MEMBER]: 0,
  [IAM_GROUP.COMMUNITY_ADMIN]: 2,
  [IAM_GROUP.CHAPTER_ADMIN]: 1,
  [IAM_GROUP.CHAPTER_MEMBER]: 0,
});

export const MESSAGE_GROUP_ROLE = Object.freeze({
  ADMIN: 'ADMIN',
  CREATOR: 'CREATOR',
  MEMBER: 'MEMBER',
});

export const MESSAGE_GROUP_UPDATE_ROLE = Object.freeze({
  ADMIN: 'ADMIN',
  MEMBER: 'MEMBER',
});
