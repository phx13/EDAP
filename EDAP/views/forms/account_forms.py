from flask_wtf import FlaskForm
from wtforms import SubmitField, StringField, PasswordField


class LoginForm(FlaskForm):
    email = StringField('邮箱')
    password = PasswordField('密码')
    login_captcha = StringField('验证码')
    submit = SubmitField('登录')


class RegisterForm(FlaskForm):
    username = StringField()
    email = StringField()
    password = PasswordField()
    register_code = StringField()
    submit = SubmitField('注册')
