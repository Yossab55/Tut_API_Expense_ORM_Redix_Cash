import { env } from "../../utils/helpers.js";

const cookieOptions = {
  httpOnly: true,
  maxAge: env("EXPIRES_IN"),
};
const cookieOptionsRemove = {
  httpOnly: true,
  maxAge: 1,
};

function createCookie(res, content) {
  res.cookie("token", content, cookieOptions);
}

function deleteCookie(res) {
  res.cookie("token", null, cookieOptionsRemove);
}

export { createCookie, deleteCookie };
