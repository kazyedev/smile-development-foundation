import fs from "fs";

// === CONFIG ===
const authorId = "b4fc4330-264a-40ff-8158-41cab68c4790";
const jsonFile = "./allCleanNews.json";
const outputFile = "./insert_news.sql";

// === LOAD JSON ===
const data = JSON.parse(fs.readFileSync(jsonFile, "utf8"));

// === HELPERS ===
const esc = (str) => (str ? str.replace(/'/g, "''") : "");
const toArraySQL = (arr) =>
  arr && arr.length > 0
    ? `ARRAY[${arr.map((u) => `'${esc(u)}'`).join(", ")}]`
    : "ARRAY[]::text[]";

// === BUILD QUERIES ===
const queries = data.map((item, i) => {
  const {
    titleAr,
    featuredImageUrl,
    otherImagesUrl = [],
    contentAr,
    slugAr,
    publishedAt,
  } = item;

  const slugEn = `auto-slug-${i + 1}`;
  const titleEn = `Auto-generated title ${i + 1}`;

  return `
INSERT INTO news (
  is_published,
  is_arabic,
  is_english,
  include_in_sitemap_en,
  include_in_sitemap_ar,
  title_ar,
  title_en,
  featured_image_url,
  other_images_url,
  content_ar,
  content_en,
  slug_ar,
  slug_en,
  author_id,
  read_time,
  page_views,
  keywords_ar,
  keywords_en,
  tags_ar,
  tags_en,
  published_at
) VALUES (
  TRUE,
  TRUE,
  FALSE,
  FALSE,
  TRUE,
  '${esc(titleAr)}',
  '${esc(titleEn)}',
  '${esc(featuredImageUrl)}',
  ${toArraySQL(otherImagesUrl)},
  '${esc(contentAr)}',
  '',
  '${esc(slugAr)}',
  '${slugEn}',
  '${authorId}',
  0,
  0,
  ARRAY[]::text[],
  ARRAY[]::text[],
  ARRAY[]::text[],
  ARRAY[]::text[],
  '${publishedAt}'
);
`.trim();
});

// === SAVE OUTPUT ===
fs.writeFileSync(outputFile, queries.join("\n\n") + "\n", "utf8");

console.log(`✅ Done! SQL saved to ${outputFile}`);
