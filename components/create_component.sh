#!/bin/bash
NAME=$1;
if [ -z "${NAME}" ]; then
  echo "Enter a machine name for this component:";
  read NAME
fi

if [ -d "${NAME}" ]; then
  echo "error: '${NAME}' directory already exists";
  exit;
fi

mkdir ${NAME};
sed "s/starter/${NAME}/g" .starter/starter.twig > ${NAME}/${NAME}.twig;
sed "s/starter/${NAME}/g" .starter/starter.css > ${NAME}/${NAME}.css;
sed "s/starter/${NAME}/g" .starter/starter.js > ${NAME}/${NAME}.js;
sed "s/starter/${NAME}/g" .starter/starter.vars.js > ${NAME}/${NAME}.vars.js;
sed "s/starter/${NAME}/g" .starter/index.html > ${NAME}/index.html;
echo "Created '${NAME}' directory and template files";
sed -i "/insertion point/a \ \ loadComponent('${NAME}')," ../js/main.js;
echo "Added \"loadComponent('${NAME}')\" to main.js";
echo "View your component at http://localhost:8080/components/${NAME}/"