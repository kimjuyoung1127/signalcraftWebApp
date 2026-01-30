earn

Stitch via MCP
Connect IDEs and CLIs to Stitch using the Model Context Protocol.

The Stitch Model Context Protocol (MCP) server allows your favorite AI tools like Cursor, Antigravity, or the Gemini CLI to directly interact with your Stitch projects.

Understanding Remote MCP
Most MCP servers you use are Local. They read files on your hard drive or run scripts on your machine. Stitch is a Remote MCP server. It lives in the cloud.

Because it is remote, it requires a secure “handshake” to ensure that the AI agent acting on your behalf actually has permission to modify your designs.

API Keys vs OAuth
The Stitch MCP server supports two authentication methods:

API Keys: Persistent keys generated in the Stitch Settings page.
OAuth: A browser-based authentication flow required by specific AI clients that do not support manual key entry, or for environments where storing persistent secrets on disk is restricted.
When to use which
In most cases, API Keys are the easiest approach. They are the fastest way to get your tool connected. However, OAuth is worth the extra minute of setup in specific situations.

Scenario	Use API Keys if…	Use OAuth if…
Client Support	Your tool (e.g., Cursor, Antigravity, or the Gemini CLI) accepts an API key in a config file or environment variable.	Your tool (e.g., web-based tools) requires a “Sign In” flow and doesn’t provide a way to manually input a key.
Storage Policy	You are on a private machine where saving a secret key in a local .json or .env file is standard practice.	You are in a “Zero-Trust” or ephemeral environment where saving persistent secrets to the hard drive is blocked or risky.
Revocation	You are comfortable manually deleting a key from the Stitch Settings page and then finding/removing it from your local files.	You want the ability to “Log Out” and instantly invalidate the tool’s access via the Stitch Settings page without hunting for local files.
Session Logic	You want a connection that stays active indefinitely until you manually change it.	You prefer a session-based connection that can be set to expire or require a re-approval after a period of inactivity.
API Key Setup
Go to your Stitch Settings page.
Scroll to the API Keys section
Click on “Create API Key” to generate a new API key.
Copy the API key and save it in a secure location.

Storing API Keys
Never store your API key in a place where it can be exposed to the public. Never commit your API key to a public repository. Don’t include your API key in client-side code that can be viewed by others.

MCP Client Setup
Gemini CLI
Install the Stitch extension for the Gemini CLI.

Terminal window
gemini extensions install https://github.com/gemini-cli-extensions/stitch

Cursor
Create a .cursor/mcp.json file with the following entry:

{
  "mcpServers": {
    "stitch": {
      "url": "https://stitch.googleapis.com/mcp",
      "headers": {
        "X-Goog-Api-Key": "YOUR-API-KEY"
      }
    }
  }
}

Antigravity
In the Agent Panel, click the three dots in the top right and select MCP Servers. Click, Manage MCP Servers. Select “View raw config” and add the following entry:

{
  "mcpServers": {
    "stitch": {
      "serverUrl": "https://stitch.googleapis.com/mcp",
      "headers": {
        "X-Goog-Api-Key": "YOUR-API-KEY"
      }
    }
  }
}

VSCode
Open the Command Palette (Cmd+Shift+P) and type “MCP: Add Server”. Select “Add MCP Server”. Select HTTP to add a remote MCP server. Enter the Stich MCP UR, https://stitch.googleapis.com/mcp. Set the name to “stitch” and confirm.

Then modify the mcp.json file to add the API key:

{
  "servers": {
    "stitch": {
      "url": "https://stitch.googleapis.com/mcp",
      "type": "http",
      "headers": {
        "Accept": "application/json",
        "X-Goog-Api-Key": "YOUR-API-KEY"
      }
    }
  }
}

Claude Code
Use the claude mcp command to authenticate and add the following entry:

Terminal window
claude mcp add stitch --transport http https://stitch.googleapis.com/mcp --header "X-Goog-Api-Key: api-key" -s user

OAuth Setup
We need to generate two secrets to allow your MCP Client to talk to Stitch:

