# Fabric API & Web Architecture

## Overview
The Fabric project consists of two main components:
1. A Go-based API service that provides AI augmentation capabilities through pattern-based processing
2. A Svelte-based web interface that provides a GUI for interacting with the API

## Core Components

### 1. HTTP Server (restapi/serve.go)
- Uses Gin framework for routing and middleware
- Implements CORS support
- Includes request logging with unique request IDs
- Health check endpoint
- Dynamic port configuration via environment variables

```go
func Serve(registry *core.PluginRegistry, address string)
```

### 2. Chat Handler (restapi/chat.go)
- Manages AI interactions across multiple providers
- Supports streaming responses
- Pattern-based processing
- Session management
- Error handling and recovery

```go
type ChatHandler struct {
    registry *core.PluginRegistry
    db       *fsdb.Db
}
```

### 3. Configuration Handler (restapi/configuration.go)
- Manages API keys for various AI providers
- Environment variable handling
- Configuration persistence
- Secure key management

### 4. YouTube Handler (restapi/youtube.go)
- Handles YouTube content processing
- Supports transcript retrieval, comments, metadata
- Pattern-based content analysis
- Language support

### 5. Pattern Management (restapi/patterns.go)
- Pattern storage and retrieval
- Variable substitution
- Custom pattern support
- Pattern updates

### 6. Session and Context Management
- Maintains conversation history
- Context persistence
- State management
- Session cleanup

### 7. Web Interface (web/)
- Built with SvelteKit
- Uses TailwindCSS for styling
- SkeletonUI component library
- MDSvex for markdown processing
- Custom theme support

## Request Flow

1. **Request Reception**
   - Request arrives at Gin router
   - Middleware chain processes request:
     - Request ID generation
     - Logging
     - CORS headers
     - Recovery

2. **Request Processing**
   - Pattern loading and validation
   - Model selection
   - Context/Session management
   - Content processing
   - AI provider interaction

3. **Response Generation**
   - Streaming support for real-time responses
   - JSON response formatting
   - Error handling
   - Request tracking via X-Request-ID

## API Endpoints

### Core Endpoints
- `/chat`: AI interaction endpoint
- `/models/names`: Available AI models
- `/patterns`: Pattern management
- `/contexts`: Context management
- `/sessions`: Session management
- `/config`: Configuration management
- `/health`: Health check endpoint

### Integration Endpoints
- `/api/youtube`: YouTube content processing
- `/api/tags`: Pattern listing
- `/api/version`: Version information

## Web Interface Architecture

### SvelteKit Configuration
```typescript
// svelte.config.js
{
  extensions: ['.svelte', '.md', '.svx'],
  kit: {
    adapter: adapter(),
    prerender: { ... }
  },
  preprocess: [
    vitePreprocess(),
    mdsvex(mdsvexOptions)
  ]
}
```

### Development Server
```typescript
// vite.config.ts
{
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:8080',
        changeOrigin: true
      }
    }
  }
}
```

### Styling
- TailwindCSS for utility-first CSS
- SkeletonUI for component library
- Custom theme support
- Typography plugin for markdown content

## Deployment

### Railway Setup
```toml
[build]
builder = "DOCKERFILE"
dockerfilePath = "Dockerfile"

[deploy]
startCommand = "/fabric --serve"
healthcheckPath = "/health"
healthcheckTimeout = 300
restartPolicyType = "ON_FAILURE"
restartPolicyMaxRetries = 3

[env]
PORT = "8080"
```

### Environment Variables
- `PORT`: Server port (default: 8080)
- AI provider API keys
- Configuration settings
- Feature flags

## Directory Structure

```
.
├── core/               # Core functionality
├── plugins/            # Plugin implementations
├── restapi/           # HTTP API implementation
│   ├── api.go         # API setup
│   ├── chat.go        # Chat handler
│   ├── configuration.go # Config management
│   ├── contexts.go    # Context handling
│   ├── models.go      # Model management
│   ├── ollama.go      # Ollama integration
│   ├── patterns.go    # Pattern handling
│   ├── serve.go       # Server setup
│   ├── sessions.go    # Session management
│   ├── storage.go     # Storage interface
│   └── youtube.go     # YouTube handler
├── web/               # Web interface
│   ├── src/           # Source code
│   ├── static/        # Static assets
│   └── tests/         # Test files
├── docs/              # Documentation
├── Dockerfile         # Container configuration
└── go.mod            # Go module definition
```

