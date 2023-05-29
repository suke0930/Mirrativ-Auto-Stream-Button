// ==UserScript==
// @name         Mirrativ Auto Stream Button
// @namespace    mirrativ_auto_stream_button
// @version      1.1
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
    /**
     * サーバーと接続し自動配信を行う
     * @param {string} afk 全自動か半自動化の判断 
     */
    async function websocketp(afk) {//websocket成立待ち
        try {
            setTimeout(function () {
                // localhost:8877にWebSocket接続

                const ws = new WebSocket('ws://localhost:8877');

                ws.addEventListener('error', (error) => {//何らかの理由でサーバーが起動してないとき
                    alert("おそらくサーバーが起動してないで")
                    alert("サーバーを起動してからページをリロードするんや")
                });

                // WebSocket接続時の処理
                ws.addEventListener('open', function (event) {
                    // URLを取得
                    const data_buffer = geturl();
                    const status = afk;

                    // URLとKEYをオブジェクトに格納し、JSONに変換して送信
                    const data = {
                        status: status,
                        url: data_buffer.url,
                        key: data_buffer.key
                    };
                    ws.send(JSON.stringify(data));  //URLとKEYをサーバーに送信する

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


        button2.addEventListener('click', function () {//半自動配信の場合;
            setTimeout(async function () {
                //ここでキー再生性
                makenewkey()
                    .then(getkeys => {
                        console.log("キー取得")
                        console.log(getkeys)
                        console.log("げっときーず")
                        console.log(getkeys)
                        if (getkeys.flag === 1) {
                            websocketp("nonafk");
                        } else {
                            if (getkeys.flag === 0) {
                                document.location.reload()//リロードする
                            }
                        }
                    })


            }, 1000); // Wait 1 second


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


    /**
     * 新しいキーを再生成し、そのキーがきちんと更新されているか確認する関数。
     * @return {object} 取得したURLとKEYと終了コード
     */
    async function makenewkey() {
        return new Promise((resolve, reject) => {


            /**
             * @param {object} keygen localstorageに格納する、もしくは引っ張り出した中身。status規定は0が処理終了、１が処理中 modeは 1 = 半自動稼働　2　=　全自動稼働　0 = フリー
             * 
             * @param {key} keygen.URL 
             */
            const storedJsonData_check = localStorageedit(0, "keygen", null);//存在確認
            if (storedJsonData_check === null) {//もしNULLってるなら
                const keygen_init = {
                    URL: "0",
                    KEY: "0",
                    status: 0,
                    mode: 0
                }//init  
                localStorageedit(1, "keygen", keygen_init);//初期化したものを書き込む
            }
            const storedJsonData = localStorageedit(0, "keygen", null);//データの取得

            if (storedJsonData !== undefined) {//受け取ったデータが消滅していなければ
                setTimeout(function () {

                    const params = geturl();//現在のURLとかいろいろ受け取る
                    // キー再生成をクリック
                    if (storedJsonData.status === 0) { document.querySelector('a._buttonInner_149zu_5').click() };//初回ならKEY&URLの再生成
                    // 1秒待機
                    setTimeout(function () {
                        // キー生成後の画面閉じるための「閉じる」ボタンをクリック
                        const close = document.querySelector('.m-btn-close.t-btn-close-green>a')
                        close.click();
                        // 1秒待機

                        const checknewparams = geturl();//新しいURLを取得する
                        if (params.url === checknewparams.url) {//キーが変わっているか確認
                            if (params.key === checknewparams.key) {//もしキーが変わっていない場合
                                //リロードする
                                const keygen = {
                                    URL: params.url,
                                    KEY: params.key,
                                    status: 1,
                                    mode: 1//全自動に対応させた暁にはこれが変動するはず
                                }//init  

                                localStorageedit(1, "keygen", keygen);//データを保存する
                                document.location.reload()//リロードする\

                                const returndata = {
                                    url: null,
                                    key: null,
                                    flag: 0
                                }

                                resolve(returndata)//虚無を返す
                            }
                        } else {
                            //配信を許可
                            const returndata = {
                                url: checknewparams.url,
                                key: checknewparams.key,
                                flag: 1
                            }
                            const keygen = {
                                URL: "null",
                                KEY: "null",
                                status: 0,
                                mode: 0//全自動に対応させた暁にはこれが変動するはず
                            }//init  
                            localStorageedit(1, "keygen", keygen);//データを保存する
                            resolve(returndata);
                        }
                    }, 1000);


                }, 1000);
            }
        })
    }
    /**
     * ローカルストレージを簡単に判断する
     * @param {value} mode 1=書き込み 0=読み込み 
     * @param {string} objname 書き込むオブジェクトの名前とか 
     * @param {object} obj 書き込みモードで書き込む中身 
     * @returns 終了コード or 読み込んだ中身
     */
    function localStorageedit(mode, objname, obj) {
        if (mode === 1) {//書き込みモード
            localStorage.setItem(objname, JSON.stringify(obj));//ローカルストレージに格納
        } else {//読み込みモード
            const storedJsonData = JSON.parse(localStorage.getItem(objname));
            return storedJsonData;
        }
    }
    /**
     * ミラのページからURLとKEYを呼び出す
     * @returns {object} 呼び出した値の中身
     */
    function geturl() {
        //URL取得
        const url = document.querySelector('div.m-inputTextGroup.m-streamingUrl input[type="text"]').value;
        // KEYを取得
        const key = document.querySelector('div.m-inputTextGroup.m-streamingKey input[type="text"]').value;
        /**
         * @param {object} params URLとKEYを格納したオブジェクト
         * 
         */
        const params = {
            url: url,
            key: key
        }
        return params;
    }
    /**
     *  addAutoStreamButtonを非同期化するための土台
     */
    async function AASB_async() {

        //  await comment(true)
        try {
            const checkmode = localStorageedit(0, "keygen", null);
            console.log(checkmode.mode)

            if (checkmode.mode === 1) {
                makenewkey()
                    .then(tryreload => {

                        if (tryreload.flag === 1) {

                            websocketp("nonafk");
                        }

                    })

            }
        } catch (error) {
            console.log("なんか失敗してる...")
        }

        await addAutoStreamButton();
    }



    window.addEventListener('load', function () {
        console.log("mirasp load")
        //      setTimeout(() => {
        AASB_async();
        //      }, 8000);
    });
})();





