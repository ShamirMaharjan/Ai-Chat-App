import * as ai from '../lib/ai.js';
export const getAI = async (req, res) => {
    try {
        const { prompt } = req.query;

        const result = await ai.generateResult(prompt);
        res.json({ result });
    } catch (error) {
        console.log("getAI error", error);
        res.status(500).json({ message: "Something went wrong" });

    }

}