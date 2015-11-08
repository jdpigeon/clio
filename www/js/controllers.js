
angular.module('commons', ['lodash','ionic', 'ui.router','ngCordova'])
  .controller('BodyController', function ($rootScope, $scope, $state,Records, $stateParams,$cordovaLaunchNavigator, $cordovaGeolocation,$ionicPlatform,$ionicHistory,$cordovaDeviceMotion, $timeout) {
    var style = document.createElement("style");
    style.type = "text/css";
    style.innerHTML = 'body .pane {background: transparent;}';//custom css
    style.style = style
    $scope.Math = window.Math;
    $scope.result={}
    $scope.img={
      default:"img/ionic.png",
      retry:"img/ionic.png",
      scan:"img/ionic.png"
    }
    $scope.INTERVAL_RECORDS=100;
    $scope.record={}
    $scope.records=[]
    $scope.segement=[]
    $scope.isNumber =function (n) {
      return !isNaN(parseFloat(n)) && isFinite(n);
    }
    $scope.isFloatEqual = function(m,n){
      return $scope.Math.abs(m - n) < 0.0000001
    }
    $scope.toFix2 = function(num){
      return $scope.Math.round(num * 100) / 100
    }
    $scope.getNextValidAlpha = function(records){
      return $scope.getNextValidSegment(records,"ALPHA_ABS",0,3);
    }
    $scope.getNextValidSegment = function(records,tag,i1,i2){
        var key=0;
      while(true){
        if(!records || key>=records.length){
          return []
        }else if (!records[key].hasOwnProperty(tag)){
          return []
        } else {
          for(var k in records[key][tag]){
            var n = records[key][tag][k]
            if((i1 == k|| i2 == k) && $scope.isNumber(n) && !$scope.isFloatEqual(n,0.0)){
              console.log(key+":"+n);
              return records.slice(key, records.length);
            }
          }
          key+=$scope.INTERVAL_RECORDS
        }
      }
    }
    $scope.getATDratio = function(records){
      return $scope.toFix2($scope.AlphaPower(records)/$scope.ThetaDeltaPower(records))
    }
    $scope.getSUMratio = function(records){
      return $scope.toFix2($scope.Math.pow( 2.71828,$scope.AlphaSum(records))/$scope.Math.pow(2.71828,$scope.ThetaDeltaSum(records)))
    }
    $scope.getScore = function(records){
      var ratio = (Math.pow(2.71828, $scope.AlphaPower(records)) + Math.pow(2.71828, $scope.BetaPower(records))) / Math.pow(2.71828, $scope.ThetaPower(records))
      return ($scope.toFix2((ratio / 1.8) * 100)||0.00) + '%'
    }
    $scope.minute=60*1000
    $scope.mean = function(records,tag1,tag2){
      var sum=0.0
      var size=0
      angular.forEach(records, function(record, key) {
        if(tag1 && record.hasOwnProperty(tag1) && record[tag1].length>3){
          if(size%100==0){
            console.log(parseFloat(record[tag1][0]))
          }
          sum+=(parseFloat(record[tag1][0])||0+parseFloat(record[tag1][3])||0)
          size+=2
        }
        if(tag2 && record.hasOwnProperty(tag2) && record[tag2].length>3){
          sum+=(parseFloat(record[tag2][0])||0+parseFloat(record[tag2][3])||0)
          size+=2
        }
      });
      console.log(sum+":"+size)
      if(size==0)
        return
      else
        return $scope.toFix2(sum/size)
    }
    $scope.sum = function(records,tag1,tag2){
      var sum=0.0
      var size=0
      angular.forEach(records, function(record, key) {
        if(tag1 && record.hasOwnProperty(tag1) && record[tag1].length>3){
          if(size%100==0){
            console.log(parseFloat(record[tag1][0]))
          }
          sum+=(parseFloat(record[tag1][0])||0+parseFloat(record[tag1][3])||0)
          size+=2
        }
        if(tag2 && record.hasOwnProperty(tag2) && record[tag2].length>3){
          sum+=(parseFloat(record[tag2][0])||0+parseFloat(record[tag2][3])||0)
          size+=2
        }
      });
      console.log(sum+":"+size)
      if(size==0)
        return
      else
        return sum
    }
    $scope.AlphaSum = function(records){
      var x = $scope.sum(records,"ALPHA_ABS")
      console.log("AlphaSum:"+x)
      return x
    }
    $scope.ThetaDeltaSum = function(records){
      var x = $scope.sum(records,"THETA_ABS","DELTA_ABS")
      console.log("ThetaDeltaSum:"+x)
      return x
    }
    $scope.AlphaPower = function(records){
        var x = $scope.mean(records,"ALPHA_ABS")
        console.log("AlphaPower:"+x)
        return x
    }
    $scope.BetaPower = function(records){
      var x = $scope.mean(records,"BETA_ABS")
      console.log("BetaPower:"+x)
      return x
    }
    $scope.ThetaPower = function(records){
      var x = $scope.mean(records,"THETA_ABS")
      console.log("ThetaPower:"+x)
      return x
    }
    $scope.ThetaDeltaPower = function(records){
      var x = $scope.mean(records,"THETA_ABS","DELTA_ABS")
      console.log("ThetaDeltaPower:"+x)
      return x
    }
    $scope.connectionState=""
    $scope.isConnected=false
    $scope.go = function(stateName) {
      if(stateName){
        console.log(stateName)
        $state.go(stateName)
      }
    }






    // Expose $state and $stateParams to the <body> tag
    $scope.$state = $state;
    $scope.$stateParams = $stateParams;

    //extra functions
    $scope.equalShow=function(name,stateName){
      if(name==stateName)
        return true
      return false
    }
    $scope.equalNotShow=function(name,stateName){
      if(name==stateName)
        return false
      return true
    }
    $scope.CallTel = function(tel) {
      window.location.href = 'tel:'+ tel;
    }

    $scope.goBack = function(){
      $ionicHistory.goBack()
    }
    $scope.goThere=function(id){
      console.log(id);
      $state.go('tab.thing-detail',{thingId: id})
    }
    $scope.log = function(code,message){
      console.log(code+":"+message)
    }
    $scope.logObj = function(obj){
      console.log("Stringify:"+JSON.stringify(obj))
    }
    $scope.err = function(err){
      console.log(err.code+":"+err.message)
    }
    //Things.set(Recommend.search(lat,long,$scope.user.time/10,10));
    $scope.getForwardStateName = function(){
      //var history = $ionicHistory.viewHistory();
      //return history.histories[$ionicHistory.currentHistoryId()].stack[0].stateName
      return $ionicHistory.forwardView().stateName;
    }
    $scope.getBackwardStateName = function(){
      //var history = $ionicHistory.viewHistory();
      //return history.histories[$ionicHistory.currentHistoryId()].stack[0].stateName
      return $ionicHistory.backView().stateName;
    }





  });

