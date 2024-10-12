import React from 'react'

function NoteView() {
  return (
    <>
        <div className="app-main">

            <div className="app-main-note-edit">

                <input type="text" id="title" autoFocus />
                {/* TODO change autofocus to the note body rather than title? */}

                <textarea id="body" placeholder="Write your note here..."></textarea>

            </div>

            <div className="app-main-note-preview">

                <h1 className='preview-title'>Note Title</h1>
                <div className='markdown-preview'>Note Body</div>

            </div>

        </div>
    </>
  )
}

export default NoteView