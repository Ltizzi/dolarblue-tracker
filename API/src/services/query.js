const DEFAULT_PAGE_NUMBER = 1;
const DEFAULT_PAGE_LIMIT = 0;

function getPagination(query) {
  return { skip: query.skip, limit: query.limit };
}

module.exports = {
  getPagination,
};
