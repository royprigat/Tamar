window.onscroll = () => {
  const nav = document.querySelector(".navbar");
  if (this.scrollY >= 150) nav.classList.add("scroll");
  else nav.classList.remove("scroll");
};

$(".contact-form").on("submit", function(e) {
    e.preventDefault();
    $('#email-submit').modal();
});

function sendForm() {
    $(".contact-form").off('submit');
    $(".contact-form").submit();
    $(".contact-form").reset();
}
