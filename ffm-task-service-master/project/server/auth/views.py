from flask import Blueprint, request, make_response, jsonify
from flask.views import MethodView
from flask_jwt_extended import jwt_required, get_jwt_identity
from datetime import datetime
from google.cloud import storage
import logging
import os

from project.server import db
from project.server.models import Photos, TaskService, User, DashboardUser, TaskAlbums, TaskPhotos

task_blueprint = Blueprint('task', __name__)
logging.basicConfig(format='%(levelname)s:%(message)s', level=logging.DEBUG)


class AssignTask(MethodView):
    decorators = [jwt_required]

    def post(self):
        post_data = {}
        response_msg = []
        try:
            post_data = request.get_json()

            if post_data.get('title', '') == '':
                response_msg.append('title must be non-empty')
            if post_data.get('is_paid', '') == '':
                response_msg.append('is_paid must be non-empty')
            if post_data.get('assigned_time', '') == '':
                response_msg.append('assigned_time must be non-empty')
            if post_data.get('assigned_location_lattitude', '') == '':
                response_msg.append('assigned_location_lattitude must be non-empty')
            if post_data.get('assigned_location_longitude', '') == '':
                response_msg.append('assigned_location_longitude must be non-empty')
            if post_data.get('assigned_address', '') == '':
                response_msg.append('assigned_address must be non-empty')
            if post_data.get('admin_id', '') == '':
                response_msg.append('admin_id must be non-empty')
            if post_data.get('user_id', '') == '':
                response_msg.append('user_id must be non-empty')

            if len(response_msg) > 0:
                responseObject = {
                    'status': 'failed',
                    'message': response_msg
                }
                return make_response(jsonify(responseObject)), 403
        except Exception:
            response_msg.append('Request body must be non-empty')
            responseObject = {
                'status': 'failed',
                'message': response_msg
            }
            return make_response(jsonify(responseObject)), 403

        user = User.query.filter_by(id=post_data.get('user_id')).first()
        admin = DashboardUser.query.filter_by(id=post_data.get('admin_id')).first()
        if not admin:
            responseObject = {
                    'status': 'fail',
                    'message': 'Admin does not exist. Please try again.'
            }
            return make_response(jsonify(responseObject)), 401
        if user:
            try:
                task = TaskService(
                    title=post_data.get('title'),
                    is_paid=post_data.get('is_paid'),
                    bill_amount=post_data.get('bill_amount', None),
                    assigned_time=post_data.get('assigned_time'),
                    assigned_location_lattitude=post_data.get('assigned_location_lattitude'),
                    assigned_location_longitude=post_data.get('assigned_location_longitude'),
                    assigned_address=post_data.get('assigned_address'),
                    admin_id=post_data.get('admin_id'),
                    user_id=post_data.get('user_id')
                )
                db.session.add(task)
                db.session.commit()

                album = TaskAlbums(task_id=task.id)
                db.session.add(album)
                db.session.commit()

                task.album_id = album.id
                db.session.add(task)
                db.session.commit()

                responseObject = {
                    'status': 'success',
                    'message': 'Task assign successful'
                }
                return make_response(jsonify(responseObject)), 201
            except Exception as e:
                print(e)
                responseObject = {
                    'status': 'fail',
                    'message': 'Insertion failed to database. Check your connection.'
                }
                return make_response(jsonify(responseObject)), 403
        else:
            responseObject = {
                'status': 'fail',
                'message': 'User does not exist. Please try again.',
            }
            return make_response(jsonify(responseObject)), 403


