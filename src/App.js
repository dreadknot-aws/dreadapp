import React, { Component } from 'react';
import Amplify, { Analytics, Storage, API, graphqlOperation } from 'aws-amplify';
import awsconfig from './aws-exports';
import { withAuthenticator, Authenticator, S3Album } from 'aws-amplify-react';

Amplify.configure(awsconfig);

Storage.configure({ level: 'private' });

const listTodos = `query listTodos {
  listTodos{
    items{
      id
      name
      description
    }
  }
}`;

const addTodo = `mutation createTodo($name:String! $description: String!) {
  createTodo(input:{
    name:$name
    description:$description
  }){
    id
    name
    description
  }
}`;


class App extends Component {

  uploadFile = (evt) => {
    const file = evt.target.files[0];
    const name = file.name;

    Storage.put(name, file).then(() => {
      this.setState({ file: name });
    })
  }
//
  componentDidMount() {
    Analytics.record('Amplify_CLI');
  }

  todoMutation = async () => {
    const todoDetails = {
      name: 'Party tonight!',
      description: 'Amplify CLI rocks!'
    };
  
    const newTodo = await API.graphql(graphqlOperation(addTodo, todoDetails));
    alert(JSON.stringify(newTodo));
  };
  
  listQuery = async () => {
    console.log('listing todos');
    const allTodos = await API.graphql(graphqlOperation(listTodos));
    alert(JSON.stringify(allTodos));
  };
  
  post = async () => {
    console.log('calling api');
    const response = await API.post('apic2b9df9f', '/items', {
      body: {
        id: '1',
        name: 'hello amplify!'
      }
    });
    alert(JSON.stringify(response, null, 2));
  };
  get = async () => {
    console.log('calling api');
    const response = await API.get('apic2b9df9f', '/items/object/1');
    alert(JSON.stringify(response, null, 2));
  };
  list = async () => {
    console.log('calling api');
    const response = await API.get('apic2b9df9f', '/items/1');
    alert(JSON.stringify(response, null, 2));
  };


  render() {
    return (
      <div className="App">
        <Authenticator usernameAttributes='username'/>
        <p> Pick a file</p>
        <input type="file" onChange={this.uploadFile} />
        <button onClick={this.listQuery}>GraphQL Query</button>
        <button onClick={this.todoMutation}>GraphQL Mutation</button>
        <button onClick={this.post}>POST</button>
        <button onClick={this.get}>GET</button>
        <button onClick={this.list}>LIST</button>
        <S3Album level="private" path='' />
        
      </div>
      // <div>Test
      //   
      // </div>
    );
  }

}

const signUpConfig = {
  header: 'My Customized Sign Up',
  hideAllDefaults: true,
  defaultCountryCode: '1',
  signUpFields: [
    {
      label: 'My user name',
      key: 'username',
      required: true,
      displayOrder: 1,
      type: 'string'
    },
    {
      label: 'Password',
      key: 'password',
      required: true,
      displayOrder: 2,
      type: 'password'
    },
    {
      label: 'PhoneNumber',
      key: 'phone_number',
      required: true,
      displayOrder: 3,
      type: 'string'
    },
    {
      label: 'Email',
      key: 'email',
      required: true,
      displayOrder: 4,
      type: 'string'
    }
  ]
};
const usernameAttributes = 'My user name';

export default withAuthenticator(App, {
  signUpConfig,
  usernameAttributes
});



// import React from 'react';
// import logo from './logo.svg';
// import './App.css';

// import Amplify, { Analytics, Storage } from 'aws-amplify';
// import awsconfig from './aws-exports';
// import { withAuthenticator, S3Album } from 'aws-amplify-react';

// Amplify.configure(awsconfig);

// Storage.configure({ level: 'private' });

// class App {
//   // ...

//   render() {
//     return (
//       <Authenticator usernameAttributes='phone_number'/>
//     );
//   }
// }

// // function App() {

// //   return (
// //     <div className="App">
// //       <header className="App-header">
// //         <img src={logo} className="App-logo" alt="logo" />
// //         <p>
// //           Edit <code>src/App.js</code> and save to reload.
// //         </p>
// //         <a
// //           className="App-link"
// //           href="https://reactjs.org"
// //           target="_blank"
// //           rel="noopener noreferrer"
// //         >
// //           Learn React
// //         </a>
// //       </header>
// //     </div>
// //   );
// // }

// const signUpConfig = {
//   header: 'My Customized Sign Up',
//   hideAllDefaults: true,
//   defaultCountryCode: '1',
//   signUpFields: [
//     {
//       label: 'My custom email label',
//       key: 'email',
//       required: true,
//       displayOrder: 1,
//       type: 'string'
//     },
//     ... // and other custom attributes
//   ]
// };

// export default withAuthenticator(App, { signUpConfig });

