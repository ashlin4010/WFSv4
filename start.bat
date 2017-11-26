@echo off
FOR /F "tokens=2 delims=:" %%a IN ('ipconfig ^| findstr /IC:"IPv4 Address"') DO echo IP Address:%%a
npm start
pause