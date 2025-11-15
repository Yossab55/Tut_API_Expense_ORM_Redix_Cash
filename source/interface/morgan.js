import {
  createDirectory,
  createFile,
  createWriteStream,
  joinPaths,
  joinPathsWithMainDir,
} from "../../utils/fileHandel.js";
import morgan from "morgan";

async function createLoggingFolderAndFile() {
  const dirname = "logging";
  const filename = "logging.log";
  const path = joinPathsWithMainDir(dirname);
  await createDirectory(path);
  await createFile(joinPaths(path, filename));
  return createWriteStream(joinPaths(path, filename));
}
const stream = await createLoggingFolderAndFile();

const morganOptions = { stream };
morgan.format("custom", function morganToken(tokens, req, res) {
  return [
    tokens.status(req, res),
    tokens.method(req, res),
    tokens.url(req, res),
    tokens.date(req, res, "web"),
    tokens.res(req, res, "content-length"),
    "-",
    tokens["response-time"](req, res),
    "ms",
  ].join(" ");
});

export { morganOptions };
