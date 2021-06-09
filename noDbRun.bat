prompt NoteKeep with FileSystem
echo off
cls
start /min cmd /k "cd .\src\app && node api.js"
start /min cmd /k "ng serve --port 4201 --open "
exit