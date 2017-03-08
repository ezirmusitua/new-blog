import { CatalogItem } from '../models/article';

const CatalogCategory = {
  H1: 100,
  H2: 200,
  H3: 300,
  H4: 500,
  H5: 600,
}

const specialChar = {
  H: '#',
  I: '!',
  L: '['
}

export const calcLineEndSkip = (markdownContent: string, currentIndex: number): number => {
  const curChar = markdownContent[currentIndex];
  if (!curChar) return 999999;
  if (curChar === ' ' && markdownContent.charAt(currentIndex + 1) === ' ') {
    return 2;
  }
  if (curChar === '\n' && markdownContent.charAt(currentIndex + 1) === '\n') {
    return 2;
  }
  return 1;
}

export const createCategoryItem = (markdownContent: string, currentIndex: number): [CatalogItem, number] => {
  const catalogItem = {} as CatalogItem;
  let hashTagCount = 1;
  let index = currentIndex + 1;
  while (markdownContent.charAt(index) !== ' ') {
    if (markdownContent.charAt(index) === specialChar.H) {
      hashTagCount += 1;
    }
    index += 1;
  }
  index += 1;
  if (hashTagCount === 1) {
    catalogItem.category = CatalogCategory.H1;
  }
  if (hashTagCount === 2) {
    catalogItem.category = CatalogCategory.H2;
  }
  if (hashTagCount === 3) {
    catalogItem.category = CatalogCategory.H3;
  }
  if (hashTagCount === 4) {
    catalogItem.category = CatalogCategory.H4;
  }
  if (hashTagCount === 5) {
    catalogItem.category = CatalogCategory.H5;
  }
  let content = markdownContent.charAt(index);
  let skipCount = calcLineEndSkip(markdownContent, index);
  while (skipCount === 1 && index < markdownContent.length) {
    index += 1;
    content += markdownContent.charAt(index);
    skipCount = calcLineEndSkip(markdownContent, index);
  }
  index += skipCount;
  catalogItem.content = content.replace(/<.*?>.*<\/.*?> /, '');
  return [catalogItem, index];
}

export const crossImageAndLink = (markdownContent: string, currentIndex: number): number => {
  while (markdownContent.charAt(currentIndex + 1) !== ')' && currentIndex < markdownContent.length) {
    currentIndex += 1;
  }
  return currentIndex + 1;
}

export const generateCatalog = (markdownContent: string): CatalogItem[] => {
  const catalog = [];
  let effectiveLength = 0;
  const totalCharLength = markdownContent.length;
  let index = 0;
  while (index < totalCharLength) {
    if (markdownContent.charAt(index) === specialChar.H) {
      const [catalogItem, i] = createCategoryItem(markdownContent, index);
      index = i;
      catalog.push(Object.assign({ progress: effectiveLength }, catalogItem));
    } else if (markdownContent.charAt(index) === specialChar.I) {
      index = crossImageAndLink(markdownContent, index);
      effectiveLength += 100;
    } else if (markdownContent.charAt(index) === specialChar.L) {
      index = crossImageAndLink(markdownContent, index);
      effectiveLength += 50;
    } else {
      effectiveLength += 1;
      index += 1;
    };
  }
  return catalog.map(catalogItem => Object.assign({}, catalogItem, {
    progress: catalogItem.progress / effectiveLength,
  }));
}
