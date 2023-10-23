import type { NextApiResponse } from "next";
import jwt from "jsonwebtoken";
import { ExtendedNextApiRequestAuth, DecodedType, ResMessageType } from "./types";

const secret_key = "nextmarket";

const auth = (handler: Function) => {
  return async (req: ExtendedNextApiRequestAuth, res: NextApiResponse<ResMessageType>) => {
    if (req.method === "GET") {
      return handler(req, res);
    }

    const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImhlbGxvQG1vbm90ZWluLmNvbSIsImlhdCI6MTY5ODA0NzcyOSwiZXhwIjoxNjk4MTMwNTI5fQ.G5UU6Q_LjtAWh1JQ_OammISHxglQ6iLvZ4hZKgectTg";

    // const token = await req.headers.authorization.split(" ")[1];

    if (!token) {
      return res.status(401).json({ message: "トークンがありません" });
    }

    try {
      const decoded = jwt.verify(token, secret_key);
      req.body.email = (decoded as DecodedType).email;
      return handler(req, res);
    } catch (err) {
      return res.status(401).json({ message: "トークンが正しくないので、ログインしてください" });
    }
  };
};

export default auth;
