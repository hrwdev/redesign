/**
 * Loads a component by registering the Twig template,
 * loading the component CSS and JS files, and loading
 * the component variables.
 *
 * @param {string} name - The name of the component.
 *
 * @returns {Promise<Awaited<unknown>[]>} - A Promise
 * that resolves when all the component assets have loaded.
 */
function loadComponent(name) {

  const registerTemplate = (name) => {
    // Register the twig template.
    Twig.twig({
      id: name,
      namespaces: {components: `${subdir}/components`},
      href: `${subdir}/components/${name}/${name}.twig`,
      async: false
    });
  };

  const loadCss = (name) => {
    return new Promise(resolve => {
      let asset = document.createElement('link');
      asset.setAttribute('rel', 'stylesheet');
      asset.setAttribute('href', `${subdir}/components/${name}/${name}.css`);
      asset.onload = resolve;
      asset.onerror = resolve;
      document.head.appendChild(asset);

    });
  };

  const loadJs = (name) => {
    return new Promise(resolve => {
      let asset = document.createElement('script')
      asset.setAttribute('src', `${subdir}/components/${name}/${name}.js`);
      asset.onload = resolve;
      asset.onerror = resolve;
      document.head.appendChild(asset);
    });
  }

  const loadVars = (name) => {
    return new Promise(resolve => {
      let asset = document.createElement('script')
      asset.setAttribute('src', `${subdir}/components/${name}/${name}.vars.js`);
      asset.onload = resolve;
      asset.onerror = resolve;
      document.head.appendChild(asset);
    });
  }

  // Register the twig template and load the component CSS and JS files.
  registerTemplate(name);
  return Promise.all([
    loadCss(name),
    loadJs(name),
    loadVars(name),
  ]);
}

/**
 * Render a twig component.
 *
 * @param {string} name
 *   The machine name of the component.
 * @param {string|object} variant
 *   Either an object containing the variables to pass to the template, or a
 *   string key to use in the vars object for this component. Defaults to
 *   'default'.
 * @param {object} blocks
 *   An object of strings to fill in named Twig blocks in the component.
 *
 * @return string
 *   An HTML string.
 */
function renderTwig(name, variant = 'default', blocks = {}) {
  let templateVars = JSON.parse(JSON.stringify(vars[name]['default']));
  if (typeof variant === 'object') {
    Object.assign(templateVars, variant);
  }
  else if (variant !== 'default' && vars[name].hasOwnProperty(variant)) {
    Object.assign(templateVars, vars[name][variant]);
  }

  // Include the whole 'vars' object as a local variable.
  templateVars.vars = vars;
  templateVars.subdir = subdir;

  // Pass any twig blocks through to the template.
  let params = (blocks !== {})
    ? {blocks: blocks}
    : {};

  // Render the template.
  return Twig.twig({ref: name}).render(templateVars, params);
}

/**
 * Insert an HTML string at the end of the 'main' element.
 *
 * @param {string} html
 */
function appendToMain(html) {
  document.querySelector('main').insertAdjacentHTML('beforeend', html);
}

/**
 * Create a random alphanumeric string of 9 characters.
 *
 * @returns {string}
 */
function getRandomStringId() {
  return Math.random().toString(36).substr(2, 9);
}