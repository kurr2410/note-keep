prompt NoteKeep with MongoDB
echo off
cls
start /min cmd /k "ng serve --port 4202 --open "
start /min cmd /k "cd .\src\app && node dbApi.js"
exit