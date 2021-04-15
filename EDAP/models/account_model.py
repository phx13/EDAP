from flask_login import UserMixin
from sqlalchemy import MetaData, Table
from sqlalchemy.exc import SQLAlchemyError

from EDAP import db


class AccountModel(db.Model, UserMixin):
    __tablename__ = 'account'
    __table__ = Table(__tablename__, MetaData(bind=db.engine), autoload=True)

    """
    id: int, primary key, auto_increment
    username: varchar
    email: varchar
    password: varchar
    role: varchar
    avatar: varchar
    profile: tinytext
    time: datetime
    """

    @staticmethod
    def search_all():
        try:
            return db.session.query(AccountModel).all()
        except SQLAlchemyError:
            return 'server error'

    @staticmethod
    def search_account_by_id(id):
        try:
            return db.session.query(AccountModel).get(id)
        except SQLAlchemyError:
            return 'server error'

    @staticmethod
    def search_account_by_email(email):
        try:
            return db.session.query(AccountModel).filter_by(email=email).first()
        except SQLAlchemyError:
            return 'server error'

    @staticmethod
    def create_account(username, email, password, role):
        try:
            db.session.add(AccountModel(username=username, email=email, password=password, role=role))
            db.session.commit()
        except SQLAlchemyError:
            return 'server error'

    def update_account(self, email, username, password, role, avatar, profile, time):
        try:
            self.search_account_by_email(email).update({'username': username, 'password': password, 'role': role, 'avatar': avatar, 'profile': profile, 'time': time})
            db.session.commit()
        except SQLAlchemyError:
            return 'server error'

    def delete_account(self, email):
        try:
            self.search_account_by_email(email).delete()
            db.session.commit()
        except SQLAlchemyError:
            return 'server error'
