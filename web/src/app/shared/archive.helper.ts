export const groupArticleByBelongToLabel = (articles) => {
  const articleBelongToLabelMap = articles.reduce((group, archive) => {
    const belongToLabel = archive.belongToLabel || '未分类';
    if (belongToLabel in group) {
      const series = group[belongToLabel];
      series.articles.push(archive);
      series.createAt = series.createAt > archive.createAt ? archive.createAt : series.createAt;
    } else {
      group[belongToLabel] = {};
      group[belongToLabel].articles = [archive];
      group[belongToLabel].createAt = archive.createAt;
      group[belongToLabel].title = belongToLabel;
    }
    return group;
  }, {});
  const archives = [];
  for (const belongToLabel in articleBelongToLabelMap) {
    if (articleBelongToLabelMap.hasOwnProperty(belongToLabel)) {
      const series = articleBelongToLabelMap[belongToLabel];
      archives.push(series);
    }
  }
  return archives;
}
