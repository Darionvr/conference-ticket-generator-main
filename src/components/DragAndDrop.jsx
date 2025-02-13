import React, { useContext, useRef, useState } from 'react'
import { FormContext } from '../context/FormContext';



const DragAndDrop = () => {


    const fileInputRef = useRef(null);
    const [dragging, setDragging] = useState(false)
    const { avatar, setAvatar } = useContext(FormContext)
    const [errorMessage, setErrorMessage] = useState('');


    const dropHandle = (event) => {
        event.preventDefault();
        setDragging(false)

        const droppedFiles = event.dataTransfer.files;
        if (droppedFiles.length > 0) {
            const newFiles = Array.from(droppedFiles);
            handleFiles(newFiles);
        }
    }

    const handleRemoveFile = (index) => {
        setAvatar((prevFiles) => prevFiles.filter((_, i) => i !== index));
    };

    const dragOverHandle = (event) => {
        event.preventDefault();
    }

    const handleFileChange = (event) => {
        setErrorMessage('')
        const selectedFiles = event.target.files;
        if (selectedFiles && selectedFiles.length > 0) {
            const newFiles = Array.from(selectedFiles);
            handleFiles(newFiles);
        }
    };
    const dragEnter = (event) => {
        event.preventDefault()
        setDragging(true)
    }
    const dragLeave = (event) => {
        event.preventDefault()
        setDragging(false)
    }

    const handleClick = () => {
        if (avatar.length === 0) {
            fileInputRef.current.click();
        }

    };

    const handleFiles = (files) => {
        const validFiles = [];
        let isError = false;
        files.forEach((file) => {
            if (file.size > 500 * 1024) {
                setErrorMessage('File too large. Please upload a photo under 500kb.');
                isError = true;
            } else {
                validFiles.push(file);
            }
        });
        if (!isError) {
            setAvatar((prevFiles) => [...prevFiles, ...validFiles]);
        }
    };

    return (
        <>
            <p> Upload Avatar</p>
            <div className={`dragdrop ${dragging ? 'dragging' : ''}`}
                onDrop={dropHandle}
                onDragOver={dragOverHandle}
                onDragEnter={dragEnter}
                onDragLeave={dragLeave}
                onClick={handleClick}
            >

                {avatar.length > 0 ? (
                    <div className="file-detail">
                        {avatar.map((file, index) => (
                            <div key={index} className='file-container'>
                                <div className="image-preview" >
                                    <img src={URL.createObjectURL(file)} alt='Avatar Preview' />
                                </div>
                                <div className="file-actions">
                                    <button onClick={() => handleRemoveFile(index)} className='remove-btn'> Remove Image</button>
                                    <label htmlFor="browse">
                                        Change Image
                                    </label>

                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <>

                        <img className='icon-upload' src="/images/icon-upload.svg" alt="upload icon" />

                        <label className='labelbrowse'>   Drag and drop or click to upload </label>
                        <input
                            type="file"
                            hidden
                            id="browse"
                            accept=".png, .jpg, .jpeg"
                            multiple
                            onChange={handleFileChange}
                            ref={fileInputRef}
                        />
                    </>
                )
                }

            </div>

            <p className='filesType'>
                <img src="/images/icon-info.svg" alt="alert icon" />
            
                {errorMessage
                    ? <span className='error'>{errorMessage}</span>
                    : <span className='info'>Upload your photo (JPG or PNG, max size: 500KB)</span>
                }
            </p>

        </>
    )
}

export default DragAndDrop