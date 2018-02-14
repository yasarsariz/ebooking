// Copyright PHPTRAVELS Qasim Hussain

// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

 //  ___  _  _  ___  _____  ___    _ __   __ ___  _     ___             
 // | _ \| || || _ \|_   _|| _ \  /_\\ \ / /| __|| |   / __|            
 // |  _/| __ ||  _/  | |  |   / / _ \\ V / | _| | |__ \__ \            
 // |_|  |_||_||_|    |_|  |_|_\/_/ \_\\_/  |___||____||___/            
 //   __                  _    _                  
 //  / _| _  _  _ _   __ | |_ (_) ___  _ _   ___
 // |  _|| || || ' \ / _||  _|| |/ _ \| ' \ (_-<
 // |_|   \_,_||_||_|\__| \__||_|\___/|_||_|/__/
                                                                  

// var BASE_URL;
// var API_URL;
var BASE_URL = "";
var API_URL = BASE_URL + "/api";

$(function() {
    initComponents();

    // window.localStorage.clear();
    var firstRun = Boolean(get('firstRun'));
    console.log(firstRun);

    if(!firstRun){
      set('themeEnabled', 'true');
      set(Global.KEY_THEME_TOPBAR, 'true');
      set(Global.KEY_THEME_BUTTONS, 'true');
      set('firstRun', 'true');
      set('theme', 'indigo');
    }
});

function initComponents(){
    // $('select').material_select();
  if(UATOOLS.GetOperatingSystem() == 'Windows Phone'){
    $('.datepicker').pickadate({
        selectMonths: true, // Creates a dropdown to control month
        selectYears: 15, // Creates a dropdown of 15 years to control year
        format: "yyyy-mm-dd"
    });
	}
  // initAutoComplete();
}

function applyTheme(elem){
  if(get('themeEnabled') == 'true')
    elem.addClass(get('theme'));
  else
    elem.addClass(getDefaultTheme());
}

function applyDefaultTheme(elem){
  elem.addClass(getDefaultTheme());
}

function changeTheme(val){
  window.localStorage.setItem('theme', val);
}

function getTheme(){
  return (get('theme') == null)?'indigo':get('theme');
}

function getDefaultTheme(){
  return 'indigo';
}

function get(item){
  return window.localStorage.getItem(item);
}
function set(item, value){
  window.localStorage.setItem(item, value);
}

function initImageLoading(){
  $("img").load(function() {
      this.style.opacity = 1;
      if($(this).data('src')) this.src = $(this).data('src');
  });
  if($('img').isLoaded()){
    $('img').css('opacity', '1');
  }
}

jQuery.fn.isLoaded = function() {
    return this
             .filter("img")
             .filter(function() { return this.complete; }).length > 0;
};

var pt = {
  trimDesc: function(desc){
    return (desc.length > 0)?desc.split('.')[0]:'';
  },
  changeToDate: function(dateToChange){
    var tempDate = new Date(dateToChange);
    var day = tempDate.getDate();
    if(day < 10) day = "0" + day;
    var month = tempDate.getMonth() + 1;
    if(month < 10) month = "0" + month;
    var year = tempDate.getFullYear();
    var newDate = month + "/" + day + "/" + year;
    // console.log(newDate);
    return newDate;
  },
  stripHtml: function (html){
     var tmp = document.createElement("DIV");
     tmp.innerHTML = html;
     return (tmp.textContent || tmp.innerText || "").replace(/<\/?[^>]+(>|$)/g, "");
  }
}

String.prototype.trimToLength = function(m) {
  return (this.length > m) 
    ? jQuery.trim(this).substring(0, m).split(" ").slice(0, -1).join(" ") + "..."
    : this;
}

Date.prototype.addDays = function(days) {
    this.setDate(this.getDate() + parseInt(days));
    return this;
}

Date.prototype.difference = function(secondDate){
    var oneDay = 24*60*60*1000; // hours*minutes*seconds*milliseconds
    var firstDate = this;
    var secondDate = new Date(secondDate);

    var diffDays = Math.round(Math.abs((firstDate.getTime() - secondDate.getTime())/(oneDay)));
    return diffDays;
}

Date.prototype.toInputDateValue = function(){
  var oldDate = this;
  var year = oldDate.getFullYear();
  var month = oldDate.getMonth() + 1;
  if(month < 10){
    month = '0' + month;
  }
  var day = oldDate.getDate();
  if(day < 10){
    day = '0' + day;
  }
  var newDate = year + '-' + month + '-' + day;
  return newDate;
}

var Global = {
  KEY_THEME : 'theme',
  KEY_THEME_TOPBAR : 'themeTopbar',
  KEY_THEME_BUTTONS : 'themeButtons',
  KEY_THEME_ENABLED : 'themeEnabled',
  KEY_LANGUAGE      : "language",
  KEY_AUTODETECT_LANGUAGE : "autoDetectLanguage"
}
