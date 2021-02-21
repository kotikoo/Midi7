<!DOCTYPE html>
<html lang="ru">

<!-- Mirrored from russia.myarena.site/ by HTTrack Website Copier/3.x [XR&CO'2014], Sat, 20 Feb 2021 14:13:15 GMT -->
<!-- Added by HTTrack -->
<meta http-equiv="content-type" content="text/html;charset=utf-8" /><!-- /Added by HTTrack -->

<head>
    <script src="{{ asset('kit.fontawesome.com/dc75fb85a6.js') }}" crossorigin="anonymous"></script>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
    <meta name="description" content="Russia Project">
    <meta property="og:description" content="Russia Project">
    <meta name="author" content="https//vk.com/M0st1ce">
    <link rel="icon" href="favicon.ico" type="image/x-icon">
    <title>Russia Project</title>
    <link rel="image_src" href="https://cdn.discordapp.com/icons/751772849353523222/a_773fdc448dd5d250a75a764675e8ec61.png?size=128">
    <link rel="stylesheet" type="text/css"
        href="{{ asset('russia.myarena.site_443/storage/assets/css/generation/style_generated.min.ver.1613229744.css') }}">
    <link rel="stylesheet" type="text/css"
        href="{{ asset('cdnjs.cloudflare.com/ajax/libs/material-design-iconic-font/2.2.0/css/material-design-iconic-font.min.css') }}">
    <style>
        :root {
            --bg-color: #2b2b2b;
            --navbar-color: rgba(0, 0, 0, 0.7);
            --sidebar-color: rgba(0, 0, 0, 0.7);
            --sidebar-gradient-1: #ffd968;
            --sidebar-gradient-2: #ff6262;
            --item-color: #fff;
            --default-text-color: #fff;
            --top-text-color: #737373;
            --default-text-color-invert: #111;
            --hover: rgba(0, 0, 0, 0.7);
            --table-line: #515151;
            --svg: 100;
            --font-weight-0: 400;
            --font-weight-1: 500;
            --font-weight-2: 500;
            --font-weight-3: 600;
            --font-weight-4: 700;
            --span-color: #F27B26;
            --span-color-addit: #FA9546;
            --span-color-back: #b34b01c9;
            --server-graph-rgba: 255, 117, 0, 0.9
        }

        body {
            background-image: url(storage/cache/img/global/backgrounds/flames_1.jpg)
        }

        .container-fluid {
            max-width: 1920px
        }

        .main-sidebar {
            background-color: rgba(0, 0, 0, 0.5);
            backdrop-filter: blur(4px)
        }

        .sidebar-menu li:hover {
            background-color: rgba(0, 0, 0, 0.6)
        }

        .table-active {
            background-color: rgba(0, 0, 0, 1)
        }

        .card {
            background-color: rgba(0, 0, 0, 0.5);
            backdrop-filter: blur(7px)
        }

        .table th {
            border-bottom: 0px solid var(--hover)
        }

        .table-hover tbody tr:hover {
            background-color: rgba(0, 0, 0, 0.6)
        }

        .input-form .input_text {
            color: var(--default-text-color)
        }

        .input-form .border-checkbox-label {
            color: var(--default-text-color)
        }

        .sidebar-right {
            background-color: rgba(0, 0, 0, 0.5);
            backdrop-filter: blur(7px)
        }

        .sidebar-collapse .user-sidebar-block {
            height: 59px;
        }

    </style>
    <script>
        var avatar = [];
        var servers = [];
        var profile;

    </script>
</head>

<body>

    <aside class="main-sidebar offcanvas">
        <section class="sidebar">
            <div class="user-sidebar-block">
                <div class="user-info">
                    @if (Auth::check())
                    <img id="0" ondrag="return false" ondragstart="return false" src="{{ Auth::user()->avatar }}">
                    <div class="user-details">
                        <span class="user_name">{{ Auth::user()->name }}</span>
                        <span>
                                <a href="{{ route('logout') }}">გასვლა</a>
                        </span>
                    </div>
                    @else
                    <img id="0" ondrag="return false" ondragstart="return false" src="https://cdn.discordapp.com/icons/751772849353523222/a_773fdc448dd5d250a75a764675e8ec61.png?size=128">
                    <div class="user-details">
                        <span class="user_name"><a href="{{ route('login') }}">ავტორიზაცია</a></span>
                    </div>
                    @endif

                </div>
            </div>
            <ul class="sidebar-menu">
                <li class="tooltip-js" data-tooltip-js="home">
                    <a href="{{ route('index') }}" class="table-active">
                        <div class="sidebar-icon">
                            <i class="zmdi zmdi-home zmdi-hc-fw"></i> </div>
                        <div class="item-name">
                            მთავარი </div>
                    </a>
                </li>
                <li class="tooltip-js" data-tooltip-js="1-0">
                    <a href="index8aed.html?page=toppoints">
                        <div class="sidebar-icon">
                            <i class="zmdi zmdi-accounts-alt zmdi-hc-fw"></i> </div>
                        <div class="item-name">
                            სტატისტიკა</div>
                    </a>
                </li>

                <li class="tooltip-js" data-tooltip-js="4-0">
                    <a href="indexb4ac.html?page=vips">
                        <div class="sidebar-icon">
                            <i class="zmdi zmdi-star zmdi-hc-fw"></i> </div>
                        <div class="item-name">
                            V.I.P მოთამაშეები </div>
                    </a>
                </li>
                @if (Auth::check())
                <li class="tooltip-js" data-tooltip-js="8-0">
                    <a href="indexa8ba.html?page=lk">
                        <div class="sidebar-icon">
                            <i class="zmdi zmdi-money zmdi-hc-fw"></i> </div>
                        <div class="item-name">
                            პირადი კაბინეტი </div>
                    </a>
                </li>
                @endif
                <li class="tooltip-js" data-tooltip-js="9-0">
                    <a href="indexdc27.html?page=admins">
                        <div class="sidebar-icon">
                            <i class="zmdi zmdi-accounts-list zmdi-hc-fw"></i> </div>
                        <div class="item-name">
                            სერვერის ადმინისტრატორები </div>
                    </a>
                </li>
                <li class="tooltip-js" data-tooltip-js="10-0">
                    <a href="index7809.html?page=sbor">
                        <div class="sidebar-icon">
                            <i class="zmdi zmdi-zmdi zmdi-money zmdi-hc-fw"></i> </div>
                        <div class="item-name">
                            Midi7 [CASUAL] Server </div>
                    </a>
                </li>

                <li class="tooltip-js" data-tooltip-js="11-0">
                    <a href="index7809.html?page=sbor">
                        <div class="sidebar-icon">
                            <i class="zmdi zmdi-zmdi zmdi-money zmdi-hc-fw"></i> </div>
                        <div class="item-name">
                            Midi7 [AIM] Server </div>
                    </a>
                </li>
                <li class="tooltip-js" data-tooltip-js="13-0">
                    <a href="https://steamcommunity.com/groups/russiaproject" target="_blank">
                        <div class="sidebar-icon">
                            <i class="zmdi zmdi-steam-square zmdi-hc-fw"></i> </div>
                        <div class="item-name">
                            სტიმის ჯგუფი </div>
                    </a>
                </li>
                <li class="tooltip-js" data-tooltip-js="13-2">
                    <a href="https://discord.gg/gCbXptK" target="_blank">
                        <div class="sidebar-icon">
                            <img src="data:image/png;base64,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" class=svg> </div>
                        <div class="item-name">
                            Midi7 დისქორდი </div>
                    </a>
                </li>
            </ul>
        </section>
    </aside>
    <!-- Tooltip Block -->
    <div class="tooltip-sidebar box-button-srv-0" style="">No Translation</div>
    <div class="tooltip-sidebar box-button-home">მთავარი</div>
    <div class="tooltip-sidebar box-button-1-0">
        სტატისტიკა </div>
    <div class="tooltip-sidebar box-button-4-0">
        V.I.P მოთამაშეები </div>
    @if (Auth::check())
    <div class="tooltip-sidebar box-button-8-0">
        პირადი კაბინეტი </div>
    @endif
    <div class="tooltip-sidebar box-button-9-0">
        სერვერის ადმინისტრატორები</div>
    <div class="tooltip-sidebar box-button-10-0">
        Midi7 [CASUAL] Server </div>
    <div class="tooltip-sidebar box-button-11-0">
        Midi7 [CASUAL] Server </div>
    <div class="tooltip-sidebar box-button-12-0">
        Список банов </div>
    <div class="tooltip-sidebar box-button-13-0">
        სტიმის ჯგუფი </div>
    <div class="tooltip-sidebar box-button-13-1">
        Midi7 დისქორდი </div>

    <!-- End -->
    <div class=navbar>
        <div class=logo-area>
            <a href="javascript:void(0);" onclick="action_sidebar()" class="nav-toggle pp-nav-toggle"><i></i></a> <a
                href="index.html"><img ondrag="return false" ondragstart="return false"
                    src="https://cdn.discordapp.com/icons/751772849353523222/a_773fdc448dd5d250a75a764675e8ec61.png?size=128"></a>
        </div>

    </div>
    <div class="global-container">
        <div class="container-fluid">
    @yield('content')
    <div class="row" style="margin-bottom: 20px;">
        <div class="col-md-12">
            <div class="card">
                <div class="footer" style="text-align: center; padding: 5px;margin-right: 10px;margin-left: 10px;">
                  <ul class="cp"><div style="margin-bottom: 10px;">
                        <li class="cp"><a class="cp" href="https://discord.gg/HKSkscQE" target="_blank"><i class="icon"> <img src="data:image/png;base64,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" class="svg"></i></a></li>
                        <li class="cp"><a class="cp" href="https://steamcommunity.com/groups/midi7" target="_blank"><i class="zmdi zmdi-steam-square zmdi-hc-fw"></i></a></li>
                  </ul>
                    2021 - 2021 © MIDI7 Project
                    <br>
                    <b>პროექტის შემქმნელი</b><a href="https://steamcommunity.com/id/KOTIKOOO/" target="_blank"><b style="text-color: red;" > K O T I K O O</b>
                    <br>
                </div>
            </div>
        </div>
    </div>
        </div>
    </div>
</div>
    </div>
    <script src="{{ asset('ajax.aspnetcdn.com/ajax/jQuery/jquery-3.4.1.min.js') }}"></script>

</body>

<script src="{{ asset('russia.myarena.site_443/storage/assets/js/generation/app_generated.min.ver.1613229744.js') }}">
</script>
