module.exports = () => () => require('run-sequence')('compile', 'test:unit');
