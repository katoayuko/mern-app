import React from 'react';
import Papa from 'papaparse';
class FileReader extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        csvfile: undefined,
      }
      this.updateData = this.updateData.bind(this);
    }
    handleChange = event => {
      this.setState({
        csvfile: event.target.files[0]
      });
    };
  
    importCSV = () => {
      const { csvfile } = this.state;
      Papa.parse(csvfile, {
        complete: this.updateData,
        header: true
      });
      console.log()
    };
  
    updateData(result) {
      var data = result.data;
      for(let i=0;i<100;i++){
          console.log(data)
        setTimeout(this.props.handleChange2(data[i].action,data[i].datetime),10000)
                    }
      }
        
        
  
    render() {
      console.log(this.state.csvfile);
      return (
        <div className="App1">
          <p>CSVファイルアップロード</p>
          <input
            className="csv-input"
            type="file"
            ref={input => {
              this.filesInput = input;
            }}
            name="file"
            placeholder={null}
            onChange={this.handleChange}
          /><button　className='csvbutton' onClick={this.importCSV}> アップロード </button>
          <p />
          
        </div>
      );
    }
  }
  
  export default FileReader;