from flask import abort
from flask_login import current_user


def check_if_authorized(authorized_role):
    if current_user.role != authorized_role and current_user.role != 'admin':
        abort(403)
