# Vuedows 3.11

Just a little fun project trying to reimplement the Windows 3.11 UI in Typescript and Vue.

![Screenshot](screenshot.png?raw=true "Screenshot")

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

Double clicking the desktop creates a new window (testing only).

# Development run

```
npm run serve
```

Sass needs to be started separately:
```
npm run sass:watch
```
