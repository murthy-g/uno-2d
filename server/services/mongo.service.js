'use strict';

const getMongoData = {
  find: (model, conditions) =>
    new Promise((resolve, rejection) => {
      model.find(model, conditions, (err, result) => {
        if (err) {
          rejection(err);
        }
        const obj = {
          name: conditions,
          data: result,
        };
        resolve(obj);
      });
    }),
  save: (model, doc, req) => {
    new Promise((resolve, reject) => {
      model
        .create(doc)
        .then(data => {
          resolve(data);
        })
        .catch(err => reject(err));
    });
  },
  update: (model, conditions, doc, req) => {
    new Promise((resolve, reject) => {
      model
        .update(conditions, {$set: doc})
        .exec()
        .then(data => {
          resolve(data);
        })
        .catch(err => reject(err));
    });
  },
  remove: (model, conditions, req) => {
    new Promise((resolve, reject) => {
      model
        .remove(conditions)
        .exec()
        .then(data => {
          resolve(data);
        })
        .catch(err => reject(err));
    });
  },
};

module.exports = {
  getMongoData: getMongoData,
};
