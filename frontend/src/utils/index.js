// Pull token from query string
// Returns an object with the parameters as properties
export const getHashParams = () => {
    const hashParams = {};
    let e;
    const r = /([^&;=]+)=?([^&;]*)/g;
    const q = window.location.hash.substring(1);
    while ((e = r.exec(q))) {
      hashParams[e[1]] = decodeURIComponent(e[2]);
    }
    return hashParams;
  };

// Error Handling
export const catchErrors = fn => {
    return function(...args) {
      return fn(...args).catch(err => {
        console.error(err);
      });
    };
  };