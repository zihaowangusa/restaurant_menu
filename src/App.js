import React from 'react';
import ReactDom from 'react-dom';
import './App.css';
import axios from 'axios';

class Details extends React.Component {
    render(){
        return (
            <div>
                <h4>Items in Category: ({this.props.position})</h4>
                <table className="table">
                    <thead>
                    <tr>
                        <th className="column">Name</th>
                        <th className="column">Description</th>
                    </tr>
                    </thead>

                    <tbody>
                    {this.props.details.map(item=>{
                        return (
                            <tr key={item.id}>
                                <td className="column">{item.name}</td>
                                <td className="column">{item.description}</td>
                            </tr>
                        )
                    })}
                    </tbody>
                </table>
            </div>
        );
    }
}

class App extends React.Component {
    constructor() {
        super();
        this.state = {
            categories:[],
            details:[],
            position:null
        };
        this.handleClick=this.handleClick.bind(this);
    }

    componentDidMount(){
        axios.get(`https://stream-restaurant-menu-svc.herokuapp.com/category`).then(res=>res.data).then(data=>{
            let category=[];
            data.forEach(cat=>category.push([cat.name,cat.short_name]));
            this.setState({categories:category});
        })
    }

    handleClick(value){
        axios.get(`https://stream-restaurant-menu-svc.herokuapp.com/item`,{params:{category:value}}).then(res=>res.data).then(data=>{this.setState({details:data,position:value})})
    }

    render() {
        const len = this.state.details.length;
        let details;
        if( len>0 ){
            details = <Details  position={this.state.position}  details={this.state.details} />
        }
        return (
            <div>
                <h2>1. Welcome to Chef Chu's Restaurant</h2>
                <button>Home</button>
                <button>Categories</button>

                <div className="container">
                    <div className="item1">
                        <h3> Menu Categories </h3>
                    </div>

                    <div className="item2">
                    <ul>
                    {this.state.categories.map(
                        (item,index) => {
                            return <li key={index}  onClick={()=>this.handleClick(item[1])}> {item[0]}-({item[1]}) </li>
                        }
                    )}
                    </ul>
                    </div>

                    <div className="item3">
                    {details}
                    </div>
                </div>
            </div>
        );
    }
}

ReactDom.render(<App />, document.getElementById('root'));

export default App;
