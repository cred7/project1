from core.settings import *

CELERY_BROKER_URL = "amqp://guest:guest@rabbitmq:5672//"
CELERY_RESULT_BACKEND = "rpc://"
CELERY_ACCEPT_CONTENT = ["json"]
CELERY_TASK_SERIALIZER = "json"
CELERY_RESULT_SERIALIZER = "json"

