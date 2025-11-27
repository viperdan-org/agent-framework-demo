---
layout: default
title: Microsoft Agent Framework – Key Fundamentals & Agenda
---

# Microsoft Agent Framework – Key Fundamentals & Agenda

## Overview & Context

The **Microsoft Agent Framework** is a new open-source SDK and runtime (now in Public Preview) for building and orchestrating AI agents. It is a **comprehensive multi-language framework** (supporting both .NET and Python) designed specifically for building, orchestrating, and deploying AI agents with advanced features like **graph-based workflows, streaming, checkpointing, and human-in-the-loop** capabilities.

> **Important Clarification:** Microsoft Agent Framework is a **separate project** from Semantic Kernel and AutoGen. While all three frameworks enable AI agent development, they serve different purposes and continue to be maintained independently:
> - **Semantic Kernel** – Enterprise-ready SDK with its own built-in Agent Framework for building and orchestrating multi-agent systems.
> - **AutoGen** – Research-oriented framework for multi-agent AI applications (new users are directed to consider Microsoft Agent Framework).
> - **Microsoft Agent Framework** – The newest framework focused on graph-based workflows and advanced orchestration patterns.

Our 30-minute session will cover:

- **1. What is the Agent Framework?** Core concepts of AI *agents*, how the framework works, and why agents are central to "agentic AI" applications.
- **2. Agent Framework vs. Semantic Kernel & AutoGen:** Key differences in architecture, developer experience, use cases, and unique capabilities.
- **3. Stand-out Features:** Favourite features of Agent Framework – e.g. multi-agent **workflow orchestration**, open interoperability (tools & protocols), and enterprise-grade enhancements.
- **4. Demo (Basics to Multi-Agent):** A live example starting with a basic single-agent scenario and progressing to a coordinated multi-agent scenario.
- **5. Q&A (incl. Deployment Choices):** For example, **when to deploy agents on Azure Functions (code-first) vs. using the Azure AI Foundry Agent Service** (fully managed) – a common customer question we'll address.

By focusing on these areas, we'll ensure the **essential insights come first** (what Agent Framework is and why it's different), then dive deeper into technical specifics and a practical demonstration, all within ~25 minutes plus ~5 minutes for Q&A.

---

## 1. Agent Framework Fundamentals: What *is* an AI Agent?

At its core, **an AI agent is a program where an LLM (Large Language Model) drives the control flow of logic**. The slide decks define it succinctly: *"An AI agent is a simple program where you allow an LLM to help decide the control flow… like a micro-service that can execute tasks and achieve specific outcomes."* In other words, instead of a fixed sequence of calls, an agent uses an LLM's reasoning to choose which actions (or tools) to take. 

**Agents can handle unstructured, open-ended inputs** (e.g. free-form user requests or system events) and intelligently decide which APIs or functions to invoke in order to achieve a goal.

### Agent Components

**Agent Framework** provides the infrastructure for this. Each agent in the framework has:

- **Instructions/Prompt:** a definition of the agent's role or behaviour (e.g. "You are a research assistant agent that can use web search").
- **Tools/Actions:** a set of functions it can call (APIs, database queries, calculations, etc.). These are analogous to "skills" or plugins.
- **Memory/Context:** the ability to store and recall information (conversation history, intermediate results, long-term data) as it works.
- **LLM integration:** the agent uses an LLM (Azure OpenAI or other model) to interpret input and decide on next actions.

### How It Works

The **Agent Framework runtime orchestrates the loop**: it feeds the agent the current context (user query + memory), the LLM decides what tool (if any) to use next, the framework executes that tool, and the cycle repeats until the agent produces an answer. This is essentially an implementation of the ReAct pattern (Reasoning and Acting in a loop). 

Developers don't have to write that loop from scratch – they declare the agent and its tools, and Agent Framework handles the sequencing of LLM "thought" → tool call → new LLM input, etc.

### Key Distinction: Agents vs. Traditional Software

*Unlike a hard-coded script, an agent can dynamically react to different situations.* An agent's unique strength is the ability to **handle unstructured, multi-modal input and decide on-the-fly which tool(s) to invoke using AI**. This makes agents far more flexible for complex tasks (but also means we need to govern them, which we'll touch on in features). Agent Framework makes it easier to build such agents without writing a custom planner each time.

---

## 2. How Agent Framework Differs from Semantic Kernel and AutoGen

Microsoft now offers **three distinct frameworks** for building AI agents, each with its own strengths:

### The Three Frameworks

**Semantic Kernel** – A model-agnostic SDK that empowers developers to build, orchestrate, and deploy AI agents. It now includes its own **built-in Agent Framework** supporting multi-agent systems, plugins, MCP, and vector database integration. Available for Python (3.10+), .NET (8.0+), and Java (JDK 17+).

Key Semantic Kernel features:
- `ChatCompletionAgent` for building agents with plugins
- Multi-agent orchestration with triage patterns
- Model Context Protocol (MCP) support
- Vector DB integration (Azure AI Search, Elasticsearch, Chroma)
- OpenAPI tool plugins
- Multimodal support (text, vision, audio)

**AutoGen** – A framework for creating multi-agent AI applications. The AutoGen repo now directs new users to consider Microsoft Agent Framework, though AutoGen continues to receive maintenance, bug fixes, and security patches.