class CompleteTask(MethodView):
    decorators = [jwt_required]

    def put(self, user_id, task_id):
        post_data = {}
        response_msg = []
        try:
            post_data = request.get_json()

            if post_data.get('task_complete_location_lattitude', '') == '':
                response_msg.append('task_complete_location_lattitude must be non-empty')
            if post_data.get('task_complete_location_longitude', '') == '':
                response_msg.append('task_complete_location_longitude must be non-empty')

            if len(response_msg) > 0:
                responseObject = {
                    'status': 'failed',
                    'message': response_msg
                }
                return make_response(jsonify(responseObject)), 403
        except Exception:
            response_msg.append('Request body must be non-empty')
            responseObject = {
                'status': 'failed',
                'message': response_msg
            }
            return make_response(jsonify(responseObject)), 403

        task = TaskService.query.filter_by(id=task_id).first()
        if task:
            if task.user_id != user_id:
                responseObject = {
                    'status': 'failed',
                    'message': 'This user is not assigned for this task.'
                }
                return make_response(jsonify(responseObject)), 403
            try:
                print(get_jwt_identity())
                task.task_complete_time = datetime.utcnow()
                task.task_complete_location_lattitude = post_data.get('task_complete_location_lattitude')
                task.task_complete_location_longitude = post_data.get('task_complete_location_longitude')
                task.notes = '' if post_data.get('notes', '') == '' else post_data.get('notes')
                task.task_complete_status = True

                task.updatedAt = datetime.utcnow()

                db.session.add(task)
                db.session.commit()

                responseObject = {
                    'status': 'success',
                    'message': 'Successfully completed task'
                }
                return make_response(jsonify(responseObject)), 201
            except Exception as e:
                print(e)
                responseObject = {
                    'status': 'fail',
                    'message': 'Insertion failed to database. Check your connection.'
                }
                return make_response(jsonify(responseObject)), 403
        else:
            responseObject = {
                'status': 'fail',
                'message': 'Task not found.'
            }
            return make_response(jsonify(responseObject)), 403


class PaymentUpdate(MethodView):
    decorators = [jwt_required]

    def put(self, user_id, task_id):
        task = TaskService.query.filter_by(id=task_id).first()
        if task:
            if task.user_id != user_id:
                responseObject = {
                    'status': 'failed',
                    'message': 'This user is not assigned for this task.'
                }
                return make_response(jsonify(responseObject)), 403
            try:
                print(get_jwt_identity())
                if task.is_paid is True:
                    task.payment_status = True
                task.updatedAt = datetime.utcnow()

                db.session.add(task)
                db.session.commit()

                responseObject = {
                    'status': 'success',
                    'message': 'Payment Update successful'
                }
                return make_response(jsonify(responseObject)), 201
            except Exception as e:
                print(e)
                responseObject = {
                    'status': 'fail',
                    'message': 'Insertion failed to database. Check your connection.'
                }
                return make_response(jsonify(responseObject)), 403
        else:
            responseObject = {
                'status': 'fail',
                'message': 'Task not found.'
            }
            return make_response(jsonify(responseObject)), 403


class NoteUpdate(MethodView):
    decorators = [jwt_required]

    def put(self, user_id, task_id):
        post_data = {}
        response_msg = []
        try:
            post_data = request.get_json()
            print(post_data)

            if post_data.get('notes', '') == '':
                response_msg.append('notes must be non-empty')

            if len(response_msg) > 0:
                responseObject = {
                    'status': 'failed',
                    'message': response_msg
                }
                return make_response(jsonify(responseObject)), 403
        except Exception:
            response_msg.append('Request body must be non-empty')
            responseObject = {
                'status': 'failed',
                'message': response_msg
            }
            return make_response(jsonify(responseObject)), 403

        task = TaskService.query.filter_by(id=task_id).first()
        if task:
            if task.user_id != user_id:
                responseObject = {
                    'status': 'failed',
                    'message': 'This user is not assigned for this task.'
                }
                return make_response(jsonify(responseObject)), 403
            try:
                print(get_jwt_identity())
                task.notes = '' if post_data.get('notes', '') == '' else str(post_data.get('notes'))

                task.updatedAt = datetime.utcnow()

                db.session.add(task)
                db.session.commit()

                responseObject = {
                    'status': 'success',
                    'message': 'Task note update successful'
                }
                return make_response(jsonify(responseObject)), 201
            except Exception as e:
                print(e)
                responseObject = {
                    'status': 'fail',
                    'message': 'Insertion failed to database. Check your connection.'
                }
                return make_response(jsonify(responseObject)), 403
        else:
            responseObject = {
                'status': 'fail',
                'message': 'Task not found.'
            }
            return make_response(jsonify(responseObject)), 403


