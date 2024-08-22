import _ from 'lodash';

const findDifferences = (obj1, obj2) => {
  const keys = _.union(_.keys(obj1), _.keys(obj2));
  const differences = [];

  keys.sort().forEach((key) => {
    const value1 = obj1[key];
    const value2 = obj2[key];

    if (!_.has(obj1, key)) {
      differences.push(`+ ${key}: ${value2}`);
    } else if (!_.has(obj2, key)) {
      differences.push(`- ${key}: ${value1}`);
    } else if (!_.isEqual(value1, value2)) {
      differences.push(`- ${key}: ${value1}`);
      differences.push(`+ ${key}: ${value2}`);
    } else {
      differences.push(`  ${key}: ${value1}`);
    }
  });

  return `{
${differences.join('\n')}
}`;
};

export default findDifferences;


// import _ from 'lodash';

// const findDifferences = (tree1, tree2) => {
//   const keys = _.sortBy(_.union(Object.keys(tree1), Object.keys(tree2)));
//   const result = keys.map((key) => {
//     if (!Object.hasOwn(tree1, key)) {
//       return { key, value: tree2[key], status: 'added' };
//     }
//     if (!Object.hasOwn(tree2, key)) {
//       return { key, value: tree1[key], status: 'deleted' };
//     }
//     if (tree1[key] !== tree2[key]) {
//       if (_.isPlainObject(tree1[key]) && _.isPlainObject(tree2[key])) {
//         return {
//           key,
//           value: findDifferences(tree1[key], tree2[key]),
//           status: 'withChildren',
//         };
//       }
//       return {
//         key,
//         value: tree1[key],
//         changedValue: tree2[key],
//         status: 'changed',
//       };
//     }
//     return { key, value: tree1[key], status: 'unchanged' };
//   });
//   return result;
// };

// export default findDifferences;