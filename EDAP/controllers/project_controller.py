from flask import Blueprint, render_template, jsonify
from flask_login import login_required

from EDAP.models.project_model import ProjectModel
from EDAP.utils.serialization_helper import SerializationHelper

project_bp = Blueprint('project_bp', __name__)


@project_bp.before_request
@login_required
def before_request():
    pass


@project_bp.route('/project/<int:prj_id>')
def project_page(prj_id):
    project = ProjectModel.search_project_by_id(prj_id)
    return render_template('project.html', project=project)


@project_bp.route('/project/data/')
def all_project():
    origin_projects = SerializationHelper.model_to_list(ProjectModel.search_all())
    etl_projects = []
    for op in origin_projects:
        prj = {op['prj_id']: [str(op['lon']), str(op['lat']), op['description']]}
        etl_projects.append(prj)
    return jsonify(etl_projects)


@project_bp.route('/project/data/<int:prj_id>')
def current_project(prj_id):
    origin_projects = SerializationHelper.model_to_list([ProjectModel.search_project_by_id(prj_id)])
    etl_projects = []
    for op in origin_projects:
        prj = {op['prj_id']: [str(op['lon']), str(op['lat']), op['description']]}
        etl_projects.append(prj)
    return jsonify(etl_projects)
