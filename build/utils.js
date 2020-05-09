const glob = require('glob');
const path = require('path');
/**
 *根据glob规则匹配出指定的路径对象。
 *
 * @param {string} p 路径pattern
 * @returns
 * {
    index: {
      html: '/xxx/xxx.html',
      js: '/xxx/xxx.js'
    },
    about: {
      html: '/xxx/xxx.html',
      js: '/xxx/xxx.js'
    },
    ...
  }
 */
const generatePath = p => {
  let entries = {};
  glob.sync(p).forEach(filePath => {
    let pathObj = path.parse(filePath);
    let ext = pathObj.ext.slice(1);
    let name = pathObj.name;
    if (entries[name]) {
      entries[name][ext] = filePath;
    } else {
      entries[name] = {};
      entries[name][ext] = filePath;
    }
  });
  return entries;
};

const getEntries = ext => {
  if (ext) {
    return generatePath(path.resolve(__dirname, `../src/pages/*/*.${ext}`));
  } else {
    return generatePath(path.resolve(__dirname, '../src/pages/*/*.+(js|html)'));
  }
};

const getEntry = ext => {
  const entries = getEntries(ext);
  let entry = {};
  for (const chunk in entries) {
    entry[chunk] = entries[chunk].js;
  }
  return entry;
};

const getTpl = ext => {
  const entries = getEntries(ext);
  let tpl = {};
  for (const chunk in entries) {
    tpl[chunk] = entries[chunk].html;
  }
  return tpl;
};

// console.log(getEntry());
// console.log(getTpl());

module.exports = {
  getEntry,
  getTpl
};
