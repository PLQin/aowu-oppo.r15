
/*
* @Description: “蚂蚁森林”辅助脚本
* @Author: Raymond [https://github/plqin]
* @Updated: 2019-01-06 08:55
* @Created: 2018-12-31 19:07
* @Device: oppo r15
* @System: LineageOS 15.1 (Based on Android 8.1.0)
* @Auto.js Version: 4.0.1 Beta
* @Permission: Root Access / Screen Capture / Suspension Window
*/



function collectMyOwnEnergy() {
  toastLog("下面开始收集我自己的能量");

  if (!requestScreenCapture()) {
    toastLog("请求截图失败");
    exit();
  }

  var colorGreen = "#C3FF60";
  var countTopLimit = 10;//通过限制次数来保证程序陷入的情况下也能够退出
  var img = captureScreen();
  //toastLog("循环"+num);
  var pointEnergyBall = findColor(img, colorGreen, { region: [0, 0, 800, 800], threshold: 10 });
  while (pointEnergyBall) {
    toastLog("(^_^)");
    click(pointEnergyBall.x, pointEnergyBall.y + 20);
    sleep(1000);
    countTopLimit--;
    if (countTopLimit <= 0) {
      toastLog("已经到了最大次数，程序退出");
      break;
    }
    img = captureScreen();
    pointEnergyBall = findColor(img, colorGreen, { region: [0, 0, 800, 800], threshold: 10 });
  }
  toastLog("收集我自己的能量结束");
  sleep(1000);
}


module.exports = function () {

  sleep(1000);

  const launchName = '支付宝'
  if (!launchApp(launchName)) {
    toast(launchName + ' App不存在');
    sleep(1000);
    back()
    return
  }
  toastLog("等待" + launchName + "启动");

  sleep(700);
  click("蚂蚁森林");

  sleep(700);
  collectMyOwnEnergy()

  // sleep(1000);
  // back()
}
