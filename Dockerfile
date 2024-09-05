# Use the official Rasa image as a base
FROM python:3.8-slim

# Set working directory
WORKDIR /app
USER root
# Copy your flask project files into the container
COPY . /app

# Copy any additional custom requirements, if necessary (uncomment next line)
RUN pip install --no-cache-dir flask requests gunicorn

# Expose ports for flask  server
EXPOSE 5006

# Run app.py when the container launches

# CMD ["sh", "-c", "python app_rasa.py"]

# CMD ["sh", "-c", "sleep 60 && python app_rasa.py"]

# CMD ["sh", "-c", "python app_rasa.py"]

# ENTRYPOINT ["rasa"]
# CMD ["run", "--port", "5005", "--enable-api"]

CMD ["python", "app_rasa.py"]


# ENV PATH="/usr/local/python3/bin:${PATH}"
# CMD ["gunicorn", "-w", "4", "-b", "0.0.0.0:5006", "app_rasa:app"]








