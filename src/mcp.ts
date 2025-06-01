import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { z } from "zod";
import { InferenceSession, Tensor } from 'onnxruntime-node'


const getPrediction = async (emailText: string): Promise<string> => {
    const session = await InferenceSession.create('tfidf_logistic_regression.onnx');

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