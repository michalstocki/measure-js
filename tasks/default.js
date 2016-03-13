module.exports = () => () => require('run-sequence')('check', 'compile', 'test:unit');
