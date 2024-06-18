# Use an official Python runtime as a parent image
FROM python:3.9

# Set the working directory in the container
WORKDIR /app


# Install dependencies
RUN apt-get update && \
    apt-get install -y --no-install-recommends \
    build-essential \
    default-libmysqlclient-dev && \
    apt-get clean && \
    rm -rf /var/lib/apt/lists/*

# Install Python dependencies
COPY requirements.txt /app/
RUN pip install --no-cache-dir -r requirements.txt

# Copy the rest of the application code
COPY . /app/

# Command to run the application
CMD ["python", "manage.py", "runserver", "8000"]