Project ID: The container for your work.
Access Token: The short lived key for to verify authentication for the project.
1. Install the Google Cloud SDK
Stitch relies on the gcloud CLI for secure authentication. If you don’t have it, you can install it globally through this quickstart, or you can install it as a standalone like the instructions below.

Standalone
Terminal window
# Download and install (simplified for standard environments)
curl https://sdk.cloud.google.com | bash
exec -l $SHELL

# Set local configuration to avoid prompts
export CLOUDSDK_CORE_DISABLE_PROMPTS=1

Homebrew
Terminal window
brew install --cask google-cloud-sdk

2. Double-Layer Authentication
You need to log in twice. Once as You (the user), and once as the Application (your local code/MCP client).

Terminal window
# 1. User Login (Opens Browser)
gcloud auth login

# 2. Application Default Credentials (ADC) Login
# This allows the MCP server to "impersonate" you securely.
gcloud auth application-default login

3. Configure the Project & Permissions
Select your working project and enable the Stitch API. You must also grant your user permission to consume services.

Terminal window
# Replace [YOUR_PROJECT_ID] with your actual Google Cloud Project ID
PROJECT_ID="[YOUR_PROJECT_ID]"

gcloud config set project "$PROJECT_ID"

# Enable the Stitch API
gcloud beta services mcp enable stitch.googleapis.com --project="$PROJECT_ID"

# Grant Service Usage Consumer role
USER_EMAIL=$(gcloud config get-value account)
gcloud projects add-iam-policy-binding "$PROJECT_ID" \
    --member="user:$USER_EMAIL" \
    --role="roles/serviceusage.serviceUsageConsumer" \
    --condition=None

4. Generate the Secrets (.env)
Finally, we generate the Access Token and save it to a .env file.

This overwrites any existing .env file

Terminal window
# Print the token
TOKEN=$(gcloud auth application-default print-access-token)

# Note: This overwrites any existing .env file
echo "GOOGLE_CLOUD_PROJECT=$PROJECT_ID" > .env
echo "STITCH_ACCESS_TOKEN=$TOKEN" >> .env

echo "Secrets generated in .env"

5. Keeping it Fresh
Note: Access Tokens are temporary (usually lasting 1 hour). When your MCP client stops responding or says “Unauthenticated,” you need to:

Re-run the commands in Step 4 to update your .env file
Copy the new STITCH_ACCESS_TOKEN value from .env into your MCP client config file
Most MCP clients don’t automatically read from .env files, so you’ll need to manually update the token in your config file each time it expires.

Setting up your MCP Client
Copy the values from your .env file into your MCP client configuration. Replace the placeholders below with the actual values from your .env file:

<YOUR_PROJECT_ID> → Value of GOOGLE_CLOUD_PROJECT from .env
<YOUR_ACCESS_TOKEN> → Value of STITCH_ACCESS_TOKEN from .env
[!IMPORTANT] You will need to manually update the Authorization header in your config file every hour when the access token expires. See Step 5 above for the refresh workflow.

Cursor
Create a .cursor/mcp.json file with the following entry:

{
  "mcpServers": {
    "stitch": {
      "url": "https://stitch.googleapis.com/mcp",
      "headers": {
        "Authorization": "Bearer <YOUR_ACCESS_TOKEN>",
        "X-Goog-User-Project": "<YOUR_PROJECT_ID>"
      }
    }
  }
}

Antigravity
In the Agent Panel, click the three dots in the top right and select MCP Servers. Click Manage MCP Servers. Select “View raw config” and add the following entry:

{
  "mcpServers": {
    "stitch": {
      "serverUrl": "https://stitch.googleapis.com/mcp",
      "headers": {
        "Authorization": "Bearer <YOUR_ACCESS_TOKEN>",
        "X-Goog-User-Project": "<YOUR_PROJECT_ID>"
      }
    }
  }
}

VSCode
Open the Command Palette (Cmd+Shift+P) and type “MCP: Add Server”. Select “Add MCP Server”. Select HTTP to add a remote MCP server. Enter the Stitch MCP URL, https://stitch.googleapis.com/mcp. Set the name to “stitch” and confirm.

Then modify the mcp.json file to add the headers:

