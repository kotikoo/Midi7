/* Lazy Load XT 1.1.0 | MIT License */
!function(a,b,c,d){function e(a,b){return a[b]===d?t[b]:a[b]}function f(){var a=b.pageYOffset;return a===d?r.scrollTop:a}function g(a,b){var c=t["on"+a];c&&(w(c)?c.call(b[0]):(c.addClass&&b.addClass(c.addClass),c.removeClass&&b.removeClass(c.removeClass))),b.trigger("lazy"+a,[b]),k()}function h(b){g(b.type,a(this).off(p,h))}function i(c){if(z.length){c=c||t.forceLoad,A=1/0;var d,e,i=f(),j=b.innerHeight||r.clientHeight,k=b.innerWidth||r.clientWidth;for(d=0,e=z.length;e>d;d++){var l,m=z[d],q=m[0],s=m[n],u=!1,v=c||y(q,o)<0;if(a.contains(r,q)){if(c||!s.visibleOnly||q.offsetWidth||q.offsetHeight){if(!v){var x=q.getBoundingClientRect(),B=s.edgeX,C=s.edgeY;l=x.top+i-C-j,v=i>=l&&x.bottom>-C&&x.left<=k+B&&x.right>-B}if(v){m.on(p,h),g("show",m);var D=s.srcAttr,E=w(D)?D(m):q.getAttribute(D);E&&(q.src=E),u=!0}else A>l&&(A=l)}}else u=!0;u&&(y(q,o,0),z.splice(d--,1),e--)}e||g("complete",a(r))}}function j(){B>1?(B=1,i(),setTimeout(j,t.throttle)):B=0}function k(a){z.length&&(a&&"scroll"===a.type&&a.currentTarget===b&&A>=f()||(B||setTimeout(j,0),B=2))}function l(){v.lazyLoadXT()}function m(){i(!0)}var n="lazyLoadXT",o="lazied",p="load error",q="lazy-hidden",r=c.documentElement||c.body,s=b.onscroll===d||!!b.operamini||!r.getBoundingClientRect,t={autoInit:!0,selector:"img[data-src]",blankImage:"data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7",throttle:99,forceLoad:s,loadEvent:"pageshow",updateEvent:"load orientationchange resize scroll touchmove focus",forceEvent:"lazyloadall",oninit:{removeClass:"lazy"},onshow:{addClass:q},onload:{removeClass:q,addClass:"lazy-loaded"},onerror:{removeClass:q},checkDuplicates:!0},u={srcAttr:"data-src",edgeX:0,edgeY:0,visibleOnly:!0},v=a(b),w=a.isFunction,x=a.extend,y=a.data||function(b,c){return a(b).data(c)},z=[],A=0,B=0;a[n]=x(t,u,a[n]),a.fn[n]=function(c){c=c||{};var d,f=e(c,"blankImage"),h=e(c,"checkDuplicates"),i=e(c,"scrollContainer"),j=e(c,"show"),l={};a(i).on("scroll",k);for(d in u)l[d]=e(c,d);return this.each(function(d,e){if(e===b)a(t.selector).lazyLoadXT(c);else{var i=h&&y(e,o),m=a(e).data(o,j?-1:1);if(i)return void k();f&&"IMG"===e.tagName&&!e.src&&(e.src=f),m[n]=x({},l),g("init",m),z.push(m),k()}})},a(c).ready(function(){g("start",v),v.on(t.updateEvent,k).on(t.forceEvent,m),a(c).on(t.updateEvent,k),t.autoInit&&(v.on(t.loadEvent,l),l())})}(window.jQuery||window.Zepto||window.$,window,document),function(a){var b=a.lazyLoadXT;b.selector+=",video,iframe[data-src]",b.videoPoster="data-poster",a(document).on("lazyshow","video",function(c,d){var e=d.lazyLoadXT.srcAttr,f=a.isFunction(e),g=!1;d.attr("poster",d.attr(b.videoPoster)),d.children("source,track").each(function(b,c){var d=a(c),h=f?e(d):d.attr(e);h&&(d.attr("src",h),g=!0)}),g&&this.load()})}(window.jQuery||window.Zepto||window.$);

!function(d) {

    "use strict";

    Object.assign||Object.defineProperty(Object,"assign",{enumerable:!1,configurable:!0,writable:!0,value:function(e,r){"use strict";if(null==e)throw new TypeError("Cannot convert first argument to object");for(var t=Object(e),n=1;n<arguments.length;n++){var o=arguments[n];if(null!=o)for(var a=Object.keys(Object(o)),c=0,b=a.length;c<b;c++){var i=a[c],l=Object.getOwnPropertyDescriptor(o,i);void 0!==l&&l.enumerable&&(t[i]=o[i])}}return t}});

    "remove" in Element.prototype||(Element.prototype.remove=function(){this.parentNode&&this.parentNode.removeChild(this)});

    window.note = function(settings) {

        settings = Object.assign({},{
            callback:    false,
            content:     "",
            time:        4.5,
            type:        "info"
        }, settings);

        if(!settings.content.length) return;

        var create = function(name, attr, append, content) {
            var node = d.createElement(name);
            for(var val in attr) { if(attr.hasOwnProperty(val)) node.setAttribute(val, attr[val]); }
            if(content) node.insertAdjacentHTML("afterbegin", content);
            append.appendChild(node);
            if(node.classList.contains("note-item-hidden")) node.classList.remove("note-item-hidden");
            return node;
        };

        var noteBox = d.getElementById("notes") || create("div", { "id": "notes" }, d.body);
        var noteItem = create("div", {
                "class": "note-item",
                "data-show": "false",
                "role": "alert",
                "data-type": settings.type
            }, noteBox),
            noteItemText = create("div", { "class": "note-item-text" }, noteItem, settings.content),
            noteItemBtn = create("button", {
                "class": "note-item-btn",
                "type": "button",
            }, noteItem);

        var isVisible = function() {
            var coords = noteItem.getBoundingClientRect();
            return (
                coords.top >= 0 &&
                coords.left >= 0 &&
                coords.bottom <= (window.innerHeight || d.documentElement.clientHeight) &&
                coords.right <= (window.innerWidth || d.documentElement.clientWidth)
            );
        };

        var remove = function(el) {
            el = el || noteItem;
            el.setAttribute("data-show","false");
            window.setTimeout(function() {
                el.remove();
            }, 250);
            if(settings.callback) settings.callback(); // callback
        };

        noteItemBtn.addEventListener("click", function() { remove(); });

        window.setTimeout(function() {
            noteItem.setAttribute("data-show","true");
        }, 250);

        if(!isVisible()) remove(noteBox.firstChild);

        window.setTimeout(remove, settings.time * 1000);

    };

}(document);

if (avatar != 0) {
    $.post("./app/includes/js_controller.php", {
        function: 'avatars', 
        data: avatar
    }, function (e) {
        var jsonData = $.parseJSON(e);
        for (var i = 0; i < avatar.length; i++) {
            document.getElementById(avatar[i]).setAttribute("src", jsonData[i]);
        }
    })
};

function action_sidebar() {
    if ($('body').hasClass('sidebar-collapse') || $('body').hasClass('sidebar-open')) {
        if (window.innerWidth > 1026) {
            $.post("./app/includes/js_controller.php", {function: 'sidebar', setup: 1});
            $("body").removeClass("sidebar-collapse");
            $("body").removeClass("sidebar-open");
        } else {
            $.post("./app/includes/js_controller.php", {function: 'sidebar', setup: 1});
            $("body").removeClass("sidebar-collapse");
            $("body").removeClass("sidebar-open");
        }
    } else {
        if (window.innerWidth > 1026) {
            $.post("./app/includes/js_controller.php", {function: 'sidebar', setup: 0});
            $("body").removeClass("sidebar-open");
            $("body").addClass("sidebar-collapse");
        } else {
            $.post("./app/includes/js_controller.php", {function: 'sidebar', setup: 1});
            $("body").removeClass("sidebar-collapse");
            $("body").addClass("sidebar-open");
        }
    }
}

function action_treeview() {
    if ($(".treeview-menu").hasClass('menu-open')) {
        $(".treeview-menu").removeClass("menu-open");
        $( ".treeview-menu" ).slideUp();
    } else {
        $(".treeview-menu").addClass("menu-open")
        $( ".treeview-menu" ).slideDown();
    }
}

function set_options_data(data_id,change_data) {
    $.post( "./app/includes/js_controller.php", { function: "set", option: data_id, change: change_data } );
    note({
        content: 'Сохранено',
        type: 'success',
        time: 3
    });
}

function set_options_data_select( name, value ) {
    $.post( "./app/includes/js_controller.php", { function: "set", option: name, data: value } );
    note({
        content: 'Сохранено',
        type: 'success',
        time: 3
    });

    if( name == 'white_palette' ) {
        change_palette( value );
    } else if ( name == 'dark_palette' ) {
        change_palette( value );
    } else if ( name == 'background_image' ) {
        change_background_image( value );
    } else if ( name == 'graphics_container' ) {
       if( value == 'stretch' ) {
           $( '.container-fluid' ).css( 'max-width', '1920px' );
       } else if( value == 'static' ) {
           $( '.container-fluid' ).css( 'max-width', '1400px' );
       }
    }
}

function change_background_image( value ) {

    var str = '/storage/cache/img/global/backgrounds/' + value;

    document.body.style.backgroundImage = 'url(' + str + ')';

}

function change_palette( value ) {

    var theme = $.ajax({
        type: 'POST',
        url: "./app/includes/js_controller.php",
        data: ({function:'options', setup:'theme'}),
        dataType: 'text',
        global: false,
        async:false,
        success: function( data ) {
            return data;
        }
    }).responseText;

    var str = './storage/assets/css/themes/' + theme + '/palettes/' + value + '.json';

    var palette = $.ajax({
        type: 'GET',
        url: str.split('"').join(''),
        success: function( data ){
            return data;
        },
        dataType: 'json',
        global: false,
        async:false,
        cache: true
    }).responseText;

    var obj = JSON.parse( palette );

    for (var key in obj) {
        document.documentElement.style.setProperty(key, obj[key]);
    }

}

