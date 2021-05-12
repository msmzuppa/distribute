<?php

ini_set('display_startup_errors', 1);
ini_set("error_log", "/php-error.log");
ini_set('display_errors', 1);
error_reporting(E_ALL);


$menus=[0=>["nome"=>"index"],
        1=>["nome"=>"empresa"],
        2=>["nome"=>"example", "submenus" => [0=>["nome"=>"subexample1"], 1=>["nome"=>"subexample2"], 2=>["nome"=>"subexample3"]] ], 3=>["nome"=>"subexample4", 
            "submenus" => [0=>["nome"=>"subexample1"], 1=>["nome"=>"subexample2"], 2=>["nome"=>"subexample3"], 3=>["nome"=>"subexample4"]]],
        5=>["nome"=>"example2"],
        6=>["nome"=>"example3"],
        7=>["nome"=>"example4"],
        8=>["nome"=>"example3"],
        9=>["nome"=>"example4"],
        10=>["nome"=>"example3"],
        11=>["nome"=>"example4"],
        12=>["nome"=>"example3"],
        13=>["nome"=>"example4"],
        14=>["nome"=>"example3"],
        15=>["nome"=>"example4"],
        16=>["nome"=>"example5"]
];

    ?>
<style>
    .submenu{
        background:#777;
    }

    html, body{
        margin: 0;
        padding: 0;
        width: 100%;
        height: 100%;
        box-sizing: border-box;
    }
    .menu{
        width: 100%;
        float:left;
        clear:both;
    }
</style>

<html>
    <head><title>distribute js</title></head>
    <body>
        <div class="menu"></div>
        <div class="menuhandle" style="display: none;"><?php
            foreach($menus as $menu){ ?>
                <div class="submenu">
                    <div class="titlemenu"><?php echo $menu["nome"]; ?></div>
                    <?php if(!empty($menu["submenus"])){
                        foreach($menu["submenus"] as $sub){ ?>
                            <div class="subsubmenu"> <div class="titlesubmenu" style="padding-left: 20px;"><?php echo $sub["nome"]; ?></div></div>
                        <?php } ?>
                    <?php } ?>
                </div>
            <?php } ?>
        </div>
        <script src="https://code.jquery.com/jquery-3.6.0.min.js" integrity="sha256-/xUj+3OJU5yExlq6GSYGSHk7tPXikynS7ogEvDej/m4=" crossorigin="anonymous"></script>
        <script href="distribute.js" type="text/javascript"></script>

        <script>

            //CONFIG
            var classItem = ".submenu";
            var classSubs = ".subsubmenu";
            var eltmp = $(".menuhandle");
            var destination = $(".menu");
            var items = eltmp.find(classItem);
            var subitems = eltmp.find(classSubs);
            var numitems = items.length;
            var numsubitems = subitems.length;
            var totalitems = numitems + numsubitems;
            var colsdesktop = 5;
            var colsdesktopsmall = 3;
            var colsmobile = 1;
            var previous = false;

            $(function(){
                distribute();
                $(window).on("resize",function(){
                    distribute();
                });

                function distribute(){ // controlo para apenas executar quando necessário
                    if($(window).width() > 1280 && previous!="desktop"){ //desktop
                        previous="desktop";
                        clearDistribute();
                        calcDistribute(colsdesktop);
                    }else if($(window).width() > 769 && previous!="desktopsmall"){ //small desktop
                        previous="desktopsmall";
                        clearDistribute();
                        calcDistribute(colsdesktopsmall);
                    }else if(previous != "mobile"){ //mobile
                        previous="mobile";
                        clearDistribute();
                        calcDistribute(colsmobile);
                    }
                }

                function clearDistribute(){ destination.html(""); }

                function calcDistribute(cols){
                    var colname;
                    var count=0;

                    if(cols == 1){
                        colname = "divdefault";
                    }else if(cols!=''){
                        colname = "districols" + cols;
                    }

                    var css = '.' + colname + '{float:left; clear:none; width:' + (100 / cols) + '%; }';

                    //create columns
                    for(let a = 0; a < cols; a++){
                        el = document.createElement('div')
                        el.className = "distribute-subs " + colname;
                        $(el).appendTo(destination);
                    }

                    var atualColumn = 1;
                    eltmp.find(classItem).each(function(i, el){ /// foreach item
                        let subitems = $(el).find(classSubs).length;
                        $(el).clone().appendTo(destination.find(".distribute-subs")[atualColumn-1]);
                        console.log(destination.find(".distribute-subs")[atualColumn-1]);
                        console.log(atualColumn);

                        console.log("count: " + count);
                        console.log("numitems: " + numitems);
                        console.log("subitems: " + subitems);
                        console.log("conta: " + (subitems*0.5));
                        console.log(((numitems + (subitems*0.5)) / cols));

                        if(Math.floor(cols / (numitems + subitems*0.5)) < count){
                            console.log("inside--------------------------------------------");
                            count=0;
                            atualColumn++;
                        }
                        count++;
                    });

                    $("body").append("<style>" + css + "</style>");
                }
            });

        </script>
    </body>
</html>
