@echo off
title Starting Node.js Server and React App

echo Starting Node.js server...
start cmd /k "cd /d D:\Users\Pc\Github\PokePeepdle && node server/index.js"

echo Starting React app...
start cmd /k "cd /d D:\Users\Pc\Github\PokePeepdle\client && npm start"

echo All services started. You can close this window.
::pause