function dark_mode() {

    var dark_mode = $.ajax({
        type: 'POST',
        url: "./app/includes/js_controller.php",
        data: ({function:'sessions', data:'dark_mode'}),
        dataType: 'text',
        global: false,
        async:false,
        success: function(data) {
            return data;
        }
    }).responseText;

    var theme = $.ajax({
        type: 'POST',
        url: "./app/includes/js_controller.php",
        data: ({function:'options', setup:'theme'}),
        dataType: 'text',
        global: false,
        async:false,
        success: function( data ) {
            return data;
        }
    }).responseText;

    var dark_palette = $.ajax({
        type: 'POST',
        url: "./app/includes/js_controller.php",
        data: ({function:'options', setup:'dark_palette'}),
        dataType: 'text',
        global: false,
        async:false,
        success: function( data ) {
            return data;
        }
    }).responseText;

    var white_palette = $.ajax({
        type: 'POST',
        url: "./app/includes/js_controller.php",
        data: ({function:'options', setup:'white_palette'}),
        dataType: 'text',
        global: false,
        async:false,
        success: function( data ) {
            return data;
        }
    }).responseText;

    if (dark_mode == 0) {

        var str = './storage/assets/css/themes/' + theme + '/palettes/' + dark_palette + '.json';

        var palette = $.ajax({
            type: 'GET',
            url: str.split('"').join(''),
            success: function( data ){
                return data;
            },
            dataType: 'json',
            global: false,
            async:false,
            cache: true
        }).responseText;

        var obj = $.parseJSON( palette );

        $.post("./app/includes/js_controller.php", {function: 'dark_mode', setup: '1'});

        for (var key in obj) {
            document.documentElement.style.setProperty(key, obj[key]);
        }

    } else if (dark_mode == 1) {

        var str = './storage/assets/css/themes/' + theme + '/palettes/' + white_palette + '.json';

        var palette = $.ajax({
            type: 'GET',
            url: str.split('"').join(''),
            success: function( data ){
                return data;
            },
            dataType: 'json',
            global: false,
            async:false,
            cache: true
        }).responseText;

        var obj = JSON.parse( palette );

        $.post("./app/includes/js_controller.php", {function: 'dark_mode', setup: '0'});

        for (var key in obj) {
            document.documentElement.style.setProperty(key, obj[key]);
        }

    }

}

function SaveInStorage(key, value) {
    if (typeof(Storage) !== 'undefined') {
        sessionStorage.setItem(key, value);
    }
}

function LoadFromStorage(key) {
    if (typeof(Storage) !== 'undefined') {
        return sessionStorage.getItem(key);
    }
    else {
        return '';
    }
}
//Notifications -->
var notifications = {};
var nonot = true;

function PlaySound(src) {
    var audio = new Audio(src);
    audio.play();
}

function main_notifications_icon_adjust(count,$html){
    if(count != 0){
        $('#main_notifications_badge').html(count);
        $('#main_notifications_badge').show();
        return true;
    }else{
        $('#main_notifications').html($html);
        $('#main_notifications_badge').html(false);
        $('#main_notifications_badge').hide();
        return false;
    }
}

var main_notifications_cooldown  = false;

function main_notifications_refresh(){
    $.ajax({
        type: 'POST',
        url: window.location.href,
        data: {entryid: 1},
        success: function(reuslt){
            if(IsJsonString(reuslt)){
                var data = jQuery.parseJSON(reuslt);
                SaveInStorage('notifications_count', data['count']);
                if(main_notifications_icon_adjust(data['count'],data['no_notifications'])){
                    if(nonot){$('#main_notifications').html('');}
                    data['notifications'].forEach(function(notification){
                        if(!notifications.hasOwnProperty(notification['id'])){
                            $('#main_notifications').prepend(notification['html']);
                            notifications[notification['id']] = true;
                            if(notification['seen'] == 0 && main_notifications_cooldown == false){
                                main_notifications_cooldown = true;
                                setTimeout(function(){main_notifications_cooldown = false;}, 3000)
                                PlaySound('storage/assets/sounds/Knock.mp3');
                            }
                        }
                    });

                    nonot = false;
                }else{
                    nonot = true;
                }
            }
        }
    });
}

function main_notifications_load(){
    var count_saved = LoadFromStorage('notifications_count');

    if($.isNumeric(count_saved)){
        main_notifications_icon_adjust(count_saved);
    }

    main_notifications_refresh();

    setInterval(main_notifications_refresh, 30000);
}

function main_notifications_chek(id){
    $.ajax({
        type: 'POST',
        url: window.location.href,
        data: {
            notific: id
        },
        success: function(){
            main_notifications_refresh();
        }
    });
}

//<-- Notifications
main_notifications_load();

function IsJsonString(str) {
    try {
        JSON.parse(str);
    } catch (e) {
        return false;
    }
    return true;
}

$('#admin_idebar_right').click(function(){
    if($('.sidebar-right').hasClass("unshow"))
    {
        $('.sidebar-right').removeClass("unshow");
        SaveInStorage('panel_state', 'false');
    }
    else
    {
        $('.sidebar-right').addClass("unshow");
        SaveInStorage('panel_state', 'true');
    }
});

if(LoadFromStorage('panel_state') === 'true') {
    $('.sidebar-right').addClass("unshow");
} else {
    $('.sidebar-right').removeClass("unshow");
}

function updateURL(text) {
    if (history.pushState) {
        var baseUrl = window.location.protocol + "//" + window.location.host + window.location.pathname;
        var newUrl = baseUrl + text;
        history.pushState(null, null, newUrl);
    }
    else {
        console.warn('History API не поддерживается');
    }
}
$(".tooltip-js").on('mouseenter', function() {
    if ($('body').hasClass('sidebar-collapse')) {
    data = $(this).attr("data-tooltip-js");
    var offsetTop = $(this).offset().top + 7;
    var offsetLeft = $(this).offset().left + $(this).width() + 10;
    if (data.indexOf('srv-') != -1){
        offsetTop -= 10;
        offsetLeft += 30;
    }
    $('.box-button-'+data).css({
        top: offsetTop,
        left: offsetLeft -20,
        opacity: 0,
        display: 'inline-block'     
    }).animate({opacity: 1, left: offsetLeft},500);
    }
});
$(".tooltip-js").on('mouseleave', function() {
    data = $(this).attr("data-tooltip-js");
    $('.box-button-'+data).css({
        opacity: 0,
        display: 'none'
    });
    $('.box-button-'+data).offset({top: 0, left: 0});
});

