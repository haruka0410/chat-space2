$(function(){
  function addUser(user){
    let html = `
                <div class="ChatMember clearfix">
                  <p class="ChatMember__name">${user.name}</p>
                  <div class="ChatMember__add ChatMember__button" data-user-id="${user.id}" data-user-name="${user.name}">追加</div>
                </div>
                `;
    $("#UserSearchResult").append(html);
  };

  function addNoUser(){
    let html = `
                <div class="ChatMember clearfix">
                  <p class="ChatMember__name">ユーザーが見つかりません</p>
                </div>
                `;
    $("#UserSearchResult").append(html);
  };

  function addDeleteUser(UserId, UserName){
    let html = `
                <div class="ChatMember">
                  <p class="ChatMember__name">${UserName}</p>
                  <input name="group[user_ids][]" type="hidden" value=${UserId} />
                  <div class="ChatMember__remove ChatMember__button">削除</div>
                </div>
                `;
    $(".ChatMembers").append(html);
  };

  function addMember(UserId, UserName){
    let html = ``
  }
 

  $(".SettingGroupForm__input").on("keyup", function(){
    let input = $(this).val();
    $.ajax({
      type: "get",
      url: "/users",
      dataType: "json",
      data: {keyword: input},
    })

    .done(function(users){
      console.log(users)
      $("#UserSearchResult").empty();
      if (users.length !== 0){
        users.forEach (function(user){
          addUser(user);
          addMember(user);
        });
      } else if (input.length == 0){
        return false
      } else {
        addNoUser();
      }

    })

    .fail(function(){
      alert("通信エラーです。ユーザーが表示できません。");
    })
  });

  $(document).on("click", ".ChatMember__add", function(){
    UserId = $(this).attr("data-user-id");
    UserName = $(this).attr("data-user-name");
    $(this).parent().remove();
    addDeleteUser(UserId, UserName);
  })

  $(document).on("click", ".ChatMember__remove", function(){
    $(this).parent().remove();
  })
});