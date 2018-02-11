/*! Copyright (c) 2016 Naufal Rabbani (http://github.com/BosNaufal)
* Licensed Under MIT (http://opensource.org/licenses/MIT)
*
* React File Base64 - Version@1.0.0
*
*/

import React, {PropTypes} from 'react';
import ReactDOM from 'react-dom';

class FileBase64 extends React.Component {

  constructor(props, context) {
    super(props, context);
    this.state = {
      files: []
    };

    this.handleChange =this.handleChange.bind(this);
  }

  handleChange(e) {
    // get the files
    let files = e.target.files;

    // Process each file
    let allFiles = [];
    for (var i = 0; i < files.length; i++) {
      
      let file = files[i];

      // Make new FileReader
      let reader = new FileReader();

      // Convert the file to base64 text
      reader.readAsDataURL(file);

      // on reader load somthing...
      reader.onload = () => {

        // Make a fileInfo Object
        let fileInfo = {
          name: file.name,
          type: file.type,
          size: Math.round(file.size / 1000) + ' kB',
          base64: reader.result,
          file: file
        };

        // Push it to the state
        allFiles.push(fileInfo);

        // If all files have been proceed
        if (allFiles.length == files.length) {
          // Apply Callback function
          if (this.props.multiple || false) {
            this
              .props
              .onDone(allFiles);
          } else {
            this
              .props
              .onDone(allFiles[0]);
          }
        }
      }; // reader.onload
    } // for
  }

  clearFileInput(){
    this.setState({
      files:[]
    });
    this.refs.fileUpload.value = '';
  }

  render() {
    return (
      
      <span className="uploadContainer">
        <input
          ref = "fileUpload"
          type="file"
          accept="image/*"
          onChange={this.handleChange}
          multiple={this.props.multiple}/>
          <div className="row">
            <span className="label-info">Please upload image file only and click save</span>
          </div>
      </span>
    );
  }

}

FileBase64.propTypes = {
  multiple: PropTypes.bool,
  onDone: PropTypes.func.isRequired
}


export default FileBase64;