// 配置环境变量

// 用于引用环境变量
require('dotenv').config()

const PORT  = process.env.PORT
const MONGODB_URL = process.env.MONGODB_URL

module.exports = {
    MONGODB_URL,
    PORT
}