export const RESOURCE_TYPE = Object.freeze({
  NEWS: 'news',
  USER: 'user',
  ORGANIZATION: 'organization',
  PRODUCT: 'product',
  COMMENT: 'comment',
  CHAPTER: 'chapter',
});

export const NEWS_TYPE = Object.freeze({
  NEWS: 2,
  EVENT: 1,
  OPPORTUNITY: 0,
});

export const EVENT_TYPE = Object.freeze({
  0: 'create_opportunity',
  1: 'create_event',
  2: 'create_news',
});

export const ORGANIZATION_EVENT_TYPE = Object.freeze({
  0: 'organization_create_opportunity',
  1: 'organization_create_event',
  2: 'organization_create_news',
});

export const CHAPTER_EVENT_TYPE = Object.freeze({
  0: 'chapter_create_opportunity',
  1: 'chapter_create_event',
  2: 'chapter_create_news',
});

export const REACTION_EVENT_TYPE = Object.freeze({
  PRODUCT: 'reaction_product',
  0: 'reaction_opportunity',
  1: 'reaction_event',
  2: 'reaction_news',
});

export const MENTION_EVENT_TYPE = Object.freeze({
  PRODUCT: 'mention_product',
  0: 'mention_opportunity',
  1: 'mention_event',
  2: 'mention_news',
});

export const COMMENT_MENTION_EVENT_TYPE = Object.freeze({
  product: 'comment_mention_product',
  news: 'comment_mention_news',
});

export const COMMENT_EVENT_TYPE = Object.freeze({
  PRODUCT: 'comment_product',
  0: 'comment_opportunity',
  1: 'comment_event',
  2: 'comment_news',
});

export const FOLLOW_RESOURCE_TYPE = Object.freeze({
  news: 'follow_news',
  user: 'follow_user',
  organization: 'follow_organization',
  product: 'follow_product',
});

export const REPLY_EVENT_TYPE = Object.freeze({
  REPLY_PRODUCT: 'reply_comment_product',
  REPLY_NEWS: 'reply_comment_news',
});