Key AutoGen features:
- `AssistantAgent` with model client support
- MCP Workbench for tool integration
- `AgentTool` for agent-as-tool patterns
- AutoGen Studio (no-code GUI)
- AgentChat API for rapid prototyping
- Magentic-One multi-agent team

**Microsoft Agent Framework** – The newest framework focused on **graph-based workflows** with streaming, checkpointing, human-in-the-loop, and time-travel capabilities. It provides comprehensive tooling including DevUI for interactive development and debugging.

Key Agent Framework features:
- Graph-based workflow orchestration
- Streaming, checkpointing, time-travel debugging
- DevUI for interactive development
- AF Labs for experimental features
- Middleware system for custom pipelines
- OpenTelemetry integration

### Graph-Based Workflows & Advanced Orchestration

Microsoft Agent Framework's headline feature is **graph-based workflows** that connect agents and deterministic functions using data flows. Key capabilities include:

- **Streaming** – Real-time output as agents process tasks
- **Checkpointing** – Save and restore workflow state
- **Human-in-the-loop** – Built-in support for human intervention points
- **Time-travel** – Debug by stepping back through workflow execution

These patterns enable scenarios like "one orchestrator agent delegating subtasks to two worker agents and then a validator agent" with built-in support for parallel execution, sequential pipelines, and dynamic hand-offs.

> **Note:** Semantic Kernel also now supports multi-agent orchestration natively. For example, you can create a triage agent that delegates to specialist agents (like BillingAgent or RefundAgent) using plugins.

### Multi-Language Support & Migration Paths

Microsoft Agent Framework provides **full support for both Python and .NET** with consistent APIs across languages:

```bash
# Python installation
pip install agent-framework --pre

# .NET installation  
dotnet add package Microsoft.Agents.AI --prerelease
```

