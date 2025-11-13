// 打印正常 或 错误信息
const info = (...params) => {
    console.log(...params)
}

const error = (...params) => {
    console.log(...params)
}

module.exports = {
    info, error
}