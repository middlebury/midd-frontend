const path = require('path');
const Twig = require('twig');

exports.onCreateNode = async ({
  node,
  actions,
  loadNodeContent,
  createNodeId,
  createContentDigest,
}) => {
  const { createNode, createParentChildLink } = actions;

  if (node.extension !== 'twig') {
    return;
  }

  if (node.name !== 'image') {
    return;
  }

  console.log('**************************88making button');

  function transformObject(html, id, type) {
    const jsonNode = {
      html,
      id,
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

  const template = await loadNodeContent(node);

  // console.log(template);
  const base = path.resolve(__dirname, '../../../src/templates');

  console.log(base);

  try {
    const html = Twig.twig({
      data: template,
      allowInlineIncludes: true,
      base,
    }).render({});
    console.log(html);
  } catch (err) {
    console.error('problem parsing twig', err);
  }
};