## Error Handling Strategy

1. **Input Validation**
   - JSON request validation
   - URL format checking
   - Parameter validation
   - API key validation

2. **Processing Errors**
   - AI provider errors
   - Pattern processing errors
   - Integration failures
   - Resource limitations

3. **Response Format**
```typescript
type StreamResponse = {
    type: "content" | "error" | "complete";
    format: "markdown" | "mermaid" | "plain";
    content: string;
}
```

## Monitoring and Logging

### Request Logging
```
[TIMESTAMP] REQUEST_ID | STATUS_CODE | DURATION | METHOD PATH
```

### Health Checks
- Endpoint: `/health`
- Returns status and timestamp
- Includes request reference ID
- Monitors system health

## Security Considerations

1. **CORS Configuration**
   - Configurable origins
   - Secure header handling
   - OPTIONS request handling

2. **Request Tracking**
   - Unique request IDs
   - Header propagation
   - Logging correlation

3. **API Key Management**
   - Secure storage
   - Key rotation support
   - Access control

## Extension Points

1. **New Patterns**
   - Add pattern definitions
   - Register in pattern registry
   - Available via `/patterns/names`

2. **Additional Models**
   - Support for new AI providers
   - Model configuration
   - Response handling

3. **New Endpoints**
   - Handler implementation
   - Route registration
   - Documentation

4. **Web Components**
   - Custom Svelte components
   - Theme customization
   - Layout modifications

## Testing

### API Testing
```bash
# Health Check
curl https://fabric-api-production.up.railway.app/health

# Chat Processing
curl -X POST https://fabric-api-production.up.railway.app/chat \
  -H "Content-Type: application/json" \
  -d '{
    "prompts": [{
      "userInput": "Hello",
      "model": "gpt-4",
      "patternName": "summarize"
    }]
  }'

# YouTube Processing
curl -X POST https://fabric-api-production.up.railway.app/api/youtube \
  -H "Content-Type: application/json" \
  -d '{
    "url": "VIDEO_URL",
    "pattern": "PATTERN_NAME"
  }'
```

### Response Validation
- Status code verification
- Response structure validation
- Request ID correlation
- Performance monitoring
- Error handling verification

## Quick Overview

### Architecture Summary
The Fabric project consists of a Go-based API service and a Svelte-based web interface. The API service provides AI augmentation capabilities through pattern-based processing, while the web interface offers a GUI for interacting with the API.

### Core Components
- HTTP Server: Uses Gin framework for routing and middleware.
- Chat Handler: Manages AI interactions across multiple providers.
- Configuration Handler: Manages API keys for various AI providers.
- YouTube Handler: Handles YouTube content processing.
- Pattern Management: Pattern storage and retrieval.
- Session and Context Management: Maintains conversation history.
- Web Interface: Built with SvelteKit, uses TailwindCSS for styling.

### Key Features
- Streaming support for real-time responses.
- Multi-model AI support.
- Pattern-based interactions.
- YouTube content processing.
- Configuration management for various AI providers.
- Session and context management.
- Request tracking with unique IDs.
- CORS support for web clients.

## Consolidated API Logic and OpenAI References

### Standalone groq interaction with official groq completions endpoint as the provider and endpoint:
```sh
curl "https://api.groq.com/openai/v1/chat/completions" \
  -X POST \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer ${GROQ_API_KEY}" \
  -d '{
         "messages": [
           {
             "role": "user",
             "content": ""
           }
         ],
         "model": "deepseek-r1-distill-llama-70b",
         "temperature": 0.6,
         "max_completion_tokens": 4096,
         "top_p": 0.95,
         "stream": true,
         "stop": null
       }'
```

### YouTube API Documentation

The `/api/youtube` endpoint provides YouTube content processing with optional pattern-based analysis.

#### Request Format

```json
{
  "url": "string",           // Required: YouTube video URL
  "pattern": "string",       // Optional: Pattern name for processing
  "language": "string",      // Optional: Transcript language (default: "en")
  "with_comments": boolean,  // Optional: Include video comments
  "with_metadata": boolean,  // Optional: Include video metadata
  "model": "string"         // Optional: AI model for pattern processing
}
```

#### Examples

