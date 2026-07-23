# MySQL Database Setup — A to Z

## 1. Ye files apne project mein copy/replace karein
```
netlify/functions/_db.js          (naya)
netlify/functions/content.js      (replace)
netlify/functions/upload-image.js (replace)
netlify/functions/image.js        (naya)
src/admin/Fields.jsx              (replace)
netlify.toml                      (replace)
package.json                      (replace — mysql2 add hua)
schema.sql                        (naya, reference ke liye)
```

## 2. MySQL database mein table banayein
`schema.sql` file ka content apne MySQL database mein run karein
(phpMyAdmin ke "SQL" tab se, ya `mysql -u user -p database < schema.sql`).

Isse 2 tables banengi:
- `site_content` — website ka poora JSON content (chota, images ke bina)
- `images`       — actual image files binary (LONGBLOB) ke tor par

## 3. Netlify pe Environment Variables set karein
Netlify Dashboard → aapki site → **Site configuration → Environment variables**
→ Add a variable, ye sab add karein:

| Variable      | Value                              |
|---------------|-------------------------------------|
| DB_HOST       | aapke MySQL provider ka host        |
| DB_PORT       | (agar 3306 nahi hai to specify karein) |
| DB_USER       | MySQL username                      |
| DB_PASSWORD   | MySQL password                      |
| DB_NAME       | database ka naam                    |
| DB_SSL        | `true` (agar provider SSL mangta ho) |

⚠️ **Zaroori:** MySQL server ko remote/external connections allow karni
chahiye (sirf `localhost` tak limited nahi honi chahiye), warna
Netlify Function connect nahi kar paayega. Zyada tar shared hosting
providers (Hostinger, cPanel wagera) mein "Remote MySQL" section se
apni Netlify ka IP ya `%` allow karna padta hai.

## 4. Deploy karein
```
git add .
git commit -m "feat: switch content storage to MySQL database"
git push
```
Push karte hi Netlify khud build/deploy kar dega — `mysql2` package
`npm install` ke through apne aap install ho jayega.

## 5. Test karein
- `https://<your-site>.netlify.app/api/content` khol kar dekhein — `{}` ya
  aapka saved JSON dikhna chahiye (error nahi).
- Admin panel se koi image upload karein — Network tab mein
  `/api/upload-image` call honi chahiye, response mein `{ url: "/api/image/1" }`
  jaisa kuch milega.
- Wahi image `/api/image/1` URL se load honi chahiye.
- Content save karke refresh karein / doosre browser mein kholein —
  change permanent rehna chahiye.

## Kaise kaam karta hai (short summary)
- `content.json` file ab GitHub ki bajaye **MySQL** ke `site_content`
  table mein store hota hai.
- Image upload karne par file **base64 mein content.json ke andar nahi**
  jaati — balke `images` table mein binary ke tor par save hoti hai,
  aur content mein sirf ek chhota URL (`/api/image/<id>`) reference
  ke tor par save hota hai.
- `image.js` function us ID ke through DB se image nikal kar
  seedha browser ko serve kar deta hai (jaise koi normal image file).
