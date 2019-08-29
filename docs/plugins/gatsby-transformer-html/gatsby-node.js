function camelCase(str) {
  return str
    .replace(/(?:^\w|[A-Z]|\b\w)/g, function(word, index) {
      return index == 0 ? word.toLowerCase() : word.toUpperCase();
    })
    .replace(/\s+/g, '');
}

function upperFirst(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

exports.onCreateNode = async ({
  node,
  actions,
  loadNodeContent,
  createNodeId,
  createContentDigest,
}) => {
  const { createNode, createParentChildLink } = actions;

  if (node.extension !== 'html') {
    return;
  }

  function transformObject(html, id, type) {
    const jsonNode = {
      html,
      id,
      absolutePath: node.absolutePath,
      source: node.sourceInstanceName,
      name: node.name,
      children: [],
      parent: node.id,
      internal: {
        contentDigest: createContentDigest(html),
        type,
      },
    };
    createNode(jsonNode);
    createParentChildLink({ parent: node, child: jsonNode });
  }

  const markup = await loadNodeContent(node);

  transformObject(
    markup,
    createNodeId(`${node.id} >>> HTML`),
    upperFirst(camelCase(`${node.internal.type} Html`))
  );
};
