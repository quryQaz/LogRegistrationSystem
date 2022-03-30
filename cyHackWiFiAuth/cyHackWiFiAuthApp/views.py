from django.shortcuts import render
from django.http import JsonResponse
import json
import pathlib
import os
from datetime import datetime

def get_client_address(meta):
    if meta.get('HTTP_X_FORWARDED_FOR'):
        return meta.get('HTTP_X_FORWARDED_FOR').split(',')[-1].strip()
    else:
        return meta.get('REMOTE_ADDR', 'No ip found in request')


def save_user(request):
    data = json.loads(request.body.decode('utf-8'))


    log_path = pathlib.Path(str(pathlib.Path().resolve()) + '../../logs').resolve()
    folder_name = str(datetime.now().date())
    folder_path = pathlib.Path(str(log_path) + '/' + folder_name).resolve()

    print(folder_path)

    file_name = str(datetime.now().strftime('%d-%m-%Y_%H'))

    if not os.path.exists(folder_path):
        os.makedirs(folder_path)

    save_data = {'data': data, 'ip': get_client_address(request.META)}
    save_data = str(datetime.now().isoformat()) + " | " + str(get_client_address(request.META)) + ' | ' + data.get('name') + ' | ' + data.get('group') + ' | ' + data.get('team_name')

    full_path = str(folder_path) + '/' + file_name
    if not os.path.exists(full_path):
        with open(full_path, 'a') as file:
            file.write('         TimeStamp         | Ip Address | UserName | User Group | Team Name\n')
            file.close()

    with open(full_path, 'a') as file:
        file.write(save_data + '\n')
        file.close()

    return JsonResponse({'message':'ok'})
