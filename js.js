var sums = [3, 12];
var fr = [0, 0];
var TotalSum = 0;
var elem = ["tomatoes", "something"];
function addItem(text,text2,butt,price) {
  var buttonclick = "";
  var disablebutton="";
  if(butt != true){
  butt = "disabled"; buttonclick="Out of stock";
  disablebutton = "value='disable' disabled";
}
  else buttonclick="In stock";

  var item =
    '<li id="'+sums.length+'" class="animated flipInX"><div class="checkbox"><span class="close"><i class="fa fa-times"></i></span><label><span class="checkbox-mask"></span><input type="checkbox" />' +
    text +
    "</label>Description: "+text2+"<span><br>Price: "+price+"</span></div><button id='"+sums.length+"' class='btn btn-warning "+butt+"' style='cursor:default;' onclick='summing(this.id)' "+disablebutton+">"+buttonclick+"</button></li> ";    
  sums.push(parseInt(price));
  fr.push(0);
  elem.push(text);
  var isError = $(".form-control").hasClass("hidden");

  if (text === "") {
    $(".err")
      .removeClass("hidden")
      .addClass("animated bounceIn");
  } else {
    $(".err").addClass("hidden");
    $(".todo-list").append(item);
  }
  $(".refresh").removeClass("hidden");
  $(".no-items").addClass("hidden");

  $(".form-control")
    .val("")
  ;

}

$(function() {
  var err = $(".err"),
    formControl = $(".form-control"),
    isError = formControl.hasClass("hidden");



  $(".add-btn").on("click", function() {
    var itemVal = $(".form-control").val();
    var boo = $(".form-desc").val();
    var checkable = document.getElementById("switchValue").checked;
    var price = $(".form-price").val();
    addItem(itemVal,boo,checkable, price);
    console.log(checkable);
  });

  $(".todo-list").on("click", 'input[type="checkbox"]', function() {
    var li = $(this)
      .parent()
      .parent()
      .parent();
    li.toggleClass("danger");
    li.toggleClass("animated flipInX");

    setTimeout(function() {
      li.removeClass("animated flipInX");
    }, 500);
  });

  $(".todo-list").on("click", ".close", function() {
    var box = $(this)
      .parent()
      .parent();
      var i =$(this).parent().parent()[0].id;
      var text = "You have: <br><br>";
      TotalSum -= fr[i]*sums[i];
      fr[$(this).parent().parent()[0].id] = 0;
  for(let i = 0; i < fr.length;i++)
    if(fr[i] != 0)
    text += fr[i] +"x " + elem[i] +"<br>";
  text += "<br>And a total of: " +TotalSum;
    document.getElementById("totalsum").innerHTML= text;
      if ($(".todo-list li").length == 1) {
      box.removeClass("animated flipInX").addClass("animated bounceOutLeft");
      setTimeout(function() {
        box.remove();
        $(".no-items").removeClass("hidden");
        $(".refresh").addClass("hidden");
      }, 500);
    } else {
      box.removeClass("animated flipInX").addClass("animated bounceOutLeft");
      setTimeout(function() {
        box.remove();
      }, 500);
    }

  });
  
  $(".todo-list").sortable();
  $(".todo-list").disableSelection();
});

function summing(clicked){
  fr[clicked]++;
  TotalSum += sums[clicked];
  var text = "You have: <br><br>";
  for(let i = 0; i < fr.length;i++)
    if(fr[i] != 0)
    text += fr[i] +"x " + elem[i] +"<br>";
  text += "<br>And a total of: " +TotalSum;
    document.getElementById("totalsum").innerHTML= text;
}