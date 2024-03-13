// Objects
export const MSG_OBJ_DISABLED = (obj) => `${obj} was disabled`;

export const MSG_USER_WAS_LOCKED = 'User was locked';

export const MSG_DO_NOT_PERMISSION = 'You do not have policy';

export const MSG_OBJ_NOT_FOUND = (objName) => `${objName} Not Found`;

export const MSG_OBJ_FORBIDDEN = (objName) => `${objName} Forbidden`;

export const MSG_ARR_NOT_FOUND = (objName) => `${objName}s Not Found`;

export const MSG_DELETED_SUCCESSFULLY = (obj, f) =>
  `Delete ${obj} id:'${f}' is successfully`;

export const MSG_OBJ_CREATE_SUCCESSFULLY = (obj) =>
  `Create new ${obj} successfully`;

export const MSG_OBJ_ALREADY_EXIST = (obj) => `${obj} already exist`;

// Fields
export const MSG_FIELD_REQUIRED = (f) => `Field ${f} is required`;

export const MSG_FIELD_MUST_ALPHANUMERIC = (f) =>
  `Field :${f} must be alphanumeric`;

export const MSG_FIELD_MUST_URL = (f) => `Field :${f} must be url`;

// Exception
export const MSG_INTERNAL_SERVER_ERROR = 'Internal Server Error';

// Auth
export const MSG_AUTH_FAILED = 'Auth failed.';

export const MSG_AUTH_HAS_EXPIRED = 'Auth has expired..';

export const MSG_CREATED_NEWS = (name: string) =>
  `${name} have just created a new piece of news`;

export const MSG_CREATED_MENTION_NEWS = (name: string) =>
  `${name} has just mentioned you in a news article`;
