---
title: File Upload In React 
date: "2017-03-01T23:46:37.121Z"
---

It turns out that uploading file with react is pretty easy and not different from the way it’s done in plain JavaScript. Let’s do it now

```javascript
class FileUploader extends React.Component {
  state = { file: null }
  handleFileChange = (e) => {
    this.setState({file: e.target.files[0]});
  }
  handleUpload = (e) => {
    e.preventDefault();
    const { file } = this.state;
    if(file) {
      console.log(file);
      const formData = new FormData();
      formData.append('file', this.state.file);
      //$.post("/path/to/server", formData);
    } else {
      //handle no file selected
    }
  }
  render(){
    return(
      <form>
        <input type="file" onChange={this.handleFileChange}/>
        <input type="submit" onClick={this.handleUpload} 
               value="Upload File" />
      </form>
      )
  }
}
```

You can now check the params on the server endpoint when an actual request is made to decide how you want the file to be handled. If you’re wondering where the **FormData** class came from, [please see the docs on MDN](https://developer.mozilla.org/en/docs/Web/API/FormData)

That is all. Feel free to configure it to your business needs. Thank you for reading.