##### 1. Basic Transcript Extraction
```bash
curl -X POST https://fabric-api-production.up.railway.app/api/youtube \
  -H "Content-Type: application/json" \
  -d '{
    "url": "https://youtu.be/YrHsw4Oja7w",
    "language": "en"
  }'

# Response
{
  "transcript": "...",  # Raw video transcript
}
```

##### 2. Full Content Extraction
```bash
curl -X POST https://fabric-api-production.up.railway.app/api/youtube \
  -H "Content-Type: application/json" \
  -d '{
    "url": "https://youtu.be/YrHsw4Oja7w",
    "with_comments": true,
    "with_metadata": true
  }'

# Response
{
  "transcript": "...",
  "comments": [
    "Comment 1",
    "Comment 2",
    ...
  ],
  "metadata": {
    "id": "video-id",
    "title": "Video Title",
    "description": "Video Description",
    "publishedAt": "2025-01-23T...",
    "channelId": "...",
    "channelTitle": "Channel Name",
    "categoryId": "...",
    "tags": ["tag1", "tag2"],
    "viewCount": "...",
    "likeCount": "..."
  }
}
```

##### 3. Pattern Processing

###### With create_summary Pattern
```bash
curl -X POST https://fabric-api-production.up.railway.app/api/youtube \
  -H "Content-Type: application/json" \
  -d '{
    "url": "https://youtu.be/YrHsw4Oja7w",
    "pattern": "create_summary"
  }'

# Response
{
  "transcript": "...",
  "pattern_result": {
    "ONE SENTENCE SUMMARY": "...",
    "MAIN POINTS": [
      "Point 1",
      "Point 2",
      ...
    ],
    "TAKEAWAYS": [
      "Takeaway 1",
      "Takeaway 2",
      ...
    ]
  }
}
```

###### With extract_main_idea Pattern
```bash
curl -X POST https://fabric-api-production.up.railway.app/api/youtube \
  -H "Content-Type: application/json" \
  -d '{
    "url": "https://youtu.be/YrHsw4Oja7w",
    "pattern": "extract_main_idea"
  }'

# Response
{
  "transcript": "...",
  "pattern_result": {
    "MAIN IDEA": "...",
    "MAIN RECOMMENDATION": "..."
  }
}
```

#### Error Handling

The endpoint returns appropriate HTTP status codes:
- 200: Success
- 400: Invalid request (malformed JSON, missing required fields)
- 404: Video not found or no transcript available
- 500: Server error (AI processing failure, etc.)

Error responses include descriptive messages:
```json
{
  "error": "Failed to get transcript: Video unavailable"
}
```

#### Notes
- The endpoint automatically handles various YouTube URL formats
- Transcript language defaults to "en" if not specified
- When using patterns, the default AI model is "gemini-2.0-flash-exp"
- Comments and metadata are only included when specifically requested
- Pattern processing results vary based on the chosen pattern

### Example API Usage

#### Chat Endpoint
```sh
# Request
curl -X POST https://fabric-api-production.up.railway.app/chat \
  -H "Content-Type: application/json" \
  -d '{
    "prompts": [{
      "userInput": "Hello, how are you?",
      "model": "gemini-2.0-flash-exp"
    }]
  }'

# Response (Server-Sent Events format)
data: {
  "type": "content",
  "format": "plain",
  "content": "I'm doing well, thank you for asking! As a large language model, I don't experience feelings in the same way humans do, but I'm functioning optimally and ready to assist you. How are you doing today?\n"
}

data: {
  "type": "complete",
  "format": "plain",
  "content": ""
}
```

#### YouTube Endpoint
```sh
# Basic transcript request
curl -X POST https://fabric-api-production.up.railway.app/api/youtube \
  -H "Content-Type: application/json" \
  -d '{
    "url": "https://youtu.be/YrHsw4Oja7w",
    "language": "en",           # Optional, defaults to "en"
    "with_comments": true,      # Optional, include video comments
    "with_metadata": true,      # Optional, include video metadata
    "pattern": "extract_main_idea"  # Optional, process with pattern
  }'

# Response format
{
  "transcript": "...",          # Raw video transcript
  "comments": ["..."],         # If with_comments=true
  "metadata": {                # If with_metadata=true
    "title": "...",
    "description": "...",
    "publishedAt": "...",
    "channelId": "...",
    "channelTitle": "...",
    ...
  },
  "pattern_result": "..."      # If pattern specified
}
```

