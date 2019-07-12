// method 判断是否为微信浏览器

let isWeixin = () => {

  let ua = window.navigator.userAgent.toLowerCase()

  return /micromessenger/
    .test(ua)

}


// method 自动播放

let audioPlayer = (id) => {

  let audio = document.getElementById(id)

  if (isWeixin()) {

    document.addEventListener(
      'WeixinJSBridgeReady', () => {

        audio.play()

      }, false)


    // 添加 getNetworkType 的判断原因, 请看问题分析2

    if (typeof window.WeixinJSBridge ==
      "object" &&
      typeof window.WeixinJSBridge
      .invoke ==
      "function"
    ) {

      window.
      WeixinJSBridge
        .invoke(
          'getNetworkType', {}, () => {

            audio.play()

          })

    }

  } else {

    audio.play()

    let touchPlay = () => {

      audio.play()

      document.removeEventListener(
        'touchstart', touchPlay, false)

    }

    if (audio.paused) {

      document.addEventListener(
        'touchstart', touchPlay, false)

    }

  }

}


// 使用

audioPlayer(
  'audio-player'
)