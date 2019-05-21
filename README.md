# midterm_Deathers (Deadline + Weather)
A web app fore users to view deadlines and weather

Link
---
* Github repo：https://github.com/hsiehjackson/midterm_Deathers.git
* Heroku link：https://hsiehjackson-deathers.herokuapp.com/

How to start?
---
1. ``git clone`` the repository
2. ``npm install`` to install node modules
3. Setup your own ``.env`` file 
    - [x] MONGODB_URI
    - [x] ENV (development || deployment)
    - [x] PORT (whether to use 3000 for deployment)
4. Development (default)
    * ``npm run client`` to run client
    * ``npm run server`` to run server
    * Open browsers on ``localhost:3000``
6. Deployment
    * ``npm run build`` to build the static files
    * ``npm start`` to run the app
    * Open browsers on ``localhost:3000``


How to use?
---
Home           |  Weather
:-------------------------:|:-------------------------:
<img src="https://i.imgur.com/0R8Xp82.jpg" alt="drawing" width="1200" height="250"/>  | <img src="https://i.imgur.com/n6G7v30.jpg" alt="drawing" width="1200" height="250"/>
Deadline          |  Calendar
<img src="https://i.imgur.com/FaSGnKL.jpg" alt="drawing" width="1200" height="250"/>  | <img src="https://i.imgur.com/IkTQ3au.jpg" alt="drawing" width="1200" height="250"/>

* Home：View the most urgent and uncompleted deadlines
* Weather：View the weather forecast in given location
* Deadline：View the deadlines you had set
* Calendar：View the calendar with deadlines and weather

Other details
---
* Project stage
>   1. Todolist 
>   2. Todolist with deadlines
>   3. Calendar with deadlines
>   4. Home with countdown of deadlines
>   5. Weather forecast 
>   6. Calendar with weather
* The weather may be a little inaccurate.
* The deadlines are all setting at 23:59.
* The deadlines in calendar should scroll to show the whole name

Reference
---
* Icons
https://material.io/tools/icons/
* React countdown timer app
https://github.com/Tosunami/react-date-countdown-timer
* React weather app
https://github.com/bmorelli25/React-Weather-App
* React calendar app
https://github.com/yugisu/habender
* Heroku deployment tutorial
https://coursework.vschool.io/deploying-mern-with-heroku/
* MERN teaching material
https://youtu.be/PBTYxXADG_k



Contribution
---
基本上先自行研究如何拿之前作業，完成有後端的todolist，再增加deadlines可以排序。接著先看別人已完成的application，包含calendar，coundown-timer，以及weather等等，再以todolist的框架下新增這些額外功能。原則就是看懂別人的方法，我的project上實作出來，更改css符合設計，增加後端儲存資訊，最後**Deathers**就誕生了。



Future Work
---
其實本來目標是想針對學生族群做一個好幫手，希望能讓學生使用者更方便。
- [ ] 新增課表
- [ ] 新增上傳檔案功能，比如說當天上課投影片之類的
- [ ] 新增線上編輯pdf畫重點，作筆記功能
- [ ] 完成上學好幫手


Reflection
---
剛開始只是想要以todolist當作練習後端，變成直接以此當作midterm project。為什麼將deadline和weather結合，是因為我一直在想什麼樣的動機會讓我們想看待作事項，就想到我們每天都會看天氣(可能只有我QQ)。所以如果你看天氣的同時，會撇一眼待辦事項的話，那我就成功了。


