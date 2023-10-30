export default function callButton() {
    const phoneNode = document.querySelector('.main-contact__phone');
    const phoneLink = phoneNode ? phoneNode.href : '';

    if (phoneLink) document.location.href = phoneLink;
}
