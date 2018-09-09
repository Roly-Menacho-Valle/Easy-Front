$(document).ready(function() {

    // Efecto Para el menu Sidebar 1
    $(".menu__icon").click(function() {
        $(".main__menu").css("left", "0px");

        function showMenu() {
            $(".main__menu").css("-webkit-clip-path", "polygon(0 0,100% 0,100% 100%,0% 100%)");
            $(".main__menu").css("clip-path", "polygon(0 0,100% 0,100% 100%,0% 100%)");
            $(".menu__icon").animate({ right: '-100' }, 300);
        }
        setTimeout(showMenu, 100);
    });

    $(".close").click(function() {
        $(".main__menu").css("-webkit-clip-path", "polygon(0 0,0% 0,100% 100%,0% 100%)");
        $(".main__menu").css("clip-path", "polygon(0 0,0% 0,100% 100%,0% 100%)");

        function hideMenu() {
            $(".main__menu").css("left", "-400px");
            $(".menu__icon").animate({ right: '50' }, 300);
        }
        setTimeout(hideMenu, 300);

        function originalLayout() {
            $(".main__menu").css("-webkit-clip-path", "polygon(0 0,100% 0,0% 100%,0% 100%)");
            $(".main__menu").css("clip-path", "polygon(0 0,100% 0,0% 100%,0% 100%)");
        }
        setTimeout(originalLayout, 600);
    })

    // Efecto Para el menu Sidebar 2
    $(".menu-icon").click(function() {
        $(".menu-icon").toggleClass("activa")
    })

    $(".menu-icon").click(function() {
        $(".sidebar").toggleClass("activa")
    })

    // Efecto Formulario
    $(".input").focus(function() {
        $(this).parent().addClass("focus");
    }).blur(function() {
        if ($(this).val() === '') {
            $(this).parent().removeClass("focus");
        }
    });

    // Efecto MouseMove
    $('.banner').mousemove(function(e) {
        var moveX = (e.pageX * -1 / 15);
        var moveY = (e.pageY * -1 / 15);
        $(this).css('background-position', moveX + 'px ' + moveY + 'px')
    })

    // Typed 
    var typed = new Typed("#infoServices", {
        strings: ["Our Services", "About us", "Because we",
            "What Characterizes us", "Personal Attention",
            "Web Design", "Graphic Design", "Logo Design",
            "Marketing Digital"
        ],
        typeSpeed: 50,
        backSpeed: 150,
        loop: true,
        smartBackspace: true
    })
});
