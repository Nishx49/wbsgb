var kiwi = {
    widget_token: null,
    mobile: false,

    init: function (widget_token) {
        this.widget_token = widget_token;
        this.mobile = /Mobi|Android/i.test(navigator.userAgent);
        var url = `https://api.interakt.shop/v1/public/whatsapp_widget?widget_token=${widget_token}`;

        var xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function () {
            if (this.readyState == 4 && this.status == 200) {
                var response = JSON.parse(this.responseText);
                if (kiwi.mobile) {
                    kiwi.createWidgetM(response.data);
                } else {
                    kiwi.createWidgetD(response.data);
                }
            }
        };
        xhttp.open("GET", url, true);
        xhttp.send();
    },

    createWidgetD: function (data) {
        var button = document.createElement('div');
        button.id = "wtsBtn";
        button.innerHTML = "<img src='" + data.button_icon + "' style='width: 100%; height: 100%;' />";
        button.style.cssText = `
            position: fixed; bottom: 20px; right: 20px;
            width: 60px; height: 60px; border-radius: 50%;
            background: ${data.button_color}; cursor: pointer;
            z-index: 9999;
        `;
        document.body.appendChild(button);

        var widget = document.createElement('div');
        widget.id = "wtsWidget";
        widget.style.cssText = `
            display: none; position: fixed; bottom: 90px; right: 20px;
            width: 300px; background: white; box-shadow: 0 0 15px rgba(0, 0, 0, 0.3);
            z-index: 9999; border-radius: 10px; overflow: hidden;
            font-family: Arial, sans-serif;
        `;

        widget.innerHTML = `
            <div style="padding: 20px; text-align: center;">
                <img src="${data.widget_image}" style="width: 100px; height: 100px; border-radius: 50%;" />
                <h3 style="margin: 10px 0;">${data.heading_text}</h3>
                <p style="margin: 0;">${data.intro_text}</p>
                <a href="https://wa.me/${data.phone_number}?text=${data.hello_text}" target="_blank" style="
                    display: inline-block; margin-top: 10px; padding: 10px 20px;
                    background: ${data.button_color}; color: white; border-radius: 5px;
                    text-decoration: none;">${data.button_text}</a>
            </div>
            <div style="padding: 10px; text-align: center; font-size: 12px; color: grey;">
                Powered by <a href="https://interakt.shop" target="_blank" style="color: grey;">interakt.shop</a>
            </div>
        `;
        document.body.appendChild(widget);

        button.onclick = function () {
            widget.style.display = 'block';
            button.style.display = 'none';
        };

        var closeButton = document.createElement('div');
        closeButton.innerHTML = "&#10005;";
        closeButton.style.cssText = `
            position: absolute; top: 10px; right: 10px; cursor: pointer;
            font-size: 16px; color: grey;
        `;
        closeButton.onclick = function () {
            widget.style.display = 'none';
            button.style.display = 'block';
        };
        widget.appendChild(closeButton);
    },

    createWidgetM: function (data) {
        var button = document.createElement('div');
        button.id = "wtsBtn";
        button.innerHTML = "<img src='" + data.button_icon + "' style='width: 100%; height: 100%;' />";
        button.style.cssText = `
            position: fixed; bottom: 20px; right: 20px;
            width: 60px; height: 60px; border-radius: 50%;
            background: ${data.button_color}; cursor: pointer;
            z-index: 9999;
        `;
        document.body.appendChild(button);

        var widget = document.createElement('div');
        widget.id = "wtsWidget";
        widget.style.cssText = `
            display: none; position: fixed; bottom: 0; right: 0; left: 0; top: 0;
            background: rgba(0, 0, 0, 0.5); z-index: 9999;
        `;

        widget.innerHTML = `
            <div style="position: absolute; bottom: 0; left: 0; right: 0; background: white; padding: 20px; border-top-left-radius: 10px; border-top-right-radius: 10px;">
                <div style="text-align: center;">
                    <img src="${data.widget_image}" style="width: 80px; height: 80px; border-radius: 50%;" />
                    <h3 style="margin: 10px 0;">${data.heading_text}</h3>
                    <p style="margin: 0;">${data.intro_text}</p>
                    <a href="https://wa.me/${data.phone_number}?text=${data.hello_text}" target="_blank" style="
                        display: inline-block; margin-top: 10px; padding: 10px 20px;
                        background: ${data.button_color}; color: white; border-radius: 5px;
                        text-decoration: none;">${data.button_text}</a>
                </div>
                <div style="padding: 10px; text-align: center; font-size: 12px; color: grey;">
                    Powered by <a href="https://interakt.shop" target="_blank" style="color: grey;">interakt.shop</a>
                </div>
            </div>
        `;
        document.body.appendChild(widget);

        button.onclick = function () {
            widget.style.display = 'block';
            button.style.display = 'none';
        };

        widget.onclick = function (event) {
            if (event.target === widget) {
                widget.style.display = 'none';
                button.style.display = 'block';
            }
        };
    }
};
