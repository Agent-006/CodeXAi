import { XaiServiceGenerateResult } from "../services/xai.service.js";

export const getXaiResultController = async (req, res) => {
    try {
        const { prompt } = req.query;
        const result = await XaiServiceGenerateResult(prompt);
        res.status(200).send(
            result
        );
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: error.message,
        });
    }
};
