(function(){




  var userInfoBtn = $('#userInfoBtn')
  userInfoBtn.on('click', function(){
    displayUserInfo()
  })

  function displayUserInfo(){
    if($('#userInfoDisplay').length>0){
      $('#userInfoDisplay').remove()
      return
    }
    console.log('user Info')
    $('body').append('<div id="userInfoDisplay" class="animated jello"></div>')
    var userInfoDisplay=$('#userInfoDisplay')
    userInfoStr= '';
    $(userInfoDisplay).append( JSON.stringify(userData.serverData.ua, null, 6))
    $(userInfoDisplay).one('animationend', function(){
      $(userInfoDisplay).removeClass('animated jello')
    })
  }



  console.log(userData)
  //  MAIN MAPGE ui COMPONENTS
  var listEls = document.querySelectorAll('ul.mainNav > li')
  var len = listEls.length;
  for(var x = 0; x<len;x++){
    listEls[x].addEventListener('click', function(e){
      for(var i = 0;i<len;i++){
        listEls[i].classList.remove('selectedTab')
      }
      if(e.srcElement.localName == 'h3'){
        console.log('h3')
        e.target.parentNode.classList.add('selectedTab')
      }else{
        e.target.classList.add('selectedTab')      
      }
    }, true)
  }
})()