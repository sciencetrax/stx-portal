@ECHO OFF
call etc\env.bat

call "C:\Program Files\nodejs\nodevars.bat"
cd ..\Projects\StudyTrax.Web.Services\apps
call npm install
npm install -g grunt-cli
pause