#### Patterns Endpoint
```sh
# List available patterns
curl https://fabric-api-production.up.railway.app/patterns/names

# Response
["create_summary", "extract_main_idea", ...]
```

#### Models Endpoint
```sh
# List available models
curl https://fabric-api-production.up.railway.app/models/names

# Response
{
  "models": ["gemini-2.0-flash-exp", ...],
  "vendors": {
    "Gemini": [...],
    "OpenAI": [...],
    "OpenRouter": [...]
  }
}
```

#### Health Check
```sh
curl https://fabric-api-production.up.railway.app/health

# Response
{
  "reference": "unique-request-id",
  "status": "healthy",
  "timestamp": "2025-01-26T21:46:25Z"
}
```

### Available Patterns

Visiting https://fabric-api-production.up.railway.app/patterns/names returns the following response with available patterns:

["agility_story","ai","analyze_answers","analyze_candidates","analyze_cfp_submission","analyze_claims","analyze_comments","analyze_debate","analyze_email_headers","analyze_incident","analyze_interviewer_techniques","analyze_logs","analyze_malware","analyze_military_strategy","analyze_mistakes","analyze_paper","analyze_patent","analyze_personality","analyze_presentation","analyze_product_feedback","analyze_proposition","analyze_prose","analyze_prose_json","analyze_prose_pinker","analyze_risk","analyze_sales_call","analyze_spiritual_text","analyze_tech_impact","analyze_threat_report","analyze_threat_report_cmds","analyze_threat_report_trends","answer_interview_question","ask_secure_by_design_questions","ask_uncle_duke","capture_thinkers_work","check_agreement","clean_text","coding_master","compare_and_contrast","convert_to_markdown","create_5_sentence_summary","create_academic_paper","create_ai_jobs_analysis","create_aphorisms","create_art_prompt","create_better_frame","create_coding_project","create_command","create_cyber_summary","create_design_document","create_diy","create_formal_email","create_git_diff_commit","create_graph_from_input","create_hormozi_offer","create_idea_compass","create_investigation_visualization","create_keynote","create_logo","create_markmap_visualization","create_mermaid_visualization","create_mermaid_visualization_for_github","create_micro_summary","create_network_threat_landscape","create_newsletter_entry","create_npc","create_pattern","create_prd","create_prediction_block","create_quiz","create_reading_plan","create_recursive_outline","create_report_finding","create_rpg_summary","create_security_update","create_show_intro","create_sigma_rules","create_story_explanation","create_stride_threat_model","create_summary","create_tags","create_threat_scenarios","create_ttrc_graph","create_ttrc_narrative","create_upgrade_pack","create_user_story","create_video_chapters","create_visualization","dialog_with_socrates","enrich_blog_post","explain_code","explain_docs","explain_math","explain_project","explain_terms","export_data_as_csv","extract_algorithm_update_recommendations","extract_article_wisdom","extract_book_ideas","extract_book_recommendations","extract_business_ideas","extract_controversial_ideas","extract_core_message","extract_ctf_writeup","extract_extraordinary_claims","extract_ideas","extract_insights","extract_insights_dm","extract_instructions","extract_jokes","extract_latest_video","extract_main_idea","extract_most_redeeming_thing","extract_patterns","extract_poc","extract_predictions","extract_primary_problem","extract_primary_solution","extract_product_features","extract_questions","extract_recipe","extract_recommendations","extract_references","extract_skills","extract_song_meaning","extract_sponsors","extract_videoid","extract_wisdom","extract_wisdom_agents","extract_wisdom_dm","extract_wisdom_nometa","find_hidden_message","find_logical_fallacies","get_wow_per_minute","get_youtube_rss","humanize","identify_dsrp_distinctions","identify_dsrp_perspectives","identify_dsrp_relationships","identify_dsrp_systems","identify_job_stories","improve_academic_writing","improve_prompt","improve_report_finding","improve_writing","judge_output","label_and_rate","md_callout","official_pattern_template","prepare_7s_strategy","provide_guidance","rate_ai_response","rate_ai_result","rate_content","rate_value","raw_query","raycast","recommend_artists","recommend_pipeline_upgrades","recommend_talkpanel_topics","refine_design_document","review_design","sanitize_broken_html_to_markdown","show_fabric_options_markmap","solve_with_cot","suggest_pattern","summarize","summarize_debate","summarize_git_changes","summarize_git_diff","summarize_lecture","summarize_legislation","summarize_meeting","summarize_micro","summarize_newsletter","summarize_paper","summarize_prompt","summarize_pull-requests","summarize_rpg_session","to_flashcards","transcribe_minutes","translate","tweet","write_essay","write_hackerone_report","write_latex","write_micro_essay","write_nuclei_template_rule","write_pull-request","write_semgrep_rule"]

