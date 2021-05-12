            //CONFIG
            var classItem = ".submenudist";
            var classSubs = ".subsubmenudist";
            var eltmp = ".submenudistribute";
            var destination = ".submenudistributefinal";
            var items;
            var subitems;
            var numitems;
            var numsubitems;
            var totalitems;
            var colsdesktop = 5;
            var colsdesktopsmall = 3;
            var colsmobile = 1;
            var previous = '';
			
			
            $(function(){
                distribute();
                $(window).on("resize", function(){ distribute(); });
				
                function distribute(){ // controlo para apenas executar quando necessário
					console.log("previous" + previous);
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
				
				
                function clearDistribute(){ $(destination).html(""); }
				
                function calcDistribute(cols){
                    var colname;
					console.log("distribute calc");
					
                    if(cols == 1){
                        colname = "divdefault";
                    }else if(cols!=''){
                        colname = "districols" + cols;
                    }
					
                    var css = '.' + colname + '{float:left; position: relative; clear:none; width:' + (100 / cols) + '%; } ' + classItem + '{ position:relative; float:left; width: 100%;}';
					
                    $(eltmp).each(function(i, elpri){
                    	var count=1;
                    	var atualColumn = 1;
						
						//create columns
						for(let a = 0; a < cols; a++){
							var el = document.createElement('div');
							el.className = "distribute-subs " + colname;
							$(el).appendTo($(elpri).parent().find(destination));
						}
						
						items = $(elpri).find(classItem);
						subitems = $(elpri).find(classSubs);
						numitems = items.length;
						numsubitems = subitems.length;
            			totalitems = numitems;
						
						var totalitemspassed = 0;
						
						$(elpri).find(classItem).each(function(i, el){ /// foreach item
							var subsubitems = $(el).find(classSubs).length;
							var remaining = (totalitems - totalitemspassed);
							var colsleft = cols - atualColumn;
							
							
							$(el).clone().appendTo($(elpri).parent().find(destination).find(".distribute-subs")[atualColumn-1]);
							var itemsonthiscolumn = $(elpri).parent().find(destination).find(".distribute-subs").eq(atualColumn-1).find(classSubs).length;
							
							
							if((count >= (Math.floor((totalitems) + subsubitems) / cols)) || itemsonthiscolumn > (Math.floor((totalitems))/cols)){
								count=1;
								if(atualColumn < cols ){ // evita elementos ficarem fora
									atualColumn++;
								}
							}
							
							count++;
							totalitemspassed++;
						});
					});

                    $("body").append("<style>" + css + "</style>");
                }
				
            });
