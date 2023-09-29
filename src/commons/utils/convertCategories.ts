export const getCategoriesTrees = (categories: Category[]) => {
  const converted: CategoryTree[] = categories.map(item => ({ ...item, children: [] }));
  const trees: CategoryTree[] = [];
  converted.forEach(item => {
    if (!item.parent_category_id) return trees.push(item);
    item.parent = converted.find(category => category.id === item.parent_category_id);
    item.parent?.children.push(item);
  });
  return trees;
};
