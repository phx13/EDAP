from flask_login import UserMixin
from sqlalchemy import MetaData, Table

from EDAP import db, login_manager


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
        return db.session.query(AccountModel).all()

    @staticmethod
    def search_account_by_id(id):
        return db.session.query(AccountModel).get(id)

    @staticmethod
    def search_account_by_email(email):
        return db.session.query(AccountModel).filter_by(email=email).first()

    @staticmethod
    def create_account(username, email, password, role):
        db.session.add(AccountModel(username=username, email=email, password=password, role=role))
        db.session.commit()

    @staticmethod
    def update_account(email, username, password, role, avatar, profile, time):
        db.session.query(AccountModel).get(email).update(
            {'username': username, 'password': password, 'role': role, 'avatar': avatar, 'profile': profile, 'time': time})
        db.session.commit()

    def delete_account(self, email):
        self.search_account_by_email(email).delete()
        db.session.commit()


