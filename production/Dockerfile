FROM amd64/python:3.11-slim
WORKDIR /app
COPY . /app
RUN apt-get update
RUN pip install --upgrade pip
RUN pip install tensorflow
RUN pip install flask
RUN pip install flask_cors
RUN pip install gunicorn
EXPOSE 80
CMD ["python", "app.py"]