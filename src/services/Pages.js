const getAll = () => {
  return new Promise((resolve, reject) => {
    if (localStorage.getItem("NEON-PAGES")) {
      resolve(JSON.parse(localStorage.getItem("NEON-PAGES")));
    } else {
      fetch(`${process.env.REACT_APP_API_URL}/api/pages`)
        .then(response => response.json())
        .then(pages => {
          localStorage.setItem("NEON-PAGES", JSON.stringify(pages));
          resolve(JSON.parse(localStorage.getItem("NEON-PAGES")));
        });
    }
  });
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
