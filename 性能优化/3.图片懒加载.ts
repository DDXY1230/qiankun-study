// 图片懒加载
export default function lazyLoadImg(targetEle: HTMLElement) {
  const elements = targetEle.querySelectorAll("img[data-src]");
  const observer = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (entry.isIntersecting) {
          const img = entry.target;
          img.src = img.dataset.src;
          observer.unobserve(img);
        }
      }
    },
    {
      // rootMargin: '10px',
      threshold: 0, //
    }
  );
  elements.forEach((dom) => {
    observer.observe(dom); //每个元素，添加聆听事件
  });
}