function show_now_pass(target){
    var input = document.getElementById('pass');
    if (input.getAttribute('type') == 'password') {
        target.classList.add('view');
        input.setAttribute('type', 'text');
    } else {
        target.classList.remove('view');
        input.setAttribute('type', 'password');
    }
    return false;
}
function InstallMod() {
    $.ajax({
        url:     "app/modules/module_page_vips/includes/controller.php",
        type:     "POST",
        data: $("#db_check").serialize()+"&function=install",
        success: function(response) {
            var jsonData = $.parseJSON(response);
            if (!(typeof jsonData.success === 'undefined')){
                note({
                    content: jsonData.success,
                    type: 'success',
                    time: 2
                });
                setTimeout(function(){window.location.href = '?page=vips';}, 1000);
                PlaySound('storage/assets/sounds/success.mp3');
            }
            else{
                setTimeout(function(){doubleClickedCon = true;} ,1000);
                note({
                    content: jsonData.error,
                    type: 'error',
                    time: 4
                });
                PlaySound('storage/assets/sounds/error.mp3');
            }
        }
    });
}
function UpdateVip(id, get, db) {
    $.ajax({
        url:     "app/modules/module_page_vips/includes/controller.php",
        type:     "POST",
        data: $("#save_user").serialize()+"&function=updatevip&steamid="+id+"&srv="+get+"&db="+db,
        success: function(response) {
            var jsonData = $.parseJSON(response);
            if (!(typeof jsonData.success === 'undefined')){
                note({
                    content: jsonData.success,
                    type: 'success',
                    time: 2
                });
            }
        }
    });
}
function DelVip(id, get, db) {
    $.ajax({
        url:     "app/modules/module_page_vips/includes/controller.php",
        type:    "POST",
        data:    "&function=delvip&steam="+id+"&srv="+get+"&db="+db,
        success: function(response) {
            var jsonData = $.parseJSON(response);
            if (!(typeof jsonData.success === 'undefined')){
                note({
                    content: jsonData.success,
                    type: 'success',
                    time: 2
                });
                setTimeout(function(){window.location.href = window.location.href;}, 1000);
                PlaySound('storage/assets/sounds/success.mp3');
            }
        }
    });
}
function AddVip(id, get) {
    $.ajax({
        url:     "app/modules/module_page_vips/includes/controller.php",
        type:    "POST",
        data:    $("#add_vip").serialize()+"&function=addvip&srv="+get+"&db="+id,
        success: function(response) {
            var jsonData = $.parseJSON(response);
            if (!(typeof jsonData.success === 'undefined')){
                note({
                    content: jsonData.success,
                    type: 'success',
                    time: 2
                });
                setTimeout(function(){window.location.href = window.location.href;}, 1000);
                PlaySound('storage/assets/sounds/success.mp3');
            }else{
                setTimeout(function(){doubleClickedCon = true;} ,1000);
                note({
                    content: jsonData.error,
                    type: 'error',
                    time: 4
                });
                PlaySound('storage/assets/sounds/error.mp3');
            }
        }
    });
}
function AddSet() {
    $.ajax({
        url:     "app/modules/module_page_vips/includes/controller.php",
        type:    "POST",
        data:    $("#add_set").serialize()+"&function=addset",
        success: function(response) {
            var jsonData = $.parseJSON(response);
            if (!(typeof jsonData.success === 'undefined')){
                note({
                    content: jsonData.success,
                    type: 'success',
                    time: 2
                });
                setTimeout(function(){window.location.href = window.location.href;}, 1000);
                PlaySound('storage/assets/sounds/success.mp3');
            }
        }
    });
}
function set_option_data(data_id) {
    $.post( "app/modules/module_page_vips/includes/controller.php", { function: "set", bool: $('#'+data_id).prop('checked'), option: data_id } );
    note({
        content: 'Сохранено',
        type: 'success',
        time: 3
    });
}
function DelGroup(element, id) {
    $.post( "app/modules/module_page_vips/includes/controller.php", { function: "delgroup", group: id } );
    note({
        content: 'Успешно',
        type: 'success',
        time: 3
    });
    element.closest('tr').remove();
}function sendAjax(id, param){
    $.ajax({
    url: 'app/modules/module_page_shop/includes/controller.php',
    type: 'post',
    data: $('#'+id).serialize()+"&button="+id+"&param="+param,
    success: function(response){
        var jsonData = JSON.parse(response);
        // Подтверждение на изменение промокода
        if (!(typeof jsonData.editPromo === 'undefined')) {
            $(".shop_edit_promo").attr("data-value", param);
            editAjaxPromo(jsonData);
        }
        else if(!(typeof jsonData.noBalance === 'undefined')) {
            note({
                content: jsonData.noBalance,
                type: 'error',
                time: 3
            });
            setTimeout(function(){window.location.href = "?page=lk";} ,3100);
        }
        // Добавление в корзину
        else if (!(typeof jsonData.addProductCart === 'undefined')) {
            let newCart = '<div class="product product_user_'+jsonData.addProductCart.key+'">'+
                '<div>'+
                    '<div class="product_name">'+jsonData.addProductCart.title+'</div>'+
                    '<div class="product_description">'+jsonData.addProductCart.description+'</div>'+
                '</div>'+
                '<div class="wrapper_produt_count">'+
                    '<form id="change-count">'+
                        '<div class="product_minus" onclick="sendAjax(\'change-count\',\''+jsonData.addProductCart.key+' -\')">-</div>'+
                    '</form>'+
                    '<div class="product_count">'+jsonData.addProductCart.count+'</div>'+
                    '<form id="change-count">'+
                        '<div class="product_plus" onclick="sendAjax(\'change-count\',\''+jsonData.addProductCart.key+' +\')">+</div>'+
                    '</form>'+
                '</div>'+
                '<div class="product_price">'+jsonData.addProductCart.price + ' ' + jsonData.addProductCart.value+'</div>'+
                '<form id="clean-basket">'+
                    '<div class="product_delete" onclick="sendAjax(\'clean-basket\', \''+jsonData.addProductCart.key+'\')"><i class="zmdi zmdi-close"></i></div>'+
                '</form>'+
           '</div>';
           $(".product_wrapper_cart").append(newCart);
           $('.circle_basket').text(+$('.circle_basket').text() + 1);
           let splitSumPrice = $('.product_price_sum_number').text().split(" ");
           $(".product_price_sum_number").text(parseInt(splitSumPrice[0]) + parseInt(jsonData.addProductCart.price) + " " + jsonData.addProductCart.value);
            if(jsonData.addProductCart.cartState == '0') {
                $(".basket_empty").css({display: "none"});
                $(".container_basket").css({display: "block"});
            }
           note({
                content: jsonData.addProductCart.translate,
                type: 'success',
                time: 2
            });
        }
        // Изменение кол-ва товара в корзине
        else if (!(typeof jsonData.countSuccess === 'undefined')) {
            let splitCount = param.split(" ");
            let count = $('.product_user_'+splitCount[0]).children(".wrapper_produt_count").children(".product_count").text();
            let price = $('.product_user_'+splitCount[0]).children(".product_price").text().split(" ");
            let splitSumPrice = $('.product_price_sum_number').text().split(" ");
            if (splitCount[1] == '-'){
                $('.product_user_'+splitCount[0]).children(".product_price").text(price[0] - price[0] / count + " " + price[1]);
                splitSumPrice = $('.product_price_sum_number').text(splitSumPrice[0] - price[0] / count  + " " + splitSumPrice[1]);
                $('.product_user_'+splitCount[0]).children(".wrapper_produt_count").children(".product_count").text(count - 1);
            }
            else {
                $('.product_user_'+splitCount[0]).children(".product_price").text(price[0] - 0 + price[0] / count + " " + price[1]);
                splitSumPrice = $('.product_price_sum_number').text(splitSumPrice[0] - 0 + price[0] / count  + " " + splitSumPrice[1])
                $('.product_user_'+splitCount[0]).children(".wrapper_produt_count").children(".product_count").text(count - 0 + 1);
            }
        }
        // Удаление товара из корзины
        else if (!(typeof jsonData.clean === 'undefined')) {
            let price = $('.product_user_'+param).children(".product_price").text().split(" ")[0];
            let splitSumPrice = $('.product_price_sum_number').text().split(" ");
            $('.product_price_sum_number').text(splitSumPrice[0] - price + " " + splitSumPrice[1]);
            $('.product_user_'+param).remove();
            $('.circle_basket').text($('.circle_basket').text() - 1);
            if(!$('.product').length){
                $('.container_basket').css({display: "none"});
                $('.basket_empty').css({display: "block"});
            }
        }
        // Подтверждение на изменение товара
        else if (!(typeof jsonData.edit === 'undefined')) {
            $(".shop_table_edit_card").attr("data-value", param);
            editTable(jsonData);
        }
        // Подтверждение
        else if (!(typeof jsonData.success === 'undefined')){
            note({
                content: jsonData.success,
                type: 'success',
                time: 2
            });
            setTimeout(function(){window.location = window.location.href} ,2000);
        }
        //Ошибка
        else{
            note({
                content: jsonData.error,
                type: 'error',
                time: 4
            });
        }
    },
});
return false;
}
function editTable(data) {
    $("#title_edit_card").val(data.edit.title);
    $("#description_edit_card").val(data.edit.description.replace('<br/>', /\n/g, ));
    $("#image_edit_path").val(data.edit.image);
    $("#price_edit_card").val(data.edit.price);
    $("#value_edit_card").val(data.edit.value);
    $("#time_edit_card").val(data.edit.time);
    $("#group_edit_card").val(data.edit.group_name);
    $("#amount_edit_card").val(data.edit.amount);
    $("#rcon_edit_command").val(data.edit.group_name);
    $("#web_group_"+data.edit.gid).prop("selected", true);
    $("#type_card_"+data.edit.type).prop("selected", true);
    $(".shop_black_screen").show();
    viewAdminPoints(data.edit.type);
    $(".shop_table_edit_card").show();
}
function editAjaxPromo(data) {
    $("#edit_name_promo").val(data.editPromo.name);
    $("#edit_value_promo").val(data.editPromo.value);
    $("#edit_count_promo").val(data.editPromo.count);
    $(".shop_black_screen").show();
    $(".shop_edit_promo").show();
}
function viewAdminPoints(id) {
    $('.view-shop').hide();
    $('.view-shop-'+id).css( "display", "block" );
}
function showShopTable(id) {
    $(".shop_black_screen").show();
    $("."+id).show();
    viewAdminPoints(0);
}
function hideShopTable(id) {
    $("."+id).hide();
    $(".shop_black_screen").hide();
}
function showCatalog(id, elem) {
    $('.shop_row_cards').css({display:"none"});
    $('.shop_server_id_'+id).css({display:"flex"});
    $(".shop_server_active").removeClass("shop_server_active");
    $(elem).addClass("shop_server_active");
}
flagMove = 0;
function moveBasket(){
    if(flagMove == 0) {
        $(".button_basket").addClass("animate_basket");
        $(".basket").animate({right:"15px"}, { duration: 200, queue: false });
        flagMove = 1;
    } else {
        $(".button_basket").removeClass("animate_basket");
        $(".basket").animate({right:"-400px"}, { duration: 200, queue: false });
        flagMove = 0;
    }
}var animateButton = function(e) {

  e.preventDefault;
  //reset animation
  e.target.classList.remove('animate');
  
  e.target.classList.add('animate');
  setTimeout(function(){
    e.target.classList.remove('animate');
  },700);
};

var bubblyButtons = document.getElementsByClassName("bubbly-button");

for (var i = 0; i < bubblyButtons.length; i++) {
  bubblyButtons[i].addEventListener('click', animateButton, false);
}function liveUp(e)
{
	$.ajax({
		type:"POST",
		url:window.location.href,
		data:{live:e}
	})
}

function to_sale(e)
{
	$.ajax({
		type:"POST",
		url:window.location.href,
		data:{sale:e},
		success:function(e){
			let t=jQuery.parseJSON(e.trim());
			t.bal&&($(".material-balance").html(t.bal),Swal.close())
		}
	})
}

function pick_up(e)
{
	$.ajax({
		type:"POST",
		url:window.location.href,
		data:{up:e},
		success:function(){Swal.close()}
	})
}