{
  "servers": {
    "stitch": {
      "url": "https://stitch.googleapis.com/mcp",
      "type": "http",
      "headers": {
        "Accept": "application/json",
        "Authorization": "Bearer <YOUR_ACCESS_TOKEN>",
        "X-Goog-User-Project": "<YOUR_PROJECT_ID>"
      }
    }
  }
}

Claude Code
Use the claude mcp command to add the server:

Terminal window
claude mcp add stitch \
  --transport http https://stitch.googleapis.com/mcp \
  --header "Authorization: Bearer <YOUR_ACCESS_TOKEN>" \
  --header "X-Goog-User-Project: <YOUR_PROJECT_ID>" \
  -s user

# -s user: saves to $HOME/.claude.json
# -s project: saves to ./.mcp.json

Gemini CLI
Install the Stitch extension for the Gemini CLI:

Terminal window
gemini extensions install https://github.com/gemini-cli-extensions/stitch

Available Tools
Once authenticated, your AI assistant will have access to the following tools to manage your Stitch workflow.

Project Management
create_project: Creates a new container for your UI work.
name (string): The display name of the project.
list_projects: Retrieves a list of all your active designs.
filter (string): Filters by owned or shared projects.
Screen Management
list_screens: Fetches all screens within a specific project.
project_id (string): The ID of the project to inspect.
get_project: Retrieves specific details for a single project.
name (string): The unique name of the project.
get_screen: Retrieves specific details for a single screen.
project_id (string): The ID of the project to inspect.
screen_id (string): The ID of the screen to inspect.
Make new design
generate_screen_from_text: Creates a new design from text prompt.
project_id (string): The ID of the project to inspect.
prompt (string): The text prompt to generate a design from.
model_id (string): The model to use to generate the design, either GEMINI_3_PRO or GEMINI_3_FLASH.
Terms of Service
By using this product you agree to the terms and conditions of the following license: Google APIs Terms of Service.

Previous
Controls & Hotkeys
MCP

Getting Started
Get up and running and learn a few tips and tricks along the way.

The Stitch MCP takes the power of generating designs from within the Stitch editor and right into your IDE, CLI, or whatever AI tool of choice. You can convert your designs right into your codebase and generate new screens. This gives you programmable and automatable control with Stitch.

Before we begin
Authentication
Before anything else, you’ll need to authenticate with the Stitch MCP. This guide assumes you’ve already authenticated with the Stitch MCP. Check out our Setup and Authentication Guide to get started.

What coding agent to use?
You can use any coding agent of your choice. The Stitch MCP server integrates into coding agents with support for remote HTTP MCP servers.

What we’re building
A Stitch to React component system. Write a prompt and get a well structured set of React components from your Stitch design.

Prompting Stitch
Write a prompt asking to see your Stitch Projects and each screen within that project.

PROMPT

Action
Show me my Stitch projects.
Format
List out each screen under each project and its screen id.
You’ll see a response that looks something like below, although it will vary across tools and model choice.

Terminal window
1. Raffinato Coffee Store App
Created: Jan 14, 2026 • Desktop • Light Mode • Private

Screens (3):

- Home Menu
- Full Menu
- Checkout

Each Stitch Project can contain a series of screens. These screens are what contain the code and the images of your design.

Prompting for fun
The magic of MCP tools is the integration of contextual data retrieval with AI model intelligence. You can ask for understanding of your Stitch projects or instruct the agent to generate new designs and code based upon context on your local machine. Or, you can just ask it a fun question.

PROMPT

For fun
Tell me what my Stitch Projects say about me as a developer.
This one is a lot of fun. If you run it and want to share, give us a shout on Twitter / X. Alright, back to real work.

Prompting for code
Once the agent knows what project or screen you want to work with, you can access the code or the generated image.

PROMPT

Project + Screen
Download the HTML code for the Full Menu screen in the Raffinato project.
Tool Guidance
Use a utility such as curl -L
Action
Create a file named ./tmp/${screen-name}.html with the HTML code.
The HTML file is a complete <html> document with a Tailwind CSS configuration specific to that design.

HTML to other UI frameworks
LLMs excel at converting HTML to many different UI systems. This HTML file serves as a foundation. By prompting an agent not only can you convert HTML to React, Vue, or Handlebars but even UI frameworks outside of the web platform, such as Flutter and Jetpack Compose.

