// ==UserScript==
// @name         Mirrativ Auto Stream Button
// @namespace    mirrativ_auto_stream_button
// @version      1.0
// @description  Adds an "Auto Stream" button to the Mirrativ broadcast page and types "でいりー" in the input field when clicked.
// @author       suke
// @match        https://www.mirrativ.com/broadcast/*
// @exclude      https://www.mirrativ.com/broadcast/history
// @exclude      https://www.mirrativ.com/broadcast/prepare
// @grant        none
// ==/UserScript==

(function () {
    const title = "でいりー"//タイトル


    const callback = function (mutationsList, observer) {
        for (let mutation of mutationsList) {
            if (mutation.type === 'childList') {
                // 新しいli要素が追加された場合に、イベントをトリガーする
                if (mutation.addedNodes.length > 0 && mutation.addedNodes[0].nodeName === 'LI') {
                    // イベントをトリガーする処理を記述
                    console.log('新しいli要素が追加されました');
                }
            }
        }
    };

    // MutationObserverの設定オブジェクトを作成


    // MutationObserverのインスタンスを生成し、監視を開始する
    const observer = new MutationObserver(callback);
    async function a(observer) {
        const ul = document.querySelector('.mrChatList__list');
        const config = { childList: true };
        observer.observe(ul, config);
    }
    async function comment(once) {
        setTimeout(() => {
            console.log(document.querySelector('.mrChatList__list'))
            if (null != document.querySelector('.mrChatList__list')) {
                if (once === true) {
                    comment(false)
                } else {


                    a(observer);
                }
            } else {

                console.log("米みつかんないよ")
                comment(true)
            }

        }, 3000);
    }
    async function websocketp(afk) {//websocket成立待ち
        try {
            setTimeout(function () {
                // localhost:8877にWebSocket接続

                const ws = new WebSocket('ws://localhost:8877');

                ws.addEventListener('error', (error) => {
                    alert("おそらくサーバーが起動してないで")
                    alert("サーバーを起動してからページをリロードするんや")
                });

                // WebSocket接続時の処理
                ws.addEventListener('open', function (event) {
                    // URLを取得
                    const urlInput = document.querySelector('div.m-inputTextGroup.m-streamingUrl input[type="text"]');
                    const url = urlInput.value;

                    // KEYを取得
                    const keyInput = document.querySelector('div.m-inputTextGroup.m-streamingKey input[type="text"]');
                    const key = keyInput.value;
                    const status = afk;

                    // URLとKEYをオブジェクトに格納し、JSONに変換して送信
                    const data = {
                        status: status,
                        url: url,
                        key: key
                    };
                    ws.send(JSON.stringify(data));

                    ws.addEventListener('message', event => {//自動開始
                        if (event.data === '400 ok') {
                            setTimeout(() => {


                                const input3 = document.querySelector('.m-inputText.t-inputText-green');
                                if (input3) {
                                    input3.value = title;
                                }

                                console.log("セレクた")

                                setTimeout(() => {


                                    console.log("配信開始")
                                    const a = document.querySelector('.mrStreamUI__inner>div.mrStreamUI__rightGroup>p.m-btn-primary.t-btn-green>a');
                                    a.click();
                                    setTimeout(() => {
                                        const v = document.querySelector('.mrOverlay__share>p.m-btn-close.t-btn-close-green>a');
                                        v.click();

                                        setTimeout(() => {
                                            let v111 = document.querySelector('._openPlayer_nzdco_49.__asideColumn_nzdco_40');;//配信を開く
                                            console.log(v111)
                                            v111.click();
                                        }, 1000);


                                    }, 2000);
                                }, 5000);
                            }, 3000);
                        }
                    });

                    setTimeout(function () {


                        ws.addEventListener('message', event => {//自動停止

                            setTimeout(function () {
                                if (event.data === '500 ok') {
                                    console.log("配信終了")
                                    const v2 = document.querySelector('.m-btn-primary.t-btn-red>a')
                                    v2.click();
                                }
                            })

                        }, 5000);
                    }, 5000);







                });

                setTimeout(function () {
                    // 配信を開始するための「次へ」ボタンをクリック

                    const a = document.querySelector('.mrStreamUI__inner>div.mrStreamUI__rightGroup>p.m-btn-primary.t-btn-green>a');
                    console.log(a);
                    //  a.click()
                }, 1000);
            }, 1000);
        } catch (error) {
            alert("鯖死んでね？")
        }
    }
    function addAutoStreamButton() {
        console.log("1番")
        // Create a new button element
        const button = document.createElement('button');
        button.innerHTML = '全自動配信';
        button.style.backgroundColor = 'red';
        button.style.color = 'white';
        button.style.borderRadius = '5px';
        button.style.padding = '5px 10px';
        button.style.position = 'absolute';
        button.style.top = '10px';
        button.style.right = '10px';

        const button2 = document.createElement('button2');
        button2.innerHTML = '自動配信';
        button2.style.backgroundColor = 'blue';
        button2.style.color = 'white';
        button2.style.borderRadius = '5px';
        button2.style.padding = '5px 10px';
        button2.style.position = 'absolute';
        button2.style.top = '50px';
        button2.style.right = '5px';

        button2.addEventListener('click', function () {//半自動配信の場合
            const clickElement = document.querySelector('._item_1b9q2_3');
            if (clickElement) {
                // Click the element and wait 1 second
                clickElement.click();
                setTimeout(function () {
                    // Find the input element and set its value to "でいりー"

                    const input = document.querySelector('.m-inputText.t-inputText-green');
                    if (input) {
                        input.value = title;

                    }
                    // 1秒待機
                    setTimeout(function () {
                        // 「開始」ボタンをクリック
                        document.querySelector('a._buttonInner_149zu_5').click();


                        // 1秒待機

                        setTimeout(function () {
                            // 配信画面を閉じるための「閉じる」ボタンをクリック
                            const b = document.querySelector('.m-btn-close.t-btn-close-green>a')
                            b.click();
                            console.log(b)
                            // 1秒待機

                            // 1秒待機
                            websocketp("nonafk");
                        }, 1000);


                    }, 1000);
                }, 1000); // Wait 1 second
            }
        });//ここまで半自動配信


        // Add event listener to button
        button.addEventListener('click', function () {//全自動配信の場合
            // Find the element to click
            const clickElement = document.querySelector('._item_1b9q2_3');
            if (clickElement) {
                // Click the element and wait 1 second
                clickElement.click();
                setTimeout(function () {
                    // Find the input element and set its value to "でいりー"

                    const input = document.querySelector('.m-inputText.t-inputText-green');
                    if (input) {
                        input.value = title;

                    }
                    // 1秒待機
                    setTimeout(function () {
                        // 「開始」ボタンをクリック
                        document.querySelector('a._buttonInner_149zu_5').click();


                        // 1秒待機

                        setTimeout(function () {
                            // 配信画面を閉じるための「閉じる」ボタンをクリック
                            const b = document.querySelector('.m-btn-close.t-btn-close-green>a')
                            b.click();
                            console.log(b)
                            // 1秒待機

                            // 1秒待機
                            websocketp("afk");
                        }, 1000);


                    }, 1000);
                }, 1000); // Wait 1 second
            }
        });

        // Add the button to the mrStreamUI__inner element
        const streamUIInner = document.querySelector('.mrStreamUI__inner');
        if (streamUIInner) {
            streamUIInner.appendChild(button);
        }

        const streamUIInner2 = document.querySelector('.mrStreamUI__inner');
        if (streamUIInner2) {
            streamUIInner2.appendChild(button2);
        }
    }


    // Wait for the page to load before adding the button
    async function main999() {
        //  await comment(true)
        await addAutoStreamButton();
    }
    window.addEventListener('load', function () {
        console.log("mirasp load")
        //      setTimeout(() => {
        main999();
        //      }, 8000);
    });
})();




