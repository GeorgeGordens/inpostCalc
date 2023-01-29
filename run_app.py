import bottle

from beaker.middleware import SessionMiddleware
from bottle import route, run, template

from src import config


@route('/')
@route('/index')
def page_main():
    content = {
        'current_user': 'nickname',
        'app_version': '0.0.1'
    }
    return template('index', content)


# Session settings
session_opts = {
    'session.type': 'file',
    'session.cookie_expires': 300,
    'session.data_dir': '../.session_data',
    'session.auto': True
}

run(server='paste', app=SessionMiddleware(bottle.app(), session_opts), host=config.HOST, reloader=False,
    port=config.PORT, debug=False)
