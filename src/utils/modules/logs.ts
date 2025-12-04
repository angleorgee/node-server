import * as fs from "fs";
import * as path from "path";


// 日志目录
const logDir = path.resolve("logs");
if (!fs.existsSync(logDir)) {
  fs.mkdirSync(logDir);
}

// 获取日期(每天一个文件)
const getDate = () => {
  const d = new Date();
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(
    d.getDate()
  ).padStart(2, "0")}`;
};

// 创建写入流
const getLogStream = (type: string) => {
  const filePath = path.join(logDir, `${getDate()}-${type}.log`);
  return fs.createWriteStream(filePath, { flags: "a" });
};

const logStream = getLogStream("app");
const errorStream = getLogStream("error");

// 保存原始方法
const originalLog = console.log;
const originalError = console.error;

// 重写 console.log
console.log = (...args) => {
  originalLog(...args);

  const msg = args.map(a => (typeof a === "string" ? a : JSON.stringify(a))).join(" ");
  logStream.write(`[${new Date().toISOString()}] ${msg}\n`);
};

// 重写 console.error
console.error = (...args) => {
  originalError(...args);

  const msg = args.map(a => (typeof a === "string" ? a : JSON.stringify(a))).join(" ");
  errorStream.write(`[${new Date().toISOString()}] ${msg}\n`);
};

export default {};
