FROM python:3.12-slim

WORKDIR /app

COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

COPY . .

# Run the wrapper script
RUN chmod +x /app/start.sh
CMD ["/app/start.sh"]
