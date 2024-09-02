# Use the official Rasa image as a base
FROM python:3.8-slim

# Set working directory
WORKDIR /app
USER root
# Copy your flask project files into the container
COPY . /app

# Copy any additional custom requirements, if necessary (uncomment next line)
RUN pip install --no-cache-dir flask requests

# Expose ports for flask  server
EXPOSE 5006

# Run app.py when the container launches

# CMD ["sh", "-c", "python app_rasa.py"]

# CMD ["sh", "-c", "sleep 60 && python app_rasa.py"]

CMD ["sh", "-c", "sleep 60 && python app_rasa.py"]








