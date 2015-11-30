angular.module('starter.services',[])

//storing data
.service('storing_data',function() {

	this.many_data = [];

	this.storing = function(data)
	{
    flag = true;

		if(localStorage.getItem('local_data') == undefined)
		{
			this.many_data.push(data);
			localStorage.setItem("local_data",JSON.stringify(this.many_data));
		  flag = true;
    }
		else
		{
      exist = JSON.parse(localStorage.getItem("local_data"));
      exist.push(data);

      localStorage.setItem("local_data",JSON.stringify(exist));
		  flag = true;
    }

    return flag;
	}

  this.getting_list = function()
  {
      list = [];

      if(localStorage.getItem("local_data") != undefined)
      {
        sub = JSON.parse(localStorage.getItem("local_data"));
        list = sub;
      }

      return list;
  }

  this.removing_from_list = function(key)
  {
      if(localStorage.getItem("local_data") != undefined)
      {
        main_list = JSON.parse(localStorage.getItem("local_data"));
        temp = [];

        localStorage.removeItem("local_data");

        for(i=0;i<main_list.length;i++)
        {
          if(main_list[i]['key'] != key)
          {
            temp.push(main_list[i]);
          }
        }

        localStorage.setItem("local_data",JSON.stringify(temp));
      }
  }

	return this;

})


//uploading to main server
  .service('data_upload',[function () {
      var sending = function () {
        var request;
        if (window.XMLHttpRequest) {
          request = new XMLHttpRequest();
        }

        try{
          if(localStorage.getItem("local_data") != undefined)
          {
            if(localStorage.getItem("url") != undefined && localStorage.getItem("local_data").length > 2)
            {
              request.open('POST', "http://"+localStorage.getItem("url"), false);
              request.setRequestHeader("Content-type","application/x-www-form-urlencoded");
              request.send("packet="+localStorage.getItem("local_data"));
            }
            else
            {
              throw "Invalid Url Or empty packet";
            }
          }
          else
          {
            throw "There are no data to upload";
          }

        }
        catch(e)
        {
          return e;
        }

        if (request.status === 200) {
          alert(request.responseText)
          return request.responseText;
        }
      }

      return sending;
  }])

// setting url
.service('url_setup',function() {
      this.set_data = function(url)
      {
        localStorage.setItem("url",url);
      }

      this.get_url = function()
      {
        url = '';
        if(localStorage.getItem("url") != undefined)
        {
          url = localStorage.getItem("url");
        }

        return url;
      }
  })

//self setup
.service('self_setup',function() {
      this.set_data = function(phone)
      {
        localStorage.setItem('admin',phone);
      }

      this.get_self = function()
      {
        phone = '';

        if(localStorage.getItem('admin') != undefined)
        {
          phone = localStorage.getItem('admin');
        }

        return phone;
      }
  })
