import {loginButtonEl, nameFieldEl} from "./elements.js";
import {setUserName} from "./user.js";

loginButtonEl.addEventListener('click', _ => {
    let name = nameFieldEl.value
    if (name || name !== '') {
        setUserName(name)
    }
    window.location.href = 'chat.html'
})