class AdminGetTask(MethodView):
    decorators = [jwt_required]

    def get(self, admin_id):
        jwt_admin_id = get_jwt_identity()
        if admin_id != jwt_admin_id:
            responseObject = {
                'status': 'fail',
                'message': 'Valid JWT for Admin required.'
            }
            return make_response(jsonify(responseObject)), 401
        try:
            tasks_list = []
            tasks = TaskService.query.filter_by(admin_id=admin_id).all()
            for task in tasks:
                user = User.query.filter_by(id=task.user_id).first()
                tasks_list.append({
                    "task_id": task.id,
                    "task_complete_status": task.task_complete_status,
                    "user_id": task.user_id,
                    "assigned_to": str(user.first_name + " " + user.last_name),
                    "assigned_to_phone": str(user.phone_number),
                    "title": task.title,
                    "is_paid": task.is_paid,
                    "assigned_time": task.assigned_time,
                    "assigned_location_lattitude": task.assigned_location_lattitude,
                    "assigned_location_longitude": task.assigned_location_longitude,
                    "assigned_address": task.assigned_address,
                    "task_complete_time": task.task_complete_time,
                    "task_complete_location_lattitude": task.task_complete_location_lattitude,
                    "task_complete_location_longitude": task.task_complete_location_longitude,
                    "bill_amount": task.bill_amount,
                    "billing_address": task.billing_address,
                    "notes": task.notes,
                    "album_id": task.album_id,
                    "payment_status": task.payment_status
                })

            responseObject = {
                'status': 'success',
                'message': tasks_list
            }
            return make_response(jsonify(responseObject)), 200
        except Exception:
            responseObject = {
                'status': 'fail',
                'message': 'Failed to load data. Check your connection.'
            }
            return make_response(jsonify(responseObject)), 403


class UserGetTask(MethodView):
    decorators = [jwt_required]

    def get(self, user_id):
        jwt_user_id = get_jwt_identity()
        if user_id != jwt_user_id:
            responseObject = {
                'status': 'fail',
                'message': 'Valid JWT for user required.'
            }
            return make_response(jsonify(responseObject)), 401
        try:
            tasks_list = []
            tasks = TaskService.query.filter_by(user_id=user_id).all()
            for task in tasks:
                tasks_list.append({
                    "task_id": task.id,
                    "task_complete_status": task.task_complete_status,
                    "admin_id": task.admin_id,
                    "title": task.title,
                    "is_paid": task.is_paid,
                    "assigned_time": task.assigned_time,
                    "assigned_location_lattitude": task.assigned_location_lattitude,
                    "assigned_location_longitude": task.assigned_location_longitude,
                    "assigned_address": task.assigned_address,
                    "task_complete_time": task.task_complete_time,
                    "task_complete_location_lattitude": task.task_complete_location_lattitude,
                    "task_complete_location_longitude": task.task_complete_location_longitude,
                    "bill_amount": task.bill_amount,
                    "billing_address": task.billing_address,
                    "notes": task.notes,
                    "album_id": task.album_id,
                    "payment_status": task.payment_status
                })

            responseObject = {
                'status': 'success',
                'message': tasks_list
            }
            return make_response(jsonify(responseObject)), 200
        except Exception:
            responseObject = {
                'status': 'fail',
                'message': 'Failed to load data. Check your connection.'
            }
            return make_response(jsonify(responseObject)), 403


class UploadTaskPhoto(MethodView):
    decorators = [jwt_required]

    def post(self, user_id, task_id):
        try:
            task = TaskService.query.filter_by(id=task_id).first()
            if task:
                if task.user_id != user_id:
                    responseObject = {
                        'status': 'failed',
                        'message': 'This user is not assigned for this task.'
                    }
                    return make_response(jsonify(responseObject)), 403
                dir_path = os.path.dirname(os.path.realpath(__file__))
                bucket_name = 'field-force-app-images'
                storage_client = storage.Client.from_service_account_json(dir_path + '/newtoken.json')
                bucket = storage_client.get_bucket(bucket_name)
                # blobs = bucket.list_blobs()
                # for blob in blobs:
                #     logging.info('Blobs: {}'.format(blob.name))
                #     response_msg.append({
                #         "name": blob.name
                #     })
                task_photo = request.files['photo']
                logging.info('Blobs: {}'.format(task_photo.filename))
                destination_blob_name = 'task/' + 'task-' + str(task_id) + '-' + task_photo.filename
                blob = bucket.blob(destination_blob_name)
                blob.upload_from_file(task_photo, content_type=task_photo.content_type)

                is_photo = TaskPhotos.query.filter_by(album_id=task.album_id).first()
                if is_photo:
                    is_photo.photo_url = destination_blob_name
                    db.session.add(is_photo)
                    db.session.commit()
                else:
                    photo = TaskPhotos(
                        album_id=task.album_id,
                        photo_url=destination_blob_name
                    )
                    db.session.add(photo)
                    db.session.commit()

                return make_response(jsonify({
                    "status": "success",
                    "message": "Photo upload successful"
                })), 201
            else:
                return make_response(jsonify({
                    "status": "fail",
                    "message": "Task is not available."
                })), 403
        except Exception as e:
            logging.info(e)
            return make_response(jsonify({
                "status": "fail",
                "message": "photo uploading failed. Please check your request body."
            })), 403


