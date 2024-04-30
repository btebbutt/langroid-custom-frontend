import os
from openai import AsyncOpenAI

from fastapi.responses import JSONResponse

from chainlit.auth import create_jwt
from chainlit.server import app
import chainlit as cl



@app.get("/custom-auth")
async def custom_auth():
    # Verify the user's identity with custom logic.
    token = create_jwt(cl.User(identifier="Test User"))
    return JSONResponse({"token": token})


import langroid as lr
import langroid.language_models as lm
import chainlit as cl


@cl.on_chat_start
async def on_chat_start():
    lm_config = lm.OpenAIGPTConfig(chat_model="default")
    agent = lr.ChatAgent(lr.ChatAgentConfig(llm=lm_config))
    task = lr.Task(agent, interactive=True)

    msg = "Help me with some questions"
    lr.ChainlitTaskCallbacks(task)
    await task.run_async(msg)