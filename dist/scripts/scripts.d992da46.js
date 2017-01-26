"use strict";angular.module("Authentication",[]),angular.module("HomeTest",[]),angular.module("mainModule",[]),angular.module("personalModule",[]),angular.module("angularVideoAppApp",["Authentication","HomeTest","mainModule","personalModule","ngRoute","ngCookies","ngAnimate","toastr","slickCarousel"]).config(["$routeProvider","$locationProvider",function(a,b){a.when("/login",{controller:"LoginController",templateUrl:"views/login.html"}).when("/personal",{controller:"PersonalCtrl",templateUrl:"views/personalview.html"}).when("/",{controller:"MainCtrl",templateUrl:"views/main.html"}).otherwise({redirectTo:"/login"})}]).run(["$rootScope","$location","$cookieStore","$http","AuthenticationService",function(a,b,c,d,e){a.globals=c.get("globals")||{},a.globals.currentUser&&(d.defaults.headers.common.Authorization="token "+a.globals.currentUser.token,a.logged=!0,console.log(a.globals)),a.$on("$locationChangeStart",function(c,d,f){"/login"===b.path()||a.globals.currentUser||("?code="===window.location.search.slice(0,6)&&a.logged!==!0&&a.requestSent!==!0?(a.facebookCode=window.location.search.slice(6),a.requestSent=!0,e.FacebookLogin("facebook",a.facebookCode,function(c){"OK"===c.statusText?(a.logged=!0,a.requestSent=!1,b.path("/"),e.SetCredentials("","",c.data.token)):(console.log(c),a.requestSent=!1)})):b.path("/login"))})}]).filter("defaultImage",function(){return function(a){if(a){var b="https://image.tmdb.org/t/p/w150/"+a;return b}return"data:image/png;base64,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"}}).run(["$rootScope","$location","AuthenticationService",function(a,b,c){a.localpath=window.location.origin+window.location.pathname,a.logOut=function(){c.ClearCredentials(),a.logged=!1,b.path("/login")},a.personalPage=function(){b.path("/personal")}}]),angular.module("Authentication").factory("AuthenticationService",["Base64","$http","$cookieStore","$rootScope","$timeout",function(a,b,c,d,e){var f={};return f.Login=function(a,c,d){b.post("https://le-taste.herokuapp.com/api/v1/auth/login/",{email:a,password:c}).then(function(a){d(a)},function(a){d(a)})},f.FacebookLogin=function(a,c,d){b.post("https://le-taste.herokuapp.com/api/v1/auth/social/token_user/",{provider:a,code:c,redirect_uri:window.location.origin+window.location.pathname}).then(function(a){d(a)},function(a){d(a)})},f.SetCredentials=function(a,e,f){d.globals={currentUser:{username:a,token:f}},b.defaults.headers.common.Authorization="token "+f,console.log(b.defaults.headers),c.put("globals",d.globals)},f.ClearCredentials=function(){d.globals={},c.remove("globals"),b.defaults.headers.common.Authorization="Authorization "},f}]).factory("Base64",function(){var a="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";return{encode:function(b){var c,d,e,f,g,h="",i="",j="",k=0;do c=b.charCodeAt(k++),d=b.charCodeAt(k++),i=b.charCodeAt(k++),e=c>>2,f=(3&c)<<4|d>>4,g=(15&d)<<2|i>>6,j=63&i,isNaN(d)?g=j=64:isNaN(i)&&(j=64),h=h+a.charAt(e)+a.charAt(f)+a.charAt(g)+a.charAt(j),c=d=i="",e=f=g=j="";while(k<b.length);return h},decode:function(b){var c,d,e,f,g,h="",i="",j="",k=0,l=/[^A-Za-z0-9\+\/\=]/g;l.exec(b)&&window.alert("There were invalid base64 characters in the input text.\nValid base64 characters are A-Z, a-z, 0-9, '+', '/',and '='\nExpect errors in decoding."),b=b.replace(/[^A-Za-z0-9\+\/\=]/g,"");do e=a.indexOf(b.charAt(k++)),f=a.indexOf(b.charAt(k++)),g=a.indexOf(b.charAt(k++)),j=a.indexOf(b.charAt(k++)),c=e<<2|f>>4,d=(15&f)<<4|g>>2,i=(3&g)<<6|j,h+=String.fromCharCode(c),64!=g&&(h+=String.fromCharCode(d)),64!=j&&(h+=String.fromCharCode(i)),c=d=i="",e=f=g=j="";while(k<b.length);return h}}}),angular.module("Authentication").controller("LoginController",["$scope","$rootScope","$location","AuthenticationService",function(a,b,c,d){d.ClearCredentials(),a.login=function(){a.dataLoading=!0,d.Login(a.username,a.password,function(e){console.log(e),"OK"===e.statusText?(d.SetCredentials(a.username,a.password,e.data.auth_token),b.logged=!0,c.path("/")):(a.error=e.data.non_field_errors,a.dataLoading=!1)})}}]),angular.module("mainModule").controller("MainCtrl",["$scope","$rootScope","$http","$sce","$timeout","$location","AuthenticationService","toastr",function(a,b,c,d,e,f,g,h){a.items=[],a.currentItem={},a.currentPosition=0,a.currentState="Poster",a.$watch("currentPosition",function(b,c){a.currentItem=a.items[a.currentPosition]}),a.sendUserAction=function(b,d){var e="https://le-taste.herokuapp.com/api/v1/movies/",f="",g="",i=!0;switch(d){case"add":f="/add_to_watch_list/",g="<span> movie just has been successfully added to your watchlist! </span>";break;case"like":f="/like/",g="<span> movie has been liked by you! </span>";break;case"dislike":f="/dislike/",g="<span> You have disliked that movie. Thank your for your opinion!</span>";break;case"soso":f="/so_so/",g="<span> Thank you for your respone! </span>";break;case"skip":f="/skip/",g="",i=!1;break;default:return void window.alert("actionType not specified!")}c.post(e+a.currentItem.id+f).then(function(a){i&&(console.log(a),h.success("<em>"+b+"</em>"+g,{allowHtml:!0}))},function(a){h.error("Your credentials are gone or something else had happend; Please, try to re-login to app or contact with admins","Error"),console.log(a)})},a.nextItem=function(){a.opacity=!1,a.slickConfigLoaded=!1,a.currentState="Poster",a.currentPosition=a.currentPosition===a.items.length-1?0:a.currentPosition+1,e(function(){a.slickConfigLoaded=!0}),$(".btn").blur(),$("#watchBtnID").popover("hide")},a.changeState=function(){a.currentState="Poster"===a.currentState?"Trailer":"Poster"},a.getInitialData=function(){c.get("https://le-taste.herokuapp.com/api/v1/movies/").then(function(b){a.items=b.data;for(var c=0;c<a.items.length-1;c++){var d=/^.*(?:(?:youtu\.be\/|v\/|vi\/|u\/\w\/|embed\/)|(?:(?:watch)?\?v(?:i)?=|\&v(?:i)?=))([^#\&\?]*).*/,e="https://youtube.com/embed/",f=[],g=a.items[c];if(g.imageMainBackdrop="https://image.tmdb.org/t/p/w780/"+g.backdrops[0].file_path,null===g.trailer)break;f=g.trailer.match(d),g.trailerEmbed=e+f[1]+"?autoplay=1"}console.log(a.items),a.initilizationState="Initilized",a.currentItem=a.items[0],a.slickConfigLoaded=!0,a.$watch("currentItem.imdbid",function(){a.getRatingFromImdb()})})},a.getRatingFromImdb=function(){e(function(){window.imdb.rating.createJSONP()})},a.slickConfig={dots:!0,infinite:!0,speed:300,slidesToShow:7,slidesToScroll:7,event:{init:function(b,c){a.opacity=!0,$(".your-class ").animate({opacity:1},300)}},responsive:[{breakpoint:1200,settings:{slidesToShow:6,slidesToScroll:6,infinite:!0,dots:!0}},{breakpoint:1024,settings:{slidesToShow:5,slidesToScroll:5,infinite:!0,dots:!0}},{breakpoint:990,settings:{slidesToShow:4,slidesToScroll:4,infinite:!0,dots:!0}},{breakpoint:800,settings:{slidesToShow:4,slidesToScroll:4,infinite:!0,dots:!0,arrows:!1}},{breakpoint:700,settings:{slidesToShow:3,slidesToScroll:3,infinite:!0,dots:!0,arrows:!1}},{breakpoint:500,settings:{slidesToShow:2,slidesToScroll:2,dots:!1,arrows:!1}},{breakpoint:350,settings:{slidesToShow:1,slidesToScroll:1,dots:!1}}]},a.initilizePopOverButtons=function(){var a=$("#watchBtnID").outerWidth(),b='<div class="btn-group" style="width:'+a+'px"><button type="button" class="btn btn-default btn-dislike" title="Hate that movie!" aria-label="Left Align"><span class="glyphicon glyphicon-thumbs-down" aria-hidden="true"></span></button><button type="button" class="btn btn-default  btn-soso" title="Its fine" aria-label="Center Align"><span class="glyphicon glyphicon-ok" aria-hidden="true"></span></button><button type="button" class="btn btn-default btn-like" title="Like this!" aria-label="Right Align"><span class="glyphicon glyphicon-thumbs-up" aria-hidden="true"></span></button></div>',c='<div class="popover popover-buttons" role="tooltip"><div class="popover-content"></div>';$("#watchBtnID").popover({animation:!0,content:b,template:c,title:"",trigger:"click",html:!0,placement:"bottom"}),$("#watchBtnID").on("shown.bs.popover",function(){$("button.btn.btn-dislike").click(function(a){angular.element(this).scope().$apply("sendUserAction(currentItem.title, 'dislike');nextItem()")})}),$("#watchBtnID").on("shown.bs.popover",function(){$("button.btn.btn-default.btn-like").click(function(a){angular.element(this).scope().$apply("sendUserAction(currentItem.title, 'like');nextItem()")})}),$("#watchBtnID").on("shown.bs.popover",function(){$("button.btn.btn-soso").click(function(a){angular.element(this).scope().$apply("sendUserAction(currentItem.title, 'soso');nextItem()")})}),$("body").on("hidden.bs.popover",function(a){$(a.target).data("bs.popover").inState={click:!1,hover:!1,focus:!1}})},a.trustSrc=function(a){return d.trustAsResourceUrl(a)},a.noImage780="data:image/png;base64,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"}]),angular.module("HomeTest").controller("HomeController",["$scope","AuthenticationService",function(a,b){a.logOut=function(){b.ClearCredentials()}}]),angular.module("personalModule").controller("PersonalCtrl",["$scope","$rootScope","$http","$sce","$timeout","$location","AuthenticationService","toastr",function(a,b,c,d,e,f,g,h){}]),function(a){var b=a.document;"imdb"in a||(a.imdb={});var c=a.imdb;c.rating={response:{},elems:{}},c.rating.getElementsByClassName=function(a,d,e){return b.getElementsByClassName?c.rating.getElementsByClassName=function(a,c,d){d=d||b;for(var e,f=d.getElementsByClassName(a),g=c?new RegExp("\\b"+c+"\\b","i"):null,h=[],i=0,j=f.length;i<j;i+=1)e=f[i],g&&!g.test(e.nodeName)||h.push(e);return h}:b.evaluate?c.rating.getElementsByClassName=function(a,c,d){c=c||"*",d=d||b;for(var e,f,g=a.split(" "),h="",i="http://www.w3.org/1999/xhtml",j=b.documentElement.namespaceURI===i?i:null,k=[],l=0,m=g.length;l<m;l+=1)h+="[contains(concat(' ', @class, ' '), ' "+g[l]+" ')]";try{e=b.evaluate(".//"+c+h,d,j,0,null)}catch(a){e=b.evaluate(".//"+c+h,d,null,0,null)}for(;f=e.iterateNext();)k.push(f);return k}:c.rating.getElementsByClassName=function(a,c,d){c=c||"*",d=d||b;for(var e,f,g=a.split(" "),h=[],i="*"===c&&d.all?d.all:d.getElementsByTagName(c),j=[],k=0,l=g.length;k<l;k+=1)h.push(new RegExp("(^|\\s)"+g[k]+"(\\s|$)"));for(var m=0,n=i.length;m<n;m+=1){e=i[m],f=!1;for(var o=0,p=h.length;o<p&&(f=h[o].test(e.className),f);o+=1);f&&j.push(e)}return j},c.rating.getElementsByClassName(a,d,e)},c.rating.getAttr=function(a,b){var c=a.attributes;for(var d in c)if(c[d]&&c[d].name===b)return c[d].value;return null},c.rating.setResponse=function(a){"object"==typeof a?this.response=a.resource:(this.response.rating="N/A",this.response.ratingCount=0)},c.rating.run=function(c){this.setResponse(c);var d=this.response.rating,e=b.querySelector(".imdbRatingPlugin"),f=a.angular.element(e).scope();f.$apply(function(){f.currentItem.imdbRating=d})},c.rating.createJSONP=function(){var a=c.rating.getElementsByClassName("imdbRatingPlugin");for(var d in a){var e=c.rating.getAttr(a[d],"data-title"),f="p1",g="ur0683828";if(!b.getElementById("imdb-jsonp-"+e)){var h=b.createElement("script");h.src="https://p.media-imdb.com/static-content/documents/v1/title/"+e+"/ratings%3Fjsonp=imdb.rating.run:imdb.api.title.ratings/data.json?u="+g+"&s="+f,h.id="imdb-jsonp-"+e,b.body.appendChild(h)}}}}(window),angular.module("angularVideoAppApp").run(["$templateCache",function(a){a.put("views/login.html",'<div class="row"> <div class="center-form panel"> <div class="panel-body"> <h2 class="text-center">Log in <img ng-if="dataLoading" src="data:image/gif;base64,R0lGODlhEAAQAPIAAP///wAAAMLCwkJCQgAAAGJiYoKCgpKSkiH/C05FVFNDQVBFMi4wAwEAAAAh/hpDcmVhdGVkIHdpdGggYWpheGxvYWQuaW5mbwAh+QQJCgAAACwAAAAAEAAQAAADMwi63P4wyklrE2MIOggZnAdOmGYJRbExwroUmcG2LmDEwnHQLVsYOd2mBzkYDAdKa+dIAAAh+QQJCgAAACwAAAAAEAAQAAADNAi63P5OjCEgG4QMu7DmikRxQlFUYDEZIGBMRVsaqHwctXXf7WEYB4Ag1xjihkMZsiUkKhIAIfkECQoAAAAsAAAAABAAEAAAAzYIujIjK8pByJDMlFYvBoVjHA70GU7xSUJhmKtwHPAKzLO9HMaoKwJZ7Rf8AYPDDzKpZBqfvwQAIfkECQoAAAAsAAAAABAAEAAAAzMIumIlK8oyhpHsnFZfhYumCYUhDAQxRIdhHBGqRoKw0R8DYlJd8z0fMDgsGo/IpHI5TAAAIfkECQoAAAAsAAAAABAAEAAAAzIIunInK0rnZBTwGPNMgQwmdsNgXGJUlIWEuR5oWUIpz8pAEAMe6TwfwyYsGo/IpFKSAAAh+QQJCgAAACwAAAAAEAAQAAADMwi6IMKQORfjdOe82p4wGccc4CEuQradylesojEMBgsUc2G7sDX3lQGBMLAJibufbSlKAAAh+QQJCgAAACwAAAAAEAAQAAADMgi63P7wCRHZnFVdmgHu2nFwlWCI3WGc3TSWhUFGxTAUkGCbtgENBMJAEJsxgMLWzpEAACH5BAkKAAAALAAAAAAQABAAAAMyCLrc/jDKSatlQtScKdceCAjDII7HcQ4EMTCpyrCuUBjCYRgHVtqlAiB1YhiCnlsRkAAAOwAAAAAAAAAAAA=="> </h2> <div ng-show="error" class="alert alert-danger text-center">{{error}}</div> <form name="form" ng-submit="login()" class="login-form" role="form"> <div class="form-group"> <label for="username">Username</label> <i class="fa fa-key"></i> <input type="text" name="username" id="username" class="form-control" ng-model="username" required> <span ng-show="form.username.$dirty && form.username.$error.required" class="help-block">Username is required</span> </div> <div class="form-group"> <label for="password">Password</label> <i class="fa fa-lock"></i> <input type="password" name="password" id="password" class="form-control" ng-model="password" required> <span ng-show="form.password.$dirty && form.password.$error.required" class="help-block">Password is required</span> </div> <div class="form-actions"> <button type="submit" ng-disabled="form.$invalid || dataLoading" class="btn btn-primary btn-block">Login</button> </div> <div class="signup-or-separator"> <h6 class="text">or</h6> <hr> </div> </form> <a ng-href="https://www.facebook.com/dialog/oauth?client_id=290907381018306&redirect_uri={{$root.localpath}}" class="btn btn-block btn-facebook"> Sign in with Facebook </a> <!--<button ng-click="logout()"> logout</button>--> </div> </div> </div>'),a.put("views/main.html",'<div ng-init="getInitialData();initilizePopOverButtons();" ng-controller="MainCtrl"> <div class="loader-container" ng-hide="currentItem"> <div class="loader-wrapper"> <div class="loader"></div> </div> <div class="overlay"> </div> </div> <!--Title and tagline row--> <div class="row"> <div class="col-lg-12 text-left"> <h1 ng-bind="currentItem.title">Hidden Figures</h1> <blockquote ng-bind="currentItem.tagline || \'&nbsp;\'">Meet the women you don"t know, behind the mission you do.</blockquote> </div> </div> <!--Main row : images/videos + description and buttons--> <div class="row main-row"> <div class="col-lg-8 media-container-wrapper" ng-show="currentItem"> <div class="image-container" ng-if="currentState == \'Poster\'"> <img ng-src="{{trustSrc(currentItem.imageMainBackdrop || noImage780)}}" alt="{{currentItem.title + \' Poster\'}}" ng-cloak id="posterimage" ng-animate-swap="currentItem.imageMainBackdrop || noImage780" class="cell swap-animation"> </div> <div class="video-container" ng-if="currentState == \'Trailer\'"> <iframe id="mainvid" ng-src="{{trustSrc(currentItem.trailerEmbed)}}" frameborder="0" allowfullscreen></iframe> </div> <button ng-click="changeState()" title="Watch trailer" ng-cloak ng-if="currentState == \'Poster\' && currentItem.trailerEmbed" class="ytp-large-play-button ytp-button" aria-label="View this movie"> <svg height="100%" version="1.1" viewbox="0 0 68 48" width="100%"> <path class="ytp-large-play-button-bg" d="m .66,37.62 c 0,0 .66,4.70 2.70,6.77 2.58,2.71 5.98,2.63 7.49,2.91 5.43,.52 23.10,.68 23.12,.68 .00,-1.3e-5 14.29,-0.02 23.81,-0.71 1.32,-0.15 4.22,-0.17 6.81,-2.89 2.03,-2.07 2.70,-6.77 2.70,-6.77 0,0 .67,-5.52 .67,-11.04 l 0,-5.17 c 0,-5.52 -0.67,-11.04 -0.67,-11.04 0,0 -0.66,-4.70 -2.70,-6.77 C 62.03,.86 59.13,.84 57.80,.69 48.28,0 34.00,0 34.00,0 33.97,0 19.69,0 10.18,.69 8.85,.84 5.95,.86 3.36,3.58 1.32,5.65 .66,10.35 .66,10.35 c 0,0 -0.55,4.50 -0.66,9.45 l 0,8.36 c .10,4.94 .66,9.45 .66,9.45 z" fill="#1f1f1e" fill-opacity="0.81"></path> <path d="m 26.96,13.67 18.37,9.62 -18.37,9.55 -0.00,-19.17 z" fill="#fff"></path> <path d="M 45.02,23.46 45.32,23.28 26.96,13.67 43.32,24.34 45.02,23.46 z" fill="#ccc"></path> </svg> </button> <span class="imdbRatingPlugin imdbRatingStyle1" ng-cloak ng-if="currentState == \'Poster\' && currentItem.imdbid" ng-init="getRatingFromImdb()" data-title="{{currentItem.imdbid}}" data-user="ur0683828" data-style="p1"> <a href="{{\'http://www.imdb.com/title/\' + currentItem.imdbid + \'/?ref_=plg_rt_1\'}}"> <img src="http://g-ecx.images-amazon.com/images/G/01/imdb/plugins/rating/images/imdb_46x22.png"> </a> <span class="rating">{{currentItem.imdbRating}} <span class="ofTen">/10</span> </span> <img src="http://g-ecx.images-amazon.com/images/G/01/imdb/plugins/rating/images/imdb_star_22x21.png" class="star"> </span> </div> <!--Buttons column: Add, Skip, Watched--> <div class="col-lg-4" ng-show="currentItem"> <div class="btn-group btn-group-justified" role="group" aria-label="Justified button group"> <a href="" ng-click="sendUserAction(currentItem.title, \'add\');nextItem()" class="btn btn-primary" role="button"><span class="glyphicon glyphicon-plus" aria-hidden="true"></span>Add to list</a> <a href="" ng-click="sendUserAction(currentItem.title, \'skip\');nextItem()" class="btn btn-primary" role="button"><span class="glyphicon glyphicon-circle-arrow-right" aria-hidden="true"></span>Skip</a> <a href="" class="btn btn-primary" id="watchBtnID" data-title="Watched?" data-toggle="popover" data-placement="top" role="button"><span class="glyphicon glyphicon-eye-open" aria-hidden="true"></span>Watched?</a> </div> <p class="lead">Description</p> <p ng-bind="currentItem.plot">The incredible untold story of Katherine G. Johnson, Dorothy Vaughan and Mary Jackson - brilliant African-American women working at NASA, who served as the brains behind one of the greatest operations in history: the launch of astronaut John Glenn into orbit, a stunning achievement that restored the nation"s confidence, turned around the Space Race, and galvanized the world. The visionary trio crossed all gender and race lines to inspire generations to dream big.</p> </div> <!--<a href=\'https://www.facebook.com/dialog/oauth?client_id=290907381018306&redirect_uri=http://localhost:9000/\'> Refresh Facebook Token ON HEROKU</a>--> </div> <!--Slick-slider row--> <div class="row slider-row"> <div class="col-xs-12 min-height-300"> <slick class="your-class" settings="slickConfig" ng-if="slickConfigLoaded" ng-class="{ \'opacity100\' : opacity}"> <div class="slider-item" ng-repeat="char in currentItem.crew_details | filter: { job : \'Director\'}:true | limitTo: 1"> <div class="img-wrapper"> <img ng-src="{{char.picture | defaultImage}}" alt=""> <div class="actor-name">{{char.name}}</div> <div class="actor-character"><i class="glyphicon glyphicon-star" aria-hidden="true"></i>{{char.job}}</div> </div> </div> <div class="slider-item" ng-repeat="item in currentItem.characters | limitTo: 15"> <div class="img-wrapper"> <img ng-src="{{item.picture | defaultImage}}" alt=""> <div class="actor-name">{{item.name}}</div> <div class="actor-character">{{item.character}}</div> </div> </div> </slick> </div> </div> <!--<div class="row slider-row">\r\n    <div class="col-xs-12">\r\n      <div class="your-class">\r\n        <div class="slider-item" ng-repeat="char in currentItem.crew_details | filter: { job : \'Director\'}:true | limitTo: 1">\r\n          <div class="img-wrapper">\r\n            <img ng-src="{{char.picture | defaultImage}}" alt="">\r\n            <div class="actor-name">{{char.name}}</div>\r\n            <div class="actor-character"><i class="glyphicon glyphicon-star" aria-hidden="true"></i>{{char.job}}</div>\r\n          </div>\r\n        </div>\r\n        <div class="slider-item" ng-repeat="item in currentItem.characters | limitTo: 15" initilize-slider>\r\n          <div class="img-wrapper">\r\n            <img ng-src="{{item.picture | defaultImage}}" alt="">\r\n            <div class="actor-name">{{item.name}}</div>\r\n            <div class="actor-character">{{item.character}}</div>\r\n          </div>\r\n        </div>\r\n      </div>\r\n    </div>\r\n  </div>--> </div>'),
a.put("views/personalview.html",'<div class="row"> Personal view </div>'),a.put("views/testhome.html",'<h1>Test Home, right? </h1> <p><a href="#/login">Logout</a></p> <button ng-click="logOut()">Real log out</button>')}]);