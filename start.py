#!/usr/bin/env python

import json
import yaml
import codecs
import subprocess
from functools import partial
from ConfigParser import ConfigParser

CONFIG_FILE_PATH = './init.prod.conf'
WEB_CONFIG_DIR = './web'
SERVER_CONFIG_DIR = './server'
MONGO_CONFIG_DIR = './mongo'

configParser = ConfigParser()
configParser.read(CONFIG_FILE_PATH)
serverConfig = partial(configParser.get, section='server')
mongoConfig = partial(configParser.get, section='mongo')

web_config_to_dump = dict()
mongo_config_to_dump = dict()


def concatMongoUri():
    uri = mongoConfig(option='host') + ':' + mongoConfig(option='port')
    user, pwd = mongoConfig(option='user'), mongoConfig(option='pwd')

    if (mongoConfig(option='auth') and (not user or not pwd)):
        print 'auth must provide name and pwd'
    else:
        uri = user + ':' + pwd + '@' + uri
    return 'mongodb://' + uri


def createServerConfigFile():
    config = dict()
    config['port'] = int(serverConfig(option='port'))
    config['db'] = concatMongoUri()
    config['db-options'] = dict(db={}, server={})
    if bool(serverConfig(option='use_db_native_parser')):
        config['db-options']['db']['native_parser'] = True
    if bool(serverConfig(option='auto_reconnect_db')):
        config['db-options']['server']['auto_reconnect_db'] = True
    if serverConfig(option='db_pool_size'):
        config['db-options']['server']['poolSize'] = int(serverConfig(
            option='db_pool_size'))
    else:
        config['db-options']['server']['poolSize'] = 5
    with codecs.open(SERVER_CONFIG_DIR + '/config.prod.json', 'wb', 'utf-8') as wf:
        json.dump(config, wf)


def createWebConfigFile():
    config = dict(server={})
    config['server']['port'] = serverConfig(option='port')
    config['server']['host'] = serverConfig(option='host')
    with codecs.open(WEB_CONFIG_DIR + '/config.prod.json', 'wb', 'utf-8') as wf:
        json.dump(config, wf)


def createMongoConfigFile():
    config = dict(net={}, security={})
    config['net']['port'] = int(mongoConfig(option='port'))
    config['net']['bindIp'] = mongoConfig(option='host')
    if bool(mongoConfig(option='auth')):
        config['security']['authorization'] = 'enabled'
    else:
        config['security']['authorization'] = 'disabled'
    with codecs.open(MONGO_CONFIG_DIR + '/mongo.conf', 'wb', 'utf-8') as wf:
        yaml.dump(config, wf, default_flow_style=False)


if __name__ == '__main__':
    # init server config file
    createServerConfigFile()
    # init web config file
    createWebConfigFile()
    # init mongo config file
    createMongoConfigFile()
    # run docker compose
    subprocess.call(['docker-compose', 'up'])
