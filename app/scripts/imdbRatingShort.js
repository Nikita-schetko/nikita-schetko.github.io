
// jscs:disable validateQuoteMarks
(function(window) {
    // always use strict mode from now on!
    "use strict";
    
    // make sure the document is in local scope
    var document = window.document;
    
    // create namespace
    if (!('imdb' in window)) {
        window.imdb = {};
    }
    var imdb = window.imdb;
    // initialize rating object
    imdb.rating = {
        response : {},
        elems : {}
    };

    imdb.rating.getElementsByClassName = function (className, tag, elm){
        if (document.getElementsByClassName) {
            imdb.rating.getElementsByClassName = function (className, tag, elm) {
                elm = elm || document;
                var elements = elm.getElementsByClassName(className),
                    nodeName = (tag)? new RegExp("\\b" + tag + "\\b", "i") : null,
                    returnElements = [],
                    current;
                for(var i=0, il=elements.length; i<il; i+=1){
                    current = elements[i];
                    if(!nodeName || nodeName.test(current.nodeName)) {
                        returnElements.push(current);
                    }
                }
                return returnElements;
            };
        } else if (document.evaluate) {
            imdb.rating.getElementsByClassName = function (className, tag, elm) {
                tag = tag || "*";
                elm = elm || document;
                var classes = className.split(" "),
                    classesToCheck = "",
                    xhtmlNamespace = "http://www.w3.org/1999/xhtml",
                    namespaceResolver = (document.documentElement.namespaceURI === xhtmlNamespace)? xhtmlNamespace : null,
                    returnElements = [],
                    elements,
                    node;
                for(var j=0, jl=classes.length; j<jl; j+=1){
                    classesToCheck += "[contains(concat(' ', @class, ' '), ' " + classes[j] + " ')]";
                }
                try    {
                    elements = document.evaluate(".//" + tag + classesToCheck, elm, namespaceResolver, 0, null);
                }
                catch (e) {
                    elements = document.evaluate(".//" + tag + classesToCheck, elm, null, 0, null);
                }
                while ((node = elements.iterateNext())) {
                    returnElements.push(node);
                }
                return returnElements;
            };
        } else {
            imdb.rating.getElementsByClassName = function (className, tag, elm) {
                tag = tag || "*";
                elm = elm || document;
                var classes = className.split(" "),
                    classesToCheck = [],
                    elements = (tag === "*" && elm.all)? elm.all : elm.getElementsByTagName(tag),
                    current,
                    returnElements = [],
                    match;
                for(var k=0, kl=classes.length; k<kl; k+=1){
                    classesToCheck.push(new RegExp("(^|\\s)" + classes[k] + "(\\s|$)"));
                }
                for(var l=0, ll=elements.length; l<ll; l+=1){
                    current = elements[l];
                    match = false;
                    for(var m=0, ml=classesToCheck.length; m<ml; m+=1){
                        match = classesToCheck[m].test(current.className);
                        if (!match) {
                            break;
                        }
                    }
                    if (match) {
                        returnElements.push(current);
                    }
                }
                return returnElements;
            };
        }
        return imdb.rating.getElementsByClassName(className, tag, elm);
    };

    // IE has some issues with getAttribute, this is a better cross browser approach
    imdb.rating.getAttr = function(node, attr) {
    	var attrs = node.attributes;
    	for(var i in attrs) {
    		if (attrs[i] && attrs[i].name === attr) {
    			return attrs[i].value;
    		}
    	}
    	return null;
    };

    imdb.rating.setResponse = function(response) {
        if (typeof(response) === "object") {
            this.response = response.resource;
        }
        // the response is not an object (probably no rating for the given tconst)
        else {
            this.response.rating = "N/A";
            this.response.ratingCount = 0;
        }
    };

    imdb.rating.run = function(response) {
        this.setResponse(response);
        // var tconst = this.response.id.split("/")[2];
        var currentImdbRating = this.response.rating;

        
        var appElement = document.querySelector('.imdbRatingPlugin');
        var $scope = window.angular.element(appElement).scope();
        $scope.$apply(function() {
            $scope.currentItem.imdbRating = currentImdbRating;
        });
        

        
    };

    imdb.rating.createJSONP = function() {
        // for each plugin span get title, style and user then create jsonp lookups
        var elemsArr = imdb.rating.getElementsByClassName("imdbRatingPlugin");
        for (var i in elemsArr) {
        	// using the local getAttr method here since IE was having trouble *big surprise there*
            var tconst = imdb.rating.getAttr(elemsArr[i], "data-title"),
                style = 'p1',
                user = 'ur0683828';
            if (!document.getElementById("imdb-jsonp-" + tconst)) {
                // // add element to hash with style for later
                // imdb.rating.elems[tconst] = {};
                // imdb.rating.elems[tconst]["elem"] = elemsArr[i];
                // imdb.rating.elems[tconst]["style"] = style;
                // create JSONP request
                var scriptTag = document.createElement("script");
                scriptTag.src = "https://p.media-imdb.com/static-content/documents/v1/title/" + tconst +
                         "/ratings%3Fjsonp=imdb.rating.run:imdb.api.title.ratings/data.json?u=" + user + "&s=" +
                        style;
                scriptTag.id = "imdb-jsonp-" + tconst;
                document.body.appendChild(scriptTag);
            }
        }
    };


})(window);
// jscs:enable validateQuoteMarks