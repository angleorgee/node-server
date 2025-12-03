import fs from "fs";
import path from "path";

const dataDir = path.resolve(__dirname, "../../data"); // 相对 src/utils/modules/file.ts

export function readJSON<T>(file: string): T {
  const filePath = path.join(dataDir, file);
  const text = fs.readFileSync(filePath, "utf-8");
  return JSON.parse(text) as T;
}

export function writeJSON<T>(file: string, data: T): void {
  const filePath = path.join(dataDir, file);
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2), "utf-8");
}
