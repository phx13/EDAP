from sqlalchemy import MetaData, Table
from sqlalchemy.exc import SQLAlchemyError

from EDAP import db


class ProjectModel(db.Model):
    __tablename__ = 'project'
    __table__ = Table(__tablename__, MetaData(bind=db.engine), autoload=True)

    """
    id: int, primary key, auto_increment
    prjId: varchar
    prjName: varchar
    description: varchar
    time: datetime
    """

    @staticmethod
    def search_all():
        try:
            return db.session.query(ProjectModel).all()
        except SQLAlchemyError:
            return 'server error'

    @staticmethod
    def search_project_by_id(prj_id):
        try:
            return db.session.query(ProjectModel).filter_by(prj_id=prj_id).first()
        except SQLAlchemyError:
            return 'server error'

    @staticmethod
    def create_project(prj_id, prj_name, description, time):
        try:
            db.session.add(ProjectModel(prj_id=prj_id, prj_name=prj_name, description=description, time=time))
            db.session.commit()
        except SQLAlchemyError:
            return 'server error'

    def update_project(self, prj_id, prj_name, description, time):
        try:
            self.search_project_by_id(prj_id).update({'prj_name': prj_name, 'description': description, 'time': time})
            db.session.commit()
        except SQLAlchemyError:
            return 'server error'

    def delete_account(self, prj_id):
        try:
            self.search_project_by_id(prj_id).delete()
            db.session.commit()
        except SQLAlchemyError:
            return 'server error'