class GetTaskPhoto(MethodView):
    decorators = [jwt_required]

    def get(self, user_id, task_id):
        try:
            # cdn_url = 'http://34.107.164.80/'
            cdn_url = 'https://files.techserve4u.com/'
            task = TaskService.query.filter_by(id=task_id).first()
            if task:
                if task.user_id != user_id:
                    responseObject = {
                        'status': 'failed',
                        'message': 'This user is not assigned for this task.'
                    }
                    return make_response(jsonify(responseObject)), 403

                photos = TaskPhotos.query.filter_by(album_id=task.album_id).all()
                photolist = []
                for photo in photos:
                    photolist.append(cdn_url + photo.photo_url)
                if len(photolist) > 0:
                    responseObject = {
                        'status': 'success',
                        'data': photolist
                    }
                    return make_response(jsonify(responseObject)), 200
                else:
                    responseObject = {
                        'status': 'success',
                        'data': 'No photos are available for this task.'
                    }
                    return make_response(jsonify(responseObject)), 200
            else:
                return make_response(jsonify({
                    "status": "fail",
                    "message": "Task is not available."
                })), 403
        except Exception as e:
            responseObject = {
                'status': 'fail',
                'message': 'Provide a valid auth token.',
                'msg': e
            }
            return make_response(jsonify(responseObject)), 403


class GetTaskDetails(MethodView):
    decorators = [jwt_required]

    def get(self, user_id, task_id):
        try:
            # cdn_url = 'http://34.107.164.80/'
            cdn_url = 'https://files.techserve4u.com/'
            task = TaskService.query.filter_by(id=task_id).first()
            if task:
                if task.user_id != user_id:
                    responseObject = {
                        'status': 'failed',
                        'message': 'This user is not assigned for this task.'
                    }
                    return make_response(jsonify(responseObject)), 403

                user = User.query.filter_by(id=user_id).first()
                admin = DashboardUser.query.filter_by(id=task.admin_id).first()

                tasks_list = []
                tasks_list.append({
                    "task_id": task.id,
                    "user_id": task.user_id,
                    "task_complete_status": task.task_complete_status,
                    "admin_id": task.admin_id,
                    "admin_name": str(admin.first_name + " " + admin.last_name),
                    "admin_designation": str(admin.designation),
                    "assigned_to": str(user.first_name + " " + user.last_name),
                    "assigned_to_phone": str(user.phone_number),
                    "title": task.title,
                    "is_paid": task.is_paid,
                    "assigned_time": task.assigned_time,
                    "assigned_location_lattitude": task.assigned_location_lattitude,
                    "assigned_location_longitude": task.assigned_location_longitude,
                    "assigned_address": task.assigned_address,
                    "task_complete_time": task.task_complete_time,
                    "task_complete_location_lattitude": task.task_complete_location_lattitude,
                    "task_complete_location_longitude": task.task_complete_location_longitude,
                    "bill_amount": task.bill_amount,
                    "billing_address": task.billing_address,
                    "notes": task.notes,
                    "album_id": task.album_id,
                    "payment_status": task.payment_status
                })

                photos = TaskPhotos.query.filter_by(album_id=task.album_id).all()
                photolist = []
                for photo in photos:
                    photolist.append(cdn_url + photo.photo_url)
                if len(photolist) > 0:
                    tasks_list[0]["photos"] = photolist
                    responseObject = {
                        'status': 'success',
                        'data': tasks_list
                    }
                    return make_response(jsonify(responseObject)), 200
                else:
                    responseObject = {
                        'status': 'success',
                        'data': tasks_list
                    }
                    return make_response(jsonify(responseObject)), 200
            else:
                return make_response(jsonify({
                    "status": "fail",
                    "message": "Task is not available."
                })), 403
        except Exception as e:
            responseObject = {
                'status': 'fail',
                'message': 'Provide a valid auth token.',
                'msg': e
            }
            return make_response(jsonify(responseObject)), 403


