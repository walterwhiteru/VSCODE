//#tgWebAppData=query_id%3DAAFHVUo3AgAAAEdVSjfXGVtU%26user%3D%257B%2522id%2522%253A5222585671%252C%2522first_name%2522%253A%2522%25D0%2594%25D0%25B0%25D0%25BD%25D0%25B8%25D0%25BB%2520%25D0%25A7%25D0%25B5%25D1%2580%25D0%25BD%25D0%25BE%25D0%25B2%2522%252C%2522last_name%2522%253A%2522%2522%252C%2522username%2522%253A%2522blesshydra%2522%252C%2522language_code%2522%253A%2522ru%2522%252C%2522is_premium%2522%253Atrue%252C%2522allows_write_to_pm%2522%253Atrue%257D%26auth_date%3D1713366023%26hash%3D6d4c94ba6819d5f94ea7d11e4a877038d2fb78308e829c41f19563294a88774a&tgWebAppVersion=7.2&tgWebAppPlatform=tdesktop&tgWebAppThemeParams=%7B%22accent_text_color%22%3A%22%236ab2f2%22%2C%22bg_color%22%3A%22%2317212b%22%2C%22button_color%22%3A%22%235288c1%22%2C%22button_text_color%22%3A%22%23ffffff%22%2C%22destructive_text_color%22%3A%22%23ec3942%22%2C%22header_bg_color%22%3A%22%2317212b%22%2C%22hint_color%22%3A%22%23708499%22%2C%22link_color%22%3A%22%236ab3f3%22%2C%22secondary_bg_color%22%3A%22%23232e3c%22%2C%22section_bg_color%22%3A%22%2317212b%22%2C%22section_header_text_color%22%3A%22%236ab3f3%22%2C%22subtitle_text_color%22%3A%22%23708499%22%2C%22text_color%22%3A%22%23f5f5f5%22%7D
document.addEventListener('DOMContentLoaded', function () {
    // Select all buttons with the class 'image-button'
    const buttons = document.querySelectorAll('.image-button');
    
    // Loop through each button and add an event listener
    buttons.forEach(button => {
        button.addEventListener('click', function() {
            var clicked_button = button;
            var data_div_clicked_button = clicked_button.parentElement.getAttribute('data');
            var clicked_botton_is_bordered = clicked_button.getAttribute('is_bordered');
            var clicked_botton_data_button = clicked_button.getAttribute('data');
            var all_buttons = document.querySelectorAll('button[class="image-button"');
            for (i=0;i<all_buttons.length;i++) {
                var current_button = all_buttons[i];
                var data_div_button = current_button.parentElement.getAttribute('data');
                var is_bordered = current_button.getAttribute('is_bordered');
                var data_button = current_button.getAttribute('data');
            }
            if (clicked_botton_is_bordered == "false") clicked_button.setAttribute("is_bordered", "true")
            if (clicked_botton_is_bordered == "true") clicked_button.setAttribute("is_bordered", "false")
        });
    });

    const gen_button = document.querySelectorAll('.generate-button');
    gen_button.forEach(gen_button => {
        gen_button.addEventListener('click', function() {
            var bordered_buttons = document.querySelectorAll('button[is_bordered="true"]');
            prompt = "";
            for (i=0; i<bordered_buttons.length; i++) {
                prompt = prompt + bordered_buttons[i].parentElement.getAttribute("data") + ":";
                prompt = prompt + bordered_buttons[i].getAttribute('data') + ";";
            }
            id = getUserDataFromURLHash();
            console.log(prompt)
            console.log('generate')
            var xmlHttp = new XMLHttpRequest();
            xmlHttp.open( "GET", `http://77.105.164.21:27015/getdata?prompt=${prompt}&id=${id}`, false ); // false for synchronous request
            xmlHttp.send( null);
        });
    });
});

function getUserDataFromURLHash() {
    const urlFragment = window.location.hash.substring(1); // Получаем фрагмент после символа #
    const queryParams = new URLSearchParams(urlFragment);
    const tgWebAppData = queryParams.get('tgWebAppData');

    if (!tgWebAppData) {
        return 'tgWebAppData не найдено в URL.';
    }

    // Декодирование данных пользователя из tgWebAppData
    try {
        const tgWebAppDataDecoded = decodeURIComponent(tgWebAppData);
        const userParamMatch = tgWebAppDataDecoded.match(/user=([^&]+)/);
        if (!userParamMatch) {
            return 'Параметр user не найден в tgWebAppData.';
        }
        const userJsonString = decodeURIComponent(userParamMatch[1]);
        const userData = JSON.parse(userJsonString);
        return userData.id; // Предполагаем, что userData содержит свойство id
    } catch (error) {
        console.error('Ошибка при парсинге данных пользователя: ', error);
        return 'Ошибка при парсинге данных пользователя.';
    }
}

function sendUserId() {
    const userId = getUserDataFromURLHash();
    if (userId) {
        // Здесь должен быть ваш серверный URL для обработки GET-запроса
        const serverUrl = 'https://your-server.com/path?userId=' + userId;
        // Отправляем пользователя на серверный URL
        window.location.href = serverUrl;
    }
}
