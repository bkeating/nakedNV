const noteSchema = {
  title: 'note',
  description: 'an individual note',
  version: 0,
  type: 'object',
  indexes: [
    'createdAt',
    'updatedAt'
    // 'creditCards.[].cvc',
    // ['lastName', 'familyName'] // <- this will create a compound-index for these two fields
  ],
  properties: {
    name: {
      type: 'string',
      // primary: true
    },
    type: {
      type: 'string'
    },
    body: {
      type: 'string'
    },
    createdAt: {
      type: 'number',
    },
    updatedAt: {
      type: 'number',
    },
    currentSelection: {
      type: "string"
    },
  },
  required: ['name'],
};

export default noteSchema;
