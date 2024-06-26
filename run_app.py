import os
import sys
import bottle

from beaker.middleware import SessionMiddleware
from bottle import route, run, static_file, template

from src import config

# root directory of the app, needs for correct routing of static files (e.g. images)
dir_name = os.path.dirname(sys.argv[0])

def page(page_name, content):
    content['current_user'] = 'username'
    content['app_version'] = config.APP_VERSION
    return template(page_name, content)

@route('/')
@route('/index')
def page_main():
    content = {}
    return page('index', content)


@route('/img/<filename:re:.*\.png>')
@route('/img/<filename:re:.*\.jpg>')
def send_img(filename):
    return static_file(filename, root=dir_name + '/static/img')


@route('/js/<filename:re:.*\.js>')
def send_js(filename):
    return static_file(filename, root=dir_name + '/static/js')


@route('/favicon.ico')
def send_favicon():
    return static_file('favicon.ico', root=dir_name + '/static')


# Session settings
session_opts = {
    'session.type': 'file',
    'session.cookie_expires': 300,
    'session.data_dir': '../.session_data',
    'session.auto': True
}

run(server='paste', app=SessionMiddleware(bottle.app(), session_opts), host=config.HOST, reloader=True,
    port=config.PORT, debug=True)
