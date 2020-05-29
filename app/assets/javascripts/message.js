$(function(){
  function buildHTML(message){
    // 「もしメッセージに画像が含まれていたら」という条件式
    if (message.image) {
      let html = 
        `<div class="chat_main__message-list__messages">
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
        `<div class="chat_main__message-list__messages">
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
  $(".new-message").on("submit", function(e){
    e.preventDefault();
    let url = $(this).attr("action");
    let formData = new FormData(this);
    $.ajax({
      url: url,
      type: "POST",
      data: formData,
      dataType: "json",
      processData: false,
      contentType: false
    })
    .done(function(data){
      let html = buildHTML(data);
      $(".chat_main__message-list").append(html);
      $('.chat_main__message-list').animate({ scrollTop: $('.chat_main__message-list')[0].scrollHeight});
      $('form')[0].reset();
    })

    .always(function(){
      $('.new-message__send-btn').prop('disabled', false);
    })

    .fail(function(){
      alert("メッセージ送信に失敗しました");
    })

  });
});