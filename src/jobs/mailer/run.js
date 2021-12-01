const queue = require('./index');

queue.process(function (job, done) {

  console.log('job rodado', job.data);
  done();

});
