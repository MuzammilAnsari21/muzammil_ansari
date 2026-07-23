-- schema.sql
-- Apne MySQL database mein ye file ek dafa run karein (phpMyAdmin / mysql CLI se)

CREATE TABLE IF NOT EXISTS site_content (
  id INT PRIMARY KEY,
  data JSON NOT NULL
);

CREATE TABLE IF NOT EXISTS images (
  id INT AUTO_INCREMENT PRIMARY KEY,
  filename VARCHAR(255) NOT NULL,
  mimetype VARCHAR(100) NOT NULL,
  data LONGBLOB NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Starting empty row (agar na ho to content.js khud pehli GET par {} bhej dega,
-- lekin isko dala hua acha hai taake POST turant UPDATE kare, INSERT na kare)
INSERT INTO site_content (id, data)
VALUES (1, '{}')
ON DUPLICATE KEY UPDATE id = id;
