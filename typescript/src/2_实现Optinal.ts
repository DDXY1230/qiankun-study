interface Article {
  title: string;
  content: string;
  author: string;
  date: Date;
  readCount: number;
}

type Optional<T,K extends keyof T> = Omit<T,K> & Partial<Pick<T,K>>;

// Omit 是ts提供给我们的工具方法: 会把传入的字段从类型中去掉  omit删除、去掉
// Pick 是ts提供给我们的工具方法: 会把传入的字段从类型中选出  与omit相反
// Partial 将子段变成可选


type CreateArticleOptions  = Optional<Article,'author'|'date'|'readCount'>
function createArticle(options: CreateArticleOptions){
// options.
}