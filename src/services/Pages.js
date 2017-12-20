const getAll = () => {
  return fetch(`${process.env.REACT_APP_API_URL}/api/pages`).then(response => response.json());
};

module.exports = {
  getAll,
  get: pageId => {
    return getAll().then(pages => pages.find(page => page.objectId === pageId));
  },
  addPage: pageUrl => {
    return fetch(process.env.REACT_APP_API_URL + "/api/pages/new", { method: "POST", body: JSON.stringify({ pageUrl }) }).catch(console.log);
  }
};
