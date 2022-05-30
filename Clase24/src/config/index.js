require('dotenv').config();

let config = {
  port: process.env.PORT || 3000,
  database: process.env.DATABASE,
  database_url: process.env.DATABASE_URL,
  path_to_msg_files: String(process.env.PATH_TO_MSG_FILES),
  path_to_products_files: String(process.env.PATH_TO_PRODUCTS_FILES),
};

module.exports = { config };