Prompting for images
Just like above, you can ask an agent for the image of your Stitch screen.

PROMPT

Project + Screen
Download the image for the Full Menu screen in the Raffinato project.
Tool Guidance
Use a utility such as curl -L
Action
Create a file named ./tmp/${screen-name}.png containing the image.
Now you’ll have a local copy of your image. However, not much has happened yet. So let’s move this quickly along and convert an entire screen to React components.

Using Agent Skills with Stitch MCP
Many coding agents support the Agent Skill Open Standard. A skill encapsulates an instruction based prompt with a set of resources such as specific tool calls from a MCP server. This skill paradigm is a great fit for generating a React component system from the Stitch MCP.

Creating the React component system
The add-skill library lets you install agent skills to the most commonly used coding agents right from a GitHub URL.

Terminal window
npx add-skill google-labs-code/stitch-skills --skill react:components --global

This skill provides the details to an agent to understand what Stitch tools to use, steps to run, and best practices for separating React components. If you want to check out exactly what it does, see our Stitch Agent Skills GitHub repo.

After it’s installed, you can write a prompt to trigger this skill and let it do the work.

PROMPT

Skill Trigger
Convert the Landing Page screen in the Podcast Project.
The agent will get to work and leave you with a React app running on a Vite local server.
MCP

Reference
Tools
create_project
Creates a new Stitch project. A project is a container for UI designs and frontend code.

Parameters:

{
  "type": "object",
  "properties": {
    "title": {
      "description": "Optional. The title of the project.",
      "type": "string"
    }
  },
  "description": "Request message for CreateProject."
}

generate_screen_from_text
Generates a new screen within a project from a text prompt.

Parameters:

{
  "type": "object",
  "properties": {
    "projectId": {
      "description": "Required. The project ID to generate the screen for.",
      "type": "string"
    },
    "prompt": {
      "description": "Required. The input text to generate the screen from.",
      "type": "string"
    },
    "deviceType": {
      "description": "Optional. The type of device to generate for. Defaults to MOBILE.",
      "enum": [
        "DEVICE_TYPE_UNSPECIFIED",
        "MOBILE",
        "DESKTOP",
        "TABLET",
        "AGNOSTIC"
      ],
      "type": "string"
    },
    "modelId": {
      "description": "Optional. The model to use for generation. Defaults to GEMINI_3_FLASH.",
      "enum": ["MODEL_ID_UNSPECIFIED", "GEMINI_3_PRO", "GEMINI_3_FLASH"],
      "type": "string"
    }
  },
  "required": ["projectId", "prompt"],
  "description": "Request message for GenerateScreenFromText."
}

get_project
Retrieves the details of a specific Stitch project using its project name.

Parameters:

{
  "type": "object",
  "properties": {
    "name": {
      "description": "Required. Identifier. The name of the project to retrieve. Format: projects/{project_id}",
      "type": "string"
    }
  },
  "required": ["name"],
  "description": "Request message for GetProject."
}

get_screen
Retrieves the details of a specific screen within a project.

Parameters:

{
  "type": "object",
  "properties": {
    "projectId": {
      "description": "Required. The project ID of screen to retrieve.",
      "type": "string"
    },
    "screenId": {
      "description": "Required. The name of screen to retrieve.",
      "type": "string"
    }
  },
  "required": ["projectId", "screenId"],
  "description": "Request message for GetScreen."
}

list_projects
Lists all Stitch projects accessible to the user.

Parameters:

{
  "type": "object",
  "properties": {
    "filter": {
      "description": "Optional. Filter for projects to list (e.g., 'view=owned' or 'view=shared'). Defaults to 'view=owned'.",
      "type": "string"
    }
  },
  "description": "Request message for ListProjects."
}

list_screens
Lists all screens within a given Stitch project.

Parameters:

{
  "type": "object",
  "properties": {
    "projectId": {
      "description": "Required. Identifier. The project ID to list screens for. Format: projects/{project_id}",
      "type": "string"
    }
  },
  "required": ["projectId"],
  "description": "Request message for ListScreens."
}