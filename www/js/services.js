angular.module('starter.services', [])
  .factory('Records', function() {
    // Might use a resource here that returns a JSON array

    // Some fake testing data
    var records = [];

    return {
      set:function(a){
        records=a;
      },
      reset:function(){
        records=[];
      },
      addRecord:function(record){
        record.id=records.length
        records.push(record)
      },
      all: function() {
        return records;
      },
      remove: function(record) {
        records.splice(records.indexOf(record), 1);
      },
      get: function(recordId) {
        for (var i = 0; i < records.length; i++) {
          if (records[i].id === parseInt(recordId)) {
            return records[i];
          }
        }
        return null;
      }
    };
  });
