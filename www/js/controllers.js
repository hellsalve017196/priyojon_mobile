angular.module('starter.controllers', [])

.controller('regCtrl',function($scope,$cordovaToast,$state,storing_data) {
	$scope.registering = function(data) {
		core_data = $scope.restructure(data);

		flag = storing_data.storing(core_data);

    if(flag)
    {
      $cordovaToast.show("Successfully Stored","long","top").then(function(success) {

        $state.go($state.current,{},{reload:true});

      },function(error) {

        alert("error occured");

      });
    }
    else
    {
      $cordovaToast.show("Error Occured","long","top").then(function(success) {
      },function(error) {

        alert("error occured");

      });
    }


	}

	$scope.restructure = function(data)
	{
      core = [];
      nominee = {'MSISDN':$scope.MSISDN,'RELATION':data['RELATION'],'NAME':data['NNAME'],'AGE':data['NAGE']};
      user = {'MSISDN':$scope.MSISDN,'NAME':data['NAME'],'NID':data['NID'],'AGE':data['AGE'],'NAME':data['NAME'],'INSURANCE_PACK':data['INSURANCE_PACK'],'REGISTRATION_DATE':data['REGISTRATION_DATE'],'ACTIVATION_DATE':data['ACTIVATION_DATE']};
      gui_log = {};
      major = {};

      $scope.MSISDN = "";

      if(localStorage.getItem('admin') != undefined)
      {
        gui_log = {'MSISDN':data['MSISDN'],'REGISTRATION_DATE':data['REGISTRATION_DATE'],'USER_ID':localStorage.getItem('admin')};
      }
      else
      {
        gui_log = {'MSISDN':data['MSISDN'],'REGISTRATION_DATE':data['REGISTRATION_DATE'],'USER_ID':'mobile app'};
      }

      core.push(user);
      core.push(nominee);
      core.push(gui_log);

      major['key'] = data['MSISDN'];
      major[data['MSISDN']] = core;

      return major;
	}
})


.controller('reglistCtrl',function($scope,$cordovaToast,$state,storing_data,data_upload) {

    $scope.list = storing_data.getting_list();

    $scope.upload = function()
    {
        xml = new XMLHttpRequest();

        xml.onreadystatechange = function()
        {
          if(xml.readyState == 4 && xml.status == 200)
          {
            if(xml.responseText == '1')
            {
              $cordovaToast.show("Successfully Uploaded","short","top").then(function (success) {
              }, function (error) {
                alert("error occured");
              });

              url = localStorage.getItem("url");
              admin = localStorage.getItem("admin");

              localStorage.clear();

              localStorage.setItem("url",url);
              localStorage.setItem("admin",admin);


              $state.go($state.current,{},{reload : true});
            }
            else
            {
              $cordovaToast.show("Error Occured","short","top").then(function (success) {
              }, function (error) {
                alert("error occured");
              });
            }
          }
        }

        xml.open("POST","http://114.130.13.217/priyojon_defense/mobile/getting_file",true);
        xml.setRequestHeader("Content-type","application/x-www-form-urlencoded")
        xml.send("packet="+JSON.stringify(localStorage.getItem("local_data")));
    }

  })

.controller('removeCtrl', function ($scope,$stateParams,storing_data,$state) {
      key = $stateParams.key;
      flag = storing_data.removing_from_list(key);

      $state.go('app.registration_list',{},{reload:true});
  })


.controller('selfCtrl',function($scope,$cordovaToast,self_setup) {
        $scope.self = self_setup.get_self();

        $scope.set_self = function(data)
        {
          self_setup.set_data(data);
          $scope.self = self_setup.get_self();

          $cordovaToast.show("Successfully set","short","top").then(function (success) {
          }, function (error) {
            alert("error occured");
          });
        }
  })

  .controller('urlCtrl',function($scope,$cordovaToast,url_setup) {

    $scope.web = url_setup.get_url();

    $scope.set_data = function(data)
    {
      url_setup.set_data(data);
      $scope.web = url_setup.get_url();

      $cordovaToast.show("Successfully set","short","top").then(function (success) {
      }, function (error) {
        alert("error occured");
      });
    }
  })


