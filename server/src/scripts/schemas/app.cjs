const App = {
  type: 'object',
  properties: {
    id: { type: 'number' },
    clientId: { type: 'string' },
    name: { type: 'string' },
    isActive: { type: 'boolean' },
    type: {
      type: 'string',
      enum: ['spa', 's2s'],
    },
    secret: { type: 'string' },
    redirectUris: {
      type: 'array',
      items: { type: 'string' },
    },
    useSystemMfaConfig: { type: 'boolean' },
    requireEmailMfa: { type: 'boolean' },
    requireOtpMfa: { type: 'boolean' },
    requireSmsMfa: { type: 'boolean' },
    allowEmailMfaAsBackup: { type: 'boolean' },
    createdAt: { type: 'string' },
    updatedAt: { type: 'string' },
    deletedAt: {
      type: 'string',
      nullable: true,
    },
  },
  required: [
    'id', 'clientId', 'name', 'isActive', 'type', 'secret', 'redirectUris',
    'useSystemMfaConfig', 'requireEmailMfa', 'requireOtpMfa', 'requireSmsMfa',
    'allowEmailMfaAsBackup', 'createdAt', 'updatedAt', 'deletedAt',
  ],
}

const AppDetail = {
  allOf: [
    { $ref: '#/components/schemas/App' },
    {
      type: 'object',
      properties: {
        scopes: {
          type: 'array',
          items: { type: 'string' },
        },
      },
      required: ['scopes'],
    },
  ],
}

const PostAppReq = {
  type: 'object',
  properties: {
    name: {
      type: 'string',
      minLength: 1,
      maxLength: 50,
    },
    type: {
      type: 'string',
      enum: ['spa', 's2s'],
    },
    scopes: {
      type: 'array',
      items: { type: 'string' },
    },
    redirectUris: {
      type: 'array',
      items: { type: 'string' },
    },
  },
  required: ['name', 'type', 'scopes', 'redirectUris'],
}

const PutAppReq = {
  type: 'object',
  properties: {
    redirectUris: {
      type: 'array',
      items: { type: 'string' },
    },
    name: {
      type: 'string',
      minLength: 1,
      maxLength: 50,
    },
    isActive: { type: 'boolean' },
    scopes: {
      type: 'array',
      items: { type: 'string' },
    },
    useSystemMfaConfig: { type: 'boolean' },
    requireEmailMfa: { type: 'boolean' },
    requireOtpMfa: { type: 'boolean' },
    requireSmsMfa: { type: 'boolean' },
    allowEmailMfaAsBackup: { type: 'boolean' },
  },
}

module.exports = {
  App, AppDetail, PostAppReq, PutAppReq,
}
