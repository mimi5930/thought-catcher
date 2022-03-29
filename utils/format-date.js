const { format } = require('date-fns');

const formatDate = date => {
	return format(date, 'MMMM do y hh:mm:ss a');
};

module.exports = formatDate;
