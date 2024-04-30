#!/bin/bash


cd backend
# Start FastAPI app in the background on port 8000
uvicorn app:app --host 0.0.0.0 --port 8000 --workers 1 & echo $! > http_server.pid
# Start Nginx
nginx -g 'daemon off;'