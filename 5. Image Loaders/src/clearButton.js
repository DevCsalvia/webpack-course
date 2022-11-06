import styles from './clearButton.scss';

const el = document.createElement("button");
el.innerHTML = "Clear";
el.classList.add([styles.button]);
el.onclick = function () {
    alert("Clear clicked");
}
document.body.appendChild(el);