class AdminDeleteTask(MethodView):
    decorators = [jwt_required]

    def delete(self, admin_id, task_id):
        try:
            task = TaskService.query.filter_by(id=task_id).first()
            if task:
                if task.admin_id != admin_id:
                    responseObject = {
                        'status': 'failed',
                        'message': 'This admin did not assigned this task.'
                    }
                    return make_response(jsonify(responseObject)), 401

                db.session.delete(task)
                db.session.commit()

                responseObject = {
                    'status': 'success',
                    'message': 'Successfully deleted task'
                }
                return make_response(jsonify(responseObject)), 200
            else:
                return make_response(jsonify({
                    "status": "fail",
                    "message": "Task is not available"
                })), 404
        except Exception as e:
            responseObject = {
                'status': 'fail',
                'message': 'Database operation failed. Please contact your administrator',
                'msg': e
            }
            return make_response(jsonify(responseObject)), 403


class Health(MethodView):
    def get(self):
        responseObject = {
            'status': 'success'
        }
        return make_response(jsonify(responseObject)), 200


health_view = Health.as_view('health_api')
assign_task_view = AssignTask.as_view('assign_task_api')
complete_task_view = CompleteTask.as_view('complete_task_view')
payment_update_view = PaymentUpdate.as_view('payment_update_view')
note_update_view = NoteUpdate.as_view('note_update_view')
admin_get_task_view = AdminGetTask.as_view('admin_get_task_view')
admin_delete_task_view = AdminDeleteTask.as_view('admin_delete_task_view')
user_get_task_view = UserGetTask.as_view('user_get_task_view')
upload_task_photo_view = UploadTaskPhoto.as_view('upload_task_photo_view')
get_task_photo_view = GetTaskPhoto.as_view('get_task_photo_view')
get_task_details_view = GetTaskDetails.as_view('get_task_details_view')

task_blueprint.add_url_rule(
    '/',
    view_func=health_view,
    methods=['GET']
)

task_blueprint.add_url_rule(
    '/api/v1/field-force/task/assign-task',
    view_func=assign_task_view
)

task_blueprint.add_url_rule(
    '/api/v1/field-force/task/complete-task/<int:user_id>/<int:task_id>',
    view_func=complete_task_view
)

task_blueprint.add_url_rule(
    '/api/v1/field-force/task/update-payment/<int:user_id>/<int:task_id>',
    view_func=payment_update_view
)

task_blueprint.add_url_rule(
    '/api/v1/field-force/task/update-note/<int:user_id>/<int:task_id>',
    view_func=note_update_view
)

task_blueprint.add_url_rule(
    '/api/v1/field-force/task/admin-get-tasks/<int:admin_id>',
    view_func=admin_get_task_view
)

task_blueprint.add_url_rule(
    '/api/v1/field-force/task/admin-delete-tasks/<int:admin_id>/<int:task_id>',
    view_func=admin_delete_task_view
)

task_blueprint.add_url_rule(
    '/api/v1/field-force/task/user-get-tasks/<int:user_id>',
    view_func=user_get_task_view
)

task_blueprint.add_url_rule(
    '/api/v1/field-force/task/upload-task-photo/<int:user_id>/<int:task_id>',
    view_func=upload_task_photo_view
)

task_blueprint.add_url_rule(
    '/api/v1/field-force/task/get-task-photos/<int:user_id>/<int:task_id>',
    view_func=get_task_photo_view
)

task_blueprint.add_url_rule(
    '/api/v1/field-force/task/get-task-details/<int:user_id>/<int:task_id>',
    view_func=get_task_details_view
)
