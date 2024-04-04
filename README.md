# HRW Homepage redesign

A component-based implementation of the Homepage component designs created by Blue State.

## Running the server

From the command line:
`npx http-server -c-1`

## Browsing components

Go to http://localhost:8080/components to browse available components.

## Creating a new component

The following script creates and registers a new Twig component, based on the starter component implementation in `components/.starter`:
```
cd components;
./create_component.sh [MACHINE_NAME];
```

## Working with Twig components

Twig components are automatically registered in `main.js`. To use them, you must wait until the component assets are loaded by listening for the `componentsLoaded` event:
```
document.addEventListener('componentsLoaded', () => { 
  // code goes here 
});
```

### Rendering and placement
To render a Twig template to an HTML string, use the `renderTwig()` function. To place the rendered HTML into the page, use the `appendToMain()` function:

```
var htmlString = renderTwig('hero');
appendToMain(htmlString); 
```

### Alternate variable sets
Each component directory contains a `COMPONENT.vars.js` file that defines sets of default variables to send to the Twig template. These files may also define alternate variants that override the defaults. You can specify a variant to use as a second parameter to `renderTwig()`:
```
appendToMain(renderTwig('hero', 'es'));
```

### Custom variable values

The second parameter to `renderTwig()` can take an object of variable names and values. This object will inherit from and override the 'default' values.

```js
appendToMain(renderTwig('hero', {is_breaking: true}));
```

### Overriding named Twig blocks

The third parameter to `renderTwig()` takes an object of named Twig blocks and the markup you want to replace them with:

```js
appendToMain(renderTwig('hero', 'default', {
  video_widget: renderTwig('modal_disclosure')
}));

```