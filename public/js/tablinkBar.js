let slideIndex = 1;
showSlides(slideIndex);

//plusSlides(n): פונקציה זו מקבלת מספר n ומעבירה את המצגת הנוכחית לתמונה הבאה או הקודמת, תלוי בערך שנשלח.
function plusSlides(n) {
  showSlides(slideIndex += n);
}

//currentSlide(n): פונקציה זו מקבלת מספר n ומציגה תמונה ספציפית במצגת, המתאימה לערך n שהתקבל.
function currentSlide(n) {
  showSlides(slideIndex = n);
}

// showSlides(n): פונקציה זו מקבלת מספר n שמייצג אינדקס של תמונה ומציגה אותה על המסך
//. היא מסתירה את כל התמונות ומראה רק את התמונה במספר n. גם נקודת המצגת המתאימה מקבלת עיצוב חדש כך שתהיה "פעילה" ותבלט

function showSlides(n) {
  let i;
  let slides = document.getElementsByClassName("mySlides");
  let dots = document.getElementsByClassName("dot");
  if (n > slides.length) {slideIndex = 1}    
  if (n < 1) {slideIndex = slides.length}
  for (i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";  
  }
  for (i = 0; i < dots.length; i++) {
    dots[i].className = dots[i].className.replace(" active", "");
  }
  slides[slideIndex-1].style.display = "block";  
  dots[slideIndex-1].className += " active";
}