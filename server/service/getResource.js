exports.getResource = function (model, id) {
    let instance = {};
    model.findByPk(id).then(result => {
        instance = result;
    });
   return instance
};