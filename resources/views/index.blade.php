@extends('includes/app')
@section('content')

        <div class="row">
            <div class="col-md-12">
                <div class="card">
                    <div class="card-header">
                        <h5 class="badge">ტოპ 25 მოთამაშეები</h5>
                    </div>
                    <table class="table table-hover">
                        <thead>
                            <tr>
                                <th class="text-center">#</th>
                                <th class="tb-avatar"></th>
                                <th class="text-left">მოთამაშე</th>
                                <th class="text-center">ფოინთები</th>
                            </tr>
                        </thead>
                        <tbody>
                            <script>
                                CheckAvatar = 0;
                                if (CheckAvatar == 1) {
                                    avatar.push("76561199037002171");
                                }
                            </script>
                            <tr class="pointer"
                                onclick="location.href = '//russia.myarena.site/?page=profiles&amp;profile=STEAM_1:1:538368221&amp;search=1';">
                                <th class="text-center">1</th>
                                <th class="text-right tb-avatar"><img class="rounded-circle" id="76561199037002171"
                                        src="https://steamcdn-a.akamaihd.net/steamcommunity/public/images/avatars/1a/1ae314b93927a6d20a9a5bac354abd7c6bf4b990.jpg">
                                </th>
                                <th class="table-text text-left tb-name">
                                    <a href="//russia.myarena.site/?page=profiles&amp;profile=STEAM_1:1:538368221&amp;search=1">
                                        cursed RussiaProj...</a></th>
                                <th class="text-center">3 370 RUB.</th>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
        <style>
            ul.cp {
                margin: 0;
                /* Обнуляем значение отступов */
                margin-bottom: 10px;
            }

            ul.cp li.cp {
                display: inline;
                /* Отображать как строчный элемент */
                margin-right: 10px;
                /* Отступ слева */
            }

            a.cp:active {
                color: #7755d2;
            }

            a.cp:hover {
                color: #7755d2;
            }

            a.cp {
                color: #ffffff;
            }

            i {
                font-size: 18px;
            }

        </style>



@endsection
