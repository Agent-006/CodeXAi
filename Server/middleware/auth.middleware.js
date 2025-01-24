import jwt from "jsonwebtoken";

export const authUser = async (req, res, next) => {
    try {
        const token =
            req.cookies.token || req.headers.authorization.split(" ")[1];

        if (!token) {
            res.status(401).send({
                message: "Unauthorized user, token not found",
            });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    } catch (error) {
        res.status(401).send({ error: "Not authorized, token failed" });
    }
};
