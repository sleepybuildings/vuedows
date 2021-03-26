# Vuedows 3.11

A reimplementation of the Windows 3.11 shell in CSS, Typescript and Vue...  ¯\\_(ツ)_/¯

![Screenshot](screenshot.png?raw=true "Its amazing!")

Supported are the follow things:

- Window creation
- Window z ordering and activation 
- Maximize and restore a window 
- Window dragging
- Window resizing (all 8 corners)
- Basic command buttons

Broken:

- Application instance handling. Exiting an app somehow screws up the instance handling.

Missing

- All the rest.

# Development run

```
npm run serve
```

Sass needs to be started separately:
```
npm run sass:watch
```
Double clicking the desktop creates a new window (testing only).
