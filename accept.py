"""
Python script to accept or refuse the pending requests to add words.
"""

import gi
gi.require_version('Gtk', '3.0')
from gi.repository import Gtk as gtk
import json

def accept(item) -> None:
    print('Saving item', item.sub)
    
    src = json.load(open('src.json', 'r'))
    
    src[item.sub['type']].append(item.sub['value'])
    
    open('src.json', 'w').write(json.dumps(src))
    
    refuse(item) # remove item from list

def refuse(item) -> None:
    print('Removing item', item.sub)
    
    for i, el in enumerate(waiting):
        if el['type'] == item.sub['type'] and el['value'] == item.sub['value']:
            waiting.pop(i)
            break

    open('waiting.json', 'w').write(json.dumps(waiting))

app = gtk.Window()
app.set_title('rat-check')
box = gtk.VBox()

waiting:list = json.load(open('waiting.json'))

for submition in waiting:
    # Create a new line
    
    label = gtk.Label(label = f'{submition["type"]} -> "{submition["value"]}"')
    acc = gtk.Button(label = 'V')
    ref = gtk.Button(label = 'X')
    
    acc.sub = submition
    ref.sub = submition
    
    acc.connect('clicked', accept)
    ref.connect('clicked', refuse)
    
    line = gtk.HBox(spacing = 3)
    line.add(label)
    line.add(acc)
    line.add(ref)
    box.add(line)

app.add(box)
app.connect('destroy', gtk.main_quit)
app.show_all()
gtk.main()