var mongoose = require('mongoose');

var dataSchema  = mongoose.Schema({
    title: String
});

var Data = mongoose.model('Data', dataSchema);

// POST
exports.addItem = function (req, res) {
  var item = new Data({ title: req.body.title });
  item.save(function (err, item) {
    if (err) return console.error(err);
    console.log(item);
    res.json(req.body);
  });
};

// GET
exports.itens = function (req, res) {
  var itens = [];

  Data.find(function(err, allItens) {    
    if (err)
      res.send(err)

    allItens.forEach(function (item, i) {
      itens.push({
        id: item.id,
        title: item.title,
      });
    });

    res.json({
      itens: itens
    });
  });

};

// PUT
exports.editItem = function (req, res) {
  var id = req.params.id;

  Data.update({ "_id": id }, { title: 'a'}, function (err, numAffected) {
    if (err) {
      console.log("Error on update");
      res.send(err);
    } else {
      console.log("updated num: " + numAffected);
      res.json(true);
    }
  });
};

// DELETE
exports.deleteItem = function (req, res) {
  var id = req.params.id;

  Data.remove({
    _id : id
  }, function(err, item){
    if (err)
      res.send(err);

    res.json(true);

  });
};

exports.item = function (req, res) {
  var id = req.params.id;

  Data.findById(id, function(err, item) {    
    if (err)
      res.send(err)

    res.json({
      item: item
    });
  });
};
