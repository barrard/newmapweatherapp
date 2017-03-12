(function(){




  var userInfoBtn = $('#userInfoBtn')
  userInfoBtn.on('click', function(){
    displayUserInfo()
  })

  function displayUserInfo(){
    if($('#userInfoDisplay').length>0){
      console.log('fade out user info')
      $('#userInfoDisplay').addClass("animated fadeOut")
      .on('animationend', function(){
        $(this).remove()
      })
      return
    }else{
      console.log('user Info fade IN display')
      $('body').append(`
          <div id="userInfoDisplay"class="animated fadeIn">
      
          </div>
        `)
      var userInfoDisplay=$('#userInfoDisplay')
      userInfoStr= '';
      userInfoStr+= 'Your registrationId for push is:  '+localStorage.getItem('registrationId')
      userInfoStr+= '<hr><br>Your sessionId for your login is:  '+localStorage.getItem('sessionId')
      $(userInfoDisplay).append( userInfoStr)
      if(localStorage.getItem('sessionId')===null){
        $(userInfoDisplay).append(`
          <br><hr>
          <div class='niceDisplay'>
          <input id ="userLoginUsername" class="shelf" type="text" name ='username' placeholder="required name" required><br>
          <input id ="userLoginPassword" class="shelf" type="text" name="password" placeholder="optional password"><br>
          <input onclick= "userLoginBtnClicked()" type="submit" value="login">
           <div id='loginResults' class="shelf"><div>
           </div>
            `)
    }

    }
    // else{
    //   $(userInfoDisplay).append('<span>Welcome user</span>')
    // }
    // $(userInfoDisplay).append( JSON.stringify(userData.serverData.ua, null, 6))
    // $(userInfoDisplay).one('animationend', function(){
    //   $(userInfoDisplay).removeClass('animated jello')
    // })
  }



  console.log(userData)
  //  MAIN MAPGE ui COMPONENTS
  var listEls = document.querySelectorAll('ul.mainNav > li')
  var len = listEls.length;
  for(var x = 0; x<len;x++){
    listEls[x].addEventListener('click', function(e){
     console.log(e.target.parentNode.classList.contains('selectedTab'))
      if(e.target.parentNode.classList.contains('selectedTab') || 
         e.target.classList.contains('selectedTab') ){
        console.log('dont do it')
        return
      }else{
        for(var i = 0;i<len;i++){
          listEls[i].classList.remove('selectedTab')
        }
        if(e.srcElement.localName == 'h3'){
          console.log('h3')
          e.target.parentNode.classList.add('selectedTab')
          MainContentControler(e.target.parentNode.innerText)

        }else{
          e.target.classList.add('selectedTab')
          MainContentControler(e.target.innerText)
        }        
      }

    }, true)
  }

function MainContentControler(div){
  var div = div
  div = div.split("").slice(3).join('').toLowerCase()
  console.log('passing '+ div +" to toggleContent")
  toggleContent(div)   
}

function toggleContent(div){
  console.log('hide show ' + div)

  // $myView = $('#'+div)
  $mySubView = $('#sub-'+div)
  var subArr = $('.subContent').children()
  // var arr = $('.mainContent').children()
  // $.each(arr, function(i, v){
  //   $(v).css('display', 'none')
  // })
  $.each(subArr, function(i, v){
    $(v).css('display', 'none')
  })
  // $myView.css('display')=="none" ? $myView.css('display', 'block') : $myView.css('display', 'none')
  // $myView.css('display', 'block')
  $mySubView.css('display', 'block')
}

})()