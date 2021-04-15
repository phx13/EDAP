import os

import pymysql
from flask import Flask, render_template
from werkzeug.exceptions import HTTPException

from EDAP.utils.api_exception_helper import APIException, InterServerErrorException

pymysql.install_as_MySQLdb()
from flask_sqlalchemy import SQLAlchemy
from flask_login import LoginManager
from flask_wtf.csrf import CSRFProtect, CSRFError

app = Flask(__name__, template_folder='views', static_url_path='/', static_folder='resources')
app.config['SECRET_KEY'] = '\xca\x0c\x86\x04\x98@\x02b\x1b7\x8c\x88]\x1b\xd7"+\xe6px@\xc3#\\'
app.config['SQLALCHEMY_DATABASE_URI'] = 'mysql+pymysql://root:123456@localhost:3306/edap?charset=utf8'
app.config['SQLALCHEMY_POOL_SIZE'] = 1000
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
db = SQLAlchemy(app)

login_manager = LoginManager(app)
login_manager.login_view = 'account_bp.login'

csrf = CSRFProtect()
csrf.init_app(app)


# @app.errorhandler(Exception)
# @app.errorhandler(CSRFError)
# def catch_http_exception(e):
#     if isinstance(e, HTTPException):
#         api_exception = APIException(e.code, e.description)
#     else:
#         api_exception = InterServerErrorException()
#     return render_template('error.html', api_exception=api_exception)


@app.before_request
def before_request():
    pass


from EDAP.controllers.index_controller import index_bp
from EDAP.controllers.account_controller import account_bp
from EDAP.controllers.project_controller import project_bp

app.register_blueprint(index_bp)
app.register_blueprint(account_bp)
app.register_blueprint(project_bp)
