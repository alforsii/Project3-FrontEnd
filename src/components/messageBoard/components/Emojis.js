import React from 'react'
import emojisData from '../../../data/emojis'

const emojis = emojisData.split(' ')

export default function Emojis() {
const myStyles = {
    backgroundColor: '#666',
    width: '300px',
    height: '300px',
    overflow: 'scroll',
    wordWrap: 'break-word',
    wordBreak: 'break-all',
    padding: '5px',
    borderRadius: '10px',
    position: 'relative',
    cursor: 'initial',
    display: 'none'
}
function closeEmojis(e){
    document.getElementById('emojis').style.display = 'none'
}

    return (
        <div id='emojis' className='emojis'
         style={myStyles}>
            <div >
                <span id='close-emojis' className='close-emojis'
                onClick={() => closeEmojis()}
                style={{
                    color: 'black',
                    fontSize: '12px',
                    padding: '2px',
                    backgroundColor: '#fff',
                    borderRadius: '50%',
                    cursor: 'pointer'
                }}>x</span>
                <hr style={{margin: 0, width: '100%'}}/>
            </div>

            { emojis.map((emoji, i) => <span key={i} style={{cursor: 'pointer'}}> {emoji} </span>)}
            
        </div>
    )
}
