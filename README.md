<div align="center">
  <img src="https://github.com/jae-jae/g-search-mcp/raw/main/icon.svg" width="120" height="120" alt="g-search-mcp Logo" />
</div>

# G-Search MCP

A powerful MCP server for Google search that enables parallel searching with multiple keywords simultaneously.

> This project is modified from [google-search](https://github.com/web-agent-master/google-search).

> 🌟 **Recommended**: [OllaMan](https://ollaman.com/) - Powerful Ollama AI Model Manager.

## Advantages

- **Parallel Searching**: Supports searching with multiple keywords on Google simultaneously, improving search efficiency
- **Browser Optimization**: Opens multiple tabs in a single browser instance for efficient parallel searching
- **Automatic Verification Handling**: Intelligently detects CAPTCHA and enables visible browser mode for user verification when needed
- **User Behavior Simulation**: Simulates real user browsing patterns to reduce the possibility of detection by search engines
- **Structured Data**: Returns structured search results in JSON format for easy processing and analysis
- **Configurable Parameters**: Supports various parameter configurations such as search result limits, timeout settings, locale settings, etc.
- **Custom Chromium Path**: Supports specifying custom Chromium executable path via environment variable

## Quick Start

Run directly with npx:

```bash
npx -y g-search-mcp
```

First time setup - install the required browser by running the following command in your terminal:

```bash
npx playwright install chromium
```

### Debug Mode

Use the `--debug` option to run in debug mode (showing browser window):

```bash
npx -y g-search-mcp --debug
```

### Custom Chromium Path

You can specify a custom Chromium executable path using the `CHROMIUM_EXECUTABLE_PATH` environment variable:

```bash
CHROMIUM_EXECUTABLE_PATH=/usr/bin/chromium npx -y g-search-mcp
```

This is useful when:
- You have Chromium installed in a non-standard location
- You want to use a specific version of Chromium
- You're running in a containerized environment with a custom Chromium installation

### Storage State Configuration

By default, browser state files are saved to `~/.local/mcp/share/` directory. You can customize this location using the `STORAGE_STATE_PATH` environment variable:

```bash
STORAGE_STATE_PATH=/custom/path npx -y g-search-mcp
```

The path supports `~` and `$HOME` expansion:

```bash
STORAGE_STATE_PATH=~/.local/mcp/share npx -y g-search-mcp
STORAGE_STATE_PATH=$HOME/.local/mcp/share npx -y g-search-mcp
```

The directory will be created automatically if it doesn't exist. This is useful for:
- Organizing state files in a specific location
- Sharing state files across different environments
- Managing storage in containerized deployments

## Configure MCP

Configure this MCP server in Claude Desktop:

MacOS: `~/Library/Application Support/Claude/claude_desktop_config.json`
Windows: `%APPDATA%/Claude/claude_desktop_config.json`

```json
{
  "mcpServers": {
    "g-search": {
      "command": "npx",
      "args": ["-y", "g-search-mcp"]
    }
  }
}
```

### With Custom Chromium Path

To use a custom Chromium path in MCP configuration:

```json
{
  "mcpServers": {
    "g-search": {
      "command": "npx",
      "args": ["-y", "g-search-mcp"],
      "env": {
        "CHROMIUM_EXECUTABLE_PATH": "/usr/bin/chromium"
      }
    }
  }
}
```

### With Custom Storage State Path

To use a custom storage state directory in MCP configuration:

```json
{
  "mcpServers": {
    "g-search": {
      "command": "npx",
      "args": ["-y", "g-search-mcp"],
      "env": {
        "STORAGE_STATE_PATH": "~/.local/mcp/share"
      }
    }
  }
}
```

### With Both Custom Chromium Path and Storage State Path

```json
{
  "mcpServers": {
    "g-search": {
      "command": "npx",
      "args": ["-y", "g-search-mcp"],
      "env": {
        "CHROMIUM_EXECUTABLE_PATH": "/usr/bin/chromium",
        "STORAGE_STATE_PATH": "~/.local/mcp/share"
      }
    }
  }
}
```

## Features

- `search` - Execute Google searches with multiple keywords and return results
  - Uses Playwright browser to perform searches
  - Supports the following parameters:
    - `queries`: Array of search queries to execute (required parameter)
    - `limit`: Maximum number of results to return per query, default is 10
    - `timeout`: Page loading timeout in milliseconds, default is 60000 (60 seconds)
    - `noSaveState`: Whether to avoid saving browser state, default is false
    - `locale`: Locale setting for search results, default is en-US
    - `debug`: Whether to enable debug mode (showing browser window), overrides the --debug flag in command line

**Example usage**:

```
Use the search tool to search for "machine learning" and "artificial intelligence" on Google
```

**Example response**:

```json
{
  "searches": [
    {
      "query": "machine learning",
      "results": [
        {
          "title": "What is Machine Learning? | IBM",
          "link": "https://www.ibm.com/topics/machine-learning",
          "snippet": "Machine learning is a branch of artificial intelligence (AI) and computer science which focuses on the use of data and algorithms to imitate the way that humans learn, gradually improving its accuracy."
        },
        ...
      ]
    },
    {
      "query": "artificial intelligence",
      "results": [
        {
          "title": "What is Artificial Intelligence (AI)? | IBM",
          "link": "https://www.ibm.com/topics/artificial-intelligence",
          "snippet": "Artificial intelligence leverages computers and machines to mimic the problem-solving and decision-making capabilities of the human mind."
        },
        ...
      ]
    }
  ]
}
```

## Usage Tips

### Handling Special Website Scenarios

#### Adjusting Search Parameters

- **Search Result Quantity**: For more search results:

  ```
  Please return the top 20 search results for each keyword
  ```

  This will set the `limit: 20` parameter.

- **Increase Timeout Duration**: For slow loading situations:
  ```
  Please set the page loading timeout to 120 seconds
  ```
  This will adjust the `timeout` parameter to 120000 milliseconds.

#### Locale Settings Adjustment

- **Change Search Region**: Specify a different locale setting:
  ```
  Please use Chinese locale (zh-CN) for searching
  ```
  This will set the `locale: "zh-CN"` parameter.

### Debugging and Troubleshooting

#### Enable Debug Mode

- **Dynamic Debug Activation**: To display the browser window during a specific search operation:
  ```
  Please enable debug mode for this search operation
  ```
  This sets `debug: true` even if the server was started without the `--debug` flag.

## Installation

### Prerequisites

- Node.js 18 or higher
- NPM or Yarn

### Install from Source

1. Clone the repository:

```bash
git clone https://github.com/jae-jae/g-search-mcp.git
cd g-search-mcp
```

2. Install dependencies:

```bash
npm install
```

3. Install Playwright browser:

```bash
npm run install-browser
```

4. Build the server:

```bash
npm run build
```

## Development

### Auto Rebuild (Development Mode)

```bash
npm run watch
```

### Using MCP Inspector for Debugging

```bash
npm run inspector
```

## Related Projects

- [fetcher-mcp](https://github.com/jae-jae/fetcher-mcp): A powerful MCP server for fetching web page content using Playwright headless browser. Features intelligent content extraction, parallel processing, resource optimization, and more, making it an ideal tool for web content scraping.

## License

Licensed under the [MIT License](https://choosealicense.com/licenses/mit/)