function pick_up_wins(a){
	$.ajax({
		type:"POST",
		url:window.location.href,
		data:{up:a},
		success:function(e){
			let t=jQuery.parseJSON(e.trim());
			if(t.allow)
			{
				Swal.fire({allowOutsideClick: !1,allowEscapeKey: !1,allowEnterKey: !1, showConfirmButton:!1,background:t.style,html:t.html});
			}
			else Swal.fire({showConfirmButton:!1,background:t.style,html:t.html});

			$("#rem"+a).html('<a onclick="my_wins('+a+')">WIN</a>')
		}
	})
}
function to_sale_wins(a)
{
	$.ajax({
		type:"POST",
		url:window.location.href,
		data:{sale:a},
		success:function(e){
			let t=jQuery.parseJSON(e.trim());
			t.bal&&($("#rem"+a).html("<a>ПРОДАНО</a>"),
				$(".material-balance").html(t.bal))
		}
	})
}
function my_wins(e)
{
	$.ajax({
		type:"POST",
		url:window.location.href,
		data:{wins:e},
		success:function(e){
			let t=jQuery.parseJSON(e.trim());
			Swal.fire({showConfirmButton:!1,background:t.style,html:t.html})
		}
	})
}
function load_roulette(e){
	$.ajax({
		type:"POST",
		url:window.location.href,
		data:{case_id:e},
		success:function(e){
			jQuery.parseJSON(e.trim()).forEach(function(e){
				$(".roulette-inner").prepend($(rouletteHtml(e.style,e.data,e.img,e.desc,e.name)))}),
			options={},
			rouletter=$("div#roulette"),
			rouletter.roulette(options)
		}
	})
}
function rouletteHtml(e,t,a,i,o)
{
	return'<div class="subject-block '+e+'" data-value="'+t+'"><div class="b-top"></div><div class="b-bottom"></div><div class="b-left"></div><div class="b-right"></div><div class="subject-services"><div class="subject-fix"><div class="subject-image-wrapper"><img width="120" class="subject-image" src="'+a+'" alt="'+o+" "+i+'"></div><div class="subject"><span>'+o+"</span><span>"+i+"</span></div></div></div></div>"
}
function get_random(e,t)
{
	return Math.floor(Math.random()*(t-e+1))+e
}
function open_case(e){$.ajax({type:"POST",url:window.location.href,data:{case_id_open:e},success:function(e){$("#open-case").attr("disabled","true"),$("#open-case-fast").attr("disabled","true");var t=jQuery.parseJSON(e.trim());return t.error?(Swal.fire("",t.error,""),$("#open-case-fast").removeAttr("disabled"),void $("#open-case").removeAttr("disabled")):t.message?(Swal.fire({showConfirmButton:!1,width:400,background:t.style,html:t.message}),t.date&&jQuery(document).ready(function(){jQuery(".eTimer").eTimer({etType:0,etDate:t.date,etTitleText:"",etTitleSize:10,etShowSign:1,etSep:":",etFontFamily:"Arial Black",etTextColor:"black",etPaddingTB:0,etPaddingLR:0,etBackground:"transparent",etBorderSize:0,etBorderRadius:0,etBorderColor:"white",etShadow:" 0px 0px 0px 0px #333333",etLastUnit:4,etNumberFontFamily:"Arial Black",etNumberSize:20,etNumberColor:"white",etNumberPaddingTB:0,etNumberPaddingLR:3,etNumberBackground:"var(--span-color)",etNumberBorderSize:0,etNumberBorderRadius:0,etNumberBorderColor:"white",etNumberShadow:"inset 0px 0px 9px 0px rgba(0, 0, 0, 0.5)"})}),$("#open-case-fast").removeAttr("disabled"),void $("#open-case").removeAttr("disabled")):($(".material-balance").html(t.ubal),options={stopImageNumber:t.win,duration:get_random(1,2),startCallback:function(){$("#open-case").attr("disabled","true"),$("#open-case-fast").attr("disabled","true")},stopCallback:function(e){setTimeout(function(){$("#open-case-fast").removeAttr("disabled"),$("#open-case").removeAttr("disabled"),play_case_sound("drop"),Swal.fire({allowOutsideClick:!1,allowEscapeKey:!1,allowEnterKey:!1,showConfirmButton:!1,width:400,background:t.style,html:t.html}),t.wcash&&($(".material-balance").html(t.wcash),setTimeout(function(){Swal.close()},2e3)),audio_i=0,liveUp(t.live),live_refresh()},600)}},rouletter.roulette("option",options),void rouletter.roulette("start"))}})}function open_case_fast(e){$.ajax({type:"POST",url:window.location.href,data:{case_id_open:e},success:function(e){$("#open-case").attr("disabled","true"),$("#open-case-fast").attr("disabled","true");var t=jQuery.parseJSON(e.trim());return t.error?(Swal.fire("",t.error,""),$("#open-case").removeAttr("disabled"),void $("#open-case-fast").removeAttr("disabled")):t.message?(Swal.fire({showConfirmButton:!1,width:400,background:t.style,html:t.message}),t.date&&jQuery(document).ready(function(){jQuery(".eTimer").eTimer({etType:0,etDate:t.date,etTitleText:"",etTitleSize:10,etShowSign:1,etSep:":",etFontFamily:"Arial Black",etTextColor:"black",etPaddingTB:0,etPaddingLR:0,etBackground:"transparent",etBorderSize:0,etBorderRadius:0,etBorderColor:"white",etShadow:" 0px 0px 0px 0px #333333",etLastUnit:4,etNumberFontFamily:"Arial Black",etNumberSize:20,etNumberColor:"white",etNumberPaddingTB:0,etNumberPaddingLR:3,etNumberBackground:"#b04311",etNumberBorderSize:0,etNumberBorderRadius:0,etNumberBorderColor:"white",etNumberShadow:"inset 0px 0px 9px 0px rgba(0, 0, 0, 0.5)"})}),$("#open-case").removeAttr("disabled"),void $("#open-case-fast").removeAttr("disabled")):($(".material-balance").html(t.ubal),$("#open-case").removeAttr("disabled"),$("#open-case-fast").removeAttr("disabled"),play_case_sound("drop"),Swal.fire({allowOutsideClick:!1,allowEscapeKey:!1,allowEnterKey:!1,showConfirmButton:!1,width:400,background:t.style,html:t.html}),t.wcash&&($(".material-balance").html(t.wcash),setTimeout(function(){Swal.close()},2e3)),audio_i=0,liveUp(t.live),void live_refresh())}})}function live_entry_create(e,t,a,i,o,r,s){return'<li class="live-item"><a class="live-link live-link-'+s+'" href="?page=cases&case='+e+'"><div class="live-inner-wrap"><div class="live-inner"><div class="live-image-wrap"><img src="'+o+'" class="live-image"></div><div class="live-title">'+a+'</div></div><div class="live-hover"><div class="live-case-image"><img src="'+r+'" alt=""></div><div class="live-username">'+i+"</div></div></div></a></li>"}var live={};function live_refresh(){$.ajax({type:"POST",url:window.location.href,data:{liveLoad:!0},success:function(e){jQuery.parseJSON(e.trim()).forEach(function(e){if(0==live.hasOwnProperty(e.liveid)){$("#live_content").prepend($(live_entry_create(e.id,e.cname,e.sname,e.uname,e.simg,e.cimg,e.style))),live[e.liveid]=!0;var t=document.getElementById("live_content"),a=t.children;for(i=a.length-1;0<=i&&!(i<=14);i--)t.removeChild(a[i])}})}})}function live_load(){live_refresh(),setInterval(live_refresh,5e3)}function set_cookie(e,t,a,i,o,r){document.cookie=e+"="+escape(t)+(a?"; expires="+a:"")+(i?"; path="+i:"")+(o?"; domain="+o:"")+(r?"; secure":"")}function get_cookie(e){var t=" "+document.cookie,a=" "+e+"=",i=null,o=0,r=0;return 0<t.length&&-1!=(o=t.indexOf(a))&&(o+=a.length,-1==(r=t.indexOf(";",o))&&(r=t.length),i=unescape(t.substring(o,r))),i}var audio=[];function roulette_sound(){$("#sound-point").hasClass("sound-on")?($("#sound-point").removeClass("sound-on"),$("#sound-point").addClass("sound-off"),set_cookie("roulette_sound","off"),cases_roulette_sound=2):$("#sound-point").hasClass("sound-off")&&($("#sound-point").removeClass("sound-off"),$("#sound-point").addClass("sound-on"),set_cookie("roulette_sound","on"),cases_roulette_sound=1)}function play_case_sound(e){audio_i++,1==cases_roulette_sound&&(audio[audio_i]=new Audio,audio[audio_i].volume=.06,"scroll"==e&&(audio[audio_i].src="app/modules/module_page_open_case/assets/sounds/scroll.wav"),"drop"==e&&(audio[audio_i].src="app/modules/module_page_open_case/assets/sounds/drop.wav"),audio[audio_i].play())}audio_i=0,cases_roulette_sound=1;

function pick_up_wins_to_server()
{
	$.ajax({
        type: 'POST',
        url: window.location.href,
        data: {
        	win_up_server: $('select[name="wins_to_server"]').val()
        },
        success: function(reuslt)
        {   
            var t = jQuery.parseJSON(reuslt.trim());
            if(t.allow)
			{
				Swal.fire({allowOutsideClick: !1,allowEscapeKey: !1,allowEnterKey: !1, showConfirmButton:!1,background:t.style,html:t.html});
			}
			else Swal.fire({showConfirmButton:!1,background:t.style,html:t.html});
        }
    });
}

function pick_up_wins_accept(a)
{
	$.ajax({
        type: 'POST',
        url: window.location.href,
        data: {
        	win_up_confirm: a
        },
        success: function(reuslt)
        {   
            var t = jQuery.parseJSON(reuslt.trim());
            if(t.allow)
			{
				Swal.fire({allowOutsideClick: !1,allowEscapeKey: !1,allowEnterKey: !1, showConfirmButton:!1,background:t.style,html:t.html});
			}
			else Swal.fire({showConfirmButton:!1,background:t.style,html:t.html});
        }
    });
}

