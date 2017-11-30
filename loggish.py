import redis
import time
from flask import jsonify, Flask, request

NAMESPACE = 'logs:endpoint'
# only necessary in dev env when runing api/web on separate ports
DISABLE_CORS = False

app = Flask(__name__)


class Redis:
    _redis = None

    @classmethod
    def get_instance(cls):
        if cls._redis is None:
            cls._redis = redis.Redis(host='redis', port=6379)
        return cls._redis


@app.route('/v1/logs/')
def all_logs():
    logs = []
    # create an iterator to grab all endpoints within our namespace
    keys = Redis.get_instance().scan_iter('{}:*'.format(NAMESPACE))
    for key in keys:
        endpoint = key.split(':')[2]
        logs.append({'endpoint': endpoint, 'logs': _get_logs(key)})
    response = jsonify({'logset': logs})
    if DISABLE_CORS:
        response.headers.add('Access-Control-Allow-Origin', '*')
    return response


@app.route('/v1/<endpoint>/logs/')
def endpoint_logs(endpoint):
    key = _get_namespace(endpoint)
    ret = {'logs': _get_logs(key)}
    return jsonify(ret)


@app.route('/v1/<endpoint>/')
def loggish(endpoint):
    # log this visit with
    # key:                          value:
    #      logs:endpoint:namespace         unixtime ip
    key = _get_namespace(endpoint)
    # since we're using nginx to proxy, we want the X-Forwarded-For header
    ip_address = request.headers.get('X-Forwarded-For', request.remote_addr)
    value = '{} {}'.format(time.time(), ip_address)
    Redis.get_instance().rpush(key, value)
    return jsonify({'message': 'hello world'})


def _get_logs(key):
    entries = Redis.get_instance().lrange(key, 0, -1)
    entries = [e.split() for e in entries]
    return [{'timestamp': e[0], 'ip': e[1]} for e in entries]


def _get_namespace(endpoint):
    return '{}:{}'.format(NAMESPACE, endpoint)
