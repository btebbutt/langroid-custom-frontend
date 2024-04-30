#!/bin/bash


cd backend
# Start FastAPI app in the background on port 8000
uvicorn app:app --host 0.0.0.0 --port 8000 --reload &
# Start Nginx
nginx -g 'daemon off;'
