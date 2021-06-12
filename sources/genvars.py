#!/bin/env python
import os

data = {}

OPTIONAL = set(['tattoos', 'glasses', 'facialhairs', 'accessories'])

IGNORED = set([os.path.curdir, os.path.join(os.path.curdir, 'skincolor')])

for root, dirs, files in os.walk(os.path.curdir):
    if root in IGNORED:
        continue
    d = data[root[2:]] = []
    pfx = root[2] + '_'
    for fname in files:
        if fname.endswith('.svg'):
            try:
                d.append(fname[:-4])
            except IndexError:
                pass

data['hairstyles'] = list(set(data['hair_front'] + data['hair_back']))
del data['hair_front']
del data['hair_back']

for k, v in sorted(data.items()):
    if v:
        if k in OPTIONAL:
            tmp = []
            for name in list(v):
                tmp.extend([name, 'none'])
            v = tmp
        print("const %s = %r;"%(k, list(sorted(v))))