;(function($) {
  var units = {
      en: ['Days', 'Hours', 'Minutes', 'Seconds'],
      ru: ['дней', 'часов', 'минут', 'секунд'],
      sec: [86400, 3600, 60, 1]
    },
    defaults = {
      etType: 1,
      etDate: '0',
      etTitleText: '',
      etTitleSize: 14,
      etShowSign: 'EN',
      etSep: ':',
      etFontFamily: 'Arial',
      etTextColor: 'black',
      etPaddingTB: 0,
      etPaddingLR: 0,
      etBackground: 'transparent',
      etBorderSize: 0,
      etBorderRadius: 0,
      etBorderColor: 'transparent',
      etShadow: '',
      etLastUnit: 4,
      etNumberFontFamily: 'Arial',
      etNumberSize: 32,
      etNumberColor: 'black',
      etNumberPaddingTB: 0,
      etNumberPaddingLR: 0,
      etNumberBackground: 'transparent',
      etNumberBorderSize: 0,
      etNumberBorderRadius: 0,
      etNumberBorderColor: 'transparent',
      etNumberShadow: ''
    };

  $.fn.eTimer = function(options) {
    var config = $.extend({}, defaults, options);

    return this.each(function() {
      var element = $(this),
        date = config.etDate,
        dayNum = 2;

      element.date = function() {
        var now = new Date();
        if (config.etType == 1) {
          date = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1);
        } else if (config.etType == 2) {
          var day = now.getDay();
          if (day == 0) day = 7;
          date = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 8 - day);
        } else if (config.etType == 3) {
          date = new Date(now.getFullYear(), now.getMonth() + 1, 1);
        } else {
          date = date.split('.');
          date = new Date(date[2], date[1] - 1, date[0], date[3], date[4]);
          if (Math.floor((date - now) / units.sec[0] / 1000) >= 100) dayNum = 3;
        }
      };

      element.layout = function() {
        var unit,
          elClass = element.attr('class').split(' ')[0];
        element.html('').addClass('eTimer').append('<div class="etTitle">' + config.etTitleText + '</div>');
        $.each(units.en, function(i) {
          if (i < config.etLastUnit) {
            unit = $('<div class="etUnit et' + this + '"></div>').appendTo(element).append('<div class="etNumber">0</div>').append('<div class="etNumber">0</div>').after('<div class="etSep">' + config.etSep + '</div>');
            if (i == 0 && dayNum == 3) unit.append('<div class="etNumber">0</div>');
            if (config.etShowSign === 'RU'){
              unit.append('<div class="etSign">' + units.ru[i] + '</div>');
            }
            else {
              unit.append('<div class="etSign">' + units.en[i].toLowerCase() + '</div>');
            }
          }
        });
        element.append('<style type="text/css">.' + elClass + ' {display: inline-block; line-height: normal; font-family: ' + config.etFontFamily + '; color: ' + config.etTextColor + '; padding: ' + config.etPaddingTB + 'px ' + config.etPaddingLR + 'px; background: ' + config.etBackground + '; border: ' + config.etBorderSize + 'px solid ' + config.etBorderColor + '; -webkit-border-radius: ' + config.etBorderRadius + 'px; -moz-border-radius: ' + config.etBorderRadius + 'px; border-radius: ' + config.etBorderRadius + 'px; -webkit-box-shadow: ' + config.etShadow + '; -moz-box-shadow: ' + config.etShadow + '; box-shadow: ' + config.etShadow + ';} .' + elClass + ' .etTitle {margin-bottom: 10px; font-size: ' + config.etTitleSize + 'px;} .' + elClass + ' .etUnit {display: inline-block;} .' + elClass + ' .etUnit .etNumber {display: inline-block; margin: 1px; text-align: center; font-family: ' + config.etNumberFontFamily + '; font-size: ' + config.etNumberSize + 'px; color: ' + config.etNumberColor + '; padding: ' + config.etNumberPaddingTB + 'px ' + config.etNumberPaddingLR + 'px; background: ' + config.etNumberBackground + '; border: ' + config.etNumberBorderSize + 'px solid ' + config.etNumberBorderColor + '; -webkit-border-radius: ' + config.etNumberBorderRadius + 'px; -moz-border-radius: ' + config.etNumberBorderRadius + 'px; border-radius: ' + config.etNumberBorderRadius + 'px; -webkit-box-shadow: ' + config.etNumberShadow + '; -moz-box-shadow: ' + config.etNumberShadow + '; box-shadow: ' + config.etNumberShadow + ';} .' + elClass + ' .etUnit .etSign {text-align: center; font-size: ' + (+config.etNumberSize / 2.5) + 'px;} .' + elClass + ' .etSep {display: inline-block; vertical-align: top; font-size: ' + config.etNumberSize + 'px; padding: ' + (+config.etNumberPaddingTB + +config.etNumberBorderSize) + 'px 5px;} .' + elClass + ' .etSep:last-of-type {display: none;}</style>').append('<style type="text/css">.' + elClass + ' .etUnit .etNumber {width: ' + $('.etNumber:visible').eq(0).css('width') + ';}</style>');
      };

      element.tick = function() {
        var timeLeft = Math.floor((date - new Date()) / 1000),
          unit;
        if (timeLeft < 0) clearInterval(element.data('interval'));
        else {
          $.each(units.en, function(i) {
            if (i < config.etLastUnit) {
              unit = Math.floor(timeLeft / units.sec[i]);
              timeLeft -= unit * units.sec[i];
              if (i == 0 && dayNum == 3) {
                element.find('.et' + this).find('.etNumber').eq(0).text(Math.floor(unit / 100) % 10);
                element.find('.et' + this).find('.etNumber').eq(1).text(Math.floor(unit / 10) % 10);
                element.find('.et' + this).find('.etNumber').eq(2).text(unit % 10);
                if ((Math.floor(unit / 100) % 10) == 0) {
                  dayNum = 2;
                  element.find('.et' + this).find('.etNumber').eq(0).remove();
                }
              } else {
                element.find('.et' + this).find('.etNumber').eq(0).text(Math.floor(unit / 10) % 10);
                element.find('.et' + this).find('.etNumber').eq(1).text(unit % 10);
              }
            }
          });
        }
      };

      clearInterval(element.data('interval'));
      element.date();
      element.layout();
      element.tick();
      element.data('interval', setInterval(function() {
        element.tick()
      }, 1000));
    });
  };
})(jQuery);$(document).ready(function(){
	$(document).on('input','[name="promocode"],[name="amount"],[name="steam"]',function(){
	var promocode=$('[name="promocode"]'),
		amount=$('[name="amount"]'),
		steam=$('[name="steam"]');

	if(promocode.val() && $.isNumeric(amount.val()) && steam.val()){

		$.ajax({
				type:'POST',
				url: window.location.href, 
				data:'promocode='+promocode.val()+'&amount='+amount.val()+'&steamid='+steam.val(),
				cache:false,
			success:function(result){
				if(result.trim()){
					result=jQuery.parseJSON(result.trim());
					if(result.result){
						$('#promoresult').html(result.result);
					}else{
						$('#promoresult').html(false);}
					}
				}
			});
	}else{
		$('#promoresult').html(false);
	}
});
	$(document).on('input','[name="steam"]',function(){
	var steam=$('[name="steam"]');

	if(steam.val()){

		$.ajax({
				type:'POST',
				url: window.location.href, 
				data:'steamidload='+steam.val(),
				cache:false,
			success:function(result){
				if(result.trim()){
					result=jQuery.parseJSON(result.trim());
					if(result.img){
						$('#profile').html('<img class="badge" width="64" src="'+result.img+'"><br><small>'+result.name+'</small>');
					}else{
						$('#profile').html(false);}
					}
				}
			});
	}else{
		$('#profile').html(false);
	}
});
	$('form').submit(function(event){
		if($(this).attr('data-default'))
		{
			var del = $(this).attr('data-get');
			event.preventDefault();
			var mess;
			$.ajax({
				type: $(this).attr('method'),
				url: window.location.href,
				data: new FormData(this),
				contentType: false,
				cache: false,
				processData: false,
				success: function(result){
					mess = jQuery.parseJSON(result.trim());
					if(mess.status)
					{
						if(mess.status == 'success')
						{
							setTimeout(function(){
						
								if(del){
									removeParam(del);
								}else{
									window.location.reload();
								}
							}, 4100);
						}
							note({
							  content: mess.text,
							  type: mess.status,
							  time: 4
							});
					}
					else if(mess.location)
					{	
						window.location.href = mess.location;
					}
					else 
					{
						$('#resultForm').html(mess.text);
						document.getElementById('punsh').click();
					}
				}
			});
		}
	});

        document.addEventListener("click", removeElem("col-md-6", "data-del", "delete"));
	});

	function removeElem(delElem, attribute, attributeName) {
	  if (!(delElem && attribute && attributeName)) return;
	  return function(e) {
	    let target = e.target;
	    if (!(target.hasAttribute(attribute) ?
	        (target.getAttribute(attribute) === attributeName ? true : false) : false)) return;
	    	removeParam(target.getAttribute('data-get'));
	    let elem = target;
	    while (target != this) {
	      if (target.classList.contains(delElem)) {
	        target.remove();
	        return;
	      }
	      target = target.parentNode;
	    }
	    return;
	  };
	}

	function removeParam(key) {
	  var splitUrl = window.location.href.split('?'),
	    rtn = splitUrl[0],
	    param,
	    params_arr = [],
	    queryString = (window.location.href.indexOf("?") !== -1) ? splitUrl[1] : '';
	  if (queryString !== '') {
	    params_arr = queryString.split('&');
	    for (var i = params_arr.length - 1; i >= 0; i -= 1) {
	      param = params_arr[i].split('=')[0];
	      if (param === key) {
	        params_arr.splice(i, 1);
	      }
	    }
	    rtn = rtn + '?' + params_arr.join('&');
	  }
	  window.location.href = rtn;
	}
!function(d) {

  "use strict";

  Object.assign||Object.defineProperty(Object,"assign",{enumerable:!1,configurable:!0,writable:!0,value:function(e,r){"use strict";if(null==e)throw new TypeError("Cannot convert first argument to object");for(var t=Object(e),n=1;n<arguments.length;n++){var o=arguments[n];if(null!=o)for(var a=Object.keys(Object(o)),c=0,b=a.length;c<b;c++){var i=a[c],l=Object.getOwnPropertyDescriptor(o,i);void 0!==l&&l.enumerable&&(t[i]=o[i])}}return t}});

  "remove" in Element.prototype||(Element.prototype.remove=function(){this.parentNode&&this.parentNode.removeChild(this)});

  window.note = function(settings) {

    settings = Object.assign({},{
      callback:    false,
      content:     "",
      time:        4.5,
      type:        "info"
    }, settings);

    if(!settings.content.length) return;

    var create = function(name, attr, append, content) {
      var node = d.createElement(name);
      for(var val in attr) { if(attr.hasOwnProperty(val)) node.setAttribute(val, attr[val]); }
      if(content) node.insertAdjacentHTML("afterbegin", content);
      append.appendChild(node);
      if(node.classList.contains("note-item-hidden")) node.classList.remove("note-item-hidden");
      return node;
    };

    var noteBox = d.getElementById("notes") || create("div", { "id": "notes" }, d.body);
    var noteItem = create("div", {
        "class": "note-item",
        "data-show": "false",
        "role": "alert",
        "data-type": settings.type
      }, noteBox),
      noteItemText = create("div", { "class": "note-item-text" }, noteItem, settings.content),
      noteItemBtn = create("button", {
        "class": "note-item-btn",
        "type": "button",
      }, noteItem);

    var isVisible = function() {
      var coords = noteItem.getBoundingClientRect();
      return (
        coords.top >= 0 &&
        coords.left >= 0 &&
        coords.bottom <= (window.innerHeight || d.documentElement.clientHeight) && 
        coords.right <= (window.innerWidth || d.documentElement.clientWidth) 
      );
    };
   
    var remove = function(el) {
      el = el || noteItem;
      el.setAttribute("data-show","false");
      window.setTimeout(function() {
        el.remove();
      }, 250);
      if(settings.callback) settings.callback(); // callback
    };

    noteItemBtn.addEventListener("click", function() { remove(); });

    window.setTimeout(function() {
      noteItem.setAttribute("data-show","true");
      PlaySound('storage/assets/sounds/'+settings.type+'.mp3');
    }, 250);

    if(!isVisible()) remove(noteBox.firstChild);

    window.setTimeout(remove, settings.time * 1000);

  };

}(document);class Accordion {
  constructor(el) {
    // Store the <details> element
    this.el = el;
    // Store the <summary> element
    this.sumiri = el.querySelector('.sumiri');
    // Store the <div class="content"> element
    this.contint = el.querySelector('.contint');

    // Store the animation object (so we can cancel it if needed)
    this.animation = null;
    // Store if the element is closing
    this.isClosing = false;
    // Store if the element is expanding
    this.isExpanding = false;
    // Detect user clicks on the summary element
    this.sumiri.addEventListener('click', (e) => this.onClick(e));
  }

  onClick(e) {
    // Stop default behaviour from the browser
    e.preventDefault();
    // Add an overflow on the <details> to avoid content overflowing
    this.el.style.overflow = 'hidden';
    // Check if the element is being closed or is already closed
    if (this.isClosing || !this.el.open) {
      this.open();
    // Check if the element is being openned or is already open
    } else if (this.isExpanding || this.el.open) {
      this.shrink();
    }
  }

  shrink() {
    // Set the element as "being closed"
    this.isClosing = true;
    
    // Store the current height of the element
    const startHeight = `${this.el.offsetHeight}px`;
    // Calculate the height of the summary
    const endHeight = `${this.sumiri.offsetHeight}px`;
    
    // If there is already an animation running
    if (this.animation) {
      // Cancel the current animation
      this.animation.cancel();
    }
    
    // Start a WAAPI animation
    this.animation = this.el.animate({
      // Set the keyframes from the startHeight to endHeight
      height: [startHeight, endHeight]
    }, {
      duration: 400,
      easing: 'ease-out'
    });
    
    // When the animation is complete, call onAnimationFinish()
    this.animation.onfinish = () => this.onAnimationFinish(false);
    // If the animation is cancelled, isClosing variable is set to false
    this.animation.oncancel = () => this.isClosing = false;
  }

  open() {
    // Apply a fixed height on the element
    this.el.style.height = `${this.el.offsetHeight}px`;
    // Force the [open] attribute on the details element
    this.el.open = true;
    // Wait for the next frame to call the expand function
    window.requestAnimationFrame(() => this.expand());
  }

  expand() {
    // Set the element as "being expanding"
    this.isExpanding = true;
    // Get the current fixed height of the element
    const startHeight = `${this.el.offsetHeight}px`;
    // Calculate the open height of the element (summary height + content height)
    const endHeight = `${this.sumiri.offsetHeight + this.contint.offsetHeight}px`;
    
    // If there is already an animation running
    if (this.animation) {
      // Cancel the current animation
      this.animation.cancel();
    }
    
    // Start a WAAPI animation
    this.animation = this.el.animate({
      // Set the keyframes from the startHeight to endHeight
      height: [startHeight, endHeight]
    }, {
      duration: 400,
      easing: 'ease-out'
    });
    // When the animation is complete, call onAnimationFinish()
    this.animation.onfinish = () => this.onAnimationFinish(true);
    // If the animation is cancelled, isExpanding variable is set to false
    this.animation.oncancel = () => this.isExpanding = false;
  }

  onAnimationFinish(open) {
    // Set the open attribute based on the parameter
    this.el.open = open;
    // Clear the stored animation
    this.animation = null;
    // Reset isClosing & isExpanding
    this.isClosing = false;
    this.isExpanding = false;
    // Remove the overflow hidden and the fixed height
    this.el.style.height = this.el.style.overflow = '';
  }
}

