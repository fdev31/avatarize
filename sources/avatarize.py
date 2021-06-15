#!/bin/env python
import os
import sys
from bs4 import BeautifulSoup

def getHeader(uid):
    return f'\n<svg e="{uid}" height="360px" id="{uid}" viewbox="0 0 360 360" width="360px" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">'

svg_fragments = []

all_data = {}

def extractContent(content):
    if content.name in ('circle', 'ellipse', 'path', 'polygon'):
        return str(content)
    return ''

def digestSVG(name, data):
    visibility = "visible" if name == "skin" else "hidden"
    all_data['current'].append(f'<g class="%s" style="visibility: {visibility};">'%name)
    soup = BeautifulSoup(data, 'html.parser')
    for i, svg in enumerate(soup.find('svg')): # expect 1
        try:
            all_data['current'].append(''.join(extractContent(x) for x in svg.contents))
        except AttributeError:
            pass
#     assert i == 0
    all_data['current'].append('</g>')

for root, dirs, files in os.walk('.'):
    if root == '.':
        continue
    all_data['current'] = []
    all_data[root[2:]] = all_data['current']

    all_data['current'].append(f'\n<g class="{root[2:]}">')
    for fname in sorted(files):
        digestSVG(
                fname[:-4],
                open(os.path.join(root, fname)).read(),
                )
    all_data['current'].append('</g>')

del all_data['current']

print(getHeader('avatars'))
names = 'hair_back skincolor tattoos eyes eyebrows clothes mouths hair_front facialhair accessories glasses'.split()
for name in names:
    print(''.join(all_data[name]))
print('</svg>')
