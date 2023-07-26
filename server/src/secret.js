require("dotenv").config();
const serverPort = process.env.SERVER_PORT || 3002;
const mongodbURL =
  process.env.MONGODB_ATLAS_URL || "mongodb://localhost:27017/ecommerceMernDB";
const defaultImagePath =
  process.env.DEFAULT_USER_IMAGE_PATH || "public/images/users/default.png";
const jwtActivationKey =
  process.env.JWT_ACTIVATION_KEY || "GFKJFDJSFKJFKSDJFKJ_FDFDKJ121";
const jwtAccessKey =
  process.env.JWT_ACCESS_KEY || "GFKJFDJSFKJFKSDJFKJ_FDFDKJ121";
const smtpUsername = process.env.SMTP_USERNAME || "";
const smtpPassword = process.env.SMTP_PASSWORD || "";
const client_url = process.env.CLIENT_URL || "";
const upload_dir = process.env.UPLOAD_FILE || "public/images/users";

module.exports = {
  serverPort,
  mongodbURL,
  defaultImagePath,
  jwtActivationKey,
  jwtAccessKey,
  smtpUsername,
  smtpPassword,
  client_url,
  upload_dir
};
