
const SONGS = 2;
let CURRENT_SONG = 1;
const songsUlEl = document.querySelector('.popup > ul ');

export class InitialMenu {
    handleMenuGamepadEvents(){
        return new Promise((resolve, reject) => {
            let oldDown, oldUp, currentUp, currentDown, oldStart, currentStart;
            [oldStart, oldUp, oldDown] = [false, false, false]
            [currentStart,currentUp, currentDown] = [false, false, false]
            setInterval(() => {
                [currentStart,currentUp, currentDown] = this.getGamepadInput().filter((el,index) => index == 12 || index == 13 || index == 0)
                if(currentUp != oldUp ){
                    oldUp = currentUp;
                    if(currentUp){
                        CURRENT_SONG--
                        if(CURRENT_SONG == 0){
                            CURRENT_SONG = SONGS
                        }
                        console.log('Pressed up -> go to song' + CURRENT_SONG);
                        this.changeSelectedSong();
                    }
                } else if (currentDown != oldDown ){
                    oldDown = currentDown;
                    if(currentDown){
                  
                        CURRENT_SONG++
                        if(CURRENT_SONG == SONGS + 1){
                            CURRENT_SONG = 1
                        }
                        console.log('Pressed down -> go to song' + CURRENT_SONG);
                        this.changeSelectedSong();
                    }
                } else if (currentStart != oldStart ){
                    oldStart = currentStart;
                    if(currentStart){
                        resolve(CURRENT_SONG);
                    }
                }
                
            }, 1000 / 10) // check 10 times per second if the button one is pressed
        })
    }

    handleMouseEvents(){
        return new Promise((resolve ,reject) => {
            Array.from(songsUlEl.childNodes).filter(el => el.tagName?.toLowerCase() == 'li').forEach(node => {
                node.addEventListener('click',() => {
                    CURRENT_SONG = +node.id.replace('music', '');
                    console.log(CURRENT_SONG);
                    resolve(CURRENT_SONG);
                });
            });
        })
    }

    getGamepadInput = () => {
        
        let buttons = navigator.getGamepads()[0].buttons.map(b => b.pressed)
        
        return buttons
    }


    changeSelectedSong(){
        
        // console.log(songsUlEl.childNodes)
        Array.from(songsUlEl.childNodes).filter(el => el.tagName?.toLowerCase() == 'li').forEach(node => {
            // console.log(node)
            node.id == ('music' + CURRENT_SONG) ? node.classList.add('selected') : node.classList.remove('selected');
        });
    }

}
