import path from "path";
import fs from "fs";
import { mkdir, writeFile } from "fs/promises";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const mainDir = getMainDir(__dirname);
console.log(__dirname);
console.log(mainDir);
function getMainDir(dir) {
  if (fs.existsSync(path.join(dir, "package.json"))) {
    return dir;
  }
  const parent = path.resolve(dir, "..");
  if (parent == dir) return null; // we reached to the end and didn't find import
  return getMainDir(parent);
}
function joinPathsWithMainDir(...paths) {
  return path.join(mainDir, ...paths);
}
function joinPaths(...paths) {
  return path.join(...paths);
}
async function createDirectory(dirname) {
  if (!fs.existsSync(dirname)) await mkdir(dirname);
}

async function createFile(path) {
  if (!fs.existsSync(path)) await writeFile(path, "");
}

function createWriteStream(path) {
  return fs.createWriteStream(path, { flags: "a" });
}
export {
  joinPathsWithMainDir,
  createDirectory,
  createFile,
  createWriteStream,
  joinPaths,
};