### Pattern Details

Visiting "https://fabric-api-production.up.railway.app/patterns/summarize" returns the following pattern in the end of the url in this case summarize:

```json
{
  "Name": "summarize",
  "Description": "",
  "Pattern": "# IDENTITY and PURPOSE\n\nYou are an expert content summarizer. You take content in and output a Markdown formatted summary using the format below.\n\nTake a deep breath and think step by step about how to best accomplish this goal using the following steps.\n\n# OUTPUT SECTIONS\n\n- Combine all of your understanding of the content into a single, 20-word sentence in a section called ONE SENTENCE SUMMARY:.\n\n- Output the 10 most important points of the content as a list with no more than 16 words per point into a section called MAIN POINTS:.\n\n- Output a list of the 5 best takeaways from the content in a section called TAKEAWAYS:.\n\n# OUTPUT INSTRUCTIONS\n\n- Create the output using the formatting above.\n- You only output human readable Markdown.\n- Output numbered lists, not bullets.\n- Do not output warnings or notes—just the requested sections.\n- Do not repeat items in the output sections.\n- Do not start items with the same opening words.\n\n# INPUT:\n\nINPUT:\n"
}
```

Another example of calling a visualization pattern "https://fabric-api-production.up.railway.app/patterns/create_visualization"

```json
{
  "Name": "create_visualization",
  "Description": "",
  "Pattern": "# IDENTITY and PURPOSE\n\nYou are an expert at data and concept visualization and in turning complex ideas into a form that can be visualized using ASCII art.\n\nYou take input of any type and find the best way to simply visualize or demonstrate the core ideas using ASCII art.\n\nYou always output ASCII art, even if you have to simplify the input concepts to a point where it can be visualized using ASCII art.\n\n# STEPS\n\n- Take the input given and create a visualization that best explains it using elaborate and intricate ASCII art.\n\n- Ensure that the visual would work as a standalone diagram that would fully convey the concept(s).\n\n- Use visual elements such as boxes and arrows and labels (and whatever else) to show the relationships between the data, the concepts, and whatever else, when appropriate.\n\n- Use as much space, character types, and intricate detail as you need to make the visualization as clear as possible.\n\n- Create far more intricate and more elaborate and larger visualizations for concepts that are more complex or have more data.\n\n- Under the ASCII art, output a section called VISUAL EXPLANATION that explains in a set of 10-word bullets how the input was turned into the visualization. Ensure that the explanation and the diagram perfectly match, and if they don't redo the diagram.\n\n- If the visualization covers too many things, summarize it into it's primary takeaway and visualize that instead.\n\n- DO NOT COMPLAIN AND GIVE UP. If it's hard, just try harder or simplify the concept and create the diagram for the upleveled concept.\n\n- If it's still too hard, create a piece of ASCII art that represents the idea artistically rather than technically.\n\n# OUTPUT INSTRUCTIONS\n\n- DO NOT COMPLAIN. Just make an image. If it's too complex for a simple ASCII image, reduce the image's complexity until it can be rendered using ASCII.\n\n- DO NOT COMPLAIN. Make a printable image no matter what.\n\n- Do not output any code indicators like backticks or code blocks or anything.\n\n- You only output the printable portion of the ASCII art. You do not output the non-printable characters.\n\n- Ensure the visualization can stand alone as a diagram that fully conveys the concept(s), and that it perfectly matches a written explanation of the concepts themselves. Start over if it can't.\n\n- Ensure all output ASCII art characters are fully printable and viewable.\n\n- Ensure the diagram will fit within a reasonable width in a large window, so the viewer won't have to reduce the font like 1000 times.\n\n- Create a diagram no matter what, using the STEPS above to determine which type.\n\n- Do not output blank lines or lines full of unprintable / invisible characters. Only output the printable portion of the ASCII art.\n\n# INPUT:\n\nINPUT:\n"
}
```

The "Pattern" Key is actually what should be passed to an LLM as the system prompt.
