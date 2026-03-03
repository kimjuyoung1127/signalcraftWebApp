FROM python:3.12-slim

WORKDIR /app

COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

COPY . .

# Use a wrapper script or rely on uvicorn's ability to read from the PORT env var if not specified
CMD ["sh", "-c", "uvicorn app.main:app --host 0.0.0.0 --port ${PORT:=8000}"]
