var albumIndex,artArray,$=function(e){return document.getElementById(e)},info=maininfo,groupInfo=[],groupState=!1,userSort="",infoSort="",groupSort="",filterLevel=9;function init(){"true"==getCookie("group")&&(groupState=!0,initGroupInfo(),$("group-alias").className="lit"),"name"==getCookie("sort")?sortName():(info.sort((function(e,r){return e[ALBUM].toLowerCase().localeCompare(r[ALBUM].toLowerCase())})),sortDate())}function renderAlbums(){if(albumIndex=0,artArray=[],groupState){for(var e="",r=0;r<groupInfo.length;r++)e+='<div class="bar-spacer"><div class="bar-container"><div class="vertical-align">'+groupInfo[r][0]+'</div><div class="border"></div></div></div>'+buildAlbumHTML(groupInfo[r][1]);$("albums").innerHTML=e}else $("albums").innerHTML=buildAlbumHTML(info);var o=new Image;o.src="/web-resources/missing.png",o.complete?renderAlbumArt(0):o.onload=function(){renderAlbumArt(0)}}function buildAlbumHTML(e){for(var r="",o=0;o<e.length;o++){var t=e[o][ALIAS],n=e[o][FORMATS];mainAlias(t).length>2&&(t="Various Artists"),r+='<div class="album-spacer"><a href="/albums/'+encodeURI(e[o][ALBUM].replace(/ /g,"_"))+'"><div class="album-container"><div id="'+albumIndex+'" class="album-art"></div><div class="album-info"><div class="vertical-align"><span',e[o][RATING_NAME]>filterLevel&&(r+=' style="filter: blur(6px);"'),r+=">"+e[o][ALBUM]+"</span><br>"+t+"</div></div>",(e[o][RATING_ART]>filterLevel||e[o][RATING_NAME]>filterLevel||e[o][RATING_TRACKNAMES]>filterLevel||e[o][RATING_LYRICS]>filterLevel)&&(r+='<div class="corner-icon" title="This release contains content deemed inappropriate by your filter settings" style="left: 0; color: red;">⚠</div>'),4==n.length&&(r+='<div class="corner-icon" title="Lossless files available" style="right: 0;"><span style="font-size: 10px;">FLAC </span>✔</div>'),r+='<div class="border" style="z-index: 1;"></div></div></a></div>';var a='<div class="album-cover" style="background-image: url(\'/web-resources/album-art/'+e[o][ALIAS]+" - "+e[o][ALBUM].replace(/\'/g,"\\'").replace(/:/g,"").replace(/\?/g,"")+" (0).jpg');";e[o][RATING_ART]>filterLevel&&(a+=" filter: blur(6px);"),a+='"></div>',artArray.push(a),albumIndex++}return r}function renderAlbumArt(e){e<albumIndex&&($(e).innerHTML=artArray[e],renderAlbumArt(e+1))}function sortName(){if(setCookie("sort","name"),"name"!=userSort&&(userSort="name",$("sort-name").className="lit",$("sort-date").className="dim"),groupState){if("name"!=groupSort){for(var e=0;e<groupInfo.length;e++)groupInfo[e][1].sort((function(e,r){return e[ALBUM].toLowerCase().localeCompare(r[ALBUM].toLowerCase())}));groupSort="name",renderAlbums()}}else"name"!=infoSort&&(info.sort((function(e,r){return e[ALBUM].toLowerCase().localeCompare(r[ALBUM].toLowerCase())})),infoSort="name",renderAlbums())}function sortDate(){if(setCookie("sort","date"),"date"!=userSort&&(userSort="date",$("sort-name").className="dim",$("sort-date").className="lit"),groupState){if("date"!=groupSort){for(var e=0;e<groupInfo.length;e++)groupInfo[e][1].sort((function(e,r){return parseDate(r[DATE])-parseDate(e[DATE])}));groupSort="date",renderAlbums()}}else"date"!=infoSort&&(info.sort((function(e,r){return parseDate(r[DATE])-parseDate(e[DATE])})),infoSort="date",renderAlbums())}function parseDate(e){return parseInt((e.replace(/-/g,"")+"0000").substring(0,8))}function toggleGrouping(){groupInfo.length<1&&initGroupInfo(),groupState=!groupState,setCookie("group",String(groupState)),"name"!=userSort?sortDate():sortName(),renderAlbums(),$("group-alias").className=groupState?"lit":"dim"}function mainAlias(e){return(e=e.split(" feat.")[0]).split(/\ vs.\ |\ \+\ /)}function initGroupInfo(){for(var e=[],r=[],o=[],t=[],n=[],a=[],i=0;i<info.length;i++)for(var s=mainAlias(info[i][ALIAS]),l=0;l<s.length;l++)s[l].charCodeAt(0)>255?-1==o.indexOf(s[l])?(o.push(s[l]),t.push([info[i]])):t[o.indexOf(s[l])].push(info[i]):-1==e.indexOf(s[l])?(e.push(s[l]),r.push([info[i]])):r[e.indexOf(s[l])].push(info[i]);for(i=0;i<e.length;i++)r[i].length>1?"Various Artists"==e[i]?n=r[i]:groupInfo.push([e[i],r[i]]):a.push(r[i][0]);groupInfo.sort((function(e,r){return e[0].toLowerCase().localeCompare(r[0].toLowerCase())}));for(i=0;i<o.length;i++)groupInfo.push([o[i],t[i]]);n.length>0&&groupInfo.push(["Various Artists",n]),a.length>0&&groupInfo.push(["One-Offs",a])}function getCookie(e){for(var r=document.cookie.split("; "),o=0;o<r.length;o++)if(r[o].split("=")[0]==e)return r[o].split("=")[1];return""}function setCookie(e,r){document.cookie=e+"="+r}