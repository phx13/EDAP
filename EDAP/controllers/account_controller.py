import hashlib
import time

from flask import Blueprint, render_template, redirect, url_for, session, request
from flask_login import current_user, login_user, logout_user

from EDAP import login_manager
from EDAP.models.account_model import AccountModel
from EDAP.utils.pillow_helper import ImageCaptchaHelper
from EDAP.utils.random_helper import RandomHelper
from EDAP.utils.serialization_helper import SerializationHelper
from EDAP.utils.smtp_helper import EmailHelper
from EDAP.views.forms.account_forms import LoginForm

account_bp = Blueprint('account_bp', __name__)


@login_manager.user_loader
def load_user(user_id):
    return AccountModel.search_account_by_id(user_id)


@account_bp.route('/login/', methods=['GET', 'POST'])
def login():
    if current_user.is_authenticated:
        return redirect(url_for('index_bp.index_page'))

    form = LoginForm()
    if form.validate_on_submit():
        account = AccountModel.search_account_by_email(form.email.data)

        if form.login_captcha.data.lower().strip() != session.get('login_captcha'):
            return '验证码错误！'
        if not account:
            return '该用户不存在！'
        elif form.password.data != account.password:
            return '密码错误！'

        login_user(account, remember=True)
        if next_url := request.args.get('next'):
            return redirect(next_url)
        return redirect(url_for('index_bp.index_page'))
    return render_template('login.html', form=form)


@account_bp.route('/logout/')
def logout():
    logout_user()
    return redirect(url_for('account_bp.login'))


@account_bp.route('/login/captcha/')
def login_captcha():
    try:
        code, base64_str = ImageCaptchaHelper().get_image_captcha()
        session['login_captcha'] = code.lower()
        return base64_str
    except:
        return '验证码生成失败！'


@account_bp.route('/login/password/', methods=['POST'])
def login_password():
    try:
        email = request.form.get('email').strip()
        account = AccountModel.search_account_by_email(email)
        if not account:
            return '该用户不存在！'

        password = RandomHelper.generate_code(6)
        subject = '设备数据分析平台-重置密码'
        content = f"<br/>欢迎登录设备数据分析平台，您的密码已重置为<span style='color:orange;'>{password}</span>，请您重新登录系统！"
        receiver_email = email
        sender_name = '设备数据分析平台-管理团队'
        sender_email = 'edap@mail.com'
        EmailHelper.send_email(subject, content, receiver_email, sender_name, sender_email)

        password = hashlib.md5(password.encode()).hexdigest()
        update_time = time.strftime('%Y-%m-%d %H:%M:%S')
        AccountModel().update_account(email, account.username, password, account.role, account.avatar, account.profile, update_time)
        return '密码重置成功！'
    except:
        return '密码重置失败！'