Microsoft provides **official migration guides** for developers moving from either framework:
- [Migration from Semantic Kernel](https://learn.microsoft.com/en-us/agent-framework/migration-guide/from-semantic-kernel)
- [Migration from AutoGen](https://learn.microsoft.com/en-us/agent-framework/migration-guide/from-autogen)

### Enterprise-Grade Features (Production Readiness)

Microsoft Agent Framework includes **built-in observability** via OpenTelemetry integration for distributed tracing, monitoring, and debugging. 

Key enterprise features across all frameworks:
- **Agent Framework**: OpenTelemetry, middleware, checkpointing
- **Semantic Kernel**: Enterprise-ready APIs, observability, local deployment options
- **AutoGen**: Benchmarking suite (AgentBench), Extensions API

### Expanded Interoperability (Open Standards)

All three frameworks now support modern interoperability standards:

**Microsoft Agent Framework:**
- Multiple Agent Provider Support – Connect to various LLM providers
- Middleware System – Flexible request/response processing and custom pipelines
- OpenTelemetry Integration – Built-in distributed tracing and monitoring

**Semantic Kernel:**
- Model Context Protocol (MCP) – Connect to external context providers and tools
- OpenAPI tool plugins – Automatically create tools from API specifications  
- Plugin Ecosystem – Native functions, prompt templates, and MCP support
- Vector DB Support – Azure AI Search, Elasticsearch, Chroma, and more

**AutoGen:**
- MCP Workbench – Native MCP server support (e.g., Playwright for web browsing)
- AgentTool – Wrap agents as tools for other agents to call
- Extensions API – First and third-party extensions for LLM clients and capabilities

### Choosing the Right Framework

All three frameworks are actively maintained. Here's guidance for customers:

| Use Case | Recommended Framework |
|----------|----------------------|
| Enterprise apps with existing SK investment | **Semantic Kernel** (now has built-in Agent Framework) |
| Graph-based workflows, time-travel debugging, DevUI | **Microsoft Agent Framework** |
| Research, experimentation, existing AutoGen codebase | **AutoGen** (with note to evaluate Agent Framework for new projects) |
| New multi-agent projects on Azure | **Microsoft Agent Framework** or **Semantic Kernel** |

> **Key Point:** Microsoft Agent Framework is the recommended starting point for **new** multi-agent projects, but Semantic Kernel's built-in Agent Framework is also production-ready and may be preferred by teams already using SK.

---

## 3. Key Features & Capabilities of Agent Framework

Now let's highlight some **stand-out features** of the Agent Framework that are particularly useful:

### 🤖 Graph-Based Workflows & Orchestration Patterns

This is arguably **the headline feature**. Microsoft Agent Framework introduces **graph-based workflows** that connect agents and deterministic functions using data flows. Key capabilities:

- **Streaming** – Real-time data flow as agents process
- **Checkpointing** – Save workflow state for recovery
- **Human-in-the-loop** – Built-in intervention points
- **Time-travel** – Step backward through execution for debugging

For example, if you want an **orchestrator agent** to split a task among two specialist agents and then aggregate results, you define this as a workflow graph. The framework handles execution, state management, and error recovery.

### Interoperability & Open Integration

Microsoft Agent Framework supports multiple LLM providers and is designed for extensibility:

- **Multiple Agent Providers** – Connect to Azure OpenAI, OpenAI, and other providers with consistent APIs
- **Middleware System** – Flexible request/response processing, exception handling, and custom pipelines
- **DevUI** – Interactive developer UI for agent development, testing, and debugging workflows
- **AF Labs** – Experimental packages for benchmarking, reinforcement learning, and research

The framework is **open source and extensible** – community contributions for connectors and extensions are welcome.

[Watch DevUI in action](https://www.youtube.com/watch?v=mOAaGY4WPvc)

### 🔒 Enterprise Security, Compliance & Governance

A huge focus is making agents **production-ready**. There are hooks to implement **approvals** or policy checks before an agent takes certain actions. The framework logs agent activities, so you have an audit trail of which tools were used with what parameters – critical for debugging and governance. 

It's also built to integrate with **Azure's security** (for instance, when running in Azure, an agent can use managed identity to securely access resources, rather than embedding keys). 

In short, **compliance is not an afterthought** here.

### 📈 Developer Experience & Tooling

Microsoft Agent Framework provides excellent developer experience:

**Documentation & Learning:**
- [Overview](https://learn.microsoft.com/agent-framework/overview/agent-framework-overview)
- [Quick Start](https://learn.microsoft.com/agent-framework/tutorials/quick-start)
- [User Guide](https://learn.microsoft.com/en-us/agent-framework/user-guide/overview)
- [Weekly office hours](https://github.com/microsoft/agent-framework/blob/main/COMMUNITY.md#public-community-office-hours)
- [Discord community](https://discord.gg/b5zjErwbQM)

**DevUI** – Interactive tool for building, testing, and debugging agent workflows visually.

**Observability** – Built-in OpenTelemetry integration for distributed tracing, monitoring, and debugging.

**Portability** – Run agents locally for dev/test, then deploy the same code to Azure. No vendor lock-in – works in containers, on-premises, or other clouds.

### 🎛️ Azure AI Foundry Integration

Agent Framework is built to integrate with **Azure AI Foundry** (Microsoft's AI Cloud platform). It's not a Foundry-specific framework (you can use it anywhere), but if you *do* use Azure AI Foundry, Agent Framework plugs in nicely.

#### What is Foundry Agent Service?

**Foundry Agent Service** is the fully managed platform within Azure AI Foundry for deploying intelligent agents. Think of it as an "assembly line for intelligent agents" that brings together:

1. **Models** – Select from GPT-4o, GPT-4, GPT-3.5, Llama, and other LLMs
2. **Customization** – Fine-tuning, distillation, domain-specific prompts
3. **AI Tools** – Enterprise knowledge (Bing, SharePoint, Azure AI Search) and actions (Logic Apps, Azure Functions, OpenAPI)
4. **Orchestration** – Server-side tool orchestration, conversation state management, automatic retries
5. **Observability** – Full conversation tracing, Application Insights integration
6. **Trust** – Microsoft Entra identity, RBAC, content filters, encryption, network isolation

#### Why Use Foundry Agent Service?

| Capability | Benefit |
|-----------|---------|
| Full conversation visibility | Access structured conversations (user↔agent and agent↔agent) for UIs, debugging, training |
| Multi-agent coordination | Built-in support for agent-to-agent messaging |
| Tool orchestration | Server-side execution and retry of tool calls with structured logging |
| Trust and safety | Integrated content filters, XPIA protection, policy-governed outputs |
| Enterprise integration | Bring your own storage, Azure AI Search index, virtual network |
| Observability | Full message tracing, Application Insights telemetry |
| Identity control | Microsoft Entra, RBAC, audit logs, conditional access |

#### Built-in Tools in Foundry Agent Service

Foundry Agent Service provides a rich set of **knowledge tools** and **action tools**:

**Knowledge Tools** (grounding agents with data):
- **Azure AI Search** – Chat with your existing search index
- **File Search** – Augment agents with proprietary documents
- **Grounding with Bing Search** – Access real-time internet information
- **Microsoft Fabric** – Unlock data analysis capabilities
- **Third-party data** – Tripadvisor, Morningstar, and more

**Action Tools** (enabling agents to take action):
- **Code Interpreter** – Write and run Python code in a sandbox
- **Azure Functions** – Custom stateful functions
- **Azure Logic Apps** – Low-code/no-code workflows
- **OpenAPI Spec** – Connect to external APIs
- **MCP (Model Context Protocol)** – Connect to MCP endpoints
- **Function calling** – Custom stateless functions
- **Browser Automation** – Natural language browser control
- **Deep Research** – Web-based research with `o3-deep-research` model

#### Microsoft Agent Framework vs. Foundry SDK: How They Work Together

Understanding the relationship between **Microsoft Agent Framework** and the **Foundry SDK** is key to choosing the right approach for your scenario.

| Aspect | Foundry SDK (`Azure.AI.Projects`) | Microsoft Agent Framework |
|--------|-----------------------------------|---------------------------|
| **Primary Purpose** | Unified client library to access Foundry services | Open-source SDK for building and orchestrating AI agents |
| **Hosting** | Cloud-hosted agents in Foundry Agent Service | Local orchestration OR cloud deployment |
| **Languages** | Python, C#, JavaScript/TypeScript, Java | Python, .NET |
| **Agent Management** | Server-side (Foundry manages state, threads, runs) | Client-side (you control the orchestration loop) |
| **Best For** | Managed agent hosting, enterprise integration | Custom workflows, graph-based orchestration, portability |

**Key Insight:** These are **complementary**, not competing tools. The Microsoft docs state:

> *"Microsoft Agent Framework is an open-source development kit for building AI agents and multi-agent workflows. It can orchestrate agents in Foundry, or have local agents that use Foundry models."*

#### How They Work Together

```
┌─────────────────────────────────────────────────────────────────┐
│                     Your Application                            │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│   ┌─────────────────────┐     ┌─────────────────────────────┐  │
│   │  Agent Framework    │     │     Foundry SDK             │  │
│   │  (Local Orchestrator)│────▶│  (Azure.AI.Projects)        │  │
│   │                     │     │                             │  │
│   │  • Graph workflows  │     │  • AIProjectClient          │  │
│   │  • Checkpointing    │     │  • Foundry Agent Service    │  │
│   │  • Time-travel      │     │  • Foundry Models           │  │
│   │  • DevUI            │     │  • Foundry Tools (Speech,   │  │
│   └─────────────────────┘     │    Vision, Search, etc.)    │  │
│                               └─────────────────────────────┘  │
│                                          │                      │
└──────────────────────────────────────────│──────────────────────┘
                                           ▼
                              ┌─────────────────────────┐
                              │   Azure AI Foundry      │
                              │   (Cloud Platform)      │
                              │                         │
                              │  • GPT-4o, Llama, etc.  │
                              │  • Azure AI Search      │
                              │  • Content Safety       │
                              │  • Application Insights │
                              └─────────────────────────┘
```

#### Scenario Guide: When to Use What

| Scenario | Recommended Approach |
|----------|---------------------|
| **Quick POC with managed hosting** | Foundry SDK → Foundry Agent Service |
| **Complex multi-agent workflows with graph orchestration** | Agent Framework (local) → Foundry Models |
| **Enterprise app needing full conversation audit** | Foundry SDK → Foundry Agent Service |
| **Hybrid: local orchestration + cloud agents** | Agent Framework orchestrating Foundry agents |
| **Multi-cloud or on-premises deployment** | Agent Framework (portable) |
| **Need time-travel debugging, checkpointing** | Agent Framework |
| **Using Foundry Tools (Speech, Vision, Document Intelligence)** | Foundry SDK directly |
| **Agent-to-agent messaging with server-side state** | Foundry Agent Service via Foundry SDK |

#### Combined Architecture Examples

**Example 1: Local Agent Framework + Foundry Models**

Use Agent Framework for orchestration while calling Foundry-hosted models:

```python
# Agent Framework using Azure OpenAI models from Foundry
from agent_framework.azure import AzureOpenAIResponsesClient
from azure.identity import DefaultAzureCredential

# Local orchestration with Agent Framework
agent = AzureOpenAIResponsesClient(
    credential=DefaultAzureCredential(),
    endpoint="https://<your-foundry>.openai.azure.com/",
).create_agent(
    name="LocalOrchestrator",
    instructions="You coordinate tasks using graph-based workflows.",
)

# Agent Framework handles: checkpointing, streaming, graph execution
# Foundry provides: model inference, content safety, logging
```

**Example 2: Agent Framework Orchestrating Foundry Agents**

Use Agent Framework as a meta-orchestrator that coordinates agents hosted in Foundry:

```python
from agent_framework import AgentWorkflow
from azure.ai.projects import AIProjectClient
from azure.identity import DefaultAzureCredential

# Connect to Foundry
foundry_client = AIProjectClient(
    endpoint=os.environ["PROJECT_ENDPOINT"],
    credential=DefaultAzureCredential(),
)

# Create agents in Foundry Agent Service
with foundry_client:
    research_agent = foundry_client.agents.create_agent(
        model="gpt-4o",
        name="researcher",
        instructions="You research topics using Bing Search.",
        tools=[bing_tool.definitions],
    )
    
    writer_agent = foundry_client.agents.create_agent(
        model="gpt-4o", 
        name="writer",
        instructions="You write articles based on research.",
    )

# Use Agent Framework to orchestrate the Foundry-hosted agents
# with graph-based workflows, checkpointing, and time-travel
workflow = AgentWorkflow()
workflow.add_node("research", research_agent)
workflow.add_node("write", writer_agent)
workflow.add_edge("research", "write")

result = await workflow.run("Write an article about AI agents")
```

**Example 3: Foundry SDK with Foundry Tools Integration**

When you need Speech, Vision, or Document Intelligence alongside agents:

```csharp
using Azure.AI.Projects;
using Azure.Identity;

// Connect to Foundry project
var projectClient = new AIProjectClient(
    new Uri(endpointUrl), 
    new DefaultAzureCredential(), 
    clientOptions);

// Use Foundry Agent Service for the conversational agent
var agent = await projectClient.Agents.CreateAgentAsync(
    model: "gpt-4o",
    name: "document-processor",
    instructions: "You help users process documents.");

// Simultaneously use Foundry Tools for document processing
// Document Intelligence, Speech-to-Text, Vision all accessible
// through the same project endpoint
```

#### SDK Installation Reference

**Foundry SDK (for Foundry Agent Service & Tools):**
```bash
# Python
pip install azure-ai-projects azure-identity

# .NET
dotnet add package Azure.AI.Projects
dotnet add package Azure.Identity
```

**Microsoft Agent Framework (for local orchestration):**
```bash
# Python
pip install agent-framework --pre

# .NET
dotnet add package Microsoft.Agents.AI --prerelease
```

#### Decision Flowchart

```
Start: Building an AI Agent Application
           │
           ▼
┌──────────────────────────────────┐
│ Need graph-based workflows,      │
│ checkpointing, or time-travel?   │
└──────────────────────────────────┘
           │
     Yes   │   No
     ▼     │   ▼
┌─────────────┐   ┌──────────────────────────────┐
│ Use Agent   │   │ Need server-managed state,   │
│ Framework   │   │ enterprise compliance, or    │
│             │   │ multi-agent coordination?    │
└─────────────┘   └──────────────────────────────┘
     │                        │
     │                  Yes   │   No
     │                  ▼     │   ▼
     │            ┌─────────────┐   ┌─────────────┐
     │            │ Use Foundry │   │ Use OpenAI  │
     │            │ Agent       │   │ SDK directly│
     │            │ Service     │   │ with Foundry│
     │            │ via SDK     │   │ Models      │
     │            └─────────────┘   └─────────────┘
     │                  │
     ▼                  ▼
┌─────────────────────────────────────────────────┐
│ Can combine: Agent Framework for orchestration  │
│ + Foundry SDK for cloud agents & tools          │
└─────────────────────────────────────────────────┘
```

---

## Azure AI Foundry Demo Section

This section covers demos specifically for **Azure AI Foundry Agent Service**, showing how to create and deploy agents in the managed platform.

### Demo 1: Basic Agent with Code Interpreter (Foundry Agent Service)

Create an agent in Foundry that can write and execute Python code:

**Prerequisites:**
```bash
pip install azure-ai-projects azure-identity
az login
```

**Python Code:**
```python
import os
from pathlib import Path
from azure.ai.projects import AIProjectClient
from azure.identity import DefaultAzureCredential
from azure.ai.agents.models import CodeInterpreterTool

# Connect to your Foundry project
# Endpoint format: https://<AIFoundryResourceName>.services.ai.azure.com/api/projects/<ProjectName>
project_endpoint = os.environ["PROJECT_ENDPOINT"]

project_client = AIProjectClient(
    endpoint=project_endpoint,
    credential=DefaultAzureCredential(),
)

code_interpreter = CodeInterpreterTool()

with project_client:
    # Create an agent with Code Interpreter
    agent = project_client.agents.create_agent(
        model=os.environ["MODEL_DEPLOYMENT_NAME"],  # e.g., "gpt-4o"
        name="math-assistant",
        instructions="You politely help with math questions. Use the Code Interpreter tool when asked to visualize numbers.",
        tools=code_interpreter.definitions,
    )
    print(f"Created agent, ID: {agent.id}")

    # Create a conversation thread
    thread = project_client.agents.threads.create()
    print(f"Created thread, ID: {thread.id}")

    # Send a message
    message = project_client.agents.messages.create(
        thread_id=thread.id,
        role="user",
        content="Draw a graph for a line with slope 4 and y-intercept 9.",
    )

    # Run the agent
    run = project_client.agents.runs.create_and_process(
        thread_id=thread.id,
        agent_id=agent.id,
    )
    print(f"Run finished with status: {run.status}")

    # Get the response
    messages = project_client.agents.messages.list(thread_id=thread.id)
    for msg in messages:
        print(f"Role: {msg.role}, Content: {msg.content}")
        
        # Save any generated images
        for img in msg.image_contents:
            file_id = img.image_file.file_id
            file_name = f"{file_id}_image.png"
            project_client.agents.files.save(file_id=file_id, file_name=file_name)
            print(f"Saved image: {Path.cwd() / file_name}")
```

### Demo 2: Agent with Azure AI Search (RAG Pattern)

Create an agent grounded with your enterprise data using Azure AI Search:

```python
import os
from azure.ai.projects import AIProjectClient
from azure.identity import DefaultAzureCredential
from azure.ai.agents.models import AzureAISearchTool

project_client = AIProjectClient(
    endpoint=os.environ["PROJECT_ENDPOINT"],
    credential=DefaultAzureCredential(),
)

# Configure Azure AI Search tool
ai_search = AzureAISearchTool(
    index_connection_id="/subscriptions/.../connections/my-search-connection",
    index_name="product-catalog",
)

with project_client:
    # Create agent with search capability
    agent = project_client.agents.create_agent(
        model=os.environ["MODEL_DEPLOYMENT_NAME"],
        name="product-assistant",
        instructions="""You are a product expert assistant. 
        Use the Azure AI Search tool to find product information.
        Always cite the source documents in your responses.""",
        tools=ai_search.definitions,
    )

    thread = project_client.agents.threads.create()
    
    # User asks about products
    project_client.agents.messages.create(
        thread_id=thread.id,
        role="user",
        content="What are the specifications of the Surface Pro 11?",
    )

    run = project_client.agents.runs.create_and_process(
        thread_id=thread.id,
        agent_id=agent.id,
    )

    # Response will be grounded in your search index
    messages = project_client.agents.messages.list(thread_id=thread.id)
    for msg in messages:
        if msg.role == "assistant":
            print(msg.content)
```

### Demo 3: Agent with Grounding via Bing Search

Create an agent that can access real-time internet information:

```python
import os
from azure.ai.projects import AIProjectClient
from azure.identity import DefaultAzureCredential
from azure.ai.agents.models import BingGroundingTool

project_client = AIProjectClient(
    endpoint=os.environ["PROJECT_ENDPOINT"],
    credential=DefaultAzureCredential(),
)

# Configure Bing grounding
bing_tool = BingGroundingTool(
    connection_id="/subscriptions/.../connections/bing-grounding"
)

with project_client:
    agent = project_client.agents.create_agent(
        model=os.environ["MODEL_DEPLOYMENT_NAME"],
        name="research-assistant",
        instructions="""You are a research assistant with access to Bing Search.
        Use Bing to find current information about topics.
        Always provide sources for your information.""",
        tools=bing_tool.definitions,
    )

    thread = project_client.agents.threads.create()
    
    project_client.agents.messages.create(
        thread_id=thread.id,
        role="user",
        content="What are the latest developments in AI agents from Microsoft?",
    )

    # Force the agent to use Bing Search
    run = project_client.agents.runs.create_and_process(
        thread_id=thread.id,
        agent_id=agent.id,
        tool_choice={"type": "bing_grounding"},  # Force specific tool
    )

    messages = project_client.agents.messages.list(thread_id=thread.id)
    for msg in messages:
        if msg.role == "assistant":
            print(msg.content)
```

### Demo 4: Agent with Custom Function Calling

Create an agent that calls your custom business logic:

```python
import os
import json
from azure.ai.projects import AIProjectClient
from azure.identity import DefaultAzureCredential
from azure.ai.agents.models import FunctionTool

project_client = AIProjectClient(
    endpoint=os.environ["PROJECT_ENDPOINT"],
    credential=DefaultAzureCredential(),
)

# Define custom functions
functions = [
    {
        "name": "get_order_status",
        "description": "Get the status of a customer order by order ID",
        "parameters": {
            "type": "object",
            "properties": {
                "order_id": {
                    "type": "string",
                    "description": "The unique order identifier"
                }
            },
            "required": ["order_id"]
        }
    },
    {
        "name": "initiate_refund",
        "description": "Initiate a refund for an order",
        "parameters": {
            "type": "object",
            "properties": {
                "order_id": {"type": "string"},
                "reason": {"type": "string"}
            },
            "required": ["order_id", "reason"]
        }
    }
]

function_tool = FunctionTool(functions=functions)

# Your custom function implementations
def handle_function_call(name: str, arguments: dict) -> str:
    if name == "get_order_status":
        # Call your backend API
        return json.dumps({"status": "shipped", "tracking": "1Z999AA10123456784"})
    elif name == "initiate_refund":
        return json.dumps({"refund_id": "REF-12345", "status": "processing"})
    return json.dumps({"error": "Unknown function"})

with project_client:
    agent = project_client.agents.create_agent(
        model=os.environ["MODEL_DEPLOYMENT_NAME"],
        name="customer-service-agent",
        instructions="""You are a customer service agent.
        Use the available functions to help customers with orders and refunds.
        Always confirm actions before executing them.""",
        tools=function_tool.definitions,
    )

    thread = project_client.agents.threads.create()
    
    project_client.agents.messages.create(
        thread_id=thread.id,
        role="user",
        content="What's the status of order ORD-98765?",
    )

    # Run with function handling
    run = project_client.agents.runs.create(
        thread_id=thread.id,
        agent_id=agent.id,
    )
    
    # Poll and handle tool calls
    while run.status in ["queued", "in_progress", "requires_action"]:
        run = project_client.agents.runs.get(thread_id=thread.id, run_id=run.id)
        
        if run.status == "requires_action":
            tool_calls = run.required_action.submit_tool_outputs.tool_calls
            tool_outputs = []
            
            for tool_call in tool_calls:
                output = handle_function_call(
                    tool_call.function.name,
                    json.loads(tool_call.function.arguments)
                )
                tool_outputs.append({
                    "tool_call_id": tool_call.id,
                    "output": output
                })
            
            run = project_client.agents.runs.submit_tool_outputs(
                thread_id=thread.id,
                run_id=run.id,
                tool_outputs=tool_outputs,
            )

    messages = project_client.agents.messages.list(thread_id=thread.id)
    for msg in messages:
        if msg.role == "assistant":
            print(msg.content)
```

### Demo 5: Multi-Agent Coordination in Foundry

Using **Connected Agents** to orchestrate multiple specialized agents:

```python
import os
from azure.ai.projects import AIProjectClient
from azure.identity import DefaultAzureCredential

project_client = AIProjectClient(
    endpoint=os.environ["PROJECT_ENDPOINT"],
    credential=DefaultAzureCredential(),
)

with project_client:
    # Create specialized agents
    billing_agent = project_client.agents.create_agent(
        model=os.environ["MODEL_DEPLOYMENT_NAME"],
        name="billing-specialist",
        instructions="You handle billing inquiries, invoices, and payment issues.",
    )

    technical_agent = project_client.agents.create_agent(
        model=os.environ["MODEL_DEPLOYMENT_NAME"],
        name="technical-specialist", 
        instructions="You handle technical support, troubleshooting, and product questions.",
    )

    # Create orchestrator that can delegate to other agents
    orchestrator = project_client.agents.create_agent(
        model=os.environ["MODEL_DEPLOYMENT_NAME"],
        name="triage-orchestrator",
        instructions=f"""You are a triage agent. Analyze customer requests and delegate to:
        - billing-specialist ({billing_agent.id}): for billing, payment, invoice issues
        - technical-specialist ({technical_agent.id}): for technical problems, how-to questions
        
        Summarize the specialist's response for the customer.""",
        # Connected agents configuration varies by API version
    )

    thread = project_client.agents.threads.create()
    
    project_client.agents.messages.create(
        thread_id=thread.id,
        role="user",
        content="I have a question about my last invoice and also my device won't connect to WiFi.",
    )

    run = project_client.agents.runs.create_and_process(
        thread_id=thread.id,
        agent_id=orchestrator.id,
    )

    messages = project_client.agents.messages.list(thread_id=thread.id)
    for msg in messages:
        if msg.role == "assistant":
            print(msg.content)
```

### .NET Example: Foundry Agent Service

```csharp
using Azure.AI.Projects;
using Azure.Identity;

var endpoint = Environment.GetEnvironmentVariable("PROJECT_ENDPOINT");
var modelDeployment = Environment.GetEnvironmentVariable("MODEL_DEPLOYMENT_NAME");

var client = new AIProjectClient(new Uri(endpoint), new DefaultAzureCredential());

// Create an agent
var agent = await client.Agents.CreateAgentAsync(
    model: modelDeployment,
    name: "csharp-assistant",
    instructions: "You are a helpful assistant that provides concise answers.");

Console.WriteLine($"Created agent: {agent.Value.Id}");

// Create a thread
var thread = await client.Agents.Threads.CreateThreadAsync();

// Add a message
await client.Agents.Messages.CreateMessageAsync(
    threadId: thread.Value.Id,
    role: "user",
    content: "What are the key features of Azure AI Foundry?");

// Run the agent
var run = await client.Agents.Runs.CreateAndProcessRunAsync(
    threadId: thread.Value.Id,
    agentId: agent.Value.Id);

Console.WriteLine($"Run status: {run.Value.Status}");

// Get messages
var messages = client.Agents.Messages.GetMessagesAsync(thread.Value.Id);
await foreach (var message in messages)
{
    Console.WriteLine($"{message.Role}: {message.Content}");
}
```

---

## 4. Demo Plan: From Basic Agent to Multi-Agent

To make this concrete, we'll walk through a demo illustrating how the Agent Framework works in practice, in two stages:

### Stage 1 – Basic Agent Example

We'll start with a simple scenario: creating a single agent to perform a task.

**Python Example:**
```python
from agent_framework.azure import AzureOpenAIResponsesClient
from azure.identity import AzureCliCredential

agent = AzureOpenAIResponsesClient(
    credential=AzureCliCredential(),
).create_agent(
    name="HaikuBot",
    instructions="You are an upbeat assistant that writes beautifully.",
)

print(await agent.run("Write a haiku about Microsoft Agent Framework."))
```

**.NET Example:**
```csharp
var agent = new OpenAIClient("<apikey>")
    .GetOpenAIResponseClient("gpt-4o-mini")
    .CreateAIAgent(name: "HaikuBot", instructions: "You are an upbeat assistant.");

Console.WriteLine(await agent.RunAsync("Write a haiku about Microsoft Agent Framework."));
```

This demonstrates the basics: defining an agent's instructions and running it. The code is concise and consistent across Python and .NET.

### Stage 2 – Multi-Agent Orchestration

Next, we'll turn up the complexity to showcase Agent Framework's multi-agent power. Building on Stage 1, we'll introduce a second agent and an orchestrator. 

Imagine we want one agent to generate a draft answer and a second agent to verify or fact-check that answer before final output. We can implement a **"validator" agent** that has a different skill set, and an **"orchestrator" agent** that takes the user's query and coordinates the two. 

With Agent Framework, this coordination could be done with a **graph-based workflow** that defines the data flow between agents. We'll show how easy it is to spin up multiple agents and have them interact with streaming, checkpointing, and error handling built-in.

**Parallel execution example:** The user asks for a summary *and* an action item list from meeting notes. **Agent A** handles summarizing, **Agent B** extracts action items, in parallel. The orchestrator triggers both and merges results.

### Migration Aspect

We will briefly show migration considerations. Microsoft provides official migration guides:

- [Migration from Semantic Kernel](https://learn.microsoft.com/en-us/agent-framework/migration-guide/from-semantic-kernel)
- [Migration from AutoGen](https://learn.microsoft.com/en-us/agent-framework/migration-guide/from-autogen)

**Key takeaway:** Migration paths exist for both frameworks, and the graph-based workflow capabilities of Agent Framework become immediately available. Note that Semantic Kernel's built-in Agent Framework is also a valid choice for teams with existing SK investments.

### Demo Logistics

We'll allocate roughly 10–12 minutes for the demo. 
- Stage 1 (basic agent): ~5 minutes
- Stage 2 (multi-agent): ~7 minutes

This progression from simple to advanced aligns with how one would naturally adopt the framework.

---

## 5. Q&A – Key Question: Agent Framework on Azure Functions vs. Foundry Agent Service?

One anticipated question is: **"If a customer wants to deploy a team of agents (e.g. an orchestrator with two worker agents and a validator), should they build it with Agent Framework on Azure Functions, or use the Azure AI Foundry Agent Service?"** This speaks to **choosing between a code-first self-hosted approach vs. a managed PaaS approach**.

### Agent Framework on Azure Functions (or Your Own Infrastructure)

This is essentially the **"fully customizable" option**, akin to an IaaS/PaaS blend where you manage the code and hosting. 

**Choose this when the customer:**
- **Needs maximum flexibility or has special integration requirements**
- Wants to run on certain custom triggers
- Needs to integrate deeply with on-prem systems
- Prefers to keep the agents' logic in their own codebase for fine-grained control
- Requires cloud-agnostic or hybrid deployment

This approach requires the team to be comfortable with DevOps and Azure services (Function Apps, monitoring, etc.), but rewards them with complete control. 

It's also the only option if the solution must be **cloud-agnostic or hybrid** – Agent Framework can run anywhere (on Azure Functions, in a container, on-premises, even on other clouds).

**Summary:** *Use Agent Framework on Functions when you need fine-grained control, custom orchestration logic, multi-cloud flexibility, and you have the coding expertise to manage it.*

### Azure AI Foundry Agent Service

This is the **fully managed platform** option. It's a service in Azure (part of *Azure AI Foundry*) where you can deploy agents without worrying about the underlying servers or scaling. 

**Choose this when the customer:**
- **Prioritizes ease of deployment, built-in scalability, and ecosystem integration** over customization
- Just wants agents to run and coordinate with minimal code
- Wants to manage agents through a UI
- Is already invested in Azure AI Foundry

This provides *one-click deployment, auto-scaling, monitoring dashboards, compliance features out-of-the-box*. It's also tightly integrated with other Foundry components (like the model catalog, vector store, etc.).

However, the trade-off is somewhat less low-level control – you'll be using Foundry's way of doing things.

### Decision Summary

**For an orchestrator + workers scenario:**

| Scenario | Recommendation |
|----------|-----------------|
| Strong dev resources, wants custom behaviour | Use Agent Framework on Azure Functions |
| Wants "just have it work" with less overhead, already on Azure AI Foundry | Use Foundry Agent Service |

**Important note:** The **Agent Framework code you write can be deployed into Foundry Agent Service as well** – it's not an either-or forever. So it's less a question of incompatibility and more about who manages the runtime.

Microsoft actually envisions customers might use **both** in tandem for different needs – e.g., prototype an agent quickly in Foundry Agent Service, and later, if needed, move to a custom AF deployment for advanced scenarios.

---

## Recap

In this session, we introduced Microsoft Agent Framework as the newest addition to Microsoft's AI agent development ecosystem, alongside Semantic Kernel and AutoGen. Key points:

1. **Three Frameworks** – Microsoft Agent Framework, Semantic Kernel (with built-in Agent Framework), and AutoGen are separate, actively maintained projects
2. **Agent Framework's Differentiators** – Graph-based workflows, streaming, checkpointing, human-in-the-loop, time-travel debugging, and DevUI
3. **Semantic Kernel's Evolution** – Now includes native multi-agent support, MCP, plugins, and vector DB integration
4. **AutoGen's Status** – Continues maintenance while directing new users to evaluate Agent Framework

We highlighted key features like graph-based orchestration, DevUI for development, and Azure integration. The demo illustrated practical use from a simple agent to coordinated multi-agent teams.

Finally, we addressed deployment options: self-hosted on Azure Functions vs. managed Azure AI Foundry Agent Service.

**Guidance for customers:**
- **New projects** → Microsoft Agent Framework (recommended) or Semantic Kernel Agent Framework
- **Existing SK codebase** → Semantic Kernel's built-in Agent Framework
- **Existing AutoGen codebase** → Continue with AutoGen or migrate to Agent Framework

By understanding these points, our team will be well-equipped to guide customers to the right framework for their specific needs and demonstrate the capabilities of Microsoft's agent development ecosystem.

---

## Quick Reference: Code Examples

### Semantic Kernel – Basic Agent (Python)
```python
from semantic_kernel.agents import ChatCompletionAgent
from semantic_kernel.connectors.ai.open_ai import AzureChatCompletion

agent = ChatCompletionAgent(
    service=AzureChatCompletion(),
    name="SK-Assistant",
    instructions="You are a helpful assistant.",
)

response = await agent.get_response(messages="Write a haiku about Semantic Kernel.")
print(response.content)
```

### Semantic Kernel – Multi-Agent (Python)
```python
billing_agent = ChatCompletionAgent(
    service=AzureChatCompletion(), 
    name="BillingAgent", 
    instructions="You handle billing issues."
)

refund_agent = ChatCompletionAgent(
    service=AzureChatCompletion(),
    name="RefundAgent",
    instructions="Assist users with refund inquiries.",
)

triage_agent = ChatCompletionAgent(
    service=OpenAIChatCompletion(),
    name="TriageAgent",
    instructions="Evaluate user requests and forward them to BillingAgent or RefundAgent.",
    plugins=[billing_agent, refund_agent],
)
```

### AutoGen – Basic Agent (Python)
```python
from autogen_agentchat.agents import AssistantAgent
from autogen_ext.models.openai import OpenAIChatCompletionClient

model_client = OpenAIChatCompletionClient(model="gpt-4.1")
agent = AssistantAgent("assistant", model_client=model_client)
print(await agent.run(task="Say 'Hello World!'"))
```

### Microsoft Agent Framework – Basic Agent (Python)
```python
from agent_framework.azure import AzureOpenAIResponsesClient
from azure.identity import AzureCliCredential

agent = AzureOpenAIResponsesClient(
    credential=AzureCliCredential(),
).create_agent(
    name="HaikuBot",
    instructions="You are an upbeat assistant that writes beautifully.",
)

print(await agent.run("Write a haiku about Microsoft Agent Framework."))
```

---

## Resources

- **Microsoft Agent Framework**: [GitHub](https://github.com/microsoft/agent-framework) | [Docs](https://learn.microsoft.com/agent-framework/)
- **Semantic Kernel**: [GitHub](https://github.com/microsoft/semantic-kernel) | [Docs](https://learn.microsoft.com/semantic-kernel/)
- **AutoGen**: [GitHub](https://github.com/microsoft/autogen) | [Docs](https://microsoft.github.io/autogen/)
