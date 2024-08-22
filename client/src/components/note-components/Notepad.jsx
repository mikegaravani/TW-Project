import React from 'react'

function Notepad() {
  return (
    <>
        <div className='app-main'>
            <div className='app-main-note-edit'>
                <input type='text' id='title' autoFocus />
                <textarea id='body' placeholder='Write your note here...'></textarea>
            </div>
            <div className='app-main-note-preview'>
                <h2 className='preview-title'>Preview</h2>
                <div className='markdown-preview'>Preview of the note</div>
            </div>

        </div>
    
    
    </>
  )
}

export default Notepad