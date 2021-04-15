from flask import Blueprint, render_template, jsonify
from flask_login import login_required

from EDAP.models.project_model import ProjectModel
from EDAP.utils.serialization_helper import SerializationHelper

index_bp = Blueprint('index_bp', __name__)


@index_bp.before_request
@login_required
def before_request():
    pass


@index_bp.route('/')
def index_page():
    return render_template('index.html')



