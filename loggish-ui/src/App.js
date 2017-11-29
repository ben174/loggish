import React, { Component } from 'react';
import { Table, Checkbox, Container, Divider, Dropdown, Header, Image, List, Menu, Segment  } from 'semantic-ui-react'
import moment from 'moment'

import Endpoint from './Endpoint.js'


import './App.css';

class App extends Component {

  state = {
    logset: [],
  }

  getData() {
    fetch('http://localhost:5000/v1/logs/').then(response => {
      var contentType = response.headers.get("content-type");
      if (contentType && contentType.includes("application/json")) {
        return response.json();
      }
      throw new TypeError("Oops, we haven't got JSON!");
    }).then(json => {
      let logset = json.logset.map(endpoint => ({
          endpoint: endpoint.endpoint,
          logs: endpoint.logs.map(entry => (
            {
              ip: entry.ip,
              timestamp: entry.timestamp,
              nativeTimestamp: moment(entry.timestamp * 1000),
            }
          )),
          aggregates: this.aggregates(endpoint.logs),
        })
      )
      console.log(logset)
      this.setState({logset: logset})
    }).catch(error => {
      console.log(error);
    })
  }

  componentDidMount() {
    this.getData()
  }

  aggregates(entries) {
    console.log(entries)
    var ret = {}
    entries.map(entry => {
      let toMinute = moment(entry.timestamp * 1000).format('MM/DD/YY HH:mm')
      if (ret[toMinute] === undefined) {
        ret[toMinute] = {}
      }
      if (ret[toMinute][entry.ip] === undefined) {
        ret[toMinute][entry.ip] = 0
      }
      ret[toMinute][entry.ip] += 1
    })
    return ret
  }


  render() {
    return (



      <div>
        <Menu fixed='top' inverted>
          <Container>
            <Menu.Item as='a' header>
              <Image
                size='mini'
                src='/logo.png'
                style={{ marginRight: '1.5em' }}
              />
              Project Name
            </Menu.Item>
            <Menu.Item as='a'>Home</Menu.Item>

            <Dropdown item simple text='Dropdown'>
              <Dropdown.Menu>
                <Dropdown.Item>List Item</Dropdown.Item>
                <Dropdown.Item>List Item</Dropdown.Item>
                <Dropdown.Divider />
                <Dropdown.Header>Header Item</Dropdown.Header>
                <Dropdown.Item>
                  <i className='dropdown icon' />
                  <span className='text'>Submenu</span>
                  <Dropdown.Menu>
                    <Dropdown.Item>List Item</Dropdown.Item>
                    <Dropdown.Item>List Item</Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown.Item>
                <Dropdown.Item>List Item</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </Container>
        </Menu>

        <Container text style={{ marginTop: '7em' }}>
          <Header as='h1'>Semantic UI React Fixed Template</Header>
          <p>This is a basic fixed menu template using fixed size containers.</p>
          <p>A text container is used for the main container, which is useful for single column layouts.</p>

          <Image src='/assets/images/wireframe/media-paragraph.png' style={{ marginTop: '2em' }} />
          <Image src='/assets/images/wireframe/paragraph.png' style={{ marginTop: '2em' }} />
          <Image src='/assets/images/wireframe/paragraph.png' style={{ marginTop: '2em' }} />
          <Image src='/assets/images/wireframe/paragraph.png' style={{ marginTop: '2em' }} />
          <Image src='/assets/images/wireframe/paragraph.png' style={{ marginTop: '2em' }} />
          <Image src='/assets/images/wireframe/paragraph.png' style={{ marginTop: '2em' }} />
          <Image src='/assets/images/wireframe/paragraph.png' style={{ marginTop: '2em' }} />
        </Container>

        <Segment
          vertical
          style={{ margin: '5em 0em 0em', padding: '5em 0em' }}
        >
          <Container textAlign='center'>
            {this.state.logset.map(log =>
              <Endpoint key={log.endpoint} {...log} />
            )}
            <Divider inverted section />
            <Image
              centered
              size='mini'
              src='/logo.png'
            />
            <List horizontal inverted divided link>
              <List.Item as='a' href='#'>Site Map</List.Item>
              <List.Item as='a' href='#'>Contact Us</List.Item>
              <List.Item as='a' href='#'>Terms and Conditions</List.Item>
              <List.Item as='a' href='#'>Privacy Policy</List.Item>
            </List>
          </Container>
        </Segment>
      </div>
    )
  }
}

export default App;
