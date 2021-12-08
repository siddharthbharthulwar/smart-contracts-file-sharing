import React from 'react'
import File from './File';

//basic React component that lists out all the files using Javascript map function within div
//keys are assigned to each File component for optimizing DOM
const FileView = ( { files } ) => {

    return (
        <div>
            {files.map((file, x) => (
                <File key={x} file={file} />
            ))}
        </div>
    )
}

export default FileView
