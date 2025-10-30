function extractCleanPostData() {
  // 1️⃣ Get and clean title
  const headTitle = document.querySelector('head title')?.textContent?.trim() || '';
  const bodyTitle = document.querySelector('.entry-title, h1.entry-title')?.textContent?.trim() || '';
  let titleAr = bodyTitle || headTitle;
  titleAr = titleAr.replace(/\s*[-–|]\s*مؤسسة\s*ابتسامة\s*التنموية\s*$/i, '').trim();

  // 2️⃣ Generate slug
  const slugAr = titleAr
    .replace(/[^\u0600-\u06FFa-zA-Z0-9\s]/g, '')
    .trim()
    .replace(/\s+/g, '-')
    .toLowerCase();

  // 3️⃣ Featured image
  const featuredImageUrl = document.querySelector('.post-thumbnail img')?.src || '';

  // 4️⃣ Published date
  const publishedAt = document.querySelector('time.entry-date')?.getAttribute('datetime') || null;

  // 5️⃣ Other images
  const otherImagesUrl = Array.from(document.querySelectorAll('.entry-content img'))
    .map(img => img.src)
    .filter(src => src && src !== featuredImageUrl);

  // 6️⃣ Clone content to safely modify
  const contentClone = document.querySelector('.entry-content')?.cloneNode(true);

  if (contentClone) {
    // Remove images, galleries, and blocks
    contentClone.querySelectorAll('img, figure, .wp-block-gallery, .wp-block-image').forEach(el => el.remove());

    // Replace links <a> with their inner text
    contentClone.querySelectorAll('a').forEach(a => {
      const span = document.createTextNode(a.textContent);
      a.replaceWith(span);
    });

    // Remove all attributes (class, style, etc.)
    contentClone.querySelectorAll('*').forEach(el => {
      for (const attr of Array.from(el.attributes)) {
        el.removeAttribute(attr.name);
      }
    });

    // Keep only <p> tags (remove everything else)
    contentClone.querySelectorAll(':not(p)').forEach(el => {
      if (el.parentNode && el.tagName !== 'P') el.replaceWith(...el.childNodes);
    });
  }

  // Final clean content HTML
  const contentAr = contentClone?.innerHTML?.trim() || '';

  return {
    titleAr,
    featuredImageUrl,
    otherImagesUrl,
    contentAr,
    slugAr,
    publishedAt
  };
}

const postData = extractCleanPostData();
console.log(postData);
