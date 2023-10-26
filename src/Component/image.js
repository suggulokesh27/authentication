import React, { useState } from "react";


const Image = () => {

  const [image,setImage] = useState();
  const [name,setName] = useState('');
  const nameHandler = event => {
    setName(event.target.value);
  };
  const imageHandler = event => {
    setImage(event.target.files[0]);
  };
    
    function handleFileInputChange(event) {
        const formData = new FormData();
        formData.append('image', image);
        formData.append('name', name);
      
        fetch('http://localhost:9000/upload', {
          method: 'POST',
          body: formData
        })
        .then(response => {
          // handle response
          console.log(response)
        })
        .catch(error => {
          // handle error
          console.log(error)
        });
      }
      

    return(
        <div>
          <form onSubmit={handleFileInputChange}>
          <input type="file" accept="image/*" onChange={imageHandler} />
            <label>Image</label>
            <input type="text" id="name" name="name" onChange={nameHandler}/>
            <label htmlFor="name"> Name</label>
            <button>
              click
            </button>
          </form>
        </div>
    )
}



export default Image;