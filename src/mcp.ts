import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { z } from "zod";
import { InferenceSession, Tensor } from 'onnxruntime-node';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(__filename);
const getPrediction = async (emailText: string): Promise<string> => {
    const modelPath = path.join(__dirname,'models','tfidf_logistic_regression.onnx')
    const session = await InferenceSession.create(modelPath);

    const inputTensor = new Tensor('string', [emailText], [1]);

    const feeds = { text_input: inputTensor };
    const results = await session.run(feeds);

    const output = results[Object.keys(results)[0]].data;
    return output[0] === 1n ? "Phishing Email" : "Normal Email";
};

export const getServer = (): McpServer => {
    const server = new McpServer({
        name: "PhishingDetectionMcpServer",
        version: "1.0.0"
    });

    server.tool(
        "PhishingDetection",
        { emailText: z.string() },
        async ({ emailText }) => ({
            content: [{
                type: "text",
                text: await getPrediction(emailText)
            }]
        })
    )

    return server
}