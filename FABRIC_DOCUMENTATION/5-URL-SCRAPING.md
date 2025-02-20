# URL Scraping with Fabric

Fabric includes powerful URL scraping capabilities that allow you to convert web content into clean, formatted Markdown. This functionality is particularly useful for content analysis, documentation generation, and research purposes.

## Basic Usage

The basic syntax for scraping a URL using the CLI is:

```bash
fabric -u <url>
```

## Features

- Extracts and preserves page titles
- Converts HTML content to well-formatted Markdown
- Maintains hierarchical structure of content
- Handles various types of web content:
  - Marketing/landing pages
  - Documentation pages
  - News sites
  - Product pages
  - Feature listings

## Output Format

The tool outputs content in the following structure:

```markdown
Title: [Page Title]

URL Source: [Original URL]

Markdown Content:
[Formatted content in Markdown]
```

## Examples

### Scraping a Marketing/Product Page

```bash
fabric -u https://automatehub.net
```

This will extract:
- Headers and subheaders
- Bullet points
- Sections and subsections
- Call-to-action buttons
- Important formatting

### Scraping Documentation

```bash
fabric -u https://github.com/features
```

Perfect for:
- Technical documentation
- Feature lists
- Product specifications
- API documentation

### Scraping News Sites

```bash
fabric -u https://news.ycombinator.com
```

Cleanly formats:
- Article titles
- Metadata (points, comments, timestamps)
- Links
- Hierarchical structure

## Combining with Other Features

You can combine URL scraping with other Fabric patterns to perform advanced analysis:

```bash
# Analyze claims from a website
fabric -u https://hackernews.com -p analyze_claims

# Summarize a webpage
fabric -u https://hackernews.com -p summarize

# Extract wisdom from an article
fabric -u https://hackernews.com -p extract_wisdom
```

## Additional Options

When scraping URLs, you can use these additional flags:

- `--readability`: Convert HTML input into a clean, readable view
- `-o, --output=`: Output the scraped content to a file
- `-c, --copy`: Copy the output to clipboard

## Use Cases

- Content analysis and archiving
- Documentation generation
- Web content conversion
- Creating markdown versions of web pages
- Research and data collection
- Content migration
- SEO analysis
- Content comparison
- Documentation archival

## API Integration

The URL scraping functionality is exposed through two API endpoints:

### 1. Basic URL Scraping

```http
POST /api/scrape
Content-Type: application/json

{
    "url": "https://example.com",
    "readability": true  // optional
}
```

Response:
```json
{
    "url": "https://example.com",
    "content": "... markdown content ..."
}
```

### 2. URL Scraping with Pattern Processing

```http
POST /api/scrape/pattern
Content-Type: application/json

{
    "url": "https://example.com",
    "pattern": "pattern_name",
    "model": "gpt-4",  // optional, defaults to configured model
    "temperature": 0.7,  // optional
    "top_p": 0.9  // optional
}
```

Response:
```json
{
    "url": "https://example.com",
    "content": "... original markdown content ...",
    "pattern_output": "... processed content ..."
}
```

## Example Usage

### Using cURL

1. Basic scraping:
```bash
curl -X POST "http://localhost:8080/api/scrape" \
  -H "Content-Type: application/json" \
  -d '{"url": "https://example.com"}'
```

2. Scraping with pattern:
```bash
curl -X POST "http://localhost:8080/api/scrape/pattern" \
  -H "Content-Type: application/json" \
  -d '{
    "url": "https://example.com",
    "pattern": "extract_core_message",
    "model": "gpt-4"
  }'
```

### Using Python

```python
import requests

# Basic scraping
response = requests.post(
    "http://localhost:8080/api/scrape",
    json={"url": "https://example.com"}
)
content = response.json()["content"]

# Scraping with pattern
response = requests.post(
    "http://localhost:8080/api/scrape/pattern",
    json={
        "url": "https://example.com",
        "pattern": "extract_core_message",
        "model": "gpt-4",
        "temperature": 0.7
    }
)
pattern_output = response.json()["pattern_output"]
```

### Using JavaScript/Node.js

```javascript
// Basic scraping
const response = await fetch("http://localhost:8080/api/scrape", {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
  body: JSON.stringify({
    url: "https://example.com"
  })
});
const { content } = await response.json();

// Scraping with pattern
const response = await fetch("http://localhost:8080/api/scrape/pattern", {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
  body: JSON.stringify({
    url: "https://example.com",
    pattern: "extract_core_message",
    model: "gpt-4",
    temperature: 0.7
  })
});
const { pattern_output } = await response.json();
``` 