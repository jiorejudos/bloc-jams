var pointsArray = document.getElementsByClassName('point');

var animatePoints = function(points) {

    for (var i = 0; i < points.length; i++) {
        (function revealPoint(index) {
        points[index].style.opacity = 1;
        points[index].style.transform = "scaleX(1) translateY(0)";
        points[index].style.msTransform = "scaleX(1) translateY(0)";
        points[index].style.WebkitTransform = "scaleX(1) translateY(0)";
        })(i);
    }
};

window.onload = function() {
     if (window.innerHeight > 950) {
         animatePoints(pointsArray);
     }
    var sellingPoints = document.getElementsByClassName('selling-points')[0];
    var scrollDistance = sellingPoints.getBoundingClientRect().top - window.innerHeight + 200;
    var pointsArray = document.getElementsByClassName('point');

    window.addEventListener('scroll', function(event) {
        if (document.documentElement.scrollTop || document.body.scrollTop >= scrollDistance) {
             animatePoints(pointsArray);
        }
    });
}