document.querySelectorAll('details').forEach((el) => {
  new Accordion(el);
});//Я не js'ер, если тут много говна, скажите мне как сделать лучше, научусь
'use strict';

//let's
let bool = true,
paginationbleat = 1,
b = 0,
contents,
blya,
style,
bleat,
object,
param,
accforum,
func,
dop,
newObject;

$(function (){

    OpenHOME();

    //Подключение редактора и JQ UI
    $('head').append('<link rel="stylesheet" rel="nofollow" href="app/modules/module_page_forum/assets/js/editor/theme/default/wbbtheme.css" type="text/css" />');
    $.getScript( "//ajax.googleapis.com/ajax/libs/jqueryui/1.12.1/jquery-ui.min.js" );
    $.getScript( "app/modules/module_page_forum/assets/js/editor/jquery.wysibb.js" );
    //END

    window.onpopstate = function(event) {
        if(event.state != null)
        {
            if(getget("c") != '' && getget("p") != '' && getget('a') != '') { 
                GetPage(getget("c"), getget("p"), getget('a'));
            }
            if(getget("c") != '' && getget("p") == '' && getget('a') == '') { 
                GetPage(getget("c"));
            }
            if(getget("c") != '' && getget("p") != '' && getget('a') == '') { 
                GetPage(getget("c"), getget("p"));
            }
        }
    };

    var navPos, winPos;
    function refreshVar() {
        if($('.navbar').length) navPos = $('.navbar').offset().top;
    }

    refreshVar();

    $(window).resize(refreshVar);
       $(window).scroll(function() {
        winPos = $(window).scrollTop();
        (winPos > navPos) ?  $('.scrollup-btn').addClass('rotate') : $('.scrollup-btn').removeClass('rotate');
    });

    $('.scrollup-btn').click(function(){
        CheckUp();
        if($(this).hasClass('rotate')){
            $('body,html').animate({ scrollTop:0 },300);
        }else{
            $('body,html').animate({ scrollTop:$(document).height() },300);
        }
    });

    $(".blyahui").hide();
    $('#zdarova').show(100);
    $(document).on('click', '.smena', function() {
        let display = $( "#" + $(this).data("id") ).css( "display" );
        if(display == 'none') { 
            $(".blyahui").hide();
            $( "#" + $(this).data("id") ).css( "display", 'flex' )
            $(".smena").removeClass("active");
        }
        $(this).addClass("active");
    });
    $(document).on("mouseover", ".zalupaihuina", function () {
        $(this).get(0).play();
    });
    $(document).on("mouseout", ".zalupaihuina", function () {
        $(this).get(0).pause();
    });
    $('.menu-name').hide(100);
    $(document).on('click', '.menu-btn', function(e) {
        let btn = $('.menu-btn'), //Сама кнопка
        item    = $('#oneitem'), //Я хз че это
        name    = $(".menu-name"), //Я короче не помню что тут за каша
        blocks  = $('.blocks'),
        block1  = $('.block-2');

        if(btn.hasClass('opened') == false) {
            btn.addClass('opened').animate({'left':'170px', 'margin': '15px'}, 300);

            setTimeout(function() { 
                item.animate({'margin-top':'10px'}, 100);
            }, 300);

            name.each(function(i) {
                $(this).delay(200*i).fadeToggle();
            });

            blocks.animate({'grid-template-columns':'+=100px'}, 500);

            block1.delay(200).animate({'padding-top': '65px'}, 500);
        } else {
            item.animate({'margin-top':'70px'}, 300)

            name.fadeToggle('fast');

            btn.removeClass('opened').animate({'left':'0', 'margin': '10px'}, 300);

            blocks.animate({'grid-template-columns':'-=100px'}, 500);

            block1.delay(300).animate({'padding-top': '10px'}, 300);
        }
    });
    $(document).on('click', '.block-naming', function() {
        accforum = $( this );
        if(accforum.hasClass('active') == false) {
            accforum.addClass('active');
            accforum.siblings('.panel').animate({'max-height': accforum.siblings('.panel').prop('scrollHeight') + 'px', 'margin-top': '10px'}, 100);
        } else {
            accforum.removeClass('active');
            accforum.siblings('.panel').animate({'max-height': '0px', 'margin-top': '0px'}, 100);
        }
    });
    $(".target-hyiarget").hide();
    $(document).on('click', '.navbar-smena', function() {
        let display = $( "#" + $(this).data("id") ).css( "display" );
        if(display == 'none') { 
            $(".target-hyiarget").hide();
            $( "#" + $(this).data("id") ).css( "display", 'flex' )
            $(".navbar-smena").removeClass("active");
        }
        $(this).addClass("active");
    });
    $(document).on("mouseover", "[data-block]", function () {
        $(".profile-ranks-info").removeClass("active");
        $("#rank"+$(this).data("block")).addClass("active");
    });
    $(document).on("mouseout", "[data-block]", function () {
        $(".profile-ranks-info").removeClass("active");
    });
    let timer;
    $(document).on("mouseenter","[data-steam]",function(e) {
        let hyinya      =   this;
        timer = setTimeout(function(){
            let c       =   $(hyinya).position(),
            X           =   c.left,     // положения по оси X
            Y           =   c.top,      // положения по оси Y
            data_id     =   $(hyinya).data('steam'), //Получение стим айди
            position    =   $('#'+data_id + 'position'), //Сама модалка
            content     =   $('#contents'); //Родительский блок для модалки
            //Проверка, существует ли такой уже
            if($("div").is('#'+data_id + 'position')) {
                X + 300 > content.width() ? position.css({'top':Y + 130, 'left':X - 550}).addClass("mini_display") : position.css({'top':Y + 130, 'left':X + 150}).addClass("mini_display");
            } else {
                $.ajax({
                    type:   "POST", 
                    url:    location.href,
                    data:   {
                        'steam':    data_id,
                        'page': '   miniprofile'
                    },
                    success: function(html) {
                        X + 300 > content.width() ? style = 'top:' + Math.round(Y + 130) + 'px;left:' + Math.round(X - 550) : style = 'top:' + Math.round(Y + 130) + 'px;left:' + Math.round(X + 150);
                        object = content.append('<div style="'+style+'px" id="'+data_id+'position" class="mini_profile_block">'+html+'</div>');
                        $('#'+data_id+'position').addClass("mini_display");
                    }
                });
            }
        }, 500);
    });
    $(document).on("mouseout", "[data-steam]", function () {
        blya = this;
        bleat = setTimeout(function() { 
            $('.mini_profile_block').removeClass("mini_display");
        }, 300);
        clearTimeout(timer);
    });
    $(document).on("mouseleave", ".mini_profile_block", function () {
        $('.mini_profile_block').removeClass("mini_display");
    });
    $(document).on("mouseenter", ".mini_profile_block", function () {
        clearTimeout(bleat);
    });
    $(document).on('click', '.chrome-vkladka', function(){
        $('.chrome-vkladka').removeClass('active-chrome');
        param = $(this).attr('data-cat');
        $(this).addClass('active-chrome');
        $('#editblock').html('');
        GetPage('adminpanel', '', param, '#hyi');
    });
    $(document).on('click', '#check-timeout', function(){
        if ($(this).is(':checked')){
            $('#zalupa').show(100);
        } else {
            $('#zalupa').hide(100);
        }
    });
    $(document).on('click', '#check-timeout_theme', function(){
        if ($(this).is(':checked')){
            $('#blyat').show(100);
        } else {
            $('#blyat').hide(100);
        }
    });
    $(document).on('change', '#back', function() {
        $(this).children("option").filter(":checked").each(function() {
            var x = $(this);
            $('#deleteback').show();
            if(x.attr('data-video')) {
                $('#selectedback').html(`
                <video playsinline="" autoplay="" muted="" loop="">
                    <source src="`+x.val()+`" type="video/webm">
                </video>`);
            } else {
                $('#selectedback').html('<img class="imgbackselect" src="'+x.val()+'">');
            }
        });
    });
});

//Functions

function DeleteBack()
{
    AJS('deleteback', '', $('#back option[value="'+$('#back').val()+'"]').html());
}

function OpenHOME() {
    if(!CheckBlock())
        return false;
    $('.block-sections').each(function(i, element) {
        $(element).children().eq(0).addClass('active');
        $(element).children().eq(0).siblings('.panel').animate({'max-height': $(element).children().eq(0).siblings('.panel').prop('scrollHeight') + 'px', 'margin-top': '10px'}, 100);
    });
}

function CheckBlock() {
    if($('#open-bleat-cyka').length > 0)
        return true;
    else
        return false;
}

