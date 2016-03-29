@ECHO OFF
call etc\env.bat

call "C:\Program Files\nodejs\nodevars.bat"
cd ..\Projects\StudyTrax.Web.Services\apps
npm install --quiet -g grunt-cli karma bower
bower install
pause
