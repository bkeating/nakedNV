const noteSchema = {
  title: 'note',
  description: 'an individual note',
  version: 0,
  type: 'object',
  properties: {
    guid: {
      type: 'string',
    },
    name: {
      type: 'string',
      primary: true
    },
    type: {
      type: 'string'
    },
    body: {
      type: 'string'
    },
    createdAt: {
      type: 'string',
      format: 'date-time'
    },
    updatedAt: {
      type: 'string',
      format: 'date-time'
    },
    currentSelection: {
      type: "string"
    },
  },
  required: ['name']
};

export default noteSchema;