function ChangeRange(type) {
    (type == undefined) ? $('#valuerange').html($('#range').val() + ' Мин') : $('#valuerange_theme').html($('#range_theme').val() + ' Мин');
}
function UploadBACK() {
    var formData = new FormData();
	$.each($('#upload-file')[0].files, function(i, file) {
		formData.append('upload-file', file);
	});
    formData.append('video', $("#check-back-video").prop('checked'));
    formData.append('func', 'uploadback');
	$.ajax({
		url:            location.href,
		type:           "POST",
		dataType :      "json", 
		cache:          false,
		contentType:    false,
		processData:    false,			
		data:           formData,
		success: function(response) {
            if (!(typeof response.success === 'undefined')){
                note({
                    content: response.success,
                    type: 'success',
                    time: 2
                });
            } else{
                note({
                    content: response.error,
                    type: 'error',
                    time: 2
                });
                PlaySound('storage/assets/sounds/error.mp3');
            }
		}
    });
    return false;
}
function AJS(func, form, param = '', dop = '') {
    if($("#editor").html() != undefined) $("#editor").sync();
    let url  = $(form).serialize() + '&param=' + param + '&func=' + func;
    $.ajax({
        url:            location.href,
        type:           "POST",
        data:           url,
        success: function(response) {
            var jsonData = $.parseJSON(response);
            if (!(typeof jsonData.success === 'undefined')){
                note({
                    content: jsonData.success,
                    type: 'success',
                    time: 2
                });
                if(dop != '') {
                    switch (dop) {
                        case 'msg':
                            GetPage('topic', param, jsonData.page);
                            setTimeout(function() {
                                $('html').animate({ scrollTop: $("#sendhyeta").offset().top }, 400);
                            }, 300);
                        break;
                        case 'deletemsg':
                            $('#'+param).remove();
                        break;
                        case 'like':
                            content = $('#'+param+'like');
                            if(content.html().trim() == '')
                                content.html('Понравилось: <a onclick="GetPage(`profile`, `'+jsonData.steam+'`)">'+jsonData.name+'</a>');
                            else
                                content.html(content.html() + ' <a onclick="GetPage(`profile`, `'+jsonData.steam+'`)">'+jsonData.name+'</a>');
                        break;
                    }
                }
            } else{
                note({
                    content: jsonData.error,
                    type: 'error',
                    time: 2
                });
                PlaySound('storage/assets/sounds/error.mp3');
            }
        }
    });
}
function GetPage(page, param1 = '', param2 = '', content = 0) {
    $('.mini_profile_block').hide();
    if(content == 0) { 
        contents = '#contents';
        paginationbleat = 1;
    } else {
        contents = content;
    }
    //$(contents).html('Загрузка...');
    if(bool == false && content == 0) {
        if(b > 0) return false;
        setTimeout(function() { 
            bool = true;
            GetPage(page, param1, param2);
        }, 700);
        b++;
    } else {
        bool = false;
        $.ajax({
            url:        location.href,
            type:       "POST",
            data:       "&page="+page+"&param1="+param1+"&param2="+param2,
            xhr: function(){
                $('.progress-bar').css('width', '0%');
                $('.progress-bar').removeClass('hide');
                var xhr = $.ajaxSettings.xhr();
                if (xhr.upload) {
                    xhr.upload.addEventListener('progress', function(event) {
                        var percent = 0;
                        var position = event.loaded || event.position;
                        var total = event.total;
                        if (event.lengthComputable)
                        {
                            percent = Math.ceil(position / total * 100);
                        }
                        //update progressbar
                        $(".progress-bar").animate({"width": +percent +"%"});
                    }, true);
                }
                return xhr;
            },
            success: function(response) {
                setTimeout(function() { $(".progress-bar").addClass('hide')}, 500);
                if(response != undefined && response != '' && response != '{"error"}') {
                    $(contents).html(response);
                    if(param2) {
                        $('#'+param2).prop('selected', true);
                    }
                } else {
                    $('.more-topics').remove();
                    $(contents).html('Данных нет!');
                }
                if(page != '' && content == 0) 
                {
                    if(param1 != '' && param2 != '') {
                        hashupdate('?page=forum&c='+page+'&p='+param1+'&a='+param2);
                    }
                    if(param1 != '' && param2 == '') {
                        hashupdate('?page=forum&c='+page+'&p='+param1);
                    } 
                    if(param1 == '' && param2 == ''){
                        hashupdate('?page=forum&c='+page);
                    }
                }
                paginationbleat++;
                setTimeout(() => bool = true, 700);
                b = 0;
                OpenHOME();
                CheckUp();
            }
        });
    }
}
function hashupdate(e) {
    history.pushState({}, null, e);
}
function getget(e) {
    var t = window.location.search;
    return !!(t = t.match(new RegExp(e + "=([^&=]+)"))) && t[1]
}
if(getget("page")) {
    if(getget("page").match(/(forum)/gi)) {
        if(getget("c") != '' && getget("p") != '' && getget('a') != '') { 
            GetPage(getget("c"), getget("p"), getget('a'));
        }
        if(getget("c") != '' && getget("p") == '' && getget('a') == '') { 
            GetPage(getget("c"));
        }
        if(getget("c") != '' && getget("p") != '' && getget('a') == '') { 
            GetPage(getget("c"), getget("p"));
        }
    }
}
function saveOrder() {
    var articleorder=[];
    $("#sortable-ul > li").each(function(j) {
        if($(this).attr('data-article-id') != undefined) {
            newObject = {};
            if($(this).find('li')) {
                $(this).find('li').each(function(i, element) {
                    newObject[i] = {
                        id: $(element).attr('data-category-id'),
                        index: $(element).index()
                    };
                });
            }
            articleorder[j] = {
                id: $(this).attr('data-article-id'),
                index: $(this).index(),
                cat: newObject,
            }
        }
    });
    AJS('sort', '', JSON.stringify(articleorder));
}
function CheckUp()
{
    ($('.card-cacheebaniy').height() <= 1240) ? $('.scrollup-btn').hide(100) : $('.scrollup-btn').show(100);
}

if(typeof notecheck != 'undefined') noteforum(notecheck);
function noteforum(settings) {
    settings = Object.assign({},{
        callback:    false,
        content:     "",
        time:        3,
        type:        "info"
    }, settings);

    if(!settings.content.length) return;

    var create = function(name, attr, append, content) {
        var node = document.createElement(name);
        for(var val in attr) { if(attr.hasOwnProperty(val)) node.setAttribute(val, attr[val]); }
        if(content) node.insertAdjacentHTML("afterbegin", content);
        append.appendChild(node);
        if(node.classList.contains("note-forum-item-hidden")) node.classList.remove("note-forum-item-hidden");
        return node;
    };

    var noteBox = document.getElementById("notes-forum") || create("div", { "id": "notes-forum" }, document.body);
    var noteItem = create("div", {
            "class": "note-forum-item",
            "data-show": "true",
            "role": "alert",
            "data-type": settings.type
        }, noteBox),
        noteItemText = create("div", { "class": "note-forum-item-text" }, noteItem, settings.content),
        noteItemBar = create("div", { "class": "note-forum-item-progressbar" }, noteItem, '<div style="transition: width '+settings.time*900+'ms linear 0s;"></div>'),
        noteItemBtn = create("button", {
            "class": "note-forum-item-btn",
            "type": "button",
        }, noteItem);
        $('.note-forum-item-progressbar>div').animate({width: '100%'});

    var isVisible = function() {
        var coords = noteItem.getBoundingClientRect();
        return (
            coords.top >= 0 &&
            coords.left >= 0 &&
            coords.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
            coords.right <= (window.innerWidth || document.documentElement.clientWidth)
        );
    };

    var remove = function(el) {
        el = el || noteItem;
        el.setAttribute("data-show","false");
        window.setTimeout(function() {
            el.remove();
        }, 250);
        if(settings.callback) settings.callback(); // callback
    };

    noteItemBtn.addEventListener("click", function() { remove(); });

    window.setTimeout(function() {
        noteItem.setAttribute("data-show","true");
    }, 250);

    if(!isVisible()) remove(noteBox.firstChild);

    window.setTimeout(remove, settings.time * 1000);

}
var version = "1.2.8";if ($('#nestable').length > 0) {
    !function (d, h, p, l) {
        var a = "ontouchstart" in p, c = function () {
            var t = p.createElement("div"), e = p.documentElement;
            if (!("pointerEvents" in t.style)) return !1;
            t.style.pointerEvents = "auto", t.style.pointerEvents = "x", e.appendChild(t);
            var s = h.getComputedStyle && "auto" === h.getComputedStyle(t, "").pointerEvents;
            return e.removeChild(t), !!s
        }(), s = {
            listNodeName: "ol",
            itemNodeName: "li",
            rootClass: "dd",
            listClass: "dd-list",
            itemClass: "dd-item",
            dragClass: "dd-dragel",
            handleClass: "dd-handle",
            placeClass: "dd-placeholder",
            noDragClass: "dd-nodrag",
            emptyClass: "dd-empty",
            group: 0,
            maxDepth: 5,
            threshold: 20
        };

        function i(t, e) {
            this.w = d(p), this.el = d(t), this.options = d.extend({}, s, e), this.init()
        }

        i.prototype = {
            init: function () {
                var s = this;
                s.reset(), s.el.data("nestable-group", this.options.group), s.placeEl = d('<div class="' + s.options.placeClass + '"/>'), d.each(this.el.find(s.options.itemNodeName), function (t, e) {
                    s.setParent(d(e))
                }), s.el.on("click", "button", function (t) {
                    if (!s.dragEl) {
                        var e = d(t.currentTarget);
                        e.data("action"), e.parent(s.options.itemNodeName)
                    }
                });
                var t = function (t) {
                    var e = d(t.target);
                    if (!e.hasClass(s.options.handleClass)) {
                        if (e.closest("." + s.options.noDragClass).length) return;
                        e = e.closest("." + s.options.handleClass)
                    }
                    e.length && !s.dragEl && (s.isTouch = /^touch/.test(t.type), s.isTouch && 1 !== t.touches.length || (t.preventDefault(), s.dragStart(t.touches ? t.touches[0] : t)))
                }, e = function (t) {
                    s.dragEl && s.dragMove(t.touches ? t.touches[0] : t)
                }, i = function (t) {
                    s.dragEl && (t.preventDefault(), s.dragStop(t.touches ? t.touches[0] : t))
                };
                a && (s.el[0].addEventListener("touchstart", t, !1), h.addEventListener("touchmove", e, !1), h.addEventListener("touchend", i, !1), h.addEventListener("touchcancel", i, !1)), s.el.on("mousedown", t), s.w.on("mousemove", e), s.w.on("mouseup", i)
            }, serialize: function () {
                var i = this;
                return step = function (t, e) {
                    var s = [];
                    return t.children(i.options.itemNodeName).each(function () {
                        var t = d(this), e = d.extend({}, t.data());
                        t.children(i.options.listNodeName);
                        s.push(e)
                    }), s
                }, step(i.el.find(i.options.listNodeName).first(), 0)
            }, serialise: function () {
                return this.serialize()
            }, reset: function () {
                this.mouse = {
                    offsetX: 0,
                    offsetY: 0,
                    startX: 0,
                    startY: 0,
                    lastX: 0,
                    lastY: 0,
                    nowX: 0,
                    nowY: 0,
                    distX: 0,
                    distY: 0,
                    dirAx: 0,
                    dirX: 0,
                    dirY: 0,
                    lastDirX: 0,
                    lastDirY: 0,
                    distAxX: 0,
                    distAxY: 0
                }, this.isTouch = !1, this.moving = !1, this.dragEl = null, this.dragRootEl = null, this.dragDepth = 0, this.hasNewRoot = !1, this.pointEl = null
            }, expandAll: function () {
                var t = this;
                t.el.find(t.options.itemNodeName).each(function () {
                    t.expandItem(d(this))
                })
            }, setParent: function (t) {
            }, unsetParent: function (t) {
            }, dragStart: function (t) {
                var e = this.mouse, s = d(t.target), i = s.closest(this.options.itemNodeName);
                this.placeEl.css("height", i.height()), e.offsetX = t.offsetX !== l ? t.offsetX : t.pageX - s.offset().left, e.offsetY = t.offsetY !== l ? t.offsetY : t.pageY - s.offset().top, e.startX = e.lastX = t.pageX, e.startY = e.lastY = t.pageY, this.dragRootEl = this.el, this.dragEl = d(p.createElement(this.options.listNodeName)).addClass(this.options.listClass + " " + this.options.dragClass), this.dragEl.css("width", i.width()), i.after(this.placeEl), i[0].parentNode.removeChild(i[0]), i.appendTo(this.dragEl), d(p.body).append(this.dragEl), this.dragEl.css({
                    left: t.pageX - e.offsetX,
                    top: t.pageY - e.offsetY
                });
                var a, o, n = this.dragEl.find(this.options.itemNodeName);
                for (a = 0; a < n.length; a++) (o = d(n[a]).parents(this.options.listNodeName).length) > this.dragDepth && (this.dragDepth = o)
            }, dragStop: function (t) {
                var e = this.dragEl.children(this.options.itemNodeName).first();
                e[0].parentNode.removeChild(e[0]), this.placeEl.replaceWith(e), this.dragEl.remove(), this.el.trigger("change"), this.hasNewRoot && this.dragRootEl.trigger("change"), this.reset()
            }, dragMove: function (t) {
                var e, s = this.options, i = this.mouse;
                this.dragEl.css({
                    left: t.pageX - i.offsetX,
                    top: t.pageY - i.offsetY
                }), i.lastX = i.nowX, i.lastY = i.nowY, i.nowX = t.pageX, i.nowY = t.pageY, i.distX = i.nowX - i.lastX, i.distY = i.nowY - i.lastY, i.lastDirX = i.dirX, i.lastDirY = i.dirY, i.dirX = 0 === i.distX ? 0 : 0 < i.distX ? 1 : -1, i.dirY = 0 === i.distY ? 0 : 0 < i.distY ? 1 : -1;
                var a = Math.abs(i.distX) > Math.abs(i.distY) ? 1 : 0;
                if (!i.moving) return i.dirAx = a, void (i.moving = !0);
                i.dirAx !== a ? (i.distAxX = 0, i.distAxY = 0) : (i.distAxX += Math.abs(i.distX), 0 !== i.dirX && i.dirX !== i.lastDirX && (i.distAxX = 0), i.distAxY += Math.abs(i.distY), 0 !== i.dirY && i.dirY !== i.lastDirY && (i.distAxY = 0)), i.dirAx = a;
                var o = !1;
                if (c || (this.dragEl[0].style.visibility = "hidden"), this.pointEl = d(p.elementFromPoint(t.pageX - p.body.scrollLeft, t.pageY - (h.pageYOffset || p.documentElement.scrollTop))), c || (this.dragEl[0].style.visibility = "visible"), this.pointEl.hasClass(s.handleClass) && (this.pointEl = this.pointEl.parent(s.itemNodeName)), this.pointEl.hasClass(s.emptyClass)) o = !0; else if (!this.pointEl.length || !this.pointEl.hasClass(s.itemClass)) return;
                var n = this.pointEl.closest("." + s.rootClass),
                    l = this.dragRootEl.data("nestable-id") !== n.data("nestable-id");
                if (!i.dirAx || l || o) {
                    if (l && s.group !== n.data("nestable-group")) return;
                    if (this.dragDepth - 1 + this.pointEl.parents(s.listNodeName).length > s.maxDepth) return;
                    var r = t.pageY < this.pointEl.offset().top + this.pointEl.height() / 2;
                    this.placeEl.parent(), o ? ((e = d(p.createElement(s.listNodeName)).addClass(s.listClass)).append(this.placeEl), this.pointEl.replaceWith(e)) : r ? this.pointEl.before(this.placeEl) : this.pointEl.after(this.placeEl), this.dragRootEl.find(s.itemNodeName).length || this.dragRootEl.append('<div class="' + s.emptyClass + '"/>'), l && (this.dragRootEl = n, this.hasNewRoot = this.el[0] !== this.dragRootEl[0])
                }
            }
        }, d.fn.nestable = function (e) {
            var s = this;
            return this.each(function () {
                var t = d(this).data("nestable");
                t ? "string" == typeof e && "function" == typeof t[e] && (s = t[e]()) : (d(this).data("nestable", new i(this, e)), d(this).data("nestable-id", (new Date).getTime()))
            }), s || this
        }
    }(window.jQuery || window.Zepto, window, document), $(document).ready(function () {
        var t = function (t) {
            var e = t.length ? t : $(t.target), s = e.data("output");
            window.JSON ? s.val(window.JSON.stringify(e.nestable("serialize"))) : s.val("JSON browser support required for this demo.")
        };
        $("#nestable").nestable({group: 1}).on("change", t), t($("#nestable").data("output", $("#nestable-output")))
    }), $(document).ready(function () {
        $("#load").hide(), $(".dd").on("change", function () {
            $("#load").show();
            var t = {data: $("#nestable-output").val()};
            $.ajax({
                type: "POST", url: window.location.href, data: t, cache: !1, success: function (t) {
                    $("#load").hide()
                }, error: function (t, e, s) {
                }
            })
        })
    });
}



