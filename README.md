# Email Phishing Detection MCP Server

A Model Context Protocol (MCP) server that utilizes a machine learning model to detect phishing attempts in email text. This server exposes a tool that can be used by LLMs to analyze email content and determine if it is "Normal" or "Phishing".

## Features

- **Phishing Detection**: Uses a pre-trained ONNX model (`tfidf_logistic_regression.onnx`) to classify emails.
- **MCP Interface**: Exposes a standard MCP tool `PhishingDetection` for easy integration with AI assistants.
- **TypeScript**: Built with modern TypeScript for type safety and maintainability.
- **Docker Support**: Includes a Dockerfile for easy containerization and deployment.

## Prerequisites

- Node.js (v18 or higher recommended)
- npm

## Installation

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/Geoff-Robin/Email-Phishing-Detection-MCP.git
    cd Email-Phishing-Detection-MCP
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    ```

## Usage

### Running Locally (Development)

To run the server in development mode with hot-reloading:

```bash
npm run dev
```

The server will start on port `3000`.

### Building and Running (Production)

To build the TypeScript code and run the compiled JavaScript:

1.  **Build the project:**
    ```bash
    npm run build
    ```

    *Note: Currently, the build process compiles TypeScript but may not copy the model file. Ensure `dist/models` contains the `.onnx` model if running from `dist`.*

2.  **Start the server:**
    ```bash
    npm start
    ```

### Docker

You can also run the server using Docker:

1.  **Build the image:**
    ```bash
    docker build -t phishing-mcp-server .
    ```

2.  **Run the container:**
    ```bash
    docker run -p 3000:3000 phishing-mcp-server
    ```

## API Reference

### MCP Tools

The server exposes the following MCP tool:

#### `PhishingDetection`

Analyzes the provided email text and returns a classification.

-   **Input**:
    -   `emailText` (string): The content of the email to analyze.
-   **Output**:
    -   Returns a text content block with either `"Normal Email"` or `"Phishing Email"`.

## Project Structure

-   `src/`: Source code
    -   `index.ts`: Server entry point and HTTP setup.
    -   `mcp.ts`: MCP server definition and model inference logic.
    -   `models/`: Directory containing the ONNX model.
-   `PhishingDetection.ipynb`: Jupyter notebook containing the model training and evaluation process.

## Model Details

The phishing detection is powered by a Logistic Regression model trained on TF-IDF features. The model is exported to ONNX format for efficient inference in the Node.js environment. See `PhishingDetection.ipynb` for the training code.

## License

ISC
