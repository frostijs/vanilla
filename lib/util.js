// CLEAN TEXT OF ANY WHITESPACE TO MAKE COMPARISON EASIER
const clean = (text) => {
  let cleaned = text;
  cleaned = text.replace(/\s+/g, ' ').trim();
  cleaned = cleaned.split('className').join('class');
  return cleaned;
};

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

// COMPARE TWO STRINGD AND SEE IF THEY MATCH
const compare = (a, b) => clean(a) === clean(b);

const Frosti = {
  // Hydrate server content and let client take over
  hydrate(content, el) {
    const target = el;
    const serverContent = target.innerHTML;

    // IF CLIENT & SERVER DON'T MATCH, UPDATE, BUT WARN
    if (!compare(content, serverContent)) {
      target.innerHTML = clean(content);
      console.warn('Client content does not match content rendered on server');
    } else {
      console.log('Rendered with server content, no client updates yet.');
    }
  },

  // Render content immediantely with no regard for server content
  render(content, el) {
    const target = el;
    target.innerHTML = '';
    if (typeof content === 'object') {
      target.appendChild(content);
    } else {
      target.innerHTML = content;
    }
  }
};

export default Frosti;
export {
  clean, compare, Div, Section
};