function delete_server(element) {
    $.post( window.location.href, { del_server: element.closest('tr').id } );
    note({
        content: 'Сервер удалён',
        type: 'success',
        time: 3
    });
    element.closest('tr').remove();
}

function action_db_delete_table(id,element) {
    $.post( window.location.href, { function: "delete", table: element } );
    note({
        content: 'Таблица удалена',
        type: 'success',
        time: 3
    });
    id.closest('tr').remove();
    $("tr." + element).remove();
}
let doubleClickedCon = true;
function addConection(){
    if(doubleClickedCon){
        doubleClickedCon = false;
        $.ajax({
            url: window.location.href,
            type: 'post',
            data: $('#form-add-conection').serialize()+"&function=add_conection",
            success: function(response){
                var jsonData = JSON.parse(response);
                if (!(typeof jsonData.success === 'undefined')){
                    note({
                        content: jsonData.success,
                        type: 'success',
                        time: 2
                    });
                    setTimeout(function(){window.location = window.location.href.replace(window.location.hash, '#');location.reload(true);
                } , 2000);
                }
                else{
                    setTimeout(function(){doubleClickedCon = true;} ,1000);
                    note({
                        content: jsonData.error,
                        type: 'error',
                        time: 4
                    });
                }
            },
        });
    }
}
function changeConnection(mod) {

    document.getElementById('con_mod_name').innerHTML = 'Мод: '+mod;
    document.getElementById('con_mod_id').value = mod;
    document.getElementById('add_conection_button').setAttribute("href", "#add_connect");
    document.getElementById('custom_mod_wrapper').setAttribute("style", "display: none;");
    document.getElementById('con_table_name').value = "";
    document.getElementById('rank_pack_connection').setAttribute("style", "display: none;");
    var select = document.querySelector('select[name="game_mod"]');
    select[0].value = 730;
    select[0].textContent  = 'CS:GO';
    select[1].value = 240;
    select[1].textContent  = 'CS:S';
    
    if(mod == 'custom') {
        document.getElementById('custom_mod_wrapper').setAttribute("style", "display: block;");
    }
    let db_hide = document.querySelectorAll('.con_active');
    for (let i = 0; i < db_hide.length; i++) {
        db_hide[i].classList.remove("con_active");
    }
    let db_show = document.querySelectorAll('.con_'+mod);
    for (let i = 0; i < db_show.length; i++) {
        db_show[i].classList.add("con_active");
    }
    if (mod == 'LevelsRanks') {
        document.getElementById('con_table_name').value = "lvl_base";
        document.getElementById('rank_pack_connection').setAttribute("style", "display: block;");
    } else if (mod == 'Vips') {
        document.getElementById('con_table_name').value = "vip_";
    } else if (mod == 'SourceBans') {
        document.getElementById('con_table_name').value = "sb_";
    } else if (mod == 'lk'){
        document.getElementById('con_table_name').value = "lk";
        select[0].value = 1;
        select[0].textContent  = 'LK Impulse';
        select[1].value = 2;
        select[1].textContent  = 'LK D4ck';
    }

}
function changeConnect(value){
    if (value == 'db') {
        document.getElementById('db_select_con').setAttribute("style", "display: none;");
        document.getElementById('db_option_con').setAttribute("style", "display: flex;");
    } else {
        document.getElementById('db_select_con').setAttribute("style", "display: block;");
        document.getElementById('db_option_con').setAttribute("style", "display: none;");
    }
}
function changeNameModule(){
    let val = document.getElementById('mods').value;
    let db_show = document.querySelectorAll('.con_'+document.getElementById('custom_mod_name').value);
    for (let i = 0; i < db_show.length; i++) {
        db_show[i].classList.add("con_active");
    }
    if (val == 'custom') {
        document.getElementById('con_mod_name').innerHTML = 'Mod: '+document.getElementById('custom_mod_name').value;
        document.getElementById('con_mod_id').value = document.getElementById('custom_mod_name').value;
    }
}
function show_hide_password(target){
    var input = document.getElementById('con_password');
    if (input.getAttribute('type') == 'password') {
        target.classList.add('view');
        input.setAttribute('type', 'text');
    } else {
        target.classList.remove('view');
        input.setAttribute('type', 'password');
    }
    return false;
}
var animateButton = function(e) {

  e.preventDefault;
  //reset animation
  e.target.classList.remove('animate');
  
  e.target.classList.add('animate');
  setTimeout(function(){
    e.target.classList.remove('animate');
  },700);
};

var bubblyButtons = document.getElementsByClassName("bubbly-button");

for (var i = 0; i < bubblyButtons.length; i++) {
  bubblyButtons[i].addEventListener('click', animateButton, false);
}let minplayers = 0,maxplayers = 0;
if (servers != 0) {
    $.ajax({
        type: 'POST',
        url: "./app/modules/module_block_main_servers_monitoring/includes/ServerTest.php",
        data: ({data: servers}),
        dataType: 'json',
        global: false,
        async:true,
        success: function( data ) {
            for (var i = 0; i < data.length; i++) {
                minplayers += data[i]['players'];
                maxplayers += data[i]['max_players'];
                document.getElementById('server-name-' + i).innerHTML = data[i]['name'];
                document.getElementById('server-map-image-' + i).setAttribute("src", data[i]['map_img']);
                document.getElementById('server-image-' + i).setAttribute("src", data[i]['game_icon']);
                document.getElementById('server-players-' + i).innerHTML = data[i]['players'] + "/" + data[i]['max_players'];
                document.getElementById('server-map-' + i).innerHTML = data[i]['map'];
                document.getElementById('online_gr-' + i).setAttribute("style", "width:" + 100*data[i]['players']/data[i]['max_players'] + "%");
                document.getElementById('server-ip-' + i).innerHTML = data[i]['ip'];
                document.getElementById('btn_connect_' + i).setAttribute("href", "steam://connect/" + data[i]['ip'] );
            }
            document.getElementById('min_players').innerHTML = minplayers;
            document.getElementById('max_players').innerHTML = maxplayers;
        }
    });
};var animateButton = function(e) {

  e.preventDefault;
  //reset animation
  e.target.classList.remove('animate');
  
  e.target.classList.add('animate');
  setTimeout(function(){
    e.target.classList.remove('animate');
  },700);
};

var bubblyButtons = document.getElementsByClassName("bubbly-button");

for (var i = 0; i < bubblyButtons.length; i++) {
  bubblyButtons[i].addEventListener('click', animateButton, false);
}