angular.module('starter.controllers', ['commons'])
  .controller('DashCtrl', function ($scope,$ionicPlatform,Records,$timeout,_) {
    var success= function(returnMsg) {
      var museDataContainer = document.getElementById('museSuccessContainer');
      //museDataContainer.innerHTML = JSON.stringify(returnMsg);
      museDataContainer.innerHTML=returnMsg
      console.log("success")
      console.log(returnMsg)
    }
    var error= function(returnMsg) {
      var museDataContainer = document.getElementById('museErrorContainer');
      //museDataContainer.innerHTML = JSON.stringify(returnMsg);
      museDataContainer.innerHTML=returnMsg
      console.log("error")
      console.log(JSON.stringify(returnMsg))
    }
    $scope.lodashTest = {
      getText: function(){
        var x = [1, 2, 3, 4];
        var text = "";
        _.each(x, function(x){
          text += x;
        })
        return text; // Returns '1234'
      }
    }
    $scope.connectToMuse=function(stateName){
      $scope.go(stateName)
      $ionicPlatform.ready(function(){
        //muse.getMuseList(success,error)
        //muse.disconnectMuse(function(){},error)
        /*muse.connectToMuse(function(state){
          $scope.$apply(function () {
            $scope.connectionState=state
            console.log("connectionState:"+state)
            $scope.img.scan="img/right.png"
            if($scope.connectionState=="CONNECTED" || $scope.connectionState=="CONNECTING" ){
              console.log("isConnected:true")
              $scope.isConnected=true
              $scope.img.scan="img/right.png"
            }
          })
        })*/
      });
    }

    $scope.$on('$ionicView.beforeEnter', function () {

    });

    $scope.$on('$ionicView.enter', function () {

      console.log("$ionicView.enter")


    });

  })
  .controller('ScanCtrl', function ($scope,$ionicPlatform,Records,$timeout,_) {

    var museStartRecording = function(){
      $ionicPlatform.ready(function(){
        muse.connectToMuse(function(state){
          $scope.connectionState=state
          console.log("connectionState:"+state)
          muse.startRecording(function(){
            Records.reset()
            $scope.isConnected=true
            muse.setWatch(function(record){
              Records.addRecord(record)
              console.log(JSON.stringify(record))
              $scope.$apply(function () {
                $scope.record=record
              });
            })
          })
        })
      })

    }
    var imgUpdate = function(){
      $scope.img.scan="img/right.png"
      $scope.img.retry="img/right.png"
    }


    $scope.startRecording=function(stateName) {
      $scope.go(stateName)

    }
    $scope.$on('$ionicView.beforeEnter', function () {
        $scope.img.scan=$scope.img.default
    });

    $scope.$on('$ionicView.enter', function () {

      console.log("$ionicView.enter")


    });

  })
  .controller('ScanningCtrl', function ($scope,$ionicPlatform,Records,$timeout,_) {

    $scope.lodashTest = {
      getText: function(){
        var x = [1, 2, 3, 4];
        var text = "";
        _.each(x, function(x){
          text += x;
        })
        return text; // Returns '1234'
      }
    }
    /*$scope.stopRecording=function(){
     $ionicPlatform.ready(function(){
     muse.stopRecording(function(){
     muse.disconnectMuse(success,error)
     },error)
     });
     }

     $scope.startRecording=function(){

     $ionicPlatform.ready(function(){
     muse.getMuseList(success,error)
     //muse.disconnectMuse(function(){},error)
     muse.connectToMuse(function(){
     //muse.testConnection(success,error)
     muse.startRecording(function(){
     Records.reset()
     muse.setWatch(function(record){
     Records.addRecord(record)
     //console.log(JSON.stringify(record))
     $scope.$apply(function () {
     $scope.record=record
     });
     },error)

     $timeout(function(){
     muse.stopRecording(function(){
     $scope.segement = $scope.getNextValidAlpha(Records.all())
     console.log("ATDratio enter"+$scope.segement.length)
     $scope.$apply(function () {
     $scope.ATDratio = $scope.toFix2($scope.AlphaPower($scope.segement)/$scope.ThetaDeltaPower($scope.segement))
     });
     },error)
     },$scope.minute/2)
     },error)
     },error)

     });
     }*/


    $scope.$on('$ionicView.beforeEnter', function () {

    });

    $scope.$on('$ionicView.enter', function () {
        $ionicPlatform.ready(function () {
          muse.connectToMuse(function () {
            //muse.testConnection(success,error)
            muse.startRecording(function () {
              Records.reset()
              muse.setWatch(function (record) {
                Records.addRecord(record)
                //console.log(JSON.stringify(record))
                $scope.$apply(function () {
                  $scope.record = record
                });
              })
            })
            $timeout(function(){
              muse.stopRecording(function(){
                $scope.segement = $scope.getNextValidAlpha(Records.all())
                console.log("ATDratio enter"+$scope.segement.length)
                if($scope.segement.length<1){
                  $scope.go("tab.scan")
                } else {
                  $scope.$apply(function () {
                    $scope.result.ATDratio = $scope.getATDratio($scope.segement)
                    //$scope.result.SUMratio=$scope.getSUMratio($scope.segement)
                    $scope.result.Score=$scope.getScore($scope.segement)
                  });
                  $scope.go("tab.result")
                }
              })
            },$scope.minute/2)
          })
        })
      console.log("Scanning View.enter")


    });

  })
  .controller('ResultCtrl', function ($scope,$ionicPlatform,Records,$timeout,_) {


    $scope.$on('$ionicView.beforeEnter', function () {

    });

    $scope.$on('$ionicView.enter', function () {

    });

  })
  .controller('ResultDetailCtrl', function ($scope,$ionicPlatform,Records,$timeout,_) {


    $scope.$on('$ionicView.beforeEnter', function () {
      $scope.img.retry=$scope.img.default
    });

    $scope.$on('$ionicView.enter', function () {

    });

  })
