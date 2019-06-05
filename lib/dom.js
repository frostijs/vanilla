const Div = (content, options) => {
  const el = document.createElement('div');

  if (options === undefined) options = {};

  if (options.className) {
    el.setAttribute('class', options.className);
  }

  if (typeof content === 'object') {
    if (content.length > 0) {
      content.map((child) => {
        el.appendChild(child);
      });
    } else {
      el.appendChild(content);
    }
  } else {
    el.innerHTML = content;
  }
  return el;
};

const Section = (content, options) => {
  const el = document.createElement('section');

  if (options === undefined) options = {};

  if (options.className) {
    el.setAttribute('class', options.className);
  }

  if (typeof content === 'object') {
    if (content.length > 0) {
      content.map((child) => {
        el.appendChild(child);
      });
    } else {
      el.appendChild(content);
    }
  } else {
    el.innerHTML = content;
  }
  return el;
};

export { Div, Section };
