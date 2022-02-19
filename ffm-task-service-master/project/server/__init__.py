# project/server/__init__.py

import os

from flask import Flask
from flask_bcrypt import Bcrypt
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS
from flask_swagger_ui import get_swaggerui_blueprint

app = Flask(__name__)
CORS(app)

SWAGGER_URL = '/api/task'
API_URL = '/static/swagger.yaml'
# API_URL = 'https://petstore.swagger.io/v2/swagger.json'
SWAGGERUI_BLUEPRINT = get_swaggerui_blueprint(
    SWAGGER_URL,
    API_URL,
    config={
        'app_name': "Task Service API"
    }
)
app.register_blueprint(SWAGGERUI_BLUEPRINT, url_prefix=SWAGGER_URL)

app_settings = os.getenv(
    'APP_SETTINGS',
    'project.server.config.DevelopmentConfig'
)
app.config.from_object(app_settings)

bcrypt = Bcrypt(app)
db = SQLAlchemy(app)

from project.server.auth.views import task_blueprint
app.register_blueprint(task_blueprint)
