window.onscroll = () => {
    const nav = document.querySelector('.navbar');
    if (this.scrollY >= 150) nav.classList.add('scroll');
    else nav.classList.remove('scroll');
};

function handleEmailSubmit() {
    confirm("Thank you, your message has been sent.");
}