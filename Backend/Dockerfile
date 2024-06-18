# Use an official Python runtime as a parent image
FROM python:3.9

# Set the working directory in the container
WORKDIR /app

# Install dependencies
RUN apt-get update && \
    apt-get install -y --no-install-recommends \
    build-essential \
    libmysqlclient-dev && \
    # Remove any problematic APT post-invoke scripts
    rm -f /etc/apt/apt.conf.d/docker-clean && \
    rm -rf /var/lib/apt/lists/*

# Install Python dependencies
COPY backend/requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Copy the rest of the application code
COPY backend/ .

# Command to run the application
CMD ["python", "manage.py", "runserver", "0.0.0.0:8000"]
