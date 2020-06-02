function buildHTML(message){
  // 「もしメッセージに画像が含まれていたら」という条件式
  if (message.image) {
    let html = 
      `<div class="chat_main__message-list__messages" data-message-id=${message.id}>
        <div class="chat_main__message-list__messages__top">
          <div class="chat_main__message-list__messages__top__left">
            ${message.user_name}
          </div>
          <div class="chat_main__message-list__messages__top__right">
            ${message.created_at}
          </div>
        </div>
        <div class="chat_main__message-list__messages__bottom">
          <p class="Message__content">
            ${message.content}
          </p>
          <img class="Message__image" src= ${message.image} >
        </div>
       </div> `
       return html
  } else {
    let html = //メッセージに画像が含まれない場合のHTMLを作る
      `<div class="chat_main__message-list__messages" data-message-id=${message.id}>
         <div class="chat_main__message-list__messages__top">
           <div class="chat_main__message-list__messages__top__left">
             ${message.user_name}
           </div>
           <div class="chat_main__message-list__messages__top__right">
             ${message.created_at}
           </div>
         </div>
      <div class="chat_main__message-list__messages__bottom">
        <p class="Message__content">
          ${message.content}
        </p>
      </div>
    </div> `
    return html
  }
}
  let reloadMessages = function(){
    let last_message_id = $(".chat_main__message-list__messages:last").data("message-id")
    $.ajax({
      url: "api/messages",
      type: "get",
      dataType: "json",
      data: { id: last_message_id },
    })

    .done(function(messages){
      if (messages.length !== 0){
        let insertHTML = '';
        $.each(messages, function(i, message){
          insertHTML += buildHTML(message);
        })
        $(".chat_main__message-list").append(insertHTML);
        $('.chat_main__message-list').animate({ scrollTop: $('.chat_main__message-list')[0].scrollHeight});
      }
    })

    .fail(function(){
      alert("error")
    })
  };
  setInterval(reloadMessages, 7000);