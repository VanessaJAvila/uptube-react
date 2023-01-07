import './VideoUploader.css';
import LoadingSpinner from '../Spinner/Spinner';
import ProgressBar from '../ProgressBar/ProgressBar';
import { useState } from 'react';
import axios from 'axios';

//localhost port for api
const  API  = process.env.REACT_APP_API;

// This component is a form that allows the user to select a file and upload it to a server.
// It uses state variables to keep track of the form's state.
export const VideoUploader = ({}) => {
    // The file that the user has selected for upload
    const [file, setFile] = useState(null);

    // Whether the file is currently being uploaded
    const [isLoading, setIsLoading] = useState(false);

    // Whether the file has finished uploading
    const [isLoaded, setIsLoaded] = useState(false);

    // An error message to display if there is an issue with the file upload
    const [errorMessage, setErrorMessage] = useState('');

    // The progress of the file upload, as a percentage
    const [progress, setProgress] = useState(0);

    // This function is called when the user selects a file
    const onInputChange = (e) => {
        // Update the file state variable with the selected file
        setFile(e.target.files[0]);
    };

    // This function is called when the user submits the form
    const onSubmit = (e) => {
        // Prevent the default form submission behavior
        e.preventDefault();
        // Create a new FormData object to store the file
        const data = new FormData();
        data.append('file', file);

        // Set the isLoading state variable to true to show the loading spinner
        setIsLoading(true);

        // Set the isLoaded state variable to false
        setIsLoaded(false);

        // Send an HTTP POST request to the server with the file as the payload
        axios
            .post(`${API}/studio/upload`, data, {
                // Add a progress event handler to update the progress state variable
                onUploadProgress: (progressEvent) => {
                    // Calculate the progress percentage
                    const percentCompleted = Math.round(
                        (progressEvent.loaded * 100) / progressEvent.total
                    );

                    // Update the progress state variable
                    setProgress(percentCompleted);
                },
            })
            // If the file upload is successful, update the isLoading and isLoaded state variables
            .then(() => {
                setIsLoading(false);
                setIsLoaded(true);
            })
            // If there is an error with the file upload, update the errorMessage state variable
            .catch((e) => {
                setErrorMessage('Unable to upload');
                setIsLoading(false);
            });
    };

    // Render the form
    return (
        <div className='upload'>
            <form
                method='post'
                action='#'
                id='#'
                encType='multipart/form-data'
                onSubmit={onSubmit}
            >
                <div className='form-group files'>
                    <label htmlFor='file-input'>Select a file</label>
                    <input
                        type='file'
                        name='image'
                        id='file-input'
                        onChange={onInputChange}
                        className='form-control'
                        multiple=''
                    />
                </div>
                {isLoading ? <LoadingSpinner /> : onSubmit}
                {errorMessage && <div className='error'>{errorMessage}</div>}
                <button disabled={isLoading} style={{ display: isLoaded ? 'none' : 'block' }}>
                    Submit
                </button>
                <ProgressBar value={progress} />
            </form>
        </div>
    );
};
